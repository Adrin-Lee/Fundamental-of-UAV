import React from 'react';
import { ArrowUpRight, Wind, Cpu, Compass, ShieldCheck, Clock, CheckCircle2 } from 'lucide-react';

export default function TrackIndex({ onSelectTrack1, onSelectTrack2, onSelectTrack3, onSelectTrack4 }) {
  const tracks = [
    {
      id: "lift",
      number: "01",
      name: "Lift",
      title: "Aerodynamics & Flight Physics",
      description: "How UAVs generate lift, balance the 4 flight forces, cancel counter-torque, and maneuver in 3D space.",
      modulesCount: 3,
      duration: "45 mins",
      icon: Wind,
      accent: "var(--accent-signal)",
      topics: ["Intro & Terminology", "Types of Drones", "Flight Forces & Equilibrium"]
    },
    {
      id: "control",
      number: "02",
      name: "Control",
      title: "Hardware, Electronics & Power",
      description: "Airframe structures, brushless DC motors, ESCs, LiPo battery chemistry, and radio control links.",
      modulesCount: 2,
      duration: "50 mins",
      icon: Cpu,
      accent: "var(--accent-signal)",
      topics: ["Airframe & BLDC Motors", "ESC Selector Topologies", "LiPo Battery Calculator"]
    },
    {
      id: "navigate",
      number: "03",
      name: "Navigate",
      title: "Avionics, Sensors & Flight Modes",
      description: "The Flight Controller brain, IMU sensor fusion, GPS, barometer, and flight modes from Manual to RTH.",
      modulesCount: 3,
      duration: "40 mins",
      icon: Compass,
      accent: "var(--accent-signal)",
      topics: ["FC & IMU Architecture", "Sensor Fusion Explainer", "Flight Modes & 3D Kinematics"]
    },
    {
      id: "comply",
      number: "04",
      name: "Comply",
      title: "DGCA Regulations & Airspace",
      description: "India Drone Rules (2021/2023), Digital Sky portal, Green/Yellow/Red airspace zones, and safety procedures.",
      modulesCount: 1,
      duration: "35 mins",
      icon: ShieldCheck,
      accent: "var(--accent-signal)",
      topics: ["Digital Sky Workflows", "Airspace Zone Rules", "Pilot Certification (RPC)"]
    }
  ];

  return (
    <section id="tracks-section" className="py-16 md:py-20 bg-[var(--bg-elevated)] border-b border-[var(--divider)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-4 border-b border-[var(--divider)] gap-4">
          <div>
            <div className="font-mono text-xs font-semibold tracking-wider text-[var(--accent-signal)] uppercase mb-1.5 flex items-center gap-1.5">
              <span>CORE CURRICULUM</span>
              <span className="text-[var(--divider)]">/</span>
              <span>4 SEQUENTIAL TRACKS</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[var(--text-primary)] tracking-tight">
              Study Modules & Learning Tracks
            </h2>
          </div>
          <p className="font-body text-xs sm:text-sm text-[var(--text-muted)] max-w-md">
            Click any track to enter its modules. Complete all 4 tracks to unlock the Final Assessment Test.
          </p>
        </div>

        {/* 4 Track Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tracks.map((track) => {
            const Icon = track.icon;
            const clickHandler = 
              track.id === 'lift' 
                ? onSelectTrack1 
                : track.id === 'control' 
                  ? onSelectTrack2 
                  : track.id === 'navigate' 
                    ? onSelectTrack3 
                    : onSelectTrack4;

            return (
              <div
                key={track.id}
                onClick={clickHandler}
                className="group relative flex flex-col justify-between p-6 bg-[var(--bg-primary)] rounded-2xl border border-[var(--divider)] hover:border-[#CBD5E1] shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-200 cursor-pointer"
              >
                <div>
                  {/* Card Header: Track Number & Icon */}
                  <div className="flex items-center justify-between mb-5">
                    <span className="font-mono text-2xl font-bold text-[var(--accent-signal)]">
                      {track.number}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-[var(--accent-signal-subtle)] border border-[#BFDBFE] flex items-center justify-center text-[var(--accent-signal)] group-hover:bg-[var(--accent-signal)] group-hover:text-white transition-colors shadow-xs">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Track Sub-Eyebrow */}
                  <div className="font-mono text-[11px] font-bold tracking-wider uppercase text-[var(--accent-signal)] mb-1">
                    TRACK {track.name.toUpperCase()}
                  </div>

                  {/* Track Title */}
                  <h3 className="font-display text-lg font-bold text-[var(--text-primary)] mb-2.5 leading-snug group-hover:text-[var(--accent-signal)] transition-colors">
                    {track.title}
                  </h3>

                  {/* One-Line Description */}
                  <p className="font-body text-xs text-[var(--text-muted)] leading-relaxed mb-6">
                    {track.description}
                  </p>

                  {/* Key Topic Pills */}
                  <div className="space-y-1.5 mb-6 pt-4 border-t border-[var(--divider)]">
                    {track.topics.map((topic, i) => (
                      <div key={i} className="flex items-center gap-2 text-[11px] text-[var(--text-secondary)] font-body">
                        <CheckCircle2 className="w-3 h-3 text-[var(--accent-success)] shrink-0" />
                        <span className="truncate">{topic}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Footer: Metadata & Action CTA */}
                <div className="pt-4 border-t border-[var(--divider)] flex items-center justify-between">
                  <div className="flex items-center gap-3 font-mono text-[11px] text-[var(--text-muted)]">
                    <span>{track.modulesCount} modules</span>
                    <span>·</span>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{track.duration}</span>
                    </div>
                  </div>

                  <span className="inline-flex items-center gap-1 font-body text-xs font-semibold text-[var(--accent-signal)] group-hover:text-[var(--accent-signal-deep)] group-hover:translate-x-0.5 transition-all">
                    <span>Enter Track</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
