import { AnimatePresence } from 'framer-motion';
import { useEffect, Suspense, lazy } from 'react';
import { Layout } from './components/Layout';
import { useQuiz } from './hooks/useQuiz';
import { ProgressBar } from './components/ui/ProgressBar';

// Lazy load views for better performance
const QuestionView = lazy(() => import('./components/views/QuestionView').then(module => ({ default: module.QuestionView })));
const IntroView = lazy(() => import('./components/views/IntroView').then(module => ({ default: module.IntroView })));
const LeadForm = lazy(() => import('./components/views/LeadForm').then(module => ({ default: module.LeadForm })));
const ResultsView = lazy(() => import('./components/views/ResultsView').then(module => ({ default: module.ResultsView })));
const SuccessView = lazy(() => import('./components/views/SuccessView').then(module => ({ default: module.SuccessView })));
const LandingView = lazy(() => import('./components/views/LandingView').then(module => ({ default: module.LandingView })));
const BridgeView = lazy(() => import('./components/views/BridgeView').then(module => ({ default: module.BridgeView })));
const BookingView = lazy(() => import('./components/views/BookingView').then(module => ({ default: module.BookingView })));
const ThankYouView = lazy(() => import('./components/views/ThankYouView').then(module => ({ default: module.ThankYouView })));

// Loading component
const LoadingSpinner = () => (
  <div className="flex justify-center items-center min-h-[50vh]">
    <div className="w-12 h-12 border-4 border-[var(--color-brand-orange)] border-t-transparent rounded-full animate-spin"></div>
  </div>
);

function App() {
  // Simple "Routing" check
  const path = window.location.pathname;
  // Check for various confirmation paths to be safe
  const isConfirmationPage = path === '/confirmacion' || path.includes('confirmacion');
  const isThankYouPage = path === '/muchas-gracias';
  const isBookingPage = path === '/agendar' || path.includes('agendar');
  const isBridgePage = path === '/diagnostico-personalizado' || path.includes('diagnostico-personalizado') || path.includes('diagnostico-de-marca-personalizado');
  const isLandingPage = path === '/';

  const {
    currentStep,
    currentQuestion,
    handleAnswer,
    answers,
    totalScore,
    goToNextStep,
    setUserInfo,
    userInfo,
    resetQuiz,
    goBack,
  } = useQuiz();

  // Hydrate user info from Landing Page if we are in the quiz flow
  useEffect(() => {
    if (!isLandingPage && !userInfo) {
      const storedLead = localStorage.getItem('landing_lead');
      if (storedLead) {
        try {
          const { name, email } = JSON.parse(storedLead);
          // Only update if we don't already have info (or overwrite? overwrite is safer to ensure consistency)
          if (name && email) {
            setUserInfo(name, email);
          }
        } catch (e) {
          console.error("Failed to parse landing lead data", e);
        }
      }
    }
  }, [isLandingPage, setUserInfo, userInfo]);

  if (isLandingPage) {
    return (
      <Suspense fallback={<LoadingSpinner />}>
        <LandingView />
      </Suspense>
    );
  }

  if (isConfirmationPage) {
    return (
      <Layout maxWidth="max-w-2xl">
        <Suspense fallback={<LoadingSpinner />}>
          <SuccessView />
        </Suspense>
      </Layout>
    );
  }

  if (isThankYouPage) {
    return (
      <Layout maxWidth="max-w-2xl">
        <Suspense fallback={<LoadingSpinner />}>
          <ThankYouView />
        </Suspense>
      </Layout>
    );
  }

  if (isBookingPage) {
    return (
      <Layout maxWidth="max-w-5xl">
        <Suspense fallback={<LoadingSpinner />}>
          <BookingView />
        </Suspense>
      </Layout>
    );
  }

  if (isBridgePage) {
    return (
      <Suspense fallback={<LoadingSpinner />}>
        <BridgeView />
      </Suspense>
    );
  }


  return (
    <Layout
      maxWidth={currentStep === 8 ? "max-w-5xl" : "max-w-2xl"}
    >
      {currentStep > 0 && currentStep <= 7 && (
        <ProgressBar
          current={currentStep}
          total={7}
          onBack={goBack}
          onNext={goToNextStep}
          hasAnswer={currentQuestion ? !!answers[currentQuestion.id] : false}
        />
      )}

      <AnimatePresence mode="wait">
        <Suspense fallback={<LoadingSpinner />}>
          {currentStep === 0 && (
            <IntroView key="intro" onStart={goToNextStep} />
          )}

          {currentStep > 0 && currentStep <= 6 && currentQuestion && (
            <QuestionView
              key={currentQuestion.id}
              question={currentQuestion}
              onAnswer={handleAnswer}
              currentAnswer={answers[currentQuestion.id]}
            />
          )}

          {currentStep === 7 && (
            <LeadForm
              key="lead-form"
              answers={answers}
              totalScore={totalScore}
              onComplete={goToNextStep}
              onUserInfo={setUserInfo}
              onRestart={resetQuiz}
              initialUserInfo={userInfo}
            />
          )}

          {currentStep === 8 && (
            <ResultsView
              key="results"
              score={totalScore}
              answers={answers}
              userInfo={userInfo}
              onRestart={resetQuiz}
            />
          )}
        </Suspense>
      </AnimatePresence>
    </Layout>
  )
}

export default App
