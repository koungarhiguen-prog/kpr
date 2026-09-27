import React, { useState, useEffect } from 'react';
import { PageView, BusinessKit, UserProfile } from './types';
import { storageService } from './services/storageService';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { LandingView } from './views/LandingView';
import { GeneratorView } from './views/GeneratorView';
import { ResultsView } from './views/ResultsView';
import { PricingView } from './views/PricingView';
import { AboutView } from './views/AboutView';
import { DashboardView } from './views/DashboardView';
import { AuthModal } from './components/AuthModal';

export default function App() {
  const [currentView, setCurrentView] = useState<PageView>('landing');
  const [activeKit, setActiveKit] = useState<BusinessKit | null>(null);
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  useEffect(() => {
    // Initialise kit and user from localStorage
    const savedUser = storageService.getCurrentUser();
    setCurrentUser(savedUser);

    const kit = storageService.getActiveKit();
    if (kit) {
      setActiveKit(kit);
    }
  }, []);

  const handleNavigate = (view: PageView) => {
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

  const handleLogout = () => {
    storageService.setCurrentUser(null);
    setCurrentUser(null);
    if (currentView === 'dashboard') {
      setCurrentView('landing');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#08090d] text-neutral-100 font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
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
      </main>

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onAuthSuccess={(user) => {
          setCurrentUser(user);
        }}
      />

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
