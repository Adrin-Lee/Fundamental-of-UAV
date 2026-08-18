# Asteria Drone Fundamentals Platform
## Complete Software Architecture & Technical Documentation

---

### Document Overview
- **System Name:** Asteria Drone Fundamentals Platform
- **Version:** 1.0.0
- **Primary Audience:** UAV Engineers, Drone System Architects, Flight Technicians, Software Developers, and Training Instructors.
- **Repository Scope:** Comprehensive educational, simulation, and certification platform covering drone aerodynamics, propulsion, electronics, flight avionics, attitude kinematics, DGCA aviation regulations, and statutory airspace compliance.

---

## 1. Executive Summary & System Overview

The **Asteria Drone Fundamentals Platform** is a modern, high-performance, interactive Single-Page Application (SPA) designed to deliver comprehensive training in Unmanned Aerial Vehicle (UAV) systems. Built on React 18, Vite 5, TailwindCSS, and Three.js WebGL rendering, the platform bridges theoretical aeronautical physics with hands-on interactive engineering simulators.

```
       +-------------------------------------------------------------------+
       |              Asteria Drone Fundamentals Web Platform              |
       +-------------------------------------------------------------------+
                                         |
     +-------------------+---------------+-------------------+-------------+
     |                   |                                   |             |
     v                   v                                   v             v
+----------+   +-------------------+              +--------------------+ +-------------------+
| 4 Core   |   | 8 Learning        |              | 6 Interactive      | | Dual-Tier         |
| Tracks   |   | Modules           |              | Simulators & Tools | | Assessment Engine |
+----------+   +-------------------+              +--------------------+ +-------------------+
| 01. Lift |   | Mod 1: Intro & Terminology       | 1. 3D Attitude     | | 8x Module Quizzes |
| 02. Ctrl |   | Mod 2: Types of Drones           | 2. 4-Force Balance | | (80 Questions,    |
| 03. Nav  |   | Mod 3: Drone Components          | 3. Autopilot 2D Map| |  80% Pass Gate)   |
| 04. Comp |   | Mod 4: FC & Sensor Fusion        | 4. Sensor Fusion   | |                   |
+----------+   | Mod 5: UAV Flight Forces         | 5. Battery Sizing  | | 1x Final Exam     |
               | Mod 6: Flight Modes              | 6. DGCA Airspace   | | (12 Questions,    |
               | Mod 7: Attitude Kinematics       +--------------------+ |  75% Pass Gate)   |
               | Mod 8: DGCA Rules 2021                                +-------------------+
               +-------------------------------------------------------+
```

### Core Value Propositions
1. **Curriculum Hierarchy:** 4 sequential learning tracks containing 8 exhaustive study modules aligned with industry standard UAV engineering syllabi.
2. **Interactive 3D & Vector Simulators:** Real-time WebGL attitude gimbals, aerodynamic vector balance physics, 2D top-down autopilot mission playgrounds, battery pack calculators, ESC form-factor selectors, and DGCA airspace proximity checkers.
3. **Rigorous Knowledge Assessment:** 80 module-level multiple choice questions (10 per module: 4 core definitions + 6 tricky engineering scenarios) enforcing an 80% passing threshold, culminating in a 12-question final certification examination.
4. **Zero-Latency Client-Side State:** Hash-based SPA router with instant transitions and persistent browser storage (`localStorage`) tracking module completions, glossary flashcard mastery, and certification status.

---

## 2. Technology Stack & Dependencies

The application utilizes a lean, modern frontend stack optimized for 60 FPS WebGL rendering, zero runtime compilation overhead, and instant hot module replacement (HMR).

| Layer | Technology | Version | Purpose & Architecture Rationale |
| :--- | :--- | :--- | :--- |
| **Core Framework** | React | `^18.3.1` | Declarative component UI, hooks-based state management (`useState`, `useEffect`, `useRef`). |
| **DOM Renderer** | React DOM | `^18.3.1` | High-efficiency Virtual DOM reconciliation for real-time telemetry updates. |
| **Build Toolchain** | Vite | `^5.2.11` | ESM-native dev server, instant HMR, Rollup production bundler. |
| **3D Graphics Engine** | Three.js | `^0.185.1` | WebGL scene graphs, procedural 3D airframe meshes, OrbitControls, dynamic lighting, real-time Euler rotation matrix calculations. |
| **CSS Framework** | TailwindCSS | `^3.4.3` | Utility-first CSS engine with JIT (Just-In-Time) compilation. |
| **CSS Processing** | PostCSS / Autoprefixer | `^8.4.38` / `^10.4.19` | Vendor prefixing and modern CSS transformation pipeline. |
| **Iconography** | Lucide React | `^0.378.0` | Feather-derived tree-shakable SVG icon library. |

---

## 3. Directory Structure & File Architecture

The repository adheres to a clean, modular structure separating presentation, stateful tools, static data stores, and asset configurations.

