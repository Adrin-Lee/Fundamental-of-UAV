import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { 
  Anchor, 
  Navigation, 
  ArrowDownCircle, 
  RotateCcw, 
  Gauge, 
  Play, 
  Pause, 
  Crosshair, 
  MapPin, 
  Compass, 
  Wind, 
  ShieldCheck, 
  Activity, 
  Info,
  Layers,
  Radio,
  CheckCircle2,
  Box,
  Eye,
  Sliders,
  Maximize2
} from 'lucide-react';

/* =========================================================================
   3D ALTITUDE HOLD VISUALIZER (THREE.JS HIGH-FIDELITY SIMULATION)
   ========================================================================= */
function AltHold3DView({ isPlaying, reducedMotion, droneAlt = 42.0 }) {
  const containerRef = useRef(null);
  const rendererRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const droneGroupRef = useRef(null);
  const rotorsRef = useRef([]);
  const laserBeamRef = useRef(null);
  const groundShadowRef = useRef(null);

  // Camera Orbit State
  const [cameraView, setCameraView] = useState('perspective'); // 'perspective', 'side', 'top'
  const [pilotBehavior, setPilotBehavior] = useState('circular'); // 'circular', 'lateral', 'hover'
  const isDraggingRef = useRef(false);
  const previousMousePositionRef = useRef({ x: 0, y: 0 });
  const cameraAnglesRef = useRef({ theta: 0.6, phi: 0.45, radius: 24 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#090D16');
    sceneRef.current = scene;

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    cameraRef.current = camera;

    const updateCameraPos = () => {
      const { theta, phi, radius } = cameraAnglesRef.current;
      const x = radius * Math.sin(phi) * Math.sin(theta);
      const y = radius * Math.cos(phi) + 2.0;
      const z = radius * Math.sin(phi) * Math.cos(theta);
      camera.position.set(x, y, z);
      camera.lookAt(0, 4.2, 0);
    };
    updateCameraPos();

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = true;
    rendererRef.current = renderer;
    container.replaceChildren(renderer.domElement);

    // 4. Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 2.2);
    dirLight1.position.set(15, 30, 20);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x38bdf8, 1.0);
    dirLight2.position.set(-15, 10, -15);
    scene.add(dirLight2);

    // 5. Ground Plane & Grid (Z = 0)
    const groundGrid = new THREE.GridHelper(36, 36, 0x334155, 0x1E293B);
    groundGrid.position.y = 0;
    scene.add(groundGrid);

    // Ground Runway Radial Rings
    const ringGeo1 = new THREE.RingGeometry(5.9, 6.0, 48);
    const ringMat1 = new THREE.MeshBasicMaterial({ color: 0x38BDF8, side: THREE.DoubleSide, transparent: true, opacity: 0.3 });
    const ringMesh1 = new THREE.Mesh(ringGeo1, ringMat1);
    ringMesh1.rotation.x = -Math.PI / 2;
    ringMesh1.position.y = 0.01;
    scene.add(ringMesh1);

    const ringGeo2 = new THREE.RingGeometry(11.9, 12.0, 48);
    const ringMat2 = new THREE.MeshBasicMaterial({ color: 0x64748B, side: THREE.DoubleSide, transparent: true, opacity: 0.25 });
    const ringMesh2 = new THREE.Mesh(ringGeo2, ringMat2);
    ringMesh2.rotation.x = -Math.PI / 2;
    ringMesh2.position.y = 0.01;
    scene.add(ringMesh2);

    // 6. Holographic Locked Altitude Plane (Y = 4.2 representing 42.0m)
    const lockedPlaneGroup = new THREE.Group();
    lockedPlaneGroup.position.y = 4.2;

    const altPlaneGrid = new THREE.GridHelper(26, 26, 0x0284C7, 0x0284C7);
    altPlaneGrid.material.transparent = true;
    altPlaneGrid.material.opacity = 0.35;
    lockedPlaneGroup.add(altPlaneGrid);

    // Semi-transparent colored surface for the locked plane
    const planeGeo = new THREE.PlaneGeometry(26, 26);
    const planeMat = new THREE.MeshBasicMaterial({
      color: 0x0284C7,
      transparent: true,
      opacity: 0.06,
      side: THREE.DoubleSide
    });
    const planeMesh = new THREE.Mesh(planeGeo, planeMat);
    planeMesh.rotation.x = -Math.PI / 2;
    lockedPlaneGroup.add(planeMesh);

    scene.add(lockedPlaneGroup);

    // 7. Vertical Altitude Measurement Tower (Left side reference)
    const towerGroup = new THREE.Group();
    towerGroup.position.set(-10, 0, -8);

    const poleGeo = new THREE.CylinderGeometry(0.08, 0.08, 7.0, 16);
    const poleMat = new THREE.MeshStandardMaterial({ color: 0x64748B, roughness: 0.4 });
    const poleMesh = new THREE.Mesh(poleGeo, poleMat);
    poleMesh.position.y = 3.5;
    towerGroup.add(poleMesh);

    // Altitude Tick Rings (0m, 10m, 20m, 30m, 40m, 42.0m, 50m)
    [1.0, 2.0, 3.0, 4.0, 4.2, 5.0, 6.0].forEach((tickY) => {
      const isLockedTick = tickY === 4.2;
      const tickGeo = new THREE.CylinderGeometry(isLockedTick ? 0.35 : 0.2, isLockedTick ? 0.35 : 0.2, 0.05, 16);
      const tickMat = new THREE.MeshBasicMaterial({ color: isLockedTick ? 0x38BDF8 : 0x94A3B8 });
      const tickMesh = new THREE.Mesh(tickGeo, tickMat);
      tickMesh.position.y = tickY;
      towerGroup.add(tickMesh);
    });

    scene.add(towerGroup);

    // 8. Dynamic Drone Group
    const droneGroup = new THREE.Group();
    droneGroup.position.set(0, 4.2, 0);
    droneGroupRef.current = droneGroup;

    // Center Body Fuselage
    const bodyGeo = new THREE.BoxGeometry(1.6, 0.4, 1.6);
    const bodyMat = new THREE.MeshStandardMaterial({ color: 0x1E293B, roughness: 0.3, metalness: 0.6 });
    const bodyMesh = new THREE.Mesh(bodyGeo, bodyMat);
    droneGroup.add(bodyMesh);

    // Top Brand Dome / Avionics Hat
    const domeGeo = new THREE.CylinderGeometry(0.5, 0.7, 0.25, 16);
    const domeMat = new THREE.MeshStandardMaterial({ color: 0x0284C7, roughness: 0.2, metalness: 0.8 });
    const domeMesh = new THREE.Mesh(domeGeo, domeMat);
    domeMesh.position.y = 0.3;
    droneGroup.add(domeMesh);

    // Red Heading Nose Indicator
    const noseGeo = new THREE.ConeGeometry(0.25, 0.5, 8);
    const noseMat = new THREE.MeshBasicMaterial({ color: 0xEF4444 });
    const noseMesh = new THREE.Mesh(noseGeo, noseMat);
    noseMesh.rotation.x = -Math.PI / 2;
    noseMesh.position.set(0, 0.1, -1.05);
    droneGroup.add(noseMesh);

    // 4 Carbon Arms (X Configuration)
    const armGeo = new THREE.CylinderGeometry(0.08, 0.08, 2.8, 12);
    const armMat = new THREE.MeshStandardMaterial({ color: 0x0F172A, roughness: 0.5 });
    
    const arm1 = new THREE.Mesh(armGeo, armMat);
    arm1.rotation.y = Math.PI / 4;
    arm1.rotation.z = Math.PI / 2;
    droneGroup.add(arm1);

    const arm2 = new THREE.Mesh(armGeo, armMat);
    arm2.rotation.y = -Math.PI / 4;
    arm2.rotation.z = Math.PI / 2;
    droneGroup.add(arm2);

    // 4 Motors & Rotors
    const motorPositions = [
      { x: -1.0, z: -1.0 },
      { x: 1.0, z: -1.0 },
      { x: -1.0, z: 1.0 },
      { x: 1.0, z: 1.0 }
    ];

    const rotors = [];
    motorPositions.forEach((pos) => {
      // Motor Hub
      const motorGeo = new THREE.CylinderGeometry(0.2, 0.2, 0.28, 16);
      const motorMat = new THREE.MeshStandardMaterial({ color: 0x94A3B8, metalness: 0.8 });
      const motorMesh = new THREE.Mesh(motorGeo, motorMat);
      motorMesh.position.set(pos.x, 0.15, pos.z);
      droneGroup.add(motorMesh);

      // Spinning Rotor Propeller
      const rotorGroup = new THREE.Group();
      rotorGroup.position.set(pos.x, 0.32, pos.z);

      const bladeGeo = new THREE.BoxGeometry(1.5, 0.02, 0.14);
      const bladeMat = new THREE.MeshStandardMaterial({ color: 0x0F172A, roughness: 0.3 });
      const bladeMesh = new THREE.Mesh(bladeGeo, bladeMat);
      rotorGroup.add(bladeMesh);

      // Semi-transparent rotor blur disc
      const blurGeo = new THREE.CylinderGeometry(0.75, 0.75, 0.01, 16);
      const blurMat = new THREE.MeshBasicMaterial({ color: 0x38BDF8, transparent: true, opacity: 0.25 });
      const blurMesh = new THREE.Mesh(blurGeo, blurMat);
      rotorGroup.add(blurMesh);

      droneGroup.add(rotorGroup);
      rotors.push(rotorGroup);
    });
    rotorsRef.current = rotors;

    scene.add(droneGroup);

    // 9. Downward Laser Altitude Plumb Line from Drone (X, 4.2, Z) to Ground (X, 0, Z)
    const lineMat = new THREE.LineDashedMaterial({
      color: 0x38BDF8,
      dashSize: 0.3,
      gapSize: 0.2,
      linewidth: 2
    });
    const lineGeo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0, 4.2, 0),
      new THREE.Vector3(0, 0, 0)
    ]);
    const laserLine = new THREE.Line(lineGeo, lineMat);
    laserLine.computeLineDistances();
    laserBeamRef.current = laserLine;
    scene.add(laserLine);

    // 10. Dynamic Ground Shadow Disk
    const shadowGeo = new THREE.CircleGeometry(1.2, 32);
    const shadowMat = new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.45 });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.y = 0.02;
    groundShadowRef.current = shadowMesh;
    scene.add(shadowMesh);

    // 11. Mouse Drag to Orbit Camera
    const handleMouseDown = (e) => {
      isDraggingRef.current = true;
      previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e) => {
      if (!isDraggingRef.current) return;
      const deltaX = e.clientX - previousMousePositionRef.current.x;
      const deltaY = e.clientY - previousMousePositionRef.current.y;

      cameraAnglesRef.current.theta += deltaX * 0.008;
      cameraAnglesRef.current.phi = Math.max(0.1, Math.min(Math.PI / 2 - 0.05, cameraAnglesRef.current.phi - deltaY * 0.008));

      updateCameraPos();
      previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
    };

    const domElement = renderer.domElement;
    domElement.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    // Touch support for mobile
    const handleTouchStart = (e) => {
      if (e.touches.length === 1) {
        isDraggingRef.current = true;
        previousMousePositionRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };
    const handleTouchMove = (e) => {
      if (!isDraggingRef.current || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - previousMousePositionRef.current.x;
      const deltaY = e.touches[0].clientY - previousMousePositionRef.current.y;

      cameraAnglesRef.current.theta += deltaX * 0.008;
      cameraAnglesRef.current.phi = Math.max(0.1, Math.min(Math.PI / 2 - 0.05, cameraAnglesRef.current.phi - deltaY * 0.008));

      updateCameraPos();
      previousMousePositionRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };
    const handleTouchEnd = () => {
      isDraggingRef.current = false;
    };
    domElement.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);

    // 12. Resize Observer
    const resizeObserver = new ResizeObserver(() => {
      if (!container) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    });
    resizeObserver.observe(container);

    // 13. Animation Loop
    let animationFrameId;
    let tick = 0;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (isPlaying && !reducedMotion) {
        tick += 0.025;

        // Kinematics Calculation based on Pilot Input Behavior
        let curX = 0;
        let curZ = 0;
        let curRoll = 0;
        let curPitch = 0;
        let curYaw = 0;

        if (pilotBehavior === 'circular') {
          // Circular horizontal drift in X-Z plane
          curX = Math.sin(tick * 1.1) * 4.8;
          curZ = Math.cos(tick * 0.9) * 3.4;
          // Banking tilts in direction of acceleration
          curRoll = Math.cos(tick * 1.1) * 0.22;
          curPitch = -Math.sin(tick * 0.9) * 0.18;
          curYaw = Math.sin(tick * 0.4) * 0.2;
        } else if (pilotBehavior === 'lateral') {
          // Aggressive left-right side strafe
          curX = Math.sin(tick * 1.6) * 5.5;
          curZ = 0;
          curRoll = Math.cos(tick * 1.6) * 0.32;
          curPitch = 0;
          curYaw = 0;
        } else if (pilotBehavior === 'hover') {
          // Micro-subtle hover with zero drift
          curX = Math.sin(tick * 2) * 0.2;
          curZ = Math.cos(tick * 1.8) * 0.2;
          curRoll = Math.sin(tick * 2) * 0.03;
          curPitch = Math.cos(tick * 1.8) * 0.03;
          curYaw = 0;
        }

        // Drone position: Y is STRICTLY CONSTANT AT 4.2 (42.0m Altitude Hold Datum!)
        droneGroup.position.set(curX, 4.2, curZ);
        droneGroup.rotation.set(curPitch, curYaw, curRoll);

        // Spin rotors
        rotorsRef.current.forEach((r, idx) => {
          r.rotation.y += (idx % 2 === 0 ? 0.45 : -0.45);
        });

        // Update Laser Plumb Line
        const positions = laserBeamRef.current.geometry.attributes.position.array;
        positions[0] = curX;
        positions[1] = 4.2;
        positions[2] = curZ;
        positions[3] = curX;
        positions[4] = 0;
        positions[5] = curZ;
        laserBeamRef.current.geometry.attributes.position.needsUpdate = true;
        laserBeamRef.current.computeLineDistances();

        // Update Ground Shadow
        groundShadowRef.current.position.x = curX;
        groundShadowRef.current.position.z = curZ;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      domElement.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      domElement.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      resizeObserver.disconnect();
      renderer.dispose();
    };
  }, [isPlaying, reducedMotion, pilotBehavior]);

  // Handle Preset Camera Snaps
  const snapCamera = (viewKey) => {
    setCameraView(viewKey);
    if (!cameraRef.current) return;
    if (viewKey === 'perspective') {
      cameraAnglesRef.current = { theta: 0.6, phi: 0.45, radius: 24 };
    } else if (viewKey === 'side') {
      cameraAnglesRef.current = { theta: Math.PI / 2, phi: 0.05 + Math.PI / 2 * 0.9, radius: 22 };
    } else if (viewKey === 'top') {
      cameraAnglesRef.current = { theta: 0, phi: 0.05, radius: 24 };
    }
    const { theta, phi, radius } = cameraAnglesRef.current;
    const x = radius * Math.sin(phi) * Math.sin(theta);
    const y = radius * Math.cos(phi) + 2.0;
    const z = radius * Math.sin(phi) * Math.cos(theta);
    cameraRef.current.position.set(x, y, z);
    cameraRef.current.lookAt(0, 4.2, 0);
  };

  return (
    <div className="relative w-full aspect-[14/9] rounded-xl bg-[#090D16] border border-[var(--divider)] overflow-hidden">
      
      {/* Three.js Canvas Container */}
      <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Floating 3D Holographic HUD Overlays */}
      <div className="absolute top-3 left-3 flex flex-wrap items-center gap-2 pointer-events-none">
        <div className="px-3 py-1.5 rounded-lg bg-[#0F172A]/90 backdrop-blur-md border border-[#38BDF8]/40 shadow-xs flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#38BDF8] animate-pulse" />
          <span className="font-mono text-xs font-bold text-[#38BDF8]">
            LOCKED DATUM: 42.0m
          </span>
        </div>
        <div className="px-2.5 py-1.5 rounded-lg bg-[#0F172A]/80 backdrop-blur-md border border-[var(--divider)] font-mono text-[10px] text-[var(--text-muted)]">
          BARO: 985.4 hPa · Vz: 0.0 m/s
        </div>
      </div>

      {/* Camera View Angle Selector */}
      <div className="absolute top-3 right-3 flex items-center gap-1 bg-[#0F172A]/90 backdrop-blur-md border border-[var(--divider)] p-1 rounded-xl shadow-xs">
        <button
          type="button"
          onClick={() => snapCamera('perspective')}
          className={`px-2.5 py-1 rounded-lg font-mono text-[10px] font-bold transition-all cursor-pointer ${
            cameraView === 'perspective' ? 'bg-[#0284C7] text-white' : 'text-[var(--text-muted)] hover:text-white'
          }`}
        >
          3D Angle
        </button>
        <button
          type="button"
          onClick={() => snapCamera('side')}
          className={`px-2.5 py-1 rounded-lg font-mono text-[10px] font-bold transition-all cursor-pointer ${
            cameraView === 'side' ? 'bg-[#0284C7] text-white' : 'text-[var(--text-muted)] hover:text-white'
          }`}
        >
          Side Profile
        </button>
        <button
          type="button"
          onClick={() => snapCamera('top')}
          className={`px-2.5 py-1 rounded-lg font-mono text-[10px] font-bold transition-all cursor-pointer ${
            cameraView === 'top' ? 'bg-[#0284C7] text-white' : 'text-[var(--text-muted)] hover:text-white'
          }`}
        >
          Top Down
        </button>
      </div>

      {/* Pilot Control Simulation Toolbar (Bottom-Left) */}
      <div className="absolute bottom-3 left-3 right-3 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 p-2 rounded-xl bg-[#0F172A]/90 backdrop-blur-md border border-[var(--divider)]">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider pl-1 shrink-0">
            Pilot Lateral Input:
          </span>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setPilotBehavior('circular')}
              className={`px-2 py-1 rounded-md font-mono text-[10px] font-semibold transition-all cursor-pointer ${
                pilotBehavior === 'circular' ? 'bg-[#0284C7] text-white font-bold' : 'bg-[#1E293B] text-[var(--text-secondary)] hover:text-white'
              }`}
            >
              Circular Bank
            </button>
            <button
              type="button"
              onClick={() => setPilotBehavior('lateral')}
              className={`px-2 py-1 rounded-md font-mono text-[10px] font-semibold transition-all cursor-pointer ${
                pilotBehavior === 'lateral' ? 'bg-[#0284C7] text-white font-bold' : 'bg-[#1E293B] text-[var(--text-secondary)] hover:text-white'
              }`}
            >
              Side Strafe
            </button>
            <button
              type="button"
              onClick={() => setPilotBehavior('hover')}
              className={`px-2 py-1 rounded-md font-mono text-[10px] font-semibold transition-all cursor-pointer ${
                pilotBehavior === 'hover' ? 'bg-[#0284C7] text-white font-bold' : 'bg-[#1E293B] text-[var(--text-secondary)] hover:text-white'
              }`}
            >
              Zero Input (Hover)
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2 font-mono text-[10px] text-[#38BDF8] pr-1">
          <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8]" />
          <span>Throttle Stick: 50% [Center Deadband]</span>
        </div>
      </div>

    </div>
  );
}

