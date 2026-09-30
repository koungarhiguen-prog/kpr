import React, { useState } from 'react';
import { PageView } from '../types';
import { Sparkles, ShieldCheck, Heart, X, ArrowUpRight } from 'lucide-react';

interface FooterProps {
  onNavigate: (view: PageView) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [activeModal, setActiveModal] = useState<{ title: string; content: string } | null>(null);

  const currentYear = 2026;

  return (
    <footer className="w-full border-t border-white/10 bg-[#06070a] text-neutral-400 pt-12 pb-8 px-4 sm:px-6 relative">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-3 text-center md:text-left">
            <div className="inline-flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center shadow-md shadow-indigo-600/30">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="font-display font-extrabold text-xl text-white tracking-tight">
                BizPilot AI
              </span>
            </div>
            <p className="text-xs sm:text-sm text-neutral-400 max-w-sm mx-auto md:mx-0 leading-relaxed font-sans">
              La plateforme marketing IA pensée pour propulser les commerçants, artisans et entrepreneurs locaux.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] text-neutral-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Système opérationnel & IA active</span>
            </div>
          </div>

          {/* Quick Nav Links */}
          <div className="md:col-span-4 space-y-2 text-center md:text-left">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-display">
              Navigation
            </h4>
            <div className="flex flex-wrap justify-center md:justify-start gap-x-5 gap-y-2.5 text-xs text-neutral-300 pt-1">
              <button
                onClick={() => onNavigate('landing')}
                className="hover:text-indigo-400 transition-colors cursor-pointer py-1"
              >
                Accueil
              </button>
              <button
                onClick={() => onNavigate('generator')}
                className="hover:text-indigo-400 transition-colors cursor-pointer py-1"
              >
                Générateur
              </button>
              <button
                onClick={() => onNavigate('pricing')}
                className="hover:text-indigo-400 transition-colors cursor-pointer py-1"
              >
                Tarifs
              </button>
              <button
                onClick={() => onNavigate('about')}
                className="hover:text-indigo-400 transition-colors cursor-pointer py-1"
              >
                À propos
              </button>
              <button
                onClick={() => onNavigate('dashboard')}
                className="hover:text-indigo-400 transition-colors cursor-pointer py-1"
              >
                Dashboard
              </button>
            </div>
          </div>

          {/* Legal & Support Links */}
          <div className="md:col-span-3 space-y-2 text-center md:text-left">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-display">
              Légal & Aide
            </h4>
            <div className="flex flex-wrap justify-center md:justify-start gap-x-5 gap-y-2.5 text-xs text-neutral-300 pt-1">
              <button
                onClick={() =>
                  setActiveModal({
                    title: 'Contact & Support',
                    content:
                      'Notre équipe est à votre écoute pour vous accompagner. Contactez-nous à support@bizpilot.ai. Nous répondons à toutes les demandes sous 24h ouvrées.',
                  })
                }
                className="hover:text-indigo-400 transition-colors cursor-pointer py-1 inline-flex items-center gap-1"
              >
                <span>Support</span>
                <ArrowUpRight className="w-3 h-3 text-neutral-500" />
              </button>
              <button
                onClick={() =>
                  setActiveModal({
                    title: 'Politique de Confidentialité',
                    content:
                      'La protection de vos données professionnelles est notre priorité absolue. Vos Business Kits, informations d’entreprise et identifiants sont protégés par chiffrement et sécurisés via notre base de données Supabase (RLS). Aucune donnée n’est revendue.',
                  })
                }
                className="hover:text-indigo-400 transition-colors cursor-pointer py-1"
              >
                Confidentialité
              </button>
              <button
                onClick={() =>
                  setActiveModal({
                    title: 'Conditions d’Utilisation',
                    content:
                      'BizPilot AI génère des contenus marketing, scripts vidéo et textes libres de droits que vous pouvez adapter et diffuser librement pour la promotion de votre entreprise.',
                  })
                }
                className="hover:text-indigo-400 transition-colors cursor-pointer py-1"
              >
                Conditions
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Clean, Fully Responsive, Perfectly Aligned on Mobile and Desktop */}
        <div className="pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-neutral-400 font-sans">
          {/* Security / Technology Note */}
          <div className="flex items-center justify-center gap-2 text-center">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="text-[11px] sm:text-xs text-neutral-400">
              Plateforme SaaS sécurisée · Chiffrement Supabase RLS
            </span>
          </div>

          {/* Copyright & Made with Love */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 text-center text-[11px] sm:text-xs">
            <span className="text-neutral-400">© {currentYear} BizPilot AI.</span>
            <span className="text-neutral-500 hidden sm:inline">·</span>
            <span className="inline-flex items-center gap-1 text-neutral-300">
              <span>Créé avec</span>
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline-block animate-pulse" />
              <span>pour les entrepreneurs d'Afrique et d'ailleurs.</span>
            </span>
          </div>
        </div>
      </div>

      {/* Accessible In-App Modal */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-md rounded-2xl p-6 bg-[#0f1118] border border-white/10 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <h3 className="text-base font-bold text-white font-display">{activeModal.title}</h3>
              <button
                onClick={() => setActiveModal(null)}
                className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/5 cursor-pointer transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-sans">
              {activeModal.content}
            </p>
            <div className="pt-2 text-right">
              <button
                onClick={() => setActiveModal(null)}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold cursor-pointer shadow-md transition-all"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
