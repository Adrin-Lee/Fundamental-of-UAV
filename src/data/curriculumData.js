/**
 * Structured Curriculum Data Store
 * Matches SCHEMA.md entity models for tracks, modules, and glossary_terms.
 * Fully decoupled from JSX view layer with source_section traceability tags.
 */

export const tracksData = [
  {
    id: "lift",
    slug: "lift",
    title: "Track 1: Lift & Aerodynamics",
    description: "Aerodynamic forces (Lift, Weight, Thrust, Drag), counter-rotating torque cancellation, and 3-axis kinematics.",
    order_index: 1,
    estimated_minutes: 45,
    modules: ["mod-intro-terminology", "mod-drone-types", "mod-flight-forces", "mod-attitude-kinematics"]
  },
  {
    id: "control",
    slug: "control",
    title: "Track 2: Control & Hardware",
    description: "Airframe structures, BLDC motors, ESCs, LiPo battery chemistry, transmitters, and component sizing.",
    order_index: 2,
    estimated_minutes: 50,
    modules: ["mod-drone-components", "mod-battery-power"]
  },
  {
    id: "navigate",
    slug: "navigate",
    title: "Track 3: Navigation & Avionics",
    description: "Flight controller architectures, IMU, magnetometer, barometer, GPS sensor fusion, and autonomous flight modes.",
    order_index: 3,
    estimated_minutes: 40,
    modules: ["mod-fc-sensors", "mod-flight-modes-safeties"]
  },
  {
    id: "comply",
    slug: "comply",
    title: "Track 4: Safety & DGCA Compliance",
    description: "DGCA Drone Rules 2021/2023, Digital Sky airspace zones (Green/Yellow/Red), pilot licensing, and pre-flight checklists.",
    order_index: 4,
    estimated_minutes: 35,
    modules: ["mod-dgca-rules", "mod-airspace-operations"]
  }
];

