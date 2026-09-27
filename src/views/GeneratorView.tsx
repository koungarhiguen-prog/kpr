import React, { useState } from 'react';
import { BusinessActivity, MarketingGoal, BrandTone, BusinessInput, BusinessKit, PageView } from '../types';
import { getAIProvider } from '../services/aiProvider';
import { storageService } from '../services/storageService';
import {
  Sparkles,
  Loader2,
  Store,
  MapPin,
  Target,
  Sliders,
  AlertCircle,
  CheckCircle,
  RefreshCw,
} from 'lucide-react';

interface GeneratorViewProps {
  onKitGenerated: (kit: BusinessKit) => void;
  onNavigate: (view: PageView) => void;
}

const ACTIVITIES: BusinessActivity[] = [
  'Restaurant',
  'Coiffeur / Barbier',
  'Boutique de vêtements',
  'Beauté',
  'Photographe',
  'Réparation téléphone',
  'Informaticien',
  'Professeur',
  'Coach',
  'Freelance',
  'Autre',
];

const GOALS: MarketingGoal[] = [
  'Obtenir plus de clients',
  'Augmenter les ventes',
  'Développer Instagram',
  'Promouvoir une offre',
  'Faire connaître mon activité',
];

const TONES: BrandTone[] = [
  'Professionnel',
  'Dynamique',
  'Premium',
  'Jeune',
  'Humoristique',
];

