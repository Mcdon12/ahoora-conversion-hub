import { useState } from "react";
import { MessageSquare, Plus, Search, ChevronDown, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChatSession } from "@/types/dashboard";

interface ChatSidebarProps {
  chatHistory: Record<string, ChatSession[]>;
  currentChatId?: string;
  onChatSelect: (chat: ChatSession) => void;
  onNewChat: (accountId: string, accountName: string) => void;
  selectedAccountId?: string;
}

export function ChatSidebar({ 
  chatHistory, 
  currentChatId, 
  onChatSelect, 
  onNewChat,
  selectedAccountId 
}: ChatSidebarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedAccounts, setExpandedAccounts] = useState<Set<string>>(new Set());

  const toggleAccountExpansion = (accountId: string) => {
    const newExpanded = new Set(expandedAccounts);
    if (newExpanded.has(accountId)) {
      newExpanded.delete(accountId);
    } else {
      newExpanded.add(accountId);
    }
    setExpandedAccounts(newExpanded);
  };

  const filteredHistory = Object.entries(chatHistory).reduce((acc, [accountId, chats]) => {
    const filteredChats = chats.filter(chat => 
      chat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
    );
    if (filteredChats.length > 0) {
      acc[accountId] = filteredChats;
    }
    return acc;
  }, {} as Record<string, ChatSession[]>);

  return (
    <div className="w-80 h-full bg-sidebar border-r border-sidebar-border flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-sidebar-border">
        <h2 className="font-semibold text-sidebar-foreground mb-3">Chat History</h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sidebar-foreground/60 h-4 w-4" />
          <Input
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-sidebar-accent border-sidebar-border text-sidebar-foreground placeholder:text-sidebar-foreground/60"
          />
        </div>
      </div>

      {/* Chat History */}
      <div className="flex-1 overflow-y-auto">
        {Object.keys(filteredHistory).length === 0 ? (
          <div className="p-4 text-center text-sidebar-foreground/60">
            <MessageSquare className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No conversations found</p>
          </div>
        ) : (
          <div className="p-2">
            {Object.entries(filteredHistory).map(([accountId, chats]) => {
              const accountName = chats[0]?.accountName || accountId;
              const isExpanded = expandedAccounts.has(accountId);
              
              return (
                <div key={accountId} className="mb-2">
                  {/* Account Header */}
                  <div className="flex items-center justify-between p-2 hover:bg-sidebar-accent rounded-md group">
                    <button
                      onClick={() => toggleAccountExpansion(accountId)}
                      className="flex items-center gap-2 flex-1 text-left"
                    >
                      {isExpanded ? (
                        <ChevronDown className="h-4 w-4 text-sidebar-foreground/60" />
                      ) : (
                        <ChevronRight className="h-4 w-4 text-sidebar-foreground/60" />
                      )}
                      <span className="font-medium text-sidebar-foreground text-sm">
                        {accountName}
                      </span>
                      <span className="text-xs text-sidebar-foreground/60 ml-auto">
                        {chats.length}
                      </span>
                    </button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onNewChat(accountId, accountName)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6 p-0 hover:bg-sidebar-accent-foreground/10"
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>

                  {/* Chat List */}
                  {isExpanded && (
                    <div className="ml-6 space-y-1">
                      {chats.map((chat) => (
                        <button
                          key={chat.id}
                          onClick={() => onChatSelect(chat)}
                          className={cn(
                            "w-full text-left p-3 rounded-md transition-colors hover:bg-sidebar-accent",
                            currentChatId === chat.id && "bg-sidebar-accent border-l-2 border-sidebar-primary"
                          )}
                        >
                          <div className="truncate font-medium text-sm text-sidebar-foreground mb-1">
                            {chat.title}
                          </div>
                          <div className="truncate text-xs text-sidebar-foreground/60 mb-1">
                            {chat.lastMessage}
                          </div>
                          <div className="text-xs text-sidebar-foreground/50">
                            {chat.timestamp}
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* New Chat Button */}
      {selectedAccountId && (
        <div className="p-4 border-t border-sidebar-border">
          <Button
            onClick={() => {
              const accountName = Object.values(chatHistory)
                .flat()
                .find(chat => chat.accountId === selectedAccountId)?.accountName || 
                selectedAccountId;
              onNewChat(selectedAccountId, accountName);
            }}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Chat
          </Button>
        </div>
      )}
    </div>
  );
}