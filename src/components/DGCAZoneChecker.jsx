import React, { useState } from 'react';
import { 
  ShieldCheck, 
  AlertTriangle, 
  XCircle, 
  MapPin, 
  Compass, 
  Gauge, 
  Info, 
  RotateCcw, 
  Sliders, 
  ExternalLink,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export default function DGCAZoneChecker() {
  const [distanceKm, setDistanceKm] = useState(15);

  const handleSliderChange = (e) => {
    setDistanceKm(Number(e.target.value));
  };

  const handlePreset = (val) => {
    setDistanceKm(val);
  };

  // DGCA Classification Engine
  let zoneId = 'green_120';
  let zoneName = 'Green Zone (Standard)';
  let zoneColor = '#2E9E5B';
  let zoneBg = 'bg-[#ECFDF5]';
  let zoneBorder = 'border-[#A7F3D0]';
  let zoneText = 'text-[#047857]';
  let maxAltitude = '120 meters (400 ft AGL)';
  let permissionStatus = 'No Prior Permission Required (VLOS Compliance)';
  let explanation = 'Permitted without prior flight approval up to the standard 120-meter altitude ceiling, remaining within Visual Line of Sight.';

  if (distanceKm < 5) {
    zoneId = 'red_perimeter';
    zoneName = 'Red Zone / Aerodrome Proximity';
    zoneColor = '#FF4D4D';
    zoneBg = 'bg-[#FEF2F2]';
    zoneBorder = 'border-[#FECACA]';
    zoneText = 'text-[#DC2626]';
    maxAltitude = '0 meters (Ground Prohibited)';
    permissionStatus = 'Strictly Prohibited Without Central Govt Special Approval';
    explanation = 'Critical Airport Perimeter (<5 km): Drone operations are strictly prohibited without explicit clearance from the Central Government and local Airport Authority / ATC.';
  } else if (distanceKm >= 5 && distanceKm < 8) {
    zoneId = 'yellow_atc';
    zoneName = 'Yellow Zone (Controlled Airspace)';
    zoneColor = '#FF9F3D';
    zoneBg = 'bg-[#FFFBEB]';
    zoneBorder = 'border-[#FDE68A]';
    zoneText = 'text-[#B45309]';
    maxAltitude = 'Subject to Specific ATC Clearance (Max 120m)';
    permissionStatus = 'Mandatory ATC Permission Required via DigitalSky';
    explanation = 'Restricted Airspace (5–8 km from airport): Flight operations are permitted only after submitting a flight plan and receiving approved ATC clearance.';
  } else if (distanceKm >= 8 && distanceKm <= 12) {
    zoneId = 'green_60';
    zoneName = 'Green Zone (Reduced Altitude Buffer)';
    zoneColor = '#2E9E5B';
    zoneBg = 'bg-[#ECFDF5]';
    zoneBorder = 'border-[#A7F3D0]';
    zoneText = 'text-[#047857]';
    maxAltitude = '60 meters (200 ft AGL)';
    permissionStatus = 'No Prior Permission Required (Buffer Ceiling)';
    explanation = 'Permitted without prior flight approval, but maximum flying altitude is restricted to 60 meters due to proximity (8–12 km) to the airport arrival/departure corridor.';
  }

  return (
    <div className="rounded-2xl bg-[var(--bg-elevated)] border border-[var(--divider)] p-6 sm:p-8 shadow-xs">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-[var(--divider)] gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-[var(--accent-signal)]" />
            <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[var(--accent-signal)]">
              TIER 2 INTERACTIVE COMPLIANCE TOOL
            </span>
          </div>
          <h3 className="font-display text-xl sm:text-2xl font-bold text-[var(--text-primary)]">
            DGCA Airspace Zone & Altitude Checker
          </h3>
          <p className="font-body text-xs sm:text-sm text-[var(--text-muted)] mt-1">
            Enter your flight location's distance from the nearest operational airport to determine the official zone classification and altitude ceiling.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setDistanceKm(15)}
          className="self-start sm:self-auto inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[var(--bg-primary)] border border-[var(--divider)] hover:border-[var(--accent-signal)] font-mono text-xs font-semibold text-[var(--accent-signal)] shadow-2xs transition-all"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset (15 km)</span>
        </button>
      </div>

      {/* Main Grid: Input & Presets (Left) vs Output Evaluation (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Distance Controls */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          
          {/* Slider Input Card */}
          <div className="p-5 rounded-2xl bg-[var(--bg-primary)] border border-[var(--divider)] shadow-xs">
            
            <div className="flex items-center justify-between mb-3">
              <label htmlFor="distance-input" className="font-display text-sm font-bold text-[var(--text-primary)]">
                Distance to Nearest Airport:
              </label>
              <div className="flex items-center gap-1">
                <input
                  id="distance-input"
                  type="number"
                  min="0"
                  max="50"
                  step="0.5"
                  value={distanceKm}
                  onChange={(e) => setDistanceKm(Math.max(0, Math.min(50, Number(e.target.value))))}
                  className="w-18 px-2.5 py-1 text-right font-mono text-sm font-bold text-[var(--accent-signal)] bg-[var(--bg-elevated)] border border-[var(--divider)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--border-focus)]"
                />
                <span className="font-mono text-xs font-semibold text-[var(--text-muted)]">km</span>
              </div>
            </div>

            {/* Slider */}
            <div className="space-y-2">
              <input
                type="range"
                min="0"
                max="30"
                step="0.5"
                value={distanceKm}
                onChange={handleSliderChange}
                className="w-full h-3 bg-[var(--bg-elevated)] rounded-lg appearance-none cursor-pointer accent-[var(--accent-signal)]"
                aria-label="Distance to nearest airport in kilometers"
              />

              <div className="flex justify-between font-mono text-[10px] text-[var(--text-muted)] pt-1">
                <span>0 km (Perimeter)</span>
                <span>8 km (Buffer)</span>
                <span>12 km (Cutoff)</span>
                <span>30 km (Rural)</span>
              </div>
            </div>

          </div>

          {/* Quick Presets */}
          <div>
            <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)] block mb-2">
              Standard Airport Vicinity Presets:
            </span>
            <div className="grid grid-cols-2 gap-2 font-mono text-xs">
              <button
                type="button"
                onClick={() => handlePreset(3)}
                className={`py-2 px-3 rounded-xl border text-left transition-all ${
                  distanceKm === 3 
                    ? 'bg-[#FEF2F2] border-[#FECACA] text-[#DC2626] font-bold shadow-2xs' 
                    : 'bg-[var(--bg-primary)] border-[var(--divider)] text-[var(--text-secondary)] hover:border-[var(--accent-signal)]'
                }`}
              >
                <div className="font-bold">3 km</div>
                <div className="text-[10px] opacity-80">Aerodrome Inner Ring</div>
              </button>

              <button
                type="button"
                onClick={() => handlePreset(6.5)}
                className={`py-2 px-3 rounded-xl border text-left transition-all ${
                  distanceKm === 6.5 
                    ? 'bg-[#FFFBEB] border-[#FDE68A] text-[#B45309] font-bold shadow-2xs' 
                    : 'bg-[var(--bg-primary)] border-[var(--divider)] text-[var(--text-secondary)] hover:border-[var(--accent-signal)]'
                }`}
              >
                <div className="font-bold">6.5 km</div>
                <div className="text-[10px] opacity-80">5–8 km Yellow Zone</div>
              </button>

              <button
                type="button"
                onClick={() => handlePreset(10)}
                className={`py-2 px-3 rounded-xl border text-left transition-all ${
                  distanceKm === 10 
                    ? 'bg-[#ECFDF5] border-[#A7F3D0] text-[#047857] font-bold shadow-2xs' 
                    : 'bg-[var(--bg-primary)] border-[var(--divider)] text-[var(--text-secondary)] hover:border-[var(--accent-signal)]'
                }`}
              >
                <div className="font-bold">10 km</div>
                <div className="text-[10px] opacity-80">8–12 km 60m Buffer</div>
              </button>

              <button
                type="button"
                onClick={() => handlePreset(20)}
                className={`py-2 px-3 rounded-xl border text-left transition-all ${
                  distanceKm === 20 
                    ? 'bg-[#ECFDF5] border-[#A7F3D0] text-[#047857] font-bold shadow-2xs' 
                    : 'bg-[var(--bg-primary)] border-[var(--divider)] text-[var(--text-secondary)] hover:border-[var(--accent-signal)]'
                }`}
              >
                <div className="font-bold">20 km</div>
                <div className="text-[10px] opacity-80">&gt;12 km Standard Green</div>
              </button>
            </div>
          </div>

        </div>

        {/* Right Column: Zone Classification Results */}
        <div className="lg:col-span-7 w-full flex flex-col gap-4">
          
          <div className="p-6 rounded-2xl bg-[var(--bg-primary)] border border-[var(--divider)] shadow-xs">
            
            {/* Zone Header Classification Badge */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-4 border-b border-[var(--divider)] gap-2">
              <div>
                <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] block">
                  Computed Airspace Classification:
                </span>
                <h4 className="font-display text-xl font-bold text-[var(--text-primary)] mt-0.5">
                  {zoneName}
                </h4>
              </div>

              {/* Pill Badge */}
              <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold font-mono border ${zoneBg} ${zoneBorder} ${zoneText} self-start sm:self-auto`}>
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: zoneColor }} />
                <span>{distanceKm < 5 ? 'RED ZONE' : distanceKm < 8 ? 'YELLOW ZONE' : 'GREEN ZONE'}</span>
              </div>
            </div>

            {/* Readouts Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4 font-mono text-xs">
              
              {/* Max Altitude Ceiling */}
              <div className="p-3.5 rounded-xl bg-[var(--bg-elevated)] border border-[var(--divider)]">
                <div className="flex items-center gap-2 text-[var(--text-muted)] mb-1">
                  <Gauge className="w-4 h-4 text-[var(--accent-signal)]" />
                  <span className="text-[11px] uppercase font-bold">Max Altitude Ceiling</span>
                </div>
                <div className="text-sm font-bold text-[var(--text-primary)]">
                  {maxAltitude}
                </div>
              </div>

              {/* Operational Permission Requirement */}
              <div className="p-3.5 rounded-xl bg-[var(--bg-elevated)] border border-[var(--divider)]">
                <div className="flex items-center gap-2 text-[var(--text-muted)] mb-1">
                  <ShieldCheck className="w-4 h-4 text-[var(--accent-signal)]" />
                  <span className="text-[11px] uppercase font-bold">Flight Permission</span>
                </div>
                <div className="text-xs font-bold text-[var(--text-primary)] truncate">
                  {permissionStatus}
                </div>
              </div>

            </div>

            {/* Detailed Explanation */}
            <div className="p-4 rounded-xl bg-[var(--bg-elevated)] border border-[var(--divider)]">
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] block mb-1">
                Rule Summary:
              </span>
              <p className="font-body text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                {explanation}
              </p>
            </div>

          </div>

          {/* Mandatory Persistent Disclaimer Under Every Result */}
          <div className="p-3.5 rounded-xl bg-[#FFFBEB] border border-[#FDE68A] text-[#92400E] font-body text-xs flex items-start gap-2.5">
            <AlertTriangle className="w-4 h-4 text-[#B45309] shrink-0 mt-0.5" />
            <div className="leading-relaxed">
              <span className="font-semibold">Educational estimate only</span> — confirm the live zone classification on <strong>DigitalSky</strong> (digitalsky.gov.in) before flying.
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
