"use client";

import React from "react";

interface ContainerProps {
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  className?: string;
  as?: React.ElementType;
}

const Container = ({
  children,
  size = "xl",
  className = "",
  as: Component = "div",
}: ContainerProps) => {
  const maxWidths = {
    sm: "var(--container-max-sm)",
    md: "var(--container-max-md)",
    lg: "var(--container-max-lg)",
    xl: "var(--container-max-xl)",
    "2xl": "var(--container-max-2xl)",
    full: "100%",
  };

  return (
    <Component
      className={`mx-auto w-full px-[var(--container-padding)] ${className}`}
      style={{ maxWidth: maxWidths[size] }}
    >
      {children}
    </Component>
  );
};

export default Container;
