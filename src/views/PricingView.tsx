import React, { useState } from 'react';
import { PageView } from '../types';
import { Check, Sparkles, ShieldAlert, ArrowRight, Wallet } from 'lucide-react';

interface PricingViewProps {
  onNavigate: (view: PageView) => void;
}

export const PricingView: React.FC<PricingViewProps> = ({ onNavigate }) => {
  const [currency, setCurrency] = useState<'FCFA' | 'EUR' | 'USD'>('FCFA');

  const [pricingNotice, setPricingNotice] = useState<string | null>(null);

  const prices = {
    free: { FCFA: '0 FCFA', EUR: '0 €', USD: '$0' },
    pro: { FCFA: '2 000 FCFA', EUR: '3.50 €', USD: '$3.50' },
    business: { FCFA: '5 000 FCFA', EUR: '8.00 €', USD: '$8.50' },
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-16 space-y-12">
      {/* Title */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-semibold text-indigo-400">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Tarifs Transparents & Accessibles</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
          Un plan adapté à chaque étape de ton business
        </h1>
        <p className="text-sm sm:text-base text-neutral-400">
          Démarre gratuitement aujourd’hui. Passe au niveau supérieur quand tu es prêt.
        </p>

        {/* Currency toggle */}
        <div className="pt-2 flex items-center justify-center gap-1">
          {(['FCFA', 'EUR', 'USD'] as const).map((curr) => (
            <button
              key={curr}
              onClick={() => setCurrency(curr)}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                currency === curr
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-neutral-400 hover:text-white bg-white/5'
              }`}
            >
              {curr}
            </button>
          ))}
        </div>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
        {/* FREE CARD */}
        <div className="rounded-3xl p-6 sm:p-8 bg-[#0d0f17] border border-white/10 flex flex-col justify-between space-y-6 hover:border-white/20 transition-all">
          <div className="space-y-4">
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-white">FREE</h3>
              <p className="text-xs text-neutral-400">Pour tester et valider ton premier contenu.</p>
            </div>

            <div className="space-y-1">
              <div className="text-3xl font-display font-extrabold text-white">
                {prices.free[currency]}
              </div>
              <span className="text-xs text-neutral-500">Pour toujours · Sans carte bancaire</span>
            </div>

            <div className="pt-4 border-t border-white/5 space-y-3 text-xs text-neutral-300">
              <div className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>1 Business Kit complet</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>10 idées de posts personnalisés</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>5 idées de Reels avec scripts</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Messages clients WhatsApp</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>7 jours de calendrier de contenu</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => onNavigate('generator')}
            className="w-full py-3 px-4 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-bold transition-all cursor-pointer"
          >
            Commencer gratuitement
          </button>
        </div>

        {/* PRO CARD (POPULAIRE) */}
        <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-b from-indigo-950/40 via-[#0e101a] to-[#0c0d16] border-2 border-indigo-500/50 flex flex-col justify-between space-y-6 relative shadow-xl glow-indigo">
          {/* Badge Populaire */}
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-indigo-600 text-[11px] font-extrabold text-white tracking-wider uppercase shadow-md">
            POPULAIRE
          </div>

          <div className="space-y-4 pt-2">
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-white flex items-center justify-between">
                <span>PRO</span>
                <span className="text-[11px] font-normal text-indigo-300">Mensuel ou à l’unité</span>
              </h3>
              <p className="text-xs text-neutral-300">Pour les commerçants qui publient régulièrement.</p>
            </div>

            <div className="space-y-1">
              <div className="text-3xl font-display font-extrabold text-white">
                {prices.pro[currency]}
              </div>
              <span className="text-xs text-neutral-400">Accès mensuel illimité</span>
            </div>

            <div className="pt-4 border-t border-white/10 space-y-3 text-xs text-neutral-200">
              <div className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-indigo-400 shrink-0" />
                <span className="font-semibold text-white">Business Kits avancés & illimités</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>30 jours de calendrier de contenu</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>Davantage de formats & captions</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>Campagnes publicitaires complètes</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>Calendrier complet & exports PDF</span>
              </div>
            </div>
          </div>

          <button
            onClick={() =>
              setPricingNotice(
                'Plan PRO : En cours de déploiement pour la V2 avec intégration Mobile Money et Carte Bancaire. Vous pouvez tester le générateur gratuit dès maintenant !'
              )
            }
            className="w-full py-3 px-4 rounded-xl bg-indigo-600/80 hover:bg-indigo-600 text-white text-xs font-bold transition-all cursor-pointer shadow-lg shadow-indigo-600/30"
          >
            Bientôt disponible
          </button>
        </div>

        {/* BUSINESS CARD */}
        <div className="rounded-3xl p-6 sm:p-8 bg-[#0d0f17] border border-white/10 flex flex-col justify-between space-y-6 hover:border-white/20 transition-all">
          <div className="space-y-4">
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-white">BUSINESS</h3>
              <p className="text-xs text-neutral-400">Pour multi-marques, agences et créateurs pro.</p>
            </div>

            <div className="space-y-1">
              <div className="text-3xl font-display font-extrabold text-white">
                {prices.business[currency]}
              </div>
              <span className="text-xs text-neutral-500">Pour équipes et multi-boutiques</span>
            </div>

            <div className="pt-4 border-t border-white/5 space-y-3 text-xs text-neutral-300">
              <div className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Plusieurs activités & marques</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Kits avancés avec variations infinies</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Génération de mini-page business</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Outils marketing & tunnels de vente</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Support prioritaire WhatsApp</span>
              </div>
            </div>
          </div>

          <button
            onClick={() =>
              setPricingNotice(
                'Plan BUSINESS : En cours de déploiement pour la V2 avec intégration multi-comptes. Vous pouvez tester le générateur gratuit dès maintenant !'
              )
            }
            className="w-full py-3 px-4 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-bold transition-all cursor-pointer"
          >
            Bientôt disponible
          </button>
        </div>
      </div>

      {/* Pricing Notice Banner */}
      {pricingNotice && (
        <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 flex items-center justify-between gap-3 text-xs text-indigo-200 max-w-3xl mx-auto animate-in fade-in">
          <span>{pricingNotice}</span>
          <button
            onClick={() => setPricingNotice(null)}
            className="px-3 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold cursor-pointer shrink-0"
          >
            Compris
          </button>
        </div>
      )}

      {/* Honest monetization statement */}
      <div className="p-6 rounded-2xl bg-neutral-900/40 border border-white/5 space-y-3 max-w-3xl mx-auto text-xs text-neutral-400">
        <div className="flex items-center gap-2 text-neutral-300 font-semibold text-sm">
          <Wallet className="w-4 h-4 text-indigo-400" />
          <span>Note de transparence sur les paiements</span>
        </div>
        <p className="leading-relaxed">
          BizPilot AI démarre avec 0 budget dans cette V1 afin de valider l'utilité du produit directement auprès de vrais entrepreneurs. Aucun faux paiement n'est exécuté : les paiements par <strong>Mobile Money (MTN, Airtel, Orange, Wave)</strong> et <strong>Carte Bancaire</strong> seront activés lors du lancement de la V2.
        </p>
      </div>
    </div>
  );
};
