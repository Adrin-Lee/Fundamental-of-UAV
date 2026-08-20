import React, { useState, useRef } from 'react';
import { 
  ChevronRight, 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle, 
  Check, 
  Cpu, 
  Compass, 
  Activity, 
  Navigation, 
  Radio, 
  Layers, 
  ShieldCheck, 
  MapPin, 
  Wind, 
  Sliders, 
  RotateCw, 
  Plane, 
  TrendingUp, 
  Gauge,
  Satellite,
  Info,
  Sparkles,
  Zap,
  ExternalLink,
  Video,
  Tv,
  Award,
  Lock,
  RefreshCw
} from 'lucide-react';
import SectionHeading from './SectionHeading';
import SensorFusionTool from './SensorFusionTool';
import ModuleAssessmentCard from './ModuleAssessmentCard';
import { modulesData } from '../data/curriculumData';

export default function ModuleFCSensorsView({ onNavigateHome, onNavigatePrev, onNavigateNext, onNavigateAssessment }) {
  const moduleInfo = modulesData["mod-fc-sensors"];
  const fcIntro = moduleInfo.fc_intro;
  const applications = moduleInfo.fc_applications;
  const sensors = moduleInfo.sensors;
  const videoRef = useRef(null);

  // Completion State Persistence
  const [learningCompleted, setLearningCompleted] = useState(() => {
    try {
      return localStorage.getItem('asteria_module_mod-fc-sensors') === 'completed' ||
             localStorage.getItem('learning_mod-fc-sensors') === 'completed';
    } catch {
      return false;
    }
  });

  const isAssessmentPassed = (() => {
    try {
      return localStorage.getItem('asteria_module_mod-fc-sensors') === 'completed';
    } catch {
      return false;
    }
  })();

  const handleMarkLearningComplete = () => {
    setLearningCompleted(true);
    try {
      localStorage.setItem('learning_mod-fc-sensors', 'completed');
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
    { id: "section-baro", label: "Barometer", icon: Gauge },
    { id: "section-gps", label: "GPS Receiver", icon: Satellite },
    { id: "section-sensor-fusion", label: "Sensor Fusion Tool", icon: Sparkles },
    { id: "section-assessment", label: "Module Quiz (10 Qs)", icon: Award }
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
          <span className="text-[var(--text-primary)] font-semibold">Module 4: Flight Controller & Sensors</span>
        </nav>

        {/* Module Header Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-6 mb-6 border-b border-[var(--divider)] gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-3 rounded-full bg-[var(--accent-signal-subtle)] border border-[#BFDBFE]">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-signal)]" />
              <span className="font-display text-[11px] font-bold tracking-[0.08em] uppercase text-[var(--accent-signal)]">
                MODULE 04 · NAVIGATE TRACK
              </span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[var(--text-primary)]">
              {moduleInfo.title}
            </h1>
            <div className="flex items-center gap-3 mt-2.5 font-mono text-xs text-[var(--text-muted)]">
              <span>Source Ref: {moduleInfo.source_section}</span>
              <span>·</span>
              <span>Est. Time: 30 mins</span>
              <span>·</span>
              <span className="text-[var(--accent-signal)] font-semibold">Includes Video Lecture</span>
            </div>
          </div>

          {/* Assessment & Learning Status Badge */}
          {isAssessmentPassed ? (
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold font-body bg-[#ECFDF5] text-[#047857] border border-[#A7F3D0] shadow-xs">
              <Check className="w-4 h-4 text-[#047857]" />
              <span>Module 4 Completed ✓</span>
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
                      VISUAL MASTERCLASS · MODULE 04
                    </span>
                    <span className="text-[var(--divider)]">·</span>
                    <span className="font-mono text-[10px] font-bold text-[#059669] bg-[#ECFDF5] px-2 py-0.5 rounded-full border border-[#A7F3D0]">
                      HD MP4
                    </span>
                  </div>
                  <h2 className="font-display text-xl sm:text-2xl font-bold text-[var(--text-primary)]">
                    Flight Controller & Sensor Fusion
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
                <source src="/videos/module4.mp4" type="video/mp4" />
                <source src="/videos/Module 4.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>

          </div>
        </section>


        {/* ================= 2. FLIGHT CONTROLLER INTRO (2-COLUMN EDITORIAL + FLOW SEQUENCE) ================= */}
        <section id="section-fc-intro" className="mb-20 pt-4 scroll-mt-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left: Text & Connected Step Sequential Flow */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              <SectionHeading
                eyebrow="autopilot computer & firmware"
                title={fcIntro.title}
                subtitle="The computational brain coordinating all airborne stabilization and control."
              />

              <p className="font-body text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed mb-6">
                {fcIntro.description}
              </p>

              {/* Sequential Flow List (Numbered with thin connector line) */}
              <div className="p-5 rounded-2xl bg-[var(--bg-elevated)] border border-[var(--divider)] mb-6 shadow-xs">
                <div className="font-mono text-xs font-bold text-[var(--accent-signal)] uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Activity className="w-4 h-4" />
                  <span>{fcIntro.sequence_title}</span>
                </div>

                <div className="relative pl-3">
                  {/* Vertical Connector Line */}
                  <div className="absolute left-[23px] top-4 bottom-4 w-0.5 bg-[#CBD5E1]" />

                  <div className="space-y-3 relative z-10">
                    {fcIntro.sequence_steps.map((step, idx) => (
                      <div key={idx} className="flex items-center gap-3 font-body text-xs sm:text-sm text-[var(--text-secondary)]">
                        <div className="w-6 h-6 rounded-full bg-[var(--accent-signal)] text-white font-mono text-[11px] font-bold flex items-center justify-center shrink-0 shadow-xs border border-white">
                          {idx + 1}
                        </div>
                        <span className="leading-snug">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Highlighted JetBrains Mono Stat Card Callout */}
              <div className="p-4 rounded-xl bg-[var(--bg-primary)] border-2 border-[var(--accent-signal)] flex items-center gap-3 shadow-brand">
                <div className="w-10 h-10 rounded-xl bg-[var(--accent-signal-subtle)] flex items-center justify-center text-[var(--accent-signal)] shrink-0">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-mono text-xs sm:text-sm font-bold text-[var(--accent-signal)]">
                    {fcIntro.loop_stat}
                  </div>
                  <div className="font-body text-xs text-[var(--text-muted)]">
                    Ultra-low latency feedback loop ensuring millisecond-level dynamic flight corrections.
                  </div>
                </div>
              </div>

            </div>

            {/* Right: Technical Vector Schematic of Flight Controller Board */}
            <div className="lg:col-span-5 w-full">
              <div className="relative rounded-2xl bg-[var(--bg-elevated)] border border-[var(--divider)] p-5 overflow-hidden shadow-xs">
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-[var(--divider)] font-mono text-[11px] text-[var(--text-muted)]">
                  <div className="flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-[var(--accent-signal)]" />
                    <span className="font-semibold text-[var(--text-secondary)]">FLIGHT CONTROLLER ARCHITECTURE</span>
                  </div>
                  <span className="text-[var(--accent-signal)] font-semibold">CORE PROCESSOR</span>
                </div>

                <div 
                  className="relative h-72 rounded-xl bg-[var(--bg-primary)] border border-[var(--divider)] flex flex-col items-center justify-center p-4 overflow-hidden"
                  role="img"
                  aria-label="Flight Controller board schematic showing central MCU, IMU sensor bus, and ESC pulse outputs"
                >
                  <div className="absolute inset-0 blueprint-grid opacity-30 pointer-events-none" />

                  {/* Flight Controller PCB Board Schematic */}
                  <div className="relative z-10 w-52 h-52 rounded-2xl bg-[#0F172A] border-2 border-[var(--accent-signal)] p-3 shadow-md flex flex-col justify-between">
                    
                    {/* Top IO Header */}
                    <div className="flex justify-between items-center text-[7px] font-mono text-white">
                      <div className="px-1.5 py-0.5 rounded bg-[#334155]">RX / SBUS</div>
                      <div className="px-1.5 py-0.5 rounded bg-[var(--accent-signal)] font-bold">GPS / I2C</div>
                      <div className="px-1.5 py-0.5 rounded bg-[#334155]">TELEM</div>
                    </div>

                    {/* Central 32-Bit Microprocessor Core */}
                    <div className="my-auto mx-auto w-24 h-24 rounded-xl bg-[var(--accent-signal)] border-2 border-white shadow-brand flex flex-col items-center justify-center text-white text-center font-mono p-1">
                      <Cpu className="w-5 h-5 mb-1" />
                      <span className="text-[8.5px] font-bold">32-BIT ARM MCU</span>
                      <span className="text-[7px] opacity-90 mt-0.5">FIRMWARE OS</span>
                      <span className="text-[6.5px] text-[#FEF08A] font-semibold">PID LOOPS</span>
                    </div>

                    {/* Bottom ESC / Motor Signal Headers */}
                    <div className="flex justify-between items-center pt-1 border-t border-[#334155] text-[7px] font-mono text-white">
                      <div className="flex gap-1">
                        {['M1', 'M2', 'M3', 'M4'].map((m) => (
                          <div key={m} className="px-1 py-0.5 rounded bg-[var(--accent-signal)] font-bold">
                            {m}
                          </div>
                        ))}
                      </div>
                      <span className="text-[#94A3B8]">DSHOT600</span>
                    </div>
                  </div>
                </div>

                <div className="mt-3 pt-2.5 border-t border-[var(--divider)] font-mono text-[10px] text-[var(--text-muted)] flex justify-between">
                  <span>Firmware: ArduPilot / PX4 / Betaflight</span>
                  <span className="text-[var(--accent-signal)] font-semibold">AUTONOMOUS BRAIN</span>
                </div>
              </div>
            </div>

          </div>
        </section>


        {/* ================= 3. 2.1 APPLICATIONS OF FLIGHT CONTROLLER (7 RESPONSIVE CARDS) ================= */}
        <section id="section-fc-applications" className="mb-20 pt-12 border-t border-[var(--divider)] scroll-mt-32">
          
          <div className="mb-8">
            <div className="font-mono text-xs font-semibold tracking-wider text-[var(--accent-signal)] uppercase mb-1.5">
              SECTION 2.1 · SYSTEM CAPABILITIES
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[var(--text-primary)] tracking-tight">
              Applications of Flight Controller
            </h2>
            <p className="font-body text-sm sm:text-base text-[var(--text-muted)] mt-1.5 max-w-3xl">
              The flight controller acts as the central coordinator, simultaneously executing seven mission-critical functions to maintain controlled flight.
            </p>
          </div>

          {/* 7 Functions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {applications.map((app, idx) => {
              const icons = [ShieldCheck, Zap, Navigation, Activity, Sliders, Radio, Plane];
              const Icon = icons[idx % icons.length];

              return (
                <div 
                  key={app.id}
                  className="p-5 rounded-2xl bg-[var(--bg-primary)] border border-[var(--divider)] shadow-xs hover:border-[var(--accent-signal)] hover:shadow-card-hover transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-[var(--accent-signal-subtle)] border border-[#BFDBFE] flex items-center justify-center text-[var(--accent-signal)] mb-4 shadow-2xs">
                      <Icon className="w-5 h-5" />
                    </div>

                    <h3 className="font-display text-base font-bold text-[var(--text-primary)] mb-2">
                      {app.title}
                    </h3>

                    <p className="font-body text-xs sm:text-[13px] text-[var(--text-secondary)] leading-relaxed">
                      "{app.description}"
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[var(--divider)] font-mono text-[10px] text-[var(--text-muted)] flex justify-between">
                    <span>Function 0{idx + 1}</span>
                    <span className="text-[var(--accent-signal)] font-semibold">Active</span>
                  </div>
                </div>
              );
            })}
          </div>

        </section>


        {/* ================= 4. 2.2 UAV SENSORS OVERVIEW ================= */}
        <section id="section-sensors-intro" className="mb-20 pt-12 border-t border-[var(--divider)] scroll-mt-32">
          
          <div className="mb-12">
            <div className="font-mono text-xs font-semibold tracking-wider text-[var(--accent-signal)] uppercase mb-1.5">
              SECTION 2.2 · AVIONICS SENSING PACKAGE
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[var(--text-primary)] tracking-tight">
              UAV Sensors
            </h2>
            <p className="font-body text-base sm:text-lg text-[var(--text-secondary)] mt-2 max-w-4xl leading-relaxed">
              "{moduleInfo.sensors_intro}"
            </p>
          </div>


          {/* ---------------- SENSOR 1: IMU (INERTIAL MEASUREMENT UNIT) ---------------- */}
          <div id="section-imu" className="mb-20 scroll-mt-32">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* Left: IMU Visual Schematic (Umbrella Package Visual) */}
              <div className="lg:col-span-5 w-full">
                <div className="relative rounded-2xl bg-[var(--bg-elevated)] border border-[var(--divider)] p-5 overflow-hidden shadow-xs">
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-[var(--divider)] font-mono text-[11px] text-[var(--text-muted)]">
                    <div className="flex items-center gap-2">
                      <Layers className="w-4 h-4 text-[var(--accent-signal)]" />
                      <span className="font-semibold text-[var(--text-secondary)]">INERTIAL SENSING PACKAGE</span>
                    </div>
                    <span className="text-[var(--accent-signal)] font-semibold">UMBRELLA SENSOR</span>
                  </div>

                  <div 
                    className="relative h-64 rounded-xl bg-[var(--bg-primary)] border border-[var(--divider)] flex flex-col items-center justify-center p-4 overflow-hidden"
                    role="img"
                    aria-label="IMU sensor umbrella schematic uniting Gyroscope and Accelerometer"
                  >
                    <div className="absolute inset-0 blueprint-grid opacity-30 pointer-events-none" />

                    {/* IMU Umbrella Vector Graphic */}
                    <div className="relative z-10 flex flex-col items-center w-full max-w-xs">
                      {/* Master IMU Chip */}
                      <div className="w-44 py-2.5 px-3 rounded-xl bg-[var(--accent-signal)] border-2 border-[var(--accent-signal-deep)] text-white shadow-brand text-center font-mono">
                        <div className="text-xs font-bold">IMU SENSOR PACKAGE</div>
                        <div className="text-[8px] opacity-80 font-sans">MEMS 6-DOF / 9-DOF</div>
                      </div>

                      {/* Connecting Branches */}
                      <div className="w-32 h-4 border-b-2 border-x-2 border-[#94A3B8] -mt-0.5" />

                      {/* Sub-Sensors */}
                      <div className="flex justify-between w-48 mt-1 gap-2">
                        <div className="flex-1 p-2 rounded-lg bg-[var(--bg-elevated)] border border-[var(--divider)] text-center font-mono text-[9px]">
                          <RotateCw className="w-3.5 h-3.5 text-[var(--accent-signal)] mx-auto mb-0.5" />
                          <span className="font-bold block text-[var(--text-primary)]">GYROSCOPE</span>
                          <span className="text-[7.5px] text-[var(--text-muted)]">Angular Rate</span>
                        </div>

                        <div className="flex-1 p-2 rounded-lg bg-[var(--bg-elevated)] border border-[var(--divider)] text-center font-mono text-[9px]">
                          <Navigation className="w-3.5 h-3.5 text-[var(--accent-signal)] mx-auto mb-0.5" />
                          <span className="font-bold block text-[var(--text-primary)]">ACCELEROMETER</span>
                          <span className="text-[7.5px] text-[var(--text-muted)]">Linear Accel</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-[var(--divider)] font-mono text-[10px] text-[var(--text-muted)] flex justify-between">
                    <span>Sampling: 1kHz – 8kHz</span>
                    <span className="text-[var(--accent-signal)] font-semibold">ATTITUDE ESTIMATION</span>
                  </div>
                </div>
              </div>

              {/* Right: IMU Text */}
              <div className="lg:col-span-7 flex flex-col justify-center">
                <SectionHeading
                  eyebrow="primary motion package"
                  title={sensors.imu.name}
                  subtitle="The foundational sensing unit estimating real-time motion and orientation."
                />

                <p className="font-body text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed mb-6">
                  {sensors.imu.description}
                </p>

                <div className="p-4 rounded-xl bg-[var(--bg-elevated)] border border-[var(--divider)]">
                  <div className="font-mono text-xs font-bold text-[var(--accent-signal)] uppercase mb-1">
                    Sensor Relationship:
                  </div>
                  <p className="font-body text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                    The IMU acts as the <strong>umbrella system</strong> housing the high-frequency angular rate gyroscope and the 3-axis linear accelerometer, providing the fast internal feedback loop necessary to prevent the drone from tumbling.
                  </p>
                </div>
              </div>

            </div>
          </div>


          {/* ---------------- SENSOR 2: GYROSCOPE (TEXT LEFT, VISUAL RIGHT) ---------------- */}
          <div id="section-gyro" className="mb-20 pt-12 border-t border-[var(--divider)] scroll-mt-32">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* Left: Gyroscope Text & 3 Axis Pills */}
              <div className="lg:col-span-7 flex flex-col justify-center">
                <SectionHeading
                  eyebrow="angular velocity sensing"
                  title={sensors.gyroscope.name}
                  subtitle="Detects rotational rates around the 3 primary Cartesian axes."
                />

                <p className="font-body text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed mb-6">
                  {sensors.gyroscope.description}
                </p>

                {/* 3 Labeled Axis Pills */}
                <div className="mb-6">
                  <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)] block mb-2.5">
                    3 Rotational Degrees of Freedom:
                  </span>
                  <div className="grid grid-cols-3 gap-3">
                    {sensors.gyroscope.axes.map((axis, idx) => (
                      <div 
                        key={idx}
                        className="p-3 rounded-xl bg-[var(--bg-elevated)] border border-[var(--divider)] text-center shadow-2xs"
                      >
                        <div className="font-display font-bold text-sm text-[var(--accent-signal)]">
                          {axis}
                        </div>
                        <span className="font-mono text-[10px] text-[var(--text-muted)]">
                          {idx === 0 ? 'X-Axis (Tilt L/R)' : idx === 1 ? 'Y-Axis (Nose Up/Dn)' : 'Z-Axis (Turn L/R)'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Link to Module 6 Badge */}
                <div className="inline-flex items-center gap-2 p-3 rounded-xl bg-[var(--accent-signal-subtle)] border border-[#BFDBFE] text-xs font-mono text-[var(--accent-signal-deep)]">
                  <Sparkles className="w-4 h-4 text-[var(--accent-signal)] shrink-0" />
                  <span>Learn more about 3-axis kinematics in <strong>Module 6: Attitude & Axis Movement</strong>.</span>
                </div>
              </div>

              {/* Right: Gyroscope 3D Rotation Vector Graphic */}
              <div className="lg:col-span-5 w-full">
                <div className="relative rounded-2xl bg-[var(--bg-elevated)] border border-[var(--divider)] p-5 overflow-hidden shadow-xs">
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-[var(--divider)] font-mono text-[11px] text-[var(--text-muted)]">
                    <div className="flex items-center gap-2">
                      <RotateCw className="w-4 h-4 text-[var(--accent-signal)]" />
                      <span className="font-semibold text-[var(--text-secondary)]">ANGULAR RATE GYROSCOPE</span>
                    </div>
                    <span className="text-[var(--accent-signal)] font-semibold">ωx / ωy / ωz</span>
                  </div>

                  <div 
                    className="relative h-64 rounded-xl bg-[var(--bg-primary)] border border-[var(--divider)] flex flex-col items-center justify-center p-4 overflow-hidden"
                    role="img"
                    aria-label="Gyroscope sensor diagram showing rotational angular velocity around Roll, Pitch, and Yaw axes"
                  >
                    <div className="absolute inset-0 blueprint-grid opacity-30 pointer-events-none" />

                    {/* Gyroscope Gimbal Rings Graphic */}
                    <div className="relative z-10 flex items-center justify-center w-40 h-40">
                      {/* Outer Ring (Yaw - Z) */}
                      <div className="absolute w-36 h-36 rounded-full border-2 border-dashed border-[#64748B] flex items-center justify-center">
                        <span className="absolute -top-2 font-mono text-[8px] font-bold text-[#64748B] bg-white px-1">YAW (Z)</span>
                      </div>

                      {/* Middle Ring (Pitch - Y) */}
                      <div className="absolute w-28 h-28 rounded-full border-2 border-[var(--accent-signal)] flex items-center justify-center rotate-45">
                        <span className="absolute -right-2 font-mono text-[8px] font-bold text-[var(--accent-signal)] bg-white px-1">PITCH (Y)</span>
                      </div>

                      {/* Inner Ring (Roll - X) */}
                      <div className="absolute w-20 h-20 rounded-full border-2 border-[#D97706] flex items-center justify-center -rotate-45">
                        <span className="absolute -bottom-2 font-mono text-[8px] font-bold text-[#D97706] bg-white px-1">ROLL (X)</span>
                      </div>

                      {/* Center MEMS Core */}
                      <div className="w-6 h-6 rounded-md bg-[#0F172A] text-white flex items-center justify-center font-mono text-[8px] font-bold">
                        GYRO
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-[var(--divider)] font-mono text-[10px] text-[var(--text-muted)] flex justify-between">
                    <span>Output Unit: °/sec (deg/s)</span>
                    <span className="text-[var(--accent-signal)] font-semibold">RAPID CORRECTIONS</span>
                  </div>
                </div>
              </div>

            </div>
          </div>


          {/* ---------------- SENSOR 3: ACCELEROMETER (VISUAL LEFT, TEXT RIGHT) ---------------- */}
          <div id="section-accel" className="mb-20 pt-12 border-t border-[var(--divider)] scroll-mt-32">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* Left: Accelerometer Visual */}
              <div className="lg:col-span-5 w-full">
                <div className="relative rounded-2xl bg-[var(--bg-elevated)] border border-[var(--divider)] p-5 overflow-hidden shadow-xs">
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-[var(--divider)] font-mono text-[11px] text-[var(--text-muted)]">
                    <div className="flex items-center gap-2">
                      <Navigation className="w-4 h-4 text-[var(--accent-signal)]" />
                      <span className="font-semibold text-[var(--text-secondary)]">3-AXIS ACCELEROMETER</span>
                    </div>
                    <span className="text-[var(--accent-signal)] font-semibold">ax / ay / az</span>
                  </div>

                  <div 
                    className="relative h-64 rounded-xl bg-[var(--bg-primary)] border border-[var(--divider)] flex flex-col items-center justify-center p-4 overflow-hidden"
                    role="img"
                    aria-label="Accelerometer sensor schematic measuring linear forces and 1G gravity vector"
                  >
                    <div className="absolute inset-0 blueprint-grid opacity-30 pointer-events-none" />

                    {/* Accelerometer Coordinate Frame Graphic */}
                    <div className="relative z-10 w-40 h-40 flex items-center justify-center">
                      {/* X Axis Arrow */}
                      <div className="absolute w-24 h-0.5 bg-[#EF4444] right-8">
                        <span className="absolute -right-3 -top-2 font-mono text-[9px] font-bold text-[#EF4444]">+X</span>
                      </div>

                      {/* Y Axis Arrow */}
                      <div className="absolute h-24 w-0.5 bg-[#10B981] top-8">
                        <span className="absolute -top-3 -left-2 font-mono text-[9px] font-bold text-[#10B981]">+Y</span>
                      </div>

                      {/* Z Axis Arrow (Gravity Vector) */}
                      <div className="absolute h-28 w-1 bg-[var(--accent-signal)] bottom-2 flex flex-col items-center justify-end">
                        <span className="font-mono text-[8px] font-bold text-[var(--accent-signal)] bg-white px-1 rounded shadow-xs mb-1">
                          1G GRAVITY (Z)
                        </span>
                      </div>

                      {/* Center Mass */}
                      <div className="w-8 h-8 rounded-lg bg-[#0F172A] text-white flex items-center justify-center font-mono text-[9px] font-bold shadow-md z-10">
                        ACC
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-[var(--divider)] font-mono text-[10px] text-[var(--text-muted)] flex justify-between">
                    <span>Output Unit: m/s² (or G)</span>
                    <span className="text-[var(--accent-signal)] font-semibold">TILT ESTIMATION</span>
                  </div>
                </div>
              </div>

              {/* Right: Accelerometer Text & 3 Uses List */}
              <div className="lg:col-span-7 flex flex-col justify-center">
                <SectionHeading
                  eyebrow="linear acceleration & gravity"
                  title={sensors.accelerometer.name}
                  subtitle="Measures physical acceleration and constant Earth gravitational vector."
                />

                <p className="font-body text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed mb-6">
                  {sensors.accelerometer.description}
                </p>

                {/* 3 Uses List */}
                <div>
                  <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)] block mb-3">
                    Primary Operational Uses:
                  </span>
                  <div className="space-y-2.5">
                    {sensors.accelerometer.uses.map((use, idx) => (
                      <div 
                        key={idx}
                        className="p-3 rounded-xl bg-[var(--bg-elevated)] border border-[var(--divider)] flex items-center gap-3 font-body text-xs sm:text-sm text-[var(--text-secondary)] shadow-2xs"
                      >
                        <div className="w-5 h-5 rounded-full bg-[var(--accent-signal-subtle)] text-[var(--accent-signal)] font-mono text-xs font-bold flex items-center justify-center shrink-0">
                          {idx + 1}
                        </div>
                        <span>{use}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>


          {/* ---------------- SENSOR 4: MAGNETOMETER (TEXT LEFT, VISUAL RIGHT) ---------------- */}
          <div id="section-mag" className="mb-20 pt-12 border-t border-[var(--divider)] scroll-mt-32">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* Left: Magnetometer Text */}
              <div className="lg:col-span-7 flex flex-col justify-center">
                <SectionHeading
                  eyebrow="magnetic compass & yaw heading"
                  title={sensors.magnetometer.name}
                  subtitle="Measures geomagnetic field intensity to determine exact absolute heading."
                />

                <p className="font-body text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed mb-6">
                  {sensors.magnetometer.description}
                </p>

                <div className="p-4 rounded-xl bg-[var(--bg-elevated)] border border-[var(--divider)]">
                  <div className="font-mono text-xs font-bold text-[var(--accent-signal)] uppercase mb-1">
                    Heading Alignment & Drift Prevention:
                  </div>
                  <p className="font-body text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                    While the gyroscope tracks fast yaw rotations, it slowly drifts over time. The magnetometer acts as a digital compass, providing continuous absolute reference to <strong>True Magnetic North</strong> to keep autonomous waypoints accurate.
                  </p>
                </div>
              </div>

              {/* Right: Magnetometer Vector Graphic */}
              <div className="lg:col-span-5 w-full">
                <div className="relative rounded-2xl bg-[var(--bg-elevated)] border border-[var(--divider)] p-5 overflow-hidden shadow-xs">
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-[var(--divider)] font-mono text-[11px] text-[var(--text-muted)]">
                    <div className="flex items-center gap-2">
                      <Compass className="w-4 h-4 text-[var(--accent-signal)]" />
                      <span className="font-semibold text-[var(--text-secondary)]">DIGITAL MAGNETOMETER</span>
                    </div>
                    <span className="text-[var(--accent-signal)] font-semibold">NORTH AZIMUTH</span>
                  </div>

                  <div 
                    className="relative h-64 rounded-xl bg-[var(--bg-primary)] border border-[var(--divider)] flex flex-col items-center justify-center p-4 overflow-hidden"
                    role="img"
                    aria-label="Magnetometer digital compass sensor schematic showing Earth's magnetic flux alignment"
                  >
                    <div className="absolute inset-0 blueprint-grid opacity-30 pointer-events-none" />

                    {/* Compass Rose Vector */}
                    <div className="relative z-10 w-44 h-44 rounded-full border-2 border-[var(--divider)] bg-white flex items-center justify-center shadow-md">
                      {/* Compass Cardinal Points */}
                      <span className="absolute top-2 font-mono text-[10px] font-bold text-[#DC2626]">N 000°</span>
                      <span className="absolute right-2 font-mono text-[9px] font-bold text-[var(--text-muted)]">E 090°</span>
                      <span className="absolute bottom-2 font-mono text-[9px] font-bold text-[var(--text-muted)]">S 180°</span>
                      <span className="absolute left-2 font-mono text-[9px] font-bold text-[var(--text-muted)]">W 270°</span>

                      {/* Compass Needle */}
                      <div className="w-2 h-28 relative flex flex-col items-center rotate-12">
                        <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[45px] border-b-[#DC2626]" />
                        <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[45px] border-t-[#475569]" />
                        <div className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white border-2 border-[#0F172A]" />
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-[var(--divider)] font-mono text-[10px] text-[var(--text-muted)] flex justify-between">
                    <span>Output Unit: Gauss / µTesla</span>
                    <span className="text-[var(--accent-signal)] font-semibold">YAW CALIBRATION</span>
                  </div>
                </div>
              </div>

            </div>
          </div>


          {/* ---------------- SENSOR 5: BAROMETER (VISUAL LEFT, TEXT RIGHT) ---------------- */}
          <div id="section-baro" className="mb-20 pt-12 border-t border-[var(--divider)] scroll-mt-32">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* Left: Barometer Visual */}
              <div className="lg:col-span-5 w-full">
                <div className="relative rounded-2xl bg-[var(--bg-elevated)] border border-[var(--divider)] p-5 overflow-hidden shadow-xs">
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-[var(--divider)] font-mono text-[11px] text-[var(--text-muted)]">
                    <div className="flex items-center gap-2">
                      <Gauge className="w-4 h-4 text-[var(--accent-signal)]" />
                      <span className="font-semibold text-[var(--text-secondary)]">BAROMETRIC PRESSURE SENSOR</span>
                    </div>
                    <span className="text-[var(--accent-signal)] font-semibold">ALTITUDE ESTIMATION</span>
                  </div>

                  <div 
                    className="relative h-64 rounded-xl bg-[var(--bg-primary)] border border-[var(--divider)] flex flex-col items-center justify-center p-4 overflow-hidden"
                    role="img"
                    aria-label="Barometer sensor schematic measuring air pressure gradient vs altitude"
                  >
                    <div className="absolute inset-0 blueprint-grid opacity-30 pointer-events-none" />

                    {/* Barometer Pressure Column Graphic */}
                    <div className="relative z-10 flex items-center gap-6">
                      {/* Vertical Altitude Scale */}
                      <div className="h-44 w-6 rounded-lg bg-[#0F172A] border border-[var(--divider)] p-1 flex flex-col justify-between text-[7px] font-mono text-white text-center">
                        <span className="text-[#38BDF8]">120m</span>
                        <span className="text-[#94A3B8]">60m</span>
                        <span className="text-[#34D399]">0m (GND)</span>
                      </div>

                      {/* Pressure Sensor Chip */}
                      <div className="w-32 p-3 rounded-xl bg-[var(--accent-signal)] text-white font-mono text-center shadow-brand">
                        <Gauge className="w-6 h-6 mx-auto mb-1 text-[#FEF08A]" />
                        <div className="text-xs font-bold">1013.25 hPa</div>
                        <div className="text-[8px] opacity-80 mt-0.5">MEMS Pressure Core</div>
                        <div className="mt-2 text-[7.5px] bg-[var(--accent-signal-deep)] px-1.5 py-0.5 rounded">
                          ΔP → Vertical ΔH
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-[var(--divider)] font-mono text-[10px] text-[var(--text-muted)] flex justify-between">
                    <span>Resolution: ~10 cm vertical</span>
                    <span className="text-[var(--accent-signal)] font-semibold">PRESSURE GRADIENT</span>
                  </div>
                </div>
              </div>

              {/* Right: Barometer Text & 3 Uses Pills */}
              <div className="lg:col-span-7 flex flex-col justify-center">
                <SectionHeading
                  eyebrow="atmospheric pressure sensing"
                  title={sensors.barometer.name}
                  subtitle="Estimates altitude changes by measuring atmospheric air pressure variations."
                />

                <p className="font-body text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed mb-6">
                  {sensors.barometer.description}
                </p>

                {/* 3 Uses Pills */}
                <div>
                  <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)] block mb-2.5">
                    Primary Uses of Barometer:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {sensors.barometer.uses.map((u, idx) => (
                      <div 
                        key={idx}
                        className="p-3 rounded-xl bg-[var(--bg-elevated)] border border-[var(--divider)] text-center shadow-2xs"
                      >
                        <span className="font-display font-semibold text-xs text-[var(--accent-signal)] block">
                          {u}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>


          {/* ---------------- SENSOR 6: GPS RECEIVER (TEXT LEFT, VISUAL RIGHT) ---------------- */}
          <div id="section-gps" className="mb-20 pt-12 border-t border-[var(--divider)] scroll-mt-32">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* Left: GPS Text, 4 Functions Pills & GNSS Note */}
              <div className="lg:col-span-7 flex flex-col justify-center">
                <SectionHeading
                  eyebrow="satellite geolocation"
                  title={sensors.gps.name}
                  subtitle="Computes precise 3D geographic coordinates via orbital satellite constellation signals."
                />

                <p className="font-body text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed mb-6">
                  {sensors.gps.description}
                </p>

                {/* 4 Functions Pills */}
                <div className="mb-6">
                  <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)] block mb-2.5">
                    Functions of GPS Receiver:
                  </span>
                  <div className="grid grid-cols-2 gap-2.5">
                    {sensors.gps.functions.map((fn, idx) => (
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

                {/* Smaller --text-muted GNSS Note */}
                <div className="p-3.5 rounded-xl bg-[var(--bg-elevated)] border border-[var(--divider)] text-xs text-[var(--text-muted)] leading-relaxed font-body">
                  <Info className="w-4 h-4 text-[var(--accent-signal)] inline mr-1.5 align-text-bottom" />
                  {sensors.gps.gnss_note}
                </div>
              </div>

              {/* Right: GPS Vector Graphic */}
              <div className="lg:col-span-5 w-full">
                <div className="relative rounded-2xl bg-[var(--bg-elevated)] border border-[var(--divider)] p-5 overflow-hidden shadow-xs">
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-[var(--divider)] font-mono text-[11px] text-[var(--text-muted)]">
                    <div className="flex items-center gap-2">
                      <Satellite className="w-4 h-4 text-[var(--accent-signal)]" />
                      <span className="font-semibold text-[var(--text-secondary)]">GNSS SATELLITE RECEIVER</span>
                    </div>
                    <span className="text-[var(--accent-signal)] font-semibold">3D FIX</span>
                  </div>

                  <div 
                    className="relative h-64 rounded-xl bg-[var(--bg-primary)] border border-[var(--divider)] flex flex-col items-center justify-center p-4 overflow-hidden"
                    role="img"
                    aria-label="GPS receiver orbital satellite triangulation schematic"
                  >
                    <div className="absolute inset-0 blueprint-grid opacity-30 pointer-events-none" />

                    {/* Orbital Triangulation Vector */}
                    <div className="relative z-10 flex flex-col items-center">
                      <div className="flex justify-between w-44 mb-2">
                        <Satellite className="w-5 h-5 text-[var(--accent-signal)] animate-bounce" />
                        <Satellite className="w-5 h-5 text-[var(--accent-signal)]" />
                        <Satellite className="w-5 h-5 text-[var(--accent-signal)]" />
                      </div>

                      {/* Triangulation Converging Rays */}
                      <div className="w-32 h-16 border-b-2 border-x-2 border-dashed border-[var(--accent-signal)] rounded-b-full flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-[#10B981] animate-ping" />
                      </div>

                      {/* UAV Ground / Flight Point */}
                      <div className="mt-2 p-2 rounded-lg bg-[#0F172A] text-white font-mono text-[9px] text-center shadow-md">
                        <span className="font-bold text-[#38BDF8]">LAT / LON / ALT</span>
                        <div className="text-[7px] text-[#A7F3D0]">±0.5m Precision</div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-[var(--divider)] font-mono text-[10px] text-[var(--text-muted)] flex justify-between">
                    <span>Multi-Band: L1 / L5</span>
                    <span className="text-[var(--accent-signal)] font-semibold">RTK / GNSS READY</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </section>


        {/* ================= 5. SENSOR FUSION EXPLAINER (TIER 2 INTERACTIVE TOOL) ================= */}
        <section id="section-sensor-fusion" className="mb-20 pt-12 border-t border-[var(--divider)] scroll-mt-32">
          <div className="mb-8">
            <SectionHeading
              eyebrow="avionics integration & sensor fusion"
              title="Sensor Fusion Explainer"
              subtitle="Explore how the flight controller blends multiple sensor streams and handles partial sensor failure."
            />
          </div>

          {/* Embedded Tier 2 Sensor Fusion Tool */}
          <SensorFusionTool />
        </section>

        {/* ================= 6. MODULE FOOTER NAVIGATION ================= */}
        <footer className="pt-8 border-t border-[var(--divider)] flex flex-col sm:flex-row items-center justify-between gap-4">
          
          <button
            type="button"
            onClick={onNavigatePrev}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full text-sm font-semibold font-body text-[var(--text-secondary)] bg-[var(--bg-primary)] hover:bg-[var(--bg-elevated)] border border-[var(--divider)] transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous: Module 3</span>
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
              {isAssessmentPassed ? 'Module 4 Completed ✓ · Score Saved' : 'Submit assessment to unlock Module 5'}
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