```
Drone study material/
│
├── index.html                        # Application HTML5 root shell & font preload link
├── package.json                      # Project metadata, scripts, and dependencies
├── vite.config.js                    # Vite bundler configuration (React plugin)
├── tailwind.config.js                # Tailwind theme extensions, color tokens, font families
├── postcss.config.js                 # PostCSS plugin pipeline (TailwindCSS, Autoprefixer)
│
├── src/
│   ├── main.jsx                      # React application entry point (StrictMode mount)
│   ├── App.jsx                       # Master hash router, global state, layout scaffold
│   ├── index.css                     # Global CSS tokens, custom properties, typography
│   │
│   ├── data/                         # Immutable static data stores
│   │   ├── curriculumData.js         # 4 Tracks, 8 Modules, technical glossary data
│   │   └── moduleAssessmentsData.js  # 80 assessment questions (10 per module with explanations)
│   │
│   └── components/                   # React UI views, simulators, and interactive widgets
│       │
│       ├── # Navigation & Global Chrome
│       ├── Navbar.jsx                # Global responsive header navigation & track switcher
│       ├── Hero.jsx                  # Landing page hero banner with curriculum CTA
│       ├── TrackIndex.jsx            # 4-track sequential syllabus cards
│       ├── CurriculumMatrix.jsx      # Comprehensive 8-module directory matrix
│       ├── Footer.jsx                # Statutory DGCA compliance footer & links
│       ├── SectionHeading.jsx        # Reusable typography heading component
│       │
│       ├── # High-Level Application Views
│       ├── CurriculumFlashcardsView.jsx # 3D flippable curriculum flashcard browser
│       ├── SimulatorsHubView.jsx     # Unified engineering workbench for all 6 simulators
│       ├── ModuleAssessmentView.jsx  # Dedicated full-page module assessment runner
│       ├── FinalAssessment.jsx       # 12-question final certification exam & certificate generator
│       │
│       ├── # 8 Dedicated Module Study Views
│       ├── ModuleIntroView.jsx       # Module 1: Intro & Terminology
│       ├── ModuleDroneTypesView.jsx  # Module 2: Airframe Architectures (+ / X / VTOL)
│       ├── ModuleDroneComponentsView.jsx # Module 3: Components & Propulsion (ESC / Battery)
│       ├── ModuleFCSensorsView.jsx   # Module 4: Flight Controller & Sensor Fusion
│       ├── ModuleFlightForcesView.jsx# Module 5: Aerodynamic Flight Forces (4 Forces)
│       ├── ModuleFlightModesView.jsx # Module 6: UAV Flight Modes (Loiter / RTL / Auto)
│       ├── ModuleAttitudeKinematicsView.jsx # Module 7: Attitude & Axis Movement (Roll/Pitch/Yaw)
│       ├── ModuleDGCARulesView.jsx   # Module 8: DGCA Drone Rules 2021 & Airspace Zones
│       │
│       ├── # Interactive Simulators & Tier 2 Engineering Tools
│       ├── RollPitchYawSimulator.jsx # 3D Three.js quadcopter attitude gimbal simulator
│       ├── ForceBalanceSimulator.jsx # Interactive 4-force vector balance simulator
│       ├── FlightModePlayground.jsx  # Top-down 2D SVG autonomous mission flight playground
│       ├── SensorFusionTool.jsx      # Sensor dependency matrix & autopilot degradation tool
│       ├── BatteryCalculator.jsx     # Series/Parallel LiPo battery energy & rating calculator
│       ├── ESCSelector.jsx           # 1-in-1 / 4-in-1 / 8-in-1 ESC topology comparator
│       ├── DGCAZoneChecker.jsx       # Aerodrome distance & altitude clearance evaluator
│       │
│       ├── # Specialized 3D WebGL Sub-Visualizers
│       ├── Drone3DViewer.jsx         # WebGL airframe viewer (Quad-X, Plus, Hexa, Octo, VTOL)
│       ├── FixedWingFlightSimulator.jsx # 3D Fixed-wing runway takeoff & cruise trajectory
│       ├── HybridVTOLFlightSimulator.jsx# 3D Dual-propulsion VTOL hover-to-cruise transition
│       ├── DroneTypeComparator.jsx   # Interactive 3D multirotor airframe comparison
│       ├── PropellerSpinPreview.jsx  # CW / CCW rotational torque balance visualizer
│       ├── ExplodedViewPlaceholder.jsx # Interactive 3D subsystem assembly schematic
│       ├── GlossaryFlashcards.jsx    # 14-term technical glossary with mastery tracking
│       └── ModuleAssessmentCard.jsx  # Embedded module knowledge assessment widget
```

---

## 4. Design System & Visual Specification

The user interface follows a clean, high-precision technical aesthetic tailored for aerospace engineering.

### 4.1 Color Tokens & CSS Variables

Defined globally in `src/index.css` and mapped into `tailwind.config.js`:

| CSS Variable | Hex Code | Semantic Role & Application |
| :--- | :--- | :--- |
| `--bg-primary` | `#FFFFFF` | Main page background and card surfaces. |
| `--bg-elevated` | `#F5F7FA` | Secondary containers, simulator workbenches, and tool sidebars. |
| `--bg-surface-subtle` | `#E8F0FE` | Light blue tinted active states, category pills, and table headers. |
| `--accent-signal` | `#2056A3` | Primary brand blue; interactive buttons, active tabs, primary vectors. |
| `--accent-signal-deep` | `#00439B` | High-contrast hover states and active focus indicators. |
| `--accent-signal-subtle` | `#E8F0FE` | Soft blue badge fills and container highlights. |
| `--accent-success` | `#10B981` | Completed module indicators, passing score banners, green airspace. |
| `--accent-warn` | `#FF9F3D` | Warning alerts, degraded sensor modes, yellow airspace zones. |
| `--accent-danger` | `#FF4D4D` | Critical sensor failures, red prohibited airspace, failing scores. |
| `--text-primary` | `#0F172A` | Primary typography headers and high-contrast labels (Slate 900). |
| `--text-secondary` | `#334155` | Secondary body text and subtitles (Slate 700). |
| `--text-muted` | `#5B6472` | Captions, metadata timestamps, and inactive controls. |
| `--divider` | `#E2E8F0` | Structural borders, splitters, and card outlines. |
| `--border-focus` | `#2056A3` | Keyboard accessibility focus rings. |

### 4.2 Typography System