export const GeneratorView: React.FC<GeneratorViewProps> = ({ onKitGenerated, onNavigate }) => {
  const [formData, setFormData] = useState<BusinessInput>({
    activity: 'Restaurant',
    businessName: '',
    description: '',
    city: '',
    goal: 'Obtenir plus de clients',
    tone: 'Dynamique',
  });

  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [showLimitNotice, setShowLimitNotice] = useState(false);

  const steps = [
    'Analyse du secteur et de la concurrence locale...',
    'Composition des 10 idées de posts & accroches...',
    'Rédaction des 10 captions prêtes à copier...',
    'Scénarisation des 5 vidéos Reels & scripts TikTok...',
    'Formatage des messages clients WhatsApp...',
    'Création des textes pubs & calendrier 7 jours...',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.businessName.trim()) {
      setError('Veuillez entrer le nom de votre business.');
      return;
    }
    if (!formData.city.trim()) {
      setError('Veuillez préciser votre ville.');
      return;
    }

    // Check free tier limits
    const canGen = storageService.canGenerateFree();
    if (!canGen) {
      setShowLimitNotice(true);
      return;
    }

    setLoading(true);
    setLoadingStep(0);

    // Animation stages across ~1.5 - 2s
    const stepInterval = setInterval(() => {
      setLoadingStep((prev) => {
        if (prev < steps.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 280);

    try {
      const provider = getAIProvider();
      const generatedKit = await provider.generateBusinessKit(formData);

      clearInterval(stepInterval);
      storageService.saveKit(generatedKit);
      setLoading(false);
      onKitGenerated(generatedKit);
    } catch (err) {
      clearInterval(stepInterval);
      setLoading(false);
      setError('Une erreur est survenue lors de la génération. Réessayez.');
      console.error(err);
    }
  };

  // Prefill helper for demoing quickly
  const handlePrefill = (type: 'food' | 'barber' | 'fashion') => {
    if (type === 'food') {
      setFormData({
        activity: 'Restaurant',
        businessName: 'Mama Food',
        description: 'Grillades au feu de bois, spécialités locales et cocktails frais dans une ambiance chaleureuse.',
        city: 'Pointe-Noire',
        goal: 'Augmenter les ventes',
        tone: 'Dynamique',
      });
    } else if (type === 'barber') {
      setFormData({
        activity: 'Coiffeur / Barbier',
        businessName: 'Barber Legend',
        description: 'Salon de coiffure masculine haut de gamme, dégradés parfaits, soins de la barbe au rasoir traditionnel.',
        city: 'Abidjan',
        goal: 'Obtenir plus de clients',
        tone: 'Premium',
      });
    } else {
      setFormData({
        activity: 'Boutique de vêtements',
        businessName: 'Luxe & Style',
        description: 'Boutique de prêt-à-porter féminin tendance, pièces chic et collections capsules limitées.',
        city: 'Dakar',
        goal: 'Développer Instagram',
        tone: 'Jeune',
      });
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-semibold text-indigo-400">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Générateur V1 · Moteur Local Instantané</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
          Crée ton Business Kit
        </h1>
        <p className="text-sm sm:text-base text-neutral-400 max-w-lg mx-auto">
          Remplis simplement ces quelques informations. BizPilot génère ton contenu marketing complet en quelques secondes.
        </p>

        {/* Quick demo presets */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-2 text-xs">
          <span className="text-neutral-500">Exemples rapides :</span>
          <button
            type="button"
            onClick={() => handlePrefill('food')}
            className="px-2.5 py-1 rounded-md bg-white/5 hover:bg-white/10 text-neutral-300 border border-white/5 cursor-pointer"
          >
            🍗 Mama Food (Resto)
          </button>
          <button
            type="button"
            onClick={() => handlePrefill('barber')}
            className="px-2.5 py-1 rounded-md bg-white/5 hover:bg-white/10 text-neutral-300 border border-white/5 cursor-pointer"
          >
            ✂️ Barber Legend (Coiffeur)
          </button>
          <button
            type="button"
            onClick={() => handlePrefill('fashion')}
            className="px-2.5 py-1 rounded-md bg-white/5 hover:bg-white/10 text-neutral-300 border border-white/5 cursor-pointer"
          >
            👗 Luxe & Style (Mode)
          </button>
        </div>
      </div>

      {/* Free limit notice modal/banner */}
      {showLimitNotice && (
        <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-200 space-y-3 animate-in fade-in">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-white">Tu veux aller plus loin ?</h4>
              <p className="text-xs text-neutral-300 leading-relaxed">
                Le plan Gratuit comprend 1 génération de Business Kit. Pour générer plusieurs kits et débloquer 30 jours de contenu, découvre le plan Pro.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 pt-1 pl-8">
            <button
              onClick={() => onNavigate('pricing')}
              className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold cursor-pointer"
            >
              Voir le plan Pro
            </button>
            <button
              onClick={() => {
                storageService.resetGenCount();
                setShowLimitNotice(false);
              }}
              className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-white text-xs font-medium cursor-pointer"
            >
              Réinitialiser le compteur (Mode test)
            </button>
          </div>
        </div>
      )}

      {/* Form Card */}
      <div className="rounded-2xl p-6 sm:p-8 bg-[#0d0f17] border border-white/10 shadow-2xl relative">
        {/* Loading Overlay */}
        {loading && (
          <div className="absolute inset-0 z-20 rounded-2xl bg-[#090a0f]/90 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center space-y-6">
            <div className="relative">
              <div className="w-16 h-16 rounded-full border-4 border-indigo-500/20 border-t-indigo-500 animate-spin" />
              <Sparkles className="w-6 h-6 text-indigo-400 absolute inset-0 m-auto" />
            </div>

            <div className="space-y-2 max-w-sm">
              <h3 className="text-lg font-bold text-white font-display">
                Génération de ton Business Kit en cours...
              </h3>
              <p className="text-xs text-indigo-300 font-medium min-h-[36px]">
                {steps[loadingStep]}
              </p>
            </div>

            {/* Progress Bar */}
            <div className="w-full max-w-xs h-1.5 rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 to-violet-400 transition-all duration-300"
                style={{ width: `${((loadingStep + 1) / steps.length) * 100}%` }}
              />
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-xs text-red-300 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Activité */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-neutral-300 flex items-center gap-1.5">
              <Store className="w-3.5 h-3.5 text-indigo-400" />
              <span>Activité</span>
            </label>
            <select
              value={formData.activity}
              onChange={(e) => setFormData({ ...formData, activity: e.target.value as BusinessActivity })}
              className="w-full h-11 px-3.5 rounded-xl bg-neutral-900 border border-white/10 text-white text-sm focus:outline-none focus:border-indigo-500 cursor-pointer"
            >
              {ACTIVITIES.map((act) => (
                <option key={act} value={act}>
                  {act}
                </option>
              ))}
            </select>
          </div>

          {/* Nom du business & Ville */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-neutral-300">
                Nom du business <span className="text-indigo-400">*</span>
              </label>
              <input
                type="text"
                value={formData.businessName}
                onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                placeholder="Ex : Mama Food, Studio 242..."
                required
                className="w-full h-11 px-3.5 rounded-xl bg-neutral-900 border border-white/10 text-white text-sm placeholder:text-neutral-600 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-neutral-300 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-indigo-400" />
                <span>Ville</span> <span className="text-indigo-400">*</span>
              </label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                placeholder="Ex : Pointe-Noire, Brazzaville, Abidjan..."
                required
                className="w-full h-11 px-3.5 rounded-xl bg-neutral-900 border border-white/10 text-white text-sm placeholder:text-neutral-600 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-neutral-300 flex items-center justify-between">
              <span>Description rapide de ton offre</span>
              <span className="text-[11px] text-neutral-500 font-normal">Optionnel mais recommandé</span>
            </label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Que vends-tu exactement ? Quels sont tes points forts ?"
              className="w-full p-3.5 rounded-xl bg-neutral-900 border border-white/10 text-white text-sm placeholder:text-neutral-600 focus:outline-none focus:border-indigo-500 resize-none"
            />
          </div>

          {/* Objectif */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-neutral-300 flex items-center gap-1.5">
              <Target className="w-3.5 h-3.5 text-indigo-400" />
              <span>Objectif prioritaire</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {GOALS.map((goal) => (
                <button
                  type="button"
                  key={goal}
                  onClick={() => setFormData({ ...formData, goal })}
                  className={`p-3 rounded-xl border text-left text-xs font-medium transition-all cursor-pointer flex items-center justify-between ${
                    formData.goal === goal
                      ? 'bg-indigo-600/20 border-indigo-500 text-white'
                      : 'bg-neutral-900/60 border-white/5 text-neutral-300 hover:border-white/15'
                  }`}
                >
                  <span>{goal}</span>
                  {formData.goal === goal && <CheckCircle className="w-3.5 h-3.5 text-indigo-400 shrink-0 ml-2" />}
                </button>
              ))}
            </div>
          </div>

          {/* Ton */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-neutral-300 flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-indigo-400" />
              <span>Ton de communication</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {TONES.map((t) => (
                <button
                  type="button"
                  key={t}
                  onClick={() => setFormData({ ...formData, tone: t })}
                  className={`py-2 px-3 rounded-xl border text-center text-xs font-medium transition-all cursor-pointer ${
                    formData.tone === t
                      ? 'bg-indigo-600 text-white border-indigo-500 shadow-md shadow-indigo-600/30'
                      : 'bg-neutral-900/60 border-white/5 text-neutral-300 hover:border-white/15'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full min-h-[50px] px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-base shadow-xl shadow-indigo-600/30 hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Génération en cours...</span>
                </>
              ) : (
                <>
                  <span>🚀 Générer mon Business Kit</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
