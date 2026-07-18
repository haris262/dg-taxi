import type { Metadata } from 'next';
import { isLocale } from '../../../i18n-config';

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = await params;
    const lang = isLocale(locale) ? locale : 'en';

    return {
        title: 'Write a Review',
        description:
            'Share your experience with D&G Taxi Trogir. Leave a review of our taxi and airport transfer service in Croatia.',
        alternates: {
            canonical: `/${lang}/add-review`,
        },
        // Thin utility form — keep it out of the index but let link equity flow.
        robots: {
            index: false,
            follow: true,
        },
    };
}

export default function AddReviewLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return children;
}
