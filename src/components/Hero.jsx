import React from 'react';
import { ArrowRight, BookOpen, Cpu, Wind, ShieldCheck, Compass, Sparkles, CheckCircle2 } from 'lucide-react';
import ExplodedViewPlaceholder from './ExplodedViewPlaceholder';

export default function Hero({ onStartLearning, onExploreCurriculum }) {
  const objectives = [
    {
      id: 1,
      text: "Drone concepts & terminology",
      icon: BookOpen,
      code: "TRACK 01 · LIFT"
    },
    {
      id: 2,
      text: "Types, components & how they work",
      icon: Cpu,
      code: "TRACK 02 · CONTROL"
    },
    {
      id: 3,
      text: "Flight principles, stability & control",
      icon: Wind,
      code: "TRACK 03 · NAVIGATE"
    },
    {
      id: 4,
      text: "Safety, regulations & compliance",
      icon: ShieldCheck,
      code: "TRACK 04 · COMPLY"
    }
  ];

  return (
    <div className="w-full min-h-[calc(100vh-4rem)] lg:h-[calc(100vh-4rem)] flex flex-col justify-between bg-[var(--bg-primary)] overflow-y-auto lg:overflow-hidden px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
      <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col justify-center my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 xl:gap-12 items-center">
          
          {/* Left Column: Educational Welcoming Copy & Action Pipeline */}
          <div className="lg:col-span-7 flex flex-col items-start animate-hero-fade">
            
            {/* Eyebrow Label & Motivational Slogan Badge */}
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[var(--accent-signal-subtle)] border border-[#BFDBFE] shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-[var(--accent-signal)] shrink-0 animate-pulse" />
                <span className="font-display text-[11px] sm:text-xs font-bold tracking-[0.08em] uppercase text-[var(--accent-signal)]">
                  &quot;From Theory to Takeoff.&quot;
                </span>
              </div>
              <span className="hidden sm:inline-block font-mono text-[10px] font-semibold tracking-wider uppercase text-[var(--text-muted)]">
                · UAV AERODYNAMICS & SYSTEMS TRAINING
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="font-display text-2xl sm:text-4xl lg:text-[40px] xl:text-[46px] font-bold tracking-tight text-[var(--text-primary)] leading-[1.12] mb-1">
              Welcome to Drone Fundamentals.
            </h1>

            {/* Motivational Slogan Tagline */}
            <h2 className="font-display text-lg sm:text-xl font-extrabold text-[var(--accent-signal)] tracking-tight mb-3 italic">
              From Theory to Takeoff.
            </h2>

            {/* Welcome & Purpose Paragraph */}
            <p className="font-body text-xs sm:text-sm lg:text-base text-[var(--text-muted)] leading-relaxed max-w-xl mb-4 sm:mb-5">
              A comprehensive, structured training program covering drone aerodynamics, flight dynamics, avionics hardware, sensor fusion, and DGCA airspace compliance. Master core UAV principles through interactive 3D simulations.
            </p>

            {/* Condensed 4-Part Learning Objectives List */}
            <div className="w-full mb-4 sm:mb-5">
              <div className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[var(--text-secondary)] mb-2 flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-[var(--accent-signal)]" />
                <span>Curriculum Modules Overview</span>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {objectives.map((obj) => {
                  const Icon = obj.icon;
                  return (
                    <div 
                      key={obj.id}
                      className="flex items-center gap-2.5 p-2 sm:p-2.5 rounded-xl bg-[var(--bg-elevated)] border border-[var(--divider)] hover:border-[#CBD5E1] transition-colors"
                    >
                      <div className="w-7 h-7 rounded-lg bg-[var(--bg-primary)] border border-[var(--divider)] flex items-center justify-center text-[var(--accent-signal)] shrink-0 shadow-2xs">
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="font-body text-xs font-medium text-[var(--text-primary)] truncate">
                          {obj.text}
                        </span>
                        <span className="font-mono text-[9px] text-[var(--text-muted)] font-semibold">
                          {obj.code}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Action Buttons: Primary & Secondary CTAs */}
            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
              {/* Primary CTA - Routes to Module 1 */}
              <button
                type="button"
                onClick={onStartLearning}
                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-semibold font-body text-white bg-[var(--accent-signal)] hover:bg-[var(--accent-signal-deep)] active:scale-[0.98] transition-all shadow-brand focus-visible:ring-2 focus-visible:ring-[var(--border-focus)]"
              >
                <span>Start Learning Module 1</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Secondary CTA - Routes to Curriculum Flashcards */}
              <button
                type="button"
                onClick={onExploreCurriculum}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-semibold font-body text-[var(--accent-signal)] bg-[var(--bg-primary)] hover:bg-[var(--bg-elevated)] active:scale-[0.98] border border-[var(--accent-signal)] transition-all focus-visible:ring-2 focus-visible:ring-[var(--border-focus)]"
              >
                <span>Explore Curriculum Flashcards</span>
              </button>
            </div>

          </div>

          {/* Right Column: 3D Assembly Explorer */}
          <div className="lg:col-span-5 w-full flex items-center justify-center">
            <ExplodedViewPlaceholder />
          </div>

        </div>
      </div>

      {/* Bottom Compact Single-Page Status Bar */}
      <div className="max-w-7xl mx-auto w-full pt-3 border-t border-[var(--divider)] flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-[var(--text-muted)] gap-2">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
          <span>© {new Date().getFullYear()} Drone Fundamentals · UAV Technical Training Portal</span>
        </div>
        <div className="flex items-center gap-3 text-[10px]">
          <span>8 Learning Modules</span>
          <span className="text-[var(--divider)]">|</span>
          <span>6 Interactive Simulators</span>
          <span className="text-[var(--divider)]">|</span>
          <span>DGCA Drone Rules 2021/2023 Compliant</span>
        </div>
      </div>
    </div>
  );
}
