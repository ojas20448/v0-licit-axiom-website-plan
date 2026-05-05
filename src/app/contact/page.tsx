'use client';

import { useState } from 'react';
import { Metadata } from 'next';

export default function ContactPage() {
    const [formState, setFormState] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 1000));

        setIsSubmitting(false);
        setIsSubmitted(true);
    };

    return (
        <>
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-navy-800 to-navy-900 py-20">
                <div className="container-custom">
                    <div className="max-w-3xl">
                        <span className="text-gold-400 font-medium text-sm uppercase tracking-wider">Get in Touch</span>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-6">
                            Contact Us
                        </h1>
                        <p className="text-navy-200 text-lg leading-relaxed">
                            Have a legal question or need assistance? We&apos;re here to help.
                            Reach out to us and our team will respond promptly.
                        </p>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section className="section-padding bg-white">
                <div className="container-custom">
                    <div className="grid lg:grid-cols-2 gap-16">
                        {/* Contact Form */}
                        <div>
                            <h2 className="text-2xl font-semibold text-navy-800 mb-6">
                                Send Us a Message
                            </h2>

                            {isSubmitted ? (
                                <div className="card p-8 bg-green-50 border border-green-200 text-center">
                                    <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                                        <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-semibold text-green-800 mb-2">Message Sent!</h3>
                                    <p className="text-green-700">
                                        Thank you for reaching out. We&apos;ll get back to you within 24 hours.
                                    </p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <label htmlFor="name" className="block text-sm font-medium text-navy-700 mb-2">
                                                Full Name *
                                            </label>
                                            <input
                                                type="text"
                                                id="name"
                                                required
                                                value={formState.name}
                                                onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-shadow"
                                                placeholder="John Doe"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="email" className="block text-sm font-medium text-navy-700 mb-2">
                                                Email Address *
                                            </label>
                                            <input
                                                type="email"
                                                id="email"
                                                required
                                                value={formState.email}
                                                onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-shadow"
                                                placeholder="john@example.com"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <label htmlFor="phone" className="block text-sm font-medium text-navy-700 mb-2">
                                                Phone Number
                                            </label>
                                            <input
                                                type="tel"
                                                id="phone"
                                                value={formState.phone}
                                                onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-shadow"
                                                placeholder="+91 98765 43210"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="subject" className="block text-sm font-medium text-navy-700 mb-2">
                                                Subject *
                                            </label>
                                            <select
                                                id="subject"
                                                required
                                                value={formState.subject}
                                                onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-shadow bg-white"
                                            >
                                                <option value="">Select a subject</option>
                                                <option value="general">General Inquiry</option>
                                                <option value="corporate">Corporate Law</option>
                                                <option value="employment">Employment Law</option>
                                                <option value="ip">Intellectual Property</option>
                                                <option value="real-estate">Real Estate</option>
                                                <option value="dispute">Dispute Resolution</option>
                                                <option value="other">Other</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="message" className="block text-sm font-medium text-navy-700 mb-2">
                                            Your Message *
                                        </label>
                                        <textarea
                                            id="message"
                                            required
                                            rows={6}
                                            value={formState.message}
                                            onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-shadow resize-none"
                                            placeholder="Please describe how we can help you..."
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="btn btn-primary w-full md:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Sending...
                                            </>
                                        ) : (
                                            'Send Message'
                                        )}
                                    </button>
                                </form>
                            )}
                        </div>

                        {/* Contact Info */}
                        <div>
                            <h2 className="text-2xl font-semibold text-navy-800 mb-6">
                                Contact Information
                            </h2>

                            <div className="space-y-6 mb-10">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-lg bg-gold-50 flex items-center justify-center shrink-0">
                                        <svg className="w-6 h-6 text-gold-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-navy-800 mb-1">Office Address</h3>
                                        <p className="text-navy-600">
                                            123 Legal Avenue, Nariman Point<br />
                                            Mumbai, Maharashtra 400021<br />
                                            India
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-lg bg-gold-50 flex items-center justify-center shrink-0">
                                        <svg className="w-6 h-6 text-gold-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-navy-800 mb-1">Phone</h3>
                                        <a href="tel:+912266666666" className="text-navy-600 hover:text-gold-600 transition-colors">
                                            +91 22 6666 6666
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-lg bg-gold-50 flex items-center justify-center shrink-0">
                                        <svg className="w-6 h-6 text-gold-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-navy-800 mb-1">Email</h3>
                                        <a href="mailto:contact@licitaxiom.com" className="text-navy-600 hover:text-gold-600 transition-colors">
                                            contact@licitaxiom.com
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-lg bg-gold-50 flex items-center justify-center shrink-0">
                                        <svg className="w-6 h-6 text-gold-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-navy-800 mb-1">Office Hours</h3>
                                        <p className="text-navy-600">
                                            Monday - Friday: 9:00 AM - 6:00 PM<br />
                                            Saturday: 10:00 AM - 2:00 PM<br />
                                            Sunday: Closed
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Map Placeholder */}
                            <div className="rounded-xl overflow-hidden border border-gray-200">
                                <div className="bg-navy-100 h-64 flex items-center justify-center">
                                    <div className="text-center">
                                        <svg className="w-12 h-12 text-navy-300 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                                        </svg>
                                        <p className="text-navy-400 text-sm">
                                            Interactive map coming soon
                                        </p>
                                        <a
                                            href="https://maps.google.com/?q=Nariman+Point+Mumbai"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-gold-600 hover:text-gold-700 text-sm font-medium mt-2 inline-block"
                                        >
                                            View on Google Maps →
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Quick Contact Bar */}
            <section className="py-12 bg-navy-800">
                <div className="container-custom">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
                        <div className="text-white">
                            <h3 className="text-xl font-semibold mb-1">Need Immediate Assistance?</h3>
                            <p className="text-navy-200">Call us directly and speak with one of our attorneys.</p>
                        </div>
                        <a
                            href="tel:+912266666666"
                            className="btn bg-white text-navy-800 hover:bg-gray-100 flex items-center gap-2"
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            +91 22 6666 6666
                        </a>
                    </div>
                </div>
            </section>
        </>
    );
}
