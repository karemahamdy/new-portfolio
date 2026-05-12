"use client";

import { Star, Quote } from "lucide-react";
import Container from "./Container";

const testimonials = [
  {
    name: "[Your Name Here]",
    role: "CEO at [Company]",
    text: "Karema delivered an incredibly polished product — her eye for detail and technical depth set her apart. Would hire again in a heartbeat.",
    stars: 5,
  },
  {
    name: "[Your Name Here]",
    role: "Product Manager at [Company]",
    text: "Working with Karema was seamless. She translated our complex ERP requirements into an intuitive interface that our team loves.",
    stars: 5,
  },
  {
    name: "[Your Name Here]",
    role: "CTO at [Company]",
    text: "Exceptional frontend architecture skills. Karema's Vue 3 migration saved us hours of load time and improved user retention significantly.",
    stars: 5,
  },
  {
    name: "[Your Name Here]",
    role: "Founder at [Startup]",
    text: "Fast, reliable, and communicative. Karema delivered a pixel-perfect implementation of our Figma designs on time and on budget.",
    stars: 5,
  },
  {
    name: "[Your Name Here]",
    role: "Tech Lead at [Company]",
    text: "Karema's component library became the backbone of our entire design system. Clean, reusable, and thoroughly documented.",
    stars: 5,
  },
];

function TestimonialCard({ t }: { t: typeof testimonials[0] }) {
  return (
    <div className="flex-shrink-0 w-80 glass rounded-2xl border border-[var(--color-border)] p-[var(--space-6)] mx-[var(--space-4)]">
      <Quote size={22} className="text-[var(--color-pink)] mb-[var(--space-3)] opacity-70" aria-hidden="true" />
      <p className="font-body text-sm text-[var(--color-muted)] leading-relaxed mb-[var(--space-5)] italic">&ldquo;{t.text}&rdquo;</p>
      <div className="flex items-center gap-[var(--space-1)] mb-[var(--space-3)]" aria-label={`${t.stars} stars`}>
        {Array.from({ length: t.stars }).map((_, i) => (
          <Star key={i} size={12} className="text-yellow-400 fill-yellow-400" aria-hidden="true" />
        ))}
      </div>
      <div className="h-px bg-gradient-to-r from-[var(--color-pink)] to-[var(--color-blue)] mb-[var(--space-4)] opacity-30" aria-hidden="true" />
      <div>
        <p className="font-display font-bold text-sm text-[var(--color-text)]">{t.name}</p>
        <p className="font-body text-xs text-[var(--color-muted)]">{t.role}</p>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const doubled = [...testimonials, ...testimonials];

  return (
    <section id="testimonials" className="relative py-[var(--space-32)] overflow-hidden" aria-label="Testimonials">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true"
        style={{ background: "radial-gradient(ellipse 50% 40% at 50% 50%, rgba(247,37,133,0.04) 0%, transparent 70%)" }} />

      <Container className="mb-[var(--space-16)]">
        <div className="text-center">
          <p className="font-mono text-sm text-[var(--color-blue)] mb-[var(--space-3)] tracking-widest uppercase">Testimonials</p>
          <h2 className="font-display text-4xl md:text-5xl font-extrabold text-[var(--color-text)] mb-[var(--space-4)]">
            Kind <span className="gradient-text">Words</span>
          </h2>
          <p className="font-body text-[var(--color-muted)]">
            Real testimonials will appear here — placeholder cards shown below.
          </p>
        </div>
      </Container>

      {/* Marquee */}
      <div
        className="flex overflow-hidden"
        style={{ maskImage: "linear-gradient(90deg, transparent, black 10%, black 90%, transparent)" }}
        role="region"
        aria-label="Scrolling testimonials"
      >
        <div className="flex animate-marquee hover:[animation-play-state:paused]" aria-hidden="false">
          {doubled.map((t, i) => (
            <TestimonialCard key={i} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
