import { motion } from 'framer-motion';
import { DynamicIcon } from './DynamicIcon';

interface OptionButtonProps {
    label: string;
    iconName: string;
    selected?: boolean;
    onClick: () => void;
}

export const OptionButton = ({ label, iconName, selected, onClick }: OptionButtonProps) => {
    return (
        <motion.button
            onClick={onClick}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`
        w-full p-3 md:p-4 rounded-xl border-2 flex items-center space-x-4 transition-all duration-200 text-left outline-none group
        ${selected
                    ? 'bg-[var(--color-brand-orange)] border-white/50 shadow-[0_0_15px_rgba(249,115,22,0.4)] text-white scale-[1.02]'
                    : 'bg-white/5 border-white/10 text-white hover:bg-white/10 hover:border-white/30 hover:shadow-lg'
                }
      `}
        >
            <div className={`
        p-3 rounded-full flex-shrink-0 transition-colors
        ${selected
                    ? 'bg-white text-[var(--color-brand-orange)]'
                    : 'bg-white/10 text-[var(--color-brand-teal)] group-hover:text-[var(--color-brand-orange)]'
                }
      `}>
                <DynamicIcon name={iconName} size={24} />
            </div>
            <span className="text-lg font-medium flex-grow pr-2">{label}</span>
        </motion.button>
    );
};
