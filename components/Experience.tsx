"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GraduationCap, Briefcase } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    id: "mechatronics",
    accent: "blue",
    company: "Mechatronics Group",
    role: "Senior Front-End Developer",
    period: "Nov 2025 – Present",
    location: "Cairo, Egypt",
    bullets: [
      "Architected full-scale ERP system from scratch",
      "Component system that cut sprint time by 50%",
      "5 core modules: Inventory, Access Control, Settings, Production",
      "Nginx + GitHub Actions CI/CD deployment pipeline",
    ],
    stack: ["Vue.js", "Nuxt.js", "TypeScript", "Pinia", "Tailwind", "PrimeVue"],
  },
  {
    id: "cloud-secrets",
    accent: "pink",
    company: "Cloud Secrets",
    role: "Front-End Developer",
    period: "Dec 2024 – Oct 2025",
    location: "Cairo, Egypt",
    bullets: [
      "End-to-end ownership of multiple SaaS ERP systems",
      "Vue 2 → Vue 3 migration: load time 5 min → under 1 min (80% improvement)",
      "15 business modules: Shipping, HR, Accounting, and more",
    ],
    stack: ["Vue.js", "Nuxt.js", "Vuex", "Vuetify", "JWT", "Axios"],
  },
  {
    id: "barqify",
    accent: "blue",
    company: "Barqify",
    role: "Front-End Developer (Freelance)",
    period: "Jun 2025 – Aug 2025",
    location: "Remote",
    bullets: [
      "Two large-scale apps: ERP system + CMS platform",
      "Multi-role LMS with dynamic dashboards and RBAC",
    ],
    stack: ["React.js", "Next.js", "TypeScript", "TanStack Query", "ShadCN/UI"],
  },
  {
    id: "bltzo",
    accent: "pink",
    company: "BLTZO",
    role: "Front-End Developer",
    period: "Nov 2023 – Jun 2024",
    location: "Cairo, Egypt",
    bullets: [
      "Client apps: games, e-commerce, portfolio websites",
      "Pixel-perfect Figma-to-code delivery",
    ],
    stack: ["React.js", "TypeScript", "Tailwind", "MUI", "Redux Toolkit"],
  },
];

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(lineRef.current, { scaleY: 0, transformOrigin: "top" }, {
        scaleY: 1, duration: 1.5, ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
      });
      gsap.utils.toArray<HTMLElement>(".tl-card").forEach((card, i) => {
        gsap.fromTo(card, { x: i % 2 === 0 ? -50 : 50, opacity: 0 }, {
          x: 0, opacity: 1, duration: 0.7, ease: "power3.out", delay: i * 0.1,
          scrollTrigger: { trigger: card, start: "top 85%" },
        });
      });
      gsap.utils.toArray<HTMLElement>(".tl-node").forEach((n) => {
        gsap.to(n, { boxShadow: "0 0 16px 5px rgba(247,37,133,0.5)", duration: 1.2, ease: "sine.inOut", yoyo: true, repeat: -1 });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" ref={sectionRef} className="relative py-32 overflow-hidden" aria-label="Experience">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true"
        style={{ background: "radial-gradient(ellipse 50% 60% at 90% 40%, rgba(247,37,133,0.04) 0%, transparent 70%)" }} />
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <p className="font-mono text-sm text-[var(--color-blue)] mb-3 tracking-widest uppercase">Career Path</p>
          <h2 className="font-display text-4xl md:text-5xl font-extrabold text-[var(--color-text)] mb-4">
            Career <span className="gradient-text">Journey</span>
          </h2>
        </div>

        <div className="relative">
          <div ref={lineRef} className="timeline-line absolute left-5 md:left-1/2 top-0 bottom-0 w-px md:-translate-x-px" aria-hidden="true" />

          <div className="space-y-12">
            {experiences.map((exp, i) => {
              const isPink = exp.accent === "pink";
              return (
                <div key={exp.id} className={`tl-card relative flex gap-6 md:gap-0 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                  {/* Node */}
                  <div className="absolute left-3 md:left-1/2 top-6 md:-translate-x-1/2 z-10">
                    <div className={`tl-node w-5 h-5 rounded-full border-2 ${isPink ? "bg-[var(--color-pink)] border-[var(--color-pink)]" : "bg-[var(--color-blue)] border-[var(--color-blue)]"}`} aria-hidden="true" />
                  </div>
                  {/* Card */}
                  <div className={`ml-14 md:ml-0 md:w-[calc(50%-2.5rem)] glass rounded-2xl p-6 border transition-all
                    ${i % 2 === 0 ? "md:mr-auto" : "md:ml-auto"}
                    ${isPink ? "border-[rgba(247,37,133,0.2)] hover:border-[rgba(247,37,133,0.4)]" : "border-[rgba(76,201,240,0.2)] hover:border-[rgba(76,201,240,0.4)]"}`}>
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div>
                        <h3 className="font-display font-bold text-lg text-[var(--color-text)]">{exp.company}</h3>
                        <p className={`font-body text-sm font-medium ${isPink ? "text-[var(--color-pink)]" : "text-[var(--color-blue)]"}`}>{exp.role}</p>
                      </div>
                      <Briefcase size={16} className="text-[var(--color-muted)] flex-shrink-0" aria-hidden="true" />
                    </div>
                    <p className="font-mono text-xs text-[var(--color-muted)] mb-4">{exp.period} · {exp.location}</p>
                    <ul className="space-y-1.5 mb-4">
                      {exp.bullets.map((b, bi) => (
                        <li key={bi} className="font-body text-sm text-[var(--color-muted)] flex gap-2">
                          <span className={`mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0 ${isPink ? "bg-[var(--color-pink)]" : "bg-[var(--color-blue)]"}`} aria-hidden="true" />
                          {b}
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap gap-2">
                      {exp.stack.map((s) => (
                        <span key={s} className="px-2.5 py-1 rounded-full text-xs font-mono bg-[var(--color-border)] text-[var(--color-muted)]">{s}</span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Education divider */}
            <div className="relative flex justify-center py-2">
              <div className="z-10 px-6 py-2 glass rounded-full border border-[var(--color-border)] font-mono text-xs text-[var(--color-muted)]">
                Education & Certifications
              </div>
            </div>

            {/* Education */}
            <div className="tl-card relative flex gap-6">
              <div className="absolute left-3 top-6 z-10">
                <div className="tl-node w-5 h-5 rounded-full bg-[var(--color-blue)] border-2 border-[var(--color-blue)]" aria-hidden="true" />
              </div>
              <div className="ml-14 glass rounded-2xl p-6 border border-[rgba(76,201,240,0.2)] hover:border-[rgba(76,201,240,0.4)] transition-all w-full md:w-[calc(50%-2.5rem)]">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div>
                    <h3 className="font-display font-bold text-lg text-[var(--color-text)]">Al-Azhar University, Faculty of Science</h3>
                    <p className="font-body text-sm font-medium text-[var(--color-blue)]">BSc — Computer Science & Mathematics</p>
                  </div>
                  <GraduationCap size={16} className="text-[var(--color-muted)] flex-shrink-0" aria-hidden="true" />
                </div>
                <p className="font-mono text-xs text-[var(--color-muted)]">2020 – 2024 · Cairo, Egypt</p>
              </div>
            </div>

            {/* Cert placeholder */}
            <div className="tl-card relative flex gap-6">
              <div className="absolute left-3 top-5 z-10">
                <div className="w-5 h-5 rounded-full border-2 border-dashed border-[var(--color-muted)]" aria-hidden="true" />
              </div>
              <div className="ml-14 glass rounded-xl p-5 border border-dashed border-[var(--color-border)] w-full">
                <p className="font-mono text-xs text-[var(--color-muted)] italic">Certifications coming soon...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
