import { cn } from "@/lib/utils";

export function Section({
  children,
  className,
  tone = "default",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "default" | "sand" | "paper" | "dark" | "forest";
  id?: string;
}) {
  const tones = {
    default: "bg-sand-50",
    sand: "bg-sand-100",
    paper: "paper",
    dark: "bg-mitti-800 text-sand-100",
    forest: "bg-forest-600 text-sand-50",
  } as const;
  return (
    <section id={id} className={cn("py-14 sm:py-20", tones[tone], className)}>
      {children}
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  hindi,
  copy,
  align = "left",
  action,
  tone = "dark-text",
}: {
  eyebrow?: string;
  title: React.ReactNode;
  hindi?: string;
  copy?: string;
  align?: "left" | "center";
  action?: React.ReactNode;
  tone?: "dark-text" | "light-text";
}) {
  const light = tone === "light-text";
  return (
    <div
      className={cn(
        "mb-8 flex flex-col gap-4 sm:mb-11",
        align === "center" ? "items-center text-center" : "sm:flex-row sm:items-end sm:justify-between"
      )}
    >
      <div className="max-w-2xl">
        {eyebrow ? <p className={cn("eyebrow mb-3", light && "text-saffron-300")}>{eyebrow}</p> : null}
        <h2 className={cn("text-[26px] leading-[1.15] sm:text-[34px] lg:text-[38px]", light && "text-sand-50")}>
          {title}
        </h2>
        {hindi ? (
          <p className={cn("deva mt-2 text-lg", light ? "text-sand-200/80" : "text-mitti-500")}>{hindi}</p>
        ) : null}
        {copy ? (
          <p className={cn("mt-3 text-[15px] leading-relaxed", light ? "text-sand-200/85" : "text-mitti-600")}>
            {copy}
          </p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
