import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Play, Pause, RotateCcw, Compass, Wind, Plane, ArrowUpRight, CheckCircle2 } from 'lucide-react';

export default function FixedWingFlightSimulator({ className = "" }) {
  const mountRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentStage, setCurrentStage] = useState(0); // 0: Runway Roll, 1: Climb, 2: Cruise, 3: Approach & Touchdown
  const [telemetry, setTelemetry] = useState({ speed: 0, alt: 0, pitch: 0, stageName: "1. Runway Roll" });
  
  const flightProgressRef = useRef(0); // 0 to 1
  const isPlayingRef = useRef(true);
  const planeGroupRef = useRef(null);
  const propMeshRef = useRef(null);
  const controlsRef = useRef(null);

  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  const stages = [
    { id: 0, name: "1. Takeoff Roll", desc: "Accelerating along runway to achieve airspeed", progressStart: 0 },
    { id: 1, name: "2. Rotation & Climb", desc: "Pitching up to generate airfoil lift and gain altitude", progressStart: 0.25 },
    { id: 2, name: "3. Level Cruise", desc: "High-speed fuel/battery-efficient forward flight", progressStart: 0.55 },
    { id: 3, name: "4. Flare & Landing", desc: "Gliding descent, flaring pitch, and runway touchdown", progressStart: 0.80 }
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
    controls.maxPolarAngle = Math.PI / 2 - 0.02; // keep above ground
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

    // 5. Environment: Runway & Ground Grid
    const groundGeo = new THREE.PlaneGeometry(60, 60);
    const groundMat = new THREE.MeshStandardMaterial({ color: 0xEEF2F6, roughness: 0.9 });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);

    // Runway Strip
    const runwayGeo = new THREE.PlaneGeometry(3.5, 30);
    const runwayMat = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.6 });
    const runway = new THREE.Mesh(runwayGeo, runwayMat);
    runway.rotation.x = -Math.PI / 2;
    runway.position.set(0, 0.01, 0);
    runway.receiveShadow = true;
    scene.add(runway);

    // Runway Centerline Markings
    for (let z = -12; z <= 12; z += 3) {
      const markGeo = new THREE.PlaneGeometry(0.2, 1.4);
      const markMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const mark = new THREE.Mesh(markGeo, markMat);
      mark.rotation.x = -Math.PI / 2;
      mark.position.set(0, 0.02, z);
      scene.add(mark);
    }

    // 6. Build 3D Fixed-Wing Aircraft
    const planeGroup = new THREE.Group();
    planeGroupRef.current = planeGroup;

    const brandMat = new THREE.MeshStandardMaterial({ color: 0x2056A3, metalness: 0.5, roughness: 0.3 });
    const darkMat = new THREE.MeshStandardMaterial({ color: 0x0F172A, metalness: 0.7, roughness: 0.4 });
    const propMat = new THREE.MeshStandardMaterial({ color: 0x60A5FA, transparent: true, opacity: 0.85 });

    // Fuselage
    const fuseGeo = new THREE.CylinderGeometry(0.16, 0.1, 2.2, 24);
    const fuse = new THREE.Mesh(fuseGeo, brandMat);
    fuse.rotation.x = Math.PI / 2;
    fuse.castShadow = true;
    planeGroup.add(fuse);

    // Wings
    const wingGeo = new THREE.BoxGeometry(3.2, 0.04, 0.48);
    const wing = new THREE.Mesh(wingGeo, brandMat);
    wing.position.set(0, 0.08, -0.15);
    wing.castShadow = true;
    planeGroup.add(wing);

    // Winglets
    [-1.6, 1.6].forEach(wx => {
      const wletGeo = new THREE.BoxGeometry(0.03, 0.2, 0.35);
      const wlet = new THREE.Mesh(wletGeo, darkMat);
      wlet.position.set(wx, 0.16, -0.15);
      planeGroup.add(wlet);
    });

    // T-Tail
    const vTailGeo = new THREE.BoxGeometry(0.03, 0.45, 0.3);
    const vTail = new THREE.Mesh(vTailGeo, darkMat);
    vTail.position.set(0, 0.28, 0.95);
    planeGroup.add(vTail);

    const hTailGeo = new THREE.BoxGeometry(0.9, 0.025, 0.2);
    const hTail = new THREE.Mesh(hTailGeo, brandMat);
    hTail.position.set(0, 0.48, 0.95);
    planeGroup.add(hTail);

    // Propeller at Nose
    const propGroup = new THREE.Group();
    propGroup.position.set(0, 0, -1.15);
    const propBladeGeo = new THREE.BoxGeometry(0.7, 0.015, 0.06);
    const propBlade = new THREE.Mesh(propBladeGeo, propMat);
    propGroup.add(propBlade);
    planeGroup.add(propGroup);
    propMeshRef.current = propGroup;

    // Landing Wheels (Tricycle Gear)
    const wheelMat = new THREE.MeshStandardMaterial({ color: 0x1E293B, roughness: 0.8 });
    const createWheel = (x, y, z) => {
      const wGroup = new THREE.Group();
      const strut = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.2, 8), darkMat);
      strut.position.y = 0.1;
      wGroup.add(strut);
      const tire = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.04, 16), wheelMat);
      tire.rotation.z = Math.PI / 2;
      wGroup.add(tire);
      wGroup.position.set(x, y, z);
      return wGroup;
    };
    planeGroup.add(createWheel(0, -0.2, -0.5)); // Nose gear
    planeGroup.add(createWheel(-0.35, -0.2, 0.2)); // Left main gear
    planeGroup.add(createWheel(0.35, -0.2, 0.2)); // Right main gear

    scene.add(planeGroup);

    // 7. Animation Loop with Flight Trajectory
    let animId;
    let lastTime = performance.now();

    const animate = (time) => {
      animId = requestAnimationFrame(animate);
      const delta = (time - lastTime) / 1000;
      lastTime = time;

      controls.update();

      if (isPlayingRef.current) {
        // Advance flight cycle (full loop in ~12 seconds)
        flightProgressRef.current = (flightProgressRef.current + delta * 0.08) % 1.0;
      }

      const p = flightProgressRef.current;

      // Kinematic flight path calculations
      let px = 0, py = 0.26, pz = 10, pitch = 0, roll = 0, speedKmh = 0, altM = 0;
      let activeStageIdx = 0;

      if (p < 0.25) {
        // Stage 1: Takeoff Ground Roll (p: 0 -> 0.25)
        activeStageIdx = 0;
        const t = p / 0.25;
        pz = 10 - t * 14; // moves from z=10 to z=-4
        py = 0.26; // on ground
        pitch = 0;
        speedKmh = Math.round(t * 70); // accelerating 0 -> 70 km/h
        altM = 0;
      } else if (p < 0.55) {
        // Stage 2: Rotation & Climb (p: 0.25 -> 0.55)
        activeStageIdx = 1;
        const t = (p - 0.25) / 0.30;
        pz = -4 - t * 8; // z: -4 -> -12
        py = 0.26 + Math.sin(t * (Math.PI / 2)) * 3.5; // climbing to altitude
        pitch = -(12 - t * 6) * (Math.PI / 180); // pitch up 12° -> 6°
        speedKmh = Math.round(70 + t * 20);
        altM = Math.round(t * 80);
      } else if (p < 0.80) {
        // Stage 3: Level Cruise & Turnaround (p: 0.55 -> 0.80)
        activeStageIdx = 2;
        const t = (p - 0.55) / 0.25;
        // Oval turn in sky
        const angle = Math.PI + t * Math.PI;
        px = Math.sin(angle) * 3.5;
        pz = -12 + (1 - Math.cos(angle)) * 8;
        py = 3.76 + Math.sin(t * Math.PI) * 0.2;
        pitch = 0;
        roll = Math.sin(t * Math.PI) * (20 * Math.PI / 180); // banking turn
        speedKmh = 95;
        altM = 85;
      } else {
        // Stage 4: Glide Descent, Flare & Touchdown (p: 0.80 -> 1.0)
        activeStageIdx = 3;
        const t = (p - 0.80) / 0.20;
        px = (1 - t) * 0.5;
        pz = 4 + t * 6; // descending back toward runway
        py = Math.max(0.26, 3.76 * (1 - t * 0.95)); // descent to flare
        pitch = (t > 0.7 ? 5 : -4) * (Math.PI / 180); // nose down glide, then flare up at touchdown
        speedKmh = Math.round(95 - t * 45);
        altM = Math.round(Math.max(0, (1 - t) * 85));
      }

      // Update plane position & rotation
      planeGroup.position.set(px, py, pz);
      planeGroup.rotation.set(pitch, p < 0.55 ? Math.PI : (p < 0.8 ? Math.PI + (p - 0.55) / 0.25 * Math.PI : 0), roll);

      // Spin nose propeller
      if (propMeshRef.current) {
        propMeshRef.current.rotation.z += 0.5;
      }

      // Update UI Telemetry periodically
      setCurrentStage(activeStageIdx);
      setTelemetry({
        speed: speedKmh,
        alt: altM,
        pitch: Math.round(pitch * (180 / Math.PI)),
        stageName: stages[activeStageIdx].name
      });

      renderer.render(scene, camera);
    };
    animId = requestAnimationFrame(animate);

    // Resize handler
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
        title="Interactive 3D Flight Simulation: Click & drag to rotate camera"
      />

      {/* Real-time Telemetry HUD Overlay (Top Left) */}
      <div className="absolute top-3 left-3 z-20 flex flex-col gap-1.5 bg-[var(--bg-primary)]/90 backdrop-blur-sm border border-[var(--divider)] p-2.5 rounded-xl shadow-xs font-mono text-[11px]">
        <div className="flex items-center gap-2 pb-1.5 border-b border-[var(--divider)] text-[var(--accent-signal)] font-bold">
          <Plane className="w-3.5 h-3.5" />
          <span>FIXED-WING FLIGHT KINEMATICS</span>
        </div>
        <div className="grid grid-cols-3 gap-3 text-[var(--text-primary)]">
          <div>
            <span className="text-[9px] text-[var(--text-muted)] block uppercase">Airspeed</span>
            <span className="font-bold text-[var(--accent-signal)]">{telemetry.speed} km/h</span>
          </div>
          <div>
            <span className="text-[9px] text-[var(--text-muted)] block uppercase">Altitude</span>
            <span className="font-bold">{telemetry.alt} m</span>
          </div>
          <div>
            <span className="text-[9px] text-[var(--text-muted)] block uppercase">Pitch</span>
            <span className="font-bold">{telemetry.pitch}°</span>
          </div>
        </div>
      </div>

      {/* Interactive Flight Stage Selector & Playback Controls (Bottom) */}
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
            title="Restart Takeoff Cycle"
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
