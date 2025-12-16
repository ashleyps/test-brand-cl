import { motion } from 'framer-motion';
import { CheckCircle, Instagram, Linkedin, Facebook, Globe } from 'lucide-react';

export const SuccessView = () => {
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
                ¡Reunión Confirmada!
            </h1>
            <p className="text-xl text-[var(--color-brand-teal)] font-medium mb-8">
                Tu espacio en mi agenda está asegurado.
            </p>

            {/* Body Text */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-8 backdrop-blur-sm">
                <p className="text-white/80 text-lg leading-relaxed mb-6">
                    He recibido tu solicitud correctamente. Los detalles de conexión (Google Meet) están en tu correo.
                </p>

                <div className="bg-[var(--color-brand-teal-dark)]/50 rounded-xl p-6 border border-[var(--color-brand-teal)]/30">
                    <h3 className="text-[var(--color-brand-orange)] font-bold uppercase tracking-wider text-sm mb-2">
                        TU MISIÓN ANTES DE LA REUNIÓN:
                    </h3>
                    <p className="text-white font-medium">
                        Por favor, descarga y revisa la{" "}
                        <a
                            href="https://drive.google.com/file/d/1T-Y_xSyvmRy4AghcUCwI0-9pnq-Cucoq/view"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[var(--color-brand-orange)] hover:underline font-bold"
                        >
                            Ruta de Navegación
                        </a>
                        . Nos servirá de mapa para nuestra conversación.
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
                className="inline-flex items-center justify-center px-8 py-4 bg-[var(--color-brand-orange)] text-white hover:bg-orange-600 rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-[0_0_20px_rgba(255,102,0,0.4)] mb-12 gap-2 transform hover:scale-105"
            >
                <Instagram size={24} />
                Sígueme en Instagram
            </a>

            {/* Social Footer */}
            <div className="border-t border-white/10 pt-8">
                <p className="text-white/40 text-sm mb-4">Síguenos mientras esperas:</p>
                <div className="flex justify-center gap-6">
                    <a href="https://instagram.com/capitanlogo" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-[var(--color-brand-orange)] transition-colors hover:scale-110 transform">
                        <Instagram size={24} />
                    </a>
                    <a href="https://linkedin.com/company/capitanlogo" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-[var(--color-brand-orange)] transition-colors hover:scale-110 transform">
                        <Linkedin size={24} />
                    </a>
                    <a href="https://facebook.com/capitanlogo" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-[var(--color-brand-orange)] transition-colors hover:scale-110 transform">
                        <Facebook size={24} />
                    </a>
                    <a href="https://capitanlogo.com" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-[var(--color-brand-orange)] transition-colors hover:scale-110 transform">
                        <Globe size={24} />
                    </a>
                </div>
            </div>
        </motion.div>
    );
};
