'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Practice Areas', href: '/practices' },
    { name: 'Our Attorneys', href: '/attorneys' },
    { name: 'Insights', href: '/blog' },
    { name: 'Careers', href: '/careers' },
];

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
            <nav className="container-custom">
                <div className="flex items-center justify-between h-24">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3">
                        <Image
                            src="/logo.png"
                            alt="Licit Axiom Legal Consultants"
                            width={240}
                            height={90}
                            className="h-20 w-auto"
                            priority
                        />
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center gap-8">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="text-navy-700 hover:text-navy-800 font-medium text-sm tracking-wide transition-colors relative group"
                            >
                                {item.name}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gold-500 transition-all duration-300 group-hover:w-full" />
                            </Link>
                        ))}
                        <Link
                            href="/contact"
                            className="btn btn-primary"
                        >
                            Contact Us
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        type="button"
                        className="lg:hidden p-2 text-navy-800"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        {mobileMenuOpen ? (
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        )}
                    </button>
                </div>

                {/* Mobile Navigation */}
                {mobileMenuOpen && (
                    <div className="lg:hidden py-4 border-t border-gray-100">
                        <div className="flex flex-col gap-4">
                            {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className="text-navy-700 hover:text-gold-500 font-medium py-2 transition-colors"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {item.name}
                                </Link>
                            ))}
                            <Link
                                href="/contact"
                                className="btn btn-primary mt-2 text-center"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Contact Us
                            </Link>
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
}
