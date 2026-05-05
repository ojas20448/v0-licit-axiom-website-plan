export interface BlogPost {
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    author: string;
    authorSlug: string;
    date: string;
    category: string;
    image?: string;
    readTime: string;
}

export const blogPosts: BlogPost[] = [
    {
        slug: "digital-personal-data-protection-act-2023",
        title: "Understanding the Digital Personal Data Protection Act, 2023: Key Implications for Businesses",
        excerpt: "A comprehensive overview of India's landmark data protection legislation and what it means for your organization's compliance strategy.",
        content: `
The Digital Personal Data Protection Act, 2023 (DPDPA) marks a watershed moment in India's data protection landscape. As businesses increasingly rely on personal data for operations, understanding this legislation is crucial for compliance and building customer trust.

## Key Provisions

### 1. Data Principal Rights
The Act grants individuals (referred to as "Data Principals") significant rights including:
- Right to access information about their personal data
- Right to correction and erasure
- Right to grievance redressal
- Right to nominate another person to exercise rights

### 2. Obligations of Data Fiduciaries
Organizations processing personal data ("Data Fiduciaries") must:
- Obtain valid consent before processing
- Ensure accuracy of data
- Implement reasonable security safeguards
- Delete data when purpose is fulfilled
- Report data breaches to the Data Protection Board

### 3. Significant Data Fiduciaries
Certain organizations designated as "Significant Data Fiduciaries" face additional obligations including:
- Appointing a Data Protection Officer based in India
- Conducting Data Protection Impact Assessments
- Periodic audits by independent data auditors

## Compliance Steps

Organizations should consider the following compliance roadmap:

1. **Data Mapping**: Identify what personal data you collect and process
2. **Consent Architecture**: Review and update consent mechanisms
3. **Policy Updates**: Revise privacy policies to meet DPDPA requirements
4. **Technical Measures**: Implement security safeguards and breach detection
5. **Vendor Assessment**: Review data processing agreements with vendors
6. **Training**: Educate employees on data protection obligations

## Penalties

The Act provides for significant financial penalties for non-compliance, with maximum penalties up to ₹250 crores for certain violations. This underscores the importance of robust compliance programs.

## Conclusion

The DPDPA represents a fundamental shift in India's approach to data protection. While subordinate rules are still awaited, organizations should begin their compliance journey now to avoid last-minute scrambles when enforcement begins.

*Our Technology Law practice is helping clients navigate DPDPA compliance. Contact us for a consultation.*
    `,
        author: "Vikram Singh",
        authorSlug: "vikram-singh",
        date: "2024-01-15",
        category: "Technology Law",
        readTime: "6 min read"
    },
    {
        slug: "navigating-commercial-lease-negotiations",
        title: "Navigating Commercial Lease Negotiations: Essential Terms Every Tenant Should Know",
        excerpt: "Key provisions to focus on when negotiating commercial leases and common pitfalls to avoid.",
        content: `
Commercial lease negotiations can significantly impact your business operations and finances for years to come. Understanding key terms and negotiation strategies is essential for protecting your interests.

## Critical Lease Terms

### 1. Rent and Escalation
- Base rent calculation (per sq. ft. or lump sum)
- Annual escalation (typically 5-15% every 2-3 years)
- Whether escalation is on base rent or including CAM charges

### 2. Lock-in Period and Exit
- Duration of lock-in (tenant cannot exit)
- Notice period required for termination
- Penalties for early termination
- Landlord's termination rights

### 3. Fit-out and Alterations
- Scope of permitted alterations
- Approval requirements
- Ownership of improvements at exit
- Reinstatement obligations

### 4. Maintenance and CAM Charges
- Common Area Maintenance (CAM) calculation
- Exclusions from CAM
- Audit rights for CAM statements
- Capital expenditure pass-through

### 5. Assignment and Sub-letting
- Consent requirements (not to be unreasonably withheld)
- Conditions for permitted transfers
- Group company transfers

## Negotiation Strategies

**For Tenants:**
- Start negotiations early to maintain leverage
- Benchmark rents against comparable properties
- Negotiate rent-free fit-out periods
- Seek caps on CAM increases
- Include growth-based exit flexibility

**Common Pitfalls to Avoid:**
- Not reviewing the entire lease before signing
- Ignoring reinstatement obligations
- Underestimating CAM charges
- Accepting personal guarantees unnecessarily

## Due Diligence Before Signing

Before executing a lease, ensure:
- Title verification of the landlord
- Building approvals and occupancy certificate
- No pending litigation affecting the property
- Clarity on shared facilities access

## Conclusion

A well-negotiated commercial lease protects your business interests and provides operational flexibility. Investing in legal review upfront can save significant costs and disputes later.

*Our Real Estate practice regularly advises tenants and landlords on commercial leasing. Reach out for lease review services.*
    `,
        author: "Ananya Krishnan",
        authorSlug: "ananya-krishnan",
        date: "2024-01-08",
        category: "Real Estate",
        readTime: "5 min read"
    },
    {
        slug: "employment-law-updates-2024",
        title: "Employment Law Updates 2024: What Employers Need to Know",
        excerpt: "Recent developments in labor codes, POSH Act enforcement, and workplace compliance requirements.",
        content: `
The employment law landscape in India continues to evolve with new regulations, increased enforcement, and changing workplace norms. Here's what employers need to know for 2024.

## Labor Codes Status

The four labor codes – Wages, Industrial Relations, Social Security, and Occupational Safety – are awaiting final notification of rules by states. While pending, the existing laws remain in force. Key changes to prepare for include:

- Unified wage definition affecting PF and gratuity calculations
- Simplified compliance with single license for establishments
- Changed overtime and working hours provisions
- Gig worker social security provisions

## POSH Act Enforcement

We're seeing increased vigilance on Prevention of Sexual Harassment compliance:

### Recent Trends
- Regular inquiries from District Officers
- Scrutiny of Annual Return filings
- Increased complaints being formally reported
- Higher expectations for investigation quality

### Compliance Priorities
1. Ensure IC members' terms haven't expired (3-year maximum)
2. Conduct annual awareness training (document attendance)
3. File Annual Returns before January 31
4. Display POSH policy prominently in workplaces
5. Review investigation procedures against recent case law

## Remote Work Policies

With hybrid work becoming permanent, policy updates needed include:

- **Working Hours**: Define flexible schedules and core hours
- **Equipment and Expenses**: Clarify reimbursement policies
- **Data Security**: Address home office security requirements
- **Health and Safety**: Extend coverage to home offices
- **Performance Management**: Adapt evaluation criteria

## Key Case Law Updates

Recent judicial decisions affecting employment practices:

1. **Retrenchment Compensation**: Courts increasingly scrutinizing compliance with Section 25F procedures
2. **Non-Compete Clauses**: Continued narrow interpretation limiting enforceability
3. **Surveillance**: Emerging privacy considerations for employee monitoring

## Recommended Actions

1. Audit current employment contracts against recent legal developments
2. Update employee handbooks with hybrid work policies
3. Refresh POSH training content and documentation
4. Review workforce classification (employee vs. contractor)
5. Prepare for labor code implementation

*Our Employment Law practice conducts comprehensive compliance audits. Contact us for an HR legal health check.*
    `,
        author: "Priya Mehta",
        authorSlug: "priya-mehta",
        date: "2024-01-02",
        category: "Employment Law",
        readTime: "7 min read"
    }
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
    return blogPosts.find(post => post.slug === slug);
}

export function getBlogPostsByCategory(category: string): BlogPost[] {
    return blogPosts.filter(post => post.category === category);
}
