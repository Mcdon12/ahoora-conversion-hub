import { formatDistanceToNow } from "date-fns";
import { Bot, User } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { ChatMessage as ChatMessageType } from "@/types/dashboard";
import { ChatChart } from "./ChatChart";

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
          "rounded-lg text-sm",
          isUser 
            ? "bg-primary text-primary-foreground ml-auto px-4 py-3" 
            : "bg-card border border-border",
          !isUser && message.chart ? "p-0 overflow-hidden" : "px-4 py-3"
        )}>
          {/* Format message content with line breaks */}
          <div className={cn("whitespace-pre-wrap", !isUser && message.chart && "p-4 pb-2")}>
            {message.content}
          </div>
          
          {/* Chart component for agent messages */}
          {!isUser && message.chart && (
            <div className="px-4 pb-4">
              <ChatChart
                type={message.chart.type}
                data={message.chart.data}
                config={message.chart.config}
                title={message.chart.title}
                xAxisKey={message.chart.xAxisKey}
                yAxisKey={message.chart.yAxisKey}
              />
            </div>
          )}
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