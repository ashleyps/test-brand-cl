import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QUESTIONS } from '../../data/quizData';
import { X } from 'lucide-react';


interface ResultsViewProps {
    score: number;
    answers: Record<string, string>;
    userInfo: { name: string; email: string } | null;
    onRestart: () => void;
}

declare global {
    interface Window {
        Cal: any;
    }
}

export const ResultsView = ({ score, answers, userInfo, onRestart }: ResultsViewProps) => {
    // EXTRACT SCORES based on Step ID
    // Intention: Steps 5-6

    const intentionScore = QUESTIONS
        .filter(q => q.stepId >= 5)
        .reduce((acc, q) => {
            const selectedOptionId = answers[q.id];
            if (!selectedOptionId) return acc;
            const option = q.options.find(o => o.id === selectedOptionId);
            return acc + (option?.points || 0);
        }, 0);

    const showCalendar = intentionScore > 30;
    const [showModal, setShowModal] = useState(showCalendar);

    // Determine Tier (Visual Label only)
    let tier = '';
    let message = '';

    const q1Id = answers['q1'];
    const q1Question = QUESTIONS.find(q => q.id === 'q1');
    const q1Option = q1Question?.options.find(o => o.id === q1Id);
    const mainObstacle = q1Option?.label || 'tu estrategia digital';

    if (score <= 40) {
        tier = 'El Explorador';
        message = `Tienes una base, pero necesitas enfocarte en los fundamentos. Te enviamos la guía completa a tu email.`;
    } else if (score <= 80) {
        tier = 'Navegante Comprometido';
        message = `Estás cerca de zarpar, pero tu mayor reto es ${mainObstacle}. Agéndate para revisar tu caso puntual.`;
    } else {
        tier = 'Capitán Listo para Invertir';
        message = `¡Felicidades, Capitán! Tu diagnóstico es de ALTA PRIORIDAD. Tu reto principal es ${mainObstacle}, vamos a solucionarlo.`;
    }

    // Initialize Cal.com logic
    useEffect(() => {
        if (!showCalendar) return;

        (function (C: any, A: string, L: string) {
            let p = function (a: any, ar: any) { a.q.push(ar); };
            let d = C.document;
            C.Cal = C.Cal || function () {
                let cal = C.Cal;
                let ar = arguments;
                if (!cal.loaded) {
                    cal.ns = {};
                    cal.q = cal.q || [];
                    d.head.appendChild(d.createElement("script")).src = A;
                    cal.loaded = true;
                }
                if (ar[0] === L) {
                    const api: any = function () { p(api, arguments); };
                    const namespace = ar[1];
                    api.q = api.q || [];
                    if (typeof namespace === "string") {
                        cal.ns[namespace] = cal.ns[namespace] || api;
                        p(cal.ns[namespace], ar);
                        p(cal, ["initNamespace", namespace]);
                    } else p(cal, ar);
                    return;
                }
                p(cal, ar);
            };
        })(window, "https://app.cal.com/embed/embed.js", "init");

        window.Cal("init", "sesion-guia-digital", { origin: "https://app.cal.com" });

        // Construct dynamic link with name/email if available
        let calLinkBase = "capitanlogo/sesion-guia-digital";
        if (userInfo) {
            calLinkBase += `?name=${encodeURIComponent(userInfo.name)}&email=${encodeURIComponent(userInfo.email)}`;
        }

        window.Cal.ns["sesion-guia-digital"]("inline", {
            elementOrSelector: "#my-cal-inline-sesion-guia-digital",
            config: { "layout": "month_view", "theme": "light" },
            calLink: calLinkBase,
        });

        window.Cal.ns["sesion-guia-digital"]("ui", {
            "theme": "light",
            "cssVarsPerTheme": { "light": { "cal-brand": "#ff6600" } },
            "hideEventTypeDetails": true,
            "layout": "month_view"
        });

        // Event listener for booking success
        const handleMessage = (event: MessageEvent) => {
            if (event.origin === "https://app.cal.com" || event.origin === "https://cal.com") {
                if (event.data.type === "bookingSuccessful" ||
                    event.data.event === "booking:successful" ||
                    (event.data.event && event.data.event.includes("scheduled"))) {

                    console.log("Reserva detectada en Cal.com, redirigiendo...");
                    setTimeout(() => {
                        window.location.href = "/confirmacion";
                    }, 4000);
                }
            }
        };

        window.addEventListener("message", handleMessage);
        return () => window.removeEventListener("message", handleMessage);

    }, [showCalendar, userInfo]);


    return (
        <>
            <AnimatePresence>
                {showModal && (
                    <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            className="bg-[#202a30] text-gray-200 p-8 rounded-3xl max-w-lg w-full relative shadow-2xl border border-[var(--color-brand-orange)]"
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                        >
                            <button
                                onClick={() => setShowModal(false)}
                                className="absolute top-4 right-4 text-white/30 hover:text-white transition-colors"
                            >
                                <X size={24} />
                            </button>

                            <h2 className="text-2xl md:text-3xl font-bold font-raleway mb-8 text-center leading-tight">
                                {message}
                            </h2>

                            <button
                                onClick={() => setShowModal(false)}
                                className="w-full py-4 bg-[var(--color-brand-orange)] text-white font-bold rounded-xl text-lg hover:bg-orange-600 transition-all shadow-lg shadow-orange-500/20 transform hover:scale-[1.02]"
                            >
                                Ver Disponibilidad
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.div
                className="w-full text-center space-y-8"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                {/* Score & Tier Title: ONLY show for Low Score (<= 40) logic, or if we want to hide it completely for high score as requested */}
                {!showCalendar && (
                    <div className="space-y-2">
                        <h3 className="text-[var(--color-brand-teal)] text-xl uppercase tracking-widest font-bold">Tu Resultado</h3>
                        <h1 className="text-4xl md:text-5xl font-extrabold text-white">{tier}</h1>
                        <div className="inline-block px-6 py-2 rounded-full bg-white/10 border border-white/20 mt-4">
                            <span className="text-2xl font-bold text-[var(--color-brand-orange)]">{score}/100</span> <span className="text-sm opacity-70">Puntos</span>
                        </div>
                    </div>
                )}

                {/* Main Content Area */}
                {showCalendar ? (
                    <div className="space-y-1">
                        {/* High Score Header (replaces the Tier title) */}
                        <div>
                            <h1 className="text-xl md:text-3xl font-bold text-white mb-2 leading-snug">
                                <span className="block text-[var(--color-brand-teal)]">¡Tierra a la vista! ⚓️</span>
                                <span>Tu diagnóstico indica que estás listo para zarpar.</span>
                            </h1>
                            <p className="text-white/70 max-w-2xl mx-auto text-sm md:text-base mb-0">
                                Capitán, tienes las bases, pero necesitas un timonel experto para no navegar en círculos. He reservado este espacio para definir tu plan de ejecución en una Sesión Estratégica Gratuita. Elige tu horario abajo:
                            </p>
                        </div>

                        {/* Transparent Calendar Container with negative margin to pull it UP only on Desktop */}
                        <div className="w-full max-w-[850px] mx-auto h-[600px] md:h-[750px] overflow-hidden mt-0 md:-mt-12">
                            <div style={{ width: "100%", height: "100%", overflow: "scroll" }} id="my-cal-inline-sesion-guia-digital"></div>
                        </div>

                    </div>
                ) : (
                    <>
                        {/* Low Score Message & CTA */}
                        {!showModal && (
                            <motion.div
                                className="bg-white/5 p-6 rounded-2xl border border-white/10 max-w-lg mx-auto mb-8"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                            >
                                <p className="text-lg leading-relaxed opacity-90">
                                    Todo gran viaje comienza con un mapa. Tu puntuación indica que es el momento perfecto para construir tus cimientos digitales desde cero, sin vicios ni errores.
                                </p>
                            </motion.div>
                        )}

                        <motion.a
                            href="https://drive.google.com/file/d/1T-Y_xSyvmRy4AghcUCwI0-9pnq-Cucoq/view"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block w-full md:w-auto px-8 py-4 bg-[var(--color-brand-orange)] text-white font-bold rounded-xl shadow-lg shadow-orange-500/20 hover:bg-orange-600 transition-all text-lg"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Descarga la 'Ruta de Navegación'
                        </motion.a>
                    </>
                )}

                <div className="flex flex-col items-center gap-4 mt-8 pb-8">
                    {!showCalendar && (
                        <p className="text-xs text-white/30">
                            📩 Importante: Acabo de enviarte a tu correo un análisis detallado de por qué obtuviste este resultado y tu primera misión.
                        </p>
                    )}

                    <button
                        onClick={onRestart}
                        className="text-white/40 hover:text-[var(--color-brand-orange)] text-xs uppercase tracking-widest font-raleway transition-colors mt-4"
                    >
                        REINICIAR TEST
                    </button>

                </div>
            </motion.div>
        </>
    );
};
