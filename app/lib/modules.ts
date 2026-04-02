export type HomeContent = {
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  heroVideoUrl: string;
};

const STORAGE_KEY = 'u-mind-home-content';

export const defaultHomeContent: HomeContent = {
  heroTitle: 'Benvenuti in UMiND',
  heroSubtitle:
    'Microlearning platform for university teaching, research and faculty development',
  heroDescription:
    'Benvenuti nella piattaforma UMiND, ambiente dedicato alla progettazione e alla fruizione di percorsi di microlearning per la didattica universitaria, la ricerca e il faculty development. La piattaforma è pensata per sostenere processi di apprendimento, riflessione pedagogica e costruzione modulare di contenuti formativi in contesto universitario.',
  heroVideoUrl: 'https://www.youtube.com/watch?v=hJP5GqnTrNo',
};

export function getHomeContent(): HomeContent {
  if (typeof window === 'undefined') return defaultHomeContent;

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return defaultHomeContent;

  try {
    return {
      ...defaultHomeContent,
      ...(JSON.parse(raw) as HomeContent),
    };
  } catch {
    return defaultHomeContent;
  }
}

export function saveHomeContent(content: HomeContent) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
}