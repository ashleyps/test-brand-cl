import { motion } from 'framer-motion';
import { DynamicIcon } from './DynamicIcon';

interface OptionButtonProps {
    label: string;
    iconName: string;
    isSelected?: boolean;
    onClick: () => void;
}

export const OptionButton = ({ label, iconName, isSelected, onClick }: OptionButtonProps) => {
    return (
        <motion.button
            onClick={onClick}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`
        w-full p-2.5 md:p-4 rounded-xl border-2 flex items-center space-x-3 transition-all duration-200 text-left outline-none group
        ${isSelected
                    ? 'bg-[var(--color-brand-teal)]/10 border-[var(--color-brand-teal)] shadow-[0_0_15px_rgba(67,174,186,0.3)] text-white scale-[1.02]'
                    : 'bg-white/5 border-white/10 text-white hover:bg-white/10 hover:border-white/30 hover:shadow-lg'
                }
      `}
        >
            <div className={`
        p-2 rounded-full flex-shrink-0 transition-colors
        ${isSelected
                    ? 'bg-[var(--color-brand-teal)] text-white'
                    : 'bg-white/10 text-[var(--color-brand-teal)] group-hover:text-[var(--color-brand-orange)] group-active:text-[var(--color-brand-orange)]'
                }
      `}>
                <DynamicIcon name={iconName} size={20} />
            </div>
            <span className="text-base md:text-lg font-medium flex-grow pr-2">{label}</span>
        </motion.button>
    );
};
