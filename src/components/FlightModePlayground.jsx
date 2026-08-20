import React, { useState, useEffect, useRef } from 'react';
import { 
  Anchor, 
  Navigation, 
  ArrowDownCircle, 
  RotateCcw, 
  Gauge, 
  Play, 
  Pause, 
  Crosshair, 
  MapPin, 
  Compass, 
  Wind, 
  ShieldCheck, 
  Activity, 
  Info,
  Layers,
  Radio,
  CheckCircle2
} from 'lucide-react';

export default function FlightModePlayground() {
  const [activeMode, setActiveMode] = useState('loiter');
  const [isPlaying, setIsPlaying] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Animation frame state for dynamic top-down positions
  const [dronePos, setDronePos] = useState({ x: 280, y: 180, angle: 0, scale: 1, alt: 45.0 });
  const [autoStep, setAutoStep] = useState(0); // 0: WP1, 1: WP2, 2: WP3

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);

    const handleChange = (e) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Defined Mission Coordinates (SVG Coordinate Space: 0,0 to 560,360)
  const HOME = { x: 90, y: 290, label: "H (HOME)" };
  const WAYPOINTS = [
    { x: 170, y: 110, label: "WP 1 (Survey In)" },
    { x: 380, y: 80, label: "WP 2 (Apex Grid)" },
    { x: 480, y: 240, label: "WP 3 (Perimeter)" }
  ];

  // Simulation Loop
  useEffect(() => {
    if (reducedMotion || !isPlaying) {
      // Instant position snaps for reduced motion
      if (activeMode === 'loiter') {
        setDronePos({ x: 280, y: 180, angle: 0, scale: 1, alt: 45.0 });
      } else if (activeMode === 'auto') {
        const wp = WAYPOINTS[autoStep % WAYPOINTS.length];
        setDronePos({ x: wp.x, y: wp.y, angle: 45, scale: 1, alt: 50.0 });
      } else if (activeMode === 'land') {
        setDronePos({ x: 280, y: 220, angle: 0, scale: 0.65, alt: 0.0 });
      } else if (activeMode === 'rtl') {
        setDronePos({ x: HOME.x, y: HOME.y, angle: 0, scale: 0.7, alt: 0.0 });
      } else if (activeMode === 'alt_hold') {
        setDronePos({ x: 330, y: 160, angle: 15, scale: 1, alt: 42.0 });
      }
      return;
    }

    let animationFrameId;
    let tick = 0;

    const animate = () => {
      tick += 0.03;

      if (activeMode === 'loiter') {
        // Subtle micro jitter representing active wind compensation
        const jitterX = Math.sin(tick * 2.5) * 3.5 + Math.cos(tick * 4) * 1.5;
        const jitterY = Math.cos(tick * 2) * 3 + Math.sin(tick * 3.5) * 1.2;
        const jitterAngle = Math.sin(tick * 2) * 4;
        setDronePos({
          x: 280 + jitterX,
          y: 180 + jitterY,
          angle: jitterAngle,
          scale: 1,
          alt: 45.0 + Math.sin(tick) * 0.2
        });
      } else if (activeMode === 'auto') {
        // Continuous waypoint traverse WP1 -> WP2 -> WP3 -> WP1
        const t = (Math.sin(tick * 0.6) + 1) / 2; // 0 to 1
        const wpIndex = Math.floor((tick * 0.4) % 3);
        const nextWpIndex = (wpIndex + 1) % 3;
        const p1 = WAYPOINTS[wpIndex];
        const p2 = WAYPOINTS[nextWpIndex];
        const segT = ((tick * 0.4) % 1);

        const curX = p1.x + (p2.x - p1.x) * segT;
        const curY = p1.y + (p2.y - p1.y) * segT;
        const curAngle = Math.atan2(p2.y - p1.y, p2.x - p1.x) * (180 / Math.PI) + 90;

        setDronePos({
          x: curX,
          y: curY,
          angle: curAngle,
          scale: 1,
          alt: 50.0
        });
      } else if (activeMode === 'land') {
        // Descend in place and shrink
        const landingProgress = Math.min(1, (Math.sin(tick * 0.8) + 1) / 2);
        const currentScale = 1 - (landingProgress * 0.45);
        const currentAlt = Math.max(0, 45 * (1 - landingProgress));
        setDronePos({
          x: 280,
          y: 180 + landingProgress * 30,
          angle: 0,
          scale: currentScale,
          alt: currentAlt
        });
      } else if (activeMode === 'rtl') {
        // Fly directly toward Home coordinate then touchdown
        const rtlPhase = ((tick * 0.5) % 2); // 0 to 1 = transit, 1 to 2 = land
        if (rtlPhase < 1) {
          const t = rtlPhase;
          const startX = 420;
          const startY = 120;
          const curX = startX + (HOME.x - startX) * t;
          const curY = startY + (HOME.y - startY) * t;
          const curAngle = Math.atan2(HOME.y - startY, HOME.x - startX) * (180 / Math.PI) + 90;
          setDronePos({
            x: curX,
            y: curY,
            angle: curAngle,
            scale: 1,
            alt: 50.0
          });
        } else {
          const landT = rtlPhase - 1;
          setDronePos({
            x: HOME.x,
            y: HOME.y,
            angle: 0,
            scale: 1 - landT * 0.4,
            alt: Math.max(0, 50 * (1 - landT))
          });
        }
      } else if (activeMode === 'alt_hold') {
        // Lateral drifting (simulating pilot roll/pitch) with fixed altitude
        const driftX = 260 + Math.sin(tick * 1.2) * 90;
        const driftY = 180 + Math.cos(tick * 1.5) * 50;
        const rollTilt = Math.cos(tick * 1.2) * 15;
        setDronePos({
          x: driftX,
          y: driftY,
          angle: rollTilt,
          scale: 1,
          alt: 42.0 // Stays perfectly constant!
        });
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [activeMode, isPlaying, reducedMotion, autoStep]);

  // Mode Metadata Definition
  const modeDetails = {
    loiter: {
      name: "Loiter Mode",
      icon: Anchor,
      tag: "GPS + Altitude Position Lock",
      telemetry: `MODE: LOITER · 3D GPS HOLD · POS: (${dronePos.x.toFixed(1)}, ${dronePos.y.toFixed(1)}) · ALT: ${dronePos.alt.toFixed(1)}m · WIND COMP: ACTIVE`,
      description: "Uses GPS and onboard sensors to hold the UAV at a fixed position and altitude. The UAV automatically compensates for wind and minor disturbances.",
      pilotAuthority: "Hands-off Stationary Hover (Automatic Wind Rejection)",
      activeSensors: ["GPS (3D Fix)", "IMU (Gyro/Accel)", "Barometer", "Compass"]
    },
    auto: {
      name: "Auto Mode",
      icon: Navigation,
      tag: "Autonomous Waypoint Flight",
      telemetry: `MODE: AUTO · MISSION ACTIVE · WP SEQUENCE [1→2→3] · HDG: ${dronePos.angle.toFixed(0)}° · ALT: ${dronePos.alt.toFixed(1)}m`,
      description: "The UAV follows a pre-programmed flight path or mission without continuous pilot input. Waypoints and mission parameters are uploaded before take off.",
      pilotAuthority: "Full Autopilot Navigation (Survey/Mapping Mission Execution)",
      activeSensors: ["GPS Navigation", "Flight Controller Path Planner", "IMU Fusion"]
    },
    land: {
      name: "Land Mode",
      icon: ArrowDownCircle,
      tag: "Vertical Descent & Disarm",
      telemetry: `MODE: LAND · AUTONOMOUS DESCENT · VERT SPEED: -1.2 m/s · ALT: ${dronePos.alt.toFixed(1)}m · GROUND SENSING`,
      description: "Land Mode is a flight mode in which the UAV automatically lands at its current location. It can be used during normal operations or in emergency situations, such as low battery.",
      pilotAuthority: "Automatic Controlled Touchdown at Current Coordinates",
      activeSensors: ["Barometer (Rate of Descent)", "Rangefinder / IMU", "Motor Commutation"]
    },
    rtl: {
      name: "RTL (Return-to-Launch)",
      icon: RotateCcw,
      tag: "Autonomous Home Failsafe",
      telemetry: `MODE: RTL · RETURNING TO LAUNCHPAD · HOME POINT [90, 290] · SAFE ALT: 50.0m · AUTO LAND ARMED`,
      description: "The UAV automatically returns to its take-off location and lands. Can be activated manually or automatically during communication loss or low battery.",
      pilotAuthority: "Emergency / Pilot Autonomous Return (Geo-referenced Home Point)",
      activeSensors: ["GPS Home Lock", "Compass Heading", "Barometer Altitude Clearance"]
    },
    alt_hold: {
      name: "Alt Hold (Altitude Hold)",
      icon: Gauge,
      tag: "Barometric Vertical Lock",
      telemetry: `MODE: ALT HOLD · MANUAL LATERAL CONTROL · ALT: 42.0m [LOCKED] · BARO PID: CONSTANT · PILOT: ACTIVE`,
      description: "Alt Hold Mode automatically maintains the UAV at a constant altitude during flight. The pilot controls the UAV's roll, pitch, and yaw, while the altitude is maintained automatically.",
      pilotAuthority: "Pilot Lateral Flight Control (Pitch/Roll/Yaw) + Auto Height Lock",
      activeSensors: ["Barometer (Air Pressure PID)", "IMU Attitude Stabilize"]
    }
  };

  const currentMode = modeDetails[activeMode];
  const ModeIcon = currentMode.icon;

  return (
    <div className="rounded-2xl bg-[var(--bg-elevated)] border border-[var(--divider)] p-6 sm:p-8 shadow-xs">
      
      {/* Top Header & Mode Selectors */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-6 mb-6 border-b border-[var(--divider)] gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-[var(--accent-signal)]" />
            <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[var(--accent-signal)]">
              TIER 1 SIGNATURE INTERACTIVE TOOL
            </span>
          </div>
          <h3 className="font-display text-xl sm:text-2xl font-bold text-[var(--text-primary)]">
            Flight-Mode Interactive 2D Playground
          </h3>
          <p className="font-body text-xs sm:text-sm text-[var(--text-muted)] mt-1">
            Select any flight mode to observe the flight controller's real-time kinematic response and pilot assistance level.
          </p>
        </div>

        {/* Play / Pause Toggle */}
        <button
          type="button"
          onClick={() => setIsPlaying(!isPlaying)}
          className="self-start lg:self-auto inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[var(--bg-primary)] border border-[var(--divider)] hover:border-[var(--accent-signal)] font-mono text-xs font-semibold text-[var(--accent-signal)] shadow-2xs transition-all focus-visible:ring-2 focus-visible:ring-[var(--border-focus)] min-h-[44px]"
        >
          {isPlaying ? (
            <>
              <Pause className="w-3.5 h-3.5" />
              <span>Pause Motion</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5" />
              <span>Resume Motion</span>
            </>
          )}
        </button>
      </div>

      {/* 5 Mode Selector Buttons Bar (Min 44px touch targets) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 mb-8">
        {[
          { id: 'loiter', label: '1. Loiter', icon: Anchor },
          { id: 'auto', label: '2. Auto', icon: Navigation },
          { id: 'land', label: '3. Land', icon: ArrowDownCircle },
          { id: 'rtl', label: '4. RTL', icon: RotateCcw },
          { id: 'alt_hold', label: '5. Alt Hold', icon: Gauge }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeMode === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveMode(tab.id)}
              className={`min-h-[44px] py-2.5 px-3 rounded-xl font-display text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-2xs focus-visible:ring-2 focus-visible:ring-[var(--border-focus)] ${
                isActive
                  ? 'bg-[var(--accent-signal)] text-white shadow-brand border border-[var(--accent-signal-deep)]'
                  : 'bg-[var(--bg-primary)] text-[var(--text-secondary)] border border-[var(--divider)] hover:border-[var(--accent-signal)] hover:text-[var(--accent-signal)]'
              }`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span className="truncate">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Main Interactive Stage: 2D SVG Map (Left) vs Real-time Telemetry (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Top-Down 2D Mission Map Canvas */}
        <div className="lg:col-span-7 w-full">
          <div className="relative rounded-2xl bg-[var(--bg-primary)] border border-[var(--divider)] p-4 sm:p-5 shadow-card overflow-hidden">
            
            {/* Map Canvas Header Info */}
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-[var(--divider)] font-mono text-[11px] text-[var(--text-muted)]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[var(--accent-signal)]" />
                <span className="font-bold text-[var(--text-primary)]">TOP-DOWN 2D MISSION MAP</span>
              </div>
              <div className="flex items-center gap-2">
                <Wind className="w-3.5 h-3.5 text-[var(--text-muted)]" />
                <span>Wind: 8 km/h ENE</span>
              </div>
            </div>

            {/* SVG Interactive Canvas */}
            <div className="relative w-full aspect-[14/9] rounded-xl bg-[#F8FAFC] border border-[var(--divider)] overflow-hidden">
              <div className="absolute inset-0 blueprint-grid opacity-25 pointer-events-none" />

              <svg 
                className="w-full h-full" 
                viewBox="0 0 560 360" 
                preserveAspectRatio="xMidYMid meet"
                role="img"
                aria-label="Interactive 2D top-down flight mode demonstration map"
              >
                <defs>
                  {/* Grid Marker Pattern */}
                  <radialGradient id="homeGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#2056A3" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#2056A3" stopOpacity="0" />
                  </radialGradient>
                </defs>

                {/* 1. Planned Waypoint Dashed Mission Flight Path */}
                <path
                  d={`M ${HOME.x} ${HOME.y} L ${WAYPOINTS[0].x} ${WAYPOINTS[0].y} L ${WAYPOINTS[1].x} ${WAYPOINTS[1].y} L ${WAYPOINTS[2].x} ${WAYPOINTS[2].y} Z`}
                  fill="none"
                  stroke={activeMode === 'auto' ? '#2056A3' : '#CBD5E1'}
                  strokeWidth="2"
                  strokeDasharray="6 4"
                  className={activeMode === 'auto' ? 'animate-pulse' : ''}
                />

                {/* Direct RTL Path (Active during RTL Mode) */}
                {activeMode === 'rtl' && (
                  <line
                    x1="420"
                    y1="120"
                    x2={HOME.x}
                    y2={HOME.y}
                    stroke="#EF4444"
                    strokeWidth="2"
                    strokeDasharray="4 4"
                  />
                )}

                {/* 2. Home Takeoff Pad Marker */}
                <g transform={`translate(${HOME.x}, ${HOME.y})`}>
                  <circle r="26" fill="url(#homeGlow)" />
                  <circle r="16" fill="#FFFFFF" stroke="#2056A3" strokeWidth="2.5" />
                  <text 
                    textAnchor="middle" 
                    dy="5" 
                    className="font-mono text-[11px] font-bold fill-[var(--accent-signal)]"
                  >
                    H
                  </text>
                  <text 
                    textAnchor="middle" 
                    dy="32" 
                    className="font-mono text-[8px] font-bold fill-[#475569]"
                  >
                    HOME [LAUNCH]
                  </text>
                </g>

                {/* 3. Three Autonomous Waypoints */}
                {WAYPOINTS.map((wp, idx) => (
                  <g key={idx} transform={`translate(${wp.x}, ${wp.y})`}>
                    <circle r="12" fill="#FFFFFF" stroke="#64748B" strokeWidth="2" />
                    <circle r="4" fill="#2056A3" />
                    <text 
                      textAnchor="middle" 
                      dy="4" 
                      className="font-mono text-[9px] font-bold fill-white"
                    >
                      {idx + 1}
                    </text>
                    <text 
                      textAnchor="middle" 
                      dy="24" 
                      className="font-mono text-[8px] font-semibold fill-[#64748B]"
                    >
                      {wp.label}
                    </text>
                  </g>
                ))}

                {/* 4. Dynamic Simulated UAV Drone Icon */}
                <g 
                  transform={`translate(${dronePos.x}, ${dronePos.y}) rotate(${dronePos.angle}) scale(${dronePos.scale})`}
                  className="transition-transform duration-100 ease-out"
                >
                  {/* Drone Proximity Radar Pulse */}
                  <circle r="28" fill="none" stroke="#2056A3" strokeWidth="1" strokeOpacity="0.4" className="animate-ping" />

                  {/* Quadcopter Carbon Arms (X-Shape) */}
                  <line x1="-18" y1="-18" x2="18" y2="18" stroke="#1E293B" strokeWidth="4" strokeLinecap="round" />
                  <line x1="-18" y1="18" x2="18" y2="-18" stroke="#1E293B" strokeWidth="4" strokeLinecap="round" />

                  {/* 4 Spinning Rotor Discs */}
                  {[-18, 18].map((rx) =>
                    [-18, 18].map((ry) => (
                      <g key={`${rx}-${ry}`} transform={`translate(${rx}, ${ry})`}>
                        <circle r="9" fill="#E2E8F0" stroke="#2056A3" strokeWidth="1.5" strokeOpacity="0.6" />
                        <circle r="2.5" fill="#2056A3" />
                      </g>
                    ))
                  )}

                  {/* Center Fuselage Hub */}
                  <rect x="-10" y="-12" width="20" height="24" rx="5" fill="#2056A3" stroke="#00439B" strokeWidth="1.5" />
                  {/* Forward Heading Nose Indicator */}
                  <polygon points="0,-16 -4,-10 4,-10" fill="#EF4444" />
                </g>

                {/* Fixed Altitude HUD Tag (Specifically prominent for Alt Hold) */}
                <g transform="translate(420, 335)">
                  <rect x="-100" y="-15" width="200" height="26" rx="13" fill="#0F172A" stroke="#1E293B" strokeWidth="1" />
                  <text 
                    textAnchor="middle" 
                    dy="2" 
                    className="font-mono text-[9px] font-bold fill-[#38BDF8]"
                  >
                    ALT: {dronePos.alt.toFixed(1)}m — {activeMode === 'alt_hold' ? 'HOLD [LOCKED]' : 'BARO'}
                  </text>
                </g>
              </svg>
            </div>

            {/* Telemetry Live Feed Line */}
            <div className="mt-3 pt-2.5 border-t border-[var(--divider)] font-mono text-[11px] text-[var(--accent-signal)] truncate">
              &gt; {currentMode.telemetry}
            </div>

          </div>
        </div>

        {/* Right Column: Live Status Readout & Behavioral Specification */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          
          <div className="p-6 rounded-2xl bg-[var(--bg-primary)] border border-[var(--divider)] shadow-xs">
            
            {/* Header Badge */}
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-[var(--divider)]">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[var(--accent-signal-subtle)] border border-[#BFDBFE] flex items-center justify-center text-[var(--accent-signal)] shadow-2xs">
                  <ModeIcon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-display text-base font-bold text-[var(--text-primary)]">
                    {currentMode.name}
                  </h4>
                  <span className="font-mono text-[10px] text-[var(--accent-signal)] font-semibold uppercase">
                    {currentMode.tag}
                  </span>
                </div>
              </div>
              <span className="font-mono text-xs font-bold text-[#047857] bg-[#ECFDF5] px-2.5 py-0.5 rounded-full border border-[#A7F3D0]">
                ENGAGED
              </span>
            </div>

            {/* Verbatim Definition Quote */}
            <div className="mb-5">
              <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)] block mb-1.5">
                Flight Controller Behavioral Directive:
              </span>
              <p className="font-body text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed bg-[var(--bg-elevated)] p-3.5 rounded-xl border border-[var(--divider)]">
                "{currentMode.description}"
              </p>
            </div>

            {/* Pilot Control Authority */}
            <div className="mb-5">
              <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)] block mb-1">
                Pilot Authority Level:
              </span>
              <div className="flex items-center gap-2 font-mono text-xs font-semibold text-[var(--text-primary)]">
                <Activity className="w-4 h-4 text-[var(--accent-signal)]" />
                <span>{currentMode.pilotAuthority}</span>
              </div>
            </div>

            {/* Primary Required Sensors */}
            <div className="pt-4 border-t border-[var(--divider)]">
              <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)] block mb-2">
                Required Avionics Sensor Feeds:
              </span>
              <div className="flex flex-wrap gap-1.5 font-mono text-[10px]">
                {currentMode.activeSensors.map((sensor, i) => (
                  <span 
                    key={i} 
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[var(--bg-elevated)] border border-[var(--divider)] text-[var(--text-secondary)]"
                  >
                    <CheckCircle2 className="w-3 h-3 text-[var(--accent-signal)]" />
                    <span>{sensor}</span>
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* Quick Explanatory Note */}
          <div className="p-4 rounded-xl bg-[var(--bg-primary)] border border-[var(--divider)] font-body text-xs text-[var(--text-muted)] flex items-start gap-2.5">
            <Info className="w-4 h-4 text-[var(--accent-signal)] shrink-0 mt-0.5" />
            <span>
              Autonomous failsafes like <strong>RTL</strong> or <strong>Land</strong> automatically trigger when radio link loss (RC Failsafe) or critical low battery thresholds are breached.
            </span>
          </div>

        </div>

      </div>

    </div>
  );
}
