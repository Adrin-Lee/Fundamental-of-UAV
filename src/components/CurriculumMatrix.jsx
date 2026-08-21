import React from 'react';
import { 
  Wind, 
  Cpu, 
  Compass, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  Award, 
  BookOpen, 
  Sliders, 
  Layers,
  Sparkles,
  ChevronRight
} from 'lucide-react';

export default function CurriculumMatrix({
  onSelectModule1,
  onSelectModule2,
  onSelectModule3,
  onSelectModule4,
  onSelectModule5,
  onSelectModule6,
  onSelectModule7,
  onSelectModule8,
  onSelectFinalAssessment,
  onSelectGlossary
}) {
  const getCompletionStatus = (modId) => {
    try {
      if (modId === 'mod-types-of-drones' || modId === 'mod-drone-types') {
        return (
          localStorage.getItem('asteria_module_mod-types-of-drones') === 'completed' ||
          localStorage.getItem('asteria_module_mod-drone-types') === 'completed' ||
          localStorage.getItem('learning_mod-types-of-drones') === 'completed' ||
          localStorage.getItem('learning_mod-drone-types') === 'completed'
        );
      }
      return localStorage.getItem(`asteria_module_${modId}`) === 'completed' ||
             localStorage.getItem(`learning_${modId}`) === 'completed';
    } catch {
      return false;
    }
  };

  const tracks = [
    {
      id: "lift",
      number: "TRACK 01",
      name: "Lift · Aerodynamics & Airframe Physics",
      color: "var(--accent-signal)",
      bgSubtle: "var(--accent-signal-subtle)",
      border: "#BFDBFE",
      icon: Wind,
      modules: [
        {
          id: "mod-intro-terminology",
          number: "MOD 01",
          title: "Introduction & Drone Terminology",
          desc: "UAV/UAS definitions, fundamental multirotor aerodynamics, and core technical glossary.",
          duration: "15 mins",
          routeAction: onSelectModule1
        },
        {
          id: "mod-types-of-drones",
          number: "MOD 02",
          title: "Types of Drones & Airframe Architectures",
          desc: "Single-rotor, multirotor (+ and X frames), fixed-wing, and hybrid VTOL aerodynamic comparisons.",
          duration: "20 mins",
          routeAction: onSelectModule2
        },
        {
          id: "mod-flight-forces",
          number: "MOD 05",
          title: "Fundamentals of UAV Flight Forces",
          desc: "Lift, Weight, Thrust, and Drag equilibrium across multirotor, VTOL, and fixed-wing aircraft.",
          duration: "25 mins",
          routeAction: onSelectModule5
        }
      ]
    },
    {
      id: "control",
      number: "TRACK 02",
      name: "Control · Hardware, Electronics & Power",
      color: "var(--accent-signal)",
      bgSubtle: "var(--accent-signal-subtle)",
      border: "#BFDBFE",
      icon: Cpu,
      modules: [
        {
          id: "mod-drone-components",
          number: "MOD 03",
          title: "Drone Components & Propulsion Systems",
          desc: "Carbon airframes, landing gear, BLDC motors, ESC topologies, LiPo chemistry, and GPS navigation.",
          duration: "30 mins",
          routeAction: onSelectModule3
        }
      ]
    },
    {
      id: "navigate",
      number: "TRACK 03",
      name: "Navigate · Avionics, Sensors & Kinematics",
      color: "var(--accent-signal)",
      bgSubtle: "var(--accent-signal-subtle)",
      border: "#BFDBFE",
      icon: Compass,
      modules: [
        {
          id: "mod-fc-sensors",
          number: "MOD 04",
          title: "Flight Controller & Sensor Fusion",
          desc: "IMU, barometer, magnetometer, GPS, sensor fusion state estimation, and failsafe cascades.",
          duration: "35 mins",
          routeAction: onSelectModule4
        },
        {
          id: "mod-flight-modes",
          number: "MOD 06",
          title: "Flight Modes on UAV",
          desc: "Loiter, Auto, Land, RTL, and Alt Hold operating states with live 2D top-down simulation playground.",
          duration: "20 mins",
          routeAction: onSelectModule6
        },
        {
          id: "mod-attitude-kinematics",
          number: "MOD 07",
          title: "UAV Attitude & Axis Movement",
          desc: "Longitudinal (Roll), Lateral (Pitch), and Vertical (Yaw) 3-axis kinematics with 3D gimbal simulator.",
          duration: "25 mins",
          routeAction: onSelectModule7
        }
      ]
    },
    {
      id: "comply",
      number: "TRACK 04",
      name: "Comply · DGCA Regulations & Airspace Safety",
      color: "#059669",
      bgSubtle: "#ECFDF5",
      border: "#A7F3D0",
      icon: ShieldCheck,
      modules: [
        {
          id: "mod-dgca-rules",
          number: "MOD 08",
          title: "DGCA Regulations & Airspace Zones",
          desc: "Drone Rules 2021, Green/Yellow/Red airspace classifications, altitude buffers, and distance checker.",
          duration: "25 mins",
          routeAction: onSelectModule8
        }
      ]
    }
  ];

  return (
    <div className="py-12 bg-[var(--bg-primary)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-6 mb-10 border-b border-[var(--divider)] gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[var(--accent-signal)]" />
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--accent-signal)]">
                DRONE SYSTEMS · COMPLETE CURRICULUM DIRECTORY
              </span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">
              All 8 Study Modules & Learning Tracks
            </h2>
          </div>
          
          <button
            type="button"
            onClick={onSelectFinalAssessment}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#059669] hover:bg-[#047857] text-white font-display text-xs font-bold shadow-brand transition-all"
          >
            <Award className="w-4 h-4" />
            <span>Final Assessment Test</span>
          </button>
        </div>

        {/* 4 Track Tracks Container */}
        <div className="space-y-12 mb-14">
          {tracks.map((track) => {
            const Icon = track.icon;
            return (
              <div key={track.id} className="p-6 sm:p-8 rounded-2xl bg-[var(--bg-elevated)] border border-[var(--divider)] shadow-xs">
                
                {/* Track Title Bar */}
                <div className="flex items-center gap-3 pb-4 mb-6 border-b border-[var(--divider)]">
                  <div className="w-10 h-10 rounded-xl bg-[var(--bg-primary)] border border-[var(--divider)] flex items-center justify-center text-[var(--accent-signal)] shadow-2xs">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] block">
                      {track.number}
                    </span>
                    <h3 className="font-display text-lg sm:text-xl font-bold text-[var(--text-primary)]">
                      {track.name}
                    </h3>
                  </div>
                </div>

                {/* Modules Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {track.modules.map((mod) => {
                    const isDone = getCompletionStatus(mod.id);
                    return (
                      <div
                        key={mod.id}
                        onClick={mod.routeAction}
                        className="p-5 rounded-xl bg-[var(--bg-primary)] border border-[var(--divider)] hover:border-[var(--accent-signal)] shadow-2xs hover:shadow-card hover:-translate-y-0.5 transition-all cursor-pointer flex flex-col justify-between group"
                      >
                        <div>
                          <div className="flex items-center justify-between mb-3">
                            <span className="font-mono text-xs font-bold text-[var(--accent-signal)] bg-[var(--accent-signal-subtle)] px-2.5 py-0.5 rounded-md border border-[#BFDBFE]">
                              {mod.number}
                            </span>
                            {isDone ? (
                              <span className="inline-flex items-center gap-1 font-mono text-[10px] font-bold text-[#047857] bg-[#ECFDF5] px-2 py-0.5 rounded-full border border-[#A7F3D0]">
                                <CheckCircle2 className="w-3 h-3" />
                                <span>Completed</span>
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 font-mono text-[10px] text-[var(--text-muted)]">
                                <Clock className="w-3 h-3" />
                                <span>{mod.duration}</span>
                              </span>
                            )}
                          </div>

                          <h4 className="font-display text-sm sm:text-base font-bold text-[var(--text-primary)] mb-2 group-hover:text-[var(--accent-signal)] transition-colors leading-snug">
                            {mod.title}
                          </h4>

                          <p className="font-body text-xs text-[var(--text-muted)] leading-relaxed mb-4">
                            {mod.desc}
                          </p>
                        </div>

                        <div className="pt-3 border-t border-[var(--divider)] flex items-center justify-between font-mono text-xs text-[var(--accent-signal)] font-semibold">
                          <span>Start Study Session</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    );
                  })}
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
