import React from 'react';

/**
 * Reusable SectionHeading component per DESIGN.md Section 4.3
 * Pattern: Eyebrow (Space Grotesk bold, uppercase) -> Title (Space Grotesk) -> Subtitle (Inter)
 */
export default function SectionHeading({ eyebrow, title, subtitle, className = "" }) {
  return (
    <div className={`mb-8 ${className}`}>
      {eyebrow && (
        <span className="block font-display text-[11px] sm:text-xs font-bold tracking-[0.08em] uppercase text-[var(--accent-signal)] mb-1.5">
          {eyebrow}
        </span>
      )}
      <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[var(--text-primary)] leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="font-body text-sm sm:text-base text-[var(--text-muted)] mt-2 max-w-3xl leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
