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
    goToNextStep
  } = useQuiz();

  return (
    <Layout>
      {currentStep <= 7 && (
        <ProgressBar current={currentStep} total={8} />
      )}

      <AnimatePresence mode="wait">
        {currentStep <= 6 && currentQuestion && (
          <QuestionView
            key={currentQuestion.id}
            question={currentQuestion}
            onAnswer={handleAnswer}
          />
        )}

        {currentStep === 7 && (
          <LeadForm
            key="lead-form"
            answers={answers}
            totalScore={totalScore}
            onComplete={goToNextStep}
          />
        )}

        {currentStep === 8 && (
          <ResultsView
            key="results"
            score={totalScore}
            answers={answers}
          />
        )}
      </AnimatePresence>
    </Layout>
  )
}

export default App
