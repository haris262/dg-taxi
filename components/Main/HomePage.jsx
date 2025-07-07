"use client";
import React, { useState, createContext, useContext } from 'react';
import {
    Phone,
    Mail,
    MapPin,
    Clock,
    Users,
    Calendar,
    MessageCircle,
    Car,
    Star,
    Shield,
    Award,
    Globe,
} from 'lucide-react';
import Image from 'next/image'
import emailjs from 'emailjs-com';
import trogir from '../../public/assets/trogir5.webp';
import trogirMobile from '../../public/assets/trogir_mobile.jpg';
import companyLogo from '../../public/assets/D&G Logo.png';
import { useMediaQuery } from 'react-responsive'



// Import translations
import { translations } from '../Translations/translations_index.js';

// Translation Context
const TranslationContext = createContext();

// Translation Hook
const useTranslation = () => {
    const context = useContext(TranslationContext);
    if (!context) {
        throw new Error('useTranslation must be used within a TranslationProvider');
    }
    return context;
};

// Translation Provider Component
const TranslationProvider = ({ children }) => {
    const [currentLanguage, setCurrentLanguage] = useState('hr'); // Default to Croatian

    const t = (key) => {
        return translations[currentLanguage][key] || key;
    };

    const switchLanguage = (lang) => {
        setCurrentLanguage(lang);
    };

    return (
        <TranslationContext.Provider value={{ t, currentLanguage, switchLanguage }}>
            {children}
        </TranslationContext.Provider>
    );
};

// Language Switcher Component
const LanguageSwitcher = () => {
    const {currentLanguage, switchLanguage} = useTranslation();

    return (
        <div className="flex items-center space-x-2 relative cursor-pointer">
            <Globe className="h-4 w-4 text-white/70 pointer-events-none"/>
            <select
                value={currentLanguage}
                onChange={(e) => switchLanguage(e.target.value)}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            >
                <option value="hr">Hrvatski</option>
                <option value="en">English</option>
                <option value="de">Deutsch</option>
                <option value="fr">Français</option>
                <option value="it">Italiano</option>
                <option value="es">Español</option>
                <option value="pt">Português</option>
                <option value="nl">Nederlands</option>
                <option value="sv">Svenska</option>
                <option value="da">Dansk</option>
                <option value="no">Norsk</option>
                <option value="fi">Suomi</option>
                <option value="po">Polski</option>
                <option value="cs">Čeština</option>
                <option value="hu">Magyar</option>
                <option value="ro">Română</option>
            </select>
            <span className="hidden sm:block text-sm font-medium text-white/70 pointer-events-none leading-4">
                {currentLanguage === 'hr' && 'Hrvatski'}
                {currentLanguage === 'en' && 'English'}
                {currentLanguage === 'de' && 'Deutsch'}
                {currentLanguage === 'fr' && 'Français'}
                {currentLanguage === 'it' && 'Italiano'}
                {currentLanguage === 'es' && 'Español'}
                {currentLanguage === 'pt' && 'Português'}
                {currentLanguage === 'nl' && 'Nederlands'}
                {currentLanguage === 'sv' && 'Svenska'}
                {currentLanguage === 'da' && 'Dansk'}
                {currentLanguage === 'no' && 'Norsk'}
                {currentLanguage === 'fi' && 'Suomi'}
                {currentLanguage === 'po' && 'Polski'}
                {currentLanguage === 'cs' && 'Čeština'}
                {currentLanguage === 'hu' && 'Magyar'}
                {currentLanguage === 'ro' && 'Română'}
            </span>
        </div>
    );
}


// EmailJS configuration
const EMAILJS_CONFIG = {
    PUBLIC_KEY: 'P3PuniT17ZAZSNxyc', // Replace with your EmailJS public key
    SERVICE_ID: 'service_kya9p0n', // Replace with your EmailJS service ID
    TEMPLATE_ID: 'template_364vuti' // Replace with your EmailJS template ID
};

