"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink, Mail } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: "erp",
    size: "featured",
    title: "General ERP System",
    desc: "Full-scale ERP with feature-based modular architecture covering Access & Session Management, Inventory, and Production Workflows.",
    tags: ["Vue.js", "TypeScript", "Pinia", "Vite", "Tailwind CSS", "RESTful APIs"],
    demo: "#",
    github: "#",
    accent: "pink",
    highlight: "Reusable component library & design system built from scratch. Cut sprint time by 50%.",
  },
  {
    id: "ecommerce",
    size: "medium",
    title: "Full-Stack E-Commerce + Admin Dashboard",
    desc: "Complete e-commerce storefront + admin panel. Full-stack with Supabase backend, auth, and PostgreSQL queries. Entire UI/UX designed from scratch.",
    tags: ["Vue.js", "TypeScript", "Supabase", "PostgreSQL", "Tailwind CSS"],
    demo: "#",
    github: "#",
    accent: "blue",
    highlight: "No separate backend needed — all powered by Supabase.",
  },
  {
    id: "lms",
    size: "medium",
    title: "Multi-Role Learning Management System",
    desc: "Interactive LMS with dynamic dashboards and role-based access control (RBAC). Built during Barqify freelance engagement.",
    tags: ["React.js", "Next.js", "TypeScript", "TanStack Query", "ShadCN/UI"],
    demo: null,
    github: "#",
    accent: "pink",
    highlight: "Dynamic dashboards for student, instructor & admin roles.",
  },
  {
    id: "cms",
    size: "small",
    title: "CMS Platform",
    desc: "Large-scale CMS developed from scratch with modular architecture and rich content editing.",
    tags: ["React.js", "Next.js", "TypeScript", "Tailwind CSS"],
    demo: null,
    github: "#",
    accent: "blue",
    highlight: null,
  },
  {
    id: "bltzo",
    size: "small",
    title: "Games, E-Commerce & Portfolio Sites",
    desc: "Multiple client projects at BLTZO — pixel-perfect Figma-to-code delivery across diverse domains.",
    tags: ["React.js", "MUI", "ShadCN", "Redux Toolkit", "Bootstrap"],
    demo: null,
    github: "#",
    accent: "pink",
    highlight: null,
  },
];

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const isFeatured = project.size === "featured";
  const isMedium = project.size === "medium";
  const isPink = project.accent === "pink";

  return (
    <article
      className={`project-card group relative rounded-2xl glass border transition-all duration-400 overflow-hidden
        ${isFeatured ? "md:col-span-2" : isMedium ? "md:col-span-1" : "md:col-span-1"}
        ${isPink
          ? "border-[rgba(247,37,133,0.15)] hover:border-[rgba(247,37,133,0.5)] hover:shadow-[0_0_40px_rgba(247,37,133,0.15)]"
          : "border-[rgba(76,201,240,0.15)] hover:border-[rgba(76,201,240,0.5)] hover:shadow-[0_0_40px_rgba(76,201,240,0.15)]"
        }`}
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Gradient sweep on hover */}
      <div
        className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none
          ${isPink
            ? "bg-gradient-to-br from-[rgba(247,37,133,0.06)] via-transparent to-transparent"
            : "bg-gradient-to-br from-[rgba(76,201,240,0.06)] via-transparent to-transparent"
          }`}
        aria-hidden="true"
      />

      {/* Number badge */}
      <div
        className={`absolute top-5 right-5 font-mono text-xs font-bold opacity-20
          ${isPink ? "text-[var(--color-pink)]" : "text-[var(--color-blue)]"}`}
        aria-hidden="true"
      >
        {String(index + 1).padStart(2, "0")}
      </div>

      <div className={`p-7 ${isFeatured ? "md:p-10" : ""} h-full flex flex-col gap-4`}>
        {/* Title */}
        <h3
          className={`font-display font-bold leading-tight group-hover:text-glow-${project.accent} transition-all
            ${isFeatured ? "text-2xl md:text-3xl" : "text-xl"}`}
          style={{
            color: isPink ? "var(--color-pink)" : "var(--color-blue)",
          }}
        >
          {project.title}
        </h3>

        {/* Highlight badge */}
        {project.highlight && (
          <p className="font-mono text-xs text-[var(--color-muted)] italic border-l-2 border-[var(--color-pink)] pl-3">
            {project.highlight}
          </p>
        )}

        {/* Description */}
        <p className="font-body text-[var(--color-muted)] text-sm leading-relaxed flex-1">
          {project.desc}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {project.tags.map((t) => (
            <span
              key={t}
              className={`px-2.5 py-1 rounded-full text-xs font-mono
                ${isPink
                  ? "bg-[rgba(247,37,133,0.08)] text-[var(--color-pink)] border border-[rgba(247,37,133,0.2)]"
                  : "bg-[rgba(76,201,240,0.08)] text-[var(--color-blue)] border border-[rgba(76,201,240,0.2)]"
                }`}
            >
              {t}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex items-center gap-4 mt-2">
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="Open"
              className={`flex items-center gap-1.5 text-sm font-body font-medium transition-colors
                ${isPink ? "text-[var(--color-pink)] hover:opacity-70" : "text-[var(--color-blue)] hover:opacity-70"}`}
              aria-label={`Live demo of ${project.title}`}
            >
              <ExternalLink size={14} aria-hidden="true" /> Live Demo ↗
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="Code"
              className="flex items-center gap-1.5 text-sm font-body text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors"
              aria-label={`GitHub repo for ${project.title}`}
            >
              <Mail size={14} aria-hidden="true" /> GitHub →
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".project-card",
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.7, ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative py-32 overflow-hidden"
      aria-label="Projects"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 20% 50%, rgba(247,37,133,0.04) 0%, transparent 70%), radial-gradient(ellipse 50% 40% at 80% 70%, rgba(76,201,240,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="font-mono text-sm text-[var(--color-pink)] mb-3 tracking-widest uppercase">
            Portfolio
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-extrabold text-[var(--color-text)] mb-4">
            Selected <span className="gradient-text">Work</span>
          </h2>
          <p className="font-body text-[var(--color-muted)] text-lg">
            Things I&apos;ve built and shipped
          </p>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
