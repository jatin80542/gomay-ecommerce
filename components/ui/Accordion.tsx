"use client";

import { useId, useState } from "react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AccordionItem {
  question: string;
  answer: React.ReactNode;
}

export function Accordion({
  items,
  defaultOpen = -1,
  className,
}: {
  items: AccordionItem[];
  defaultOpen?: number;
  className?: string;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const id = useId();

  return (
    <div className={cn("divide-y divide-mitti-200 border-y border-mitti-200", className)}>
      {items.map((item, index) => {
        const isOpen = open === index;
        return (
          <div key={item.question}>
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`${id}-panel-${index}`}
                id={`${id}-trigger-${index}`}
                onClick={() => setOpen(isOpen ? -1 : index)}
                className="flex w-full items-start justify-between gap-6 py-5 text-left"
              >
                <span className="font-display text-[15px] font-semibold text-mitti-800 sm:text-base">
                  {item.question}
                </span>
                <Plus
                  className={cn(
                    "mt-0.5 h-5 w-5 shrink-0 text-gerua-500 transition-transform duration-300",
                    isOpen && "rotate-45"
                  )}
                  aria-hidden
                />
              </button>
            </h3>
            <div
              id={`${id}-panel-${index}`}
              role="region"
              aria-labelledby={`${id}-trigger-${index}`}
              hidden={!isOpen}
              className="pb-6 pr-10 text-[15px] leading-relaxed text-mitti-600"
            >
              {item.answer}
            </div>
          </div>
        );
      })}
    </div>
  );
}
