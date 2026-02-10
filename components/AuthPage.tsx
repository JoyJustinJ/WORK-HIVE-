import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Hexagon, Mail, Lock, User, ArrowRight, Github, Chrome, Key, Briefcase, Code, AlertCircle, Eye, EyeOff } from 'lucide-react';
import Button from './ui/Button';
import { UserRole } from '../types';
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signInWithPopup,
    updateProfile
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db, googleProvider, githubProvider } from '../firebaseConfig';

interface AuthPageProps {
    onLogin: (role: UserRole) => void;
    onBack: () => void;
}

const AuthPage: React.FC<AuthPageProps> = ({ onLogin, onBack }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(location.state?.isSignup ? false : true);
    const [loginMethod, setLoginMethod] = useState<'password' | 'key'>('password');
    const [role, setRole] = useState<UserRole>('freelancer');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Form states
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [fullName, setFullName] = useState('');

    const handleAuthError = (err: any) => {
        console.error("Auth Error:", err);
        let message = "An error occurred during authentication.";
        if (err.code === 'auth/user-not-found') message = "No account found with this email.";
        else if (err.code === 'auth/wrong-password') message = "Incorrect password.";
        else if (err.code === 'auth/email-already-in-use') message = "Email already in use.";
        else if (err.code === 'auth/invalid-credential') message = "Invalid credentials. Please check your config.";
        else if (err.code === 'auth/operation-not-allowed') message = "This login method is disabled in Firebase Console.";
        else if (err.code === 'auth/unauthorized-domain') message = "This domain is not authorized in Firebase Console.";
        else if (err.code === 'auth/popup-closed-by-user') message = "Login popup was closed before completion.";
        else if (err.code === 'auth/popup-blocked') message = "Login popup was blocked by your browser.";
        else if (err.message) message = err.message; // Fallback to raw message if available
        setError(message);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log(">>> [AUTH DEBUG] Submit button clicked. Role:", role);
        setLoading(true);
        setError(null);

        // Timeout fallback after 15 seconds to prevent eternal loading state
        const timeoutId = setTimeout(() => {
            console.error(">>> [AUTH DEBUG] Timeout reached!");
            setLoading(false);
            setError("Connection timeout. Please ensure 'Email/Password' authentication is enabled and Firestore is provisioned for project: auth-page-firebase.");
        }, 15000);

        try {
            if (isLogin) {
                // Log In
                console.log(">>> [AUTH DEBUG] Attempting Firebase Login with email:", email);
                const userCredential = await signInWithEmailAndPassword(auth, email, password);
                console.log(">>> [AUTH DEBUG] Firebase Auth Success. UID:", userCredential.user.uid);

                // Fetch role from Firestore
                console.log(">>> [AUTH DEBUG] Attempting to fetch profile from Firestore...");
                const docRef = doc(db, "hive_profiles", userCredential.user.uid);
                const docSnap = await getDoc(docRef);
                console.log(">>> [AUTH DEBUG] Firestore call finished. Exists:", docSnap.exists());

                clearTimeout(timeoutId);
                if (docSnap.exists()) {
                    onLogin(docSnap.data().role as UserRole);
                } else {
                    onLogin(role);
                }
            } else {
                // Sign Up
                console.log(">>> [AUTH DEBUG] Attempting Firebase Account Creation...");
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;
                console.log(">>> [AUTH DEBUG] Firebase Account Created. UID:", user.uid);

                // Update profile
                console.log(">>> [AUTH DEBUG] Updating user profile name...");
                await updateProfile(user, { displayName: fullName });

                // Save to Firestore
                console.log(">>> [AUTH DEBUG] Saving profile metadata to Firestore [hive_profiles]...");
                await setDoc(doc(db, "hive_profiles", user.uid), {
                    uid: user.uid,
                    displayName: fullName,
                    email: email,
                    role: role,
                    createdAt: new Date().toISOString()
                });
                console.log(">>> [AUTH DEBUG] Firestore Profile Saved Successfully.");

                clearTimeout(timeoutId);
                onLogin(role);
            }
        } catch (err: any) {
            console.error(">>> [AUTH DEBUG] Caught Exception:", err);
            clearTimeout(timeoutId);
            handleAuthError(err);
        } finally {
            setLoading(false);
        }
    };

    const handleSocialAuth = async (provider: any) => {
        setLoading(true);
        setError(null);
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            // Check if profile exists
            const docRef = doc(db, "hive_profiles", user.uid);
            const docSnap = await getDoc(docRef);

            if (!docSnap.exists()) {
                // Create profile if first time social login
                await setDoc(doc(db, "hive_profiles", user.uid), {
                    uid: user.uid,
                    displayName: user.displayName,
                    email: user.email,
                    role: role, // Use selected role
                    createdAt: new Date().toISOString()
                });
                onLogin(role);
            } else {
                onLogin(docSnap.data().role as UserRole);
            }
        } catch (err: any) {
            handleAuthError(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute inset-0 bg-space-gradient opacity-80 z-0"></div>
            <div className="absolute top-0 left-0 w-full h-full bg-[url(https://grainy-gradients.vercel.app/noise.svg)] opacity-20 z-0 pointer-events-none"></div>

            <div className="w-full max-w-md bg-black/40 backdrop-blur-xl border border-white/10 p-8 rounded-2xl shadow-glow relative z-10 animate-in fade-in zoom-in duration-500">
                <button onClick={onBack} className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors text-xs uppercase tracking-widest font-bold">
                    Close
                </button>

                <div className="flex justify-center mb-6">
                    <Hexagon onClick={() => navigate('/')} className="text-white fill-white shadow-glow cursor-pointer" size={48} />
                </div>

                <h2 className="text-3xl font-bold text-center mb-2 font-display uppercase tracking-wider">
                    {isLogin ? 'Welcome Back' : 'Join the Hive'}
                </h2>
                <p className="text-gray-400 text-center text-sm mb-6">
                    {isLogin ? 'Access your elite workspace' : 'Start your journey with top 1% talent'}
                </p>

                {error && (
                    <div className="mb-6 p-3 bg-red-500/10 border border-red-500/50 rounded-lg flex items-start gap-3 animate-in fade-in slide-in-from-top-2">
                        <AlertCircle className="text-red-500 shrink-0" size={18} />
                        <p className="text-xs text-red-200">{error}</p>
                    </div>
                )}

                {/* Role Selector */}
                <div className="mb-8">
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest text-center mb-3">I am a</p>
                    <div className="grid grid-cols-2 gap-4">
                        <button
                            type="button"
                            onClick={() => setRole('freelancer')}
                            className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all duration-300 ${role === 'freelancer' ? 'bg-white text-black border-white shadow-glow-sm' : 'bg-black/50 text-gray-400 border-white/10 hover:border-white/30 hover:bg-white/5'}`}
                        >
                            <Code size={20} className="mb-2" />
                            <span className="text-xs font-bold uppercase tracking-wider">Freelancer</span>
                        </button>
                        <button
                            type="button"
                            onClick={() => setRole('client')}
                            className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all duration-300 ${role === 'client' ? 'bg-white text-black border-white shadow-glow-sm' : 'bg-black/50 text-gray-400 border-white/10 hover:border-white/30 hover:bg-white/5'}`}
                        >
                            <Briefcase size={20} className="mb-2" />
                            <span className="text-xs font-bold uppercase tracking-wider">Client</span>
                        </button>
                    </div>
                </div>

                {isLogin && (
                    <div className="flex items-center gap-4 mb-6 border-b border-white/10">
                        <button
                            onClick={() => setLoginMethod('password')}
                            className={`flex-1 pb-2 text-xs font-bold uppercase tracking-widest transition-all border-b-2 ${loginMethod === 'password' ? 'text-white border-white' : 'text-gray-600 border-transparent hover:text-gray-400'}`}
                        >
                            Password
                        </button>
                        <button
                            onClick={() => setLoginMethod('key')}
                            className={`flex-1 pb-2 text-xs font-bold uppercase tracking-widest transition-all border-b-2 ${loginMethod === 'key' ? 'text-white border-white' : 'text-gray-600 border-transparent hover:text-gray-400'}`}
                        >
                            Security Key
                        </button>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    {!isLogin && (
                        <div className="space-y-1">
                            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Full Name</label>
                            <div className="relative group">
                                <User className="absolute left-3 top-3 text-gray-500 group-focus-within:text-white transition-colors" size={18} />
                                <input
                                    type="text"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    className="w-full bg-black/50 border border-white/10 rounded-lg py-2.5 pl-10 pr-4 text-sm text-white focus:border-white/50 focus:bg-black/80 outline-none transition-all placeholder-gray-600"
                                    placeholder="John Doe"
                                    required={!isLogin}
                                />
                            </div>
                        </div>
                    )}

                    {(!isLogin || loginMethod === 'password') && (
                        <>
                            <div className="space-y-1 animate-in fade-in">
                                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Email Address</label>
                                <div className="relative group">
                                    <Mail className="absolute left-3 top-3 text-gray-500 group-focus-within:text-white transition-colors" size={18} />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full bg-black/50 border border-white/10 rounded-lg py-2.5 pl-10 pr-4 text-sm text-white focus:border-white/50 focus:bg-black/80 outline-none transition-all placeholder-gray-600"
                                        placeholder="name@example.com"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-1 animate-in fade-in">
                                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Password</label>
                                <div className="relative group">
                                    <Lock className="absolute left-3 top-3 text-gray-500 group-focus-within:text-white transition-colors" size={18} />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full bg-black/50 border border-white/10 rounded-lg py-2.5 pl-10 pr-10 text-sm text-white focus:border-white/50 focus:bg-black/80 outline-none transition-all placeholder-gray-600"
                                        placeholder="••••••••"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-2.5 text-gray-500 hover:text-white transition-colors"
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>
                        </>
                    )}

                    {isLogin && loginMethod === 'key' && (
                        <div className="space-y-1 animate-in fade-in slide-in-from-right-2">
                            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Private Access Key</label>
                            <div className="relative group">
                                <Key className="absolute left-3 top-3 text-gray-500 group-focus-within:text-white transition-colors" size={18} />
                                <input
                                    type="password"
                                    className="w-full bg-black/50 border border-white/10 rounded-lg py-2.5 pl-10 pr-4 text-sm text-white focus:border-white/50 focus:bg-black/80 outline-none transition-all placeholder-gray-600 font-mono tracking-wider"
                                    placeholder="wh_live_8392..."
                                    required
                                />
                            </div>
                            <p className="text-[10px] text-gray-500 mt-2">Enter your 32-character encrypted identity key.</p>
                        </div>
                    )}

                    <Button fullWidth className="mt-6 font-display tracking-widest" disabled={loading}>
                        {loading ? 'Authenticating...' : (isLogin ? (loginMethod === 'key' ? 'VERIFY KEY' : `LOG IN AS ${role.toUpperCase()}`) : `CREATE ${role.toUpperCase()} ACCOUNT`)}
                        {!loading && <ArrowRight size={16} />}
                    </Button>
                </form>

                <div className="mt-6 flex items-center gap-4 text-xs text-gray-500">
                    <div className="h-px bg-white/10 flex-1"></div>
                    <span className="tracking-widest">OR CONTINUE WITH</span>
                    <div className="h-px bg-white/10 flex-1"></div>
                </div>

                <div className="flex gap-4 mt-6">
                    <button onClick={() => handleSocialAuth(githubProvider)} className="flex-1 py-2.5 border border-white/10 rounded-lg flex items-center justify-center gap-2 hover:bg-white hover:text-black transition-all duration-300 group">
                        <Github size={18} className="group-hover:scale-110 transition-transform" />
                        <span className="text-xs font-bold uppercase tracking-wider">GitHub</span>
                    </button>
                    <button onClick={() => handleSocialAuth(googleProvider)} className="flex-1 py-2.5 border border-white/10 rounded-lg flex items-center justify-center gap-2 hover:bg-white hover:text-black transition-all duration-300 group">
                        <Chrome size={18} className="group-hover:scale-110 transition-transform" />
                        <span className="text-xs font-bold uppercase tracking-wider">Google</span>
                    </button>
                </div>

                <p className="mt-8 text-center text-xs text-gray-400">
                    {isLogin ? "Don't have an account? " : "Already have an account? "}
                    <button
                        onClick={() => {
                            setIsLogin(!isLogin);
                            setLoginMethod('password');
                            setError(null);
                        }}
                        className="text-white font-bold hover:underline underline-offset-4 ml-1 tracking-wide"
                    >
                        {isLogin ? 'Sign Up' : 'Log In'}
                    </button>
                </p>
            </div>
        </div>
    );
};

export default AuthPage;