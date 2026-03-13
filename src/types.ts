export type View = 'dashboard' | 'projects' | 'editor' | 'community' | 'settings' | 'notes' | 'characters';
export type Theme = 'light' | 'dark';
export type Language = 'pt' | 'en' | 'es';

export interface Chapter {
  id: string;
  title: string;
  content: string;
}

export interface Project {
  id: string;
  title: string;
  genre: string;
  status: string;
  color: string;
  coverImage: string | null;
}

export interface Character {
  id: string;
  projectId: string;
  name: string;
  role: string;
  description: string;
  avatar: string | null;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
}

export interface AppState {
  view: View;
  theme: Theme;
  language: Language;
  userName: string;
  userBioLink: string;
  userAvatar: string | null;
  isBioPublic: boolean;
  dailyGoal: number;
  dailyProgress: number;
  focusMode: boolean;
  synopsis: string;
  chapters: Chapter[];
  activeChapterId: string | 'synopsis';
  coverImage: string | null;
  projects: Project[];
  characters: Character[];
}
