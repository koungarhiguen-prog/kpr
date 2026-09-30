import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BusinessKit, PageView, UserProfile, ContentGenerationRecord } from '../types';
import { storageService } from '../services/storageService';
import { supabaseService } from '../services/supabaseService';
import {
  Sparkles,
  PlusCircle,
  Eye,
  Trash2,
  Calendar,
  Layers,
  ArrowRight,
  ShieldCheck,
  Building,
  AlertTriangle,
  Database,
  RefreshCw,
  Clock,
  FileText,
} from 'lucide-react';

interface DashboardViewProps {
  currentUser: UserProfile | null;
  onNavigate: (view: PageView) => void;
  onSelectKit: (kit: BusinessKit) => void;
}

interface HistoryItem {
  id: string;
  source: 'supabase' | 'local';
  contentType: string;
  businessName: string;
  createdAt: string;
  previewText: string;
  kit: BusinessKit;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  currentUser,
  onNavigate,
  onSelectKit,
}) => {
  const [historyItems, setHistoryItems] = useState<HistoryItem[]>([]);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<HistoryItem | null>(null);

  const isConfigured = supabaseService.isConfigured();

  const loadHistory = async () => {
    setLoadingHistory(true);
    const combined: HistoryItem[] = [];

    // 1. If user is logged in and Supabase is configured, fetch from Supabase table content_generations
    if (currentUser && isConfigured) {
      try {
        const records = await supabaseService.getGenerations(currentUser.id);
        for (const rec of records) {
          try {
            const parsedKit: BusinessKit = JSON.parse(rec.generated_content);
            const preview =
              parsedKit.posts?.[0]?.caption?.slice(0, 140) ||
              parsedKit.input?.description?.slice(0, 140) ||
              'Contenu marketing complet (10 posts, reels, WhatsApp)';

            combined.push({
              id: rec.id,
              source: 'supabase',
              contentType: rec.content_type || 'Business Kit',
              businessName: rec.business_name || parsedKit.input.businessName,
              createdAt: rec.created_at,
              previewText: preview,
              kit: parsedKit,
            });
          } catch (e) {
            console.warn('Could not parse generated_content JSON:', e);
          }
        }
      } catch (err) {
        console.error('Error loading Supabase history:', err);
      }
    }

    // 2. Also merge any local session kits that aren't already duplicated
    const localKits = storageService.getKits();
    for (const kit of localKits) {
      const alreadyIn = combined.some((it) => it.kit.id === kit.id);
      if (!alreadyIn) {
        const preview =
          kit.posts?.[0]?.caption?.slice(0, 140) ||
          kit.input?.description?.slice(0, 140) ||
          'Contenu marketing complet';

        combined.push({
          id: kit.id,
          source: 'local',
          contentType: 'Business Kit',
          businessName: kit.input.businessName,
          createdAt: kit.createdAt,
          previewText: preview,
          kit,
        });
      }
    }

    setHistoryItems(combined);
    setLoadingHistory(false);
  };

  useEffect(() => {
    loadHistory();
  }, [currentUser]);

  const confirmDelete = async () => {
    if (!itemToDelete) return;

    if (itemToDelete.source === 'supabase' && currentUser) {
      await supabaseService.deleteGeneration(itemToDelete.id, currentUser.id);
    }
    // Also delete from local storage if exists
    storageService.deleteKit(itemToDelete.kit.id);

    setHistoryItems((prev) => prev.filter((it) => it.id !== itemToDelete.id));
    setItemToDelete(null);
  };

  const activeBusinessName =
    currentUser?.businessName ||
    (historyItems.length > 0 ? historyItems[0].businessName : 'Ton activité');

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-10">
      {/* Top Welcome Card */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-indigo-950/40 via-neutral-900 to-[#0d0f17] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-2xl glow-card"
      >
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-400">
            <Sparkles className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '6s' }} />
            <span>Tableau de bord SaaS</span>
            {isConfigured && currentUser && (
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-medium flex items-center gap-1">
                <Database className="w-2.5 h-2.5" />
                <span>Supabase connecté</span>
              </span>
            )}
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white">
            Bonjour {currentUser ? currentUser.name : 'Entrepreneur'} 👋
          </h1>
          <p className="text-sm text-neutral-300 flex items-center gap-1.5 font-sans">
            <Building className="w-4 h-4 text-neutral-500" />
            <span>
              Activité : <strong className="text-white">{activeBusinessName}</strong>
              {currentUser?.email && (
                <span className="text-neutral-400 text-xs ml-2">({currentUser.email})</span>
              )}
            </span>
          </p>
        </div>

        <div className="flex items-center gap-2.5 self-start sm:self-auto">
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => onNavigate('generator')}
            className="min-h-[44px] px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 transition-all cursor-pointer whitespace-nowrap"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Créer un nouveau kit</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Supabase Setup Banner if not configured */}
      {!isConfigured && (
        <div className="rounded-2xl p-5 bg-[#0e111d] border border-amber-500/30 text-amber-200 space-y-2">
          <div className="flex items-center gap-2 text-sm font-bold text-white">
            <Database className="w-4 h-4 text-amber-400" />
            <span>Persistance Supabase prête à être connectée</span>
          </div>
          <p className="text-xs text-neutral-300 leading-relaxed font-sans">
            Pour activer la synchronisation multi-appareils dans le cloud, ajoutez <code className="text-amber-300 bg-white/5 px-1 py-0.5 rounded">VITE_SUPABASE_URL</code> et <code className="text-amber-300 bg-white/5 px-1 py-0.5 rounded">VITE_SUPABASE_ANON_KEY</code> dans votre environnement. Les tables et les règles RLS sont prêtes dans le fichier <code className="text-indigo-300 bg-white/5 px-1 py-0.5 rounded">supabase_schema.sql</code>.
          </p>
        </div>
      )}

      {/* Metric Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Total Générations */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          whileHover={{ y: -3 }}
          className="rounded-2xl p-5 bg-[#0d0f17] border border-white/10 space-y-1 shadow-md"
        >
          <span className="text-xs text-neutral-400">Contenus enregistrés</span>
          <div className="text-2xl sm:text-3xl font-extrabold text-white font-display">
            {historyItems.length}
          </div>
          <p className="text-[11px] text-neutral-500">
            {isConfigured && currentUser ? 'Stockés dans public.content_generations' : 'Stockés sur cet appareil'}
          </p>
        </motion.div>

        {/* Statut Compte */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          whileHover={{ y: -3 }}
          className="rounded-2xl p-5 bg-[#0d0f17] border border-white/10 space-y-1 shadow-md"
        >
          <span className="text-xs text-neutral-400">Authentification</span>
          <div className="text-2xl sm:text-3xl font-extrabold text-indigo-400 font-display">
            {currentUser ? 'Connecté' : 'Invité'}
          </div>
          <p className="text-[11px] text-neutral-500">
            {currentUser ? `ID: ${currentUser.id.slice(0, 8)}...` : 'Crée un compte pour sauvegarder'}
          </p>
        </motion.div>

        {/* Plan Actuel */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          whileHover={{ y: -3 }}
          className="rounded-2xl p-5 bg-[#0d0f17] border border-white/10 space-y-1 flex flex-col justify-between shadow-md"
        >
          <div>
            <span className="text-xs text-neutral-400">Plan actuel</span>
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-display">
              {currentUser?.plan === 'pro' ? 'Pro' : 'Gratuit'}
            </div>
          </div>
          <button
            onClick={() => onNavigate('pricing')}
            className="text-xs text-indigo-400 hover:text-indigo-300 font-medium flex items-center gap-1 cursor-pointer pt-2"
          >
            <span>Voir les offres</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </motion.div>
      </div>

      {/* SECTION 4: MON HISTORIQUE */}
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <h2 className="text-xl sm:text-2xl font-bold text-white font-display flex items-center gap-2">
              <Layers className="w-5 h-5 text-indigo-400" />
              <span>Mon historique</span>
            </h2>
            <p className="text-xs text-neutral-400">
              Retrouvez l'intégralité des contenus générés pour votre entreprise.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={loadHistory}
              disabled={loadingHistory}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition-colors cursor-pointer"
              title="Rafraîchir l'historique"
            >
              <RefreshCw className={`w-4 h-4 ${loadingHistory ? 'animate-spin text-indigo-400' : ''}`} />
            </button>
            <span className="text-xs text-neutral-400">{historyItems.length} élément(s)</span>
          </div>
        </div>

        {historyItems.length === 0 ? (
          <div className="rounded-3xl p-10 bg-[#0d0f17] border border-white/10 text-center space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto text-neutral-400">
              <FileText className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-bold text-white">Aucun contenu dans votre historique</h3>
              <p className="text-xs text-neutral-400 max-w-md mx-auto">
                Générez votre premier Business Kit avec l'IA. Il apparaîtra automatiquement ici et sera sauvegardé sur votre compte.
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onNavigate('generator')}
              className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold cursor-pointer inline-flex items-center gap-2 shadow-md shadow-indigo-600/25"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Générer mon premier kit</span>
            </motion.button>
          </div>
        ) : (
          <div className="space-y-3">
            <AnimatePresence>
              {historyItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                  transition={{ duration: 0.25, delay: index * 0.04 }}
                  className="rounded-2xl p-4 sm:p-5 bg-[#0d0f17] border border-white/10 hover:border-indigo-500/30 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 group shadow-sm hover:shadow-lg"
                >
                  {/* Left info */}
                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors">
                        {item.businessName}
                      </h3>
                      <span className="text-[11px] font-semibold text-indigo-300 bg-indigo-500/10 px-2.5 py-0.5 rounded-full border border-indigo-500/20">
                        {item.contentType}
                      </span>
                      {item.source === 'supabase' && (
                        <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 font-mono">
                          Supabase
                        </span>
                      )}
                    </div>

                    {/* Aperçu du contenu */}
                    <p className="text-xs text-neutral-300 font-sans line-clamp-2 leading-relaxed bg-black/30 p-2.5 rounded-xl border border-white/5">
                      {item.previewText}
                    </p>

                    <div className="flex items-center gap-2 text-[11px] text-neutral-500 font-sans">
                      <Clock className="w-3 h-3" />
                      <span>
                        Généré le{' '}
                        {new Date(item.createdAt).toLocaleDateString('fr-FR', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>
                  </div>

                  {/* Actions: Voir & Supprimer */}
                  <div className="flex items-center gap-2 self-end md:self-center shrink-0">
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => onSelectKit(item.kit)}
                      className="py-2 px-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-all shadow-md shadow-indigo-600/20"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Voir</span>
                    </motion.button>

                    <button
                      onClick={() => setItemToDelete(item)}
                      className="p-2 rounded-xl hover:bg-red-500/20 text-neutral-400 hover:text-red-400 cursor-pointer transition-colors"
                      title="Supprimer ce contenu"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {itemToDelete && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-sm rounded-3xl p-6 bg-[#0e1019] border border-white/10 shadow-2xl space-y-4 glow-card"
            >
              <div className="flex items-center gap-3 text-rose-400">
                <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Supprimer cette génération ?</h3>
                  <p className="text-[11px] text-neutral-400">{itemToDelete.businessName}</p>
                </div>
              </div>
              <p className="text-xs text-neutral-300 leading-relaxed font-sans">
                Cette action supprimera définitivement ce contenu de votre historique Supabase.
              </p>
              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  onClick={() => setItemToDelete(null)}
                  className="px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-300 text-xs font-medium cursor-pointer"
                >
                  Annuler
                </button>
                <button
                  onClick={confirmDelete}
                  className="px-4 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold cursor-pointer shadow-md"
                >
                  Supprimer
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* RLS Security Notice */}
      <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-3 text-xs text-neutral-400">
        <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
        <span>
          Sécurité RLS (Row Level Security) active : seules vos propres générations sont lisibles et modifiables par votre compte via <code className="text-indigo-300">auth.uid()</code>.
        </span>
      </div>
    </div>
  );
};
