import React, { useState, useEffect } from 'react';
import { BusinessKit, PageView, UserProfile } from '../types';
import { storageService } from '../services/storageService';
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
} from 'lucide-react';

interface DashboardViewProps {
  currentUser: UserProfile | null;
  onNavigate: (view: PageView) => void;
  onSelectKit: (kit: BusinessKit) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  currentUser,
  onNavigate,
  onSelectKit,
}) => {
  const [kits, setKits] = useState<BusinessKit[]>([]);

  useEffect(() => {
    setKits(storageService.getKits());
  }, []);

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Voulez-vous vraiment supprimer ce Business Kit de votre historique ?')) {
      storageService.deleteKit(id);
      setKits(storageService.getKits());
    }
  };

  const genCount = storageService.getGenCount();
  const maxFree = 1;
  const remainingGen = Math.max(0, maxFree - genCount);
  const activeBusinessName = kits.length > 0 ? kits[0].input.businessName : 'Ton activité';

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-10">
      {/* Top Welcome Card */}
      <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-indigo-950/40 via-neutral-900 to-[#0d0f17] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-2xl">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Tableau de bord utilisateur</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white">
            Bonjour {currentUser ? currentUser.name : ''} 👋
          </h1>
          <p className="text-sm text-neutral-300 flex items-center gap-1.5">
            <Building className="w-4 h-4 text-neutral-500" />
            <span>Ton activité : <strong className="text-white">{activeBusinessName}</strong></span>
          </p>
        </div>

        <button
          onClick={() => onNavigate('generator')}
          className="min-h-[44px] px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 transition-all cursor-pointer self-start sm:self-auto whitespace-nowrap"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Créer un nouveau kit</span>
        </button>
      </div>

      {/* Metric Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Kits créés */}
        <div className="rounded-2xl p-5 bg-[#0d0f17] border border-white/10 space-y-1">
          <span className="text-xs text-neutral-400">Business Kits créés</span>
          <div className="text-2xl sm:text-3xl font-extrabold text-white font-display">
            {kits.length}
          </div>
          <p className="text-[11px] text-neutral-500">Stockés en local sur cet appareil</p>
        </div>

        {/* Générations restantes */}
        <div className="rounded-2xl p-5 bg-[#0d0f17] border border-white/10 space-y-1">
          <span className="text-xs text-neutral-400">Générations restantes (Plan Free)</span>
          <div className="text-2xl sm:text-3xl font-extrabold text-indigo-400 font-display">
            {currentUser?.plan === 'pro' ? 'Illimitées' : `${remainingGen} / ${maxFree}`}
          </div>
          <p className="text-[11px] text-neutral-500">
            {remainingGen === 0 ? 'Passe à Pro pour débloquer' : '1 kit gratuit d’essai'}
          </p>
        </div>

        {/* Plan Actuel */}
        <div className="rounded-2xl p-5 bg-[#0d0f17] border border-white/10 space-y-1 flex flex-col justify-between">
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
            <span>Voir les offres supérieures</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Historique Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white font-display flex items-center gap-2">
            <Layers className="w-5 h-5 text-indigo-400" />
            <span>Historique des Business Kits</span>
          </h2>
          <span className="text-xs text-neutral-400">{kits.length} kit(s) au total</span>
        </div>

        {kits.length === 0 ? (
          <div className="rounded-2xl p-8 bg-[#0d0f17] border border-white/10 text-center space-y-4">
            <p className="text-sm text-neutral-400">
              Vous n'avez pas encore généré de Business Kit.
            </p>
            <button
              onClick={() => onNavigate('generator')}
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold cursor-pointer"
            >
              Générer mon premier kit
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {kits.map((kit) => (
              <div
                key={kit.id}
                onClick={() => onSelectKit(kit)}
                className="rounded-2xl p-4 sm:p-5 bg-[#0d0f17] border border-white/10 hover:border-white/20 transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors">
                      {kit.input.businessName}
                    </h3>
                    <span className="text-xs text-neutral-400 bg-white/5 px-2 py-0.5 rounded border border-white/5">
                      {kit.input.activity}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-400">
                    <span>{kit.input.city}</span>
                    <span>·</span>
                    <span>{kit.input.goal}</span>
                    <span>·</span>
                    <span className="flex items-center gap-1 text-neutral-500">
                      <Calendar className="w-3 h-3" />
                      {new Date(kit.createdAt).toLocaleDateString('fr-FR')}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectKit(kit);
                    }}
                    className="py-1.5 px-3 rounded-lg bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Voir</span>
                  </button>

                  <button
                    onClick={(e) => handleDelete(kit.id, e)}
                    className="p-1.5 rounded-lg hover:bg-red-500/20 text-neutral-500 hover:text-red-400 cursor-pointer transition-colors"
                    title="Supprimer ce kit"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Architecture Supabase Readiness notice */}
      <div className="p-4 rounded-xl bg-white/5 border border-white/5 flex items-center gap-3 text-xs text-neutral-400">
        <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
        <span>
          Architecture prête pour synchronisation cloud multi-appareils (Supabase / PostgreSQL) en version V2.
        </span>
      </div>
    </div>
  );
};
