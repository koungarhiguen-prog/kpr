import { BusinessInput, BusinessKit } from '../types';
import { generateLocalBusinessKit } from '../data/mockTemplates';

export interface AIProvider {
  name: string;
  isExternal: boolean;
  description: string;
  generateBusinessKit(input: BusinessInput): Promise<BusinessKit>;
}

/**
 * In-browser local fallback engine.
 * Deterministic, instant, and completely offline-capable.
 */
export class LocalGenerator implements AIProvider {
  name = 'Moteur Local Intelligent V1';
  isExternal = false;
  description = 'Génération instantanée basée sur des structures marketing locales éprouvées, sans coût d’API.';

  async generateBusinessKit(input: BusinessInput): Promise<BusinessKit> {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return generateLocalBusinessKit(input);
  }
}

/**
 * Secure Server Proxy Provider:
 * Calls the backend `/api/generate` endpoint where GEMINI_API_KEY is stored securely.
 * Enforces rate limiting per IP and server-side prompt engineering with automatic fallback.
 */
export class ServerProxyAIProvider implements AIProvider {
  name = 'Serveur Sécurisé BizPilot (Gemini + Proxy)';
  isExternal = true;
  description = 'Exécute les appels Gemini via le serveur backend protégé avec limiteur de requêtes.';

  async generateBusinessKit(input: BusinessInput): Promise<BusinessKit> {
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(input),
      });

      if (response.status === 429) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message ||
            'Limite de requêtes atteinte. Veuillez patienter quelques minutes avant de générer un nouveau kit.'
        );
      }

      if (!response.ok) {
        console.warn('Backend returned non-OK status, falling back to local engine');
        const fallback = new LocalGenerator();
        return await fallback.generateBusinessKit(input);
      }

      const data = await response.json();
      if (data && data.success && data.kit) {
        return data.kit;
      }

      const fallback = new LocalGenerator();
      return await fallback.generateBusinessKit(input);
    } catch (err: any) {
      if (err.message && err.message.includes('Limite de requêtes')) {
        throw err;
      }
      console.warn('Fetch to /api/generate failed, falling back to local generator:', err);
      const fallback = new LocalGenerator();
      return await fallback.generateBusinessKit(input);
    }
  }
}

// Active provider instance defaults to the secure ServerProxy
let activeProvider: AIProvider = new ServerProxyAIProvider();

export function getAIProvider(): AIProvider {
  return activeProvider;
}

export function setAIProvider(provider: AIProvider): void {
  activeProvider = provider;
}
