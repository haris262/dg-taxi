"use client";
import React, { useState, useContext, useEffect } from 'react';
import Link from 'next/link';
import {
    Phone, Mail, MapPin, Clock, Users, Calendar,
    Car, Star, Shield, Award, ChevronLeft, ChevronRight, UserCircle
} from 'lucide-react';
import Image from 'next/image';
import emailjs from 'emailjs-com';
import trogir from '../../public/assets/trogir5.webp';
import trogirMobile from '../../public/assets/trogir_mobile3.webp';
import { useMediaQuery } from 'react-responsive';
import { useTranslation } from '../Layout/GlobalLayout'; // Import hook from the new layout file

// --- EMAILJS CONFIG ---
const EMAILJS_CONFIG = {
    PUBLIC_KEY: 'P3PuniT17ZAZSNxyc',
    SERVICE_ID: 'service_kya9p0n',
    BOOKING_TEMPLATE_ID: 'template_364vuti',
};
const mockReviews = [
    { name: "Anna K.", rating: 5, review: "Fantastic service! The driver was punctual, professional, and the car was spotless. Made our airport transfer from Split completely stress-free." },
    { name: "Mark T.", rating: 5, review: "Used D&G Taxi for a tour to Krka National Park. It was an amazing experience. Our driver was also a great guide. Highly recommended!" },
    { name: "Sophie L.", rating: 5, review: "Reliable and friendly. We booked a last-minute trip from Trogir to Dubrovnik, and they were incredibly accommodating. Fair price and excellent service." },
    { name: "Luka M.", rating: 4, review: "Great ride to Zadar airport, smooth and timely. Would definitely book again next time we visit Croatia." },
    { name: "Olga R.", rating: 5, review: "Very friendly driver, clean car. Helped us with all our luggage and even provided bottled water." },
    { name: "Petra S.", rating: 5, review: "The best taxi service we used during our holiday! Very organized and quick responses when booking." },
    { name: "Ivan P.", rating: 4, review: "Decent experience, driver arrived slightly late due to traffic but was very apologetic and made up for it with excellent service." },
    { name: "Maja D.", rating: 5, review: "We used this service twice, both times drivers were early, polite, and drove safely. Highly recommend for both city rides and long transfers." },
    { name: "Marko B.", rating: 5, review: "Great company, responsive over WhatsApp and very clear instructions for airport pickup." },
    { name: "Iva T.", rating: 5, review: "Perfect airport pickup. They tracked our delayed flight and still managed to pick us up right on time without any extra charge." },
    { name: "Tomislav N.", rating: 5, review: "Driver was on time, friendly, and gave us great restaurant tips in Split. Will book again." },
    { name: "Ana V.", rating: 4, review: "Ride was fine but a little pricey for a short trip. Service quality was excellent though." },
    { name: "Sara Z.", rating: 5, review: "Everything was flawless from booking to drop-off. One of the smoothest transport experiences I’ve had while traveling." },
    { name: "Dario K.", rating: 5, review: "Very professional drivers, super clean cars, and really flexible with our itinerary changes." },
    { name: "Lucija F.", rating: 4, review: "Nice service, clean vehicle, but the car was a bit warm at first until the AC kicked in properly." },
    { name: "Filip J.", rating: 5, review: "Driver was very friendly and told us about cool hidden beaches we would have never found ourselves!" },
    { name: "Marija G.", rating: 5, review: "We booked a full-day tour to Plitvice Lakes. The vehicle was spacious, the driver was great, and the whole trip was very comfortable." },
    { name: "Petar H.", rating: 5, review: "Excellent experience! Communication via email was fast, driver was on time, car was modern and clean." },
    { name: "Eva I.", rating: 4, review: "Good experience overall but the driver played loud music without asking. They turned it down immediately when we asked." },
    { name: "Nikola V.", rating: 5, review: "Very professional and efficient. The driver helped us with our bags and provided a booster seat for our toddler without any additional cost." },
    { name: "Tina B.", rating: 5, review: "We were picked up from Dubrovnik and driven to Split in a very comfortable van. It was the easiest travel day of our trip." },
    { name: "Luka R.", rating: 5, review: "Smooth ride, polite driver, and fair prices. Booking online was quick and easy." },
    { name: "Jelena C.", rating: 4, review: "Good experience but the driver took a detour due to roadwork. Still got us to the destination on time." },
    { name: "Ante D.", rating: 5, review: "Wonderful service. They accommodated our late arrival and still managed to deliver top-class service." },
    { name: "Ivana O.", rating: 5, review: "Booked a large vehicle for a family trip. Everyone was comfortable and the driver was super patient with our many requests." },
    { name: "Miroslav U.", rating: 4, review: "Driver was friendly and professional but the car was a little older than expected." },
    { name: "Katarina L.", rating: 5, review: "Perfect from start to finish. The driver even made an unplanned stop for us to grab coffee." },
    { name: "Juraj M.", rating: 5, review: "Highly recommended! Fast booking, reliable service, and friendly staff." },
    { name: "Ana P.", rating: 4, review: "Ride was good but we were hoping for a slightly newer car for the price paid." },
    { name: "Bruno T.", rating: 5, review: "Amazing experience, we booked a 6-hour private trip to Krka and had a fantastic time." },
    { name: "Lucija N.", rating: 5, review: "If you need private transport in Croatia, this is the company to go with. Very smooth from start to end." },
    { name: "Dino K.", rating: 4, review: "Punctual service, friendly driver, though the WiFi in the vehicle wasn’t working." },
    { name: "Maja S.", rating: 5, review: "Clean vehicle, polite driver, good price. Everything you need for a stress-free trip." },
    { name: "Petar Ž.", rating: 5, review: "Quick replies, flexible pickup times, and super professional service." },
    { name: "Sara D.", rating: 4, review: "Great ride but it would have been nice to have complimentary water bottles in the car." },
    { name: "Luka Š.", rating: 5, review: "Flawless airport transfer service. No stress, no hassle, exactly what we needed after a long flight." },
    { name: "Ivana V.", rating: 5, review: "Excellent value for money, professional drivers, and modern cars." },
    { name: "Marko G.", rating: 4, review: "Good ride, minor delay due to traffic, but the driver handled it professionally." },
    { name: "Ana Š.", rating: 5, review: "Really helpful service! Our driver spoke excellent English and gave us tips on local attractions." },
    { name: "Dario P.", rating: 5, review: "One of the best transport experiences we've had while traveling abroad. Very professional." },
    { name: "Marina R.", rating: 4, review: "Overall good, but next time we’ll probably request a premium car upgrade." },
    { name: "Filip K.", rating: 5, review: "Everything was perfect, from booking to drop-off. A real example of how transfer services should be run." },
    { name: "Maja Ž.", rating: 5, review: "The easiest booking experience I’ve had while on holiday, highly recommended." },
    { name: "Ivan N.", rating: 4, review: "Good driver, car was a bit basic but very clean and safe." },
    { name: "Lucija Č.", rating: 5, review: "Perfect ride, quick and easy communication. Would book again for sure." },
    { name: "Dino B.", rating: 5, review: "Fantastic service. Made our last day in Split so much easier with the hotel-to-airport ride." },
    { name: "Sara Ć.", rating: 4, review: "Service was great but the driver arrived 5 minutes late, though we still made it on time." },
    { name: "Ante Ž.", rating: 5, review: "Loved the service! Friendly driver, clean car, great value." },
    { name: "Ivana Š.", rating: 5, review: "Best transfer service in the area. Quick replies, fair prices, and professional drivers." },
    { name: "Marko Č.", rating: 4, review: "Overall good but the driver was quiet. We prefer more interaction, but no complaints on the service itself." },
    { name: "Marija Đ.", rating: 5, review: "Absolutely incredible service. From booking to arrival, everything was seamless and stress-free. Would recommend to anyone visiting Croatia!" },
];

