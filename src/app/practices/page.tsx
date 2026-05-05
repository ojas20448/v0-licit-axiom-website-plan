import Link from 'next/link';
import { Metadata } from 'next';
import { practiceAreas } from '@/data/practices';

export const metadata: Metadata = {
    title: 'Practice Areas',
    description: 'Explore our comprehensive legal services at Licit Axiom. We offer expertise in corporate law, M&A, employment law, intellectual property, real estate, dispute resolution, and more.',
};

export default function PracticesPage() {
    return (
        <>
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-navy-800 to-navy-900 py-20">
                <div className="container-custom">
                    <div className="max-w-3xl">
                        <span className="text-gold-400 font-medium text-sm uppercase tracking-wider">Our Services</span>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-6">
                            Practice Areas
                        </h1>
                        <p className="text-navy-200 text-lg leading-relaxed">
                            We provide comprehensive legal services across key practice areas,
                            combining deep expertise with practical, business-focused advice.
                        </p>
                    </div>
                </div>
            </section>

            {/* Practice Areas Grid */}
            <section className="section-padding bg-white">
                <div className="container-custom">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {practiceAreas.map((practice, index) => (
                            <Link
                                key={practice.slug}
                                href={`/practices/${practice.slug}`}
                                className="group"
                            >
                                <article className="card p-8 h-full border border-gray-100 hover:border-gold-300 flex flex-col">
                                    <div className="flex items-start gap-4 mb-4">
                                        <div className="w-14 h-14 rounded-xl bg-navy-50 flex items-center justify-center text-3xl group-hover:bg-gold-50 transition-colors">
                                            {practice.icon}
                                        </div>
                                        <div className="flex-1">
                                            <h2 className="text-xl font-semibold text-navy-800 group-hover:text-gold-600 transition-colors">
                                                {practice.name}
                                            </h2>
                                        </div>
                                    </div>

                                    <p className="text-navy-600 leading-relaxed mb-6 flex-1">
                                        {practice.shortDescription}
                                    </p>

                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {practice.services.slice(0, 3).map((service) => (
                                            <span
                                                key={service}
                                                className="px-3 py-1 bg-navy-50 text-navy-600 text-xs rounded-full"
                                            >
                                                {service}
                                            </span>
                                        ))}
                                        {practice.services.length > 3 && (
                                            <span className="px-3 py-1 bg-navy-50 text-navy-600 text-xs rounded-full">
                                                +{practice.services.length - 3} more
                                            </span>
                                        )}
                                    </div>

                                    <span className="inline-flex items-center text-gold-600 text-sm font-medium group-hover:gap-2 transition-all">
                                        Learn More
                                        <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </span>
                                </article>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact CTA */}
            <section className="py-16 bg-navy-50">
                <div className="container-custom text-center">
                    <h2 className="text-2xl md:text-3xl font-bold text-navy-800 mb-4">
                        Need Legal Assistance?
                    </h2>
                    <p className="text-navy-600 max-w-xl mx-auto mb-8">
                        Our attorneys are ready to help you navigate your legal challenges.
                        Contact us to discuss your specific needs.
                    </p>
                    <Link href="/contact" className="btn btn-primary">
                        Schedule a Consultation
                    </Link>
                </div>
            </section>
        </>
    );
}
