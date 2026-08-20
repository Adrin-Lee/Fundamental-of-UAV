import React, { useState } from 'react';
import { 
  Wind, 
  Cpu, 
  Compass, 
  ShieldCheck, 
  RotateCw, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  BookOpen, 
  Sliders, 
  Layers, 
  Sparkles, 
  Award,
  Search,
  Check,
  ChevronRight,
  HelpCircle,
  Zap,
  Info
} from 'lucide-react';

export default function CurriculumFlashcardsView({
  onNavigateHome,
  onNavigateModule1,
  onNavigateModule2,
  onNavigateModule3,
  onNavigateModule4,
  onNavigateModule5,
  onNavigateModule6,
  onNavigateModule7,
  onNavigateModule8,
  onNavigateFinalAssessment,
  onNavigateSimulators
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [flippedCards, setFlippedCards] = useState({});

  const toggleFlip = (id) => {
    setFlippedCards(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const getCompletionStatus = (modId) => {
    try {
      if (modId === 'mod-types-of-drones' || modId === 'mod-drone-types') {
        return (
          localStorage.getItem('asteria_module_mod-types-of-drones') === 'completed' ||
          localStorage.getItem('asteria_module_mod-drone-types') === 'completed'
        );
      }
      return localStorage.getItem(`asteria_module_${modId}`) === 'completed';
    } catch {
      return false;
    }
  };

  const modules = [
    {
      id: "mod-intro-terminology",
      number: "01",
      code: "MOD 01 · LIFT TRACK",
      track: "lift",
      trackName: "Track 1: Lift",
      trackIcon: Wind,
      accentColor: "#2056A3",
      title: "Introduction & Drone Terminology",
      duration: "15 mins",
      sourceRef: "Drone Terminology",
      desc: "Fundamental definitions of UAV, UAS, and GCS. Explores core multirotor aerodynamics and how contra-rotating propellers cancel motor counter-torque.",
      keyConcepts: ["UAV vs UAS Architecture", "Ground Control Station (GCS)", "Counter-Torque Physics", "Propeller Aerofoils"],
      backDetails: {
        objectives: [
          "Differentiate between UAV aircraft and complete UAS system",
          "Explain why adjacent drone propellers rotate in opposite directions (CW vs CCW)",
          "Identify core flight components and ground control station telemetry"
        ],
        interactiveTools: ["Full Video Lecture & Masterclass", "Technical Terminology Flashcards", "Module Knowledge Assessment (10 Qs)"],
        testQuestion: "Why must adjacent propellers on a quadcopter rotate in opposite directions?"
      },
      launchAction: onNavigateModule1
    },
    {
      id: "mod-types-of-drones",
      number: "02",
      code: "MOD 02 · LIFT TRACK",
      track: "lift",
      trackName: "Track 1: Lift",
      trackIcon: Wind,
      accentColor: "#2056A3",
      title: "Types of Drones & Airframe Architectures",
      duration: "20 mins",
      sourceRef: "Types of Drones",
      desc: "Detailed comparative taxonomy across Single-Rotor, Multirotor (+ and X configurations), Fixed-Wing, and Hybrid VTOL airframes.",
      keyConcepts: ["Single-Rotor / Swashplate", "+ vs X Quad Frames", "Fixed-Wing Airfoils", "Hybrid VTOL Transition"],
      backDetails: {
        objectives: [
          "Compare efficiency, flight endurance, and hover capabilities across 4 drone types",
          "Analyze why X-configuration dominates commercial aerial survey drones",
          "Understand transition aerodynamics in Hybrid VTOL aircraft"
        ],
        interactiveTools: ["Full Video Lecture & Masterclass", "Interactive 3D Drone Model Viewer", "Module Knowledge Assessment (10 Qs)"],
        testQuestion: "What is the key advantage of an X-frame quadcopter over a +-frame quadcopter for camera payloads?"
      },
      launchAction: onNavigateModule2
    },
    {
      id: "mod-drone-components",
      number: "03",
      code: "MOD 03 · CONTROL TRACK",
      track: "control",
      trackName: "Track 2: Control",
      trackIcon: Cpu,
      accentColor: "#2056A3",
      title: "Drone Components & Propulsion Systems",
      duration: "30 mins",
      sourceRef: "Drone Components",
      desc: "Hardware deep dive into Carbon Airframes, BLDC Motors (KV ratings), Electronic Speed Controllers (ESCs), LiPo battery packs (S/P calculations), and GPS modules.",
      keyConcepts: ["Carbon Fiber Airframe", "BLDC Motor KV Sizing", "Single vs 4-in-1 ESCs", "LiPo S/P Configurations", "GNSS / GPS Receiver"],
      backDetails: {
        objectives: [
          "Determine motor RPM and torque characteristics from KV and battery voltage",
          "Calculate battery pack voltages (S) and capacities (P)",
          "Evaluate advantages and thermal trade-offs of 4-in-1 vs standalone ESCs"
        ],
        interactiveTools: ["Full Video Lecture & Masterclass", "Battery Configuration S/P Calculator", "Module Knowledge Assessment (10 Qs)"],
        testQuestion: "What is the nominal voltage and total capacity of a 6S2P LiPo battery made of 3.7V 5000mAh cells?"
      },
      launchAction: onNavigateModule3
    },
    {
      id: "mod-fc-sensors",
      number: "04",
      code: "MOD 04 · NAVIGATE TRACK",
      track: "navigate",
      trackName: "Track 3: Navigate",
      trackIcon: Compass,
      accentColor: "#2056A3",
      title: "Flight Controller & Sensor Fusion",
      duration: "35 mins",
      sourceRef: "UAV Flight Controller and Sensors",
      desc: "Avionics brain architecture: Microprocessor firmware, IMU (accelerometer + gyro), Barometer, Magnetometer, GPS, and Extended Kalman Filter (EKF) sensor fusion.",
      keyConcepts: ["6-DOF IMU Accelerometer / Gyro", "Barometric Altitude Estimation", "Magnetometer Heading Lock", "EKF Sensor Fusion", "Fail-safe Cascades"],
      backDetails: {
        objectives: [
          "Understand how the flight controller samples IMU data at 400Hz+ for auto-leveling",
          "Trace how complementary filters and EKF fuse GPS and barometric altitude data",
          "Analyze autopilot behavior during single-sensor loss or GPS degradation"
        ],
        interactiveTools: ["Full Video Lecture & Masterclass", "6-Channel Sensor Fusion Explainer", "Module Knowledge Assessment (10 Qs)"],
        testQuestion: "If a drone loses its magnetometer signal in flight, which capability is at risk of drifting?"
      },
      launchAction: onNavigateModule4
    },
    {
      id: "mod-flight-forces",
      number: "05",
      code: "MOD 05 · LIFT TRACK",
      track: "lift",
      trackName: "Track 1: Lift",
      trackIcon: Wind,
      accentColor: "#2056A3",
      title: "Fundamentals of UAV Flight Forces",
      duration: "25 mins",
      sourceRef: "Fundamentals of UAV Flight Forces",
      desc: "In-depth aerodynamic equilibrium of the 4 opposing forces (Lift, Weight, Thrust, Drag) in hovering, climbing, forward, and descending flight.",
      keyConcepts: ["Lift vs Weight Dynamic Equilibrium", "Thrust vs Drag Vectoring", "Fixed-Wing Bernoulli Lift", "Multirotor Tilt Translation"],
      backDetails: {
        objectives: [
          "Calculate net force vectors during hover, vertical climb, and forward flight",
          "Understand how fixed-wing wings generate lift via forward velocity versus rotor thrust",
          "Apply flight equilibrium principles to operational battery consumption"
        ],
        interactiveTools: ["Full Video Lecture & Masterclass", "4-Force Dynamic Flight Simulator", "Module Knowledge Assessment (10 Qs)"],
        testQuestion: "What force relationship is required for a multirotor to hover steadily at a constant altitude?"
      },
      launchAction: onNavigateModule5
    },
    {
      id: "mod-flight-modes",
      number: "06",
      code: "MOD 06 · NAVIGATE TRACK",
      track: "navigate",
      trackName: "Track 3: Navigate",
      trackIcon: Compass,
      accentColor: "#2056A3",
      title: "Flight Modes on UAV",
      duration: "20 mins",
      sourceRef: "Flight modes on UAV",
      desc: "Operating states from assisted manual to full autonomy: Loiter (GPS hold), Auto (waypoint mission), Land, Return-to-Launch (RTL), and Altitude Hold (Alt Hold).",
      keyConcepts: ["Loiter 3D Position Hold", "Autonomous Waypoint Navigation", "Auto Landing Descent Profile", "RTL Georeferenced Safety", "Alt Hold Barometer Lock"],
      backDetails: {
        objectives: [
          "Compare sensor dependencies across all 5 flight modes",
          "Understand how RTL climbs to clearance altitude before returning to Home point",
          "Identify appropriate pilot intervention strategies in each flight mode"
        ],
        interactiveTools: ["Full Video Lecture & Masterclass", "2D Flight Mode Mission Playground", "Module Knowledge Assessment (10 Qs)"],
        testQuestion: "What is the difference between Altitude Hold mode and Loiter mode when wind strikes the aircraft?"
      },
      launchAction: onNavigateModule6
    },
    {
      id: "mod-attitude-kinematics",
      number: "07",
      code: "MOD 07 · NAVIGATE TRACK",
      track: "navigate",
      trackName: "Track 3: Navigate",
      trackIcon: Compass,
      accentColor: "#2056A3",
      title: "UAV Attitude & Axis Movement",
      duration: "25 mins",
      sourceRef: "UAV Attitude and Axis Movement",
      desc: "3-Axis spatial kinematics: Longitudinal (Roll), Lateral (Pitch), and Vertical (Yaw). Exact motor differential thrust equations and reactive torque balancing.",
      keyConcepts: ["Roll (X-Axis Differential Thrust)", "Pitch (Y-Axis Differential Thrust)", "Yaw (Z-Axis Reactive Torque)", "CW/CCW Motor Pairing"],
      backDetails: {
        objectives: [
          "Derive roll, pitch, and yaw movements from 4-motor differential throttle",
          "Understand why diagonal motor pairs share the same rotational direction (CW vs CCW)",
          "Simulate full attitude dynamics in real-time 3D"
        ],
        interactiveTools: ["Full Video Lecture & Masterclass", "3D Roll/Pitch/Yaw Gimbal Simulator", "Module Knowledge Assessment (10 Qs)"],
        testQuestion: "To tilt the quadcopter nose downward (forward pitch), which motors must increase thrust?"
      },
      launchAction: onNavigateModule7
    },
    {
      id: "mod-dgca-rules",
      number: "08",
      code: "MOD 08 · COMPLY TRACK",
      track: "comply",
      trackName: "Track 4: Comply",
      trackIcon: ShieldCheck,
      accentColor: "#2056A3",
      title: "DGCA Rules & Airspace Regulations",
      duration: "30 mins",
      sourceRef: "DGCA Regulations",
      desc: "Indian civil aviation regulatory framework: Green, Yellow, and Red airspace zones, DigitalSky portal workflows, Remote Pilot Certificate (RPC), and NOTAM safety protocols.",
      keyConcepts: ["Green / Yellow / Red Airspace Zones", "Airport Distance Buffers (5km / 8-12km)", "DigitalSky vs eGCA Portal", "Drone Weight Classes (Nano to Large)"],
      backDetails: {
        objectives: [
          "Classify operating airspace into Green, Yellow, and Red zones based on airport proximity",
          "Differentiate statutory requirements between DigitalSky operations and eGCA registrations",
          "Identify mandatory failsafes and pilot certification standards under DGCA Drone Rules"
        ],
        interactiveTools: ["Full Video Lecture & Masterclass", "DGCA Airspace Zone Checker", "Module Knowledge Assessment (10 Qs)"],
        testQuestion: "What is the maximum permissible altitude in a Green Zone beyond 12 km from an operational airport?"
      },
      launchAction: onNavigateModule8
    }
  ];

  // Filtering Logic
  const filteredModules = modules.filter((mod) => {
    const matchesQuery = searchQuery === '' || 
      mod.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mod.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mod.keyConcepts.some(c => c.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesQuery;
  });

  const completedCount = modules.filter(m => getCompletionStatus(m.id)).length;
  const progressPercent = Math.round((completedCount / modules.length) * 100);

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] py-8 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ================= 1. PAGE HEADER & PROGRESS BAR ================= */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-6 mb-8 border-b border-[var(--divider)] gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[var(--accent-signal)]" />
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--accent-signal)]">
                DRONE SYSTEMS · MODULAR CURRICULUM DIRECTORY
              </span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[var(--text-primary)]">
              Curriculum Study Flashcards
            </h1>
            <p className="font-body text-sm sm:text-base text-[var(--text-muted)] mt-1.5 max-w-2xl leading-relaxed">
              Explore all 8 technical modules across Aerodynamics, Hardware, Avionics, and DGCA Regulations. Click <strong>Flip Details ↻</strong> on any card to view learning outcomes, embedded tools, and self-test questions.
            </p>
          </div>

          {/* Curriculum Mastery Progress Card */}
          <div className="p-4 rounded-2xl bg-[var(--bg-elevated)] border border-[var(--divider)] min-w-[260px] shadow-xs shrink-0">
            <div className="flex items-center justify-between text-xs font-mono mb-2">
              <span className="font-bold text-[var(--text-primary)]">Course Progress:</span>
              <span className="font-bold text-[var(--accent-signal)]">{completedCount} / {modules.length} Modules ({progressPercent}%)</span>
            </div>
            <div className="w-full h-2.5 bg-[var(--bg-primary)] border border-[var(--divider)] rounded-full overflow-hidden">
              <div 
                className="h-full bg-[var(--accent-signal)] rounded-full transition-all duration-500" 
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* ================= 2. ALL MODULES & SEARCH TOOLBAR ================= */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-5 border-b border-[var(--divider)]">
          
          {/* Left: All Modules Pill Tag */}
          <div className="flex items-center gap-2">
            <span className="px-4 py-2 rounded-xl font-mono text-xs font-bold bg-[var(--accent-signal)] text-white shadow-brand flex items-center gap-2 select-none">
              <Layers className="w-3.5 h-3.5" />
              <span>All Modules (8)</span>
            </span>
          </div>

          {/* Right: Search Input */}
          <div className="relative min-w-[260px] sm:w-72">
            <Search className="w-4 h-4 text-[var(--text-muted)] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search concepts, modules..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-[var(--bg-elevated)] border border-[var(--divider)] font-body text-xs text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--border-focus)]"
            />
          </div>

        </div>

        {/* ================= 3. 3D FLIPPABLE FLASHCARDS GRID ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredModules.map((mod) => {
            const isFlipped = !!flippedCards[mod.id];
            const isCompleted = getCompletionStatus(mod.id);
            const TrackIcon = mod.trackIcon;

            return (
              <div 
                key={mod.id}
                className="relative h-[430px] rounded-2xl group select-none"
                style={{ perspective: '1200px' }}
              >
                {/* 3D Card Inner Rotating Container */}
                <div
                  className="relative w-full h-full rounded-2xl transition-transform duration-500"
                  style={{
                    transformStyle: 'preserve-3d',
                    transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
                  }}
                >
                  
                  {/* ================= FRONT SIDE ================= */}
                  <div
                    className="absolute inset-0 w-full h-full rounded-2xl bg-[var(--bg-primary)] border border-[var(--divider)] group-hover:border-[var(--accent-signal)] p-5 sm:p-6 flex flex-col justify-between shadow-xs group-hover:shadow-card transition-all"
                    style={{
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden'
                    }}
                  >
                    <div>
                      {/* Top Meta Line */}
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-lg bg-[var(--accent-signal-subtle)] border border-[#BFDBFE] flex items-center justify-center text-[var(--accent-signal)]">
                            <TrackIcon className="w-4 h-4" />
                          </div>
                          <span className="font-mono text-[11px] font-bold text-[var(--accent-signal)] uppercase tracking-wider">
                            {mod.code}
                          </span>
                        </div>

                        {/* Completion Badge */}
                        {isCompleted ? (
                          <span className="inline-flex items-center gap-1 font-mono text-[10px] font-bold text-[#047857] bg-[#ECFDF5] px-2.5 py-0.5 rounded-full border border-[#A7F3D0]">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>Done ✓</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 font-mono text-[10px] text-[var(--text-muted)] bg-[var(--bg-elevated)] px-2 py-0.5 rounded-md border border-[var(--divider)]">
                            <Clock className="w-3 h-3" />
                            <span>{mod.duration}</span>
                          </span>
                        )}
                      </div>

                      {/* Module Title */}
                      <h3 className="font-display text-lg font-bold text-[var(--text-primary)] mb-2 group-hover:text-[var(--accent-signal)] transition-colors leading-snug">
                        {mod.title}
                      </h3>

                      {/* Description */}
                      <p className="font-body text-xs text-[var(--text-secondary)] leading-relaxed mb-3.5 line-clamp-3">
                        {mod.desc}
                      </p>

                      {/* Key Concept Pills */}
                      <div>
                        <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] block mb-1.5">
                          Core Concepts:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {mod.keyConcepts.map((concept, cIdx) => (
                            <span 
                              key={cIdx}
                              className="px-2 py-0.5 rounded-md bg-[var(--bg-elevated)] border border-[var(--divider)] font-mono text-[10px] font-semibold text-[var(--text-secondary)]"
                            >
                              {concept}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Bottom Button Bar */}
                    <div className="pt-3 border-t border-[var(--divider)] flex items-center justify-between gap-3">
                      <button
                        type="button"
                        onClick={() => toggleFlip(mod.id)}
                        className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-[var(--text-muted)] hover:text-[var(--accent-signal)] py-1.5 px-2 rounded-lg hover:bg-[var(--bg-elevated)] transition-colors"
                      >
                        <RotateCw className="w-3.5 h-3.5" />
                        <span>Flip Details</span>
                      </button>

                      <button
                        type="button"
                        onClick={mod.launchAction}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[var(--accent-signal)] hover:bg-[var(--accent-signal-deep)] text-white font-mono text-xs font-bold shadow-2xs transition-all"
                      >
                        <span>Launch</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* ================= BACK SIDE (AUTHENTIC 3D FLIPPED) ================= */}
                  <div
                    className="absolute inset-0 w-full h-full rounded-2xl bg-[var(--bg-elevated)] border-2 border-[var(--accent-signal)] p-5 sm:p-6 flex flex-col justify-between shadow-brand"
                    style={{
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)'
                    }}
                  >
                    {/* Back Header */}
                    <div className="flex items-center justify-between pb-2.5 border-b border-[var(--divider)]">
                      <span className="font-mono text-xs font-bold text-[var(--accent-signal)] uppercase tracking-wider">
                        {mod.number} · Learning Objectives
                      </span>
                      <button
                        type="button"
                        onClick={() => toggleFlip(mod.id)}
                        className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-[var(--accent-signal)] hover:underline py-0.5 px-2 rounded-lg hover:bg-[var(--accent-signal-subtle)] transition-colors"
                      >
                        <RotateCw className="w-3 h-3" />
                        <span>Flip Front</span>
                      </button>
                    </div>

                    {/* Middle: Objectives, Tools & Question */}
                    <div className="my-auto space-y-2.5 py-1">
                      {/* Target Competencies */}
                      <div>
                        <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] block mb-1">
                          Target Competencies:
                        </span>
                        <ul className="space-y-1 font-body text-xs text-[var(--text-secondary)] leading-relaxed">
                          {mod.backDetails.objectives.map((obj, oIdx) => (
                            <li key={oIdx} className="flex items-start gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-signal)] mt-1.5 shrink-0" />
                              <span className="line-clamp-2">{obj}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Embedded Tools */}
                      <div className="p-2.5 rounded-xl bg-[var(--bg-primary)] border border-[var(--divider)]">
                        <span className="font-mono text-[9.5px] font-bold uppercase tracking-wider text-[var(--text-muted)] block mb-0.5">
                          Embedded Simulator / Tool:
                        </span>
                        <div className="font-mono text-[11px] font-bold text-[var(--accent-signal)]">
                          {mod.backDetails.interactiveTools.join(' · ')}
                        </div>
                      </div>

                      {/* Self-Test Check */}
                      <div className="p-2.5 rounded-xl bg-[var(--accent-signal-subtle)] border border-[#BFDBFE]">
                        <span className="font-mono text-[9.5px] font-bold uppercase tracking-wider text-[var(--accent-signal)] block mb-0.5">
                          Self-Test Check:
                        </span>
                        <p className="font-body text-[11px] text-[var(--accent-signal-deep)] font-medium italic line-clamp-2">
                          "{mod.backDetails.testQuestion}"
                        </p>
                      </div>
                    </div>

                    {/* Back Bottom Action Bar */}
                    <div className="pt-3 border-t border-[var(--divider)] flex items-center justify-between gap-3">
                      <button
                        type="button"
                        onClick={() => toggleFlip(mod.id)}
                        className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-[var(--text-muted)] hover:text-[var(--accent-signal)] transition-colors"
                      >
                        <RotateCw className="w-3.5 h-3.5" />
                        <span>Return to front</span>
                      </button>

                      <button
                        type="button"
                        onClick={mod.launchAction}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[var(--accent-signal)] hover:bg-[var(--accent-signal-deep)] text-white font-mono text-xs font-bold shadow-2xs transition-all"
                      >
                        <span>Start Module</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                  </div>

                </div>
              </div>
            );
          })}
        </div>

        {filteredModules.length === 0 && (
          <div className="p-8 text-center bg-[var(--bg-elevated)] border border-[var(--divider)] rounded-2xl mb-12">
            <p className="font-body text-sm text-[var(--text-muted)]">
              No modules match your search term "{searchQuery}".
            </p>
          </div>
        )}

        {/* ================= 4. FOOTER QUICK ACTION BANNERS ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-[var(--divider)]">
          
          {/* Simulators Hub Link */}
          <div className="p-5 sm:p-6 rounded-2xl bg-[var(--bg-elevated)] border border-[var(--divider)] flex flex-col justify-between gap-4">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[var(--accent-signal-subtle)] border border-[#BFDBFE] text-[var(--accent-signal)] flex items-center justify-center mb-3 shadow-xs">
                <Sliders className="w-5 h-5" />
              </div>
              <h3 className="font-display text-lg font-bold text-[var(--text-primary)] mb-1">
                Engineering Simulators Workbench
              </h3>
              <p className="font-body text-xs text-[var(--text-muted)] leading-relaxed">
                Access all 6 interactive flight dynamics models, 3D attitude kinematic gimbals, aerodynamic force balancers, and DGCA zone calculators in one workbench.
              </p>
            </div>

            <button
              type="button"
              onClick={onNavigateSimulators}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--bg-primary)] border border-[var(--accent-signal)] text-[var(--accent-signal)] font-display text-xs font-bold hover:bg-[var(--accent-signal-subtle)] transition-all self-start"
            >
              <span>Open Simulators Hub</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Final Assessment Dynamic Card */}
          {getCompletionStatus('mod-dgca-rules') ? (
            <div className="p-5 sm:p-6 rounded-2xl bg-[#ECFDF5] border border-[#A7F3D0] flex flex-col justify-between gap-4">
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#059669] text-white flex items-center justify-center mb-3 shadow-brand">
                  <Award className="w-5 h-5" />
                </div>
                <h3 className="font-display text-lg font-bold text-[#065F46] mb-1">
                  Take Final Certification Exam
                </h3>
                <p className="font-body text-xs text-[#047857] leading-relaxed">
                  You've unlocked the certification exam! Complete the 30-question comprehensive examination to earn your drone fundamentals certificate.
                </p>
              </div>

              <button
                type="button"
                onClick={onNavigateFinalAssessment}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#059669] hover:bg-[#047857] text-white font-display text-xs font-bold shadow-brand transition-all self-start"
              >
                <span>Take Final Exam (30 Qs)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <div className="p-5 sm:p-6 rounded-2xl bg-[var(--bg-elevated)] border border-dashed border-[var(--divider)] flex flex-col justify-between gap-4">
              <div>
                <div className="w-10 h-10 rounded-xl bg-[var(--bg-primary)] border border-[var(--divider)] text-[var(--text-muted)] flex items-center justify-center mb-3">
                  <Award className="w-5 h-5 opacity-40" />
                </div>
                <h3 className="font-display text-lg font-bold text-[var(--text-primary)] mb-1">
                  Final Certification Exam (Locked)
                </h3>
                <p className="font-body text-xs text-[var(--text-muted)] leading-relaxed">
                  Complete and submit all 8 module assessments to unlock the comprehensive 30-question final certification examination.
                </p>
              </div>

              <span className="font-mono text-xs text-[var(--text-muted)] font-semibold flex items-center gap-1.5 self-start">
                <span>Progress: {completedCount} of 8 Modules Completed</span>
              </span>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
