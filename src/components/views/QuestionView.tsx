import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import type { Question, Option } from '../../data/quizData';
import { OptionButton } from '../ui/OptionButton';


interface QuestionViewProps {
    question: Question;
    onAnswer: (option: Option) => void;
    onBack?: () => void;
    currentStep?: number;
}

export const QuestionView = ({ question, onAnswer, onBack, currentStep }: QuestionViewProps) => {
    return (
        <motion.div
            className="w-full flex flex-col gap-4 md:gap-6 relative"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
        >
            {/* Back Button */}
            {onBack && currentStep && currentStep > 1 && (
                <button
                    onClick={onBack}
                    className="absolute -top-12 left-0 md:-left-12 text-white/40 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full"
                    title="Volver"
                >
                    <ArrowLeft size={24} />
                </button>
            )}

            <div className="text-center space-y-2">
                <h2 className="text-[20px] md:text-[26px] font-bold leading-tight">
                    {question.title}
                </h2>
                {question.subtitle && (
                    <p className="text-white/60">{question.subtitle}</p>
                )}
            </div>

            <div className="grid gap-3 w-full">
                {question.options.map((option) => (
                    <OptionButton
                        key={option.id}
                        label={option.label}
                        iconName={option.iconName}
                        onClick={() => onAnswer(option)}
                    />
                ))}
            </div>
        </motion.div>
    );
};
