import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { QUESTIONS } from '../../data/quizData';


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

    // Determine Tier (Visual Label only)
    let tier = '';

    if (score <= 40) {
        tier = 'El Explorador';
    } else if (score <= 80) {
        tier = 'Navegante Comprometido';
    } else {
        tier = 'Capitán Listo para Triunfar';
    }

    // GTM Tracking Effect
    useEffect(() => {
        const dataLayer = (window as any).dataLayer || [];
        dataLayer.push({
            'event': 'avance_quiz',
            'paso': showCalendar ? 'resultado_calificado' : 'resultado_no_calificado'
        });
        (window as any).dataLayer = dataLayer;
    }, [showCalendar]);

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

        window.Cal("init", "quiz-de-marca", { origin: "https://app.cal.com" });

        // Configure styles for the popup - making it seamless with brand colors
        window.Cal.ns["quiz-de-marca"]("ui", {
            "hideEventTypeDetails": false,
            "layout": "month_view",
            "theme": "dark",
            "styles": {
                "branding": {
                    "brandColor": "#ff6600"
                }
            },
            "cssVarsPerTheme": {
                "light": { "cal-brand": "#ff6600" },
                "dark": { "cal-brand": "#ff6600" }
            }
        });

        // Event listener for booking success
        const handleMessage = (event: MessageEvent) => {
            if (event.origin === "https://app.cal.com" || event.origin === "https://cal.com") {
                if (event.data.type === "bookingSuccessful" ||
                    event.data.event === "booking:successful" ||
                    (event.data.event && event.data.event.includes("scheduled"))) {

                    console.log("Reserva detectada en Cal.com, redirigiendo...");
                    // Optional: You could show a specialized success modal here before redirect
                    setTimeout(() => {
                        window.location.href = "/confirmacion";
                    }, 2000);
                }
            }
        };

        window.addEventListener("message", handleMessage);
        return () => window.removeEventListener("message", handleMessage);

    }, [showCalendar]);


    return (
        <motion.div
            className="w-full text-center space-y-6"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
        >
            {/* Score & Tier Title: Show for EVERYONE */}
            <div className="space-y-2">
                <h3 className="text-[var(--color-brand-teal)] text-xl uppercase tracking-widest font-bold">Tu Resultado</h3>
                <h1 className="text-4xl md:text-5xl font-extrabold text-white">{tier}</h1>
                <div className="inline-block px-6 py-2 rounded-full bg-white/10 border border-white/20 mt-2">
                    <span className="text-2xl font-bold text-[var(--color-brand-orange)]">{score}/100</span> <span className="text-sm opacity-70">Puntos</span>
                </div>
            </div>

            {/* Main Content Area */}
            {showCalendar ? (
                <div className="space-y-6 py-4">
                    {/* High Score Header (replaces the Tier title) */}
                    <div>
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                        >
                            <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                                <span className="block text-[var(--color-brand-teal)] mb-2">¡Tierra a la vista! ⚓️</span>
                                <span>Estás listo para zarpar.</span>
                            </h1>
                        </motion.div>

                        <p className="text-gray-300 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed">
                            Capitán, tienes las bases, pero necesitas un timonel experto.
                            Hemos desbloqueado una <strong className="text-white">Sesión Estratégica Gratuita</strong> para trazar tu ruta.
                        </p>
                    </div>

                    {/* CTA Button to Trigger Cal.com Popup */}
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="flex flex-col items-center gap-4"
                    >
                        <button
                            data-cal-namespace="quiz-de-marca"
                            data-cal-link={`capitanlogo/quiz-de-marca?theme=dark&brandColor=ff6600${userInfo ? `&name=${encodeURIComponent(userInfo.name)}&email=${encodeURIComponent(userInfo.email)}` : ''}`}
                            data-cal-config='{"layout":"month_view"}'
                            className="group relative px-8 py-5 bg-[var(--color-brand-orange)] text-white font-bold rounded-2xl text-xl md:text-2xl shadow-xl shadow-orange-500/20 hover:bg-orange-600 hover:shadow-orange-500/40 transition-all transform hover:-translate-y-1 hover:scale-[1.02] overflow-hidden"
                        >
                            <span className="relative z-10 flex items-center gap-3">
                                📅 Agendar Misión Ahora
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-orange-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        </button>
                        <p className="text-sm text-gray-400 max-w-md">
                            * Espacios limitados. Se abrirá el calendario en pantalla completa.
                        </p>
                    </motion.div>

                </div>
            ) : (
                <>
                    {/* Low Score Message & CTA */}

                    <motion.div
                        className="bg-white/5 p-6 rounded-2xl border border-white/10 max-w-lg mx-auto mb-8"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <p className="text-lg leading-relaxed opacity-90">
                            Todo gran viaje comienza con un mapa. Tu puntuación indica que es el momento perfecto para construir tus cimientos digitales desde cero, sin vicios ni errores.
                        </p>
                    </motion.div>


                    <motion.button
                        onClick={() => window.location.href = '/muchas-gracias'}
                        className="inline-block w-full md:w-auto px-8 py-4 bg-[var(--color-brand-orange)] text-white font-bold rounded-xl shadow-lg shadow-orange-500/20 hover:bg-orange-600 transition-all text-lg"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        ✅ Entendido, Finalizar
                    </motion.button>
                </>
            )}

            <div className="flex flex-col items-center gap-4 mt-4 pb-8">
                {!showCalendar && (
                    <p className="text-[14px] text-white/80">
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
    );
};
