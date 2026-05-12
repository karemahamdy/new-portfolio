"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Mail, ArrowDown, Download } from "lucide-react";
import dynamic from "next/dynamic";
import Container from "./Container";

const ThreeBackground = dynamic(() => import("./ThreeBackground"), { ssr: false });

const roles = [
  "Senior Frontend Developer",
  "React & Vue Specialist",
  "ERP Systems Architect",
  "Performance Engineer",
];

const stats = [
  { value: 3, suffix: "+", label: "Years of Experience" },
  { value: 15, suffix: "+", label: "Business Modules" },
  { value: 2, suffix: "", label: "Frameworks Mastered" },
  { value: 80, suffix: "%", label: "Performance Boost" },
];

function useTypewriter(words: string[], speed = 90, pause = 1800) {
  const [text, setText] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIdx];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && charIdx < current.length) {
      timeout = setTimeout(() => setCharIdx((c) => c + 1), speed);
    } else if (!deleting && charIdx === current.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => setCharIdx((c) => c - 1), speed / 2);
    } else {
      setDeleting(false);
      setWordIdx((w) => (w + 1) % words.length);
    }

    return () => clearTimeout(timeout);
  }, [text, charIdx, deleting, wordIdx, words, speed, pause]);

  useEffect(() => {
    setText(words[wordIdx].slice(0, charIdx));
  }, [charIdx, wordIdx, words]);

  return text;
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const roleRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);
  const [counts, setCounts] = useState(stats.map(() => 0));
  const [statsVisible, setStatsVisible] = useState(false);

  const typedRole = useTypewriter(roles);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.fromTo(labelRef.current, { y: -20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, delay: 0.3 })
      .fromTo(
        ".hero-letter",
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.04 },
        "-=0.2"
      )
      .fromTo(roleRef.current, { opacity: 0 }, { opacity: 1, duration: 0.5 }, "-=0.2")
      .fromTo(taglineRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, "-=0.1")
      .fromTo(statsRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, onComplete: () => setStatsVisible(true) }, "-=0.1")
      .fromTo(ctaRef.current, { y: 20, opacity: 0, scale: 0.95 }, { y: 0, opacity: 1, scale: 1, duration: 0.4 }, "-=0.1")
      .fromTo(socialRef.current, { opacity: 0 }, { opacity: 1, duration: 0.4 }, "-=0.1");
  }, []);

  useEffect(() => {
    if (!statsVisible) return;
    stats.forEach((s, i) => {
      let start = 0;
      const step = s.value / 60;
      const interval = setInterval(() => {
        start += step;
        if (start >= s.value) {
          start = s.value;
          clearInterval(interval);
        }
        setCounts((prev) => {
          const next = [...prev];
          next[i] = Math.floor(start);
          return next;
        });
      }, 20);
    });
  }, [statsVisible]);

  const letters = "KAREMA\nHAMDY".split("\n");

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      aria-label="Hero section"
    >
      <ThreeBackground />

      {/* Radial glow */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 60%, rgba(247,37,133,0.08) 0%, transparent 70%), radial-gradient(ellipse 50% 40% at 50% 30%, rgba(76,201,240,0.06) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <Container className="relative z-10 text-center pt-[var(--space-24)] pb-[var(--space-16)]">
        {/* Available badge */}
        <div
          ref={labelRef}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--color-border)] glass text-sm font-body text-[var(--color-muted)] mb-[var(--space-10)]"
          aria-label="Availability status"
        >
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" aria-hidden="true" />
          Available for Work · Cairo, Egypt
        </div>

        {/* Main heading with letter animation */}
        <div ref={headingRef} className="overflow-hidden mb-[var(--space-6)]" aria-label="Karema Hamdy">
          {letters.map((line, li) => (
            <div key={li} className="flex justify-center flex-wrap overflow-hidden">
              {line.split("").map((char, ci) => (
                <span
                  key={`${li}-${ci}`}
                  className="hero-letter inline-block font-display font-extrabold leading-none select-none"
                  style={{
                    fontSize: "clamp(3.5rem, 12vw, 9rem)",
                    background: ci % 3 === 0
                      ? "linear-gradient(135deg, #f72585 0%, #4cc9f0 100%)"
                      : "linear-gradient(135deg, #e2e8f0 0%, #94a3b8 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    letterSpacing: "-0.02em",
                    marginRight: char === " " ? "1.5rem" : "0.02em",
                  }}
                  aria-hidden="true"
                >
                  {char}
                </span>
              ))}
            </div>
          ))}
        </div>

        {/* Typing role */}
        <div
          ref={roleRef}
          className="font-mono text-lg md:text-2xl mb-[var(--space-6)] h-8 flex items-center justify-center gap-1"
          aria-live="polite"
          aria-label={`Current role: ${typedRole}`}
        >
          <span className="text-[var(--color-pink)]">/&gt;&nbsp;</span>
          <span className="text-[var(--color-blue)]">{typedRole}</span>
          <span className="w-0.5 h-6 bg-[var(--color-pink)] animate-blink" aria-hidden="true" />
        </div>

        {/* Tagline */}
        <p
          ref={taglineRef}
          className="font-body text-[var(--color-muted)] text-base md:text-lg max-w-xl mx-auto leading-relaxed mb-[var(--space-12)]"
        >
          Building scalable frontend systems that turn complex business logic
          into seamless user experiences.
        </p>

        {/* Stats */}
        <div
          ref={statsRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-[var(--space-12)] max-w-3xl mx-auto"
          aria-label="Key statistics"
        >
          {stats.map((s, i) => (
            <div key={i} className="text-center group">
              <div
                className="font-display font-extrabold text-3xl md:text-4xl gradient-text mb-1"
                aria-label={`${s.value}${s.suffix} ${s.label}`}
              >
                {counts[i]}{s.suffix}
              </div>
              <div className="text-xs text-[var(--color-muted)] font-body">{s.label}</div>
              <div className="h-px mt-2 mx-auto w-12 bg-gradient-to-r from-[var(--color-pink)] to-[var(--color-blue)] rounded-full" aria-hidden="true" />
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div
          ref={ctaRef}
          className="flex flex-wrap items-center justify-center gap-4 mb-[var(--space-10)]"
        >
          <a
            href="#projects"
            id="hero-view-work"
            className="px-8 py-3.5 rounded-full font-body font-semibold text-white bg-[var(--color-pink)] glow-pink hover:scale-105 hover:brightness-110 transition-all"
            data-cursor="View"
          >
            View My Work
          </a>
          <a
            href="/Karema_Hamdy_CV.pdf"
            download
            id="hero-download-cv"
            className="flex items-center gap-2 px-8 py-3.5 rounded-full font-body font-semibold border border-[var(--color-blue)] text-[var(--color-blue)] glow-blue hover:bg-[var(--color-blue)] hover:text-[var(--color-bg)] transition-all"
            data-cursor="Download"
          >
            <Download size={16} /> Download CV
          </a>
          <a
            href="#contact"
            id="hero-connect"
            className="px-8 py-3.5 rounded-full font-body font-semibold text-[var(--color-muted)] hover:text-[var(--color-text)] border border-transparent hover:border-[var(--color-border)] transition-all"
            data-cursor="Connect"
          >
            Let&apos;s Connect
          </a>
        </div>

        {/* Social Icons */}
        <div
          ref={socialRef}
          className="flex items-center justify-center gap-6"
          aria-label="Social links"
        >
          {[
            { href: "https://github.com/karemahamdy", icon: Mail, label: "GitHub", tip: "GitHub" },
            { href: "https://linkedin.com/in/karema-hamdy2010", icon: Mail, label: "LinkedIn", tip: "LinkedIn" },
            { href: "mailto:karemahamdy51@gmail.com", icon: Mail, label: "Email", tip: "Email" },
          ].map(({ href, icon: Icon, label, tip }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              data-cursor={tip}
              className="relative group p-3 rounded-full border border-[var(--color-border)] text-[var(--color-muted)] hover:text-[var(--color-pink)] hover:border-[var(--color-pink)] hover:glow-pink transition-all"
            >
              <Icon size={20} />
              <span className="absolute -top-9 left-1/2 -translate-x-1/2 bg-[var(--color-surface)] border border-[var(--color-border)] text-xs text-[var(--color-text)] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                {tip}
              </span>
            </a>
          ))}
        </div>
      </Container>

      {/* Scroll indicator */}
      <a
        href="#about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-[var(--color-muted)] hover:text-[var(--color-pink)] transition-colors animate-bounce"
        aria-label="Scroll to About section"
      >
        <ArrowDown size={22} />
      </a>
    </section>
  );
}
