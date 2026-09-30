import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PageView } from '../types';
import { supabaseService } from '../services/supabaseService';
import { Sparkles, Mail, ArrowRight, ArrowLeft, AlertCircle, CheckCircle } from 'lucide-react';

interface ForgotPasswordViewProps {
  onNavigate: (view: PageView) => void;
}

export const ForgotPasswordView: React.FC<ForgotPasswordViewProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const result = await supabaseService.resetPasswordForEmail(email);
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
            <Mail className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-display font-extrabold text-white tracking-tight">
            Mot de passe oublié ?
          </h1>
          <p className="text-xs text-neutral-400">
            Entre ton adresse email. Nous t'enverrons un lien sécurisé pour réinitialiser ton mot de passe.
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
                <span>Email de réinitialisation envoyé !</span>
              </div>
              <p className="text-neutral-300 text-[11px] leading-relaxed">
                Vérifie ta boîte mail (et tes spams). Clique sur le lien reçu pour définir ton nouveau mot de passe.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {!success ? (
          <form onSubmit={handleSubmit} className="space-y-4">
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

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/30 transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <span>{loading ? 'Envoi en cours...' : 'Envoyer le lien de réinitialisation'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </motion.button>
          </form>
        ) : (
          <div className="pt-2">
            <button
              onClick={() => onNavigate('login')}
              className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-bold cursor-pointer"
            >
              Retour à la page de connexion
            </button>
          </div>
        )}

        <div className="pt-2 text-center">
          <button
            onClick={() => onNavigate('login')}
            className="inline-flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Retour à la connexion</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};
