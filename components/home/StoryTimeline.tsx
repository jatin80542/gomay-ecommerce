import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

const stages = [
  { title: "Gaushala", copy: "Collected from cattle sheds we buy from directly." },
  { title: "Responsible collection", copy: "Fresh material only, gathered the same morning." },
  { title: "Natural preparation", copy: "Cleaned and mixed with the binder each product needs." },
  { title: "Traditional craftsmanship", copy: "Patted, moulded or rolled by hand." },
  { title: "Drying", copy: "Open sun, turned through the cycle so it dries evenly." },
  { title: "Quality check", copy: "Sorted by thickness and finish; broken pieces go back." },
  { title: "Packaging", copy: "Ventilated cartons, straw separators, sealed pouches." },
  { title: "Your home", copy: "Or your temple, office, nursery or warehouse." },
];

export function StoryTimeline() {
  return (
    <Section tone="sand" id="sourcing">
      <div className="shell">
        <div className="mb-10 max-w-2xl">
          <p className="eyebrow mb-3">How it&apos;s made</p>
          <h2 className="text-[26px] leading-[1.15] sm:text-[34px] lg:text-[38px]">
            From <span className="deva">गौशाला</span> to your home
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-mitti-600">
            Eight steps, none of them rushed. Drying is the one that takes the longest and the one that decides
            whether a cake lights on the first try.
          </p>
        </div>

        {/* Horizontal rail on desktop, vertical timeline on mobile. */}
        <ol className="relative grid gap-y-7 lg:grid-cols-4 lg:gap-x-6 lg:gap-y-10">
          {stages.map((stage, index) => (
            <Reveal key={stage.title} delay={index * 60}>
              <li className="relative flex gap-4 lg:block">
                <div className="flex flex-col items-center lg:mb-4 lg:flex-row lg:gap-3">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-mitti-300 bg-sand-50 font-mono text-[11px] text-mitti-600">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="mt-1 w-px flex-1 bg-mitti-200 lg:mt-0 lg:h-px lg:w-full" aria-hidden />
                </div>
                <div className="pb-2 lg:pb-0">
                  <h3 className="font-display text-[15px] font-semibold text-mitti-800">{stage.title}</h3>
                  <p className="mt-1.5 text-[14px] leading-relaxed text-mitti-600">{stage.copy}</p>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </Section>
  );
}