The platform loads Google Fonts via `index.html`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet">
```

- **Display & Headings (`font-display`):** `Space Grotesk`, sans-serif. Used for all module titles, hero headlines, section headers, and modal labels.
- **Body Text (`font-body`):** `Inter`, sans-serif. Used for technical copy, explanations, instructional notes, and assessment questions.
- **Data & Telemetry (`font-mono`):** `JetBrains Mono`, monospace. Used for real-time simulator readouts (angles, voltages, airspeeds, coordinates), formulas, and glossary acronyms.

### 4.3 Key Visual Design Patterns
- **Section Heading Pattern (`SectionHeading.jsx`):**
  1. Eyebrow: `font-display text-xs font-bold uppercase tracking-wider text-[var(--accent-signal)]`
  2. Main Title: `font-display text-2xl sm:text-3xl font-bold tracking-tight text-[var(--text-primary)]`
  3. Subtitle: `font-body text-sm sm:text-base text-[var(--text-muted)]`
- **Blueprint Grid Overlay (`.blueprint-grid`):** Subtle SVG grid backdrop applied behind 3D WebGL canvases to establish an engineering CAD feel.
- **3D Card Flip Mechanism:** Hardware-accelerated CSS `perspective: 1000px`, `transform-style: preserve-3d`, and `transform: rotateY(180deg)` used in glossary flashcards and curriculum review cards.
- **Accessibility & Motion Preference:** All CSS animations and Three.js auto-rotations query `window.matchMedia('(prefers-reduced-motion: reduce)')` to automatically disable continuous spinning when requested by the user's operating system.

---

## 5. Routing Architecture & Application State

The platform implements a lightweight, dependency-free **Hash-Based Router** in `src/App.jsx`.

```
                  +-----------------------------------+
                  |   window.location.hash Changed    |
                  +-----------------------------------+
                                    |
                                    v
                  +-----------------------------------+
                  |     resolveViewFromHash(hash)     |
                  +-----------------------------------+
                                    |
     +-----------------+------------+------------+-----------------+
     |                 |                         |                 |
     v                 v                         v                 v
+---------+   +------------------+     +-------------------+   +-----------------+
| 'home'  |   | 'curriculum'     |     | 'module-{1..8}'   |   | 'assessment-    |
| View    |   | Flashcards View  |     | Dedicated View    |   | module-{1..8}'  |
+---------+   +------------------+     +-------------------+   +-----------------+
     |                 |                         |                 |
     +-----------------+------------+------------+-----------------+
                                    |
                                    v
                  +-----------------------------------+
                  |  Simulators Hub / Tool Deep Links |
                  |  'tools-roll-pitch-yaw'           |
                  |  'tools-force-balance'            |
                  |  'tools-flight-mode-playground'   |
                  |  'tools-sensor-fusion'            |
                  |  'tools-battery-calc'             |
                  |  'tools-dgca-zone-checker'        |
                  +-----------------------------------+
```

### 5.1 Route Mapping Table

| URL Hash Route | View Identifier | Rendered Component | Description |
| :--- | :--- | :--- | :--- |
| `#/` or `""` | `home` | `Hero`, `TrackIndex`, `CurriculumMatrix` | Main landing portal and curriculum directory. |
| `#/curriculum` | `curriculum` | `CurriculumFlashcardsView` | 3D interactive flashcard browser for all 8 modules. |
| `#/simulators` | `simulators` | `SimulatorsHubView` | Unified engineering workbench with tabbed access to all 6 tools. |
| `#/modules/mod-intro-terminology` | `module-1` | `ModuleIntroView` | Module 1 study material, video player, and glossary. |
| `#/modules/mod-types-of-drones` | `module-2` | `ModuleDroneTypesView` | Module 2 airframe architectures and 3D models. |
| `#/modules/mod-drone-components` | `module-3` | `ModuleDroneComponentsView` | Module 3 hardware, propulsion, ESC, and battery tools. |
| `#/modules/mod-fc-sensors` | `module-4` | `ModuleFCSensorsView` | Module 4 FC avionics, IMU sensors, and sensor fusion tool. |
| `#/modules/mod-flight-forces` | `module-5` | `ModuleFlightForcesView` | Module 5 aerodynamic flight forces and vector simulator. |
| `#/modules/mod-flight-modes` | `module-6` | `ModuleFlightModesView` | Module 6 flight modes and 2D mission playground. |
| `#/modules/mod-attitude-kinematics`| `module-7` | `ModuleAttitudeKinematicsView`| Module 7 3-axis kinematics and 3D attitude gimbal. |
| `#/modules/mod-dgca-rules` | `module-8` | `ModuleDGCARulesView` | Module 8 DGCA Drone Rules 2021 and zone checker. |
| `#/assessment/mod-intro-terminology`| `assessment-module-1`| `ModuleAssessmentView` | Dedicated 10-question quiz for Module 1. |
| `#/assessment/mod-types-of-drones` | `assessment-module-2`| `ModuleAssessmentView` | Dedicated 10-question quiz for Module 2. |
| `#/assessment/mod-drone-components`| `assessment-module-3`| `ModuleAssessmentView` | Dedicated 10-question quiz for Module 3. |
| `#/assessment/mod-fc-sensors` | `assessment-module-4`| `ModuleAssessmentView` | Dedicated 10-question quiz for Module 4. |
| `#/assessment/mod-flight-forces` | `assessment-module-5`| `ModuleAssessmentView` | Dedicated 10-question quiz for Module 5. |
| `#/assessment/mod-flight-modes` | `assessment-module-6`| `ModuleAssessmentView` | Dedicated 10-question quiz for Module 6. |
| `#/assessment/mod-attitude-kinematics`| `assessment-module-7`| `ModuleAssessmentView`| Dedicated 10-question quiz for Module 7. |
| `#/assessment/mod-dgca-rules` | `assessment-module-8`| `ModuleAssessmentView` | Dedicated 10-question quiz for Module 8. |
| `#/assessment/final` | `assessment-final` | `FinalAssessment` | 12-question final certification exam (Gated by Mod 8). |
| `#/tools/battery-calculator` | `tools-battery-calc` | `BatteryCalculator` | Direct deep link to standalone Battery Sizing Tool. |
| `#/tools/esc-selector` | `tools-esc-selector` | `ESCSelector` | Direct deep link to standalone ESC Architecture Tool. |
| `#/tools/sensor-fusion` | `tools-sensor-fusion` | `SensorFusionTool` | Direct deep link to standalone Sensor Fusion Tool. |
| `#/tools/force-balance` | `tools-force-balance` | `ForceBalanceSimulator` | Direct deep link to standalone 4-Force Simulator. |
| `#/tools/flight-mode-playground` | `tools-flight-mode-playground` | `FlightModePlayground` | Direct deep link to standalone Mission Playground. |
| `#/tools/roll-pitch-yaw` | `tools-roll-pitch-yaw` | `RollPitchYawSimulator` | Direct deep link to standalone 3D Attitude Simulator. |
| `#/tools/dgca-zone-checker` | `tools-dgca-zone-checker`| `DGCAZoneChecker` | Direct deep link to standalone DGCA Zone Checker. |

