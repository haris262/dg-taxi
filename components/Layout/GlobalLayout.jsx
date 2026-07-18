"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { Phone, Mail, MapPin, MessageCircle, Globe, Clock, ChevronRight } from 'lucide-react';
import companyLogo from '../../public/assets/D&G Logo.png';
import { translations } from '../Translations/translations_index.js';

const PHONE_DISPLAY = '+385 99 323 0277';
const PHONE_TEL = '+385993230277';
const WHATSAPP_NUMBER = '385993230277';
const CONTACT_EMAIL = 'taxidgtrogir@outlook.com';

// --- Translation Context and Provider (centralized) ---
const TranslationContext = createContext();
export const useTranslation = () => useContext(TranslationContext);

// Returns true once the top WhatsApp banner has scrolled out of view, so the
// floating button / mobile bar only appear when the banner is no longer shown.
const useBannerHidden = () => {
    const [hidden, setHidden] = useState(false);
    useEffect(() => {
        const banner = document.getElementById('wa-banner');
        if (!banner || typeof IntersectionObserver === 'undefined') return;
        const io = new IntersectionObserver(
            ([entry]) => setHidden(!entry.isIntersecting),
            { rootMargin: '-72px 0px 0px 0px', threshold: 0 }
        );
        io.observe(banner);
        return () => io.disconnect();
    }, []);
    return hidden;
};

export const TranslationProvider = ({ children, locale = 'en' }) => {
    const router = useRouter();
    const pathname = usePathname();
    // Language is driven by the URL locale segment (/en, /de, ...) so every
    // language has its own crawlable page.
    const currentLanguage = translations[locale] ? locale : 'en';
    // Fall back to English before showing a raw key, so newly added copy
    // stays readable in every language until it is fully translated.
    const t = (key) => translations[currentLanguage]?.[key] || translations.en?.[key] || key;
    // Swap the leading locale segment and navigate, preserving the current path.
    const switchLanguage = (lang) => {
        const segments = (pathname || `/${currentLanguage}`).split('/');
        if (segments.length > 1) {
            segments[1] = lang;
        } else {
            segments.push(lang);
        }
        router.push(segments.join('/') || `/${lang}`);
    };

    return (
        <TranslationContext.Provider value={{ t, currentLanguage, switchLanguage }}>
            {children}
        </TranslationContext.Provider>
    );
};

// --- Language Switcher ---
const LanguageSwitcher = () => {
    const { currentLanguage, switchLanguage } = useTranslation();
    const languages = {
        hr: 'Hrvatski', en: 'English', de: 'Deutsch', fr: 'Français', it: 'Italiano',
        es: 'Español', pt: 'Português', nl: 'Nederlands', sv: 'Svenska', da: 'Dansk',
        no: 'Norsk', fi: 'Suomi', pl: 'Polski', cs: 'Čeština', hu: 'Magyar', ro: 'Română'
    };

    return (
        <div className="flex items-center gap-2 relative cursor-pointer text-white/70 hover:text-gold transition-colors">
            <Globe className="h-4 w-4 pointer-events-none" />
            <select
                aria-label="Select language"
                value={currentLanguage}
                onChange={(e) => switchLanguage(e.target.value)}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            >
                {Object.entries(languages).map(([code, name]) => (
                    <option key={code} value={code} className="text-ink">{name}</option>
                ))}
            </select>
            <span className="text-sm font-medium pointer-events-none leading-4">
                {languages[currentLanguage]}
            </span>
        </div>
    );
};

