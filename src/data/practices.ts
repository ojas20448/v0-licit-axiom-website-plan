export interface FAQ {
    question: string;
    answer: string;
}

export interface PracticeArea {
    slug: string;
    name: string;
    icon: string;
    shortDescription: string;
    description: string;
    services: string[];
    faqs: FAQ[];
    relatedAttorneys: string[]; // attorney slugs
}

export const practiceAreas: PracticeArea[] = [
    {
        slug: "corporate-law",
        name: "Corporate Law",
        icon: "🏢",
        shortDescription: "Comprehensive corporate legal solutions for businesses of all sizes.",
        description: "Our Corporate Law practice provides end-to-end legal support for businesses, from incorporation to complex restructuring. We advise on corporate governance, regulatory compliance, joint ventures, and strategic transactions. Our team has extensive experience working with both multinational corporations and emerging enterprises across diverse industries.",
        services: [
            "Company Formation and Incorporation",
            "Corporate Governance and Compliance",
            "Shareholder Agreements and Joint Ventures",
            "Board Advisory Services",
            "Regulatory Filings and Compliance",
            "Corporate Restructuring",
            "Due Diligence"
        ],
        faqs: [
            {
                question: "What type of company structure is best for my business?",
                answer: "The ideal structure depends on factors like ownership, liability preferences, tax implications, and funding needs. Options include Private Limited Companies, LLPs, and One Person Companies. We analyze your specific situation to recommend the most suitable structure."
            },
            {
                question: "How can you help with corporate governance?",
                answer: "We assist with drafting board resolutions, conducting board meetings, ensuring compliance with Companies Act requirements, implementing governance policies, and advising independent directors on their duties and liabilities."
            },
            {
                question: "What is involved in corporate due diligence?",
                answer: "Due diligence involves a comprehensive review of a company's legal, financial, and operational aspects. We examine corporate records, contracts, litigation history, regulatory compliance, IP assets, and employment matters to identify risks before transactions."
            }
        ],
        relatedAttorneys: ["rajesh-sharma", "neha-gupta"]
    },
    {
        slug: "mergers-acquisitions",
        name: "Mergers & Acquisitions",
        icon: "🤝",
        shortDescription: "Strategic M&A advisory for transformative business transactions.",
        description: "Our M&A practice has a proven track record of advising on landmark transactions across sectors. We guide clients through the entire deal lifecycle – from strategy and target identification to negotiation, documentation, and post-merger integration. Our team combines legal expertise with commercial acumen to maximize deal value.",
        services: [
            "Buy-side and Sell-side Advisory",
            "Cross-border Transactions",
            "Private Equity Investments",
            "Venture Capital Deals",
            "Management Buyouts",
            "Demergers and Spin-offs",
            "Post-merger Integration Support"
        ],
        faqs: [
            {
                question: "How long does an M&A transaction typically take?",
                answer: "Timelines vary based on deal complexity, regulatory requirements, and negotiation dynamics. Simple transactions may close in 2-3 months, while complex cross-border deals can take 6-12 months. We work to expedite processes while ensuring thorough protection of your interests."
            },
            {
                question: "What role do you play in deal negotiations?",
                answer: "We lead or support negotiations on key deal terms, including valuation, representations and warranties, indemnities, conditions precedent, and post-closing adjustments. Our goal is to achieve optimal outcomes while maintaining deal momentum."
            },
            {
                question: "How do you handle confidentiality in M&A deals?",
                answer: "We implement robust confidentiality protocols including NDAs, clean team arrangements for sensitive information, and secure data room management. Protecting deal confidentiality is crucial for preventing market speculation and competitive risks."
            }
        ],
        relatedAttorneys: ["rajesh-sharma"]
    },
    {
        slug: "employment-law",
        name: "Employment Law",
        icon: "👥",
        shortDescription: "Expert guidance on all employment and labor law matters.",
        description: "Our Employment Law practice provides comprehensive advice on the full spectrum of workplace legal issues. We help employers navigate complex labor regulations, draft employment policies, handle disputes, and ensure compliance with evolving laws. Our proactive approach helps prevent issues before they escalate.",
        services: [
            "Employment Contracts and Policies",
            "Workplace Investigations",
            "Termination and Severance",
            "Labor Disputes and Litigation",
            "POSH Compliance",
            "Employee Benefits and Compensation",
            "Trade Union Matters"
        ],
        faqs: [
            {
                question: "What should be included in an employee handbook?",
                answer: "A comprehensive handbook should cover employment policies, code of conduct, leave policies, anti-harassment policies, grievance procedures, disciplinary processes, and confidentiality obligations. We customize handbooks to reflect your company culture while ensuring legal compliance."
            },
            {
                question: "How do you handle wrongful termination claims?",
                answer: "We assess the termination circumstances, review documentation, and develop defense strategies. We represent clients before labor courts and industrial tribunals. We also advise on settlement negotiations when appropriate to minimize exposure and disruption."
            },
            {
                question: "What are POSH compliance requirements?",
                answer: "Under the POSH Act, organizations with 10+ employees must constitute an Internal Committee, conduct awareness programs, and have a formal complaints mechanism. We help establish compliant frameworks and conduct ICC training sessions."
            }
        ],
        relatedAttorneys: ["priya-mehta"]
    },
    {
        slug: "intellectual-property",
        name: "Intellectual Property",
        icon: "💡",
        shortDescription: "Protecting and monetizing your valuable intellectual assets.",
        description: "Our Intellectual Property practice helps clients protect, manage, and leverage their creative and innovative assets. From trademark registration to patent litigation, we provide strategic IP counsel that aligns with business objectives. We work across industries including technology, pharmaceuticals, media, and consumer goods.",
        services: [
            "Trademark Registration and Protection",
            "Patent Prosecution",
            "Copyright Registration",
            "IP Licensing Agreements",
            "Trade Secret Protection",
            "IP Due Diligence",
            "IP Litigation and Enforcement"
        ],
        faqs: [
            {
                question: "How long does trademark registration take in India?",
                answer: "The trademark registration process typically takes 18-24 months if unopposed. We file applications strategically to maximize protection scope and handle any objections or oppositions that arise during the process."
            },
            {
                question: "What can be patented in India?",
                answer: "Inventions that are novel, non-obvious, and capable of industrial application can be patented. However, certain subject matter like mathematical methods, business methods, and computer programs per se are not patentable. We help identify patentable innovations and draft claims strategically."
            },
            {
                question: "How can I protect my trade secrets?",
                answer: "Trade secret protection requires implementing confidentiality agreements, access controls, and security measures. We help develop comprehensive trade secret protection programs and pursue remedies when misappropriation occurs."
            }
        ],
        relatedAttorneys: ["vikram-singh"]
    },
    {
        slug: "real-estate",
        name: "Real Estate",
        icon: "🏗️",
        shortDescription: "Full-service real estate legal support for all property matters.",
        description: "Our Real Estate practice advises on the full range of property transactions and development projects. We represent developers, investors, REITs, and corporates in acquisitions, leasing, joint developments, and financing. Our deep market knowledge helps clients navigate complex title issues and regulatory requirements.",
        services: [
            "Property Acquisitions and Sales",
            "Title Due Diligence",
            "Commercial Leasing",
            "Joint Development Agreements",
            "RERA Compliance",
            "Construction Contracts",
            "Real Estate Financing"
        ],
        faqs: [
            {
                question: "What does title due diligence involve?",
                answer: "Title due diligence involves examining ownership history, verifying documents, checking for encumbrances and litigation, reviewing approvals, and confirming clear marketable title. We provide detailed reports identifying risks and recommending mitigation measures."
            },
            {
                question: "What are RERA requirements for developers?",
                answer: "RERA requires project registration, disclosure of project details, deposit of 70% collections in escrow, and compliance with timelines. We help developers with registration, documentation, and ongoing compliance requirements."
            },
            {
                question: "How do you structure joint development agreements?",
                answer: "JDAs are structured based on factors like land contribution, construction costs, revenue sharing, project control, and exit mechanisms. We negotiate terms that protect landowner interests while enabling successful project execution."
            }
        ],
        relatedAttorneys: ["ananya-krishnan"]
    },
    {
        slug: "dispute-resolution",
        name: "Dispute Resolution",
        icon: "⚖️",
        shortDescription: "Strategic litigation and arbitration for complex disputes.",
        description: "Our Dispute Resolution practice represents clients in high-stakes commercial disputes before courts, tribunals, and arbitral forums. We are known for our thorough preparation, strategic thinking, and persuasive advocacy. Our team has successfully handled matters across the Supreme Court, High Courts, NCLT, and international arbitration venues.",
        services: [
            "Commercial Litigation",
            "International Arbitration",
            "Domestic Arbitration",
            "Mediation and Conciliation",
            "Insolvency Proceedings",
            "White Collar Defense",
            "Appellate Practice"
        ],
        faqs: [
            {
                question: "Should I opt for arbitration or court litigation?",
                answer: "Arbitration offers confidentiality, flexibility, and potentially faster resolution, but can be more expensive. Courts provide established procedures and appeal mechanisms. We analyze your specific dispute to recommend the most suitable forum."
            },
            {
                question: "How long does commercial litigation take in India?",
                answer: "Timelines vary significantly based on court, complexity, and case management. Commercial courts have expedited procedures, but matters can still take 2-5 years. We employ strategies to accelerate proceedings and obtain interim relief when needed."
            },
            {
                question: "What is the enforcement of foreign arbitral awards?",
                answer: "India is a signatory to the New York Convention, enabling enforcement of foreign awards. We handle enforcement proceedings and defend against challenges, navigating the procedural requirements for successful execution."
            }
        ],
        relatedAttorneys: ["arjun-kapoor"]
    },
    {
        slug: "banking-finance",
        name: "Banking & Finance",
        icon: "🏦",
        shortDescription: "Comprehensive legal solutions for financial transactions.",
        description: "Our Banking & Finance practice advises lenders, borrowers, and financial institutions on complex financing transactions. We have deep expertise in project finance, acquisition finance, debt restructuring, and regulatory compliance. Our team stays current with evolving RBI regulations and market practices.",
        services: [
            "Loan Documentation",
            "Project Finance",
            "Acquisition Finance",
            "Debt Restructuring",
            "Security Documentation",
            "Regulatory Compliance",
            "Fintech Advisory"
        ],
        faqs: [
            {
                question: "What is involved in loan documentation?",
                answer: "Loan documentation includes facility agreements, security documents (mortgages, pledges, guarantees), intercreditor agreements, and conditions precedent. We draft and negotiate documentation that protects lender interests while meeting borrower requirements."
            },
            {
                question: "How can you help with debt restructuring?",
                answer: "We advise on one-time settlements, debt-equity conversions, tenure extensions, and IBC proceedings. We negotiate with lenders, draft restructuring documentation, and help implement approved resolution plans."
            },
            {
                question: "What regulations apply to fintech companies?",
                answer: "Fintech companies must navigate RBI guidelines on digital lending, payment systems, and NBFCs. We help with licensing, compliance frameworks, and structuring arrangements to operate within regulatory boundaries."
            }
        ],
        relatedAttorneys: ["neha-gupta", "rajesh-sharma"]
    },
    {
        slug: "technology-law",
        name: "Technology Law",
        icon: "💻",
        shortDescription: "Legal expertise for the digital age and emerging technologies.",
        description: "Our Technology Law practice advises on the legal dimensions of digital business. From data privacy compliance to technology contracts, we help clients navigate the regulatory landscape while enabling innovation. Our team combines legal expertise with deep technology understanding.",
        services: [
            "Data Privacy Compliance",
            "Technology Contracts",
            "Software Licensing",
            "Cybersecurity Advisory",
            "AI and ML Governance",
            "E-commerce Regulations",
            "Cloud Computing Agreements"
        ],
        faqs: [
            {
                question: "How do I ensure data privacy compliance?",
                answer: "Compliance requires mapping data flows, implementing privacy policies, obtaining consents, ensuring security measures, and establishing data subject rights processes. We conduct gap assessments and help implement comprehensive privacy programs."
            },
            {
                question: "What should technology contracts include?",
                answer: "Key provisions include scope, SLAs, IP ownership, data handling, liability caps, indemnities, termination rights, and transition assistance. We negotiate terms that protect your interests while maintaining commercial relationships."
            },
            {
                question: "What are the legal considerations for AI deployment?",
                answer: "AI deployment raises issues around liability, bias, transparency, and data usage. We help develop AI governance frameworks, review training data rights, and ensure compliance with emerging regulations."
            }
        ],
        relatedAttorneys: ["vikram-singh"]
    }
];

export function getPracticeAreaBySlug(slug: string): PracticeArea | undefined {
    return practiceAreas.find(area => area.slug === slug);
}
