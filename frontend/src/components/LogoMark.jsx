import React from "react";

const MARK_URL = "/luexe-mark.png";

/**
 * Luexe brand mark (official monogram). Reused in nav, loader, footer and the
 * reduced-motion hero fallback.
 */
export default function LogoMark({ size = 40, withWordmark = false, className = "" }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <img
        src={MARK_URL}
        alt="Luexe Digital"
        width={size}
        height={size}
        style={{ width: size, height: size }}
        className="object-contain"
        draggable="false"
      />
      {withWordmark && (
        <span className="font-heading text-lg font-bold tracking-tight text-softwhite">
          Luexe<span className="text-electric"> Digital</span>
        </span>
      )}
    </span>
  );
}
