import express from 'express';
import type { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, Type } from '@google/genai';
import { generateLocalBusinessKit } from './src/data/mockTemplates.ts';
import type { BusinessInput, BusinessKit } from './src/types/index.ts';

dotenv.config();

// Sanitize Supabase URL to ensure it only contains the project base origin (no /rest/v1 or trailing slashes)
for (const envVar of ['VITE_SUPABASE_URL', 'SUPABASE_URL']) {
  const val = process.env[envVar];
  if (val) {
    try {
      const trimmed = val.trim().replace(/^["']+|["']+$/g, '');
      const withProto = trimmed.startsWith('http://') || trimmed.startsWith('https://') ? trimmed : `https://${trimmed}`;
      process.env[envVar] = new URL(withProto).origin;
    } catch {
      process.env[envVar] = val
        .trim()
        .replace(/\/rest\/v1\/?$/i, '')
        .replace(/\/auth\/v1\/?$/i, '')
        .replace(/\/+$/, '');
    }
  }
}

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json({ limit: '1mb' }));

// --- RATE LIMITING PER IP (IN-MEMORY SLIDING WINDOW) ---
interface RateLimitEntry {
  count: number;
  resetAt: number;
}
const rateLimitMap = new Map<string, RateLimitEntry>();
const WINDOW_MS = 15 * 60 * 1000; // 15 minutes window
const MAX_REQUESTS_PER_WINDOW = 10; // Max 10 kit generations per 15 minutes per IP

function rateLimiter(req: Request, res: Response, next: () => void) {
  const ip = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || 'unknown';
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return next();
  }

  if (entry.count >= MAX_REQUESTS_PER_WINDOW) {
    const retryAfterSec = Math.ceil((entry.resetAt - now) / 1000);
    res.setHeader('Retry-After', retryAfterSec);
    return res.status(429).json({
      error: 'Limite de requêtes atteinte.',
      message: `Trop de générations demandées. Veuillez patienter ${Math.ceil(retryAfterSec / 60)} minute(s) avant de relancer une génération.`,
    });
  }

  entry.count++;
  next();
}

// Clean up stale rate limit entries every 30 minutes
setInterval(() => {
  const now = Date.now();
  for (const [ip, entry] of rateLimitMap.entries()) {
    if (now > entry.resetAt) {
      rateLimitMap.delete(ip);
    }
  }
}, 30 * 60 * 1000);

// Initialize Gemini Client safely on the server side
const apiKey = process.env.GEMINI_API_KEY;
let aiClient: GoogleGenAI | null = null;

if (apiKey && apiKey !== 'MY_GEMINI_API_KEY') {
  aiClient = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// API Health & Status check (does not leak keys)
app.get('/api/status', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    geminiEnabled: !!aiClient,
    model: 'gemini-3.8-flash',
    timestamp: new Date().toISOString(),
  });
});

// JSON Schema for structured generation with Gemini
const kitResponseSchema = {
  type: Type.OBJECT,
  properties: {
    posts: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          id: { type: Type.INTEGER },
          title: { type: Type.STRING },
          idea: { type: Type.STRING },
          caption: { type: Type.STRING },
          cta: { type: Type.STRING },
        },
        required: ['id', 'title', 'idea', 'caption', 'cta'],
      },
    },
    captions: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          id: { type: Type.INTEGER },
          theme: { type: Type.STRING },
          text: { type: Type.STRING },
          hashtags: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
          },
        },
        required: ['id', 'theme', 'text', 'hashtags'],
      },
    },
    reels: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          id: { type: Type.INTEGER },
          title: { type: Type.STRING },
          hook: { type: Type.STRING },
          concept: { type: Type.STRING },
          flow: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
          },
          cta: { type: Type.STRING },
        },
        required: ['id', 'title', 'hook', 'concept', 'flow', 'cta'],
      },
    },
    whatsapp: {
      type: Type.OBJECT,
      properties: {
        welcome: { type: Type.STRING },
        pricing: { type: Type.STRING },
        availability: { type: Type.STRING },
        followUp: { type: Type.STRING },
        afterSale: { type: Type.STRING },
      },
      required: ['welcome', 'pricing', 'availability', 'followUp', 'afterSale'],
    },
    marketing: {
      type: Type.OBJECT,
      properties: {
        slogans: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
        },
        promoOffers: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              deal: { type: Type.STRING },
              condition: { type: Type.STRING },
              pitch: { type: Type.STRING },
            },
            required: ['title', 'deal', 'condition', 'pitch'],
          },
        },
        adCopies: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              angle: { type: Type.STRING },
              headline: { type: Type.STRING },
              body: { type: Type.STRING },
              cta: { type: Type.STRING },
            },
            required: ['angle', 'headline', 'body', 'cta'],
          },
        },
        professionalDescription: { type: Type.STRING },
        instagramBio: {
          type: Type.OBJECT,
          properties: {
            line1: { type: Type.STRING },
            line2: { type: Type.STRING },
            line3: { type: Type.STRING },
            cta: { type: Type.STRING },
            formatted: { type: Type.STRING },
          },
          required: ['line1', 'line2', 'line3', 'cta', 'formatted'],
        },
      },
      required: ['slogans', 'promoOffers', 'adCopies', 'professionalDescription', 'instagramBio'],
    },
    calendar: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          day: { type: Type.STRING },
          theme: { type: Type.STRING },
          type: { type: Type.STRING },
          focus: { type: Type.STRING },
          actionIdea: { type: Type.STRING },
          exampleHook: { type: Type.STRING },
        },
        required: ['day', 'theme', 'type', 'focus', 'actionIdea', 'exampleHook'],
      },
    },
  },
  required: ['posts', 'captions', 'reels', 'whatsapp', 'marketing', 'calendar'],
};

