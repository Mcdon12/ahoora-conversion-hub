import { useState, useEffect, useRef } from "react";
import { ChatMessage } from "./ChatMessage";
import { ChatInput } from "./ChatInput";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageSquareText, Settings, Sparkles } from "lucide-react";
import { ChatMessage as ChatMessageType, ChatSession, GoogleAdsAccount } from "@/types/dashboard";
import { sampleQuestions } from "@/data/mockData";

interface ChatInterfaceProps {
  currentChat?: ChatSession;
  selectedAccount?: GoogleAdsAccount;
  onSendMessage: (message: string, chatSession?: ChatSession) => void;
  isTyping?: boolean;
}

export function ChatInterface({ 
  currentChat, 
  selectedAccount, 
  onSendMessage,
  isTyping = false 
}: ChatInterfaceProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<ChatMessageType[]>([]);

  useEffect(() => {
    if (currentChat?.messages) {
      setMessages(currentChat.messages);
    } else {
      setMessages([]);
    }
  }, [currentChat]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (message: string) => {
    onSendMessage(message, currentChat);
  };

  const getCurrentSampleQuestions = () => {
    if (selectedAccount?.name && sampleQuestions[selectedAccount.name as keyof typeof sampleQuestions]) {
      return sampleQuestions[selectedAccount.name as keyof typeof sampleQuestions];
    }
    return sampleQuestions.generic;
  };

  // Empty state when no account is selected
  if (!selectedAccount) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
        <div className="max-w-md">
          <Settings className="h-16 w-16 text-muted-foreground/50 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Select an Account to Start
          </h3>
          <p className="text-muted-foreground mb-4">
            Choose a Google Ads account from the selector to begin chatting with Ahoora AI about your campaigns.
          </p>
          <Badge variant="outline" className="text-xs">
            💡 Pro tip: You can switch between accounts anytime
          </Badge>
        </div>
      </div>
    );
  }

  // Empty state when account is selected but no chat
  if (selectedAccount && messages.length === 0) {
    return (
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="border-b border-border p-4 bg-card">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h2 className="font-semibold text-foreground">
                  Chat with Ahoora AI
                </h2>
                <p className="text-sm text-muted-foreground">
                  Active account: <span className="text-primary font-medium">{selectedAccount.name}</span>
                </p>
              </div>
            </div>
            <Badge className="bg-green-100 text-green-800 border-green-200">
              Ready to help
            </Badge>
          </div>
        </div>

        {/* Welcome Content */}
        <div className="flex-1 flex flex-col items-center justify-center p-8">
          <div className="max-w-2xl text-center">
            <MessageSquareText className="h-16 w-16 text-primary/50 mx-auto mb-6" />
            <h3 className="text-xl font-semibold text-foreground mb-3">
              Welcome to Ahoora AI for {selectedAccount.name}
            </h3>
            <p className="text-muted-foreground mb-6">
              I'm here to help you optimize your Google Ads campaigns, analyze performance, 
              and discover new opportunities. Ask me anything about your {selectedAccount.name} account!
            </p>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <div className="bg-card border border-border rounded-lg p-4">
                <div className="text-2xl font-bold text-primary">{selectedAccount.spend || '$0'}</div>
                <div className="text-sm text-muted-foreground">Monthly Spend</div>
              </div>
              <div className="bg-card border border-border rounded-lg p-4">
                <div className="text-2xl font-bold text-green-600">24/7</div>
                <div className="text-sm text-muted-foreground">AI Support</div>
              </div>
              <div className="bg-card border border-border rounded-lg p-4">
                <div className="text-2xl font-bold text-blue-600">∞</div>
                <div className="text-sm text-muted-foreground">Insights</div>
              </div>
            </div>
          </div>
        </div>

        {/* Input */}
        <ChatInput
          onSendMessage={handleSendMessage}
          sampleQuestions={getCurrentSampleQuestions()}
          placeholder={`Ask me about ${selectedAccount.name} campaigns...`}
        />
      </div>
    );
  }

  // Chat with messages
  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <div className="border-b border-border p-4 bg-card">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-semibold text-foreground">
              {currentChat?.title || "New Chat"}
            </h2>
            <p className="text-sm text-muted-foreground">
              {selectedAccount.name} • {messages.length} messages
            </p>
          </div>
          <Badge variant="outline">
            Active
          </Badge>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
        
        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex gap-3">
            <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
              <Sparkles className="h-4 w-4 animate-pulse" />
            </div>
            <div className="bg-card border border-border rounded-lg px-4 py-3">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-pulse delay-75"></div>
                <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-pulse delay-150"></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <ChatInput
        onSendMessage={handleSendMessage}
        sampleQuestions={messages.length === 0 ? getCurrentSampleQuestions() : []}
        placeholder={`Message Ahoora about ${selectedAccount.name}...`}
        disabled={isTyping}
      />
    </div>
  );
}