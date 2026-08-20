import React, { useState, useRef } from 'react';
import { 
  ChevronRight, 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle, 
  Check, 
  ArrowUp, 
  ArrowDown, 
  Wind, 
  Layers, 
  Plane, 
  Sliders, 
  ShieldCheck, 
  Activity, 
  Info, 
  Sparkles, 
  Zap,
  Video,
  Tv,
  Award,
  Lock,
  Gauge
} from 'lucide-react';
import SectionHeading from './SectionHeading';
import ForceBalanceSimulator from './ForceBalanceSimulator';
import ModuleAssessmentCard from './ModuleAssessmentCard';
import { modulesData } from '../data/curriculumData';

export default function ModuleFlightForcesView({ onNavigateHome, onNavigatePrev, onNavigateNext, onNavigateAssessment }) {
  const moduleInfo = modulesData["mod-flight-forces"];
  const forcesOverview = moduleInfo.forces_overview;
  const airframeForces = moduleInfo.airframe_forces;
  const videoRef = useRef(null);

  // Active Tab for Forces by Airframe Type
  const [activeAirframeTab, setActiveAirframeTab] = useState('multirotor');

  // Completion State Persistence
  const [learningCompleted, setLearningCompleted] = useState(() => {
    try {
      return localStorage.getItem('asteria_module_mod-flight-forces') === 'completed' ||
             localStorage.getItem('learning_mod-flight-forces') === 'completed';
    } catch {
      return false;
    }
  });

  const isAssessmentPassed = (() => {
    try {
      return localStorage.getItem('asteria_module_mod-flight-forces') === 'completed';
    } catch {
      return false;
    }
  })();

  const handleMarkLearningComplete = () => {
    setLearningCompleted(true);
    try {
      localStorage.setItem('learning_mod-flight-forces', 'completed');
    } catch (e) {
      console.warn(e);
    }
  };

  const scrollToAnchor = (id, tabKey = null) => {
    if (tabKey) {
      setActiveAirframeTab(tabKey);
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItems = [
    { id: "section-video", label: "Video Masterclass", icon: Video },
    { id: "section-forces-intro", label: "Forces Overview", icon: Wind },
    { id: "section-airframes", label: "Forces by Airframe", icon: Layers },
    { id: "section-simulator", label: "Balance Simulator", icon: Gauge }
  ];

  const currentAirframeData = airframeForces[activeAirframeTab];

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
            Track 1: Lift & Aerodynamics
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-[var(--divider)]" />
          <span className="text-[var(--text-primary)] font-semibold">Module 5: Flight Forces</span>
        </nav>

        {/* Module Header Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-6 mb-6 border-b border-[var(--divider)] gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-3 rounded-full bg-[var(--accent-signal-subtle)] border border-[#BFDBFE]">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-signal)]" />
              <span className="font-display text-[11px] font-bold tracking-[0.08em] uppercase text-[var(--accent-signal)]">
                MODULE 05 · LIFT TRACK
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
              <span>Module 5 Completed ✓</span>
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
                  onClick={() => scrollToAnchor(item.id, item.tabKey)}
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
                      VISUAL MASTERCLASS · MODULE 05
                    </span>
                    <span className="text-[var(--divider)]">·</span>
                    <span className="font-mono text-[10px] font-bold text-[#059669] bg-[#ECFDF5] px-2 py-0.5 rounded-full border border-[#A7F3D0]">
                      HD MP4
                    </span>
                  </div>
                  <h2 className="font-display text-xl sm:text-2xl font-bold text-[var(--text-primary)]">
                    Fundamentals of UAV Flight Forces
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
                <source src="/videos/module5.mp4" type="video/mp4" />
                <source src="/videos/Module 5.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>

          </div>
        </section>


        {/* ================= 2. INTRO & 4 DEFINITION CARDS ================= */}
        <section id="section-forces-intro" className="mb-20 pt-4 scroll-mt-32">
          
          <div className="mb-8">
            <SectionHeading
              eyebrow="fundamental flight physics"
              title="The 4 Opposing Forces of Flight"
              subtitle="Every airborne vehicle is governed by continuous dynamic equilibrium between four primary aerodynamic vectors."
            />

            <p className="font-body text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed max-w-4xl mt-3">
              "{moduleInfo.intro}"
            </p>
          </div>

          {/* Row of 4 Definition Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
            {forcesOverview.map((force, idx) => {
              const icons = [ArrowUp, ArrowDown, ArrowRight, ArrowLeft];
              const Icon = icons[idx % icons.length];

              return (
                <div 
                  key={force.id}
                  className="p-5 rounded-2xl bg-[var(--bg-elevated)] border border-[var(--divider)] shadow-xs hover:border-[var(--accent-signal)] hover:shadow-card-hover transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-xl bg-[var(--accent-signal-subtle)] border border-[#BFDBFE] flex items-center justify-center text-[var(--accent-signal)] shadow-2xs">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="font-mono text-xs font-bold text-[var(--accent-signal)] px-2 py-0.5 rounded bg-[var(--bg-primary)] border border-[var(--divider)]">
                        {force.vector} Vector
                      </span>
                    </div>

                    <h3 className="font-display text-lg font-bold text-[var(--text-primary)] mb-1.5">
                      {force.name}
                    </h3>

                    <div className="font-mono text-[10px] uppercase tracking-wider text-[var(--accent-signal)] font-semibold mb-2.5">
                      {force.direction}
                    </div>

                    <p className="font-body text-xs sm:text-[13px] text-[var(--text-secondary)] leading-relaxed">
                      "{force.definition}"
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[var(--divider)] font-mono text-[10px] text-[var(--text-muted)] flex justify-between">
                    <span>Force 0{idx + 1}</span>
                    <span className="text-[var(--text-secondary)] font-semibold">{force.name.toUpperCase()}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Summary Line Note */}
          <div className="p-4 rounded-xl bg-[var(--bg-primary)] border border-[var(--divider)] flex items-start gap-3">
            <Info className="w-4 h-4 text-[var(--accent-signal)] shrink-0 mt-0.5" />
            <p className="font-body text-xs sm:text-sm text-[var(--text-muted)] italic leading-relaxed">
              "{moduleInfo.summary_note}"
            </p>
          </div>

        </section>


        {/* ================= 3. FORCES BY AIRFRAME TYPE (TABBED PANEL) ================= */}
        <section id="section-forces-airframes" className="mb-20 pt-12 border-t border-[var(--divider)] scroll-mt-32">
          
          <div className="mb-8">
            <SectionHeading
              eyebrow="vehicle architecture comparison"
              title="Forces by Airframe Type"
              subtitle="How lift, weight, thrust, and drag are generated across multirotor, hybrid VTOL, and fixed-wing airframes."
            />
          </div>

          {/* Tab Selection Header */}
          <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-[var(--bg-elevated)] border border-[var(--divider)] mb-8 shadow-xs">
            {[
              { id: 'multirotor', label: '1. Multirotor Drone', icon: Layers },
              { id: 'vtol', label: '2. Hybrid VTOL Drone', icon: ShieldCheck },
              { id: 'fixed_wing', label: '3. Fixed-Wing Drone', icon: Plane }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeAirframeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveAirframeTab(tab.id)}
                  className={`flex-1 min-w-[140px] py-2.5 px-4 rounded-xl font-display text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all focus-visible:ring-2 focus-visible:ring-[var(--border-focus)] ${
                    isActive
                      ? 'bg-[var(--accent-signal)] text-white shadow-brand'
                      : 'bg-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-subtle)]'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Active Tab Content Card */}
          <div className="p-6 sm:p-8 rounded-2xl bg-[var(--bg-elevated)] border border-[var(--divider)] shadow-xs">
            
            {/* Tab Subtitle */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-[var(--divider)] gap-2">
              <div>
                <h3 className="font-display text-xl font-bold text-[var(--text-primary)]">
                  {currentAirframeData.title}
                </h3>
                <span className="font-mono text-xs text-[var(--accent-signal)] font-semibold">
                  {currentAirframeData.subtitle}
                </span>
              </div>
              <span className="font-mono text-xs text-[var(--text-muted)] bg-[var(--bg-primary)] px-3 py-1 rounded-full border border-[var(--divider)]">
                4-Force Interaction Grid
              </span>
            </div>

            {/* 2x2 Grid of 4 Forces Detailed Copy */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* 1. Lift */}
              <div className="p-5 rounded-xl bg-[var(--bg-primary)] border border-[var(--divider)] shadow-2xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3 pb-2 border-b border-[var(--divider)]">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-lg bg-[var(--accent-signal-subtle)] text-[var(--accent-signal)] flex items-center justify-center font-mono text-xs font-bold">
                        ↑
                      </div>
                      <span className="font-display font-bold text-sm text-[var(--text-primary)]">Lift Generation</span>
                    </div>
                    <span className="font-mono text-[10px] font-bold text-[var(--accent-signal)] uppercase">VERTICAL UP</span>
                  </div>
                  <p className="font-body text-xs sm:text-[13px] text-[var(--text-secondary)] leading-relaxed">
                    {currentAirframeData.lift}
                  </p>
                </div>
              </div>

              {/* 2. Thrust */}
              <div className="p-5 rounded-xl bg-[var(--bg-primary)] border border-[var(--divider)] shadow-2xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3 pb-2 border-b border-[var(--divider)]">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-lg bg-[var(--accent-signal-subtle)] text-[var(--accent-signal)] flex items-center justify-center font-mono text-xs font-bold">
                        →
                      </div>
                      <span className="font-display font-bold text-sm text-[var(--text-primary)]">Thrust Propulsion</span>
                    </div>
                    <span className="font-mono text-[10px] font-bold text-[var(--accent-signal)] uppercase">FORWARD / VECTOR</span>
                  </div>
                  <p className="font-body text-xs sm:text-[13px] text-[var(--text-secondary)] leading-relaxed">
                    {currentAirframeData.thrust}
                  </p>
                </div>
              </div>

              {/* 3. Drag */}
              <div className="p-5 rounded-xl bg-[var(--bg-primary)] border border-[var(--divider)] shadow-2xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3 pb-2 border-b border-[var(--divider)]">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-lg bg-[#F1F5F9] text-[#475569] flex items-center justify-center font-mono text-xs font-bold">
                        ←
                      </div>
                      <span className="font-display font-bold text-sm text-[var(--text-primary)]">Aerodynamic Drag</span>
                    </div>
                    <span className="font-mono text-[10px] font-bold text-[#475569] uppercase">OPPOSING RESISTANCE</span>
                  </div>
                  <p className="font-body text-xs sm:text-[13px] text-[var(--text-secondary)] leading-relaxed">
                    {currentAirframeData.drag}
                  </p>
                </div>
              </div>

              {/* 4. Weight */}
              <div className="p-5 rounded-xl bg-[var(--bg-primary)] border border-[var(--divider)] shadow-2xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3 pb-2 border-b border-[var(--divider)]">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-lg bg-[#F1F5F9] text-[#475569] flex items-center justify-center font-mono text-xs font-bold">
                        ↓
                      </div>
                      <span className="font-display font-bold text-sm text-[var(--text-primary)]">Mass & Weight</span>
                    </div>
                    <span className="font-mono text-[10px] font-bold text-[#475569] uppercase">GRAVITATIONAL LOAD</span>
                  </div>
                  <p className="font-body text-xs sm:text-[13px] text-[var(--text-secondary)] leading-relaxed">
                    {currentAirframeData.weight}
                  </p>
                </div>
              </div>

            </div>

          </div>

        </section>


        {/* ================= 4. BALANCING THE FORCES OF FLIGHT (TIER 1 INTERACTIVE SIMULATOR) ================= */}
        <section id="section-force-balance" className="mb-20 pt-12 border-t border-[var(--divider)] scroll-mt-32">
          
          <div className="mb-8">
            <SectionHeading
              eyebrow="tier 1 interactive simulator"
              title="Balancing the Forces of Flight"
              subtitle="Manipulate opposing force deltas to test how real-time imbalances produce climb, hover, descent, acceleration, or deceleration."
            />
          </div>

          {/* Embedded Tier 1 Force-Balance Simulator Component */}
          <ForceBalanceSimulator defaultMode={activeAirframeTab} />

        </section>

        {/* ================= 5. MODULE FOOTER NAVIGATION ================= */}
        <footer className="pt-8 border-t border-[var(--divider)] flex flex-col sm:flex-row items-center justify-between gap-4">
          
          <button
            type="button"
            onClick={onNavigatePrev}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full text-sm font-semibold font-body text-[var(--text-secondary)] bg-[var(--bg-primary)] hover:bg-[var(--bg-elevated)] border border-[var(--divider)] transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous: Module 4</span>
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
              {isAssessmentPassed ? 'Module 5 Completed ✓ · Score Saved' : 'Submit assessment to unlock Module 6'}
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
