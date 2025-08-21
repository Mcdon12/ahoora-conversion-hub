import { useState, KeyboardEvent } from "react";
import { Send, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
  sampleQuestions?: string[];
  placeholder?: string;
}

export function ChatInput({ 
  onSendMessage, 
  disabled = false, 
  sampleQuestions = [],
  placeholder = "Ask Ahoora anything about your campaigns..."
}: ChatInputProps) {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage("");
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSampleQuestion = (question: string) => {
    setMessage(question);
  };

  return (
    <div className="border-t border-border bg-background p-4">
      {/* Sample Questions */}
      {sampleQuestions.length > 0 && message === "" && (
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-foreground">Try asking:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {sampleQuestions.map((question, index) => (
              <Badge
                key={index}
                variant="outline"
                className="cursor-pointer hover:bg-primary/10 hover:border-primary/20 text-xs px-3 py-1 transition-colors"
                onClick={() => handleSampleQuestion(question)}
              >
                {question}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="flex gap-3">
        <div className="flex-1">
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="min-h-[44px] max-h-32 resize-none"
            disabled={disabled}
          />
        </div>
        <Button
          onClick={handleSend}
          disabled={!message.trim() || disabled}
          size="icon"
          className="h-11 w-11 shrink-0"
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex justify-between items-center mt-2 text-xs text-muted-foreground">
        <span>Press Enter to send, Shift+Enter for new line</span>
        <span>{message.length}/2000</span>
      </div>
    </div>
  );
}