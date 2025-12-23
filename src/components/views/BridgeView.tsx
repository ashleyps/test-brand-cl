import { motion } from 'framer-motion';
import { useEffect } from 'react';

export const BridgeView = () => {

    useEffect(() => {
        // GTM Event: Bridge Page View
        if (window.dataLayer) {
            window.dataLayer.push({
                'event': 'view_bridge',
                'paso': 'inicio_bridge'
            });
        }
    }, []);

    const navigateToQuiz = () => {
        // Clear previous quiz state to ensure we start at Step 1 (fresh)
        localStorage.removeItem('quiz_state_v2');
        window.location.href = '/test' + window.location.search; // Redirect to Quiz, preserving URL params
    };

    return (
        <div className="bg-[#043345] text-white font-sans overflow-x-hidden relative">

            {/* HERO CONTAINER: Forces 100dvh height */}
            <div className="h-[100dvh] w-full flex flex-col relative z-10">

                {/* HEADER */}
                <header className="shrink-0 pt-4 pb-2 px-4 flex justify-center w-full">
                    <div className="w-32 md:w-[160px] opacity-100">
                        <img src="/assets/landing/new-capitan-logo-w.svg" alt="Capitán Logo" className="w-full h-auto" />
                    </div>
                </header>

                {/* HERO CONTENT */}
                <section className="flex-grow flex flex-col justify-center items-center px-4 md:px-0 w-full max-w-6xl mx-auto overflow-hidden">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="flex flex-col items-center w-full h-full justify-center md:justify-center gap-2 md:gap-4 lg:gap-6"
                    >
                        {/* 1. IMAGE AREA */}
                        <div className="relative w-full shrink-0 flex justify-center z-0 md:-mt-8">
                            <div className="absolute inset-0 bg-[#ff6600]/20 blur-[40px] rounded-full transform scale-75"></div>

                            {/* Desktop Image - Pulled up, 160px logo match */}
                            <img
                                src="/assets/bridge/main-pack-diagnostico-marca-scaled.webp"
                                alt="Pack Desktop"
                                className="hidden md:block relative z-10 w-auto h-auto max-h-[60vh] drop-shadow-2xl"
                            />

                            {/* Mobile Image - Full Width (100%) - Pulled up closer to header */}
                            <img
                                src="/assets/bridge/header-movil.webp"
                                alt="Pack Mobile"
                                className="block md:hidden relative z-10 w-full h-auto drop-shadow-2xl -mt-24"
                            />
                        </div>

                        {/* 2. TEXT CONTENT - Adjusted space for mobile */}
                        <div className="text-center space-y-2 md:space-y-4 max-w-4xl mx-auto shrink-0 z-20 relative mt-4 md:-mt-[160px]">
                            {/* Tagline */}
                            <div className="inline-block border-b border-[#ff6600]/80 pb-0.5 mb-1">
                                <p className="text-base md:text-[22px] text-white font-medium tracking-wide">
                                    Tu Guía va en Camino...
                                </p>
                            </div>

                            {/* Main Headline */}
                            <h1 className="text-[26px] leading-[0.9] md:text-[40px] font-extrabold text-white font-display drop-shadow-lg px-2">
                                Pero Tu Verdadero <span className="text-[#ff6600]">Plan de Acción</span> <br /> Comienza Aquí.
                            </h1>

                            {/* Subtitle */}
                            <div className="text-gray-200 text-sm md:text-xl leading-snug px-4 md:px-0 max-w-2xl mx-auto">
                                <p className="hidden md:block">
                                    Hemos enviado la guía a tu correo. Mientras llega, descubre tus puntos ciegos y oportunidades ocultas en 90 segundos.
                                </p>
                                <p className="block md:hidden max-w-xs mx-auto">
                                    Descubre tus puntos ciegos y oportunidades ocultas en 90 segundos.
                                </p>
                            </div>
                        </div>

                        {/* 3. CTA BUTTON */}
                        <div className="pt-4 md:pt-4 pb-4 md:pb-0 shrink-0 z-30">
                            <button
                                onClick={navigateToQuiz}
                                className="group relative inline-flex items-center gap-2 bg-[var(--color-landing-accent)] text-white px-8 py-3 md:px-14 md:py-5 rounded-full text-lg md:text-2xl font-bold hover:scale-105 transition-all duration-300 cursor-pointer shadow-[0_4px_20px_rgba(255,102,0,0.4)] border border-white/20 animate-pulse-ghl"
                            >
                                <span>¡INICIAR DIAGNÓSTICO!</span>
                            </button>
                        </div>
                    </motion.div>
                </section>
            </div>

            {/* BENEFITS SECTION */}
            <div className="relative z-20 bg-[#043345] w-full">
                <section className="relative z-10 py-12 md:py-24 px-[3%] md:px-0">
                    <div className="max-w-[90%] md:max-w-[85%] lg:max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-2xl md:text-[36px] font-bold font-display text-white leading-tight">
                                Esto es Exactamente lo que Recibirás en tu <br />
                                <span className="text-[#ff6600]">Diagnóstico Gratuito:</span>
                            </h2>
                        </div>

                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            {/* Left: Text List */}
                            <div className="space-y-8">
                                <ul className="space-y-6">
                                    {/* Item 1 */}
                                    <li className="flex items-start gap-4 text-white text-lg leading-relaxed">
                                        <div className="shrink-0 mt-1">
                                            {/* Turquoise Checkmark */}
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M20 6L9 17L4 12" stroke="#43aeba" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </div>
                                        <span>
                                            <span className="block text-[#ff6600] font-bold text-xl mb-1">El punto ciego #1:</span>
                                            La debilidad más grande que está frenando tu crecimiento ahora mismo.
                                        </span>
                                    </li>

                                    {/* Item 2 */}
                                    <li className="flex items-start gap-4 text-white text-lg leading-relaxed">
                                        <div className="shrink-0 mt-1">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M20 6L9 17L4 12" stroke="#43aeba" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </div>
                                        <span>
                                            <span className="block text-[#ff6600] font-bold text-xl mb-1">La Oportunidad de Oro:</span>
                                            La acción de mayor impacto que puedes tomar esta semana.
                                        </span>
                                    </li>

                                    {/* Item 3 */}
                                    <li className="flex items-start gap-4 text-white text-lg leading-relaxed">
                                        <div className="shrink-0 mt-1">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M20 6L9 17L4 12" stroke="#43aeba" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </div>
                                        <span>
                                            <span className="block text-[#ff6600] font-bold text-xl mb-1">Tu Próximo Paso Claro:</span>
                                            La recomendación exacta de por dónde empezar a aplicar la guía.
                                        </span>
                                    </li>

                                    {/* Item 4: Novel Logic */}
                                    <li className="flex items-start gap-4 text-white text-lg leading-relaxed">
                                        <div className="shrink-0 mt-1">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M20 6L9 17L4 12" stroke="#43aeba" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </div>
                                        <span>
                                            <span className="block text-[#ff6600] font-bold text-xl mb-1">Algoritmo de Doble Dimensión:</span>
                                            Cruzamos tu <strong className="text-white">Intención</strong> con tu <strong className="text-white">Ejecución</strong> real para revelar por qué no estás creciendo.
                                        </span>
                                    </li>

                                    {/* Included Summary - Consolidated */}
                                    <li className="flex items-center gap-4 text-white text-lg leading-relaxed border-t border-white/10 pt-4 mt-2">
                                        <div className="shrink-0">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M20 6L9 17L4 12" stroke="#43aeba" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </div>
                                        <span className="font-medium text-gray-200">
                                            Incluye: <strong className="text-white">Análisis IA Completo</strong>, Puntuación de Solidez (0-100) y Detección de Fugas.
                                        </span>
                                    </li>
                                </ul>
                            </div>

                            {/* Right: Image */}
                            <div className="flex justify-center relative">
                                <div className="relative z-10 w-full hover:scale-[1.02] transition-transform duration-500">
                                    <div className="absolute inset-0 bg-[#ff6600]/10 blur-[60px] rounded-full"></div>
                                    <img
                                        src="/assets/bridge/3-Puntos-clave-diagnostico-de-marca.webp"
                                        alt="3 Puntos Clave"
                                        className="relative w-full h-auto rounded-xl shadow-2xl border border-white/10"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            {/* URGENCY / OTO SECTION */}
            <div className="relative z-20 bg-[#043345]">


                <section className="relative z-10 py-12 md:py-24 px-[3%] md:px-0">
                    <div className="max-w-[90%] md:max-w-4xl mx-auto">

                        {/* Alert Box Design */}
                        <div className="relative bg-gradient-to-br from-[#0c4a6e] to-[#043345] rounded-3xl p-8 md:p-12 border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden group">

                            {/* Animated Pulse Glow Background */}
                            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#ff6600]/20 blur-[100px] rounded-full animate-pulse-slow"></div>

                            <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 md:gap-12">

                                {/* Left: Warning Icon & Text */}
                                <div className="flex-1 text-center md:text-left space-y-6">
                                    <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                                        <div className="bg-yellow-500 rounded-full p-2 animate-bounce-slow">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                            </svg>
                                        </div>
                                        <h3 className="text-3xl md:text-4xl font-bold text-white tracking-wide uppercase font-display">
                                            Aviso Importante
                                        </h3>
                                    </div>

                                    <p className="text-gray-300 text-lg md:text-xl leading-relaxed">
                                        Esta es una <strong className="text-white">oferta de única vez</strong>. Una vez que cierres o actualices esta página, esta oportunidad desaparecerá para siempre.
                                    </p>

                                    {/* Bonus Highlight */}
                                    <div className="bg-emerald-900/30 border border-emerald-500/30 rounded-lg p-4">
                                        <p className="text-emerald-100 font-medium text-base md:text-lg leading-tight">
                                            <span className="text-2xl mr-2">🎁</span>
                                            <strong className="text-white block md:inline mb-1 md:mb-0">BONUS EXTRA:</strong>{' '}
                                            Dependiendo de tu resultado, podrías ganar una <span className="text-emerald-300 font-bold underline decoration-emerald-500/50 underline-offset-2">Consultoría Estratégica 1 a 1 de 20 minutos</span> totalmente gratis.
                                        </p>
                                    </div>
                                </div>

                                {/* Right: Timer / Action Visual */}
                                <div className="shrink-0 relative">
                                    {/* Clock/Timer Graphic Representation */}
                                    <div className="w-32 h-32 md:w-40 md:h-40 relative flex items-center justify-center">
                                        <div className="absolute inset-0 border-4 border-[#ff6600] rounded-full opacity-30"></div>
                                        <div className="absolute inset-0 border-4 border-[#ff6600] border-t-transparent rounded-full animate-spin-slow"></div>
                                        <div className="text-center">
                                            <span className="block text-4xl md:text-5xl font-bold text-white font-mono leading-none mb-1">00:00</span>
                                            <span className="block text-[10px] md:text-xs text-[#ff6600] font-bold uppercase tracking-widest leading-tight">
                                                Tiempo <br /> Agotándose
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Final Call to Action inside the alert */}
                            <div className="mt-8 md:mt-12 text-center">
                                <button
                                    onClick={navigateToQuiz}
                                    className="w-full md:w-auto bg-gradient-to-r from-[#ff6600] to-[#ff4500] hover:from-[#ff4500] hover:to-[#e63e00] text-white font-bold px-6 py-3 md:px-10 md:py-4 rounded-full shadow-[0_0_30px_rgba(255,102,0,0.4)] hover:shadow-[0_0_50px_rgba(255,102,0,0.6)] hover:-translate-y-1 transition-all duration-300 text-lg md:text-xl border border-white/20 flex items-center justify-center gap-2 mx-auto animate-pulse-ghl"
                                >
                                    <span>¡RECLAMAR MI DIAGNÓSTICO GRATUITO AHORA!</span>
                                    <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                                </button>
                                <p className="mt-3 text-white/40 text-xs uppercase tracking-wider">Sin compromiso de compra. 100% Gratuito hoy.</p>
                            </div>
                        </div>

                    </div>
                </section>

                {/* FOOTER */}
                <footer className="relative z-20 w-full pb-3 pt-4 md:py-6 bg-[#043345] -mt-[5px]">
                    <div className="max-w-5xl mx-auto px-4 flex flex-col items-center justify-center text-center">
                        <div className="w-24 md:w-32 opacity-100 mb-6">
                            <img src="/assets/landing/new-capitan-logo-w.svg" alt="Capitán Logo" className="w-full h-auto" />
                        </div>

                        {/* Footer Content */}
                        <div className="text-center text-xs text-white/30 flex-grow max-w-[600px]">
                            <div className="flex justify-center items-center gap-2 text-[10px] md:text-xs text-white/60 mb-2 whitespace-nowrap">
                                <a href="https://capitanlogo.com/politica-de-privacidad" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-landing-accent)] transition-colors">Política de Privacidad</a>
                                <span className="opacity-50">|</span>
                                <a href="https://capitanlogo.com/terminos-y-condiciones" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-landing-accent)] transition-colors">Términos y Condiciones</a>
                            </div>
                            <p className="text-[10px] text-white/50 leading-tight">© {new Date().getFullYear()} Capitán Logo. Connecta, Conquista y Crece.</p>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
};
