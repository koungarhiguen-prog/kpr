import { supabase, isSupabaseConfigured } from './supabaseClient';
import { UserProfile, SupabaseProfile, ContentGenerationRecord, BusinessKit } from '../types';

export interface AuthResult {
  user: UserProfile | null;
  error?: string | null;
  needsEmailVerification?: boolean;
}

export const supabaseService = {
  isConfigured(): boolean {
    return isSupabaseConfigured() && supabase !== null;
  },

  // ==========================================
  // AUTHENTICATION
  // ==========================================

  async signUp(
    email: string,
    password: string,
    metadata: { fullName: string; businessName?: string; businessType?: string }
  ): Promise<AuthResult> {
    if (!this.isConfigured() || !supabase) {
      return {
        user: null,
        error: "Supabase n'est pas encore configuré. Renseignez VITE_SUPABASE_URL et VITE_SUPABASE_ANON_KEY dans votre fichier .env.",
      };
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          data: {
            full_name: metadata.fullName.trim(),
            business_name: (metadata.businessName || '').trim(),
            business_type: (metadata.businessType || '').trim(),
          },
        },
      });

      if (error) {
        return { user: null, error: this.formatAuthError(error.message) };
      }

      if (data.user) {
        // If an active session was created, ensure profile row exists in public.profiles
        if (data.session) {
          try {
            await supabase.from('profiles').upsert({
              id: data.user.id,
              email: data.user.email,
              full_name: metadata.fullName.trim(),
              business_name: (metadata.businessName || '').trim(),
              business_type: (metadata.businessType || '').trim(),
              updated_at: new Date().toISOString(),
            });
          } catch (e) {
            console.warn('Profile direct upsert error (handled by trigger):', e);
          }
        }

        const profile: UserProfile = {
          id: data.user.id,
          email: data.user.email || email,
          name: metadata.fullName.trim() || email.split('@')[0],
          businessName: metadata.businessName?.trim() || 'Mon Entreprise',
          businessType: metadata.businessType?.trim(),
          plan: 'free',
          createdAt: data.user.created_at || new Date().toISOString(),
        };

        const needsVerification = !data.session && Boolean(data.user && !data.user.confirmed_at);
        return { user: profile, needsEmailVerification: needsVerification };
      }

      return { user: null, error: "Impossible de créer l'utilisateur." };
    } catch (err: any) {
      return { user: null, error: err.message || 'Erreur lors de la création du compte.' };
    }
  },

  async signIn(email: string, password: string): Promise<AuthResult> {
    if (!this.isConfigured() || !supabase) {
      return {
        user: null,
        error: "Supabase n'est pas encore configuré. Renseignez VITE_SUPABASE_URL et VITE_SUPABASE_ANON_KEY dans votre fichier .env.",
      };
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) {
        return { user: null, error: this.formatAuthError(error.message) };
      }

      if (data.user) {
        // Fetch or hydrate profile from public.profiles
        const profile = await this.getProfile(data.user.id);
        const userProfile: UserProfile = {
          id: data.user.id,
          email: data.user.email || email,
          name: profile?.full_name || data.user.user_metadata?.full_name || email.split('@')[0],
          businessName: profile?.business_name || data.user.user_metadata?.business_name || 'Mon Entreprise',
          businessType: profile?.business_type || data.user.user_metadata?.business_type,
          plan: 'free',
          createdAt: data.user.created_at || new Date().toISOString(),
        };

        return { user: userProfile };
      }

      return { user: null, error: 'Identifiants invalides.' };
    } catch (err: any) {
      return { user: null, error: err.message || 'Erreur de connexion.' };
    }
  },

  async signOut(): Promise<{ error?: string }> {
    if (!this.isConfigured() || !supabase) {
      return {};
    }
    try {
      const { error } = await supabase.auth.signOut();
      if (error) return { error: error.message };
      return {};
    } catch (e: any) {
      return { error: e.message };
    }
  },

  async resetPasswordForEmail(email: string): Promise<{ error?: string; success?: boolean }> {
    if (!this.isConfigured() || !supabase) {
      return {
        error: "Supabase n'est pas configuré. Veuillez définir les variables d'environnement.",
      };
    }

    try {
      const redirectUrl = `${window.location.origin}/reset-password`;
      const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
        redirectTo: redirectUrl,
      });

      if (error) {
        return { error: this.formatAuthError(error.message) };
      }
      return { success: true };
    } catch (err: any) {
      return { error: err.message || 'Erreur lors de la demande de réinitialisation.' };
    }
  },

  async updatePassword(newPassword: string): Promise<{ error?: string; success?: boolean }> {
    if (!this.isConfigured() || !supabase) {
      return { error: "Supabase n'est pas configuré." };
    }

    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) {
        return { error: this.formatAuthError(error.message) };
      }
      return { success: true };
    } catch (err: any) {
      return { error: err.message || 'Erreur lors de la mise à jour du mot de passe.' };
    }
  },

  async getCurrentSessionUser(): Promise<UserProfile | null> {
    if (!this.isConfigured() || !supabase) {
      return null;
    }

    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error || !session || !session.user) {
        return null;
      }

      const user = session.user;
      const profile = await this.getProfile(user.id);

      return {
        id: user.id,
        email: user.email || '',
        name: profile?.full_name || user.user_metadata?.full_name || user.email?.split('@')[0] || 'Utilisateur',
        businessName: profile?.business_name || user.user_metadata?.business_name || 'Mon Entreprise',
        businessType: profile?.business_type || user.user_metadata?.business_type,
        plan: 'free',
        createdAt: user.created_at || new Date().toISOString(),
      };
    } catch (e) {
      console.warn('Error fetching Supabase session:', e);
      return null;
    }
  },

  onAuthStateChange(callback: (user: UserProfile | null) => void) {
    if (!this.isConfigured() || !supabase) {
      return { unsubscribe: () => {} };
    }

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session && session.user) {
        const user = session.user;
        const profile = await this.getProfile(user.id);
        const userProfile: UserProfile = {
          id: user.id,
          email: user.email || '',
          name: profile?.full_name || user.user_metadata?.full_name || user.email?.split('@')[0] || 'Utilisateur',
          businessName: profile?.business_name || user.user_metadata?.business_name || 'Mon Entreprise',
          businessType: profile?.business_type || user.user_metadata?.business_type,
          plan: 'free',
          createdAt: user.created_at || new Date().toISOString(),
        };
        callback(userProfile);
      } else {
        callback(null);
      }
    });

    return {
      unsubscribe: () => subscription.unsubscribe(),
    };
  },

  // ==========================================
  // PROFILES
  // ==========================================

  async getProfile(userId: string): Promise<SupabaseProfile | null> {
    if (!this.isConfigured() || !supabase) return null;
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle();

      if (error) {
        console.warn('Error fetching profile:', error);
        return null;
      }
      return data;
    } catch {
      return null;
    }
  },

  async updateProfile(userId: string, updates: Partial<SupabaseProfile>): Promise<{ success: boolean; error?: string }> {
    if (!this.isConfigured() || !supabase) return { success: false, error: 'Supabase non configuré' };
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .eq('id', userId);

      if (error) return { success: false, error: error.message };
      return { success: true };
    } catch (e: any) {
      return { success: false, error: e.message };
    }
  },

  // ==========================================
  // CONTENT GENERATIONS (PERSISTENCE)
  // ==========================================

  async saveGeneration(userId: string, kit: BusinessKit): Promise<{ success: boolean; recordId?: string; error?: string }> {
    if (!this.isConfigured() || !supabase) {
      return { success: false, error: 'Supabase non configuré' };
    }

    try {
      const record = {
        user_id: userId,
        content_type: 'business_kit',
        business_name: kit.input.businessName,
        prompt: JSON.stringify(kit.input),
        generated_content: JSON.stringify(kit),
        created_at: kit.createdAt || new Date().toISOString(),
      };

      const { data, error } = await supabase
        .from('content_generations')
        .insert(record)
        .select('id')
        .single();

      if (error) {
        console.error('Error saving content generation to Supabase:', error);
        return { success: false, error: error.message };
      }

      return { success: true, recordId: data?.id };
    } catch (e: any) {
      console.error('Failed to save generation:', e);
      return { success: false, error: e.message };
    }
  },

  async getGenerations(userId: string): Promise<ContentGenerationRecord[]> {
    if (!this.isConfigured() || !supabase) {
      return [];
    }

    try {
      const { data, error } = await supabase
        .from('content_generations')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching generations:', error);
        return [];
      }

      return data || [];
    } catch (e) {
      console.error('Failed to fetch generations:', e);
      return [];
    }
  },

  async deleteGeneration(id: string, userId: string): Promise<{ success: boolean; error?: string }> {
    if (!this.isConfigured() || !supabase) {
      return { success: false, error: 'Supabase non configuré' };
    }

    try {
      const { error } = await supabase
        .from('content_generations')
        .delete()
        .eq('id', id)
        .eq('user_id', userId);

      if (error) {
        return { success: false, error: error.message };
      }
      return { success: true };
    } catch (e: any) {
      return { success: false, error: e.message };
    }
  },

  // Helper for human-readable error messages in French
  formatAuthError(message: string): string {
    if (!message) return 'Une erreur est survenue.';
    const lower = message.toLowerCase();

    if (lower.includes('invalid login credentials') || lower.includes('invalid_grant')) {
      return 'Adresse email ou mot de passe incorrect.';
    }
    if (lower.includes('user already registered') || lower.includes('already exists')) {
      return 'Un compte existe déjà avec cette adresse email.';
    }
    if (lower.includes('password should be at least')) {
      return 'Le mot de passe doit comporter au moins 6 caractères.';
    }
    if (lower.includes('email not confirmed')) {
      return 'Vérifie ta boîte mail pour confirmer ton adresse email avant de te connecter.';
    }
    if (lower.includes('rate limit')) {
      return 'Trop de tentatives consécutives. Merci de patienter quelques instants.';
    }
    if (lower.includes('invalid path')) {
      return "URL Supabase invalide : l'URL configurée doit être l'URL de base (ex: https://xxxx.supabase.co) sans chemin additionnel.";
    }
    return message;
  },
};
