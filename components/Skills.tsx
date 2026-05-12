"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Section from "./Section";

gsap.registerPlugin(ScrollTrigger);

type Chip = { label: string; color: "pink" | "blue" };

const skillGroups: { title: string; chips: Chip[] }[] = [
  {
    title: "Core Frontend",
    chips: ["Vue.js", "React.js", "Next.js", "Nuxt.js", "TypeScript", "JavaScript ES6+", "HTML5", "CSS3"].map((l) => ({ label: l, color: "pink" })),
  },
  {
    title: "State & Data",
    chips: ["Pinia", "Vuex", "Redux Toolkit", "TanStack Query", "Zustand", "Context API"].map((l) => ({ label: l, color: "blue" })),
  },
  {
    title: "UI & Styling",
    chips: ["Tailwind CSS", "ShadCN/UI", "PrimeVue", "Vuetify", "MUI", "Framer Motion", "GSAP", "Sass"].map((l) => ({ label: l, color: "pink" })),
  },
  {
    title: "Tools & Infrastructure",
    chips: ["Vite", "Git", "GitHub Actions", "Nginx", "Axios", "Figma", "Swagger"].map((l) => ({ label: l, color: "blue" })),
  },
  {
    title: "Testing & Quality",
    chips: ["Vitest", "Jest", "Zod", "React Hook Form", "VeeValidate"].map((l) => ({ label: l, color: "pink" })),
  },
  {
    title: "Performance & APIs",
    chips: ["Core Web Vitals", "Lazy Loading", "Code Splitting", "WCAG/a11y", "RESTful APIs", "JWT", "Cookies"].map((l) => ({ label: l, color: "blue" })),
  },
];

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".skill-heading", { y: 30, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.7, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
      });
      gsap.fromTo(".skill-chip", { y: 30, opacity: 0, scale: 0.9 }, {
        y: 0, opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.5)",
        stagger: { amount: 0.8, from: "random" },
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
      });
      gsap.utils.toArray<HTMLElement>(".skill-chip").forEach((chip, i) => {
        gsap.to(chip, {
          y: `${-8 + (i % 5) * 3}px`,
          duration: 2.5 + (i % 4) * 0.4,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: i * 0.08,
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const bgGlow = (
    <div style={{ background: "radial-gradient(ellipse 70% 40% at 80% 50%, rgba(76,201,240,0.04) 0%, transparent 70%)", inset: 0, position: "absolute" }} />
  );

  return (
    <Section
      id="skills"
      ref={sectionRef}
      ariaLabel="Skills"
      bg={bgGlow}
      innerClassName="flex flex-col gap-[var(--space-16)]"
    >
      {/* Section heading */}
      <div className="skill-heading flex flex-col md:flex-row md:items-end md:justify-between gap-[var(--space-4)]">
        <div>
          <p className="font-mono text-sm text-[var(--color-blue)] mb-[var(--space-3)] tracking-widest uppercase">What I Work With</p>
          <h2 className="font-display text-4xl md:text-5xl font-extrabold text-[var(--color-text)]">
            My <span className="gradient-text">Toolkit</span>
          </h2>
        </div>
        <p className="font-body text-[var(--color-muted)] text-lg md:text-right md:max-w-xs">
          Technologies I build with daily
        </p>
      </div>

      {/* Skill groups */}
      <div className="flex flex-col gap-[var(--space-12)]">
        {skillGroups.map((group) => (
          <div key={group.title} className="flex flex-col gap-[var(--space-5)]">
            <h3 className="font-mono text-xs text-[var(--color-muted)] tracking-widest uppercase">
              {group.title}
            </h3>
            <div className="flex flex-wrap gap-[var(--space-3)]">
              {group.chips.map((chip) => (
                <span
                  key={chip.label}
                  className={`skill-chip relative px-4 py-2 rounded-full font-body text-sm font-medium transition-all cursor-default ${
                    chip.color === "pink"
                      ? "border border-[rgba(247,37,133,0.35)] text-[var(--color-pink)] bg-[rgba(247,37,133,0.05)] hover:border-[var(--color-pink)] hover:bg-[rgba(247,37,133,0.12)] hover:shadow-[0_0_20px_rgba(247,37,133,0.3)]"
                      : "border border-[rgba(76,201,240,0.35)] text-[var(--color-blue)] bg-[rgba(76,201,240,0.05)] hover:border-[var(--color-blue)] hover:bg-[rgba(76,201,240,0.12)] hover:shadow-[0_0_20px_rgba(76,201,240,0.3)]"
                  }`}
                  title={chip.label}
                >
                  {chip.label}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <p className="text-center font-mono text-sm text-[var(--color-muted)] italic">
        ...and always learning what&apos;s next.
      </p>
    </Section>
  );
}
