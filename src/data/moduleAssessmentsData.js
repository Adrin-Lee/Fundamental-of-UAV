/**
 * Module-by-Module Assessment Data Store
 * Exactly 10 questions per module (4 Core/Simple + 6 Scenario/Tricky questions).
 * Passing Threshold: 80% (8/10 correct answers).
 */

export const moduleAssessmentsData = {
  // ==========================================
  // MODULE 1: INTRODUCTION TO DRONES & TERMINOLOGY
  // ==========================================
  "mod-intro-terminology": {
    moduleId: "mod-intro-terminology",
    moduleNumber: "01",
    moduleTitle: "Introduction to Drone/UAV & Terminology",
    passThreshold: 80, // 80%
    questions: [
      // 4 Simple Questions
      {
        id: 1,
        type: "simple",
        difficulty: "Core Concept",
        question: "What is the primary operational definition of an Unmanned Aerial Vehicle (UAV)?",
        options: [
          "An aircraft operated purely by radio control without any onboard electronic stabilization",
          "An aircraft that flies without a human pilot physically onboard, controlled remotely or flying autonomously",
          "Any space launch vehicle designed to leave Earth's stratosphere",
          "A tethered balloon utilized strictly for meteorological wind sensing"
        ],
        correctIndex: 1,
        explanation: "A UAV (Unmanned Aerial Vehicle) is an aircraft operated without a pilot onboard. It can be controlled manually via ground transmitter or fly autonomously via onboard flight controllers, sensors, and GPS."
      },
      {
        id: 2,
        type: "simple",
        difficulty: "Core Concept",
        question: "What does the term 'Payload' specifically refer to in UAV systems?",
        options: [
          "The structural weight of the carbon fiber frame and landing gear",
          "The internal firmware stored in the flight controller's flash memory",
          "The additional equipment carried by the drone to perform its mission (e.g., cameras, LiDAR, spray tanks)",
          "The total mass of the battery pack and power distribution wiring"
        ],
        correctIndex: 2,
        explanation: "Payload is the dedicated mission-specific equipment carried by the aircraft beyond what is required for basic flight—such as RGB cameras, thermal sensors, multispectral sensors, or delivery cargo."
      },
      {
        id: 3,
        type: "simple",
        difficulty: "Core Concept",
        question: "What does the broader acronym 'UAS' stand for in contrast to 'UAV'?",
        options: [
          "Universal Aeronautical Software",
          "Unmanned Aircraft System — encompassing the aircraft (UAV), ground control station (GCS), and communications datalink",
          "Unified Airspace Shield for commercial aviation",
          "Uncontrolled Atmospheric Sensor"
        ],
        correctIndex: 1,
        explanation: "UAS (Unmanned Aircraft System) describes the complete end-to-end system including the aerial vehicle (UAV), the ground control station (GCS), datalinks, telemetry transmitters, antennas, and launch/recovery equipment."
      },
      {
        id: 4,
        type: "simple",
        difficulty: "Core Concept",
        question: "Which of the following is considered a primary commercial application of multirotor drones in precision agriculture?",
        options: [
          "Generating ultrasonic sonic booms for pest dispersal",
          "Multispectral crop health indexing (NDVI mapping) and targeted chemical spraying",
          "Deep underground soil moisture drilling",
          "Direct satellite orbit positioning"
        ],
        correctIndex: 1,
        explanation: "Precision agriculture utilizes multispectral/NDVI imagery for vegetative health assessment and automated precision spraying of fertilizers and pesticides."
      },

      // 6 Tricky Questions
      {
        id: 5,
        type: "tricky",
        difficulty: "Nuanced Architecture",
        question: "A surveyor programs a drone to execute a fully autonomous pre-planned survey grid with zero real-time manual stick inputs from the pilot. Does this vehicle cease to be part of a 'UAS' during this autonomous phase?",
        options: [
          "Yes, because autonomous flight converts the vehicle into an independent cruise missile rather than a system",
          "No, because the ground control station, telemetry datalink, mission planning software, and fail-safe overrides remain active components of the UAS",
          "Yes, because UAS definitions legally mandate active human manual control every second of flight",
          "No, but only if the drone is physically tethered to the ground station power cable"
        ],
        correctIndex: 1,
        explanation: "Autonomous flight does not negate the UAS architecture. The GCS, safety datalinks, fail-safe parameters, and pilot-in-command monitoring remain active and integral parts of the Unmanned Aircraft System."
      },
      {
        id: 6,
        type: "tricky",
        difficulty: "Operational Physics",
        question: "An operator configures an agricultural drone with a dry frame weight of 12 kg, battery of 8 kg, and a chemical payload tank of 15 kg. The manufacturer specifies Maximum Takeoff Weight (MTOW) as 32 kg. What is the operational status of this configuration?",
        options: [
          "Safe to fly because payload is liquid and dissipates dynamic weight during flight",
          "Exceeds MTOW by 3 kg (Total = 35 kg), creating severe motor overheating, reduced control authority, and structural safety hazards",
          "Safe to fly provided the pilot stays in manual mode without GPS assistance",
          "Exceeds MTOW only if ambient wind velocity is greater than 15 knots"
        ],
        correctIndex: 1,
        explanation: "Total Weight = 12 kg (frame) + 8 kg (battery) + 15 kg (payload) = 35 kg. Since MTOW is 32 kg, the drone is 3 kg overweight (109% of MTOW), violating structural limits and motor thermal tolerances."
      },
      {
        id: 7,
        type: "tricky",
        difficulty: "Regulatory Distinction",
        question: "What is the key technical distinction between Visual Line of Sight (VLOS) and Extended Visual Line of Sight (EVLOS)?",
        options: [
          "VLOS allows flying beyond 5 km while EVLOS is restricted to 500 meters",
          "EVLOS uses trained visual observers (VOs) relaying safety information to the pilot to extend operational range without relying solely on instrument BVLOS approval",
          "VLOS requires night-vision goggles while EVLOS is daylight only",
          "EVLOS requires satellite datalink while VLOS requires analog 5.8GHz video only"
        ],
        correctIndex: 1,
        explanation: "In EVLOS, one or more trained Visual Observers maintain continuous direct visual contact with the UAV and communicate with the remote pilot, extending the safe operational footprint beyond the pilot's direct line of sight."
      },
      {
        id: 8,
        type: "tricky",
        difficulty: "Component Classification",
        question: "Why is a carbon fiber airframe arm classified as a 'passive' structural element, whereas an Electronic Speed Controller (ESC) is classified as an 'active' avionic component?",
        options: [
          "Passive elements cannot conduct electrical ground signals, while active elements are made of copper",
          "Active components dynamically process electrical signals and modulate power flow in real time, whereas passive components provide structural load distribution without active electrical switching",
          "Passive elements only work when the drone is stationary, while active elements only operate in forward flight",
          "Active components require software updates while passive components require firmware flashing"
        ],
        correctIndex: 1,
        explanation: "Active components (like ESCs and flight controllers) actively switch, amplify, and process electrical power and signals in real time based on feedback, while passive components (arms, plates, screws) mechanically support loads."
      },
      {
        id: 9,
        type: "tricky",
        difficulty: "Safety Scenario",
        question: "During a mapping mission, a UAV experiences a sudden telemetry datalink loss with the ground control station at 1 km range. Why does the aircraft not immediately fall out of the sky?",
        options: [
          "Because the brushless motors are permanently energized by perpetual magnetic induction",
          "Because the onboard flight controller autonomously executes pre-programmed fail-safe logic (e.g., Return-to-Launch or continue mission) independently of the ground station link",
          "Because the ground station radio antenna continues sending invisible gravity waves",
          "Because multirotors naturally glide in equilibrium when signal is disconnected"
        ],
        correctIndex: 1,
        explanation: "The UAV's onboard flight controller runs continuous real-time stabilization and navigation loops autonomously. When RC/GCS link loss is detected, onboard fail-safe algorithms immediately command RTL or safe landing."
      },
      {
        id: 10,
        type: "tricky",
        difficulty: "Aeromechanical Engineering",
        question: "A technician believes that installing a higher discharge C-rating battery will automatically increase the maximum payload capacity of a drone without changing motors or propellers. Why is this reasoning incorrect?",
        options: [
          "Because C-rating only dictates color temperature of the LED indicators",
          "Maximum thrust and payload capacity are aerodynamically limited by the motor torque curve, propeller diameter/pitch, and thermal dissipation, not battery C-rating alone",
          "Because higher C-rating batteries reduce the nominal voltage to zero under load",
          "Because flight controllers reject batteries with discharge ratings above 20C"
        ],
        correctIndex: 1,
        explanation: "Payload capacity is governed by total aerodynamic thrust ($T = \text{Thrust per motor} \times N$). While higher C-rating reduces voltage sag under load, motor KV, propeller geometry, and motor thermal limits dictate peak achievable thrust."
      }
    ]
  },

  // ==========================================
  // MODULE 2: TYPES OF DRONES & AIRFRAME ARCHITECTURES
  // ==========================================
  "mod-types-of-drones": {
    moduleId: "mod-types-of-drones",
    moduleNumber: "02",
    moduleTitle: "Types of Drones & Airframe Architectures",
    passThreshold: 80,
    questions: [
      // 4 Simple Questions
      {
        id: 1,
        type: "simple",
        difficulty: "Core Concept",
        question: "How many independent motor-propeller assemblies does a standard Hexacopter utilize?",
        options: ["4 rotors", "6 rotors", "8 rotors", "3 rotors"],
        correctIndex: 1,
        explanation: "A Hexacopter utilizes six rotors arranged radially around a central hub, providing greater lift capacity and redundancy compared to a quadcopter."
      },
      {
        id: 2,
        type: "simple",
        difficulty: "Core Concept",
        question: "Which airframe platform relies primarily on fixed wings to generate aerodynamic lift through forward velocity?",
        options: [
          "Coaxial Octocopter",
          "Fixed-Wing UAV",
          "Tricopter",
          "X-Frame Quadcopter"
        ],
        correctIndex: 1,
        explanation: "Fixed-wing drones use stationary airfoil wings that generate lift as forward thrust pushes air over the wings, making them ideal for long-range and high-endurance missions."
      },
      {
        id: 3,
        type: "simple",
        difficulty: "Core Concept",
        question: "What is the primary defining capability of a Hybrid VTOL (Vertical Takeoff and Landing) drone?",
        options: [
          "It can fly underwater and in the air simultaneously",
          "It takes off vertically like a multirotor and transitions to fixed-wing flight for efficient long-distance cruise",
          "It operates without any batteries or fuel using solar panels exclusively",
          "It requires a runway catapult for launch but lands vertically"
        ],
        correctIndex: 1,
        explanation: "Hybrid VTOL drones combine vertical takeoff and landing (eliminating runways) with the high-speed, long-range efficiency of fixed-wing aerodynamic cruise."
      },
      {
        id: 4,
        type: "simple",
        difficulty: "Core Concept",
        question: "In a standard quadcopter, why do two diagonal motors rotate Clockwise (CW) while the other two rotate Counter-Clockwise (CCW)?",
        options: [
          "To reduce battery power consumption by 50%",
          "To balance and cancel out reactive gyroscopic and aerodynamic yaw torque during hover",
          "Because manufacturers cannot manufacture 4 motors spinning in the same direction",
          "To allow the drone to roll left and right without changing motor speeds"
        ],
        correctIndex: 1,
        explanation: "Rotating diagonal pairs in opposite directions cancels net reactive torque (Newton's 3rd Law). Without equal CW and CCW rotor counts, the drone's body would uncontrollably spin in the opposite direction."
      },

      // 6 Tricky Questions
      {
        id: 5,
        type: "tricky",
        difficulty: "Geometry & Payload FOV",
        question: "Why is the X-frame configuration universally preferred over the + (Plus) frame configuration for camera inspection quadcopters?",
        options: [
          "Because + frames cannot generate aerodynamic lift in forward flight",
          "In an X-frame, the forward arm angles (45° off-axis) keep the front propellers out of the camera's wide-angle field of view during forward tilt",
          "X-frames require only two motors while + frames require four motors",
          "Because + frames are prohibited by international civil aviation organizations"
        ],
        correctIndex: 1,
        explanation: "In a + frame, Motor 1 is placed directly along the forward centerline, placing the front propeller directly in front of the camera lens. The X-frame clears the central frontal arc."
      },
      {
        id: 6,
        type: "tricky",
        difficulty: "Aeromechanical Efficiency",
        question: "In a Coaxial X8 Octocopter (8 motors mounted top/bottom on 4 arms), why does the bottom motor typically consume more power or need a higher pitch propeller for optimal efficiency?",
        options: [
          "Because bottom motors spin in the reverse direction of the earth's magnetic field",
          "The bottom propeller operates inside the accelerated downwash (wake airflow) generated by the top propeller, encountering reduced relative angle of attack",
          "Because gravity pulls the lower motors downward, creating mechanical friction in the ball bearings",
          "Bottom motors are wired in series rather than parallel"
        ],
        correctIndex: 1,
        explanation: "The bottom propeller operates in the already accelerated airflow of the top propeller. To generate comparable thrust in this incoming high-velocity slipstream, it requires higher pitch or increased RPM."
      },
      {
        id: 7,
        type: "tricky",
        difficulty: "Airframe Redundancy",
        question: "If one motor completely fails during hover on a standard Hexacopter versus a standard Quadcopter, what is the aerodynamic outcome?",
        options: [
          "Both aircraft crash immediately with zero survivability",
          "The Quadcopter immediately loses attitude balance and tumbles, while the Hexacopter can dynamically re-distribute thrust to maintain level flight and land safely",
          "The Quadcopter transitions automatically to autorotation while the Hexacopter stalls",
          "The Hexacopter accelerates upward while the Quadcopter hovers steadily"
        ],
        correctIndex: 1,
        explanation: "A quadcopter cannot maintain balanced 3-axis equilibrium if 1 of its 4 motors fails (it loses 25% thrust and its torque balance). A hexacopter can dynamically adjust the remaining 5 motors to land safely."
      },
      {
        id: 8,
        type: "tricky",
        difficulty: "Mechanism Tradeoff",
        question: "A Tricopter uses three lift motors. Why does it require an additional mechanical tilt servo on the tail arm, whereas a Quadcopter requires zero moving servos?",
        options: [
          "Because three motors cannot create lift without tilting 90 degrees",
          "With 3 rotors, CW and CCW reactive torques cannot be mathematically balanced, so a tilting tail rotor is required to generate lateral vector thrust for yaw control",
          "To allow the tricopter to fold its arms during flight for high-speed diving",
          "Because three motors always draw unequal current from the ESC"
        ],
        correctIndex: 1,
        explanation: "In a tricopter, having an odd number of rotors (3) makes it impossible to balance opposing CW/CCW torque pairs. A servo tilts the rear motor vector horizontally to counteract torque and command yaw."
      },
      {
        id: 9,
        type: "tricky",
        difficulty: "Aerodynamic Lift Drag Ratio",
        question: "Why can a 5 kg Fixed-Wing UAV fly for 90 minutes on a 10000mAh battery, while a 5 kg Multirotor on the exact same battery can only hover for 25 minutes?",
        options: [
          "Multirotors waste energy lighting up ESC telemetry LEDs",
          "Fixed-wing aircraft generate lift via aerodynamic wing airflow ($L/D$ ratios of 10–18:1), requiring motor thrust only to overcome drag (e.g. 5N), whereas multirotors must continuously produce 100% of the vehicle's weight in vertical thrust (~49N)",
          "Fixed-wing drones use AC motors while multirotors use DC motors",
          "Because fixed wings absorb atmospheric static electricity to recharge the battery in flight"
        ],
        correctIndex: 1,
        explanation: "Fixed-wing aircraft achieve high Lift-to-Drag ($L/D$) ratios. To sustain 5 kg (49N) in flight, the fixed-wing motor only needs forward thrust equal to drag (~3-5N), whereas multirotor motors must continuously push 49N against gravity."
      },
      {
        id: 10,
        type: "tricky",
        difficulty: "Structural Rigidity",
        question: "What is the primary structural disadvantage of an 'H-Frame' quadcopter compared to a symmetrical 'X-Frame' with a monolithic center plate?",
        options: [
          "H-frames cannot carry lithium batteries due to chemical interference",
          "The long central fuselage and perpendicular arm joints create torsional twisting flex along the roll axis under high motor torque loads",
          "H-frames create magnetic eddy currents that disable the GPS receiver",
          "H-frames can only spin CW motors"
        ],
        correctIndex: 1,
        explanation: "H-frames feature longer longitudinal side plates connected across transverse arms. This geometry is more prone to torsional twist (flexing along the roll axis) under motor torque, degrading high-rate PID loop stability."
      }
    ]
  },

  // ==========================================
  // MODULE 3: DRONE COMPONENTS & PROPULSION SYSTEMS
  // ==========================================
  "mod-drone-components": {
    moduleId: "mod-drone-components",
    moduleNumber: "03",
    moduleTitle: "Drone Components & Propulsion Systems",
    passThreshold: 80,
    questions: [
      // 4 Simple Questions
      {
        id: 1,
        type: "simple",
        difficulty: "Core Concept",
        question: "What does the 'KV' rating of a Brushless DC (BLDC) motor represent?",
        options: [
          "Kilovolts of electrical insulation resistance",
          "Theoretical revolutions per minute (RPM) per 1 Volt of applied voltage with zero mechanical load",
          "Kilo-velocity maximum airspeed in km/h",
          "Kinetic Vibration dampening coefficient"
        ],
        correctIndex: 1,
        explanation: "KV rating indicates the motor's unloaded velocity constant: $\text{RPM} = \text{KV} \times \text{Applied Voltage (V)}$. A 900KV motor on a 14.8V 4S pack spins at $\approx 13,320\text{ RPM}$ unloaded."
      },
      {
        id: 2,
        type: "simple",
        difficulty: "Core Concept",
        question: "What is the primary function of an Electronic Speed Controller (ESC)?",
        options: [
          "It measures air pressure to maintain flight altitude",
          "It takes DC battery power and converts it into precisely timed 3-phase AC power pulses to control BLDC motor RPM",
          "It charges the LiPo battery during flight via regenerative braking",
          "It transmits high-definition live video to the ground station"
        ],
        correctIndex: 1,
        explanation: "The ESC uses high-speed MOSFET switching to convert DC battery power into 3-phase AC commutation pulses, dictating motor speed and torque based on control signals from the flight controller."
      },
      {
        id: 3,
        type: "simple",
        difficulty: "Core Concept",
        question: "What is the nominal voltage of a standard 6S Lithium Polymer (LiPo) battery pack (3.7V per cell nominal)?",
        options: ["11.1 V", "14.8 V", "22.2 V", "25.2 V"],
        correctIndex: 2,
        explanation: "Nominal voltage = $6 \times 3.7\text{V} = 22.2\text{V}$. (Note: Maximum fully charged voltage is $6 \times 4.2\text{V} = 25.2\text{V}$, but nominal rating is 22.2V)."
      },
      {
        id: 4,
        type: "simple",
        difficulty: "Core Concept",
        question: "What do the numbers in a propeller specification such as '1555' or '15x5.5' signify?",
        options: [
          "15 cm diameter and 55 mm center hub thickness",
          "15 inches total tip-to-tip diameter and 5.5 inches of theoretical forward pitch advancement per revolution",
          "1500 RPM maximum speed and 55 grams total weight",
          "15 mm motor shaft diameter and 5.5 mm blade chord width"
        ],
        correctIndex: 1,
        explanation: "In propeller nomenclature '1555' or '15x5.5', 15 represents the 15-inch diameter and 5.5 represents the pitch (the theoretical distance in inches the prop moves forward in one revolution)."
      },

      // 6 Tricky Questions
      {
        id: 5,
        type: "tricky",
        difficulty: "Electrical Power Engineering",
        question: "A battery pack is rated as 6S2P 10,000mAh with a 25C continuous discharge rating. What is the maximum safe continuous current this pack can supply to the drone's power distribution board?",
        options: ["25 A", "250 A", "100 A", "600 A"],
        correctIndex: 1,
        explanation: "Max Continuous Current = $\text{Capacity (Ah)} \times \text{C-Rating} = 10\text{ Ah} \times 25\text{C} = 250\text{ Amperes}$."
      },
      {
        id: 6,
        type: "tricky",
        difficulty: "Motor-Prop Matching",
        question: "An engineer replaces a low-KV motor (380KV with 18-inch prop on 6S) with a high-KV motor (2400KV) while keeping the same 18-inch heavy propeller on 6S voltage. What will immediately occur upon applying full throttle?",
        options: [
          "The drone will hover 5 times longer with zero heat generation",
          "Massive current overdraw causing extreme motor coil overheating, ESC MOSFET blowout, and potential battery thermal runaway due to over-torquing",
          "The propeller will spin backwards automatically to protect the ESC",
          "The flight controller will reduce the voltage to 1S automatically"
        ],
        correctIndex: 1,
        explanation: "High KV motors attempt to spin at extremely high RPM ($\approx 50,000\text{ RPM}$ on 6S). Coupling this with a giant 18-inch prop causes massive aerodynamic drag torque, drawing hundreds of amps beyond component ratings."
      },
      {
        id: 7,
        type: "tricky",
        difficulty: "Mechanical Assembly",
        question: "What happens if a Clockwise (CW) propeller is installed upside down (inverted) onto a motor that continues spinning Clockwise?",
        options: [
          "The propeller will generate upward thrust normally but with 15–30% reduced aerodynamic efficiency and significantly higher acoustic noise due to inverted airfoil camber",
          "The propeller will generate downward thrust instead of upward thrust",
          "The motor will reverse its electrical rotation automatically",
          "The ESC will instantly cut power due to phase misalignment"
        ],
        correctIndex: 0,
        explanation: "The direction of thrust is determined by the motor's direction of rotation and the prop's pitch angle (which remains positive). However, the airfoil camber is now upside down, drastically reducing efficiency and lift."
      },
      {
        id: 8,
        type: "tricky",
        difficulty: "Motor Commutation",
        question: "Why do Brushless DC (BLDC) motors have 3 phase wires connected to the ESC, whereas traditional Brushed DC motors have only 2 wires?",
        options: [
          "The 3rd wire is purely a mechanical safety ground wire for lightning strikes",
          "BLDC motors lack mechanical carbon brushes and commutators; the ESC must sequentially energize 3 electromagnetic stator coils (A, B, C) to create a rotating magnetic field",
          "Two wires supply positive power and the third wire transmits live telemetry video",
          "To allow the motor to spin at three fixed speeds only (Low, Medium, High)"
        ],
        correctIndex: 1,
        explanation: "Brushed motors commutate mechanically via carbon brushes and a commutator ring. BLDC motors require electronic 3-phase commutation from the ESC across 3 stator phase windings (U, V, W)."
      },
      {
        id: 9,
        type: "tricky",
        difficulty: "Battery Chemistry & Storage",
        question: "Why should fully charged LiPo battery cells (4.20V/cell) never be stored long-term (more than 7–14 days) at full charge?",
        options: [
          "Because the plastic outer wrapping evaporates into hydrogen gas",
          "High voltage state accelerates electrolyte breakdown, internal resistance buildup, lithium plating, gas puffing, and severe capacity degradation",
          "The battery will slowly switch its polarity from positive to negative",
          "Storage at 4.2V triggers the internal BMS to discharge into the atmosphere via radio waves"
        ],
        correctIndex: 1,
        explanation: "Keeping LiPo cells at peak 4.20V causes elevated internal chemical reactivity, decomposing electrolyte and oxidizing cathode materials. Safe long-term storage voltage is $\approx 3.80\text{V–}3.85\text{V}$ per cell."
      },
      {
        id: 10,
        type: "tricky",
        difficulty: "Material Mechanics",
        question: "Why are high-end industrial survey multirotors equipped with high-modulus Carbon Fiber propellers rather than flexible Nylon-plastic propellers?",
        options: [
          "Carbon fiber is transparent to radar and avoids airspace detection",
          "Carbon fiber blades exhibit high rigidity with near-zero blade deformation under heavy aerodynamic loads, providing instantaneous throttle response and minimal vibration at large diameters",
          "Plastic blades are chemically dissolved by airborne humidity",
          "Carbon fiber generates magnetic fields that boost GPS satellite accuracy"
        ],
        correctIndex: 1,
        explanation: "Large diameter propellers (e.g. 15–30 inches) experience huge bending moments. Flexible plastic flexes and flutters, causing PID instability and vibration. Carbon fiber maintains its precise airfoil shape under full thrust."
      }
    ]
  },

  // ==========================================
  // MODULE 4: FLIGHT CONTROLLER & SENSOR FUSION
  // ==========================================
  "mod-fc-sensors": {
    moduleId: "mod-fc-sensors",
    moduleNumber: "04",
    moduleTitle: "Flight Controller & Sensor Fusion",
    passThreshold: 80,
    questions: [
      // 4 Simple Questions
      {
        id: 1,
        type: "simple",
        difficulty: "Core Concept",
        question: "Which sensor onboard the Flight Controller measures angular velocity (rate of rotation in degrees/second)?",
        options: [
          "Barometer",
          "3-Axis Gyroscope",
          "Magnetometer",
          "Ultrasonic rangefinder"
        ],
        correctIndex: 1,
        explanation: "The 3-axis gyroscope measures rotational speed ($\text{deg/s}$) around the X, Y, and Z body axes, serving as the fastest primary feedback loop for attitude stabilization."
      },
      {
        id: 2,
        type: "simple",
        difficulty: "Core Concept",
        question: "Which sensor onboard the Flight Controller measures ambient atmospheric air pressure to estimate relative altitude above ground?",
        options: [
          "Barometer",
          "Accelerometer",
          "Magnetometer",
          "GPS Compass"
        ],
        correctIndex: 0,
        explanation: "The barometric pressure sensor measures ambient atmospheric air pressure changes (which decrease predictably with altitude) to calculate height and hold steady altitude."
      },
      {
        id: 3,
        type: "simple",
        difficulty: "Core Concept",
        question: "What is the primary role of the Magnetometer (digital compass) on a UAV?",
        options: [
          "To measure the weight of the drone during takeoff",
          "To measure Earth's magnetic field vectors to determine the drone's heading (yaw orientation relative to True/Magnetic North)",
          "To detect nearby electrical high-voltage transmission lines for charging",
          "To calculate motor rotational RPM"
        ],
        correctIndex: 1,
        explanation: "The magnetometer measures Earth's geomagnetic flux lines to establish absolute heading orientation (North/East/South/West), which is essential for accurate GPS waypoint navigation."
      },
      {
        id: 4,
        type: "simple",
        difficulty: "Core Concept",
        question: "What does the term 'IMU' stand for in drone avionics hardware?",
        options: [
          "Internal Motor Unit",
          "Inertial Measurement Unit (combining accelerometers and gyroscopes)",
          "Integrated Memory Universal",
          "International Metric Unit"
        ],
        correctIndex: 1,
        explanation: "An IMU (Inertial Measurement Unit) is an electronic sensor package combining a 3-axis accelerometer and 3-axis gyroscope (and often a magnetometer) on a single board."
      },

      // 6 Tricky Questions
      {
        id: 5,
        type: "tricky",
        difficulty: "Sensor Fusion Mathematics",
        question: "Why can a flight controller NOT rely exclusively on accelerometers to calculate roll and pitch angles during active forward flight?",
        options: [
          "Accelerometers stop working when the battery voltage drops below 15V",
          "Accelerometers cannot distinguish between gravitational acceleration and dynamic lateral/centripetal aircraft accelerations, causing false tilt readings during maneuvers",
          "Accelerometers can only measure movement along the Z-axis",
          "Because accelerometers suffer from thermal freeze when exposed to prop wash"
        ],
        correctIndex: 1,
        explanation: "Accelerometers measure total specific force (Gravity + Linear Acceleration + Vibrations). During banked turns or rapid acceleration, the net vector tilts away from true vertical. Sensor fusion blends high-speed gyro rates to filter out dynamic acceleration."
      },
      {
        id: 6,
        type: "tricky",
        difficulty: "Electromagnetic Interference",
        question: "An engineer mounts the flight controller's internal magnetometer directly 5 mm above high-current battery power cables carrying 80 Amps. What flight instability will occur during aggressive throttle punches?",
        options: [
          "The drone's battery will immediately short-circuit",
          "High current induces a dynamic magnetic field ($B \propto I$), distorting compass readings and causing severe yaw twitches, toilet-bowling, or compass variance fail-safes",
          "The drone will lose barometric altitude hold and drop 10 meters",
          "The ESC will reject the radio control signal"
        ],
        correctIndex: 1,
        explanation: "According to Ampere's Law, high DC current creates proportional electromagnetic interference ($B = \mu I / 2\pi r$). This corrupts compass readings during high-throttle draw, causing yaw divergence."
      },
      {
        id: 7,
        type: "tricky",
        difficulty: "Vertical Altitude Sensor Fusion",
        question: "Why is a Barometer and/or LiDAR rangefinder preferred over raw GNSS (GPS) altitude for precise vertical hold within 2 meters of the ground?",
        options: [
          "GPS satellites do not transmit vertical signals below 100 meters",
          "GPS vertical geometric dilution of precision (VDOP) causes vertical errors of $\pm 2\text{ to }5\text{ meters}$, whereas barometers and LiDAR provide millimeter/centimeter-level relative resolution",
          "Barometers work using laser reflections while GPS uses sound waves",
          "GPS signals are absorbed by grass and soil surfaces"
        ],
        correctIndex: 1,
        explanation: "Due to satellite orbital geometry (all satellites are above the receiver, none below Earth), GPS vertical accuracy is inherently 1.5–3× worse than horizontal accuracy ($\pm 2–5\text{m}$). Barometers and LiDAR give tight, rapid vertical altitude control."
      },
      {
        id: 8,
        type: "tricky",
        difficulty: "PID Control Dynamics",
        question: "In the Flight Controller's PID attitude control algorithm, what physical problem occurs if the 'Derivative (D)' gain is set too high on a frame with un-dampened high-frequency motor vibrations?",
        options: [
          "The drone will refuse to arm its motors on the ground",
          "The D-term amplifies high-frequency noise derivatives ($\Delta e / \Delta t$), causing extreme high-frequency motor oscillation, scorching hot motors, and potential MOSFET burnout",
          "The drone will drift infinitely in the yaw axis",
          "The battery will recharge itself excessively"
        ],
        correctIndex: 1,
        explanation: "The D-term acts on the rate of change of error ($\text{d}e/\text{d}t$). High-frequency mechanical vibration creates rapid micro-fluctuations; taking their derivative yields massive high-frequency outputs, driving motors into rapid, hot micro-oscillations."
      },
      {
        id: 9,
        type: "tricky",
        difficulty: "Vibration Clipping & Gyro Desync",
        question: "A drone with chipped, unbalanced propellers experiences 200 Hz frame vibration exceeding $\pm 2000^\circ/\text{s}$. Why does the drone suddenly climb violently or flip uncontrollably in flight?",
        options: [
          "The chipped propeller blades create aerodynamic vortex vacuum that sucks the drone upward",
          "The extreme vibration causes the MEMS gyroscope to exceed its physical clipping range, corrupting the integration angle and creating a false tilt error that the PID loop violently tries to correct",
          "The flight controller runs out of RAM memory",
          "The ESC firmware reverses motor direction automatically"
        ],
        correctIndex: 1,
        explanation: "Gyro clipping occurs when mechanical vibration exceeds the sensor's dynamic range (e.g. $\pm 2000^\circ/\text{s}$). Asymmetric clipping biases the mathematical integration, tricking the autopilot into believing it is tilted, causing aggressive, runaway motor compensation."
      },
      {
        id: 10,
        type: "tricky",
        difficulty: "Non-GPS Navigation",
        question: "Why do warehouse inspection drones combine downward Optical Flow cameras with ultrasonic/LiDAR rangefinders for indoor autonomous flight where GPS is completely blocked?",
        options: [
          "Optical flow tracks ground texture pixel velocity to estimate horizontal velocity ($V_x, V_y$), while rangefinder scales pixel displacement by altitude ($h$) to provide rock-solid position hold",
          "Optical flow cameras provide heat to keep the flight controller warm",
          "LiDAR rangefinders reflect signals off satellites through concrete roofs",
          "Because optical flow replaces the need for an IMU gyroscope"
        ],
        correctIndex: 0,
        explanation: "Optical flow detects optical pixel movement across successive video frames. Because ground pixel velocity depends directly on height above ground ($V = \dot{\theta} \times h$), pairing optical flow with a LiDAR rangefinder provides drift-free indoor horizontal velocity and position hold."
      }
    ]
  },

  // ==========================================
  // MODULE 5: FUNDAMENTALS OF UAV FLIGHT FORCES
  // ==========================================
  "mod-flight-forces": {
    moduleId: "mod-flight-forces",
    moduleNumber: "05",
    moduleTitle: "Fundamentals of UAV Flight Forces",
    passThreshold: 80,
    questions: [
      // 4 Simple Questions
      {
        id: 1,
        type: "simple",
        difficulty: "Core Concept",
        question: "What are the four primary aerodynamic forces acting on an aircraft during flight?",
        options: [
          "Lift, Weight (Gravity), Thrust, and Drag",
          "Friction, Magnetism, Voltage, and Airspeed",
          "Centrifugal force, Gyroscope, Torque, and Momentum",
          "Altitude, Latitude, Longitude, and Heading"
        ],
        correctIndex: 0,
        explanation: "The four fundamental forces of flight are Lift (upward), Weight/Gravity (downward), Thrust (forward/propulsive vector), and Drag (aerodynamic resistance opposing motion)."
      },
      {
        id: 2,
        type: "simple",
        difficulty: "Core Concept",
        question: "For a multirotor drone to maintain a stationary, steady hover at a constant altitude in calm air, what equilibrium condition must be satisfied?",
        options: [
          "Total Lift must be greater than twice the Weight",
          "Total Vertical Thrust (Lift) must exactly equal Total Weight ($L = W$) with zero net acceleration",
          "Thrust must equal Drag while Lift is zero",
          "Weight must exceed Lift by 10%"
        ],
        correctIndex: 1,
        explanation: "According to Newton's 1st Law, in steady hover at constant altitude ($a_z = 0$), the upward vertical thrust (Lift) must precisely balance the downward gravitational force (Weight): $F_{\text{net}} = L - W = 0$."
      },
      {
        id: 3,
        type: "simple",
        difficulty: "Core Concept",
        question: "In forward horizontal flight, what force directly opposes the forward motion of the drone through the air?",
        options: ["Gravity", "Aerodynamic Drag", "Lift", "Centripetal force"],
        correctIndex: 1,
        explanation: "Aerodynamic Drag is the friction and pressure resistance created by air molecules colliding with the vehicle's frontal surface area, acting in direct opposition to the direction of travel."
      },
      {
        id: 4,
        type: "simple",
        difficulty: "Core Concept",
        question: "How do fixed-wing aircraft generate the majority of their lift compared to multirotors?",
        options: [
          "By spinning vertical rotors straight down against the ground",
          "By forward airspeed pushing air over curved airfoil wings, creating lower air pressure on the upper camber surface (Bernoulli's principle & Newton's 3rd Law)",
          "By burning fuel to decrease vehicle density below ambient air",
          "Using electrostatic repulsion from atmospheric clouds"
        ],
        correctIndex: 1,
        explanation: "Fixed-wing wings have an airfoil cross-section. As forward thrust accelerates the aircraft, air flows faster over the curved upper surface, creating a lower pressure zone that generates aerodynamic lift."
      },

      // 6 Tricky Questions
      {
        id: 5,
        type: "tricky",
        difficulty: "Vector Trigonometry",
        question: "A quadcopter weighing 20 N tilts forward at a pitch angle of $\theta = 30^\circ$ to accelerate horizontally while maintaining total rotor thrust at exactly $T = 20\text{ N}$. What will happen to the drone's altitude?",
        options: [
          "It will maintain perfectly level altitude because total thrust is unchanged",
          "It will lose altitude and descend because vertical lift component decreases to $T \cdot \cos(30^\circ) = 20 \cdot 0.866 = 17.32\text{ N}$, which is less than the 20 N Weight",
          "It will climb rapidly because forward tilt reduces gravity",
          "It will flip upside down automatically"
        ],
        correctIndex: 1,
        explanation: "When tilted at angle $\theta$, vertical lift is $L = T \cos\theta$. At $30^\circ$, vertical lift drops to $20 \times 0.866 = 17.32\text{ N}$. Since $17.32\text{ N} < 20\text{ N (Weight)}$, the drone accelerates downward unless total thrust is increased to $20 / \cos(30^\circ) = 23.09\text{ N}$."
      },
      {
        id: 6,
        type: "tricky",
        difficulty: "Aerodynamic Hazard",
        question: "A multirotor pilot commands a rapid, pure vertical descent at $6\text{ m/s}$ with zero horizontal airspeed. The drone suddenly begins violently wobbling, vibrating, and falling out of control despite increasing throttle. What dangerous aerodynamic state has been encountered?",
        options: [
          "Ground Effect Compression",
          "Vortex Ring State (Settling with Power) — the rotors are trapped descending into their own recirculating turbulent downwash",
          "Supersonic Blade Stall",
          "Gyroscopic Phase Inversion"
        ],
        correctIndex: 1,
        explanation: "In Vortex Ring State (VRS), a multirotor descends rapidly into its own turbulent rotor downwash. Recirculating vortices destroy blade lift. Increasing throttle merely accelerates the turbulent vortex, worsening the sink rate. Recovery requires pitching forward to gain clean horizontal airflow."
      },
      {
        id: 7,
        type: "tricky",
        difficulty: "Equilibrium Physics",
        question: "A multirotor is flying horizontally in a straight line at a constant, unaccelerated forward speed of 15 m/s in calm air. What is the NET horizontal force acting on the aircraft?",
        options: [
          "Forward thrust is 50 N higher than drag to keep moving",
          "Exactly Zero ($F_{\text{net}} = 0$), because forward thrust horizontal component precisely balances total aerodynamic drag at constant velocity",
          "Net force is equal to the total weight of the drone",
          "Net force is negative because drag always exceeds thrust"
        ],
        correctIndex: 1,
        explanation: "According to Newton's 1st Law, any body moving at constant velocity in a straight line has zero net acceleration ($a = 0$), meaning the forward horizontal thrust vector exactly balances opposing aerodynamic drag ($F_{\text{thrust, horizontal}} - F_{\text{drag}} = 0$)."
      },
      {
        id: 8,
        type: "tricky",
        difficulty: "Ground Effect Aerodynamics",
        question: "When a multirotor hovers at an altitude less than one half of its rotor diameter ($h < 0.5D$) above a smooth flat ground surface, what aerodynamic effect occurs?",
        options: [
          "The drone requires 15–25% LESS motor power to maintain hover due to Ground Effect (cushion of compressed air and reduced tip vortex induced drag)",
          "The drone requires 50% more power due to ground friction sucking the drone down",
          "The ESCs overheat because air bounces into the motors",
          "The GPS compass is reversed by underground metals"
        ],
        correctIndex: 0,
        explanation: "In Ground Effect (IGE), the proximity of the ground restricts the expansion of rotor tip vortices and increases static air pressure beneath the rotors. This produces higher effective lift, requiring less throttle/power to hover than at higher altitudes (OGE)."
      },
      {
        id: 9,
        type: "tricky",
        difficulty: "Airfoil Aerodynamics",
        question: "If a fixed-wing surveillance UAV increases its Angle of Attack (AoA) beyond its wing's critical stall angle (typically $14^\circ–16^\circ$), what happens simultaneously to Lift and Drag?",
        options: [
          "Lift increases infinitely while Drag drops to zero",
          "Airflow abruptly separates from the upper wing surface, causing a catastrophic drop in Lift and a massive surge in Pressure Drag",
          "Both Lift and Drag remain perfectly constant",
          "The aircraft enters supersonic cruise"
        ],
        correctIndex: 1,
        explanation: "Beyond the critical stall angle of attack, smooth laminar/turbulent airflow can no longer stay attached to the upper wing surface. Boundary layer separation occurs, destroying the upper low-pressure zone (loss of lift) and creating a massive turbulent wake (surge in drag)."
      },
      {
        id: 10,
        type: "tricky",
        difficulty: "Atmospheric Density Altitude",
        question: "A drone is operated in high-altitude mountain terrain (4,000 meters above sea level) at a high ambient temperature of $35^\circ\text{C}$. Why does the drone consume significantly more battery power and suffer reduced maximum payload capacity compared to sea level?",
        options: [
          "Because the gravitational constant $g$ doubles at 4000 meters altitude",
          "Lower atmospheric air density ($\rho$) reduces the mass of air moved by the propeller per revolution ($T \propto \rho A v^2$), requiring much higher motor RPM to produce equivalent lift",
          "Because cold mountain air freezes the copper windings in the motors",
          "Because GPS signals travel slower at high altitude"
        ],
        correctIndex: 1,
        explanation: "Thrust generated by a propeller is directly proportional to air density: $T = \frac{1}{2}\rho A C_T (\omega R)^2$. In thin, hot air (low density $\rho$), less air mass is accelerated per revolution. The motors must spin significantly faster (consuming much more current) to produce the same hover lift."
      }
    ]
  },

  // ==========================================
  // MODULE 6: FLIGHT MODES ON UAV
  // ==========================================
  "mod-flight-modes": {
    moduleId: "mod-flight-modes",
    moduleNumber: "06",
    moduleTitle: "Flight Modes on UAV",
    passThreshold: 80,
    questions: [
      // 4 Simple Questions
      {
        id: 1,
        type: "simple",
        difficulty: "Core Concept",
        question: "What is the primary operational behavior of a drone in 'Loiter' (GPS Position Hold) mode when the pilot centers all transmitter control sticks?",
        options: [
          "The drone immediately disarms all motors and falls",
          "The drone actively maintains its precise 3D geographical position (latitude, longitude, and altitude), automatically fighting wind drift",
          "The drone flies in continuous circles at maximum speed",
          "The drone switches to manual aerobatic mode"
        ],
        correctIndex: 1,
        explanation: "In Loiter mode, the flight controller combines GPS, IMU, and barometer feedback to lock the vehicle at its instantaneous 3D coordinates in space, actively tilting and adjusting thrust to resist wind gusts."
      },
      {
        id: 2,
        type: "simple",
        difficulty: "Core Concept",
        question: "In 'Altitude Hold' (Alt Hold) flight mode, what aspect of flight is automated and what remains under manual pilot control?",
        options: [
          "Horizontal movement is automated while altitude is manual",
          "Altitude is automatically maintained using the barometer/LiDAR, while roll, pitch, and yaw are manually steered by the pilot",
          "All axes are fully autonomous with zero pilot override",
          "The camera gimbal is locked while motors are manual"
        ],
        correctIndex: 1,
        explanation: "In Alt Hold mode, the flight controller automatically modulates throttle to lock barometric altitude when the throttle stick is centered, but the pilot must manually correct for horizontal wind drift."
      },
      {
        id: 3,
        type: "simple",
        difficulty: "Core Concept",
        question: "What sequence does a drone execute when 'Return-to-Launch' (RTL) mode is activated?",
        options: [
          "It lands immediately wherever it is located in the field",
          "It climbs to a pre-configured safe clearance altitude, flies autonomously in a straight line back to the takeoff Home point, and automatically lands",
          "It cuts all motor power instantly for emergency parachute deployment",
          "It flies to the nearest airport runway"
        ],
        correctIndex: 1,
        explanation: "RTL fail-safe logic commands the drone to climb to a safe obstacle clearance altitude (e.g. 50m), fly autonomously back to the stored GPS Home takeoff coordinate, hover, and execute automated landing."
      },
      {
        id: 4,
        type: "simple",
        difficulty: "Core Concept",
        question: "What characterizes 'Auto' flight mode during survey and mapping operations?",
        options: [
          "The pilot controls the aircraft using an iPhone touch screen only",
          "The drone autonomously follows a pre-programmed mission route consisting of ordered 3D GPS waypoints, camera triggers, and payload actions",
          "The drone randomly explores the terrain until the battery runs out",
          "The drone follows the pilot's vehicle using magnetic tracking"
        ],
        correctIndex: 1,
        explanation: "Auto mode allows the flight controller to autonomously execute an uploaded mission plan with specific waypoint coordinates, target speeds, altitudes, camera triggering points, and loiter durations."
      },

      // 6 Tricky Questions
      {
        id: 5,
        type: "tricky",
        difficulty: "Avionics Fail-safe Behavior",
        question: "A multirotor is flying in Loiter (GPS Position Hold) mode at 100 meters altitude. Suddenly, severe solar activity or jamming causes satellite count to drop from 18 to 2 satellites. What does the flight controller automatically fail-safe downgrade to?",
        options: [
          "It cuts power to all motors and crashes immediately",
          "It immediately downgrades to Altitude Hold (Alt Hold) mode, maintaining height while requiring the pilot to manually control horizontal drift",
          "It engages high-speed autonomous Return-to-Launch without GPS",
          "It locks the motors at full throttle and climbs into the clouds"
        ],
        correctIndex: 1,
        explanation: "Without sufficient GPS satellite trilateration ($<4\text{ to }6$ satellites), horizontal coordinate hold is impossible. Autopilots seamlessly degrade to Alt Hold mode (relying on the barometer and IMU) while alerting the pilot to take manual control."
      },
      {
        id: 6,
        type: "tricky",
        difficulty: "RTL Altitude Logic",
        question: "A drone's RTL altitude parameter is configured to 50 meters. The drone is currently inspecting a communications tower at 75 meters altitude when RTL is triggered. How does the flight controller handle the return cruise altitude?",
        options: [
          "It dives 25 meters down to 50 meters altitude while still near the tower before flying Home",
          "It maintains its higher current altitude of 75 meters during return cruise and only descends once positioned directly over the Home location",
          "It climbs an extra 50 meters to 125 meters altitude",
          "It aborts the mission and hovers in place until the battery dies"
        ],
        correctIndex: 1,
        explanation: "Standard autopilot safety architecture dictates that if current altitude is HIGHER than the configured RTL altitude parameter, the drone maintains its higher current altitude to avoid descending into obstacles between its position and Home."
      },
      {
        id: 7,
        type: "tricky",
        difficulty: "Flight Mode Dynamics",
        question: "What is the primary operational risk when switching an industrial multirotor from 'Stabilize/Angle' mode into 'Acro/Rate' mode?",
        options: [
          "The camera payload will detach from the gimbal",
          "In Acro mode, stick inputs command angular rate of rotation rather than absolute tilt angle, and centering the sticks will NOT self-level the drone back to horizontal",
          "The GPS antenna will overheat and shut down",
          "The battery discharge rate is capped at 1 Ampere"
        ],
        correctIndex: 1,
        explanation: "In Stabilize mode, centering the pitch/roll stick automatically self-levels the aircraft to $0^\circ$ horizontal. In Acro mode, sticks command angular rotation rate ($\text{deg/s}$); centering sticks leaves the drone at its current tilted angle."
      },
      {
        id: 8,
        type: "tricky",
        difficulty: "Autonomous Landing Detection",
        question: "In 'Auto Land' mode, how does the flight controller reliably detect that the drone has touched down on the ground before safely disarming the motors?",
        options: [
          "By measuring the radio signal strength from the pilot's transmitter",
          "By detecting zero vertical velocity descent rate over a time threshold while the vertical PID controller is applying minimum throttle (throttle saturation with zero downward movement)",
          "By relying purely on GPS altitude reading zero",
          "By listening to audio microphone sound spikes from landing gear impact"
        ],
        correctIndex: 1,
        explanation: "Touchdown detection monitors barometric/LiDAR/IMU vertical velocity. When the drone stops moving downward despite the controller reducing throttle to minimum descent power for 1–2 seconds, touchdown is confirmed and motors disarm."
      },
      {
        id: 9,
        type: "tricky",
        difficulty: "Wind Drift Correction",
        question: "A quadcopter is holding position in Loiter mode when a steady 30 km/h wind begins blowing from the West. What attitude and thrust adjustment does the flight controller execute autonomously?",
        options: [
          "It points its camera toward the West and cuts power to the rear motors",
          "It pitches/rolls into the wind (tilting West) by an angle proportional to the wind force, using the horizontal component of total rotor thrust to cancel wind drag while increasing total throttle to maintain altitude",
          "It spins in continuous 360-degree yaw circles to deflect the wind",
          "It descends immediately to the ground"
        ],
        correctIndex: 1,
        explanation: "To hold position against a West wind, the flight controller tilts the aircraft into the wind (Westward). The horizontal component of rotor thrust ($T \sin\theta$) balances wind drag, while overall throttle is increased so vertical lift ($T \cos\theta$) still equals weight."
      },
      {
        id: 10,
        type: "tricky",
        difficulty: "Geofence Fail-safe",
        question: "An operator establishes a cylindrical inclusion Geofence (radius 300 meters, maximum altitude 100 meters). If the drone drifts toward the boundary in Auto mode due to a mission planning mistake, what safety action is executed at the geofence boundary?",
        options: [
          "The drone self-destructs via high-voltage capacitor surge",
          "The flight controller halts waypoint progression at the fence boundary and initiates a pre-programmed fence action (RTL, Loiter hold, or controlled landing)",
          "The drone ignores the fence and completes the flight",
          "The flight controller switches all motors into reverse gear"
        ],
        correctIndex: 1,
        explanation: "Geofence algorithms continuously compare vehicle 3D coordinates against configured boundary polygons. Upon reaching the boundary buffer, the autopilot arrests forward motion and executes safe recovery (RTL, loiter, or landing)."
      }
    ]
  },

  // ==========================================
  // MODULE 7: UAV ATTITUDE & AXIS MOVEMENT
  // ==========================================
  "mod-attitude-kinematics": {
    moduleId: "mod-attitude-kinematics",
    moduleNumber: "07",
    moduleTitle: "UAV Attitude & Axis Movement",
    passThreshold: 80,
    questions: [
      // 4 Simple Questions
      {
        id: 1,
        type: "simple",
        difficulty: "Core Concept",
        question: "Which spatial flight axis corresponds to 'Roll' (tilting the drone left or right)?",
        options: [
          "Longitudinal Axis (X-Axis, passing nose-to-tail)",
          "Lateral Axis (Y-Axis, passing wingtip-to-wingtip)",
          "Vertical Axis (Z-Axis, passing vertically through center of gravity)",
          "Compass Axis"
        ],
        correctIndex: 0,
        explanation: "Roll motion occurs around the Longitudinal Axis (X-axis), tilting the left side down and right side up (or vice versa)."
      },
      {
        id: 2,
        type: "simple",
        difficulty: "Core Concept",
        question: "Which spatial flight axis corresponds to 'Pitch' (tilting the drone nose-up or nose-down)?",
        options: [
          "Lateral Axis (Y-Axis, passing side-to-side through center of gravity)",
          "Longitudinal Axis (X-Axis)",
          "Vertical Axis (Z-Axis)",
          "Zenith Axis"
        ],
        correctIndex: 0,
        explanation: "Pitch motion occurs around the Lateral Axis (Y-axis), rotating the nose downward for forward flight or upward for deceleration/backward flight."
      },
      {
        id: 3,
        type: "simple",
        difficulty: "Core Concept",
        question: "Which spatial flight axis corresponds to 'Yaw' (rotating the drone's heading clockwise or counter-clockwise horizontally)?",
        options: [
          "Vertical Axis (Z-Axis, perpendicular to the aircraft body plane)",
          "Longitudinal Axis (X-Axis)",
          "Lateral Axis (Y-Axis)",
          "Transverse Horizontal Axis"
        ],
        correctIndex: 0,
        explanation: "Yaw rotation occurs around the Vertical Axis (Z-axis), turning the aircraft's nose to the left or right without tilting the body plane."
      },
      {
        id: 4,
        type: "simple",
        difficulty: "Core Concept",
        question: "How does a standard quadcopter generate pure vertical climb without tilting in pitch, roll, or yaw?",
        options: [
          "By increasing the RPM of only the front two motors",
          "By increasing the RPM of all four motors by the exact same amount simultaneously",
          "By tilting the landing gear legs forward",
          "By reversing the rotation of the clockwise motors"
        ],
        correctIndex: 1,
        explanation: "Uniformly increasing thrust across all four motors generates a net upward vertical force exceeding weight ($L > W$) while maintaining zero differential pitch/roll torque and zero net yaw torque."
      },

      // 6 Tricky Questions
      {
        id: 5,
        type: "tricky",
        difficulty: "Motor Differential Thrust",
        question: "In standard quadcopter configuration (M1 front-right, M2 rear-left, M3 rear-right, M4 front-left), what motor speed changes are required to execute a pure FORWARD PITCH (nose tilts DOWN) while maintaining constant hover altitude?",
        options: [
          "Increase M1 & M4 (front motors), decrease M2 & M3 (rear motors)",
          "Increase M2 & M3 (rear motors) and simultaneously decrease M1 & M4 (front motors) by equal thrust increments",
          "Increase M1 & M3 (right motors), decrease M2 & M4 (left motors)",
          "Increase all motors to 100% full throttle"
        ],
        correctIndex: 1,
        explanation: "To tilt the nose downward (forward pitch), the rear motors (M2 & M3) must produce more thrust than the front motors (M1 & M4). Reducing front motor thrust by the same amount ensures net vertical thrust remains equal to vehicle weight."
      },
      {
        id: 6,
        type: "tricky",
        difficulty: "Reactive Torque Dynamics",
        question: "To execute a pure Clockwise (CW) Yaw turn around the Z-axis without changing altitude or tilting roll/pitch, how does the flight controller adjust motor speeds?",
        options: [
          "Increases the speed of all CW motors and stops all CCW motors",
          "Increases speed on the Counter-Clockwise (CCW) rotating motors (M1 & M2) while decreasing speed on the Clockwise (CW) rotating motors (M3 & M4) by the same amount",
          "Tilts the physical motor mounts using hydraulic actuators",
          "Spins only the front right motor"
        ],
        correctIndex: 1,
        explanation: "According to Newton's 3rd Law, spinning a motor CCW produces an equal and opposite Clockwise (CW) reactive torque on the frame. Increasing CCW motor speeds (M1, M2) while decreasing CW motor speeds (M3, M4) produces a net CW yawing torque on the airframe."
      },
      {
        id: 7,
        type: "tricky",
        difficulty: "Kinematic Coupling",
        question: "When a multirotor executes a high-speed Right Roll maneuver ($30^\circ$ right bank angle), what happens to its lateral trajectory?",
        options: [
          "It flies straight forward without any lateral drift",
          "The tilted rotor thrust vector produces a horizontal force component to the right ($T \sin 30^\circ$), causing the aircraft to accelerate laterally toward the right",
          "It spins uncontrollably in yaw without translating",
          "The drone stops in mid-air"
        ],
        correctIndex: 1,
        explanation: "Banking the aircraft tilts the net thrust vector. The lateral horizontal component of thrust ($T \sin\theta$) acts as an un-opposed force accelerating the drone sideways in the direction of the roll bank."
      },
      {
        id: 8,
        type: "tricky",
        difficulty: "Motor Failure Kinematics",
        question: "If Motor 1 (front-right, CCW spinning) suffers complete electrical failure during forward flight, what immediate uncommanded rotational motion will occur before fail-safe intervention?",
        options: [
          "The drone will pitch up and yaw clockwise",
          "The drone will immediately roll right (loss of right thrust), pitch forward-right (loss of front-right thrust), and yaw counter-clockwise (loss of CCW rotor's clockwise reactive torque)",
          "The drone will climb vertically",
          "The drone will fly backwards in perfect balance"
        ],
        correctIndex: 1,
        explanation: "Losing M1 removes front-right upward thrust, causing immediate roll-right and pitch-down tilt on that corner. Furthermore, losing a CCW motor creates an imbalance in reactive torque, causing the frame to yaw CCW."
      },
      {
        id: 9,
        type: "tricky",
        difficulty: "Differential Altitude Preservation",
        question: "Why does the flight controller use balanced differential arithmetic (e.g. $+ \Delta T$ on left motors, $- \Delta T$ on right motors) rather than simply accelerating the left motors when commanding a roll maneuver?",
        options: [
          "Because accelerating only one side would increase total net thrust ($T_{\text{total}} = T_{\text{hover}} + \Delta T$), causing an unwanted climb in altitude every time the pilot rolls",
          "Because ESCs cannot receive positive throttle inputs without matching negative inputs",
          "To avoid draining the battery from both sides simultaneously",
          "Because multirotor frames are mechanically wired in cross-balance"
        ],
        correctIndex: 0,
        explanation: "By applying $+ \Delta T$ on one side and $- \Delta T$ on the opposite side, the total sum of motor thrust ($T_{\text{total}}$) remains constant, decoupling pure rotational roll torque from vertical altitude acceleration."
      },
      {
        id: 10,
        type: "tricky",
        difficulty: "Newtonian Reactive Torque",
        question: "Why can quadcopters achieve full 3-axis rotational control using fixed-pitch propellers without requiring complex variable-pitch swashplates or aerodynamic control ailerons?",
        options: [
          "Because drones operate in a frictionless quantum vacuum",
          "Differential motor throttle creates pitch and roll moments via thrust levers around the CG, while differential CW/CCW motor throttle creates yaw moments via Newton's 3rd Law reactive torque",
          "Because propellers change their physical shape in mid-air depending on air temperature",
          "Because the flight controller uses internal gyroscopic flywheels for all turns"
        ],
        correctIndex: 1,
        explanation: "Multirotor simplicity relies entirely on electronic motor speed regulation: differential thrust on opposing arms creates pitch/roll moments, while differential acceleration between CW and CCW rotor pairs exploits reactive torque for yaw control."
      }
    ]
  },

  // ==========================================
  // MODULE 8: DGCA RULES & AIRSPACE REGULATIONS
  // ==========================================
  "mod-dgca-rules": {
    moduleId: "mod-dgca-rules",
    moduleNumber: "08",
    moduleTitle: "DGCA Rules & Airspace Regulations",
    passThreshold: 80,
    questions: [
      // 4 Simple Questions
      {
        id: 1,
        type: "simple",
        difficulty: "Core Concept",
        question: "Under DGCA Drone Rules, what is the maximum permissible altitude for operating a drone in a designated **Green Zone** without prior air traffic permission?",
        options: [
          "100 feet (30 meters)",
          "400 feet (120 meters) above ground level (AGL)",
          "1000 feet (300 meters)",
          "Unlimited altitude"
        ],
        correctIndex: 1,
        explanation: "In a designated Green Zone (beyond 12 km from an operational airport), operations up to 400 feet (120 meters) AGL require no prior permission on the DigitalSky portal."
      },
      {
        id: 2,
        type: "simple",
        difficulty: "Core Concept",
        question: "What is the official statutory interactive digital portal developed by the Ministry of Civil Aviation / DGCA for Indian airspace classification and drone registrations?",
        options: [
          "e-Flight Portal",
          "DigitalSky Platform (digitalsky.dgca.gov.in)",
          "AirMap India",
          "National Drone Cloud"
        ],
        correctIndex: 1,
        explanation: "DigitalSky (digitalsky.dgca.gov.in) is the official Government of India platform for dynamic interactive airspace maps (Green, Yellow, Red zones), Unique Identification Number (UIN) registration, and flight permissions."
      },
      {
        id: 3,
        type: "simple",
        difficulty: "Core Concept",
        question: "What color airspace classification applies to the airspace within a 5 km radius around the perimeter of an operational civil or military airport?",
        options: [
          "Green Zone",
          "Yellow Zone",
          "Red Zone (Strictly No-Fly Zone without central government clearance)",
          "Blue Zone"
        ],
        correctIndex: 2,
        explanation: "Airspace within 5 km of an operational airport perimeter is strictly designated as a **Red Zone**, where drone flights are completely prohibited except under special central government authorization."
      },
      {
        id: 4,
        type: "simple",
        difficulty: "Core Concept",
        question: "What weight range defines a **Micro Drone** under statutory DGCA Drone Rules classification?",
        options: [
          "Less than or equal to 250 grams",
          "Greater than 250 grams and up to 2 kilograms (>250g to 2kg)",
          "Greater than 2 kg up to 25 kg",
          "Greater than 25 kg up to 150 kg"
        ],
        correctIndex: 1,
        explanation: "Under DGCA Drone Rules: Nano ($\le 250\text{g}$), Micro ($>250\text{g}\text{ to }2\text{kg}$), Small ($>2\text{kg}\text{ to }25\text{kg}$), Medium ($>25\text{kg}\text{ to }150\text{kg}$), Large ($>150\text{kg}$)."
      },

      // 6 Tricky Questions
      {
        id: 5,
        type: "tricky",
        difficulty: "Airport Buffer Zoning",
        question: "An operator plans to fly in a designated Green Zone located in the lateral buffer zone between **8 km and 12 km** from the perimeter of an operational airport. What is the maximum permissible flight altitude without prior ATC clearance?",
        options: [
          "400 feet (120 meters)",
          "Up to 200 feet (60 meters) AGL",
          "Zero feet (Strictly no flying permitted)",
          "50 feet (15 meters)"
        ],
        correctIndex: 1,
        explanation: "In the lateral corridor between 8 km and 12 km from an airport perimeter, the Green Zone ceiling is statutory limited to **200 feet (60 meters) AGL** without prior ATC permission. Beyond 12 km, the limit expands to 400 feet (120m)."
      },
      {
        id: 6,
        type: "tricky",
        difficulty: "Air Traffic Permission Protocols",
        question: "If a survey mission falls inside a designated **Yellow Zone** (controlled airspace), what statutory clearance must be secured through DigitalSky before arming motors?",
        options: [
          "No permission is needed if flying below tree level",
          "Prior flight permission from the concerned Air Traffic Control (ATC) authority (Airports Authority of India, Indian Air Force, Navy, or HAL) via DigitalSky",
          "A written letter sent by postal mail to the local police commissioner",
          "Verbal approval from the nearest private flying club"
        ],
        correctIndex: 1,
        explanation: "A Yellow Zone represents controlled airspace. Flight operations in a Yellow Zone legally require prior permission from the relevant ATC authority (AAI, IAF, Navy, Coast Guard, etc.) submitted and approved digitally via the DigitalSky portal."
      },
      {
        id: 7,
        type: "tricky",
        difficulty: "Pilot Licensing Exemptions",
        question: "Under DGCA Drone Rules, which specific category of drone operation is completely EXEMPT from requiring a Remote Pilot Certificate (RPC)?",
        options: [
          "Small drones operating for commercial cinema filming",
          "Non-commercial operations of a Nano drone ($\le 250\text{g}$) and non-commercial operations of a Micro drone ($>250\text{g}\text{ to }2\text{kg}$)",
          "Medium agricultural drones flying over private farmland",
          "Any drone flying at night"
        ],
        correctIndex: 1,
        explanation: "No Remote Pilot Certificate (RPC) is required for operating a Nano drone ($\le 250\text{g}$) for non-commercial purposes, nor for non-commercial operation of a Micro drone ($>250\text{g}\text{ to }2\text{kg}$)."
      },
      {
        id: 8,
        type: "tricky",
        difficulty: "National Security Buffers",
        question: "What is the statutory Red Zone perimeter buffer distance along international land borders where all civil drone operations are strictly prohibited without Central Government clearance?",
        options: [
          "5 kilometers",
          "25 kilometers from the international land border",
          "100 meters",
          "50 kilometers"
        ],
        correctIndex: 1,
        explanation: "Airspace within **25 km of the international border** (including Line of Control, Line of Actual Control, and Actual Ground Position Line) is statutory designated as a permanent **Red Zone**."
      },
      {
        id: 9,
        type: "tricky",
        difficulty: "Airworthiness & Type Certification",
        question: "An operator purchases a DGCA Type-Certified Small drone (MTOW 18 kg) and modifies it by strapping on an unapproved custom 10 kg thermal payload, pushing total takeoff weight to 28 kg. What is the regulatory status of this operation?",
        options: [
          "Completely legal under the original Type Certificate because the airframe is unchanged",
          "Illegal and invalidates the Type Certificate, as exceeding MTOW or making major unapproved airworthiness alterations voids DGCA compliance and insurance coverage",
          "Legal provided the pilot flies during daylight hours only",
          "Legal if the payload has an independent battery"
        ],
        correctIndex: 1,
        explanation: "Operating beyond certified MTOW or making unauthorized airworthiness modifications violates the Type Certificate issued by DGCA under Drone Rules 2021, rendering the flight illegal and voiding third-party insurance."
      },
      {
        id: 10,
        type: "tricky",
        difficulty: "Temporary Flight Restrictions (NOTAM)",
        question: "When a statutory Notice to Airmen (NOTAM) or Temporary Restricted Area (TRA) is enacted by DGCA over an area normally mapped as a Green Zone (e.g. for VIP security or national disaster operations), what happens to the airspace status?",
        options: [
          "The airspace remains Green and pilots can ignore the NOTAM",
          "The designated area temporarily converts into a strict **Red Zone / Temporary Flight Restriction (TFR)**, legally prohibiting all unauthorized drone operations during the active NOTAM window",
          "The maximum flight altitude increases to 1000 feet",
          "The drone's transmitter range is automatically doubled"
        ],
        correctIndex: 1,
        explanation: "NOTAMs and Temporary Restricted Areas (TRAs) supersede baseline zoning maps. An active NOTAM over a Green Zone temporarily converts the airspace into a Red Zone where all civilian drone operations are grounded."
      }
    ]
  }
};
