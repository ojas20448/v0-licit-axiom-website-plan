import Link from 'next/link';
import { Metadata } from 'next';
import { jobPostings } from '@/data/careers';

export const metadata: Metadata = {
    title: 'Careers',
    description: 'Join Licit Axiom Legal Consultants. Explore career opportunities and grow with a leading law firm. We are looking for talented legal professionals.',
};

export default function CareersPage() {
    return (
        <>
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-navy-800 to-navy-900 py-20">
                <div className="container-custom">
                    <div className="max-w-3xl">
                        <span className="text-gold-400 font-medium text-sm uppercase tracking-wider">Join Our Team</span>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-6">
                            Careers at Licit Axiom
                        </h1>
                        <p className="text-navy-200 text-lg leading-relaxed">
                            Build your career with a firm that values excellence, collaboration, and professional growth.
                            We&apos;re looking for talented individuals who share our commitment to delivering exceptional legal services.
                        </p>
                    </div>
                </div>
            </section>

            {/* Why Join Us */}
            <section className="py-16 bg-white border-b border-gray-100">
                <div className="container-custom">
                    <h2 className="text-2xl font-bold text-navy-800 mb-8 text-center">Why Join Licit Axiom?</h2>
                    <div className="grid md:grid-cols-4 gap-8">
                        {[
                            {
                                icon: '🚀',
                                title: 'Career Growth',
                                description: 'Clear progression paths and opportunities to develop your expertise.',
                            },
                            {
                                icon: '🤝',
                                title: 'Mentorship',
                                description: 'Work closely with experienced partners who invest in your development.',
                            },
                            {
                                icon: '⚖️',
                                title: 'Meaningful Work',
                                description: 'Handle challenging matters for leading companies across industries.',
                            },
                            {
                                icon: '🌟',
                                title: 'Great Culture',
                                description: 'Collaborative, inclusive environment that values work-life balance.',
                            },
                        ].map((item) => (
                            <div key={item.title} className="text-center">
                                <div className="w-16 h-16 rounded-xl bg-gold-50 flex items-center justify-center text-3xl mx-auto mb-4">
                                    {item.icon}
                                </div>
                                <h3 className="font-semibold text-navy-800 mb-2">{item.title}</h3>
                                <p className="text-navy-600 text-sm">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Job Listings */}
            <section className="section-padding bg-navy-50">
                <div className="container-custom">
                    <h2 className="text-2xl font-bold text-navy-800 mb-8">Open Positions</h2>

                    <div className="space-y-6">
                        {jobPostings.map((job) => (
                            <Link
                                key={job.slug}
                                href={`/careers/${job.slug}`}
                                className="group block"
                            >
                                <article className="card p-6 md:p-8 bg-white border border-gray-100 hover:border-gold-300">
                                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                        <div className="flex-1">
                                            <h3 className="text-xl font-semibold text-navy-800 group-hover:text-gold-600 transition-colors mb-2">
                                                {job.title}
                                            </h3>
                                            <div className="flex flex-wrap items-center gap-4 text-sm text-navy-500">
                                                <span className="flex items-center gap-1">
                                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    </svg>
                                                    {job.location}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                    </svg>
                                                    {job.department}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                    {job.type}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                                                    </svg>
                                                    {job.experience}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <span className="inline-flex items-center text-gold-600 font-medium group-hover:gap-2 transition-all">
                                                View Details
                                                <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                </svg>
                                            </span>
                                        </div>
                                    </div>
                                </article>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* General Application */}
            <section className="py-16 bg-white">
                <div className="container-custom text-center">
                    <h2 className="text-2xl md:text-3xl font-bold text-navy-800 mb-4">
                        Don&apos;t See a Suitable Role?
                    </h2>
                    <p className="text-navy-600 max-w-xl mx-auto mb-8">
                        We&apos;re always interested in hearing from talented legal professionals.
                        Send us your CV and we&apos;ll keep you in mind for future opportunities.
                    </p>
                    <a
                        href="mailto:careers@licitaxiom.com?subject=General Application"
                        className="btn btn-primary"
                    >
                        Send Your CV
                    </a>
                </div>
            </section>
        </>
    );
}
