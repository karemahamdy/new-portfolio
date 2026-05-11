"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Download, Menu, X, Sun, Moon } from "lucide-react";

const links = [
  { href: "#hero", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#services", label: "Services" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dark, setDark] = useState(true);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const html = document.documentElement;
    if (dark) html.classList.remove("light");
    else html.classList.add("light");
  }, [dark]);

  useEffect(() => {
    if (mobileOpen) {
      gsap.fromTo(".mobile-menu", { x: "100%" }, { x: "0%", duration: 0.4, ease: "power3.out" });
    }
  }, [mobileOpen]);

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "glass border-b border-[var(--color-border)] py-12 backdrop-blur-sm"
            : "py-8 bg-transparent"
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-7xl m px-12 flex justify-between items-center  py-6 justify-between min-h-[50px]">
          {/* Logo */}
          <a
            href="#hero"
            id="nav-logo"
            className="font-mono text-lg font-bold text-[var(--color-pink)] text-glow-pink hover:scale-110 transition-transform"
            aria-label="Karema Hamdy - Home"
          >
            &lt;KH /&gt;
          </a>

          {/* Desktop Links */}
          <ul className="hidden md:flex items-center gap-8" role="list">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="font-body text-sm text-[var(--color-muted)] hover:text-[var(--color-pink)] transition-colors relative group"
                  data-cursor="Go"
                >
                  {l.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-[var(--color-pink)] group-hover:w-full transition-all duration-300" />
                </a>
              </li>
            ))}
          </ul>

          {/* Right side */}
          <div className="hidden md:flex items-center gap-4">
            <button
              id="theme-toggle"
              onClick={() => setDark(!dark)}
              className="p-2 rounded-full border border-[var(--color-border)] text-[var(--color-muted)] hover:text-[var(--color-blue)] hover:border-[var(--color-blue)] transition-all"
              aria-label="Toggle dark/light mode"
              data-cursor="Theme"
            >
              {dark ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <a
              href="/Karema_Hamdy_CV.pdf"
              download
              id="nav-download-cv"
              className="flex items-center gap-2 px-4 py-2 border border-[var(--color-blue)] text-[var(--color-blue)] rounded-full text-sm font-body font-medium hover:bg-[var(--color-blue)] hover:text-[var(--color-bg)] transition-all glow-blue"
              data-cursor="Download"
            >
              <Download size={14} />
              Download CV
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            id="mobile-menu-btn"
            className="md:hidden text-[var(--color-text)]"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="mobile-menu fixed inset-0 z-40 glass flex flex-col items-center justify-center gap-8"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          <button
            className="absolute top-6 right-6 text-[var(--color-muted)]"
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
          >
            <X size={28} />
          </button>
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMobileOpen(false)}
              className="font-display text-3xl font-bold text-[var(--color-text)] hover:text-[var(--color-pink)] transition-colors"
            >
              {l.label}
            </a>
          ))}
          <div className="flex items-center gap-4 mt-4">
            <button
              onClick={() => setDark(!dark)}
              className="p-2 border border-[var(--color-border)] rounded-full text-[var(--color-muted)]"
              aria-label="Toggle theme"
            >
              {dark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <a
              href="/Karema_Hamdy_CV.pdf"
              download
              className="flex items-center gap-2 px-5 py-2 border border-[var(--color-blue)] text-[var(--color-blue)] rounded-full font-medium glow-blue"
            >
              <Download size={14} /> Download CV
            </a>
          </div>
        </div>
      )}
    </>
  );
}
