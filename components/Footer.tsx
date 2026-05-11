"use client";

import { useState } from "react";
import {  Mail } from "lucide-react";

export default function Footer() {
  const [eggCount, setEggCount] = useState(0);
  const [eggOpen, setEggOpen] = useState(false);

  const handleLogoClick = () => {
    const next = eggCount + 1;
    setEggCount(next);
    if (next >= 3) {
      setEggOpen(true);
      setEggCount(0);
      setTimeout(() => setEggOpen(false), 4000);
    }
  };

  return (
    <footer className="relative border-t border-[var(--color-border)] py-12 overflow-hidden" role="contentinfo">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true"
        style={{ background: "linear-gradient(to top, rgba(247,37,133,0.03), transparent)" }} />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo + tagline */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <button
              onClick={handleLogoClick}
              id="footer-logo"
              aria-label="Karema Hamdy logo (click 3 times for Easter egg)"
              className="font-mono text-xl font-bold text-[var(--color-pink)] text-glow-pink hover:scale-110 transition-transform cursor-pointer bg-transparent border-none"
            >
              &lt;KH /&gt;
            </button>
            <p className="font-body text-xs text-[var(--color-muted)]">
              Built with React, Tailwind &amp; GSAP
            </p>
          </div>

          {/* Center */}
          <div className="text-center">
            <p className="font-mono text-xs text-[var(--color-muted)]">karemahamdy51@gmail.com · Cairo, Egypt</p>
            <p className="font-mono text-xs text-[var(--color-muted)] mt-1">
              © 2025 Karema Hamdy. All rights reserved.
            </p>
          </div>

          {/* Social */}
          <div className="flex items-center gap-4" aria-label="Social media links">
            {[
              { href: "https://github.com/karemahamdy", icon: Mail, label: "GitHub" },
              { href: "https://linkedin.com/in/karema-hamdy2010", icon: Mail, label: "LinkedIn" },
              { href: "mailto:karemahamdy51@gmail.com", icon: Mail, label: "Email" },
            ].map(({ href, icon: Icon, label }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                className="p-2.5 rounded-full border border-[var(--color-border)] text-[var(--color-muted)] hover:text-[var(--color-pink)] hover:border-[var(--color-pink)] transition-all" data-cursor={label}>
                <Icon size={16} aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Easter egg terminal popup */}
      {eggOpen && (
        <div
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 glass-pink rounded-xl px-8 py-5 border border-[rgba(247,37,133,0.4)] shadow-[0_0_40px_rgba(247,37,133,0.3)] text-center"
          role="alert"
          aria-live="polite"
        >
          <p className="font-mono text-sm text-[var(--color-pink)]">
            &gt; Hello, curious developer 👩‍💻
          </p>
          <p className="font-mono text-xs text-[var(--color-muted)] mt-1">
            You found the Easter egg! 🎉
          </p>
        </div>
      )}
    </footer>
  );
}
