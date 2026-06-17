'use client';

import { useChat } from '@/hooks/useChat';
import { ChatButton } from './ChatButton';
import { ChatWindow } from './ChatWindow';
import { AnimatePresence } from 'framer-motion';

export function ChatBot() {
  const {
    messages,
    isLoading,
    isOpen,
    error,
    sendMessage,
    toggleChat,
  } = useChat();

  const handleSuggestionSelect = (message: string) => {
    sendMessage(message);
  };

  return (
    <>
      <AnimatePresence>
        <ChatWindow
          isOpen={isOpen}
          messages={messages}
          isLoading={isLoading}
          error={error}
          onClose={toggleChat}
          onSend={sendMessage}
          onSuggestionSelect={handleSuggestionSelect}
        />
      </AnimatePresence>

      <ChatButton
        isOpen={isOpen}
        onClick={toggleChat}
        unreadCount={messages.filter(m => m.role === 'assistant' && !m.content).length}
      />
    </>
  );
}