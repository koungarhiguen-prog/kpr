import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PageView } from '../types';
import { HeroShowcase } from '../components/HeroShowcase';
import {
  ScrollReveal,
  GenerativeWords,
  GenerativeCard,
} from '../components/GenerativeReveal';
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
  TrendingUp,
  ShieldCheck,
  ChevronRight,
  Compass,
  Sparkle,
} from 'lucide-react';

interface LandingViewProps {
  onNavigate: (view: PageView) => void;
}

const SECTOR_EXAMPLES = [
  {
    name: 'Restaurant',
    icon: Store,
    hook: '« Pourquoi Mama Food existe aujourd’hui à Pointe-Noire ? Notre secret en cuisine révélé. »',
    action: 'Plats faits maison, grillades et fidélisation midi express.',
  },
  {
    name: 'Coiffeur / Barbier',
    icon: Scissors,
    hook: '« Tu fais encore cette erreur quand tu demandes un dégradé ? Regarde ça. »',
    action: 'Coupe morphologique, soins de la barbe au rasoir et ambiance pro.',
  },
  {
    name: 'Boutique Mode',
    icon: ShoppingBag,
    hook: '« 3 looks impeccables avec une seule pièce capsule cette semaine. »',
    action: 'Sélections limitées, arrivages VIP et essayage avec livraison rapide.',
  },
  {
    name: 'Photographe',
    icon: Camera,
    hook: '« Ce que ton portrait photo dit de toi avant même que tu n’aies parlé. »',
    action: 'Portraits corporate, souvenirs de famille et séances sur-mesure.',
  },
  {
    name: 'Réparation Tech',
    icon: Smartphone,
    hook: '« Batterie qui s’éteint à 20% ? Voici pourquoi tu ne dois pas attendre. »',
    action: 'Écrans d’origine, dépannage en 30 min garanti et diagnostic gratuit.',
  },
  {
    name: 'Coach & Freelance',
    icon: Briefcase,
    hook: '« L’erreur n°1 qui bloque 90% des entrepreneurs quand ils démarrent. »',
    action: 'Accompagnement 1-on-1, livrables concrets et suivi direct WhatsApp.',
  },
];

