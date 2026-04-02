export type UMindModule = {
  title: string;
  slug: string;
  level: string;
  description: string;
  href: string;
  color: string;
  featured?: boolean;
  published?: boolean;
  showOnHome?: boolean;
  youtubeUrl?: string;
  prompts?: { text: string }[];
  sections?: { title: string; content: string }[];
};

export const modules: UMindModule[] = [
  {
    title: 'AI e didattica universitaria',
    slug: 'ai-e-didattica-universitaria',
    level: 'Livello III · Setting didattico',
    description:
      'Modulo dedicato all’uso pedagogicamente orientato dell’intelligenza artificiale nella didattica universitaria, con attenzione alla mediazione docente, alla riflessione critica e alla progettazione di attività di microlearning.',
    href: '/modules/ai-e-didattica-universitaria',
    color: '#003d7c',
    featured: true,
    published: true,
    showOnHome: true,
    youtubeUrl: 'https://www.youtube.com/watch?v=hJP5GqnTrNo',
    prompts: [
      {
        text: "In quale momento della tua lezione l'AI può supportare senza sostituire lo studente?",
      },
      {
        text: "Quali attività universitarie si prestano meglio a un uso riflessivo dell’intelligenza artificiale?",
      },
      {
        text: "Come potresti progettare una consegna in cui gli studenti confrontano il proprio lavoro con l’output di un sistema AI?",
      },
      {
        text: "Quali rischi emergono quando l’AI viene usata come scorciatoia invece che come supporto alla riflessione?",
      },
    ],
    sections: [
      {
        title: 'Stimolo',
        content:
          'Se l’intelligenza artificiale è in grado di fornire spiegazioni, esempi e feedback immediati, quale spazio resta al docente universitario? E in che modo cambia il ruolo dello studente nel processo di apprendimento?',
      },
      {
        title: 'Concetto',
        content:
          'L’uso dell’AI nella didattica universitaria non coincide con la sostituzione del docente né con l’automatizzazione dell’apprendimento. Si tratta piuttosto di costruire una mediazione pedagogica in cui l’intelligenza artificiale può supportare l’accesso ai contenuti, il confronto tra ipotesi, la generazione di esempi e la riflessione critica, mantenendo però centrale il ruolo interpretativo e progettuale del docente.',
      },
      {
        title: 'Applicazione',
        content:
          'Il docente può proporre agli studenti un compito iniziale senza AI, chiedendo una prima elaborazione autonoma. In un secondo momento, gli studenti interrogano un sistema generativo, confrontano la risposta ottenuta con la propria produzione e discutono differenze, limiti, opportunità e strategie di miglioramento. L’obiettivo non è ottenere una risposta rapida, ma rendere osservabile il processo di pensiero.',
      },
      {
        title: 'Schema',
        content:
          '1. Attivazione del compito senza AI. 2. Produzione iniziale dello studente. 3. Interazione con il sistema AI. 4. Confronto tra risposta umana e risposta generata. 5. Discussione critica e rielaborazione finale.',
      },
      {
        title: 'Riflessione',
        content:
          'In quale fase della tua didattica l’AI può rappresentare un supporto autentico alla comprensione e in quale fase, invece, rischia di indebolire l’esperienza formativa dello studente?',
      },
    ],
  },
  {
    title: 'Apprendimento attivo e partecipazione',
    slug: 'apprendimento-attivo',
    level: 'Livello II · Metodologia didattica',
    description:
      'Modulo dedicato alle metodologie di apprendimento attivo nella didattica universitaria, con particolare attenzione al coinvolgimento degli studenti, alla costruzione condivisa della conoscenza e alla progettazione di attività partecipative.',
    href: '/modules/apprendimento-attivo',
    color: '#2f6f4f',
    featured: false,
    published: true,
    showOnHome: true,
    youtubeUrl: 'https://www.youtube.com/watch?v=d0yGdNEWdn0',
    prompts: [
      {
        text: 'In quale parte della tua lezione gli studenti sono più passivi?',
      },
      {
        text: 'Come potresti trasformare un contenuto teorico in un’attività partecipativa?',
      },
      {
        text: 'Quale attività attiva potresti introdurre già dalla prossima lezione?',
      },
      {
        text: 'Quali resistenze potrebbero avere gli studenti rispetto a un approccio attivo?',
      },
    ],
    sections: [
      {
        title: 'Stimolo',
        content:
          'Se durante una lezione gli studenti ascoltano ma non intervengono, stanno davvero apprendendo? Quali condizioni rendono uno studente parte attiva del processo formativo?',
      },
      {
        title: 'Concetto',
        content:
          'L’apprendimento attivo si fonda sull’idea che la conoscenza non venga semplicemente trasmessa, ma costruita attraverso l’interazione, la partecipazione e l’elaborazione personale. Nella didattica universitaria questo implica un cambiamento di prospettiva: dalla centralità della spiegazione del docente alla progettazione di situazioni in cui lo studente agisce, riflette, discute e rielabora.',
      },
      {
        title: 'Applicazione',
        content:
          'Il docente può interrompere una spiegazione frontale e proporre una domanda aperta o un problema da discutere in piccoli gruppi. Gli studenti elaborano una risposta, la confrontano tra loro e poi la restituiscono in plenaria. In questo modo si attiva un processo di costruzione condivisa della conoscenza.',
      },
      {
        title: 'Schema',
        content:
          '1. Introduzione del tema. 2. Attivazione degli studenti attraverso una domanda o un problema. 3. Lavoro individuale o in gruppo. 4. Condivisione e confronto. 5. Sintesi guidata dal docente.',
      },
      {
        title: 'Riflessione',
        content:
          'Quali momenti della tua didattica potrebbero essere trasformati da passivi a attivi senza stravolgere completamente la struttura della lezione?',
      },
    ],
  },
];