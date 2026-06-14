"use client";

import { useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { User, MessageSquare, Send, X } from "lucide-react";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  text: string;
}

export default function FloatingMessenger() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      text: "Hi there! 👋 Welcome to Honest HVAC Services. How can we help you today?",
    },
  ]);
  const [draft, setDraft] = useState("");
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function handleSend() {
    const trimmed = draft.trim();
    if (!trimmed || sending) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      text: trimmed,
    };

    setMessages((prev) => [...prev, userMsg]);
    setDraft("");
    setSending(true);

    window.setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: `assistant-${Date.now()}`,
          role: "assistant",
          text: "Thanks for reaching out! Our team will get back to you shortly. For urgent HVAC needs, feel free to call us directly.",
        },
      ]);
      setSending(false);
    }, 700);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <>
      <style>{`
        @keyframes chat-bounce {
          0%, 80%, 100% { transform: scale(0.65); opacity: 0.4; }
          40%            { transform: scale(1);    opacity: 1;   }
        }
        .chat-dot { animation: chat-bounce 1.2s infinite ease-in-out; }
        .chat-dot:nth-child(2) { animation-delay: 0.2s; }
        .chat-dot:nth-child(3) { animation-delay: 0.4s; }
      `}</style>

      <Dialog>
        {/* ── Floating trigger ── */}
        <DialogTrigger asChild>
          <button
            type="button"
            aria-label="Open chat"
            className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-[#E8621A] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[#E8621A]/40 transition hover:bg-[#F0834A] active:scale-95"
          >
            <MessageSquare className="h-4.5 w-4.5" />
            <span className="hidden sm:inline">Chat with us</span>
          </button>
        </DialogTrigger>

        {/* ── Dialog panel ── */}
        <DialogContent className="w-[calc(100vw-2rem)] max-w-105 overflow-hidden rounded-[20px] border border-[#E8D5C0] bg-[#FBF5EF] p-0 shadow-2xl shadow-[#4A2C0A]/20">
          <DialogTitle className="hidden"></DialogTitle>
          {/* Header */}
          <div className="flex items-center gap-3.5 bg-[#4A2C0A] px-5 py-4.5">
            <div className="flex h-10.5 w-10.5 shrink-0 items-center justify-center rounded-full bg-[#E8621A]">
              <MessageSquare className="h-4.5 w-4.5 text-white" />
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-3.75 font-bold leading-tight text-white">
                Honest HVAC Support
              </p>
              <p className="mt-0.5 flex items-center gap-1.5 text-xs text-[#F0834A]">
                <span className="inline-block h-1.75 w-1.75 shrink-0 rounded-full bg-green-400" />
                Online · typically replies in minutes
              </p>
            </div>
          </div>

          {/* Facebook CTA */}
          <div className="border-b border-[#E8D5C0] bg-[#FBF5EF] px-5 pb-5">
            <a
              href="https://m.me/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-[10px] bg-[#1877F2] px-4 py-2.5 text-[13px] font-semibold text-white transition hover:bg-[#1565D8]"
            >
              <User className="h-3.75 w-3.75" />
              Message us on Facebook
            </a>
          </div>

          {/* Messages list */}
          <div className="flex max-h-75 flex-col gap-2.5 overflow-y-auto bg-[#FBF5EF] px-4.5 py-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={[
                  "max-w-[82%] whitespace-pre-wrap px-3.5 py-2.5 text-[13.5px] leading-relaxed",
                  msg.role === "user"
                    ? "self-end rounded-[18px_18px_4px_18px] bg-[#E8621A] text-white"
                    : "self-start rounded-[18px_18px_18px_4px] border border-[#E8D5C0] bg-white text-[#4A2C0A]",
                ].join(" ")}
              >
                {msg.text}
              </div>
            ))}

            {/* Typing indicator */}
            {sending && (
              <div className="self-start rounded-[18px_18px_18px_4px] border border-[#E8D5C0] bg-white px-3.5 py-2.5">
                <div className="flex items-center gap-1">
                  <span className="chat-dot inline-block h-1.75 w-1.75 rounded-full bg-[#E8621A]" />
                  <span className="chat-dot inline-block h-1.75 w-1.75 rounded-full bg-[#E8621A]" />
                  <span className="chat-dot inline-block h-1.75 w-1.75 rounded-full bg-[#E8621A]" />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input area */}
          <div className="border-t border-[#E8D5C0] bg-white px-4.5 py-3.5">
            <div className="group flex items-center gap-2.5 rounded-[14px] border-[1.5px] border-[#E8D5C0] bg-[#FBF5EF] px-3.5 py-2 focus-within:border-[#E8621A] transition-colors">
              <Textarea
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type a message… (Enter to send)"
                rows={1}
                className=" min-h-0 flex-1 resize-none border-none bg-transparent p-0 text-sm text-[#4A2C0A] shadow-none placeholder:text-[#B8987A] focus-visible:ring-0 focus-visible:ring-offset-0"
              />
              <button
                type="button"
                onClick={handleSend}
                disabled={!draft.trim() || sending}
                aria-label="Send message"
                className={[
                  "flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] transition active:scale-90",
                  draft.trim() && !sending
                    ? "cursor-pointer bg-[#E8621A] text-white hover:bg-[#F0834A]"
                    : "cursor-not-allowed bg-[#E8D5C0] text-[#B8987A]",
                ].join(" ")}
              >
                <Send className="h-3.75 w-3.75" />
              </button>
            </div>

            <p className="mt-2 text-center text-[11px] text-[#C4A882]">
              Powered by Honest HVAC · Shift+Enter for new line
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
