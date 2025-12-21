import type { ReactNode } from 'react';
import { motion } from 'framer-motion';



interface LayoutProps {
    children: ReactNode;
    maxWidth?: string;
}

export const Layout = ({ children, maxWidth = "max-w-2xl" }: LayoutProps) => {
    return (
        <div className="relative min-h-screen w-full overflow-hidden bg-[var(--color-brand-dark)] text-[var(--color-brand-white)] font-sans selection:bg-[var(--color-brand-orange)] selection:text-white">
            {/* Background Gradient - using CSS variables directly in style since Tailwind config might not map them exactly yet if not set up */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    background: `linear-gradient(to bottom, var(--color-brand-teal-dark), var(--color-brand-dark))`
                }}
            />

            {/* Subtle Animated Elements (Stars/Glows) */}
            <motion.div
                className="absolute top-[-10%] right-[-10%] w-96 h-96 rounded-full opacity-20 blur-3xl"
                style={{ backgroundColor: 'var(--color-brand-teal)' }}
                animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />

            <motion.div
                className="absolute bottom-[-10%] left-[-10%] w-96 h-96 rounded-full opacity-10 blur-3xl"
                style={{ backgroundColor: 'var(--color-brand-teal)' }}
                animate={{ scale: [1, 1.1, 1], opacity: [0.05, 0.15, 0.05] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            />

            {/* Header */}
            <header className="relative z-20 flex items-center justify-center py-2 px-4">
                <img src="/capitanlogo-logo.svg" alt="Capitán Logo" className="h-[35px] md:h-[58px] drop-shadow-lg" />
            </header>

            {/* Main Content */}
            <main className={`relative z-10 w-full ${maxWidth} mx-auto px-4 py-1 md:py-4 flex flex-col flex-grow justify-center items-center`}>
                {children}
            </main>

            {/* Footer */}
            <footer className="relative z-10 w-full pb-3 pt-4 md:py-6">
                <div className="max-w-5xl mx-auto px-4 flex items-center justify-center">
                    {/* Footer Content */}
                    <div className="text-center text-xs text-white/30 flex-grow max-w-[600px]">
                        <div className="flex justify-center items-center gap-2 text-[10px] md:text-xs text-white/60 mb-2 whitespace-nowrap">
                            <a href="https://capitanlogo.com/politica-de-privacidad" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-brand-teal)] transition-colors">Política de Privacidad</a>
                            <span className="opacity-50">|</span>
                            <a href="https://capitanlogo.com/terminos-y-condiciones" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-brand-teal)] transition-colors">Términos y Condiciones</a>
                        </div>
                        <p className="text-[10px] text-white/50 leading-tight">© {new Date().getFullYear()} Capitán Logo. Connecta, Conquista y Crece.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};