### 5.2 Browser Persistence Schema (`localStorage`)

The application state persists seamlessly without requiring an external backend database:

| Storage Key | Format | Type | Description |
| :--- | :--- | :--- | :--- |
| `asteria_module_{moduleId}` | String (`"completed"`) | Boolean Flag | Set when a user scores $\ge 80\%$ on that module's assessment. |
| `learning_{moduleId}` | String (`"completed"`) | Boolean Flag | Set when a user clicks "Mark Study Material Complete" in a module. |
| `asteria_glossary_progress` | JSON Object (`{"termId": true}`) | Key-Value Map | Tracks mastered technical glossary flashcard terms. |

---

## 6. Comprehensive Curriculum & Data Model Specification

The static curriculum data is declared in `src/data/curriculumData.js` and structured across 4 specialized tracks.

### 6.1 Curriculum Tracks Schema

```javascript
export const tracksData = [
  {
    id: "lift",
    number: "01",
    name: "Lift",
    title: "Aerodynamics & Flight Physics",
    description: "How UAVs generate lift, balance the 4 flight forces, cancel counter-torque, and maneuver in 3D space.",
    modulesCount: 3,
    duration: "45 mins",
    icon: "Wind",
    modules: ["mod-intro-terminology", "mod-types-of-drones", "mod-flight-forces"]
  },
  {
    id: "control",
    number: "02",
    name: "Control",
    title: "Hardware, Electronics & Power",
    description: "Airframe structures, brushless DC motors, ESCs, LiPo battery chemistry, and radio control links.",
    modulesCount: 2,
    duration: "50 mins",
    icon: "Cpu",
    modules: ["mod-drone-components"]
  },
  {
    id: "navigate",
    number: "03",
    name: "Navigate",
    title: "Avionics, Sensors & Flight Modes",
    description: "The Flight Controller brain, IMU sensor fusion, GPS, barometer, and flight modes from Manual to RTH.",
    modulesCount: 3,
    duration: "40 mins",
    icon: "Compass",
    modules: ["mod-fc-sensors", "mod-flight-modes", "mod-attitude-kinematics"]
  },
  {
    id: "comply",
    number: "04",
    name: "Comply",
    title: "DGCA Regulations & Airspace",
    description: "India Drone Rules (2021/2023), Digital Sky portal, Green/Yellow/Red airspace zones, and safety procedures.",
    modulesCount: 1,
    duration: "35 mins",
    icon: "ShieldCheck",
    modules: ["mod-dgca-rules"]
  }
];
```

---

### 6.2 Detailed Breakdown of All 8 Learning Modules

#### Module 1: Introduction & Drone Terminology (`mod-intro-terminology`)
- **Track:** Track 1 (Lift)
- **Key Concepts:** Difference between Drone, UAV (Unmanned Aerial Vehicle), and UAS (Unmanned Aircraft System); payload integration; Ground Control Stations (GCS); communications links; multirotor aerodynamic fundamentals.
- **Embedded Tools:** Embedded Video Lecture Masterclass player, 8 Real-World Industry Application cards (Aerial Photography, Surveying/GIS, Agriculture, Infrastructure Inspection, Disaster Management, Surveillance, Research, Delivery), and the 14-Term Interactive Glossary Flashcard Deck.

#### Module 2: Types of Drones & Airframe Architectures (`mod-drone-types`)
- **Track:** Track 1 (Lift)
- **Key Concepts:** Aerodynamic classification of drones:
  1. **Single-Rotor Helicopters:** Large main rotor for high efficiency and payload; tail rotor to cancel reactive torque; mechanical swashplate complexity.
  2. **Multirotors:** Pure electronic differential motor speed control without mechanical swashplates. Quadcopters (+ Plus frame vs X-frame: X-frame is standard because forward cameras have an unobstructed field of view), Hexacopters (6 motors, single-motor fail-safe redundancy), and Octocopters (8 motors, heavy cinema/industrial lift).
  3. **Fixed-Wing UAVs:** Aerodynamic airfoil wings generating lift from forward airspeed; high endurance and range; requires runways or catapult launch.
  4. **Hybrid VTOL Aircraft:** Dual-propulsion system combining vertical lift rotors for pinpoint runway-free takeoff/landing with forward pusher motors for high-speed wing-borne cruise.
- **Embedded 3D Viewers:** `DroneTypeComparator` (Interactive 3D models of Quad-X, Quad-Plus, Hexa, Octo-X, Octo-Plus, Coaxial X8, and Coaxial X8-Plus), `FixedWingFlightSimulator`, and `HybridVTOLFlightSimulator`.

