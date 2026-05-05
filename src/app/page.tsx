import Link from 'next/link';
import { practiceAreas } from '@/data/practices';

export default function Home() {
  const featuredPractices = practiceAreas.slice(0, 6);

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        {/* Gold Accent Lines */}
        <div className="absolute top-0 left-0 w-1 h-48 bg-gradient-to-b from-gold-500 to-transparent" />
        <div className="absolute bottom-0 right-0 w-48 h-1 bg-gradient-to-l from-gold-500 to-transparent" />

        <div className="container-custom relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-500/10 border border-gold-500/20 mb-8">
              <span className="w-2 h-2 rounded-full bg-gold-500 animate-pulse" />
              <span className="text-gold-400 text-sm font-medium">Trusted Legal Partners Since 2010</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Expert Legal Counsel for{' '}
              <span className="text-gold-400">Your Business</span>
            </h1>

            <p className="text-lg md:text-xl text-navy-200 mb-10 leading-relaxed max-w-2xl">
              We combine deep legal expertise with commercial understanding to deliver exceptional results.
              From complex transactions to challenging disputes, we are your trusted legal partners.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/attorneys" className="btn btn-primary text-base px-8 py-4">
                Meet Our Team
              </Link>
              <Link href="/contact" className="btn btn-secondary border-white text-white hover:bg-white hover:text-navy-900 text-base px-8 py-4">
                Get in Touch
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-16 pt-16 border-t border-white/10">
              <div>
                <div className="text-3xl md:text-4xl font-bold text-gold-400 mb-2">25+</div>
                <div className="text-navy-300 text-sm">Years of Excellence</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-gold-400 mb-2">500+</div>
                <div className="text-navy-300 text-sm">Clients Served</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-gold-400 mb-2">₹5000Cr+</div>
                <div className="text-navy-300 text-sm">Transaction Value</div>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Element */}
        <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-1/3 h-full">
          <div className="absolute inset-0 bg-gradient-to-l from-gold-500/5 to-transparent" />
          <div className="absolute right-20 top-1/2 -translate-y-1/2 w-64 h-64 border border-gold-500/20 rounded-full" />
          <div className="absolute right-32 top-1/2 -translate-y-1/2 w-48 h-48 border border-gold-500/30 rounded-full" />
        </div>
      </section>

      {/* Practice Areas Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <span className="text-gold-500 font-medium text-sm uppercase tracking-wider">What We Do</span>
            <h2 className="text-3xl md:text-4xl font-bold text-navy-800 mt-3 mb-4">
              Our Practice Areas
            </h2>
            <p className="text-navy-600 max-w-2xl mx-auto">
              We offer comprehensive legal services across key practice areas,
              providing expert guidance for all your business needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPractices.map((practice) => (
              <Link
                key={practice.slug}
                href={`/practices/${practice.slug}`}
                className="group card p-8 border border-gray-100 hover:border-gold-300"
              >
                <div className="text-4xl mb-4">{practice.icon}</div>
                <h3 className="text-xl font-semibold text-navy-800 mb-3 group-hover:text-gold-600 transition-colors">
                  {practice.name}
                </h3>
                <p className="text-navy-600 text-sm leading-relaxed mb-4">
                  {practice.shortDescription}
                </p>
                <span className="inline-flex items-center text-gold-600 text-sm font-medium group-hover:gap-2 transition-all">
                  Learn More
                  <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/practices" className="btn btn-secondary">
              View All Practice Areas
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="section-padding bg-navy-50">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-gold-500 font-medium text-sm uppercase tracking-wider">Why Licit Axiom</span>
              <h2 className="text-3xl md:text-4xl font-bold text-navy-800 mt-3 mb-6">
                Legal Excellence, Business Understanding
              </h2>
              <p className="text-navy-600 mb-8 leading-relaxed">
                At Licit Axiom, we don&apos;t just practice law – we partner with you to achieve your business objectives.
                Our team combines legal expertise with deep commercial insight to deliver solutions that work in the real world.
              </p>

              <div className="space-y-6">
                {[
                  {
                    title: 'Experienced Partners',
                    description: 'Our partners bring decades of experience from leading law firms and in-house roles.',
                    icon: '⭐',
                  },
                  {
                    title: 'Client-Centric Approach',
                    description: 'We take time to understand your business and tailor our advice accordingly.',
                    icon: '🎯',
                  },
                  {
                    title: 'Practical Solutions',
                    description: 'We focus on actionable advice that helps you achieve your objectives efficiently.',
                    icon: '💡',
                  },
                  {
                    title: 'Responsive Service',
                    description: 'Quick turnaround and accessible partners when you need us most.',
                    icon: '⚡',
                  },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <div className="w-12 h-12 rounded-lg bg-gold-100 flex items-center justify-center text-xl shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-navy-800 mb-1">{item.title}</h3>
                      <p className="text-navy-600 text-sm">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="bg-navy-800 rounded-2xl p-10 text-white">
                <blockquote className="text-lg leading-relaxed mb-6">
                  &quot;Licit Axiom has been an invaluable partner for our company. Their team&apos;s deep understanding of
                  both legal nuances and business realities sets them apart. They don&apos;t just identify risks –
                  they help us find solutions.&quot;
                </blockquote>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gold-500 flex items-center justify-center font-bold">
                    RS
                  </div>
                  <div>
                    <div className="font-semibold">Rahul Singhania</div>
                    <div className="text-navy-300 text-sm">CEO, TechVentures India</div>
                  </div>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 border-2 border-gold-300 rounded-2xl -z-10" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gold-100 rounded-2xl -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-navy-800 to-navy-900">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Discuss Your Legal Needs?
          </h2>
          <p className="text-navy-200 max-w-2xl mx-auto mb-10">
            Schedule a consultation with our experienced attorneys to explore how we can assist with your legal matters.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="btn btn-primary text-base px-8 py-4">
              Schedule a Consultation
            </Link>
            <a href="tel:+912266666666" className="btn bg-white/10 text-white border border-white/20 hover:bg-white/20 text-base px-8 py-4">
              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              +91 22 6666 6666
            </a>
          </div>
        </div>
      </section>

      {/* Recent Insights Preview */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="flex justify-between items-end mb-12">
            <div>
              <span className="text-gold-500 font-medium text-sm uppercase tracking-wider">Latest Insights</span>
              <h2 className="text-3xl md:text-4xl font-bold text-navy-800 mt-3">
                Legal Updates & News
              </h2>
            </div>
            <Link href="/blog" className="hidden md:inline-flex btn btn-secondary">
              View All Insights
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Understanding the Digital Personal Data Protection Act, 2023',
                category: 'Technology Law',
                date: 'Jan 15, 2024',
                slug: 'digital-personal-data-protection-act-2023',
              },
              {
                title: 'Navigating Commercial Lease Negotiations',
                category: 'Real Estate',
                date: 'Jan 8, 2024',
                slug: 'navigating-commercial-lease-negotiations',
              },
              {
                title: 'Employment Law Updates 2024: What Employers Need to Know',
                category: 'Employment Law',
                date: 'Jan 2, 2024',
                slug: 'employment-law-updates-2024',
              },
            ].map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group"
              >
                <article className="card p-6 h-full border border-gray-100 hover:border-gold-300">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 bg-navy-100 text-navy-700 text-xs font-medium rounded-full">
                      {post.category}
                    </span>
                    <span className="text-navy-400 text-sm">{post.date}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-navy-800 group-hover:text-gold-600 transition-colors leading-snug">
                    {post.title}
                  </h3>
                </article>
              </Link>
            ))}
          </div>

          <div className="text-center mt-8 md:hidden">
            <Link href="/blog" className="btn btn-secondary">
              View All Insights
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
