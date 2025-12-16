import { motion } from 'framer-motion';
import { Ship } from 'lucide-react';

interface ProgressBarProps {
    current: number;
    total: number;
}

export const ProgressBar = ({ current, total }: ProgressBarProps) => {
    // Cap progress at 100%
    const percentage = Math.min((current / total) * 100, 100);

    return (
        <div className="w-full max-w-xl mx-auto mb-8 px-4 relative">


            <div className="w-full max-w-xl mx-auto mb-8 px-4">
                <div className="flex justify-between text-xs text-white/50 mb-2 font-display uppercase tracking-widest">
                    <span>Puerto</span>
                    <span>Destino</span>
                </div>
                <div className="relative h-2 bg-white/10 rounded-full overflow-visible">
                    {/* Fill Line */}
                    <motion.div
                        className="absolute left-0 top-0 h-full bg-[var(--color-brand-teal)] rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                    />

                    {/* Ship Icon Moving */}
                    <motion.div
                        className="absolute top-1/2 -translate-y-1/2 z-10"
                        initial={{ left: 0 }}
                        animate={{ left: `${percentage}%` }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        style={{ marginLeft: '-12px' }} // Center the icon
                    >
                        <div className="bg-[var(--color-brand-dark)] border-2 border-[var(--color-brand-teal)] p-1 rounded-full shadow-[0_0_15px_rgba(67,174,186,0.5)]">
                            <Ship size={16} className="text-[var(--color-brand-orange)] transform -rotate-12" />
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};
