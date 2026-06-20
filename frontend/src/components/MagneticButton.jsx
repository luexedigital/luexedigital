import React from "react";
import { useMagnetic } from "@/hooks/useMagnetic";

/**
 * Magnetic, glassy CTA button. Renders an <a> when href is provided,
 * otherwise a <button>. variant: "primary" | "secondary".
 */
export default function MagneticButton({
  children,
  href,
  onClick,
  variant = "primary",
  className = "",
  strength = 0.3,
  testid,
  ...rest
}) {
  const ref = useMagnetic(strength);

  const base =
    "magnetic relative inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold tracking-tight transition-colors duration-300 select-none";
  const styles =
    variant === "primary"
      ? "btn-glow bg-softwhite text-midnight hover:text-white"
      : "glass text-softwhite hover:bg-white/[0.07] border border-white/10";

  const Tag = href ? "a" : "button";

  return (
    <Tag
      ref={ref}
      href={href}
      onClick={onClick}
      data-testid={testid}
      className={`${base} ${styles} ${className}`}
      {...rest}
    >
      <span className="relative z-10 inline-flex items-center gap-2">
        {children}
      </span>
    </Tag>
  );
}
