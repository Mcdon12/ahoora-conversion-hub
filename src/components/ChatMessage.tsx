import { formatDistanceToNow } from "date-fns";
import { Bot, User } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { ChatMessage as ChatMessageType } from "@/types/dashboard";

interface ChatMessageProps {
  message: ChatMessageType;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.sender === 'user';
  const isSystem = message.sender === 'system';

  if (isSystem) {
    return (
      <div className="flex justify-center my-4">
        <div className="bg-muted/50 px-3 py-1 rounded-full text-xs text-muted-foreground">
          {message.content}
        </div>
      </div>
    );
  }

  return (
    <div className={cn("flex gap-3 mb-6", isUser && "flex-row-reverse")}>
      {/* Avatar */}
      <Avatar className="h-8 w-8 mt-1">
        <AvatarFallback className={cn(
          "text-xs",
          isUser ? "bg-primary text-primary-foreground" : "bg-muted"
        )}>
          {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
        </AvatarFallback>
      </Avatar>

      {/* Message Content */}
      <div className={cn("flex-1 max-w-[80%]", isUser && "flex flex-col items-end")}>
        <div className={cn(
          "rounded-lg px-4 py-3 text-sm",
          isUser 
            ? "bg-primary text-primary-foreground ml-auto" 
            : "bg-card border border-border"
        )}>
          {/* Format message content with line breaks */}
          <div className="whitespace-pre-wrap">
            {message.content}
          </div>
        </div>
        
        {/* Timestamp */}
        <div className={cn(
          "text-xs text-muted-foreground mt-1 px-1",
          isUser && "text-right"
        )}>
          {formatDistanceToNow(message.timestamp, { addSuffix: true })}
          {message.accountContext && (
            <span className="ml-2 text-primary">• {message.accountContext}</span>
          )}
        </div>
      </div>
    </div>
  );
}