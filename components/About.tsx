"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MapPin, Briefcase, Zap } from "lucide-react";
import Container from "./Container";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        leftRef.current,
        { x: -60, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        }
      );
      gsap.fromTo(
        rightRef.current,
        { x: 60, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.9, ease: "power3.out", delay: 0.15,
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-[var(--space-32)] overflow-hidden"
      aria-label="About Me"
    >
      {/* Decorative bg */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 10% 50%, rgba(247,37,133,0.04) 0%, transparent 70%)",
        }}
      />

      <Container className="grid md:grid-cols-2 gap-[var(--space-16)] items-center">
        {/* Left — decorative */}
        <div ref={leftRef} className="relative" aria-hidden="true">
          <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
            style={{ zIndex: 0 }}
          >
            <span
              className="font-display font-extrabold text-[clamp(5rem,15vw,10rem)] text-[var(--color-border)] leading-none tracking-tighter"
              style={{ opacity: 0.35 }}
            >
              FRONT
              <br />
              END
            </span>
          </div>

          {/* Grid overlay */}
          <div
            className="relative z-10 rounded-2xl overflow-hidden border border-[var(--color-border)] p-8 glass"
            style={{ minHeight: "360px" }}
          >
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(247,37,133,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(76,201,240,0.06) 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
              aria-hidden="true"
            />

            <div className="relative z-10 flex flex-col gap-6 justify-center h-full pt-8">
              <blockquote className="font-display text-2xl font-bold text-[var(--color-text)] leading-snug">
                &ldquo;Engineer by skill.<br />Problem-solver by nature.&rdquo;
              </blockquote>
              <div className="h-px w-24 bg-gradient-to-r from-[var(--color-pink)] to-[var(--color-blue)]" />
              <p className="font-mono text-sm text-[var(--color-muted)]">
                — Karema Hamdy Soliman
              </p>

              {/* Badges */}
              <div className="flex flex-wrap gap-3 mt-4">
                {[
                  { icon: MapPin, text: "Cairo, Egypt 🌍" },
                  { icon: Briefcase, text: "Open to Opportunities", dot: true },
                  { icon: Zap, text: "Growing → Full-Stack" },
                ].map(({ icon: Icon, text, dot }) => (
                  <span
                    key={text}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-[var(--color-border)] text-xs font-body text-[var(--color-muted)]"
                  >
                    {dot && (
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" aria-hidden="true" />
                    )}
                    <Icon size={12} aria-hidden="true" />
                    {text}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right — content */}
        <div ref={rightRef}>
          <p className="font-mono text-sm text-[var(--color-pink)] mb-[var(--space-3)] tracking-widest uppercase">
            Who I Am
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-extrabold text-[var(--color-text)] leading-tight mb-[var(--space-6)]">
            About{" "}
            <span className="gradient-text">Me</span>
          </h2>

          <div className="space-y-[var(--space-4)] font-body text-[var(--color-muted)] leading-relaxed text-[1.05rem]">
            <p>
              I&apos;m <strong className="text-[var(--color-text)]">Karema Hamdy</strong>, a Senior
              Frontend Developer with{" "}
              <strong className="text-[var(--color-pink)]">3+ years</strong> of experience crafting
              scalable, high-performance web applications across ERP, CMS, HR, and POS domains.
            </p>
            <p>
              I specialize in React and Vue ecosystems, with deep expertise in architecture, reusable
              component design, and performance optimization. I thrive at the intersection of complex
              business requirements and elegant user interfaces — translating dense logic into
              experiences that feel effortless.
            </p>
            <p>
              Whether building from scratch or migrating legacy systems, I bring{" "}
              <strong className="text-[var(--color-blue)]">structure, speed, and craft</strong> to
              every project. Currently based in Cairo, Egypt — open to senior roles, freelance
              collaborations, and ambitious remote opportunities worldwide.
            </p>
          </div>

          {/* Career goal */}
          <div className="mt-[var(--space-8)] inline-flex items-center gap-3 px-5 py-3 rounded-xl glass-pink border border-[rgba(247,37,133,0.2)]">
            <Zap size={16} className="text-[var(--color-pink)] flex-shrink-0" aria-hidden="true" />
            <span className="font-body text-sm text-[var(--color-text)]">
              Growing toward full-stack engineering ownership
            </span>
          </div>
        </div>
      </Container>
    </section>
  );
}