export const modulesData = {
  "mod-intro-terminology": {
    id: "mod-intro-terminology",
    track_id: "lift",
    slug: "introduction",
    title: "Introduction to Drone/UAV & Terminology",
    order_index: 1,
    source_section: "Introduction to Drones/UAVs",
    next_module_id: "mod-drone-types",
    next_module_title: "Types of Drones",
    body_paragraphs: [
      "A Drone, also known as an Unmanned Aerial Vehicle (UAV), is an aircraft that operates without a pilot onboard. It can be controlled remotely by an operator on the ground or fly autonomously using onboard computers, sensors, and navigation systems.",
      "Drones are equipped with various components such as a frame, motors, propellers, battery, flight controller, sensors, GPS, and communication systems, which enable them to perform controlled flight and carry out specific missions. Depending on their design and application, drones can be used for aerial photography, surveying, mapping, agriculture, infrastructure inspection, disaster management, surveillance, research, and delivery services.",
      "The ability to access hard-to-reach areas, collect real-time data, and perform tasks efficiently has made drones an important technology across numerous industries."
    ],
    industry_use_cases: [
      { id: "photo", label: "Aerial Photography", category: "Media" },
      { id: "survey", label: "Surveying & Mapping", category: "GIS" },
      { id: "agri", label: "Precision Agriculture", category: "Agri" },
      { id: "infra", label: "Infrastructure Inspection", category: "Industrial" },
      { id: "disaster", label: "Disaster Management", category: "Emergency" },
      { id: "surv", label: "Surveillance & Security", category: "Defense" },
      { id: "research", label: "Scientific Research", category: "R&D" },
      { id: "delivery", label: "Medical & Cargo Delivery", category: "Logistics" }
    ]
  },
  "mod-drone-types": {
    id: "mod-drone-types",
    track_id: "lift",
    slug: "types-of-drones",
    title: "Types of Drones",
    order_index: 2,
    source_section: "Types of Drones",
    next_module_id: "mod-drone-components",
    next_module_title: "Drone Components",
    intro_lead: "A multirotor drone is a UAV that uses two or more motor-propeller assemblies to generate lift, maintain stability, and control flight without requiring fixed wings.",
    multirotors: [
      {
        id: "quadcopter",
        name: "Quadcopter",
        rotors_count: 4,
        rotors_label: "4 rotors",
        description: "A multirotor drone with four rotors that provides stable and efficient flight for general-purpose applications. Quadcopters are commonly available in X-frame and + (plus) frame configurations, with the X-frame being the most widely used.",
        has_frame_toggle: true,
        frames: [
          {
            id: "x-frame",
            label: "X-Frame (Standard)",
            sublabel: "Motors angled 45° off centerline. Unobstructed camera field of view.",
            diagram_alt: "X-frame quadcopter configuration schematic with 45 degree arm geometry"
          },
          {
            id: "plus-frame",
            label: "+ (Plus) Frame",
            sublabel: "Motors aligned with longitudinal/lateral axes. Simpler pitch/roll isolation.",
            diagram_alt: "Plus-frame quadcopter configuration schematic with cross axis arm geometry"
          }
        ]
      },
      {
        id: "hexacopter",
        name: "Hexacopter",
        rotors_count: 6,
        rotors_label: "6 rotors",
        description: "A multirotor drone with six rotors, offering greater stability, lifting capacity, and redundancy than a quadcopter.",
        diagram_alt: "Hexacopter radial 6-rotor configuration schematic"
      },
      {
        id: "octocopter",
        name: "Octocopter",
        rotors_count: 8,
        rotors_label: "8 rotors",
        description: "A multirotor drone with eight rotors, designed for heavy payloads, maximum stability, and improved flight safety.",
        diagram_alt: "Octocopter 8-rotor heavy-lift configuration schematic"
      }
    ],
    octocopter_table: {
      note: "Coaxial configurations mount two motors per arm, so motor count can exceed arm count.",
      columns: ["Type", "Arms", "Motors", "Configuration"],
      rows: [
        { type: "Octo-X", arms: "8", motors: "8", configuration: "X-shaped" },
        { type: "Octo Plus", arms: "8", motors: "8", configuration: "Plus shaped" },
        { type: "X8 Coaxial", arms: "4", motors: "8", configuration: "Two motors per arm" },
        { type: "X8+ Coaxial", arms: "4", motors: "8", configuration: "Plus frame, two motors per arm" }
      ]
    },
    fixed_wing: {
      title: "Fixed-Wing Drones",
      description: "An unmanned aircraft that uses wings to generate lift and is optimized for long-range, high-endurance flights.",
      diagram_alt: "Fixed-wing aerodynamic UAV configuration diagram"
    },
    hybrid_vtol: {
      title: "Hybrid VTOL Drones",
      description: "A hybrid drone capable of vertical takeoff and landing like a multirotor and efficient forward flight like a fixed-wing aircraft.",
      diagram_alt: "Hybrid VTOL dual propulsion transition system diagram"
    }
  },
  "mod-drone-components": {
    id: "mod-drone-components",
    track_id: "control",
    slug: "drone-components",
    title: "Drone Components",
    order_index: 3,
    source_section: "Drone Components",
    next_module_id: "mod-fc-sensors",
    next_module_title: "Flight Controller & Sensors",
    components: {
      airframe: {
        title: "Airframe",
        description: "The airframe is the main structure of the drone. It supports and protects all the components mounted on it.",
        subparts: ["Frame", "Landing gear", "Arms", "Mounting points"]
      },
      propeller: {
        title: "Propeller",
        description: "A propeller is a rotating blade that produces lift by pushing air downward. As the propellers spin faster, they generate more lift, allowing the drone to rise into the air. In standard quadcopter configuration: Motor 1 (Front-Right) and Motor 2 (Back-Left) rotate counterclockwise (CCW), while Motor 3 (Back-Right) and Motor 4 (Front-Left) rotate clockwise (CW). This contra-rotating diagonal pairing cancels reactionary motor torque and keeps the drone balanced."
      },
      motor: {
        title: "Brushless Motor",
        description: "A brushless motor converts electrical energy from the battery into mechanical rotation. Each propeller is connected to one motor. The speed of each motor is controlled independently, allowing the drone to move in different directions.",
        features: ["Efficient", "Reliable", "Powerful", "Low maintenance"]
      },
      esc: {
        title: "ESC (Electronic Speed Controller)",
        description: "An Electronic Speed Controller (ESC) is an electronic device that controls the speed of each motor. The flight controller sends commands to the ESC, which adjusts the motor speed accordingly. Without an ESC, the motors cannot respond to pilot commands.",
        options: [
          {
            type: "Single ESC",
            channels: 1,
            description: "Controls one motor.",
            usage: "Mounted per arm; high modularity and straightforward field replacement."
          },
          {
            type: "4-in-1 ESC",
            channels: 4,
            description: "Controls four motors using a single board; common in quadcopters.",
            usage: "Central stack mounting, reduces wiring clutter and saves frame weight."
          },
          {
            type: "8-in-1 ESC",
            channels: 8,
            description: "A single ESC board designed to control eight motors, commonly used in octocopters to minimize wiring complexity, save space, and reduce overall weight.",
            usage: "Industrial heavy-lift multirotors requiring high electrical integration."
          }
        ]
      },
      flight_controller: {
        title: "Flight Controller",
        description: "The flight controller is often called the brain of the drone. It receives information from various sensors, processes it, and sends commands to the motors to keep the drone stable.",
        functions: ["Balance", "Direction", "Altitude", "Navigation", "Automatic flight modes"]
      },
      gps: {
        title: "GPS (Global Positioning System) & Compass",
        description: "The GPS module provides real-time geographic positioning, ground velocity, and satellite clock synchronization to the flight controller. Paired with an integrated digital magnetometer (compass), it enables position hold hover, autonomous waypoint navigation, and failsafe Return-to-Home (RTH).",
        functions: ["Satellite Triangulation", "Position Hold (Loiter)", "Waypoint Autonomous Flight", "Failsafe Return-to-Home (RTH)"],
        constellations: [
          { name: "GPS", origin: "USA", sat_count: "31 active satellites", status: "Global Standard" },
          { name: "GLONASS", origin: "Russia", sat_count: "24 active satellites", status: "Dual GNSS Link" },
          { name: "Galileo", origin: "European Union", sat_count: "30 satellites", status: "High Precision" },
          { name: "NavIC", origin: "India (ISRO)", sat_count: "7 regional satellites", status: "Regional Constellation" }
        ]
      },
      battery: {
        title: "Battery & Power Systems",
        description: "The battery supplies electrical power to every component of the drone. Most drones use rechargeable Lithium Polymer (Li-Po) batteries because they provide high energy while remaining lightweight.",
        types: [
          {
            name: "LiPo",
            fullName: "Lithium Polymer",
            nominalVoltage: "3.7V / cell",
            description: "The most commonly used UAV battery, known for its high power output, lightweight construction, and ability to deliver high discharge currents for demanding flight operations."
          },
          {
            name: "LiHV",
            fullName: "High-Voltage Lithium Polymer",
            nominalVoltage: "3.8V / cell",
            description: "An advanced version of the LiPo battery that can be charged to a higher voltage per cell, providing increased power output and improved flight performance."
          },
          {
            name: "Li-ion",
            fullName: "Lithium-Ion",
            nominalVoltage: "3.6V / cell",
            description: "A high-energy-density battery that provides longer flight endurance than LiPo batteries, making it suitable for long-range and endurance UAV missions."
          }
        ],
        cell_counts: [
          { s: "1S", voltage: "3.7V", use_case: "micro/toy drones" },
          { s: "2S", voltage: "7.4V", use_case: "lightweight/training UAVs" },
          { s: "3S", voltage: "11.1V", use_case: "small–medium UAVs" },
          { s: "4S", voltage: "14.8V", use_case: "multirotors, higher performance" },
          { s: "6S", voltage: "22.2V", use_case: "professional/industrial/heavy-lift" },
          { s: "12S", voltage: "44.4V", use_case: "large UAVs, high payload/power" }
        ],
        worked_examples: {
          series: {
            concept: "In a series connection, the voltage increases while the capacity (mAh) remains the same.",
            formula: "1 cell = 3.7V → 2S = 7.4V"
          },
          parallel: {
            concept: "In a parallel connection, the capacity increases while the voltage remains the same.",
            formula: "two 3.7V 5000mAh cells in parallel → 3.7V, 10000mAh"
          },
          series_parallel: {
            concept: "6S2P configuration, cell = 3.7V 8000mAh",
            voltage_calc: "Voltage: 3.7 × 6 = 22.2V",
            capacity_calc: "Capacity: 8000 × 2 = 16000mAh",
            rating: "Battery rating: 6S2P 22.2V 16000mAh"
          }
        }
      }
    }
  },
  "mod-fc-sensors": {
    id: "mod-fc-sensors",
    track_id: "navigate",
    slug: "flight-controller-sensors",
    title: "Flight Controller & Sensors",
    order_index: 4,
    source_section: "UAV Flight Controller and Sensors",
    next_module_id: "mod-flight-forces",
    next_module_title: "Flight Forces & Equilibrium",
    fc_intro: {
      title: "Flight Controller",
      description: "A Flight Controller (FC) is an electronic circuit board containing a microprocessor and specialized software (firmware). It is considered the brain of the drone because it controls almost every aspect of flight.",
      sequence_title: "The flight controller continuously:",
      sequence_steps: [
        "Receives commands from the remote controller",
        "Collects data from onboard sensors",
        "Calculates the drone's position and orientation",
        "Adjusts motor speeds through the ESCs",
        "Maintains stable flight",
        "Executes automatic flight functions such as RTH and waypoint navigation"
      ],
      loop_stat: "100s–1000s / sec — control loop rate."
    },
    fc_applications: [
      {
        id: "stabilization",
        title: "Flight Stabilization",
        description: "Maintains the drone's balance by continuously adjusting motor speeds."
      },
      {
        id: "motor_control",
        title: "Motor Control",
        description: "Sends commands to the ESCs to regulate the speed of each motor."
      },
      {
        id: "navigation",
        title: "Navigation",
        description: "Uses GPS or other navigation systems to determine the drone's position and assist with autonomous flight."
      },
      {
        id: "sensor_processing",
        title: "Sensor Data Processing",
        description: "Collects information from onboard sensors and combines it to estimate the drone's attitude, altitude, heading, and position."
      },
      {
        id: "mode_management",
        title: "Flight Mode Management",
        description: "Controls different operating modes such as Manual, Stabilize, Position Hold, and Return-to-Home."
      },
      {
        id: "safety",
        title: "Safety Functions",
        description: "Monitors battery status, communication links, and sensor health, and initiates failsafe actions when necessary."
      },
      {
        id: "telemetry",
        title: "Telemetry",
        description: "Transmits flight data, such as battery level, altitude, speed, and GPS position, to the ground control station."
      }
    ],
    sensors_intro: "Sensors allow the drone to 'sense' its environment and its own movement. Each sensor measures a specific physical quantity, and together they provide the information needed for stable flight.",
    sensors: {
      imu: {
        name: "IMU (Inertial Measurement Unit)",
        description: "One of the most important components of a drone. It is a combination of sensors — typically a gyroscope and an accelerometer, and sometimes additional sensors — that measure the drone's motion and orientation. The flight controller uses IMU data to maintain balance, estimate attitude, and respond quickly to changes in movement.",
        relationship: "Primary Motion & Orientation Sensor Package"
      },
      gyroscope: {
        name: "Gyroscope",
        description: "Measures angular velocity, which is the rate at which the drone rotates around its three axes: Roll, Pitch, Yaw. Helps the flight controller detect unintended rotations and make rapid corrections to keep the drone stable.",
        axes: ["Roll", "Pitch", "Yaw"]
      },
      accelerometer: {
        name: "Accelerometer",
        description: "Measures linear acceleration along the X, Y, and Z axes.",
        uses: [
          "Changes in speed",
          "Direction of movement",
          "Direction of gravity (assisting tilt estimation combined with gyroscope data)"
        ]
      },
      magnetometer: {
        name: "Magnetometer",
        description: "Measures the Earth's magnetic field to determine the drone's heading.",
        role: "Digital Magnetic Compass & Heading Alignment"
      },
      barometer: {
        name: "Barometer",
        description: "Measures air pressure. Because atmospheric pressure changes with altitude, the flight controller can estimate changes in height.",
        uses: ["Altitude hold", "Smooth hovering", "Stable climbs and descents"]
      },
      gps: {
        name: "GPS Receiver",
        description: "Determines the drone's geographic position using signals from navigation satellites.",
        functions: ["Position Hold", "Return to Home", "Waypoint Navigation", "Flight Logging"],
        gnss_note: "Many drones also support other Global Navigation Satellite Systems (GNSS), such as GLONASS, Galileo, and BeiDou, to improve positioning accuracy and reliability."
      }
    }
  },
  "mod-flight-forces": {
    id: "mod-flight-forces",
    track_id: "lift",
    slug: "flight-forces",
    title: "Fundamentals of UAV Flight Forces",
    order_index: 5,
    source_section: "Fundamentals of UAV Flight Forces",
    next_module_id: "mod-flight-modes",
    next_module_title: "Flight Modes on UAV",
    intro: "For a UAV to fly safely and remain stable in the air, it must continuously balance several forces acting upon it. These forces determine whether the UAV takes off, hovers, climbs, descends, or moves in a particular direction.",
    forces_overview: [
      {
        id: "lift",
        name: "Lift",
        definition: "The upward force generated by the propellers.",
        direction: "Upward (Vertical)",
        vector: "↑"
      },
      {
        id: "weight",
        name: "Weight",
        definition: "The downward force due to the mass of the UAV.",
        direction: "Downward (Gravity)",
        vector: "↓"
      },
      {
        id: "thrust",
        name: "Thrust",
        definition: "The force produced by the motors and propellers that drives the UAV's movement.",
        direction: "Forward / Motive",
        vector: "→"
      },
      {
        id: "drag",
        name: "Drag",
        definition: "The aerodynamic resistance that opposes the UAV's motion through the air.",
        direction: "Opposing Motion",
        vector: "←"
      }
    ],
    summary_note: "Lift and thrust are generated by the drone's motors and propellers, while weight is caused by gravity and drag results from air resistance.",
    airframe_forces: {
      multirotor: {
        title: "Multirotor Drone",
        subtitle: "Direct Rotor Thrust Dynamics",
        lift: "Generated by the rotating propellers. As the propellers push air downward, an equal and opposite upward force is produced, causing the drone to rise. The amount of lift depends on propeller size, propeller design, motor speed, and air density.",
        thrust: "Produced by the rotation of multiple propellers. By varying the speed of individual motors, the drone can move upward, forward, backward, sideways, and rotate about its axes.",
        drag: "The frame, landing gear, payload, and rotating propellers contribute to drag, requiring additional power to maintain speed.",
        weight: "The propellers must generate enough lift to overcome the drone's weight for take-off and sustained flight."
      },
      vtol: {
        title: "Hybrid VTOL Drone",
        subtitle: "Dual-Phase Aerodynamic Transition",
        lift: "During take-off, landing, and hovering, lift is generated by vertically oriented propellers, similar to a multirotor drone. During forward flight, the wings generate most of the lift, reducing dependence on propellers and improving flight efficiency.",
        thrust: "During take-off, hovering, and landing, thrust is directed vertically to lift and control the aircraft. During forward flight, thrust is directed forward, propelling the aircraft while the wings generate lift.",
        drag: "VTOL drones experience drag from both their multirotor and fixed-wing components — during forward flight, the wings, fuselage, and exposed rotors create aerodynamic resistance.",
        weight: "Weight acts downward throughout all phases of flight. During vertical flight, propellers counteract the weight; during forward flight, the wings generate lift to balance it."
      },
      fixed_wing: {
        title: "Fixed-Wing Drone",
        subtitle: "Airfoil Pressure Differential Lift",
        lift: "Generated by the wings. As the drone moves forward, air flows over and under the airfoil-shaped wings, creating a pressure difference that produces an upward lifting force. Continuous forward motion is required to maintain lift.",
        thrust: "Generated by one or more propellers or propulsion systems that push the aircraft forward, allowing airflow over the wings.",
        drag: "Opposes forward motion — generated by the wings, fuselage, landing gear, and other external components. Greater drag requires more thrust and reduces efficiency.",
        weight: "Acts downward through the drone's center of gravity. The wings must continuously generate sufficient lift to counteract this force."
      }
    },
    balance_rules: [
      { relationship: "Lift = Weight", result: "Drone hovers at constant altitude", rule: "Vertical Equilibrium" },
      { relationship: "Lift > Weight", result: "Drone climbs", rule: "Positive Vertical Acceleration" },
      { relationship: "Lift < Weight", result: "Drone descends", rule: "Negative Vertical Acceleration" },
      { relationship: "Thrust > Drag", result: "Drone accelerates", rule: "Positive Horizontal Acceleration" },
      { relationship: "Thrust = Drag", result: "Drone maintains constant speed", rule: "Horizontal Equilibrium (Cruise)" },
      { relationship: "Thrust < Drag", result: "Drone slows down", rule: "Negative Horizontal Acceleration" }
    ]
  },
  "mod-flight-modes": {
    id: "mod-flight-modes",
    track_id: "navigate",
    slug: "flight-modes",
    title: "Flight Modes on UAV",
    order_index: 6,
    source_section: "Flight modes on UAV",
    next_module_id: "mod-attitude-kinematics",
    next_module_title: "UAV Attitude & Axis Movement",
    intro: "Flight modes are predefined operating states of a UAV that determine how the flight controller manages the aircraft's movement, stability, navigation, and level of pilot assistance. Different flight modes are selected based on the mission requirements and environmental conditions.",
    modes: [
      {
        id: "loiter",
        name: "Loiter Mode",
        shortName: "Loiter",
        badge: "Hold Position",
        bullets: [
          "Uses GPS and onboard sensors to hold the UAV at a fixed position and altitude.",
          "The UAV automatically compensates for wind and minor disturbances."
        ],
        behavior: "Stationary 3D coordinate hover with active wind compensation."
      },
      {
        id: "auto",
        name: "Auto Mode",
        shortName: "Auto",
        badge: "Waypoint Mission",
        bullets: [
          "The UAV follows a pre-programmed flight path or mission without continuous pilot input.",
          "Waypoints and mission parameters are uploaded before take off.",
          "Commonly used for mapping, surveying, and autonomous missions."
        ],
        behavior: "Autonomous sequential waypoint tracking (WP1 → WP2 → WP3)."
      },
      {
        id: "land",
        name: "Land Mode",
        shortName: "Land",
        badge: "Auto Landing",
        bullets: [
          "Land Mode is a flight mode in which the UAV automatically lands at its current location.",
          "Land Mode can be used during normal operations or in emergency situations, such as low battery."
        ],
        behavior: "Autonomous vertical descent and motor disarm at current location."
      },
      {
        id: "rtl",
        name: "RTL (Return-to-Launch)",
        shortName: "RTL",
        badge: "Return to Home",
        bullets: [
          "The UAV automatically returns to its take-off location and lands.",
          "Can be activated manually or automatically during communication loss or low battery."
        ],
        behavior: "Autonomous direct navigation back to home coordinate followed by auto landing.",
        seeAlsoTerm: "RTH"
      },
      {
        id: "alt_hold",
        name: "Alt Hold (Altitude Hold)",
        shortName: "Alt Hold",
        badge: "Altitude Lock",
        bullets: [
          "Alt Hold Mode automatically maintains the UAV at a constant altitude during flight.",
          "The pilot controls the UAV's roll, pitch, and yaw, while the altitude is maintained automatically."
        ],
        behavior: "Barometric vertical lock with manual lateral pilot pitch/roll control."
      }
    ]
  },
  "mod-attitude-kinematics": {
    id: "mod-attitude-kinematics",
    track_id: "navigate",
    slug: "attitude-axis-movement",
    title: "UAV Attitude and Axis Movement",
    order_index: 7,
    source_section: "UAV Attitude and Axis Movement",
    next_module_id: "mod-dgca-rules",
    next_module_title: "DGCA Rules & Regulations",
    intro: "To control its direction and orientation during flight, a UAV rotates about three principal axes: the longitudinal axis, lateral axis, and vertical axis. These rotational movements — known as roll, pitch, and yaw — enable the UAV to maneuver, maintain stability, and navigate effectively. The flight controller continuously adjusts motor speeds to control these movements and ensure stable flight.",
    axes: [
      {
        id: "roll",
        name: "Roll",
        axis: "Longitudinal Axis (Front-to-Back)",
        symbol: "X-Axis · Longitudinal",
        tiltDirection: "Left / Right Tilt",
        definition: "Roll is the rotation of the UAV about its longitudinal (front-to-back) axis. During roll, one side of the UAV moves upward while the opposite side moves downward, causing the aircraft to tilt left or right.",
        workingSteps: [
          "Roll is controlled by increasing the speed of the motors on one side and decreasing the speed of the motors on the opposite side.",
          "If the left motors produce more thrust than the right motors, the UAV rolls to the right.",
          "If the right motors produce more thrust than the left motors, the UAV rolls to the left.",
          "Roll movement is mainly used for sideways motion and turning."
        ]
      },
      {
        id: "pitch",
        name: "Pitch",
        axis: "Lateral Axis (Side-to-Side)",
        symbol: "Y-Axis · Lateral",
        tiltDirection: "Nose Up / Down Tilt",
        definition: "Pitch is the rotation of the UAV about its lateral (side-to-side) axis. It changes the nose of the UAV upward or downward.",
        workingSteps: [
          "Pitch is controlled by changing the thrust between the front and rear motors.",
          "Increasing the thrust of the rear motors while decreasing the front motors causes the nose to tilt upward.",
          "Increasing the thrust of the front motors while decreasing the rear motors causes the nose to tilt downward.",
          "Pitch enables the UAV to move forward or backward."
        ]
      },
      {
        id: "yaw",
        name: "Yaw",
        axis: "Vertical Axis (Top-to-Bottom)",
        symbol: "Z-Axis · Vertical",
        tiltDirection: "Heading Left / Right Rotation",
        definition: "Yaw is the rotation of the UAV about its vertical axis. It changes the direction the UAV is facing without changing its position.",
        workingSteps: [
          "Yaw is controlled by creating a difference in torque between the clockwise (CW: M3 Back-Right + M4 Front-Left) and counterclockwise (CCW: M1 Front-Right + M2 Back-Left) rotating motors.",
          "Increasing the speed of one pair of motors and decreasing the speed of the opposite pair produces rotational movement.",
          "Clockwise (M3+M4) and counterclockwise (M1+M2) motor pairs balance each other's torque during normal level flight.",
          "When this balance is changed, the UAV rotates left or right about its vertical axis."
        ]
      }
    ]
  },
  "mod-dgca-rules": {
    id: "mod-dgca-rules",
    track_id: "comply",
    slug: "dgca-regulations",
    title: "DGCA Regulations",
    order_index: 8,
    source_section: "DGCA Regulations",
    next_module_id: "final-assessment",
    next_module_title: "Final Assessment Test",
    intro: "The Directorate General of Civil Aviation (DGCA) regulates drone operations in India through the Drone Rules, 2021. To ensure safe use of Indian airspace, DGCA classifies the country's airspace into Green, Yellow, and Red Zones.",
    disclaimer_banner: "Zone boundaries and rules can change. Before every real flight, verify the current airspace map on the DigitalSky platform (digitalsky.gov.in) and check registration/licensing status on eGCA — this module is for learning, not operational clearance.",
    zones: {
      green: {
        id: "green",
        name: "Green Zone",
        badge: "Unrestricted Airspace",
        color: "#2E9E5B",
        definition: "Airspace where drones can be flown without prior operational permission, provided the flight complies with DGCA rules.",
        rules: [
          "No permission required before flying",
          "Maximum flying altitude is 120 meters",
          "If the area is 8–12 km from an operational airport, the maximum permitted height is 60 meters",
          "The drone must remain within the pilot's Visual Line of Sight (VLOS)."
        ],
        examples: [
          "Agricultural fields away from airports",
          "Open farmland and villages",
          "Survey areas in rural regions"
        ]
      },
      yellow: {
        id: "yellow",
        name: "Yellow Zone",
        badge: "Restricted / ATC Clearance Required",
        color: "#FF9F3D",
        definition: "A restricted area where a drone can fly only after obtaining permission from Air Traffic Control (ATC).",
        rules: [
          "Permission from ATC is mandatory",
          "Includes areas within 5–8 km of an operational airport",
          "Also includes airspace above 120 meters in Green Zones",
          "Fly only after receiving official approval."
        ],
        examples: [
          "5–8 km from an operational airport",
          "Airspace above the Green Zone height limit",
          "Certain controlled airspace near aerodromes"
        ]
      },
      red: {
        id: "red",
        name: "Red Zone",
        badge: "Prohibited / Central Govt Permission Only",
        color: "#FF4D4D",
        definition: "A highly restricted area where drone flying is prohibited unless special permission is obtained from the Central Government.",
        rules: [
          "Flying is not allowed without special approval",
          "Reserved for security and safety",
          "Unauthorized operations may result in legal action."
        ],
        examples: [
          "Military bases",
          "Nuclear power plants",
          "International borders"
        ]
      }
    },
    supplementary: {
      source_tag: "supplementary — verify at digitalsky.gov.in",
      weight_categories: [
        { category: "Nano", weight: "< 250 g", pilot_req: "Most relaxed requirements (No pilot license required for non-commercial flight; exempt from RPC)." },
        { category: "Micro", weight: "250 g – 2 kg", pilot_req: "UIN registration required; simplified compliance framework." },
        { category: "Small", weight: "2 kg – 25 kg", pilot_req: "Remote Pilot Certificate (RPC) mandatory from a DGCA-authorized RPTO." },
        { category: "Medium", weight: "25 kg – 150 kg", pilot_req: "Remote Pilot Certificate (RPC), maintenance logs & airworthiness compliance." },
        { category: "Large", weight: "> 150 kg", pilot_req: "Formal aircraft-grade type certification and Central Govt operational clearance." }
      ],
      portals: {
        egca: "eGCA Portal: Manages drone type certification, Unique Identification Numbers (UIN), and Remote Pilot Certificate (RPC) issuance.",
        digitalsky: "DigitalSky Platform: Hosts the interactive live airspace zone map (Green/Yellow/Red), flight permission workflows, and real-time NOTAM overlays."
      },
      penalties: "Non-compliance with Drone Rules 2021 (operating unregistered drones, unauthorized zone intrusions, or breaching altitude ceilings) carries administrative financial penalties and, in restricted Red Zones, potential criminal liability under aviation safety laws.",
      notams: "Notice to Airmen (NOTAMs) and Temporary Flight Restrictions (TFRs) can temporarily convert normally Green airspace into Yellow or Red zones during VVIP movements, defense exercises, or national security events."
    }
  }
};