// --- REVIEW SLIDER COMPONENT ---
const ReviewSlider = () => {
    const { t } = useTranslation();
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => setCurrentIndex(prev => (prev + 1) % mockReviews.length);
    const prevSlide = () => setCurrentIndex(prev => (prev - 1 + mockReviews.length) % mockReviews.length);

    useEffect(() => {
        const timer = setInterval(nextSlide, 5000); // Auto-scroll every 5 seconds
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="py-20 bg-white/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-800 mb-4">{t('whatOurClientsSay')}</h2>
                </div>
                <div className="relative">
                    <div className="overflow-hidden relative h-64">
                        {mockReviews.map((review, index) => (
                            <div key={index} className={`absolute w-full transition-opacity duration-500 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}>
                                <div className="bg-white/70 rounded-xl shadow-lg p-8 max-w-3xl mx-auto flex items-start space-x-6">
                                    {review.image ? (
                                        <Image src={review.image} alt={review.name} width={80} height={80} className="rounded-full border-4 border-blue-200" />
                                    ) : (
                                        <div className="flex-shrink-0 w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
                                            <UserCircle className="h-12 w-12 text-blue-500" />
                                        </div>
                                    )}
                                    <div className="flex-grow">
                                        <div className="flex items-center mb-2">
                                            {[...Array(review.rating)].map((_, i) => <Star key={i} className="h-5 w-5 text-yellow-500 fill-current" />)}
                                        </div>
                                        <p className="text-gray-600 italic mb-4">"{review.review}"</p>
                                        <p className="font-semibold text-gray-800">- {review.name}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button onClick={prevSlide} className="absolute top-1/2 left-0 sm:-left-4 sm:top-24 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md transition">
                        <ChevronLeft className="h-6 w-6 text-gray-700" />
                    </button>
                    <button onClick={nextSlide} className="absolute top-1/2 right-0 sm:-right-4 sm:top-24 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md transition">
                        <ChevronRight className="h-6 w-6 text-gray-700" />
                    </button>
                </div>
                <div className="text-center mt-12">
                    <Link href="/add-review" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 inline-block">
                        {t('addYourReview')}
                    </Link>
                </div>
            </div>
        </section>
    );
};


// This is the main content for the home page.
const HomePageContent = () => {
    const { t } = useTranslation();
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
    const [formData, setFormData] = useState({
        startLocation: '', destination: '', date: '', time: '',
        passengers: '1', phone: '', email: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        if (!formData.startLocation || !formData.destination || !formData.date || !formData.time || !formData.phone || !formData.email) {
            setSubmitStatus('error');
            setTimeout(() => setSubmitStatus(''), 5000);
            return;
        }
        setIsSubmitting(true);
        try {
            await emailjs.send(
                EMAILJS_CONFIG.SERVICE_ID,
                EMAILJS_CONFIG.BOOKING_TEMPLATE_ID,
                {
                    from_name: formData.email,
                    from_email: formData.email,
                    pickup_location: formData.startLocation,
                    destination: formData.destination,
                    booking_date: formData.date,
                    booking_time: formData.time,
                    passenger_count: formData.passengers,
                    customer_phone: formData.phone,
                    customer_email: formData.email,
                },
                EMAILJS_CONFIG.PUBLIC_KEY
            );
            setSubmitStatus('success');
            setFormData({
                startLocation: '', destination: '', date: '', time: '',
                passengers: '1', phone: '', email: ''
            });
        } catch (error) {
            console.error('Error sending email:', error);
            setSubmitStatus('emailError');
        }
        setIsSubmitting(false);
        setTimeout(() => setSubmitStatus(''), 5000);
    };

    return (
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50">
            {/* Hero Section with Reservation Form */}
            <section className="relative py-20 px-4 sm:px-6 lg:px-8">
                <Image
                    style={{ position: 'absolute', top: 0, left: 0, zIndex: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                    src={isMobile ? trogirMobile : trogir}
                    alt={"Trogir"}
                    priority
                />
                <div className="max-w-7xl mx-auto relative z-1">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-8">
                            <div className="space-y-4">
                                <h1 className="text-5xl lg:text-6xl font-bold text-gray-800 leading-tight">
                                    <span className="block">{t('h1_main')}</span>
                                    <span className="text-blue-600 block">{t('h1_highlight')}</span>
                                </h1>
                                <p className="text-xl text-black leading-relaxed">{t('heroSubtitle')}</p>
                            </div>
                            <div className="flex flex-wrap gap-4">
                                <div className="flex items-center space-x-2 bg-white bg-opacity-70 px-4 py-2 rounded-full"><Shield className="h-5 w-5 text-green-500" /> <span className="text-sm font-medium text-gray-600">{t('insuredLicensed')}</span></div>
                                <div className="flex items-center space-x-2 bg-white bg-opacity-70 px-4 py-2 rounded-full"><Star className="h-5 w-5 text-yellow-500" /> <span className="text-sm font-medium text-gray-600">{t('fiveStarService')}</span></div>
                                <div className="flex items-center space-x-2 bg-white bg-opacity-70 px-4 py-2 rounded-full"><Award className="h-5 w-5 text-blue-500" /> <span className="text-sm font-medium text-gray-600">{t('professionalDrivers')}</span></div>
                            </div>
                            <div className="bg-gradient-to-r from-amber-100 to-orange-100 p-4 rounded-lg border-l-4 border-amber-500">
                                <p className="text-amber-800 font-semibold flex items-center"><Award className="h-5 w-5 mr-2" />{t('experienceSince')}</p>
                            </div>
                        </div>

                        {/* Reservation Form */}
                        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-white/20 booking-form">
                            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">{t('bookYourRide')}</h2>
                            <div className="space-y-6">
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="flex items-center space-x-2 text-sm font-medium text-gray-700"><MapPin className="h-4 w-4 text-blue-500" /><span>{t('from')}</span></label>
                                        <input type="text" name="startLocation" value={formData.startLocation} onChange={handleInputChange} placeholder={t('pickupLocation')} required className="w-full px-4 py-3 border border-gray-400 text-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="flex items-center space-x-2 text-sm font-medium text-gray-700"><MapPin className="h-4 w-4 text-red-500" /><span>{t('to')}</span></label>
                                        <input type="text" name="destination" value={formData.destination} onChange={handleInputChange} placeholder={t('destination')} required className="w-full px-4 py-3 border border-gray-400 text-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500" />
                                    </div>
                                </div>
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="flex items-center space-x-2 text-sm font-medium text-gray-700"><Calendar className="h-4 w-4 text-green-500" /><span>{t('date')}</span></label>
                                        <input type="date" name="date" value={formData.date} onChange={handleInputChange} min={new Date().toISOString().split('T')[0]} required className="w-full px-4 py-3 border border-gray-400 text-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="flex items-center space-x-2 text-sm font-medium text-gray-700"><Clock className="h-4 w-4 text-purple-500" /><span>{t('time')}</span></label>
                                        <input type="time" name="time" value={formData.time} onChange={handleInputChange} required className="w-full px-4 py-3 border border-gray-400 text-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="flex items-center space-x-2 text-sm font-medium text-gray-700"><Users className="h-4 w-4 text-orange-500" /><span>{t('passengers')}</span></label>
                                    <select name="passengers" value={formData.passengers} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-400 text-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500">
                                        {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (<option key={num} value={num}>{num} {num === 1 ? t('person') : t('people')}</option>))}
                                    </select>
                                </div>
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="flex items-center space-x-2 text-sm font-medium text-gray-700"><Phone className="h-4 w-4 text-green-500" /><span>{t('phone')}</span></label>
                                        <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="+385 XX XXX XXX" required className="w-full px-4 py-3 border border-gray-400 text-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="flex items-center space-x-2 text-sm font-medium text-gray-700"><Mail className="h-4 w-4 text-blue-500" /><span>{t('email')}</span></label>
                                        <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="your@email.com" required className="w-full px-4 py-3 border border-gray-400 text-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500" />
                                    </div>
                                </div>
                                <button type="button" onClick={handleSubmit} disabled={isSubmitting} className="w-full cursor-pointer bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:transform-none">
                                    {isSubmitting ? t('booking') : t('bookRide')}
                                </button>
                                {submitStatus === 'success' && <div className="text-green-600 text-center font-medium bg-green-50 p-3 rounded-lg">{t('bookingSuccess')}</div>}
                                {submitStatus === 'error' && <div className="text-red-600 text-center font-medium bg-red-50 p-3 rounded-lg">{t('bookingError')}</div>}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section className="py-20 bg-white/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-800 mb-4">{t('discoverDestinations')}</h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t('discoverSubtitle')}</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="text-center p-6 bg-white/70 rounded-xl shadow-lg">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4"><MapPin className="h-8 w-8 text-blue-600" /></div>
                            <h3 className="text-xl font-semibold mb-3 text-gray-600">{t('cityTours')}</h3>
                            <p className="text-gray-600">{t('cityToursDesc')}</p>
                        </div>
                        <div className="text-center p-6 bg-white/70 rounded-xl shadow-lg">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"><Car className="h-8 w-8 text-green-600" /></div>
                            <h3 className="text-xl font-semibold mb-3 text-gray-600">{t('airportTransfers')}</h3>
                            <p className="text-gray-600">{t('airportTransfersDesc')}</p>
                        </div>
                        <div className="text-center p-6 bg-white/70 rounded-xl shadow-lg">
                            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4"><Star className="h-8 w-8 text-purple-600" /></div>
                            <h3 className="text-xl font-semibold mb-3 text-gray-600">{t('specialEvents')}</h3>
                            <p className="text-gray-600">{t('specialEventsDesc')}</p>
                        </div>
                    </div>
                </div>
            </section>

            <ReviewSlider />

            {/* Features Section */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-4xl font-bold text-gray-800 mb-6">{t('whyChooseUs')}</h2>
                            <div className="space-y-6">
                                <div className="flex items-start space-x-4">
                                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0"><Clock className="h-5 w-5 text-blue-600" /></div>
                                    <div>
                                        <h3 className="text-lg font-semibold mb-2 text-gray-600">{t('availability247')}</h3>
                                        <p className="text-gray-600">{t('availability247Desc')}</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-4">
                                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0"><Shield className="h-5 w-5 text-green-600" /></div>
                                    <div>
                                        <h3 className="text-lg font-semibold mb-2 text-gray-600">{t('safeInsured')}</h3>
                                        <p className="text-gray-600">{t('safeInsuredDesc')}</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-4">
                                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0"><Award className="h-5 w-5 text-purple-600" /></div>
                                    <div>
                                        <h3 className="text-lg font-semibold mb-2 text-gray-600">{t('competitiveRates')}</h3>
                                        <p className="text-gray-600">{t('competitiveRatesDesc')}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-8 rounded-2xl text-white">
                            <h3 className="text-2xl font-bold mb-4">{t('bookNowSave')}</h3>
                            <p className="text-blue-100 mb-6">{t('ctaDescription')}</p>
                            <button onClick={() => document.querySelector('.booking-form')?.scrollIntoView({ behavior: 'smooth' })} className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors duration-200 cursor-pointer">
                                {t('bookNowButton')}
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePageContent;
