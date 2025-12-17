import { useEffect } from 'react';
import { motion } from 'framer-motion';

declare global {
    interface Window {
        Cal: any;
    }
}

export const BookingView = () => {
    // Initialize Cal.com logic
    useEffect(() => {
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

        window.Cal.ns["quiz-de-marca"]("ui", {
            "theme": "dark",
            "styles": {
                "branding": {
                    "brandColor": "#ff6600"
                }
            },
            "cssVarsPerTheme": {
                "light": { "cal-brand": "#ff6600" },
                "dark": { "cal-brand": "#ff6600" }
            },
            "hideEventTypeDetails": false,
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

    }, []);

    return (
        <motion.div
            className="w-full text-center space-y-8 flex flex-col items-center justify-center min-h-[60vh]"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
        >
            <div className="space-y-8 max-w-3xl mx-auto">
                {/* Header */}
                <div className="space-y-4">
                    <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight">
                        <span className="block text-[var(--color-brand-teal)] mb-2">Agenda tu Sesión Estratégica ⚓️</span>
                        <span>Estás a un paso de tomar el control.</span>
                    </h1>
                    <p className="text-white/70 text-lg md:text-xl leading-relaxed">
                        Selecciona el horario que mejor te convenga para analizar tu situación actual y trazar tu plan de acción.
                    </p>
                </div>

                {/* Action Button */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    <button
                        data-cal-namespace="quiz-de-marca"
                        data-cal-link="capitanlogo/quiz-de-marca"
                        data-cal-config='{"layout":"month_view"}'
                        className="group relative px-10 py-5 bg-[var(--color-brand-orange)] text-white font-bold rounded-2xl text-xl md:text-2xl shadow-xl shadow-orange-500/20 hover:bg-orange-600 hover:shadow-orange-500/40 transition-all transform hover:-translate-y-1 hover:scale-[1.02] overflow-hidden"
                    >
                        <span className="relative z-10 flex items-center justify-center gap-3">
                            🗓️ Abrir Calendario
                        </span>
                    </button>
                    <p className="text-sm text-gray-500 mt-4">
                        Se abrirá una ventana segura de Cal.com
                    </p>
                </motion.div>
            </div>
        </motion.div>
    );
};
