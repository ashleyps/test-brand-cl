import { motion } from 'framer-motion';
import type { Question, Option } from '../../data/quizData';
import { OptionButton } from '../ui/OptionButton';


interface QuestionViewProps {
    question: Question;
    onAnswer: (option: Option) => void;
}

export const QuestionView = ({ question, onAnswer }: QuestionViewProps) => {
    return (
        <motion.div
            className="w-full flex flex-col gap-4 md:gap-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
        >
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
