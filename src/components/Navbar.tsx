import React, { useState } from 'react';
import { PageView, UserProfile } from '../types';
import { Sparkles, Menu, X, PlusCircle, LayoutDashboard, User } from 'lucide-react';

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
        {/* Zone 1: Single text wordmark with subtle accent dot */}
        <button
          onClick={() => handleNav('landing')}
          className="flex items-center gap-2 text-left group cursor-pointer focus-visible:outline-none"
          aria-label="BizPilot AI Accueil"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="font-display font-bold text-lg tracking-tight text-white group-hover:text-indigo-200 transition-colors">
            BizPilot<span className="text-indigo-400"> AI</span>
          </span>
        </button>

        {/* Zone 2: Navigation Links (single-line, clean text with hover states) */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-neutral-300">
          <button
            onClick={() => handleNav('landing')}
            className={`transition-colors hover:text-white cursor-pointer ${
              currentView === 'landing' ? 'text-indigo-400 font-semibold' : ''
            }`}
          >
            Accueil
          </button>
          <button
            onClick={() => handleNav('generator')}
            className={`transition-colors hover:text-white cursor-pointer ${
              currentView === 'generator' ? 'text-indigo-400 font-semibold' : ''
            }`}
          >
            Générateur
          </button>
          <button
            onClick={() => handleNav('pricing')}
            className={`transition-colors hover:text-white cursor-pointer ${
              currentView === 'pricing' ? 'text-indigo-400 font-semibold' : ''
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
            className="transition-colors hover:text-white cursor-pointer"
          >
            Comment ça marche
          </button>
          <button
            onClick={() => handleNav('about')}
            className={`transition-colors hover:text-white cursor-pointer ${
              currentView === 'about' ? 'text-indigo-400 font-semibold' : ''
            }`}
          >
            À propos
          </button>
        </nav>

        {/* Zone 3: Primary Actions */}
        <div className="hidden md:flex items-center gap-3">
          {currentUser ? (
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleNav('dashboard')}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border transition-all cursor-pointer ${
                  currentView === 'dashboard'
                    ? 'border-indigo-500/50 bg-indigo-500/10 text-indigo-300'
                    : 'border-white/10 text-neutral-300 hover:bg-white/5'
                }`}
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                <span>Dashboard</span>
              </button>
              <button
                onClick={onLogout}
                className="text-xs text-neutral-400 hover:text-neutral-200 px-2 py-1.5 cursor-pointer"
                title="Déconnexion"
              >
                Quitter
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-neutral-300 hover:text-white cursor-pointer"
            >
              <User className="w-3.5 h-3.5" />
              <span>Connexion</span>
            </button>
          )}

          <button
            onClick={() => handleNav('generator')}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg shadow-lg shadow-indigo-600/25 active:scale-95 transition-all cursor-pointer whitespace-nowrap"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Créer mon kit</span>
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={() => handleNav('generator')}
            className="px-3 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg cursor-pointer whitespace-nowrap"
          >
            Créer
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="min-h-[44px] min-w-[44px] flex items-center justify-center text-neutral-300 hover:text-white focus-visible:outline-none cursor-pointer"
            aria-label="Ouvrir le menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-white/10 bg-[#090a10] px-4 pt-3 pb-5 space-y-2 animate-in fade-in slide-in-from-top-2 duration-150">
          <button
            onClick={() => handleNav('landing')}
            className={`w-full text-left py-2.5 px-3 rounded-lg text-sm font-medium ${
              currentView === 'landing' ? 'bg-indigo-500/15 text-indigo-300' : 'text-neutral-300'
            }`}
          >
            Accueil
          </button>
          <button
            onClick={() => handleNav('generator')}
            className={`w-full text-left py-2.5 px-3 rounded-lg text-sm font-medium ${
              currentView === 'generator' ? 'bg-indigo-500/15 text-indigo-300' : 'text-neutral-300'
            }`}
          >
            Générateur de Business Kit
          </button>
          <button
            onClick={() => handleNav('pricing')}
            className={`w-full text-left py-2.5 px-3 rounded-lg text-sm font-medium ${
              currentView === 'pricing' ? 'bg-indigo-500/15 text-indigo-300' : 'text-neutral-300'
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
              currentView === 'about' ? 'bg-indigo-500/15 text-indigo-300' : 'text-neutral-300'
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
        </div>
      )}
    </header>
  );
};
