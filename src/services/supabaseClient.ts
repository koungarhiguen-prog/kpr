import { createClient, SupabaseClient } from '@supabase/supabase-js';

/**
 * Sanitizes Supabase Project URL:
 * Strictly extracts the base origin (e.g. "https://xxxxxxxxxxxx.supabase.co").
 * Strips any trailing slashes, quotes, or accidental path segments such as /rest/v1 or /auth/v1
 * which cause "Invalid path specified in request URL".
 */
export const sanitizeSupabaseUrl = (rawUrl?: string): string => {
  if (!rawUrl) return '';
  let cleaned = rawUrl.trim().replace(/^["']+|["']+$/g, '');
  if (!cleaned) return '';

  if (!cleaned.startsWith('http://') && !cleaned.startsWith('https://')) {
    cleaned = `https://${cleaned}`;
  }

  try {
    const parsed = new URL(cleaned);
    // Origin guarantees ONLY protocol + hostname, with no trailing slash and no subpaths
    return parsed.origin;
  } catch {
    return cleaned
      .replace(/\/rest\/v1\/?$/i, '')
      .replace(/\/auth\/v1\/?$/i, '')
      .replace(/\/+$/, '');
  }
};

export const sanitizeSupabaseKey = (rawKey?: string): string => {
  if (!rawKey) return '';
  return rawKey.trim().replace(/^["']+|["']+$/g, '');
};

// Read environment variables (Vite format)
const rawUrl = (import.meta.env.VITE_SUPABASE_URL as string) || '';
const rawKey = (import.meta.env.VITE_SUPABASE_ANON_KEY as string) || '';

const supabaseUrl = sanitizeSupabaseUrl(rawUrl);
const supabaseAnonKey = sanitizeSupabaseKey(rawKey);

export const isSupabaseConfigured = (): boolean => {
  return Boolean(
    supabaseUrl &&
    supabaseAnonKey &&
    supabaseUrl !== 'https://your-project.supabase.co' &&
    !supabaseUrl.includes('your-project') &&
    supabaseAnonKey !== 'your-anon-key-here'
  );
};

let clientInstance: SupabaseClient | null = null;

if (isSupabaseConfigured()) {
  try {
    // Official Supabase JS SDK initialization with sanitized base URL
    clientInstance = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    });
  } catch (err) {
    console.error('Failed to initialize Supabase client:', err);
  }
}

export const supabase = clientInstance;
export { supabaseUrl, supabaseAnonKey };
