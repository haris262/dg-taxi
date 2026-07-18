"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { Star, ChevronLeft } from 'lucide-react';
import emailjs from 'emailjs-com';
// Use the shared, language-synced translation provider from the global layout.
import { useTranslation } from '../../../components/Layout/GlobalLayout';

// --- EMAILJS CONFIG ---
const EMAILJS_CONFIG = {
    PUBLIC_KEY: 'P3PuniT17ZAZSNxyc',
    SERVICE_ID: 'service_kya9p0n',
    REVIEW_TEMPLATE_ID: 'template_zsbfuiz' // IMPORTANT: Use the same new template ID
};

export default function AddReviewPage() {
    const { t, currentLanguage } = useTranslation();
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
        <div className="bg-cream section min-h-[70vh]">
            <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
                <Link href={`/${currentLanguage}`} className="inline-flex items-center gap-2 text-muted hover:text-gold transition-colors mb-8 text-sm font-medium">
                    <ChevronLeft className="h-4 w-4" />
                    <span>{t('backToHome')}</span>
                </Link>

                <div className="card !rounded-2xl relative p-6 sm:p-10">
                    <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
                    <div className="text-center mb-8">
                        <span className="eyebrow is-centered justify-center">{t('eyebrowReviews')}</span>
                        <h1 className="mt-3 font-display text-3xl sm:text-4xl">{t('writeAReview')}</h1>
                    </div>

                    <div className="space-y-5">
                        <div className="grid sm:grid-cols-2 gap-4">
                            <div>
                                <label className="field-label">{t('yourName')}</label>
                                <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="field" />
                            </div>
                            <div>
                                <label className="field-label">{t('yourEmail')}</label>
                                <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="field" />
                            </div>
                        </div>

                        <div>
                            <label className="field-label">{t('rating')}</label>
                            <div className="flex gap-1.5">
                                {[1, 2, 3, 4, 5].map(star => (
                                    <button
                                        type="button"
                                        key={star}
                                        onClick={() => handleRatingChange(star)}
                                        aria-label={`${star} star${star > 1 ? 's' : ''}`}
                                        className="transition-transform hover:scale-110"
                                    >
                                        <Star className={`h-8 w-8 cursor-pointer transition-colors ${formData.rating >= star ? 'text-gold fill-current' : 'text-gray-300'}`} />
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="field-label">{t('review')}</label>
                            <textarea name="review" value={formData.review} onChange={handleInputChange} rows="5" className="field resize-none"></textarea>
                        </div>

                        <button onClick={handleSubmit} disabled={isSubmitting} className="btn btn-gold w-full !py-4">
                            {isSubmitting ? t('submitting') : t('submitReview')}
                        </button>

                        {submitStatus === 'success' && <div className="text-green-700 text-center bg-green-50 border border-green-200 p-3 rounded-lg text-sm">{t('reviewSuccess')}</div>}
                        {submitStatus === 'error' && <div className="text-red-700 text-center bg-red-50 border border-red-200 p-3 rounded-lg text-sm">{t('reviewError')}</div>}
                    </div>
                </div>
            </div>
        </div>
    );
}
