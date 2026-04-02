export type UMindModule = {
  title: string;
  slug: string;
  level: string;
  description: string;
  href: string;
  color: string;
  featured?: boolean;
};

export const modules: UMindModule[] = [
  {
    title: 'AI-supported learning',
    slug: 'ai-supported-learning',
    level: 'Livello III · Setting didattico',
    description:
      'Modulo di micro-learning su AI come supporto all’apprendimento, mediazione e riflessione critica.',
    href: '/modules/ai-supported-learning',
    color: '#a6894d',
    featured: true,
  },
  {
    title: 'Problem-based learning',
    slug: 'problem-based-learning',
    level: 'Livello II · Metodologia didattica',
    description:
      'Modulo dedicato alla costruzione dell’apprendimento attraverso problemi autentici, analisi e ricerca di soluzioni.',
    href: '/modules/problem-based-learning',
    color: '#4b5563',
    featured: false,
  },
];