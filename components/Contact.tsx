"use client";

import { useRef, useState } from "react";
import { gsap } from "gsap";
import { Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react";

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Invalid email";
    if (!form.subject.trim()) e.subject = "Subject is required";
    if (!form.message.trim()) e.message = "Message is required";
    return e;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setSubmitted(true);
    // Animate checkmark
    gsap.fromTo(".success-check", { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(2)" });
  };

  const inputClass = (field: string) =>
    `w-full bg-[var(--color-surface)] border rounded-xl px-4 py-3 font-body text-sm text-[var(--color-text)] outline-none transition-all focus:border-[var(--color-pink)] focus:shadow-[0_0_0_2px_rgba(247,37,133,0.15)] placeholder:text-[var(--color-muted)]
    ${errors[field] ? "border-red-500" : "border-[var(--color-border)]"}`;

  return (
    <section id="contact" ref={sectionRef} className="relative py-32 overflow-hidden" aria-label="Contact">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true"
        style={{ background: "radial-gradient(ellipse 60% 50% at 30% 60%, rgba(247,37,133,0.05) 0%, transparent 70%)" }} />

      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="font-mono text-sm text-[var(--color-pink)] mb-3 tracking-widest uppercase">Get In Touch</p>
          <h2 className="font-display text-4xl md:text-5xl font-extrabold text-[var(--color-text)] mb-4">
            Let&apos;s Build <span className="gradient-text">Something</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left — info */}
          <div className="space-y-8">
            <p className="font-body text-[var(--color-muted)] text-lg leading-relaxed">
              I&apos;m currently open to senior frontend roles, freelance projects, and exciting
              collaborations. Drop me a message — I respond fast.
            </p>

            <div className="space-y-4">
              {[
                { icon: Mail, label: "Email", value: "karemahamdy51@gmail.com", href: "mailto:karemahamdy51@gmail.com" },
                { icon: Phone, label: "Phone", value: "+20 106 234 0027", href: "tel:+201062340027" },
                { icon: MapPin, label: "Location", value: "Cairo, Egypt", href: null },
              ].map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl glass border border-[var(--color-border)] flex items-center justify-center flex-shrink-0">
                    <Icon size={16} className="text-[var(--color-pink)]" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="font-mono text-xs text-[var(--color-muted)]">{label}</p>
                    {href ? (
                      <a href={href} className="font-body text-sm text-[var(--color-text)] hover:text-[var(--color-pink)] transition-colors" data-cursor="Open">{value}</a>
                    ) : (
                      <p className="font-body text-sm text-[var(--color-text)]">{value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Social */}
            <div className="flex items-center gap-4" aria-label="Social links">
              {[
                { href: "https://github.com/karemahamdy", icon: Mail, label: "GitHub" },
                { href: "https://linkedin.com/in/karema-hamdy2010", icon: Mail, label: "LinkedIn" },
                { href: "mailto:karemahamdy51@gmail.com", icon: Mail, label: "Email" },
              ].map(({ href, icon: Icon, label }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} data-cursor={label}
                  className="p-3 rounded-full border border-[var(--color-border)] text-[var(--color-muted)] hover:text-[var(--color-pink)] hover:border-[var(--color-pink)] transition-all">
                  <Icon size={18} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* Right — form */}
          <div className="glass rounded-2xl border border-[var(--color-border)] p-8">
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-12 gap-4 text-center">
                <CheckCircle size={56} className="success-check text-green-400" aria-hidden="true" />
                <h3 className="font-display text-xl font-bold text-[var(--color-text)]">Message Sent!</h3>
                <p className="font-body text-sm text-[var(--color-muted)]">Thanks for reaching out. I&apos;ll get back to you soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate aria-label="Contact form" className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="contact-name" className="font-mono text-xs text-[var(--color-muted)] mb-1.5 block">Name *</label>
                    <input id="contact-name" name="name" type="text" value={form.name} onChange={handleChange}
                      placeholder="Your name" className={inputClass("name")} aria-describedby={errors.name ? "name-error" : undefined} />
                    {errors.name && <p id="name-error" className="text-red-400 text-xs mt-1 font-mono" role="alert">{errors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="font-mono text-xs text-[var(--color-muted)] mb-1.5 block">Email *</label>
                    <input id="contact-email" name="email" type="email" value={form.email} onChange={handleChange}
                      placeholder="your@email.com" className={inputClass("email")} aria-describedby={errors.email ? "email-error" : undefined} />
                    {errors.email && <p id="email-error" className="text-red-400 text-xs mt-1 font-mono" role="alert">{errors.email}</p>}
                  </div>
                </div>
                <div>
                  <label htmlFor="contact-subject" className="font-mono text-xs text-[var(--color-muted)] mb-1.5 block">Subject *</label>
                  <input id="contact-subject" name="subject" type="text" value={form.subject} onChange={handleChange}
                    placeholder="What's this about?" className={inputClass("subject")} aria-describedby={errors.subject ? "subject-error" : undefined} />
                  {errors.subject && <p id="subject-error" className="text-red-400 text-xs mt-1 font-mono" role="alert">{errors.subject}</p>}
                </div>
                <div>
                  <label htmlFor="contact-message" className="font-mono text-xs text-[var(--color-muted)] mb-1.5 block">Message *</label>
                  <textarea id="contact-message" name="message" rows={5} value={form.message} onChange={handleChange}
                    placeholder="Tell me about your project..." className={`${inputClass("message")} resize-none`} aria-describedby={errors.message ? "message-error" : undefined} />
                  {errors.message && <p id="message-error" className="text-red-400 text-xs mt-1 font-mono" role="alert">{errors.message}</p>}
                </div>
                <button type="submit" id="contact-submit"
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-display font-bold text-white bg-[var(--color-pink)] glow-pink hover:brightness-110 hover:scale-[1.02] transition-all"
                  data-cursor="Send">
                  <Send size={16} aria-hidden="true" /> Send Message →
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
