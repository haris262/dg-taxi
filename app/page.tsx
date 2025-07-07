import HomePage from '../components/Main/HomePage';
import { translations } from '../components/Translations/translations_index.js';
import { Metadata, ResolvingMetadata } from 'next';

// Type for translation keys (replace with your actual keys)
type TranslationKey =
    | 'metaTitle'
    | 'metaDescription'
    | /* add other translation keys here */ string;

// Type-safe translation function
type TranslateFunction = (key: TranslationKey) => string;

// Define proper types for generateMetadata parameters
interface GenerateMetadataProps {
  params: Record<string, string | string[]>; // Or more specific if needed
  searchParams?: { [key: string]: string | string[] | undefined };
}

export async function generateMetadata(
    { params, searchParams }: GenerateMetadataProps,
    parent: ResolvingMetadata
): Promise<Metadata> {
  const lang = 'en'; // Default language for metadata
  const t: TranslateFunction = (key) => (translations as any)[lang][key] || key;

  // Consider adding type safety for your images array
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
      languages : {
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
      }
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