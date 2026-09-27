import React from 'react';
import { PageView } from '../types';
import { Sparkles, Target, Shield, HeartHandshake, ArrowRight, CheckCircle2 } from 'lucide-react';

interface AboutViewProps {
  onNavigate: (view: PageView) => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-16 space-y-12">
      {/* Title */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-semibold text-indigo-400">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Notre Vision</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
          À propos de BizPilot AI
        </h1>
        <p className="text-sm sm:text-base text-neutral-400 max-w-xl mx-auto">
          L’assistant marketing créé sur-mesure pour les artisans, commerçants, créateurs et indépendants locaux.
        </p>
      </div>

      {/* Story & Genesis */}
      <div className="rounded-3xl p-6 sm:p-10 bg-[#0d0f17] border border-white/10 space-y-6">
        <h2 className="text-xl sm:text-2xl font-display font-bold text-white">
          Pourquoi BizPilot AI a-t-il été créé ?
        </h2>

        <div className="space-y-4 text-sm text-neutral-300 leading-relaxed font-sans">
          <p>
            Chaque jour, des millions de petits entrepreneurs passionnés créent des produits incroyables et rendent des services impeccables. Mais quand vient le moment de poster sur Instagram, TikTok ou WhatsApp, le constat est toujours le même :
          </p>
          <blockquote className="p-4 rounded-xl bg-white/5 border-l-2 border-indigo-500 italic text-neutral-200">
            « Je sais comment faire tourner mon commerce, mais je ne sais jamais quoi écrire pour attirer des clients en ligne. »
          </blockquote>
          <p>
            Les agences de communication traditionnelles coûtent des centaines de milliers de francs ou des milliers d'euros par mois — inaccessible pour un petit business qui démarre. Quant aux outils d’IA généralistes, ils parlent un langage d'entreprise abstrait, froid et souvent déconnecté du terrain.
          </p>
          <p>
            <strong>BizPilot AI</strong> a été pensé pour combler ce fossé : donner un assistant marketing direct, adapté à ta ville, à ton secteur et prêt à l’emploi sur ton smartphone en 30 secondes.
          </p>
        </div>
      </div>

      {/* Our 3 Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="rounded-2xl p-6 bg-neutral-900/40 border border-white/5 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
            <Target className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white">Précision Terrain</h3>
          <p className="text-xs text-neutral-400 leading-relaxed">
            Chaque recommandation est pensée pour convertir un client local, qu'il s'agisse d'un salon de coiffure, d'un restaurant ou d'un réparateur de smartphones.
          </p>
        </div>

        <div className="rounded-2xl p-6 bg-neutral-900/40 border border-white/5 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <Shield className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white">0 Fausse Promesse</h3>
          <p className="text-xs text-neutral-400 leading-relaxed">
            Pas de faux compteurs, pas d'IA survendue, pas de pièges de paiement. Une honnêteté radicale sur notre technologie et notre feuille de route.
          </p>
        </div>

        <div className="rounded-2xl p-6 bg-neutral-900/40 border border-white/5 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
            <HeartHandshake className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white">Accessibilité Maximale</h3>
          <p className="text-xs text-neutral-400 leading-relaxed">
            Une version gratuite sans carte bancaire pour permettre à quiconque de démarrer dès aujourd’hui avec du contenu de qualité.
          </p>
        </div>
      </div>

      {/* Honest V1 Note */}
      <div className="rounded-2xl p-6 bg-gradient-to-r from-indigo-950/20 to-neutral-900/40 border border-white/10 space-y-3">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Note de développement : Pourquoi une V1 à 0 coût d’API ?</span>
        </h3>
        <p className="text-xs text-neutral-300 leading-relaxed font-sans">
          Nous lançons BizPilot AI avec <strong>0 budget</strong> pour valider scientifiquement que de vrais entrepreneurs tirent de la valeur de ce service avant d'engager des frais d'infrastructure. Notre moteur local intelligent combine les meilleures structures marketing pour offrir des résultats instantanés sans coûts cachés.
        </p>
      </div>

      {/* CTA */}
      <div className="text-center pt-4">
        <button
          onClick={() => onNavigate('generator')}
          className="min-h-[48px] px-8 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-xl shadow-indigo-600/30 hover:scale-105 transition-all cursor-pointer inline-flex items-center gap-2"
        >
          <span>Essayer le générateur maintenant</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
