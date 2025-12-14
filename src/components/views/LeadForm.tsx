import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Loader2 } from 'lucide-react';
import { QUESTIONS } from '../../data/quizData';

interface LeadFormProps {
    answers: Record<string, string>;
    totalScore: number;
    onComplete: () => void;
}

export const LeadForm = ({ answers, totalScore, onComplete }: LeadFormProps) => {
    const [formData, setFormData] = useState({ nombre: '', email: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.nombre || !formData.email) {
            setError('Por favor completa todos los campos.');
            return;
        }

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

        const payload = {
            nombre: formData.nombre,
            email: formData.email,
            puntuacion_total: totalScore,
            q1_dolor_principal: answers['q1'],
            q2_puntuacion: getPoints('q2'), // Handles q2_A, q2_B etc.
            q3_puntuacion: getPoints('q3'),
            q4_impacto: getAnswerLabel('q4'),
            q5_urgencia: getAnswerLabel('q5'),
            q6_presupuesto: getAnswerLabel('q6'),
        };

        try {
            // Mock network request or valid logging for MVP
            console.log('Sending to n8n:', payload);

            // Simulating delay
            await new Promise(resolve => setTimeout(resolve, 1500));

            // TODO: Replace with fetch
            // await fetch('https://YOUR_N8N_WEBHOOK_URL', {
            //   method: 'POST',
            //   headers: { 'Content-Type': 'application/json' },
            //   body: JSON.stringify(payload)
            // });

            onComplete();
        } catch (err) {
            console.error(err);
            setError('Hubo un error al enviar tus datos. Intenta nuevamente.');
        } finally {
            setIsSubmitting(false);
        }
    };

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
            </form>
        </motion.div>
    );
};
