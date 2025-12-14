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
        w-full p-4 rounded-xl border-2 flex items-center space-x-4 transition-all duration-200 text-left outline-none group
        ${selected
                    ? 'bg-[var(--color-brand-orange)] border-[var(--color-brand-orange)] text-white shadow-lg'
                    : 'bg-white/5 border-white/10 text-white hover:bg-white/10 hover:border-white/20'
                }
      `}
        >
            <div className={`
        p-3 rounded-full flex-shrink-0 transition-colors
        ${selected
                    ? 'bg-white text-[var(--color-brand-orange)]'
                    : 'bg-white/10 text-[var(--color-brand-teal)] group-hover:text-[var(--color-brand-orange)] group-hover:bg-white'
                }
      `}>
                <DynamicIcon name={iconName} size={24} />
            </div>
            <span className="text-lg font-medium flex-grow">{label}</span>

            {/* Radio Circle Indicator */}
            <div className={`ml-3 w-6 h-6 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-colors
         ${selected ? 'border-white bg-white' : 'border-white/30'}
      `}>
                {selected && <div className="w-3 h-3 rounded-full bg-[var(--color-brand-orange)]" />}
            </div>
        </motion.button>
    );
};
