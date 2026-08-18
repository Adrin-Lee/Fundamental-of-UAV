import React, { useState, useEffect } from 'react';
import { RotateCw, RotateCcw, Play, Pause, ShieldCheck, Wind } from 'lucide-react';

/**
 * PropellerSpinPreview
 * Visual interactive preview for CW and CCW propeller rotation.
 * Setup slot for the Tier 1 CW/CCW Torque Demo simulator.
 * Respects prefers-reduced-motion.
 */
export default function PropellerSpinPreview({ className = "" }) {
  // Check system prefers-reduced-motion
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isSpinning, setIsSpinning] = useState(true);

  useEffect(() => {
    try {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(mediaQuery.matches);
      if (mediaQuery.matches) {
        setIsSpinning(false);
      }

      const handleChange = (e) => {
        setPrefersReducedMotion(e.matches);
        if (e.matches) setIsSpinning(false);
      };
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    } catch {
      // fallback
    }
  }, []);

  return (
    <div className={`p-4 sm:p-5 rounded-2xl bg-[var(--bg-elevated)] border border-[var(--divider)] shadow-xs ${className}`}>
      
      {/* Header Bar */}
      <div className="flex items-center justify-between pb-3 mb-4 border-b border-[var(--divider)]">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[var(--accent-signal)]" />
          <span className="font-mono text-xs font-bold text-[var(--text-primary)] uppercase tracking-wider">
            CW / CCW Rotation & Torque Balance
          </span>
        </div>

        {/* Play / Pause Animation Control */}
        <button
          type="button"
          onClick={() => setIsSpinning(!isSpinning)}
          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[var(--bg-primary)] border border-[var(--divider)] text-xs font-mono text-[var(--text-secondary)] hover:text-[var(--accent-signal)] transition-colors"
          title={isSpinning ? "Pause Propeller Spin" : "Start Propeller Spin"}
        >
          {isSpinning ? (
            <>
              <Pause className="w-3 h-3 text-[var(--accent-signal)]" />
              <span>Pause Spin</span>
            </>
          ) : (
            <>
              <Play className="w-3 h-3 text-[var(--accent-signal)]" />
              <span>Spin Props</span>
            </>
          )}
        </button>
      </div>

      {/* Dual Propeller Rotational Schematics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        
        {/* Clockwise (CW) Propeller Box */}
        <div className="p-4 rounded-xl bg-[var(--bg-primary)] border border-[var(--divider)] flex flex-col items-center justify-between text-center relative overflow-hidden shadow-xs group">
          <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-[var(--accent-signal-subtle)] text-[var(--accent-signal-deep)] font-mono text-[10px] font-bold border border-[#BFDBFE]">
            M3 (BR) & M4 (FL) · CW
          </div>

          <div className="my-3 relative w-24 h-24 flex items-center justify-center">
            {/* Circular Directional Orbit Arrow */}
            <div className="absolute inset-0 rounded-full border-2 border-dashed border-[var(--accent-signal)]/40 pointer-events-none" />
            
            {/* Spinning Rotor Blades */}
            <div 
              className={`relative z-10 w-20 h-20 flex items-center justify-center ${
                isSpinning && !prefersReducedMotion ? 'animate-spin' : ''
              }`}
              style={{ animationDuration: '0.8s' }}
            >
              {/* Prop Blade 1 & 2 */}
              <div className="absolute w-20 h-4 bg-gradient-to-r from-[var(--accent-signal)] via-[var(--accent-signal-deep)] to-[var(--accent-signal)] rounded-full shadow-xs" />
              {/* Hub Nut */}
              <div className="relative w-5 h-5 rounded-full bg-white border-2 border-[var(--accent-signal-deep)] shadow-brand" />
            </div>

            {/* Rotating Directional Badge Overlay */}
            <div className="absolute -bottom-1 bg-[var(--bg-primary)] px-2 py-0.5 rounded-full border border-[var(--divider)] shadow-xs flex items-center gap-1 font-mono text-[11px] font-bold text-[var(--accent-signal)]">
              <RotateCw className="w-3 h-3" />
              <span>CW</span>
            </div>
          </div>

          <div className="font-body text-xs text-[var(--text-secondary)]">
            <strong className="text-[var(--text-primary)] block font-semibold">Clockwise (CW)</strong>
            <span>Generates downward airflow with CCW reactionary yaw torque.</span>
          </div>
        </div>

        {/* Counterclockwise (CCW) Propeller Box */}
        <div className="p-4 rounded-xl bg-[var(--bg-primary)] border border-[var(--divider)] flex flex-col items-center justify-between text-center relative overflow-hidden shadow-xs group">
          <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-[#FFFBEB] text-[#B45309] font-mono text-[10px] font-bold border border-[#FDE68A]">
            M1 (FR) & M2 (BL) · CCW
          </div>

          <div className="my-3 relative w-24 h-24 flex items-center justify-center">
            {/* Circular Directional Orbit Arrow */}
            <div className="absolute inset-0 rounded-full border-2 border-dashed border-[#F59E0B]/40 pointer-events-none" />
            
            {/* Spinning Rotor Blades */}
            <div 
              className={`relative z-10 w-20 h-20 flex items-center justify-center ${
                isSpinning && !prefersReducedMotion ? 'animate-spin' : ''
              }`}
              style={{ animationDuration: '0.8s', animationDirection: 'reverse' }}
            >
              {/* Prop Blade 1 & 2 */}
              <div className="absolute w-20 h-4 bg-gradient-to-r from-[#F59E0B] via-[#D97706] to-[#F59E0B] rounded-full shadow-xs" />
              {/* Hub Nut */}
              <div className="relative w-5 h-5 rounded-full bg-white border-2 border-[#B45309] shadow-brand" />
            </div>

            {/* Rotating Directional Badge Overlay */}
            <div className="absolute -bottom-1 bg-[var(--bg-primary)] px-2 py-0.5 rounded-full border border-[var(--divider)] shadow-xs flex items-center gap-1 font-mono text-[11px] font-bold text-[#B45309]">
              <RotateCcw className="w-3 h-3" />
              <span>CCW</span>
            </div>
          </div>

          <div className="font-body text-xs text-[var(--text-secondary)]">
            <strong className="text-[var(--text-primary)] block font-semibold">Counterclockwise (CCW)</strong>
            <span>Generates downward airflow with CW reactionary yaw torque.</span>
          </div>
        </div>

      </div>

      {/* Torque Cancellation Takeaway */}
      <div className="p-3 rounded-xl bg-[var(--bg-primary)] border border-[var(--divider)] flex items-start gap-2.5 text-xs font-body text-[var(--text-secondary)]">
        <ShieldCheck className="w-4 h-4 text-[var(--accent-signal)] shrink-0 mt-0.5" />
        <span>
          <strong>Why opposite rotation matters:</strong> When a propeller spins, Newton’s third law creates an equal and opposite reactionary torque on the frame. Having an equal count of CW and CCW propellers cancels out net yaw torque, keeping the drone perfectly balanced in flight.
        </span>
      </div>

    </div>
  );
}
