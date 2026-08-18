import React, { useState } from 'react';
import { 
  ShieldCheck, 
  AlertTriangle, 
  XCircle, 
  RotateCcw, 
  Cpu, 
  Compass, 
  Activity, 
  Navigation, 
  Radio, 
  MapPin, 
  Info,
  Layers,
  Sparkles
} from 'lucide-react';

export default function SensorFusionTool() {
  // Sensor toggle state (all ON by default)
  const [sensors, setSensors] = useState({
    imu: true,
    gyro: true,
    accel: true,
    mag: true,
    baro: true,
    gps: true
  });

  const handleToggle = (key) => {
    setSensors(prev => {
      const next = { ...prev, [key]: !prev[key] };
      // Cascade: If IMU is toggled OFF, disable Gyro & Accel
      if (key === 'imu' && prev.imu) {
        next.gyro = false;
        next.accel = false;
      }
      // If gyro or accel is enabled while IMU was off, re-enable IMU
      if ((key === 'gyro' || key === 'accel') && !prev[key] && !prev.imu) {
        next.imu = true;
      }
      return next;
    });
  };

  const handleReset = () => {
    setSensors({
      imu: true,
      gyro: true,
      accel: true,
      mag: true,
      baro: true,
      gps: true
    });
  };

  // Sensor Fusion Dependency Matrix
  // 1. Stabilize requires IMU AND Gyro AND Accel
  const isStabilizeOk = sensors.imu && sensors.gyro && sensors.accel;
  
  // 2. Heading Hold requires Magnetometer
  const isHeadingOk = sensors.mag;

  // 3. Altitude Hold requires Barometer
  const isAltitudeOk = sensors.baro;

  // 4. Position Hold requires GPS AND Stabilize
  const isPositionOk = sensors.gps && isStabilizeOk;

  // 5. Return-to-Home requires GPS AND Stabilize AND Heading
  const isRthOk = sensors.gps && isStabilizeOk && sensors.mag;

  const capabilities = [
    {
      id: "stabilize",
      name: "Flight Stabilization",
      subtext: "Attitude & Leveling",
      isOk: isStabilizeOk,
      okText: "OK · ATTITUDE BALANCED",
      failText: "CRITICAL FAIL · ATTITUDE LOST",
      failSeverity: "critical",
      dependencies: "IMU + Gyro + Accelerometer"
    },
    {
      id: "heading",
      name: "Heading Hold",
      subtext: "Yaw Alignment",
      isOk: isHeadingOk,
      okText: "OK · TRUE NORTH LOCKED",
      failText: "DEGRADED · YAW DRIFT RISK",
      failSeverity: "warning",
      dependencies: "Magnetometer (Compass)"
    },
    {
      id: "altitude",
      name: "Altitude Hold",
      subtext: "Height Lock & Hover",
      isOk: isAltitudeOk,
      okText: "OK · BAROMETRIC HOLD",
      failText: "UNAVAILABLE · MANUAL THROTTLE ONLY",
      failSeverity: "warning",
      dependencies: "Barometer (Air Pressure)"
    },
    {
      id: "position",
      name: "Position Hold (Loiter)",
      subtext: "3D Coordinate Hover",
      isOk: isPositionOk,
      okText: "OK · 3D GNSS LOCK",
      failText: !isStabilizeOk ? "UNAVAILABLE · UNSTABLE FLIGHT" : "UNAVAILABLE · HORIZONTAL DRIFT",
      failSeverity: "critical",
      dependencies: "GPS Receiver + IMU"
    },
    {
      id: "rth",
      name: "Return-to-Home (RTH)",
      subtext: "Autonomous Failsafe",
      isOk: isRthOk,
      okText: "OK · HOME POINT ARMED",
      failText: "UNAVAILABLE · PILOT TAKEOVER REQ",
      failSeverity: "critical",
      dependencies: "GPS Receiver + Magnetometer + IMU"
    }
  ];

  const sensorControls = [
    {
      id: "imu",
      label: "IMU Package",
      badge: "Master Sensor",
      desc: "Umbrella Motion Unit",
      icon: Layers
    },
    {
      id: "gyro",
      label: "Gyroscope",
      badge: "Angular Rate",
      desc: "Roll, Pitch, Yaw Velocity",
      icon: Activity
    },
    {
      id: "accel",
      label: "Accelerometer",
      badge: "Linear Forces",
      desc: "X/Y/Z Acceleration & Gravity",
      icon: Navigation
    },
    {
      id: "mag",
      label: "Magnetometer",
      badge: "Heading",
      desc: "Earth's Magnetic Flux",
      icon: Compass
    },
    {
      id: "baro",
      label: "Barometer",
      badge: "Pressure",
      desc: "Atmospheric Altitude Sensing",
      icon: Radio
    },
    {
      id: "gps",
      label: "GPS Receiver",
      badge: "GNSS",
      desc: "Geographic 3D Coordinates",
      icon: MapPin
    }
  ];

  return (
    <div className="rounded-2xl bg-[var(--bg-elevated)] border border-[var(--divider)] p-6 sm:p-8 shadow-xs">
      
      {/* Tool Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-[var(--divider)] gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-[var(--accent-signal)]" />
            <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[var(--accent-signal)]">
              INTERACTIVE TIER 2 SYSTEM TOOL
            </span>
          </div>
          <h3 className="font-display text-xl sm:text-2xl font-bold text-[var(--text-primary)]">
            Sensor Fusion & Dependency Simulator
          </h3>
          <p className="font-body text-xs sm:text-sm text-[var(--text-muted)] mt-1">
            Toggle individual sensor components to observe how the flight controller’s autopilot capabilities degrade in real time.
          </p>
        </div>

        <button
          type="button"
          onClick={handleReset}
          className="self-start sm:self-auto inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[var(--bg-primary)] border border-[var(--divider)] hover:border-[var(--accent-signal)] font-mono text-xs font-semibold text-[var(--accent-signal)] transition-all shadow-2xs focus-visible:ring-2 focus-visible:ring-[var(--border-focus)]"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset All Sensors (All ON)</span>
        </button>
      </div>

      {/* Main Grid: Sensor Toggles (Left) vs Capability Status Telemetry (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: 6 Sensor Toggles */}
        <div className="lg:col-span-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">
                1. Sensor Hardware Toggles (6 Channels)
              </span>
              <span className="font-mono text-[11px] text-[var(--text-muted)]">
                Click switch to disconnect
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {sensorControls.map(ctrl => {
                const Icon = ctrl.icon;
                const isOnline = sensors[ctrl.id];
                return (
                  <div
                    key={ctrl.id}
                    className={`p-4 rounded-xl border transition-all ${
                      isOnline 
                        ? 'bg-[var(--bg-primary)] border-[var(--divider)] shadow-2xs' 
                        : 'bg-[#F8FAFC] border-[#E2E8F0] opacity-80'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                          isOnline 
                            ? 'bg-[var(--accent-signal-subtle)] text-[var(--accent-signal)]' 
                            : 'bg-[#E2E8F0] text-[#64748B]'
                        }`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="font-display text-sm font-bold text-[var(--text-primary)]">
                            {ctrl.label}
                          </div>
                          <span className="font-mono text-[9px] font-semibold text-[var(--text-muted)] uppercase">
                            {ctrl.badge}
                          </span>
                        </div>
                      </div>

                      {/* Accessible iOS-Style Toggle Switch */}
                      <button
                        type="button"
                        role="switch"
                        aria-checked={isOnline}
                        onClick={() => handleToggle(ctrl.id)}
                        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--border-focus)] ${
                          isOnline ? 'bg-[var(--accent-signal)]' : 'bg-[#CBD5E1]'
                        }`}
                      >
                        <span
                          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                            isOnline ? 'translate-x-5' : 'translate-x-0'
                          }`}
                        />
                      </button>
                    </div>

                    <p className="font-body text-[11px] text-[var(--text-secondary)] leading-relaxed">
                      {ctrl.desc}
                    </p>

                    <div className="mt-2 pt-2 border-t border-[var(--divider)] flex items-center justify-between font-mono text-[10px]">
                      <span className="text-[var(--text-muted)]">State:</span>
                      <span className={`font-bold ${isOnline ? 'text-[#047857]' : 'text-[#DC2626]'}`}>
                        {isOnline ? 'ONLINE (POLLING)' : 'OFFLINE (DISCONNECTED)'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-4 p-3 rounded-xl bg-[var(--bg-primary)] border border-[var(--divider)] font-mono text-[11px] text-[var(--text-secondary)] flex items-center gap-2">
            <Info className="w-4 h-4 text-[var(--accent-signal)] shrink-0" />
            <span>Note: Disabling IMU cascades to cut both Gyroscope and Accelerometer feeds.</span>
          </div>
        </div>

        {/* Right Column: Autopilot Capability Status Readouts */}
        <div className="lg:col-span-6">
          <div className="flex items-center justify-between mb-4">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">
              2. Flight Controller Autopilot Telemetry
            </span>
            <span className="font-mono text-[11px] text-[var(--text-muted)]">
              5 Autopilot Functions
            </span>
          </div>

          <div className="space-y-3 font-mono">
            {capabilities.map(cap => {
              const isOk = cap.isOk;
              const isWarning = !isOk && cap.failSeverity === 'warning';
              const isCritical = !isOk && cap.failSeverity === 'critical';

              return (
                <div
                  key={cap.id}
                  className={`p-4 rounded-xl border transition-all ${
                    isOk 
                      ? 'bg-[var(--bg-primary)] border-[var(--divider)]' 
                      : isWarning
                        ? 'bg-[#FFFBEB] border-[#FDE68A]'
                        : 'bg-[#FEF2F2] border-[#FECACA]'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-1.5">
                    <div>
                      <span className="font-display font-bold text-sm text-[var(--text-primary)]">
                        {cap.name}
                      </span>
                      <span className="text-xs text-[var(--text-muted)] ml-2 font-mono">
                        ({cap.subtext})
                      </span>
                    </div>

                    {/* Status Badge */}
                    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold font-mono shrink-0 ${
                      isOk
                        ? 'bg-[#ECFDF5] text-[#047857] border border-[#A7F3D0]'
                        : isWarning
                          ? 'bg-[#FEF3C7] text-[#B45309] border border-[#FCD34D]'
                          : 'bg-[#FEE2E2] text-[#DC2626] border border-[#FCA5A5]'
                    }`}>
                      {isOk ? (
                        <ShieldCheck className="w-3.5 h-3.5 text-[#047857]" />
                      ) : isWarning ? (
                        <AlertTriangle className="w-3.5 h-3.5 text-[#B45309]" />
                      ) : (
                        <XCircle className="w-3.5 h-3.5 text-[#DC2626]" />
                      )}
                      <span>{isOk ? cap.okText : cap.failText}</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-[var(--divider)]/60 flex items-center justify-between text-[10px] text-[var(--text-muted)]">
                    <span>Required Feeds:</span>
                    <span className="font-semibold text-[var(--text-secondary)]">{cap.dependencies}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Mandatory Caption as requested */}
      <div className="mt-6 pt-4 border-t border-[var(--divider)]">
        <p className="font-body text-xs text-[var(--text-muted)] italic text-center">
          "This is a simplified illustration of sensor dependency — real flight controllers use more complex sensor fusion algorithms."
        </p>
      </div>

    </div>
  );
}
