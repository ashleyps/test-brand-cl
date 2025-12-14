export type ModuleType = 'A' | 'B' | 'C' | 'D' | null;

export interface Option {
    id: string;
    label: string;
    iconName: string;
    points: number;
    targetModule?: ModuleType;
}

export interface Question {
    id: string;
    stepId: number;
    title: string;
    subtitle?: string; // Additional context if needed
    moduleId: ModuleType; // null for universal
    options: Option[];
    maxPoints: number;
    type: 'selection' | 'form' | 'info';
}

export const QUESTIONS: Question[] = [
    // STEP 1: Segmentación Maestra (Universal)
    {
        id: 'q1',
        stepId: 1,
        title: 'En este momento, ¿cuál de estos elementos de tu marca digital es tu mayor obstáculo o el que aún no has resuelto?',
        moduleId: null,
        maxPoints: 10,
        type: 'selection',
        options: [
            { id: 'A', label: 'La Base (Naming y Propuesta de Valor)', iconName: 'Anchor', points: 0, targetModule: 'A' },
            { id: 'B', label: 'La Identidad (Logo e Imagen Corporativa)', iconName: 'Feather', points: 0, targetModule: 'B' },
            { id: 'C', label: 'La Plataforma (Web y Redes Sociales)', iconName: 'Monitor', points: 0, targetModule: 'C' },
            { id: 'D', label: 'La Estrategia (Marketing y Ventas)', iconName: 'Target', points: 10, targetModule: 'D' },
        ]
    },

    // MODULE A: Fundamentos
    {
        id: 'q2_A',
        stepId: 2,
        title: 'Respecto a tu "Naming", ¿qué tan seguro estás de que tu nombre es único y escalable?',
        moduleId: 'A',
        maxPoints: 10,
        type: 'selection',
        options: [
            { id: 'A', label: 'Es una idea, no he verificado disponibilidad de dominio ni redes.', iconName: 'Lightbulb', points: 0 },
            { id: 'B', label: 'Verifiqué el dominio .com, pero no he revisado conflictos legales o de marca.', iconName: 'Search', points: 5 },
            { id: 'C', label: 'Nombre registrado, dominio .com asegurado y libre de conflictos.', iconName: 'CheckCircle', points: 10 },
        ]
    },
    {
        id: 'q3_A',
        stepId: 3,
        title: '¿Tienes un documento que defina claramente tu Propuesta de Valor y Público Objetivo?',
        moduleId: 'A',
        maxPoints: 10,
        type: 'selection',
        options: [
            { id: 'A', label: 'No, solo tengo una idea general.', iconName: 'Cloud', points: 0 },
            { id: 'B', label: 'Sí, pero no lo he revisado o actualizado en el último año.', iconName: 'FileText', points: 5 },
            { id: 'C', label: 'Sí, está claro, documentado y lo usamos para guiar todas las decisiones.', iconName: 'Map', points: 10 },
        ]
    },

    // MODULE B: Identidad Visual
    {
        id: 'q2_B',
        stepId: 2,
        title: '¿Tu logo actual es "Online Ready" y funciona en todos los formatos (web, móvil, redes)?',
        moduleId: 'B',
        maxPoints: 10,
        type: 'selection',
        options: [
            { id: 'A', label: 'Es un diseño rápido o hecho por mí; no tengo archivos vectoriales ni variantes.', iconName: 'PenTool', points: 0 },
            { id: 'B', label: 'Lo hizo un diseñador, pero no funciona bien en formatos pequeños o fondos oscuros.', iconName: 'Image', points: 5 },
            { id: 'C', label: 'Es un diseño profesional, versátil, con manual de marca y optimizado para todos los formatos digitales.', iconName: 'Star', points: 10 },
        ]
    },
    {
        id: 'q3_B',
        stepId: 3,
        title: '¿Tu imagen corporativa (colores, tipografía, tono) es 100% coherente en todos tus canales digitales?',
        moduleId: 'B',
        maxPoints: 10,
        type: 'selection',
        options: [
            { id: 'A', label: 'No, cada red social o material usa un estilo diferente.', iconName: 'Shuffle', points: 0 },
            { id: 'B', label: 'Es similar, pero no tengo un manual que asegure la consistencia.', iconName: 'Copy', points: 5 },
            { id: 'C', label: 'Sí, tenemos un manual de identidad que garantiza la coherencia en todo.', iconName: 'BookOpen', points: 10 },
        ]
    },

    // MODULE C: Plataforma Digital
    {
        id: 'q2_C',
        stepId: 2,
        title: '¿Tu sitio web actual está optimizado para la conversión y es "Mobile-First"?',
        moduleId: 'C',
        maxPoints: 10,
        type: 'selection',
        options: [
            { id: 'A', label: 'No tengo web, solo una página de enlaces (Linktree).', iconName: 'Smartphone', points: 0 },
            { id: 'B', label: 'Tengo web, pero no es rápida, ni está optimizada para móviles o SEO básico.', iconName: 'AlertTriangle', points: 5 },
            { id: 'C', label: 'Mi web es profesional, rápida, mobile-first y tiene llamados a la acción claros.', iconName: 'Zap', points: 10 },
        ]
    },
    {
        id: 'q3_C',
        stepId: 3,
        title: '¿Qué tan unificada es tu presencia en redes sociales?',
        moduleId: 'C',
        maxPoints: 10,
        type: 'selection',
        options: [
            { id: 'A', label: 'Tengo perfiles en redes, pero están inactivos o con información inconsistente.', iconName: 'UserX', points: 0 },
            { id: 'B', label: 'Publico contenido, pero no tengo una estrategia visual o de tono de voz coherente.', iconName: 'MessageSquare', points: 5 },
            { id: 'C', label: 'Mis perfiles son profesionales, activos y mantienen una línea visual y de comunicación unificada.', iconName: 'Share2', points: 10 },
        ]
    },

    // MODULE D: Estrategia de Crecimiento
    {
        id: 'q2_D',
        stepId: 2,
        title: '¿Tienes una estrategia de Contenido de Valor (blog, videos, artículos) que resuelva problemas reales de tu audiencia?',
        moduleId: 'D',
        maxPoints: 10,
        type: 'selection',
        options: [
            { id: 'A', label: 'No, solo publico contenido de venta o promocional.', iconName: 'Tag', points: 0 },
            { id: 'B', label: 'Publico contenido, pero no está optimizado para SEO ni para educar a la audiencia.', iconName: 'Globe', points: 5 },
            { id: 'C', label: 'Sí, tenemos un calendario de contenido que resuelve problemas y posiciona nuestra marca como experta.', iconName: 'Calendar', points: 10 },
        ]
    },
    {
        id: 'q3_D',
        stepId: 3,
        title: '¿Mides y analizas el rendimiento de tus acciones de marketing digital?',
        moduleId: 'D',
        maxPoints: 10,
        type: 'selection',
        options: [
            { id: 'A', label: 'No, solo reviso los "me gusta" o comentarios.', iconName: 'ThumbsUp', points: 0 },
            { id: 'B', label: 'Sí, pero no tengo métricas claras de ROI (Retorno de Inversión).', iconName: 'TrendingUp', points: 5 },
            { id: 'C', label: 'Sí, tenemos métricas claras, KPIs definidos y ajustamos la estrategia en base a datos.', iconName: 'BarChart2', points: 10 },
        ]
    },

    // UNIVERSAL QUESTIONS
    {
        id: 'q4',
        stepId: 4,
        title: '¿Cómo está afectando este obstáculo a tus resultados de negocio (ventas, citas, autoridad)?',
        moduleId: null,
        maxPoints: 10,
        type: 'selection',
        options: [
            { id: 'A', label: 'Aún no mucho, estoy en fase de planificación.', iconName: 'Coffee', points: 0 },
            { id: 'B', label: 'Me está costando tiempo y esfuerzo, pero no es crítico.', iconName: 'Clock', points: 5 },
            { id: 'C', label: 'Está frenando mi crecimiento y me está haciendo perder dinero/oportunidades.', iconName: 'AlertOctagon', points: 10 },
        ]
    },
    {
        id: 'q5',
        stepId: 5,
        title: '¿Qué tan urgente es para ti resolver este desafío y tener tu "Ruta de Navegación" implementada?',
        moduleId: null,
        maxPoints: 20,
        type: 'selection',
        options: [
            { id: 'A', label: 'Es importante, pero puedo esperar 6 meses o más.', iconName: 'Calendar', points: 0 },
            { id: 'B', label: 'Es una prioridad, quiero ver avances en los próximos 3 meses.', iconName: 'FastForward', points: 10 },
            { id: 'C', label: '¡Es CRÍTICO! Necesito un plan de acción y ejecución profesional en las próximas 4-8 semanas.', iconName: 'Flame', points: 20 },
        ]
    },
    {
        id: 'q6',
        stepId: 6,
        title: 'Para resolver esto con ayuda profesional, ¿cuál es tu nivel de inversión planeado?',
        moduleId: null,
        maxPoints: 40,
        type: 'selection',
        options: [
            { id: 'A', label: 'Estoy buscando soluciones gratuitas o de muy bajo costo (solo la guía me sirve).', iconName: 'PiggyBank', points: 0 },
            { id: 'B', label: 'Tengo un presupuesto definido para invertir en consultoría o servicios profesionales.', iconName: 'Briefcase', points: 20 },
            { id: 'C', label: 'Tengo el presupuesto y la intención de contratar a un equipo experto para que se encargue de la ejecución.', iconName: 'Gem', points: 40 },
        ]
    },
];
