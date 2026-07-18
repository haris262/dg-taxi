import type { MetadataRoute } from 'next';
import { locales, localeToBcp47 } from '../i18n-config';

const SITE_URL = 'https://trogirtaxidg.hr';

// Build the hreflang alternates map for a given path across all locales.
function languageAlternates(path = '') {
    const languages: Record<string, string> = {};
    for (const loc of locales) {
        languages[localeToBcp47[loc]] = `${SITE_URL}/${loc}${path}`;
    }
    return languages;
}

export default function sitemap(): MetadataRoute.Sitemap {
    const lastModified = new Date();

    // One entry per locale for the homepage, each cross-linking its alternates.
    return locales.map((loc) => ({
        url: `${SITE_URL}/${loc}`,
        lastModified,
        changeFrequency: 'weekly',
        priority: loc === 'en' ? 1 : 0.8,
        alternates: {
            languages: languageAlternates(),
        },
    }));
}
