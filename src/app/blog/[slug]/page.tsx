import Link from 'next/link';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArrowLeft, Calendar, Clock, Share2, Twitter, Linkedin, Facebook } from 'lucide-react';
import client from "../../../../tina/__generated__/client";
import { TinaMarkdown } from 'tinacms/dist/rich-text';

type Props = {
    params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
    const response = await client.queries.blogConnection();
    return (response.data.blogConnection.edges || []).map((post) => ({
        slug: post?.node?._sys.filename,
    }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const resolvedParams = await params;
    let post;
    try {
        const response = await client.queries.blog({ relativePath: `${resolvedParams.slug}.md` });
        post = response.data.blog;
    } catch (e) {
        return {
            title: 'Post Not Found',
        };
    }

    return {
        title: `${post.title} | Licit Axiom Blog`,
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
    const resolvedParams = await params;
    let post;
    let author;
    let otherPosts = [];
    try {
        const response = await client.queries.blog({ relativePath: `${resolvedParams.slug}.md` });
        post = response.data.blog;

        if (post.authorSlug) {
            try {
                const authorResponse = await client.queries.attorney({ relativePath: `${post.authorSlug}.json` });
                author = authorResponse.data.attorney;
            } catch (e) {
                console.error("Author not found");
            }
        }

        const postsResponse = await client.queries.blogConnection();
        const allPosts = postsResponse.data.blogConnection.edges?.map(edge => edge?.node) || [];
        otherPosts = allPosts.filter(p => p._sys.filename !== post._sys.filename).slice(0, 3);
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
                                    href={author ? `/attorneys/${author._sys.filename}` : '#'}
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
                        <div className="prose prose-lg max-w-none text-navy-600">
                            <TinaMarkdown content={post.body} />
                        </div>

                        {/* Share */}
                        <div className="mt-12 pt-8 border-t border-gray-200">
                            <div className="flex items-center justify-between flex-wrap gap-4">
                                <div className="flex items-center gap-4">
                                    <span className="text-navy-600 text-sm font-medium">Share this article:</span>
                                    <div className="flex gap-2">
                                        <a
                                            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://licitaxiom.com/blog/${post._sys.filename}`)}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-10 h-10 rounded-full bg-navy-100 flex items-center justify-center hover:bg-gold-500 hover:text-white transition-colors"
                                        >
                                            <Linkedin className="w-5 h-5" />
                                        </a>
                                        <a
                                            href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(`https://licitaxiom.com/blog/${post._sys.filename}`)}&text=${encodeURIComponent(post.title)}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-10 h-10 rounded-full bg-navy-100 flex items-center justify-center hover:bg-gold-500 hover:text-white transition-colors"
                                        >
                                            <Twitter className="w-5 h-5" />
                                        </a>
                                    </div>
                                </div>
                                <Link href="/blog" className="text-gold-600 hover:text-gold-700 font-medium text-sm flex items-center gap-1">
                                    <ArrowLeft className="w-4 h-4" />
                                    Back to Insights
                                </Link>
                            </div>
                        </div>

                        {/* Related Posts */}
                        {otherPosts.length > 0 && (
                            <div className="mt-20 pt-12 border-t border-navy-100">
                                <h2 className="text-2xl font-bold text-navy-800 mb-8">Related Articles</h2>
                                <div className="grid md:grid-cols-3 gap-8">
                                    {otherPosts.map((relatedPost) => (
                                        <Link
                                            key={relatedPost._sys.filename}
                                            href={`/blog/${relatedPost._sys.filename}`}
                                            className="group"
                                        >
                                            <article className="card p-6 border border-gray-100 hover:border-gold-300 h-full flex flex-col">
                                                <div className="flex items-center gap-3 mb-4">
                                                    <span className="px-2 py-1 bg-gold-50 text-gold-700 text-xs font-medium rounded">
                                                        {relatedPost.category}
                                                    </span>
                                                    <span className="text-navy-400 text-xs">
                                                        {new Date(relatedPost.date).toLocaleDateString('en-IN', {
                                                            month: 'short',
                                                            day: 'numeric',
                                                            year: 'numeric'
                                                        })}
                                                    </span>
                                                </div>
                                                <h3 className="font-semibold text-navy-800 group-hover:text-gold-600 transition-colors mb-3 line-clamp-2">
                                                    {relatedPost.title}
                                                </h3>
                                                <p className="text-navy-600 text-sm mb-4 line-clamp-3 flex-1">
                                                    {relatedPost.excerpt}
                                                </p>
                                                <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
                                                    <span className="text-navy-700 text-sm font-medium">{relatedPost.author}</span>
                                                    <span className="text-gold-600 group-hover:translate-x-1 transition-transform">
                                                        →
                                                    </span>
                                                </div>
                                            </article>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </article>
        </>
    );
}
