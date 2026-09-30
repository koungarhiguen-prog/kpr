import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PageView, UserProfile, BusinessActivity } from '../types';
import { supabaseService } from '../services/supabaseService';
import { Sparkles, Mail, Lock, User, Building, Store, ArrowRight, AlertCircle, CheckCircle } from 'lucide-react';

interface RegisterViewProps {
  onNavigate: (view: PageView) => void;
  onAuthSuccess: (user: UserProfile) => void;
}

const ACTIVITIES: BusinessActivity[] = [
  'Restaurant',
  'Coiffeur / Barbier',
  'Boutique de vêtements',
  'Beauté',
  'Photographe',
  'Réparation téléphone',
  'Informaticien',
  'Professeur',
  'Coach',
  'Freelance',
  'Autre',
];

export const RegisterView: React.FC<RegisterViewProps> = ({ onNavigate, onAuthSuccess }) => {
  const [fullName, setFullName] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [businessType, setBusinessType] = useState<BusinessActivity>('Restaurant');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successNotice, setSuccessNotice] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessNotice(null);

    if (password.length < 6) {
      setError('Le mot de passe doit comporter au moins 6 caractères.');
      return;
    }

    setLoading(true);

    const result = await supabaseService.signUp(email, password, {
      fullName,
      businessName,
      businessType,
    });

    setLoading(false);

    if (result.error) {
      setError(result.error);
      return;
    }

    if (result.needsEmailVerification) {
      setSuccessNotice('Ton compte a été créé avec succès ! Vérifie ta boîte mail pour confirmer ton adresse avant de te connecter.');
      return;
    }

    if (result.user) {
      onAuthSuccess(result.user);
      onNavigate('dashboard');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md rounded-3xl p-6 sm:p-8 bg-[#0d0f17] border border-white/10 shadow-2xl space-y-6 glow-card"
      >
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center mx-auto shadow-lg shadow-indigo-600/30">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-display font-extrabold text-white tracking-tight">
            Créer un compte BizPilot AI
          </h1>
          <p className="text-xs text-neutral-400">
            Sauvegarde automatiquement tes générations de contenu et personnalise ton profil.
          </p>
        </div>

        {/* Notices */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-xs text-rose-300 flex items-center gap-2"
            >
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>{error}</span>
            </motion.div>
          )}

          {successNotice && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-300 flex items-start gap-2"
            >
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div className="space-y-2">
                <span>{successNotice}</span>
                <button
                  onClick={() => onNavigate('login')}
                  className="block text-white font-bold underline cursor-pointer"
                >
                  Aller à la page de connexion
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-neutral-300 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-indigo-400" />
              <span>Ton prénom et nom <span className="text-indigo-400">*</span></span>
            </label>
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Ex : Koffi Mensah, Marie Claire..."
              className="w-full h-11 px-3.5 rounded-xl bg-neutral-900 border border-white/10 text-white text-xs placeholder:text-neutral-600 focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-neutral-300 flex items-center gap-1.5">
                <Building className="w-3.5 h-3.5 text-indigo-400" />
                <span>Nom de l'activité</span>
              </label>
              <input
                type="text"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                placeholder="Ex : Mama Food..."
                className="w-full h-11 px-3.5 rounded-xl bg-neutral-900 border border-white/10 text-white text-xs placeholder:text-neutral-600 focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-neutral-300 flex items-center gap-1.5">
                <Store className="w-3.5 h-3.5 text-indigo-400" />
                <span>Type d'activité</span>
              </label>
              <select
                value={businessType}
                onChange={(e) => setBusinessType(e.target.value as BusinessActivity)}
                className="w-full h-11 px-3 rounded-xl bg-neutral-900 border border-white/10 text-white text-xs focus:outline-none focus:border-indigo-500 transition-colors cursor-pointer"
              >
                {ACTIVITIES.map((act) => (
                  <option key={act} value={act}>
                    {act}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-neutral-300 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-indigo-400" />
              <span>Adresse email <span className="text-indigo-400">*</span></span>
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ton-email@exemple.com"
              className="w-full h-11 px-3.5 rounded-xl bg-neutral-900 border border-white/10 text-white text-xs placeholder:text-neutral-600 focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-neutral-300 flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-indigo-400" />
              <span>Mot de passe (minimum 6 caractères) <span className="text-indigo-400">*</span></span>
            </label>
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full h-11 px-3.5 rounded-xl bg-neutral-900 border border-white/10 text-white text-xs placeholder:text-neutral-600 focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/30 transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50 mt-3"
          >
            <span>{loading ? 'Création en cours...' : 'Créer mon compte'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </motion.button>
        </form>

        <div className="pt-4 border-t border-white/5 text-center">
          <p className="text-xs text-neutral-400">
            Tu as déjà un compte ?{' '}
            <button
              onClick={() => onNavigate('login')}
              className="text-indigo-400 hover:text-indigo-300 font-bold cursor-pointer underline"
            >
              Se connecter
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
};
