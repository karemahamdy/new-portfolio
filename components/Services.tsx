"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Code2, Server, Zap, GitBranch, Users } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: Code2,
    title: "Frontend Architecture & Development",
    desc: "Building scalable, maintainable React/Vue/Next.js/Nuxt.js applications from the ground up. Feature-based modular structure, reusable component libraries, and design systems.",
    accent: "pink",
  },
  {
    icon: Server,
    title: "ERP & SaaS Application Development",
    desc: "Delivering complex multi-module enterprise web applications: Inventory, HR, Accounting, Access Control, CMS, and more — production-ready and performant.",
    accent: "blue",
  },
  {
    icon: Zap,
    title: "Performance Optimization",
    desc: "Diagnosing and resolving frontend bottlenecks. Code splitting, lazy loading, Core Web Vitals improvements, and legacy system migrations (e.g., Vue 2 → 3).",
    accent: "pink",
  },
  {
    icon: Zap,
    title: "UI/UX Implementation from Figma",
    desc: "Pixel-perfect conversion of Figma designs to responsive, accessible, animated interfaces — with attention to micro-interactions and polish.",
    accent: "blue",
  },
  {
    icon: GitBranch,
    title: "CI/CD & Deployment Setup",
    desc: "Setting up GitHub Actions pipelines, Nginx server configuration, and automated deployment workflows for production frontend applications.",
    accent: "pink",
  },
  {
    icon: Users,
    title: "Freelance Collaboration",
    desc: "Available for short-term and long-term remote freelance engagements. Fast communication, clean code, and reliable delivery.",
    accent: "blue",
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".service-card", { y: 50, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.6, ease: "power3.out", stagger: 0.1,
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, el: HTMLDivElement) => {
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
    const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
    el.style.transform = `perspective(600px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) translateZ(10px)`;
  };

  const handleMouseLeave = (el: HTMLDivElement) => {
    el.style.transform = "perspective(600px) rotateY(0deg) rotateX(0deg) translateZ(0)";
  };

  return (
    <section id="services" ref={sectionRef} className="relative py-32 overflow-hidden" aria-label="Services">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true"
        style={{ background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(76,201,240,0.04) 0%, transparent 70%)" }} />

      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="font-mono text-sm text-[var(--color-pink)] mb-3 tracking-widest uppercase">Services</p>
          <h2 className="font-display text-4xl md:text-5xl font-extrabold text-[var(--color-text)] mb-4">
            What I <span className="gradient-text">Offer</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s) => {
            const Icon = s.icon;
            const isPink = s.accent === "pink";
            return (
              <div
                key={s.title}
                className={`service-card tilt-card glass rounded-2xl p-8 border cursor-default transition-all duration-300
                  ${isPink
                    ? "border-[rgba(247,37,133,0.15)] hover:border-[rgba(247,37,133,0.5)] hover:shadow-[0_0_40px_rgba(247,37,133,0.12)]"
                    : "border-[rgba(76,201,240,0.15)] hover:border-[rgba(76,201,240,0.5)] hover:shadow-[0_0_40px_rgba(76,201,240,0.12)]"}`}
                onMouseMove={(e) => handleMouseMove(e, e.currentTarget)}
                onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6
                  ${isPink ? "bg-[rgba(247,37,133,0.12)] text-[var(--color-pink)]" : "bg-[rgba(76,201,240,0.12)] text-[var(--color-blue)]"}`}>
                  <Icon size={22} aria-hidden="true" />
                </div>
                <h3 className="font-display font-bold text-lg text-[var(--color-text)] mb-3 leading-snug">{s.title}</h3>
                <p className="font-body text-sm text-[var(--color-muted)] leading-relaxed">{s.desc}</p>
                <div className={`mt-6 h-px w-full ${isPink ? "bg-gradient-to-r from-[rgba(247,37,133,0.4)] to-transparent" : "bg-gradient-to-r from-[rgba(76,201,240,0.4)] to-transparent"}`} aria-hidden="true" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
