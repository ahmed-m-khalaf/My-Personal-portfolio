import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
    FaEnvelope,
    FaPhone,
    FaMapMarkerAlt,
    FaPaperPlane,
    FaGithub,
    FaLinkedin,
    FaFacebook,
    FaInstagram
} from 'react-icons/fa';
import { about } from '../data/about';
import { socials } from '../data/socials';
import { getT } from '../data/translations';
import emailjs from '@emailjs/browser';
import SectionWrapper from './SectionWrapper';

gsap.registerPlugin(ScrollTrigger);

const iconMap = {
    FaGithub: FaGithub,
    FaLinkedin: FaLinkedin,
    FaFacebook: FaFacebook,
    FaInstagram: FaInstagram,
};

const Contact = ({ lang = 'en' }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    const sectionRef = useRef(null);
    const formRef = useRef(null);
    const infoRef = useRef(null);

    const t = getT(lang);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 80%',
                    end: 'bottom 20%',
                    toggleActions: 'play none none reverse'
                }
            });

            tl.fromTo(
                infoRef.current,
                { x: -50, opacity: 0 },
                { x: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
            )
                .fromTo(
                    formRef.current,
                    { x: 50, opacity: 0 },
                    { x: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
                    '-=0.5'
                );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
            const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
            const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

            if (!serviceId || !templateId || !publicKey) {
                console.warn("EmailJS keys are missing from environment variables.");
                // Fallback to simulation if keys are missing (for dev)
                await new Promise(resolve => setTimeout(resolve, 1500));
            } else {
                await emailjs.sendForm(
                    serviceId,
                    templateId,
                    formRef.current,
                    publicKey
                );
            }

            setSubmitStatus('success');
            setFormData({ name: '', email: '', message: '' });
        } catch (error) {
            console.error('EmailJS Error:', error);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
            setTimeout(() => setSubmitStatus(null), 5000);
        }
    };

    const contactInfo = [
        {
            icon: FaEnvelope,
            label: t('contact.infoLabels.email'),
            value: 'ahmdalmhmwd939@gmail.com',
            href: 'mailto:ahmdalmhmwd939@gmail.com'
        },
        {
            icon: FaPhone,
            label: t('contact.infoLabels.phone'),
            value: '+20 1125388495',
            href: 'tel:+201125388495'
        },
        {
            icon: FaMapMarkerAlt,
            label: t('contact.infoLabels.location'),
            value: t('content.about.location', about.location || 'Suhag, Egypt'),
            href: null
        }
    ];

    return (
        <SectionWrapper id="contact" title={t('sections.contactTitle')} subtitle={t('sections.contactSubtitle')}>
            <div ref={sectionRef} className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
                {/* Contact Info Side */}
                <div ref={infoRef} className="space-y-8">
                    <div>
                        <h3 className="font-display text-2xl md:text-3xl font-bold text-text-white mb-4">
                            {t('sections.contactHeader')}
                        </h3>
                        <p className="text-text-slate leading-relaxed">
                            {t('sections.contactBody')}
                        </p>
                    </div>

                    {/* Contact Details */}
                    <div className="space-y-4">
                        {contactInfo.map((info, index) => (
                            <div
                                key={index}
                                className="group flex items-center gap-4 p-4 rounded-xl bg-black/5 backdrop-blur-sm border border-black/5 hover:border-accent-crimson/30 transition-all duration-300"
                            >
                                <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-accent-crimson/10 text-accent-crimson group-hover:bg-accent-crimson group-hover:text-white transition-all duration-300">
                                    <info.icon className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-text-slate text-sm">{info.label}</p>
                                    {info.href ? (
                                        <a
                                            href={info.href}
                                            className="text-text-white font-medium hover:text-accent-crimson transition-colors"
                                        >
                                            {info.value}
                                        </a>
                                    ) : (
                                        <p className="text-text-white font-medium">{info.value}</p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Social Links with Platform Colors */}
                    <div>
                        <h4 className="font-display font-semibold text-text-white mb-4">
                            {t('sections.followMe')}
                        </h4>
                        <div className="flex gap-4">
                            {socials.map((social) => {
                                const IconComponent = iconMap[social.icon];
                                return (
                                    <a
                                        key={social.id}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group relative w-12 h-12 flex items-center justify-center rounded-xl bg-black/5 backdrop-blur-sm border border-black/10 text-text-gray transition-all duration-500 ease-out hover:-translate-y-3 hover:shadow-lg"
                                        style={{
                                            '--hover-color': social.color,
                                            '--hover-shadow': `${social.color}40`
                                        }}
                                        aria-label={social.name}
                                    >
                                        {IconComponent && (
                                            <IconComponent
                                                className="w-5 h-5 transition-all duration-500 ease-out group-hover:text-[var(--hover-color)] group-hover:scale-110"
                                            />
                                        )}
                                        {/* Glow effect on hover */}
                                        <div
                                            className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-25 transition-all duration-500 ease-out"
                                            style={{
                                                backgroundColor: social.color,
                                                boxShadow: `0 8px 25px ${social.color}50`
                                            }}
                                        />
                                    </a>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Contact Form Side */}
                <div
                    ref={formRef}
                    className="relative p-8 rounded-2xl bg-gradient-to-br from-black/5 to-white/[0.02] backdrop-blur-sm border border-black/10"
                >
                    {/* Decorative gradient */}
                    <div className="absolute -top-1 -right-1 w-32 h-32 bg-accent-crimson/20 rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute -bottom-1 -left-1 w-24 h-24 bg-accent-sapphire/20 rounded-full blur-3xl pointer-events-none" />

                    <form onSubmit={handleSubmit} className="relative space-y-6">
                        {/* Name Field */}
                        <div className="relative">
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                placeholder=" "
                                className="peer w-full px-4 pt-6 pb-2 rounded-xl bg-black/5 border border-black/10 text-text-white focus:outline-none focus:border-accent-crimson/50 focus:ring-2 focus:ring-accent-crimson/20 transition-all duration-300"
                            />
                            <label
                                htmlFor="name"
                                className="absolute start-4 top-2 text-xs font-medium text-accent-crimson peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:text-text-slate/60 peer-focus:top-2 peer-focus:text-xs peer-focus:text-accent-crimson transition-all duration-200 pointer-events-none"
                            >
                                {t('contact.labels.name')}
                            </label>
                        </div>

                        {/* Email Field */}
                        <div className="relative">
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                placeholder=" "
                                className="peer w-full px-4 pt-6 pb-2 rounded-xl bg-black/5 border border-black/10 text-text-white focus:outline-none focus:border-accent-crimson/50 focus:ring-2 focus:ring-accent-crimson/20 transition-all duration-300"
                            />
                            <label
                                htmlFor="email"
                                className="absolute start-4 top-2 text-xs font-medium text-accent-crimson peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:text-text-slate/60 peer-focus:top-2 peer-focus:text-xs peer-focus:text-accent-crimson transition-all duration-200 pointer-events-none"
                            >
                                {t('contact.labels.email')}
                            </label>
                        </div>

                        {/* Message Field */}
                        <div className="relative">
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                maxLength={500}
                                rows={5}
                                placeholder=" "
                                className="peer w-full px-4 pt-6 pb-6 rounded-xl bg-black/5 border border-black/10 text-text-white focus:outline-none focus:border-accent-crimson/50 focus:ring-2 focus:ring-accent-crimson/20 transition-all duration-300 resize-none"
                            />
                            <label
                                htmlFor="message"
                                className="absolute start-4 top-2 text-xs font-medium text-accent-crimson peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:text-text-slate/60 peer-focus:top-2 peer-focus:text-xs peer-focus:text-accent-crimson transition-all duration-200 pointer-events-none"
                            >
                                {t('contact.labels.message')}
                            </label>
                            {/* Character Counter */}
                            <div className="absolute end-3 bottom-2 text-[10px] font-mono text-text-slate/60">
                                {formData.message.length} / 500
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="group w-full flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-accent-crimson text-white font-semibold hover:bg-accent-crimson/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:shadow-lg hover:shadow-accent-crimson/25"
                        >
                            {isSubmitting ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    {t('contact.buttons.sending')}
                                </>
                            ) : (
                                <>
                                    {t('contact.buttons.sendMessage')}
                                    <FaPaperPlane className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                                </>
                            )}
                        </button>

                        {/* Status Messages */}
                        {submitStatus === 'success' && (
                            <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-center">
                                {t('contact.status.success')}
                            </div>
                        )}
                        {submitStatus === 'error' && (
                            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-center">
                                {t('contact.status.error')}
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </SectionWrapper>
    );
};

export default Contact;

