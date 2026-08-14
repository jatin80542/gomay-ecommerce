"use client";

import { useId } from "react";
import { cn } from "@/lib/utils";

interface BaseProps {
  label: string;
  error?: string;
  hint?: string;
  required?: boolean;
  className?: string;
}

export function Field({
  label,
  error,
  hint,
  required,
  className,
  children,
  htmlFor,
}: BaseProps & { children: React.ReactNode; htmlFor: string }) {
  return (
    <div className={cn("", className)}>
      <label htmlFor={htmlFor} className="mb-1.5 flex items-baseline justify-between gap-2">
        <span>
          {label}
          {required ? <span className="ml-0.5 text-gerua-500">*</span> : null}
        </span>
        {hint ? <span className="text-xs font-normal text-mitti-400">{hint}</span> : null}
      </label>
      {children}
      {error ? (
        <p role="alert" className="mt-1.5 text-xs text-gerua-600">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function TextField({
  label,
  error,
  hint,
  required,
  className,
  ...props
}: BaseProps & React.InputHTMLAttributes<HTMLInputElement>) {
  const id = useId();
  return (
    <Field label={label} error={error} hint={hint} required={required} className={className} htmlFor={id}>
      <input
        id={id}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(error && "border-gerua-400")}
        {...props}
      />
    </Field>
  );
}

export function TextArea({
  label,
  error,
  hint,
  required,
  className,
  ...props
}: BaseProps & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const id = useId();
  return (
    <Field label={label} error={error} hint={hint} required={required} className={className} htmlFor={id}>
      <textarea id={id} rows={4} aria-invalid={Boolean(error)} className={cn(error && "border-gerua-400")} {...props} />
    </Field>
  );
}

export function SelectField({
  label,
  error,
  hint,
  required,
  className,
  options,
  ...props
}: BaseProps & { options: string[] } & React.SelectHTMLAttributes<HTMLSelectElement>) {
  const id = useId();
  return (
    <Field label={label} error={error} hint={hint} required={required} className={className} htmlFor={id}>
      <select id={id} aria-invalid={Boolean(error)} className={cn(error && "border-gerua-400")} {...props}>
        <option value="">Select…</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </Field>
  );
}

export function ChoiceGroup({
  label,
  options,
  value,
  onChange,
  error,
  columns = 3,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  error?: string;
  columns?: 2 | 3 | 4;
}) {
  return (
    <fieldset>
      <legend className="mb-2 text-sm font-medium text-mitti-700">{label}</legend>
      <div
        className={cn(
          "grid gap-2",
          columns === 2 ? "grid-cols-2" : columns === 3 ? "grid-cols-2 sm:grid-cols-3" : "grid-cols-2 sm:grid-cols-4"
        )}
      >
        {options.map((option) => (
          <button
            key={option}
            type="button"
            aria-pressed={value === option}
            onClick={() => onChange(option)}
            className={cn(
              "rounded border px-3 py-2.5 text-[13px] font-medium transition",
              value === option
                ? "border-gerua-500 bg-gerua-50 text-gerua-700"
                : "border-mitti-200 bg-sand-50 text-mitti-700 hover:border-mitti-400"
            )}
          >
            {option}
          </button>
        ))}
      </div>
      {error ? (
        <p role="alert" className="mt-1.5 text-xs text-gerua-600">
          {error}
        </p>
      ) : null}
    </fieldset>
  );
}

export function CheckboxGroup({
  label,
  options,
  values,
  onToggle,
}: {
  label: string;
  options: string[];
  values: string[];
  onToggle: (value: string) => void;
}) {
  return (
    <fieldset>
      <legend className="mb-2 text-sm font-medium text-mitti-700">{label}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            aria-pressed={values.includes(option)}
            onClick={() => onToggle(option)}
            className={cn(
              "rounded-full border px-3.5 py-1.5 text-[13px] transition",
              values.includes(option)
                ? "border-forest-500 bg-forest-50 text-forest-700"
                : "border-mitti-200 bg-sand-50 text-mitti-700 hover:border-mitti-400"
            )}
          >
            {option}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

export function FormSuccess({
  title,
  copy,
  reference,
  onReset,
  resetLabel = "Send another request",
}: {
  title: string;
  copy: string;
  reference: string;
  onReset: () => void;
  resetLabel?: string;
}) {
  return (
    <div className="rounded-lg border border-forest-200 bg-forest-50 p-8 text-center">
      <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-forest-600 text-sand-50">
        <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
          <path d="M4 12.5l5 5L20 7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <h3 className="mt-5 font-display text-xl font-bold text-forest-700">{title}</h3>
      <p className="mx-auto mt-2 max-w-md text-[15px] leading-relaxed text-forest-700/80">{copy}</p>
      <p className="mt-4 inline-block rounded border border-forest-200 bg-sand-50 px-3.5 py-2 font-mono text-xs text-forest-700">
        Reference {reference}
      </p>
      <div className="mt-6">
        <button
          type="button"
          onClick={onReset}
          className="font-display text-sm font-semibold text-forest-700 underline underline-offset-4"
        >
          {resetLabel}
        </button>
      </div>
    </div>
  );
}