// POST /api/generate - Secure Server-Side Generation with Gemini + Fallback
app.post('/api/generate', rateLimiter, async (req: Request, res: Response) => {
  try {
    const input: BusinessInput = req.body;

    // Strict input validation & sanitization
    if (!input || !input.businessName || !input.city) {
      return res.status(400).json({
        error: 'Champs obligatoires manquants : nom du business et ville requis.',
      });
    }

    const sanitizedInput: BusinessInput = {
      activity: String(input.activity || 'Autre').slice(0, 100),
      businessName: String(input.businessName).trim().slice(0, 150),
      description: String(input.description || '').slice(0, 1000),
      city: String(input.city).trim().slice(0, 150),
      goal: (input.goal || 'Obtenir plus de clients') as any,
      tone: (input.tone || 'Dynamique') as any,
      mainOffer: String(input.mainOffer || '').trim().slice(0, 500),
      targetAudience: String(input.targetAudience || '').trim().slice(0, 500),
      differentiator: String(input.differentiator || '').trim().slice(0, 500),
    };

    // If Gemini client is active, attempt structured generation
    if (aiClient) {
      try {
        const prompt = `Tu es le directeur marketing de BizPilot AI V1.1. Génère un Business Kit marketing complet, sur-mesure et ultra-réaliste en français pour cette entreprise :

FICHE ENTREPRISE :
- Nom du business : ${sanitizedInput.businessName}
- Secteur d'activité : ${sanitizedInput.activity}
- Ville / Localisation : ${sanitizedInput.city}
- Produits ou services principaux : ${sanitizedInput.mainOffer || 'Non spécifié'}
- Clientèle cible : ${sanitizedInput.targetAudience || 'Clients locaux'}
- Ce qui différencie l'entreprise : ${sanitizedInput.differentiator || 'Non spécifié'}
- Description complémentaire : ${sanitizedInput.description || 'Non renseigné'}
- Objectif prioritaire : ${sanitizedInput.goal}
- Ton de communication souhaité : ${sanitizedInput.tone}

🚨 DIRECTIVES MAJEURES DE VÉRACITÉ (INTERDICTION D'INVENTER DES FAITS) :
1. NE JAMAIS INVENTER de faux témoignages clients, d'avis fictifs, d'étoiles ("5 étoiles"), d'années d'expérience inventées ("depuis 5 ans", "10 ans"), de nombre de clients ("500 clients"), de récompenses, de partenariats inexistants, de prix chiffrés ou de pourcentages de réductions non fournis par l'utilisateur.
2. Si une publication aborde la preuve sociale ou les retours d'expérience, fournis un modèle/cadre honnête et prêt à l'emploi invitant les vrais clients à s'exprimer (ex: "Idée de post preuve sociale : partagez ici le véritable retour d'un de vos clients satisfaits", ou valorise le savoir-faire réel, la méthode de travail et la transparence).
3. Les idées de publications, vidéos, captions et textes marketing doivent s'adresser DIRECTEMENT à la clientèle cible (${sanitizedInput.targetAudience}) et mettre en valeur EXCLUSIVEMENT les produits ou services principaux (${sanitizedInput.mainOffer}). N'invente aucun produit ou service étranger à cette activité.
4. Valorise le différenciateur avec justesse (${sanitizedInput.differentiator || 'la qualité d’écoute et le savoir-faire'}), sans jamais faire de promesses irréalistes ou de fausses garanties.

EXIGENCES STRUCTURELLES DU BUSINESS KIT :
1. EXACTEMENT 10 idées de posts (avec titre, idée/concept précis, caption complète et engageante, et CTA clair).
2. EXACTEMENT 10 captions prêtes à l'emploi (thèmes variés : Découverte, Conseil, Coulisses, Problème résolu, Transparence, etc.) avec hashtags pertinents incluant le nom et la ville.
3. EXACTEMENT 5 idées de vidéos Reels/TikTok (avec hook choc des 3 premières secondes, concept, déroulement pas-à-pas minuté réaliste et CTA).
4. EXACTEMENT 5 messages WhatsApp professionnels (accueil bienveillant, présentation des formules/demande de devis sans faux prix, disponibilités, relance polie, fidélisation/demande d'avis honnête).
5. Section Marketing & Ads : 5 slogans percutants, 3 angles d'offres honnêtes, 5 textes de publicités orientés conversion sans fausses promesses, 1 bio Instagram percutante et 1 description d'entreprise valorisante.
6. Un calendrier de contenu sur 7 jours (Lundi à Dimanche) avec thème, format, focus produit/clientèle cible, action concrète et exemple de hook.`;

        const response = await aiClient.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
          config: {
            responseMimeType: 'application/json',
            responseSchema: kitResponseSchema,
            temperature: 0.7,
            systemInstruction:
              'Tu es BizPilot AI V1.1, un directeur marketing d’élite rigoureux, honnête et orienté conversion. Tu ne fabriques JAMAIS de faux témoignages, de fausses réductions ou de fausses métriques. Tu crées des contenus authentiques, professionnels et directement actionnables.',
          },
        });

        const generatedJson = response.text ? JSON.parse(response.text) : null;

        if (generatedJson && generatedJson.posts && generatedJson.captions) {
          const kit: BusinessKit = {
            id: 'bp_gemini_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
            createdAt: new Date().toISOString(),
            input: sanitizedInput,
            posts: generatedJson.posts,
            captions: generatedJson.captions,
            reels: generatedJson.reels,
            whatsapp: generatedJson.whatsapp,
            marketing: generatedJson.marketing,
            calendar: generatedJson.calendar,
            engineNote: 'Généré par Gemini AI (Serveur sécurisé BizPilot).',
          };

          return res.json({ success: true, kit });
        }
      } catch (geminiError) {
        console.warn('Gemini API call failed or quota reached, falling back to local generator:', geminiError);
        // Fallback transparently to smart local generator
      }
    }

    // Default Fallback: Smart local generator
    const localKit = generateLocalBusinessKit(sanitizedInput);
    return res.json({ success: true, kit: localKit });
  } catch (error) {
    console.error('Server generation error:', error);
    res.status(500).json({
      error: 'Erreur interne du serveur lors de la génération.',
    });
  }
});

