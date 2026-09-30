import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PageView, UserProfile } from '../types';
import { supabaseService } from '../services/supabaseService';
import { Sparkles, Mail, Lock, ArrowRight, AlertCircle, CheckCircle, Database } from 'lucide-react';

interface LoginViewProps {
  onNavigate: (view: PageView) => void;
  onAuthSuccess: (user: UserProfile) => void;
}

export const LoginView: React.FC<LoginViewProps> = ({ onNavigate, onAuthSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const result = await supabaseService.signIn(email, password);
    setLoading(false);

    if (result.error) {
      setError(result.error);
      return;
    }

    if (result.user) {
      onAuthSuccess(result.user);
      onNavigate('dashboard');
    }
  };

  const isConfigured = supabaseService.isConfigured();

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-12">
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
            Connexion à BizPilot AI
          </h1>
          <p className="text-xs text-neutral-400">
            Retrouve tes Business Kits et ton historique de génération sécurisé.
          </p>
        </div>

        {/* Supabase status indicator */}
        {!isConfigured && (
          <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200 flex items-start gap-2.5">
            <Database className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-semibold text-white">Supabase en attente de configuration :</span>
              <p className="text-neutral-300 text-[11px] leading-relaxed">
                Renseigne <code className="text-amber-300">VITE_SUPABASE_URL</code> et <code className="text-amber-300">VITE_SUPABASE_ANON_KEY</code> pour connecter ton projet Supabase réel.
              </p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
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
          </AnimatePresence>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-neutral-300 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-indigo-400" />
              <span>Adresse email</span>
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
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-neutral-300 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-indigo-400" />
                <span>Mot de passe</span>
              </label>
              <button
                type="button"
                onClick={() => onNavigate('forgot-password')}
                className="text-[11px] text-indigo-400 hover:text-indigo-300 font-medium cursor-pointer"
              >
                Mot de passe oublié ?
              </button>
            </div>
            <input
              type="password"
              required
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
            className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/30 transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50 mt-2"
          >
            <span>{loading ? 'Connexion en cours...' : 'Se connecter'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </motion.button>
        </form>

        <div className="pt-4 border-t border-white/5 text-center space-y-2">
          <p className="text-xs text-neutral-400">
            Tu n'as pas encore de compte ?{' '}
            <button
              onClick={() => onNavigate('register')}
              className="text-indigo-400 hover:text-indigo-300 font-bold cursor-pointer underline"
            >
              Créer un compte
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
};
