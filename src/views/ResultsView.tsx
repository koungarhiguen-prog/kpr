import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BusinessKit, PageView, PostItem } from '../types';
import {
  copyToClipboard,
  formatKitAsMarkdown,
  downloadFile,
  shareKit,
  shareBizPilotViral,
} from '../utils';
import {
  Sparkles,
  Copy,
  Check,
  Download,
  Share2,
  RefreshCw,
  PlusCircle,
  MessageSquare,
  Video,
  Calendar,
  Layers,
  FileText,
  Megaphone,
  ArrowRight,
  Send,
  Search,
  CheckCircle2,
} from 'lucide-react';

interface ResultsViewProps {
  kit: BusinessKit;
  onNavigate: (view: PageView) => void;
  onRegenerateKit: () => void;
  onUpdateKit: (updated: BusinessKit) => void;
}

export const ResultsView: React.FC<ResultsViewProps> = ({
  kit,
  onNavigate,
  onRegenerateKit,
  onUpdateKit,
}) => {
  const [activeTab, setActiveTab] = useState<
    'posts' | 'captions' | 'reels' | 'whatsapp' | 'marketing' | 'calendar'
  >('posts');

  const [copiedAll, setCopiedAll] = useState(false);
  const [copiedItem, setCopiedItem] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [regeneratingPostId, setRegeneratingPostId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2200);
  };

  const handleCopyText = async (text: string, identifier: string, label = 'Contenu') => {
    const success = await copyToClipboard(text);
    if (success) {
      setCopiedItem(identifier);
      triggerToast(`${label} copié !`);
      setTimeout(() => setCopiedItem(null), 1800);
    }
  };

  const handleCopyAll = async () => {
    const fullText = formatKitAsMarkdown(kit);
    const success = await copyToClipboard(fullText);
    if (success) {
      setCopiedAll(true);
      triggerToast('Business Kit complet copié en Markdown !');
      setTimeout(() => setCopiedAll(false), 2000);
    }
  };

  const handleDownload = () => {
    const fullText = formatKitAsMarkdown(kit);
    const filename = `bizpilot_${kit.input.businessName
      .toLowerCase()
      .replace(/\s+/g, '_')}_kit.txt`;
    downloadFile(fullText, filename);
    triggerToast('Téléchargement du fichier texte lancé');
  };

  // Regenerate a single post on demand with smooth transition
  const handleRegeneratePost = (postId: number) => {
    setRegeneratingPostId(postId);

    setTimeout(() => {
      const variations = [
        {
          idea: `Focus immersion : pourquoi ${kit.input.businessName} fait la différence à ${kit.input.city}.`,
          caption: `Vous cherchez le meilleur endroit pour ${kit.input.activity.toLowerCase()} à ${kit.input.city} ?\n\nChez ${kit.input.businessName}, nous mettons un point d'honneur à offrir une expérience irréprochable du premier contact jusqu'au résultat final.\n\nPassez nous voir cette semaine !`,
          cta: `👉 Écrivez-nous en DM pour réserver votre formule.`,
        },
        {
          idea: `Le conseil pratique de la semaine pour votre quotidien.`,
          caption: `Saviez-vous que 80% des personnes font l'erreur d'attendre la dernière minute ?\n\nAvec ${kit.input.businessName}, simplifiez-vous la vie à ${kit.input.city}. Anticipez et profitez d'une qualité garantie.`,
          cta: `📲 Cliquez sur le lien dans notre bio pour en savoir plus.`,
        },
        {
          idea: `L'offre coup de cœur spécialement pensée pour nos abonnés.`,
          caption: `Envie d'un moment privilégié chez ${kit.input.businessName} ?\n\nProfitez de nos créneaux réservés avec une attention sur-mesure. Venez vivre la différence à ${kit.input.city} !`,
          cta: `⚡ Envoyez-nous un message WhatsApp pour bloquer votre date.`,
        },
      ];

      const randomVar = variations[Math.floor(Math.random() * variations.length)];
      const updatedPosts = kit.posts.map((p) => {
        if (p.id === postId) {
          return {
            ...p,
            idea: randomVar.idea,
            caption: randomVar.caption,
            cta: randomVar.cta,
          };
        }
        return p;
      });

      onUpdateKit({
        ...kit,
        posts: updatedPosts,
      });

      setRegeneratingPostId(null);
      triggerToast(`Post #${postId} regénéré avec succès`);
    }, 450);
  };

  // Filter posts based on search query
  const filteredPosts = kit.posts.filter(
    (p) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.idea.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.caption.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredCaptions = kit.captions.filter(
    (c) =>
      c.theme.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.hashtags.some((h) => h.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8 relative">
      {/* Floating Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-20 right-6 z-50 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-neutral-900 border border-emerald-500/40 text-emerald-300 text-xs font-semibold shadow-2xl shadow-emerald-500/10 backdrop-blur-md"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Banner / Hero Summary */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="rounded-3xl p-6 sm:p-8 bg-gradient-to-b from-[#11131f] to-[#0c0d15] border border-white/10 shadow-2xl space-y-6 glow-card"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-400">
              <Sparkles className="w-4 h-4 text-emerald-400 animate-spin" style={{ animationDuration: '6s' }} />
              <span>✨ Ton Business Kit est prêt</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
              {kit.input.businessName}
            </h1>

            {/* Zero-Pill text metadata with typographic separators */}
            <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-neutral-400 pt-0.5">
              <span className="text-neutral-200 font-medium">{kit.input.activity}</span>
              <span aria-hidden="true" className="text-neutral-600">·</span>
              <span>{kit.input.city}</span>
              <span aria-hidden="true" className="text-neutral-600">·</span>
              <span>Objectif : {kit.input.goal}</span>
              <span aria-hidden="true" className="text-neutral-600">·</span>
              <span>Ton : {kit.input.tone}</span>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleCopyAll}
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer border border-white/10 shadow-sm"
              title="Copier tout le contenu du kit"
            >
              {copiedAll ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedAll ? 'Kit entier copié !' : 'Copier tout'}</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleDownload}
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer border border-white/10 shadow-sm"
              title="Télécharger le kit en fichier texte"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Télécharger</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => shareKit(kit.input.businessName)}
              className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-lg shadow-indigo-600/25 transition-all cursor-pointer"
              title="Partager ce kit"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Partager mon kit</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onNavigate('generator')}
              className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white border border-white/10 transition-colors cursor-pointer"
              title="Créer un nouveau kit"
            >
              <PlusCircle className="w-4 h-4" />
            </motion.button>
          </div>
        </div>

        {/* Engine Note banner */}
        <div className="p-3 rounded-xl bg-black/40 border border-white/5 text-[11px] text-neutral-400 flex items-center justify-between">
          <span>{kit.engineNote}</span>
          <span className="text-indigo-400 font-medium hidden sm:inline">100% prêt à l'emploi</span>
        </div>
      </motion.div>

      {/* Segmented Filter Navigation Tabs with Motion layoutId */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 p-1.5 bg-[#0d0f17] border border-white/10 rounded-2xl overflow-x-auto no-scrollbar">
          {[
            { id: 'posts', label: '📌 Posts (10)', icon: Layers },
            { id: 'captions', label: '✍️ Captions (10)', icon: FileText },
            { id: 'reels', label: '🎬 Reels / TikTok (5)', icon: Video },
            { id: 'whatsapp', label: '💬 WhatsApp (5)', icon: MessageSquare },
            { id: 'marketing', label: '🚀 Marketing & Ads', icon: Megaphone },
            { id: 'calendar', label: '📅 Calendrier (7J)', icon: Calendar },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`relative flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isActive ? 'text-white' : 'text-neutral-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeResultPill"
                    className="absolute inset-0 bg-indigo-600 rounded-xl shadow-md shadow-indigo-600/30"
                    transition={{ type: 'spring', bounce: 0.15, duration: 0.35 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1.5">
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </span>
              </button>
            );
          })}
        </div>

        {/* Real-time search inside posts and captions */}
        {(activeTab === 'posts' || activeTab === 'captions') && (
          <div className="relative min-w-[200px]">
            <Search className="w-3.5 h-3.5 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filtrer par mot-clé..."
              className="w-full h-9 pl-8 pr-3 rounded-xl bg-[#0d0f17] border border-white/10 text-xs text-white placeholder:text-neutral-600 focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>
        )}
      </div>

      {/* TAB CONTENT WITH ANIMATEPRESENCE */}
      <AnimatePresence mode="wait">
        {/* TAB 1: POSTS */}
        {activeTab === 'posts' && (
          <motion.div
            key="posts"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-white font-display">
                10 Idées de Publications Prêtes à Publier
              </h2>
              <span className="text-xs text-neutral-400">
                {filteredPosts.length} publication(s) affichée(s)
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredPosts.map((post) => (
                <motion.div
                  key={post.id}
                  layout
                  whileHover={{ y: -2 }}
                  className="rounded-2xl p-5 bg-[#0d0f17] border border-white/10 space-y-4 hover:border-white/20 transition-all flex flex-col justify-between shadow-md"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-indigo-400">Post #{post.id}</span>
                      <span className="text-xs text-neutral-400 font-medium">{post.title}</span>
                    </div>

                    <div className="p-2.5 rounded-lg bg-white/5 text-xs text-neutral-300">
                      <span className="font-semibold text-white">Idée :</span> {post.idea}
                    </div>

                    <div className="space-y-1">
                      <span className="text-[11px] font-semibold text-neutral-500 uppercase">Caption suggérée</span>
                      <p className="text-xs text-neutral-200 whitespace-pre-line leading-relaxed bg-black/30 p-3 rounded-xl border border-white/5 font-sans">
                        {post.caption}
                      </p>
                    </div>

                    <div className="text-xs text-indigo-300 font-medium">
                      {post.cta}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-white/5 flex items-center justify-between gap-2">
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() =>
                        handleCopyText(`${post.caption}\n\n${post.cta}`, `post_${post.id}`, `Post #${post.id}`)
                      }
                      className="flex-1 py-2 px-3 rounded-lg bg-white/5 hover:bg-white/10 text-white text-xs font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      {copiedItem === `post_${post.id}` ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Copié !</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copier</span>
                        </>
                      )}
                    </motion.button>

                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleRegeneratePost(post.id)}
                      disabled={regeneratingPostId === post.id}
                      className="py-2 px-3 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50"
                      title="Regénérer cette idée"
                    >
                      <RefreshCw
                        className={`w-3.5 h-3.5 ${regeneratingPostId === post.id ? 'animate-spin text-indigo-400' : ''}`}
                      />
                      <span>Regénérer</span>
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* TAB 2: CAPTIONS */}
        {activeTab === 'captions' && (
          <motion.div
            key="captions"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-white font-display">
                10 Captions Prêtes à l’Emploi
              </h2>
              <span className="text-xs text-neutral-400">Copie en 1 clic</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredCaptions.map((cap) => (
                <motion.div
                  key={cap.id}
                  layout
                  whileHover={{ y: -2 }}
                  className="rounded-2xl p-5 bg-[#0d0f17] border border-white/10 space-y-3 hover:border-white/20 transition-all flex flex-col justify-between shadow-md"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-indigo-400">Caption #{cap.id}</span>
                      <span className="text-[11px] text-neutral-400 font-medium">{cap.theme}</span>
                    </div>

                    <p className="text-xs sm:text-sm text-neutral-200 leading-relaxed bg-black/30 p-3.5 rounded-xl border border-white/5 font-sans">
                      {cap.text}
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-1 text-[11px] text-indigo-300/80">
                      {cap.hashtags.map((h, i) => (
                        <span key={i}>{h}</span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2">
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() =>
                        handleCopyText(`${cap.text}\n\n${cap.hashtags.join(' ')}`, `cap_${cap.id}`, `Caption #${cap.id}`)
                      }
                      className="w-full py-2 px-3 rounded-lg bg-white/5 hover:bg-white/10 text-white text-xs font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      {copiedItem === `cap_${cap.id}` ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Caption copiée !</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copier la caption</span>
                        </>
                      )}
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* TAB 3: REELS / TIKTOK */}
        {activeTab === 'reels' && (
          <motion.div
            key="reels"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-white font-display">
                5 Idées de Vidéos Courtes (Reels & TikTok)
              </h2>
              <span className="text-xs text-neutral-400">Format vertical 9:16</span>
            </div>

            <div className="space-y-4">
              {kit.reels.map((reel) => (
                <motion.div
                  key={reel.id}
                  whileHover={{ y: -2 }}
                  className="rounded-2xl p-5 sm:p-6 bg-[#0d0f17] border border-white/10 space-y-4 hover:border-white/20 transition-all shadow-md"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-rose-500/15 text-rose-400 flex items-center justify-center">
                        <Video className="w-4 h-4" />
                      </div>
                      <h3 className="text-base font-bold text-white">
                        Reel #{reel.id} : {reel.title}
                      </h3>
                    </div>

                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() =>
                        handleCopyText(
                          `HOOK: ${reel.hook}\n\nCONCEPT: ${reel.concept}\n\nDÉROULEMENT:\n${reel.flow.join('\n')}\n\nCTA: ${reel.cta}`,
                          `reel_${reel.id}`,
                          `Script Reel #${reel.id}`
                        )
                      }
                      className="self-start sm:self-auto py-1.5 px-3 rounded-lg bg-white/5 hover:bg-white/10 text-white text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      {copiedItem === `reel_${reel.id}` ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Script copié !</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copier le script</span>
                        </>
                      )}
                    </motion.button>
                  </div>

                  <div className="p-3.5 rounded-xl bg-rose-950/20 border border-rose-500/20 space-y-1">
                    <span className="text-[11px] font-bold text-rose-400 uppercase tracking-wider">
                      🎯 Hook (Accroche des 3 premières secondes)
                    </span>
                    <p className="text-sm font-semibold text-white">{reel.hook}</p>
                  </div>

                  <div className="space-y-1.5 text-xs text-neutral-300">
                    <span className="font-semibold text-neutral-400">Concept :</span> {reel.concept}
                  </div>

                  <div className="space-y-2 bg-black/30 p-3.5 rounded-xl border border-white/5">
                    <span className="text-[11px] font-semibold text-neutral-500 uppercase">
                      Déroulement pas-à-pas
                    </span>
                    <div className="space-y-1.5 text-xs text-neutral-200">
                      {reel.flow.map((step, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <span className="text-indigo-400 shrink-0 font-bold">•</span>
                          <span>{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="text-xs text-emerald-400 font-medium">
                    Appel à l'action final : {reel.cta}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* TAB 4: WHATSAPP */}
        {activeTab === 'whatsapp' && (
          <motion.div
            key="whatsapp"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-white font-display">
                Messages Clients WhatsApp
              </h2>
              <span className="text-xs text-emerald-400 font-medium">Réponses prêtes à coller</span>
            </div>

            <div className="space-y-4">
              {[
                { title: 'Message d\'accueil (Bienvenue)', key: 'welcome', text: kit.whatsapp.welcome },
                { title: 'Réponse à « Quel est le prix ? »', key: 'pricing', text: kit.whatsapp.pricing },
                { title: 'Réponse à « C\'est disponible ? »', key: 'availability', text: kit.whatsapp.availability },
                { title: 'Message de relance client', key: 'followUp', text: kit.whatsapp.followUp },
                { title: 'Message après achat / fidélisation', key: 'afterSale', text: kit.whatsapp.afterSale },
              ].map((wa) => (
                <motion.div
                  key={wa.key}
                  whileHover={{ y: -2 }}
                  className="rounded-2xl p-5 bg-[#0d0f17] border border-white/10 space-y-3 hover:border-white/20 transition-all shadow-md"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-md bg-emerald-500/15 text-emerald-400 flex items-center justify-center">
                        <MessageSquare className="w-3.5 h-3.5" />
                      </div>
                      <h3 className="text-sm font-bold text-white">{wa.title}</h3>
                    </div>

                    <div className="flex items-center gap-2">
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleCopyText(wa.text, `wa_${wa.key}`, wa.title)}
                        className="py-1 px-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-white text-xs font-medium flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        {copiedItem === `wa_${wa.key}` ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-400" />
                            <span>Copié !</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copier</span>
                          </>
                        )}
                      </motion.button>
                      <a
                        href={`https://api.whatsapp.com/send?text=${encodeURIComponent(wa.text)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-1 px-2.5 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 text-xs font-medium flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        <Send className="w-3 h-3" />
                        <span>Tester</span>
                      </a>
                    </div>
                  </div>

                  <div className="bg-[#0b141a] p-4 rounded-xl border border-emerald-500/20 text-xs sm:text-sm text-neutral-200 whitespace-pre-line leading-relaxed font-sans">
                    {wa.text}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* TAB 5: MARKETING ARSENAL */}
        {activeTab === 'marketing' && (
          <motion.div
            key="marketing"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="space-y-8"
          >
            {/* Slogans */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white font-display">5 Slogans de Marque</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {kit.marketing.slogans.map((slogan, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ y: -2 }}
                    className="rounded-xl p-3.5 bg-[#0d0f17] border border-white/10 flex items-center justify-between gap-3 text-xs sm:text-sm text-neutral-200"
                  >
                    <span className="font-medium italic">« {slogan} »</span>
                    <button
                      onClick={() => handleCopyText(slogan, `slogan_${idx}`, 'Slogan')}
                      className="p-1.5 rounded-lg hover:bg-white/10 text-neutral-400 hover:text-white cursor-pointer shrink-0"
                      title="Copier le slogan"
                    >
                      {copiedItem === `slogan_${idx}` ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Offres Promotionnelles */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white font-display">3 Offres Promotionnelles</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {kit.marketing.promoOffers.map((promo, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ y: -2 }}
                    className="rounded-2xl p-5 bg-[#0d0f17] border border-white/10 space-y-3 flex flex-col justify-between shadow-md"
                  >
                    <div className="space-y-2">
                      <span className="text-[11px] font-bold text-amber-400 uppercase">Offre #{idx + 1}</span>
                      <h4 className="text-sm font-bold text-white">{promo.title}</h4>
                      <p className="text-xs text-indigo-300 font-semibold bg-indigo-950/40 p-2 rounded-lg border border-indigo-500/20">
                        {promo.deal}
                      </p>
                      <p className="text-xs text-neutral-400">
                        <strong className="text-neutral-300">Condition :</strong> {promo.condition}
                      </p>
                      <p className="text-xs text-neutral-300 italic">« {promo.pitch} »</p>
                    </div>

                    <button
                      onClick={() =>
                        handleCopyText(`${promo.title}\n${promo.deal}\n${promo.pitch}`, `promo_${idx}`, 'Offre promo')
                      }
                      className="w-full mt-2 py-2 px-3 rounded-lg bg-white/5 hover:bg-white/10 text-white text-xs font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      {copiedItem === `promo_${idx}` ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Offre copiée !</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copier l'offre</span>
                        </>
                      )}
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Textes Publicitaires Ads */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white font-display">5 Textes Publicitaires (Facebook / Insta Ads)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {kit.marketing.adCopies.map((ad, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ y: -2 }}
                    className="rounded-2xl p-5 bg-[#0d0f17] border border-white/10 space-y-3 flex flex-col justify-between shadow-md"
                  >
                    <div className="space-y-2">
                      <span className="text-[11px] font-semibold text-neutral-400">{ad.angle}</span>
                      <h4 className="text-sm font-bold text-white leading-snug">{ad.headline}</h4>
                      <p className="text-xs text-neutral-300 leading-relaxed bg-black/30 p-3 rounded-xl border border-white/5">
                        {ad.body}
                      </p>
                      <p className="text-xs text-indigo-400 font-semibold">{ad.cta}</p>
                    </div>

                    <button
                      onClick={() =>
                        handleCopyText(`${ad.headline}\n\n${ad.body}\n\n${ad.cta}`, `ad_${idx}`, 'Texte pub')
                      }
                      className="w-full py-2 px-3 rounded-lg bg-white/5 hover:bg-white/10 text-white text-xs font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      {copiedItem === `ad_${idx}` ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Texte pub copié !</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copier le texte publicitaire</span>
                        </>
                      )}
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Bio Instagram & Description Pro */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div
                whileHover={{ y: -2 }}
                className="rounded-2xl p-5 bg-[#0d0f17] border border-white/10 space-y-3 flex flex-col justify-between shadow-md"
              >
                <div className="space-y-2">
                  <span className="text-xs font-bold text-rose-400">Bio Instagram Optimisée</span>
                  <div className="bg-black/40 p-4 rounded-xl border border-white/5 text-xs sm:text-sm text-neutral-200 whitespace-pre-line leading-relaxed font-sans">
                    {kit.marketing.instagramBio.formatted}
                  </div>
                </div>
                <button
                  onClick={() =>
                    handleCopyText(kit.marketing.instagramBio.formatted, 'bio_insta', 'Bio Instagram')
                  }
                  className="w-full py-2 px-3 rounded-lg bg-white/5 hover:bg-white/10 text-white text-xs font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  {copiedItem === 'bio_insta' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Bio copiée !</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copier la bio Instagram</span>
                    </>
                  )}
                </button>
              </motion.div>

              <motion.div
                whileHover={{ y: -2 }}
                className="rounded-2xl p-5 bg-[#0d0f17] border border-white/10 space-y-3 flex flex-col justify-between shadow-md"
              >
                <div className="space-y-2">
                  <span className="text-xs font-bold text-indigo-400">Description Professionnelle (Google / Site)</span>
                  <p className="bg-black/40 p-4 rounded-xl border border-white/5 text-xs sm:text-sm text-neutral-200 leading-relaxed font-sans">
                    {kit.marketing.professionalDescription}
                  </p>
                </div>
                <button
                  onClick={() =>
                    handleCopyText(kit.marketing.professionalDescription, 'pro_desc', 'Description pro')
                  }
                  className="w-full py-2 px-3 rounded-lg bg-white/5 hover:bg-white/10 text-white text-xs font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  {copiedItem === 'pro_desc' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Description copiée !</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copier la description</span>
                    </>
                  )}
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* TAB 6: CALENDAR */}
        {activeTab === 'calendar' && (
          <motion.div
            key="calendar"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-white font-display">
                Calendrier de Contenu sur 7 Jours
              </h2>
              <span className="text-xs text-neutral-400">Plan Gratuit · Semaine type</span>
            </div>

            <div className="space-y-3">
              {kit.calendar.map((dayItem, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -2 }}
                  className="rounded-2xl p-4 sm:p-5 bg-[#0d0f17] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-white/20 transition-all shadow-md"
                >
                  <div className="flex items-start sm:items-center gap-3">
                    <div className="w-12 text-center shrink-0">
                      <span className="text-sm font-bold text-indigo-400 font-display">
                        {dayItem.day}
                      </span>
                      <span className="block text-[10px] text-neutral-500 uppercase">{dayItem.type.split('/')[0]}</span>
                    </div>

                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-sm font-bold text-white">{dayItem.theme}</span>
                        <span className="text-[11px] text-indigo-300 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                          {dayItem.type}
                        </span>
                      </div>
                      <p className="text-xs text-neutral-300">
                        <strong className="text-neutral-400">Action :</strong> {dayItem.actionIdea}
                      </p>
                      <p className="text-xs text-neutral-400 italic">
                        Accroche recommandée : {dayItem.exampleHook}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() =>
                      handleCopyText(
                        `${dayItem.day} : ${dayItem.theme}\nAction : ${dayItem.actionIdea}\nAccroche : ${dayItem.exampleHook}`,
                        `cal_${idx}`,
                        `${dayItem.day}`
                      )
                    }
                    className="self-end sm:self-center py-1.5 px-3 rounded-lg bg-white/5 hover:bg-white/10 text-white text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
                  >
                    {copiedItem === `cal_${idx}` ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Copié</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copier</span>
                      </>
                    )}
                  </button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* LIMITATION GRATUITE & UPSELL SECTION */}
      <motion.section
        whileHover={{ scale: 1.01 }}
        className="rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-indigo-950/40 via-purple-950/20 to-neutral-900 border border-indigo-500/30 space-y-4 glow-indigo"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-white font-display">
              Tu veux aller plus loin ?
            </h3>
            <p className="text-xs sm:text-sm text-neutral-300 max-w-xl">
              Passe à la vitesse supérieure avec le plan Pro : 30 jours de calendrier de contenu, davantage d'idées de Reels, campagnes publicitaires ciblées et exports illimités.
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onNavigate('pricing')}
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/30 whitespace-nowrap cursor-pointer flex items-center gap-1.5 self-start sm:self-auto"
          >
            <span>Découvrir les offres Pro</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </motion.button>
        </div>
      </motion.section>

      {/* VIRAL LOOP */}
      <section className="rounded-2xl p-6 bg-neutral-900/40 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-center sm:text-left">
        <div className="space-y-1">
          <h4 className="text-sm font-bold text-white">
            Tu connais un entrepreneur qui en aurait besoin ?
          </h4>
          <p className="text-xs text-neutral-400">
            Fais découvrir BizPilot AI à tes amis commerçants, artisans ou créateurs de contenu.
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={shareBizPilotViral}
          className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer self-center sm:self-auto whitespace-nowrap"
        >
          <Share2 className="w-3.5 h-3.5" />
          <span>Partager BizPilot</span>
        </motion.button>
      </section>
    </div>
  );
};