```
           Octocopter Structural Configurations Matrix
+-------------+------+--------+----------------------------------------------+
| Type        | Arms | Motors | Configuration Description                    |
+-------------+------+--------+----------------------------------------------+
| Octo-X      | 8    | 8      | 8 arms radiating in X geometry               |
| Octo Plus   | 8    | 8      | 8 arms along cardinal + diagonal axes        |
| X8 Coaxial  | 4    | 8      | 4 X-arms with stacked contra-rotating motors |
| X8+ Coaxial | 4    | 8      | 4 Plus-arms with stacked contra-rotating pr. |
+-------------+------+--------+----------------------------------------------+
```

#### Module 3: Drone Components & Propulsion Systems (`mod-drone-components`)
- **Track:** Track 2 (Control)
- **Key Subsystems:**
  1. **Carbon Fiber Airframe:** Lightweight rigid structure providing high strength-to-weight ratio and vibration damping.
  2. **Brushless DC (BLDC) Motors:** Outrunner motors featuring stators with copper coils and rotating outer bells with permanent magnets. Motor velocity constant ($K_v$ in RPM/Volt).
  3. **Electronic Speed Controllers (ESCs):** Converts DC battery power into 3-phase AC signals using MOSFET switching arrays. Protocols: PWM, OneShot, DShot. Form factors: Single ESCs (1 per arm), 4-in-1 ESC stacks, and 8-in-1 ESC stacks.
  4. **Propellers:** Clockwise (CW) and Counter-Clockwise (CCW) pitch profiles for torque cancellation.
  5. **LiPo Battery Packs:** Series ($S$) connections increase voltage ($V_{\text{total}} = N_S \times V_{\text{cell}}$), while Parallel ($P$) connections increase capacity ($C_{\text{total}} = N_P \times C_{\text{cell}}$).
- **Embedded Tools:** `BatteryCalculator.jsx`, `ESCSelector.jsx`, and `PropellerSpinPreview.jsx`.

#### Module 4: Flight Controller & Sensor Fusion Architecture (`mod-fc-sensors`)
- **Track:** Track 3 (Navigate)
- **Key Subsystems:**
  1. **Microcontroller Unit (MCU):** High-speed ARM Cortex-M4/M7/H7 running real-time control loops (Betaflight, ArduPilot, PX4).
  2. **Inertial Measurement Unit (IMU):** 3-axis Gyroscope (measures angular velocity in $^\circ/\text{s}$) + 3-axis Accelerometer (measures linear acceleration and gravity vectors).
  3. **Magnetometer (Compass):** Measures Earth's magnetic flux to establish absolute geographic heading and prevent yaw drift.
  4. **Barometer:** Measures atmospheric air pressure differentials to estimate altitude with sub-meter resolution.
  5. **GNSS/GPS Receiver:** Triangulates orbital satellite signals to calculate 3D geographic coordinates (latitude, longitude, altitude) and ground velocity.
  6. **Sensor Fusion Algorithms:** Complementary & Extended Kalman Filters (EKF) combining high-frequency gyro data with low-frequency drift-free accelerometer/GPS data.
- **Embedded Tool:** `SensorFusionTool.jsx` with real-time autopilot capability degradation matrix.

#### Module 5: Fundamentals of UAV Flight Forces (`mod-flight-forces`)
- **Track:** Track 1 (Lift)
- **Aerodynamic 4-Force Dynamic Vector Equilibrium:**
  - **Lift ($L$):** Upward force generated by airfoils or spinning propellers overcoming gravity.
  - **Weight ($W = m \cdot g$):** Downward gravitational force acting through the Center of Gravity (CG).
  - **Thrust ($T$):** Forward/propulsive force generated by the propulsion system.
  - **Drag ($D$):** Aerodynamic resistance opposing forward motion through air.
- **Flight Equilibrium Conditions:**
  - *Steady Level Hover:* $L = W$ and $T = D = 0$.
  - *Accelerated Climb:* $L > W$.
  - *Steady Cruise:* $L = W$ and $T = D$.
  - *High-Speed Dash:* $T > D$.
  - *Stall Condition:* Angle of Attack ($\alpha$) exceeds critical angle ($\approx 15^\circ - 18^\circ$), causing boundary layer airflow separation and abrupt lift collapse.
- **Embedded Tool:** `ForceBalanceSimulator.jsx` with 4 dynamic vector sliders and flight state readouts.

#### Module 6: Flight Modes on UAV (`mod-flight-modes`)
- **Track:** Track 3 (Navigate)
- **Operating Modes:**
  1. **Manual / Acro Mode:** Raw pilot stick control directly modulating motor rates without auto-leveling.
  2. **Stabilize / Angle Mode:** Auto-leveling using IMU accelerometer; releasing sticks returns the drone to horizontal level.
  3. **Altitude Hold (AltHold):** Barometer automatically manages throttle to maintain constant height.
  4. **Loiter / Position Hold:** GPS + Barometer + IMU locks the drone in a 3D coordinate box against wind gusts.
  5. **Auto / Waypoint Navigation:** Autopilot autonomously flies through predefined 3D GPS waypoint missions.
  6. **Return-to-Launch (RTL/RTH):** Autonomous safety failsafe climbing to a safe clear altitude, flying straight to the home takeoff coordinates, and performing an automatic landing.
  7. **Land Mode:** Controlled vertical descent at a set rate ($0.5 - 1.0\text{ m/s}$) until motor touchdown detection.
- **Embedded Tool:** `FlightModePlayground.jsx` (2D top-down SVG mission map with live drone flight path animations).

