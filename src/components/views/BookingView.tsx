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

        window.Cal("init", "sesion-guia-digital", { origin: "https://app.cal.com" });

        window.Cal.ns["sesion-guia-digital"]("inline", {
            elementOrSelector: "#my-cal-inline-sesion-guia-digital",
            config: { "layout": "month_view", "theme": "light" },
            calLink: "capitanlogo/sesion-guia-digital",
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

    }, []);

    return (
        <motion.div
            className="w-full text-center space-y-8"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
        >
            <div className="space-y-1">
                {/* Header */}
                <div>
                    <h1 className="text-xl md:text-3xl font-bold text-white mb-2 leading-snug">
                        <span className="block text-[var(--color-brand-teal)]">Agenda tu Sesión Estratégica ⚓️</span>
                        <span>Estás a un paso de tomar el control de tu marca.</span>
                    </h1>
                    <p className="text-white/70 max-w-2xl mx-auto text-sm md:text-base mb-0">
                        Selecciona el horario que mejor te convenga para analizar tu situación actual y trazar tu plan de acción.
                    </p>
                </div>

                {/* Transparent Calendar Container with negative margin to pull it UP only on Desktop */}
                <div className="w-full max-w-[850px] mx-auto h-[600px] md:h-[750px] overflow-hidden mt-0 md:-mt-12">
                    <div style={{ width: "100%", height: "100%", overflow: "scroll" }} id="my-cal-inline-sesion-guia-digital"></div>
                </div>
            </div>
        </motion.div>
    );
};
