import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PageView } from '../types';
import { supabaseService } from '../services/supabaseService';
import { Sparkles, Lock, ArrowRight, AlertCircle, CheckCircle } from 'lucide-react';

interface ResetPasswordViewProps {
  onNavigate: (view: PageView) => void;
}

export const ResetPasswordView: React.FC<ResetPasswordViewProps> = ({ onNavigate }) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (newPassword.length < 6) {
      setError('Le mot de passe doit comporter au moins 6 caractères.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Les deux mots de passe ne correspondent pas.');
      return;
    }

    setLoading(true);
    const result = await supabaseService.updatePassword(newPassword);
    setLoading(false);

    if (result.error) {
      setError(result.error);
    } else {
      setSuccess(true);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md rounded-3xl p-6 sm:p-8 bg-[#0d0f17] border border-white/10 shadow-2xl space-y-6 glow-card"
      >
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center mx-auto text-indigo-400">
            <Lock className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-display font-extrabold text-white tracking-tight">
            Nouveau mot de passe
          </h1>
          <p className="text-xs text-neutral-400">
            Définis un mot de passe sécurisé pour ton compte BizPilot AI.
          </p>
        </div>

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

          {success && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-300 space-y-2"
            >
              <div className="flex items-center gap-2 font-bold text-white">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>Mot de passe mis à jour avec succès !</span>
              </div>
              <p className="text-neutral-300 text-[11px] leading-relaxed">
                Tu peux maintenant te connecter avec tes nouveaux identifiants.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {!success ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-neutral-300 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-indigo-400" />
                <span>Nouveau mot de passe</span>
              </label>
              <input
                type="password"
                required
                minLength={6}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full h-11 px-3.5 rounded-xl bg-neutral-900 border border-white/10 text-white text-xs placeholder:text-neutral-600 focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-neutral-300 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-indigo-400" />
                <span>Confirmer le mot de passe</span>
              </label>
              <input
                type="password"
                required
                minLength={6}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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
              <span>{loading ? 'Mise à jour...' : 'Enregistrer le nouveau mot de passe'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </motion.button>
          </form>
        ) : (
          <div className="pt-2">
            <button
              onClick={() => onNavigate('login')}
              className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold cursor-pointer"
            >
              Se connecter maintenant
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
};
