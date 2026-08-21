import React, { useState, useRef } from 'react';
import { 
  ChevronRight, 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle, 
  Check, 
  Anchor, 
  Navigation, 
  ArrowDownCircle, 
  RotateCcw, 
  Gauge, 
  Sliders, 
  Activity, 
  Sparkles, 
  Info, 
  ExternalLink, 
  ShieldCheck, 
  Plane, 
  Compass,
  Video,
  Tv,
  Award,
  Lock
} from 'lucide-react';
import SectionHeading from './SectionHeading';
import FlightModePlayground from './FlightModePlayground';
import ModuleAssessmentCard from './ModuleAssessmentCard';
import { modulesData } from '../data/curriculumData';

export default function ModuleFlightModesView({ onNavigateHome, onNavigatePrev, onNavigateNext, onNavigateGlossary, onNavigateAssessment }) {
  const moduleInfo = modulesData["mod-flight-modes"];
  const modes = moduleInfo.modes;
  const videoRef = useRef(null);

  // Completion State Persistence
  const [isCompleted, setIsCompleted] = useState(() => {
    try {
      return localStorage.getItem('asteria_module_mod-flight-modes') === 'completed' ||
             localStorage.getItem('learning_mod-flight-modes') === 'completed';
    } catch {
      return false;
    }
  });

  const handleMarkCompleteAndNavigateAssessment = () => {
    try {
      localStorage.setItem('asteria_module_mod-flight-modes', 'completed');
      localStorage.setItem('learning_mod-flight-modes', 'completed');
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
    { id: "section-modes-intro", label: "Overview", icon: Compass },
    { id: "section-loiter", label: "Loiter", icon: Anchor },
    { id: "section-auto", label: "Auto", icon: Navigation },
    { id: "section-land", label: "Land", icon: ArrowDownCircle },
    { id: "section-rtl", label: "RTL", icon: RotateCcw },
    { id: "section-alt-hold", label: "Alt Hold", icon: Gauge },
    { id: "section-playground", label: "Playground", icon: Sparkles },
    { id: "section-assessment", label: "Module Quiz (10 Qs)", icon: Award }
  ];

  const getModeIcon = (id) => {
    switch (id) {
      case 'loiter': return Anchor;
      case 'auto': return Navigation;
      case 'land': return ArrowDownCircle;
      case 'rtl': return RotateCcw;
      case 'alt_hold': return Gauge;
      default: return Activity;
    }
  };

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
          <span className="text-[var(--text-primary)] font-semibold">Module 6: Flight Modes</span>
        </nav>

        {/* Module Header Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-6 mb-6 border-b border-[var(--divider)] gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-3 rounded-full bg-[var(--accent-signal-subtle)] border border-[#BFDBFE]">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-signal)]" />
              <span className="font-display text-[11px] font-bold tracking-[0.08em] uppercase text-[var(--accent-signal)]">
                MODULE 06 · NAVIGATE TRACK
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
                      VISUAL MASTERCLASS · MODULE 06
                    </span>
                    <span className="text-[var(--divider)]">·</span>
                    <span className="font-mono text-[10px] font-bold text-[#059669] bg-[#ECFDF5] px-2 py-0.5 rounded-full border border-[#A7F3D0]">
                      HD MP4
                    </span>
                  </div>
                  <h2 className="font-display text-xl sm:text-2xl font-bold text-[var(--text-primary)]">
                    Flight Modes on UAV
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
                <source src="/videos/module6.mp4" type="video/mp4" />
                <source src="/videos/Module 6.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </section>


        {/* ================= 2. INTRO & HORIZONTAL OVERVIEW STRIP ================= */}
        <section id="section-modes-intro" className="mb-16 pt-4 scroll-mt-32">
          
          <div className="mb-6">
            <SectionHeading
              eyebrow="autopilot operating states"
              title="Autonomous & Assisted Flight Modes"
              subtitle="Predefined firmware control modes governing UAV stabilization, position holding, and mission autonomy."
            />

            <p className="font-body text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed max-w-4xl mt-3">
              "{moduleInfo.intro}"
            </p>
          </div>

          {/* Horizontal Overview Strip (Quick Jump Pills) */}
          <div className="p-4 rounded-2xl bg-[var(--bg-elevated)] border border-[var(--divider)] shadow-xs">
            <div className="font-mono text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)] mb-3">
              5 Core Flight Operating Modes Overview:
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {modes.map((m) => {
                const Icon = getModeIcon(m.id);
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => scrollToAnchor(`section-${m.id.replace('_', '-')}`)}
                    className="p-3 rounded-xl bg-[var(--bg-primary)] border border-[var(--divider)] hover:border-[var(--accent-signal)] hover:shadow-2xs transition-all flex flex-col items-center text-center group focus-visible:ring-2 focus-visible:ring-[var(--border-focus)]"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[var(--accent-signal-subtle)] text-[var(--accent-signal)] flex items-center justify-center mb-1.5 group-hover:bg-[var(--accent-signal)] group-hover:text-white transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="font-display font-bold text-xs text-[var(--text-primary)] group-hover:text-[var(--accent-signal)]">
                      {m.shortName}
                    </span>
                    <span className="font-mono text-[9px] text-[var(--text-muted)]">
                      {m.badge}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

        </section>


        {/* ================= 3. FIVE COMPACT MODE CARDS ================= */}
        <section className="mb-20">
          
          <div className="mb-8 pb-3 border-b border-[var(--divider)] flex items-center justify-between">
            <h2 className="font-display text-2xl font-bold text-[var(--text-primary)]">
              Flight Modes Detailed Breakdown
            </h2>
            <span className="font-mono text-xs text-[var(--text-muted)]">
              5 Operating States
            </span>
          </div>

          <div className="space-y-6">
            
            {/* 1. Loiter Mode */}
            <div 
              id="section-loiter" 
              className="p-6 rounded-2xl bg-[var(--bg-primary)] border border-[var(--divider)] shadow-xs hover:border-[var(--accent-signal)] transition-all scroll-mt-32"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-4 border-b border-[var(--divider)] gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[var(--accent-signal-subtle)] border border-[#BFDBFE] flex items-center justify-center text-[var(--accent-signal)] shadow-2xs">
                    <Anchor className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold text-[var(--text-primary)]">
                      {modes[0].name}
                    </h3>
                    <span className="font-mono text-[11px] font-semibold text-[var(--accent-signal)] uppercase">
                      {modes[0].badge}
                    </span>
                  </div>
                </div>
                <span className="font-mono text-xs text-[var(--text-muted)] bg-[var(--bg-elevated)] px-3 py-1 rounded-full border border-[var(--divider)] self-start sm:self-auto">
                  Mode 01 · Position Hold
                </span>
              </div>

              <ul className="space-y-2.5 mb-4">
                {modes[0].bullets.map((bullet, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 font-body text-sm text-[var(--text-secondary)] leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-signal)] mt-2 shrink-0" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-3 border-t border-[var(--divider)] font-mono text-[11px] text-[var(--text-muted)] flex justify-between">
                <span>Required Feeds: GPS + IMU + Barometer</span>
                <span className="text-[var(--accent-signal)] font-semibold">3D STEADY HOVER</span>
              </div>
            </div>

            {/* 2. Auto Mode */}
            <div 
              id="section-auto" 
              className="p-6 rounded-2xl bg-[var(--bg-primary)] border border-[var(--divider)] shadow-xs hover:border-[var(--accent-signal)] transition-all scroll-mt-32"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-4 border-b border-[var(--divider)] gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[var(--accent-signal-subtle)] border border-[#BFDBFE] flex items-center justify-center text-[var(--accent-signal)] shadow-2xs">
                    <Navigation className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold text-[var(--text-primary)]">
                      {modes[1].name}
                    </h3>
                    <span className="font-mono text-[11px] font-semibold text-[var(--accent-signal)] uppercase">
                      {modes[1].badge}
                    </span>
                  </div>
                </div>
                <span className="font-mono text-xs text-[var(--text-muted)] bg-[var(--bg-elevated)] px-3 py-1 rounded-full border border-[var(--divider)] self-start sm:self-auto">
                  Mode 02 · Waypoint Autopilot
                </span>
              </div>

              <ul className="space-y-2.5 mb-4">
                {modes[1].bullets.map((bullet, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 font-body text-sm text-[var(--text-secondary)] leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-signal)] mt-2 shrink-0" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-3 border-t border-[var(--divider)] font-mono text-[11px] text-[var(--text-muted)] flex justify-between">
                <span>Pre-flight Upload: QGroundControl / Mission Planner</span>
                <span className="text-[var(--accent-signal)] font-semibold">SURVEY & MAPPING</span>
              </div>
            </div>

            {/* 3. Land Mode */}
            <div 
              id="section-land" 
              className="p-6 rounded-2xl bg-[var(--bg-primary)] border border-[var(--divider)] shadow-xs hover:border-[var(--accent-signal)] transition-all scroll-mt-32"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-4 border-b border-[var(--divider)] gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[var(--accent-signal-subtle)] border border-[#BFDBFE] flex items-center justify-center text-[var(--accent-signal)] shadow-2xs">
                    <ArrowDownCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold text-[var(--text-primary)]">
                      {modes[2].name}
                    </h3>
                    <span className="font-mono text-[11px] font-semibold text-[var(--accent-signal)] uppercase">
                      {modes[2].badge}
                    </span>
                  </div>
                </div>
                <span className="font-mono text-xs text-[var(--text-muted)] bg-[var(--bg-elevated)] px-3 py-1 rounded-full border border-[var(--divider)] self-start sm:self-auto">
                  Mode 03 · Auto Touchdown
                </span>
              </div>

              <ul className="space-y-2.5 mb-4">
                {modes[2].bullets.map((bullet, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 font-body text-sm text-[var(--text-secondary)] leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-signal)] mt-2 shrink-0" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-3 border-t border-[var(--divider)] font-mono text-[11px] text-[var(--text-muted)] flex justify-between">
                <span>Descent Velocity: -1.0 m/s to -1.5 m/s</span>
                <span className="text-[var(--accent-signal)] font-semibold">EMERGENCY & NORMAL TOUCHDOWN</span>
              </div>
            </div>

            {/* 4. RTL Mode */}
            <div 
              id="section-rtl" 
              className="p-6 rounded-2xl bg-[var(--bg-primary)] border border-[var(--divider)] shadow-xs hover:border-[var(--accent-signal)] transition-all scroll-mt-32"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-4 border-b border-[var(--divider)] gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[var(--accent-signal-subtle)] border border-[#BFDBFE] flex items-center justify-center text-[var(--accent-signal)] shadow-2xs">
                    <RotateCcw className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold text-[var(--text-primary)]">
                      {modes[3].name}
                    </h3>
                    <span className="font-mono text-[11px] font-semibold text-[var(--accent-signal)] uppercase">
                      {modes[3].badge}
                    </span>
                  </div>
                </div>
                <span className="font-mono text-xs text-[var(--text-muted)] bg-[var(--bg-elevated)] px-3 py-1 rounded-full border border-[var(--divider)] self-start sm:self-auto">
                  Mode 04 · Return-to-Launch
                </span>
              </div>

              <ul className="space-y-2.5 mb-4">
                {modes[3].bullets.map((bullet, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 font-body text-sm text-[var(--text-secondary)] leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-signal)] mt-2 shrink-0" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>

              {/* Cross-reference to RTH Glossary Term */}
              <div className="mb-4 p-3 rounded-xl bg-[var(--accent-signal-subtle)] border border-[#BFDBFE] flex items-center justify-between text-xs font-mono">
                <span className="text-[var(--accent-signal-deep)] font-semibold">
                  Cross-Reference: See also <strong>RTH (Return-to-Home)</strong> terminology in the Glossary.
                </span>
                <button
                  type="button"
                  onClick={onNavigateGlossary}
                  className="inline-flex items-center gap-1 text-[var(--accent-signal)] hover:underline font-bold"
                >
                  <span>Open Glossary</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>

              <div className="pt-3 border-t border-[var(--divider)] font-mono text-[11px] text-[var(--text-muted)] flex justify-between">
                <span>RTL Altitude: Climbs to clearance height (e.g. 50m)</span>
                <span className="text-[var(--accent-signal)] font-semibold">FAILSAFE AUTONOMY</span>
              </div>
            </div>

            {/* 5. Alt Hold Mode */}
            <div 
              id="section-alt-hold" 
              className="p-6 rounded-2xl bg-[var(--bg-primary)] border border-[var(--divider)] shadow-xs hover:border-[var(--accent-signal)] transition-all scroll-mt-32"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-4 border-b border-[var(--divider)] gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[var(--accent-signal-subtle)] border border-[#BFDBFE] flex items-center justify-center text-[var(--accent-signal)] shadow-2xs">
                    <Gauge className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold text-[var(--text-primary)]">
                      {modes[4].name}
                    </h3>
                    <span className="font-mono text-[11px] font-semibold text-[var(--accent-signal)] uppercase">
                      {modes[4].badge}
                    </span>
                  </div>
                </div>
                <span className="font-mono text-xs text-[var(--text-muted)] bg-[var(--bg-elevated)] px-3 py-1 rounded-full border border-[var(--divider)] self-start sm:self-auto">
                  Mode 05 · Barometer Lock
                </span>
              </div>

              <ul className="space-y-2.5 mb-4">
                {modes[4].bullets.map((bullet, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 font-body text-sm text-[var(--text-secondary)] leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-signal)] mt-2 shrink-0" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-3 border-t border-[var(--divider)] font-mono text-[11px] text-[var(--text-muted)] flex justify-between">
                <span>Vertical: Auto-Throttle (Baro PID) · Horizontal: Manual Pilot RC Stick</span>
                <span className="text-[var(--accent-signal)] font-semibold">PILOT ASSISTED</span>
              </div>
            </div>

          </div>

        </section>


        {/* ================= 4. FLIGHT-MODE PLAYGROUND (TIER 1 INTERACTIVE) ================= */}
        <section id="section-playground" className="mb-20 pt-12 border-t border-[var(--divider)] scroll-mt-32">
          
          <div className="mb-8">
            <SectionHeading
              eyebrow="tier 1 signature interactive simulator"
              title="Flight-Mode 2D Interactive Playground"
              subtitle="Experience live kinematic behaviors, GPS position-holding wind rejection, autonomous waypoint navigation, and failsafe Return-to-Launch."
            />
          </div>

          {/* Embedded Tier 1 Flight Mode Playground Component */}
          <FlightModePlayground />

        </section>

        {/* ================= 5. MODULE FOOTER NAVIGATION ================= */}
        <footer className="pt-8 border-t border-[var(--divider)] flex flex-col sm:flex-row items-center justify-between gap-4">
          
          <button
            type="button"
            onClick={onNavigatePrev}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full text-sm font-semibold font-body text-[var(--text-secondary)] bg-[var(--bg-primary)] hover:bg-[var(--bg-elevated)] border border-[var(--divider)] transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous: Module 5</span>
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
