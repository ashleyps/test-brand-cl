import { motion } from 'framer-motion';
import { Ship, ArrowLeft, ArrowRight } from 'lucide-react';

interface ProgressBarProps {
    current: number;
    total: number;
    onBack?: () => void;
    onNext?: () => void;
    hasAnswer?: boolean;
}

export const ProgressBar = ({ current, total, onBack, onNext, hasAnswer }: ProgressBarProps) => {
    // Cap progress at 100%
    const percentage = Math.min((current / total) * 100, 100);

    return (
        <div className="w-full mb-2 md:mb-8 flex items-center justify-between gap-3">
            {/* Back Button */}
            <div className="w-8 h-8 shrink-0 flex items-center justify-center">
                {current > 1 && onBack && (
                    <button
                        onClick={onBack}
                        className="w-8 h-8 rounded-full bg-white/5 border border-white/10 text-[var(--color-brand-teal)] hover:bg-[var(--color-brand-teal)] hover:text-white transition-all flex items-center justify-center shadow-lg hover:shadow-[0_0_15px_rgba(67,174,186,0.5)] backdrop-blur-sm"
                        title="Anterior"
                    >
                        <ArrowLeft size={16} />
                    </button>
                )}
            </div>

            {/* Progress Bar Container */}
            <div className="flex-grow relative">
                {/* Labels */}
                <div className="absolute -top-6 left-0 w-full flex justify-between text-[12px] font-bold tracking-wider text-white/40 uppercase font-display">
                    <span>Puerto</span>
                    <span>Destino</span>
                </div>

                {/* Bar */}
                <div className="relative h-2 bg-white/10 rounded-full">
                    <motion.div
                        className="h-full bg-gradient-to-r from-[#1a5f6a] to-[var(--color-brand-teal)] rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                    />

                    {/* Ship Icon */}
                    <motion.div
                        className="absolute top-1/2 -translate-y-1/2 z-10"
                        initial={{ left: 0 }}
                        animate={{ left: `${percentage}%` }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        style={{ x: "-50%" }} // Center the icon on the point
                    >
                        <div className="bg-[var(--color-brand-dark)] p-1 rounded-full border border-[var(--color-brand-teal)] shadow-[0_0_10px_rgba(67,174,186,0.5)] w-8 h-8 flex items-center justify-center text-[var(--color-brand-orange)]">
                            <Ship size={14} />
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Next Button */}
            <div className="w-8 h-8 shrink-0 flex items-center justify-center">
                {hasAnswer && onNext && (
                    <button
                        onClick={onNext}
                        className="w-8 h-8 rounded-full bg-white/5 border border-white/10 text-[var(--color-brand-teal)] hover:bg-[var(--color-brand-teal)] hover:text-white transition-all flex items-center justify-center shadow-lg hover:shadow-[0_0_15px_rgba(67,174,186,0.5)] backdrop-blur-sm"
                        title="Siguiente"
                    >
                        <ArrowRight size={16} />
                    </button>
                )}
            </div>
        </div>
    );
};