// Email service using EmailJS
const sendEmail = async (formData) => {
    // In a real implementation, you would load EmailJS from CDN
    // For demo purposes, we'll simulate the email sending

    const emailData = {
        email: 'taxidgtrogir@outlook.com', // Your business email
        from_name: `${formData.email}`,
        from_email: formData.email,
        subject: `New Taxi Booking - ${formData.startLocation} to ${formData.destination}`,
        message: `
New taxi booking request:

From: ${formData.startLocation}
To: ${formData.destination}
Date: ${formData.date}
Time: ${formData.time}
Passengers: ${formData.passengers}
Phone: ${formData.phone}
Email: ${formData.email}

Please contact the customer to confirm the booking.
        `,
        // Additional template variables
        pickup_location: formData.startLocation,
        destination: formData.destination,
        booking_date: formData.date,
        booking_time: formData.time,
        passenger_count: formData.passengers,
        customer_phone: formData.phone,
        customer_email: formData.email,
    };

    // Simulate API call - replace with actual EmailJS implementation
    // return new Promise((resolve, reject) => {
    //     setTimeout(() => {
    //         // Simulate success/failure
    //         if (Math.random() > 0.1) { // 90% success rate for demo
    //             resolve({ status: 200, text: 'Email sent successfully' });
    //         } else {
    //             reject(new Error('Failed to send email'));
    //         }
    //     }, 2000);
    // });

    return emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        emailData,
        EMAILJS_CONFIG.PUBLIC_KEY
    );

};


