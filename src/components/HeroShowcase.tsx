import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, MessageSquare, Video, Calendar, Copy, Check, Store, Scissors, ShoppingBag, ArrowUpRight } from 'lucide-react';
import heroImage from '../assets/images/hero_bizpilot_showcase_1790548013041.jpg';

interface PresetData {
  name: string;
  category: string;
  city: string;
  icon: typeof Store;
  objective: string;
  tone: string;
  postTitle: string;
  postContent: string;
  postCta: string;
  reelHook: string;
  reelScenes: string[];
  waQuestion: string;
  waAnswer: string;
  calendarTheme: string[];
}

const PRESETS: PresetData[] = [
  {
    name: 'Mama Food',
    category: 'Restaurant',
    city: 'Pointe-Noire',
    icon: Store,
    objective: 'Augmenter les ventes',
    tone: 'Dynamique & Convivial',
    postTitle: "L'histoire de nos fourneaux",
    postContent: "« Pourquoi Mama Food existe aujourd’hui à Pointe-Noire ? 🍲\nQuand nous avons lancé nos grillades, nous avions un constat simple : trop souvent, on manque de temps pour bien manger le midi.\nNotre engagement : vous servir des plats chauds et authentiques en moins de 15 min ! »",
    postCta: "👉 Dites-nous votre sauce préférée en commentaire !",
    reelHook: "« Tu cherches encore où manger le midi sans exploser ton budget à Pointe-Noire ? »",
    reelScenes: [
      "00:00 - 00:03 : Plan serré viande qui crépite avec le son ASMR naturel",
      "00:03 - 00:08 : Le chef qui dresse la sauce maison onctueuse sur le plat fumant",
      "00:08 - 00:15 : Client souriant qui valide le premier coup de fourchette",
    ],
    waQuestion: "« Bonjour, quels sont vos prix pour le déjeuner ? »",
    waAnswer: "Bonjour ! Chez Mama Food, nos formules complètes démarrent à 2 500 FCFA avec plat du jour + boisson fraîche. 🍗🥗\nSouhaitez-vous la photo du menu du jour ?",
    calendarTheme: ['Histoire', 'Conseil Chef', 'Plat Star', 'Avis Client', 'Offre Flash', 'Débat Sauces', 'Coulisses'],
  },
  {
    name: 'Barber Legend',
    category: 'Coiffeur / Barbier',
    city: 'Abidjan',
    icon: Scissors,
    objective: 'Obtenir plus de clients',
    tone: 'Premium & Stylé',
    postTitle: "La précision d'un dégradé propre",
    postContent: "« Un bon dégradé, ce n'est pas de la chance : c'est 45 minutes de géométrie et de passion. ✂️\nChez Barber Legend à Abidjan, nous redéfinissons votre silhouette avec serviette chaude et finitions au rasoir. »",
    postCta: "💈 Réservez votre créneau VIP via le lien en bio.",
    reelHook: "« Regarde ce qui arrive quand tu passes enfin chez un vrai pro de la barbe... »",
    reelScenes: [
      "00:00 - 00:03 : Avant négligé avec son interrogatif",
      "00:03 - 00:09 : Gestes millimétrés de la tondeuse et serviette fumante",
      "00:09 - 00:15 : Transition cut sur le regard confiant face au miroir",
    ],
    waQuestion: "« C'est disponible aujourd'hui à 17h pour une coupe + barbe ? »",
    waAnswer: "Hello ! Oui, nous avons encore un créneau ouvert à 17h30 au salon. On vous réserve la place sous quel nom ? ✨",
    calendarTheme: ['Relooking', 'Soin Barbe', 'Avant/Après', 'Avis VIP', 'Pack Week-end', 'Sondage Coupe', 'Détente'],
  },
  {
    name: 'Luxe & Style',
    category: 'Boutique Mode',
    city: 'Dakar',
    icon: ShoppingBag,
    objective: 'Développer Instagram',
    tone: 'Jeune & Tendance',
    postTitle: "Le look capsule de la semaine",
    postContent: "« La règle d'or pour un look sans effort : choisir des matières nobles qui tombent juste. ✨\nDécouvrez notre capsule exclusive 'Urban Dakar' disponible en seulement 20 exemplaires numérotés en boutique. »",
    postCta: "👗 Tape « LOOK » en DM pour recevoir les tailles disponibles !",
    reelHook: "« 3 façons de styliser cette chemise pour le bureau ou une soirée à Dakar. »",
    reelScenes: [
      "00:00 - 00:03 : Transition jump avec claquement de doigts",
      "00:03 - 00:08 : Look 1 : Casual chic avec pantalon fluide",
      "00:08 - 00:15 : Look 2 : Soirée glam avec talons et sac contrasté",
    ],
    waQuestion: "« Bonjour, faites-vous la livraison à domicile ? »",
    waAnswer: "Bonjour ! Oui tout à fait, nous livrons partout à Dakar sous 24h avec possibilité d'essayer avant de régler ! 📦",
    calendarTheme: ['Nouvelle Pièce', 'Astuce Look', 'Zoom Matière', 'Photo Cliente', 'Vente Privée', 'Ce Soir ou Jamais', 'Inspo Mood'],
  },
];

