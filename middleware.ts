import { NextRequest, NextResponse } from 'next/server';
import { locales, defaultLocale } from './i18n-config';

// Pick the best-matching locale from the Accept-Language header.
function detectLocale(request: NextRequest): string {
    const header = request.headers.get('accept-language');
    if (!header) return defaultLocale;

    const accepted = header
        .split(',')
        .map((part) => {
            const [tag, q] = part.trim().split(';q=');
            return { tag: tag.toLowerCase(), q: q ? parseFloat(q) : 1 };
        })
        .sort((a, b) => b.q - a.q);

    for (const { tag } of accepted) {
        const base = tag.split('-')[0];
        const match = locales.find((loc) => loc === base);
        if (match) return match;
    }
    return defaultLocale;
}

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Skip if the path already starts with a supported locale.
    const hasLocale = locales.some(
        (loc) => pathname === `/${loc}` || pathname.startsWith(`/${loc}/`),
    );
    if (hasLocale) return NextResponse.next();

    // Redirect locale-less paths (e.g. "/" or "/add-review") to the detected locale.
    const locale = detectLocale(request);
    const url = request.nextUrl.clone();
    url.pathname = `/${locale}${pathname === '/' ? '' : pathname}`;
    return NextResponse.redirect(url);
}

export const config = {
    // Run on everything except Next internals, metadata files, and static assets.
    matcher: [
        '/((?!_next|assets|favicon.ico|logo.png|robots.txt|sitemap.xml|manifest.webmanifest|.*\\.[a-zA-Z0-9]+$).*)',
    ],
};
