"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Search, X } from "lucide-react";
import { useStore } from "@/lib/store";
import { searchProducts, searchSuggestions } from "@/lib/search";
import { formatINR } from "@/lib/utils";

export function SearchOverlay() {
  const { searchOpen, setSearchOpen } = useStore();
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const hits = useMemo(() => searchProducts(query), [query]);

  useEffect(() => {
    if (searchOpen) {
      setQuery("");
      const timer = window.setTimeout(() => inputRef.current?.focus(), 60);
      return () => window.clearTimeout(timer);
    }
    return undefined;
  }, [searchOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSearchOpen(false);
      if (e.key === "/" && !searchOpen && document.activeElement?.tagName !== "INPUT") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [searchOpen, setSearchOpen]);

  return (
    <AnimatePresence>
      {searchOpen ? (
        <div className="fixed inset-0 z-[85]" role="dialog" aria-modal="true" aria-label="Search products">
          <motion.div
            className="absolute inset-0 bg-mitti-900/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSearchOpen(false)}
            aria-hidden
          />
          <motion.div
            initial={{ y: -18, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -12, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="relative mx-auto flex h-full max-h-full w-full max-w-3xl flex-col bg-sand-50 sm:mt-16 sm:h-auto sm:max-h-[80vh] sm:rounded-xl sm:border sm:border-mitti-200 sm:shadow-lift"
          >
            <div className="flex items-center gap-3 border-b border-mitti-200 px-4 py-3.5">
              <Search className="h-5 w-5 shrink-0 text-mitti-400" aria-hidden />
              <input
                ref={inputRef}
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search cow dung cakes, diyas, havan cups…"
                aria-label="Search products"
                className="border-0 bg-transparent px-0 py-1 text-base focus:bg-transparent"
              />
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                aria-label="Close search"
                className="rounded p-2 text-mitti-500 hover:bg-mitti-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              {query.trim().length < 2 ? (
                <div>
                  <p className="eyebrow mb-3">Try searching for</p>
                  <div className="flex flex-wrap gap-2">
                    {searchSuggestions.map((suggestion) => (
                      <button
                        key={suggestion}
                        type="button"
                        onClick={() => setQuery(suggestion)}
                        className="rounded-full border border-mitti-200 bg-sand-100 px-3.5 py-1.5 text-sm text-mitti-700 hover:border-gerua-400 hover:text-gerua-600"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              ) : hits.length === 0 ? (
                <div className="py-10 text-center">
                  <p className="font-display text-lg font-semibold text-mitti-800">
                    Nothing matched &ldquo;{query}&rdquo;
                  </p>
                  <p className="mt-2 text-sm text-mitti-600">
                    Try a shorter word — &ldquo;upla&rdquo;, &ldquo;diya&rdquo;, &ldquo;havan&rdquo; — or browse the
                    full shop.
                  </p>
                  <Link
                    href="/shop"
                    onClick={() => setSearchOpen(false)}
                    className="mt-4 inline-block font-semibold text-gerua-600 underline underline-offset-4"
                  >
                    Browse all products
                  </Link>
                </div>
              ) : (
                <ul className="divide-y divide-mitti-200/70">
                  {hits.map(({ product }) => (
                    <li key={product.id}>
                      <Link
                        href={`/products/${product.slug}`}
                        onClick={() => setSearchOpen(false)}
                        className="flex items-center gap-4 rounded px-2 py-3 hover:bg-sand-100"
                      >
                        <span className="relative h-14 w-12 shrink-0 overflow-hidden rounded border border-mitti-200 bg-sand-100">
                          <Image
                            src={product.images[0]?.src ?? ""}
                            alt=""
                            fill
                            sizes="48px"
                            className="object-cover"
                          />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block truncate font-display text-[15px] font-semibold text-mitti-800">
                            {product.name}
                          </span>
                          <span className="block truncate text-xs text-mitti-500">{product.shortDescription}</span>
                        </span>
                        <span className="shrink-0 font-mono text-sm text-mitti-700">
                          {product.price > 0 ? formatINR(product.price) : "On quote"}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  );
}