/* =========================================================================
   MAIN COMPONENT: FLIGHT MODE PLAYGROUND
   ========================================================================= */
export default function FlightModePlayground() {
  const [activeMode, setActiveMode] = useState('loiter');
  const [isPlaying, setIsPlaying] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [altHoldViewType, setAltHoldViewType] = useState('3d'); // '3d' or '2d'

  // Animation frame state for dynamic top-down positions (2D Map)
  const [dronePos, setDronePos] = useState({ x: 280, y: 180, angle: 0, scale: 1, alt: 45.0 });
  const [autoStep, setAutoStep] = useState(0); // 0: WP1, 1: WP2, 2: WP3

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);

    const handleChange = (e) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Defined Mission Coordinates (SVG Coordinate Space: 0,0 to 560,360)
  const HOME = { x: 90, y: 290, label: "H (HOME)" };
  const WAYPOINTS = [
    { x: 170, y: 110, label: "WP 1 (Survey In)" },
    { x: 380, y: 80, label: "WP 2 (Apex Grid)" },
    { x: 480, y: 240, label: "WP 3 (Perimeter)" }
  ];

  // 2D Simulation Loop
  useEffect(() => {
    if (reducedMotion || !isPlaying) {
      // Instant position snaps for reduced motion
      if (activeMode === 'loiter') {
        setDronePos({ x: 280, y: 180, angle: 0, scale: 1, alt: 45.0 });
      } else if (activeMode === 'auto') {
        const wp = WAYPOINTS[autoStep % WAYPOINTS.length];
        setDronePos({ x: wp.x, y: wp.y, angle: 45, scale: 1, alt: 50.0 });
      } else if (activeMode === 'land') {
        setDronePos({ x: 280, y: 220, angle: 0, scale: 0.65, alt: 0.0 });
      } else if (activeMode === 'rtl') {
        setDronePos({ x: HOME.x, y: HOME.y, angle: 0, scale: 0.7, alt: 0.0 });
      } else if (activeMode === 'alt_hold') {
        setDronePos({ x: 330, y: 160, angle: 15, scale: 1, alt: 42.0 });
      }
      return;
    }

    let animationFrameId;
    let tick = 0;

    const animate = () => {
      tick += 0.03;

      if (activeMode === 'loiter') {
        // Subtle micro jitter representing active wind compensation
        const jitterX = Math.sin(tick * 2.5) * 3.5 + Math.cos(tick * 4) * 1.5;
        const jitterY = Math.cos(tick * 2) * 3 + Math.sin(tick * 3.5) * 1.2;
        const jitterAngle = Math.sin(tick * 2) * 4;
        setDronePos({
          x: 280 + jitterX,
          y: 180 + jitterY,
          angle: jitterAngle,
          scale: 1,
          alt: 45.0 + Math.sin(tick) * 0.2
        });
      } else if (activeMode === 'auto') {
        // Continuous waypoint traverse WP1 -> WP2 -> WP3 -> WP1
        const wpIndex = Math.floor((tick * 0.4) % 3);
        const nextWpIndex = (wpIndex + 1) % 3;
        const p1 = WAYPOINTS[wpIndex];
        const p2 = WAYPOINTS[nextWpIndex];
        const segT = ((tick * 0.4) % 1);

        const curX = p1.x + (p2.x - p1.x) * segT;
        const curY = p1.y + (p2.y - p1.y) * segT;
        const curAngle = Math.atan2(p2.y - p1.y, p2.x - p1.x) * (180 / Math.PI) + 90;

        setDronePos({
          x: curX,
          y: curY,
          angle: curAngle,
          scale: 1,
          alt: 50.0
        });
      } else if (activeMode === 'land') {
        // Descend in place and shrink
        const landingProgress = Math.min(1, (Math.sin(tick * 0.8) + 1) / 2);
        const currentScale = 1 - (landingProgress * 0.45);
        const currentAlt = Math.max(0, 45 * (1 - landingProgress));
        setDronePos({
          x: 280,
          y: 180 + landingProgress * 30,
          angle: 0,
          scale: currentScale,
          alt: currentAlt
        });
      } else if (activeMode === 'rtl') {
        // Fly directly toward Home coordinate then touchdown
        const rtlPhase = ((tick * 0.5) % 2); // 0 to 1 = transit, 1 to 2 = land
        if (rtlPhase < 1) {
          const t = rtlPhase;
          const startX = 420;
          const startY = 120;
          const curX = startX + (HOME.x - startX) * t;
          const curY = startY + (HOME.y - startY) * t;
          const curAngle = Math.atan2(HOME.y - startY, HOME.x - startX) * (180 / Math.PI) + 90;
          setDronePos({
            x: curX,
            y: curY,
            angle: curAngle,
            scale: 1,
            alt: 50.0
          });
        } else {
          const landT = rtlPhase - 1;
          setDronePos({
            x: HOME.x,
            y: HOME.y,
            angle: 0,
            scale: 1 - landT * 0.4,
            alt: Math.max(0, 50 * (1 - landT))
          });
        }
      } else if (activeMode === 'alt_hold') {
        // Lateral drifting (simulating pilot roll/pitch) with fixed altitude
        const driftX = 260 + Math.sin(tick * 1.2) * 90;
        const driftY = 180 + Math.cos(tick * 1.5) * 50;
        const rollTilt = Math.cos(tick * 1.2) * 15;
        setDronePos({
          x: driftX,
          y: driftY,
          angle: rollTilt,
          scale: 1,
          alt: 42.0 // Stays perfectly constant!
        });
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [activeMode, isPlaying, reducedMotion, autoStep]);

  // Mode Metadata Definition
  const modeDetails = {
    loiter: {
      name: "Loiter Mode",
      icon: Anchor,
      tag: "GPS + Altitude Position Lock",
      telemetry: `MODE: LOITER · 3D GPS HOLD · POS: (${dronePos.x.toFixed(1)}, ${dronePos.y.toFixed(1)}) · ALT: ${dronePos.alt.toFixed(1)}m · WIND COMP: ACTIVE`,
      description: "Uses GPS and onboard sensors to hold the UAV at a fixed position and altitude. The UAV automatically compensates for wind and minor disturbances.",
      pilotAuthority: "Hands-off Stationary Hover (Automatic Wind Rejection)",
      activeSensors: ["GPS (3D Fix)", "IMU (Gyro/Accel)", "Barometer", "Compass"]
    },
    auto: {
      name: "Auto Mode",
      icon: Navigation,
      tag: "Autonomous Waypoint Flight",
      telemetry: `MODE: AUTO · MISSION ACTIVE · WP SEQUENCE [1→2→3] · HDG: ${dronePos.angle.toFixed(0)}° · ALT: ${dronePos.alt.toFixed(1)}m`,
      description: "The UAV follows a pre-programmed flight path or mission without continuous pilot input. Waypoints and mission parameters are uploaded before take off.",
      pilotAuthority: "Full Autopilot Navigation (Survey/Mapping Mission Execution)",
      activeSensors: ["GPS Navigation", "Flight Controller Path Planner", "IMU Fusion"]
    },
    land: {
      name: "Land Mode",
      icon: ArrowDownCircle,
      tag: "Vertical Descent & Disarm",
      telemetry: `MODE: LAND · AUTONOMOUS DESCENT · VERT SPEED: -1.2 m/s · ALT: ${dronePos.alt.toFixed(1)}m · GROUND SENSING`,
      description: "Land Mode is a flight mode in which the UAV automatically lands at its current location. It can be used during normal operations or in emergency situations, such as low battery.",
      pilotAuthority: "Automatic Controlled Touchdown at Current Coordinates",
      activeSensors: ["Barometer (Rate of Descent)", "Rangefinder / IMU", "Motor Commutation"]
    },
    rtl: {
      name: "RTL (Return-to-Launch)",
      icon: RotateCcw,
      tag: "Autonomous Home Failsafe",
      telemetry: `MODE: RTL · RETURNING TO LAUNCHPAD · HOME POINT [90, 290] · SAFE ALT: 50.0m · AUTO LAND ARMED`,
      description: "The UAV automatically returns to its take-off location and lands. Can be activated manually or automatically during communication loss or low battery.",
      pilotAuthority: "Emergency / Pilot Autonomous Return (Geo-referenced Home Point)",
      activeSensors: ["GPS Home Lock", "Compass Heading", "Barometer Altitude Clearance"]
    },
    alt_hold: {
      name: "Alt Hold (Altitude Hold)",
      icon: Gauge,
      tag: "3D Barometric Vertical Plane Lock",
      telemetry: `MODE: ALT HOLD · 3D HEIGHT LOCK: 42.0m · BARO PID: ACTIVE · PILOT ROLL/PITCH: FREE DRIFT`,
      description: "Alt Hold Mode automatically maintains the UAV at a constant altitude plane (Z-axis locked). The pilot controls the UAV's roll, pitch, and yaw, while the flight controller automatically adjusts collective throttle to keep height constant.",
      pilotAuthority: "Pilot Lateral Control (Pitch/Roll/Yaw) + Automated 3D Height Lock",
      activeSensors: ["Barometer (Air Pressure PID)", "IMU Attitude Stabilize", "Throttle Deadband Manager"]
    }
  };

  const currentMode = modeDetails[activeMode];
  const ModeIcon = currentMode.icon;

  return (
    <div className="rounded-2xl bg-[var(--bg-elevated)] border border-[var(--divider)] p-6 sm:p-8 shadow-xs">
      
      {/* Top Header & Mode Selectors */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-6 mb-6 border-b border-[var(--divider)] gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-[var(--accent-signal)]" />
            <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[var(--accent-signal)]">
              TIER 1 SIGNATURE INTERACTIVE TOOL
            </span>
          </div>
          <h3 className="font-display text-xl sm:text-2xl font-bold text-[var(--text-primary)]">
            Flight-Mode Interactive Visual Playground
          </h3>
          <p className="font-body text-xs sm:text-sm text-[var(--text-muted)] mt-1">
            Select any flight mode to observe the flight controller's real-time kinematic response, 3D altitude locks, and pilot assistance level.
          </p>
        </div>

        {/* Play / Pause Toggle */}
        <button
          type="button"
          onClick={() => setIsPlaying(!isPlaying)}
          className="self-start lg:self-auto inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[var(--bg-primary)] border border-[var(--divider)] hover:border-[var(--accent-signal)] font-mono text-xs font-semibold text-[var(--accent-signal)] shadow-2xs transition-all focus-visible:ring-2 focus-visible:ring-[var(--border-focus)] min-h-[44px] cursor-pointer"
        >
          {isPlaying ? (
            <>
              <Pause className="w-3.5 h-3.5" />
              <span>Pause Motion</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5" />
              <span>Resume Motion</span>
            </>
          )}
        </button>
      </div>

      {/* 5 Mode Selector Buttons Bar (Min 44px touch targets) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 mb-8">
        {[
          { id: 'loiter', label: '1. Loiter', icon: Anchor },
          { id: 'auto', label: '2. Auto', icon: Navigation },
          { id: 'land', label: '3. Land', icon: ArrowDownCircle },
          { id: 'rtl', label: '4. RTL', icon: RotateCcw },
          { id: 'alt_hold', label: '5. Alt Hold (3D)', icon: Gauge }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeMode === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveMode(tab.id)}
              className={`min-h-[44px] py-2.5 px-3 rounded-xl font-display text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-2xs focus-visible:ring-2 focus-visible:ring-[var(--border-focus)] cursor-pointer ${
                isActive
                  ? 'bg-[var(--accent-signal)] text-white shadow-brand border border-[var(--accent-signal-deep)]'
                  : 'bg-[var(--bg-primary)] text-[var(--text-secondary)] border border-[var(--divider)] hover:border-[var(--accent-signal)] hover:text-[var(--accent-signal)]'
              }`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span className="truncate">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Main Interactive Stage: 3D / 2D Canvas (Left) vs Real-time Telemetry (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Visual Canvas Container */}
        <div className="lg:col-span-7 w-full">
          <div className="relative rounded-2xl bg-[var(--bg-primary)] border border-[var(--divider)] p-4 sm:p-5 shadow-card overflow-hidden">
            
            {/* Map Canvas Header Info & 3D Toggle for Alt Hold */}
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-[var(--divider)] font-mono text-[11px] text-[var(--text-muted)]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[var(--accent-signal)]" />
                <span className="font-bold text-[var(--text-primary)]">
                  {activeMode === 'alt_hold' && altHoldViewType === '3d' 
                    ? '3D HOLOGRAPHIC ALTITUDE PLANE SIMULATION' 
                    : 'TOP-DOWN 2D MISSION MAP'}
                </span>
              </div>

              {activeMode === 'alt_hold' ? (
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setAltHoldViewType('3d')}
                    className={`px-2 py-0.5 rounded-md font-mono text-[10px] font-bold transition-all cursor-pointer ${
                      altHoldViewType === '3d' 
                        ? 'bg-[var(--accent-signal)] text-white' 
                        : 'bg-[var(--bg-elevated)] text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                    }`}
                  >
                    3D View
                  </button>
                  <button
                    type="button"
                    onClick={() => setAltHoldViewType('2d')}
                    className={`px-2 py-0.5 rounded-md font-mono text-[10px] font-bold transition-all cursor-pointer ${
                      altHoldViewType === '2d' 
                        ? 'bg-[var(--accent-signal)] text-white' 
                        : 'bg-[var(--bg-elevated)] text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                    }`}
                  >
                    2D Plan
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Wind className="w-3.5 h-3.5 text-[var(--text-muted)]" />
                  <span>Wind: 8 km/h ENE</span>
                </div>
              )}
            </div>

            {/* Render 3D Altitude Visualizer for Alt Hold Mode (or 2D SVG for other modes / 2D toggle) */}
            {activeMode === 'alt_hold' && altHoldViewType === '3d' ? (
              <AltHold3DView isPlaying={isPlaying} reducedMotion={reducedMotion} droneAlt={dronePos.alt} />
            ) : (
              <div className="relative w-full aspect-[14/9] rounded-xl bg-[#F8FAFC] border border-[var(--divider)] overflow-hidden">
                <div className="absolute inset-0 blueprint-grid opacity-25 pointer-events-none" />

                <svg 
                  className="w-full h-full" 
                  viewBox="0 0 560 360" 
                  preserveAspectRatio="xMidYMid meet"
                  role="img"
                  aria-label="Interactive 2D top-down flight mode demonstration map"
                >
                  <defs>
                    {/* Grid Marker Pattern */}
                    <radialGradient id="homeGlow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#2056A3" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#2056A3" stopOpacity="0" />
                    </radialGradient>
                  </defs>

                  {/* 1. Planned Waypoint Dashed Mission Flight Path */}
                  <path
                    d={`M ${HOME.x} ${HOME.y} L ${WAYPOINTS[0].x} ${WAYPOINTS[0].y} L ${WAYPOINTS[1].x} ${WAYPOINTS[1].y} L ${WAYPOINTS[2].x} ${WAYPOINTS[2].y} Z`}
                    fill="none"
                    stroke={activeMode === 'auto' ? '#2056A3' : '#CBD5E1'}
                    strokeWidth="2"
                    strokeDasharray="6 4"
                    className={activeMode === 'auto' ? 'animate-pulse' : ''}
                  />

                  {/* Direct RTL Path (Active during RTL Mode) */}
                  {activeMode === 'rtl' && (
                    <line
                      x1="420"
                      y1="120"
                      x2={HOME.x}
                      y2={HOME.y}
                      stroke="#EF4444"
                      strokeWidth="2"
                      strokeDasharray="4 4"
                    />
                  )}

                  {/* 2. Home Takeoff Pad Marker */}
                  <g transform={`translate(${HOME.x}, ${HOME.y})`}>
                    <circle r="26" fill="url(#homeGlow)" />
                    <circle r="16" fill="#FFFFFF" stroke="#2056A3" strokeWidth="2.5" />
                    <text 
                      textAnchor="middle" 
                      dy="5" 
                      className="font-mono text-[11px] font-bold fill-[var(--accent-signal)]"
                    >
                      H
                    </text>
                    <text 
                      textAnchor="middle" 
                      dy="32" 
                      className="font-mono text-[8px] font-bold fill-[#475569]"
                    >
                      HOME [LAUNCH]
                    </text>
                  </g>

                  {/* 3. Three Autonomous Waypoints */}
                  {WAYPOINTS.map((wp, idx) => (
                    <g key={idx} transform={`translate(${wp.x}, ${wp.y})`}>
                      <circle r="12" fill="#FFFFFF" stroke="#64748B" strokeWidth="2" />
                      <circle r="4" fill="#2056A3" />
                      <text 
                        textAnchor="middle" 
                        dy="4" 
                        className="font-mono text-[9px] font-bold fill-white"
                      >
                        {idx + 1}
                      </text>
                      <text 
                        textAnchor="middle" 
                        dy="24" 
                        className="font-mono text-[8px] font-semibold fill-[#64748B]"
                      >
                        {wp.label}
                      </text>
                    </g>
                  ))}

                  {/* 4. Dynamic Simulated UAV Drone Icon */}
                  <g 
                    transform={`translate(${dronePos.x}, ${dronePos.y}) rotate(${dronePos.angle}) scale(${dronePos.scale})`}
                    className="transition-transform duration-100 ease-out"
                  >
                    {/* Drone Proximity Radar Pulse */}
                    <circle r="28" fill="none" stroke="#2056A3" strokeWidth="1" strokeOpacity="0.4" className="animate-ping" />

                    {/* Quadcopter Carbon Arms (X-Shape) */}
                    <line x1="-18" y1="-18" x2="18" y2="18" stroke="#1E293B" strokeWidth="4" strokeLinecap="round" />
                    <line x1="-18" y1="18" x2="18" y2="-18" stroke="#1E293B" strokeWidth="4" strokeLinecap="round" />

                    {/* 4 Spinning Rotor Discs */}
                    {[-18, 18].map((rx) =>
                      [-18, 18].map((ry) => (
                        <g key={`${rx}-${ry}`} transform={`translate(${rx}, ${ry})`}>
                          <circle r="9" fill="#E2E8F0" stroke="#2056A3" strokeWidth="1.5" strokeOpacity="0.6" />
                          <circle r="2.5" fill="#2056A3" />
                        </g>
                      ))
                    )}

                    {/* Center Fuselage Hub */}
                    <rect x="-10" y="-12" width="20" height="24" rx="5" fill="#2056A3" stroke="#00439B" strokeWidth="1.5" />
                    {/* Forward Heading Nose Indicator */}
                    <polygon points="0,-16 -4,-10 4,-10" fill="#EF4444" />
                  </g>

                  {/* Fixed Altitude HUD Tag (Resolved width & generous padding so text never clips) */}
                  <g transform="translate(420, 335)">
                    <rect x="-100" y="-15" width="200" height="26" rx="13" fill="#0F172A" stroke="#1E293B" strokeWidth="1" />
                    <text 
                      textAnchor="middle" 
                      dy="2" 
                      className="font-mono text-[9px] font-bold fill-[#38BDF8]"
                    >
                      ALT: {dronePos.alt.toFixed(1)}m — {activeMode === 'alt_hold' ? 'HOLD [LOCKED]' : 'BARO'}
                    </text>
                  </g>
                </svg>
              </div>
            )}

            {/* Telemetry Live Feed Line */}
            <div className="mt-3 pt-2.5 border-t border-[var(--divider)] font-mono text-[11px] text-[var(--accent-signal)] truncate">
              &gt; {currentMode.telemetry}
            </div>

          </div>
        </div>

        {/* Right Column: Live Status Readout & Behavioral Specification */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          
          <div className="p-6 rounded-2xl bg-[var(--bg-primary)] border border-[var(--divider)] shadow-xs">
            
            {/* Header Badge */}
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-[var(--divider)]">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[var(--accent-signal-subtle)] border border-[#BFDBFE] flex items-center justify-center text-[var(--accent-signal)] shadow-2xs">
                  <ModeIcon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-display text-base font-bold text-[var(--text-primary)]">
                    {currentMode.name}
                  </h4>
                  <span className="font-mono text-[10px] text-[var(--accent-signal)] font-semibold uppercase">
                    {currentMode.tag}
                  </span>
                </div>
              </div>
              <span className="font-mono text-xs font-bold text-[#047857] bg-[#ECFDF5] px-2.5 py-0.5 rounded-full border border-[#A7F3D0]">
                ENGAGED
              </span>
            </div>

            {/* Verbatim Definition Quote */}
            <div className="mb-5">
              <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)] block mb-1.5">
                Flight Controller Behavioral Directive:
              </span>
              <p className="font-body text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed bg-[var(--bg-elevated)] p-3.5 rounded-xl border border-[var(--divider)]">
                "{currentMode.description}"
              </p>
            </div>

            {/* Pilot Control Authority */}
            <div className="mb-5">
              <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)] block mb-1">
                Pilot Authority Level:
              </span>
              <div className="flex items-center gap-2 font-mono text-xs font-semibold text-[var(--text-primary)]">
                <Activity className="w-4 h-4 text-[var(--accent-signal)]" />
                <span>{currentMode.pilotAuthority}</span>
              </div>
            </div>

            {/* Primary Required Sensors */}
            <div className="pt-4 border-t border-[var(--divider)]">
              <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)] block mb-2">
                Required Avionics Sensor Feeds:
              </span>
              <div className="flex flex-wrap gap-1.5 font-mono text-[10px]">
                {currentMode.activeSensors.map((sensor, i) => (
                  <span 
                    key={i} 
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[var(--bg-elevated)] border border-[var(--divider)] text-[var(--text-secondary)]"
                  >
                    <CheckCircle2 className="w-3 h-3 text-[var(--accent-signal)]" />
                    <span>{sensor}</span>
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* Quick Explanatory Note */}
          <div className="p-4 rounded-xl bg-[var(--bg-primary)] border border-[var(--divider)] font-body text-xs text-[var(--text-muted)] flex items-start gap-2.5">
            <Info className="w-4 h-4 text-[var(--accent-signal)] shrink-0 mt-0.5" />
            <span>
              {activeMode === 'alt_hold' ? (
                <>
                  In <strong>Altitude Hold</strong>, the barometer measures air pressure variations. As the pilot banks or pitches laterally, the FC automatically commands extra motor thrust to keep the vertical force equal to weight ($T \cdot \cos\theta = mg$).
                </>
              ) : (
                <>
                  Autonomous failsafes like <strong>RTL</strong> or <strong>Land</strong> automatically trigger when radio link loss (RC Failsafe) or critical low battery thresholds are breached.
                </>
              )}
            </span>
          </div>

        </div>

      </div>

    </div>
  );
}