#### Module 7: UAV Attitude & Axis Movement (`mod-attitude-kinematics`)
- **Track:** Track 3 (Navigate)
- **3-Axis Aircraft Kinematics:**
  1. **Roll (Longitudinal Axis / $X$-Axis):** Left/Right tilt. Generated by increasing throttle on one side and decreasing on the opposite.
  2. **Pitch (Lateral Axis / $Y$-Axis):** Forward/Aft nose tilt. Generated by increasing throttle on rear motors and decreasing front motors (or vice versa).
  3. **Yaw (Vertical Axis / $Z$-Axis):** Clockwise/Counter-Clockwise rotational heading. Generated by speeding up CW motors and slowing down CCW motors (creating a net reaction torque).
- **Embedded Tool:** `RollPitchYawSimulator.jsx` (Three.js 3D quadcopter gimbal with motor throttle sliders).

#### Module 8: DGCA Regulations & Airspace Zones (`mod-dgca-rules`)
- **Track:** Track 4 (Comply)
- **Regulatory Framework:** Ministry of Civil Aviation (MoCA) & Directorate General of Civil Aviation (DGCA) India Drone Rules 2021 (amended 2023).
- **Categorization by Maximum All-Up Weight (AUW):**
  - Nano: $\le 250\text{ g}$
  - Micro: $> 250\text{ g} \le 2\text{ kg}$
  - Small: $> 2\text{ kg} \le 25\text{ kg}$
  - Medium: $> 25\text{ kg} \le 150\text{ kg}$
  - Large: $> 150\text{ kg}$
- **Airspace Zone Classifications:**
  - **Green Zone:** Up to 120 meters (400 ft) AGL in non-prohibited areas (>12 km from operational airports), or up to 60 meters (200 ft) AGL in buffer zones (8–12 km from airports). *No prior flight permission required.*
  - **Yellow Zone:** Controlled airspace (5–8 km from airport perimeters, or above 400 ft in green zones). *Mandatory Air Traffic Control (ATC) clearance via DigitalSky required.*
  - **Red Zone:** Strictly prohibited airspace (<5 km from operational airport perimeter, international borders, strategic military installations). *Explicit Central Government approval required.*
- **Statutory Requirements:** Unique Identification Number (UIN), Remote Pilot Certificate (RPC), DigitalSky flight logs.
- **Embedded Tool:** `DGCAZoneChecker.jsx` (Airport distance proximity slider and clearance evaluator).

---

### 6.3 Technical Glossary Schema (`glossaryTermsData`)

14 fundamental abbreviations codified in `src/data/curriculumData.js`:

| Term | Full Name | Category | Exact Engineering Definition |
| :--- | :--- | :--- | :--- |
| **UAV** | Unmanned Aerial Vehicle | Aerodynamics | An aircraft operated without a human pilot on board, controlled autonomously or remotely. |
| **UAS** | Unmanned Aircraft System | Avionics | The complete system including the UAV, Ground Control Station (GCS), and communication data link. |
| **RPA** | Remotely Piloted Aircraft | Regulations | An unmanned aircraft where the pilot controls the flight in real-time from an external station. |
| **BLDC** | Brushless Direct Current | Hardware | Electric motor that uses electronic commutation rather than mechanical brushes, maximizing efficiency and lifespan. |
| **ESC** | Electronic Speed Controller | Hardware | Electronic circuit that varies an electric motor's speed, direction, and braking by modulating DC to 3-phase AC. |
| **FC** | Flight Controller | Avionics | The onboard computer processor that fuses sensor data to calculate and issue motor control commands at high frequency. |
| **IMU** | Inertial Measurement Unit | Avionics | Sensor package comprising accelerometers and gyroscopes to measure specific force and angular velocity. |
| **GPS** | Global Positioning System | Avionics | Satellite navigation system providing 3D location (latitude, longitude, altitude) and velocity coordinates. |
| **LiPo** | Lithium Polymer | Hardware | Rechargeable battery chemistry known for high specific energy density and high discharge C-ratings. |
| **RTL** | Return-to-Launch | Avionics | Autonomous failsafe flight mode that commands the drone to navigate back to its takeoff home point. |
| **Loiter** | Position Hold Mode | Avionics | Autonomous flight mode that maintains current geographic coordinates, altitude, and heading against wind. |
| **DGCA** | Directorate General of Civil Aviation | Regulations | The statutory civil aviation authority in India regulating air transport services and safety. |
| **UIN** | Unique Identification Number | Regulations | A mandatory unique registration number issued to each compliant drone operating in Indian airspace. |
| **RPC** | Remote Pilot Certificate | Regulations | Official pilot qualification issued by DGCA-authorized training organizations for operating commercial drones. |

---

## 7. Interactive Simulators & Engineering Tools Deep Dive

The platform features 6 specialized interactive simulation tools engineered with real-time mathematical modeling.

### 7.1 Tool 1: 3D Attitude Kinematics Simulator (`RollPitchYawSimulator.jsx`)

```
   Roll (X-Axis): Left/Right Tilt        Pitch (Y-Axis): Nose Up/Down        Yaw (Z-Axis): Heading Rotate
        [M4:CW]      [M1:CCW]                [M4:CW]      [M1:CCW]              [M4:CW]      [M1:CCW]
            \          /                         \          /                       \          /
             \        /                           \        /                         \        /
              [ FC/IMU ]                           [ FC/IMU ]                         [ FC/IMU ]
             /        \                           /        \                         /        \
            /          \                         /          \                       /          \
        [M2:CCW]     [M3:CW]                 [M2:CCW]     [M3:CW]               [M2:CCW]     [M3:CW]
```

- **Mathematical Throttle-Mixing Matrix:**
  $$\text{Motor}_1 (\text{FR}) = T_{\text{base}} - \Delta\text{Pitch} - \Delta\text{Roll} - \Delta\text{Yaw}$$
  $$\text{Motor}_2 (\text{BL}) = T_{\text{base}} + \Delta\text{Pitch} + \Delta\text{Roll} - \Delta\text{Yaw}$$
  $$\text{Motor}_3 (\text{BR}) = T_{\text{base}} + \Delta\text{Pitch} - \Delta\text{Roll} + \Delta\text{Yaw}$$
  $$\text{Motor}_4 (\text{FL}) = T_{\text{base}} - \Delta\text{Pitch} + \Delta\text{Roll} + \Delta\text{Yaw}$$
