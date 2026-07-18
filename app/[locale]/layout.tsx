import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Playfair_Display, Inter } from "next/font/google";
import "../globals.css";
import { TranslationProvider, Header, Footer, MobileActionBar, WhatsAppFab } from '../../components/Layout/GlobalLayout';
import { locales, localeToBcp47, isLocale, type Locale } from "../../i18n-config";

const playfair = Playfair_Display({
    variable: "--font-playfair",
    subsets: ["latin", "latin-ext"],
    weight: ["500", "600", "700"],
    display: "swap",
});

const inter = Inter({
    variable: "--font-inter",
    subsets: ["latin", "latin-ext"],
    display: "swap",
});

const SITE_URL = "https://trogirtaxidg.hr";

export function generateStaticParams() {
    return locales.map((locale) => ({ locale }));
}

// Build hreflang alternates so Google serves the right language per market.
function buildLanguageAlternates(path = "") {
    const languages: Record<string, string> = {};
    for (const loc of locales) {
        languages[localeToBcp47[loc]] = `/${loc}${path}`;
    }
    languages["x-default"] = `/en${path}`;
    return languages;
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = await params;
    const activeLocale: Locale = isLocale(locale) ? locale : "en";

    return {
        metadataBase: new URL(SITE_URL),
        title: {
            default: "Taxi Trogir & Split Airport Transfers | D&G Taxi",
            template: "%s | D&G Taxi Trogir",
        },
        description:
            "Reliable taxi and private transfers from Trogir and Split Airport to all destinations in Croatia. Fixed prices, 24/7 service, professional drivers. Book online.",
        keywords: [
            "taxi Trogir",
            "Split Airport transfer",
            "taxi Split",
            "Trogir airport transfer",
            "Croatia private transfer",
            "taxi Dalmatia",
            "airport taxi Croatia",
            "Trogir to Split taxi",
            "Krka national park tour",
            "Plitvice tour taxi",
        ],
        authors: [{ name: "D&G Taxi Trogir" }],
        creator: "D&G Taxi Trogir",
        publisher: "D&G Taxi Trogir",
        applicationName: "D&G Taxi Trogir",
        category: "travel",
        alternates: {
            canonical: `/${activeLocale}`,
            languages: buildLanguageAlternates(),
        },
        openGraph: {
            type: "website",
            siteName: "D&G Taxi Trogir | Split Airport Taxi Transfers",
            title: "Taxi Trogir & Split Airport Transfers | D&G Taxi",
            description:
                "Reliable taxi and private transfers from Trogir and Split Airport to all destinations in Croatia. Fixed prices, 24/7 service.",
            url: `${SITE_URL}/${activeLocale}`,
            locale: localeToBcp47[activeLocale].replace("-", "_"),
            images: [
                {
                    url: "/assets/trogir5.webp",
                    width: 1200,
                    height: 630,
                    alt: "Trogir waterfront on the Dalmatian coast, Croatia — D&G Taxi transfers",
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: "Taxi Trogir & Split Airport Transfers | D&G Taxi",
            description:
                "Reliable taxi and private transfers from Trogir and Split Airport to all destinations in Croatia. Fixed prices, 24/7 service.",
            images: ["/assets/trogir5.webp"],
        },
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                "max-image-preview": "large",
                "max-snippet": -1,
                "max-video-preview": -1,
            },
        },
        // Favicon + apple-touch icon are served automatically from app/icon.png
        // and app/apple-icon.png (navy background, matching the site nav).
        // Paste your Google Search Console code into the NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
        // environment variable (see .env.local.example). Leaving it unset omits the tag safely.
        verification: {
            google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
        },
    };
}

// Structured data (JSON-LD) — helps Google understand the local business,
// enabling rich results in Search and Maps.
const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TaxiService",
    "@id": `${SITE_URL}/#taxiservice`,
    name: "D&G Taxi Trogir",
    description:
        "Private taxi and airport transfer service based in Trogir, Croatia. Split Airport transfers, long-distance trips and national park tours across Dalmatia.",
    url: SITE_URL,
    telephone: "+385993230277",
    email: "taxidgtrogir@outlook.com",
    image: `${SITE_URL}/assets/trogir5.webp`,
    logo: `${SITE_URL}/logo.png`,
    priceRange: "€€",
    foundingDate: "1988",
    address: {
        "@type": "PostalAddress",
        addressLocality: "Trogir",
        addressCountry: "HR",
    },
    areaServed: [
        "Trogir",
        "Split",
        "Split Airport",
        "Zadar",
        "Dubrovnik",
        "Zagreb",
        "Krka National Park",
        "Plitvice Lakes",
    ].map((name) => ({ "@type": "Place", name })),
    provider: {
        "@type": "LocalBusiness",
        name: "D&G Taxi Trogir",
        telephone: "+385993230277",
        email: "taxidgtrogir@outlook.com",
        address: {
            "@type": "PostalAddress",
            addressLocality: "Trogir",
            addressCountry: "HR",
        },
        openingHoursSpecification: {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday",
            ],
            opens: "00:00",
            closes: "23:59",
        },
    },
    availableChannel: {
        "@type": "ServiceChannel",
        serviceUrl: SITE_URL,
        servicePhone: "+385993230277",
    },
};

export default async function LocaleLayout({
    children,
    params,
}: Readonly<{
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}>) {
    const { locale } = await params;
    if (!isLocale(locale)) {
        notFound();
    }

    return (
        <html lang={localeToBcp47[locale]}>
        <body className={`${playfair.variable} ${inter.variable} antialiased`}>
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <TranslationProvider locale={locale}>
            <div className="min-h-screen flex flex-col">
                <Header />
                <main className="flex-grow">
                    {children}
                </main>
                <Footer />
            </div>
            <MobileActionBar />
            <WhatsAppFab />
        </TranslationProvider>
        </body>
        </html>
    );
}
