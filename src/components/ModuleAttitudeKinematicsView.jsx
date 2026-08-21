import React, { useState, useRef } from 'react';
import { 
  ChevronRight, 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle, 
  Check, 
  RotateCw, 
  MoveHorizontal, 
  MoveVertical, 
  Compass, 
  Sliders, 
  Activity, 
  Info, 
  Sparkles,
  Layers,
  ShieldCheck,
  Zap,
  Video,
  Tv,
  Award,
  Lock
} from 'lucide-react';
import SectionHeading from './SectionHeading';
import RollPitchYawSimulator from './RollPitchYawSimulator';
import { modulesData } from '../data/curriculumData';

export default function ModuleAttitudeKinematicsView({ onNavigateHome, onNavigatePrev, onNavigateNext, onNavigateAssessment }) {
  const moduleInfo = modulesData["mod-attitude-kinematics"];
  const axes = moduleInfo.axes;
  const videoRef = useRef(null);

  // Completion State Persistence
  const [isCompleted, setIsCompleted] = useState(() => {
    try {
      return localStorage.getItem('asteria_module_mod-attitude-kinematics') === 'completed' ||
             localStorage.getItem('learning_mod-attitude-kinematics') === 'completed';
    } catch {
      return false;
    }
  });

  const handleMarkCompleteAndNavigateAssessment = () => {
    try {
      localStorage.setItem('asteria_module_mod-attitude-kinematics', 'completed');
      localStorage.setItem('learning_mod-attitude-kinematics', 'completed');
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
    { id: "section-attitude-intro", label: "Overview & 3 Axes", icon: Compass },
    { id: "section-roll", label: "Roll (X-Axis)", icon: MoveHorizontal },
    { id: "section-pitch", label: "Pitch (Y-Axis)", icon: MoveVertical },
    { id: "section-yaw", label: "Yaw (Z-Axis)", icon: RotateCw },
    { id: "section-simulator", label: "3D Attitude Simulator", icon: Sliders }
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
            Track 3: Navigate
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-[var(--divider)]" />
          <span className="text-[var(--text-primary)] font-semibold">Module 7: Attitude & Axis Movement</span>
        </nav>

        {/* Module Header Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-6 mb-6 border-b border-[var(--divider)] gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-3 rounded-full bg-[var(--accent-signal-subtle)] border border-[#BFDBFE]">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-signal)]" />
              <span className="font-display text-[11px] font-bold tracking-[0.08em] uppercase text-[var(--accent-signal)]">
                MODULE 07 · NAVIGATE TRACK
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
                      VISUAL MASTERCLASS · MODULE 07
                    </span>
                    <span className="text-[var(--divider)]">·</span>
                    <span className="font-mono text-[10px] font-bold text-[#059669] bg-[#ECFDF5] px-2 py-0.5 rounded-full border border-[#A7F3D0]">
                      HD MP4
                    </span>
                  </div>
                  <h2 className="font-display text-xl sm:text-2xl font-bold text-[var(--text-primary)]">
                    UAV Attitude & Axis Movement
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
                <source src="/videos/module7.mp4" type="video/mp4" />
                <source src="/videos/Module 7.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>

          </div>
        </section>


        {/* ================= 2. INTRO & 3-AXIS LABELED SCHEMATIC ================= */}
        <section id="section-attitude-intro" className="mb-20 pt-4 scroll-mt-32">
          
          <div className="mb-8">
            <SectionHeading
              eyebrow="rotational kinematics"
              title="3 Principal Rotational Flight Axes"
              subtitle="How differential motor thrust and reactive torque control roll, pitch, and yaw movements."
            />

            <p className="font-body text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed max-w-4xl mt-3">
              "{moduleInfo.intro}"
            </p>
          </div>

          {/* Static Labeled 3-Axis Schematic Diagram */}
          <div className="p-6 sm:p-8 rounded-2xl bg-[var(--bg-elevated)] border border-[var(--divider)] shadow-xs">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-[var(--divider)] gap-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[var(--accent-signal)]" />
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--text-primary)]">
                  UAV ROLL, PITCH, AND YAW 3-AXIS REFERENCE SCHEMATIC
                </span>
              </div>
              <span className="font-mono text-xs text-[var(--text-muted)]">
                Standard Body Frame Coordinates
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Column: 2D Vector Axis Schematic */}
              <div className="lg:col-span-6 flex items-center justify-center">
                <div className="relative w-full max-w-md aspect-[4/3] rounded-xl bg-[var(--bg-primary)] border border-[var(--divider)] p-4 flex items-center justify-center shadow-2xs overflow-hidden">
                  <div className="absolute inset-0 blueprint-grid opacity-25 pointer-events-none" />

                  <svg 
                    className="w-full h-full" 
                    viewBox="0 0 400 300"
                    role="img"
                    aria-label="UAV roll, pitch, and yaw axes reference schematic"
                  >
                    {/* Drone Silhouette Silhouette (Quadcopter Frame) */}
                    <g transform="translate(200, 150)">
                      
                      {/* Arms */}
                      <line x1="-80" y1="-80" x2="80" y2="80" stroke="#94A3B8" strokeWidth="4" strokeLinecap="round" />
                      <line x1="-80" y1="80" x2="80" y2="-80" stroke="#94A3B8" strokeWidth="4" strokeLinecap="round" />

                      {/* 4 Rotors with exact motor numbers and rotation labels */}
                      {/* M4: Top-Left (Front-Left) -> CW */}
                      <circle cx="-80" cy="-80" r="28" fill="#EEF2F6" stroke="#2056A3" strokeWidth="1.5" strokeDasharray="3 3" />
                      <circle cx="-80" cy="-80" r="6" fill="#2056A3" />
                      <text x="-80" y="-115" textAnchor="middle" className="font-mono text-[9px] font-bold fill-[#2056A3]">M4 (CW)</text>

                      {/* M1: Top-Right (Front-Right) -> CCW */}
                      <circle cx="80" cy="-80" r="28" fill="#ECFDF5" stroke="#059669" strokeWidth="1.5" strokeDasharray="3 3" />
                      <circle cx="80" cy="-80" r="6" fill="#059669" />
                      <text x="80" y="-115" textAnchor="middle" className="font-mono text-[9px] font-bold fill-[#059669]">M1 (CCW)</text>

                      {/* M3: Bottom-Right (Back-Right) -> CW */}
                      <circle cx="80" cy="80" r="28" fill="#EEF2F6" stroke="#2056A3" strokeWidth="1.5" strokeDasharray="3 3" />
                      <circle cx="80" cy="80" r="6" fill="#2056A3" />
                      <text x="80" y="120" textAnchor="middle" className="font-mono text-[9px] font-bold fill-[#2056A3]">M3 (CW)</text>

                      {/* M2: Bottom-Left (Back-Left) -> CCW */}
                      <circle cx="-80" cy="80" r="28" fill="#ECFDF5" stroke="#059669" strokeWidth="1.5" strokeDasharray="3 3" />
                      <circle cx="-80" cy="80" r="6" fill="#059669" />
                      <text x="-80" y="120" textAnchor="middle" className="font-mono text-[9px] font-bold fill-[#059669]">M2 (CCW)</text>

                      {/* Body Fuselage */}
                      <rect x="-30" y="-35" width="60" height="70" rx="12" fill="#2056A3" stroke="#00439B" strokeWidth="2" />
                      {/* Nose Cone Red */}
                      <polygon points="0,-48 -12,-35 12,-35" fill="#EF4444" />

                      {/* Longitudinal (Roll) X-Axis Arrow */}
                      <line x1="0" y1="95" x2="0" y2="-100" stroke="#EF4444" strokeWidth="2" strokeDasharray="4 2" />
                      <polygon points="0,-105 -5,-95 5,-95" fill="#EF4444" />
                      <text x="10" y="-85" className="font-mono text-[10px] font-bold fill-[#EF4444]">Roll Axis (X)</text>

                      {/* Lateral (Pitch) Y-Axis Arrow */}
                      <line x1="-120" y1="0" x2="120" y2="0" stroke="#10B981" strokeWidth="2" strokeDasharray="4 2" />
                      <polygon points="125,0 115,-5 115,5" fill="#10B981" />
                      <text x="70" y="-10" className="font-mono text-[10px] font-bold fill-[#10B981]">Pitch Axis (Y)</text>

                      {/* Vertical (Yaw) Z-Axis Arc */}
                      <circle cx="0" cy="0" r="18" fill="none" stroke="#2056A3" strokeWidth="2.5" />
                      <circle cx="0" cy="0" r="4" fill="#2056A3" />
                      <text x="25" y="25" className="font-mono text-[10px] font-bold fill-[var(--accent-signal)]">Yaw Axis (Z)</text>
                    </g>
                  </svg>
                </div>
              </div>

              {/* Right Column: 3 Axes Summary Cards */}
              <div className="lg:col-span-6 space-y-3 font-mono text-xs">
                
                {/* Roll Axis Summary */}
                <div className="p-3.5 rounded-xl bg-[var(--bg-primary)] border border-[var(--divider)]">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-display font-bold text-sm text-[var(--text-primary)]">
                      1. Longitudinal Axis (Roll)
                    </span>
                    <span className="font-bold text-[#EF4444] bg-[#FEF2F2] px-2 py-0.5 rounded border border-[#FECACA]">
                      X-Axis
                    </span>
                  </div>
                  <p className="font-body text-xs text-[var(--text-secondary)]">
                    Front-to-back axis running along the fuselage centerline. Tilts the drone left or right for lateral translation.
                  </p>
                </div>

                {/* Pitch Axis Summary */}
                <div className="p-3.5 rounded-xl bg-[var(--bg-primary)] border border-[var(--divider)]">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-display font-bold text-sm text-[var(--text-primary)]">
                      2. Lateral Axis (Pitch)
                    </span>
                    <span className="font-bold text-[#10B981] bg-[#ECFDF5] px-2 py-0.5 rounded border border-[#A7F3D0]">
                      Y-Axis
                    </span>
                  </div>
                  <p className="font-body text-xs text-[var(--text-secondary)]">
                    Side-to-side axis perpendicular to the forward heading. Tilts the nose up or down for forward/backward flight.
                  </p>
                </div>

                {/* Yaw Axis Summary */}
                <div className="p-3.5 rounded-xl bg-[var(--bg-primary)] border border-[var(--divider)]">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-display font-bold text-sm text-[var(--text-primary)]">
                      3. Vertical Axis (Yaw)
                    </span>
                    <span className="font-bold text-[var(--accent-signal)] bg-[var(--accent-signal-subtle)] px-2 py-0.5 rounded border border-[#BFDBFE]">
                      Z-Axis
                    </span>
                  </div>
                  <p className="font-body text-xs text-[var(--text-secondary)]">
                    Top-to-bottom axis passing through the drone's center of gravity. Rotates the heading direction left or right.
                  </p>
                </div>

              </div>

            </div>

          </div>

        </section>


        {/* ================= 3. THREE CONCEPT SECTIONS (ROLL / PITCH / YAW) ================= */}
        <section className="mb-20 space-y-12">
          
          {/* Section 1: Roll */}
          <div id="section-roll" className="p-6 sm:p-8 rounded-2xl bg-[var(--bg-primary)] border border-[var(--divider)] shadow-xs scroll-mt-32">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-[var(--divider)] gap-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[var(--accent-signal-subtle)] border border-[#BFDBFE] flex items-center justify-center text-[var(--accent-signal)] shadow-2xs">
                  <MoveHorizontal className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold text-[var(--text-primary)]">
                    {axes[0].name} Movement
                  </h3>
                  <span className="font-mono text-xs text-[var(--accent-signal)] font-semibold">
                    {axes[0].axis} · {axes[0].tiltDirection}
                  </span>
                </div>
              </div>
              <span className="font-mono text-xs text-[var(--text-muted)] bg-[var(--bg-elevated)] px-3 py-1 rounded-full border border-[var(--divider)] self-start sm:self-auto">
                Kinematic Axis 01
              </span>
            </div>

            {/* Part 1: Definition Paragraph */}
            <div className="mb-6">
              <p className="font-body text-sm sm:text-base text-[var(--text-primary)] leading-relaxed bg-[var(--bg-elevated)] p-4 rounded-xl border border-[var(--divider)]">
                "{axes[0].definition}"
              </p>
            </div>

            {/* Part 2: Working Connected-Step List */}
            <div>
              <div className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] mb-4">
                Working & Control Mechanism (Sequential Cause-and-Effect):
              </div>

              <div className="space-y-3">
                {axes[0].workingSteps.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[var(--accent-signal)] text-white flex items-center justify-center font-mono text-xs font-bold shrink-0 mt-0.5">
                      {idx + 1}
                    </div>
                    <div className="p-3 rounded-xl bg-[var(--bg-elevated)] border border-[var(--divider)] font-body text-xs sm:text-sm text-[var(--text-secondary)] flex-1 leading-relaxed">
                      "{step}"
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Section 2: Pitch */}
          <div id="section-pitch" className="p-6 sm:p-8 rounded-2xl bg-[var(--bg-primary)] border border-[var(--divider)] shadow-xs scroll-mt-32">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-[var(--divider)] gap-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[var(--accent-signal-subtle)] border border-[#BFDBFE] flex items-center justify-center text-[var(--accent-signal)] shadow-2xs">
                  <MoveVertical className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold text-[var(--text-primary)]">
                    {axes[1].name} Movement
                  </h3>
                  <span className="font-mono text-xs text-[var(--accent-signal)] font-semibold">
                    {axes[1].axis} · {axes[1].tiltDirection}
                  </span>
                </div>
              </div>
              <span className="font-mono text-xs text-[var(--text-muted)] bg-[var(--bg-elevated)] px-3 py-1 rounded-full border border-[var(--divider)] self-start sm:self-auto">
                Kinematic Axis 02
              </span>
            </div>

            {/* Part 1: Definition Paragraph */}
            <div className="mb-6">
              <p className="font-body text-sm sm:text-base text-[var(--text-primary)] leading-relaxed bg-[var(--bg-elevated)] p-4 rounded-xl border border-[var(--divider)]">
                "{axes[1].definition}"
              </p>
            </div>

            {/* Part 2: Working Connected-Step List */}
            <div>
              <div className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] mb-4">
                Working & Control Mechanism (Sequential Cause-and-Effect):
              </div>

              <div className="space-y-3">
                {axes[1].workingSteps.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[var(--accent-signal)] text-white flex items-center justify-center font-mono text-xs font-bold shrink-0 mt-0.5">
                      {idx + 1}
                    </div>
                    <div className="p-3 rounded-xl bg-[var(--bg-elevated)] border border-[var(--divider)] font-body text-xs sm:text-sm text-[var(--text-secondary)] flex-1 leading-relaxed">
                      "{step}"
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Section 3: Yaw */}
          <div id="section-yaw" className="p-6 sm:p-8 rounded-2xl bg-[var(--bg-primary)] border border-[var(--divider)] shadow-xs scroll-mt-32">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-[var(--divider)] gap-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[var(--accent-signal-subtle)] border border-[#BFDBFE] flex items-center justify-center text-[var(--accent-signal)] shadow-2xs">
                  <RotateCw className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold text-[var(--text-primary)]">
                    {axes[2].name} Movement
                  </h3>
                  <span className="font-mono text-xs text-[var(--accent-signal)] font-semibold">
                    {axes[2].axis} · {axes[2].tiltDirection}
                  </span>
                </div>
              </div>
              <span className="font-mono text-xs text-[var(--text-muted)] bg-[var(--bg-elevated)] px-3 py-1 rounded-full border border-[var(--divider)] self-start sm:self-auto">
                Kinematic Axis 03
              </span>
            </div>

            {/* Part 1: Definition Paragraph */}
            <div className="mb-6">
              <p className="font-body text-sm sm:text-base text-[var(--text-primary)] leading-relaxed bg-[var(--bg-elevated)] p-4 rounded-xl border border-[var(--divider)]">
                "{axes[2].definition}"
              </p>
            </div>

            {/* Part 2: Working Connected-Step List */}
            <div>
              <div className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] mb-4">
                Working & Control Mechanism (Sequential Cause-and-Effect):
              </div>

              <div className="space-y-3">
                {axes[2].workingSteps.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[var(--accent-signal)] text-white flex items-center justify-center font-mono text-xs font-bold shrink-0 mt-0.5">
                      {idx + 1}
                    </div>
                    <div className="p-3 rounded-xl bg-[var(--bg-elevated)] border border-[var(--divider)] font-body text-xs sm:text-sm text-[var(--text-secondary)] flex-1 leading-relaxed">
                      "{step}"
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </section>


        {/* ================= 4. 3D ROLL/PITCH/YAW SIMULATOR (TIER 1 INTERACTIVE) ================= */}
        <section id="section-simulator" className="mb-20 pt-12 border-t border-[var(--divider)] scroll-mt-32">
          
          <div className="mb-8">
            <SectionHeading
              eyebrow="tier 1 signature 3d interactive simulator"
              title="Roll / Pitch / Yaw 3D Attitude Simulator"
              subtitle="Adjust individual motor throttle sliders to observe differential thrust and counter-rotating torque mechanics in real time."
            />
          </div>

          {/* Embedded Tier 1 3D Attitude Simulator */}
          <RollPitchYawSimulator />

        </section>

        {/* ================= 5. MODULE FOOTER NAVIGATION ================= */}
        <footer className="pt-8 border-t border-[var(--divider)] flex flex-col sm:flex-row items-center justify-between gap-4">
          
          <button
            type="button"
            onClick={onNavigatePrev}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full text-sm font-semibold font-body text-[var(--text-secondary)] bg-[var(--bg-primary)] hover:bg-[var(--bg-elevated)] border border-[var(--divider)] transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous: Module 6</span>
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
