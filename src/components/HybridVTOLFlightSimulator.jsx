import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Play, Pause, RotateCcw, Zap, Compass, ArrowUp, Activity, CheckCircle2 } from 'lucide-react';

export default function HybridVTOLFlightSimulator({ className = "" }) {
  const mountRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentStage, setCurrentStage] = useState(0);
  const [telemetry, setTelemetry] = useState({ 
    speed: 0, 
    alt: 0, 
    mode: "1. Vertical Lift (VTOL)",
    vtolMotorsActive: true,
    pusherActive: false 
  });

  const flightProgressRef = useRef(0);
  const isPlayingRef = useRef(true);
  const aircraftGroupRef = useRef(null);
  const vtolPropsRef = useRef([]);
  const pusherPropRef = useRef(null);
  const controlsRef = useRef(null);

  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  const stages = [
    { id: 0, name: "1. Vertical Lift", desc: "4 VTOL rotors lift vertically from pinpoint spot", progressStart: 0 },
    { id: 1, name: "2. Forward Transition", desc: "Pusher motor engages, transferring lift to wings", progressStart: 0.28 },
    { id: 2, name: "3. Wing Cruise", desc: "VTOL motors idle, high-speed fixed-wing flight", progressStart: 0.58 },
    { id: 3, name: "4. VTOL Touchdown", desc: "VTOL rotors reignite for soft vertical landing", progressStart: 0.82 }
  ];

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 400;
    const height = container.clientHeight || 260;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xF5F7FA);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 200);
    camera.position.set(0, 4.5, 9);

    // 2. Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // 3. OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.maxPolarAngle = Math.PI / 2 - 0.02;
    controls.minDistance = 3;
    controls.maxDistance = 18;
    controlsRef.current = controls;

    // 4. Lighting Rig
    const ambLight = new THREE.AmbientLight(0xffffff, 1.3);
    scene.add(ambLight);

    const sunLight = new THREE.DirectionalLight(0xffffff, 2.0);
    sunLight.position.set(10, 15, 10);
    sunLight.castShadow = true;
    scene.add(sunLight);

    // 5. Environment: Helipad Ground Target
    const groundGeo = new THREE.PlaneGeometry(60, 60);
    const groundMat = new THREE.MeshStandardMaterial({ color: 0xEEF2F6, roughness: 0.9 });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);

    // Helipad Launch/Landing Pad (Radius 2m)
    const padGeo = new THREE.CircleGeometry(2.2, 48);
    const padMat = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.6 });
    const pad = new THREE.Mesh(padGeo, padMat);
    pad.rotation.x = -Math.PI / 2;
    pad.position.set(0, 0.01, 0);
    pad.receiveShadow = true;
    scene.add(pad);

    // Helipad 'H' Marking
    const ringGeo = new THREE.RingGeometry(1.8, 1.95, 48);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0x10B981 });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = -Math.PI / 2;
    ring.position.set(0, 0.02, 0);
    scene.add(ring);

    // 6. Build 3D Hybrid VTOL Aircraft Model
    const aircraftGroup = new THREE.Group();
    aircraftGroupRef.current = aircraftGroup;

    const brandMat = new THREE.MeshStandardMaterial({ color: 0x2056A3, metalness: 0.5, roughness: 0.3 });
    const darkMat = new THREE.MeshStandardMaterial({ color: 0x0F172A, metalness: 0.7, roughness: 0.4 });
    const vtolPropMat = new THREE.MeshStandardMaterial({ color: 0x10B981, transparent: true, opacity: 0.85 }); // Green for VTOL
    const pusherPropMat = new THREE.MeshStandardMaterial({ color: 0xF59E0B, transparent: true, opacity: 0.9 }); // Amber for Pusher

    // Fuselage
    const fuseGeo = new THREE.CylinderGeometry(0.16, 0.1, 2.2, 24);
    const fuse = new THREE.Mesh(fuseGeo, brandMat);
    fuse.rotation.x = Math.PI / 2;
    fuse.castShadow = true;
    aircraftGroup.add(fuse);

    // Main Wings
    const wingGeo = new THREE.BoxGeometry(3.6, 0.04, 0.52);
    const wing = new THREE.Mesh(wingGeo, brandMat);
    wing.position.set(0, 0.08, -0.1);
    wing.castShadow = true;
    aircraftGroup.add(wing);

    // V-Tail
    const vTailL = new THREE.BoxGeometry(0.03, 0.45, 0.28);
    const vMeshL = new THREE.Mesh(vTailL, darkMat);
    vMeshL.position.set(-0.3, 0.24, 0.95);
    vMeshL.rotation.z = -Math.PI / 6;
    aircraftGroup.add(vMeshL);

    const vMeshR = new THREE.Mesh(vTailL, darkMat);
    vMeshR.position.set(0.3, 0.24, 0.95);
    vMeshR.rotation.z = Math.PI / 6;
    aircraftGroup.add(vMeshR);

    // 2 VTOL Carbon Booms with 4 Vertical Lift Motors
    const vtolProps = [];
    [-1.0, 1.0].forEach((bx) => {
      const boomGeo = new THREE.CylinderGeometry(0.035, 0.035, 1.6, 16);
      const boom = new THREE.Mesh(boomGeo, darkMat);
      boom.position.set(bx, 0.12, -0.1);
      boom.rotation.x = Math.PI / 2;
      boom.castShadow = true;
      aircraftGroup.add(boom);

      // Forward VTOL Motor on this boom
      const fwdMotor = new THREE.Group();
      fwdMotor.position.set(bx, 0.18, -0.85);
      const fwdBlade = new THREE.Mesh(new THREE.BoxGeometry(0.65, 0.015, 0.06), vtolPropMat);
      fwdMotor.add(fwdBlade);
      aircraftGroup.add(fwdMotor);
      vtolProps.push(fwdMotor);

      // Aft VTOL Motor on this boom
      const aftMotor = new THREE.Group();
      aftMotor.position.set(bx, 0.18, 0.65);
      const aftBlade = new THREE.Mesh(new THREE.BoxGeometry(0.65, 0.015, 0.06), vtolPropMat);
      aftMotor.add(aftBlade);
      aircraftGroup.add(aftMotor);
      vtolProps.push(aftMotor);
    });
    vtolPropsRef.current = vtolProps;

    // Rear Forward Pusher Motor & Propeller
    const pusherGroup = new THREE.Group();
    pusherGroup.position.set(0, 0, 1.15);
    const pusherBlade = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.015, 0.05), pusherPropMat);
    pusherGroup.add(pusherBlade);
    aircraftGroup.add(pusherGroup);
    pusherPropRef.current = pusherGroup;

    scene.add(aircraftGroup);

    // 7. Animation Loop with VTOL Kinematics
    let animId;
    let lastTime = performance.now();

    const animate = (time) => {
      animId = requestAnimationFrame(animate);
      const delta = (time - lastTime) / 1000;
      lastTime = time;

      controls.update();

      if (isPlayingRef.current) {
        flightProgressRef.current = (flightProgressRef.current + delta * 0.075) % 1.0;
      }

      const p = flightProgressRef.current;

      let px = 0, py = 0.25, pz = 0, pitch = 0, roll = 0;
      let isVtolSpinning = true;
      let isPusherSpinning = false;
      let speedKmh = 0, altM = 0, activeStageIdx = 0;

      if (p < 0.28) {
        // Stage 1: Pure Vertical Lift (VTOL takeoff: p 0 -> 0.28)
        activeStageIdx = 0;
        const t = p / 0.28;
        px = 0;
        pz = 0;
        py = 0.25 + t * 3.2; // vertical rise from ground to 3.45m
        pitch = 0;
        roll = 0;
        isVtolSpinning = true;
        isPusherSpinning = false;
        speedKmh = Math.round(t * 12);
        altM = Math.round(t * 35);
      } else if (p < 0.58) {
        // Stage 2: Forward Transition (p 0.28 -> 0.58)
        activeStageIdx = 1;
        const t = (p - 0.28) / 0.30;
        px = 0;
        pz = -t * 10; // accelerating forward
        py = 3.45 + t * 1.0; // slight climb
        pitch = -4 * (Math.PI / 180); // slight nose down for acceleration
        isVtolSpinning = t < 0.7; // VTOL motors shut off once wing airspeed reached
        isPusherSpinning = true;
        speedKmh = Math.round(12 + t * 68);
        altM = Math.round(35 + t * 30);
      } else if (p < 0.82) {
        // Stage 3: High-Speed Wing Cruise & Circuit (p 0.58 -> 0.82)
        activeStageIdx = 2;
        const t = (p - 0.58) / 0.24;
        const angle = Math.PI + t * Math.PI;
        px = Math.sin(angle) * 3.5;
        pz = -10 + (1 - Math.cos(angle)) * 6;
        py = 4.45 + Math.sin(t * Math.PI) * 0.2;
        pitch = 0;
        roll = Math.sin(t * Math.PI) * (18 * Math.PI / 180);
        isVtolSpinning = false; // VTOL motors completely stopped in cruise
        isPusherSpinning = true;
        speedKmh = 90;
        altM = 75;
      } else {
        // Stage 4: Back-Transition & Pinpoint Vertical Landing (p 0.82 -> 1.0)
        activeStageIdx = 3;
        const t = (p - 0.82) / 0.18;
        px = (1 - t) * 0.5;
        pz = (1 - t) * 2; // stops right over helipad at center (0,0)
        py = Math.max(0.25, 4.45 * (1 - t * 0.94)); // vertical descent
        pitch = 0;
        roll = 0;
        isVtolSpinning = true; // VTOL motors reignited
        isPusherSpinning = t < 0.3; // pusher throttles down
        speedKmh = Math.round(Math.max(0, (1 - t) * 45));
        altM = Math.round(Math.max(0, (1 - t) * 65));
      }

      // Update aircraft position
      aircraftGroup.position.set(px, py, pz);
      aircraftGroup.rotation.set(pitch, p < 0.58 ? Math.PI : (p < 0.82 ? Math.PI + (p - 0.58) / 0.24 * Math.PI : 0), roll);

      // Motor Propeller Animations
      if (isVtolSpinning) {
        vtolPropsRef.current.forEach((m, idx) => {
          m.rotation.y += idx % 2 === 0 ? 0.45 : -0.45;
        });
      }
      if (isPusherSpinning && pusherPropRef.current) {
        pusherPropRef.current.rotation.z += 0.5;
      }

      setCurrentStage(activeStageIdx);
      setTelemetry({
        speed: speedKmh,
        alt: altM,
        mode: stages[activeStageIdx].name,
        vtolMotorsActive: isVtolSpinning,
        pusherActive: isPusherSpinning
      });

      renderer.render(scene, camera);
    };
    animId = requestAnimationFrame(animate);

    const handleResize = () => {
      if (!container) return;
      const nw = container.clientWidth;
      const nh = container.clientHeight;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    };
    const observer = new ResizeObserver(handleResize);
    observer.observe(container);

    return () => {
      cancelAnimationFrame(animId);
      observer.disconnect();
      if (renderer.domElement) renderer.domElement.remove();
      renderer.dispose();
    };
  }, []);

  const handleJumpToStage = (stageIdx) => {
    flightProgressRef.current = stages[stageIdx].progressStart;
    setCurrentStage(stageIdx);
  };

  const handleReset = () => {
    flightProgressRef.current = 0;
    setCurrentStage(0);
  };

  return (
    <div className={`relative w-full h-full flex flex-col justify-between select-none ${className}`}>
      
      {/* 3D WebGL Canvas Viewport */}
      <div 
        ref={mountRef} 
        className="w-full h-full cursor-grab active:cursor-grabbing outline-none min-h-[260px]"
        title="Interactive 3D VTOL Simulation: Click & drag to rotate camera"
      />

      {/* Real-time VTOL Telemetry HUD Overlay (Top Left) */}
      <div className="absolute top-3 left-3 z-20 flex flex-col gap-1.5 bg-[var(--bg-primary)]/90 backdrop-blur-sm border border-[var(--divider)] p-2.5 rounded-xl shadow-xs font-mono text-[11px]">
        <div className="flex items-center gap-2 pb-1.5 border-b border-[var(--divider)] text-[var(--accent-signal)] font-bold">
          <Zap className="w-3.5 h-3.5" />
          <span>HYBRID VTOL DUAL-PROPULSION</span>
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-[var(--text-primary)]">
          <div>
            <span className="text-[9px] text-[var(--text-muted)] block uppercase">Airspeed</span>
            <span className="font-bold text-[var(--accent-signal)]">{telemetry.speed} km/h</span>
          </div>
          <div>
            <span className="text-[9px] text-[var(--text-muted)] block uppercase">Altitude</span>
            <span className="font-bold">{telemetry.alt} m</span>
          </div>
        </div>

        {/* Active Motor State Badges */}
        <div className="pt-1.5 border-t border-[var(--divider)] flex items-center gap-2 text-[9px]">
          <span className={`px-1.5 py-0.5 rounded font-bold ${
            telemetry.vtolMotorsActive ? 'bg-[#ECFDF5] text-[#047857] border border-[#A7F3D0]' : 'bg-[var(--bg-elevated)] text-[var(--text-muted)]'
          }`}>
            VTOL LIFT: {telemetry.vtolMotorsActive ? 'ON' : 'OFF'}
          </span>
          <span className={`px-1.5 py-0.5 rounded font-bold ${
            telemetry.pusherActive ? 'bg-[#FFFBEB] text-[#B45309] border border-[#FDE68A]' : 'bg-[var(--bg-elevated)] text-[var(--text-muted)]'
          }`}>
            PUSHER: {telemetry.pusherActive ? 'ON' : 'OFF'}
          </span>
        </div>
      </div>

      {/* Flight Stage Selector & Playback Controls (Bottom) */}
      <div className="absolute bottom-2.5 inset-x-2.5 z-20 flex flex-col sm:flex-row items-center justify-between gap-2 bg-[var(--bg-primary)]/95 backdrop-blur-sm border border-[var(--divider)] p-2 rounded-xl shadow-sm">
        
        {/* Stage Selector Buttons */}
        <div className="flex items-center gap-1 w-full sm:w-auto overflow-x-auto">
          {stages.map((stg) => (
            <button
              key={stg.id}
              type="button"
              onClick={() => handleJumpToStage(stg.id)}
              className={`px-2 py-1 rounded-md text-[10px] font-mono font-semibold whitespace-nowrap transition-all focus-visible:ring-1 focus-visible:ring-[var(--border-focus)] ${
                currentStage === stg.id
                  ? 'bg-[var(--accent-signal)] text-white shadow-xs'
                  : 'bg-[var(--bg-elevated)] text-[var(--text-secondary)] hover:bg-[var(--bg-surface-subtle)]'
              }`}
            >
              {stg.name}
            </button>
          ))}
        </div>

        {/* Play/Pause & Reset Buttons */}
        <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-auto font-mono text-xs">
          <button
            type="button"
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-1.5 rounded-lg bg-[var(--accent-signal-subtle)] text-[var(--accent-signal)] hover:bg-[var(--accent-signal)] hover:text-white transition-colors"
            title={isPlaying ? "Pause Flight" : "Resume Flight"}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="p-1.5 rounded-lg bg-[var(--bg-elevated)] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
            title="Restart VTOL Cycle"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
          <span className="text-[10px] font-semibold text-[var(--accent-signal)] px-1">
            ORBIT: DRAG
          </span>
        </div>

      </div>

    </div>
  );
}
