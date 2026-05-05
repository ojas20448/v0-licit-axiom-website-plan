import Link from 'next/link';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArrowLeft, Briefcase, MapPin, Clock, Calendar, ChevronRight } from 'lucide-react';
import client from "../../../../tina/__generated__/client";

type Props = {
    params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
    const response = await client.queries.careerConnection();
    return (response.data.careerConnection.edges || []).map((job) => ({
        slug: job?.node?._sys.filename,
    }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const resolvedParams = await params;
    let job;
    try {
        const response = await client.queries.career({ relativePath: `${resolvedParams.slug}.json` });
        job = response.data.career;
    } catch (e) {
        return {
            title: 'Job Not Found',
        };
    }

    return {
        title: `${job.title} - Careers | Licit Axiom`,
        description: `Join Licit Axiom as a ${job.title} in ${job.location}.`,
    };
}

export default async function JobDetailPage({ params }: Props) {
    const resolvedParams = await params;
    let job;
    try {
        const response = await client.queries.career({ relativePath: `${resolvedParams.slug}.json` });
        job = response.data.career;
    } catch (e) {
        notFound();
    }

    return (
        <>
            {/* Breadcrumb */}
            <div className="bg-navy-50 py-4 border-b border-navy-100">
                <div className="container-custom">
                    <nav className="flex items-center gap-2 text-sm">
                        <Link href="/" className="text-navy-500 hover:text-navy-700">Home</Link>
                        <span className="text-navy-300">/</span>
                        <Link href="/careers" className="text-navy-500 hover:text-navy-700">Careers</Link>
                        <span className="text-navy-300">/</span>
                        <span className="text-navy-800 font-medium">{job.title}</span>
                    </nav>
                </div>
            </div>

            {/* Hero Section */}
            <section className="bg-gradient-to-br from-navy-800 to-navy-900 py-12">
                <div className="container-custom">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                                {job.title}
                            </h1>
                            <div className="flex flex-wrap items-center gap-4 text-navy-200">
                                <span className="flex items-center gap-2">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    {job.location}
                                </span>
                                <span className="flex items-center gap-2">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    {job.department}
                                </span>
                                <span className="flex items-center gap-2">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    {job.type}
                                </span>
                            </div>
                        </div>
                        <a
                            href={`mailto:careers@licitaxiom.com?subject=Application for ${job.title}`}
                            className="btn btn-primary shrink-0"
                        >
                            Apply Now
                        </a>
                    </div>
                </div>
            </section>

            {/* Job Details */}
            <section className="section-padding bg-white">
                <div className="container-custom">
                    <div className="grid lg:grid-cols-3 gap-12">
                        {/* Main Content */}
                        <div className="lg:col-span-2">
                            {/* Description */}
                            <div className="mb-10">
                                <h2 className="text-xl font-semibold text-navy-800 mb-4 gold-underline pb-2">
                                    About the Role
                                </h2>
                                <p className="text-navy-600 leading-relaxed">
                                    {job.description}
                                </p>
                            </div>

                            {/* Responsibilities */}
                            <div className="mb-10">
                                <h2 className="text-xl font-semibold text-navy-800 mb-4 gold-underline pb-2">
                                    Key Responsibilities
                                </h2>
                                <ul className="space-y-3">
                                    {job.responsibilities.map((item, index) => (
                                        <li key={index} className="flex items-start gap-3 text-navy-600">
                                            <svg className="w-5 h-5 text-gold-500 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Requirements */}
                            <div className="mb-10">
                                <h2 className="text-xl font-semibold text-navy-800 mb-4 gold-underline pb-2">
                                    Requirements
                                </h2>
                                <ul className="space-y-3">
                                    {job.requirements.map((item, index) => (
                                        <li key={index} className="flex items-start gap-3 text-navy-600">
                                            <svg className="w-5 h-5 text-navy-400 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Benefits */}
                            <div className="mb-10">
                                <h2 className="text-xl font-semibold text-navy-800 mb-4 gold-underline pb-2">
                                    What We Offer
                                </h2>
                                <ul className="space-y-3">
                                    {job.benefits.map((item, index) => (
                                        <li key={index} className="flex items-start gap-3 text-navy-600">
                                            <svg className="w-5 h-5 text-gold-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                                            </svg>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="lg:col-span-1">
                            <div className="sticky top-28 space-y-6">
                                {/* Apply Card */}
                                <div className="card p-6 bg-gradient-to-br from-navy-800 to-navy-900 text-white">
                                    <h3 className="font-semibold text-lg mb-4">Ready to Apply?</h3>
                                    <p className="text-navy-200 text-sm mb-6">
                                        Send your CV and cover letter to our HR team. We&apos;ll review your application and get back to you.
                                    </p>
                                    <a
                                        href={`mailto:careers@licitaxiom.com?subject=Application for ${job.title}`}
                                        className="btn btn-primary w-full text-center"
                                    >
                                        Apply Now
                                    </a>
                                </div>

                                {/* Job Details Card */}
                                <div className="card p-6 border border-gray-100">
                                    <h3 className="font-semibold text-navy-800 mb-4">Job Details</h3>
                                    <div className="space-y-4 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-navy-500">Location</span>
                                            <span className="text-navy-800 font-medium">{job.location}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-navy-500">Department</span>
                                            <span className="text-navy-800 font-medium">{job.department}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-navy-500">Type</span>
                                            <span className="text-navy-800 font-medium">{job.type}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-navy-500">Experience</span>
                                            <span className="text-navy-800 font-medium">{job.experience}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-navy-500">Posted</span>
                                            <span className="text-navy-800 font-medium">
                                                {new Date(job.postedDate).toLocaleDateString('en-IN', {
                                                    year: 'numeric',
                                                    month: 'short',
                                                    day: 'numeric',
                                                })}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Other Openings */}
                                <div className="card p-6 border border-gray-100">
                                    <h3 className="font-semibold text-navy-800 mb-4">Other Openings</h3>
                                    <div className="space-y-3">
                                        {jobPostings
                                            .filter(j => j.slug !== job.slug)
                                            .slice(0, 3)
                                            .map((otherJob) => (
                                                <Link
                                                    key={otherJob.slug}
                                                    href={`/careers/${otherJob.slug}`}
                                                    className="block p-3 rounded-lg hover:bg-navy-50 transition-colors"
                                                >
                                                    <div className="font-medium text-navy-800 text-sm mb-1">
                                                        {otherJob.title}
                                                    </div>
                                                    <div className="text-navy-500 text-xs">
                                                        {otherJob.location} • {otherJob.type}
                                                    </div>
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
