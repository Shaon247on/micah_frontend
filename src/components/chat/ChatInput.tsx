'use client';

import { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ChatInputProps {
  onSend: (message: string) => void;
  isLoading?: boolean;
  disabled?: boolean;
}

export function ChatInput({ onSend, isLoading, disabled }: ChatInputProps) {
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = () => {
    if (message.trim() && !isLoading && !disabled) {
      onSend(message.trim());
      setMessage('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [message]);

  return (
    <div className="flex items-end gap-2 p-3 border-t border-gray-200 bg-white">
      <textarea
        ref={textareaRef}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type your message..."
        disabled={isLoading || disabled}
        rows={1}
        className={cn(
          "flex-1 resize-none rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none transition-colors",
          "focus:border-[#E07B3F] focus:ring-2 focus:ring-[#E07B3F]/20",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          "placeholder:text-gray-400"
        )}
        style={{ minHeight: '44px', maxHeight: '120px' }}
      />
      <Button
        onClick={handleSend}
        disabled={!message.trim() || isLoading || disabled}
        size="icon"
        className="h-11 w-11 rounded-xl bg-[#E07B3F] hover:bg-[#d66b2f] disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
      >
        <Send className="h-4 w-4" />
      </Button>
    </div>
  );
}