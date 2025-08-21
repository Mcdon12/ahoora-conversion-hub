export interface GoogleAdsAccount {
  id: string;
  name: string;
  spend?: string;
}

export interface MCCAccount {
  id: string;
  name: string;
  childAccounts: GoogleAdsAccount[];
}

export interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'agent' | 'system';
  timestamp: Date;
  accountContext?: string;
}

export interface ChatSession {
  id: string;
  title: string;
  accountId: string;
  accountName: string;
  lastMessage: string;
  timestamp: string;
  messages: ChatMessage[];
}

export interface MockData {
  mccAccounts: MCCAccount[];
  chatHistory: Record<string, ChatSession[]>;
}