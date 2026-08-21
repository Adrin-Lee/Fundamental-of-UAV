import React, { useState, useRef } from 'react';
import { 
  ChevronRight, 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle, 
  BookOpen, 
  Layers, 
  ShieldCheck, 
  Plane, 
  Cpu, 
  Compass, 
  Check,
  Building2,
  Camera,
  MapPin,
  Sprout,
  ActivitySquare,
  SearchCheck,
  FlaskConical,
  Truck,
  Video,
  Tv,
  Film,
  Award,
  Lock
} from 'lucide-react';
import SectionHeading from './SectionHeading';
import GlossaryFlashcards from './GlossaryFlashcards';
import { modulesData } from '../data/curriculumData';

export default function ModuleIntroView({ onNavigateHome, onNavigateNext, onNavigateAssessment }) {
  const moduleInfo = modulesData["mod-intro-terminology"];
  const videoRef = useRef(null);
  
  // Progress persistence state
  const [isCompleted, setIsCompleted] = useState(() => {
    try {
      return localStorage.getItem('asteria_module_mod-intro-terminology') === 'completed' ||
             localStorage.getItem('learning_mod-intro-terminology') === 'completed';
    } catch {
      return false;
    }
  });

  const [glossaryProgress, setGlossaryProgress] = useState(() => {
    try {
      const saved = localStorage.getItem('asteria_glossary_progress');
      const parsed = saved ? JSON.parse(saved) : {};
      const count = Object.keys(parsed).length;
      return { count, total: 14, isAllMastered: count >= 14 };
    } catch {
      return { count: 0, total: 14, isAllMastered: false };
    }
  });

  const handleMasteryChange = (data) => {
    setGlossaryProgress({
      count: data.masteredCount,
      total: data.totalCount,
      isAllMastered: data.isAllMastered
    });
  };

  const handleMarkCompleteAndNavigateAssessment = () => {
    try {
      localStorage.setItem('asteria_module_mod-intro-terminology', 'completed');
      localStorage.setItem('learning_mod-intro-terminology', 'completed');
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
    { id: "section-intro", label: "System Architecture", icon: Plane },
    { id: "section-terminology", label: "Drone Glossary", icon: BookOpen }
  ];

  const getUseCaseIcon = (id) => {
    switch (id) {
      case 'photo': return Camera;
      case 'survey': return MapPin;
      case 'agri': return Sprout;
      case 'infra': return Building2;
      case 'disaster': return ActivitySquare;
      case 'surv': return SearchCheck;
      case 'research': return FlaskConical;
      case 'delivery': return Truck;
      default: return Plane;
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
            <span>Curriculum Overview</span>
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-[var(--divider)]" />
          <span className="text-[var(--accent-signal)] font-semibold">Track 1: Lift</span>
          <ChevronRight className="w-3.5 h-3.5 text-[var(--divider)]" />
          <span className="text-[var(--text-primary)] truncate">Module 1: Introduction & Terminology</span>
        </nav>

        {/* Module Header Bar with Progress Indicator */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 mb-6 border-b border-[var(--divider)] gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-3 rounded-full bg-[var(--accent-signal-subtle)] border border-[#BFDBFE]">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-signal)]" />
              <span className="font-display text-[11px] font-bold tracking-[0.08em] uppercase text-[var(--accent-signal)]">
                MODULE 01 · LIFT TRACK
              </span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[var(--text-primary)]">
              {moduleInfo.title}
            </h1>
            <div className="flex items-center gap-3 mt-2.5 font-mono text-xs text-[var(--text-muted)]">
              <span>Source Ref: {moduleInfo.source_section}</span>
              <span>·</span>
              <span>Est. Time: 15 mins</span>
              <span>·</span>
              <span className="text-[var(--accent-signal)] font-semibold">Includes Video Lecture</span>
            </div>
          </div>

          {/* Action Button: Single button requiring all terms mastered before activation */}
          <div className="flex items-center gap-2.5">
            {isCompleted ? (
              <button
                type="button"
                onClick={onNavigateAssessment}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold font-display text-white bg-[#0284C7] hover:bg-[#0369A1] shadow-brand transition-all cursor-pointer"
              >
                <Award className="w-3.5 h-3.5 text-white" />
                <span>Take Assessment (10 Qs)</span>
                <ArrowRight className="w-3.5 h-3.5 text-white" />
              </button>
            ) : glossaryProgress.isAllMastered ? (
              <button
                type="button"
                onClick={handleMarkCompleteAndNavigateAssessment}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold font-display text-white bg-[var(--accent-signal)] hover:bg-[var(--accent-signal-deep)] shadow-brand transition-all cursor-pointer"
              >
                <CheckCircle className="w-4 h-4 text-white" />
                <span>Mark as Complete & Take Assessment</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>
            ) : (
              <button
                type="button"
                disabled
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold font-display text-[var(--text-muted)] bg-[var(--bg-elevated)] border border-[var(--divider)] cursor-not-allowed opacity-85 shadow-2xs"
                title="Mark all 14 flashcard terms as 'Got it' to unlock assessment"
              >
                <Lock className="w-3.5 h-3.5 text-[var(--accent-signal)] shrink-0" />
                <span>Master All Terms ({glossaryProgress.count}/{glossaryProgress.total})</span>
              </button>
            )}
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
                      VISUAL MASTERCLASS · MODULE 01
                    </span>
                    <span className="text-[var(--divider)]">·</span>
                    <span className="font-mono text-[10px] font-bold text-[#059669] bg-[#ECFDF5] px-2 py-0.5 rounded-full border border-[#A7F3D0]">
                      HD MP4
                    </span>
                  </div>
                  <h2 className="font-display text-xl sm:text-2xl font-bold text-[var(--text-primary)]">
                    Introduction to Drones & UAV Fundamentals
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
                <source src="/videos/module1.mp4" type="video/mp4" />
                <source src="/Module 1.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>

          </div>
        </section>

        {/* ================= 3. INTRODUCTION BLOCK (TWO-COLUMN EDITORIAL) ================= */}
        <section id="section-intro" className="mb-16 scroll-mt-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Left Column: Visual Schematic / Technical Diagram */}
            <div className="lg:col-span-5 w-full">
              <div className="relative rounded-2xl bg-[var(--bg-elevated)] border border-[var(--divider)] p-6 overflow-hidden shadow-sm">
                
                {/* Blueprint Accent Header */}
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-[var(--divider)] font-mono text-[11px] text-[var(--text-muted)]">
                  <div className="flex items-center gap-2">
                    <Plane className="w-4 h-4 text-[var(--accent-signal)]" />
                    <span className="font-semibold text-[var(--text-secondary)]">UAV SYSTEM SCHEMATIC</span>
                  </div>
                  <span className="text-[var(--accent-signal)]">FIG 1.1</span>
                </div>

                {/* Isometric Drone System Graphic */}
                <div className="relative w-full h-56 rounded-xl bg-[var(--bg-primary)] border border-[var(--divider)] flex flex-col items-center justify-center p-4">
                  <div className="absolute inset-0 blueprint-grid opacity-40 pointer-events-none" />

                  {/* Graphic Hub */}
                  <div className="relative z-10 w-24 h-24 rounded-2xl bg-[var(--accent-signal-subtle)] border-2 border-[var(--accent-signal)] flex flex-col items-center justify-center shadow-brand">
                    <Plane className="w-10 h-10 text-[var(--accent-signal)]" />
                    <span className="font-mono text-[9px] font-bold text-[var(--accent-signal)] mt-1 uppercase">
                      UAV AIRFRAME
                    </span>
                  </div>

                  {/* Callout Nodes */}
                  <div className="absolute top-3 left-3 bg-[var(--bg-elevated)] border border-[var(--divider)] px-2.5 py-1 rounded-md font-mono text-[9px] font-semibold text-[var(--text-secondary)]">
                    • Autonomous Sensors
                  </div>
                  <div className="absolute top-3 right-3 bg-[var(--bg-elevated)] border border-[var(--divider)] px-2.5 py-1 rounded-md font-mono text-[9px] font-semibold text-[var(--text-secondary)]">
                    • Remote Link / GCS
                  </div>
                  <div className="absolute bottom-3 left-3 bg-[var(--bg-elevated)] border border-[var(--divider)] px-2.5 py-1 rounded-md font-mono text-[9px] font-semibold text-[var(--text-secondary)]">
                    • Onboard Avionics
                  </div>
                  <div className="absolute bottom-3 right-3 bg-[var(--bg-elevated)] border border-[var(--divider)] px-2.5 py-1 rounded-md font-mono text-[9px] font-semibold text-[var(--text-secondary)]">
                    • Mission Payload
                  </div>
                </div>

                {/* Caption */}
                <div className="mt-4 pt-3 border-t border-[var(--divider)] font-body text-xs text-[var(--text-muted)] leading-relaxed">
                  <strong className="font-semibold text-[var(--text-primary)]">System Architecture:</strong> An integrated unmanned aerial system combines airframe aerodynamics, propulsion, sensor telemetry, and ground control stations.
                </div>

              </div>
            </div>

            {/* Right Column: Verbatim Source Curriculum Copy */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              
              <div className="space-y-4 font-body text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
                {moduleInfo.body_paragraphs.map((p, idx) => (
                  <p key={idx} className={idx === 0 ? "text-base sm:text-lg font-medium text-[var(--text-primary)] leading-relaxed" : ""}>
                    {p}
                  </p>
                ))}
              </div>

              {/* Scannable Horizontal Row of Industry Use-Case Tags */}
              <div className="mt-8 pt-6 border-t border-[var(--divider)]">
                <div className="font-mono text-xs font-semibold tracking-wider text-[var(--text-primary)] uppercase mb-3 flex items-center gap-2">
                  <Layers className="w-3.5 h-3.5 text-[var(--accent-signal)]" />
                  <span>Key Industry Application Sectors</span>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {moduleInfo.industry_use_cases.map((useCase) => {
                    const Icon = getUseCaseIcon(useCase.id);
                    return (
                      <div
                        key={useCase.id}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--bg-elevated)] border border-[var(--divider)] hover:border-[#CBD5E1] transition-colors"
                      >
                        <Icon className="w-3.5 h-3.5 text-[var(--accent-signal)] shrink-0" />
                        <span className="font-body text-xs font-medium text-[var(--accent-signal-deep)]">
                          {useCase.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          </div>
        </section>



        {/* Section 3: Interactive Flashcards & Glossary */}
        <section id="section-glossary" className="mb-14 scroll-mt-24">
          <SectionHeading 
            eyebrow="interactive flashcards"
            title="Aviation Terminology Flashcard Deck"
            subtitle="Click to flip terms and master essential acronyms (UAV, UAS, FC, ESC, IMU, BLDC)."
          />

          {/* Embedded Reusable Flashcards Tool */}
          <GlossaryFlashcards onMasteryChange={handleMasteryChange} />
        </section>

        {/* ================= 5. MODULE FOOTER NAVIGATION ================= */}
        <footer className="pt-8 border-t border-[var(--divider)] flex flex-col sm:flex-row items-center justify-end gap-4">
          
          {/* Action Button: Single prominent button unlocking only after all terms mastered */}
          {isCompleted ? (
            <button
              type="button"
              onClick={onNavigateAssessment}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full text-sm font-bold font-display text-white bg-[#0284C7] hover:bg-[#0369A1] shadow-brand transition-all cursor-pointer"
            >
              <Award className="w-4 h-4 text-white" />
              <span>Take Module Assessment (10 Qs)</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </button>
          ) : glossaryProgress.isAllMastered ? (
            <button
              type="button"
              onClick={handleMarkCompleteAndNavigateAssessment}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full text-sm font-bold font-display text-white bg-[var(--accent-signal)] hover:bg-[var(--accent-signal-deep)] shadow-brand transition-all cursor-pointer"
            >
              <CheckCircle className="w-4 h-4 text-white" />
              <span>Mark as Complete & Take Assessment</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </button>
          ) : (
            <button
              type="button"
              disabled
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full text-sm font-bold font-display text-[var(--text-muted)] bg-[var(--bg-elevated)] border border-[var(--divider)] cursor-not-allowed opacity-85 shadow-xs"
              title="Mark all 14 flashcard terms as 'Got it' to unlock assessment"
            >
              <Lock className="w-4 h-4 text-[var(--accent-signal)] shrink-0" />
              <span>Master All 14 Terms to Unlock Assessment ({glossaryProgress.count}/{glossaryProgress.total} Mastered)</span>
            </button>
          )}

        </footer>

      </div>
    </article>
  );
}
