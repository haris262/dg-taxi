import HomePage from '../components/Main/HomePage';
import { translations } from '../components/Translations/translations_index.js';
import { Metadata } from 'next';

// Use inferred keys from your `translations['en']` object if you want full safety
type TranslationKey = keyof typeof translations['en'];

type TranslateFunction = (key: TranslationKey) => string;

export async function generateMetadata(): Promise<Metadata> {
  const lang = 'en'; // Hardcoded default, replace with dynamic if needed

  const t: TranslateFunction = (key) => {
    return translations[lang]?.[key] || key;
  };

  const images = [
    {
      url: 'https://yourdomain.com/trogir5.webp',
      width: 1200,
      height: 630,
      alt: 'View of Trogir waterfront for taxi transfers',
    },
  ];

  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    alternates: {
      canonical: '/',
      languages: {
        'hr-HR': '/hr',
        'en-US': '/en',
        'de-DE': '/de',
        'fr-FR': '/fr',
        'it-IT': '/it',
        'es-ES': '/es',
        'pt-PT': '/pt',
        'nl-NL': '/nl',
        'sv-SE': '/sv',
        'da-DK': '/da',
        'no-NO': '/no',
        'fi-FI': '/fi',
        'pl-PL': '/po',
        'cs-CZ': '/cs',
        'hu-HU': '/hu',
        'ro-RO': '/ro',
      },
    },
    openGraph: {
      title: t('metaTitle'),
      description: t('metaDescription'),
      url: 'https://trogirtaxidg.hr',
      siteName: 'D&G Taxi Trogir | Split Airport Taxi Transfers',
      images,
      locale: 'en_US',
      type: 'website',
    },
  };
}

export default function Page() {
  return <HomePage />;
}