export const HeroShowcase: React.FC = () => {
  const [selectedPresetIndex, setSelectedPresetIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'posts' | 'reels' | 'whatsapp' | 'calendar'>('posts');
  const [copied, setCopied] = useState(false);

  const preset = PRESETS[selectedPresetIndex];

  const handleCopy = (text: string) => {
    navigator.clipboard?.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="relative mx-auto w-full max-w-4xl">
      {/* Decorative Glow backdrops */}
      <div className="absolute -inset-1.5 bg-gradient-to-r from-indigo-500/30 via-violet-500/20 to-indigo-600/30 rounded-3xl blur-xl opacity-70 animate-pulse pointer-events-none" />

      {/* Main Container */}
      <div className="relative rounded-2xl p-1 bg-gradient-to-b from-white/15 via-white/5 to-transparent shadow-2xl glow-indigo">
        <div className="rounded-xl bg-[#0c0e16] border border-white/10 overflow-hidden">
          {/* Top Bar with mock URL and live badges */}
          <div className="flex items-center justify-between px-4 py-2.5 bg-[#090b12] border-b border-white/5 text-xs text-neutral-400">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
              </div>
              <div className="hidden sm:flex items-center gap-1.5 ml-2 px-2.5 py-0.5 rounded-md bg-white/5 text-[11px] text-neutral-400 border border-white/5 font-mono">
                <span className="text-emerald-400 font-bold">●</span>
                <span>bizpilot.ai/live-kit/{preset.name.toLowerCase().replace(/\s+/g, '-')}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 text-indigo-300 text-[11px] font-medium px-2 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/20">
                <Sparkles className="w-3 h-3 text-indigo-400 animate-spin" style={{ animationDuration: '4s' }} />
                <span>Généré en 1.2s</span>
              </span>
            </div>
          </div>

          {/* Interactive Preset Switcher */}
          <div className="px-4 py-2.5 bg-[#0e111a] border-b border-white/5 flex items-center justify-between gap-2 overflow-x-auto no-scrollbar">
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-[11px] text-neutral-400 font-medium hidden sm:inline">Exemples interactifs :</span>
              <div className="flex items-center gap-1.5">
                {PRESETS.map((p, idx) => {
                  const Icon = p.icon;
                  const isSelected = idx === selectedPresetIndex;
                  return (
                    <button
                      key={p.name}
                      onClick={() => setSelectedPresetIndex(idx)}
                      className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                        isSelected ? 'text-white' : 'text-neutral-400 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      {isSelected && (
                        <motion.div
                          layoutId="activePresetPill"
                          className="absolute inset-0 bg-indigo-600 rounded-lg shadow-md shadow-indigo-600/30"
                          transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
                        />
                      )}
                      <span className="relative z-10 flex items-center gap-1.5">
                        <Icon className="w-3.5 h-3.5" />
                        <span>{p.name}</span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="text-[11px] text-emerald-400 font-medium hidden md:flex items-center gap-1">
              <span>Moteur Live</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            </div>
          </div>

          {/* Business Kit Banner info */}
          <div className="p-4 sm:p-5 border-b border-white/5 bg-gradient-to-r from-indigo-950/40 via-neutral-900/40 to-[#0c0e16] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={preset.name}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.2 }}
                className="space-y-1"
              >
                <div className="flex items-center gap-2 text-xs text-indigo-400 font-semibold tracking-wide">
                  <span>KIT GÉNÉRÉ</span>
                  <span>·</span>
                  <span className="text-emerald-400">100% EXPLOITABLE</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2 font-display">
                  {preset.name}
                  <span className="text-xs font-normal text-neutral-300 bg-white/5 px-2.5 py-0.5 rounded-full border border-white/10 font-sans">
                    {preset.category} · {preset.city}
                  </span>
                </h3>
                <p className="text-xs text-neutral-400">
                  Objectif : {preset.objective} · Ton : {preset.tone}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Sub-tabs with sliding pill indicator */}
            <div className="flex items-center gap-1 p-1 bg-black/50 rounded-xl border border-white/5 overflow-x-auto no-scrollbar self-start sm:self-auto">
              {[
                { id: 'posts', label: 'Post #1' },
                { id: 'reels', label: 'Reel Court' },
                { id: 'whatsapp', label: 'WhatsApp' },
                { id: 'calendar', label: 'Planning' },
              ].map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`relative px-3 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                      isActive ? 'text-white' : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeHeroSubTab"
                        className="absolute inset-0 bg-indigo-600/90 rounded-lg shadow-sm"
                        transition={{ type: 'spring', bounce: 0.2, duration: 0.35 }}
                      />
                    )}
                    <span className="relative z-10">{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Dynamic preview content */}
          <div className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* Left panel: Simulated card content */}
            <div className="md:col-span-7 space-y-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${preset.name}_${activeTab}`}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                >
                  {activeTab === 'posts' && (
                    <div className="rounded-2xl p-4 sm:p-5 bg-neutral-900/90 border border-white/10 space-y-3.5 shadow-lg">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-indigo-400 font-bold flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>Post #1 · {preset.postTitle}</span>
                        </span>
                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleCopy(`${preset.postContent}\n\n${preset.postCta}`)}
                          className="flex items-center gap-1.5 text-xs text-neutral-300 hover:text-white cursor-pointer px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-all"
                        >
                          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                          <span>{copied ? 'Copié !' : 'Copier'}</span>
                        </motion.button>
                      </div>

                      <p className="text-xs sm:text-sm text-neutral-200 leading-relaxed font-sans whitespace-pre-line bg-black/40 p-3.5 rounded-xl border border-white/5">
                        {preset.postContent}
                      </p>

                      <div className="pt-1 flex items-center justify-between text-xs text-indigo-300 font-medium">
                        <span>{preset.postCta}</span>
                      </div>
                    </div>
                  )}

                  {activeTab === 'reels' && (
                    <div className="rounded-2xl p-4 sm:p-5 bg-neutral-900/90 border border-white/10 space-y-3.5 shadow-lg">
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-1.5 text-rose-400 font-bold">
                          <Video className="w-3.5 h-3.5" />
                          <span>Script Reel (Format 9:16 vertical)</span>
                        </div>
                        <span className="text-[11px] text-neutral-400 bg-white/5 px-2 py-0.5 rounded border border-white/10">15 secondes</span>
                      </div>

                      <div className="p-3 rounded-xl bg-rose-950/30 border border-rose-500/20 text-xs">
                        <span className="text-[10px] font-bold text-rose-400 uppercase tracking-wider block mb-1">
                          🎯 Accroche des 3 premières secondes
                        </span>
                        <p className="font-semibold text-white">{preset.reelHook}</p>
                      </div>

                      <div className="space-y-1.5 text-xs text-neutral-300 bg-black/30 p-3 rounded-xl border border-white/5">
                        {preset.reelScenes.map((scene, i) => (
                          <div key={i} className="flex items-start gap-2">
                            <span className="text-rose-400 shrink-0 font-bold">0{i + 1}.</span>
                            <span>{scene}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTab === 'whatsapp' && (
                    <div className="rounded-2xl p-4 sm:p-5 bg-neutral-900/90 border border-white/10 space-y-3.5 shadow-lg">
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>Simulation de réponse WhatsApp</span>
                        </div>
                        <span className="text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full text-[11px] border border-emerald-500/20">
                          Direct & Prêt
                        </span>
                      </div>

                      <div className="bg-[#0b141a] p-3.5 rounded-xl border border-emerald-500/20 space-y-2.5">
                        <div className="flex items-start gap-2 text-xs">
                          <span className="text-neutral-400 font-medium">Client :</span>
                          <span className="text-white font-medium">{preset.waQuestion}</span>
                        </div>
                        <div className="p-3 bg-[#1f2c34] rounded-xl text-neutral-200 text-xs leading-relaxed border border-white/5 whitespace-pre-line font-sans">
                          {preset.waAnswer}
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'calendar' && (
                    <div className="rounded-2xl p-4 sm:p-5 bg-neutral-900/90 border border-white/10 space-y-3.5 shadow-lg">
                      <div className="flex items-center justify-between text-xs text-indigo-400 font-bold">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>Planning hebdomadaire type</span>
                        </div>
                        <span className="text-neutral-400 font-normal">7 jours</span>
                      </div>

                      <div className="grid grid-cols-7 gap-1 text-[11px] text-center">
                        {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map((day, i) => (
                          <div
                            key={day}
                            className={`p-2 rounded-xl border transition-all ${
                              i === 4
                                ? 'bg-indigo-600/30 border-indigo-500 text-white font-bold scale-105 shadow-md shadow-indigo-600/20'
                                : 'bg-white/5 border-white/5 text-neutral-300'
                            }`}
                          >
                            <div className="font-semibold">{day}</div>
                            <div className="text-[9px] text-neutral-400 mt-1 truncate">
                              {preset.calendarTheme[i]}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right panel: High fidelity visual preview with floating badges */}
            <div className="md:col-span-5 relative rounded-2xl overflow-hidden border border-white/10 aspect-[4/3] bg-neutral-950 group">
              <img
                src={heroImage}
                alt="BizPilot AI Business Kit Showcase"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
                referrerPolicy="no-referrer"
              />

              {/* Scrim Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex flex-col justify-between p-4 pointer-events-none">
                {/* Floating Top Badge */}
                <div className="self-end pointer-events-auto">
                  <span className="animate-float px-2.5 py-1 rounded-full bg-indigo-600/90 text-white text-[10px] font-bold shadow-lg border border-white/20 backdrop-blur-md inline-flex items-center gap-1">
                    <Sparkles className="w-2.5 h-2.5" />
                    <span>Business Kit V1</span>
                  </span>
                </div>

                {/* Floating Bottom Badge */}
                <div className="space-y-1">
                  <div className="animate-float-reverse inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-black/70 backdrop-blur-md border border-white/15 text-xs text-white shadow-xl">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="font-semibold">{preset.name}</span>
                    <span className="text-neutral-400 text-[10px]">· Prêt à publier</span>
                  </div>
                  <p className="text-[11px] text-neutral-300">
                    Posts · Captions · Reels · WhatsApp · Bio · Calendrier
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
