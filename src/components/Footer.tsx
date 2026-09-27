import React, { useState } from 'react';
import { PageView } from '../types';
import { Sparkles, ShieldCheck, Heart, X, Check } from 'lucide-react';

interface FooterProps {
  onNavigate: (view: PageView) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [activeModal, setActiveModal] = useState<{ title: string; content: string } | null>(null);

  return (
    <footer className="w-full border-t border-white/8 bg-[#06070a] text-neutral-400 py-12 px-4 sm:px-6 relative">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center">
                <Sparkles className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="font-display font-bold text-lg text-white">BizPilot AI</span>
            </div>
            <p className="text-sm text-neutral-400 max-w-sm">
              Ton business. Ton contenu. Généré en quelques secondes.
            </p>
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs sm:text-sm text-neutral-300">
            <button
              onClick={() => onNavigate('landing')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Accueil
            </button>
            <button
              onClick={() => onNavigate('generator')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Générateur
            </button>
            <button
              onClick={() => onNavigate('pricing')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Tarifs
            </button>
            <button
              onClick={() => onNavigate('about')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              À propos
            </button>
            <span className="text-neutral-600">·</span>
            <button
              onClick={() =>
                setActiveModal({
                  title: 'Contact & Support',
                  content:
                    'Notre équipe est disponible par email à contact@bizpilot.ai. Nous répondons à toutes les demandes sous 24h ouvrées.',
                })
              }
              className="hover:text-white transition-colors cursor-pointer"
            >
              Contact
            </button>
            <button
              onClick={() =>
                setActiveModal({
                  title: 'Politique de Confidentialité',
                  content:
                    'En V1, aucune donnée nominative n’est revendue. Vos Business Kits et préférences restent enregistrés localement dans votre navigateur ou transmis de façon chiffrée lors des requêtes au serveur.',
                })
              }
              className="hover:text-white transition-colors cursor-pointer"
            >
              Confidentialité
            </button>
            <button
              onClick={() =>
                setActiveModal({
                  title: 'Conditions d’Utilisation',
                  content:
                    'BizPilot AI génère des suggestions éditoriales, des accroches et des textes marketing libres de droits que vous pouvez adapter, copier et publier pour votre activité professionnelle.',
                })
              }
              className="hover:text-white transition-colors cursor-pointer"
            >
              Conditions
            </button>
          </div>
        </div>

        <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Moteur local intelligent V1 · 0 API payante requise · Transparence garantie</span>
          </div>

          <div className="flex items-center gap-1">
            <span>© 2026 BizPilot AI · Fait avec</span>
            <Heart className="w-3 h-3 text-red-500 fill-red-500 inline" />
            <span>pour les entrepreneurs d’action</span>
          </div>
        </div>
      </div>

      {/* In-app modal replacing window.alert */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-md rounded-2xl p-6 bg-[#0f1118] border border-white/10 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white font-display">{activeModal.title}</h3>
              <button
                onClick={() => setActiveModal(null)}
                className="p-1 rounded-lg text-neutral-400 hover:text-white cursor-pointer"
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
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold cursor-pointer"
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
