export interface Note {
  id: string;
  title: string;
  content: string;
  category: string;
  createdAt: string;
}

export interface SavedTopic {
  id: string;
  title: string;
  objection: string;
  summary: string;
  scripturePassages: { reference: string; text: string; explanation: string }[];
  mainArguments: { title: string; content: string }[];
  churchFathersQuotes: { father: string; work: string; quote: string }[];
  practicalTips: string[];
  commonMistakes: string[];
  savedAt: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: string;
  requirement: string;
  threshold: number;
  unlocked: boolean;
  unlockedAt?: string;
  progress: number;
}

export interface Profile {
  name: string;
  bio: string;
  avatarUri: string | null;
  level: number;
  xp: number;
}

export interface AuthUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  providerId?: string;
}

export interface AppStats {
  debatesCompleted: number;
  topicsStudied: number;
  sessionsFinished: number;
  prayersGenerated: number;
  versesStudied: number;
  notesCreated: number;
  topicsGenerated: number;
}

export interface GroundingSource {
  title: string;
  uri: string;
}

export interface DailyCatholicQuote {
  id: string;
  category: "church_father" | "apologetic_titan" | "catholic_scientist";
  categoryLabel: string;
  author: string;
  title: string;
  era: string;
  quote: string;
  source: string;
  historicalImpact: string;
  faithAndReasonInsight: string;
  groundingSources?: GroundingSource[];
  searchQueries?: string[];
}

export interface TopicContent {
  id: string;
  title: string;
  category: string;
  summary: string;
  scripturePassages: { reference: string; text: string; explanation: string }[];
  mainArguments: { title: string; content: string }[];
  churchFathersQuotes: { father: string; work: string; quote: string }[];
  practicalTips: string[];
  commonMistakes: string[];
  groundingSources?: GroundingSource[];
  searchQueries?: string[];
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp?: string;
  groundingSources?: GroundingSource[];
  searchQueries?: string[];
}

