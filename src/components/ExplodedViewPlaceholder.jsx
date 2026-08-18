import React from 'react';
import { Box, Layers, RotateCw, Sparkles, Activity } from 'lucide-react';

export default function ExplodedViewPlaceholder() {
  return (
    <div 
      className="relative w-full h-[320px] sm:h-[370px] lg:h-[390px] xl:h-[420px] rounded-2xl border border-[var(--divider)] bg-[var(--bg-primary)] overflow-hidden flex flex-col justify-between p-4 sm:p-5 shadow-sm group"
      style={{
        background: 'radial-gradient(circle at center, rgba(32, 86, 163, 0.08) 0%, rgba(255, 255, 255, 1) 70%)'
      }}
    >
      {/* Blueprint Grid Overlay */}
      <div className="absolute inset-0 blueprint-grid opacity-60 pointer-events-none" />

      {/* Top HUD Bar */}
      <div className="relative z-10 flex items-center justify-between w-full">
        <div className="flex items-center gap-2 bg-[var(--bg-elevated)] border border-[var(--divider)] px-3 py-1.5 rounded-full shadow-xs">
          <Box className="w-3.5 h-3.5 text-[var(--accent-signal)]" />
          <span className="font-mono text-xs font-semibold text-[var(--text-secondary)]">
            MODULE 3D VIEWPORT
          </span>
        </div>

        <div className="flex items-center gap-2 bg-[var(--bg-elevated)] border border-[var(--divider)] px-3 py-1.5 rounded-full font-mono text-[11px] text-[var(--text-muted)]">
          <Activity className="w-3.5 h-3.5 text-[var(--accent-success)]" />
          <span>STATUS: STANDBY</span>
        </div>
      </div>

      {/* Center 3D Schematic Representation */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center my-auto px-4">
        {/* Animated Visual Target / Drone Wireframe Core */}
        <div className="relative w-36 h-36 sm:w-44 sm:h-44 flex items-center justify-center mb-4">
          {/* Subtle Outer Pulse Ring */}
          <div className="absolute inset-0 rounded-full border border-[var(--accent-signal)]/20 animate-ping opacity-25" />
          
          {/* Circular Coordinate Dial */}
          <div className="absolute inset-2 rounded-full border border-dashed border-[var(--divider)]" />
          
          {/* Rotor Arm Indicators */}
          <div className="absolute w-full h-[2px] bg-[var(--divider)] rotate-45" />
          <div className="absolute w-full h-[2px] bg-[var(--divider)] -rotate-45" />

          {/* Rotor Hub Nodes with Exact Standard Configuration */}
          {/* M4: Top-Left (Front-Left) -> CW */}
          <div className="absolute top-0 left-0 w-8 h-8 rounded-full bg-[var(--bg-elevated)] border-2 border-[var(--accent-signal)] flex flex-col items-center justify-center font-mono text-[8px] font-bold text-[var(--accent-signal)] shadow-xs">
            <span>M4</span>
            <span className="text-[6px] text-[var(--text-muted)] -mt-0.5">CW</span>
          </div>

          {/* M1: Top-Right (Front-Right) -> CCW */}
          <div className="absolute top-0 right-0 w-8 h-8 rounded-full bg-[var(--bg-elevated)] border-2 border-[#059669] flex flex-col items-center justify-center font-mono text-[8px] font-bold text-[#059669] shadow-xs">
            <span>M1</span>
            <span className="text-[6px] text-[#059669] -mt-0.5">CCW</span>
          </div>

          {/* M3: Bottom-Right (Back-Right) -> CW */}
          <div className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-[var(--bg-elevated)] border-2 border-[var(--accent-signal)] flex flex-col items-center justify-center font-mono text-[8px] font-bold text-[var(--accent-signal)] shadow-xs">
            <span>M3</span>
            <span className="text-[6px] text-[var(--text-muted)] -mt-0.5">CW</span>
          </div>

          {/* M2: Bottom-Left (Back-Left) -> CCW */}
          <div className="absolute bottom-0 left-0 w-8 h-8 rounded-full bg-[var(--bg-elevated)] border-2 border-[#059669] flex flex-col items-center justify-center font-mono text-[8px] font-bold text-[#059669] shadow-xs">
            <span>M2</span>
            <span className="text-[6px] text-[#059669] -mt-0.5">CCW</span>
          </div>

          {/* Central Avionics Hub */}
          <div className="relative w-16 h-16 rounded-xl bg-[var(--bg-primary)] border-2 border-[var(--accent-signal)] shadow-brand flex flex-col items-center justify-center p-1.5 transition-transform group-hover:scale-105">
            <Layers className="w-5 h-5 text-[var(--accent-signal)] mb-0.5" />
            <span className="font-mono text-[8px] font-bold text-[var(--accent-signal)] tracking-tight">
              FC / IMU
            </span>
          </div>
        </div>

        {/* Descriptor Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[var(--accent-signal-subtle)] border border-[#BFDBFE] rounded-md text-[var(--accent-signal-deep)] text-xs font-medium mb-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Interactive 3D Assembly Explorer</span>
        </div>
        <p className="text-xs text-[var(--text-muted)] max-w-xs leading-relaxed font-body">
          Subsystems (Airframe, BLDC Motors, ESC, LiPo Battery & Avionics) load dynamically during module study.
        </p>
      </div>

      {/* Bottom Technical Readout Bar */}
      <div className="relative z-10 flex items-center justify-between border-t border-[var(--divider)] pt-3 font-mono text-[11px] text-[var(--text-muted)]">
        <div className="flex items-center gap-3">
          <span>P1-1 SUBSYSTEM VIEWER</span>
          <span className="text-[var(--divider)]">|</span>
          <span>R3F / WEBGL ENGINE</span>
        </div>
        <div className="flex items-center gap-1 text-[var(--accent-signal)]">
          <RotateCw className="w-3 h-3" />
          <span>360° ORBIT</span>
        </div>
      </div>
    </div>
  );
}
