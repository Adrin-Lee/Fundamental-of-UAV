import React, { useState, useEffect } from 'react';
import { 
  ArrowUp, 
  ArrowDown, 
  ArrowRight, 
  ArrowLeft, 
  RotateCcw, 
  Wind, 
  Sliders, 
  Play, 
  Pause, 
  Layers, 
  Plane, 
  Cpu, 
  ShieldCheck,
  CheckCircle2,
  Info
} from 'lucide-react';

export default function ForceBalanceSimulator({ defaultMode = 'multirotor' }) {
  const [airframe, setAirframe] = useState(defaultMode);

  // Lift vs Weight slider (-50 to +50, where 0 = Lift equals Weight)
  const [liftDelta, setLiftDelta] = useState(0);

  // Thrust vs Drag slider (-50 to +50, where 0 = Thrust equals Drag)
  const [thrustDelta, setThrustDelta] = useState(0);

  // Check prefers-reduced-motion
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);

    const handleChange = (e) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Compute Active Dynamic States
  let verticalState = "Hovering at constant altitude";
  let verticalKey = "hover";
  let verticalBadgeClass = "bg-[#ECFDF5] text-[#047857] border-[#A7F3D0]";

  if (liftDelta > 0) {
    verticalState = "Climbing";
    verticalKey = "climb";
    verticalBadgeClass = "bg-[var(--accent-signal-subtle)] text-[var(--accent-signal)] border-[#BFDBFE]";
  } else if (liftDelta < 0) {
    verticalState = "Descending";
    verticalKey = "descend";
    verticalBadgeClass = "bg-[#FFFBEB] text-[#B45309] border-[#FDE68A]";
  }

  let horizontalState = "Constant speed";
  let horizontalKey = "constant";
  let horizontalBadgeClass = "bg-[#ECFDF5] text-[#047857] border-[#A7F3D0]";

  if (thrustDelta > 0) {
    horizontalState = "Accelerating";
    horizontalKey = "accelerate";
    horizontalBadgeClass = "bg-[var(--accent-signal-subtle)] text-[var(--accent-signal)] border-[#BFDBFE]";
  } else if (thrustDelta < 0) {
    horizontalState = "Slowing down";
    horizontalKey = "decelerate";
    horizontalBadgeClass = "bg-[#FFFBEB] text-[#B45309] border-[#FDE68A]";
  }

  // Position offsets for visual drone
  // Vertical translation range: -60px (climb) to +60px (descend)
  const translateY = reducedMotion ? (liftDelta > 0 ? -40 : liftDelta < 0 ? 40 : 0) : -liftDelta * 1.2;
  
  // Pitch angle: tilts nose down during positive acceleration
  const pitchAngle = reducedMotion ? 0 : (thrustDelta * 0.25) - (liftDelta * 0.1);

  // Vector arrow dimensions
  const liftArrowHeight = Math.max(20, 50 + liftDelta * 0.8);
  const weightArrowHeight = Math.max(20, 50 - liftDelta * 0.8);
  const thrustArrowWidth = Math.max(20, 50 + thrustDelta * 0.8);
  const dragArrowWidth = Math.max(20, 50 - thrustDelta * 0.8);

  const resetAll = () => {
    setLiftDelta(0);
    setThrustDelta(0);
  };

  const setPreset = (preset) => {
    if (preset === 'hover') {
      setLiftDelta(0);
      setThrustDelta(0);
    } else if (preset === 'climb') {
      setLiftDelta(35);
      setThrustDelta(10);
    } else if (preset === 'accel') {
      setLiftDelta(0);
      setThrustDelta(40);
    } else if (preset === 'descend') {
      setLiftDelta(-35);
      setThrustDelta(-25);
    }
  };

  return (
    <div className="rounded-2xl bg-[var(--bg-elevated)] border border-[var(--divider)] p-6 sm:p-8 shadow-xs">
      
      {/* Header & Airframe Selector */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-6 mb-6 border-b border-[var(--divider)] gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-[var(--accent-signal)]" />
            <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[var(--accent-signal)]">
              TIER 1 SIGNATURE INTERACTIVE TOOL
            </span>
          </div>
          <h3 className="font-display text-xl sm:text-2xl font-bold text-[var(--text-primary)]">
            Force-Balance Flight Simulator
          </h3>
          <p className="font-body text-xs sm:text-sm text-[var(--text-muted)] mt-1">
            Adjust the vertical (Lift vs Weight) and horizontal (Thrust vs Drag) sliders to observe dynamic aerodynamic balance.
          </p>
        </div>

        {/* Airframe Type Switcher */}
        <div className="flex items-center gap-1.5 p-1.5 rounded-xl bg-[var(--bg-primary)] border border-[var(--divider)] shadow-2xs self-start lg:self-auto">
          {[
            { id: 'multirotor', label: 'Multirotor' },
            { id: 'vtol', label: 'Hybrid VTOL' },
            { id: 'fixed_wing', label: 'Fixed-Wing' }
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setAirframe(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all focus-visible:ring-2 focus-visible:ring-[var(--border-focus)] ${
                airframe === tab.id
                  ? 'bg-[var(--accent-signal)] text-white shadow-xs'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Interactive Work Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-8">
        
        {/* Left Column: 2 Interactive Sliders & Presets */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          
          {/* Preset Buttons Bar */}
          <div>
            <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)] block mb-2">
              Quick Flight Presets:
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                type="button"
                onClick={() => setPreset('hover')}
                className="py-1.5 px-2 rounded-lg bg-[var(--bg-primary)] border border-[var(--divider)] hover:border-[var(--accent-signal)] font-mono text-[11px] font-semibold text-[var(--text-secondary)] hover:text-[var(--accent-signal)] transition-all text-center shadow-2xs"
              >
                Hover (0,0)
              </button>
              <button
                type="button"
                onClick={() => setPreset('climb')}
                className="py-1.5 px-2 rounded-lg bg-[var(--bg-primary)] border border-[var(--divider)] hover:border-[var(--accent-signal)] font-mono text-[11px] font-semibold text-[var(--text-secondary)] hover:text-[var(--accent-signal)] transition-all text-center shadow-2xs"
              >
                Climbing
              </button>
              <button
                type="button"
                onClick={() => setPreset('accel')}
                className="py-1.5 px-2 rounded-lg bg-[var(--bg-primary)] border border-[var(--divider)] hover:border-[var(--accent-signal)] font-mono text-[11px] font-semibold text-[var(--text-secondary)] hover:text-[var(--accent-signal)] transition-all text-center shadow-2xs"
              >
                Accelerating
              </button>
              <button
                type="button"
                onClick={() => setPreset('descend')}
                className="py-1.5 px-2 rounded-lg bg-[var(--bg-primary)] border border-[var(--divider)] hover:border-[var(--accent-signal)] font-mono text-[11px] font-semibold text-[var(--text-secondary)] hover:text-[var(--accent-signal)] transition-all text-center shadow-2xs"
              >
                Descending
              </button>
            </div>
          </div>

          {/* Slider 1: Lift vs Weight (Vertical Axis) */}
          <div className="p-4 rounded-xl bg-[var(--bg-primary)] border border-[var(--divider)] shadow-xs">
            <div className="flex items-center justify-between mb-2 font-mono text-xs">
              <span className="font-bold text-[var(--text-primary)]">1. Lift vs Weight Axis</span>
              <span className="font-semibold text-[var(--accent-signal)]">
                {liftDelta === 0 ? 'Lift = Weight' : liftDelta > 0 ? `Lift > Weight (+${liftDelta})` : `Lift < Weight (${liftDelta})`}
              </span>
            </div>

            <div className="space-y-1">
              <input
                type="range"
                min="-50"
                max="50"
                step="5"
                value={liftDelta}
                onChange={(e) => setLiftDelta(Number(e.target.value))}
                className="w-full h-2.5 bg-[var(--bg-elevated)] rounded-lg appearance-none cursor-pointer accent-[var(--accent-signal)]"
                aria-label="Lift vs Weight Slider"
              />
              <div className="flex justify-between font-mono text-[10px] text-[var(--text-muted)] pt-1">
                <span>↓ Descend (Lift &lt; Weight)</span>
                <span className="font-bold text-[var(--text-primary)]">Hover (=)</span>
                <span>↑ Climb (Lift &gt; Weight)</span>
              </div>
            </div>
          </div>

          {/* Slider 2: Thrust vs Drag (Horizontal Axis) */}
          <div className="p-4 rounded-xl bg-[var(--bg-primary)] border border-[var(--divider)] shadow-xs">
            <div className="flex items-center justify-between mb-2 font-mono text-xs">
              <span className="font-bold text-[var(--text-primary)]">2. Thrust vs Drag Axis</span>
              <span className="font-semibold text-[var(--accent-signal)]">
                {thrustDelta === 0 ? 'Thrust = Drag' : thrustDelta > 0 ? `Thrust > Drag (+${thrustDelta})` : `Thrust < Drag (${thrustDelta})`}
              </span>
            </div>

            <div className="space-y-1">
              <input
                type="range"
                min="-50"
                max="50"
                step="5"
                value={thrustDelta}
                onChange={(e) => setThrustDelta(Number(e.target.value))}
                className="w-full h-2.5 bg-[var(--bg-elevated)] rounded-lg appearance-none cursor-pointer accent-[var(--accent-signal)]"
                aria-label="Thrust vs Drag Slider"
              />
              <div className="flex justify-between font-mono text-[10px] text-[var(--text-muted)] pt-1">
                <span>← Slow Down (Thrust &lt; Drag)</span>
                <span className="font-bold text-[var(--text-primary)]">Constant Speed (=)</span>
                <span>→ Accelerate (Thrust &gt; Drag)</span>
              </div>
            </div>
          </div>

          {/* Reset Button */}
          <button
            type="button"
            onClick={resetAll}
            className="inline-flex items-center justify-center gap-2 py-2 px-4 rounded-xl bg-[var(--bg-elevated)] border border-[var(--divider)] hover:border-[var(--accent-signal)] font-mono text-xs font-semibold text-[var(--accent-signal)] transition-all shadow-2xs"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset to Perfect Equilibrium</span>
          </button>

        </div>

        {/* Right Column: Visual Physics Viewport with Dynamic Vectors */}
        <div className="lg:col-span-7 w-full">
          <div className="relative rounded-2xl bg-[var(--bg-primary)] border border-[var(--divider)] p-6 overflow-hidden shadow-card">
            
            {/* Viewport Header Telemetry */}
            <div className="flex flex-wrap items-center justify-between pb-3 mb-3 border-b border-[var(--divider)] font-mono text-[11px] gap-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[var(--accent-success)]" />
                <span className="font-bold text-[var(--text-primary)] uppercase">
                  ACTIVE DYNAMICS TELEMETRY
                </span>
              </div>
              
              <div className="flex items-center gap-2">
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${verticalBadgeClass}`}>
                  {verticalState}
                </span>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${horizontalBadgeClass}`}>
                  {horizontalState}
                </span>
              </div>
            </div>

            {/* Visual Sky Viewport */}
            <div className="relative h-80 rounded-xl bg-[#F8FAFC] border border-[var(--divider)] flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 blueprint-grid opacity-25 pointer-events-none" />

              {/* Sky Background Altitude Guide Lines */}
              <div className="absolute inset-x-4 top-8 border-b border-dashed border-[#CBD5E1] text-[9px] font-mono text-[#94A3B8]">
                +Climbing Altitude Line
              </div>
              <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 border-b border-dashed border-[#94A3B8] text-[9px] font-mono text-[#64748B] flex justify-between">
                <span>Constant Altitude Reference Datum</span>
                <span>H = 0 (Datum)</span>
              </div>
              <div className="absolute inset-x-4 bottom-8 border-b border-dashed border-[#CBD5E1] text-[9px] font-mono text-[#94A3B8]">
                -Descending Ground Proximity
              </div>

              {/* Dynamic Animated Drone Node */}
              <div 
                className="relative z-10 flex flex-col items-center justify-center transition-all duration-300 ease-out"
                style={{
                  transform: `translateY(${translateY}px) rotate(${pitchAngle}deg)`
                }}
              >
                
                {/* 1. Lift Vector (Top Arrow) */}
                <div 
                  className="absolute bottom-full mb-1 flex flex-col items-center pointer-events-none transition-all duration-300"
                  style={{ height: `${liftArrowHeight}px` }}
                >
                  <span className="font-mono text-[9px] font-bold text-[var(--accent-signal)] bg-white px-1.5 py-0.5 rounded border border-[var(--accent-signal)] shadow-2xs mb-0.5 whitespace-nowrap">
                    LIFT (↑)
                  </span>
                  <div className="w-1 flex-1 bg-[var(--accent-signal)] rounded-t-full relative">
                    <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-b-[8px] border-b-[var(--accent-signal)]" />
                  </div>
                </div>

                {/* 2. Weight Vector (Bottom Arrow) */}
                <div 
                  className="absolute top-full mt-1 flex flex-col items-center pointer-events-none transition-all duration-300"
                  style={{ height: `${weightArrowHeight}px` }}
                >
                  <div className="w-1 flex-1 bg-[#475569] rounded-b-full relative">
                    <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[8px] border-t-[#475569]" />
                  </div>
                  <span className="font-mono text-[9px] font-bold text-[#475569] bg-white px-1.5 py-0.5 rounded border border-[#CBD5E1] shadow-2xs mt-0.5 whitespace-nowrap">
                    WEIGHT (↓)
                  </span>
                </div>

                {/* 3. Thrust Vector (Right Arrow) */}
                <div 
                  className="absolute left-full ml-1 flex items-center pointer-events-none transition-all duration-300"
                  style={{ width: `${thrustArrowWidth}px` }}
                >
                  <div className="h-1 flex-1 bg-[var(--accent-signal)] rounded-r-full relative">
                    <div className="absolute -right-1.5 top-1/2 -translate-y-1/2 w-0 h-0 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-l-[8px] border-l-[var(--accent-signal)]" />
                  </div>
                  <span className="font-mono text-[9px] font-bold text-[var(--accent-signal)] bg-white px-1.5 py-0.5 rounded border border-[var(--accent-signal)] shadow-2xs ml-0.5 whitespace-nowrap">
                    THRUST (→)
                  </span>
                </div>

                {/* 4. Drag Vector (Left Arrow) */}
                <div 
                  className="absolute right-full mr-1 flex items-center pointer-events-none transition-all duration-300"
                  style={{ width: `${dragArrowWidth}px` }}
                >
                  <span className="font-mono text-[9px] font-bold text-[#475569] bg-white px-1.5 py-0.5 rounded border border-[#CBD5E1] shadow-2xs mr-0.5 whitespace-nowrap">
                    DRAG (←)
                  </span>
                  <div className="h-1 flex-1 bg-[#475569] rounded-l-full relative">
                    <div className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-0 h-0 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-r-[8px] border-r-[#475569]" />
                  </div>
                </div>

                {/* Vehicle Model Center Graphic */}
                {airframe === 'multirotor' && (
                  <div className="w-24 h-14 rounded-2xl bg-[var(--accent-signal)] border-2 border-[var(--accent-signal-deep)] shadow-brand text-white flex flex-col items-center justify-center p-2 text-center font-mono">
                    <div className="text-[10px] font-bold">MULTIROTOR</div>
                    <div className="text-[7.5px] opacity-85">4 BLDC ROTORS</div>
                  </div>
                )}

                {airframe === 'vtol' && (
                  <div className="w-28 h-14 rounded-2xl bg-[var(--accent-signal)] border-2 border-[var(--accent-signal-deep)] shadow-brand text-white flex flex-col items-center justify-center p-2 text-center font-mono">
                    <div className="text-[10px] font-bold">HYBRID VTOL</div>
                    <div className="text-[7.5px] opacity-85">DUAL PROPULSION</div>
                  </div>
                )}

                {airframe === 'fixed_wing' && (
                  <div className="w-32 h-14 rounded-2xl bg-[var(--accent-signal)] border-2 border-[var(--accent-signal-deep)] shadow-brand text-white flex flex-col items-center justify-center p-2 text-center font-mono">
                    <div className="text-[10px] font-bold">FIXED-WING</div>
                    <div className="text-[7.5px] opacity-85">AIRFOIL WINGS</div>
                  </div>
                )}

              </div>
            </div>

            {/* Live Readout Status Line */}
            <div className="mt-4 pt-3 border-t border-[var(--divider)] flex flex-col sm:flex-row items-center justify-between font-mono text-xs gap-2">
              <div className="flex items-center gap-2">
                <span className="text-[var(--text-muted)]">Live Dynamics:</span>
                <span className="font-bold text-[var(--accent-signal)]">
                  {liftDelta === 0 && thrustDelta === 0 
                    ? 'Perfect 4-Force Steady Equilibrium' 
                    : `${verticalState} & ${horizontalState}`}
                </span>
              </div>

              <span className="text-[11px] text-[var(--text-muted)]">
                {reducedMotion ? 'Reduced Motion Active (Snapping)' : 'Real-time Smooth Lerp Motion'}
              </span>
            </div>

          </div>
        </div>

      </div>

      {/* Static Reference Rules Table (as specified in prompt) */}
      <div className="pt-6 border-t border-[var(--divider)]">
        <div className="flex items-center gap-2 mb-3">
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--text-primary)]">
            Flight Force Relationship Reference Table
          </span>
          <span className="font-mono text-[11px] text-[var(--text-muted)]">(Static Rule Mapping)</span>
        </div>

        <div className="overflow-x-auto rounded-xl border border-[var(--divider)]">
          <table className="w-full text-left font-mono text-xs">
            <thead className="bg-[var(--bg-primary)] border-b border-[var(--divider)] text-[var(--text-secondary)] uppercase">
              <tr>
                <th className="py-3 px-4 font-bold">Force Relationship</th>
                <th className="py-3 px-4 font-bold">Aerodynamic Result</th>
                <th className="py-3 px-4 font-bold">Current Match</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--divider)] bg-[var(--bg-primary)]">
              {[
                { rel: "Lift = Weight", res: "Drone hovers at constant altitude", active: liftDelta === 0 },
                { rel: "Lift > Weight", res: "Drone climbs", active: liftDelta > 0 },
                { rel: "Lift < Weight", res: "Drone descends", active: liftDelta < 0 },
                { rel: "Thrust > Drag", res: "Drone accelerates", active: thrustDelta > 0 },
                { rel: "Thrust = Drag", res: "Drone maintains constant speed", active: thrustDelta === 0 },
                { rel: "Thrust < Drag", res: "Drone slows down", active: thrustDelta < 0 }
              ].map((row, idx) => (
                <tr 
                  key={idx}
                  className={`transition-colors ${
                    row.active ? 'bg-[var(--accent-signal-subtle)]/70 font-semibold' : 'hover:bg-[var(--bg-elevated)]'
                  }`}
                >
                  <td className="py-2.5 px-4 font-bold text-[var(--accent-signal)]">
                    {row.rel}
                  </td>
                  <td className="py-2.5 px-4 text-[var(--text-secondary)]">
                    {row.res}
                  </td>
                  <td className="py-2.5 px-4">
                    {row.active ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#047857]">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>ACTIVE</span>
                      </span>
                    ) : (
                      <span className="text-[11px] text-[var(--text-muted)]">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
