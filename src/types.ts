export interface ScammerTarget {
  id: string;
  name: string;
  displayAge: number;
  location: string;
  avatarUrl: string;
  unmaskedUrl: string;
  tactic: string;
  fakeIdentityDescription: string;
  realIdentityDescription: string;
  glitches: string[];
}

export interface ChatSample {
  id: string;
  title: string;
  sender: string;
  messages: {
    sender: 'them' | 'me';
    text: string;
    timestamp: string;
  }[];
}

export interface MessageAnalysis {
  isScam: boolean;
  score: number; // 0 to 100
  category: string; // e.g., "Pig Butchering (Wrong Number bait)", "Urgent Impersonation"
  tacticsDetected: string[];
  psychologicalHooks: string[];
  explanation: string;
  actionRequired: string;
}
