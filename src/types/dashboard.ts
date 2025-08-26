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

export interface ChartData {
  type: "line" | "area" | "bar" | "pie";
  data: any[];
  config: Record<string, { label: string; color: string }>;
  title?: string;
  xAxisKey?: string;
  yAxisKey?: string;
}

export interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'agent' | 'system';
  timestamp: Date;
  accountContext?: string;
  chart?: ChartData;
}

export interface ChatSession {
  id: string;
  title: string;
  accountId: string;
  accountName: string;
  lastMessage: string;
  timestamp: string;
  messages: ChatMessage[];
  dateRange?: {
    from: Date;
    to: Date;
  };
}

export interface MockData {
  mccAccounts: MCCAccount[];
  chatHistory: Record<string, ChatSession[]>;
}