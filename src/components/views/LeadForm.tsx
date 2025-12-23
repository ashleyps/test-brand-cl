import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Send, Loader2 } from 'lucide-react';
import { QUESTIONS } from '../../data/quizData';

interface LeadFormProps {
    answers: Record<string, string>;
    totalScore: number;
    onComplete: () => void;
    onUserInfo: (name: string, email: string) => void;
    onRestart: () => void;
    initialUserInfo?: { name: string; email: string } | null;
}

export const LeadForm = ({ answers, totalScore, onComplete, onUserInfo, onRestart, initialUserInfo }: LeadFormProps) => {
    const [formData, setFormData] = useState({ nombre: '', email: '' });
    const [utmParams, setUtmParams] = useState({
        country_code: '',
        utm_content: '',
        utm_campaign: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const isSubmittingRef = useRef(false);

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        setUtmParams({
            country_code: searchParams.get('country_code') || '',
            utm_content: searchParams.get('utm_content') || '',
            utm_campaign: searchParams.get('utm_campaign') || ''
        });
    }, []);
    const [error, setError] = useState('');
    const [hasAttemptedAutoSubmit, setHasAttemptedAutoSubmit] = useState(false);

    // Core submission logic extracted for reuse
    const submitData = async (data: { nombre: string; email: string }) => {
        if (isSubmittingRef.current) return;
        isSubmittingRef.current = true;
        setIsSubmitting(true);
        setError('');

        // Prepare Payload
        // Lookup points for detailed report
        const getPoints = (qIdPrefix: string) => {
            // Find question ID that starts with prefix (e.g. q2_A)
            // Since answers has full IDs like 'q2_A', we iterate answers
            const answeredId = Object.keys(answers).find(k => k.startsWith(qIdPrefix));
            if (!answeredId) return 0;

            const answerOptionId = answers[answeredId];
            const question = QUESTIONS.find(q => q.id === answeredId);
            const option = question?.options.find(o => o.id === answerOptionId);
            return option?.points || 0;
        };

        const getAnswerLabel = (qIdPrefix: string) => {
            const answeredId = Object.keys(answers).find(k => k.startsWith(qIdPrefix));
            if (!answeredId) return '';
            return answers[answeredId]; // Returns 'A', 'B', etc.
        };

        const getAnswerText = (qIdPrefix: string) => {
            const answeredId = Object.keys(answers).find(k => k.startsWith(qIdPrefix));
            if (!answeredId) return '';
            const answerOptionId = answers[answeredId];
            const question = QUESTIONS.find(q => q.id === answeredId);
            const option = question?.options.find(o => o.id === answerOptionId);
            return option?.label || '';
        };

        const payload = {
            nombre: data.nombre,
            email: data.email,
            puntuacion_total: totalScore,
            q1_dolor_principal: answers['q1'],
            q2_puntuacion: getPoints('q2'),
            q2_detalle: getAnswerLabel('q2'),
            q2_texto: getAnswerText('q2'),
            q3_puntuacion: getPoints('q3'),
            q3_detalle: getAnswerLabel('q3'),
            q3_texto: getAnswerText('q3'),
            q4_impacto: getAnswerLabel('q4'),
            q5_urgencia: getAnswerLabel('q5'),
            q6_presupuesto: getAnswerLabel('q6'),
            country_code: utmParams.country_code,
            utm_content: utmParams.utm_content,
            utm_campaign: utmParams.utm_campaign,
        };

        try {
            // Mock network request or valid logging for MVP
            console.log('Sending to n8n:', payload);

            await fetch('https://appn8n.clicktactico.com/webhook/diagnostico', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            onUserInfo(data.nombre, data.email);
            onComplete();
        } catch (err) {
            console.error(err);
            setError('Hubo un error al enviar tus datos. Intenta nuevamente.');
            // If auto-submit failed, allow manual retry
            setHasAttemptedAutoSubmit(true);
            isSubmittingRef.current = false;
        } finally {
            setIsSubmitting(false);
            // Don't reset isSubmittingRef.current = false here for immediate success case to prevent double firing before unmount
            // But if we error, we do need to reset it (handled in catch)
        }
    };

    // Effect for auto-submission if user info is present
    useEffect(() => {
        if (initialUserInfo && initialUserInfo.name && initialUserInfo.email && !hasAttemptedAutoSubmit) {
            setFormData({ nombre: initialUserInfo.name, email: initialUserInfo.email });
            submitData({ nombre: initialUserInfo.name, email: initialUserInfo.email });
            setHasAttemptedAutoSubmit(true);
        }
    }, [initialUserInfo]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.nombre || !formData.email) {
            setError('Por favor completa todos los campos.');
            return;
        }
        await submitData(formData);
    };

    // Render loading state if auto-submitting (user didn't see form yet)
    if (initialUserInfo && !error && isSubmitting) {
        return (
            <motion.div
                className="w-full max-w-md bg-white/5 backdrop-blur-md p-12 rounded-2xl border border-white/10 shadow-2xl flex flex-col items-center justify-center text-center space-y-6"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
            >
                <div className="relative">
                    <div className="absolute inset-0 bg-[#ff6600]/20 blur-xl rounded-full"></div>
                    <Loader2 className="w-16 h-16 text-[#ff6600] animate-spin relative z-10" />
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-white mb-2">Analizando Respuestas...</h2>
                    <p className="text-white/60">Estamos generando tu diagnóstico personalizado.</p>
                </div>
            </motion.div>
        );
    }

    return (
        <motion.div
            className="w-full max-w-md bg-white/5 backdrop-blur-md p-8 rounded-2xl border border-white/10 shadow-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold mb-2">¡Casi listo, Capitán!</h2>
                <p className="text-white/70">
                    Para enviarte tu "Diagnóstico de Preparación Digital" y la "Ruta de Navegación" completa, ¿dónde te lo enviamos?
                </p>
            </div>



            <form onSubmit={handleSubmit} className="space-y-4">
                <input type="hidden" name="country_code" value={utmParams.country_code} />
                <input type="hidden" name="utm_content" value={utmParams.utm_content} />
                <input type="hidden" name="utm_campaign" value={utmParams.utm_campaign} />
                <div>
                    <label className="block text-xs uppercase tracking-wider text-white/50 mb-1">Nombre</label>
                    <input
                        type="text"
                        value={formData.nombre}
                        onChange={(e) => setFormData(prev => ({ ...prev, nombre: e.target.value }))}
                        className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-[var(--color-brand-teal)] transition-colors"
                        placeholder="Tu nombre completo"
                    />
                </div>
                <div>
                    <label className="block text-xs uppercase tracking-wider text-white/50 mb-1">Email</label>
                    <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-[var(--color-brand-teal)] transition-colors"
                        placeholder="tu@email.com"
                    />
                </div>

                {error && <p className="text-red-400 text-sm text-center">{error}</p>}

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-[var(--color-brand-orange)] hover:bg-orange-600 rounded-xl font-bold shadow-lg shadow-orange-500/20 transition-all flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 className="animate-spin" />
                            <span>Generando Ruta...</span>
                        </>
                    ) : (
                        <>
                            <span>Ver Mi Resultado</span>
                            <Send size={18} />
                        </>
                    )}
                </button>

                <div className="flex justify-center mt-4">
                    <button
                        type="button"
                        onClick={onRestart}
                        className="text-white/40 hover:text-white/80 text-[12px] uppercase font-display underline transition-colors"
                    >
                        REINICIAR TEST
                    </button>
                </div>

                <p className="text-[10px] text-white/40 leading-tight text-center mt-4">
                    Al registrarte, aceptas recibir comunicaciones por correo electrónico de nuestra parte, las cuales pueden ser enviadas mediante tecnología automatizada. Tu información es confidencial y no vendemos tus datos personales a terceros. Puedes darte de baja en cualquier momento haciendo clic en el enlace al final de nuestros correos. Al enviar este formulario, aceptas nuestra Política de Privacidad y Términos y Condiciones.
                </p>
            </form>
        </motion.div>
    );
};
