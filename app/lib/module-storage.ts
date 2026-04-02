import { modules as defaultModules } from './modules';

export type StoredModule = {
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
  sections?: { title: string; content?: string; mediaUrl?: string }[];
};

const STORAGE_KEY = 'u-mind-custom-modules';

export function getStoredModules(): StoredModule[] {
  if (typeof window === 'undefined') return [];

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];

  try {
    return JSON.parse(raw) as StoredModule[];
  } catch {
    return [];
  }
}

export function saveStoredModule(moduleData: StoredModule) {
  if (typeof window === 'undefined') return;

  const current = getStoredModules();
  const withoutSameSlug = current.filter((m) => m.slug !== moduleData.slug);
  const updated = [...withoutSameSlug, moduleData];

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}

export function deleteStoredModule(slug: string) {
  if (typeof window === 'undefined') return;

  const current = getStoredModules();
  const updated = current.filter((m) => m.slug !== slug);

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}

export function getStoredModuleBySlug(slug: string): StoredModule | null {
  const stored = getStoredModules();
  return stored.find((m) => m.slug === slug) ?? null;
}

export function getAllModules(): StoredModule[] {
  if (typeof window === 'undefined') return defaultModules as StoredModule[];

  const stored = getStoredModules();
  return [...(defaultModules as StoredModule[]), ...stored];
}

export function getVisibleModules(): StoredModule[] {
  return getAllModules().filter((m) => m.published !== false);
}

export function getHomeModules(): StoredModule[] {
  return getVisibleModules().filter((m) => m.showOnHome === true);
}

export function isDefaultModule(slug: string): boolean {
  return (defaultModules as StoredModule[]).some((m) => m.slug === slug);
}