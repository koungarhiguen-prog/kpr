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
 * Intelligent template generator for BizPilot AI V1.1.
 * Combines business activity, city, name, main offer, target audience, differentiator, tone, and goals.
 * Strictly adheres to truthfulness: never hallucinates fake testimonials, fake ratings, or fake discounts.
 */
export function generateLocalBusinessKit(input: BusinessInput): BusinessKit {
  const activityKey = ACTIVITY_DATABASE[input.activity] ? input.activity : 'Autre';
  const context = ACTIVITY_DATABASE[activityKey];
  const toneData = TONE_ADJECTIVES[input.tone] || TONE_ADJECTIVES['Professionnel'];
  const name = input.businessName.trim() || 'Mon Business';
  const city = input.city.trim() || 'votre ville';
  const goal = input.goal;

  // V1.1 personalization parameters with safe fallbacks
  const mainOffer = (input.mainOffer && input.mainOffer.trim()) || context.vocabulary[0] || 'nos prestations principales';
  const targetAudience = (input.targetAudience && input.targetAudience.trim()) || context.targetAudience || 'nos clients de ' + city;
  const differentiator = (input.differentiator && input.differentiator.trim()) || '';
  const diffSentence = differentiator ? ` Notre atout distinctif : ${differentiator}.` : '';

  // 1. Generate 10 contextual, strictly truthful posts
  const posts: PostItem[] = [
    {
      id: 1,
      title: 'L’Histoire & La Mission',
      idea: `Expliquer pourquoi vous proposez ${mainOffer} à ${city} et à qui s'adresse votre savoir-faire.`,
      caption: `Pourquoi ${name} existe aujourd’hui à ${city} ?\n\nNotre mission : proposer ${mainOffer} spécialement conçu pour répondre aux attentes de ${targetAudience}.${diffSentence}\n\nUn projet né d'une volonté simple : allier proximité, écoute et qualité au quotidien pour vous apporter une solution concrète.`,
      cta: `👉 Vous avez un besoin ou une question ? Écrivez-nous en message privé pour en discuter !`,
    },
    {
      id: 2,
      title: 'Le Problème Résolu',
      idea: `Montrer comment ${mainOffer} simplifie la vie de ${targetAudience}.`,
      caption: `Vous cherchez une solution efficace pour ${mainOffer} à ${city} ?\n\nChez ${name}, nous savons que ${targetAudience} recherche avant tout la clarté, l'efficacité et la tranquillité d'esprit.${diffSentence}\n\nPrenez contact avec notre équipe dès aujourd'hui pour voir comment nous pouvons vous aider.`,
      cta: `📲 Envoyez-nous un message WhatsApp pour obtenir vos renseignements en quelques minutes.`,
    },
    {
      id: 3,
      title: 'Les Coulisses & La Méthode de Travail',
      idea: `Présenter la rigueur et le soin apportés à ${mainOffer}.`,
      caption: `Ce que vous ne voyez jamais sur une simple photo… 🔍\n\nChaque réalisation de ${mainOffer} demande du temps, de la méthode et une exigence constante. Chez ${name}, chaque détail compte pour satisfaire ${targetAudience}.\n\nC’est cette transparence et cette rigueur qui font notre différence à ${city}.`,
      cta: `❤️ Likez si vous appréciez le travail soigné et transparent !`,
    },
    {
      id: 4,
      title: 'Le Conseil Pratique Gratuit',
      idea: `Donner un conseil utile et actionnable à ${targetAudience} concernant ${mainOffer}.`,
      caption: `Le conseil pratique du jour signé ${name} 💡 :\n\nPour réussir au mieux votre projet concernant ${mainOffer}, prenez toujours le temps de bien formuler vos attentes et de privilégier un échange direct.\n\nGardez ce post en favori pour vous en souvenir plus tard !`,
      cta: `🔖 Enregistrez ce post pour le retrouver facilement.`,
    },
    {
      id: 5,
      title: 'Preuve de Savoir-Faire & Retours Clients',
      idea: `Inviter vos clients réels à partager leur retour et valoriser votre engagement qualité.`,
      caption: `Chez ${name}, votre satisfaction et la qualité de nos prestations (${mainOffer}) sont notre priorité absolue à ${city}.\n\n💡 Idée pour votre publication : Vous avez déjà fait appel à nos services ? Votre véritable avis nous aide énormément ! Partagez votre expérience en commentaire ou par message WhatsApp pour nous aider à nous améliorer chaque jour.`,
      cta: `👉 Écrivez-nous en privé pour toute question ou pour nous faire part de vos impressions !`,
    },
    {
      id: 6,
      title: 'Zoom sur l’Offre Principale',
      idea: `Mettre en avant vos prestations clés (${mainOffer}) auprès de ${targetAudience}.`,
      caption: `À la recherche de ${mainOffer} à ${city} ? ⭐\n\nVoici ce que nous vous garantissons chez ${name} :\n• Un accompagnement adapté à ${targetAudience}\n• Une réponse réactive et transparente${differentiator ? `\n• ${differentiator}` : ''}\n\nPrenez contact dès maintenant pour échanger sur votre demande.`,
      cta: `Discutez avec nous en DM pour connaître nos disponibilités cette semaine.`,
    },
    {
      id: 7,
      title: 'Sondage & Échange Communauté',
      idea: `Poser une question ouverte à ${targetAudience} pour encourager la discussion.`,
      caption: `Petite question pour notre communauté de ${city} aujourd'hui 🗳️ :\n\nQuand vous avez besoin de ${mainOffer}, quel est le critère le plus important pour vous ?\n\nA) La réactivité et le professionnalisme\nB) Le conseil personnalisé et l'écoute\n\nChez ${name}, nous essayons de combiner les deux ! Donnez-nous votre avis ci-dessous 👇`,
      cta: `👇 Écrivez votre choix en commentaire !`,
    },
    {
      id: 8,
      title: 'Prise de Contact & Découverte',
      idea: `Faciliter le premier échange pour les membres de ${targetAudience} qui ne vous connaissent pas encore.`,
      caption: `Vous découvrez ${name} pour la première fois à ${city} ? 👋\n\nQue vous ayez un besoin immédiat ou que vous souhaitiez simplement vous renseigner sur nos prestations (${mainOffer}), nous prenons le temps d'étudier votre demande avec soin et bienveillance.`,
      cta: `⚡ Contactez-nous par message privé ou WhatsApp pour démarrer l'échange !`,
    },
    {
      id: 9,
      title: 'Mythe vs Réalité',
      idea: `Démystifier une idée reçue répandue sur ${mainOffer}.`,
      caption: `On pense souvent que trouver un service sérieux pour ${mainOffer} à ${city} est compliqué... ❌\n\nLa réalité chez ${name} : avec une écoute attentive et une méthode claire, tout devient beaucoup plus simple et transparent ✅ !`,
      cta: `Partagez ce post avec un ami ou un collègue qui a besoin de ce service !`,
    },
    {
      id: 10,
      title: 'Rendez-vous de Proximité & Organisation',
      idea: `Inviter ${targetAudience} à anticiper son projet ou sa commande pour la semaine.`,
      caption: `La semaine s'organise chez ${name} à ${city} ! 📅\n\nPour vos besoins en ${mainOffer}, nous vous invitons à nous contacter dès maintenant pour fixer un créneau ou passer commande en toute sérénité.`,
      cta: `📍 Contactez ${name} à ${city}. Lien direct dans notre bio !`,
    },
  ];

  // 2. Generate 10 Captions
  const captions: CaptionItem[] = [
    {
      id: 1,
      theme: 'Découverte',
      text: `Une seule adresse pour retrouver ${mainOffer} à ${city} : bienvenue chez ${name}. Nous sommes ravis d'accompagner ${targetAudience} !`,
      hashtags: [`#${name.replace(/\s+/g, '')}`, `#${city.replace(/\s+/g, '')}`, `#${input.activity.replace(/[\s/]+/g, '')}`, '#ServiceDeProximite', '#QualiteEtRigueur'],
    },
    {
      id: 2,
      theme: 'Engagement Qualité',
      text: `Quand le souci du détail rencontre la passion du métier. Chez ${name}, nous mettons notre savoir-faire au service de ${targetAudience}.`,
      hashtags: [`#${city.replace(/\s+/g, '')}`, '#PassionDuMétier', '#SatisfactionClient', '#SavoirFaire'],
    },
    {
      id: 3,
      theme: 'Motivation',
      text: `Nouvelle semaine, nouveaux projets ! Avancez en toute confiance avec l'accompagnement de ${name} à ${city}.`,
      hashtags: ['#Motivation', '#NouvelleSemaine', `#${name.replace(/\s+/g, '')}`, '#Focus'],
    },
    {
      id: 4,
      theme: 'Savoir-Faire',
      text: `Des prestations pensées avec soin pour répondre aux besoins concrets de ${targetAudience}. Découvrez nos offres dès aujourd'hui chez ${name}.`,
      hashtags: ['#SavoirFaire', '#Transparence', '#QualitéLocale', `#${city.replace(/\s+/g, '')}`],
    },
    {
      id: 5,
      theme: 'Solution Problème',
      text: `Besoin d'une solution fiable pour ${mainOffer} à ${city} ? Échangeons ensemble pour trouver la formule la plus adaptée.`,
      hashtags: ['#SolutionSurMesure', '#ConseilPro', '#ExpertiseLocale'],
    },
    {
      id: 6,
      theme: 'Disponibilités',
      text: `Planning ouvert cette semaine chez ${name} à ${city} pour ${mainOffer}. Contactez-nous à l'avance pour réserver votre créneau.`,
      hashtags: ['#PlanningOuvert', '#Organisation', `#${city.replace(/\s+/g, '')}`],
    },
    {
      id: 7,
      theme: 'Remerciement',
      text: `Un grand merci à toutes les personnes et entreprises qui nous font confiance au quotidien à ${city}. Votre satisfaction est notre moteur !`,
      hashtags: ['#Gratitude', '#PartenairesDeConfiance', '#Proximite'],
    },
    {
      id: 8,
      theme: 'Local & Proximité',
      text: `Fier d'entreprendre et de valoriser le savoir-faire local à ${city}. Soutenez les commerces et indépendants de votre région !`,
      hashtags: [`#${city.replace(/\s+/g, '')}`, '#CommerceDeProximite', '#EntrepreneursLocaux', '#ConsommerLocal'],
    },
    {
      id: 9,
      theme: 'Présentation de l’offre',
      text: `Vous avez un projet en lien avec ${mainOffer} ? Toute l'équipe de ${name} est à votre disposition pour vous conseiller avec bienveillance.`,
      hashtags: ['#ConseilPersonnalise', '#EcouteActive', `#${name.replace(/\s+/g, '')}`],
    },
    {
      id: 10,
      theme: 'Weekend Mood',
      text: `Fin de semaine chez ${name} ! Prenez le temps de vous reposer et préparez vos projets avec sérénité à ${city}.`,
      hashtags: ['#WeekendVibes', '#Detente', `#${city.replace(/\s+/g, '')}`],
    },
  ];

  // 3. Generate 5 Reels / TikTok ideas
  const reels: ReelItem[] = [
    {
      id: 1,
      title: 'Le Problème Résolu',
      hook: `« Si tu fais partie de ${targetAudience} à ${city}, écoute bien ce conseil sur ${mainOffer}... »`,
      concept: `Vidéo pédagogique directe qui aborde le besoin clé de ${targetAudience} et montre comment ${name} y répond avec rigueur.`,
      flow: [
        '00:00 - 00:03 : Plan serré avec texte d\'accroche choc et son tendance.',
        `00:03 - 00:08 : Présentation claire de la difficulté rencontrée couramment par ${targetAudience}.`,
        `00:08 - 00:15 : Démonstration de la solution concrète apportée par ${name} pour ${mainOffer}.`,
        '00:15 - 00:20 : Appel à l\'action invitant à poser une question en commentaire.',
      ],
      cta: `« Abonne-toi à ${name} pour d'autres conseils pratiques à ${city} ! »`,
    },
    {
      id: 2,
      title: '24h dans les coulisses',
      hook: `« Voici comment nous préparons chaque prestation de ${mainOffer} chez ${name}... »`,
      concept: `Présentation soignée des étapes de préparation pour illustrer la méthode de travail et le sérieux.`,
      flow: [
        '00:00 - 00:02 : Plan d\'ouverture sur l\'espace de travail ou les outils.',
        `00:02 - 00:08 : Plans rythmés de quelques secondes montrant les étapes clés de ${mainOffer}.`,
        '00:08 - 00:13 : Vérification minutieuse et soin apporté aux finitions.',
        `00:13 - 00:18 : Texte final avec localisation : ${city}.`,
      ],
      cta: `« Dis-nous en commentaire quel aspect de notre travail te rend le plus curieux ! »`,
    },
    {
      id: 3,
      title: 'Les 3 erreurs classiques à éviter',
      hook: `« 3 erreurs fréquentes à éviter absolument quand vous cherchez ${mainOffer} à ${city}. »`,
      concept: `Vidéo éducative face caméra ou voix-off apportant une vraie valeur d'expert à ${targetAudience}.`,
      flow: [
        '00:00 - 00:03 : Hook visuel avec geste de la main et titre contrasté.',
        '00:03 - 00:07 : Erreur n°1 : Se précipiter sans définir clairement ses priorités.',
        '00:07 - 00:12 : Erreur n°2 : Négliger la clarté et la transparence du prestataire.',
        `00:12 - 00:18 : La bonne démarche : échanger directement avec une équipe à l'écoute comme ${name}.`,
      ],
      cta: `« Enregistre ce Reel pour l'avoir sous la main au moment où tu en auras besoin ! »`,
    },
    {
      id: 4,
      title: 'Ce qui fait notre différence',
      hook: differentiator
        ? `« Pourquoi nos clients choisissent ${name} : ${differentiator} »`
        : `« Pourquoi faire appel à ${name} pour ${mainOffer} à ${city} ? »`,
      concept: `Mise en avant sincère des valeurs, de l'accueil et du savoir-faire de l'entreprise.`,
      flow: [
        '00:00 - 00:03 : Présentation conviviale face caméra ou plan d\'ambiance.',
        `00:03 - 00:09 : Explication concrète de nos engagements pour ${targetAudience}.`,
        `00:09 - 00:14 : Zoom sur la qualité d'exécution de ${mainOffer}.`,
        '00:14 - 00:17 : Invitation au dialogue.',
      ],
      cta: `« Écris-nous directement par WhatsApp pour toute information ! »`,
    },
    {
      id: 5,
      title: 'Comment nous contacter facilement',
      hook: `« Tu as un besoin concernant ${mainOffer} ? Voici la méthode la plus rapide à ${city}. »`,
      concept: `Tutoriel ultra-simple montrant comment poser sa question ou demander un devis sans prise de tête.`,
      flow: [
        '00:00 - 00:03 : Capture d\'écran ou geste montrant le profil et le lien en bio.',
        `00:03 - 00:10 : Démonstration du message type à envoyer pour présenter votre besoin.`,
        '00:10 - 00:15 : Garantie d\'une réponse rapide, personnalisée et bienveillante.',
        '00:15 - 00:20 : Rappel de l\'adresse et des canaux d\'échange.',
      ],
      cta: `« Retrouve le lien direct dans notre bio pour nous écrire ! »`,
    },
  ];

  // 4. Generate WhatsApp Customer Service Templates
  const whatsapp: WhatsAppMessages = {
    welcome: `${toneData.greeting} *${name}* à ${city} ! 🌟\n\nMerci pour votre message. Nous accompagnons ${targetAudience} pour tout ce qui concerne *${mainOffer}*.\n\nComment pouvons-nous vous aider aujourd'hui ?\n1️⃣ Obtenir des informations sur nos prestations\n2️⃣ Demander un devis ou une estimation personnalisée\n3️⃣ Poser une question spécifique\n\n_Indiquez-nous votre besoin, nous vous répondrons avec grand plaisir !_ ✨`,

    pricing: `Bonjour ! Chez *${name}*, nos tarifs sont clairs, transparents et établis sur-mesure selon vos besoins précis pour *${mainOffer}*.\n\n💡 Afin de vous donner le tarif exact sans mauvaise surprise :\n• Pouvez-vous nous préciser en quelques mots votre demande ?\n• Quel est votre délai souhaité ?\n\nNous vous répondrons immédiatement avec une proposition claire et adaptée !`,

    availability: `Bonjour ! Oui tout à fait, nous pouvons répondre à votre demande pour *${name}* à ${city} ! ✅\n\n📍 Prestations : ${mainOffer}\n\nQuel jour et quel créneau horaire vous conviendraient le mieux pour échanger ou démarrer ?`,

    followUp: `Bonjour ! J'espère que vous passez une excellente journée.\n\nJe me permets de revenir vers vous concernant votre demande pour *${mainOffer}* chez *${name}*. Avez-vous eu le temps d'y réfléchir ?\n\nSi vous avez la moindre interrogation, je reste à votre entière disposition ici sur WhatsApp ! 😊`,

    afterSale: `Bonjour ! Un petit message de l'équipe de *${name}* pour prendre de vos nouvelles à ${city} ! 🎉\n\nTout s'est bien passé pour vous ? Êtes-vous satisfait(e) de notre prestation pour *${mainOffer}* ?\n\nVotre avis compte énormément pour nous : n'hésitez pas à nous faire part de vos impressions ou suggestions d'amélioration ! ✨`,
  };

  // 5. Generate Marketing Arsenal (Slogans, Ads, Promos, Bio)
  const slogans = [
    `${name} : La référence pour ${mainOffer} à ${city}.`,
    `Spécialement pensé pour répondre aux attentes de ${targetAudience}.`,
    `${name} — ${differentiator ? differentiator.charAt(0).toUpperCase() + differentiator.slice(1) : 'L\'écoute, la proximité et le savoir-faire à ' + city}.`,
    `Votre satisfaction, notre priorité absolue pour ${mainOffer}.`,
    `${name} — L'adresse de confiance pour vos projets à ${city}.`,
  ];

  const promoOffers: PromoOffer[] = [
    {
      title: 'Offre Découverte & Premier Contact',
      deal: 'Bilan personnalisé ou premier échange offert sans engagement',
      condition: 'Valable pour toute première prise de contact sur nos prestations.',
      pitch: `Vous découvrez ${name} à ${city} ? Bénéficiez d'une écoute attentive pour définir la solution la plus adaptée à vos besoins en ${mainOffer}.`,
    },
    {
      title: 'Formule Recommandation / Parrainage',
      deal: 'Un avantage spécial accordé à vous et à la personne recommandée',
      condition: 'Lorsque vous recommandez nos services à un proche ou un collègue.',
      pitch: `Chez ${name}, la confiance de nos clients est notre plus belle réussite. Nous remercions chaleureusement ceux qui nous recommandent à ${city}.`,
    },
    {
      title: 'Accompagnement Sur-Mesure',
      deal: 'Proposition personnalisée calibrée pour ' + targetAudience,
      condition: 'Sur demande et échange préalable pour cerner vos contraintes.',
      pitch: `Parce que chaque situation est unique, nous adaptons ${mainOffer} pour vous offrir le meilleur équilibre entre qualité, réactivité et budget.`,
    },
  ];

  const adCopies: AdCopy[] = [
    {
      angle: 'Résolution de Problème & Clarté',
      headline: `Vous recherchez une solution fiable pour ${mainOffer} à ${city} ?`,
      body: `Chez ${name}, nous savons que ${targetAudience} a besoin de solutions concrètes et transparentes. Nous mettons notre savoir-faire à votre service pour vous faire gagner du temps et vous apporter entière satisfaction.${diffSentence}`,
      cta: `👉 Cliquez ici pour nous présenter votre besoin en 30 secondes.`,
    },
    {
      angle: 'Transparence & Accompagnement',
      headline: `Pourquoi faire appel à ${name} pour votre projet ?`,
      body: `Un accompagnement personnalisé, une communication directe et une attention constante portée à la qualité de ${mainOffer}. Rejoignez les clients de ${city} qui choisissent la simplicité et la confiance.`,
      cta: `📲 Écrivez-nous directement sur WhatsApp pour en discuter.`,
    },
    {
      angle: 'Prise de Contact Directe',
      headline: `Un projet en tête ? Échangeons dès aujourd'hui chez ${name}`,
      body: `Nous sommes disponibles à ${city} pour répondre à toutes vos interrogations sur ${mainOffer}. Prenez contact sans engagement pour recevoir une réponse rapide et sur-mesure.`,
      cta: `⚡ Envoyez-nous un message pour démarrer l'échange.`,
    },
    {
      angle: 'Fierté Locale & Proximité',
      headline: `Votre spécialiste de ${mainOffer} à ${city}`,
      body: `Soutenez les initiatives et le savoir-faire local de votre ville. Chez ${name}, chaque client bénéficie d'une attention humaine et d'une rigueur professionnelle sans intermédiaire.`,
      cta: `📍 Découvrez nos prestations et contactez-nous dès aujourd'hui !`,
    },
    {
      angle: 'Démarrez sereinement',
      headline: `Passez à l'étape suivante avec l'accompagnement de ${name}`,
      body: `Ne laissez plus traîner vos démarches. Faites le choix d'un accompagnement sérieux pour ${mainOffer}, conçu sur-mesure pour ${targetAudience}.`,
      cta: `💬 Envoyez-nous un message privé pour réserver votre créneau.`,
    },
  ];

  const professionalDescription = `${name} propose des prestations spécialisées en ${mainOffer} à ${city}. Conçue pour répondre aux attentes précises de ${targetAudience}, notre structure s'appuie sur des valeurs d'écoute, de transparence et d'exigence.${diffSentence} Que ce soit pour un besoin ponctuel ou un projet régulier, nous mettons notre expertise au service de votre satisfaction. Prenez contact avec nous à ${city} pour échanger sur vos attentes.`;

  const instagramBio = {
    line1: `📍 ${city} | ${input.activity}`,
    line2: `✨ ${mainOffer.slice(0, 45)}`,
    line3: differentiator ? `💎 ${differentiator.slice(0, 45)}` : `🎯 Pour : ${targetAudience.slice(0, 35)}`,
    cta: `👇 Contactez-nous en DM ou WhatsApp :`,
    formatted: `📍 ${city} | ${input.activity}\n✨ ${mainOffer.slice(0, 45)}\n${differentiator ? `💎 ${differentiator.slice(0, 45)}` : `🎯 Pour : ${targetAudience.slice(0, 35)}`}\n👇 Contactez-nous en DM ou WhatsApp :`,
  };

  // 6. Generate 7-Day Content Calendar
  const calendar: CalendarDay[] = [
    {
      day: 'Lundi',
      theme: 'Présentation & Vision',
      type: 'Post Image / Carrousel',
      focus: `Présenter l'équipe, la mission de ${name} et donner de l'énergie pour la semaine.`,
      actionIdea: `Publier une photo nette de votre espace de travail ou de vous-même avec la vision de ${name} pour ${mainOffer} à ${city}.`,
      exampleHook: `« Pourquoi nous proposons ${mainOffer} à ${city} : notre engagement en 3 points. »`,
    },
    {
      day: 'Mardi',
      theme: 'Conseil & Valeur Pratique',
      type: 'Carrousel ou Reel Court',
      focus: `Donner une astuce concrète que ${targetAudience} peut appliquer pour simplifier son quotidien.`,
      actionIdea: `Partager un conseil pratique et honnête en lien direct avec ${mainOffer}.`,
      exampleHook: `« Le conseil indispensable à connaître si vous recherchez ${mainOffer} à ${city}. »`,
    },
    {
      day: 'Mercredi',
      theme: 'Focus Produit / Service',
      type: 'Photo Détail / Vidéo Démo',
      focus: `Mettre en valeur le produit ou la prestation clé (${mainOffer}) et son utilité pour ${targetAudience}.`,
      actionIdea: `Faire un zoom sur la méthode de travail, la réalisation concrète et le soin apporté.`,
      exampleHook: `« En quoi notre approche de ${mainOffer} répond précisément à vos besoins ? »`,
    },
    {
      day: 'Jeudi',
      theme: 'Preuve de Savoir-Faire & Avis Réels',
      type: 'Story + Post Transparence',
      focus: 'Valoriser les véritables retours clients ou partager une méthode de travail rigoureuse.',
      actionIdea: `Partager la capture d'un vrai message de remerciement reçu ou expliquer vos engagements de qualité.`,
      exampleHook: `« La satisfaction de nos clients sur nos prestations : les coulisses de notre engagement. »`,
    },
    {
      day: 'Vendredi',
      theme: 'Organisation & Anticipation',
      type: 'Post Annonce + Stories Rappel',
      focus: `Inviter ${targetAudience} à anticiper ses commandes ou réservations avant le week-end.`,
      actionIdea: `Rappeler les disponibilités et les délais pour ${mainOffer} chez ${name} à ${city}.`,
      exampleHook: `« Vous avez un projet pour cette semaine ou la suivante ? Parlons-en avant vendredi soir ! »`,
    },
    {
      day: 'Samedi',
      theme: 'Contenu Interactif & Échange',
      type: 'Story Sondage / Quizz',
      focus: 'Créer de la proximité avec la communauté et recueillir leurs avis.',
      actionIdea: `Lancer une question ou un sondage sur les attentes de ${targetAudience} concernant ${mainOffer}.`,
      exampleHook: `« Quel est votre critère n°1 pour choisir ${mainOffer} ? Donnez votre avis chez ${name} ! »`,
    },
    {
      day: 'Dimanche',
      theme: 'Coulisses & Préparation',
      type: 'Photo Ambiance / Bilan',
      focus: 'Humaniser la marque, remercier les personnes qui vous soutiennent et préparer la semaine à venir.',
      actionIdea: 'Partager une photo conviviale de préparation de la semaine à venir.',
      exampleHook: `« Fin de semaine chez ${name}. Merci à tous pour votre confiance et à demain pour de nouveaux projets ! »`,
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
    engineNote: 'Généré par le Moteur Intelligent BizPilot V1.1 (Personnalisation avancée & Véracité garantie).',
  };
}
