"use client";
import React, { useState, createContext, useContext } from 'react';
import Link from 'next/link';
import { Star, ChevronLeft } from 'lucide-react';
import emailjs from 'emailjs-com';

// You'll need to make your TranslationProvider and hooks accessible globally,
// perhaps in your main layout. For now, we'll redefine it here for simplicity.
import { translations } from '../../components/Translations/translations_index.js';

const TranslationContext = createContext();
const useTranslation = () => useContext(TranslationContext);

const TranslationProvider = ({ children }) => {
    const [currentLanguage, setCurrentLanguage] = useState('en');
    const t = (key) => translations[currentLanguage]?.[key] || key;
    const switchLanguage = (lang) => setCurrentLanguage(lang); // This won't sync with the homepage language state without a global provider

    return (
        <TranslationContext.Provider value={{ t, currentLanguage, switchLanguage }}>
            {children}
        </TranslationContext.Provider>
    );
};

// --- EMAILJS CONFIG ---
const EMAILJS_CONFIG = {
    PUBLIC_KEY: 'P3PuniT17ZAZSNxyc',
    SERVICE_ID: 'service_kya9p0n',
    REVIEW_TEMPLATE_ID: 'template_zsbfuiz' // IMPORTANT: Use the same new template ID
};

const AddReviewPage = () => {
    const { t } = useTranslation();
    const [formData, setFormData] = useState({ name: '', email: '', rating: 5, review: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleRatingChange = (newRating) => {
        setFormData(prev => ({ ...prev, rating: newRating }));
    };

    const handleSubmit = async () => {
        if (!formData.name || !formData.email || !formData.review) {
            setSubmitStatus('error');
            setTimeout(() => setSubmitStatus(''), 5000);
            return;
        }
        setIsSubmitting(true);
        try {
            await emailjs.send(
                EMAILJS_CONFIG.SERVICE_ID,
                EMAILJS_CONFIG.REVIEW_TEMPLATE_ID,
                {
                    email: 'taxidgtrogir@outlook.com',
                    from_name: formData.name,
                    from_email: formData.email,
                    rating: formData.rating,
                    review_message: formData.review,
                },
                EMAILJS_CONFIG.PUBLIC_KEY
            );
            setSubmitStatus('success');
            setFormData({ name: '', email: '', rating: 5, review: '' });
        } catch (error) {
            console.error('Error sending review:', error);
            setSubmitStatus('error');
        }
        setIsSubmitting(false);
        setTimeout(() => setSubmitStatus(''), 5000);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">
                <Link href="/" className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 mb-8 font-medium">
                    <ChevronLeft className="h-5 w-5" />
                    <span>{t('backToHome')}</span>
                </Link>
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-white/20">
                    <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">{t('writeAReview')}</h1>
                    <div className="space-y-6">
                        <div className="grid sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">{t('yourName')}</label>
                                <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">{t('yourEmail')}</label>
                                <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">{t('rating')}</label>
                            <div className="flex space-x-1">
                                {[1, 2, 3, 4, 5].map(star => (
                                    <Star key={star} onClick={() => handleRatingChange(star)} className={`h-8 w-8 cursor-pointer transition-colors ${formData.rating >= star ? 'text-yellow-500 fill-current' : 'text-gray-300'}`} />
                                ))}
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">{t('review')}</label>
                            <textarea name="review" value={formData.review} onChange={handleInputChange} rows="5" className="w-full px-4 py-3 border border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500"></textarea>
                        </div>
                        <button onClick={handleSubmit} disabled={isSubmitting} className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-4 rounded-lg disabled:opacity-50">
                            {isSubmitting ? t('submitting') : t('submitReview')}
                        </button>
                        {submitStatus === 'success' && <div className="text-green-600 text-center bg-green-50 p-3 rounded-lg">{t('reviewSuccess')}</div>}
                        {submitStatus === 'error' && <div className="text-red-600 text-center bg-red-50 p-3 rounded-lg">{t('reviewError')}</div>}
                    </div>
                </div>
            </div>
        </div>
    );
};


// The final component exported should be wrapped in the provider
export default function AddReviewPageWrapper() {
    return (
        <TranslationProvider>
            <AddReviewPage />
        </TranslationProvider>
    )
}
