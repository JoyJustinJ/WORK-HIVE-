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
export const firebaseConfig = {
  apiKey: "AIzaSyDodgydp6jEGgW11sqQ-fFfWRbce-TW9Mk",
  authDomain: "work-hive-v2-dev-99.firebaseapp.com",
  projectId: "work-hive-v2-dev-99",
  storageBucket: "work-hive-v2-dev-99.firebasestorage.app",
  messagingSenderId: "202063207041",
  appId: "1:202063207041:web:e67733bc3d6b8fc67d8b80"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();

export default app;
