"use client";

import { Download } from "lucide-react";

export default function ResumeDownload() {
  return (
    <section
      id="resume"
      className="relative py-28 overflow-hidden"
      aria-label="Download Resume"
    >
      {/* Diagonal gradient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "linear-gradient(135deg, rgba(247,37,133,0.08) 0%, transparent 50%, rgba(76,201,240,0.08) 100%)",
        }}
      />
      {/* Grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        aria-hidden="true"
        style={{
          backgroundImage:
            "linear-gradient(rgba(247,37,133,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(76,201,240,0.06) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <p className="font-mono text-sm text-[var(--color-blue)] mb-4 tracking-widest uppercase">
          Full Picture
        </p>
        <h2 className="font-display text-4xl md:text-5xl font-extrabold text-[var(--color-text)] mb-6 leading-tight">
          Want the{" "}
          <span className="gradient-text">full picture?</span>
        </h2>
        <p className="font-body text-[var(--color-muted)] text-lg mb-10 max-w-xl mx-auto leading-relaxed">
          Download my resume for a complete overview of my experience, projects,
          and technical skills.
        </p>
        <a
          href="/Karema_Hamdy_CV.pdf"
          download
          id="resume-download-btn"
          data-cursor="Download"
          className="inline-flex items-center gap-3 px-10 py-4 rounded-full font-display font-bold text-lg text-white bg-[var(--color-pink)] glow-pink hover:scale-105 hover:brightness-110 transition-all animate-pulse-slow"
          aria-label="Download Karema Hamdy's resume PDF"
        >
          <Download size={22} aria-hidden="true" />
          Download Resume ↓
        </a>
      </div>
    </section>
  );
}
