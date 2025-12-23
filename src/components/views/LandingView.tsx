import React, { useState } from 'react';
import { motion } from 'framer-motion';

export const LandingView = () => {
    const [formData, setFormData] = useState({ name: '', email: '' });
    const [utmParams, setUtmParams] = useState({
        country_code: '',
        utm_content: '',
        utm_campaign: ''
    });

    React.useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        setUtmParams({
            country_code: searchParams.get('country_code') || '',
            utm_content: searchParams.get('utm_content') || '',
            utm_campaign: searchParams.get('utm_campaign') || ''
        });
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.name && formData.email) {
            // Persist data for the quiz flow
            localStorage.setItem('landing_lead', JSON.stringify(formData));

            // Navigate to the test
            // Preserve URL parameters (UTM, Country Code) for the next step
            window.location.href = '/diagnostico-de-marca-personalizado' + window.location.search;
        }
    };

    const scrollToForm = () => {
        document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="min-h-screen bg-[var(--color-landing-bg)] text-white font-sans overflow-x-hidden relative">
            {/* Hero Background - Parallax Effect */}
            <div className="absolute top-0 left-0 w-full h-[101vh] z-0 overflow-hidden">
                {/* Background Image with Fixed Attachment */}
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed"
                    style={{
                        backgroundImage: 'url("/assets/landing/1-hero-illustration.webp")',
                    }}
                />

                {/* Elementor Style Overlay: #043345 @ 50% */}
                <div
                    className="absolute inset-0 z-10"
                    style={{
                        backgroundColor: '#043345',
                        opacity: 0.5
                    }}
                />

                {/* Bottom Fade Gradient for smooth transition */}
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[var(--color-landing-bg)] to-transparent z-10"></div>
            </div>

            {/* HEADER */}
            <header className="relative z-10 pt-4 pb-2 px-4 md:px-8 flex justify-center items-center max-w-7xl mx-auto">
                <div className="w-32 md:w-40 opacity-100">
                    <img src="/assets/landing/new-capitan-logo-w.svg" alt="Capitán Logo" className="w-full h-auto" />
                </div>
            </header>

            {/* HERO SECTION */}
            <section className="relative z-10 pb-20 px-4 text-center max-w-5xl mx-auto flex flex-col justify-center min-h-[101vh]">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4 md:space-y-6 -mt-10"
                >
                    <h1 className="text-3xl md:text-[60px] font-bold font-display leading-[1.1] drop-shadow-2xl tracking-tight">
                        Deja de Navegar <span className="text-[var(--color-landing-accent)]">a la Deriva</span>
                    </h1>

                    <p className="text-lg md:text-2xl text-gray-100 font-medium max-w-3xl mx-auto drop-shadow-lg">
                        Aquí tienes el Mapa Exacto para construir una marca imparable
                    </p>

                    <div className="max-w-4xl mx-auto space-y-4 text-xs md:text-lg text-gray-300 leading-relaxed md:leading-relaxed backdrop-blur-sm bg-black/10 p-4 rounded-xl border border-white/5">
                        <p>
                            ¿Lanzando una marca pero te sientes perdido en el inmenso océano digital? ¿Paralizado por no saber qué hacer primero: el logo, la web, el nombre? El 90% de los emprendedores se hunden antes de zarpar porque se enfocan en el 80% de las tareas que no generan resultados.
                        </p>
                        <p className="text-lg md:text-2xl text-gray-100 font-medium">
                            Esta guía gratuita te entrega el 20% de las acciones clave que sí lo hacen
                        </p>
                    </div>

                    <div className="pt-2 md:pt-4">
                        <button
                            onClick={scrollToForm}
                            className="group relative inline-flex items-center gap-3 bg-[var(--color-landing-accent)] text-white px-8 md:px-12 py-3 md:py-5 rounded-full text-lg md:text-xl font-bold hover:scale-105 transition-all duration-300 cursor-pointer border border-white/20 animate-pulse-ghl"
                        >
                            <span>¡Quiero mi Ruta de Navegación!</span>
                        </button>
                    </div>
                </motion.div>
            </section>

            {/* SHARED BACKGROUND SECTION (Form + Pain Points) */}
            <div className="relative z-20 bg-white w-full">
                {/* Continuous Background Image - Full Width */}
                <div className="absolute inset-0 w-full h-full bg-[url('/assets/landing/white-gray-background.svg')] bg-cover bg-center opacity-40 z-0"></div>

                {/* FORM SECTION */}
                <section id="lead-form" className="relative z-10 pt-16 pb-12 px-4">
                    <div className="max-w-xl mx-auto relative filter drop-shadow-2xl">
                        {/* Main Card Container */}
                        <div className="bg-[#043345] rounded-t-2xl p-8 pt-10 border-t border-white/10 relative">
                            <div className="text-center mb-8">
                                <h3 className="text-2xl md:text-3xl font-bold mb-2 font-display text-[var(--color-landing-accent)]">
                                    Descarga tu Mapa GRATIS <span className="text-white">y Toma el Timón de tu Marca</span>
                                </h3>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-5">
                                <input type="hidden" name="country_code" value={utmParams.country_code} />
                                <input type="hidden" name="utm_content" value={utmParams.utm_content} />
                                <input type="hidden" name="utm_campaign" value={utmParams.utm_campaign} />
                                <div>
                                    <input
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full bg-[#E2E8F0] border-none rounded-full px-6 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-landing-accent)] transition-all"
                                        placeholder="Nombre"
                                    />
                                </div>

                                <div>
                                    <input
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full bg-[#E2E8F0] border-none rounded-full px-6 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-landing-accent)] transition-all"
                                        placeholder="Correo Electrónico"
                                    />
                                </div>

                                <div className="pt-2">
                                    <button
                                        type="submit"
                                        className="w-full bg-[var(--color-landing-accent)] hover:bg-orange-600 text-white font-bold py-4 rounded-full shadow-lg hover:shadow-orange-900/40 transition-all duration-300 text-lg flex items-center justify-center gap-2 group transform hover:-translate-y-1"
                                    >
                                        <span>¡Quiero mi Ruta de Navegación!</span>
                                    </button>
                                </div>
                            </form>

                            {/* Chevron/Lines Decoration - Using Image */}
                            <div className="mt-6 flex justify-center opacity-90">
                                <img src="/assets/landing/lines.svg" alt="Decoración" className="w-3/4 md:w-full max-w-[280px]" />
                            </div>

                            <div className="mt-8 text-center text-xs text-gray-300 leading-tight font-light">
                                <p className="font-bold mb-2 text-white text-base">100% gratuito. Te enviaremos la guía directamente a tu email para que empieces a construir hoy mismo.</p>
                                <p className="opacity-60 text-[10px] leading-relaxed max-w-sm mx-auto">
                                    Al registrarte, aceptas recibir comunicaciones por correo electrónico de nuestra parte, las cuales pueden ser enviadas mediante tecnología automatizada. Tu información es confidencial y no vendemos tus datos personales a terceros. Puedes darte de baja en cualquier momento haciendo clic en el enlace al final de nuestros correos. Al enviar este formulario, aceptas nuestra Política de Privacidad y Términos y Condiciones.
                                </p>
                            </div>
                        </div>

                        {/* Chevron Bottom Shape - Connected seamlessly */}
                        <div className="w-full h-16 bg-[#043345] relative -mt-[1px]" style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }}></div>
                    </div>
                </section>

                {/* PAIN POINTS SECTION */}
                <section className="relative z-10 pt-8 pb-24 px-6 md:px-0">
                    <div className="max-w-[90%] md:max-w-[85%] lg:max-w-7xl mx-auto">
                        <h2 className="text-3xl md:text-[36px] font-bold font-display text-center mb-16 max-w-4xl mx-auto leading-tight text-[#043345]">
                            Construir una Marca No Debería Sentirse como <br />
                            <span className="text-[var(--color-landing-accent)]">Estar Perdido en una Tormenta</span>
                        </h2>

                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            {/* Left: Text List */}
                            <div className="space-y-6">
                                {[
                                    { title: "Parálisis por Análisis:", desc: "Tantas opciones que no sabes por dónde empezar." },
                                    { title: "Miedo a equivocarte:", desc: "Temes elegir un mal nombre o un logo que no funcione." },
                                    { title: "Dinero y Tiempo desperdiciado:", desc: "Inviertes en acciones de marketing que no traen clientes." },
                                    { title: "Falta de confianza:", desc: "Sientes que tu marca no se ve 'profesional' y eso te frena." },
                                ].map((item, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                        className="flex gap-4 items-start"
                                    >
                                        <div className="shrink-0 w-6 h-6 mt-1">
                                            <img src="/assets/landing/X-icon.svg" alt="X" className="w-full h-full" />
                                        </div>
                                        <div>
                                            <p className="text-[#043345] text-lg leading-relaxed">
                                                <span className="font-bold">{item.title}</span> {item.desc}
                                            </p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Right: Graphic */}
                            <div className="flex justify-center relative">
                                <div className="w-full relative z-10">
                                    <img
                                        src="/assets/landing/2-pain-point-graphic.webp"
                                        alt="Laberinto vs Claridad"
                                        className="w-full h-auto rounded-2xl shadow-2xl border border-[#043345]/10 transition-all duration-500 hover:scale-[1.02]"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Bottom Compass Note */}
                        <div className="mt-16 flex flex-col md:flex-row items-center gap-6 max-w-4xl mx-auto p-6 bg-orange-50/50 rounded-2xl border border-orange-100">
                            <div className="shrink-0 w-20 h-20 bg-white rounded-full p-2 shadow-md flex items-center justify-center">
                                <img src="/assets/landing/brujula.svg" className="w-[60px] h-[60px] animate-spin-slow" alt="Compass" />
                            </div>
                            <p className="text-gray-700 text-sm md:text-base leading-relaxed font-medium">
                                Esta no es otra guía teórica de 200 páginas. Es una <strong>Ruta de Navegación probada</strong>, un plan de acción 80/20 que te entrega el control y la claridad que necesitas para avanzar con confianza.
                            </p>
                        </div>
                    </div>
                </section>
            </div>

            {/* DARK SECTIONS WRAPPER (Solution + Final CTA) */}
            <div className="relative z-20 bg-[#043345]">
                <div className="absolute inset-0 w-full h-full bg-[url('/assets/landing/Dark-BG.svg')] bg-cover bg-center opacity-100 z-0"></div>

                {/* SOLUTION / VALUE PROP */}
                <section className="relative z-10 py-24 px-6 md:px-0 overflow-hidden">
                    <div className="max-w-[90%] md:max-w-[80%] lg:max-w-7xl mx-auto flex flex-col items-center">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-[36px] font-bold font-display text-white">
                                Dentro de tu <span className="text-[#ff6600]">Ruta de Navegación</span> Descubrirás:
                            </h2>
                        </div>

                        <div className="grid md:grid-cols-2 gap-16 items-center w-full">
                            <div className="relative">
                                <div className="absolute inset-0 bg-[#ff6600]/10 blur-[100px] rounded-full"></div>
                                <img src="/assets/landing/3-mapa-catalejo.webp" alt="Tu Mapa" className="relative z-10 w-full rounded-2xl shadow-2xl border border-white/10 transition-all duration-500 hover:scale-[1.02]" />
                            </div>

                            <div className="space-y-6">
                                {[
                                    { bold: "El Secreto para un Nombre", text: " que Impacta y se Recuerda (y cómo asegurarte de que esté disponible)." },
                                    { bold: "Cómo Crear un Logo 'Online Ready'", text: " que se vea profesional en tu web, en tu móvil y hasta en un favicon." },
                                    { bold: "La Estrategia para una Imagen Corporativa", text: " Coherente que genera confianza al instante." },
                                    { bold: "El Plan para Lanzar tu Sitio Web", text: " y Página de Enlaces sin gastar una fortuna." },
                                    { bold: "Las Tácticas de Marketing Digital", text: " (80/20) que realmente mueven la aguja y atraen clientes." },
                                    { bold: "El Roadmap Completo,", text: " de Cero a Marca Digital Sólida, paso a paso y sin relleno." }
                                ].map((benefit, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                        className="flex items-start gap-4"
                                    >
                                        <div className="shrink-0 mt-1">
                                            {/* Using brand teal for checkmarks */}
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M20 6L9 17L4 12" stroke="#43aeba" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </div>
                                        <span className="font-medium text-white text-base md:text-lg leading-relaxed">
                                            <strong>{benefit.bold}</strong>{benefit.text}
                                        </span>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* NEW SECTION: COMMANDERS/CAPTAINS (Image 4) */}
                <section className="relative z-10 py-24 px-6 md:px-0">
                    <div className="max-w-[90%] md:max-w-[80%] lg:max-w-7xl mx-auto">
                        <div className="text-center mb-24">
                            <h2 className="text-3xl md:text-[36px] font-bold font-display text-white">
                                Diseñado <span className="text-[#ff6600]">para Capitanes</span> de su Propio Barco
                            </h2>
                        </div>

                        <div className="grid md:grid-cols-2 gap-16 items-center">
                            {/* Text Left */}
                            <div className="space-y-8 pl-6 border-l-4 border-l-[#ff6600]">
                                <h3 className="text-2xl md:text-3xl font-bold text-white">
                                    Esta guía <span className="text-[#ff6600]">es para ti si:</span>
                                </h3>

                                <ul className="space-y-6">
                                    <li className="flex items-start gap-4 text-white text-lg leading-relaxed">
                                        <div className="shrink-0 mt-1">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M20 6L9 17L4 12" stroke="#ff6600" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </div>
                                        <span><span className="font-bold text-[var(--color-landing-accent)]">Eres un emprendedor</span> lanzando una nueva idea de negocio.</span>
                                    </li>
                                    <li className="flex items-start gap-4 text-white text-lg leading-relaxed">
                                        <div className="shrink-0 mt-1">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M20 6L9 17L4 12" stroke="#ff6600" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </div>
                                        <span><span className="font-bold text-[var(--color-landing-accent)]">Eres un freelancer o coach</span> que quiere construir una marca personal sólida.</span>
                                    </li>
                                    <li className="flex items-start gap-4 text-white text-lg leading-relaxed">
                                        <div className="shrink-0 mt-1">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M20 6L9 17L4 12" stroke="#ff6600" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </div>
                                        <span><span className="font-bold text-[var(--color-landing-accent)]">Tienes un negocio existente</span> pero sientes que tu presencia digital es débil o inconsistente.</span>
                                    </li>
                                    <li className="flex items-start gap-4 text-white text-lg leading-relaxed">
                                        <div className="shrink-0 mt-1">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M20 6L9 17L4 12" stroke="#ff6600" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </div>
                                        <span><span className="font-bold text-[var(--color-landing-accent)]">Buscas un plan de acción</span> claro y directo, 100% accionable, para obtener resultados.</span>
                                    </li>
                                </ul>
                            </div>

                            {/* Image Right (Image 4) */}
                            <div className="relative">
                                <img src="/assets/landing/4-people-map.webp" alt="Capitanes" className="w-full h-auto rounded-2xl shadow-2xl transition-all duration-500 hover:scale-[1.02]" />
                            </div>
                        </div>
                    </div>
                </section>

                {/* FINAL CTA SECTION (Image 5) */}
                <section className="relative z-10 py-24 px-6 md:px-0">
                    <div className="max-w-[90%] md:max-w-[80%] lg:max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-[36px] font-bold font-display text-white">
                                Por Primera Vez, <span className="text-[#ff6600]">Revelamos Nuestro <br />Mapa de Navegación</span> Interno.
                            </h2>
                        </div>

                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div>
                                <img src="/assets/landing/5-mapa-barco.webp" alt="Playbook Interno" className="w-full h-auto drop-shadow-2xl rounded-2xl border border-white/10 transition-all duration-500 hover:scale-[1.02]" />
                            </div>
                            <div className="space-y-8 text-left">
                                <div className="space-y-6 text-white text-lg leading-relaxed">
                                    <p>
                                        <strong className="text-white">No nos guardamos nada.</strong> Esta no es una guía teórica; es nuestro playbook interno, el mismo proceso paso a paso que usamos para llevar las ideas de nuestros clientes desde un concepto hasta una marca digital sólida y rentable.
                                    </p>
                                    <p>
                                        Deja de adivinar y empieza a construir con un plan que funciona.
                                    </p>
                                </div>

                                <div>
                                    <button
                                        onClick={scrollToForm}
                                        className="w-full md:w-auto bg-[#ff6600] hover:bg-orange-600 text-white font-bold px-8 py-4 rounded-full shadow-[0_4px_14px_0_rgba(255,102,0,0.39)] hover:shadow-[0_6px_20px_rgba(255,102,0,0.23)] hover:-translate-y-1 transition-all duration-300 text-xl"
                                    >
                                        ¡Quiero mi Ruta de Navegación!
                                    </button>
                                </div>

                                <p className="text-lg text-white/80 italic">
                                    100% gratuito. Te enviaremos la guía directamente a tu email para que empieces a construir hoy mismo.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* FOOTER */}
                <footer className="relative z-20 w-full pb-3 pt-4 md:py-6 bg-[#043345] -mt-[5px]">
                    <div className="max-w-5xl mx-auto px-4 flex flex-col items-center justify-center text-center">
                        <div className="w-32 opacity-100 mb-6">
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
            </div >
        </div >
    );
};