// --- Header Component ---
export const Header = () => {
    const { t, currentLanguage } = useTranslation();

    return (
        <header>
            {/* Utility bar */}
            <div className="bg-navy-950 text-white/70 border-b border-white/5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex h-10 items-center justify-between text-xs sm:text-sm">
                        <div className="flex items-center gap-4">
                            <a href={`tel:${PHONE_TEL}`} className="flex items-center gap-2 hover:text-gold transition-colors">
                                <Phone className="h-3.5 w-3.5" />
                                <span className="font-medium tracking-wide">{PHONE_DISPLAY}</span>
                            </a>
                            <span className="hidden sm:flex items-center gap-2 text-white/50">
                                <span className="h-3 w-px bg-white/15" />
                                <Clock className="h-3.5 w-3.5" />
                                <span>{t('available247Short')}</span>
                            </span>
                        </div>
                        <LanguageSwitcher />
                    </div>
                </div>
            </div>

            {/* Main navigation */}
            <nav className="bg-navy-900/90 backdrop-blur-md border-b border-gold/15 shadow-lg sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center h-16">
                        <Link href={`/${currentLanguage}`} className="flex items-center" aria-label="D&G Taxi Trogir — home">
                            <Image src={companyLogo} alt="D&G Taxi Trogir" className="h-11 w-auto sm:h-12" priority />
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Primary contact banner — WhatsApp is the fastest way to book.
                Scrolls away with the page; the floating button / mobile bar take over below. */}
            <a
                id="wa-banner"
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Book on WhatsApp"
                className="group flex items-center justify-center gap-3 px-4 py-2.5 text-white bg-gradient-to-r from-[#1EA952] via-[#25D366] to-[#1EA952] shadow-md transition-[filter] hover:brightness-110"
            >
                <span className="relative flex h-8 w-8 items-center justify-center rounded-full bg-white/20 shrink-0 wa-pulse-white">
                    <MessageCircle className="h-5 w-5" />
                </span>
                <span className="flex flex-col leading-tight text-center sm:flex-row sm:items-center sm:gap-2">
                    <span className="font-semibold text-sm sm:text-base">{t('whatsappCta')}</span>
                    <span className="hidden sm:inline text-white/50">·</span>
                    <span className="text-white/90 text-xs sm:text-sm font-medium tracking-wide">{PHONE_DISPLAY}</span>
                </span>
                <ChevronRight className="h-5 w-5 shrink-0 transition-transform group-hover:translate-x-0.5" />
            </a>
        </header>
    );
};

