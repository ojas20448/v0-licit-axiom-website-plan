export interface JobPosting {
    slug: string;
    title: string;
    location: string;
    type: string;
    department: string;
    experience: string;
    description: string;
    responsibilities: string[];
    requirements: string[];
    benefits: string[];
    postedDate: string;
}

export const jobPostings: JobPosting[] = [
    {
        slug: "senior-associate-corporate",
        title: "Senior Associate - Corporate Law",
        location: "Mumbai",
        type: "Full-time",
        department: "Corporate & M&A",
        experience: "4-6 years",
        description: "We are seeking a talented Senior Associate to join our dynamic Corporate Law practice. The ideal candidate will work on complex M&A transactions, private equity deals, and corporate restructuring matters for leading Indian and multinational clients.",
        responsibilities: [
            "Lead due diligence workstreams for M&A transactions",
            "Draft and negotiate transaction documents including SPAs, SHAs, and ancillary agreements",
            "Advise on corporate governance and regulatory compliance matters",
            "Mentor and supervise junior associates",
            "Build and maintain client relationships",
            "Contribute to business development initiatives"
        ],
        requirements: [
            "LL.B. from a premier law school (NLUs preferred)",
            "4-6 years of post-qualification experience in corporate law at a top-tier firm",
            "Strong experience in M&A and private equity transactions",
            "Excellent drafting and negotiation skills",
            "Ability to manage multiple matters and meet deadlines",
            "Strong communication and interpersonal skills"
        ],
        benefits: [
            "Competitive compensation package",
            "Performance-based bonuses",
            "Health insurance for employee and family",
            "Professional development opportunities",
            "Collaborative and inclusive work environment"
        ],
        postedDate: "2024-01-10"
    },
    {
        slug: "associate-dispute-resolution",
        title: "Associate - Dispute Resolution",
        location: "Delhi",
        type: "Full-time",
        department: "Dispute Resolution",
        experience: "2-4 years",
        description: "Our Dispute Resolution practice is looking for a motivated Associate to handle commercial litigation and arbitration matters. You will work on high-value disputes across forums including High Courts, NCLT, and arbitral tribunals.",
        responsibilities: [
            "Conduct legal research and case law analysis",
            "Draft pleadings, applications, and written submissions",
            "Assist in preparation for hearings and trials",
            "Manage case documentation and evidence compilation",
            "Coordinate with advocates and counsels",
            "Attend court and tribunal hearings"
        ],
        requirements: [
            "LL.B. from a recognized law school",
            "2-4 years of post-qualification experience in litigation/arbitration",
            "Experience appearing before courts and tribunals preferred",
            "Strong analytical and research skills",
            "Excellent written and oral communication",
            "Ability to work under pressure and meet tight deadlines"
        ],
        benefits: [
            "Competitive salary",
            "Mentorship from senior litigators",
            "Exposure to high-profile matters",
            "Health and wellness benefits",
            "Clear career progression path"
        ],
        postedDate: "2024-01-05"
    },
    {
        slug: "legal-intern-summer",
        title: "Summer Legal Intern 2024",
        location: "Mumbai / Delhi",
        type: "Internship",
        department: "Multiple Practices",
        experience: "Law Students (3rd year onwards)",
        description: "Licit Axiom's Summer Internship Program offers law students an immersive experience in a leading full-service law firm. Interns will be exposed to real client matters across practice areas while receiving mentorship from experienced practitioners.",
        responsibilities: [
            "Assist lawyers with legal research and analysis",
            "Support due diligence exercises",
            "Draft memoranda and client advisories",
            "Attend client meetings and negotiations",
            "Participate in internal training sessions",
            "Work on pro bono initiatives"
        ],
        requirements: [
            "Currently enrolled in 3rd year or above at a recognized law school",
            "Strong academic record",
            "Excellent research and writing skills",
            "Genuine interest in transactional or litigation practice",
            "Proactive attitude and willingness to learn",
            "Prior internship experience at a law firm preferred"
        ],
        benefits: [
            "Monthly stipend",
            "Mentorship from partners and senior associates",
            "Opportunity for PPO based on performance",
            "Exposure to diverse practice areas",
            "Networking opportunities"
        ],
        postedDate: "2024-01-12"
    }
];

export function getJobBySlug(slug: string): JobPosting | undefined {
    return jobPostings.find(job => job.slug === slug);
}

export function getJobsByDepartment(department: string): JobPosting[] {
    return jobPostings.filter(job => job.department === department);
}
