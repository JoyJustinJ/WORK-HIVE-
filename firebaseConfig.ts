import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// This file serves as the documentation and initialization for the requested Firebase structure.

/**
 * FIREBASE FIRESTORE SCHEMA DESIGN
 * 
 * Collection: hive_profiles
 * Description: Stores freelancer user data.
 * Document Structure:
 * {
 *   uid: string,
 *   displayName: string,
 *   email: string,
 *   role: "freelancer" | "client",
 *   skills: string[],
 *   location: {
 *     city: string,
 *     state: string,
 *     country: "IN"
 *   },
 *   hourlyRate: number,
 *   languages: string[],
 *   verifiedBadge: boolean,
 *   regionalTags: string[], // e.g. ["mumbai_local", "hindi_speaker"]
 *   createdAt: timestamp
 * }
 */

// Replace these with actual config from Firebase Console
// Replace these with actual config from Firebase Console
export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();

export default app;
