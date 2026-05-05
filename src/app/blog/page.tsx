import Link from 'next/link';
import { Metadata } from 'next';
import { ArrowRight, Calendar, Clock, ChevronRight } from 'lucide-react';
import client from "../../../tina/__generated__/client";

export const metadata: Metadata = {
    title: 'Blog & Insights | Licit Axiom Legal Consultants',
    description: 'Read the latest legal insights, news, and updates from the experts at Licit Axiom.',
};

export default async function BlogPage() {
    const blogResponse = await client.queries.blogConnection();
    const posts = blogResponse.data.blogConnection.edges?.map(edge => edge?.node) || [];

    return (
        <>
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-navy-800 to-navy-900 py-20">
                <div className="container-custom">
                    <div className="max-w-3xl">
                        <span className="text-gold-400 font-medium text-sm uppercase tracking-wider">Our Blog</span>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-6">
                            Insights & News
                        </h1>
                        <p className="text-navy-200 text-lg leading-relaxed">
                            Expert perspectives on legal developments, industry trends, and practical guidance
                            to help you navigate the evolving legal landscape.
                        </p>
                    </div>
                </div>
            </section>

            {/* Blog Posts */}
            <section className="section-padding bg-white">
                <div className="container-custom">
                    <div className="grid gap-8">
                        {posts.map((post: Record<string, unknown>, index: number) => (
                            <Link
                                key={post.slug}
                                href={`/blog/${post.slug}`}
                                className="group"
                            >
                                <article className={`card p-8 border border-gray-100 hover:border-gold-300 ${index === 0 ? 'lg:flex lg:gap-8' : ''
                                    }`}>
                                    {index === 0 && (
                                        <div className="hidden lg:block lg:w-1/3 bg-gradient-to-br from-navy-100 to-navy-200 rounded-xl h-64 flex items-center justify-center mb-6 lg:mb-0">
                                            <div className="text-6xl opacity-30">{post.category === 'Technology Law' ? '💻' : post.category === 'Real Estate' ? '🏗️' : '👥'}</div>
                                        </div>
                                    )}

                                    <div className={index === 0 ? 'lg:w-2/3' : ''}>
                                        <div className="flex items-center gap-3 mb-4">
                                            <span className="px-3 py-1 bg-gold-50 text-gold-700 text-xs font-medium rounded-full">
                                                {post.category}
                                            </span>
                                            <span className="text-navy-400 text-sm">{new Date(post.date).toLocaleDateString('en-IN', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}</span>
                                            <span className="text-navy-300">•</span>
                                            <span className="text-navy-400 text-sm">{post.readTime}</span>
                                        </div>

                                        <h2 className={`font-semibold text-navy-800 group-hover:text-gold-600 transition-colors mb-4 ${index === 0 ? 'text-2xl md:text-3xl' : 'text-xl'
                                            }`}>
                                            {post.title}
                                        </h2>

                                        <p className="text-navy-600 leading-relaxed mb-4">
                                            {post.excerpt}
                                        </p>

                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-navy-600 to-navy-800 flex items-center justify-center">
                                                    <span className="text-sm font-bold text-white">
                                                        {post.author.split(' ').map(n => n[0]).join('')}
                                                    </span>
                                                </div>
                                                <span className="text-navy-700 font-medium text-sm">{post.author}</span>
                                            </div>

                                            <span className="inline-flex items-center text-gold-600 text-sm font-medium group-hover:gap-2 transition-all">
                                                Read More
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

            {/* Newsletter CTA */}
            <section className="py-16 bg-navy-50">
                <div className="container-custom text-center">
                    <h2 className="text-2xl md:text-3xl font-bold text-navy-800 mb-4">
                        Stay Informed
                    </h2>
                    <p className="text-navy-600 max-w-xl mx-auto mb-8">
                        Subscribe to our newsletter for the latest legal updates and insights delivered to your inbox.
                    </p>
                    <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="flex-1 px-4 py-3 rounded-lg border border-navy-200 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                        />
                        <button type="submit" className="btn btn-primary">
                            Subscribe
                        </button>
                    </form>
                </div>
            </section>
        </>
    );
}
