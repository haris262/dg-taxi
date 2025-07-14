"use client";
import React, { useState, createContext, useContext } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MapPin, MessageCircle, Globe } from 'lucide-react';
import companyLogo from '../../public/assets/D&G Logo.png';
import { translations } from '../Translations/translations_index.js';

// --- Translation Context and Provider (now centralized) ---
const TranslationContext = createContext();
export const useTranslation = () => useContext(TranslationContext);

export const TranslationProvider = ({ children }) => {
    const [currentLanguage, setCurrentLanguage] = useState('en');
    const t = (key) => translations[currentLanguage]?.[key] || key;
    const switchLanguage = (lang) => setCurrentLanguage(lang);

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
        no: 'Norsk', fi: 'Suomi', po: 'Polski', cs: 'Čeština', hu: 'Magyar', ro: 'Română'
    };

    return (
        <div className="flex items-center space-x-2 relative cursor-pointer">
            <Globe className="h-4 w-4 text-white/70 pointer-events-none" />
            <select
                value={currentLanguage}
                onChange={(e) => switchLanguage(e.target.value)}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            >
                {Object.entries(languages).map(([code, name]) => (
                    <option key={code} value={code}>{name}</option>
                ))}
            </select>
            <span className="hidden sm:block text-sm font-medium text-white/70 pointer-events-none leading-4">
                {languages[currentLanguage]}
            </span>
        </div>
    );
};


// --- Header Component ---
export const Header = () => {
    const { t } = useTranslation();
    const whatsappNumber = "385993230277";
    const openWhatsApp = () => window.open(`https://wa.me/${whatsappNumber}`, '_blank');

    return (
        <header>
            <nav className="bg-gray-800 bg-opacity-80 backdrop-blur shadow-lg sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 pl-0 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <Link href="/" className="flex items-center space-x-2">
                            <Image src={companyLogo} alt="company logo" className="h-16 w-24" />
                        </Link>
                        <div className="flex items-center space-x-4">
                            <LanguageSwitcher />
                        </div>
                    </div>
                </div>
            </nav>
            <nav onClick={openWhatsApp} className="bg-green-500 hover:bg-green-600 text-white bg-opacity-80 backdrop-blur shadow-lg sticky flex justify-center cursor-pointer p-4 top-16 z-50">
                <MessageCircle className="h-6 w-5 mr-3" />
                <span className="font-medium">WhatsApp: {t('callUs')}</span>
            </nav>
        </header>
    );
};

// --- Footer Component ---
export const Footer = () => {
    const { t } = useTranslation();
    const whatsappNumber = "385993230277";
    const openWhatsApp = () => window.open(`https://wa.me/${whatsappNumber}`, '_blank');

    return (
        <footer className="bg-gray-800 text-white py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-3 gap-8">
                    <div>
                        <div className="flex items-center space-x-2 max-sm:justify-center">
                            <Image src={companyLogo} alt="D&G Taxi Trogir company logo" className="h-24 w-54 max-sm:h-54 max-sm:w-3/5"  />
                        </div>
                        <p className="text-gray-300 mb-4 mt-4">{t('footerTagline')}</p>
                        <button onClick={openWhatsApp} className="flex items-center space-x-2 bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg transition-colors duration-200">
                            <MessageCircle className="h-5 w-5" />
                            <span>WhatsApp: {t('callUs')}</span>
                        </button>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4">{t('services')}</h3>
                        <ul className="space-y-2 text-gray-300">
                            <li>{t('airportTransfers')}</li>
                            <li>{t('cityTours')}</li>
                            <li>{t('businessTravel')}</li>
                            <li>{t('eventTransportation')}</li>
                            <li>{t('longDistanceTrips')}</li>
                            <li>{t('nationalParks')}</li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4">{t('contactInfo')}</h3>
                        <div className="space-y-2 text-gray-300">
                            <div className="flex items-center space-x-2"><Phone className="h-4 w-4" /><span>{t('callUs')}</span></div>
                            <div className="flex items-center space-x-2"><Mail className="h-4 w-4" /><span>taxidgtrogir@outlook.com</span></div>
                            <div className="flex items-center space-x-2"><MapPin className="h-4 w-4" /><span>Trogir, Croatia</span></div>
                        </div>
                    </div>
                </div>
                <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
                    <p>&copy; {new Date().getFullYear()} {t('companyName')}. {t('allRightsReserved')}</p>
                </div>
            </div>
        </footer>
    );
};
