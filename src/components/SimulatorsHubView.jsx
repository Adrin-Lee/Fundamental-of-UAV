import React, { useState } from 'react';
import { 
  Sliders, 
  RotateCw, 
  Wind, 
  Activity, 
  ShieldCheck, 
  Battery, 
  Layers, 
  ArrowRight,
  ExternalLink,
  ChevronRight,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

import RollPitchYawSimulator from './RollPitchYawSimulator';
import FlightModePlayground from './FlightModePlayground';
import ForceBalanceSimulator from './ForceBalanceSimulator';
import SensorFusionTool from './SensorFusionTool';
import DGCAZoneChecker from './DGCAZoneChecker';
import BatteryCalculator from './BatteryCalculator';

export default function SimulatorsHubView({ 
  onNavigateHome, 
  onNavigateCurriculum, 
  onNavigateModule1,
  onNavigateModule2,
  onNavigateModule3,
  onNavigateModule4,
  onNavigateModule5,
  onNavigateModule6,
  onNavigateModule7,
  onNavigateModule8
}) {
  const [activeSim, setActiveSim] = useState('battery');

  const simulators = [
    {
      id: 'battery',
      name: 'Battery Pack S/P Calculator',
      shortName: 'Battery S/P',
      tag: 'POWER ENGINEERING TOOL',
      badge: 'Power & LiPo',
      icon: Battery,
      moduleNumber: 'Module 03',
      moduleTitle: 'Drone Components & Power',
      desc: 'Compute total series voltage (S), parallel capacity (P), energy density (Wh), and continuous discharge ampacity for UAV propulsion battery packs.',
      navigateModuleAction: onNavigateModule3,
      component: <BatteryCalculator />
    },
    {
      id: 'sensor-fusion',
      name: 'Sensor Fusion & Autopilot Fail-safe',
      shortName: 'Sensor Fusion',
      tag: 'TIER 2 AVIONICS SIMULATOR',
      badge: 'Avionics EKF',
      icon: Activity,
      moduleNumber: 'Module 04',
      moduleTitle: 'Flight Controller & Sensors',
      desc: 'Interactive 6-channel sensor dependency and fault cascade tool modeling IMU, Barometer, Magnetometer, and GPS state estimation.',
      navigateModuleAction: onNavigateModule4,
      component: <SensorFusionTool />
    },
    {
      id: 'forces',
      name: '4-Force Aerodynamic Balance',
      shortName: 'Force Balance',
      tag: 'TIER 1 PHYSICS SIMULATOR',
      badge: 'Aerodynamics',
      icon: Wind,
      moduleNumber: 'Module 05',
      moduleTitle: 'Fundamentals of UAV Flight Forces',
      desc: 'Dynamic flight vector simulator computing Lift vs Weight and Thrust vs Drag in multirotor, fixed-wing, and hybrid VTOL aircraft.',
      navigateModuleAction: onNavigateModule5,
      component: <ForceBalanceSimulator />
    },
    {
      id: 'flight-modes',
      name: 'Flight-Mode Playground',
      shortName: 'Flight Modes',
      tag: 'TIER 1 2D SIMULATOR',
      badge: 'Autopilot',
      icon: Sliders,
      moduleNumber: 'Module 06',
      moduleTitle: 'Flight Modes on UAV',
      desc: 'Top-down mission simulation testing Loiter (GPS hold), Auto (waypoint track), Land, RTL (return-to-launch), and Altitude Hold flight controller behaviors.',
      navigateModuleAction: onNavigateModule6,
      component: <FlightModePlayground />
    },
    {
      id: 'rpy',
      name: '3D Attitude Kinematics',
      shortName: '3D Attitude',
      tag: 'TIER 1 3D SIMULATOR',
      badge: '3D Physics',
      icon: RotateCw,
      moduleNumber: 'Module 07',
      moduleTitle: 'UAV Attitude & Axis Movement',
      desc: 'Interactive Three.js 3D quadcopter simulating differential motor thrust, counter-torque cancellation, and roll/pitch/yaw spatial rotations.',
      navigateModuleAction: onNavigateModule7,
      component: <RollPitchYawSimulator />
    },
    {
      id: 'dgca',
      name: 'DGCA Zone & Altitude Distance Checker',
      shortName: 'DGCA Zones',
      tag: 'TIER 2 COMPLIANCE TOOL',
      badge: 'Airspace',
      icon: ShieldCheck,
      moduleNumber: 'Module 08',
      moduleTitle: 'DGCA Regulations',
      desc: 'Statutory airspace calculator computing Green, Yellow, and Red zones, airport approach buffer altitudes, and ATC clearance rules based on distance.',
      navigateModuleAction: onNavigateModule8,
      component: <DGCAZoneChecker />
    }
  ];

  const currentSimulator = simulators.find(s => s.id === activeSim) || simulators[0];

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[var(--bg-primary)] py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ================= 1. COMPACT PAGE HEADER ================= */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 mb-6 border-b border-[var(--divider)] gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-[var(--accent-signal)]" />
              <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[var(--accent-signal)]">
                UAV FLIGHT DYNAMICS · SIMULATION SUITE
              </span>
              <span className="text-[var(--divider)]">·</span>
              <span className="font-mono text-[11px] text-[#059669] font-bold bg-[#ECFDF5] px-2 py-0.5 rounded-full border border-[#A7F3D0]">
                6 Live Tools
              </span>
            </div>
            <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[var(--text-primary)]">
              Simulators & Engineering Workbench
            </h1>
          </div>

          <button
            type="button"
            onClick={onNavigateCurriculum}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--bg-elevated)] border border-[var(--divider)] hover:border-[var(--accent-signal)] text-[var(--text-primary)] font-mono text-xs font-semibold shadow-2xs transition-all self-start sm:self-auto shrink-0"
          >
            <Layers className="w-3.5 h-3.5 text-[var(--accent-signal)]" />
            <span>Curriculum Flashcards</span>
            <ChevronRight className="w-3.5 h-3.5 text-[var(--text-muted)]" />
          </button>
        </div>

        {/* ================= 2. TOP HORIZONTAL SIMULATOR SELECTOR GRID ================= */}
        <div className="mb-6">
          <div className="flex items-center justify-between px-1 mb-2.5">
            <span className="font-mono text-[11px] font-bold text-[var(--text-muted)] uppercase tracking-wider">
              Select Simulation (Top Bar)
            </span>
            <span className="font-mono text-[10px] text-[var(--accent-signal)] font-semibold">
              Click any tool to load below
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {simulators.map((sim) => {
              const Icon = sim.icon;
              const isSelected = activeSim === sim.id;
              return (
                <button
                  key={sim.id}
                  type="button"
                  onClick={() => setActiveSim(sim.id)}
                  className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between group relative focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--border-focus)] ${
                    isSelected
                      ? 'bg-[var(--accent-signal-subtle)] border-[var(--accent-signal)] shadow-sm ring-1 ring-[var(--accent-signal)]'
                      : 'bg-[var(--bg-elevated)] border-[var(--divider)] hover:border-[var(--accent-signal)] hover:bg-[var(--bg-surface-subtle)]'
                  }`}
                >
                  {/* Top line: Icon & Module Code */}
                  <div className="flex items-center justify-between mb-2">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                      isSelected 
                        ? 'bg-[var(--accent-signal)] text-white shadow-xs' 
                        : 'bg-[var(--bg-primary)] border border-[var(--divider)] text-[var(--accent-signal)] group-hover:bg-[var(--accent-signal-subtle)]'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>

                    <span className="font-mono text-[9px] font-bold text-[var(--accent-signal)] uppercase">
                      {sim.moduleNumber}
                    </span>
                  </div>

                  {/* Simulator Name & Badge */}
                  <div>
                    <h3 className="font-display text-xs font-bold text-[var(--text-primary)] leading-tight mb-1 truncate">
                      {sim.name}
                    </h3>
                    <div className="flex items-center justify-between">
                      <span className={`font-mono text-[8.5px] px-1.5 py-0.5 rounded font-semibold ${
                        isSelected ? 'bg-white text-[var(--accent-signal-deep)]' : 'bg-[var(--bg-primary)] text-[var(--text-muted)]'
                      }`}>
                        {sim.badge}
                      </span>
                      {isSelected && (
                        <span className="w-2 h-2 rounded-full bg-[var(--accent-signal)]" />
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* ================= 3. SELECTED SIMULATION WORKSPACE BELOW (FULL WIDTH) ================= */}
        <div className="flex flex-col gap-4">
          
          {/* Active Tool Header Context Bar */}
          <div className="p-4 rounded-xl bg-[var(--bg-elevated)] border border-[var(--divider)] flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
            <div className="flex items-start sm:items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-[var(--accent-signal)] text-white flex items-center justify-center shrink-0 shadow-xs">
                {React.createElement(currentSimulator.icon, { className: 'w-4 h-4' })}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] font-bold text-[var(--accent-signal)] uppercase tracking-wider">
                    {currentSimulator.tag}
                  </span>
                  <span className="text-[var(--divider)]">·</span>
                  <span className="font-mono text-[10px] text-[var(--text-muted)] font-semibold">
                    {currentSimulator.moduleNumber}: {currentSimulator.moduleTitle}
                  </span>
                </div>
                <h2 className="font-display text-lg sm:text-xl font-bold text-[var(--text-primary)]">
                  {currentSimulator.name}
                </h2>
                <p className="font-body text-xs text-[var(--text-secondary)] mt-0.5 max-w-3xl">
                  {currentSimulator.desc}
                </p>
              </div>
            </div>

            {/* Jump to Module Quick Link */}
            <button
              type="button"
              onClick={currentSimulator.navigateModuleAction}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--bg-primary)] border border-[var(--divider)] hover:border-[var(--accent-signal)] hover:text-[var(--accent-signal)] font-mono text-xs font-semibold text-[var(--text-secondary)] transition-all shadow-2xs self-start sm:self-auto shrink-0"
            >
              <span>Study {currentSimulator.moduleNumber}</span>
              <ExternalLink className="w-3 h-3 text-[var(--accent-signal)]" />
            </button>
          </div>

          {/* Main Full-Width Interactive Canvas Area */}
          <div className="rounded-2xl border border-[var(--divider)] bg-[var(--bg-primary)] p-3 sm:p-6 shadow-xs overflow-hidden">
            {currentSimulator.component}
          </div>

        </div>

      </div>
    </div>
  );
}
