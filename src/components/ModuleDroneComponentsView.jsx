import React, { useState, useRef } from 'react';
import { 
  ChevronRight, 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle, 
  Check, 
  Cpu, 
  Battery as BatteryIcon, 
  Zap, 
  RotateCw, 
  Layers, 
  ShieldCheck, 
  Radio, 
  Compass, 
  Activity, 
  Anchor, 
  Scale, 
  Navigation, 
  Plane,
  Sparkles,
  Info,
  Globe,
  Satellite,
  MapPin,
  Video,
  Tv,
  Award,
  Lock,
  Sliders,
  Disc,
  BatteryCharging
} from 'lucide-react';
import SectionHeading from './SectionHeading';
import PropellerSpinPreview from './PropellerSpinPreview';
import ESCSelector from './ESCSelector';
import BatteryCalculator from './BatteryCalculator';
import ModuleAssessmentCard from './ModuleAssessmentCard';
import { modulesData } from '../data/curriculumData';

export default function ModuleDroneComponentsView({ onNavigateHome, onNavigatePrev, onNavigateNext, onNavigateAssessment }) {
  const moduleInfo = modulesData["mod-drone-components"];
  const components = moduleInfo.components;
  const videoRef = useRef(null);

  // Completion State Persistence
  const [learningCompleted, setLearningCompleted] = useState(() => {
    try {
      return localStorage.getItem('asteria_module_mod-drone-components') === 'completed' ||
             localStorage.getItem('learning_mod-drone-components') === 'completed';
    } catch {
      return false;
    }
  });

  const isAssessmentPassed = (() => {
    try {
      return localStorage.getItem('asteria_module_mod-drone-components') === 'completed';
    } catch {
      return false;
    }
  })();

  const handleMarkLearningComplete = () => {
    setLearningCompleted(true);
    try {
      localStorage.setItem('learning_mod-drone-components', 'completed');
    } catch (e) {
      console.warn(e);
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
    { id: "section-chassis", label: "Chassis & Frame", icon: Layers },
    { id: "section-propulsion", label: "Motors & ESCs", icon: Zap },
    { id: "section-esc-calc", label: "ESC Matcher", icon: Sliders },
    { id: "section-propellers", label: "Propellers", icon: Disc },
    { id: "section-power", label: "Battery Systems", icon: BatteryCharging }
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
            Track 2: Control
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-[var(--divider)]" />
          <span className="text-[var(--text-primary)] font-semibold">Module 3: Drone Components</span>
        </nav>

        {/* Module Header Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-6 mb-6 border-b border-[var(--divider)] gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-3 rounded-full bg-[var(--accent-signal-subtle)] border border-[#BFDBFE]">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-signal)]" />
              <span className="font-display text-[11px] font-bold tracking-[0.08em] uppercase text-[var(--accent-signal)]">
                MODULE 03 · CONTROL TRACK
              </span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[var(--text-primary)]">
              {moduleInfo.title}
            </h1>
            <div className="flex items-center gap-3 mt-2.5 font-mono text-xs text-[var(--text-muted)]">
              <span>Source Ref: {moduleInfo.source_section}</span>
              <span>·</span>
              <span>Est. Time: 25 mins</span>
              <span>·</span>
              <span className="text-[var(--accent-signal)] font-semibold">Includes Video Lecture</span>
            </div>
          </div>

          {/* Assessment & Learning Status Badge */}
          {isAssessmentPassed ? (
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold font-body bg-[#ECFDF5] text-[#047857] border border-[#A7F3D0] shadow-xs">
              <Check className="w-4 h-4 text-[#047857]" />
              <span>Module 3 Completed ✓</span>
            </div>
          ) : (
            <button
              type="button"
              onClick={onNavigateAssessment}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold font-body bg-[#E0F2FE] text-[#0369A1] border border-[#BAE6FD] hover:bg-[#0284C7] hover:text-white transition-all shadow-xs"
            >
              <Award className="w-3.5 h-3.5" />
              <span>Take Knowledge Assessment (10 Qs)</span>
            </button>
          )}
        </div>

        {/* Top Pinned Anchor-Link Mini-Nav */}
        <div className="sticky top-16 z-30 mb-12 p-2 rounded-2xl bg-[var(--bg-elevated)]/95 backdrop-blur-md border border-[var(--divider)] shadow-xs">
          <div className="flex items-center gap-1.5 overflow-x-auto py-1 px-1">
            <span className="font-mono text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider px-2 shrink-0">
              Jump To:
            </span>
            {navItems.map((item, idx) => {
              const Icon = item.icon;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => scrollToAnchor(item.id)}
                  className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-xl bg-[var(--bg-primary)] border border-[var(--divider)] hover:border-[var(--accent-signal)] hover:text-[var(--accent-signal)] font-mono text-xs font-semibold text-[var(--text-secondary)] whitespace-nowrap transition-all shadow-2xs focus-visible:ring-2 focus-visible:ring-[var(--border-focus)]"
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
                      VISUAL MASTERCLASS · MODULE 03
                    </span>
                    <span className="text-[var(--divider)]">·</span>
                    <span className="font-mono text-[10px] font-bold text-[#059669] bg-[#ECFDF5] px-2 py-0.5 rounded-full border border-[#A7F3D0]">
                      HD MP4
                    </span>
                  </div>
                  <h2 className="font-display text-xl sm:text-2xl font-bold text-[var(--text-primary)]">
                    Drone Components & Propulsion Systems
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
                <source src="/videos/module3.mp4" type="video/mp4" />
                <source src="/videos/Module 3.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>

          </div>
        </section>


        {/* ================= SECTION 1: AIRFRAME (VISUAL LEFT, TEXT RIGHT) ================= */}
        <section id="section-airframe" className="mb-20 pt-4 scroll-mt-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left: Airframe Technical Visual */}
            <div className="lg:col-span-5 w-full">
              <div className="relative rounded-2xl bg-[var(--bg-elevated)] border border-[var(--divider)] p-5 overflow-hidden shadow-xs">
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-[var(--divider)] font-mono text-[11px] text-[var(--text-muted)]">
                  <div className="flex items-center gap-2">
                    <Layers className="w-4 h-4 text-[var(--accent-signal)]" />
                    <span className="font-semibold text-[var(--text-secondary)]">STRUCTURAL AIRFRAME CHASSIS</span>
                  </div>
                  <span className="text-[var(--accent-signal)] font-semibold">COMPONENT 01</span>
                </div>

                <div 
                  className="relative h-60 rounded-xl bg-[var(--bg-primary)] border border-[var(--divider)] flex flex-col items-center justify-center p-4 overflow-hidden"
                  role="img"
                  aria-label="Airframe structural schematic showing central hub, carbon arms, landing gear, and mounting points"
                >
                  <div className="absolute inset-0 blueprint-grid opacity-30 pointer-events-none" />

                  {/* Airframe Structural Vector */}
                  <div className="relative z-10 w-48 h-48 flex items-center justify-center">
                    {/* Carbon Fiber Arms */}
                    <div className="absolute w-44 h-2 bg-[#1E293B] rotate-45 rounded-full" />
                    <div className="absolute w-44 h-2 bg-[#1E293B] -rotate-45 rounded-full" />

                    {/* Motor Mounting Points */}
                    <div className="absolute top-2 left-2 w-6 h-6 rounded-full border-2 border-[var(--accent-signal)] bg-white flex items-center justify-center font-mono text-[8px] font-bold text-[var(--accent-signal)]">M1</div>
                    <div className="absolute top-2 right-2 w-6 h-6 rounded-full border-2 border-[var(--accent-signal)] bg-white flex items-center justify-center font-mono text-[8px] font-bold text-[var(--accent-signal)]">M2</div>
                    <div className="absolute bottom-2 right-2 w-6 h-6 rounded-full border-2 border-[var(--accent-signal)] bg-white flex items-center justify-center font-mono text-[8px] font-bold text-[var(--accent-signal)]">M3</div>
                    <div className="absolute bottom-2 left-2 w-6 h-6 rounded-full border-2 border-[var(--accent-signal)] bg-white flex items-center justify-center font-mono text-[8px] font-bold text-[var(--accent-signal)]">M4</div>

                    {/* Center Fuselage Top Plate */}
                    <div className="relative w-16 h-16 rounded-xl bg-[var(--accent-signal)] border-2 border-[var(--accent-signal-deep)] shadow-brand flex flex-col items-center justify-center text-white text-center p-1 font-mono text-[8px] font-bold">
                      <span>CENTER</span>
                      <span>CHASSIS</span>
                    </div>

                    {/* Landing Gear Skids */}
                    <div className="absolute -bottom-1 w-32 h-1 bg-[#475569] rounded-full" />
                  </div>
                </div>

                <div className="mt-3 pt-2.5 border-t border-[var(--divider)] font-mono text-[10px] text-[var(--text-muted)] flex justify-between">
                  <span>Carbon Fiber / Anodized Aluminum</span>
                  <span className="text-[var(--accent-signal)] font-semibold">TORSIONAL RIGIDITY</span>
                </div>
              </div>
            </div>

            {/* Right: Text & Inline Sub-Parts Tags */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              <SectionHeading
                eyebrow="structural chassis"
                title={components.airframe.title}
                subtitle="The primary load-bearing structural framework of the UAV."
              />

              <p className="font-body text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed mb-6">
                {components.airframe.description}
              </p>

              {/* Sub-parts as Small Inline Tags (as specified in prompt) */}
              <div>
                <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)] block mb-2.5">
                  Core Sub-Assembly Elements:
                </span>
                <div className="flex flex-wrap gap-2">
                  {components.airframe.subparts.map((part, idx) => (
                    <span 
                      key={idx}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--bg-elevated)] border border-[var(--divider)] font-mono text-xs font-semibold text-[var(--accent-signal)] shadow-2xs"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-signal)]" />
                      <span>{part}</span>
                    </span>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </section>


        {/* ================= SECTION 2: PROPELLER (TEXT LEFT, VISUAL RIGHT) ================= */}
        <section id="section-propeller" className="mb-20 pt-12 border-t border-[var(--divider)] scroll-mt-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left: Text & CW/CCW Intro */}
            <div className="lg:col-span-6 flex flex-col justify-center">
              <SectionHeading
                eyebrow="thrust generation"
                title={components.propeller.title}
                subtitle="Rotating aerodynamic airfoils converting motor torque into vertical lift."
              />

              <p className="font-body text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed mb-6">
                {components.propeller.description}
              </p>

              {/* Labeled Inline Circular Arrows setup */}
              <div className="p-4 rounded-xl bg-[var(--bg-elevated)] border border-[var(--divider)] flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 font-mono text-xs font-bold text-[var(--accent-signal)]">
                  <div className="w-7 h-7 rounded-full bg-[var(--accent-signal-subtle)] border border-[#BFDBFE] flex items-center justify-center">
                    <RotateCw className="w-4 h-4 text-[var(--accent-signal)]" />
                  </div>
                  <span>↻ CW Rotation</span>
                </div>

                <span className="font-mono text-xs text-[var(--text-muted)]">+</span>

                <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#B45309]">
                  <div className="w-7 h-7 rounded-full bg-[#FFFBEB] border border-[#FDE68A] flex items-center justify-center">
                    <RotateCw className="w-4 h-4 text-[#B45309] -scale-x-100" />
                  </div>
                  <span>↺ CCW Rotation</span>
                </div>

                <span className="font-mono text-xs text-[#047857] font-semibold">= Net Zero Yaw Torque</span>
              </div>
            </div>

            {/* Right: Interactive Propeller Spin Preview Slot */}
            <div className="lg:col-span-6 w-full">
              <PropellerSpinPreview />
            </div>

          </div>
        </section>


        {/* ================= SECTION 3: BRUSHLESS MOTOR (VISUAL LEFT, TEXT RIGHT) ================= */}
        <section id="section-motor" className="mb-20 pt-12 border-t border-[var(--divider)] scroll-mt-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left: Brushless Motor Cutaway Graphic */}
            <div className="lg:col-span-5 w-full">
              <div className="relative rounded-2xl bg-[var(--bg-elevated)] border border-[var(--divider)] p-5 overflow-hidden shadow-xs">
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-[var(--divider)] font-mono text-[11px] text-[var(--text-muted)]">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-[var(--accent-signal)]" />
                    <span className="font-semibold text-[var(--text-secondary)]">BLDC OUTRUNNER MOTOR</span>
                  </div>
                  <span className="text-[var(--accent-signal)] font-semibold">COMPONENT 03</span>
                </div>

                <div 
                  className="relative h-60 rounded-xl bg-[var(--bg-primary)] border border-[var(--divider)] flex flex-col items-center justify-center p-4 overflow-hidden"
                  role="img"
                  aria-label="Brushless DC motor schematic showing permanent magnet rotor bell, stator coils, shaft, and 3-phase silicone leads"
                >
                  <div className="absolute inset-0 blueprint-grid opacity-30 pointer-events-none" />

                  {/* BLDC Motor Cutaway Vector */}
                  <div className="relative z-10 flex flex-col items-center">
                    {/* Hardened Steel Shaft */}
                    <div className="w-2.5 h-6 bg-[#94A3B8] rounded-t-sm" />
                    {/* Rotor Bell (Outer) */}
                    <div className="w-28 h-20 rounded-xl bg-[var(--accent-signal)] border-2 border-[var(--accent-signal-deep)] shadow-brand flex items-center justify-center relative overflow-hidden">
                      {/* Permanent Neodymium Magnets */}
                      <div className="absolute inset-x-1.5 top-1 flex justify-between">
                        <div className="w-3 h-2 bg-[#F59E0B] rounded-xs" />
                        <div className="w-3 h-2 bg-[#F59E0B] rounded-xs" />
                        <div className="w-3 h-2 bg-[#F59E0B] rounded-xs" />
                      </div>
                      {/* Copper Stator Windings (12N14P) */}
                      <div className="w-18 h-12 rounded-lg bg-[#D97706] border border-[#B45309] flex items-center justify-center text-white font-mono text-[8px] font-bold">
                        12-POLE STATOR
                      </div>
                    </div>
                    {/* Motor Base & 3-Phase Wire Leads */}
                    <div className="w-20 h-4 bg-[#1E293B] rounded-b-md" />
                    <div className="flex gap-2 mt-1">
                      <div className="w-1 h-5 bg-[#EF4444] rounded-full" />
                      <div className="w-1 h-5 bg-[#3B82F6] rounded-full" />
                      <div className="w-1 h-5 bg-[#10B981] rounded-full" />
                    </div>
                  </div>
                </div>

                <div className="mt-3 pt-2.5 border-t border-[var(--divider)] font-mono text-[10px] text-[var(--text-muted)] flex justify-between">
                  <span>KV Rating: RPM / Volt</span>
                  <span className="text-[var(--accent-signal)] font-semibold">3-PHASE AC DRIVE</span>
                </div>
              </div>
            </div>

            {/* Right: Text & 4 Feature Pills */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              <SectionHeading
                eyebrow="electromechanical propulsion"
                title={components.motor.title}
                subtitle="High-efficiency brushless DC motors delivering independent rotational torque."
              />

              <p className="font-body text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed mb-6">
                {components.motor.description}
              </p>

              {/* 4 Feature Pills (as specified in prompt) */}
              <div>
                <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)] block mb-2.5">
                  Key Motor Advantages:
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {components.motor.features.map((feat, idx) => (
                    <div 
                      key={idx}
                      className="p-2.5 rounded-xl bg-[var(--bg-elevated)] border border-[var(--divider)] text-center shadow-2xs"
                    >
                      <span className="font-display font-bold text-xs text-[var(--accent-signal)] block">
                        {feat}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </section>


        {/* ================= SECTION 4: ESC (ELECTRONIC SPEED CONTROLLER) ================= */}
        <section id="section-esc" className="mb-20 pt-12 border-t border-[var(--divider)] scroll-mt-32">
          <div className="mb-8">
            <SectionHeading
              eyebrow="motor commutation & speed regulation"
              title={components.esc.title}
              subtitle="Converts flight controller pulse signals into high-frequency 3-phase motor power."
            />

            <p className="font-body text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed max-w-4xl">
              {components.esc.description}
            </p>
          </div>

          {/* Embedded Reusable ESC Selector Tool */}
          <ESCSelector />
        </section>


        {/* ================= SECTION 5: FLIGHT CONTROLLER (VISUAL LEFT, TEXT RIGHT) ================= */}
        <section id="section-flight-controller" className="mb-20 pt-12 border-t border-[var(--divider)] scroll-mt-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left: Flight Controller Architecture Graphic */}
            <div className="lg:col-span-5 w-full">
              <div className="relative rounded-2xl bg-[var(--bg-elevated)] border border-[var(--divider)] p-5 overflow-hidden shadow-xs">
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-[var(--divider)] font-mono text-[11px] text-[var(--text-muted)]">
                  <div className="flex items-center gap-2">
                    <Radio className="w-4 h-4 text-[var(--accent-signal)]" />
                    <span className="font-semibold text-[var(--text-secondary)]">AUTOPILOT AVIONICS BOARD</span>
                  </div>
                  <span className="text-[var(--accent-signal)] font-semibold">COMPONENT 05</span>
                </div>

                <div 
                  className="relative h-64 rounded-xl bg-[var(--bg-primary)] border border-[var(--divider)] flex flex-col items-center justify-center p-4 overflow-hidden"
                  role="img"
                  aria-label="Flight controller architecture layout showing 32-bit MCU processor, IMU gyroscope, barometer, and PWM outputs"
                >
                  <div className="absolute inset-0 blueprint-grid opacity-30 pointer-events-none" />

                  {/* Flight Controller PCB Board Graphic */}
                  <div className="relative z-10 w-44 h-44 rounded-2xl bg-[#0F172A] border-2 border-[var(--accent-signal)] p-3 shadow-md flex flex-col justify-between">
                    {/* Top Sensor Row: Gyro & Baro */}
                    <div className="flex justify-between items-center">
                      <div className="px-1.5 py-0.5 rounded bg-[var(--accent-signal-subtle)] border border-[#BFDBFE] font-mono text-[7px] font-bold text-[var(--accent-signal-deep)]">
                        IMU / GYRO
                      </div>
                      <div className="px-1.5 py-0.5 rounded bg-[#FEF3C7] border border-[#FDE68A] font-mono text-[7px] font-bold text-[#B45309]">
                        BARO
                      </div>
                    </div>

                    {/* Central 32-bit Cortex MCU Processor */}
                    <div className="my-auto mx-auto w-20 h-20 rounded-xl bg-[var(--accent-signal)] border-2 border-white shadow-brand flex flex-col items-center justify-center text-white text-center font-mono p-1">
                      <Cpu className="w-4 h-4 mb-0.5" />
                      <span className="text-[7.5px] font-bold leading-tight">32-BIT MCU</span>
                      <span className="text-[6.5px] opacity-80">PID LOOPS</span>
                    </div>

                    {/* Bottom ESC / Motor Signal Headers */}
                    <div className="flex justify-between items-center pt-1 border-t border-[#334155]">
                      <div className="flex gap-1">
                        {[1, 2, 3, 4].map((i) => (
                          <div key={i} className="w-2 h-2 rounded-xs bg-[var(--accent-signal)] font-mono text-[6px] text-white flex items-center justify-center font-bold">
                            {i}
                          </div>
                        ))}
                      </div>
                      <span className="font-mono text-[7px] text-[#94A3B8]">PWM / DSHOT</span>
                    </div>
                  </div>
                </div>

                <div className="mt-3 pt-2.5 border-t border-[var(--divider)] font-mono text-[10px] text-[var(--text-muted)] flex justify-between">
                  <span>Loop Rate: 4kHz – 8kHz</span>
                  <span className="text-[var(--accent-signal)] font-semibold">SENSOR FUSION</span>
                </div>
              </div>
            </div>

            {/* Right: Text & 5 Labeled Function Icons/Pills */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              <SectionHeading
                eyebrow="central brain & autopilot"
                title={components.flight_controller.title}
                subtitle="The onboard computational hub maintaining real-time attitude stabilization and sensor fusion."
              />

              <p className="font-body text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed mb-6">
                {components.flight_controller.description}
              </p>

              {/* 5 Small Labeled Icons/Pills in a Row (as specified in prompt) */}
              <div>
                <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)] block mb-3">
                  Core Stabilization & Control Functions:
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
                  {components.flight_controller.functions.map((fn, idx) => (
                    <div 
                      key={idx}
                      className="p-3 rounded-xl bg-[var(--bg-elevated)] border border-[var(--divider)] flex flex-col items-center justify-center text-center shadow-2xs hover:border-[var(--accent-signal)] transition-colors"
                    >
                      <div className="w-6 h-6 rounded-lg bg-[var(--accent-signal-subtle)] border border-[#BFDBFE] flex items-center justify-center text-[var(--accent-signal)] mb-1.5">
                        {idx === 0 && <Scale className="w-3.5 h-3.5" />}
                        {idx === 1 && <Compass className="w-3.5 h-3.5" />}
                        {idx === 2 && <Activity className="w-3.5 h-3.5" />}
                        {idx === 3 && <Navigation className="w-3.5 h-3.5" />}
                        {idx === 4 && <Plane className="w-3.5 h-3.5" />}
                      </div>
                      <span className="font-display font-semibold text-xs text-[var(--text-primary)]">
                        {fn}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </section>


        {/* ================= SECTION 6: GPS & DIGITAL COMPASS (TEXT LEFT, VISUAL RIGHT) ================= */}
        <section id="section-gps" className="mb-20 pt-12 border-t border-[var(--divider)] scroll-mt-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left: Text, Core Functions, and Multi-GNSS Constellations */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              <SectionHeading
                eyebrow="satellite navigation & orientation"
                title={components.gps.title}
                subtitle="Multi-constellation GNSS positioning paired with digital magnetometer heading alignment."
              />

              <p className="font-body text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed mb-6">
                {components.gps.description}
              </p>

              {/* 4 Core Navigation Functions */}
              <div className="mb-6">
                <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)] block mb-2.5">
                  Core Navigation Capabilities:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {components.gps.functions.map((fn, idx) => (
                    <div 
                      key={idx}
                      className="p-2.5 rounded-xl bg-[var(--bg-elevated)] border border-[var(--divider)] flex items-center gap-2 shadow-2xs"
                    >
                      <MapPin className="w-4 h-4 text-[var(--accent-signal)] shrink-0" />
                      <span className="font-body text-xs font-semibold text-[var(--text-primary)]">
                        {fn}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Multi-GNSS Support Strip */}
              <div>
                <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)] block mb-2">
                  Supported Global & Regional Satellite Constellations:
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {components.gps.constellations.map((sat, idx) => (
                    <div key={idx} className="p-2.5 rounded-lg bg-[var(--bg-elevated)] border border-[var(--divider)]">
                      <div className="flex items-center justify-between mb-0.5">
                        <span className="font-mono text-xs font-bold text-[var(--accent-signal)]">{sat.name}</span>
                        <span className="font-mono text-[9px] text-[var(--text-muted)]">{sat.origin}</span>
                      </div>
                      <span className="font-mono text-[10px] text-[var(--text-secondary)] block truncate">
                        {sat.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Right: GPS Module Technical Vector Schematic */}
            <div className="lg:col-span-5 w-full">
              <div className="relative rounded-2xl bg-[var(--bg-elevated)] border border-[var(--divider)] p-5 overflow-hidden shadow-xs">
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-[var(--divider)] font-mono text-[11px] text-[var(--text-muted)]">
                  <div className="flex items-center gap-2">
                    <Satellite className="w-4 h-4 text-[var(--accent-signal)]" />
                    <span className="font-semibold text-[var(--text-secondary)]">MAST-MOUNTED GNSS PUCK</span>
                  </div>
                  <span className="text-[var(--accent-signal)] font-semibold">COMPONENT 06</span>
                </div>

                <div 
                  className="relative h-64 rounded-xl bg-[var(--bg-primary)] border border-[var(--divider)] flex flex-col items-center justify-center p-4 overflow-hidden"
                  role="img"
                  aria-label="GPS and digital compass module schematic showing ceramic patch antenna dome on elevated carbon mast stand"
                >
                  <div className="absolute inset-0 blueprint-grid opacity-30 pointer-events-none" />

                  {/* GPS Puck & Mast Vector */}
                  <div className="relative z-10 flex flex-col items-center">
                    
                    {/* Simulated Satellite Signal Waves */}
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-2 h-2 rounded-full bg-[#10B981] animate-ping" />
                      <span className="font-mono text-[9px] font-bold text-[#047857] bg-[#ECFDF5] px-2 py-0.5 rounded border border-[#A7F3D0]">
                        3D FIX LOCKED · 18 SATS
                      </span>
                    </div>

                    {/* GPS Puck Enclosure */}
                    <div className="w-28 h-12 rounded-full bg-[var(--accent-signal)] border-2 border-[var(--accent-signal-deep)] shadow-brand flex flex-col items-center justify-center text-white font-mono text-[8px] font-bold relative">
                      {/* Top Ceramic Patch Antenna Element */}
                      <div className="absolute -top-1 w-14 h-2 rounded-t-md bg-white border border-[var(--accent-signal-deep)]" />
                      <div className="flex items-center gap-1 mt-1">
                        <Compass className="w-3 h-3 text-[#FEF08A]" />
                        <span>GPS + MAG</span>
                      </div>
                    </div>

                    {/* Elevated Carbon Anti-Interference Mast */}
                    <div className="w-1.5 h-20 bg-[#1E293B] rounded-full shadow-xs" />

                    {/* Frame Mount Base */}
                    <div className="w-12 h-3 bg-[#475569] rounded-md" />
                  </div>

                  <div className="absolute bottom-2 right-2 bg-[var(--bg-elevated)] border border-[var(--divider)] px-2 py-0.5 rounded text-[9px] font-mono text-[var(--text-muted)]">
                    ELEVATED EMI ISOLATION
                  </div>
                </div>

                <div className="mt-3 pt-2.5 border-t border-[var(--divider)] font-mono text-[10px] text-[var(--text-muted)] flex justify-between">
                  <span>Refresh Rate: 10Hz – 25Hz</span>
                  <span className="text-[var(--accent-signal)] font-semibold">UBX / NMEA PROTOCOL</span>
                </div>
              </div>
            </div>

          </div>
        </section>


        {/* ================= SECTION 7: BATTERY & POWER SYSTEMS ================= */}
        <section id="section-battery" className="mb-20 pt-12 border-t border-[var(--divider)] scroll-mt-32">
          
          <div className="mb-8">
            <SectionHeading
              eyebrow="energy storage & discharge chemistry"
              title={components.battery.title}
              subtitle="High-density electrochemical energy sources powering all propulsion and avionics systems."
            />

            <p className="font-body text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed max-w-4xl mb-8">
              {components.battery.description}
            </p>
          </div>

          {/* Sub-Part 1: 3 Battery Chemistry Types Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
            {components.battery.types.map((type, idx) => (
              <div 
                key={idx}
                className="p-5 rounded-2xl bg-[var(--bg-primary)] border border-[var(--divider)] shadow-xs flex flex-col justify-between hover:border-[#CBD5E1] transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-3 pb-2 border-b border-[var(--divider)]">
                    <span className="font-display text-lg font-bold text-[var(--accent-signal)]">
                      {type.name}
                    </span>
                    <span className="font-mono text-xs font-semibold text-[var(--text-muted)] bg-[var(--bg-elevated)] px-2 py-0.5 rounded border border-[var(--divider)]">
                      {type.nominalVoltage}
                    </span>
                  </div>

                  <div className="font-mono text-[11px] font-semibold text-[var(--text-secondary)] mb-2">
                    {type.fullName}
                  </div>

                  <p className="font-body text-xs sm:text-[13px] text-[var(--text-secondary)] leading-relaxed">
                    {type.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Sub-Part 2: Common LiPo Cell Counts (Horizontal JetBrains Mono Spec Strip) */}
          <div className="mb-10 p-5 rounded-2xl bg-[var(--bg-elevated)] border border-[var(--divider)] shadow-xs">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-[var(--divider)]">
              <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[var(--accent-signal)]">
                COMMON LIPO CELL COUNTS & OPERATIONAL APPLICATIONS
              </span>
              <span className="font-mono text-xs text-[var(--text-muted)]">3.7V Nominal / Cell</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 font-mono">
              {components.battery.cell_counts.map((c, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-[var(--bg-primary)] border border-[var(--divider)]">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-bold text-[var(--accent-signal)]">{c.s}</span>
                    <span className="text-xs text-[var(--text-muted)] font-semibold">{c.voltage}</span>
                  </div>
                  <span className="text-[11px] text-[var(--text-secondary)] block font-body leading-tight">
                    {c.use_case}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Sub-Part 3: Interactive Battery Configuration Calculator (Tier 2 Tool) */}
          <BatteryCalculator />

        </section>

        {/* ================= 8. MODULE FOOTER NAVIGATION ================= */}
        <footer className="pt-8 border-t border-[var(--divider)] flex flex-col sm:flex-row items-center justify-between gap-4">
          
          <button
            type="button"
            onClick={onNavigatePrev}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full text-sm font-semibold font-body text-[var(--text-secondary)] bg-[var(--bg-primary)] hover:bg-[var(--bg-elevated)] border border-[var(--divider)] transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous: Module 2</span>
          </button>

          {/* Assessment Action Button */}
          <div className="w-full sm:w-auto flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <button
              type="button"
              onClick={onNavigateAssessment}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-sm font-bold font-display text-white bg-[#0284C7] hover:bg-[#0369A1] shadow-brand transition-all focus-visible:ring-2 focus-visible:ring-[#0284C7]"
            >
              <Award className="w-4 h-4 text-white" />
              <span>{isAssessmentPassed ? 'Retake Module Assessment (10 Qs)' : 'Take Module Assessment (10 Qs)'}</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </button>
            <span className="font-mono text-xs text-[var(--text-muted)]">
              {isAssessmentPassed ? 'Module 3 Completed ✓ · Score Saved' : 'Submit assessment to unlock Module 4'}
            </span>
          </div>

          {/* Next Module Navigation Link */}
          {isAssessmentPassed ? (
            <button
              type="button"
              onClick={onNavigateNext}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-sm font-bold font-display text-white bg-[#059669] hover:bg-[#047857] shadow-brand transition-all focus-visible:ring-2 focus-visible:ring-[#059669]"
            >
              <span>Next: {moduleInfo.next_module_title}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={onNavigateAssessment}
              className="w-full sm:w-auto p-3.5 px-6 rounded-2xl bg-[var(--bg-elevated)] border border-[var(--accent-signal)] hover:bg-[var(--accent-signal-subtle)] text-[var(--accent-signal)] flex items-center justify-center sm:justify-end gap-2 text-xs font-mono font-bold transition-all shadow-xs cursor-pointer"
            >
              <Lock className="w-3.5 h-3.5 shrink-0" />
              <span>Submit Assessment to Unlock <strong>Next: {moduleInfo.next_module_title}</strong> →</span>
            </button>
          )}

        </footer>

      </div>
    </article>
  );
}
