import React, { useState } from 'react';
import { Layers, Info, Check, Sparkles, Box } from 'lucide-react';
import { modulesData } from '../data/curriculumData';
import Drone3DViewer from './Drone3DViewer';

export default function DroneTypeComparator({ className = "" }) {
  const moduleData = modulesData["mod-drone-types"];
  const [quadFrame, setQuadFrame] = useState("x-frame");

  return (
    <div className={`w-full ${className}`}>
      
      {/* ================= 3-CARD MULTIROTOR COMPARISON GRID (INTERACTIVE 3D MODELS) ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12 items-stretch">
        
        {/* ================= CARD 1: QUADCOPTER ================= */}
        <div className="flex flex-col justify-between p-6 rounded-2xl bg-[var(--bg-primary)] border border-[var(--divider)] shadow-card hover:border-[#CBD5E1] transition-all">
          <div className="flex-1 flex flex-col mb-6">
            {/* Header / Stats */}
            <div className="flex items-center justify-between mb-4">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--accent-signal)] bg-[var(--accent-signal-subtle)] px-2.5 py-1 rounded-md border border-[#BFDBFE]">
                TYPE 01
              </span>
              <span className="font-mono text-lg font-bold text-[var(--accent-signal)]">
                4 rotors
              </span>
            </div>

            <h3 className="font-display text-xl font-bold text-[var(--text-primary)] mb-2">
              Quadcopter
            </h3>

            <p className="font-body text-xs sm:text-[13px] text-[var(--text-secondary)] leading-relaxed min-h-[72px]">
              A multirotor drone with four rotors that provides stable and efficient flight for general-purpose applications. Quadcopters are commonly available in X-frame and + (plus) frame configurations, with the X-frame being the most widely used.
            </p>
          </div>

          {/* 3D Interactive Viewport with Frame Switcher */}
          <div className="relative h-64 rounded-xl bg-[var(--bg-elevated)] border border-[var(--divider)] flex flex-col justify-between p-2 overflow-hidden shadow-xs">
            <div className="absolute inset-0 blueprint-grid opacity-30 pointer-events-none" />
            
            {/* Frame Configuration Selector Tabs */}
            <div className="relative z-20 w-full p-0.5 rounded-lg bg-[var(--bg-primary)]/90 backdrop-blur-sm border border-[var(--divider)] flex items-center gap-1 shadow-xs">
              <button
                type="button"
                onClick={() => setQuadFrame("x-frame")}
                className={`flex-1 py-1 px-2 rounded-md text-[11px] font-semibold font-body transition-all focus-visible:ring-2 focus-visible:ring-[var(--border-focus)] ${
                  quadFrame === "x-frame"
                    ? "bg-[var(--accent-signal)] text-white shadow-xs"
                    : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                }`}
              >
                X-Frame (Standard)
              </button>
              <button
                type="button"
                onClick={() => setQuadFrame("plus-frame")}
                className={`flex-1 py-1 px-2 rounded-md text-[11px] font-semibold font-body transition-all focus-visible:ring-2 focus-visible:ring-[var(--border-focus)] ${
                  quadFrame === "plus-frame"
                    ? "bg-[var(--accent-signal)] text-white shadow-xs"
                    : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                }`}
              >
                + (Plus) Frame
              </button>
            </div>

            {/* Interactive 3D Canvas */}
            <div className="relative flex-1 w-full h-full min-h-[170px]">
              <Drone3DViewer 
                type={quadFrame === 'x-frame' ? 'quad-x' : 'quad-plus'} 
                key={quadFrame}
              />
            </div>
          </div>
        </div>


        {/* ================= CARD 2: HEXACOPTER ================= */}
        <div className="flex flex-col justify-between p-6 rounded-2xl bg-[var(--bg-primary)] border border-[var(--divider)] shadow-card hover:border-[#CBD5E1] transition-all">
          <div className="flex-1 flex flex-col mb-6">
            {/* Header / Stats */}
            <div className="flex items-center justify-between mb-4">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--accent-signal)] bg-[var(--accent-signal-subtle)] px-2.5 py-1 rounded-md border border-[#BFDBFE]">
                TYPE 02
              </span>
              <span className="font-mono text-lg font-bold text-[var(--accent-signal)]">
                6 rotors
              </span>
            </div>

            <h3 className="font-display text-xl font-bold text-[var(--text-primary)] mb-2">
              Hexacopter
            </h3>

            <p className="font-body text-xs sm:text-[13px] text-[var(--text-secondary)] leading-relaxed min-h-[72px]">
              A multirotor drone with six rotors, offering greater stability, lifting capacity, and redundancy than a quadcopter. If one motor fails in flight, a hexacopter can maintain controlled emergency landing capability.
            </p>
          </div>

          {/* 3D Interactive Viewport */}
          <div className="relative h-64 rounded-xl bg-[var(--bg-elevated)] border border-[var(--divider)] flex flex-col justify-between p-2 overflow-hidden shadow-xs">
            <div className="absolute inset-0 blueprint-grid opacity-30 pointer-events-none" />

            <div className="relative z-20 w-full py-1 px-2 rounded-md bg-[var(--bg-primary)]/90 backdrop-blur-sm border border-[var(--divider)] text-center font-mono text-[11px] font-semibold text-[var(--accent-signal)] shadow-xs">
              Radial 6 Configuration
            </div>

            <div className="relative flex-1 w-full h-full min-h-[170px]">
              <Drone3DViewer type="hexa" />
            </div>
          </div>
        </div>


        {/* ================= CARD 3: OCTOCOPTER ================= */}
        <div className="flex flex-col justify-between p-6 rounded-2xl bg-[var(--bg-primary)] border border-[var(--divider)] shadow-card hover:border-[#CBD5E1] transition-all">
          <div className="flex-1 flex flex-col mb-6">
            {/* Header / Stats */}
            <div className="flex items-center justify-between mb-4">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--accent-signal)] bg-[var(--accent-signal-subtle)] px-2.5 py-1 rounded-md border border-[#BFDBFE]">
                TYPE 03
              </span>
              <span className="font-mono text-lg font-bold text-[var(--accent-signal)]">
                8 rotors
              </span>
            </div>

            <h3 className="font-display text-xl font-bold text-[var(--text-primary)] mb-2">
              Octocopter
            </h3>

            <p className="font-body text-xs sm:text-[13px] text-[var(--text-secondary)] leading-relaxed min-h-[72px]">
              A multirotor drone with eight rotors, designed for heavy payloads, maximum stability, and improved flight safety. Capable of carrying high-end cinema gimbals and heavy industrial equipment.
            </p>
          </div>

          {/* 3D Interactive Viewport */}
          <div className="relative h-64 rounded-xl bg-[var(--bg-elevated)] border border-[var(--divider)] flex flex-col justify-between p-2 overflow-hidden shadow-xs">
            <div className="absolute inset-0 blueprint-grid opacity-30 pointer-events-none" />

            <div className="relative z-20 w-full py-1 px-2 rounded-md bg-[var(--bg-primary)]/90 backdrop-blur-sm border border-[var(--divider)] text-center font-mono text-[11px] font-semibold text-[var(--accent-signal)] shadow-xs">
              Radial 8 Configuration
            </div>

            <div className="relative flex-1 w-full h-full min-h-[170px]">
              <Drone3DViewer type="octo-x" />
            </div>
          </div>
        </div>

      </div>


      {/* ================= OCTOCOPTER CONFIGURATIONS: 3D SCHEMATICS & DATA MATRIX ================= */}
      <div className="p-6 sm:p-8 rounded-2xl bg-[var(--bg-elevated)] border border-[var(--divider)] shadow-xs mb-10">
        
        {/* Table Header / Informational Note */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 mb-6 border-b border-[var(--divider)] gap-4">
          <div>
            <div className="font-mono text-[11px] font-bold tracking-wider uppercase text-[var(--accent-signal)] mb-1 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[var(--accent-signal)]" />
              <span>SPECIFICATION & INTERACTIVE 3D CONFIGURATIONS</span>
            </div>
            <h4 className="font-display text-xl sm:text-2xl font-bold text-[var(--text-primary)]">
              Octocopter Structural Configurations
            </h4>
          </div>

          {/* Visual Note Pill */}
          <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-[var(--accent-signal-subtle)] border border-[#BFDBFE] text-xs font-body text-[var(--accent-signal-deep)] max-w-lg">
            <Info className="w-4 h-4 text-[var(--accent-signal)] shrink-0" />
            <span>{moduleData.octocopter_table.note}</span>
          </div>
        </div>

        {/* 4-Card 3D Interactive Viewports for Octocopter Configurations */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {[
            { type: "Octo-X", arms: "8", motors: "8", modelType: "octo-x", desc: "8 arms radiating in X geometry" },
            { type: "Octo Plus", arms: "8", motors: "8", modelType: "octo-plus", desc: "8 arms along cardinal + diagonal axes" },
            { type: "X8 Coaxial", arms: "4", motors: "8", modelType: "octo-x8", desc: "4 X-arms with 2 stacked motors per arm" },
            { type: "X8+ Coaxial", arms: "4", motors: "8", modelType: "octo-x8-plus", desc: "4 Plus-arms with 2 stacked motors per arm" }
          ].map((item, idx) => (
            <div 
              key={idx}
              className="p-4 rounded-xl bg-[var(--bg-primary)] border border-[var(--divider)] hover:border-[#CBD5E1] shadow-xs flex flex-col justify-between"
            >
              {/* Header Badge */}
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-[var(--divider)]">
                <span className="font-mono text-xs font-bold text-[var(--accent-signal)]">
                  {item.type}
                </span>
                <span className="font-mono text-[10px] font-semibold text-[var(--text-muted)] bg-[var(--bg-elevated)] px-2 py-0.5 rounded border border-[var(--divider)]">
                  {item.arms} Arms · {item.motors} Motors
                </span>
              </div>

              {/* 3D Interactive Viewport */}
              <div className="relative h-44 rounded-lg bg-[var(--bg-elevated)] border border-[var(--divider)] overflow-hidden mb-3">
                <div className="absolute inset-0 blueprint-grid opacity-30 pointer-events-none" />
                <Drone3DViewer type={item.modelType} showControls={false} />
              </div>

              {/* Description */}
              <div className="font-body text-xs text-[var(--text-secondary)] flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-signal)] shrink-0" />
                <span className="font-medium">{item.desc}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Clean Spec Data Table (WITHOUT visual schematic column per user instruction) */}
        <div className="overflow-x-auto rounded-xl border border-[var(--divider)] bg-[var(--bg-primary)] shadow-xs">
          <table className="w-full text-left border-collapse font-body">
            <thead>
              <tr className="border-b-2 border-[var(--divider)] bg-[var(--bg-surface-subtle)]">
                <th className="py-3.5 px-4 font-mono text-xs font-bold uppercase tracking-wider text-[var(--text-primary)]">
                  Type
                </th>
                <th className="py-3.5 px-4 font-mono text-xs font-bold uppercase tracking-wider text-[var(--text-primary)]">
                  Arms
                </th>
                <th className="py-3.5 px-4 font-mono text-xs font-bold uppercase tracking-wider text-[var(--text-primary)]">
                  Motors
                </th>
                <th className="py-3.5 px-4 font-mono text-xs font-bold uppercase tracking-wider text-[var(--text-primary)]">
                  Configuration Details
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--divider)] bg-[var(--bg-primary)]">
              {moduleData.octocopter_table.rows.map((row, idx) => (
                <tr key={idx} className="hover:bg-[var(--bg-surface-subtle)] transition-colors">
                  {/* Type */}
                  <td className="py-3.5 px-4 font-mono text-xs sm:text-sm font-bold text-[var(--accent-signal)]">
                    {row.type}
                  </td>

                  {/* Arms */}
                  <td className="py-3.5 px-4 font-mono text-xs sm:text-sm text-[var(--text-primary)]">
                    <span className="font-semibold">{row.arms}</span> arms
                  </td>

                  {/* Motors */}
                  <td className="py-3.5 px-4 font-mono text-xs sm:text-sm text-[var(--text-primary)]">
                    <span className="font-semibold">{row.motors}</span> motors
                  </td>

                  {/* Configuration */}
                  <td className="py-3.5 px-4 font-body text-xs sm:text-sm text-[var(--text-secondary)]">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[var(--accent-signal)] shrink-0" />
                      <span className="font-medium text-[var(--text-primary)]">{row.configuration}</span>
                    </div>
                    {row.type.includes("Coaxial") && (
                      <span className="font-mono text-[10px] text-[var(--accent-signal)] block mt-0.5 pl-4">
                        (Stacked contra-rotating motor pair)
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

    </div>
  );
}
