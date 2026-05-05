'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { practiceAreas, getPracticeAreaBySlug } from '@/data/practices';
import { attorneys, getAttorneyBySlug } from '@/data/attorneys';

type Props = {
    params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
    return practiceAreas.map((practice) => ({
        slug: practice.slug,
    }));
}

function FAQAccordion({ faqs }: { faqs: { question: string; answer: string }[] }) {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <div className="space-y-4">
            {faqs.map((faq, index) => (
                <div
                    key={index}
                    className="border border-gray-200 rounded-lg overflow-hidden"
                >
                    <button
                        onClick={() => setOpenIndex(openIndex === index ? null : index)}
                        className="w-full px-6 py-4 text-left flex items-center justify-between bg-white hover:bg-navy-50 transition-colors"
                    >
                        <span className="font-medium text-navy-800">{faq.question}</span>
                        <svg
                            className={`w-5 h-5 text-navy-400 transition-transform ${openIndex === index ? 'rotate-180' : ''
                                }`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                    {openIndex === index && (
                        <div className="px-6 py-4 bg-navy-50 border-t border-gray-200">
                            <p className="text-navy-600 leading-relaxed">{faq.answer}</p>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

export default async function PracticeDetailPage({ params }: Props) {
    const { slug } = await params;
    const practice = getPracticeAreaBySlug(slug);

    if (!practice) {
        notFound();
    }

    const relatedAttorneyData = practice.relatedAttorneys
        .map(slug => getAttorneyBySlug(slug))
        .filter(Boolean);

    return (
        <>
            {/* Breadcrumb */}
            <div className="bg-navy-50 py-4 border-b border-navy-100">
                <div className="container-custom">
                    <nav className="flex items-center gap-2 text-sm">
                        <Link href="/" className="text-navy-500 hover:text-navy-700">Home</Link>
                        <span className="text-navy-300">/</span>
                        <Link href="/practices" className="text-navy-500 hover:text-navy-700">Practice Areas</Link>
                        <span className="text-navy-300">/</span>
                        <span className="text-navy-800 font-medium">{practice.name}</span>
                    </nav>
                </div>
            </div>

            {/* Hero Section */}
            <section className="bg-gradient-to-br from-navy-800 to-navy-900 py-16">
                <div className="container-custom">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-16 h-16 rounded-xl bg-gold-500/20 flex items-center justify-center text-4xl">
                            {practice.icon}
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold text-white">
                            {practice.name}
                        </h1>
                    </div>
                    <p className="text-navy-200 text-lg leading-relaxed max-w-3xl">
                        {practice.shortDescription}
                    </p>
                </div>
            </section>

            {/* Main Content */}
            <section className="section-padding bg-white">
                <div className="container-custom">
                    <div className="grid lg:grid-cols-3 gap-12">
                        {/* Main Content */}
                        <div className="lg:col-span-2">
                            {/* Description */}
                            <div className="mb-12">
                                <h2 className="text-2xl font-semibold text-navy-800 mb-6 gold-underline pb-2">
                                    Overview
                                </h2>
                                <p className="text-navy-600 leading-relaxed text-lg">
                                    {practice.description}
                                </p>
                            </div>

                            {/* Services */}
                            <div className="mb-12">
                                <h2 className="text-2xl font-semibold text-navy-800 mb-6 gold-underline pb-2">
                                    Our Services
                                </h2>
                                <div className="grid sm:grid-cols-2 gap-4">
                                    {practice.services.map((service, index) => (
                                        <div
                                            key={index}
                                            className="flex items-start gap-3 p-4 bg-navy-50 rounded-lg"
                                        >
                                            <svg className="w-5 h-5 text-gold-500 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                            <span className="text-navy-700">{service}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* FAQs */}
                            <div className="mb-12">
                                <h2 className="text-2xl font-semibold text-navy-800 mb-6 gold-underline pb-2">
                                    Frequently Asked Questions
                                </h2>
                                <FAQAccordion faqs={practice.faqs} />
                            </div>

                            {/* CTA */}
                            <div className="bg-gradient-to-r from-navy-800 to-navy-900 rounded-xl p-8 text-center">
                                <h3 className="text-xl font-semibold text-white mb-4">
                                    Need Assistance with {practice.name}?
                                </h3>
                                <p className="text-navy-200 mb-6">
                                    Our experienced attorneys are ready to help. Contact us to discuss your specific needs.
                                </p>
                                <Link href="/contact" className="btn btn-primary">
                                    Schedule a Consultation
                                </Link>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="lg:col-span-1">
                            <div className="sticky top-28 space-y-8">
                                {/* Related Attorneys */}
                                {relatedAttorneyData.length > 0 && (
                                    <div className="card p-6 border border-gray-100">
                                        <h3 className="font-semibold text-navy-800 mb-4 flex items-center gap-2">
                                            <span className="w-1 h-5 bg-gold-500 rounded" />
                                            Key Contacts
                                        </h3>
                                        <div className="space-y-4">
                                            {relatedAttorneyData.map((attorney) => attorney && (
                                                <Link
                                                    key={attorney.slug}
                                                    href={`/attorneys/${attorney.slug}`}
                                                    className="flex items-center gap-4 p-3 rounded-lg hover:bg-navy-50 transition-colors group"
                                                >
                                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-navy-600 to-navy-800 flex items-center justify-center shrink-0">
                                                        <span className="text-sm font-bold text-white">
                                                            {attorney.name.split(' ').map(n => n[0]).join('')}
                                                        </span>
                                                    </div>
                                                    <div>
                                                        <div className="font-medium text-navy-800 group-hover:text-gold-600 transition-colors">
                                                            {attorney.name}
                                                        </div>
                                                        <div className="text-navy-500 text-sm">{attorney.title}</div>
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Quick Contact */}
                                <div className="card p-6 border border-gray-100 bg-navy-50">
                                    <h3 className="font-semibold text-navy-800 mb-4">Quick Contact</h3>
                                    <div className="space-y-3 text-sm">
                                        <a
                                            href="tel:+912266666666"
                                            className="flex items-center gap-3 text-navy-600 hover:text-gold-600 transition-colors"
                                        >
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                            </svg>
                                            +91 22 6666 6666
                                        </a>
                                        <a
                                            href="mailto:contact@licitaxiom.com"
                                            className="flex items-center gap-3 text-navy-600 hover:text-gold-600 transition-colors"
                                        >
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                            contact@licitaxiom.com
                                        </a>
                                    </div>
                                </div>

                                {/* Other Practice Areas */}
                                <div className="card p-6 border border-gray-100">
                                    <h3 className="font-semibold text-navy-800 mb-4 flex items-center gap-2">
                                        <span className="w-1 h-5 bg-gold-500 rounded" />
                                        Other Practice Areas
                                    </h3>
                                    <div className="space-y-2">
                                        {practiceAreas
                                            .filter(p => p.slug !== practice.slug)
                                            .slice(0, 5)
                                            .map((p) => (
                                                <Link
                                                    key={p.slug}
                                                    href={`/practices/${p.slug}`}
                                                    className="flex items-center gap-2 py-2 text-navy-600 hover:text-gold-600 transition-colors text-sm"
                                                >
                                                    <span>{p.icon}</span>
                                                    <span>{p.name}</span>
                                                </Link>
                                            ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
