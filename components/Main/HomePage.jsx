"use client";
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
    Phone, Mail, MapPin, Clock, Users, Calendar,
    Car, Star, Shield, Award, ChevronLeft, ChevronRight, UserCircle,
    Plane, Landmark, Gem, Quote, CheckCircle2, Send, ArrowRight
} from 'lucide-react';
import Image from 'next/image';
import emailjs from 'emailjs-com';
import trogir from '../../public/assets/trogir5.webp';
import trogirMobile from '../../public/assets/trogir_mobile3.webp';
import trogir1 from '../../public/assets/trogir1.jpg';
import trogir2 from '../../public/assets/trogir2.jpg';
import trogir3 from '../../public/assets/trogir3.jpg';
import trogir4 from '../../public/assets/trogir4.webp';
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

// --- Scroll-reveal wrapper (progressive enhancement) ---
const Reveal = ({ children, className = '', delay = 0 }) => {
    const ref = useRef(null);
    const [shown, setShown] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        if (typeof IntersectionObserver === 'undefined') { setShown(true); return; }
        const io = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) { setShown(true); io.unobserve(entry.target); }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
        io.observe(el);
        return () => io.disconnect();
    }, []);

    return (
        <div
            ref={ref}
            style={delay ? { transitionDelay: `${delay}ms` } : undefined}
            className={`reveal ${shown ? 'is-in' : ''} ${className}`}
        >
            {children}
        </div>
    );
};

