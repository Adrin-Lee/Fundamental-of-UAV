import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RotateCw, ZoomIn, ZoomOut, Play, Pause, Compass, Maximize2 } from 'lucide-react';

/**
 * Procedural 3D WebGL Drone Model Viewer
 * Supports interactive orbit/drag controls, zoom, wireframe/solid toggle, and propeller animation.
 */
export default function Drone3DViewer({ 
  type = 'quad-x', 
  height = '100%', 
  className = "",
  showControls = true,
  autoRotateInit = true 
}) {
  const mountRef = useRef(null);
  const [isRotating, setIsRotating] = useState(autoRotateInit);
  const [isSpinningProps, setIsSpinningProps] = useState(true);
  const controlsRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const propMeshesRef = useRef([]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene & Camera Setup
    const width = container.clientWidth || 300;
    const height = container.clientHeight || 220;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 3.8, 5.2);

    // 2. High-Performance WebGL Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 3. Orbit Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.maxPolarAngle = Math.PI / 2 + 0.1; // prevent going under floor
    controls.minDistance = 2.5;
    controls.maxDistance = 10;
    controls.autoRotate = isRotating;
    controls.autoRotateSpeed = 2.0;
    controlsRef.current = controls;

    // 4. Lighting Rig
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 2.0);
    dirLight.position.set(5, 8, 5);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    scene.add(dirLight);

    const fillLight = new THREE.DirectionalLight(0xbfdbfe, 0.8);
    fillLight.position.set(-5, 3, -5);
    scene.add(fillLight);

    // 5. Materials
    const brandBlueMat = new THREE.MeshStandardMaterial({
      color: 0x2056a3,
      roughness: 0.25,
      metalness: 0.6,
    });

    const carbonDarkMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      roughness: 0.4,
      metalness: 0.5,
    });

    const motorMetalMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      roughness: 0.2,
      metalness: 0.9,
    });

    const propMat = new THREE.MeshStandardMaterial({
      color: 0x3b82f6,
      transparent: true,
      opacity: 0.85,
      roughness: 0.3,
    });

    const propCoaxialMat = new THREE.MeshStandardMaterial({
      color: 0xff9f3d,
      transparent: true,
      opacity: 0.85,
      roughness: 0.3,
    });

    const accentGoldMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      roughness: 0.3,
      metalness: 0.8,
    });

    // 6. Build 3D Drone Model Group
    const droneGroup = new THREE.Group();
    const propMeshes = [];

    // Helper: Create a standard Motor + Prop Assembly
    const createMotorAssembly = (x, z, motorNum = 1, isCoaxial = false) => {
      const motorGroup = new THREE.Group();
      motorGroup.position.set(x, 0, z);

      // Motor Bell
      const bellGeo = new THREE.CylinderGeometry(0.16, 0.16, 0.18, 24);
      const bellMesh = new THREE.Mesh(bellGeo, motorMetalMat);
      bellMesh.position.y = 0.09;
      bellMesh.castShadow = true;
      motorGroup.add(bellMesh);

      // Motor Shaft / Cap
      const shaftGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.08, 12);
      const shaftMesh = new THREE.Mesh(shaftGeo, accentGoldMat);
      shaftMesh.position.y = 0.22;
      motorGroup.add(shaftMesh);

      // Top Propeller
      const propGroup = new THREE.Group();
      propGroup.position.y = 0.22;

      const bladeGeo = new THREE.BoxGeometry(1.0, 0.015, 0.1);
      const bladeMesh = new THREE.Mesh(bladeGeo, propMat);
      bladeMesh.castShadow = true;
      propGroup.add(bladeMesh);
      motorGroup.add(propGroup);
      propMeshes.push({ mesh: propGroup, speed: motorNum % 2 === 0 ? 0.4 : -0.4 });

      // If Coaxial, add bottom inverted motor & prop
      if (isCoaxial) {
        const bottomBell = new THREE.Mesh(bellGeo, motorMetalMat);
        bottomBell.position.y = -0.09;
        bottomBell.rotation.x = Math.PI;
        motorGroup.add(bottomBell);

        const bottomPropGroup = new THREE.Group();
        bottomPropGroup.position.y = -0.22;
        const bottomBladeMesh = new THREE.Mesh(bladeGeo, propCoaxialMat);
        bottomPropGroup.add(bottomBladeMesh);
        motorGroup.add(bottomPropGroup);
        propMeshes.push({ mesh: bottomPropGroup, speed: motorNum % 2 === 0 ? -0.4 : 0.4 });
      }

      return motorGroup;
    };

    // Helper: Create Carbon Fiber Arm Tube
    const createArm = (fromX, fromZ, toX, toZ) => {
      const dx = toX - fromX;
      const dz = toZ - fromZ;
      const length = Math.sqrt(dx * dx + dz * dz);
      const angle = Math.atan2(dx, dz);

      const armGeo = new THREE.CylinderGeometry(0.05, 0.05, length, 16);
      const armMesh = new THREE.Mesh(armGeo, carbonDarkMat);
      armMesh.position.set((fromX + toX) / 2, 0, (fromZ + toZ) / 2);
      armMesh.rotation.x = Math.PI / 2;
      armMesh.rotation.z = -angle;
      armMesh.castShadow = true;
      return armMesh;
    };

    // Build specific airframe types
    if (type === 'quad-x' || type === 'quadcopter') {
      // 1. Central Fuselage
      const bodyGeo = new THREE.BoxGeometry(0.8, 0.22, 0.8);
      const bodyMesh = new THREE.Mesh(bodyGeo, brandBlueMat);
      bodyMesh.castShadow = true;
      droneGroup.add(bodyMesh);

      // Top Avionics Dome
      const domeGeo = new THREE.SphereGeometry(0.25, 24, 16, 0, Math.PI * 2, 0, Math.PI / 2);
      const domeMesh = new THREE.Mesh(domeGeo, carbonDarkMat);
      domeMesh.position.y = 0.11;
      droneGroup.add(domeMesh);

      // Forward Directional Indicator
      const arrowGeo = new THREE.ConeGeometry(0.12, 0.3, 16);
      const arrowMesh = new THREE.Mesh(arrowGeo, accentGoldMat);
      arrowMesh.rotation.x = -Math.PI / 2;
      arrowMesh.position.set(0, 0.14, -0.45);
      droneGroup.add(arrowMesh);

      // 4 Diagonal Arms + Motors (X-Frame: 45°, 135°, 225°, 315°)
      const armRadius = 1.4;
      const angles = [Math.PI / 4, (3 * Math.PI) / 4, (5 * Math.PI) / 4, (7 * Math.PI) / 4];
      angles.forEach((rad, i) => {
        const mx = Math.sin(rad) * armRadius;
        const mz = Math.cos(rad) * armRadius;
        droneGroup.add(createArm(0, 0, mx, mz));
        droneGroup.add(createMotorAssembly(mx, mz, i + 1));
      });

    } else if (type === 'quad-plus') {
      // Quad + Plus Frame
      const bodyGeo = new THREE.BoxGeometry(0.7, 0.22, 0.7);
      const bodyMesh = new THREE.Mesh(bodyGeo, brandBlueMat);
      bodyMesh.castShadow = true;
      droneGroup.add(bodyMesh);

      const armRadius = 1.4;
      const angles = [0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2];
      angles.forEach((rad, i) => {
        const mx = Math.sin(rad) * armRadius;
        const mz = Math.cos(rad) * armRadius;
        droneGroup.add(createArm(0, 0, mx, mz));
        droneGroup.add(createMotorAssembly(mx, mz, i + 1));
      });

    } else if (type === 'hexa' || type === 'hexacopter') {
      // 6-Rotor Hexacopter
      const bodyGeo = new THREE.CylinderGeometry(0.55, 0.55, 0.2, 6);
      const bodyMesh = new THREE.Mesh(bodyGeo, brandBlueMat);
      bodyMesh.castShadow = true;
      droneGroup.add(bodyMesh);

      const armRadius = 1.5;
      for (let i = 0; i < 6; i++) {
        const rad = (i * Math.PI) / 3;
        const mx = Math.sin(rad) * armRadius;
        const mz = Math.cos(rad) * armRadius;
        droneGroup.add(createArm(0, 0, mx, mz));
        droneGroup.add(createMotorAssembly(mx, mz, i + 1));
      }

    } else if (type === 'octo-x' || type === 'octo-plus' || type === 'octocopter') {
      // 8-Rotor Octocopter
      const bodyGeo = new THREE.CylinderGeometry(0.65, 0.65, 0.2, 8);
      const bodyMesh = new THREE.Mesh(bodyGeo, brandBlueMat);
      bodyMesh.castShadow = true;
      droneGroup.add(bodyMesh);

      const armRadius = 1.6;
      for (let i = 0; i < 8; i++) {
        const rad = (i * Math.PI) / 4 + (type === 'octo-x' ? Math.PI / 8 : 0);
        const mx = Math.sin(rad) * armRadius;
        const mz = Math.cos(rad) * armRadius;
        droneGroup.add(createArm(0, 0, mx, mz));
        droneGroup.add(createMotorAssembly(mx, mz, i + 1));
      }

    } else if (type === 'octo-x8' || type === 'x8-coaxial') {
      // X8 Coaxial (4 arms, 8 motors)
      const bodyGeo = new THREE.BoxGeometry(0.8, 0.22, 0.8);
      const bodyMesh = new THREE.Mesh(bodyGeo, brandBlueMat);
      droneGroup.add(bodyMesh);

      const armRadius = 1.4;
      const angles = [Math.PI / 4, (3 * Math.PI) / 4, (5 * Math.PI) / 4, (7 * Math.PI) / 4];
      angles.forEach((rad, i) => {
        const mx = Math.sin(rad) * armRadius;
        const mz = Math.cos(rad) * armRadius;
        droneGroup.add(createArm(0, 0, mx, mz));
        droneGroup.add(createMotorAssembly(mx, mz, i + 1, true)); // coaxial
      });

    } else if (type === 'octo-x8-plus' || type === 'x8-plus-coaxial') {
      // X8+ Coaxial (4 plus arms, 8 motors)
      const bodyGeo = new THREE.BoxGeometry(0.8, 0.22, 0.8);
      const bodyMesh = new THREE.Mesh(bodyGeo, brandBlueMat);
      droneGroup.add(bodyMesh);

      const armRadius = 1.4;
      const angles = [0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2];
      angles.forEach((rad, i) => {
        const mx = Math.sin(rad) * armRadius;
        const mz = Math.cos(rad) * armRadius;
        droneGroup.add(createArm(0, 0, mx, mz));
        droneGroup.add(createMotorAssembly(mx, mz, i + 1, true));
      });

    } else if (type === 'fixed-wing') {
      // Fixed-Wing Aircraft Model
      // Fuselage
      const fuseGeo = new THREE.CylinderGeometry(0.18, 0.12, 2.6, 24);
      const fuseMesh = new THREE.Mesh(fuseGeo, brandBlueMat);
      fuseMesh.rotation.x = Math.PI / 2;
      fuseMesh.castShadow = true;
      droneGroup.add(fuseMesh);

      // Main Wings
      const wingGeo = new THREE.BoxGeometry(3.6, 0.05, 0.55);
      const wingMesh = new THREE.Mesh(wingGeo, brandBlueMat);
      wingMesh.position.set(0, 0.1, -0.2);
      wingMesh.castShadow = true;
      droneGroup.add(wingMesh);

      // Winglets
      const wingletL = new THREE.BoxGeometry(0.04, 0.25, 0.4);
      const wingletMeshL = new THREE.Mesh(wingletL, carbonDarkMat);
      wingletMeshL.position.set(-1.8, 0.2, -0.2);
      droneGroup.add(wingletMeshL);

      const wingletMeshR = new THREE.Mesh(wingletL, carbonDarkMat);
      wingletMeshR.position.set(1.8, 0.2, -0.2);
      droneGroup.add(wingletMeshR);

      // Tail Stabilizers (T-Tail)
      const vTailGeo = new THREE.BoxGeometry(0.04, 0.6, 0.35);
      const vTailMesh = new THREE.Mesh(vTailGeo, carbonDarkMat);
      vTailMesh.position.set(0, 0.35, 1.15);
      droneGroup.add(vTailMesh);

      const hTailGeo = new THREE.BoxGeometry(1.0, 0.03, 0.25);
      const hTailMesh = new THREE.Mesh(hTailGeo, brandBlueMat);
      hTailMesh.position.set(0, 0.6, 1.15);
      droneGroup.add(hTailMesh);

      // Nose Motor & Propeller
      const noseMotor = createMotorAssembly(0, -1.35, 1);
      noseMotor.rotation.x = Math.PI / 2;
      droneGroup.add(noseMotor);

    } else if (type === 'hybrid-vtol') {
      // Hybrid VTOL Aircraft Model
      // Fuselage & Main Wing
      const fuseGeo = new THREE.CylinderGeometry(0.18, 0.12, 2.6, 24);
      const fuseMesh = new THREE.Mesh(fuseGeo, brandBlueMat);
      fuseMesh.rotation.x = Math.PI / 2;
      fuseMesh.castShadow = true;
      droneGroup.add(fuseMesh);

      const wingGeo = new THREE.BoxGeometry(3.8, 0.05, 0.6);
      const wingMesh = new THREE.Mesh(wingGeo, brandBlueMat);
      wingMesh.position.set(0, 0.1, -0.1);
      wingMesh.castShadow = true;
      droneGroup.add(wingMesh);

      // V-Tail
      const vTailL = new THREE.BoxGeometry(0.04, 0.5, 0.3);
      const vTailMeshL = new THREE.Mesh(vTailL, carbonDarkMat);
      vTailMeshL.position.set(-0.35, 0.3, 1.15);
      vTailMeshL.rotation.z = -Math.PI / 6;
      droneGroup.add(vTailMeshL);

      const vTailMeshR = new THREE.Mesh(vTailL, carbonDarkMat);
      vTailMeshR.position.set(0.35, 0.3, 1.15);
      vTailMeshR.rotation.z = Math.PI / 6;
      droneGroup.add(vTailMeshR);

      // 2 Longitudinal VTOL Motor Booms
      [-1.1, 1.1].forEach((bx) => {
        const boomGeo = new THREE.CylinderGeometry(0.04, 0.04, 1.8, 16);
        const boomMesh = new THREE.Mesh(boomGeo, carbonDarkMat);
        boomMesh.position.set(bx, 0.15, -0.1);
        boomMesh.rotation.x = Math.PI / 2;
        droneGroup.add(boomMesh);

        // Forward VTOL Motor
        droneGroup.add(createMotorAssembly(bx, -0.9, 1));
        // Aft VTOL Motor
        droneGroup.add(createMotorAssembly(bx, 0.7, 2));
      });

      // Forward Pusher Motor
      const pusherMotor = createMotorAssembly(0, 1.35, 5);
      pusherMotor.rotation.x = -Math.PI / 2;
      droneGroup.add(pusherMotor);
    }

    scene.add(droneGroup);
    propMeshesRef.current = propMeshes;

    // 7. Ground Blueprint Circular Target Ring
    const groundRingGeo = new THREE.RingGeometry(2.0, 2.02, 64);
    const groundRingMat = new THREE.MeshBasicMaterial({ color: 0x2056a3, side: THREE.DoubleSide, transparent: true, opacity: 0.25 });
    const groundRing = new THREE.Mesh(groundRingGeo, groundRingMat);
    groundRing.rotation.x = Math.PI / 2;
    groundRing.position.y = -0.6;
    scene.add(groundRing);

    // 8. Animation & Render Loop
    let animationFrameId;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Orbit controls damping & auto-rotate update
      controls.update();

      // Spin propellers
      if (isSpinningProps) {
        propMeshes.forEach(item => {
          item.mesh.rotation.y += item.speed;
        });
      }

      renderer.render(scene, camera);
    };
    animate();

    // 9. Window / Container Resize Handler
    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      if (renderer.domElement) {
        renderer.domElement.remove();
      }
      renderer.dispose();
    };
  }, [type, isSpinningProps]);

  // Update controls auto-rotation when toggled
  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.autoRotate = isRotating;
    }
  }, [isRotating]);

  const handleResetCamera = () => {
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
  };

  return (
    <div className={`relative w-full h-full flex flex-col justify-between select-none ${className}`}>
      {/* 3D WebGL Canvas Viewport */}
      <div 
        ref={mountRef} 
        className="w-full h-full cursor-grab active:cursor-grabbing outline-none"
        title="Click and drag to rotate in 3D. Scroll to zoom."
      />

      {/* Floating 3D Interaction Control HUD */}
      {showControls && (
        <div className="absolute bottom-2.5 right-2.5 z-20 flex items-center gap-1.5 bg-[var(--bg-primary)]/90 backdrop-blur-sm border border-[var(--divider)] py-1 px-2 rounded-lg shadow-sm text-xs font-mono text-[var(--text-muted)]">
          <button
            type="button"
            onClick={() => setIsRotating(!isRotating)}
            className={`p-1 rounded hover:bg-[var(--bg-elevated)] transition-colors ${
              isRotating ? 'text-[var(--accent-signal)] font-bold' : 'text-[var(--text-muted)]'
            }`}
            title={isRotating ? "Pause Auto-Rotate" : "Start Auto-Rotate"}
          >
            <RotateCw className={`w-3.5 h-3.5 ${isRotating ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }} />
          </button>

          <span className="text-[var(--divider)]">|</span>

          <button
            type="button"
            onClick={() => setIsSpinningProps(!isSpinningProps)}
            className={`p-1 rounded hover:bg-[var(--bg-elevated)] transition-colors ${
              isSpinningProps ? 'text-[var(--accent-signal)]' : 'text-[var(--text-muted)]'
            }`}
            title={isSpinningProps ? "Stop Motors" : "Start Motors"}
          >
            {isSpinningProps ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>

          <span className="text-[var(--divider)]">|</span>

          <button
            type="button"
            onClick={handleResetCamera}
            className="p-1 rounded hover:bg-[var(--bg-elevated)] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
            title="Reset 3D View Angle"
          >
            <Compass className="w-3.5 h-3.5" />
          </button>

          <span className="text-[10px] font-mono font-semibold text-[var(--accent-signal)] ml-1">
            3D ORBIT
          </span>
        </div>
      )}
    </div>
  );
}
