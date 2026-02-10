export type UserRole = 'client' | 'freelancer' | 'admin';

export interface UserProfile {
  uid: string;
  displayName: string;
  email: string;
  role: UserRole;
  createdAt: string;
  // Extended Profile Fields
  bio?: string;
  location?: string;
  skills?: string[]; // For freelancers
  companyName?: string; // For clients
  website?: string;
  avatarUrl?: string;
}

export interface Freelancer {
  id: string;
  name: string;
  role: string;
  location: string; // e.g., "Bangalore, KA"
  skills: string[];
  hourlyRate: number;
  languages: string[]; // e.g., ["English", "Hindi", "Kannada"]
  rating: number;
  verified: boolean;
  avatarUrl: string;
  bio: string;
}

export interface Job {
  id: string;
  title: string;
  description: string;
  budget: number;
  skillsRequired: string[];
  location: string;
}

export interface MatchResult {
  freelancerId: string;
  score: number; // 0-100
  reasoning: string;
}

export type Language = 'en' | 'hi';

export interface Translation {
  [key: string]: {
    en: string;
    hi: string;
  };
}