"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { submitNewsletter } from "@/lib/services/leads";
import { whatsappLink } from "@/config/brand";
import { cn } from "@/lib/utils";

export function Newsletter({ tone = "light" }: { tone?: "light" | "dark" }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const [busy, setBusy] = useState(false);
  const dark = tone === "dark";

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      setError("Enter a valid email address.");
      return;
    }
    setError("");
    setBusy(true);
    await submitNewsletter(email);
    setBusy(false);
    setDone(true);
    setEmail("");
  }

  return (
    <div className={cn(dark ? "rounded-lg border border-sand-200/15 bg-mitti-900/40 p-5" : "")}>
      <p className={cn("font-display font-semibold", dark ? "text-sand-50" : "text-mitti-800")}>
        Festival stock and restock alerts
      </p>
      <p className={cn("mt-1 text-[13px]", dark ? "text-sand-200/70" : "text-mitti-600")}>
        One email before each season — what&apos;s in production, what&apos;s closing. No daily mail.
      </p>

      {done ? (
        <p
          className={cn(
            "mt-4 flex items-center gap-2 text-sm",
            dark ? "text-saffron-300" : "text-forest-700"
          )}
        >
          <Check className="h-4 w-4" aria-hidden /> You&apos;re on the list.
        </p>
      ) : (
        <form onSubmit={onSubmit} className="mt-4" noValidate>
          <div className="flex gap-2">
            <div className="flex-1">
              <label htmlFor={`news-${tone}`} className="sr-only">
                Email address
              </label>
              <input
                id={`news-${tone}`}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                aria-invalid={Boolean(error)}
                className={cn(
                  dark && "border-sand-200/20 bg-mitti-900/40 text-sand-100 placeholder:text-sand-200/40"
                )}
              />
            </div>
            <button
              type="submit"
              disabled={busy}
              className={cn(
                "grid h-[46px] w-12 shrink-0 place-items-center rounded font-semibold transition disabled:opacity-60",
                dark ? "bg-saffron-500 text-mitti-900 hover:bg-saffron-300" : "bg-gerua-500 text-sand-50 hover:bg-gerua-600"
              )}
              aria-label="Subscribe"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
          {error ? (
            <p role="alert" className={cn("mt-1.5 text-xs", dark ? "text-saffron-300" : "text-gerua-600")}>
              {error}
            </p>
          ) : null}
        </form>
      )}

      <a
        href={whatsappLink("retail")}
        target="_blank"
        rel="noreferrer noopener"
        className={cn(
          "mt-3 inline-block text-[13px] underline underline-offset-4",
          dark ? "text-sand-200/70 hover:text-sand-50" : "text-mitti-600 hover:text-gerua-600"
        )}
      >
        Prefer WhatsApp? Message us instead
      </a>
    </div>
  );
}
