import HomePage from '../../components/Main/HomePage';
import { translations } from '../../components/Translations/translations_index.js';
import { localeToBcp47, isLocale, locales, type Locale } from '../../i18n-config';
import { Metadata } from 'next';

const SITE_URL = 'https://trogirtaxidg.hr';

// Use inferred keys from your `translations['en']` object if you want full safety
type TranslationKey = keyof typeof translations['en'];
type TranslateFunction = (key: TranslationKey) => string;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const lang: Locale = isLocale(locale) ? locale : 'en';

  // Fall back to English copy before showing a raw key.
  const dict = translations[lang] as Record<string, string> | undefined;
  const t: TranslateFunction = (key) =>
    dict?.[key] || translations.en?.[key] || key;

  const images = [
    {
      url: '/assets/trogir5.webp',
      width: 1200,
      height: 630,
      alt: 'View of Trogir waterfront for taxi transfers',
    },
  ];

  // NOTE: `alternates` (canonical + hreflang) is intentionally set only in the
  // locale layout. Redefining it here would replace the layout's version and
  // drop the hreflang tags, since Next.js overrides the whole `alternates` object.
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    openGraph: {
      title: t('metaTitle'),
      description: t('metaDescription'),
      url: `${SITE_URL}/${lang}`,
      siteName: 'D&G Taxi Trogir | Split Airport Taxi Transfers',
      images,
      locale: localeToBcp47[lang].replace('-', '_'),
      type: 'website',
    },
  };
}

export default function Page() {
  return <HomePage />;
}
