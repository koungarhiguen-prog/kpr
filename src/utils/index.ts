import { BusinessKit } from '../types';

/**
 * Robust copy-to-clipboard with fallback
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const successful = document.execCommand('copy');
      document.body.removeChild(textArea);
      return successful;
    }
  } catch (err) {
    console.error('Clipboard copy failed', err);
    return false;
  }
}

/**
 * Convert full business kit into clean structured markdown/text for export
 */
export function formatKitAsMarkdown(kit: BusinessKit): string {
  const parts: string[] = [];

  parts.push(`# BUSINESS KIT : ${kit.input.businessName.toUpperCase()}`);
  parts.push(`Activité : ${kit.input.activity} • Ville : ${kit.input.city}`);
  if (kit.input.mainOffer) {
    parts.push(`Produits/Services principaux : ${kit.input.mainOffer}`);
  }
  if (kit.input.targetAudience) {
    parts.push(`Clientèle cible : ${kit.input.targetAudience}`);
  }
  if (kit.input.differentiator) {
    parts.push(`Ce qui différencie : ${kit.input.differentiator}`);
  }
  parts.push(`Objectif : ${kit.input.goal} • Ton : ${kit.input.tone}`);
  parts.push(`Généré le : ${new Date(kit.createdAt).toLocaleDateString('fr-FR')}`);
  parts.push(`\n---\n`);

  parts.push(`## 📌 1. IDÉES DE PUBLICATIONS (10 POSTS)`);
  kit.posts.forEach((p) => {
    parts.push(`\n### Post ${p.id} : ${p.title}`);
    parts.push(`Concept : ${p.idea}`);
    parts.push(`Caption :\n${p.caption}`);
    parts.push(`CTA : ${p.cta}`);
  });
  parts.push(`\n---\n`);

  parts.push(`## ✍️ 2. CAPTIONS PRÊTES À L'EMPLOI (10 CAPTIONS)`);
  kit.captions.forEach((c) => {
    parts.push(`\n• [${c.theme}] ${c.text}`);
    parts.push(`  Hashtags : ${c.hashtags.join(' ')}`);
  });
  parts.push(`\n---\n`);

  parts.push(`## 🎬 3. IDÉES DE REELS / TIKTOK (5 VIDÉOS)`);
  kit.reels.forEach((r) => {
    parts.push(`\n### Reel ${r.id} : ${r.title}`);
    parts.push(`Accroche (Hook) : ${r.hook}`);
    parts.push(`Concept : ${r.concept}`);
    parts.push(`Déroulement :`);
    r.flow.forEach((step) => parts.push(`  - ${step}`));
    parts.push(`Appel à l'action : ${r.cta}`);
  });
  parts.push(`\n---\n`);

  parts.push(`## 💬 4. MODÈLES DE MESSAGES WHATSAPP`);
  parts.push(`\n*Message d'accueil :*\n${kit.whatsapp.welcome}`);
  parts.push(`\n*Réponse « Quel est le prix ? » :*\n${kit.whatsapp.pricing}`);
  parts.push(`\n*Réponse « C'est disponible ? » :*\n${kit.whatsapp.availability}`);
  parts.push(`\n*Message de relance :*\n${kit.whatsapp.followUp}`);
  parts.push(`\n*Message après achat / fidélisation :*\n${kit.whatsapp.afterSale}`);
  parts.push(`\n---\n`);

  parts.push(`## 🚀 5. ARSENAL MARKETING`);
  parts.push(`\n### Slogans :`);
  kit.marketing.slogans.forEach((s, idx) => parts.push(`${idx + 1}. ${s}`));

  parts.push(`\n### Offres Promotionnelles :`);
  kit.marketing.promoOffers.forEach((o, idx) => {
    parts.push(`\nOffre ${idx + 1} : ${o.title}`);
    parts.push(`- Formule : ${o.deal}`);
    parts.push(`- Condition : ${o.condition}`);
    parts.push(`- Pitch : ${o.pitch}`);
  });

  parts.push(`\n### Textes Publicitaires (Ads) :`);
  kit.marketing.adCopies.forEach((ad, idx) => {
    parts.push(`\nPub ${idx + 1} (${ad.angle}) :`);
    parts.push(`Titre : ${ad.headline}`);
    parts.push(`Texte : ${ad.body}`);
    parts.push(`CTA : ${ad.cta}`);
  });

  parts.push(`\n### Bio Instagram Recommandée :\n${kit.marketing.instagramBio.formatted}`);
  parts.push(`\n### Description Professionnelle (Google / Site) :\n${kit.marketing.professionalDescription}`);
  parts.push(`\n---\n`);

  parts.push(`## 📅 6. CALENDRIER DE CONTENU (7 JOURS)`);
  kit.calendar.forEach((d) => {
    parts.push(`\n### ${d.day} — ${d.theme} (${d.type})`);
    parts.push(`Objectif : ${d.focus}`);
    parts.push(`Idée concrète : ${d.actionIdea}`);
    parts.push(`Accroche recommandée : ${d.exampleHook}`);
  });

  parts.push(`\n\n---\nGénéré avec BizPilot AI — Ton business. Ton contenu. En quelques secondes.`);

  return parts.join('\n');
}

/**
 * Trigger browser file download
 */
export function downloadFile(content: string, filename: string, type = 'text/plain;charset=utf-8'): void {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Share kit or app via Web Share API or WhatsApp fallback
 */
export async function shareKit(kitName: string): Promise<boolean> {
  const shareText = `Je viens de créer mon Business Kit avec BizPilot AI 🚀 pour ${kitName} ! Essaie-le gratuitement :`;
  const shareUrl = window.location.origin;

  if (navigator.share) {
    try {
      await navigator.share({
        title: 'BizPilot AI — Business Kit',
        text: shareText,
        url: shareUrl,
      });
      return true;
    } catch {
      // Fallback
    }
  }

  // Fallback to WhatsApp URL
  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
    shareText + ' ' + shareUrl
  )}`;
  window.open(whatsappUrl, '_blank');
  return true;
}

export function shareBizPilotViral(): void {
  const shareText = `Tu cherches des idées de posts, reels, publicités et messages clients pour ton business ? Teste BizPilot AI, ça génère un Business Kit complet en quelques secondes 🚀`;
  const shareUrl = window.location.origin;

  if (navigator.share) {
    navigator
      .share({
        title: 'BizPilot AI',
        text: shareText,
        url: shareUrl,
      })
      .catch(() => {
        const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
          shareText + ' ' + shareUrl
        )}`;
        window.open(whatsappUrl, '_blank');
      });
  } else {
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
      shareText + ' ' + shareUrl
    )}`;
    window.open(whatsappUrl, '_blank');
  }
}