export const LandingView: React.FC<LandingViewProps> = ({ onNavigate }) => {
  const [activeSector, setActiveSector] = useState(0);

  return (
    <div className="w-full space-y-24 sm:space-y-36 pb-24 overflow-hidden relative">
      {/* Background ambient generative particles */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[38rem] h-[38rem] bg-indigo-600/15 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse" />
      <div className="absolute top-2/3 right-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl pointer-events-none -z-10 animate-float" />

      {/* 1. HERO SECTION */}
      <section className="relative pt-10 sm:pt-16 px-4 sm:px-6 max-w-6xl mx-auto text-center space-y-8">
        {/* Small animated badge */}
        <ScrollReveal direction="down" delay={0.1} once={true}>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-indigo-400 shadow-sm backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-spin" style={{ animationDuration: '6s' }} />
            <span>AI MARKETING ASSISTANT</span>
          </div>
        </ScrollReveal>

        {/* Grand Titre avec effet de composition générative mot-par-mot */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold text-white tracking-tight leading-[1.2] sm:leading-[1.15] max-w-4xl mx-auto px-1">
          <GenerativeWords
            text="Ton business mérite du contenu."
            delay={0.15}
          />{' '}
          <span className="block sm:inline sm:ml-2 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-violet-300 to-indigo-200">
            <GenerativeWords
              text="Créé pour toi."
              delay={0.35}
            />
          </span>
        </h1>

        {/* Sous-titre avec matérialisation au scroll */}
        <ScrollReveal direction="up" delay={0.3} once={true}>
          <p className="text-base sm:text-xl text-neutral-300 max-w-2xl mx-auto font-normal leading-relaxed">
            Décris ton activité. Obtiens des idées de contenu, des captions, des publicités et des messages clients en quelques secondes.
          </p>
        </ScrollReveal>

        {/* Buttons CTA */}
        <ScrollReveal direction="up" delay={0.4} once={true}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onNavigate('generator')}
              className="w-full sm:w-auto min-h-[48px] px-7 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-base flex items-center justify-center gap-2 shadow-xl shadow-indigo-600/30 transition-all cursor-pointer"
            >
              <span>Créer mon Business Kit</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>

            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              href="#how-it-works"
              className="w-full sm:w-auto min-h-[48px] px-6 py-3 rounded-xl border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10 text-neutral-200 font-medium text-sm flex items-center justify-center transition-all cursor-pointer"
            >
              Voir comment ça marche
            </motion.a>
          </div>
        </ScrollReveal>

        {/* Live dynamic metrics strip */}
        <ScrollReveal direction="up" delay={0.45} once={true}>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-neutral-400">
            <span className="flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <strong className="text-white font-semibold">1.2s</strong> temps moyen
            </span>
            <span className="hidden sm:inline text-neutral-600">·</span>
            <span className="flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
              <strong className="text-white font-semibold">100%</strong> orienté conversion
            </span>
            <span className="hidden sm:inline text-neutral-600">·</span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
              <strong className="text-white font-semibold">0 API payante</strong> requise
            </span>
          </div>
        </ScrollReveal>

        {/* Visual Interface Showcase with Generative Scanner effect */}
        <ScrollReveal direction="scale" delay={0.5} once={true} className="pt-6">
          <HeroShowcase />
        </ScrollReveal>
      </section>

      {/* 2. SECTION PROBLÈME (Générée dynamiquement au scroll) */}
      <section className="px-4 sm:px-6 max-w-6xl mx-auto">
        <ScrollReveal direction="up" once={true} amount={0.15}>
          <div className="rounded-3xl p-8 sm:p-12 bg-gradient-to-b from-[#0f111a] to-[#0a0b10] border border-white/8 space-y-12 shadow-2xl relative overflow-hidden">
            {/* Ambient decorative glow */}
            <div className="absolute -top-24 -right-24 w-60 h-60 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="text-center space-y-3 max-w-2xl mx-auto">
              <ScrollReveal direction="down" delay={0.1} once={true}>
                <span className="text-xs font-semibold tracking-wider text-rose-400 uppercase">
                  Le défi quotidien de l'entrepreneur
                </span>
              </ScrollReveal>

              <h2 className="text-2xl sm:text-4xl font-display font-bold text-white tracking-tight">
                <GenerativeWords text="Tu ne sais jamais quoi publier ?" once={true} delay={0.2} />
              </h2>

              <ScrollReveal direction="up" delay={0.25} once={true}>
                <p className="text-sm sm:text-base text-neutral-400">
                  Avoir un bon produit ou un bon service ne suffit plus : il faut être visible chaque jour.
                </p>
              </ScrollReveal>
            </div>

            {/* 3 Cartes Problèmes révélées avec faisceau laser génératif */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Problème 1 */}
              <GenerativeCard delay={0.1} once={true}>
                <div className="rounded-2xl p-6 bg-neutral-900/70 border border-white/5 space-y-4 hover:border-rose-500/30 transition-all h-full flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center">
                      <HelpCircle className="w-6 h-6 text-rose-400" />
                    </div>
                    <h3 className="text-lg font-bold text-white">« Je manque d’idées »</h3>
                    <p className="text-sm text-neutral-300 leading-relaxed font-sans">
                      Tu ne sais pas quoi publier aujourd’hui. Tu passes 30 minutes devant une page blanche et tu finis par abandonner.
                    </p>
                  </div>
                  <div className="pt-2 text-xs font-semibold text-rose-400 flex items-center gap-1">
                    <span>Blocage n°1</span>
                  </div>
                </div>
              </GenerativeCard>

              {/* Problème 2 */}
              <GenerativeCard delay={0.25} once={true}>
                <div className="rounded-2xl p-6 bg-neutral-900/70 border border-white/5 space-y-4 hover:border-amber-500/30 transition-all h-full flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                      <Clock className="w-6 h-6 text-amber-400" />
                    </div>
                    <h3 className="text-lg font-bold text-white">« Je manque de temps »</h3>
                    <p className="text-sm text-neutral-300 leading-relaxed font-sans">
                      Créer du contenu prend trop de temps. Entre tes commandes, tes clients et la gestion du quotidien, les réseaux passent à la trappe.
                    </p>
                  </div>
                  <div className="pt-2 text-xs font-semibold text-amber-400 flex items-center gap-1">
                    <span>Blocage n°2</span>
                  </div>
                </div>
              </GenerativeCard>

              {/* Problème 3 */}
              <GenerativeCard delay={0.4} once={true}>
                <div className="rounded-2xl p-6 bg-neutral-900/70 border border-white/5 space-y-4 hover:border-indigo-500/30 transition-all h-full flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                      <PenTool className="w-6 h-6 text-indigo-400" />
                    </div>
                    <h3 className="text-lg font-bold text-white">« Je ne sais pas quoi écrire »</h3>
                    <p className="text-sm text-neutral-300 leading-relaxed font-sans">
                      Tes publications ne présentent pas clairement ton offre. Les clients regardent, mais n’écrivent jamais pour commander.
                    </p>
                  </div>
                  <div className="pt-2 text-xs font-semibold text-indigo-400 flex items-center gap-1">
                    <span>Blocage n°3</span>
                  </div>
                </div>
              </GenerativeCard>
            </div>

            {/* Statement box qui se matérialise */}
            <ScrollReveal direction="scale" delay={0.5} once={true} className="text-center pt-4">
              <div className="inline-block p-4 sm:p-5 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 glow-indigo">
                <p className="text-base sm:text-xl font-bold text-indigo-200">
                  <GenerativeWords
                    text="BizPilot transforme ton activité en contenu prêt à utiliser."
                    once={true}
                    delay={0.2}
                  />
                </p>
              </div>
            </ScrollReveal>
          </div>
        </ScrollReveal>
      </section>

      {/* 3. SECTION COMMENT ÇA MARCHE (Révélation pas-à-pas) */}
      <section id="how-it-works" className="px-4 sm:px-6 max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <ScrollReveal direction="down" once={true}>
            <span className="text-xs font-semibold tracking-wider text-indigo-400 uppercase">
              Simple & Rapide
            </span>
          </ScrollReveal>

          <h2 className="text-2xl sm:text-4xl font-display font-bold text-white tracking-tight">
            <GenerativeWords text="Comment ça marche ?" once={true} delay={0.15} />
          </h2>

          <ScrollReveal direction="up" delay={0.2} once={true}>
            <p className="text-sm sm:text-base text-neutral-400">
              Un processus en 3 étapes conçu pour te faire gagner des heures chaque semaine.
            </p>
          </ScrollReveal>
        </div>

        {/* 3 Étapes matérialisées successivement */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Étape 1 */}
          <GenerativeCard delay={0.1} once={true}>
            <div className="rounded-2xl p-6 bg-neutral-900/50 border border-white/5 space-y-4 relative h-full hover:border-indigo-500/30 transition-all">
              <span className="text-4xl font-extrabold font-display text-indigo-400/80">01</span>
              <h3 className="text-xl font-bold text-white">Décris</h3>
              <p className="text-sm text-neutral-300 leading-relaxed font-sans">
                Entre quelques informations sur ton activité : nom, ville, secteur, objectif et le ton souhaité. Moins de 60 secondes suffisent.
              </p>
            </div>
          </GenerativeCard>

          {/* Étape 2 */}
          <GenerativeCard delay={0.25} once={true}>
            <div className="rounded-2xl p-6 bg-neutral-900/50 border border-white/5 space-y-4 relative h-full hover:border-indigo-500/30 transition-all">
              <span className="text-4xl font-extrabold font-display text-indigo-400/80">02</span>
              <h3 className="text-xl font-bold text-white">Génère</h3>
              <p className="text-sm text-neutral-300 leading-relaxed font-sans">
                BizPilot crée ton Business Kit personnalisé : 10 posts, 10 captions, 5 vidéos Reels, messages WhatsApp, slogans et calendrier.
              </p>
            </div>
          </GenerativeCard>

          {/* Étape 3 */}
          <GenerativeCard delay={0.4} once={true}>
            <div className="rounded-2xl p-6 bg-neutral-900/50 border border-white/5 space-y-4 relative h-full hover:border-indigo-500/30 transition-all">
              <span className="text-4xl font-extrabold font-display text-indigo-400/80">03</span>
              <h3 className="text-xl font-bold text-white">Publie</h3>
              <p className="text-sm text-neutral-300 leading-relaxed font-sans">
                Copie, adapte et publie ton contenu sur tes réseaux sociaux et WhatsApp en 1 clic. Engage ta communauté et vends plus.
              </p>
            </div>
          </GenerativeCard>
        </div>
      </section>

      {/* 4. SECTEURS ADAPTÉS AVEC APERÇU INTERACTIF DYNAMIQUE */}
      <section className="px-4 sm:px-6 max-w-6xl mx-auto space-y-8">
        <ScrollReveal direction="up" once={true}>
          <div className="text-center space-y-2">
            <h3 className="text-lg sm:text-xl font-bold text-white font-display">
              <GenerativeWords text="Calibré pour chaque métier" once={true} />
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400">
              Clique sur un secteur pour tester son accroche marketing en direct.
            </p>
          </div>
        </ScrollReveal>

        {/* Sector clickable pills */}
        <ScrollReveal direction="up" delay={0.2} once={true}>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {SECTOR_EXAMPLES.map((item, idx) => {
              const Icon = item.icon;
              const isSelected = activeSector === idx;
              return (
                <motion.button
                  key={item.name}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveSector(idx)}
                  className={`p-3.5 rounded-xl border flex flex-col items-center justify-center gap-2 text-center transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-indigo-600/20 border-indigo-500 text-white shadow-lg shadow-indigo-600/20 scale-[1.02]'
                      : 'bg-neutral-900/40 border-white/5 text-neutral-300 hover:border-white/15'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isSelected ? 'text-indigo-400' : 'text-neutral-400'}`} />
                  <span className="text-xs font-semibold">{item.name}</span>
                </motion.button>
              );
            })}
          </div>
        </ScrollReveal>

        {/* Dynamic Sector preview card */}
        <GenerativeCard delay={0.3} once={true}>
          <div className="rounded-2xl p-5 sm:p-6 bg-[#0e1019] border border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="space-y-1.5 text-center md:text-left">
              <span className="text-[11px] font-bold text-indigo-400 uppercase tracking-wide">
                Exemple d'accroche pour : {SECTOR_EXAMPLES[activeSector].name}
              </span>
              <p className="text-sm sm:text-base font-semibold text-white font-sans">
                {SECTOR_EXAMPLES[activeSector].hook}
              </p>
              <p className="text-xs text-neutral-400">
                {SECTOR_EXAMPLES[activeSector].action}
              </p>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onNavigate('generator')}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold whitespace-nowrap cursor-pointer flex items-center gap-1.5 shrink-0 shadow-md"
            >
              <span>Générer pour ce secteur</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </motion.button>
          </div>
        </GenerativeCard>
      </section>

      {/* 5. SECTION SOCIAL PROOF / POSITIONNEMENT HONNÊTE */}
      <section className="px-4 sm:px-6 max-w-6xl mx-auto">
        <ScrollReveal direction="up" once={true}>
          <div className="rounded-3xl p-8 sm:p-12 bg-neutral-900/30 border border-white/10 space-y-8 shadow-xl">
            <div className="max-w-2xl space-y-3">
              <span className="text-xs font-semibold tracking-wider text-emerald-400 uppercase">
                Vision & Clarté
              </span>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
                <GenerativeWords
                  text="Pensé pour les entrepreneurs qui veulent passer à l’action."
                  once={true}
                />
              </h2>
              <p className="text-sm text-neutral-300 leading-relaxed font-sans">
                Pas de théories marketing interminables ni de promesses extravagantes. BizPilot AI a été conçu avec une seule obsession : donner à chaque commerçant et artisan des textes concrets, polis et immédiatement publiables aujourd’hui.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-2">
              <GenerativeCard delay={0.1} once={true}>
                <div className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/5 h-full">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-semibold text-white">0% Baratin, 100% Action</h4>
                    <p className="text-xs text-neutral-400 mt-0.5">
                      Chaque post et chaque Reel contient un vrai hook et un appel à l'action.
                    </p>
                  </div>
                </div>
              </GenerativeCard>

              <GenerativeCard delay={0.2} once={true}>
                <div className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/5 h-full">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-semibold text-white">Mobile-First</h4>
                    <p className="text-xs text-neutral-400 mt-0.5">
                      Conçu pour être utilisé directement depuis ton smartphone entre deux clients.
                    </p>
                  </div>
                </div>
              </GenerativeCard>

              <GenerativeCard delay={0.3} once={true}>
                <div className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/5 h-full">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-semibold text-white">Adapté à ta ville</h4>
                    <p className="text-xs text-neutral-400 mt-0.5">
                      Intègre naturellement le contexte local et la proximité géographique.
                    </p>
                  </div>
                </div>
              </GenerativeCard>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* 6. FINAL CALL TO ACTION (Laser glow reveal) */}
      <section className="px-4 sm:px-6 max-w-4xl mx-auto text-center space-y-6">
        <ScrollReveal direction="scale" once={true}>
          <div className="rounded-3xl p-8 sm:p-12 bg-gradient-to-tr from-indigo-900/40 via-purple-900/20 to-neutral-900/40 border border-indigo-500/30 space-y-6 glow-indigo">
            <Zap className="w-8 h-8 text-indigo-400 mx-auto animate-bounce" style={{ animationDuration: '2.5s' }} />
            <h2 className="text-2xl sm:text-4xl font-display font-bold text-white tracking-tight">
              <GenerativeWords
                text="Prêt à booster la visibilité de ton business ?"
                once={true}
              />
            </h2>
            <p className="text-sm sm:text-base text-neutral-300 max-w-lg mx-auto font-sans">
              Génère gratuitement ton premier Business Kit complet en quelques secondes et commence à publier dès aujourd'hui.
            </p>
            <div className="pt-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onNavigate('generator')}
                className="min-h-[48px] px-8 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-base shadow-xl shadow-indigo-600/30 transition-all cursor-pointer inline-flex items-center gap-2"
              >
                <span>Créer mon Business Kit gratuit</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
};