// ==========================================
// OPENPAY CONGO PAYMENT INFRASTRUCTURE
// ==========================================

const OPENPAY_BASE_URL = 'https://api.openpay-cg.com';
const PLAN_PRO_AMOUNT = 2000; // 2 000 FCFA / XAF

// POST /api/payments/openpay/create - Generate payment link via OpenPay API
app.post('/api/payments/openpay/create', async (req: Request, res: Response) => {
  try {
    const apiKey = process.env.OPENPAY_API_KEY;
    if (!apiKey) {
      return res.status(503).json({
        error: 'Service de paiement indisponible.',
        message: "La variable OPENPAY_API_KEY n'est pas encore configurée sur le serveur.",
      });
    }

    const { customerName, customerPhone, userId } = req.body || {};

    // Format Congolese phone number (format 242XXXXXXXXX)
    let formattedPhone = String(customerPhone || '').replace(/[\s\-\+\(\)]/g, '');
    if (formattedPhone.startsWith('00242')) {
      formattedPhone = formattedPhone.slice(2);
    } else if (formattedPhone.startsWith('0') && formattedPhone.length === 10) {
      formattedPhone = '242' + formattedPhone.slice(1);
    } else if (!formattedPhone.startsWith('242') && formattedPhone.length === 9) {
      formattedPhone = '242' + formattedPhone;
    }

    // Generate unique order ID
    const orderId = `bp_ord_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

    // Prepare payload matching OpenPay API specifications
    const payload = {
      amount: PLAN_PRO_AMOUNT,
      description: 'Abonnement BizPilot AI Pro',
      expires_at: 24,
      customer: {
        name: String(customerName || 'Client BizPilot').trim().slice(0, 100),
        phone: formattedPhone || '242060000000',
      },
      metadata: {
        order_id: orderId,
        user_id: String(userId || '').trim(),
      },
    };

    const response = await fetch(`${OPENPAY_BASE_URL}/v1/payment-link`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'XO-API-KEY': apiKey,
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      console.error('OpenPay API returned error status:', response.status, data);
      return res.status(response.status >= 400 && response.status < 500 ? 400 : 502).json({
        error: 'Échec de création du lien de paiement OpenPay.',
        details: data?.message || data?.error || 'Erreur lors de la communication avec le service OpenPay.',
      });
    }

    return res.json({
      success: true,
      order_id: orderId,
      payment_url: data?.payment_url,
      payment_token: data?.payment_token,
      amount: data?.amount || PLAN_PRO_AMOUNT,
      currency: data?.currency || 'XAF',
      status: data?.status || 'pending',
    });
  } catch (error: any) {
    console.error('Error creating OpenPay payment link:', error);
    return res.status(500).json({
      error: 'Erreur interne du serveur lors de la création du paiement OpenPay.',
    });
  }
});

// POST /api/payments/openpay/callback - Process webhook notifications from OpenPay
app.post('/api/payments/openpay/callback', async (req: Request, res: Response) => {
  try {
    const callbackData = req.body || {};
    const { reference, amount, currency, provider, status, metadata } = callbackData;

    console.log('[OpenPay Callback] Notification reçue:', {
      reference,
      status,
      amount,
      currency,
      provider,
      order_id: metadata?.order_id,
      timestamp: new Date().toISOString(),
    });

    // Check that amount corresponds to 2 000 XAF
    const numericAmount = Number(amount);
    const isAmountValid = numericAmount === PLAN_PRO_AMOUNT;
    const isCurrencyValid = !currency || currency.toUpperCase() === 'XAF' || currency.toUpperCase() === 'FCFA';

    if (!isAmountValid || !isCurrencyValid) {
      console.warn('[OpenPay Callback] Avertissement: Montant ou devise inattendu:', {
        expectedAmount: PLAN_PRO_AMOUNT,
        receivedAmount: numericAmount,
        currency,
      });
    }

    // Handle statuses: pending, success, failed, cancelled
    switch (status) {
      case 'success':
        console.log(`[OpenPay Callback] Paiement validé pour la commande : ${metadata?.order_id || reference}.`);
        // ÉTAPE ACTUELLE : NE PAS encore modifier le plan Supabase de l'utilisateur.
        break;

      case 'pending':
        console.log(`[OpenPay Callback] Paiement en attente pour la commande : ${metadata?.order_id || reference}.`);
        break;

      case 'failed':
        console.log(`[OpenPay Callback] Paiement échoué pour la commande : ${metadata?.order_id || reference}.`);
        break;

      case 'cancelled':
        console.log(`[OpenPay Callback] Paiement annulé pour la commande : ${metadata?.order_id || reference}.`);
        break;

      default:
        console.log(`[OpenPay Callback] Statut reçu "${status}" pour la commande : ${metadata?.order_id || reference}.`);
        break;
    }

    // Always return HTTP 200 to OpenPay to acknowledge receipt of the callback
    return res.status(200).json({
      received: true,
      status: 'processed',
      order_id: metadata?.order_id || reference,
    });
  } catch (error: any) {
    console.error('Error handling OpenPay callback:', error);
    return res.status(200).json({
      received: true,
      error: 'Error logged on server',
    });
  }
});

// Setup Vite in Dev or serve static in Prod
async function startServer() {
  const isDev = process.env.NODE_ENV !== 'production';

  if (isDev) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`BizPilot AI server running on http://0.0.0.0:${port}`);
  });
}

startServer();
