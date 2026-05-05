import Link from 'next/link';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { blogPosts, getBlogPostBySlug } from '@/data/blog';
import { getAttorneyBySlug } from '@/data/attorneys';

type Props = {
    params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
    return blogPosts.map((post) => ({
        slug: post.slug,
    }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const post = getBlogPostBySlug(slug);

    if (!post) {
        return {
            title: 'Post Not Found',
        };
    }

    return {
        title: post.title,
        description: post.excerpt,
        openGraph: {
            title: post.title,
            description: post.excerpt,
            type: 'article',
            publishedTime: post.date,
            authors: [post.author],
        },
    };
}

export default async function BlogPostPage({ params }: Props) {
    const { slug } = await params;
    const post = getBlogPostBySlug(slug);

    if (!post) {
        notFound();
    }

    const author = getAttorneyBySlug(post.authorSlug);
    const otherPosts = blogPosts.filter(p => p.slug !== post.slug).slice(0, 2);

    // Simple markdown-like content rendering
    const renderContent = (content: string) => {
        const lines = content.trim().split('\n');
        const elements: JSX.Element[] = [];
        let currentList: string[] = [];

        const flushList = () => {
            if (currentList.length > 0) {
                elements.push(
                    <ul key={`list-${elements.length}`} className="list-disc list-inside space-y-2 mb-6 text-navy-600">
                        {currentList.map((item, i) => (
                            <li key={i}>{item.replace(/^- /, '')}</li>
                        ))}
                    </ul>
                );
                currentList = [];
            }
        };

        lines.forEach((line, index) => {
            const trimmedLine = line.trim();

            if (trimmedLine.startsWith('## ')) {
                flushList();
                elements.push(
                    <h2 key={index} className="text-2xl font-semibold text-navy-800 mt-8 mb-4">
                        {trimmedLine.replace('## ', '')}
                    </h2>
                );
            } else if (trimmedLine.startsWith('### ')) {
                flushList();
                elements.push(
                    <h3 key={index} className="text-xl font-semibold text-navy-800 mt-6 mb-3">
                        {trimmedLine.replace('### ', '')}
                    </h3>
                );
            } else if (trimmedLine.startsWith('- ')) {
                currentList.push(trimmedLine);
            } else if (trimmedLine.startsWith('**') && trimmedLine.endsWith('**')) {
                flushList();
                elements.push(
                    <p key={index} className="font-semibold text-navy-800 mb-2">
                        {trimmedLine.replace(/\*\*/g, '')}
                    </p>
                );
            } else if (trimmedLine.startsWith('*') && trimmedLine.endsWith('*')) {
                flushList();
                elements.push(
                    <p key={index} className="italic text-gold-600 mt-8 text-lg">
                        {trimmedLine.replace(/\*/g, '')}
                    </p>
                );
            } else if (trimmedLine.length > 0) {
                flushList();
                elements.push(
                    <p key={index} className="text-navy-600 leading-relaxed mb-4">
                        {trimmedLine}
                    </p>
                );
            }
        });

        flushList();
        return elements;
    };

    return (
        <>
            {/* Breadcrumb */}
            <div className="bg-navy-50 py-4 border-b border-navy-100">
                <div className="container-custom">
                    <nav className="flex items-center gap-2 text-sm">
                        <Link href="/" className="text-navy-500 hover:text-navy-700">Home</Link>
                        <span className="text-navy-300">/</span>
                        <Link href="/blog" className="text-navy-500 hover:text-navy-700">Insights</Link>
                        <span className="text-navy-300">/</span>
                        <span className="text-navy-800 font-medium truncate max-w-xs">{post.title}</span>
                    </nav>
                </div>
            </div>

            {/* Article */}
            <article className="section-padding bg-white">
                <div className="container-custom">
                    <div className="max-w-3xl mx-auto">
                        {/* Header */}
                        <header className="mb-12">
                            <div className="flex items-center gap-3 mb-6">
                                <span className="px-4 py-1 bg-gold-50 text-gold-700 text-sm font-medium rounded-full">
                                    {post.category}
                                </span>
                                <span className="text-navy-400">{post.readTime}</span>
                            </div>

                            <h1 className="text-3xl md:text-4xl font-bold text-navy-800 mb-6 leading-tight">
                                {post.title}
                            </h1>

                            <div className="flex items-center gap-4 pb-8 border-b border-gray-200">
                                <Link
                                    href={author ? `/attorneys/${author.slug}` : '#'}
                                    className="flex items-center gap-4 group"
                                >
                                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-navy-600 to-navy-800 flex items-center justify-center">
                                        <span className="text-lg font-bold text-white">
                                            {post.author.split(' ').map(n => n[0]).join('')}
                                        </span>
                                    </div>
                                    <div>
                                        <div className="font-medium text-navy-800 group-hover:text-gold-600 transition-colors">
                                            {post.author}
                                        </div>
                                        <div className="text-navy-500 text-sm">
                                            {new Date(post.date).toLocaleDateString('en-IN', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                            })}
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </header>

                        {/* Content */}
                        <div className="prose prose-lg prose-navy max-w-none">
                            {renderContent(post.content)}
                        </div>

                        {/* Share */}
                        <div className="mt-12 pt-8 border-t border-gray-200">
                            <div className="flex items-center justify-between flex-wrap gap-4">
                                <div className="flex items-center gap-4">
                                    <span className="text-navy-600 text-sm font-medium">Share this article:</span>
                                    <div className="flex gap-2">
                                        <a
                                            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://licitaxiom.com/blog/${post.slug}`)}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-10 h-10 rounded-full bg-navy-100 flex items-center justify-center hover:bg-gold-500 hover:text-white transition-colors"
                                        >
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                            </svg>
                                        </a>
                                        <a
                                            href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(`https://licitaxiom.com/blog/${post.slug}`)}&text=${encodeURIComponent(post.title)}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-10 h-10 rounded-full bg-navy-100 flex items-center justify-center hover:bg-gold-500 hover:text-white transition-colors"
                                        >
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                                <Link href="/blog" className="text-gold-600 hover:text-gold-700 font-medium text-sm flex items-center gap-1">
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                    Back to Insights
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </article>

            {/* Related Posts */}
            {otherPosts.length > 0 && (
                <section className="py-16 bg-navy-50">
                    <div className="container-custom">
                        <h2 className="text-2xl font-bold text-navy-800 mb-8">Related Articles</h2>
                        <div className="grid md:grid-cols-2 gap-8">
                            {otherPosts.map((relatedPost) => (
                                <Link
                                    key={relatedPost.slug}
                                    href={`/blog/${relatedPost.slug}`}
                                    className="group"
                                >
                                    <article className="card p-6 bg-white border border-gray-100 hover:border-gold-300 h-full">
                                        <div className="flex items-center gap-3 mb-4">
                                            <span className="px-3 py-1 bg-gold-50 text-gold-700 text-xs font-medium rounded-full">
                                                {relatedPost.category}
                                            </span>
                                            <span className="text-navy-400 text-sm">{relatedPost.readTime}</span>
                                        </div>
                                        <h3 className="text-lg font-semibold text-navy-800 group-hover:text-gold-600 transition-colors leading-snug">
                                            {relatedPost.title}
                                        </h3>
                                    </article>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </>
    );
}
