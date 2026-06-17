'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { X, Bot, User, AlertCircle, MessageCircle } from 'lucide-react';
import { ChatMessage } from '@/types/chat';
import { ChatInput } from './ChatInput';
import { TypingIndicator } from './TypingIndicator';
import { QuickSuggestions } from './QuickSuggestions';
import { cn } from '@/lib/utils';

// ✅ Facebook Messenger configuration
// const FACEBOOK_PAGE_URL = 'https://www.facebook.com/your-page-name';
const FACEBOOK_MESSENGER_URL = `https://m.me/your-page-name`; // Replace with your page username

interface ChatWindowProps {
  isOpen: boolean;
  messages: ChatMessage[];
  isLoading: boolean;
  error: string | null;
  onClose: () => void;
  onSend: (message: string) => void;
  onSuggestionSelect: (message: string) => void;
}

export function ChatWindow({
  isOpen,
  messages,
  isLoading,
  error,
  onClose,
  onSend,
  onSuggestionSelect,
}: ChatWindowProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  if (!isOpen) return null;

  const hasMessages = messages.length > 0;

  // ✅ Function to open Facebook Messenger
  const openFacebookMessenger = () => {
    window.open(FACEBOOK_MESSENGER_URL, '_blank');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="fixed bottom-24 right-6 w-[400px] max-w-[calc(100vw-32px)] h-[600px] max-h-[80vh] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col z-50 overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-[#121F37]">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#E07B3F] flex items-center justify-center">
            <Bot className="h-4 w-4 text-white" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">HVAC Helper</h3>
            <p className="text-xs text-white/60">Online</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-1 rounded-lg hover:bg-white/10 transition-colors text-white/70 hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        {!hasMessages && !error ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="w-16 h-16 rounded-full bg-[#E07B3F]/10 flex items-center justify-center mb-4">
              <Bot className="h-8 w-8 text-[#E07B3F]" />
            </div>
            <h4 className="text-lg font-semibold text-[#121F37]">Hello! 👋</h4>
            <p className="text-sm text-gray-500 mt-2 max-w-xs">
              I&apos;m here to help you learn about our HVAC services. Ask me anything!
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  'flex items-start gap-2',
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                )}
              >
                {message.role === 'assistant' && (
                  <div className="w-7 h-7 rounded-full bg-[#E07B3F]/10 flex items-center justify-center flex-shrink-0">
                    <Bot className="h-3.5 w-3.5 text-[#E07B3F]" />
                  </div>
                )}
                <div
                  className={cn(
                    'px-4 py-2.5 rounded-2xl max-w-[85%] text-sm leading-relaxed',
                    message.role === 'user'
                      ? 'bg-[#E07B3F] text-white rounded-tr-none'
                      : 'bg-white border border-gray-200 rounded-tl-none text-[#121F37]'
                  )}
                >
                  <p className="whitespace-pre-wrap break-words">
                    {message.content || (message.role === 'assistant' && isLoading ? '...' : '')}
                  </p>
                </div>
                {message.role === 'user' && (
                  <div className="w-7 h-7 rounded-full bg-[#121F37]/10 flex items-center justify-center flex-shrink-0">
                    <User className="h-3.5 w-3.5 text-[#121F37]" />
                  </div>
                )}
              </div>
            ))}

            {isLoading && !messages.some(m => m.role === 'assistant' && m.content === '') && (
              <div className="flex items-start gap-2">
                <div className="w-7 h-7 rounded-full bg-[#E07B3F]/10 flex items-center justify-center flex-shrink-0">
                  <Bot className="h-3.5 w-3.5 text-[#E07B3F]" />
                </div>
                <TypingIndicator />
              </div>
            )}

            {error && (
              <div className="flex items-center gap-2 p-3 bg-red-50 rounded-xl border border-red-200">
                <AlertCircle className="h-4 w-4 text-red-500 flex-shrink-0" />
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* ✅ Quick Suggestions - Only show if no messages */}
      {!hasMessages && !error && (
        <QuickSuggestions onSelect={onSuggestionSelect} />
      )}

      {/* ✅ Facebook Messenger Button - Shows after messages appear */}
      {hasMessages && (
        <div className="px-4 py-2 border-t border-gray-100 bg-gray-50">
          <button
            onClick={openFacebookMessenger}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-[#1877F2] hover:bg-[#166FE5] text-white text-sm font-semibold rounded-xl transition-all duration-200 hover:shadow-md"
          >
            <MessageCircle className="h-4 w-4" />
            <span>Contact us on Facebook Messenger</span>
          </button>
        </div>
      )}

      {/* Input */}
      <ChatInput onSend={onSend} isLoading={isLoading} />
    </motion.div>
  );
}