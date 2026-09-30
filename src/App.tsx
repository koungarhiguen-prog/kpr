import React, { useState, useEffect } from 'react';
import { PageView, BusinessKit, UserProfile } from './types';
import { storageService } from './services/storageService';
import { supabaseService } from './services/supabaseService';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { LandingView } from './views/LandingView';
import { GeneratorView } from './views/GeneratorView';
import { ResultsView } from './views/ResultsView';
import { PricingView } from './views/PricingView';
import { AboutView } from './views/AboutView';
import { DashboardView } from './views/DashboardView';
import { LoginView } from './views/LoginView';
import { RegisterView } from './views/RegisterView';
import { ForgotPasswordView } from './views/ForgotPasswordView';
import { ResetPasswordView } from './views/ResetPasswordView';
import { AuthModal } from './components/AuthModal';
import { ScrollProgressBeam } from './components/GenerativeReveal';

export default function App() {
  const [currentView, setCurrentView] = useState<PageView>('landing');
  const [activeKit, setActiveKit] = useState<BusinessKit | null>(null);
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  useEffect(() => {
    // 1. Initialise Supabase user session with automatic detection
    supabaseService.getCurrentSessionUser().then((user) => {
      if (user) {
        setCurrentUser(user);
        storageService.setCurrentUser(user);
      } else {
        const saved = storageService.getCurrentUser();
        if (saved) setCurrentUser(saved);
      }
    });

    // 2. Subscribe to auth state changes (maintains session on reload)
    const { unsubscribe } = supabaseService.onAuthStateChange((user) => {
      setCurrentUser(user);
      storageService.setCurrentUser(user);
    });

    // 3. Initialise active kit from storage
    const kit = storageService.getActiveKit();
    if (kit) {
      setActiveKit(kit);
    }

    // 4. Handle URL path and recovery tokens (e.g. Supabase reset password link)
    const hash = window.location.hash;
    const path = window.location.pathname;

    if (hash.includes('type=recovery') || path === '/reset-password') {
      setCurrentView('reset-password');
    } else if (path === '/login') {
      setCurrentView('login');
    } else if (path === '/register') {
      setCurrentView('register');
    } else if (path === '/forgot-password') {
      setCurrentView('forgot-password');
    }

    return () => {
      unsubscribe();
    };
  }, []);

  const handleNavigate = (view: PageView) => {
    // Route protection: /dashboard requires authentication
    if (view === 'dashboard' && !currentUser) {
      setCurrentView('login');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleKitGenerated = (kit: BusinessKit) => {
    setActiveKit(kit);
    setCurrentView('results');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectKitFromDashboard = (kit: BusinessKit) => {
    setActiveKit(kit);
    storageService.setActiveKit(kit);
    setCurrentView('results');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogout = async () => {
    await supabaseService.signOut();
    storageService.setCurrentUser(null);
    setCurrentUser(null);
    setCurrentView('landing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAuthSuccess = (user: UserProfile) => {
    setCurrentUser(user);
    storageService.setCurrentUser(user);
    setIsAuthOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#08090d] text-neutral-100 font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Dynamic Generative Scroll Progress Beam */}
      <ScrollProgressBeam />

      {/* Top Navbar */}
      <Navbar
        currentView={currentView}
        onNavigate={handleNavigate}
        currentUser={currentUser}
        onOpenAuth={() => setIsAuthOpen(true)}
        onLogout={handleLogout}
      />

      {/* Main Content Router */}
      <main className="flex-1 w-full">
        {currentView === 'landing' && (
          <LandingView onNavigate={handleNavigate} />
        )}

        {currentView === 'generator' && (
          <GeneratorView
            currentUser={currentUser}
            onKitGenerated={handleKitGenerated}
            onNavigate={handleNavigate}
          />
        )}

        {currentView === 'results' && activeKit && (
          <ResultsView
            kit={activeKit}
            onNavigate={handleNavigate}
            onRegenerateKit={() => handleNavigate('generator')}
            onUpdateKit={(updated) => {
              setActiveKit(updated);
              storageService.saveKit(updated);
            }}
          />
        )}

        {currentView === 'results' && !activeKit && (
          <div className="max-w-md mx-auto py-20 px-4 text-center space-y-4">
            <p className="text-neutral-400">Aucun Business Kit sélectionné.</p>
            <button
              onClick={() => handleNavigate('generator')}
              className="px-5 py-2.5 rounded-xl bg-indigo-600 text-white font-semibold text-xs cursor-pointer"
            >
              Générer un kit
            </button>
          </div>
        )}

        {currentView === 'pricing' && (
          <PricingView onNavigate={handleNavigate} />
        )}

        {currentView === 'about' && (
          <AboutView onNavigate={handleNavigate} />
        )}

        {currentView === 'dashboard' && (
          <DashboardView
            currentUser={currentUser}
            onNavigate={handleNavigate}
            onSelectKit={handleSelectKitFromDashboard}
          />
        )}

        {currentView === 'login' && (
          <LoginView
            onNavigate={handleNavigate}
            onAuthSuccess={handleAuthSuccess}
          />
        )}

        {currentView === 'register' && (
          <RegisterView
            onNavigate={handleNavigate}
            onAuthSuccess={handleAuthSuccess}
          />
        )}

        {currentView === 'forgot-password' && (
          <ForgotPasswordView
            onNavigate={handleNavigate}
          />
        )}

        {currentView === 'reset-password' && (
          <ResetPasswordView
            onNavigate={handleNavigate}
          />
        )}
      </main>

      {/* Auth Modal (Pop-up fallback from quick actions) */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onAuthSuccess={handleAuthSuccess}
        onNavigate={handleNavigate}
      />

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