// --- Footer Component ---
export const Footer = () => {
    const { t } = useTranslation();

    return (
        <footer className="bg-navy-texture text-white/75 pt-16 pb-24 md:pb-16 border-t border-gold/15">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
                    {/* Brand */}
                    <div>
                        <Image src={companyLogo} alt="D&G Taxi Trogir company logo" className="h-16 w-auto" />
                        <p className="text-white/60 mt-5 leading-relaxed text-sm max-w-xs">{t('footerTagline')}</p>
                        <a
                            href={`https://wa.me/${WHATSAPP_NUMBER}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-whatsapp mt-6 text-sm !py-2.5 !px-5"
                        >
                            <MessageCircle className="h-4 w-4" />
                            <span>WhatsApp</span>
                        </a>
                    </div>

                    {/* Services */}
                    <div>
                        <h3 className="text-white font-display text-lg mb-4">{t('services')}</h3>
                        <ul className="space-y-2.5 text-sm text-white/60">
                            <li>{t('airportTransfers')}</li>
                            <li>{t('cityTours')}</li>
                            <li>{t('businessTravel')}</li>
                            <li>{t('eventTransportation')}</li>
                            <li>{t('longDistanceTrips')}</li>
                            <li>{t('nationalParks')}</li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-white font-display text-lg mb-4">{t('contactInfo')}</h3>
                        <ul className="space-y-3 text-sm text-white/60">
                            <li>
                                <a href={`tel:${PHONE_TEL}`} className="flex items-center gap-3 hover:text-gold transition-colors">
                                    <Phone className="h-4 w-4 text-gold shrink-0" />
                                    <span>{PHONE_DISPLAY}</span>
                                </a>
                            </li>
                            <li>
                                <a href={`mailto:${CONTACT_EMAIL}`} className="flex items-center gap-3 hover:text-gold transition-colors break-all">
                                    <Mail className="h-4 w-4 text-gold shrink-0" />
                                    <span>{CONTACT_EMAIL}</span>
                                </a>
                            </li>
                            <li className="flex items-center gap-3">
                                <MapPin className="h-4 w-4 text-gold shrink-0" />
                                <span>Trogir, Croatia</span>
                            </li>
                        </ul>
                    </div>

                    {/* Hours & coverage */}
                    <div>
                        <h3 className="text-white font-display text-lg mb-4">{t('serviceHours')}</h3>
                        <p className="flex items-center gap-3 text-sm text-white/60">
                            <Clock className="h-4 w-4 text-gold shrink-0" />
                            <span>{t('hours247')}</span>
                        </p>
                        <h3 className="text-white font-display text-lg mt-6 mb-3">{t('coverageArea')}</h3>
                        <p className="text-sm text-white/60 leading-relaxed">{t('coverageList')}</p>
                    </div>
                </div>

                <hr className="hairline mt-12 mb-6" />
                <p className="text-center text-xs text-white/45">
                    &copy; {new Date().getFullYear()} {t('companyName')}. {t('allRightsReserved')}
                </p>
            </div>
        </footer>
    );
};

// --- Mobile action bar (appears once the top banner scrolls away) ---
export const MobileActionBar = () => {
    const { t, currentLanguage } = useTranslation();
    const show = useBannerHidden();

    return (
        <div
            className={`fixed bottom-0 inset-x-0 z-50 md:hidden bg-navy-900/95 backdrop-blur-md border-t border-white/10 transition-transform duration-300 ease-out ${show ? 'translate-y-0' : 'translate-y-full'}`}
            style={{ paddingBottom: 'calc(env(safe-area-inset-bottom) + 0.5rem)' }}
        >
            <div className="flex items-stretch gap-2 px-3 pt-2.5">
                <a href={`tel:${PHONE_TEL}`} className="flex-1 flex flex-col items-center justify-center gap-1 rounded-xl bg-white/[0.08] py-2 text-white/90 active:bg-white/15 transition-colors">
                    <Phone className="h-[18px] w-[18px]" />
                    <span className="text-[11px] font-semibold">{t('callAction')}</span>
                </a>
                <a
                    href={`https://wa.me/${WHATSAPP_NUMBER}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-[1.5] flex flex-col items-center justify-center gap-1 rounded-xl bg-[#25D366] py-2 text-white shadow-sm shadow-[#25D366]/30 active:brightness-95"
                >
                    <MessageCircle className="h-[18px] w-[18px]" />
                    <span className="text-[11px] font-bold">WhatsApp</span>
                </a>
                <a href={`/${currentLanguage}#booking`} className="flex-1 flex flex-col items-center justify-center gap-1 rounded-xl bg-gold py-2 text-navy-950 active:brightness-95">
                    <ChevronRight className="h-[18px] w-[18px]" />
                    <span className="text-[11px] font-semibold">{t('reserve')}</span>
                </a>
            </div>
        </div>
    );
};

// --- Floating WhatsApp button (desktop; appears once the top banner scrolls away) ---
export const WhatsAppFab = () => {
    const { t } = useTranslation();
    const show = useBannerHidden();

    return (
        <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t('chatOnWhatsapp')}
            aria-hidden={!show}
            tabIndex={show ? 0 : -1}
            className={`hidden md:inline-flex fixed bottom-6 right-6 z-40 items-center gap-2.5 rounded-full bg-[#25D366] hover:bg-[#1EA952] text-white font-semibold pl-3 pr-5 py-3 shadow-xl shadow-navy-950/30 transition-all duration-300 ease-out ${show ? 'opacity-100 translate-y-0 pointer-events-auto wa-pulse-green' : 'opacity-0 translate-y-3 pointer-events-none'}`}
        >
            <MessageCircle className="h-6 w-6 shrink-0" />
            <span className="text-sm whitespace-nowrap">{t('chatOnWhatsapp')}</span>
        </a>
    );
};
