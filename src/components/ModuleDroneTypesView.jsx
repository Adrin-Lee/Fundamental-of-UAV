import React, { useState, useRef } from 'react';
import { 
  ChevronRight, 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle, 
  Check, 
  Plane, 
  RotateCw, 
  Compass, 
  Wind, 
  Layers, 
  Maximize2, 
  Zap, 
  TrendingUp,
  Activity,
  Box,
  Video,
  Tv,
  Award,
  Lock
} from 'lucide-react';
import SectionHeading from './SectionHeading';
import DroneTypeComparator from './DroneTypeComparator';
import Drone3DViewer from './Drone3DViewer';
import { modulesData } from '../data/curriculumData';

export default function ModuleDroneTypesView({ onNavigateHome, onNavigatePrev, onNavigateNext, onNavigateAssessment }) {
  const moduleInfo = modulesData["mod-drone-types"];
  const videoRef = useRef(null);

  // Progress persistence state
  const [isCompleted, setIsCompleted] = useState(() => {
    try {
      return localStorage.getItem('asteria_module_mod-types-of-drones') === 'completed' ||
             localStorage.getItem('asteria_module_mod-drone-types') === 'completed' ||
             localStorage.getItem('learning_mod-types-of-drones') === 'completed' ||
             localStorage.getItem('learning_mod-drone-types') === 'completed';
    } catch {
      return false;
    }
  });

  const handleMarkCompleteAndNavigateAssessment = () => {
    try {
      localStorage.setItem('asteria_module_mod-types-of-drones', 'completed');
      localStorage.setItem('asteria_module_mod-drone-types', 'completed');
      localStorage.setItem('learning_mod-types-of-drones', 'completed');
      localStorage.setItem('learning_mod-drone-types', 'completed');
    } catch (e) {
      console.warn(e);
    }
    setIsCompleted(true);
    if (onNavigateAssessment) {
      onNavigateAssessment();
    }
  };

  const scrollToAnchor = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItems = [
    { id: "section-video", label: "Video Masterclass", icon: Video },
    { id: "section-multirotor", label: "Multirotor Types (3D)", icon: Layers },
    { id: "section-vtol", label: "Fixed-Wing & VTOL", icon: Plane },
    { id: "section-comparator", label: "Type Comparator", icon: RotateCw }
  ];

  return (
    <article className="min-h-screen bg-[var(--bg-primary)] py-8 sm:py-12 border-b border-[var(--divider)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ================= 1. BREADCRUMB & MODULE HEADER ================= */}
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs font-mono text-[var(--text-muted)]">
          <button 
            onClick={onNavigateHome}
            className="hover:text-[var(--accent-signal)] transition-colors flex items-center gap-1 focus-visible:ring-2 focus-visible:ring-[var(--border-focus)] rounded-md"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Curriculum</span>
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-[var(--divider)]" />
          <button 
            onClick={onNavigatePrev}
            className="hover:text-[var(--accent-signal)] transition-colors"
          >
            Track 1: Lift
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-[var(--divider)]" />
          <span className="text-[var(--text-primary)] font-semibold">Module 2: Types of Drones</span>
        </nav>

        {/* Module Header Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 mb-6 border-b border-[var(--divider)] gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-3 rounded-full bg-[var(--accent-signal-subtle)] border border-[#BFDBFE]">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-signal)]" />
              <span className="font-display text-[11px] font-bold tracking-[0.08em] uppercase text-[var(--accent-signal)]">
                MODULE 02 · LIFT TRACK
              </span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[var(--text-primary)]">
              {moduleInfo.title}
            </h1>
            <div className="flex items-center gap-3 mt-2.5 font-mono text-xs text-[var(--text-muted)]">
              <span>Source Ref: {moduleInfo.source_section}</span>
              <span>·</span>
              <span>Est. Time: 20 mins</span>
              <span>·</span>
              <span className="text-[var(--accent-signal)] font-semibold">Includes Video Lecture</span>
            </div>
          </div>

          {/* Action Button: Single button to Mark Complete & Take Assessment */}
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={isCompleted ? onNavigateAssessment : handleMarkCompleteAndNavigateAssessment}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold font-display text-white bg-[var(--accent-signal)] hover:bg-[var(--accent-signal-deep)] shadow-brand transition-all cursor-pointer"
            >
              {isCompleted ? (
                <>
                  <Award className="w-3.5 h-3.5 text-white" />
                  <span>Take Assessment (10 Qs)</span>
                  <ArrowRight className="w-3.5 h-3.5 text-white" />
                </>
              ) : (
                <>
                  <CheckCircle className="w-4 h-4 text-white" />
                  <span>Mark as Complete & Take Assessment</span>
                  <ArrowRight className="w-4 h-4 text-white" />
                </>
              )}
            </button>
          </div>
        </div>

        {/* Sticky Mini-Nav Anchor Bar */}
        <div className="sticky top-16 z-30 mb-10 py-2.5 bg-[var(--bg-primary)]/90 backdrop-blur-md border-b border-[var(--divider)]">
          <div className="flex items-center gap-2 overflow-x-auto py-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => scrollToAnchor(item.id)}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[var(--bg-elevated)] hover:bg-[var(--accent-signal-subtle)] hover:text-[var(--accent-signal)] border border-[var(--divider)] font-mono text-xs font-semibold text-[var(--text-secondary)] whitespace-nowrap transition-all shadow-2xs"
                >
                  <Icon className="w-3.5 h-3.5 text-[var(--accent-signal)]" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ================= 2. VIDEO MASTERCLASS (CLEAN PLAYER) ================= */}
        <section id="section-video" className="mb-16 scroll-mt-28">
          <div className="p-6 sm:p-8 rounded-2xl bg-[var(--bg-elevated)] border border-[var(--divider)] shadow-xs">
            
            {/* Header / Badge */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 mb-5 border-b border-[var(--divider)] gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[var(--accent-signal)] text-white flex items-center justify-center shadow-xs shrink-0">
                  <Tv className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[var(--accent-signal)]">
                      VISUAL MASTERCLASS · MODULE 02
                    </span>
                    <span className="text-[var(--divider)]">·</span>
                    <span className="font-mono text-[10px] font-bold text-[#059669] bg-[#ECFDF5] px-2 py-0.5 rounded-full border border-[#A7F3D0]">
                      HD MP4
                    </span>
                  </div>
                  <h2 className="font-display text-xl sm:text-2xl font-bold text-[var(--text-primary)]">
                    Types of Drones & Airframe Architectures
                  </h2>
                </div>
              </div>

              <div className="font-mono text-xs text-[var(--text-muted)] self-start sm:self-auto">
                <span>UAV Fundamentals Training Series</span>
              </div>
            </div>

            {/* Embedded Clean Video Player */}
            <div className="relative rounded-2xl overflow-hidden bg-black border border-[var(--divider)] shadow-xl aspect-video w-full max-w-4xl mx-auto flex items-center justify-center">
              <video 
                ref={videoRef}
                controls 
                playsInline
                preload="metadata"
                className="w-full h-full object-contain"
                poster="/favicon.svg"
              >
                <source src="/videos/module2.mp4" type="video/mp4" />
                <source src="/videos/Module 2.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>

          </div>
        </section>

        {/* ================= 3. INTRO LEAD PARAGRAPH ================= */}
        <div className="p-5 sm:p-6 rounded-2xl bg-[var(--bg-elevated)] border border-[var(--divider)] mb-12 shadow-xs">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-[var(--accent-signal-subtle)] border border-[#BFDBFE] flex items-center justify-center text-[var(--accent-signal)] shrink-0 mt-0.5">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <span className="font-mono text-[10px] font-bold tracking-wider uppercase text-[var(--accent-signal)] mb-1 block">
                CORE MULTIROTOR DEFINITION
              </span>
              <p className="font-body text-base sm:text-lg text-[var(--text-primary)] leading-relaxed font-medium">
                "{moduleInfo.intro_lead}"
              </p>
            </div>
          </div>
        </div>

        {/* ================= 4. MULTIROTOR TYPES COMPARISON GRID (INTERACTIVE 3D MODELS) ================= */}
        <section id="section-multirotor" className="mb-16 scroll-mt-28">
          <SectionHeading
            eyebrow="multirotor configurations"
            title="Multirotor Drone Types & Rotor Counts"
            subtitle="Multirotors achieve vertical lift, hover, and omnidirectional translation by varying the individual rotational speeds (RPM) of their brushless motor-propeller assemblies. Click and drag on any model to rotate in 3D."
          />

          {/* Embedded Reusable Drone Type Comparator with 3D models */}
          <DroneTypeComparator />
        </section>

        {/* ================= 5. FIXED-WING DRONES SECTION (INTERACTIVE 3D MODEL) ================= */}
        <section id="section-fixed-wing" className="pt-12 border-t border-[var(--divider)] mb-16 scroll-mt-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left: Text & Analysis */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              <SectionHeading
                eyebrow="aerodynamic lift"
                title={moduleInfo.fixed_wing.title}
                subtitle={moduleInfo.fixed_wing.description}
              />

              <div className="space-y-4 font-body text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
                <p>
                  Unlike multirotors which rely on continuous motorized vertical thrust to stay aloft, fixed-wing drones generate lift through the forward motion of the aircraft across aerodynamic airfoils (wings) governed by Bernoulli's principle.
                </p>
                <p>
                  Because lift generation requires only forward thrust rather than opposing full gravitational weight, fixed-wing systems consume significantly less battery or fuel energy per kilometer, making them the standard choice for corridor mapping, pipeline inspection, and long-range surveillance missions.
                </p>
              </div>

              {/* Key Highlights Matrix */}
              <div className="grid grid-cols-3 gap-3 mt-6 pt-6 border-t border-[var(--divider)]">
                <div className="p-3 rounded-xl bg-[var(--bg-elevated)] border border-[var(--divider)]">
                  <span className="font-mono text-[10px] uppercase text-[var(--text-muted)] block">Endurance</span>
                  <span className="font-mono text-sm sm:text-base font-bold text-[var(--accent-signal)]">60–180+ min</span>
                </div>
                <div className="p-3 rounded-xl bg-[var(--bg-elevated)] border border-[var(--divider)]">
                  <span className="font-mono text-[10px] uppercase text-[var(--text-muted)] block">Cruise Speed</span>
                  <span className="font-mono text-sm sm:text-base font-bold text-[var(--accent-signal)]">50–100 km/h</span>
                </div>
                <div className="p-3 rounded-xl bg-[var(--bg-elevated)] border border-[var(--divider)]">
                  <span className="font-mono text-[10px] uppercase text-[var(--text-muted)] block">Coverage</span>
                  <span className="font-mono text-sm sm:text-base font-bold text-[var(--accent-signal)]">10–50+ sq km</span>
                </div>
              </div>
            </div>

            {/* Right: Technical Fixed-Wing 3D Interactive Viewport */}
            <div className="lg:col-span-5 w-full">
              <div className="relative rounded-2xl bg-[var(--bg-elevated)] border border-[var(--divider)] p-4 sm:p-5 overflow-hidden shadow-sm flex flex-col justify-between">
                
                <div className="flex items-center justify-between pb-3 mb-2 border-b border-[var(--divider)] font-mono text-[11px] text-[var(--text-muted)]">
                  <div className="flex items-center gap-2">
                    <Plane className="w-4 h-4 text-[var(--accent-signal)]" />
                    <span className="font-semibold text-[var(--text-secondary)]">FIXED-WING 3D MODEL</span>
                  </div>
                  <span className="text-[var(--accent-signal)] font-semibold">LONG RANGE AIRFRAME</span>
                </div>

                {/* 3D WebGL Fixed-Wing Viewport */}
                <div className="relative w-full h-64 rounded-xl bg-[var(--bg-primary)] border border-[var(--divider)] overflow-hidden shadow-xs">
                  <div className="absolute inset-0 blueprint-grid opacity-40 pointer-events-none" />
                  <Drone3DViewer type="fixed-wing" />
                </div>

                <div className="mt-3 pt-3 border-t border-[var(--divider)] font-body text-xs text-[var(--text-muted)] leading-relaxed flex items-center justify-between">
                  <span>Airfoil lift generation with forward propulsion</span>
                  <span className="font-mono text-[10px] text-[var(--accent-signal)] font-semibold">DRAG TO ORBIT</span>
                </div>

              </div>
            </div>

          </div>
        </section>

        {/* ================= 6. HYBRID VTOL DRONES SECTION (INTERACTIVE 3D MODEL) ================= */}
        <section id="section-hybrid-vtol" className="pt-12 border-t border-[var(--divider)] mb-16 scroll-mt-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left: Technical Hybrid VTOL 3D Viewport */}
            <div className="lg:col-span-5 w-full order-2 lg:order-1">
              <div className="relative rounded-2xl bg-[var(--bg-elevated)] border border-[var(--divider)] p-4 sm:p-5 overflow-hidden shadow-sm flex flex-col justify-between">
                
                <div className="flex items-center justify-between pb-3 mb-2 border-b border-[var(--divider)] font-mono text-[11px] text-[var(--text-muted)]">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-[var(--accent-signal)]" />
                    <span className="font-semibold text-[var(--text-secondary)]">HYBRID VTOL 3D MODEL</span>
                  </div>
                  <span className="text-[var(--accent-signal)] font-semibold">DUAL PROPULSION</span>
                </div>

                {/* 3D WebGL Hybrid VTOL Viewport */}
                <div className="relative w-full h-64 rounded-xl bg-[var(--bg-primary)] border border-[var(--divider)] overflow-hidden shadow-xs">
                  <div className="absolute inset-0 blueprint-grid opacity-40 pointer-events-none" />
                  <Drone3DViewer type="hybrid-vtol" />
                </div>

                {/* Transition Flow Banner */}
                <div className="mt-3 p-2.5 rounded-xl bg-[var(--accent-signal-subtle)] border border-[#BFDBFE] flex items-center justify-between text-xs font-mono text-[var(--accent-signal-deep)]">
                  <span>1. VERTICAL TAKEOFF</span>
                  <span>➜</span>
                  <span>2. WING TRANSITION</span>
                  <span>➜</span>
                  <span>3. CRUISE</span>
                </div>

              </div>
            </div>

            {/* Right: Text & Bridging Philosophy */}
            <div className="lg:col-span-7 flex flex-col justify-center order-1 lg:order-2">
              <SectionHeading
                eyebrow="best of both worlds"
                title={moduleInfo.hybrid_vtol.title}
                subtitle={moduleInfo.hybrid_vtol.description}
              />

              <div className="space-y-4 font-body text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
                <p>
                  Hybrid VTOL (Vertical Takeoff and Landing) drones bridge the gap between multirotor precision and fixed-wing endurance. They take off vertically using multiple dedicated lift rotors without requiring runways or launch catapults.
                </p>
                <p>
                  Once airborne and reaching safe altitude, the flight controller transitions propulsion to a horizontal forward motor (or tilts the rotors), transferring total aerodynamic lift generation to the fixed wings while shutting down the VTOL motors to conserve battery.
                </p>
              </div>

              {/* Transition Pairing Diagram Box */}
              <div className="mt-6 p-4 rounded-xl bg-[var(--bg-elevated)] border border-[var(--divider)]">
                <div className="font-mono text-xs font-bold uppercase text-[var(--text-primary)] mb-2 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-[var(--accent-signal)]" />
                  <span>Dual Operational Mode Architecture</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-body text-[var(--text-muted)]">
                  <div className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded bg-[var(--bg-primary)] border border-[var(--divider)] flex items-center justify-center font-mono font-bold text-[var(--accent-signal)] shrink-0">1</span>
                    <span><strong>Multirotor Phase:</strong> Zero-footprint vertical launch and pinpoint landing in rugged or constrained terrain.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded bg-[var(--bg-primary)] border border-[var(--divider)] flex items-center justify-center font-mono font-bold text-[var(--accent-signal)] shrink-0">2</span>
                    <span><strong>Fixed-Wing Phase:</strong> High-speed forward aerodynamic cruise across tens of linear kilometers.</span>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* ================= 7. LAYOUT SUMMARY STRIP ================= */}
        <section className="mb-16 p-6 rounded-2xl bg-[var(--bg-elevated)] border border-[var(--divider)]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 pb-4 border-b border-[var(--divider)]">
            <div>
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[var(--accent-signal)] block">
                MODULE 2 KNOWLEDGE RECAP
              </span>
              <h3 className="font-display text-lg font-bold text-[var(--text-primary)]">
                5 Primary Drone Airframe Architectures Covered
              </h3>
            </div>
            <span className="font-mono text-xs text-[var(--text-muted)]">Click any pill to scroll to section</span>
          </div>

          {/* 5 Recap Pills as Anchor Links */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {[
              { label: "Quadcopter", sub: "4 Rotors · General", anchor: "section-multirotor" },
              { label: "Hexacopter", sub: "6 Rotors · Redundancy", anchor: "section-multirotor" },
              { label: "Octocopter", sub: "8 Rotors · Heavy-Lift", anchor: "section-multirotor" },
              { label: "Fixed-Wing", sub: "Airfoil · Long-Range", anchor: "section-fixed-wing" },
              { label: "Hybrid VTOL", sub: "Vertical + Cruise", anchor: "section-hybrid-vtol" }
            ].map((item, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => scrollToAnchor(item.anchor)}
                className="p-3 rounded-xl bg-[var(--bg-primary)] border border-[var(--divider)] hover:border-[var(--accent-signal)] hover:shadow-sm text-left transition-all group focus-visible:ring-2 focus-visible:ring-[var(--border-focus)]"
              >
                <span className="font-display font-bold text-xs text-[var(--text-primary)] group-hover:text-[var(--accent-signal)] transition-colors block">
                  {item.label}
                </span>
                <span className="font-mono text-[10px] text-[var(--text-muted)] block mt-0.5">
                  {item.sub}
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* ================= 8. MODULE FOOTER NAVIGATION ================= */}
        <footer className="pt-8 border-t border-[var(--divider)] flex flex-col sm:flex-row items-center justify-between gap-4">
          
          <button
            type="button"
            onClick={onNavigatePrev}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full text-sm font-semibold font-body text-[var(--text-secondary)] bg-[var(--bg-primary)] hover:bg-[var(--bg-elevated)] border border-[var(--divider)] transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous: Module 1</span>
          </button>

          {/* Action Button: Single prominent button to Mark Complete & Take Assessment */}
          <button
            type="button"
            onClick={isCompleted ? onNavigateAssessment : handleMarkCompleteAndNavigateAssessment}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full text-sm font-bold font-display text-white bg-[var(--accent-signal)] hover:bg-[var(--accent-signal-deep)] shadow-brand transition-all cursor-pointer"
          >
            {isCompleted ? (
              <>
                <Award className="w-4 h-4 text-white" />
                <span>Take Module Assessment (10 Qs)</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </>
            ) : (
              <>
                <CheckCircle className="w-4 h-4 text-white" />
                <span>Mark as Complete & Take Assessment</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </>
            )}
          </button>

        </footer>

      </div>
    </article>
  );
}
