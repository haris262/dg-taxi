// Central locale configuration shared by routing, middleware, and metadata.
// Codes match the keys in components/Translations/translations_index.js.
export const locales = [
    'en', 'hr', 'de', 'fr', 'it', 'es', 'pt', 'nl',
    'sv', 'da', 'no', 'fi', 'pl', 'cs', 'hu', 'ro',
] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

// Maps our short codes to BCP-47 tags for <html lang> and hreflang.
export const localeToBcp47: Record<Locale, string> = {
    en: 'en',
    hr: 'hr-HR',
    de: 'de-DE',
    fr: 'fr-FR',
    it: 'it-IT',
    es: 'es-ES',
    pt: 'pt-PT',
    nl: 'nl-NL',
    sv: 'sv-SE',
    da: 'da-DK',
    no: 'nb-NO',
    fi: 'fi-FI',
    pl: 'pl-PL',
    cs: 'cs-CZ',
    hu: 'hu-HU',
    ro: 'ro-RO',
};

export function isLocale(value: string): value is Locale {
    return (locales as readonly string[]).includes(value);
}
