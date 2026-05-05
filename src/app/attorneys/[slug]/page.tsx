import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArrowLeft, Mail, Phone, BookOpen, Briefcase, GraduationCap } from "lucide-react";
import client from "../../../../tina/__generated__/client";

type Props = {
    params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
    const response = await client.queries.attorneyConnection();
    return (response.data.attorneyConnection.edges || []).map((attorney) => ({
        slug: attorney.node._sys.filename,
    }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  let attorney;
  try {
    const response = await client.queries.attorney({ relativePath: `${resolvedParams.slug}.json` });
    attorney = response.data.attorney;
  } catch (e) {
    return {
      title: "Attorney Not Found | Licit Axiom Legal Consultants",
    };
  }

  return {
    title: `${attorney.name} | Licit Axiom Legal Consultants`,
    description: attorney.bio,
  };
}

export default async function AttorneyPage({ params }: Props) {
    const resolvedParams = await params;
    let attorney;
    try {
      const response = await client.queries.attorney({ relativePath: `${resolvedParams.slug}.json` });
      attorney = response.data.attorney;
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
                        <Link href="/attorneys" className="text-navy-500 hover:text-navy-700">Our Attorneys</Link>
                        <span className="text-navy-300">/</span>
                        <span className="text-navy-800 font-medium">{attorney.name}</span>
                    </nav>
                </div>
            </div>

            {/* Attorney Profile */}
            <section className="section-padding bg-white">
                <div className="container-custom">
                    <div className="grid lg:grid-cols-3 gap-12">
                        {/* Sidebar */}
                        <div className="lg:col-span-1">
                            <div className="sticky top-28">
                                {/* Photo */}
                                <div className="bg-navy-100 rounded-2xl overflow-hidden mb-6">
                                    <div className="aspect-square flex items-center justify-center bg-gradient-to-br from-navy-600 to-navy-800">
                                        <span className="text-7xl font-bold text-white">
                                            {attorney.name.split(' ').map(n => n[0]).join('')}
                                        </span>
                                    </div>
                                </div>

                                {/* Contact Card */}
                                <div className="card p-6 border border-gray-100">
                                    <h3 className="font-semibold text-navy-800 mb-4">Contact</h3>
                                    <div className="space-y-4">
                                        <a
                                            href={`mailto:${attorney.email}`}
                                            className="flex items-center gap-3 text-navy-600 hover:text-gold-600 transition-colors"
                                        >
                                            <div className="w-10 h-10 rounded-lg bg-navy-50 flex items-center justify-center">
                                                <svg className="w-5 h-5 text-navy-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                </svg>
                                            </div>
                                            <span className="text-sm">{attorney.email}</span>
                                        </a>
                                        <a
                                            href={`tel:${attorney.phone.replace(/\s/g, '')}`}
                                            className="flex items-center gap-3 text-navy-600 hover:text-gold-600 transition-colors"
                                        >
                                            <div className="w-10 h-10 rounded-lg bg-navy-50 flex items-center justify-center">
                                                <svg className="w-5 h-5 text-navy-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                                </svg>
                                            </div>
                                            <span className="text-sm">{attorney.phone}</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Main Content */}
                        <div className="lg:col-span-2">
                            <div className="mb-8">
                                <h1 className="text-3xl md:text-4xl font-bold text-navy-800 mb-2">
                                    {attorney.name}
                                </h1>
                                <p className="text-xl text-gold-600 font-medium">
                                    {attorney.title}
                                </p>
                            </div>

                            {/* Practice Areas */}
                            <div className="flex flex-wrap gap-2 mb-8">
                                {attorney.practiceAreas.map((area) => (
                                    <span
                                        key={area}
                                        className="px-4 py-2 bg-gold-50 text-gold-700 text-sm font-medium rounded-full"
                                    >
                                        {area}
                                    </span>
                                ))}
                            </div>

                            {/* Bio */}
                            <div className="prose prose-navy max-w-none mb-10">
                                <h2 className="text-xl font-semibold text-navy-800 mb-4 gold-underline pb-2">
                                    About
                                </h2>
                                <p className="text-navy-600 leading-relaxed">
                                    {attorney.bio}
                                </p>
                            </div>

                            {/* Experience */}
                            <div className="mb-10">
                                <h2 className="text-xl font-semibold text-navy-800 mb-4 gold-underline pb-2">
                                    Experience
                                </h2>
                                <ul className="space-y-3">
                                    {attorney.experience.map((exp, index) => (
                                        <li key={index} className="flex items-start gap-3 text-navy-600">
                                            <svg className="w-5 h-5 text-gold-500 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                            <span>{exp}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Education */}
                            <div className="mb-10">
                                <h2 className="text-xl font-semibold text-navy-800 mb-4 gold-underline pb-2">
                                    Education
                                </h2>
                                <ul className="space-y-3">
                                    {attorney.education.map((edu, index) => (
                                        <li key={index} className="flex items-start gap-3 text-navy-600">
                                            <svg className="w-5 h-5 text-gold-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path d="M12 14l9-5-9-5-9 5 9 5z" />
                                                <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                                            </svg>
                                            <span>{edu}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* CTA */}
                            <div className="bg-navy-50 rounded-xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
                                <div>
                                    <h3 className="text-lg font-semibold text-navy-800 mb-2">
                                        Schedule a Consultation
                                    </h3>
                                    <p className="text-navy-600 text-sm">
                                        Contact {attorney.name.split(' ')[0]} to discuss your legal needs.
                                    </p>
                                </div>
                                <Link href="/contact" className="btn btn-primary shrink-0">
                                    Contact Us
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
