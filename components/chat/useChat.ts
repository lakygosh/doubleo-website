"use client";

import { useCallback, useRef, useState } from "react";

export type ChatMessage = {
  id: string;
  role: "user" | "bot" | "error";
  text: string;
};

/**
 * Same-origin proxy (app/api/chat/route.ts) rather than the n8n webhook
 * directly: the webhook only allows the production origin, so a direct call
 * fails CORS on localhost and on preview deploys.
 */
const CHAT_ENDPOINT = "/api/chat";
const STORAGE_KEY = "doubleo_chat_hero_session";
const TIMEOUT_MS = 45_000;

/**
 * Session id for the hero chat.
 *
 * Deliberately distinct from the floating widget's `doubleo_chat_session`:
 * both chats can be open at once, and a shared thread would interleave two
 * conversations in one n8n memory buffer.
 */
function getSessionId(): string {
  const fresh = () =>
    (crypto.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`).replace(
      /-/g,
      "",
    );
  try {
    const existing = localStorage.getItem(STORAGE_KEY);
    if (existing) return existing;
    const id = fresh();
    localStorage.setItem(STORAGE_KEY, id);
    return id;
  } catch {
    // Private mode / storage blocked — session lives for this page view only.
    return fresh();
  }
}

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [busy, setBusy] = useState(false);
  const sessionRef = useRef<string | null>(null);

  const send = useCallback(
    async (raw: string) => {
      const text = raw.trim();
      if (!text || busy) return;

      if (!sessionRef.current) sessionRef.current = getSessionId();

      setMessages((m) => [...m, { id: `u${Date.now()}`, role: "user", text }]);
      setBusy(true);

      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

      try {
        const res = await fetch(CHAT_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId: sessionRef.current, chatInput: text }),
          signal: controller.signal,
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        const reply = data?.output;
        setMessages((m) => [
          ...m,
          reply
            ? { id: `b${Date.now()}`, role: "bot", text: String(reply) }
            : { id: `e${Date.now()}`, role: "error", text: "" },
        ]);
      } catch {
        setMessages((m) => [...m, { id: `e${Date.now()}`, role: "error", text: "" }]);
      } finally {
        clearTimeout(timer);
        setBusy(false);
      }
    },
    [busy],
  );

  return { messages, busy, send };
}
