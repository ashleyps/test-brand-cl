import { useState } from 'react';
import { QUESTIONS, type ModuleType, type Option } from '../data/quizData';

export interface QuizState {
    currentStep: number;
    selectedModule: ModuleType;
    answers: Record<string, string>; // questionId -> optionId
    score: number;
    history: string[]; // for back navigation if needed
}

export const useQuiz = () => {
    const [state, setState] = useState<QuizState>({
        currentStep: 1,
        selectedModule: null,
        answers: {},
        score: 0,
        history: [],
    });

    const currentQuestion = QUESTIONS.find((q) =>
        q.stepId === state.currentStep &&
        (q.moduleId === null || q.moduleId === state.selectedModule)
    );

    const handleAnswer = (option: Option) => {
        setState((prev) => {
            const newScore = prev.score + option.points;
            const newAnswers = { ...prev.answers, [currentQuestion?.id || '']: option.id };
            let newModule = prev.selectedModule;

            // If Q1, set module
            if (prev.currentStep === 1 && option.targetModule) {
                newModule = option.targetModule;
            }

            return {
                ...prev,
                score: newScore,
                answers: newAnswers,
                selectedModule: newModule,
                currentStep: prev.currentStep + 1,
                history: [...prev.history, currentQuestion?.id || ''],
            };
        });
    };

    const goToNextStep = () => {
        setState((prev) => ({
            ...prev,
            currentStep: prev.currentStep + 1,
        }));
    };

    const goBack = () => {
        setState((prev) => {
            if (prev.currentStep <= 1) return prev;
            return {
                ...prev,
                currentStep: prev.currentStep - 1
            }
        });
    };

    return {
        currentStep: state.currentStep,
        currentQuestion,
        selectedModule: state.selectedModule,
        totalScore: state.score,
        handleAnswer,
        goBack,
        goToNextStep,
        answers: state.answers,
        isFinished: state.currentStep > 6, // 7 is Form, 8 is Result
    };
};
