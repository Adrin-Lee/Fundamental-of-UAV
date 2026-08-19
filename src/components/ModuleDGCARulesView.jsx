import React, { useState, useRef } from 'react';
import { 
  ChevronRight, 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle, 
  Check, 
  ShieldCheck, 
  AlertTriangle, 
  XCircle, 
  Sliders, 
  Info, 
  ExternalLink, 
  Compass, 
  Layers, 
  Award,
  AlertCircle,
  FileText,
  MapPin,
  Lock,
  Video,
  Tv
} from 'lucide-react';
import SectionHeading from './SectionHeading';
import DGCAZoneChecker from './DGCAZoneChecker';
import { modulesData } from '../data/curriculumData';

export default function ModuleDGCARulesView({ onNavigateHome, onNavigatePrev, onNavigateFinalAssessment, onNavigateAssessment }) {
  const moduleInfo = modulesData["mod-dgca-rules"];
  const zones = moduleInfo.zones;
  const supplementary = moduleInfo.supplementary;
  const videoRef = useRef(null);

  // Completion State Persistence
  const [learningCompleted, setLearningCompleted] = useState(() => {
    try {
      return localStorage.getItem('asteria_module_mod-dgca-rules') === 'completed' ||
             localStorage.getItem('learning_mod-dgca-rules') === 'completed';
    } catch {
      return false;
    }
  });

  const isAssessmentPassed = (() => {
    try {
      return localStorage.getItem('asteria_module_mod-dgca-rules') === 'completed';
    } catch {
      return false;
    }
  })();

  const handleMarkLearningComplete = () => {
    setLearningCompleted(true);
    try {
      localStorage.setItem('learning_mod-dgca-rules', 'completed');
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
    { id: "section-dgca-intro", label: "Overview & Notice", icon: Compass },
    { id: "section-green-zone", label: "Green Zone", icon: ShieldCheck },
    { id: "section-yellow-zone", label: "Yellow Zone", icon: AlertTriangle },
    { id: "section-red-zone", label: "Red Zone", icon: XCircle },
    { id: "section-zone-checker", label: "Zone Checker", icon: Sliders },
    { id: "section-beyond-basics", label: "Beyond the Basics", icon: Layers }
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
            Track 4: Comply & Safety
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-[var(--divider)]" />
          <span className="text-[var(--text-primary)] font-semibold">Module 8: DGCA Regulations</span>
        </nav>

        {/* Module Header Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-6 mb-6 border-b border-[var(--divider)] gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-3 rounded-full bg-[var(--accent-signal-subtle)] border border-[#BFDBFE]">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-signal)]" />
              <span className="font-display text-[11px] font-bold tracking-[0.08em] uppercase text-[var(--accent-signal)]">
                MODULE 08 · COMPLY TRACK (FINAL MODULE)
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
              <span>Module 8 Completed ✓</span>
            </div>
          ) : learningCompleted ? (
            <button
              type="button"
              onClick={onNavigateAssessment}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold font-body bg-[#E0F2FE] text-[#0369A1] border border-[#BAE6FD] hover:bg-[#0284C7] hover:text-white transition-all shadow-xs"
            >
              <Award className="w-3.5 h-3.5" />
              <span>Take Knowledge Assessment</span>
            </button>
          ) : (
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold font-body bg-[var(--bg-elevated)] text-[var(--text-secondary)] border border-[var(--divider)] shadow-2xs">
              <BookOpen className="w-3.5 h-3.5 text-[var(--accent-signal)]" />
              <span>Learning in Progress</span>
            </div>
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
                      VISUAL MASTERCLASS · MODULE 08
                    </span>
                    <span className="text-[var(--divider)]">·</span>
                    <span className="font-mono text-[10px] font-bold text-[#059669] bg-[#ECFDF5] px-2 py-0.5 rounded-full border border-[#A7F3D0]">
                      HD MP4
                    </span>
                  </div>
                  <h2 className="font-display text-xl sm:text-2xl font-bold text-[var(--text-primary)]">
                    DGCA Rules & Airspace Regulations
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
                <source src="/videos/module8.mp4" type="video/mp4" />
                <source src="/videos/Module 8.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>

          </div>
        </section>


        {/* ================= 2. INTRO & PERSISTENT REGULATORY BANNER ================= */}
        <section id="section-dgca-intro" className="mb-16 pt-4 scroll-mt-32">
          
          <div className="mb-6">
            <SectionHeading
              eyebrow="civil aviation compliance"
              title="Indian Airspace Classification (Drone Rules, 2021)"
              subtitle="DGCA statutory airspace zones governing operational permissions, altitude limits, and air traffic clearances across India."
            />

            <p className="font-body text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed max-w-4xl mt-3">
              "{moduleInfo.intro}"
            </p>
          </div>

          {/* Persistent Warning Callout Banner (Not Dismissible) */}
          <div className="p-5 rounded-2xl bg-[#FFFBEB] border-2 border-[var(--accent-warn)] shadow-xs flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-[var(--accent-warn)] text-white flex items-center justify-center shrink-0 shadow-2xs">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <div className="font-mono text-xs font-bold uppercase tracking-wider text-[#92400E] mb-1">
                MANDATORY STATUTORY FLIGHT PRE-CHECK NOTICE
              </div>
              <p className="font-body text-xs sm:text-sm text-[#78350F] leading-relaxed">
                "{moduleInfo.disclaimer_banner}"
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-4 text-xs font-mono">
                <a 
                  href="https://digitalsky.gov.in" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center gap-1 font-bold text-[#92400E] hover:underline"
                >
                  <span>Open DigitalSky Airspace Map (digitalsky.gov.in)</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <a 
                  href="https://egca.dgca.gov.in" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center gap-1 font-bold text-[#92400E] hover:underline"
                >
                  <span>eGCA Licensing Portal (egca.dgca.gov.in)</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

        </section>


        {/* ================= 3. THREE ZONE SECTIONS (GREEN / YELLOW / RED) ================= */}
        <section className="mb-20 space-y-10">
          
          {/* 1. Green Zone Card */}
          <div 
            id="section-green-zone" 
            className="p-6 sm:p-8 rounded-2xl bg-[var(--bg-primary)] border-2 border-[#2E9E5B] shadow-xs scroll-mt-32"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-[var(--divider)] gap-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#ECFDF5] border border-[#A7F3D0] flex items-center justify-center text-[#047857] shadow-2xs">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold text-[var(--text-primary)]">
                    {zones.green.name}
                  </h3>
                  <span className="font-mono text-xs text-[#047857] font-semibold">
                    {zones.green.badge}
                  </span>
                </div>
              </div>
              <span className="font-mono text-xs text-[#047857] bg-[#ECFDF5] px-3 py-1 rounded-full border border-[#A7F3D0] self-start sm:self-auto font-bold">
                Max Ceiling: 120m / 60m
              </span>
            </div>

            {/* Definition */}
            <div className="mb-6">
              <p className="font-body text-sm sm:text-base text-[var(--text-primary)] leading-relaxed bg-[#F0FDF4] p-4 rounded-xl border border-[#DCFCE7]">
                "{zones.green.definition}"
              </p>
            </div>

            {/* Rules List */}
            <div className="mb-6">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] block mb-3">
                Operational Rules & Altitude Ceilings:
              </span>
              <ul className="space-y-2.5">
                {zones.green.rules.map((rule, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 font-body text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#047857] mt-2 shrink-0" />
                    <span>"{rule}"</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Example Location Pills */}
            <div className="pt-4 border-t border-[var(--divider)]">
              <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)] block mb-2">
                Typical Green Zone Locations:
              </span>
              <div className="flex flex-wrap gap-2">
                {zones.green.examples.map((ex, idx) => (
                  <span 
                    key={idx} 
                    className="px-3 py-1 rounded-lg bg-[#ECFDF5] border border-[#A7F3D0] font-mono text-xs font-semibold text-[#065F46]"
                  >
                    "{ex}"
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* 2. Yellow Zone Card */}
          <div 
            id="section-yellow-zone" 
            className="p-6 sm:p-8 rounded-2xl bg-[var(--bg-primary)] border-2 border-[var(--accent-warn)] shadow-xs scroll-mt-32"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-[var(--divider)] gap-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#FFFBEB] border border-[#FDE68A] flex items-center justify-center text-[#B45309] shadow-2xs">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold text-[var(--text-primary)]">
                    {zones.yellow.name}
                  </h3>
                  <span className="font-mono text-xs text-[#B45309] font-semibold">
                    {zones.yellow.badge}
                  </span>
                </div>
              </div>
              <span className="font-mono text-xs text-[#B45309] bg-[#FFFBEB] px-3 py-1 rounded-full border border-[#FDE68A] self-start sm:self-auto font-bold">
                Controlled Airspace
              </span>
            </div>

            {/* Definition */}
            <div className="mb-6">
              <p className="font-body text-sm sm:text-base text-[var(--text-primary)] leading-relaxed bg-[#FFFBEB] p-4 rounded-xl border border-[#FDE68A]">
                "{zones.yellow.definition}"
              </p>
            </div>

            {/* Rules List */}
            <div className="mb-6">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] block mb-3">
                Operational Rules & ATC Requirements:
              </span>
              <ul className="space-y-2.5">
                {zones.yellow.rules.map((rule, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 font-body text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B45309] mt-2 shrink-0" />
                    <span>"{rule}"</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Example Location Pills */}
            <div className="pt-4 border-t border-[var(--divider)]">
              <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)] block mb-2">
                Typical Yellow Zone Locations:
              </span>
              <div className="flex flex-wrap gap-2">
                {zones.yellow.examples.map((ex, idx) => (
                  <span 
                    key={idx} 
                    className="px-3 py-1 rounded-lg bg-[#FFFBEB] border border-[#FDE68A] font-mono text-xs font-semibold text-[#92400E]"
                  >
                    "{ex}"
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* 3. Red Zone Card */}
          <div 
            id="section-red-zone" 
            className="p-6 sm:p-8 rounded-2xl bg-[var(--bg-primary)] border-2 border-[var(--accent-danger)] shadow-xs scroll-mt-32"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-[var(--divider)] gap-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#FEF2F2] border border-[#FECACA] flex items-center justify-center text-[#DC2626] shadow-2xs">
                  <XCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold text-[var(--text-primary)]">
                    {zones.red.name}
                  </h3>
                  <span className="font-mono text-xs text-[#DC2626] font-semibold">
                    {zones.red.badge}
                  </span>
                </div>
              </div>
              <span className="font-mono text-xs text-[#DC2626] bg-[#FEF2F2] px-3 py-1 rounded-full border border-[#FECACA] self-start sm:self-auto font-bold">
                Prohibited / Zero Tolerance
              </span>
            </div>

            {/* Definition */}
            <div className="mb-6">
              <p className="font-body text-sm sm:text-base text-[var(--text-primary)] leading-relaxed bg-[#FEF2F2] p-4 rounded-xl border border-[#FECACA]">
                "{zones.red.definition}"
              </p>
            </div>

            {/* Rules List */}
            <div className="mb-6">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] block mb-3">
                Prohibition & Legal Enforcement:
              </span>
              <ul className="space-y-2.5">
                {zones.red.rules.map((rule, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 font-body text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#DC2626] mt-2 shrink-0" />
                    <span>"{rule}"</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Example Location Pills */}
            <div className="pt-4 border-t border-[var(--divider)]">
              <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)] block mb-2">
                Typical Red Zone Locations:
              </span>
              <div className="flex flex-wrap gap-2">
                {zones.red.examples.map((ex, idx) => (
                  <span 
                    key={idx} 
                    className="px-3 py-1 rounded-lg bg-[#FEF2F2] border border-[#FECACA] font-mono text-xs font-semibold text-[#991B1B]"
                  >
                    "{ex}"
                  </span>
                ))}
              </div>
            </div>
          </div>

        </section>


        {/* ================= 4. DGCA ZONE & ALTITUDE CHECKER (TIER 2 INTERACTIVE) ================= */}
        <section id="section-zone-checker" className="mb-20 pt-12 border-t border-[var(--divider)] scroll-mt-32">
          
          <div className="mb-8">
            <SectionHeading
              eyebrow="tier 2 compliance calculator"
              title="DGCA Zone & Altitude Distance Checker"
              subtitle="Calculate statutory zone classifications, altitude buffers, and ATC clearance requirements based on airport distance."
            />
          </div>

          {/* Embedded Zone Checker Tool */}
          <DGCAZoneChecker />

        </section>


        {/* ================= 7. BEYOND THE BASICS ================= */}
        <section id="section-beyond-basics" className="mb-20 pt-12 border-t border-[var(--divider)] scroll-mt-32">
          
          <div className="p-6 sm:p-8 rounded-2xl bg-[var(--bg-elevated)] border-2 border-dashed border-[var(--divider)] shadow-xs">
            
            {/* Header with Supplementary Tag */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-[var(--divider)] gap-2">
              <div>
                <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[var(--accent-signal)] bg-[var(--accent-signal-subtle)] px-2.5 py-1 rounded-full border border-[#BFDBFE]">
                  {supplementary.source_tag}
                </span>
                <h3 className="font-display text-2xl font-bold text-[var(--text-primary)] mt-2">
                  Beyond the Basics: Advanced Drone Regulations
                </h3>
              </div>
              <span className="font-mono text-xs text-[var(--text-muted)]">
                Supplementary Reference
              </span>
            </div>

            {/* 1. Drone Weight Categories Table */}
            <div className="mb-8">
              <h4 className="font-display text-base font-bold text-[var(--text-primary)] mb-2">
                1. DGCA Drone Weight Classification & Pilot Licensing (RPC)
              </h4>
              <p className="font-body text-xs sm:text-sm text-[var(--text-muted)] mb-4">
                Drones are categorized by All-Up Weight (AUW) including payload and battery. Higher weight classes require formal pilot certification and airworthiness approvals.
              </p>

              <div className="overflow-x-auto rounded-xl border border-[var(--divider)] bg-[var(--bg-primary)]">
                <table className="w-full text-left font-mono text-xs">
                  <thead className="bg-[var(--bg-elevated)] border-b border-[var(--divider)] text-[var(--text-secondary)] uppercase">
                    <tr>
                      <th className="py-3 px-4 font-bold">Category</th>
                      <th className="py-3 px-4 font-bold">Weight Class (AUW)</th>
                      <th className="py-3 px-4 font-bold">Remote Pilot Certificate (RPC) Requirement</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--divider)]">
                    {supplementary.weight_categories.map((cat, idx) => (
                      <tr key={idx} className="hover:bg-[var(--bg-elevated)] transition-colors">
                        <td className="py-3 px-4 font-bold text-[var(--accent-signal)]">
                          {cat.category} Drone
                        </td>
                        <td className="py-3 px-4 font-semibold text-[var(--text-primary)]">
                          {cat.weight}
                        </td>
                        <td className="py-3 px-4 font-body text-xs text-[var(--text-secondary)]">
                          {cat.pilot_req}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* 2. Registration Split: DigitalSky vs eGCA */}
            <div className="mb-8 p-5 rounded-xl bg-[var(--bg-primary)] border border-[var(--divider)]">
              <h4 className="font-display text-base font-bold text-[var(--text-primary)] mb-2 flex items-center gap-2">
                <FileText className="w-4 h-4 text-[var(--accent-signal)]" />
                <span>2. The Portal Split: DigitalSky vs eGCA Architecture</span>
              </h4>
              <p className="font-body text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed mb-3">
                A common operational confusion is distinguishing between the two primary DGCA digital portals:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
                <div className="p-3.5 rounded-lg bg-[var(--bg-elevated)] border border-[var(--divider)]">
                  <span className="font-bold text-[var(--accent-signal)] block mb-1">eGCA Portal (egca.dgca.gov.in):</span>
                  <span className="font-body text-xs text-[var(--text-secondary)]">{supplementary.portals.egca}</span>
                </div>
                <div className="p-3.5 rounded-lg bg-[var(--bg-elevated)] border border-[var(--divider)]">
                  <span className="font-bold text-[var(--accent-signal)] block mb-1">DigitalSky Platform (digitalsky.gov.in):</span>
                  <span className="font-body text-xs text-[var(--text-secondary)]">{supplementary.portals.digitalsky}</span>
                </div>
              </div>
            </div>

            {/* 3. Penalties & Legal Liability */}
            <div className="mb-8 p-5 rounded-xl bg-[var(--bg-primary)] border border-[var(--divider)]">
              <h4 className="font-display text-base font-bold text-[var(--text-primary)] mb-2 flex items-center gap-2 text-[#991B1B]">
                <Lock className="w-4 h-4 text-[#DC2626]" />
                <span>3. Penalties & Statutory Enforcement</span>
              </h4>
              <p className="font-body text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                {supplementary.penalties}
              </p>
            </div>

            {/* 4. NOTAMs & Temporary Flight Restrictions */}
            <div className="p-5 rounded-xl bg-[var(--bg-primary)] border border-[var(--divider)]">
              <h4 className="font-display text-base font-bold text-[var(--text-primary)] mb-2 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-[var(--accent-signal)]" />
                <span>4. NOTAMs & Dynamic Temporary Airspace Restrictions</span>
              </h4>
              <p className="font-body text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                {supplementary.notams}
              </p>
            </div>

          </div>

        </section>

        {/* ================= 8. MODULE FOOTER NAVIGATION ================= */}
        <footer className="pt-8 border-t border-[var(--divider)] flex flex-col sm:flex-row items-center justify-between gap-4">
          
          <button
            type="button"
            onClick={onNavigatePrev}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full text-sm font-semibold font-body text-[var(--text-secondary)] bg-[var(--bg-primary)] hover:bg-[var(--bg-elevated)] border border-[var(--divider)] transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous: Module 7</span>
          </button>

          {/* Dynamic Learning & Assessment Action Button */}
          {!learningCompleted ? (
            <div className="w-full sm:w-auto flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <button
                type="button"
                onClick={handleMarkLearningComplete}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-sm font-bold font-display text-white bg-[var(--accent-signal)] hover:bg-[var(--accent-signal-deep)] shadow-brand transition-all focus-visible:ring-2 focus-visible:ring-[var(--border-focus)]"
              >
                <CheckCircle className="w-4 h-4 text-white" />
                <span>Mark Learning Completed</span>
              </button>
              <span className="font-mono text-xs text-[var(--text-muted)]">
                Mark learning complete to unlock Assessment
              </span>
            </div>
          ) : (
            <div className="w-full sm:w-auto flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <button
                type="button"
                onClick={onNavigateAssessment}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-sm font-bold font-display text-white bg-[#0284C7] hover:bg-[#0369A1] shadow-brand transition-all focus-visible:ring-2 focus-visible:ring-[#0284C7]"
              >
                <Award className="w-4 h-4 text-white" />
                <span>Take Module Assessment (10 Qs)</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>
              <span className="font-mono text-xs text-[var(--text-muted)]">
                {isAssessmentPassed ? 'Assessment Completed ✓ · Click to Retake' : 'Submit assessment to unlock Final Assessment'}
              </span>
            </div>
          )}

          {/* Proceed to Final Assessment Link - SHOWN AFTER SUBMITTING ASSESSMENT */}
          {isAssessmentPassed ? (
            <button
              type="button"
              onClick={onNavigateFinalAssessment}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-sm font-bold font-display text-white bg-[#059669] hover:bg-[#047857] shadow-brand transition-all focus-visible:ring-2 focus-visible:ring-[#059669]"
            >
              <span>Proceed to Final Assessment</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <div className="w-full sm:w-auto p-3.5 px-5 rounded-2xl bg-[var(--bg-elevated)] border border-dashed border-[var(--divider)] flex items-center justify-center gap-2 text-xs font-mono text-[var(--text-muted)]">
              <Lock className="w-3.5 h-3.5 text-[var(--text-muted)] shrink-0" />
              <span>Submit assessment to unlock <strong>Final Certification Assessment</strong></span>
            </div>
          )}

        </footer>

      </div>
    </article>
  );
}
