"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MapPin, Briefcase, Zap } from "lucide-react";
import Section from "./Section";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(leftRef.current, { x: -60, opacity: 0 }, {
        x: 0, opacity: 1, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
      });
      gsap.fromTo(rightRef.current, { x: 60, opacity: 0 }, {
        x: 0, opacity: 1, duration: 0.9, ease: "power3.out", delay: 0.15,
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const bgGlow = (
    <div style={{ background: "radial-gradient(ellipse 60% 50% at 10% 50%, rgba(247,37,133,0.04) 0%, transparent 70%)", inset: 0, position: "absolute" }} />
  );

  return (
    <Section
      id="about"
      ref={sectionRef}
      ariaLabel="About Me"
      bg={bgGlow}
      innerClassName="grid md:grid-cols-2 gap-[var(--space-20)] items-center"
    >
      {/* Left — decorative card */}
      <div ref={leftRef} className="relative" aria-hidden="true">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none" style={{ zIndex: 0 }}>
          <span className="font-display font-extrabold text-[clamp(5rem,15vw,10rem)] text-[var(--color-border)] leading-none tracking-tighter" style={{ opacity: 0.35 }}>
            FRONT<br />END
          </span>
        </div>
        <div className="relative z-10 rounded-2xl overflow-hidden border border-[var(--color-border)] p-8 glass" style={{ minHeight: "360px" }}>
          <div className="absolute inset-0" aria-hidden="true" style={{
            backgroundImage: "linear-gradient(rgba(247,37,133,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(76,201,240,0.06) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }} />
          <div className="relative z-10 flex flex-col gap-[var(--space-6)] justify-center h-full pt-[var(--space-8)]">
            <blockquote className="font-display text-2xl font-bold text-[var(--color-text)] leading-snug">
              &ldquo;Engineer by skill.<br />Problem-solver by nature.&rdquo;
            </blockquote>
            <div className="h-px w-24 bg-gradient-to-r from-[var(--color-pink)] to-[var(--color-blue)]" />
            <p className="font-mono text-sm text-[var(--color-muted)]">— Karema Hamdy Soliman</p>
            <div className="flex flex-wrap gap-[var(--space-3)] mt-[var(--space-4)]">
              {[
                { icon: MapPin, text: "Cairo, Egypt 🌍" },
                { icon: Briefcase, text: "Open to Opportunities", dot: true },
                { icon: Zap, text: "Growing → Full-Stack" },
              ].map(({ icon: Icon, text, dot }) => (
                <span key={text} className="flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-[var(--color-border)] text-xs font-body text-[var(--color-muted)]">
                  {dot && <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" aria-hidden="true" />}
                  <Icon size={12} aria-hidden="true" />
                  {text}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right — text content */}
      <div ref={rightRef} className="flex flex-col gap-[var(--space-6)]">
        <p className="font-mono text-sm text-[var(--color-pink)] tracking-widest uppercase">Who I Am</p>
        <h2 className="font-display text-4xl md:text-5xl font-extrabold text-[var(--color-text)] leading-tight">
          About <span className="gradient-text">Me</span>
        </h2>
        <div className="flex flex-col gap-[var(--space-4)] font-body text-[var(--color-muted)] leading-relaxed text-[1.05rem]">
          <p>I&apos;m <strong className="text-[var(--color-text)]">Karema Hamdy</strong>, a Senior Frontend Developer with{" "}<strong className="text-[var(--color-pink)]">3+ years</strong> of experience crafting scalable, high-performance web applications across ERP, CMS, HR, and POS domains.</p>
          <p>I specialize in React and Vue ecosystems, with deep expertise in architecture, reusable component design, and performance optimization. I thrive at the intersection of complex business requirements and elegant user interfaces.</p>
          <p>Whether building from scratch or migrating legacy systems, I bring{" "}<strong className="text-[var(--color-blue)]">structure, speed, and craft</strong> to every project. Currently based in Cairo, Egypt — open to senior roles, freelance collaborations, and ambitious remote opportunities worldwide.</p>
        </div>
        <div className="inline-flex items-center gap-[var(--space-3)] px-[var(--space-5)] py-[var(--space-3)] rounded-xl glass-pink border border-[rgba(247,37,133,0.2)] self-start">
          <Zap size={16} className="text-[var(--color-pink)] flex-shrink-0" aria-hidden="true" />
          <span className="font-body text-sm text-[var(--color-text)]">Growing toward full-stack engineering ownership</span>
        </div>
      </div>
    </Section>
  );
}
