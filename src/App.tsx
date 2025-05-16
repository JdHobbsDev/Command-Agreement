import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useAgreementForm } from './hooks/useAgreementForm';
import ProgressBar from './components/ProgressBar';
import WelcomeStep from './components/AgreementSteps/WelcomeStep';
import PersonalDetailsStep from './components/AgreementSteps/PersonalDetailsStep';
import AgreementsStep from './components/AgreementSteps/AgreementsStep';
import InformationStep from './components/AgreementSteps/InformationStep';
import ReviewStep from './components/AgreementSteps/ReviewStep';
import SuccessStep from './components/AgreementSteps/SuccessStep';
import SubmissionView from './components/SubmissionView';
import SettingsMenu from './components/SettingsMenu';
import { NotificationProvider } from './context/NotificationContext';
import { SettingsProvider } from './context/SettingsContext';
import { useEffect, useState } from 'react';

const Particle = ({ delay = 0 }: { delay?: number }) => {
  const randomX = Math.random() * 100;
  const randomSize = Math.random() * 3 + 1;
  const randomDuration = Math.random() * 20 + 10;

  return (
    <motion.div
      className="absolute rounded-full bg-primary-500/10"
      style={{
        width: `${randomSize}px`,
        height: `${randomSize}px`,
        left: `${randomX}%`,
        top: '-10px',
      }}
      initial={{ y: -10, opacity: 0 }}
      animate={{
        y: ['0%', '100vh'],
        opacity: [0, 0.5, 0]
      }}
      transition={{
        duration: randomDuration,
        repeat: Infinity,
        delay: delay,
        ease: 'linear'
      }}
    />
  );
};

const AnimatedBackground = () => {
  const particles = Array.from({ length: 20 }).map((_, i) => (
    <Particle key={i} delay={i * 0.5} />
  ));

  return <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">{particles}</div>;
};

function AgreementForm() {
  const {
    formData,
    currentStep,
    isSubmitting,
    error,
    updateFormData,
    nextStep,
    prevStep,
    resetForm,
    canProceed
  } = useAgreementForm();

  const [showParticles, setShowParticles] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowParticles(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-slate-950 transition-colors duration-500 relative overflow-hidden">
      {showParticles && <AnimatedBackground />}
      <main className="flex-grow container mx-auto px-4 py-8 flex flex-col items-center justify-center">
        <div className="max-w-3xl w-full mb-8">
          <ProgressBar currentStep={currentStep} />
        </div>

        {error && (
          <div className="max-w-2xl w-full mx-auto mb-4 p-4 bg-error-900/50 border border-error-800 rounded-lg text-white text-center">
            {error}
          </div>
        )}

        <AnimatePresence mode="wait">
          {currentStep === 'welcome' && (
            <WelcomeStep
              key="welcome"
              onNext={nextStep}
            />
          )}

          {currentStep === 'personal' && (
            <PersonalDetailsStep
              key="personal"
              formData={formData}
              updateFormData={updateFormData}
              onNext={nextStep}
              onPrev={prevStep}
              canProceed={canProceed()}
            />
          )}

          {currentStep === 'agreements' && (
            <AgreementsStep
              key="agreements"
              formData={formData}
              updateFormData={updateFormData}
              onNext={nextStep}
              onPrev={prevStep}
              canProceed={canProceed()}
            />
          )}

          {currentStep === 'information' && (
            <InformationStep
              key="information"
              formData={formData}
              updateFormData={updateFormData}
              onNext={nextStep}
              onPrev={prevStep}
              canProceed={canProceed()}
            />
          )}

          {currentStep === 'review' && (
            <ReviewStep
              key="review"
              formData={formData}
              onNext={nextStep}
              onPrev={prevStep}
              isSubmitting={isSubmitting}
            />
          )}

          {currentStep === 'success' && (
            <SuccessStep
              key="success"
              onReset={resetForm}
            />
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

function App() {
  return (
    <SettingsProvider>
      <NotificationProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<AgreementForm />} />
            <Route path="/submission/:id" element={<SubmissionView />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <SettingsMenu />
        </BrowserRouter>
      </NotificationProvider>
    </SettingsProvider>
  );
}

export default App;