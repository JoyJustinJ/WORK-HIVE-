import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import LandingPage from './components/LandingPage';
import AuthPage from './components/AuthPage';
import Dashboard from './components/Dashboard';
import JobPostForm from './components/JobPostForm';
import FreelancerDiscovery from './components/FreelancerDiscovery';
import EscrowPaymentCard from './components/EscrowPaymentCard';
import AnalyticsPage from './components/AnalyticsPage';
import ContractsPage from './components/ContractsPage';
import MessagesPage from './components/MessagesPage';
import PaymentsPage from './components/PaymentsPage';
import SupportPage from './components/SupportPage';
import FindTalentPage from './components/FindTalentPage';
import FindWorkPage from './components/FindWorkPage';
import WhyWorkHivePage from './components/WhyWorkHivePage';
import EnterprisePage from './components/EnterprisePage';
import Chatbot from './components/Chatbot';
import { LanguageProvider } from './context/LanguageContext';
import { Job, Freelancer, UserRole, UserProfile } from './types';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import { auth, db } from './firebaseConfig';

// State management wrapper
const AppContent: React.FC = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeJob, setActiveJob] = useState<Job | null>(null);
  const [paymentStep, setPaymentStep] = useState<{ freelancer: Freelancer, amount: number } | null>(null);

  useEffect(() => {
    let profileUnsubscribe: (() => void) | null = null;

    const authUnsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Subscribe to real-time profile updates
        const docRef = doc(db, "hive_profiles", user.uid);

        // Unsubscribe from previous listener if exists (rare case but safe)
        if (profileUnsubscribe) profileUnsubscribe();

        profileUnsubscribe = onSnapshot(docRef, (docSnap) => {
          if (docSnap.exists()) {
            setUserProfile(docSnap.data() as UserProfile);
          } else {
            console.log(">>> [APP DEBUG] Profile not found yet (might be creating...)");
          }
          // We set authenticated even if profile is loading to allow UI to show up
          // Layout handles missing profile gracefully (as Guest) untill it loads
          setIsAuthenticated(true);
          setLoading(false);
        }, (error) => {
          console.error(">>> [APP DEBUG] Profile sync error:", error);
          setLoading(false);
        });

      } else {
        // User logged out
        if (profileUnsubscribe) {
          profileUnsubscribe();
          profileUnsubscribe = null;
        }
        setIsAuthenticated(false);
        setUserProfile(null);
        setLoading(false);
      }
    });

    return () => {
      authUnsubscribe();
      if (profileUnsubscribe) profileUnsubscribe();
    };
  }, []);

  const handleLogin = (role: UserRole) => {
    // Note: UserProfile will be set by the useEffect listener
    setIsAuthenticated(true);
    navigate('/dashboard');
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setIsAuthenticated(false);
      navigate('/');
    } catch (err) {
      console.error("Logout Error:", err);
    }
  };

  const handleJobSubmit = (job: Job) => {
    setActiveJob(job);
    navigate('/find-talent'); // Redirect to find talent for this job
  };

  const handleHire = (freelancer: Freelancer) => {
    // Trigger escrow flow
    setPaymentStep({ freelancer, amount: activeJob?.budget || 1000 });
  };

  // Protected Route Wrapper
  const ProtectedRoute = ({ children }: { children: React.ReactElement }) => {
    if (loading) return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
      </div>
    );
    if (!isAuthenticated) {
      return <Navigate to="/auth" replace />;
    }
    return children;
  };

  // Escrow Overlay Logic
  if (paymentStep) {
    return (
      <div className="min-h-screen bg-black/95 flex flex-col items-center justify-center p-4 relative">
        <div className="absolute inset-0 bg-[url(https://grainy-gradients.vercel.app/noise.svg)] opacity-20 pointer-events-none"></div>
        <div className="w-full max-w-lg relative z-10">
          <button
            onClick={() => setPaymentStep(null)}
            className="mb-4 text-xs text-gray-500 hover:text-white underline uppercase tracking-widest"
          >
            &larr; Abort Transaction
          </button>
          <EscrowPaymentCard
            amount={paymentStep.amount}
            freelancerName={paymentStep.freelancer.name}
            onComplete={() => {
              alert("Escrow funded successfully! Contract initialized in Secure Vault.");
              setPaymentStep(null);
              navigate('/contracts');
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/talent" element={<FindTalentPage />} />
        <Route path="/work" element={<FindWorkPage />} />
        <Route path="/why-hive" element={<WhyWorkHivePage />} />
        <Route path="/enterprise" element={<EnterprisePage />} />
        <Route path="/auth" element={<AuthPage onLogin={handleLogin} onBack={() => navigate('/')} />} />

        {/* Protected App Routes - Passing userRole to Layout to customize sidebar */}
        <Route path="/dashboard" element={<ProtectedRoute><Layout userProfile={userProfile} onLogout={handleLogout}><Dashboard userRole={userProfile?.role || 'client'} /></Layout></ProtectedRoute>} />
        <Route path="/post-job" element={<ProtectedRoute><Layout userProfile={userProfile} onLogout={handleLogout}><JobPostForm onSubmit={handleJobSubmit} /></Layout></ProtectedRoute>} />
        <Route
          path="/find-talent"
          element={
            <ProtectedRoute>
              <Layout userProfile={userProfile} onLogout={handleLogout}>
                <FreelancerDiscovery activeJob={activeJob} onHire={handleHire} />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route path="/payments" element={<ProtectedRoute><Layout userProfile={userProfile} onLogout={handleLogout}><PaymentsPage userRole={userProfile?.role || 'client'} /></Layout></ProtectedRoute>} />
        <Route path="/analytics" element={<ProtectedRoute><Layout userProfile={userProfile} onLogout={handleLogout}><AnalyticsPage /></Layout></ProtectedRoute>} />
        <Route path="/contracts" element={<ProtectedRoute><Layout userProfile={userProfile} onLogout={handleLogout}><ContractsPage /></Layout></ProtectedRoute>} />
        <Route path="/messages" element={<ProtectedRoute><Layout userProfile={userProfile} onLogout={handleLogout}><MessagesPage /></Layout></ProtectedRoute>} />
        <Route path="/support" element={<ProtectedRoute><Layout userProfile={userProfile} onLogout={handleLogout}><SupportPage /></Layout></ProtectedRoute>} />
      </Routes>
      <Chatbot />
    </>
  );
};

const App = () => {
  return (
    <LanguageProvider>
      <HashRouter>
        <AppContent />
      </HashRouter>
    </LanguageProvider>
  );
};

export default App;