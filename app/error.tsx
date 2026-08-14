"use client";

import { useEffect } from "react";
import { ButtonLink } from "@/components/ui/Button";

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // Phase 2: forward to the error reporting service.
    console.error(error);
  }, [error]);

  return (
    <div className="shell flex flex-col items-center py-20 text-center sm:py-28">
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-gerua-600">Something broke</p>
      <h1 className="mt-4 text-[30px] font-extrabold leading-tight sm:text-[40px]">
        This page didn&apos;t load
      </h1>
      <p className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-mitti-600">
        The rest of the site is fine. Try again — if it keeps happening, message support and mention the reference
        below.
      </p>
      {error.digest ? (
        <p className="mt-3 rounded border border-mitti-200 bg-sand-100 px-3 py-1.5 font-mono text-xs text-mitti-600">
          {error.digest}
        </p>
      ) : null}
      <div className="mt-7 flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={reset}
          className="h-11 rounded bg-gerua-500 px-6 font-display font-semibold text-sand-50 hover:bg-gerua-600"
        >
          Try again
        </button>
        <ButtonLink href="/" variant="secondary">
          Go home
        </ButtonLink>
      </div>
    </div>
  );
}
