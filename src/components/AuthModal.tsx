import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { UserProfile, PageView } from '../types';
import { supabaseService } from '../services/supabaseService';
import { storageService } from '../services/storageService';
import { Sparkles, X, User, Mail, Lock, Building, ArrowRight, AlertCircle, CheckCircle } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess: (user: UserProfile) => void;
  onNavigate?: (view: PageView) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onAuthSuccess,
  onNavigate,
}) => {
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setNotice(null);

    if (!email.trim()) return;

    setLoading(true);

    if (isRegister) {
      if (password.length < 6) {
        setLoading(false);
        setError('Le mot de passe doit comporter au moins 6 caractères.');
        return;
      }

      const res = await supabaseService.signUp(email, password, {
        fullName: name,
        businessName,
      });

      setLoading(false);

      if (res.error) {
        setError(res.error);
        return;
      }

      if (res.needsEmailVerification) {
        setNotice('Vérifie ta boîte mail pour confirmer ton adresse email avant de te connecter.');
        return;
      }

      if (res.user) {
        storageService.setCurrentUser(res.user);
        onAuthSuccess(res.user);
        onClose();
      }
    } else {
      const res = await supabaseService.signIn(email, password);
      setLoading(false);

      if (res.error) {
        setError(res.error);
        return;
      }

      if (res.user) {
        storageService.setCurrentUser(res.user);
        onAuthSuccess(res.user);
        onClose();
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 10 }}
        transition={{ type: 'spring', duration: 0.35, bounce: 0.15 }}
        className="relative w-full max-w-md rounded-3xl p-6 sm:p-8 bg-[#0e1018] border border-white/10 shadow-2xl space-y-6 glow-card"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/5 cursor-pointer transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="space-y-1.5 text-center">
          <motion.div
            whileHover={{ rotate: 10, scale: 1.05 }}
            className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center mx-auto shadow-lg shadow-indigo-600/30"
          >
            <Sparkles className="w-5 h-5 text-white" />
          </motion.div>
          <h3 className="text-xl font-display font-bold text-white">
            {isRegister ? 'Créer un compte BizPilot' : 'Connexion à BizPilot'}
          </h3>
          <p className="text-xs text-neutral-400">
            {isRegister
              ? 'Enregistre tes Business Kits sur Supabase et accède à ton dashboard.'
              : 'Retrouve tes contenus et ton historique de génération sécurisé.'}
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex p-1 bg-black/40 rounded-xl border border-white/5 relative">
          <button
            type="button"
            onClick={() => {
              setIsRegister(false);
              setError(null);
              setNotice(null);
            }}
            className={`relative flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              !isRegister ? 'text-white' : 'text-neutral-400 hover:text-white'
            }`}
          >
            {!isRegister && (
              <motion.div
                layoutId="activeAuthTab"
                className="absolute inset-0 bg-indigo-600 rounded-lg shadow-sm"
                transition={{ type: 'spring', bounce: 0.2, duration: 0.3 }}
              />
            )}
            <span className="relative z-10">Se connecter</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setIsRegister(true);
              setError(null);
              setNotice(null);
            }}
            className={`relative flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              isRegister ? 'text-white' : 'text-neutral-400 hover:text-white'
            }`}
          >
            {isRegister && (
              <motion.div
                layoutId="activeAuthTab"
                className="absolute inset-0 bg-indigo-600 rounded-lg shadow-sm"
                transition={{ type: 'spring', bounce: 0.2, duration: 0.3 }}
              />
            )}
            <span className="relative z-10">S’inscrire</span>
          </button>
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

          {notice && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-300 flex items-center gap-2"
            >
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{notice}</span>
            </motion.div>
          )}
        </AnimatePresence>

        <form onSubmit={handleSubmit} className="space-y-3.5">
          <AnimatePresence>
            {isRegister && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-3 overflow-hidden"
              >
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-neutral-300 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Ton prénom / nom</span>
                  </label>
                  <input
                    type="text"
                    required={isRegister}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ex : Koffi Mensah..."
                    className="w-full h-10 px-3 rounded-xl bg-neutral-900 border border-white/10 text-white text-xs placeholder:text-neutral-600 focus:outline-none focus:border-indigo-500 transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-neutral-300 flex items-center gap-1.5">
                    <Building className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Nom de ton activité</span>
                  </label>
                  <input
                    type="text"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    placeholder="Ex : Mama Food..."
                    className="w-full h-10 px-3 rounded-xl bg-neutral-900 border border-white/10 text-white text-xs placeholder:text-neutral-600 focus:outline-none focus:border-indigo-500 transition-colors"
                  />
                </div>
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
              className="w-full h-10 px-3 rounded-xl bg-neutral-900 border border-white/10 text-white text-xs placeholder:text-neutral-600 focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-neutral-300 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-indigo-400" />
                <span>Mot de passe</span>
              </label>
              {!isRegister && onNavigate && (
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onNavigate('forgot-password');
                  }}
                  className="text-[11px] text-indigo-400 hover:text-indigo-300 cursor-pointer"
                >
                  Mot de passe oublié ?
                </button>
              )}
            </div>
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full h-10 px-3 rounded-xl bg-neutral-900 border border-white/10 text-white text-xs placeholder:text-neutral-600 focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/30 transition-all cursor-pointer flex items-center justify-center gap-1.5 mt-2 disabled:opacity-50"
          >
            <span>
              {loading
                ? 'Chargement...'
                : isRegister
                ? 'Créer mon compte'
                : 'Accéder à mon espace'}
            </span>
            <ArrowRight className="w-3.5 h-3.5" />
          </motion.button>
        </form>

        <div className="pt-2 border-t border-white/5 text-center">
          <p className="text-[11px] text-neutral-500">
            Authentification sécurisée avec Supabase Auth (RLS actif)
          </p>
        </div>
      </motion.div>
    </div>
  );
};
