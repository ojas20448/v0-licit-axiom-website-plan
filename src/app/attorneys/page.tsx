import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { attorneys } from '@/data/attorneys';

export const metadata: Metadata = {
    title: 'Our Attorneys',
    description: 'Meet our team of experienced attorneys at Licit Axiom Legal Consultants. Expert lawyers in corporate law, M&A, employment, IP, real estate, and dispute resolution.',
};

export default function AttorneysPage() {
    return (
        <>
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-navy-800 to-navy-900 py-20">
                <div className="container-custom">
                    <div className="max-w-3xl">
                        <span className="text-gold-400 font-medium text-sm uppercase tracking-wider">Our Team</span>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-6">
                            Meet Our Attorneys
                        </h1>
                        <p className="text-navy-200 text-lg leading-relaxed">
                            Our team combines decades of experience with fresh perspectives.
                            Each attorney brings specialized expertise and a commitment to client success.
                        </p>
                    </div>
                </div>
            </section>

            {/* Attorneys Grid */}
            <section className="section-padding bg-white">
                <div className="container-custom">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {attorneys.map((attorney) => (
                            <Link
                                key={attorney.slug}
                                href={`/attorneys/${attorney.slug}`}
                                className="group"
                            >
                                <article className="card overflow-hidden border border-gray-100 hover:border-gold-300">
                                    {/* Photo */}
                                    <div className="relative h-72 bg-navy-100 overflow-hidden">
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            {/* Placeholder avatar with initials */}
                                            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-navy-600 to-navy-800 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                                                <span className="text-4xl font-bold text-white">
                                                    {attorney.name.split(' ').map(n => n[0]).join('')}
                                                </span>
                                            </div>
                                        </div>
                                        {/* Overlay on hover */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                                            <span className="text-white font-medium flex items-center gap-2">
                                                View Profile
                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                </svg>
                                            </span>
                                        </div>
                                    </div>

                                    {/* Info */}
                                    <div className="p-6">
                                        <h2 className="text-xl font-semibold text-navy-800 group-hover:text-gold-600 transition-colors">
                                            {attorney.name}
                                        </h2>
                                        <p className="text-gold-600 font-medium text-sm mt-1">
                                            {attorney.title}
                                        </p>
                                        <div className="flex flex-wrap gap-2 mt-4">
                                            {attorney.practiceAreas.slice(0, 2).map((area) => (
                                                <span
                                                    key={area}
                                                    className="px-3 py-1 bg-navy-50 text-navy-600 text-xs rounded-full"
                                                >
                                                    {area}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </article>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Join Our Team CTA */}
            <section className="py-16 bg-navy-50">
                <div className="container-custom text-center">
                    <h2 className="text-2xl md:text-3xl font-bold text-navy-800 mb-4">
                        Want to Join Our Team?
                    </h2>
                    <p className="text-navy-600 max-w-xl mx-auto mb-8">
                        We&apos;re always looking for talented legal professionals who share our commitment to excellence.
                    </p>
                    <Link href="/careers" className="btn btn-primary">
                        View Open Positions
                    </Link>
                </div>
            </section>
        </>
    );
}
