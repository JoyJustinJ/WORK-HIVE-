import { Freelancer, Translation } from './types';

export const APP_NAME = "Work Hive";

export const TRANSLATIONS: Translation = {
  dashboard: { en: "Dashboard", hi: "डैशबोर्ड" },
  findTalent: { en: "Find Talent", hi: "प्रतिभा खोजें" },
  postJob: { en: "Post a Job", hi: "नौकरी पोस्ट करें" },
  earnings: { en: "Revenue", hi: "राजस्व" },
  activeJobs: { en: "Active Contracts", hi: "सक्रिय अनुबंध" },
  pendingEscrow: { en: "Escrow Vault", hi: "एस्क्रो वॉल्ट" },
  aiInsights: { en: "Market Intelligence", hi: "बाजार आसूचना" },
  compatibility: { en: "AI Match", hi: "AI मिलान" },
  hireNow: { en: "Initiate Contract", hi: "अनुबंध शुरू करें" },
  verified: { en: "Elite Verified", hi: "सत्यापित" },
};

export const JOB_CATEGORIES = [
  "Development & IT",
  "Design & Creative",
  "Legal & Finance",
  "AI & Machine Learning",
  "Sales & Marketing",
  "Writing & Translation"
];

export const MOCK_FREELANCERS: Freelancer[] = [
  {
    id: 'f1',
    name: "Arjun Mehta",
    role: "Senior Full Stack Architect",
    location: "Mumbai, MH",
    skills: ["React", "Node.js", "System Design", "AWS"],
    hourlyRate: 2500, // INR
    languages: ["English", "Hindi", "Marathi"],
    rating: 5.0,
    verified: true,
    avatarUrl: "https://picsum.photos/200/200?random=1",
    bio: "Building enterprise-grade scalable systems for 8+ years."
  },
  {
    id: 'f2',
    name: "Priya Sharma",
    role: "Product Designer (UX/UI)",
    location: "Bangalore, KA",
    skills: ["Figma", "Design Systems", "Prototyping"],
    hourlyRate: 2000,
    languages: ["English", "Hindi", "Kannada"],
    rating: 4.9,
    verified: true,
    avatarUrl: "https://picsum.photos/200/200?random=2",
    bio: "Minimalist design philosophy. Ex-Unicorn startup designer."
  },
  {
    id: 'f3',
    name: "Rohan Das",
    role: "Growth Marketing Manager",
    location: "Delhi, DL",
    skills: ["SEO", "PPC", "Data Analytics"],
    hourlyRate: 1500,
    languages: ["English", "Hindi", "Punjabi"],
    rating: 4.7,
    verified: false,
    avatarUrl: "https://picsum.photos/200/200?random=3",
    bio: "Data-driven growth strategies for SaaS and E-commerce."
  },
   {
    id: 'f4',
    name: "Lakshmi Iyer",
    role: "Backend Lead",
    location: "Chennai, TN",
    skills: ["Python", "Go", "Microservices"],
    hourlyRate: 2200,
    languages: ["English", "Tamil"],
    rating: 4.95,
    verified: true,
    avatarUrl: "https://picsum.photos/200/200?random=4",
    bio: "Specialist in high-concurrency backend architecture."
  },
  {
    id: 'f5',
    name: "Aisha Khan",
    role: "AI/ML Engineer",
    location: "Hyderabad, TS",
    skills: ["PyTorch", "TensorFlow", "NLP", "Computer Vision"],
    hourlyRate: 3000,
    languages: ["English", "Hindi", "Urdu"],
    rating: 4.8,
    verified: true,
    avatarUrl: "https://picsum.photos/200/200?random=5",
    bio: "Specializing in generative AI models and natural language processing solutions."
  },
  {
    id: 'f6',
    name: "Vikram Singh",
    role: "Blockchain Developer",
    location: "Pune, MH",
    skills: ["Solidity", "Smart Contracts", "Web3.js", "Ethereum"],
    hourlyRate: 2800,
    languages: ["English", "Hindi", "Marathi"],
    rating: 4.6,
    verified: false,
    avatarUrl: "https://picsum.photos/200/200?random=6",
    bio: "Building decentralized applications and secure smart contracts for fintech."
  },
  {
    id: 'f7',
    name: "Sneha Patel",
    role: "Digital Marketing Specialist",
    location: "Ahmedabad, GJ",
    skills: ["Social Media", "Content Strategy", "Google Ads", "Analytics"],
    hourlyRate: 1200,
    languages: ["English", "Hindi", "Gujarati"],
    rating: 4.9,
    verified: true,
    avatarUrl: "https://picsum.photos/200/200?random=7",
    bio: "Helping brands scale through targeted digital campaigns and organic growth."
  },
  {
    id: 'f8',
    name: "Rahul Verma",
    role: "DevOps Engineer",
    location: "Noida, UP",
    skills: ["Docker", "Kubernetes", "CI/CD", "Azure"],
    hourlyRate: 2400,
    languages: ["English", "Hindi"],
    rating: 4.75,
    verified: true,
    avatarUrl: "https://picsum.photos/200/200?random=8",
    bio: "Automating infrastructure and streamlining deployment pipelines for high availability."
  }
];

export const SKILLS_TRENDING = [
  { name: "Generative AI Integration", growth: "+120%" },
  { name: "Blockchain Development", growth: "+45%" },
  { name: "Enterprise Security", growth: "+30%" },
];