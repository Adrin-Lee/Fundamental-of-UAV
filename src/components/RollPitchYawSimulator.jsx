import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { 
  RotateCcw, 
  Activity, 
  Compass, 
  Sliders, 
  Info, 
  Layers, 
  ShieldCheck, 
  CheckCircle2,
  ChevronRight,
  MoveHorizontal,
  MoveVertical,
  RotateCw
} from 'lucide-react';

export default function RollPitchYawSimulator() {
  // Motor speed sliders (0 to 100%, default 50% hover baseline)
  // FL: Front-Left (CW)
  // FR: Front-Right (CCW)
  // RL: Rear-Left (CCW)
  // RR: Rear-Right (CW)
  const [motorSpeeds, setMotorSpeeds] = useState({
    FL: 50,
    FR: 50,
    RL: 50,
    RR: 50
  });

  const [reducedMotion, setReducedMotion] = useState(false);
  const canvasContainerRef = useRef(null);
  const sceneRef = useRef(null);
  const droneGroupRef = useRef(null);
  const rotorsRef = useRef([]);

  // Check prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);

    const handleChange = (e) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const handleSliderChange = (motor, value) => {
    setMotorSpeeds(prev => ({ ...prev, [motor]: Number(value) }));
  };

  const setPreset = (preset) => {
    if (preset === 'hover') {
      setMotorSpeeds({ FL: 50, FR: 50, RL: 50, RR: 50 });
    } else if (preset === 'roll_right') {
      // Left motors faster -> rolls right
      setMotorSpeeds({ FL: 75, FR: 25, RL: 75, RR: 25 });
    } else if (preset === 'pitch_forward') {
      // Rear motors faster -> nose tilts downward
      setMotorSpeeds({ FL: 25, FR: 25, RL: 75, RR: 75 });
    } else if (preset === 'yaw_right') {
      // CW pair (FL + RR) faster than CCW pair (FR + RL) -> rotates right
      setMotorSpeeds({ FL: 75, FR: 25, RL: 25, RR: 75 });
    }
  };

  // Kinematic calculations (exact direct causal formulas)
  const leftAvg = (motorSpeeds.FL + motorSpeeds.RL) / 2;
  const rightAvg = (motorSpeeds.FR + motorSpeeds.RR) / 2;
  // If left > right => roll right (positive degrees)
  const rollDelta = (leftAvg - rightAvg);
  const rollAngleDeg = rollDelta * 0.5; // Max +- 25 deg

  const frontAvg = (motorSpeeds.FL + motorSpeeds.FR) / 2;
  const rearAvg = (motorSpeeds.RL + motorSpeeds.RR) / 2;
  // If rear > front => nose down / forward (positive pitch delta)
  const pitchDelta = (frontAvg - rearAvg);
  const pitchAngleDeg = pitchDelta * 0.5; // Max +- 25 deg

  const cwAvg = (motorSpeeds.FL + motorSpeeds.RR) / 2;
  const ccwAvg = (motorSpeeds.FR + motorSpeeds.RL) / 2;
  // If CW > CCW => yaw right (positive yaw rate)
  const yawDelta = (cwAvg - ccwAvg);
  const yawRateDeg = yawDelta * 0.4; // Max +- 20 deg/s

  // Textual causal readouts directly matched to curriculum copy
  let rollText = "Balanced level (Left & Right thrust equal)";
  let rollStatusClass = "text-[#047857]";
  if (rollDelta > 0) {
    rollText = `Rolling Right (+${rollAngleDeg.toFixed(1)}°) — Left motors (${leftAvg.toFixed(0)}%) produce more thrust than Right (${rightAvg.toFixed(0)}%)`;
    rollStatusClass = "text-[var(--accent-signal)]";
  } else if (rollDelta < 0) {
    rollText = `Rolling Left (${rollAngleDeg.toFixed(1)}°) — Right motors (${rightAvg.toFixed(0)}%) produce more thrust than Left (${leftAvg.toFixed(0)}%)`;
    rollStatusClass = "text-[var(--accent-signal)]";
  }

  let pitchText = "Balanced level (Front & Rear thrust equal)";
  let pitchStatusClass = "text-[#047857]";
  if (pitchDelta < 0) {
    pitchText = `Nose Tilting Down / Moving Forward (${pitchAngleDeg.toFixed(1)}°) — Rear motors (${rearAvg.toFixed(0)}%) produce more thrust than Front (${frontAvg.toFixed(0)}%)`;
    pitchStatusClass = "text-[var(--accent-signal)]";
  } else if (pitchDelta > 0) {
    pitchText = `Nose Tilting Up / Moving Backward (+${pitchAngleDeg.toFixed(1)}°) — Front motors (${frontAvg.toFixed(0)}%) produce more thrust than Rear (${rearAvg.toFixed(0)}%)`;
    pitchStatusClass = "text-[var(--accent-signal)]";
  }

  let yawText = "Torque Balanced (CW & CCW torque pairs equal)";
  let yawStatusClass = "text-[#047857]";
  if (yawDelta > 0) {
    yawText = `Rotating Right (+${yawRateDeg.toFixed(1)}°/s) — CW motor pair (${cwAvg.toFixed(0)}%) torque exceeds CCW pair (${ccwAvg.toFixed(0)}%)`;
    yawStatusClass = "text-[var(--accent-signal)]";
  } else if (yawDelta < 0) {
    yawText = `Rotating Left (${yawRateDeg.toFixed(1)}°/s) — CCW motor pair (${ccwAvg.toFixed(0)}%) torque exceeds CW pair (${cwAvg.toFixed(0)}%)`;
    yawStatusClass = "text-[var(--accent-signal)]";
  }

  // 3D Three.js Scene Setup & Animation Loop
  useEffect(() => {
    const container = canvasContainerRef.current;
    if (!container) return;

    // Create Scene, Camera, and Renderer
    const width = container.clientWidth;
    const height = container.clientHeight || 360;

    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0xF8FAFC);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 3.2, 5.2);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    container.replaceChildren(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xFFFFFF, 1.4);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xFFFFFF, 1.8);
    dirLight.position.set(5, 10, 7);
    dirLight.castShadow = true;
    scene.add(dirLight);

    // Ground Grid Helper
    const grid = new THREE.GridHelper(8, 16, 0xCBD5E1, 0xE2E8F0);
    grid.position.y = -1.2;
    scene.add(grid);

    // --- Build Low-Poly Quadcopter Primitive Mesh ---
    const droneGroup = new THREE.Group();
    droneGroupRef.current = droneGroup;

    // Central Airframe Fuselage
    const bodyGeo = new THREE.BoxGeometry(0.8, 0.22, 1.0);
    const bodyMat = new THREE.MeshStandardMaterial({ 
      color: 0x2056A3, 
      roughness: 0.3, 
      metalness: 0.2 
    });
    const body = new THREE.Mesh(bodyGeo, bodyMat);
    droneGroup.add(body);

    // Forward Nose Direction Arrow
    const noseGeo = new THREE.ConeGeometry(0.18, 0.4, 4);
    const noseMat = new THREE.MeshStandardMaterial({ color: 0xEF4444 });
    const nose = new THREE.Mesh(noseGeo, noseMat);
    nose.rotation.x = -Math.PI / 2;
    nose.position.set(0, 0.15, -0.6);
    droneGroup.add(nose);

    // 4 Carbon Tubular Arms (X-Frame Geometry)
    const armMat = new THREE.MeshStandardMaterial({ color: 0x0F172A, roughness: 0.5 });
    const arm1Geo = new THREE.CylinderGeometry(0.04, 0.04, 2.4, 8);
    const arm1 = new THREE.Mesh(arm1Geo, armMat);
    arm1.rotation.z = Math.PI / 2;
    arm1.rotation.y = Math.PI / 4;
    droneGroup.add(arm1);

    const arm2Geo = new THREE.CylinderGeometry(0.04, 0.04, 2.4, 8);
    const arm2 = new THREE.Mesh(arm2Geo, armMat);
    arm2.rotation.z = Math.PI / 2;
    arm2.rotation.y = -Math.PI / 4;
    droneGroup.add(arm2);

    // 4 Motor Assemblies & Propellers at Arm Ends
    const motorGeo = new THREE.CylinderGeometry(0.1, 0.1, 0.16, 12);
    const motorMat = new THREE.MeshStandardMaterial({ color: 0x475569, metalness: 0.7 });

    const propGeo = new THREE.BoxGeometry(0.7, 0.015, 0.08);
    const propMat = new THREE.MeshStandardMaterial({ 
      color: 0x64748B, 
      transparent: true, 
      opacity: 0.85 
    });

    const motorPositions = [
      { id: 'FL', x: -0.85, z: -0.85, isCW: true },
      { id: 'FR', x: 0.85, z: -0.85, isCW: false },
      { id: 'RL', x: -0.85, z: 0.85, isCW: false },
      { id: 'RR', x: 0.85, z: 0.85, isCW: true }
    ];

    const localRotors = [];

    motorPositions.forEach((pos) => {
      // Motor Base
      const motor = new THREE.Mesh(motorGeo, motorMat);
      motor.position.set(pos.x, 0.12, pos.z);
      droneGroup.add(motor);

      // Propeller Blade
      const prop = new THREE.Mesh(propGeo, propMat);
      prop.position.set(pos.x, 0.22, pos.z);
      droneGroup.add(prop);
      localRotors.push({ mesh: prop, id: pos.id, isCW: pos.isCW });
    });

    rotorsRef.current = localRotors;

    // 3-Axis Gimbal Ring Helpers (Visual Attitude Reference)
    const ringGeo = new THREE.RingGeometry(1.6, 1.63, 48);
    const xRingMat = new THREE.MeshBasicMaterial({ color: 0xEF4444, side: THREE.DoubleSide }); // Roll (X)
    const yRingMat = new THREE.MeshBasicMaterial({ color: 0x10B981, side: THREE.DoubleSide }); // Pitch (Y)
    const zRingMat = new THREE.MeshBasicMaterial({ color: 0x2056A3, side: THREE.DoubleSide }); // Yaw (Z)

    const xRing = new THREE.Mesh(ringGeo, xRingMat);
    xRing.rotation.y = Math.PI / 2;
    droneGroup.add(xRing);

    const yRing = new THREE.Mesh(ringGeo, yRingMat);
    yRing.rotation.x = Math.PI / 2;
    droneGroup.add(yRing);

    const zRing = new THREE.Mesh(ringGeo, zRingMat);
    droneGroup.add(zRing);

    scene.add(droneGroup);

    // Mouse Interaction for 3D Orbit Dragging
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let orbitAzimuth = 0;
    let orbitElevation = 0;

    const onPointerDown = (e) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onPointerMove = (e) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMouseX;
      const deltaY = e.clientY - prevMouseY;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;

      orbitAzimuth += deltaX * 0.008;
      orbitElevation = Math.max(-0.5, Math.min(1.2, orbitElevation + deltaY * 0.008));
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    container.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);

    // Animation Loop
    let animationFrameId;
    let accumulatedYaw = 0;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Spin propellers proportional to motor slider speeds
      rotorsRef.current.forEach((r) => {
        const speed = motorSpeeds[r.id] || 50;
        const dir = r.isCW ? 1 : -1;
        r.mesh.rotation.y += (speed * 0.005) * dir;
      });

      // Target rotations in radians
      const targetRoll = (rollAngleDeg * Math.PI) / 180;
      const targetPitch = (pitchAngleDeg * Math.PI) / 180;
      
      accumulatedYaw += (yawRateDeg * 0.015 * Math.PI) / 180;

      if (droneGroupRef.current) {
        if (reducedMotion) {
          // Instant snaps
          droneGroupRef.current.rotation.z = -targetRoll;
          droneGroupRef.current.rotation.x = -targetPitch;
          droneGroupRef.current.rotation.y = -accumulatedYaw;
        } else {
          // Smooth Lerp
          droneGroupRef.current.rotation.z += (-targetRoll - droneGroupRef.current.rotation.z) * 0.1;
          droneGroupRef.current.rotation.x += (-targetPitch - droneGroupRef.current.rotation.x) * 0.1;
          droneGroupRef.current.rotation.y += (-accumulatedYaw - droneGroupRef.current.rotation.y) * 0.1;
        }
      }

      // Camera Orbit
      const dist = 5.2;
      const camY = 3.2 + Math.sin(orbitElevation) * 2.5;
      const camRadius = dist * Math.cos(orbitElevation);
      camera.position.x = Math.sin(orbitAzimuth) * camRadius;
      camera.position.z = Math.cos(orbitAzimuth) * camRadius;
      camera.position.y = camY;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight || 360;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      container.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, [motorSpeeds, rollAngleDeg, pitchAngleDeg, yawRateDeg, reducedMotion]);

  return (
    <div className="rounded-2xl bg-[var(--bg-elevated)] border border-[var(--divider)] p-6 sm:p-8 shadow-xs">
      
      {/* Simulator Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-6 mb-6 border-b border-[var(--divider)] gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-[var(--accent-signal)]" />
            <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[var(--accent-signal)]">
              TIER 1 SIGNATURE 3D INTERACTIVE TOOL
            </span>
          </div>
          <h3 className="font-display text-xl sm:text-2xl font-bold text-[var(--text-primary)]">
            Roll / Pitch / Yaw 3D Attitude Simulator
          </h3>
          <p className="font-body text-xs sm:text-sm text-[var(--text-muted)] mt-1">
            Independently modulate the 4 motor speeds to observe real-time differential thrust and torque reactions in 3D space.
          </p>
        </div>

        {/* Preset Action Buttons */}
        <div className="flex flex-wrap items-center gap-2 self-start lg:self-auto">
          <button
            type="button"
            onClick={() => setPreset('roll_right')}
            className="py-1.5 px-3 rounded-lg bg-[var(--bg-primary)] border border-[var(--divider)] hover:border-[var(--accent-signal)] font-mono text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--accent-signal)] shadow-2xs transition-all min-h-[44px]"
          >
            Preset: Roll Right
          </button>
          <button
            type="button"
            onClick={() => setPreset('pitch_forward')}
            className="py-1.5 px-3 rounded-lg bg-[var(--bg-primary)] border border-[var(--divider)] hover:border-[var(--accent-signal)] font-mono text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--accent-signal)] shadow-2xs transition-all min-h-[44px]"
          >
            Preset: Pitch Forward
          </button>
          <button
            type="button"
            onClick={() => setPreset('yaw_right')}
            className="py-1.5 px-3 rounded-lg bg-[var(--bg-primary)] border border-[var(--divider)] hover:border-[var(--accent-signal)] font-mono text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--accent-signal)] shadow-2xs transition-all min-h-[44px]"
          >
            Preset: Yaw Right
          </button>
          <button
            type="button"
            onClick={() => setPreset('hover')}
            className="py-1.5 px-3 rounded-lg bg-[var(--accent-signal-subtle)] border border-[#BFDBFE] font-mono text-xs font-bold text-[var(--accent-signal)] hover:bg-[var(--accent-signal)] hover:text-white shadow-2xs transition-all min-h-[44px] flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset (50% Hover)</span>
          </button>
        </div>
      </div>

      {/* Main Interactive Grid: 4 Motor Sliders (Left) vs 3D Canvas + Readout (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: 4 Motor Sliders with CW/CCW Directional Badges */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          
          <div className="flex items-center justify-between pb-2 border-b border-[var(--divider)]">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--text-primary)]">
              4-Motor Individual Throttle Controls
            </span>
            <span className="font-mono text-[11px] text-[var(--text-muted)]">
              Range: 0% – 100%
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {[
              { id: 'FR', name: 'Front-Right (M1)', type: 'CCW Motor', color: '#059669', badgeBg: 'bg-[#ECFDF5] text-[#047857]' },
              { id: 'RL', name: 'Rear-Left (M2)', type: 'CCW Motor', color: '#059669', badgeBg: 'bg-[#ECFDF5] text-[#047857]' },
              { id: 'RR', name: 'Rear-Right (M3)', type: 'CW Motor', color: '#2056A3', badgeBg: 'bg-[#EFF6FF] text-[#1D4ED8]' },
              { id: 'FL', name: 'Front-Left (M4)', type: 'CW Motor', color: '#2056A3', badgeBg: 'bg-[#EFF6FF] text-[#1D4ED8]' }
            ].map((m) => (
              <div 
                key={m.id}
                className="p-4 rounded-xl bg-[var(--bg-primary)] border border-[var(--divider)] shadow-2xs"
              >
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <span className="font-display text-xs font-bold text-[var(--text-primary)] block">
                      {m.name}
                    </span>
                    <span className={`font-mono text-[9px] font-bold px-1.5 py-0.5 rounded ${m.badgeBg}`}>
                      {m.type}
                    </span>
                  </div>
                  <span className="font-mono text-sm font-bold text-[var(--accent-signal)]">
                    {motorSpeeds[m.id]}%
                  </span>
                </div>

                <input
                  type="range"
                  min="0"
                  max="100"
                  step="1"
                  value={motorSpeeds[m.id]}
                  onChange={(e) => handleSliderChange(m.id, e.target.value)}
                  className="w-full h-2.5 bg-[var(--bg-elevated)] rounded-lg appearance-none cursor-pointer accent-[var(--accent-signal)]"
                  aria-label={`${m.name} throttle slider`}
                />

                <div className="flex justify-between font-mono text-[9px] text-[var(--text-muted)] mt-1.5">
                  <span>0% (Idle)</span>
                  <span>50% (Hover)</span>
                  <span>100% (Max)</span>
                </div>
              </div>
            ))}
          </div>

          {/* Diagonal Pairing Explanatory Note */}
          <div className="p-3.5 rounded-xl bg-[var(--bg-primary)] border border-[var(--divider)] font-mono text-[11px] text-[var(--text-secondary)] flex items-start gap-2">
            <Info className="w-4 h-4 text-[var(--accent-signal)] shrink-0 mt-0.5" />
            <span>
              <strong>Torque Pairing:</strong> [M1 Front-Right + M2 Rear-Left] rotate Counter-Clockwise (CCW), while [M3 Rear-Right + M4 Front-Left] rotate Clockwise (CW). Differential torque between these diagonal pairs drives Yaw rotation.
            </span>
          </div>

        </div>

        {/* Right Column: 3D Three.js Canvas & Live JetBrains Mono Readout */}
        <div className="lg:col-span-7 w-full flex flex-col gap-4">
          
          {/* 3D Viewport Box */}
          <div className="relative rounded-2xl bg-[var(--bg-primary)] border border-[var(--divider)] p-4 shadow-card overflow-hidden">
            
            <div className="flex items-center justify-between pb-3 mb-2 border-b border-[var(--divider)] font-mono text-[11px] text-[var(--text-muted)]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[var(--accent-signal)]" />
                <span className="font-bold text-[var(--text-primary)] uppercase">
                  3D QUADCOPTER ATTITUDE VIEWPORT
                </span>
              </div>
              <span>Click & Drag to Orbit</span>
            </div>

            {/* Canvas Mount */}
            <div 
              ref={canvasContainerRef} 
              className="w-full h-80 rounded-xl bg-[#F8FAFC] border border-[var(--divider)] cursor-grab active:cursor-grabbing overflow-hidden relative"
            >
              {/* Compass Gimbal Overlay Tag */}
              <div className="absolute top-3 left-3 pointer-events-none font-mono text-[10px] bg-white/90 backdrop-blur px-2.5 py-1.5 rounded-lg border border-[var(--divider)] shadow-2xs space-y-0.5">
                <div className="text-[#EF4444] font-bold">● Red Ring: Roll Axis (X)</div>
                <div className="text-[#10B981] font-bold">● Green Ring: Pitch Axis (Y)</div>
                <div className="text-[var(--accent-signal)] font-bold">● Blue Ring: Yaw Axis (Z)</div>
              </div>
            </div>

            {/* Live Readout Status Lines (Directly derived from curriculum copy) */}
            <div className="mt-4 pt-3 border-t border-[var(--divider)] space-y-2 font-mono text-xs">
              
              {/* Roll Readout */}
              <div className="p-2.5 rounded-xl bg-[var(--bg-elevated)] border border-[var(--divider)] flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[var(--text-primary)]">ROLL (X):</span>
                  <span className={`font-semibold ${rollStatusClass}`}>{rollText}</span>
                </div>
                <span className="text-[10px] text-[var(--text-muted)] font-mono">
                  Δ {rollDelta.toFixed(0)}% (L: {leftAvg.toFixed(0)}% vs R: {rightAvg.toFixed(0)}%)
                </span>
              </div>

              {/* Pitch Readout */}
              <div className="p-2.5 rounded-xl bg-[var(--bg-elevated)] border border-[var(--divider)] flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[var(--text-primary)]">PITCH (Y):</span>
                  <span className={`font-semibold ${pitchStatusClass}`}>{pitchText}</span>
                </div>
                <span className="text-[10px] text-[var(--text-muted)] font-mono">
                  Δ {pitchDelta.toFixed(0)}% (F: {frontAvg.toFixed(0)}% vs R: {rearAvg.toFixed(0)}%)
                </span>
              </div>

              {/* Yaw Readout */}
              <div className="p-2.5 rounded-xl bg-[var(--bg-elevated)] border border-[var(--divider)] flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[var(--text-primary)]">YAW (Z):</span>
                  <span className={`font-semibold ${yawStatusClass}`}>{yawText}</span>
                </div>
                <span className="text-[10px] text-[var(--text-muted)] font-mono">
                  Δ {yawDelta.toFixed(0)}% (CW: {cwAvg.toFixed(0)}% vs CCW: {ccwAvg.toFixed(0)}%)
                </span>
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
