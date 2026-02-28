/**
 * ChatMessage Component
 * 
 * Displays a message bubble in the chat interface
 */

import SourceLinks from "./SourceLinks";

export interface Message {
  role: "user" | "assistant";
  content: string;
  sources?: string[];
}

interface ChatMessageProps {
  message: Message;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}>
      <div
        className={`max-w-[80%] rounded-lg px-4 py-3 ${
          isUser
            ? "bg-blue-600 text-white"
            : "bg-gray-100 text-gray-900"
        }`}
      >
        <p className="text-sm whitespace-pre-wrap break-words">
          {message.content}
        </p>
        {!isUser && message.sources && (
          <SourceLinks sources={message.sources} />
        )}
      </div>
    </div>
  );
}
