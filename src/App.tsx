import { AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import { Layout } from './components/Layout';
import { useQuiz } from './hooks/useQuiz';
import { QuestionView } from './components/views/QuestionView';
import { IntroView } from './components/views/IntroView';
import { LeadForm } from './components/views/LeadForm';
import { ResultsView } from './components/views/ResultsView';
import { ProgressBar } from './components/ui/ProgressBar';
import { SuccessView } from './components/views/SuccessView';
import { LandingView } from './components/views/LandingView';

import { BridgeView } from './components/views/BridgeView';
import { BookingView } from './components/views/BookingView';
import { ThankYouView } from './components/views/ThankYouView';

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
    return <LandingView />;
  }

  if (isConfirmationPage) {
    return (
      <Layout maxWidth="max-w-2xl">
        <SuccessView />
      </Layout>
    );
  }

  if (isThankYouPage) {
    return (
      <Layout maxWidth="max-w-2xl">
        <ThankYouView />
      </Layout>
    );
  }

  if (isBookingPage) {
    return (
      <Layout maxWidth="max-w-5xl">
        <BookingView />
      </Layout>
    );
  }

  if (isBridgePage) {
    return <BridgeView />;
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
      </AnimatePresence>
    </Layout>
  )
}

export default App
