import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "dark" | "outline";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 font-display font-semibold rounded transition-all duration-200 " +
  "disabled:opacity-50 disabled:pointer-events-none active:translate-y-px whitespace-nowrap";

const variants: Record<Variant, string> = {
  primary: "bg-gerua-500 text-sand-50 hover:bg-gerua-600 shadow-[0_1px_0_rgba(0,0,0,0.06)]",
  secondary: "bg-sand-50 text-mitti-800 border border-mitti-300 hover:border-mitti-500 hover:bg-white",
  outline: "bg-transparent text-mitti-800 border border-mitti-800/25 hover:border-mitti-800/60",
  ghost: "bg-transparent text-mitti-700 hover:bg-mitti-100/70",
  dark: "bg-mitti-800 text-sand-100 hover:bg-mitti-900",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-3.5 text-[13px]",
  md: "h-11 px-5 text-[15px]",
  lg: "h-[52px] px-7 text-base",
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: CommonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={cn(base, variants[variant], sizes[size], className)} {...props}>
      {children}
    </button>
  );
}

export function ButtonLink({
  variant = "primary",
  size = "md",
  className,
  children,
  href,
  ...props
}: CommonProps & { href: string } & Omit<React.ComponentProps<typeof Link>, "href" | "className" | "children">) {
  return (
    <Link href={href} className={cn(base, variants[variant], sizes[size], className)} {...props}>
      {children}
    </Link>
  );
}
