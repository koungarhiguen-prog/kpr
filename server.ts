import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, Type } from '@google/genai';
import { generateLocalBusinessKit } from './src/data/mockTemplates.ts';
import { BusinessInput, BusinessKit } from './src/types/index.ts';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;

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
    };

    // If Gemini client is active, attempt structured generation
    if (aiClient) {
      try {
        const prompt = `Génère un Business Kit marketing complet et ultra-qualitatif en français pour ce petit business :
Nom du business : ${sanitizedInput.businessName}
Activité : ${sanitizedInput.activity}
Ville : ${sanitizedInput.city}
Description : ${sanitizedInput.description || 'Non renseigné'}
Objectif prioritaire : ${sanitizedInput.goal}
Ton : ${sanitizedInput.tone}

Exigences impératives :
1. Générer EXACTEMENT 10 idées de posts (avec hook, concept, caption détaillée et CTA).
2. Générer EXACTEMENT 10 captions prêtes à copier avec hashtags pertinents.
3. Générer EXACTEMENT 5 idées de vidéos Reels/TikTok (avec hook choc de 3s, concept, déroulement précis et CTA).
4. Générer 5 réponses WhatsApp professionnelles (accueil, prix, dispo, relance, fidélisation).
5. Générer 5 slogans, 3 offres promo percutantes, 5 textes pubs, 1 bio Instagram et 1 description pro.
6. Générer un calendrier de contenu complet sur 7 jours (Lundi à Dimanche) avec thème, type, focus, action et hook.
Le contenu doit être réaliste, percutant, orienté conversion et ancré dans la ville de ${sanitizedInput.city}.`;

        const response = await aiClient.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
          config: {
            responseMimeType: 'application/json',
            responseSchema: kitResponseSchema,
            temperature: 0.7,
            systemInstruction:
              'Tu es BizPilot AI, un directeur marketing d’élite spécialisé dans l’accompagnement des commerces locaux, créateurs et indépendants.',
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
