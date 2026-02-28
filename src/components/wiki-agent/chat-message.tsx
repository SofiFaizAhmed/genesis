import * as React from "react"
import { cn } from "@/lib/utils"
import { ExternalLink, Globe } from "lucide-react"
import { Card } from "@/components/ui/card"

export type MessageRole = "user" | "assistant"

export interface Message {
  id: string
  role: MessageRole
  content: string
  sources?: string[]
}

interface ChatMessageProps {
  message: Message
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user"

  return (
    <div className={cn("flex flex-col max-w-[85%] gap-2", isUser ? "items-end" : "items-start")}>
      <Card className={cn(
        "p-4 text-sm leading-relaxed shadow-sm",
        isUser ? "bg-primary text-primary-foreground border-primary" : "bg-background text-foreground"
      )}>
        {message.content}
      </Card>
      
      {message.sources && message.sources.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {message.sources.map((source, idx) => (
            <a
              key={idx}
              href={source}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-3 py-1 text-xs font-medium rounded-full bg-secondary text-primary hover:bg-primary/10 transition-colors border border-primary/20"
            >
              <Globe className="h-3 w-3" />
              Wikipedia Reference {idx + 1}
              <ExternalLink className="h-3 w-3 opacity-60" />
            </a>
          ))}
        </div>
      )}
    </div>
  )
}
