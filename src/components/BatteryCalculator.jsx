import React, { useState } from 'react';
import { Battery, Zap, Calculator, CheckCircle2, RotateCcw, Sparkles, ArrowRight, ShieldAlert, Sliders } from 'lucide-react';
import { modulesData } from '../data/curriculumData';

/**
 * BatteryCalculator Component (Tier 2 Tool)
 * Calculates S (Series) and P (Parallel) battery pack voltages, capacities, and ratings.
 * Includes conceptual worked examples and live calculation engine.
 * Reusable in Module 3 and standalone at /tools/battery-calculator.
 */
export default function BatteryCalculator({ className = "" }) {
  const batteryData = modulesData["mod-drone-components"].components.battery;

  // Interactive Calculator State
  const [cellVoltage, setCellVoltage] = useState(3.7);
  const [cellCapacity, setCellCapacity] = useState(8000);
  const [seriesCount, setSeriesCount] = useState(6);
  const [parallelCount, setParallelCount] = useState(2);

  // Computed Values
  const totalVoltage = parseFloat((cellVoltage * seriesCount).toFixed(2));
  const totalCapacity = Math.round(cellCapacity * parallelCount);
  const totalWattHours = parseFloat(((totalVoltage * totalCapacity) / 1000).toFixed(1));
  const formattedRating = `${seriesCount}S${parallelCount}P ${totalVoltage}V ${totalCapacity}mAh`;

  // Validation Test Check against source: (6S2P, 3.7V, 8000mAh -> 22.2V, 16000mAh)
  const isDefaultValidated = (
    cellVoltage === 3.7 &&
    cellCapacity === 8000 &&
    seriesCount === 6 &&
    parallelCount === 2 &&
    totalVoltage === 22.2 &&
    totalCapacity === 16000
  );

  const applyPreset = (v, cap, s, p) => {
    setCellVoltage(v);
    setCellCapacity(cap);
    setSeriesCount(s);
    setParallelCount(p);
  };

  const handleResetToSourceExample = () => {
    applyPreset(3.7, 8000, 6, 2);
  };

  return (
    <div className={`p-6 sm:p-8 rounded-2xl bg-[var(--bg-elevated)] border border-[var(--divider)] shadow-card ${className}`}>
      
      {/* Tool Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 mb-8 border-b border-[var(--divider)] gap-4">
        <div>
          <div className="font-mono text-[11px] font-bold tracking-wider uppercase text-[var(--accent-signal)] mb-1 flex items-center gap-1.5">
            <Calculator className="w-3.5 h-3.5 text-[var(--accent-signal)]" />
            <span>INTERACTIVE TOOL · TIER 2</span>
          </div>
          <h3 className="font-display text-2xl font-bold text-[var(--text-primary)]">
            Battery Configuration Calculator
          </h3>
          <p className="font-body text-xs sm:text-sm text-[var(--text-secondary)] mt-1">
            Compute pack voltage, total discharge capacity, and formatted industry battery ratings for Series (S) and Parallel (P) configurations.
          </p>
        </div>

        {/* Source Test Validation Pill */}
        <button
          type="button"
          onClick={handleResetToSourceExample}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[var(--bg-primary)] border border-[var(--divider)] hover:border-[var(--accent-signal)] text-xs font-mono transition-all shadow-xs shrink-0 self-start md:self-auto"
          title="Load Standard Technical Reference Test Case"
        >
          <RotateCcw className="w-3.5 h-3.5 text-[var(--accent-signal)]" />
          <span className="text-[var(--text-secondary)]">Load Source Spec: </span>
          <span className="font-bold text-[var(--accent-signal)]">6S2P Test</span>
        </button>
      </div>

      {/* ================= SECTION 1: EDUCATIONAL WORKED EXAMPLES ================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        
        {/* Card 1: Series Connection */}
        <div className="p-4 rounded-xl bg-[var(--bg-primary)] border border-[var(--divider)] shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="font-display text-sm font-bold text-[var(--text-primary)]">
                Series (S) Connection
              </span>
              <span className="font-mono text-[10px] font-bold text-[var(--accent-signal)] bg-[var(--accent-signal-subtle)] px-2 py-0.5 rounded border border-[#BFDBFE]">
                VOLTAGE ↑
              </span>
            </div>
            <p className="font-body text-xs text-[var(--text-secondary)] leading-relaxed mb-3">
              {batteryData.worked_examples.series.concept}
            </p>
          </div>
          <div className="p-2 rounded-lg bg-[var(--bg-elevated)] border border-[var(--divider)] font-mono text-xs font-semibold text-[var(--accent-signal-deep)]">
            {batteryData.worked_examples.series.formula}
          </div>
        </div>

        {/* Card 2: Parallel Connection */}
        <div className="p-4 rounded-xl bg-[var(--bg-primary)] border border-[var(--divider)] shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="font-display text-sm font-bold text-[var(--text-primary)]">
                Parallel (P) Connection
              </span>
              <span className="font-mono text-[10px] font-bold text-[#047857] bg-[#ECFDF5] px-2 py-0.5 rounded border border-[#A7F3D0]">
                CAPACITY ↑
              </span>
            </div>
            <p className="font-body text-xs text-[var(--text-secondary)] leading-relaxed mb-3">
              {batteryData.worked_examples.parallel.concept}
            </p>
          </div>
          <div className="p-2 rounded-lg bg-[var(--bg-elevated)] border border-[var(--divider)] font-mono text-xs font-semibold text-[#047857]">
            {batteryData.worked_examples.parallel.formula}
          </div>
        </div>

        {/* Card 3: Series-Parallel Combined (Verbatim Source Worked Example) */}
        <div className="p-4 rounded-xl bg-[var(--bg-primary)] border border-[var(--accent-signal)]/40 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="font-display text-sm font-bold text-[var(--text-primary)]">
                Series-Parallel (S+P)
              </span>
              <span className="font-mono text-[10px] font-bold text-[var(--accent-signal)] bg-[var(--accent-signal-subtle)] px-2 py-0.5 rounded border border-[#BFDBFE]">
                V + mAh ↑
              </span>
            </div>
            <p className="font-body text-xs text-[var(--text-secondary)] leading-relaxed mb-2">
              {batteryData.worked_examples.series_parallel.concept}
            </p>
          </div>
          <div className="p-2.5 rounded-lg bg-[var(--bg-elevated)] border border-[var(--divider)] font-mono text-[11px] leading-tight space-y-1 text-[var(--text-primary)]">
            <div className="text-[var(--accent-signal)] font-semibold">{batteryData.worked_examples.series_parallel.voltage_calc}</div>
            <div className="text-[#047857] font-semibold">{batteryData.worked_examples.series_parallel.capacity_calc}</div>
            <div className="text-[var(--text-primary)] font-bold pt-1 border-t border-[var(--divider)]">
              {batteryData.worked_examples.series_parallel.rating}
            </div>
          </div>
        </div>

      </div>


      {/* ================= SECTION 2: LIVE CALCULATOR ENGINE ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Inputs Column (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          <div className="p-5 rounded-xl bg-[var(--bg-primary)] border border-[var(--divider)] shadow-xs">
            
            <h4 className="font-display text-base font-bold text-[var(--text-primary)] mb-4 flex items-center gap-2">
              <Sliders className="w-4 h-4 text-[var(--accent-signal)]" />
              <span>Pack Parameter Inputs</span>
            </h4>

            {/* Input 1: Cell Chemistry & Nominal Voltage */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="cell-voltage-input" className="font-body text-xs font-semibold text-[var(--text-primary)]">
                  Cell Nominal Voltage (V)
                </label>
                <span className="font-mono text-xs font-bold text-[var(--accent-signal)]">
                  {cellVoltage} V / cell
                </span>
              </div>
              
              {/* Chemistry Quick Presets */}
              <div className="grid grid-cols-3 gap-2 mb-2">
                {[
                  { label: "LiPo (3.7V)", val: 3.7 },
                  { label: "LiHV (3.8V)", val: 3.8 },
                  { label: "Li-ion (3.6V)", val: 3.6 }
                ].map((chem) => (
                  <button
                    key={chem.val}
                    type="button"
                    onClick={() => setCellVoltage(chem.val)}
                    className={`py-1.5 px-2 rounded-lg text-xs font-mono transition-all ${
                      cellVoltage === chem.val
                        ? 'bg-[var(--accent-signal)] text-white font-bold shadow-xs'
                        : 'bg-[var(--bg-elevated)] text-[var(--text-secondary)] hover:bg-[var(--bg-surface-subtle)] border border-[var(--divider)]'
                    }`}
                  >
                    {chem.label}
                  </button>
                ))}
              </div>

              <input
                id="cell-voltage-input"
                type="range"
                min="3.0"
                max="4.4"
                step="0.05"
                value={cellVoltage}
                onChange={(e) => setCellVoltage(parseFloat(e.target.value))}
                className="w-full h-2 bg-[var(--bg-elevated)] rounded-lg appearance-none cursor-pointer accent-[var(--accent-signal)]"
              />
            </div>

            {/* Input 2: Individual Cell Capacity */}
            <div className="mb-4 pt-3 border-t border-[var(--divider)]">
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="cell-cap-input" className="font-body text-xs font-semibold text-[var(--text-primary)]">
                  Individual Cell Capacity (mAh)
                </label>
                <span className="font-mono text-xs font-bold text-[var(--accent-signal)]">
                  {cellCapacity} mAh
                </span>
              </div>

              {/* Quick Capacity Buttons */}
              <div className="grid grid-cols-4 gap-2 mb-2">
                {[2200, 5000, 8000, 16000].map((cap) => (
                  <button
                    key={cap}
                    type="button"
                    onClick={() => setCellCapacity(cap)}
                    className={`py-1.5 px-1 rounded-lg text-[11px] font-mono transition-all ${
                      cellCapacity === cap
                        ? 'bg-[var(--accent-signal)] text-white font-bold shadow-xs'
                        : 'bg-[var(--bg-elevated)] text-[var(--text-secondary)] hover:bg-[var(--bg-surface-subtle)] border border-[var(--divider)]'
                    }`}
                  >
                    {cap} mAh
                  </button>
                ))}
              </div>

              <input
                id="cell-cap-input"
                type="number"
                min="500"
                max="50000"
                step="100"
                value={cellCapacity}
                onChange={(e) => setCellCapacity(Math.max(100, parseInt(e.target.value) || 0))}
                className="w-full py-1.5 px-3 rounded-lg bg-[var(--bg-elevated)] border border-[var(--divider)] font-mono text-xs text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--border-focus)]"
              />
            </div>

            {/* Input 3 & 4: Series (S) and Parallel (P) Counts */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-[var(--divider)]">
              
              {/* Series Count */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label htmlFor="series-count-input" className="font-body text-xs font-semibold text-[var(--text-primary)]">
                    Series Count (S)
                  </label>
                  <span className="font-mono text-xs font-bold text-[var(--accent-signal)]">
                    {seriesCount}S
                  </span>
                </div>
                <div className="flex items-center gap-1.5 mb-2">
                  {[1, 2, 3, 4, 6, 12].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSeriesCount(s)}
                      className={`flex-1 py-1 rounded text-xs font-mono font-semibold ${
                        seriesCount === s
                          ? 'bg-[var(--accent-signal)] text-white'
                          : 'bg-[var(--bg-elevated)] text-[var(--text-muted)] border border-[var(--divider)]'
                      }`}
                    >
                      {s}S
                    </button>
                  ))}
                </div>
                <input
                  id="series-count-input"
                  type="range"
                  min="1"
                  max="24"
                  value={seriesCount}
                  onChange={(e) => setSeriesCount(parseInt(e.target.value))}
                  className="w-full h-2 bg-[var(--bg-elevated)] rounded-lg appearance-none cursor-pointer accent-[var(--accent-signal)]"
                />
              </div>

              {/* Parallel Count */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label htmlFor="parallel-count-input" className="font-body text-xs font-semibold text-[var(--text-primary)]">
                    Parallel Count (P)
                  </label>
                  <span className="font-mono text-xs font-bold text-[#047857]">
                    {parallelCount}P
                  </span>
                </div>
                <div className="flex items-center gap-1.5 mb-2">
                  {[1, 2, 3, 4].map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setParallelCount(p)}
                      className={`flex-1 py-1 rounded text-xs font-mono font-semibold ${
                        parallelCount === p
                          ? 'bg-[#047857] text-white'
                          : 'bg-[var(--bg-elevated)] text-[var(--text-muted)] border border-[var(--divider)]'
                      }`}
                    >
                      {p}P
                    </button>
                  ))}
                </div>
                <input
                  id="parallel-count-input"
                  type="range"
                  min="1"
                  max="8"
                  value={parallelCount}
                  onChange={(e) => setParallelCount(parseInt(e.target.value))}
                  className="w-full h-2 bg-[var(--bg-elevated)] rounded-lg appearance-none cursor-pointer accent-[#047857]"
                />
              </div>

            </div>

          </div>
        </div>

        {/* Right Output Calculation Summary (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-6 rounded-xl bg-[var(--bg-primary)] border-2 border-[var(--accent-signal)] shadow-md relative overflow-hidden">
            
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-[var(--divider)]">
              <span className="font-mono text-[11px] font-bold text-[var(--accent-signal)] uppercase tracking-wider">
                COMPUTED PACK METRICS
              </span>
              <div className="flex items-center gap-1 text-[#047857] font-mono text-[10px] font-bold bg-[#ECFDF5] px-2 py-0.5 rounded border border-[#A7F3D0]">
                <CheckCircle2 className="w-3 h-3" />
                <span>DYNAMIC OUTPUT</span>
              </div>
            </div>

            {/* Formatted Industry Battery Rating String */}
            <div className="mb-5 p-3.5 rounded-xl bg-[var(--accent-signal-subtle)] border border-[#BFDBFE] text-center">
              <span className="font-mono text-[10px] uppercase font-bold text-[var(--text-muted)] block mb-1">
                Formatted Industry Rating String
              </span>
              <div className="font-mono text-base sm:text-lg font-bold text-[var(--accent-signal-deep)] tracking-wide select-all">
                {formattedRating}
              </div>
            </div>

            {/* 3 Main Output Metrics */}
            <div className="grid grid-cols-2 gap-3 mb-4 font-mono">
              <div className="p-3 rounded-lg bg-[var(--bg-elevated)] border border-[var(--divider)]">
                <span className="text-[10px] text-[var(--text-muted)] block uppercase">Total Voltage</span>
                <span className="text-xl sm:text-2xl font-bold text-[var(--accent-signal)]">
                  {totalVoltage} <span className="text-xs font-normal">V</span>
                </span>
                <span className="text-[10px] text-[var(--text-muted)] block mt-0.5">
                  ({seriesCount} × {cellVoltage}V)
                </span>
              </div>

              <div className="p-3 rounded-lg bg-[var(--bg-elevated)] border border-[var(--divider)]">
                <span className="text-[10px] text-[var(--text-muted)] block uppercase">Total Capacity</span>
                <span className="text-xl sm:text-2xl font-bold text-[#047857]">
                  {totalCapacity.toLocaleString()} <span className="text-xs font-normal">mAh</span>
                </span>
                <span className="text-[10px] text-[var(--text-muted)] block mt-0.5">
                  ({parallelCount} × {cellCapacity}mAh)
                </span>
              </div>
            </div>

            {/* Stored Energy Wh & Total Cells */}
            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-[var(--divider)] font-mono text-xs">
              <div className="flex items-center justify-between">
                <span className="text-[var(--text-muted)]">Pack Energy:</span>
                <span className="font-bold text-[var(--text-primary)]">{totalWattHours} Wh</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[var(--text-muted)]">Total Cell Count:</span>
                <span className="font-bold text-[var(--text-primary)]">{seriesCount * parallelCount} cells</span>
              </div>
            </div>

            {/* Source Validation Check Banner */}
            {isDefaultValidated && (
              <div className="mt-4 p-2.5 rounded-lg bg-[#ECFDF5] border border-[#A7F3D0] text-[#065F46] font-mono text-[11px] flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-[#047857]" />
                <span>Matches training source test case: 6S2P = 22.2V 16000mAh ✓</span>
              </div>
            )}

          </div>
        </div>

      </div>

    </div>
  );
}
