import type {
  BusinessInput,
  BusinessKit,
  PostItem,
  CaptionItem,
  ReelItem,
  WhatsAppMessages,
  MarketingKitData,
  CalendarDay,
  PromoOffer,
  AdCopy,
} from '../types/index.ts';

interface ActivityContext {
  vocabulary: string[];
  painPoints: string[];
  valueProps: string[];
  visualThemes: string[];
  typicalOffers: string[];
  targetAudience: string;
}

export const ACTIVITY_DATABASE: Record<string, ActivityContext> = {
  Restaurant: {
    vocabulary: ['saveurs', 'assiette gourmande', 'recette maison', 'produits frais', 'service chaleureux', 'dégustation'],
    painPoints: ['manque de temps pour cuisiner', 'repas d’affaires sans saveur', 'envie de réconfort après une longue journée'],
    valueProps: ['cuisine authentique', 'carte renouvelée', 'ambiance conviviale', 'options à emporter et sur place'],
    visualThemes: ['gros plan vapeur qui monte', 'dressage soigné', 'sourire du chef en cuisine', 'cocktail rafraîchissant'],
    typicalOffers: ['Menu midi express avec boisson offerte', 'Plateau dégustation duo -15% le mercredi', 'Dessert offert pour toute réservation avant 19h'],
    targetAudience: 'amateurs de bonne cuisine, familles, collègues de travail et gourmets locaux',
  },
  'Coiffeur / Barbier': {
    vocabulary: ['dégradé propre', 'soin capillaire', 'taille de barbe', 'morpho-coiffure', 'relooking', 'précision'],
    painPoints: ['coupe ratée chez un amateur', 'attente interminable sans rendez-vous', 'barbe négligée avant un événement'],
    valueProps: ['conseil personnalisé', 'finitions au rasoir', 'produits professionnels', 'hygiène irréprochable'],
    visualThemes: ['avant/après saisissant', 'bruit de la tondeuse en ASMR', 'application de la serviette chaude', 'client satisfait face au miroir'],
    typicalOffers: ['Pack Fresh Cut + Barbe avec soin offert', 'Formule premier rendez-vous à tarif doux', 'Carte fidélité : 5ème coupe à moitié prix'],
    targetAudience: 'hommes et femmes soucieux de leur image et professionnels exigeants',
  },
  'Boutique de vêtements': {
    vocabulary: ['look du jour', 'tendance', 'matière noble', 'coupe flatteuse', 'capsule collection', 'tenue élégante'],
    painPoints: ['garde-robe pleine mais rien à se mettre', 'vêtements de mauvaise qualité qui rétrécissent', 'manque d’inspiration style'],
    valueProps: ['pièces exclusives en quantité limitée', 'conseil morphologie bienveillant', 'livraison rapide et essayage facile'],
    visualThemes: ['transition look jour/soirée', 'détail des coutures et textures', 'mannequin en mouvement', 'unboxing élégant'],
    typicalOffers: ['-20% dès 2 articles achetés cette semaine', 'Foulard ou accessoire offert pour tout achat', 'Vente privée VIP vendredi soir'],
    targetAudience: 'passionnés de style, femmes et hommes en quête de pièces stylées',
  },
  'Beauté': {
    vocabulary: ['éclat naturel', 'soin du visage', 'manucure impeccable', 'détente', 'bien-être', 'regard de biche'],
    painPoints: ['teint terne et fatigué', 'ongles abîmés', 'stress quotidien sans moment pour soi'],
    valueProps: ['rituel de beauté apaisant', 'expertise esthétique certifiée', 'ambiance cocooning et intimiste'],
    visualThemes: ['glow après soin', 'pose vernis minutieuse', 'massage facial relaxant', 'espace salon propre et épuré'],
    typicalOffers: ['Diagnostic de peau personnalisé offert', 'Soin éclat + pose vernis à tarif découverte', 'Cure bien-être 3 séances avec 1 offerte'],
    targetAudience: 'femmes actives, futures mariées et personnes cherchant un vrai break bien-être',
  },
  'Photographe': {
    vocabulary: ['émotion brute', 'lumière dorée', 'portrait intemporel', 'souvenirs précieux', 'séance sur-mesure'],
    painPoints: ['photos de smartphone floues et banales', 'moments familiaux oubliés', 'profil LinkedIn peu crédible'],
    valueProps: ['direction de pose naturelle même pour les timides', 'retouches soignées sans effet artificiel', 'livraison galerie HD sous 48h'],
    visualThemes: ['coulisses de shooting', 'regard complice capté sur le vif', 'comparaison photo brute vs éditée'],
    typicalOffers: ['Shooting mini-session portrait 30 min + 5 photos HD', 'Offre couple / fiançailles avec tirage offert', 'Pack photo pro pour entrepreneurs'],
    targetAudience: 'couples, familles, créateurs de contenu et entrepreneurs indépendants',
  },
  'Réparation téléphone': {
    vocabulary: ['écran d’origine', 'batterie neuve', 'dépannage express', 'garantie 6 mois', 'sauvegarde de données'],
    painPoints: ['écran brisé avant un voyage', 'batterie qui s’éteint à 20%', 'peur de perdre ses photos et contacts'],
    valueProps: ['réparation en 30 minutes sous vos yeux', 'pièces testées haute qualité', 'devis gratuit et sans engagement'],
    visualThemes: ['remplacement écran en time-lapse', 'test de réactivité tactile', 'micro-soudures précises'],
    typicalOffers: ['Protection écran en verre trempé offerte pour tout changement d’écran', 'Pack écran + batterie neuve à prix serré', 'Diagnostic gratuit de l’état de votre batterie'],
    targetAudience: 'particuliers et professionnels dépendants de leur smartphone au quotidien',
  },
  'Informaticien': {
    vocabulary: ['maintenance préventive', 'sécurité des données', 'optimisation système', 'dépannage réseau', 'conseil tech'],
    painPoints: ['ordinateur lent qui plante au pire moment', 'virus ou perte de fichiers', 'réseau wifi instable au bureau'],
    valueProps: ['intervention rapide sur site ou à distance', 'explications claires sans jargon incompréhensible', 'tarification transparente'],
    visualThemes: ['nettoyage de composants poussiéreux', 'test de vitesse avant/après SSD', 'écran d’accueil reconfiguré'],
    typicalOffers: ['Pack coup de jeune PC : passage SSD + nettoyage à tarif forfait', 'Audit sécurité gratuit pour TPE', 'Assistance à distance 1er mois offert'],
    targetAudience: 'télétravailleurs, étudiants, petites entreprises et commerces locaux',
  },
  'Professeur': {
    vocabulary: ['méthodologie rigoureuse', 'progression garantie', 'pédagogie active', 'confiance en soi', 'réussite aux examens'],
    painPoints: ['notes en baisse et découragement', 'difficulté à comprendre les cours en classe', 'stress des épreuves'],
    valueProps: ['cours particuliers adaptés au rythme de l’élève', 'exercices ciblés et bilans réguliers pour les parents', 'bienveillance et motivation'],
    visualThemes: ['astuce mnémotechnique en vidéo courte', 'explication visuelle d’un exercice difficile', 'carnet de notes en hausse'],
    typicalOffers: ['1ère heure d’évaluation offerte', 'Formule stage intensif révision vacances', 'Pack 10 séances avec suivi personnalisé'],
    targetAudience: 'parents d’élèves, collégiens, lycéens et étudiants préparant des concours',
  },
  'Coach': {
    vocabulary: ['transformation durable', 'discipline', 'mental d’acier', 'plan sur-mesure', 'dépassement de soi'],
    painPoints: ['procrastination et abandon rapide', 'objectifs flous sans plan d’action', 'stagnation malgré les efforts'],
    valueProps: ['accompagnement 1-on-1 au millimètre', 'disponibilité WhatsApp pour garder le cap', 'méthode testée et éprouvée'],
    visualThemes: ['séance d’entraînement intense', 'check-in client motivé', 'partage d’un état d’esprit gagnant'],
    typicalOffers: ['Bilan stratégique 30 min 100% offert', 'Programme starter 4 semaines immersion', 'Accompagnement VIP avec accès direct WhatsApp'],
    targetAudience: 'personnes motivées à franchir un palier physique, pro ou personnel',
  },
  'Freelance': {
    vocabulary: ['livraison dans les délais', 'rendu professionnel', 'stratégie sur-mesure', 'gain de temps', 'ROI mesurable'],
    painPoints: ['prestataires qui disparaissent en cours de projet', 'résultat amateur qui nuit à la marque', 'perte de temps sur des tâches chronophages'],
    valueProps: ['communication limpide à chaque étape', 'expertise pointue et rigueur', 'process rodé sans mauvaises surprises'],
    visualThemes: ['coulisses de conception sur écran', 'brief client transformé en résultat concret', 'témoignage écrit sur LinkedIn'],
    typicalOffers: ['Audit express de votre présence en 48h offert', 'Pack lancement rapide prêt en 7 jours', 'Réduction de 15% pour votre premier projet'],
    targetAudience: 'fondateurs de startups, PME, agences et entrepreneurs indépendants',
  },
  'Autre': {
    vocabulary: ['service de qualité', 'écoute active', 'fiabilité', 'savoir-faire', 'satisfaction client'],
    painPoints: ['recherche de professionnels fiables', 'délais non respectés', 'manque de clarté sur les prestations'],
    valueProps: ['engagement sérieux et réactif', 'conseils honnêtes', 'solution clé en main'],
    visualThemes: ['travail en cours d’exécution', 'résultat final impeccable', 'échange chaleureux avec un client'],
    typicalOffers: ['Offre découverte exclusive pour les nouveaux clients', 'Devis détaillé sous 24h sans engagement', 'Avantage parrainage pour vous et vos proches'],
    targetAudience: 'clients locaux recherchant un service de confiance et de proximité',
  },
};

