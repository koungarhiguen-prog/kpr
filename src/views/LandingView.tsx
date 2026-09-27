import React from 'react';
import { PageView } from '../types';
import { HeroShowcase } from '../components/HeroShowcase';
import {
  ArrowRight,
  Sparkles,
  HelpCircle,
  Clock,
  PenTool,
  CheckCircle2,
  Store,
  Scissors,
  ShoppingBag,
  Camera,
  Smartphone,
  Briefcase,
  Zap,
} from 'lucide-react';

interface LandingViewProps {
  onNavigate: (view: PageView) => void;
}

export const LandingView: React.FC<LandingViewProps> = ({ onNavigate }) => {
  return (
    <div className="w-full space-y-24 sm:space-y-32 pb-20">
      {/* HERO SECTION */}
      <section className="relative pt-10 sm:pt-16 px-4 sm:px-6 max-w-6xl mx-auto text-center space-y-8">
        {/* Glow ambient background */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none -z-10" />

        {/* Small badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-indigo-400">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          <span className="tracking-wide">AI MARKETING ASSISTANT</span>
        </div>

        {/* Grand Titre */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-display font-extrabold text-white tracking-tight leading-[1.15] max-w-4xl mx-auto">
          Ton business mérite du contenu.{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-violet-300 to-indigo-200">
            BizPilot le crée pour toi.
          </span>
        </h1>

        {/* Sous-titre */}
        <p className="text-base sm:text-xl text-neutral-300 max-w-2xl mx-auto font-normal leading-relaxed">
          Décris ton activité. Obtiens des idées de contenu, des captions, des publicités et des messages clients en quelques secondes.
        </p>

        {/* Buttons CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={() => onNavigate('generator')}
            className="w-full sm:w-auto min-h-[48px] px-7 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-base flex items-center justify-center gap-2 shadow-xl shadow-indigo-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
          >
            <span>Créer mon Business Kit</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <a
            href="#how-it-works"
            className="w-full sm:w-auto min-h-[48px] px-6 py-3 rounded-xl border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10 text-neutral-200 font-medium text-sm flex items-center justify-center transition-all cursor-pointer"
          >
            Voir comment ça marche
          </a>
        </div>

        {/* Visual Interface Showcase */}
        <div className="pt-8">
          <HeroShowcase />
        </div>
      </section>

      {/* SECTION PROBLÈME */}
      <section className="px-4 sm:px-6 max-w-6xl mx-auto">
        <div className="rounded-3xl p-8 sm:p-12 bg-gradient-to-b from-[#0f111a] to-[#0a0b10] border border-white/8 space-y-12">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-xs font-semibold tracking-wider text-rose-400 uppercase">
              Le défi quotidien de l'entrepreneur
            </span>
            <h2 className="text-2xl sm:text-4xl font-display font-bold text-white tracking-tight">
              Tu ne sais jamais quoi publier ?
            </h2>
            <p className="text-sm sm:text-base text-neutral-400">
              Avoir un bon produit ou un bon service ne suffit plus : il faut être visible chaque jour.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Problème 1 */}
            <div className="rounded-2xl p-6 bg-neutral-900/60 border border-white/5 space-y-4 hover:border-white/10 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center">
                <HelpCircle className="w-6 h-6 text-rose-400" />
              </div>
              <h3 className="text-lg font-bold text-white">« Je manque d’idées »</h3>
              <p className="text-sm text-neutral-300 leading-relaxed">
                Tu ne sais pas quoi publier aujourd’hui. Tu passes 30 minutes devant une page blanche et tu finis par abandonner.
              </p>
            </div>

            {/* Problème 2 */}
            <div className="rounded-2xl p-6 bg-neutral-900/60 border border-white/5 space-y-4 hover:border-white/10 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                <Clock className="w-6 h-6 text-amber-400" />
              </div>
              <h3 className="text-lg font-bold text-white">« Je manque de temps »</h3>
              <p className="text-sm text-neutral-300 leading-relaxed">
                Créer du contenu prend trop de temps. Entre tes commandes, tes clients et la gestion du quotidien, les réseaux passent à la trappe.
              </p>
            </div>

            {/* Problème 3 */}
            <div className="rounded-2xl p-6 bg-neutral-900/60 border border-white/5 space-y-4 hover:border-white/10 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                <PenTool className="w-6 h-6 text-indigo-400" />
              </div>
              <h3 className="text-lg font-bold text-white">« Je ne sais pas quoi écrire »</h3>
              <p className="text-sm text-neutral-300 leading-relaxed">
                Tes publications ne présentent pas clairement ton offre. Les clients regardent, mais n’écrivent jamais pour commander.
              </p>
            </div>
          </div>

          {/* Statement box */}
          <div className="text-center pt-4">
            <div className="inline-block p-4 sm:p-5 rounded-2xl bg-indigo-950/40 border border-indigo-500/30">
              <p className="text-base sm:text-xl font-bold text-indigo-200">
                BizPilot transforme ton activité en contenu prêt à utiliser.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION COMMENT ÇA MARCHE */}
      <section id="how-it-works" className="px-4 sm:px-6 max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-semibold tracking-wider text-indigo-400 uppercase">
            Simple & Rapide
          </span>
          <h2 className="text-2xl sm:text-4xl font-display font-bold text-white tracking-tight">
            Comment ça marche ?
          </h2>
          <p className="text-sm sm:text-base text-neutral-400">
            Un processus en 3 étapes conçu pour te faire gagner des heures chaque semaine.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Étape 1 */}
          <div className="rounded-2xl p-6 bg-neutral-900/40 border border-white/5 space-y-4 relative">
            <span className="text-3xl font-extrabold font-display text-indigo-400/80">01</span>
            <h3 className="text-xl font-bold text-white">Décris</h3>
            <p className="text-sm text-neutral-300 leading-relaxed">
              Entre quelques informations sur ton activité : nom, ville, secteur, objectif et le ton souhaité. Moins de 60 secondes suffisent.
            </p>
          </div>

          {/* Étape 2 */}
          <div className="rounded-2xl p-6 bg-neutral-900/40 border border-white/5 space-y-4 relative">
            <span className="text-3xl font-extrabold font-display text-indigo-400/80">02</span>
            <h3 className="text-xl font-bold text-white">Génère</h3>
            <p className="text-sm text-neutral-300 leading-relaxed">
              BizPilot crée ton Business Kit personnalisé : 10 posts, 10 captions, 5 vidéos Reels, messages WhatsApp, slogans et calendrier.
            </p>
          </div>

          {/* Étape 3 */}
          <div className="rounded-2xl p-6 bg-neutral-900/40 border border-white/5 space-y-4 relative">
            <span className="text-3xl font-extrabold font-display text-indigo-400/80">03</span>
            <h3 className="text-xl font-bold text-white">Publie</h3>
            <p className="text-sm text-neutral-300 leading-relaxed">
              Copie, adapte et publie ton contenu sur tes réseaux sociaux et WhatsApp en 1 clic. Engage ta communauté et vends plus.
            </p>
          </div>
        </div>
      </section>

      {/* SECTEURS ADAPTÉS */}
      <section className="px-4 sm:px-6 max-w-6xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h3 className="text-lg sm:text-xl font-bold text-white">
            Adapté aux vrais commerces et indépendants
          </h3>
          <p className="text-xs sm:text-sm text-neutral-400">
            Formules et vocabulaire calibrés spécifiquement pour chaque métier.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {[
            { name: 'Restaurant', icon: Store },
            { name: 'Coiffeur / Barbier', icon: Scissors },
            { name: 'Boutique Mode', icon: ShoppingBag },
            { name: 'Photographe', icon: Camera },
            { name: 'Réparation Tech', icon: Smartphone },
            { name: 'Coach & Freelance', icon: Briefcase },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.name}
                className="p-4 rounded-xl bg-neutral-900/40 border border-white/5 flex flex-col items-center justify-center gap-2 text-center"
              >
                <Icon className="w-5 h-5 text-indigo-400" />
                <span className="text-xs font-medium text-neutral-200">{item.name}</span>
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION SOCIAL PROOF / POSITIONNEMENT HONNÊTE */}
      <section className="px-4 sm:px-6 max-w-6xl mx-auto">
        <div className="rounded-3xl p-8 sm:p-12 bg-neutral-900/30 border border-white/10 space-y-8">
          <div className="max-w-2xl space-y-3">
            <span className="text-xs font-semibold tracking-wider text-emerald-400 uppercase">
              Vision & Clarté
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
              Pensé pour les entrepreneurs qui veulent passer à l’action.
            </h2>
            <p className="text-sm text-neutral-300 leading-relaxed">
              Pas de théories marketing interminables ni de promesses extravagantes. BizPilot AI a été conçu avec une seule obsession : donner à chaque commerçant et artisan des textes concrets, polis et immédiatement publiables aujourd’hui.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-2">
            <div className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/5">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-semibold text-white">0% Baratin, 100% Action</h4>
                <p className="text-xs text-neutral-400 mt-0.5">
                  Chaque post et chaque Reel contient un vrai hook et un appel à l'action.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/5">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-semibold text-white">Mobile-First</h4>
                <p className="text-xs text-neutral-400 mt-0.5">
                  Conçu pour être utilisé directement depuis ton smartphone entre deux clients.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/5">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-semibold text-white">Adapté à ta ville</h4>
                <p className="text-xs text-neutral-400 mt-0.5">
                  Intègre naturellement le contexte local et la proximité géographique.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CALL TO ACTION */}
      <section className="px-4 sm:px-6 max-w-4xl mx-auto text-center space-y-6">
        <div className="rounded-3xl p-8 sm:p-12 bg-gradient-to-tr from-indigo-900/40 via-purple-900/20 to-neutral-900/40 border border-indigo-500/30 space-y-6 glow-indigo">
          <Zap className="w-8 h-8 text-indigo-400 mx-auto" />
          <h2 className="text-2xl sm:text-4xl font-display font-bold text-white tracking-tight">
            Prêt à booster la visibilité de ton business ?
          </h2>
          <p className="text-sm sm:text-base text-neutral-300 max-w-lg mx-auto">
            Génère gratuitement ton premier Business Kit complet en quelques secondes et commence à publier dès aujourd'hui.
          </p>
          <div className="pt-2">
            <button
              onClick={() => onNavigate('generator')}
              className="min-h-[48px] px-8 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-base shadow-xl shadow-indigo-600/30 hover:scale-105 active:scale-95 transition-all cursor-pointer inline-flex items-center gap-2"
            >
              <span>Créer mon Business Kit gratuit</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
