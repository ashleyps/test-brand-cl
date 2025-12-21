import React from 'react';
import { motion } from 'framer-motion';
import { Compass, CheckCircle2 } from 'lucide-react';

interface IntroViewProps {
    onStart: () => void;
}

export const IntroView: React.FC<IntroViewProps> = ({ onStart }) => {
    return (
        <div className="w-full flex flex-col items-center justify-center flex-grow">
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center space-y-4 md:space-y-6 w-full max-w-lg mx-auto"
            >
                {/* Marine Icon Animated */}
                <div className="relative mb-2 flex items-center justify-center">
                    {/* Pulsing Effect */}
                    <motion.div
                        className="absolute inset-0 rounded-full bg-orange-500/20 blur-xl"
                        animate={{
                            scale: [1, 1.5, 1],
                            opacity: [0.3, 0.1, 0.3],
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />
                    <motion.div
                        className="absolute inset-0 rounded-full border border-orange-500/30"
                        animate={{
                            scale: [1, 2],
                            opacity: [1, 0],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeOut",
                        }}
                    />

                    <motion.div
                        animate={{ rotate: [0, 5, 0, -5, 0] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                        className="relative z-10"
                    >
                        <Compass
                            size={72}
                            className="text-[var(--color-brand-orange)] drop-shadow-[0_0_15px_rgba(249,115,22,0.5)] opacity-100"
                            strokeWidth={1.5}
                        />
                    </motion.div>
                </div>

                {/* Título */}
                <h1 className="text-3xl md:text-5xl font-black text-white text-center leading-tight tracking-tight">
                    ¡Tu marca puede <br className="md:hidden" />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-brand-orange)] to-[var(--color-brand-teal)]">
                        navegar más rápido!
                    </span>
                </h1>

                {/* Subtítulo */}
                <h2 className="text-lg md:text-xl text-blue-100/80 font-medium !font-sans text-center max-w-md mx-auto leading-relaxed px-4">
                    Descubre qué te detiene <br /> en menos de <span className="text-white">90 segundos.</span>
                </h2>

                {/* Lista Visual Compacta */}
                <div className="w-full max-w-xs mx-auto bg-white/5 rounded-xl p-4 backdrop-blur-sm border border-white/10 shadow-xl my-2">
                    <ul className="grid gap-2.5 text-left">
                        {[
                            "Puntuación de Solidez (0-100)",
                            "Detección de Fugas de Valor",
                            "Auditoría Estratégica",
                            "Ruta de Navegación (PDF)"
                        ].map((item, index) => (
                            <motion.li
                                key={index}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 + (index * 0.1) }}
                                className="flex items-center gap-3 text-gray-200 text-sm md:text-base"
                            >
                                <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-teal-400 shrink-0" />
                                <span className="font-medium leading-tight">{item}</span>
                            </motion.li>
                        ))}
                    </ul>
                </div>

                {/* Botón Principal (CTA) */}
                <div className="w-full pt-2 px-4 md:px-0">
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={onStart}
                        className="group relative w-full py-3 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full text-white font-bold text-xl md:text-2xl shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 transition-all overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                        <span className="relative flex items-center justify-center gap-2">
                            COMENZAR TEST
                            <span className="group-hover:translate-x-1 transition-transform">→</span>
                        </span>
                    </motion.button>
                </div>
            </motion.div>
        </div>
    );
};
