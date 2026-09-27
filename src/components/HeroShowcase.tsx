import React, { useState } from 'react';
import { Sparkles, MessageSquare, Video, Calendar, Copy, Check } from 'lucide-react';
import heroImage from '../assets/images/hero_bizpilot_showcase_1790548013041.jpg';

export const HeroShowcase: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'posts' | 'reels' | 'whatsapp' | 'calendar'>('posts');
  const [copied, setCopied] = useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard?.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="relative mx-auto w-full max-w-4xl rounded-2xl p-1 bg-gradient-to-b from-indigo-500/20 via-white/5 to-transparent shadow-2xl glow-indigo">
      <div className="rounded-xl bg-[#0d0f17] border border-white/10 overflow-hidden">
        {/* Top faux browser / app bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#0a0c13] border-b border-white/5 text-xs text-neutral-400">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/60" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/60" />
            </div>
            <span className="text-neutral-500 hidden sm:inline ml-2">bizpilot.ai/kit/mama-food</span>
          </div>

          <div className="flex items-center gap-2 text-indigo-300 font-medium">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Exemple généré en 1.2s</span>
          </div>
        </div>

        {/* Business Kit Banner info */}
        <div className="p-4 sm:p-6 border-b border-white/5 bg-gradient-to-r from-indigo-950/30 to-neutral-900/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-indigo-400 font-medium mb-1">
              <span>BUSINESS KIT ACTIF</span>
              <span>·</span>
              <span>100% EXPLOITABLE</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              Mama Food
              <span className="text-xs font-normal text-neutral-400 bg-white/5 px-2 py-0.5 rounded border border-white/10">
                Restaurant · Pointe-Noire
              </span>
            </h3>
            <p className="text-xs text-neutral-400 mt-1">
              Objectif : Augmenter les ventes · Ton : Dynamique & Convivial
            </p>
          </div>

          {/* Interactive tabs */}
          <div className="flex items-center gap-1 p-1 bg-black/40 rounded-lg border border-white/5 overflow-x-auto no-scrollbar">
            <button
              onClick={() => setActiveTab('posts')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'posts' ? 'bg-indigo-600 text-white' : 'text-neutral-400 hover:text-white'
              }`}
            >
              Post #1
            </button>
            <button
              onClick={() => setActiveTab('reels')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'reels' ? 'bg-indigo-600 text-white' : 'text-neutral-400 hover:text-white'
              }`}
            >
              Reel Court
            </button>
            <button
              onClick={() => setActiveTab('whatsapp')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'whatsapp' ? 'bg-indigo-600 text-white' : 'text-neutral-400 hover:text-white'
              }`}
            >
              WhatsApp
            </button>
            <button
              onClick={() => setActiveTab('calendar')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'calendar' ? 'bg-indigo-600 text-white' : 'text-neutral-400 hover:text-white'
              }`}
            >
              Planning
            </button>
          </div>
        </div>

        {/* Dynamic preview content */}
        <div className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* Left panel: Simulated card content */}
          <div className="md:col-span-7 space-y-4">
            {activeTab === 'posts' && (
              <div className="rounded-xl p-4 bg-neutral-900/80 border border-white/10 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-indigo-400 font-semibold">Post #1 · L'histoire de la maison</span>
                  <button
                    onClick={() =>
                      handleCopy(
                        "Pourquoi Mama Food existe aujourd'hui à Pointe-Noire ?\n\nQuand nous avons lancé nos fourneaux, nous voulions régaler les gens avec de vraies saveurs maison sans compromis.\n\nPassez nous voir cette semaine !"
                      )
                    }
                    className="flex items-center gap-1 text-xs text-neutral-400 hover:text-white cursor-pointer px-2 py-1 rounded bg-white/5"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copié' : 'Copier'}</span>
                  </button>
                </div>
                <p className="text-xs sm:text-sm text-neutral-200 leading-relaxed font-sans">
                  « Pourquoi Mama Food existe aujourd’hui à Pointe-Noire ? 🍲<br />
                  Quand nous avons lancé nos fourneaux, nous avions un constat simple : trop souvent, on manque de temps pour bien manger le midi.<br /><br />
                  Notre mission : vous servir des grillades juteuses et des sauces authentiques en moins de 15 minutes. »
                </p>
                <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs text-neutral-400">
                  <span className="text-indigo-300">CTA : Dites-nous votre plat préféré en commentaire 👇</span>
                </div>
              </div>
            )}

            {activeTab === 'reels' && (
              <div className="rounded-xl p-4 bg-neutral-900/80 border border-white/10 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-rose-400 font-semibold">
                    <Video className="w-3.5 h-3.5" />
                    <span>Script Reel #1 · Hook & Déroulement</span>
                  </div>
                  <span className="text-neutral-500">Durée : 15s</span>
                </div>
                <div className="space-y-1.5 text-xs text-neutral-300">
                  <p className="font-semibold text-white">
                    🎯 Hook : « Tu cherches encore où manger le midi sans exploser ton budget à Pointe-Noire ? »
                  </p>
                  <p className="text-neutral-400">
                    🎬 Scène 1 : Plan ultra serré sur la viande qui crépite avec le son naturel.
                  </p>
                  <p className="text-neutral-400">
                    🎬 Scène 2 : Le chef qui verse la sauce maison onctueuse sur le plat fumant.
                  </p>
                  <p className="text-neutral-400">
                    🎬 Scène 3 : Client souriant qui lève le pouce face caméra.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'whatsapp' && (
              <div className="rounded-xl p-4 bg-neutral-900/80 border border-white/10 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Réponse automatique WhatsApp</span>
                  </div>
                  <span className="text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded text-[11px]">Direct client</span>
                </div>
                <div className="bg-[#0b141a] p-3 rounded-lg border border-emerald-500/20 text-xs sm:text-sm text-neutral-200 space-y-2">
                  <p className="font-medium text-emerald-300">Client : « Bonjour, quels sont vos prix s'il vous plaît ? »</p>
                  <div className="p-2.5 bg-[#1f2c34] rounded-md text-neutral-200 text-xs">
                    Bonjour ! Chez Mama Food, nos formules démarrent à 2 500 FCFA avec plat complet + boisson fraîche. 🍗🥗<br />
                    Voulez-vous la carte du jour en photo ?
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'calendar' && (
              <div className="rounded-xl p-4 bg-neutral-900/80 border border-white/10 space-y-2">
                <div className="flex items-center justify-between text-xs text-indigo-400 font-semibold mb-1">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Planning 7 jours · Vue rapide</span>
                  </div>
                  <span className="text-neutral-400">Semaine 1</span>
                </div>
                <div className="grid grid-cols-7 gap-1 text-[11px] text-center">
                  {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map((day, i) => (
                    <div key={day} className={`p-1.5 rounded border ${i === 4 ? 'bg-indigo-600/30 border-indigo-500 text-white font-bold' : 'bg-white/5 border-white/5 text-neutral-300'}`}>
                      <div>{day}</div>
                      <div className="text-[9px] text-neutral-400 mt-0.5">
                        {i === 0 ? 'Histoire' : i === 1 ? 'Conseil' : i === 2 ? 'Plat' : i === 3 ? 'Avis' : i === 4 ? 'Promo' : i === 5 ? 'Quizz' : 'Chill'}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right panel: High fidelity visual preview */}
          <div className="md:col-span-5 relative rounded-xl overflow-hidden border border-white/10 aspect-[4/3] bg-neutral-950">
            <img
              src={heroImage}
              alt="BizPilot AI Business Kit Showcase"
              className="w-full h-full object-cover object-center"
              loading="lazy"
              referrerPolicy="no-referrer"
              onError={(e) => {
                // Resilient CSS fallback if image asset is unavailable
                e.currentTarget.style.display = 'none';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-4">
              <span className="text-[11px] font-semibold tracking-wider text-indigo-400 uppercase">
                Kit Complet Généré
              </span>
              <p className="text-xs text-neutral-200 mt-0.5">
                Posts · Captions · Reels · WhatsApp · Bio · Calendrier
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
