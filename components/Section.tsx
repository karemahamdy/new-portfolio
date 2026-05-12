"use client";

import React from "react";
import Container from "./Container";

interface SectionProps {
  id?: string;
  children: React.ReactNode;
  /** Additional classes on the <section> wrapper */
  className?: string;
  /** Additional classes on the inner Container */
  innerClassName?: string;
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  /** Background decorative element (renders behind the container) */
  bg?: React.ReactNode;
  /** aria-label for the <section> element */
  ariaLabel?: string;
  ref?: React.RefObject<HTMLElement>;
}

const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ id, children, className = "", innerClassName = "", size = "xl", bg, ariaLabel }, ref) => {
    return (
      <section
        id={id}
        ref={ref}
        aria-label={ariaLabel}
        className={`relative py-[var(--space-24)] md:py-[var(--space-32)] overflow-hidden ${className}`}
      >
        {bg && <div className="absolute inset-0 pointer-events-none" aria-hidden="true">{bg}</div>}
        <Container size={size} className={innerClassName}>
          {children}
        </Container>
      </section>
    );
  }
);

Section.displayName = "Section";
export default Section;