// --- REVIEW SLIDER COMPONENT ---
const ReviewSlider = () => {
    const { t, currentLanguage } = useTranslation();
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => setCurrentIndex(prev => (prev + 1) % mockReviews.length);
    const prevSlide = () => setCurrentIndex(prev => (prev - 1 + mockReviews.length) % mockReviews.length);

    useEffect(() => {
        const timer = setInterval(nextSlide, 6000); // Auto-scroll every 6 seconds
        return () => clearInterval(timer);
    }, []);

    const review = mockReviews[currentIndex];

    return (
        <section className="section bg-navy-texture text-white">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <Reveal className="text-center max-w-2xl mx-auto">
                    <span className="eyebrow eyebrow--light justify-center">{t('eyebrowReviews')}</span>
                    <h2 className="mt-4 font-display text-3xl sm:text-4xl text-white">{t('whatOurClientsSay')}</h2>
                </Reveal>

                <div className="relative mt-12">
                    <div className="rounded-2xl border border-gold/20 bg-white/[0.04] backdrop-blur-sm p-8 sm:p-12 text-center min-h-[280px] flex flex-col items-center justify-center">
                        <Quote className="h-9 w-9 text-gold/70 mb-5" />
                        <div key={currentIndex} className="animate-rise">
                            <div className="flex justify-center gap-1 mb-5">
                                {[...Array(review.rating)].map((_, i) => <Star key={i} className="h-5 w-5 text-gold fill-current" />)}
                            </div>
                            <p className="font-display text-xl sm:text-2xl leading-relaxed text-white/90 italic max-w-2xl mx-auto">“{review.review}”</p>
                            <p className="mt-6 text-sm font-semibold tracking-[0.15em] text-gold uppercase">{review.name}</p>
                        </div>
                    </div>

                    <div className="flex items-center justify-center gap-4 mt-8">
                        <button onClick={prevSlide} aria-label="Previous review" className="h-11 w-11 rounded-full border border-white/20 flex items-center justify-center text-white/80 hover:border-gold hover:text-gold transition-colors">
                            <ChevronLeft className="h-5 w-5" />
                        </button>
                        <span className="text-sm text-white/50 tabular-nums w-20 text-center">
                            {String(currentIndex + 1).padStart(2, '0')} / {mockReviews.length}
                        </span>
                        <button onClick={nextSlide} aria-label="Next review" className="h-11 w-11 rounded-full border border-white/20 flex items-center justify-center text-white/80 hover:border-gold hover:text-gold transition-colors">
                            <ChevronRight className="h-5 w-5" />
                        </button>
                    </div>
                </div>

                <div className="text-center mt-10">
                    <Link href={`/${currentLanguage}/add-review`} className="btn btn-outline">{t('addYourReview')}</Link>
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

    const services = [
        { icon: Landmark, title: t('cityTours'), desc: t('cityToursDesc') },
        { icon: Plane, title: t('airportTransfers'), desc: t('airportTransfersDesc') },
        { icon: Gem, title: t('specialEvents'), desc: t('specialEventsDesc') },
    ];

    const steps = [
        { icon: Send, title: t('step1Title'), desc: t('step1Desc') },
        { icon: CheckCircle2, title: t('step2Title'), desc: t('step2Desc') },
        { icon: Car, title: t('step3Title'), desc: t('step3Desc') },
    ];

    const features = [
        { icon: Clock, title: t('availability247'), desc: t('availability247Desc') },
        { icon: Shield, title: t('safeInsured'), desc: t('safeInsuredDesc') },
        { icon: Award, title: t('competitiveRates'), desc: t('competitiveRatesDesc') },
    ];

    const gallery = [
        { src: trogir3, label: t('galleryTrogirOldTown') },
        { src: trogir1, label: t('galleryRiva') },
        { src: trogir2, label: t('galleryHarbour') },
        { src: trogir4, label: t('galleryWaterfront') },
    ];

    const destinations = ['Split Airport', 'Split', 'Trogir', 'Zadar', 'Dubrovnik', 'Zagreb', 'Krka NP', 'Plitvice'];

    return (
        <div>
            {/* ============================ HERO ============================ */}
            <section id="top" className="relative isolate overflow-hidden">
                <div className="absolute inset-0 -z-10">
                    <Image
                        src={isMobile ? trogirMobile : trogir}
                        alt="Trogir waterfront on the Dalmatian coast, Croatia"
                        fill
                        sizes="100vw"
                        priority
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-navy-950/92 via-navy-900/82 to-navy-950/90" />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-navy-950/30" />
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-24">
                    <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                        {/* Copy */}
                        <div className="text-white">
                            <span className="eyebrow eyebrow--light animate-rise">{t('heroEyebrow')}</span>
                            <h1 className="mt-5 text-white font-display font-semibold text-4xl sm:text-5xl lg:text-[3.75rem] leading-[1.05] animate-rise delay-1">
                                <span className="block">{t('h1_main')}</span>
                                <span className="block text-gold">{t('h1_highlight')}</span>
                            </h1>
                            <p className="mt-6 text-lg text-white/80 max-w-xl leading-relaxed animate-rise delay-2">{t('heroSubtitle')}</p>

                            <div className="mt-7 flex flex-wrap gap-2.5 animate-rise delay-2">
                                <span className="badge"><Shield className="h-4 w-4 text-gold" />{t('insuredLicensed')}</span>
                                <span className="badge"><Star className="h-4 w-4 text-gold" />{t('fiveStarService')}</span>
                                <span className="badge"><Award className="h-4 w-4 text-gold" />{t('professionalDrivers')}</span>
                            </div>

                            <div className="mt-7 inline-flex items-center gap-3 rounded-full border border-gold/30 bg-white/5 px-5 py-2.5 backdrop-blur-sm animate-rise delay-3">
                                <Award className="h-5 w-5 text-gold" />
                                <span className="text-sm font-medium text-white/90">{t('experienceSince')}</span>
                            </div>
                        </div>

                        {/* Reservation form */}
                        <div id="booking" className="booking-form scroll-mt-32 card !rounded-2xl relative p-6 sm:p-8 animate-rise delay-2">
                            <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
                            <div className="text-center mb-6">
                                <h2 className="font-display text-2xl sm:text-3xl">{t('bookYourRide')}</h2>
                                <p className="text-sm text-muted mt-2">{t('noPaymentNote')}</p>
                            </div>
                            <div className="space-y-4">
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="field-label"><MapPin className="h-4 w-4 text-gold" /><span>{t('from')}</span></label>
                                        <input type="text" name="startLocation" value={formData.startLocation} onChange={handleInputChange} placeholder={t('pickupLocation')} required className="field" />
                                    </div>
                                    <div>
                                        <label className="field-label"><MapPin className="h-4 w-4 text-gold" /><span>{t('to')}</span></label>
                                        <input type="text" name="destination" value={formData.destination} onChange={handleInputChange} placeholder={t('destination')} required className="field" />
                                    </div>
                                </div>
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="field-label"><Calendar className="h-4 w-4 text-gold" /><span>{t('date')}</span></label>
                                        <input type="date" name="date" value={formData.date} onChange={handleInputChange} min={new Date().toISOString().split('T')[0]} required className="field" />
                                    </div>
                                    <div>
                                        <label className="field-label"><Clock className="h-4 w-4 text-gold" /><span>{t('time')}</span></label>
                                        <input type="time" name="time" value={formData.time} onChange={handleInputChange} required className="field" />
                                    </div>
                                </div>
                                <div>
                                    <label className="field-label"><Users className="h-4 w-4 text-gold" /><span>{t('passengers')}</span></label>
                                    <select name="passengers" value={formData.passengers} onChange={handleInputChange} className="field">
                                        {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (<option key={num} value={num}>{num} {num === 1 ? t('person') : t('people')}</option>))}
                                    </select>
                                </div>
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="field-label"><Phone className="h-4 w-4 text-gold" /><span>{t('phone')}</span></label>
                                        <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="+385 XX XXX XXX" required className="field" />
                                    </div>
                                    <div>
                                        <label className="field-label"><Mail className="h-4 w-4 text-gold" /><span>{t('email')}</span></label>
                                        <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="your@email.com" required className="field" />
                                    </div>
                                </div>
                                <button type="button" onClick={handleSubmit} disabled={isSubmitting} className="btn btn-gold w-full !py-4">
                                    {isSubmitting ? t('booking') : t('bookRide')}
                                    {!isSubmitting && <ArrowRight className="h-4 w-4" />}
                                </button>
                                {submitStatus === 'success' && <div className="text-green-700 text-center font-medium bg-green-50 border border-green-200 p-3 rounded-lg text-sm">{t('bookingSuccess')}</div>}
                                {submitStatus === 'error' && <div className="text-red-700 text-center font-medium bg-red-50 border border-red-200 p-3 rounded-lg text-sm">{t('bookingError')}</div>}
                                {submitStatus === 'emailError' && <div className="text-red-700 text-center font-medium bg-red-50 border border-red-200 p-3 rounded-lg text-sm">{t('bookingError')}</div>}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ========================== SERVICES ========================== */}
            <section className="section bg-paper">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Reveal className="text-center max-w-2xl mx-auto">
                        <span className="eyebrow is-centered justify-center">{t('eyebrowServices')}</span>
                        <h2 className="mt-4 font-display text-3xl sm:text-4xl">{t('discoverDestinations')}</h2>
                        <p className="mt-4 text-muted leading-relaxed">{t('discoverSubtitle')}</p>
                    </Reveal>

                    <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mt-14">
                        {services.map((s, i) => (
                            <Reveal key={i} delay={i * 90}>
                                <div className="card lift h-full p-8 text-center">
                                    <div className="medallion mx-auto"><s.icon className="h-6 w-6" /></div>
                                    <h3 className="mt-6 font-display text-xl">{s.title}</h3>
                                    <p className="mt-3 text-muted text-sm leading-relaxed">{s.desc}</p>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ========================= HOW IT WORKS ======================= */}
            <section className="section bg-navy-texture text-white">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Reveal className="text-center max-w-2xl mx-auto">
                        <span className="eyebrow eyebrow--light justify-center">{t('eyebrowHowItWorks')}</span>
                        <h2 className="mt-4 font-display text-3xl sm:text-4xl text-white">{t('howItWorks')}</h2>
                        <p className="mt-4 text-white/65 leading-relaxed">{t('howItWorksSubtitle')}</p>
                    </Reveal>

                    <div className="grid md:grid-cols-3 gap-8 mt-14 relative">
                        {steps.map((step, i) => (
                            <Reveal key={i} delay={i * 100} className="text-center md:text-left">
                                <div className="flex items-center gap-4 justify-center md:justify-start">
                                    <span className="font-display text-5xl text-gold/40 leading-none">{String(i + 1).padStart(2, '0')}</span>
                                    <span className="medallion medallion--dark shrink-0"><step.icon className="h-6 w-6" /></span>
                                </div>
                                <h3 className="mt-5 font-display text-xl text-white">{step.title}</h3>
                                <p className="mt-2 text-white/65 text-sm leading-relaxed">{step.desc}</p>
                            </Reveal>
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <a href="#booking" className="btn btn-gold">{t('reserveYourRide')}<ArrowRight className="h-4 w-4" /></a>
                    </div>
                </div>
            </section>

            {/* ======================= DESTINATIONS ========================= */}
            <section className="section bg-cream">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Reveal className="text-center max-w-2xl mx-auto">
                        <span className="eyebrow is-centered justify-center">{t('eyebrowDestinations')}</span>
                        <h2 className="mt-4 font-display text-3xl sm:text-4xl">{t('destinationsTitle')}</h2>
                        <p className="mt-4 text-muted leading-relaxed">{t('destinationsSubtitle')}</p>
                    </Reveal>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5 mt-12">
                        {gallery.map((g, i) => (
                            <Reveal key={i} delay={i * 80}>
                                <div className="group relative rounded-2xl overflow-hidden aspect-[3/4] shadow-lg">
                                    <Image
                                        src={g.src}
                                        alt={g.label}
                                        fill
                                        sizes="(max-width: 1024px) 50vw, 25vw"
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950/85 via-navy-950/10 to-transparent" />
                                    <div className="absolute bottom-0 left-0 right-0 p-4">
                                        <span className="inline-block h-px w-8 bg-gold mb-2" />
                                        <h3 className="font-display text-white text-lg leading-tight">{g.label}</h3>
                                    </div>
                                </div>
                            </Reveal>
                        ))}
                    </div>

                    <Reveal className="flex flex-wrap justify-center gap-2.5 mt-10">
                        {destinations.map((d) => (
                            <span key={d} className="inline-flex items-center gap-1.5 text-sm text-navy-700 bg-white border border-gold/25 rounded-full px-4 py-1.5">
                                <MapPin className="h-3.5 w-3.5 text-gold" />{d}
                            </span>
                        ))}
                    </Reveal>
                </div>
            </section>

            {/* ========================= TESTIMONIALS ======================= */}
            <ReviewSlider />

            {/* ===================== WHY CHOOSE US + CTA ==================== */}
            <section className="section bg-paper">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                        <Reveal>
                            <span className="eyebrow">{t('eyebrowWhyUs')}</span>
                            <h2 className="mt-4 font-display text-3xl sm:text-4xl">{t('whyChooseUs')}</h2>
                            <div className="mt-8 space-y-7">
                                {features.map((f, i) => (
                                    <div key={i} className="flex items-start gap-5">
                                        <span className="medallion shrink-0"><f.icon className="h-5 w-5" /></span>
                                        <div>
                                            <h3 className="font-display text-lg">{f.title}</h3>
                                            <p className="mt-1 text-muted text-sm leading-relaxed">{f.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Reveal>

                        <Reveal delay={120}>
                            <div className="rounded-3xl bg-navy-texture p-8 sm:p-10 text-white relative overflow-hidden">
                                <div className="absolute -top-16 -right-16 h-48 w-48 rounded-full bg-gold/10 blur-2xl" />
                                <div className="relative">
                                    <h3 className="font-display text-2xl sm:text-3xl text-white">{t('bookNowSave')}</h3>
                                    <p className="mt-4 text-white/70 leading-relaxed">{t('ctaDescription')}</p>
                                    <a href="#booking" className="btn btn-gold mt-8">{t('bookNowButton')}<ArrowRight className="h-4 w-4" /></a>
                                </div>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePageContent;