- **Three.js Scene Graph:**
  - Procedural Carbon Quadcopter mesh with animated spinning propeller disks.
  - Directional gold forward nose cone indicator.
  - Gimbal Euler matrix orientation updated on every animation frame via `aircraftGroup.rotation.set(pitchRad, yawRad, rollRad, 'YXZ')`.
  - Real-time telemetry readouts displaying calculated pitch ($^\circ$), roll ($^\circ$), yaw ($^\circ$), and individual motor throttle percentages ($0 - 100\%$).

---

### 7.2 Tool 2: Aerodynamic 4-Force Vector Simulator (`ForceBalanceSimulator.jsx`)

- **Physics Simulation Engine:**
  - Models the continuous interplay of Lift ($L$), Weight ($W$), Thrust ($T$), and Drag ($D$).
  - Vertical acceleration: $a_y = \frac{L - W}{m}$
  - Horizontal acceleration: $a_x = \frac{T - D}{m}$
- **Flight Regime Presets:**
  - *Steady Hover:* $L = 100\%$, $W = 100\%$, $T = 0\%$, $D = 0\% \implies \text{Net Equilibrium}$.
  - *Vertical Climb:* $L = 140\%$, $W = 100\% \implies \text{Positive Climb Rate } (+4.2\text{ m/s})$.
  - *High-Speed Cruise:* $L = 100\%$, $W = 100\%$, $T = 120\%$, $D = 120\% \implies \text{Constant Airspeed } (85\text{ km/h})$.
  - *Stall / Rapid Descent:* $L = 40\%$, $W = 100\% \implies \text{Sink Rate } (-6.5\text{ m/s})$.
- **Vector HUD:** Dynamic SVG coordinate plane rendering proportional force arrows with magnitude labels.

---

### 7.3 Tool 3: 2D Autopilot Mission Playground (`FlightModePlayground.jsx`)

- **Architecture:** Top-down SVG vector airbase map rendering an autonomous drone navigating through 4 GPS waypoints (Alpha $\to$ Bravo $\to$ Charlie $\to$ Delta).
- **Simulation State Machine:**
  - `IDLE`: Drone stationary at home base.
  - `AUTO_MISSION`: Autopilot interpolates $(x, y)$ coordinates toward the active waypoint target.
  - `LOITER_HOVER`: Drone freezes in 2D space, holding position with subtle GPS atmospheric drift jitter.
  - `RTL_FAILSAFE`: Autopilot computes direct heading vector back to $(0, 0)$ Home Base and initiates emergency return.
  - `LANDING`: Drone executes touchdown sequence at the current coordinate.
- **Telemetry HUD:** Live latitude/longitude coordinate readouts, ground speed, battery voltage percentage, and waypoint target index.

---

### 7.4 Tool 4: Sensor Fusion & Autopilot Degradation Simulator (`SensorFusionTool.jsx`)

- **Sensor Channels:** 6 independent toggles: IMU, Gyroscope, Accelerometer, Magnetometer, Barometer, and GPS.
- **Dependency Matrix Logic:**

```javascript
// Cascade logic: Disabling IMU automatically disables Gyro & Accel
const isStabilizeOk = sensors.imu && sensors.gyro && sensors.accel;
const isHeadingOk   = sensors.mag;
const isAltitudeOk  = sensors.baro;
const isPositionOk  = sensors.gps && isStabilizeOk;
const isRthOk       = sensors.gps && isStabilizeOk && sensors.mag;
```

- **Autopilot Telemetry Outputs:**
  1. *Flight Stabilization (Attitude & Leveling):* Requires IMU + Gyro + Accelerometer.
  2. *Heading Hold (Yaw Alignment):* Requires Magnetometer (Compass).
  3. *Altitude Hold (Height Lock):* Requires Barometer.
  4. *Position Hold / Loiter (3D Coordinate Hover):* Requires GPS + Stabilization.
  5. *Return-to-Home / RTH (Autonomous Failsafe):* Requires GPS + Magnetometer + Stabilization.

---

### 7.5 Tool 5: LiPo Battery Configuration & Energy Calculator (`BatteryCalculator.jsx`)

- **Calculation Engine:**
  - Pack Voltage: $V_{\text{total}} = N_S \times V_{\text{cell}}$
  - Pack Capacity: $C_{\text{total}} = N_P \times C_{\text{cell}}$
  - Total Stored Energy: $E_{\text{Wh}} = \frac{V_{\text{total}} \times C_{\text{total}}}{1000}$
  - Formatted Rating String: `"${S}S${P}P ${V}V ${Capacity}mAh"`
- **Source Spec Benchmark Test:** Includes one-click test case loading the verified technical training example:
  $$\text{6S2P Pack } (3.7\text{V}, 8000\text{mAh cells}) \implies 22.2\text{V}, 16000\text{mAh}, 355.2\text{ Wh} \quad (\text{Validated } \checkmark)$$

---

### 7.6 Tool 6: DGCA Airspace Zone & Clearance Checker (`DGCAZoneChecker.jsx`)

- **Classification Rules Engine:**
  - $0 \le d < 5\text{ km}$: **Red Zone** (Airport perimeter). Ground prohibited (Max Altitude: $0\text{ m}$). *Strictly prohibited without Central Government special clearance.*
  - $5 \le d < 8\text{ km}$: **Yellow Zone** (Controlled airspace). Max Altitude: Subject to ATC clearance (Max $120\text{ m}$). *Mandatory DigitalSky ATC permission required.*
  - $8 \le d \le 12\text{ km}$: **Green Zone** (Reduced buffer). Max Altitude: $60\text{ m}$ ($200\text{ ft}$ AGL). *No prior permission required.*
  - $d > 12\text{ km}$: **Green Zone** (Standard). Max Altitude: $120\text{ m}$ ($400\text{ ft}$ AGL). *No prior permission required within VLOS.*