const CroatianTaxiSite = () => {
    const { t } = useTranslation();
    const isMobile = useMediaQuery({ query:'(max-width: 768px)'});
    const [formData, setFormData] = useState({
        startLocation: '',
        destination: '',
        date: '',
        time: '',
        passengers: '1',
        phone: '',
        email: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState('');

    const whatsappNumber = "385993230277";

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const validateForm = () => {
        const { startLocation, destination, date, time, phone, email } = formData;

        if (!startLocation.trim() || !destination.trim() || !date || !time || !phone.trim() || !email.trim()) {
            return false;
        }

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return false;
        }

        // Basic phone validation (allow various formats)
        const phoneRegex = /^[\+]?[\d\s\-\(\)]{8,}$/;
        if (!phoneRegex.test(phone.replace(/\s/g, ''))) {
            return false;
        }

        return true;
    };

    const handleSubmit = async () => {
        if (!validateForm()) {
            setSubmitStatus('error');
            setTimeout(() => setSubmitStatus(''), 5000);
            return;
        }

        setIsSubmitting(true);
        setSubmitStatus('');

        try {
            debugger
            await sendEmail(formData);


            setSubmitStatus('success');
            setFormData({
                startLocation: '',
                destination: '',
                date: '',
                time: '',
                passengers: '1',
                phone: '',
                email: ''
            });
        } catch (error) {
            console.error('Error sending email:', error);
            setSubmitStatus('emailError');
        }

        setIsSubmitting(false);
        setTimeout(() => setSubmitStatus(''), 5000);
    };

    const openWhatsApp = () => {
        window.open(`https://wa.me/${whatsappNumber}`, '_blank');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
            {/* Navigation */}
            <nav className="bg-gray-800 bg-opacity-80 backdrop-blur shadow-lg sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 pl-0 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center space-x-2">
                            <Image src={companyLogo} alt="company logo" className="h-16 w-24"  />
                        </div>
                        <div className="flex items-center space-x-4">
                            <LanguageSwitcher />

                        </div>
                    </div>
                </div>
            </nav>
            <nav
                onClick={openWhatsApp}
                className="bg-green-500 hover:bg-green-600 text-white bg-opacity-80 backdrop-blur shadow-lg sticky flex justify-center cursor-pointer p-4 top-16 z-50" >
                <MessageCircle className="h-6 w-5 mr-3" />
                <span className="font-medium ">WhatsApp: {t('callUs')}</span>
            </nav>


            {/* Hero Section with Reservation Form */}
            <section className="relative py-20 px-4 sm:px-6 lg:px-8">
                <Image style={{
                    position: 'absolute',
                    top: '0',
                    left: '0',
                    zIndex: '0',
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                }} src={isMobile ? trogirMobile : trogir} alt={"Trogir"}/>
                <div className="max-w-7xl mx-auto relative z-1">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-8">
                            <div className="space-y-4">
                                <h1 className="text-5xl lg:text-6xl font-bold text-gray-800 leading-tight">

                                    <span className="block">{t('h1_main')}</span>
                                    <span className="text-blue-600 block">{t('h1_highlight')}</span>
                                </h1>
                                <p className="text-xl text-black leading-relaxed">
                                    {t('heroSubtitle')}
                                </p>
                            </div>

                            <div className="flex flex-wrap gap-4">
                                <div className="flex items-center space-x-2 bg-white bg-opacity-70 px-4 py-2 rounded-full">
                                    <Shield className="h-5 w-5 text-green-500" />
                                    <span className="text-sm font-medium text-gray-600">{t('insuredLicensed')}</span>
                                </div>
                                <div className="flex items-center space-x-2 bg-white bg-opacity-70 px-4 py-2 rounded-full">
                                    <Star className="h-5 w-5 text-yellow-500" />
                                    <span className="text-sm font-medium text-gray-600">{t('fiveStarService')}</span>
                                </div>
                                <div className="flex items-center space-x-2 bg-white bg-opacity-70 px-4 py-2 rounded-full">
                                    <Award className="h-5 w-5 text-blue-500" />
                                    <span className="text-sm font-medium text-gray-600">{t('professionalDrivers')}</span>
                                </div>
                            </div>

                            <div className="bg-gradient-to-r from-amber-100 to-orange-100 p-4 rounded-lg border-l-4 border-amber-500">
                                <p className="text-amber-800 font-semibold flex items-center">
                                    <Award className="h-5 w-5 mr-2" />
                                    {t('experienceSince')}
                                </p>
                            </div>
                        </div>

                        {/* Right Side - Reservation Form */}
                        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-white/20 booking-form">
                            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                                {t('bookYourRide')}
                            </h2>

                            <div className="space-y-6">
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                                            <MapPin className="h-4 w-4 text-blue-500" />
                                            <span>{t('from')}</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="startLocation"
                                            value={formData.startLocation}
                                            onChange={handleInputChange}
                                            placeholder={t('pickupLocation')}
                                            required
                                            className="w-full px-4 py-3 border border-gray-400 text-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                                            <MapPin className="h-4 w-4 text-red-500" />
                                            <span>{t('to')}</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="destination"
                                            value={formData.destination}
                                            onChange={handleInputChange}
                                            placeholder={t('destination')}
                                            required
                                            className="w-full px-4 py-3 border border-gray-400 text-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                        />
                                    </div>
                                </div>

                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                                            <Calendar className="h-4 w-4 text-green-500" />
                                            <span>{t('date')}</span>
                                        </label>
                                        <input
                                            type="date"
                                            name="date"
                                            value={formData.date}
                                            onChange={handleInputChange}
                                            min={new Date().toISOString().split('T')[0]}
                                            required
                                            className="w-full px-4 py-3 border border-gray-400 text-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                                            <Clock className="h-4 w-4 text-purple-500" />
                                            <span>{t('time')}</span>
                                        </label>
                                        <input
                                            type="time"
                                            name="time"
                                            value={formData.time}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 border border-gray-400 text-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                                        <Users className="h-4 w-4 text-orange-500" />
                                        <span>{t('passengers')}</span>
                                    </label>
                                    <select
                                        name="passengers"
                                        value={formData.passengers}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-gray-400 text-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                    >
                                        {[1,2,3,4,5,6,7,8].map(num => (
                                            <option key={num} value={num}>{num} {num === 1 ? t('person') : t('people')}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                                            <Phone className="h-4 w-4 text-green-500" />
                                            <span>{t('phone')}</span>
                                        </label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            placeholder="+385 XX XXX XXX"
                                            required
                                            className="w-full px-4 py-3 border border-gray-400 text-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                                            <Mail className="h-4 w-4 text-blue-500" />
                                            <span>{t('email')}</span>
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            placeholder="your@email.com"
                                            required
                                            className="w-full px-4 py-3 border border-gray-400 text-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                        />
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    onClick={handleSubmit}
                                    disabled={isSubmitting}
                                    className="w-full cursor-pointer bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:transform-none"
                                >
                                    {isSubmitting ? t('booking') : t('bookRide')}
                                </button>

                                {submitStatus === 'success' && (
                                    <div className="text-green-600 text-center font-medium bg-green-50 p-3 rounded-lg">
                                        {t('bookingSuccess')}
                                    </div>
                                )}

                                {submitStatus === 'error' && (
                                    <div className="text-red-600 text-center font-medium bg-red-50 p-3 rounded-lg">
                                        {t('bookingError')}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section className="py-20 bg-white/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-800 mb-4">
                            {t('discoverDestinations')}
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            {t('discoverSubtitle')}
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="text-center p-6 bg-white/70 rounded-xl shadow-lg">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <MapPin className="h-8 w-8 text-blue-600" />
                            </div>
                            <h3 className="text-xl font-semibold mb-3 text-gray-600">{t('cityTours')}</h3>
                            <p className="text-gray-600">
                                {t('cityToursDesc')}
                            </p>
                        </div>

                        <div className="text-center p-6 bg-white/70 rounded-xl shadow-lg">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Car className="h-8 w-8 text-green-600" />
                            </div>
                            <h3 className="text-xl font-semibold mb-3 text-gray-600">{t('airportTransfers')}</h3>
                            <p className="text-gray-600">
                                {t('airportTransfersDesc')}
                            </p>
                        </div>

                        <div className="text-center p-6 bg-white/70 rounded-xl shadow-lg">
                            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Star className="h-8 w-8 text-purple-600" />
                            </div>
                            <h3 className="text-xl font-semibold mb-3 text-gray-600">{t('specialEvents')}</h3>
                            <p className="text-gray-600">
                                {t('specialEventsDesc')}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-4xl font-bold text-gray-800 mb-6">
                                {t('whyChooseUs')}
                            </h2>
                            <div className="space-y-6">
                                <div className="flex items-start space-x-4">
                                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                                        <Clock className="h-5 w-5 text-blue-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold mb-2 text-gray-600">{t('availability247')}</h3>
                                        <p className="text-gray-600">{t('availability247Desc')}</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                                        <Shield className="h-5 w-5 text-green-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold mb-2 text-gray-600">{t('safeInsured')}</h3>
                                        <p className="text-gray-600">{t('safeInsuredDesc')}</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                                        <Award className="h-5 w-5 text-purple-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold mb-2 text-gray-600">{t('competitiveRates')}</h3>
                                        <p className="text-gray-600">{t('competitiveRatesDesc')}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-8 rounded-2xl text-white">
                            <h3 className="text-2xl font-bold mb-4">{t('bookNowSave')}</h3>
                            <p className="text-blue-100 mb-6">
                                {t('ctaDescription')}
                            </p>
                            <button
                                onClick={() => {
                                    const bookingSection = document.querySelector('.booking-form');
                                    if (bookingSection) {
                                        bookingSection.scrollIntoView({ behavior: 'smooth' });
                                    }
                                }}
                                className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
                            >
                                {t('bookNowButton')}
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-800 text-white py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-3 gap-8">
                        <div>
                            <div className="flex items-center space-x-2 max-sm:justify-center">
                                <Image src={companyLogo} alt="D&G Taxi Trogir company logo" className="h-24 w-54 max-sm:h-54 max-sm:w-3/5"  />
                            </div>
                            <p className="text-gray-300 mb-4">
                                {t('footerTagline')}
                            </p>
                            <button
                                onClick={openWhatsApp}
                                className="flex items-center space-x-2 bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg transition-colors duration-200"
                            >
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
                                <div className="flex items-center space-x-2">
                                    <Phone className="h-4 w-4" />
                                    <span>{t('callUs')}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Mail className="h-4 w-4" />
                                    <span>taxidgtrogir@outlook.com</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <MapPin className="h-4 w-4" />
                                    <span>Trogir, Croatia</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
                        <p>&copy; 2025 {t('companyName')}. {t('allRightsReserved')}</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

const App = () => {
    return (
        <TranslationProvider>
            <CroatianTaxiSite />
        </TranslationProvider>
    );
};

export default App;