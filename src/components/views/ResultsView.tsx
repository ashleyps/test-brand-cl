import { motion } from 'framer-motion';
import { QUESTIONS } from '../../data/quizData';

interface ResultsViewProps {
    score: number;
    answers: Record<string, string>;
}

export const ResultsView = ({ score, answers }: ResultsViewProps) => {
    // Determine Tier
    let tier = '';
    let message = '';
    let ctaText = '';
    let ctaLink = '#'; // Placeholder

    const q1Id = answers['q1'];
    // Get Q1 Label
    const q1Question = QUESTIONS.find(q => q.id === 'q1');
    const q1Option = q1Question?.options.find(o => o.id === q1Id);
    const mainObstacle = q1Option?.label || 'tu estrategia digital';

    if (score <= 40) {
        tier = 'El Explorador';
        message = `Tienes una base, pero necesitas enfocarte en los fundamentos. Te enviamos la guía completa a tu email.`;
        ctaText = "Descarga la 'Ruta de Navegación'";
    } else if (score <= 80) {
        tier = 'Navegante Comprometido';
        message = `Estás cerca de zarpar, pero tu mayor reto es ${mainObstacle}.`;
        ctaText = "Agenda una Reunión de 15 Minutos";
        ctaLink = "https://calendly.com/placeholder/15min";
    } else {
        tier = 'Capitán Listo para Invertir';
        message = `¡Felicidades, Capitán! Tu diagnóstico es de ALTA PRIORIDAD. Vimos que tu reto principal es ${mainObstacle}.`;
        ctaText = "Agenda Reunión Estratégica (30 Min)";
        ctaLink = "https://calendly.com/placeholder/30min";
    }

    return (
        <motion.div
            className="w-full text-center space-y-8"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
        >
            <div className="space-y-2">
                <h3 className="text-[var(--color-brand-teal)] text-xl uppercase tracking-widest font-bold">Tu Resultado</h3>
                <h1 className="text-4xl md:text-5xl font-extrabold text-white">{tier}</h1>
                <div className="inline-block px-6 py-2 rounded-full bg-white/10 border border-white/20 mt-4">
                    <span className="text-2xl font-bold text-[var(--color-brand-orange)]">{score}/100</span> <span className="text-sm opacity-70">Puntos</span>
                </div>
            </div>

            <div className="bg-white/5 p-6 rounded-2xl border border-white/10 max-w-lg mx-auto">
                <p className="text-lg leading-relaxed opacity-90">
                    {message}
                </p>
            </div>

            <motion.a
                href={ctaLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block w-full md:w-auto px-8 py-4 bg-[var(--color-brand-orange)] text-white font-bold rounded-xl shadow-lg shadow-orange-500/20 hover:bg-orange-600 transition-all text-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                {ctaText}
            </motion.a>

            <p className="text-xs text-white/30 mt-8">
                Revisa tu correo electrónico para ver el reporte detallado.
            </p>
        </motion.div>
    );
};
