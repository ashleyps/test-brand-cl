import { useState, useEffect, useCallback } from 'react';
import { QUESTIONS, type ModuleType, type Option } from '../data/quizData';

declare global {
    interface Window {
        dataLayer: any[];
    }
}

export interface QuizState {
    currentStep: number;
    selectedModule: ModuleType;
    answers: Record<string, string>; // questionId -> optionId
    score: number;
    history: string[]; // for back navigation if needed
    userInfo: { name: string; email: string } | null;
}

const STORAGE_KEY = 'quiz_state_v2';

export const useQuiz = () => {
    const [state, setState] = useState<QuizState>(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                return JSON.parse(stored);
            }
        } catch (error) {
            console.error("Failed to load quiz state", error);
        }

        return {
            currentStep: 1,
            selectedModule: null,
            answers: {},
            score: 0,
            history: [],
            userInfo: null,
        };
    });

    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        } catch (error) {
            console.error("Failed to save quiz state", error);
        }
    }, [state]);

    const currentQuestion = QUESTIONS.find((q) =>
        q.stepId === state.currentStep &&
        (q.moduleId === null || q.moduleId === state.selectedModule)
    );

    const pushDataLayer = (stepName: string) => {
        if (typeof window !== 'undefined') {
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
                'event': 'avance_quiz',
                'paso': stepName
            });
        }
    };

    const handleAnswer = useCallback((option: Option) => {
        // Track question completion
        if (state.currentStep >= 1 && state.currentStep <= 6) {
            pushDataLayer(`pregunta_${state.currentStep}_completada`);
        }

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
    }, [currentQuestion, state.currentStep]);

    const setUserInfo = useCallback((name: string, email: string) => {
        setState((prev) => {
            if (prev.userInfo?.name === name && prev.userInfo?.email === email) {
                return prev;
            }
            return {
                ...prev,
                userInfo: { name, email },
            };
        });
    }, []);

    const goToNextStep = useCallback(() => {
        // Detect specific transitions for DataLayer
        if (state.currentStep === 0) {
            pushDataLayer('inicio_diagnostico');
        } else if (state.currentStep === 7) {
            pushDataLayer('registro_completado');
        }

        setState((prev) => ({
            ...prev,
            currentStep: prev.currentStep + 1,
        }));
    }, [state.currentStep]);

    const goBack = useCallback(() => {
        setState((prev) => {
            if (prev.currentStep <= 0) return prev;
            return {
                ...prev,
                currentStep: prev.currentStep - 1
            }
        });
    }, []);

    // --- Prevent accidental exit on Back Button ---
    useEffect(() => {
        // When step changes, push state to history so "Back" stays in app
        if (state.currentStep > 1) {
            window.history.pushState({ step: state.currentStep }, "");
        }

        const handlePopState = () => {
            // Check if we can go back internally
            if (state.currentStep > 1) {
                // Prevent browser from leaving (conceptually), just update react state
                // Popstate already changed URL/history, we just sync our state
                goBack();
            }
        };

        window.addEventListener("popstate", handlePopState);
        return () => window.removeEventListener("popstate", handlePopState);
    }, [state.currentStep, goBack]);

    const resetQuiz = useCallback(() => {
        try {
            localStorage.removeItem(STORAGE_KEY);
        } catch (error) {
            console.error("Failed to clear quiz state", error);
        }

        setState({
            currentStep: 1,
            selectedModule: null,
            answers: {},
            score: 0,
            history: [],
            userInfo: null,
        });
    }, []);

    return {
        currentStep: state.currentStep,
        currentQuestion,
        selectedModule: state.selectedModule,
        totalScore: state.score,
        handleAnswer,
        goBack,
        goToNextStep,
        setUserInfo,
        resetQuiz,
        userInfo: state.userInfo,
        answers: state.answers,
        isFinished: state.currentStep > 6, // 7 is Form, 8 is Result
    };
};
