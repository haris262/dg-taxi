import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'D&G Taxi Trogir | Split Airport Transfers',
        short_name: 'D&G Taxi',
        description:
            'Reliable taxi and private transfers from Trogir and Split Airport to all destinations in Croatia. 24/7 service, fixed prices.',
        start_url: '/',
        display: 'standalone',
        background_color: '#0b1220',
        theme_color: '#0b1220',
        icons: [
            {
                src: '/icon-192.png',
                sizes: '192x192',
                type: 'image/png',
                purpose: 'any',
            },
            {
                src: '/icon-512.png',
                sizes: '512x512',
                type: 'image/png',
                purpose: 'any',
            },
        ],
    };
}
