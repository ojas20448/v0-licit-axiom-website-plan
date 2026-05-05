export interface Attorney {
  slug: string;
  name: string;
  title: string;
  photo: string;
  email: string;
  phone: string;
  education: string[];
  experience: string[];
  practiceAreas: string[];
  bio: string;
}

export const attorneys: Attorney[] = [
  {
    slug: "rajesh-sharma",
    name: "Rajesh Sharma",
    title: "Managing Partner",
    photo: "/images/attorneys/rajesh-sharma.jpg",
    email: "rajesh.sharma@licitaxiom.com",
    phone: "+91 98765 43210",
    education: [
      "LL.M., Harvard Law School",
      "B.A. LL.B. (Hons.), National Law School of India University"
    ],
    experience: [
      "25+ years of legal practice",
      "Former Senior Partner at Amarchand Mangaldas",
      "Advised on landmark M&A transactions worth over $5 billion"
    ],
    practiceAreas: ["Corporate Law", "Mergers & Acquisitions", "Private Equity"],
    bio: "Rajesh Sharma is the Managing Partner of Licit Axiom and heads the Corporate and M&A practice. With over two decades of experience, he has advised major multinational corporations and Indian conglomerates on complex cross-border transactions. His expertise spans mergers and acquisitions, private equity investments, and corporate restructuring. Rajesh is recognized as a leading lawyer by Chambers Asia Pacific and Legal 500 Asia Pacific."
  },
  {
    slug: "priya-mehta",
    name: "Priya Mehta",
    title: "Senior Partner",
    photo: "/images/attorneys/priya-mehta.jpg",
    email: "priya.mehta@licitaxiom.com",
    phone: "+91 98765 43211",
    education: [
      "LL.M., University of Cambridge",
      "B.A. LL.B. (Hons.), NALSAR University of Law"
    ],
    experience: [
      "18+ years of legal practice",
      "Specialist in employment and labor law",
      "Handled 500+ employment disputes and litigation matters"
    ],
    practiceAreas: ["Employment Law", "Labor Relations", "Workplace Compliance"],
    bio: "Priya Mehta leads the Employment and Labor Law practice at Licit Axiom. She advises companies on all aspects of employment matters including hiring, termination, workplace policies, and regulatory compliance. Priya has successfully represented clients in numerous labor disputes before various tribunals and courts. She is known for her practical approach and deep understanding of both employer and employee perspectives."
  },
  {
    slug: "vikram-singh",
    name: "Vikram Singh",
    title: "Partner",
    photo: "/images/attorneys/vikram-singh.jpg",
    email: "vikram.singh@licitaxiom.com",
    phone: "+91 98765 43212",
    education: [
      "LL.M., Columbia Law School",
      "B.A. LL.B. (Hons.), Gujarat National Law University"
    ],
    experience: [
      "15+ years of legal practice",
      "Former in-house counsel at a Fortune 500 tech company",
      "Expertise in tech licensing and data privacy"
    ],
    practiceAreas: ["Intellectual Property", "Technology Law", "Data Privacy"],
    bio: "Vikram Singh heads the Intellectual Property and Technology practice. He advises clients on patent prosecution, trademark registration, IP licensing, and technology transactions. With his unique background as former in-house counsel, Vikram brings a business-oriented perspective to legal challenges. He is particularly renowned for his work in data privacy compliance and GDPR/IT Act matters."
  },
  {
    slug: "ananya-krishnan",
    name: "Ananya Krishnan",
    title: "Partner",
    photo: "/images/attorneys/ananya-krishnan.jpg",
    email: "ananya.krishnan@licitaxiom.com",
    phone: "+91 98765 43213",
    education: [
      "LL.M., London School of Economics",
      "B.A. LL.B. (Hons.), Symbiosis Law School"
    ],
    experience: [
      "12+ years of legal practice",
      "Specialist in real estate and infrastructure projects",
      "Advised on projects worth over ₹10,000 crores"
    ],
    practiceAreas: ["Real Estate", "Infrastructure", "Project Finance"],
    bio: "Ananya Krishnan is a Partner specializing in real estate and infrastructure law. She has extensive experience advising developers, investors, and financial institutions on complex real estate transactions, including land acquisitions, joint ventures, and REIT formations. Ananya has played a key role in several landmark infrastructure projects across India."
  },
  {
    slug: "arjun-kapoor",
    name: "Arjun Kapoor",
    title: "Partner",
    photo: "/images/attorneys/arjun-kapoor.jpg",
    email: "arjun.kapoor@licitaxiom.com",
    phone: "+91 98765 43214",
    education: [
      "LL.M., NYU School of Law",
      "B.A. LL.B. (Hons.), National Law University, Delhi"
    ],
    experience: [
      "14+ years of legal practice",
      "Former litigation associate at a Magic Circle firm",
      "Appeared before the Supreme Court of India"
    ],
    practiceAreas: ["Dispute Resolution", "Commercial Litigation", "Arbitration"],
    bio: "Arjun Kapoor heads the Dispute Resolution practice at Licit Axiom. He represents clients in complex commercial disputes before courts, tribunals, and arbitral forums. Arjun has significant experience in international arbitration under ICC, SIAC, and LCIA rules. He is known for his sharp analytical skills and persuasive advocacy."
  },
  {
    slug: "neha-gupta",
    name: "Neha Gupta",
    title: "Senior Associate",
    photo: "/images/attorneys/neha-gupta.jpg",
    email: "neha.gupta@licitaxiom.com",
    phone: "+91 98765 43215",
    education: [
      "LL.M., National University of Singapore",
      "B.A. LL.B. (Hons.), ILS Law College"
    ],
    experience: [
      "8+ years of legal practice",
      "Specialist in banking and finance",
      "Advised on financing transactions worth over $2 billion"
    ],
    practiceAreas: ["Banking & Finance", "Structured Finance", "Regulatory Compliance"],
    bio: "Neha Gupta is a Senior Associate in the Banking and Finance practice. She advises banks, financial institutions, and borrowers on a wide range of financing transactions including project finance, acquisition finance, and debt restructuring. Neha is well-versed in RBI regulations and has helped numerous fintech companies navigate the regulatory landscape."
  }
];

export function getAttorneyBySlug(slug: string): Attorney | undefined {
  return attorneys.find(attorney => attorney.slug === slug);
}

export function getAttorneysByPracticeArea(practiceArea: string): Attorney[] {
  return attorneys.filter(attorney => 
    attorney.practiceAreas.some(area => 
      area.toLowerCase().includes(practiceArea.toLowerCase())
    )
  );
}
