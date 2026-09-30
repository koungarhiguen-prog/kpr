import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PageView, UserProfile } from '../types';
import { Sparkles, Menu, X, PlusCircle, LayoutDashboard, User, LogOut } from 'lucide-react';

interface NavbarProps {
  currentView: PageView;
  onNavigate: (view: PageView) => void;
  currentUser: UserProfile | null;
  onOpenAuth: () => void;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  currentUser,
  onOpenAuth,
  onLogout,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNav = (view: PageView) => {
    onNavigate(view);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#08090d]/85 border-b border-white/8 transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Zone 1: Brand Wordmark */}
        <button
          onClick={() => handleNav('landing')}
          className="flex items-center gap-2 text-left group cursor-pointer focus-visible:outline-none"
          aria-label="BizPilot AI Accueil"
        >
          <motion.div
            whileHover={{ scale: 1.08, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center shadow-lg shadow-indigo-500/20"
          >
            <Sparkles className="w-4 h-4 text-white" />
          </motion.div>
          <span className="font-display font-bold text-lg tracking-tight text-white group-hover:text-indigo-200 transition-colors">
            BizPilot<span className="text-indigo-400"> AI</span>
          </span>
        </button>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-neutral-300">
          {[
            { id: 'landing', label: 'Accueil' },
            { id: 'generator', label: 'Générateur' },
            { id: 'pricing', label: 'Tarifs' },
            { id: 'about', label: 'À propos' },
          ].map((item) => {
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNav(item.id as PageView)}
                className={`relative py-1 transition-colors hover:text-white cursor-pointer ${
                  isActive ? 'text-indigo-400 font-semibold' : ''
                }`}
              >
                <span>{item.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-500 rounded-full"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.3 }}
                  />
                )}
              </button>
            );
          })}
          <button
            onClick={() => {
              handleNav('landing');
              setTimeout(() => {
                const el = document.getElementById('how-it-works');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }}
            className="transition-colors hover:text-white cursor-pointer py-1"
          >
            Comment ça marche
          </button>
        </nav>

        {/* Zone 3: Primary Actions */}
        <div className="hidden md:flex items-center gap-3">
          {currentUser ? (
            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleNav('dashboard')}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border transition-all cursor-pointer ${
                  currentView === 'dashboard'
                    ? 'border-indigo-500/50 bg-indigo-500/10 text-indigo-300'
                    : 'border-white/10 text-neutral-300 hover:bg-white/5'
                }`}
              >
                <LayoutDashboard className="w-3.5 h-3.5 text-indigo-400" />
                <span className="font-semibold text-white truncate max-w-[120px]">
                  {currentUser.name || currentUser.email.split('@')[0]}
                </span>
              </motion.button>
              <button
                onClick={onLogout}
                className="flex items-center gap-1 text-xs text-neutral-400 hover:text-rose-400 px-2.5 py-1.5 rounded-lg hover:bg-white/5 cursor-pointer transition-colors"
                title="Se déconnecter"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Se déconnecter</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleNav('login')}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  currentView === 'login' ? 'text-indigo-400' : 'text-neutral-300 hover:text-white'
                }`}
              >
                <User className="w-3.5 h-3.5" />
                <span>Connexion</span>
              </button>
              <button
                onClick={() => handleNav('register')}
                className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-white/10 text-neutral-200 hover:text-white hover:bg-white/5 cursor-pointer transition-colors"
              >
                S'inscrire
              </button>
            </div>
          )}

          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => handleNav('generator')}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg shadow-lg shadow-indigo-600/25 transition-all cursor-pointer whitespace-nowrap"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Créer mon kit</span>
          </motion.button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex items-center gap-2 md:hidden">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => handleNav('generator')}
            className="px-3 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg cursor-pointer whitespace-nowrap"
          >
            Créer
          </motion.button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="min-h-[44px] min-w-[44px] flex items-center justify-center text-neutral-300 hover:text-white focus-visible:outline-none cursor-pointer"
            aria-label="Ouvrir le menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer with AnimatePresence */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-b border-white/10 bg-[#090a10] px-4 pt-3 pb-5 space-y-2 overflow-hidden"
          >
            <button
              onClick={() => handleNav('landing')}
              className={`w-full text-left py-2.5 px-3 rounded-lg text-sm font-medium ${
                currentView === 'landing' ? 'bg-indigo-500/15 text-indigo-300 font-semibold' : 'text-neutral-300'
              }`}
            >
              Accueil
            </button>
            <button
              onClick={() => handleNav('generator')}
              className={`w-full text-left py-2.5 px-3 rounded-lg text-sm font-medium ${
                currentView === 'generator' ? 'bg-indigo-500/15 text-indigo-300 font-semibold' : 'text-neutral-300'
              }`}
            >
              Générateur de Business Kit
            </button>
            <button
              onClick={() => handleNav('pricing')}
              className={`w-full text-left py-2.5 px-3 rounded-lg text-sm font-medium ${
                currentView === 'pricing' ? 'bg-indigo-500/15 text-indigo-300 font-semibold' : 'text-neutral-300'
              }`}
            >
              Tarifs
            </button>
            <button
              onClick={() => {
                handleNav('landing');
                setTimeout(() => {
                  const el = document.getElementById('how-it-works');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
              className="w-full text-left py-2.5 px-3 rounded-lg text-sm font-medium text-neutral-300"
            >
              Comment ça marche
            </button>
            <button
              onClick={() => handleNav('about')}
              className={`w-full text-left py-2.5 px-3 rounded-lg text-sm font-medium ${
                currentView === 'about' ? 'bg-indigo-500/15 text-indigo-300 font-semibold' : 'text-neutral-300'
              }`}
            >
              À propos
            </button>

            <div className="pt-2 border-t border-white/10 flex flex-col gap-2">
              {currentUser ? (
                <>
                  <button
                    onClick={() => handleNav('dashboard')}
                    className="w-full text-left py-2.5 px-3 rounded-lg text-sm font-medium bg-neutral-800/80 text-white flex items-center justify-between"
                  >
                    <span>Mon Dashboard ({currentUser.name})</span>
                    <LayoutDashboard className="w-4 h-4 text-indigo-400" />
                  </button>
                  <button
                    onClick={() => {
                      onLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full text-left py-2 px-3 text-xs text-red-400"
                  >
                    Se déconnecter
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    onOpenAuth();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-center py-2.5 px-3 rounded-lg text-sm font-medium border border-white/15 text-white"
                >
                  Se connecter / S’inscrire
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
