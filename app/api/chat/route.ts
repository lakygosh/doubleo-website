import { NextResponse } from "next/server";
import { z } from "zod";
import { CHAT_WEBHOOK_URL } from "@/lib/config";

/**
 * Server-side proxy to the n8n chat agent.
 *
 * The webhook sets `Access-Control-Allow-Origin: https://doubleo.agency`, so a
 * browser calling it directly only works on the production domain — never on
 * localhost or a Vercel preview. Going through this route makes the request
 * same-origin, so the chat behaves identically in every environment, and it
 * keeps the webhook URL off the client.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const Body = z.object({
  sessionId: z.string().min(1).max(200),
  chatInput: z.string().min(1).max(4000),
});

const TIMEOUT_MS = 45_000;

export async function POST(request: Request) {
  let parsed;
  try {
    parsed = Body.parse(await request.json());
  } catch {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const upstream = await fetch(CHAT_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // Exactly the payload shape the n8n workflow expects.
      body: JSON.stringify({
        sessionId: parsed.sessionId,
        action: "sendMessage",
        chatInput: parsed.chatInput,
      }),
      signal: controller.signal,
      cache: "no-store",
    });

    if (!upstream.ok) {
      return NextResponse.json({ error: "upstream" }, { status: 502 });
    }

    const data = await upstream.json();
    const output = data?.output ?? data?.text ?? data?.message;
    if (typeof output !== "string" || !output.trim()) {
      return NextResponse.json({ error: "empty" }, { status: 502 });
    }

    return NextResponse.json({ output });
  } catch {
    return NextResponse.json({ error: "unreachable" }, { status: 502 });
  } finally {
    clearTimeout(timer);
  }
}