export const TONE_ADJECTIVES: Record<string, { vibe: string; ctaStyle: string; greeting: string }> = {
  Professionnel: {
    vibe: 'rigoureux, courtois et orienté résultats',
    ctaStyle: 'Prenez contact avec notre équipe dès aujourd’hui pour un échange personnalisé.',
    greeting: 'Bonjour et bienvenue chez',
  },
  Dynamique: {
    vibe: 'énergique, direct et percutant',
    ctaStyle: 'Ne perds plus une seconde ! Écris-nous tout de suite en DM ou WhatsApp.',
    greeting: 'Hello l’équipe ! Bienvenue chez',
  },
  Premium: {
    vibe: 'élégant, sobre et exclusif',
    ctaStyle: 'Réservez votre créneau privilégié. Disponibilité limitée pour préserver l’expérience.',
    greeting: 'Chère clientèle, bienvenue dans l’univers',
  },
  Jeune: {
    vibe: 'frais, décontracté et connecté',
    ctaStyle: 'Drop un message ou passe nous capter direct en boutique !',
    greeting: 'Salut la commu ! Bienvenue chez',
  },
  Humoristique: {
    vibe: 'léger, complice et décalé',
    ctaStyle: 'Viens avant qu’on ne soit dévalisés (ou qu’on mange tout nous-mêmes) !',
    greeting: 'Coucou toi ! Tu as enfin trouvé le meilleur spot :',
  },
};

