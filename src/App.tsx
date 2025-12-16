import { AnimatePresence } from 'framer-motion';
import { Layout } from './components/Layout';
import { useQuiz } from './hooks/useQuiz';
import { QuestionView } from './components/views/QuestionView';
import { LeadForm } from './components/views/LeadForm';
import { ResultsView } from './components/views/ResultsView';
import { ProgressBar } from './components/ui/ProgressBar';

function App() {
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

  return (
    <Layout maxWidth={currentStep === 8 ? "max-w-5xl" : "max-w-2xl"}>
      {currentStep <= 7 && (
        <ProgressBar current={currentStep} total={8} />
      )}

      <AnimatePresence mode="wait">
        {currentStep <= 6 && currentQuestion && (
          <QuestionView
            key={currentQuestion.id}
            question={currentQuestion}
            onAnswer={handleAnswer}
            onBack={goBack}
            currentStep={currentStep}
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