---

## 8. Assessment & Certification System

The platform features an assessment engine designed to test theoretical knowledge and applied scenario comprehension.

```
+-----------------------------------------------------------------------------------------+
|                               Assessment Execution Flow                                 |
+-----------------------------------------------------------------------------------------+
                                             |
                                             v
                         +---------------------------------------+
                         | User Selects Answers (Radio Options)  |
                         +---------------------------------------+
                                             |
                                             v
                         +---------------------------------------+
                         | Submit Assessment Form                |
                         | (Checks if all questions are answered)|
                         +---------------------------------------+
                                             |
                                             v
                         +---------------------------------------+
                         | Calculate Score & Percentage:         |
                         | Score = CorrectCount / TotalCount     |
                         +---------------------------------------+
                                             |
                     +-----------------------+-----------------------+
                     |                                               |
                     v                                               v
    +----------------------------------+            +----------------------------------+
    | Score >= 80% (Passed)            |            | Score < 80% (Failed)             |
    +----------------------------------+            +----------------------------------+
    | 1. Store:                        |            | 1. Show Review Banner (Red)      |
    |    localStorage.setItem(         |            | 2. Highlight Incorrect Choices   |
    |      'asteria_module_{id}',      |            | 3. Reveal Detailed Explanations  |
    |      'completed')                |            | 4. User clicks "Retake Quiz"     |
    | 2. Unlock Next Module in sequence|            +----------------------------------+
    | 3. Reveal Technical Rationales   |
    +----------------------------------+
```

### 8.1 80-Question Module Assessment Matrix

Every module contains 10 rigorously authored questions:

| Module Number & Title | Total Questions | Core Concept Qs | Tricky / Scenario Qs | Pass Mark |
| :--- | :---: | :---: | :---: | :---: |
| **Module 1:** Intro & Drone Terminology | 10 | 4 | 6 | 8/10 (80%) |
| **Module 2:** Types of Drones & Architectures | 10 | 4 | 6 | 8/10 (80%) |
| **Module 3:** Components & Propulsion Systems | 10 | 4 | 6 | 8/10 (80%) |
| **Module 4:** Flight Controller & Sensor Fusion | 10 | 4 | 6 | 8/10 (80%) |
| **Module 5:** Fundamentals of Flight Forces | 10 | 4 | 6 | 8/10 (80%) |
| **Module 6:** Flight Modes on UAV | 10 | 4 | 6 | 8/10 (80%) |
| **Module 7:** UAV Attitude & Axis Movement | 10 | 4 | 6 | 8/10 (80%) |
| **Module 8:** DGCA Regulations & Airspace | 10 | 4 | 6 | 8/10 (80%) |
| **Total** | **80** | **32** | **48** | **80% per module** |

### 8.2 Final Certification Examination (`FinalAssessment.jsx`)
- **Access Gate:** The final exam verifies that `asteria_module_mod-dgca-rules` is marked as completed in `localStorage`. If incomplete, a warning lockout screen appears directing the user to finish the prerequisites.
- **Exam Structure:** 12 multi-disciplinary questions synthesizing aerodynamics, battery sizing math, sensor fusion cascades, failsafe protocols, and DGCA legal liabilities.
- **Passing Threshold:** $75\%$ (9 out of 12 correct answers).
- **Certificate Generator:** Passing the exam renders a printable, tamper-evident digital certificate complete with candidate timestamp, percentage score, and verification badge.

---

## 9. Developer Operations, Build & Deployment Guide

### 9.1 Prerequisites
- **Node.js:** `v18.0.0` or higher
- **Package Manager:** `npm` (`v9.0.0` or higher)

### 9.2 Installation & Setup
```bash
# Clone the repository
git clone <repository-url>
cd "Drone study material"

# Install dependencies cleanly
npm install
```

### 9.3 Available Scripts
- **Start Local Development Server:**
  ```bash
  npm run dev
  ```
  *Starts Vite development server on `http://localhost:5173/` or `http://localhost:5174/` with instant Hot Module Replacement (HMR).*

- **Build Production Bundle:**
  ```bash
  npm run build
  ```
  *Compiles and bundles the application into optimized static assets in the `/dist` directory.*

- **Preview Production Build:**
  ```bash
  npm run preview
  ```
  *Spawns a local web server serving the compiled `/dist` directory for pre-deployment validation.*

- **Lint Codebase:**
  ```bash
  npm run lint
  ```
  *Executes ESLint to check syntax integrity and React hook rule compliance.*

---

## 10. Conclusion & Future Roadmap

The Asteria Drone Fundamentals Platform provides an end-to-end training system combining aerospace engineering theory with real-time WebGL interactive simulation.

### Planned Enhancements (v1.1.0 Roadmap)
1. **PID Controller Tuning Sandbox:** Real-time visual graph plotting Proportional, Integral, and Derivative gain adjustments against simulated wind gusts.
2. **Propeller Blade Thrust Calculator:** Advanced calculation engine factoring propeller diameter, pitch, blade count, and air density ($\rho$) to compute static thrust ($T = C_T \rho n^2 D^4$).
3. **Multi-Language Localization:** Adding Hindi and regional Indian languages for DGCA RPC remote pilot candidates across India.
4. **WebGL Shader Optimization:** Enhancing shadow maps and PBR materials for high-fidelity mobile GPU rendering.

---
*Document compiled and verified against codebase source files. All rights reserved.*