/**
 * Intelligent local template generator for BizPilot AI V1.
 * Combines business activity, city, name, tone, goals, and realistic marketing psychology.
 */
export function generateLocalBusinessKit(input: BusinessInput): BusinessKit {
  const activityKey = ACTIVITY_DATABASE[input.activity] ? input.activity : 'Autre';
  const context = ACTIVITY_DATABASE[activityKey];
  const toneData = TONE_ADJECTIVES[input.tone] || TONE_ADJECTIVES['Professionnel'];
  const name = input.businessName.trim() || 'Mon Business';
  const city = input.city.trim() || 'votre ville';
  const goal = input.goal;

  // 1. Generate 10 contextual posts
  const posts: PostItem[] = [
    {
      id: 1,
      title: 'L’Histoire & La Vision',
      idea: `Raconter la genèse de ${name} à ${city} et pourquoi vous avez choisi cette activité.`,
      caption: `Pourquoi ${name} existe aujourd’hui à ${city} ?\n\nQuand nous avons lancé notre projet, nous avions un constat simple : ${context.painPoints[0]}.\n\nNotre mission chaque jour ? Vous apporter ${context.valueProps[0]} avec toute notre énergie et passion. Merci à tous ceux qui nous font confiance depuis le début !`,
      cta: `👉 Et vous, depuis quand suivez-vous notre aventure ? Dites-le nous en commentaire !`,
    },
    {
      id: 2,
      title: 'Le Problème Résolu',
      idea: `Aborder directement la douleur principale de vos clients : ${context.painPoints[0]}.`,
      caption: `Marre de ${context.painPoints[0]} ?\n\nChez ${name}, nous avons conçu notre service précisément pour vous simplifier la vie. Plus besoin de stresser : on s'occupe de tout avec ${context.vocabulary[0]}.\n\nPassez nous voir à ${city} ou contactez-nous dès maintenant !`,
      cta: `📲 Envoyez-nous un message WhatsApp pour régler ça en quelques minutes.`,
    },
    {
      id: 3,
      title: 'Les Coulisses (Behind the scenes)',
      idea: `Montrer l'envers du décor et la préparation minutieuse pour ${name}.`,
      caption: `Ce que vous ne voyez jamais sur les photos… 🔍\n\nAvant que le résultat ne soit parfait, il y a des heures de préparation, de tri et de rigueur. Chez ${name}, chaque détail compte : ${context.vocabulary[1]} et ${context.vocabulary[2]}.\n\nC’est cette exigence qui fait notre différence à ${city}.`,
      cta: `❤️ Likez si vous appréciez le travail fait avec passion !`,
    },
    {
      id: 4,
      title: 'Le Conseil d’Expert Gratuit',
      idea: `Donner une astuce actionnable que vos abonnés peuvent appliquer immédiatement.`,
      caption: `Le conseil gratuit du jour signé ${name} 💡 :\n\nPour éviter ${context.painPoints[1]}, pensez toujours à vérifier vos bases et privilégier ${context.vocabulary[0]}.\n\nGardez ce post en favori pour vous en souvenir plus tard !`,
      cta: `🔖 Enregistrez ce post pour le retrouver facilement.`,
    },
    {
      id: 5,
      title: 'La Preuve & Témoignage Client',
      idea: `Partager un retour client authentique et marquant.`,
      caption: `« Franchement, je ne m'attendais pas à un résultat aussi propre ! » ⭐⭐⭐⭐⭐\n\nC’est le genre de message qui donne le sourire à toute l'équipe de ${name}. Quand un client vient nous voir à ${city} pour ${context.painPoints[2]} et repart avec ${context.valueProps[0]}, notre journée est réussie.`,
      cta: `Envie de vivre la même expérience ? Contactez-nous en privé !`,
    },
    {
      id: 6,
      title: 'Mise en avant Produit / Prestation Star',
      idea: `Présenter l'offre la plus demandée chez ${name}.`,
      caption: `La star incontournable chez ${name} ⭐ :\n\nSi vous ne devez tester qu'une seule chose chez nous à ${city}, c'est celle-ci ! Pourquoi ? Parce qu'elle combine ${context.vocabulary[0]} et ${context.valueProps[1]}.\n\nUne expérience pensée pour ${context.targetAudience}.`,
      cta: `Discutez avec nous en DM pour connaître nos disponibilités cette semaine.`,
    },
    {
      id: 7,
      title: 'Sondage & Interaction Communauté',
      idea: `Poser une question pour booster les commentaires et l'algorithme.`,
      caption: `Grande question pour nos clients de ${city} aujourd'hui 🗳️ :\n\nTeam A (${context.vocabulary[0]}) ou Team B (${context.vocabulary[1]}) ?\n\nChez ${name}, le débat est ouvert entre nous ! Donnez-nous votre avis tranché en commentaire 👇`,
      cta: `👇 Écrivez votre choix en commentaire !`,
    },
    {
      id: 8,
      title: 'Offre Spéciale / Moment Fort',
      idea: `Créer de l'urgence avec une proposition irrésistible.`,
      caption: `Alerte bon plan à ${city} 🚨 !\n\nPour récompenser notre communauté, ${name} lance une offre exclusive : ${context.typicalOffers[0]}.\n\nAttention : réservé aux 10 premiers clients qui nous contactent aujourd'hui.`,
      cta: `⚡ Tapez « PROMO » en message privé pour réserver avant rupture !`,
    },
    {
      id: 9,
      title: 'Mythe vs Réalité',
      idea: `Démystifier une fausse croyance répandue dans le secteur ${input.activity}.`,
      caption: `On entend souvent dire que… [Mythe] ❌\n\nLa réalité chez ${name} : [Réalité] ✅ !\n\nBeaucoup de personnes pensent que ${context.painPoints[0]} est inévitable. En réalité, avec une méthode adaptée et ${context.vocabulary[2]}, tout devient beaucoup plus simple.`,
      cta: `Partagez ce post en story avec un ami qui a besoin de savoir ça !`,
    },
    {
      id: 10,
      title: 'Le Rappel du Week-end / Proximité',
      idea: `Donner rendez-vous pour la fin de semaine ou les jours d'ouverture.`,
      caption: `Le week-end approche à ${city} ! 🎉\n\nAvez-vous pensé à réserver votre créneau chez ${name} ? Les places partent vite et nous voulons vous garantir ${context.valueProps[2]}.\n\nToute l'équipe vous attend avec le sourire !`,
      cta: `📍 Rendez-vous chez ${name} à ${city}. Lien direct dans notre bio !`,
    },
  ];

  // 2. Generate 10 Captions
  const captions: CaptionItem[] = [
    {
      id: 1,
      theme: 'Découverte',
      text: `Une seule adresse pour retrouver ${context.vocabulary[0]} à ${city} : bienvenue chez ${name}. On a hâte de vous faire vivre cette expérience !`,
      hashtags: [`#${name.replace(/\s+/g, '')}`, `#${city.replace(/\s+/g, '')}`, `#${input.activity.replace(/[\s/]+/g, '')}`, '#BonneAdresse', '#QualitéGarantie'],
    },
    {
      id: 2,
      theme: 'Coup de cœur',
      text: `Quand le souci du détail rencontre la passion du métier. Chez ${name}, on ne fait aucun compromis sur la qualité.`,
      hashtags: [`#${city.replace(/\s+/g, '')}`, '#PassionDuMétier', '#SatisfactionClient', '#SavoirFaire'],
    },
    {
      id: 3,
      theme: 'Motivation',
      text: `Nouvelle semaine, nouveaux objectifs. Accordez-vous le meilleur avec ${name} à ${city}.`,
      hashtags: ['#Motivation', '#NouvelleSemaine', `#${name.replace(/\s+/g, '')}`, '#Focus'],
    },
    {
      id: 4,
      theme: 'Exclusivité',
      text: `Parce que vous méritez un service à la hauteur de vos exigences. Découvrez notre sélection exclusive de la semaine.`,
      hashtags: ['#Exclusif', '#HauteQualité', '#Tendance', `#${city.replace(/\s+/g, '')}`],
    },
    {
      id: 5,
      theme: 'Solution Problème',
      text: `Ne laissez plus ${context.painPoints[0]} gâcher vos journées. Venez chez ${name}, on règle ça ensemble !`,
      hashtags: ['#AstuceDuJour', '#SolutionEfficace', '#ExpertiseLocale'],
    },
    {
      id: 6,
      theme: 'Urgence / Flash',
      text: `Dernières disponibilités cette semaine chez ${name} à ${city} ! Ne tardez pas à réserver votre créneau.`,
      hashtags: ['#DispoLimitée', '#RéservezVite', `#${city.replace(/\s+/g, '')}`],
    },
    {
      id: 7,
      theme: 'Remerciement',
      text: `Un immense MERCI à tous nos clients qui font vivre ${name} au quotidien. Vous êtes notre plus grande source d’inspiration !`,
      hashtags: ['#Gratitude', '#MeilleursClients', '#TeamBizPilot', '#Proximité'],
    },
    {
      id: 8,
      theme: 'Local Love',
      text: `Fier d'entreprendre et de valoriser le savoir-faire local à ${city}. Soutenez vos commerces de proximité !`,
      hashtags: [`#${city.replace(/\s+/g, '')}`, '#CommerceDeProximite', '#EntrepreneursLocaux', '#ConsommerLocal'],
    },
    {
      id: 9,
      theme: 'Offre du moment',
      text: `Une surprise vous attend chez ${name} cette semaine... Venez nous rendre visite et profitez d'un accueil privilégié !`,
      hashtags: ['#OffreSpeciale', '#Surprise', '#BonPlan', `#${name.replace(/\s+/g, '')}`],
    },
    {
      id: 10,
      theme: 'Weekend Mood',
      text: `Mode week-end activé ! Rendez-vous chez ${name} pour recharger les batteries et savourer l'instant présent.`,
      hashtags: ['#WeekendVibes', '#Detente', `#${city.replace(/\s+/g, '')}`, '#BienEtre'],
    },
  ];

  // 3. Generate 5 Reels / TikTok ideas
  const reels: ReelItem[] = [
    {
      id: 1,
      title: 'Le Avant / Après Choc',
      hook: `« Tu fais encore cette erreur quand tu choisis ton ${input.activity.toLowerCase()} ? »`,
      concept: `Montrer une situation désastreuse (ou un travail mal fait) versus le résultat impeccable chez ${name}.`,
      flow: [
        '00:00 - 00:03 : Plan serré avec texte d\'accroche choc et son tendance.',
        `00:03 - 00:08 : Démonstration rapide du problème classique : ${context.painPoints[0]}.`,
        `00:08 - 00:15 : Révélation dynamique du résultat chez ${name} avec transition cut rythmée.`,
        '00:15 - 00:20 : Plan face caméra ou texte invitant à enregistrer la vidéo.',
      ],
      cta: `« Abonne-toi à ${name} pour d'autres astuces à ${city} ! »`,
    },
    {
      id: 2,
      title: '24h dans les coulisses',
      hook: `« Voici ce qui se passe avant que nos premiers clients n'arrivent chez ${name}... »`,
      concept: `ASMR visuel et sonore des préparatifs matinaux pour montrer le professionnalisme.`,
      flow: [
        '00:00 - 00:02 : Ouverture de la porte ou allumage des lumières (bruit satisfaisant).',
        `00:02 - 00:08 : Série de plans cuts rapides de 1 seconde sur les outils et ${context.vocabulary[0]}.`,
        '00:08 - 00:13 : Sourire de l’équipe prêt à accueillir les clients.',
        `00:13 - 00:18 : Texte final avec localisation : ${city}.`,
      ],
      cta: `« Dis-nous en commentaire à quelle heure commence ta journée ! »`,
    },
    {
      id: 3,
      title: 'Les 3 secrets que personne ne vous dit',
      hook: `« 3 choses indispensables à savoir absolument sur ton ${input.activity.toLowerCase()} en 2026. »`,
      concept: `Vidéo pédagogique face caméra ou voix-off avec sous-titres animés grand format.`,
      flow: [
        '00:00 - 00:03 : Hook avec geste de la main et texte en surbrillance.',
        `00:03 - 00:07 : Point n°1 : ${context.painPoints[1]} et comment y remédier.`,
        `00:07 - 00:12 : Point n°2 : L'importance de privilégier ${context.vocabulary[1]}.`,
        `00:12 - 00:18 : Point n°3 : Pourquoi faire confiance à un professionnel certifié comme ${name}.`,
      ],
      cta: `« Enregistre ce Reel pour ne pas le perdre ! »`,
    },
    {
      id: 4,
      title: 'POV : Tu viens enfin tester notre adresse',
      hook: `« POV : Tu as enfin décidé d'arrêter de procrastiner et tu passes chez ${name} à ${city} 🤩 »`,
      concept: `Caméra subjective (vue du client) qui franchit la porte, découvre les lieux et repart ravi.`,
      flow: [
        '00:00 - 00:03 : Pousse la porte d\'entrée avec ambiance chaleureuse.',
        '00:03 - 00:09 : Prise en charge immédiate avec le sourire et début de la prestation.',
        '00:09 - 00:14 : Gros plan sur le rendu final impeccable.',
        '00:14 - 00:17 : Le client qui repart avec satisfaction.',
      ],
      cta: `« Tague la personne qui doit t'accompagner lors de ta prochaine visite ! »`,
    },
    {
      id: 5,
      title: 'Défi / Réponse à un commentaire client',
      hook: `« On m'a dit : "Impossible d'avoir un service de qualité à ce prix à ${city} !" Regardez bien. »`,
      concept: `Prendre un scepticisme réel et le déconstruire preuves à l'appui avec fierté.`,
      flow: [
        '00:00 - 00:03 : Capture d\'écran ou sticker question au début.',
        `00:03 - 00:10 : Démonstration concrète de la rigueur de ${name} : ${context.valueProps[0]}.`,
        `00:10 - 00:15 : Récapitulatif de l'offre transparente sans frais cachés.`,
        '00:15 - 00:20 : Clin d\'œil et appel à l\'action.',
      ],
      cta: `« Viens juger par toi-même, le lien WhatsApp est dans notre bio ! »`,
    },
  ];

  // 4. Generate WhatsApp Customer Service Templates
  const whatsapp: WhatsAppMessages = {
    welcome: `${toneData.greeting} *${name}* à ${city} ! 🌟\n\nMerci pour votre message. Nous sommes ravis de vous compter parmi nous.\n\nComment pouvons-nous vous aider aujourd'hui ?\n1️⃣ Prendre un rendez-vous / commander\n2️⃣ Connaître nos tarifs et formules\n3️⃣ Poser une question spécifique\n\n_Répondez simplement avec votre besoin, nous vous répondons dans les plus brefs délais !_ ✨`,

    pricing: `Bonjour ! Voici le détail de nos prestations et tarifs chez *${name}* :\n\n✨ Formules principales :\n• Formule Découverte : à partir de nos tarifs habituels\n• Formule Complète (Recommandée) : comprend ${context.vocabulary[0]} et ${context.vocabulary[1]}\n• Formule Sur-Mesure : adaptée à vos attentes précises\n\n💡 _Nos prix sont transparents et incluent toute notre expertise et notre garantie de satisfaction._\n\nSouhaitez-vous un devis ou une estimation précise selon votre situation ?`,

    availability: `Bonjour ! C'est bien disponible chez *${name}* ! ✅\n\n📍 Nous sommes situés à ${city}.\n⏰ Nos disponibilités cette semaine :\n• Mercredi : créneaux encore ouverts\n• Vendredi & Samedi : forte demande, réservation vivement conseillée\n\nQuel jour et quelle heure vous conviendraient le mieux pour réserver ?`,

    followUp: `Bonjour ! J'espère que vous passez une excellente journée.\n\nJe reviens vers vous suite à votre récent message concernant nos services chez *${name}*. Avez-vous eu le temps de regarder notre proposition ?\n\nSi vous avez la moindre question ou besoin d'ajustement, je reste à votre entière disposition ici sur WhatsApp ! 😊`,

    afterSale: `Bonjour ! Un petit message de toute l'équipe de *${name}* pour prendre de vos nouvelles suite à votre passage chez nous à ${city} ! 🎉\n\nTout s'est bien passé pour vous ? Êtes-vous satisfait(e) du résultat ?\n\nVotre avis compte énormément pour nous. N'hésitez pas à nous laisser un petit mot ou à nous recommander à vos proches ! ✨`,
  };

  // 5. Generate Marketing Arsenal (Slogans, Ads, Promos, Bio)
  const slogans = [
    `${name} : L'excellence de ${input.activity.toLowerCase()} à ${city}.`,
    `Moins de tracas, plus de résultats avec ${name}.`,
    `Votre satisfaction, notre seule exigence au quotidien.`,
    `${name} — Le choix évident pour votre confort à ${city}.`,
    `Passez au niveau supérieur : découvrez la différence ${name}.`,
  ];

  const promoOffers: PromoOffer[] = [
    {
      title: 'Offre Bienvenue Nouveaux Clients',
      deal: '-15% sur votre première visite ou 1 prestation découverte offerte',
      condition: 'Valable pour toute première commande ou réservation ce mois-ci.',
      pitch: `Vous ne nous connaissez pas encore ? C'est le moment idéal pour tester ${name} avec une réduction exclusive réservée aux nouveaux clients de ${city}.`,
    },
    {
      title: 'Pack Flash Duo / Parrainage',
      deal: '1 cadeau surprise ou remise spéciale pour vous et votre proche',
      condition: 'Venez à deux ou recommandez un ami qui réserve chez nous.',
      pitch: `Partagez la bonne adresse de ${city} ! Quand vous parrainez un proche, vous gagnez tous les deux.`,
    },
    {
      title: 'Offre Spéciale Mi-Semaine',
      deal: 'Avantage exclusif du mardi au jeudi',
      condition: 'Sur réservation préalable avant mercredi midi.',
      pitch: `Évitez la foule du week-end et profitez d'un créneau calme avec une attention personnalisée maximale chez ${name}.`,
    },
  ];

  const adCopies: AdCopy[] = [
    {
      angle: 'Résolution de Problème (Direct & Efficace)',
      headline: `Vous en avez assez de ${context.painPoints[0]} à ${city} ?`,
      body: `Chez ${name}, nous savons à quel point votre temps et votre argent sont précieux. C'est pourquoi nous avons mis en place une solution simple, rapide et garantie pour vous offrir ${context.valueProps[0]}. Ne laissez plus traîner ce souci.`,
      cta: `👉 Cliquez ici pour réserver votre place en 30 secondes.`,
    },
    {
      angle: 'Preuve Sociale & Confiance',
      headline: `Pourquoi nos clients à ${city} ne jurent plus que par ${name} ?`,
      body: `Ce n'est pas un hasard si nos habitués reviennent chaque semaine. Entre ${context.vocabulary[0]} et un service aux petits soins, nous mettons tout notre cœur pour dépasser vos attentes. Rejoignez la communauté des clients comblés.`,
      cta: `📲 Écrivez-nous directement sur WhatsApp pour vérifier nos disponibilités.`,
    },
    {
      angle: 'Offre Irrésistible & Urgence',
      headline: `Offre Flash : -15% chez ${name} (Valable pour les 15 premiers)`,
      body: `Pour fêter ce mois-ci, nous offrons une remise exceptionnelle à tous ceux qui réservent avant dimanche. Profitez de ${context.valueProps[1]} à prix tout doux avant que tous les créneaux ne soient complets !`,
      cta: `⚡ Réclamez votre code promo exclusif en cliquant ici.`,
    },
    {
      angle: 'Fierté Locale & Proximité',
      headline: `La nouvelle référence de ${input.activity.toLowerCase()} s'installe à ${city}`,
      body: `Soutenez les artisans et créateurs qui font bouger votre ville. Chez ${name}, chaque client est accueilli comme un membre de la famille avec un vrai savoir-faire artisanal.`,
      cta: `📍 Découvrez notre adresse et passez nous dire bonjour !`,
    },
    {
      angle: 'Transformation / Avant-Après',
      headline: `Et si vous changiez enfin les choses aujourd'hui ?`,
      body: `Vous méritez ce qu'il y a de mieux pour ${context.vocabulary[1]}. Faites le premier pas vers une vraie transformation avec l'accompagnement personnalisé de ${name}.`,
      cta: `💬 Envoyez « JE VEUX » en message privé pour démarrer.`,
    },
  ];

  const professionalDescription = `${name} est une référence locale en ${input.activity.toLowerCase()} établie à ${city}. Guidée par des valeurs de rigueur, de qualité et de bienveillance, notre structure s'adresse à ${context.targetAudience} en quête de ${context.valueProps[0]}. Que ce soit pour un besoin ponctuel ou un accompagnement durable, nous mettons notre expertise et notre écoute au service de votre entière satisfaction. Rendez-nous visite à ${city} ou contactez notre équipe pour un conseil personnalisé.`;

  const instagramBio = {
    line1: `📍 ${city} | Spécialiste ${input.activity}`,
    line2: `✨ ${context.valueProps[0]}`,
    line3: `🔥 Offre du moment : ${promoOffers[0].deal}`,
    cta: `👇 Prenez contact ou réservez en 1 clic :`,
    formatted: `📍 ${city} | Spécialiste ${input.activity}\n✨ ${context.valueProps[0]}\n🔥 Offre du moment : ${promoOffers[0].deal}\n👇 Prenez contact ou réservez en 1 clic :`,
  };

  // 6. Generate 7-Day Content Calendar
  const calendar: CalendarDay[] = [
    {
      day: 'Lundi',
      theme: 'Présentation & Vision',
      type: 'Post Image / Carrousel',
      focus: 'Présenter l\'équipe, l\'histoire de la marque et donner de l\'énergie pour la semaine.',
      actionIdea: `Publier une photo nette de votre espace de travail ou de vous-même avec l'histoire de la création de ${name} à ${city}.`,
      exampleHook: `« Pourquoi nous avons ouvert nos portes à ${city} : notre histoire en 3 photos. »`,
    },
    {
      day: 'Mardi',
      theme: 'Conseil & Valeur Gratuite',
      type: 'Carrousel ou Reel Court',
      focus: 'Donner une astuce experte que votre client peut appliquer pour résoudre un problème.',
      actionIdea: `Partager un conseil pratique sur ${context.vocabulary[0]} pour éviter ${context.painPoints[1]}.`,
      exampleHook: `« L'erreur n°1 que font 90% des gens quand ils cherchent un ${input.activity.toLowerCase()}. »`,
    },
    {
      day: 'Mercredi',
      theme: 'Focus Produit / Service Star',
      type: 'Photo Détail / Vidéo Démo',
      focus: 'Mettre en valeur le produit ou la prestation la plus rentable ou la plus appréciée.',
      actionIdea: `Faire un zoom sur les finitions, la texture ou le processus de fabrication de ${name}.`,
      exampleHook: `« Pourquoi tout le monde nous demande cette prestation en ce moment ? »`,
    },
    {
      day: 'Jeudi',
      theme: 'Témoignage & Preuve Sociale',
      type: 'Story + Post Capture d\'avis',
      focus: 'Rassurer les indécis grâce aux mots d\'un client satisfait.',
      actionIdea: `Partager la capture d'écran d'un message WhatsApp de remerciement reçu cette semaine.`,
      exampleHook: `« Le message reçu ce matin qui nous a donné le sourire pour la journée ! »`,
    },
    {
      day: 'Vendredi',
      theme: 'Offre Week-end / Urgence',
      type: 'Post Annonce + Stories Rappel',
      focus: 'Déclencher les réservations et les commandes immédiates avant le week-end.',
      actionIdea: `Lancer l'offre du week-end : ${promoOffers[0].deal} pour les réservations prises aujourd'hui.`,
      exampleHook: `« Bon plan week-end : seulement 5 créneaux encore ouverts chez ${name} ! »`,
    },
    {
      day: 'Samedi',
      theme: 'Contenu Interactif & Sondage',
      type: 'Story Sondage / Quizz',
      focus: 'Faire participer la communauté et créer de la complicité.',
      actionIdea: `Lancer un vote « Tu préfères Option A ou Option B ? » en rapport avec votre activité.`,
      exampleHook: `« À vous de trancher le grand débat de la semaine chez ${name} ! »`,
    },
    {
      day: 'Dimanche',
      theme: 'Communauté & Coulisses Détente',
      type: 'Photo Ambiance / Bilan',
      focus: 'Humaniser la marque, remercier les clients et préparer le lundi.',
      actionIdea: `Partager une photo conviviale de repos ou de préparation de la semaine à venir.`,
      exampleHook: `« Fin d'une semaine intense chez ${name}. Merci à tous pour votre fidélité ! »`,
    },
  ];

  return {
    id: 'bp_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
    createdAt: new Date().toISOString(),
    input,
    posts,
    captions,
    reels,
    whatsapp,
    marketing: {
      slogans,
      promoOffers,
      adCopies,
      professionalDescription,
      instagramBio,
    },
    calendar,
    engineNote: 'Généré par le Moteur Local Intelligent BizPilot V1 (Architecture prête pour API distante sans coût d\'API actuel).',
  };
}