export const glossaryTermsData = [
  {
    id: "uav",
    term: "UAV",
    acronym: "UAV",
    full_name: "Unmanned Aerial Vehicle",
    definition: "The aircraft itself without a pilot onboard.",
    category: "aerodynamics",
    related_module_id: "mod-intro-terminology",
    source_section: "Drone Terminology"
  },
  {
    id: "uas",
    term: "UAS",
    acronym: "UAS",
    full_name: "Unmanned Aircraft System",
    definition: "The complete system including the UAV, ground control station, communication link, and supporting equipment.",
    category: "hardware",
    related_module_id: "mod-intro-terminology",
    source_section: "Drone Terminology"
  },
  {
    id: "gcs",
    term: "GCS",
    acronym: "GCS",
    full_name: "Ground Control Station",
    definition: "The device or software used to monitor and control the drone from the ground.",
    category: "avionics",
    related_module_id: "mod-intro-terminology",
    source_section: "Drone Terminology"
  },
  {
    id: "fc",
    term: "FC",
    acronym: "FC",
    full_name: "Flight Controller",
    definition: "The onboard computer that manages flight stability and control.",
    category: "avionics",
    related_module_id: "mod-intro-terminology",
    source_section: "Drone Terminology"
  },
  {
    id: "esc",
    term: "ESC",
    acronym: "ESC",
    full_name: "Electronic Speed Controller",
    definition: "Regulates the speed of the motors based on commands from the flight controller.",
    category: "hardware",
    related_module_id: "mod-intro-terminology",
    source_section: "Drone Terminology"
  },
  {
    id: "bldc",
    term: "BLDC Motor",
    acronym: "BLDC",
    full_name: "Brushless DC Motor",
    definition: "Brushless DC motor used to generate thrust for flight.",
    category: "hardware",
    related_module_id: "mod-intro-terminology",
    source_section: "Drone Terminology"
  },
  {
    id: "propeller",
    term: "Propeller",
    acronym: "PROP",
    full_name: "Rotating Airfoil Blade",
    definition: "Rotating blade that converts motor power into thrust.",
    category: "aerodynamics",
    related_module_id: "mod-intro-terminology",
    source_section: "Drone Terminology"
  },
  {
    id: "gps",
    term: "GPS",
    acronym: "GPS",
    full_name: "Global Positioning System",
    definition: "Provides positioning, navigation, and location data.",
    category: "avionics",
    related_module_id: "mod-intro-terminology",
    source_section: "Drone Terminology"
  },
  {
    id: "imu",
    term: "IMU",
    acronym: "IMU",
    full_name: "Inertial Measurement Unit",
    definition: "Sensor package containing accelerometers and gyroscopes used for attitude and motion sensing.",
    category: "avionics",
    related_module_id: "mod-intro-terminology",
    source_section: "Drone Terminology"
  },
  {
    id: "payload",
    term: "Payload",
    acronym: "LOAD",
    full_name: "Mission Equipment",
    definition: "Equipment carried by the drone, such as cameras, sensors, or delivery packages.",
    category: "hardware",
    related_module_id: "mod-intro-terminology",
    source_section: "Drone Terminology"
  },
  {
    id: "telemetry",
    term: "Telemetry",
    acronym: "TELEM",
    full_name: "Bi-directional Data Stream",
    definition: "Real-time transmission of flight data between the drone and the ground station.",
    category: "avionics",
    related_module_id: "mod-intro-terminology",
    source_section: "Drone Terminology"
  },
  {
    id: "bvlos",
    term: "BVLOS",
    acronym: "BVLOS",
    full_name: "Beyond Visual Line of Sight",
    definition: "Flying a drone beyond the operator's direct visual observation.",
    category: "regulations",
    related_module_id: "mod-intro-terminology",
    source_section: "Drone Terminology"
  },
  {
    id: "vlos",
    term: "VLOS",
    acronym: "VLOS",
    full_name: "Visual Line of Sight",
    definition: "Operating a drone while maintaining direct visual contact.",
    category: "regulations",
    related_module_id: "mod-intro-terminology",
    source_section: "Drone Terminology"
  },
  {
    id: "rth",
    term: "RTH",
    acronym: "RTH",
    full_name: "Return-to-Home",
    definition: "A safety feature that automatically returns the drone to its takeoff location.",
    category: "avionics",
    related_module_id: "mod-intro-terminology",
    source_section: "Drone Terminology"
  }
];
