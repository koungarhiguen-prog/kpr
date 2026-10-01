import { BusinessKit, UserProfile, BusinessInput } from '../types';
import { generateLocalBusinessKit } from '../data/mockTemplates';

const STORAGE_KEYS = {
  KITS: 'bizpilot_kits_v1',
  CURRENT_USER: 'bizpilot_user_v1',
  GEN_COUNT: 'bizpilot_gen_count_v1',
  ACTIVE_KIT: 'bizpilot_active_kit_v1',
};

const DEFAULT_DEMO_INPUT: BusinessInput = {
  activity: 'Restaurant',
  businessName: 'Mama Food',
  description: 'Restaurant familial convivial spécialisé dans les plats faits maison avec des produits frais locaux et grillades savoureuses.',
  city: 'Pointe-Noire',
  goal: 'Augmenter les ventes',
  tone: 'Dynamique',
  mainOffer: 'Grillades au feu de bois, plats traditionnels du jour et formules midi express',
  targetAudience: 'Employés de bureau le midi, familles et gourmands de Pointe-Noire',
  differentiator: 'Cuisson authentique à la braise et service rapide en moins de 15 minutes',
};

export const storageService = {
  getKits(): BusinessKit[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.KITS);
      if (!data) {
        // Preload an initial sample kit for Mama Food as mentioned in prompt
        const initialKit = generateLocalBusinessKit(DEFAULT_DEMO_INPUT);
        localStorage.setItem(STORAGE_KEYS.KITS, JSON.stringify([initialKit]));
        return [initialKit];
      }
      return JSON.parse(data);
    } catch {
      return [];
    }
  },

  saveKit(kit: BusinessKit): void {
    try {
      const kits = this.getKits();
      const existingIndex = kits.findIndex((k) => k.id === kit.id);
      if (existingIndex >= 0) {
        kits[existingIndex] = kit;
      } else {
        kits.unshift(kit);
      }
      localStorage.setItem(STORAGE_KEYS.KITS, JSON.stringify(kits));
      localStorage.setItem(STORAGE_KEYS.ACTIVE_KIT, JSON.stringify(kit));
      this.incrementGenCount();
    } catch (e) {
      console.error('Failed to save kit to localStorage', e);
    }
  },

  getKitById(id: string): BusinessKit | null {
    const kits = this.getKits();
    return kits.find((k) => k.id === id) || null;
  },

  getActiveKit(): BusinessKit | null {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.ACTIVE_KIT);
      if (data) {
        return JSON.parse(data);
      }
      const kits = this.getKits();
      return kits.length > 0 ? kits[0] : null;
    } catch {
      return null;
    }
  },

  setActiveKit(kit: BusinessKit): void {
    try {
      localStorage.setItem(STORAGE_KEYS.ACTIVE_KIT, JSON.stringify(kit));
    } catch (e) {
      console.error('Failed to set active kit', e);
    }
  },

  deleteKit(id: string): void {
    try {
      const kits = this.getKits().filter((k) => k.id !== id);
      localStorage.setItem(STORAGE_KEYS.KITS, JSON.stringify(kits));
      const active = this.getActiveKit();
      if (active && active.id === id) {
        localStorage.removeItem(STORAGE_KEYS.ACTIVE_KIT);
      }
    } catch (e) {
      console.error('Failed to delete kit', e);
    }
  },

  getGenCount(): number {
    try {
      const count = localStorage.getItem(STORAGE_KEYS.GEN_COUNT);
      return count ? parseInt(count, 10) : 0;
    } catch {
      return 0;
    }
  },

  incrementGenCount(): void {
    try {
      const current = this.getGenCount();
      localStorage.setItem(STORAGE_KEYS.GEN_COUNT, (current + 1).toString());
    } catch (e) {
      console.error('Failed to increment generation count', e);
    }
  },

  resetGenCount(): void {
    try {
      localStorage.setItem(STORAGE_KEYS.GEN_COUNT, '0');
    } catch (e) {
      console.error('Failed to reset generation count', e);
    }
  },

  // Free plan limit check: 1 free Business Kit allowed
  canGenerateFree(): boolean {
    const user = this.getCurrentUser();
    if (user && (user.plan === 'pro' || user.plan === 'business')) {
      return true;
    }
    // For free demo tier: 1 generation
    return this.getGenCount() < 1;
  },

  getCurrentUser(): UserProfile | null {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
      if (data) return JSON.parse(data);
      // Default guest state
      return null;
    } catch {
      return null;
    }
  },

  setCurrentUser(user: UserProfile | null): void {
    try {
      if (!user) {
        localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
      } else {
        localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
      }
    } catch (e) {
      console.error('Failed to set current user', e);
    }
  },
};
