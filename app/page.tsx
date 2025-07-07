import HomePage from '../components/Main/HomePage'; // Assuming you renamed Main.jsx to HomePage.jsx
import { translations } from '../components/Translations/translations_index.js';

// This function generates SEO metadata on the server
export async function generateMetadata({ params, searchParams }, parent) {
  // For this example, we'll default to English for crawlers,
  // but ideally, you'd have language detection or separate routes like /en, /hr
  const lang = 'en'; // Default language for metadata
  const t = (key) => translations[lang][key] || key;

  return {
    title: t('metaTitle'), // Example: "Taxi Trogir & Split Airport Transfers | D&G"
    description: t('metaDescription'), // Example: "Reliable taxi and transfers from Trogir and Split Airport to all destinations in Croatia. Book your ride online for a fixed price. 24/7 service."
    alternates: {
      canonical: '/',
      languages: {
        'hr-HR': '/hr',
        'en-US': '/en',
        'de-DE': '/de',
        // Add all other languages you support
      },
    },
    openGraph: {
      title: t('metaTitle'),
      description: t('metaDescription'),
      url: 'https://yourdomain.com',
      siteName: 'D&G Taxi Trogir',
      images: [
        {
          url: 'https://yourdomain.com/trogir5.webp', // Must be an absolute URL
          width: 1200,
          height: 630,
          alt: 'View of Trogir waterfront for taxi transfers',
        },
      ],
      locale: 'en_US', // Change dynamically based on language
      type: 'website',
    },
  }
}

export default function Page() {
  return <HomePage />;
}