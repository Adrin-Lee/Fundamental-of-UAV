import React, { useState } from 'react';
import { Cpu, Zap, CheckCircle2, Layers, Check, Info } from 'lucide-react';
import { modulesData } from '../data/curriculumData';

/**
 * ESCSelector Component (Tier 2 Tool)
 * Compares Single ESC, 4-in-1 ESC, and 8-in-1 ESC architectures.
 * Reusable embedded in Module 3 and standalone at /tools/esc-selector.
 */
export default function ESCSelector({ className = "", selectedDefault = "4-in-1" }) {
  const escOptions = modulesData["mod-drone-components"].components.esc.options;
  const [selectedId, setSelectedId] = useState(selectedDefault);

  return (
    <div className={`w-full ${className}`}>
      
      {/* Tool Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-[var(--divider)] gap-3">
        <div>
          <div className="font-mono text-[11px] font-bold tracking-wider uppercase text-[var(--accent-signal)] mb-1 flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 text-[var(--accent-signal)]" />
            <span>ESC ARCHITECTURE SELECTOR & COMPARATOR</span>
          </div>
          <h4 className="font-display text-lg sm:text-xl font-bold text-[var(--text-primary)]">
            Electronic Speed Controller (ESC) Form Factors
          </h4>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[var(--accent-signal-subtle)] border border-[#BFDBFE] text-xs font-mono text-[var(--accent-signal-deep)]">
          <span>Speed signal: DShot / PWM</span>
        </div>
      </div>

      {/* 3-Card Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
        {escOptions.map((opt, idx) => {
          const isSelected = selectedId === opt.type || (selectedId === "4-in-1" && opt.channels === 4);
          return (
            <div
              key={idx}
              onClick={() => setSelectedId(opt.type)}
              className={`cursor-pointer rounded-2xl p-5 border transition-all flex flex-col justify-between relative ${
                isSelected
                  ? 'bg-[var(--bg-primary)] border-[var(--accent-signal)] shadow-brand ring-1 ring-[var(--accent-signal)]'
                  : 'bg-[var(--bg-primary)] border-[var(--divider)] hover:border-[#CBD5E1] shadow-xs'
              }`}
            >
              <div>
                {/* Header Strip */}
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs font-bold text-[var(--accent-signal)] bg-[var(--accent-signal-subtle)] px-2.5 py-1 rounded-md border border-[#BFDBFE]">
                    OPTION {idx + 1}
                  </span>
                  <span className="font-mono text-sm font-bold text-[var(--accent-signal)] bg-[var(--bg-elevated)] px-2.5 py-1 rounded-lg border border-[var(--divider)]">
                    channels: {opt.channels}
                  </span>
                </div>

                <h5 className="font-display text-lg font-bold text-[var(--text-primary)] mb-2">
                  {opt.type}
                </h5>

                <p className="font-body text-xs sm:text-[13px] text-[var(--text-secondary)] leading-relaxed mb-4">
                  {opt.description}
                </p>

                {/* ESC Technical Vector Schematic / Blueprint */}
                <div className="relative h-32 rounded-xl bg-[var(--bg-elevated)] border border-[var(--divider)] p-3 flex flex-col items-center justify-center overflow-hidden mb-4">
                  <div className="absolute inset-0 blueprint-grid opacity-30 pointer-events-none" />

                  {opt.channels === 1 && (
                    /* Single ESC Board Graphic */
                    <div className="relative z-10 w-24 h-16 rounded-lg bg-[var(--bg-primary)] border-2 border-[var(--accent-signal)] shadow-sm flex flex-col items-center justify-between p-2">
                      <div className="w-8 h-2 rounded bg-[var(--text-muted)]" />
                      <div className="font-mono text-[9px] font-bold text-[var(--accent-signal)]">1x MOSFET</div>
                      <div className="flex gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent-signal)]" />
                        <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent-signal)]" />
                        <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent-signal)]" />
                      </div>
                    </div>
                  )}

                  {opt.channels === 4 && (
                    /* 4-in-1 Stack Board Graphic */
                    <div className="relative z-10 w-28 h-24 rounded-xl bg-[var(--bg-primary)] border-2 border-[var(--accent-signal)] shadow-sm grid grid-cols-2 gap-1.5 p-2">
                      {[1, 2, 3, 4].map((ch) => (
                        <div key={ch} className="rounded bg-[var(--accent-signal-subtle)] border border-[#BFDBFE] flex items-center justify-center font-mono text-[8px] font-bold text-[var(--accent-signal)]">
                          M{ch}
                        </div>
                      ))}
                    </div>
                  )}

                  {opt.channels === 8 && (
                    /* 8-in-1 Stack Board Graphic */
                    <div className="relative z-10 w-32 h-24 rounded-xl bg-[var(--bg-primary)] border-2 border-[var(--accent-signal)] shadow-sm grid grid-cols-4 gap-1 p-1.5">
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((ch) => (
                        <div key={ch} className="rounded bg-[var(--accent-signal-subtle)] border border-[#BFDBFE] flex items-center justify-center font-mono text-[7.5px] font-bold text-[var(--accent-signal)]">
                          M{ch}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Usage Footer */}
              <div className="pt-3 border-t border-[var(--divider)] font-body text-xs text-[var(--text-muted)] flex items-start gap-1.5">
                <Info className="w-3.5 h-3.5 text-[var(--accent-signal)] shrink-0 mt-0.5" />
                <span>{opt.usage}</span>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
