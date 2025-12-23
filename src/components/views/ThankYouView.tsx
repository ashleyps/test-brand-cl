import { motion } from 'framer-motion';
import { CheckCircle, Instagram, Linkedin, Facebook, Twitter, Youtube, Mail, MessageCircle } from 'lucide-react';

export const ThankYouView = () => {
    return (
        <motion.div
            className="w-full max-w-2xl mx-auto text-center px-4"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
        >
            {/* Icon */}
            <div className="flex justify-center mb-6 relative">
                <div className="absolute inset-0 bg-green-500/20 blur-2xl rounded-full" />
                <div className="relative bg-[var(--color-brand-teal-dark)] p-4 rounded-full border border-green-500/50 shadow-[0_0_20px_rgba(34,197,94,0.3)]">
                    <CheckCircle size={40} className="text-green-500" />
                </div>
            </div>

            {/* Title & Subtitle */}
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 font-display">
                ¡Gracias por tu Liderazgo!
            </h1>
            <p className="text-xl text-[var(--color-brand-teal)] font-medium mb-8">
                Tus respuestas han sido procesadas con éxito.
            </p>

            {/* Body Text */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-8 backdrop-blur-sm">
                <p className="text-white/80 text-lg leading-relaxed mb-6">
                    El "Analisis IA" que solicitaste está volando hacia tu correo en este momento. Dale unos minutos para que nuestros algoritmos terminen de cruzar los datos.
                </p>

                <div className="bg-[var(--color-brand-teal-dark)]/50 rounded-xl p-6 border border-[var(--color-brand-teal)]/30">
                    <h3 className="text-[var(--color-brand-orange)] font-bold uppercase tracking-wider text-sm mb-2">
                        MIENTRAS TANTO:
                    </h3>
                    <p className="text-white font-medium">
                        Revisa tu bandeja de entrada (y la de spam por si acaso) para asegurar que recibas el reporte sin problemas.
                    </p>
                </div>
            </div>

            {/* Pre-button Text */}
            <p className="text-white/80 mb-4 max-w-md mx-auto">
                Mientras llega el momento, mantente al día con contenido estratégico para tu marca:
            </p>

            {/* CTA Button */}
            <a
                href="https://instagram.com/capitanlogo"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 bg-[var(--color-brand-orange)] text-white hover:bg-orange-600 rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-[0_0_20px_rgba(255,102,0,0.4)] mb-8 gap-2 transform hover:scale-105"
            >
                <Instagram size={24} />
                Sígueme en Instagram
            </a>

            {/* Developed By Promo */}
            <div className="mb-10 text-sm">
                <p className="text-white/50">
                    Este Quiz fue desarrollado por <strong className="text-white">Capitán Logo</strong>.
                </p>
                <a
                    href="https://wa.me/+584122820000"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--color-brand-orange)] hover:text-white transition-colors font-medium mt-1 inline-block"
                >
                    ¿Necesitas uno para tu negocio?
                </a>
            </div>

            {/* Social Footer */}
            <div className="border-t border-white/10 pt-8">
                <div className="flex justify-center gap-6 flex-wrap">
                    <a href="https://www.facebook.com/capitanlogo" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-[var(--color-brand-orange)] transition-colors hover:scale-110 transform" title="Facebook">
                        <Facebook size={24} />
                    </a>
                    <a href="https://www.linkedin.com/company/capitanlogo/" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-[var(--color-brand-orange)] transition-colors hover:scale-110 transform" title="LinkedIn">
                        <Linkedin size={24} />
                    </a>
                    <a href="https://x.com/capitanlogo" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-[var(--color-brand-orange)] transition-colors hover:scale-110 transform" title="X (Twitter)">
                        <Twitter size={24} />
                    </a>
                    <a href="https://www.youtube.com/@capitanlogo" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-[var(--color-brand-orange)] transition-colors hover:scale-110 transform" title="YouTube">
                        <Youtube size={24} />
                    </a>
                    <a href="mailto:info@capitanlogo.com" className="text-white/60 hover:text-[var(--color-brand-orange)] transition-colors hover:scale-110 transform" title="Email">
                        <Mail size={24} />
                    </a>
                    <a href="https://wa.me/+584122820000" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-[var(--color-brand-orange)] transition-colors hover:scale-110 transform" title="WhatsApp">
                        <MessageCircle size={24} />
                    </a>
                </div>
            </div>
        </motion.div>
    );
};
