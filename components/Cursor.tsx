"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;

    const dot = dotRef.current!;
    const ring = ringRef.current!;
    const lbl = labelRef.current!;

    const xDot = gsap.quickTo(dot, "x", { duration: 0.1, ease: "power3" });
    const yDot = gsap.quickTo(dot, "y", { duration: 0.1, ease: "power3" });
    const xRing = gsap.quickTo(ring, "x", { duration: 0.4, ease: "power3" });
    const yRing = gsap.quickTo(ring, "y", { duration: 0.4, ease: "power3" });
    const xLbl = gsap.quickTo(lbl, "x", { duration: 0.15, ease: "power3" });
    const yLbl = gsap.quickTo(lbl, "y", { duration: 0.15, ease: "power3" });

    const onMove = (e: MouseEvent) => {
      xDot(e.clientX); yDot(e.clientY);
      xRing(e.clientX); yRing(e.clientY);
      xLbl(e.clientX + 16); yLbl(e.clientY + 16);
    };

    const onEnter = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      const isInteractive = t.closest("a,button,[data-cursor]");
      if (isInteractive) {
        const cursorLabel = (isInteractive as HTMLElement).dataset?.cursor || "View";
        setLabel(cursorLabel);
        gsap.to(dot, { scale: 1.8, background: "#4cc9f0", duration: 0.2 });
        gsap.to(ring, { scale: 2, borderColor: "#4cc9f0", opacity: 0.8, duration: 0.2 });
        gsap.to(lbl, { opacity: 1, duration: 0.2 });
      }
    };

    const onLeave = () => {
      setLabel("");
      gsap.to(dot, { scale: 1, background: "#f72585", duration: 0.2 });
      gsap.to(ring, { scale: 1, borderColor: "#f72585", opacity: 0.5, duration: 0.2 });
      gsap.to(lbl, { opacity: 0, duration: 0.2 });
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onEnter);
    document.addEventListener("mouseout", onLeave);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onEnter);
      document.removeEventListener("mouseout", onLeave);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
      <div ref={labelRef} className="cursor-label" aria-hidden="true">{label}</div>
    </>
  );
}
