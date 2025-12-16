import { AnimatePresence } from 'framer-motion';
import { Layout } from './components/Layout';
import { useQuiz } from './hooks/useQuiz';
import { QuestionView } from './components/views/QuestionView';
import { LeadForm } from './components/views/LeadForm';
import { ResultsView } from './components/views/ResultsView';
import { ProgressBar } from './components/ui/ProgressBar';
import { SuccessView } from './components/views/SuccessView';

function App() {
  // Simple "Routing" check
  const path = window.location.pathname;
  // Check for various confirmation paths to be safe
  const isSuccessPage = path === '/confirmacion' || path === '/muchas-gracias' || path.includes('confirmacion');

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

  if (isSuccessPage) {
    return (
      <Layout maxWidth="max-w-2xl">
        <SuccessView />
      </Layout>
    );
  }

  return (
    <Layout
      maxWidth={currentStep === 8 ? "max-w-5xl" : "max-w-2xl"}
    >
      {currentStep <= 7 && (
        <ProgressBar
          current={currentStep}
          total={7}
          onBack={goBack}
          onNext={goToNextStep}
          hasAnswer={currentQuestion ? !!answers[currentQuestion.id] : false}
        />
      )}

      <AnimatePresence mode="wait">
        {currentStep <= 6 && currentQuestion && (
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
          />
        )}

        {currentStep === 8 && (
          <ResultsView
            key="results"
            score={totalScore}
            answers={answers}
            userInfo={userInfo}
          />
        )}
      </AnimatePresence>
    </Layout>
  )
}

export default App
