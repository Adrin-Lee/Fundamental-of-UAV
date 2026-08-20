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

  const handleToggleComplete = () => {
    const nextState = !isCompleted;
    setIsCompleted(nextState);
    try {
      if (nextState) {
        localStorage.setItem('asteria_module_mod-intro-terminology', 'completed');
        localStorage.setItem('learning_mod-intro-terminology', 'completed');
      } else {
        localStorage.removeItem('asteria_module_mod-intro-terminology');
        localStorage.removeItem('learning_mod-intro-terminology');
      }
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

          {/* Assessment & Learning Status Badge and Mark Complete Action */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={handleToggleComplete}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold font-body transition-all shadow-xs cursor-pointer ${
                isCompleted 
                  ? 'bg-[#ECFDF5] text-[#047857] border border-[#A7F3D0] hover:bg-[#D1FAE5]' 
                  : 'bg-[var(--accent-signal)] hover:bg-[var(--accent-signal-deep)] text-white shadow-brand'
              }`}
            >
              {isCompleted ? (
                <>
                  <Check className="w-4 h-4 text-[#047857]" />
                  <span>Module 1 Completed ✓</span>
                </>
              ) : (
                <>
                  <CheckCircle className="w-4 h-4 text-white" />
                  <span>Mark as Complete</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={onNavigateAssessment}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold font-body bg-[#E0F2FE] text-[#0369A1] border border-[#BAE6FD] hover:bg-[#0284C7] hover:text-white transition-all shadow-xs cursor-pointer"
            >
              <Award className="w-3.5 h-3.5" />
              <span>{isCompleted ? 'Assessment (10 Qs)' : 'Take Assessment (10 Qs)'}</span>
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

        {/* ================= 4. TERMINOLOGY SECTION & FLASHCARDS ================= */}
        {/* ================= 4. GLOSSARY FLASHCARDS ================= */}
        <section id="section-terminology" className="pt-12 border-t border-[var(--divider)] mb-16 scroll-mt-28">
          <SectionHeading
            eyebrow="glossary"
            title="Drone Terminology"
            subtitle="Understanding these terms helps users, operators, engineers, and students communicate effectively and better understand drone systems and their functions."
          />

          {/* Embedded Reusable Flashcards Tool */}
          <GlossaryFlashcards />
        </section>

        {/* ================= 5. MODULE FOOTER NAVIGATION ================= */}
        <footer className="pt-8 border-t border-[var(--divider)] flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Action Group: Mark Complete + Assessment */}
          <div className="w-full sm:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <button
              type="button"
              onClick={handleToggleComplete}
              className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-sm font-bold font-display transition-all shadow-brand focus-visible:ring-2 cursor-pointer ${
                isCompleted
                  ? 'bg-[#ECFDF5] text-[#047857] border border-[#A7F3D0] hover:bg-[#D1FAE5]'
                  : 'text-white bg-[var(--accent-signal)] hover:bg-[var(--accent-signal-deep)]'
              }`}
            >
              <CheckCircle className="w-4 h-4" />
              <span>{isCompleted ? 'Module 1 Marked Complete ✓' : 'Mark as Complete'}</span>
            </button>

            <button
              type="button"
              onClick={onNavigateAssessment}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-sm font-bold font-display text-white bg-[#0284C7] hover:bg-[#0369A1] shadow-brand transition-all cursor-pointer"
            >
              <Award className="w-4 h-4 text-white" />
              <span>{isCompleted ? 'Retake Assessment (10 Qs)' : 'Take Assessment (10 Qs)'}</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </button>
          </div>

          {/* Next Module Navigation Link */}
          {isCompleted ? (
            <button
              type="button"
              onClick={onNavigateNext}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-sm font-bold font-display text-white bg-[#059669] hover:bg-[#047857] shadow-brand transition-all focus-visible:ring-2 focus-visible:ring-[#059669] cursor-pointer"
            >
              <span>Next: {moduleInfo.next_module_title}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleToggleComplete}
              className="w-full sm:w-auto p-3.5 px-6 rounded-2xl bg-[var(--bg-elevated)] border border-[var(--accent-signal)] hover:bg-[var(--accent-signal-subtle)] text-[var(--accent-signal)] flex items-center justify-center sm:justify-end gap-2 text-xs font-mono font-bold transition-all shadow-xs cursor-pointer"
            >
              <Lock className="w-3.5 h-3.5 shrink-0" />
              <span>Mark Complete to Unlock <strong>Next: {moduleInfo.next_module_title}</strong> →</span>
            </button>
          )}

        </footer>

      </div>
    </article>
  );
}
