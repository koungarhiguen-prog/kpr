export type BusinessActivity =
  | 'Restaurant'
  | 'Coiffeur / Barbier'
  | 'Boutique de vêtements'
  | 'Beauté'
  | 'Photographe'
  | 'Réparation téléphone'
  | 'Informaticien'
  | 'Professeur'
  | 'Coach'
  | 'Freelance'
  | 'Autre';

export type MarketingGoal =
  | 'Obtenir plus de clients'
  | 'Augmenter les ventes'
  | 'Développer Instagram'
  | 'Promouvoir une offre'
  | 'Faire connaître mon activité';

export type BrandTone =
  | 'Professionnel'
  | 'Dynamique'
  | 'Premium'
  | 'Jeune'
  | 'Humoristique';

export interface BusinessInput {
  activity: BusinessActivity | string;
  businessName: string;
  description: string;
  city: string;
  goal: MarketingGoal;
  tone: BrandTone;
}

export interface PostItem {
  id: number;
  title: string;
  idea: string;
  caption: string;
  cta: string;
}

export interface CaptionItem {
  id: number;
  theme: string;
  text: string;
  hashtags: string[];
}

export interface ReelItem {
  id: number;
  title: string;
  hook: string;
  concept: string;
  flow: string[];
  cta: string;
}

export interface WhatsAppMessages {
  welcome: string;
  pricing: string;
  availability: string;
  followUp: string;
  afterSale: string;
}

export interface PromoOffer {
  title: string;
  deal: string;
  condition: string;
  pitch: string;
}

export interface AdCopy {
  angle: string;
  headline: string;
  body: string;
  cta: string;
}

export interface InstagramBio {
  line1: string;
  line2: string;
  line3: string;
  cta: string;
  formatted: string;
}

export interface MarketingKitData {
  slogans: string[];
  promoOffers: PromoOffer[];
  adCopies: AdCopy[];
  professionalDescription: string;
  instagramBio: InstagramBio;
}

export interface CalendarDay {
  day: string;
  theme: string;
  type: string;
  focus: string;
  actionIdea: string;
  exampleHook: string;
}

export interface BusinessKit {
  id: string;
  createdAt: string;
  input: BusinessInput;
  posts: PostItem[];
  captions: CaptionItem[];
  reels: ReelItem[];
  whatsapp: WhatsAppMessages;
  marketing: MarketingKitData;
  calendar: CalendarDay[];
  engineNote: string;
}

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  businessName?: string;
  plan: 'free' | 'pro' | 'business';
  createdAt: string;
}

export type PageView =
  | 'landing'
  | 'generator'
  | 'results'
  | 'pricing'
  | 'about'
  | 'dashboard'
  | 'login'
  | 'register';
