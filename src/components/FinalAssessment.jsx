import React, { useState } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  ArrowLeft, 
  Award, 
  Sparkles, 
  ShieldCheck, 
  BookOpen, 
  Check, 
  ChevronRight, 
  AlertTriangle, 
  ExternalLink,
  HelpCircle
} from 'lucide-react';

export default function FinalAssessment({ onNavigateHome, onRetake }) {
  const questions = [
    // ==========================================
    // MODULE 1: INTRODUCTION TO DRONES & TERMINOLOGY (4 Qs)
    // ==========================================
    {
      id: 1,
      module: "Module 1: Terminology",
      question: "A drone system consists of the flying aircraft, a ground control station (GCS), a communication radio link, and a camera payload. What is the correct technical term for this entire combined system?",
      options: [
        "UAV (Unmanned Aerial Vehicle)",
        "UAS (Unmanned Aircraft System)",
        "RPA (Remotely Piloted Aircraft)",
        "GCS (Ground Control Station)"
      ],
      correctIndex: 1,
      explanation: "While 'UAV' refers only to the aircraft itself, 'UAS' encompasses the complete integrated system including the UAV, Ground Control Station (GCS), datalinks, and mission payloads."
    },
    {
      id: 2,
      module: "Module 1: Propulsion Architecture",
      question: "On a standard quadcopter, why do two diagonal motors rotate clockwise (CW) while the other two rotate counter-clockwise (CCW)?",
      options: [
        "To cancel the reactionary motor torques so the drone body does not spin uncontrollably",
        "To make the drone fly twice as fast forward",
        "Because CW motors consume less battery power than CCW motors",
        "To allow the drone to generate lift only on one side"
      ],
      correctIndex: 0,
      explanation: "Spinning propellers create an equal and opposite reaction torque on the frame (Newton's 3rd Law). Having equal pairs of CW and CCW motors balances total rotational torque to zero during steady flight."
    },
    {
      id: 3,
      module: "Module 1: Drone Applications",
      question: "Which of the following is considered a drone 'Payload' rather than a core structural or flight-critical component?",
      options: [
        "Electronic Speed Controller (ESC)",
        "Multispectral Crop Survey Camera",
        "Flight Controller Microprocessor",
        "Brushless DC Motor"
      ],
      correctIndex: 1,
      explanation: "Payloads are mission-specific items carried by the drone (such as cameras, LiDAR, sprayers, or cargo), whereas ESCs, motors, and flight controllers are essential flight hardware."
    },
    {
      id: 4,
      module: "Module 1: Communications",
      question: "What type of data is transmitted from the UAV back to the Ground Control Station over the 'Telemetry' link?",
      options: [
        "Real-time flight status such as battery voltage, GPS coordinates, altitude, and ground speed",
        "High-voltage AC electricity to power the ground station",
        "Physical firmware code compilation",
        "Direct mechanical movement of the control sticks"
      ],
      correctIndex: 0,
      explanation: "Telemetry is the bi-directional wireless data stream transmitting live operational flight parameters from the UAV to the ground operator screen."
    },

    // ==========================================
    // MODULE 2: TYPES OF DRONES & AIRFRAME ARCHITECTURES (4 Qs)
    // ==========================================
    {
      id: 5,
      module: "Module 2: Airframe Types",
      question: "Why does a conventional single-rotor helicopter require a small vertical tail rotor, whereas a quadcopter does not require any tail rotor?",
      options: [
        "Single-rotor helicopters have one large main rotor whose torque must be countered by a tail rotor, whereas quadcopters counter torque using opposite-spinning propeller pairs",
        "Quadcopters do not experience any aerodynamic torque",
        "Single-rotor helicopters cannot generate upward lift without a tail rotor",
        "Tail rotors are only used to cool the helicopter battery"
      ],
      correctIndex: 0,
      explanation: "A single main rotor creates strong continuous torque trying to spin the fuselage in the opposite direction. Multirotors eliminate the mechanical tail rotor by pairing CW and CCW motors."
    },
    {
      id: 6,
      module: "Module 2: Multirotor Frames",
      question: "Why is the X-frame configuration preferred over the + (Plus) frame configuration in commercial camera drones?",
      options: [
        "The X-frame places its arms at 45° angles, keeping propellers out of the forward camera's field of view",
        "The X-frame only needs 2 motors to fly instead of 4",
        "The + frame cannot turn left or right",
        "The X-frame uses half the battery power of a + frame"
      ],
      correctIndex: 0,
      explanation: "In an X-frame, the camera looks forward between the two front arms without propellers blocking the view, unlike a + frame where the front motor sits directly in the camera line of sight."
    },
    {
      id: 7,
      module: "Module 2: Coaxial Multirotors",
      question: "An 'X8 Coaxial' drone has 4 physical arms but is classified as an Octocopter. How are its 8 motors arranged?",
      options: [
        "Two motors (one pointing up, one pointing down) mounted on each of the 4 arms",
        "8 motors mounted side-by-side on a single front bar",
        "4 motors on the arms and 4 motors inside the battery compartment",
        "8 motors rotating in the exact same clockwise direction"
      ],
      correctIndex: 0,
      explanation: "Coaxial multirotors stack contra-rotating motor pairs on top and bottom of each arm, packing 8 motors onto a 4-arm frame footprint."
    },
    {
      id: 8,
      module: "Module 2: Hybrid VTOL",
      question: "How does a Hybrid VTOL drone operate during a typical flight mission?",
      options: [
        "Takes off and lands vertically using multirotor propellers, and transitions to wing-borne flight using forward propulsion for cruise",
        "Flies only when connected to a ground power cable",
        "Uses helium balloons for takeoff and jet fuel for landing",
        "Cannot hover at any point during its flight"
      ],
      correctIndex: 0,
      explanation: "Hybrid VTOLs combine vertical takeoff/landing (VTOL) with high-speed, long-range fixed-wing cruising efficiency."
    },

    // ==========================================
    // MODULE 3: DRONE COMPONENTS & PROPULSION SYSTEMS (4 Qs)
    // ==========================================
    {
      id: 9,
      module: "Module 3: Motor KV Rating",
      question: "A brushless motor has a rating of 1000 KV. What does this rating tell you about the motor's theoretical speed when connected to an 11.1V (3S) battery under no load?",
      options: [
        "It will spin at approximately 11,100 RPM (1000 × 11.1)",
        "It consumes 1,000 Watts of electrical power per second",
        "It can produce 1,000 kg of lifting thrust",
        "It can only handle a maximum of 1,000 Volts"
      ],
      correctIndex: 0,
      explanation: "Motor KV specifies the RPM generated per 1.0 Volt of applied DC voltage with no load (RPM = KV × Voltage)."
    },
    {
      id: 10,
      module: "Module 3: ESC Architecture",
      question: "What happens if a single motor channel fails on a '4-in-1 ESC' board compared to a setup using four individual single ESCs?",
      options: [
        "On a 4-in-1 ESC, the entire board must usually be replaced because all 4 motor circuits share a single circuit board",
        "The drone automatically turns into a fixed-wing plane",
        "The remaining 3 motors will automatically spin backwards",
        "A 4-in-1 ESC cannot be used on a quadcopter"
      ],
      correctIndex: 0,
      explanation: "4-in-1 ESCs save weight and wiring by combining four ESC channels onto one PCB, but lack the single-channel modular replacement advantage of individual arm ESCs."
    },
    {
      id: 11,
      module: "Module 3: Battery Configurations",
      question: "A technician connects two 3.7V 5000mAh LiPo cells in Series (2S). What is the total voltage and capacity of this combined pack?",
      options: [
        "7.4V and 5000mAh",
        "3.7V and 10000mAh",
        "7.4V and 10000mAh",
        "14.8V and 2500mAh"
      ],
      correctIndex: 0,
      explanation: "Connecting battery cells in Series (S) adds their voltages together (3.7V + 3.7V = 7.4V) while total capacity remains unchanged at 5000mAh."
    },
    {
      id: 12,
      module: "Module 3: Battery Configurations",
      question: "What is the nominal voltage and total capacity of a 6S2P battery pack made from 3.7V 8000mAh cells?",
      options: [
        "22.2V and 16000mAh",
        "11.1V and 8000mAh",
        "44.4V and 16000mAh",
        "22.2V and 8000mAh"
      ],
      correctIndex: 0,
      explanation: "In 6S2P: Voltage = 6 × 3.7V = 22.2V; Capacity = 2 × 8000mAh = 16000mAh."
    },

    // ==========================================
    // MODULE 4: FLIGHT CONTROLLER & SENSORS (4 Qs)
    // ==========================================
    {
      id: 13,
      module: "Module 4: Flight Controller Role",
      question: "Why is the Flight Controller called the 'brain' of the drone?",
      options: [
        "It reads sensor data, calculates position/attitude, and continuously adjusts individual motor speeds hundreds of times per second to keep the drone stable",
        "It stores video files recorded by the camera",
        "It charges the battery while the drone is in flight",
        "It physically turns the drone propellers using gears"
      ],
      correctIndex: 0,
      explanation: "The flight controller is the central processor running high-speed feedback control loops to calculate and command motor adjustments for stability and navigation."
    },
    {
      id: 14,
      module: "Module 4: IMU Sensors",
      question: "Within the Inertial Measurement Unit (IMU), what is the specific role of the Gyroscope sensor?",
      options: [
        "Measures angular velocity (the rate at which the drone rotates around its Roll, Pitch, and Yaw axes)",
        "Measures battery remaining percentage",
        "Measures distance to the nearest airport",
        "Measures air temperature around the drone"
      ],
      correctIndex: 0,
      explanation: "The Gyroscope detects rotational speed (degrees per second) around the 3 spatial axes, allowing the flight controller to detect and correct unwanted tilts instantly."
    },
    {
      id: 15,
      module: "Module 4: Barometer Sensor",
      question: "How does the onboard Barometer determine changes in the drone's flight altitude?",
      options: [
        "By measuring changes in atmospheric air pressure, which decreases as the drone climbs higher",
        "By measuring the speed of the spinning propellers",
        "By counting the number of satellites in the sky",
        "By measuring magnetic forces from the ground"
      ],
      correctIndex: 0,
      explanation: "Atmospheric pressure decreases with altitude. The barometer measures this pressure drop to calculate height above ground for smooth altitude hold."
    },
    {
      id: 16,
      module: "Module 4: Magnetometer Sensor",
      question: "If a drone is armed directly on top of a steel bridge or reinforced concrete surface with strong magnetic interference, which sensor is most likely to provide incorrect data?",
      options: [
        "Magnetometer (Compass)",
        "Barometer",
        "Optical Flow sensor",
        "Accelerometer Z-axis"
      ],
      correctIndex: 0,
      explanation: "The Magnetometer senses Earth's weak magnetic field. Nearby ferrous metals or electrical currents distort the magnetic field and produce incorrect heading readings."
    },

    // ==========================================
    // MODULE 5: FUNDAMENTALS OF UAV FLIGHT FORCES (4 Qs)
    // ==========================================
    {
      id: 17,
      module: "Module 5: 4 Flight Forces",
      question: "What are the four fundamental forces that act on a UAV during flight?",
      options: [
        "Lift, Weight (Gravity), Thrust, and Drag",
        "Power, Speed, Torque, and Friction",
        "Voltage, Current, Resistance, and Capacitance",
        "Roll, Pitch, Yaw, and Throttle"
      ],
      correctIndex: 0,
      explanation: "The four classic aerodynamic flight forces are Lift (upward), Weight (downward), Thrust (forward motive force), and Drag (opposing aerodynamic resistance)."
    },
    {
      id: 18,
      module: "Module 5: Hover Equilibrium",
      question: "For a multirotor drone to hover steadily at a constant altitude without moving up or down, what exact force balance must exist?",
      options: [
        "Lift generated by propellers must exactly equal the total Weight of the drone (Lift = Weight)",
        "Lift must be twice the Weight (Lift = 2 × Weight)",
        "Drag must be greater than Thrust",
        "Weight must be zero"
      ],
      correctIndex: 0,
      explanation: "In vertical equilibrium, net vertical force is zero (F_net = Lift - Weight = 0), so the drone maintains a constant altitude."
    },
    {
      id: 19,
      module: "Module 5: Vertical Climb",
      question: "When a drone pilot pushes the throttle stick up to accelerate the drone into a rapid vertical climb, what is the relationship between the forces?",
      options: [
        "Lift is greater than Weight (Lift > Weight)",
        "Lift is equal to Weight (Lift = Weight)",
        "Drag is greater than Thrust",
        "Lift is less than Weight (Lift < Weight)"
      ],
      correctIndex: 0,
      explanation: "When total upward lift exceeds downward gravitational weight (Lift > Weight), a net upward force accelerates the aircraft upward."
    },
    {
      id: 20,
      module: "Module 5: Fixed-Wing Lift Generation",
      question: "How does a Fixed-Wing drone generate lift differently from a Multirotor drone?",
      options: [
        "Fixed-wing drones generate lift by moving forward through the air so that airflow creates a pressure difference across their airfoil wings",
        "Fixed-wing drones do not experience gravity",
        "Fixed-wing drones only generate lift when stationary on the ground",
        "Multirotor drones generate lift using fixed wings"
      ],
      correctIndex: 0,
      explanation: "Fixed-wing aircraft require forward airspeed to pass air over shaped wings, generating lift via Bernoulli's principle, whereas multirotors push air straight down with rotating blades."
    },

    // ==========================================
    // MODULE 6: FLIGHT MODES ON UAV (4 Qs)
    // ==========================================
    {
      id: 21,
      module: "Module 6: Loiter vs Alt Hold",
      question: "What is the main difference between 'Altitude Hold (Alt Hold)' mode and 'Loiter' mode when wind blows against the drone?",
      options: [
        "In Alt Hold, the drone maintains its height but drifts with the wind; in Loiter, the drone uses GPS to hold both its height and its exact 2D position against the wind",
        "In Alt Hold, the drone lands immediately; in Loiter, it turns off motors",
        "In Loiter, the camera is turned off automatically",
        "In Alt Hold, the drone flies in circles"
      ],
      correctIndex: 0,
      explanation: "Alt Hold uses only the barometer to maintain altitude, leaving horizontal position uncorrected. Loiter combines GPS and barometer to actively fight wind drift and hold 3D coordinates."
    },
    {
      id: 22,
      module: "Module 6: Auto Mode",
      question: "In 'Auto Mode', how does the UAV navigate through its flight mission?",
      options: [
        "It autonomously follows a pre-programmed sequence of GPS waypoints uploaded before flight without requiring manual stick input",
        "It follows the nearest bird in the sky",
        "It flies in random directions to search for signals",
        "It only moves when the pilot manually holds the pitch stick forward"
      ],
      correctIndex: 0,
      explanation: "Auto Mode executes automated missions by navigating sequentially through pre-programmed coordinates (WP1 → WP2 → WP3) with set speeds and altitudes."
    },
    {
      id: 23,
      module: "Module 6: Return-to-Launch Sequence",
      question: "What safety action does a drone execute when 'Return-to-Launch (RTL)' mode is triggered?",
      options: [
        "It climbs to a safe preset altitude, flies autonomously back to the takeoff Home point, and lands automatically",
        "It immediately cuts power to all motors and drops to the ground",
        "It increases speed to maximum and flies in the direction of the wind",
        "It stays frozen in the air until the battery reaches 0%"
      ],
      correctIndex: 0,
      explanation: "RTL safety logic ensures the drone climbs above obstacles, navigates back to the recorded georeferenced takeoff position, and performs an automated landing."
    },
    {
      id: 24,
      module: "Module 6: Land Mode",
      question: "When would an autopilot automatically activate 'Land Mode' during a mission?",
      options: [
        "When the battery voltage drops to a critical emergency threshold or upon direct pilot command",
        "Whenever the camera takes a photo",
        "When the drone reaches its maximum forward speed",
        "Whenever GPS detects more than 10 satellites"
      ],
      correctIndex: 0,
      explanation: "Land Mode descends and lands the aircraft vertically at its current location, triggered manually by the pilot or automatically as a critical battery failsafe."
    },

    // ==========================================
    // MODULE 7: UAV ATTITUDE & AXIS MOVEMENT (3 Qs)
    // ==========================================
    {
      id: 25,
      module: "Module 7: Roll Axis",
      question: "Which movement describes 'Roll' on a UAV, and along which axis does this rotation occur?",
      options: [
        "Tilting sideways to the left or right about the Longitudinal (front-to-back X) axis",
        "Tilting the nose up or down about the Lateral axis",
        "Turning the heading direction about the Vertical axis",
        "Moving straight up and down"
      ],
      correctIndex: 0,
      explanation: "Roll rotates the aircraft along its front-to-back longitudinal axis, dipping one side while raising the other to tilt and move sideways."
    },
    {
      id: 26,
      module: "Module 7: Pitch Axis",
      question: "To tilt the nose of a quadcopter downward to fly forward (Forward Pitch), how must the flight controller adjust the motor speeds?",
      options: [
        "Increase the thrust of the rear motors and decrease the thrust of the front motors",
        "Increase the thrust of the front motors and decrease the rear motors",
        "Increase only the right-side motors",
        "Decrease all 4 motors equally"
      ],
      correctIndex: 0,
      explanation: "Increasing rear motor thrust relative to the front motors creates a pitch-down torque that tilts the aircraft nose downward, directing thrust backward to push the drone forward."
    },
    {
      id: 27,
      module: "Module 7: Yaw Axis",
      question: "How does a quadcopter rotate its heading to the left or right (Yaw) without tilting or changing its altitude?",
      options: [
        "By creating a speed difference between the Clockwise (CW) and Counter-Clockwise (CCW) motor pairs, causing a net torque imbalance",
        "By deploying mechanical rudder flaps on the arms",
        "By turning off all motors on the left side",
        "By physically bending the drone frame"
      ],
      correctIndex: 0,
      explanation: "Speeding up one diagonal pair (e.g. CW) while slowing down the other (CCW) by an equal amount unbalances reactive torque to rotate the heading while maintaining net vertical lift."
    },

    // ==========================================
    // MODULE 8: DGCA REGULATIONS & AIRSPACE RULES (3 Qs)
    // ==========================================
    {
      id: 28,
      module: "Module 8: Green Zone Altitudes",
      question: "Under India's DGCA Drone Rules 2021, what is the maximum permitted flying altitude in a Green Zone located 15 km away from an operational airport?",
      options: [
        "120 meters (400 feet AGL)",
        "60 meters (200 feet AGL)",
        "15 meters (50 feet AGL)",
        "Flight is completely prohibited"
      ],
      correctIndex: 0,
      explanation: "In a Green Zone beyond 12 km from an operational airport, drones can fly up to a maximum altitude of 120 meters (400 ft AGL) without requiring prior operational permission."
    },
    {
      id: 29,
      module: "Module 8: Yellow Zone Rules",
      question: "What rule applies to drone flights in a DGCA 'Yellow Zone' (airspace located 5 km to 8 km from an operational airport)?",
      options: [
        "Flight is allowed only after obtaining prior permission from Air Traffic Control (ATC) via DigitalSky",
        "No permission is needed at any time",
        "Drones are permanently banned with no permission possible",
        "Only nano drones can fly up to 1000 meters"
      ],
      correctIndex: 0,
      explanation: "Airspace within 5–8 km of an operational airport is classified as a Yellow Zone (controlled airspace), where flights require mandatory ATC permission through DigitalSky."
    },
    {
      id: 30,
      module: "Module 8: Weight Categories",
      question: "A drone has an empty frame weight of 1.5 kg, a battery weighing 1.0 kg, and a survey sensor payload weighing 1.0 kg (Total All-Up Weight = 3.5 kg). Under DGCA rules, which weight category does this drone belong to?",
      options: [
        "Small Drone (weight greater than 2 kg and up to 25 kg)",
        "Nano Drone (weight up to 250 g)",
        "Micro Drone (weight greater than 250 g and up to 2 kg)",
        "Medium Drone (weight greater than 25 kg and up to 150 kg)"
      ],
      correctIndex: 0,
      explanation: "DGCA classifies drones based on gross takeoff weight (All-Up Weight including battery and payload). Since 3.5 kg is between 2 kg and 25 kg, it is classified as a Small Drone."
    }
  ];

  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleSelectOption = (questionId, optionIndex) => {
    if (submitted) return;
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach(q => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        score += 1;
      }
    });
    return score;
  };

  const handleRetakeQuiz = () => {
    setSelectedAnswers({});
    setSubmitted(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isModule8Done = (() => {
    try {
      return localStorage.getItem('asteria_module_mod-dgca-rules') === 'completed';
    } catch {
      return false;
    }
  })();

  if (!isModule8Done) {
    return (
      <div className="min-h-screen bg-[var(--bg-primary)] py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <button 
          onClick={onNavigateHome}
          className="inline-flex items-center gap-1 font-mono text-xs text-[var(--accent-signal)] hover:underline mb-6"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Curriculum</span>
        </button>

        <div className="p-8 rounded-3xl bg-[var(--bg-elevated)] border-2 border-dashed border-[var(--divider)] text-center flex flex-col items-center justify-center shadow-xs">
          <div className="w-16 h-16 rounded-2xl bg-[var(--accent-signal-subtle)] border border-[#BFDBFE] flex items-center justify-center text-[var(--accent-signal)] mb-4 shadow-sm">
            <ShieldCheck className="w-8 h-8" />
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 mb-2 rounded-full bg-[var(--accent-signal-subtle)] text-[var(--accent-signal)] font-mono text-xs font-bold uppercase">
            <span>Prerequisites Required</span>
          </div>

          <h2 className="font-display text-2xl sm:text-3xl font-bold text-[var(--text-primary)] mb-2">
            Final Assessment is Locked
          </h2>

          <p className="font-body text-sm text-[var(--text-muted)] max-w-md mb-8 leading-relaxed">
            The Final Assessment Test is unlocked after submitting Module 8 (DGCA Regulations) assessment.
          </p>

          <button
            type="button"
            onClick={onNavigateHome}
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-sm font-bold font-display text-white bg-[var(--accent-signal)] hover:bg-[var(--accent-signal-deep)] shadow-brand transition-all"
          >
            <span>Go to Curriculum & Resume Study</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  const score = calculateScore();
  const percentage = Math.round((score / questions.length) * 100);
  const passed = percentage >= 75;

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] py-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header */}
      <div className="mb-8">
        <button 
          onClick={onNavigateHome}
          className="inline-flex items-center gap-1 font-mono text-xs text-[var(--accent-signal)] hover:underline mb-3"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Curriculum Overview</span>
        </button>

        <div className="flex items-center gap-2 mb-1.5">
          <span className="w-2 h-2 rounded-full bg-[var(--accent-signal)]" />
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--accent-signal)]">
            FINAL COMPREHENSIVE ASSESSMENT TEST · 30 QUESTIONS (1 MARK EACH)
          </span>
        </div>

        <h1 className="font-display text-3xl sm:text-4xl font-bold text-[var(--text-primary)]">
          Drone Fundamentals Final Assessment Test
        </h1>
        <p className="font-body text-sm sm:text-base text-[var(--text-muted)] mt-1.5 leading-relaxed">
          Comprehensive 30-question final assessment test evaluating your understanding across all 8 modules (Lift, Hardware, Avionics, Flight Forces, Autonomous Modes, Kinematics, and DGCA Regulations). Each question carries 1 Mark (Total: 30 Marks). Passing grade is 75% (23/30).
        </p>
      </div>

      {/* Result Certificate Banner (If Submitted) */}
      {submitted && (
        <div className={`mb-10 p-6 sm:p-8 rounded-2xl border ${
          passed 
            ? 'bg-[#ECFDF5] border-[#A7F3D0] text-[#065F46]' 
            : 'bg-[#FEF2F2] border-[#FECACA] text-[#991B1B]'
        }`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-current/20">
            <div className="flex items-center gap-4">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                passed ? 'bg-[#059669] text-white shadow-brand' : 'bg-[#DC2626] text-white'
              }`}>
                {passed ? <Award className="w-8 h-8" /> : <AlertTriangle className="w-8 h-8" />}
              </div>
              <div>
                <span className="font-mono text-xs font-bold uppercase tracking-wider block opacity-80">
                  {passed ? 'Certification Status: PASSED ✓' : 'Certification Status: NEEDS REVIEW'}
                </span>
                <h2 className="font-display text-2xl font-bold">
                  Score: {score} / {questions.length} Marks ({percentage}%)
                </h2>
              </div>
            </div>

            <button
              type="button"
              onClick={handleRetakeQuiz}
              className="self-start sm:self-auto inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white border border-current text-current font-mono text-xs font-bold shadow-2xs hover:bg-white/80 transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Retake Assessment</span>
            </button>
          </div>

          <p className="font-body text-sm leading-relaxed">
            {passed 
              ? "Congratulations! You have successfully mastered the Drone Fundamentals UAV curriculum. You have demonstrated rigorous conceptual understanding of aerodynamic forces, multirotor configurations, electronics, flight controller sensor fusion, 3-axis kinematics, and DGCA airspace regulations." 
              : "You scored below the 75% passing threshold. Review the red and green highlighted answers with detailed technical explanations below, and retake the assessment when ready."}
          </p>
        </div>
      )}

      {/* Questions List */}
      <div className="space-y-6 mb-10">
        {questions.map((q, qIndex) => {
          const userAnswer = selectedAnswers[q.id];
          const isAnswered = userAnswer !== undefined;
          const isCorrect = isAnswered && userAnswer === q.correctIndex;
          const isWrong = isAnswered && userAnswer !== q.correctIndex;

          return (
            <div 
              key={q.id}
              className={`p-6 rounded-2xl bg-[var(--bg-elevated)] border transition-all ${
                submitted 
                  ? isCorrect 
                    ? 'border-[#059669] bg-[#F0FDF4]' 
                    : 'border-[#DC2626] bg-[#FEF2F2]' 
                  : isAnswered 
                    ? 'border-[var(--accent-signal)]/60'
                    : 'border-[var(--divider)]'
              }`}
            >
              {/* Question Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono text-xs font-bold ${
                    submitted
                      ? isCorrect
                        ? 'bg-[#059669] text-white'
                        : 'bg-[#DC2626] text-white'
                      : 'bg-[var(--accent-signal-subtle)] text-[var(--accent-signal)]'
                  }`}>
                    {qIndex + 1}
                  </span>
                  <span className="font-mono text-xs font-bold text-[var(--accent-signal)] uppercase">
                    {q.module} · 1 Mark
                  </span>
                </div>

                {submitted && (
                  <span className={`font-mono text-xs font-bold px-2.5 py-0.5 rounded-full ${
                    isCorrect ? 'bg-[#D1FAE5] text-[#065F46]' : 'bg-[#FEE2E2] text-[#991B1B]'
                  }`}>
                    {isCorrect ? '+1 Mark (CORRECT ✓)' : '0 Marks (INCORRECT ✗)'}
                  </span>
                )}
              </div>

              <h3 className="font-display text-base sm:text-lg font-bold text-[var(--text-primary)] mb-4 leading-snug">
                {q.question}
              </h3>

              {/* Options */}
              <div className="space-y-2.5">
                {q.options.map((opt, optIdx) => {
                  const isOptionChosen = userAnswer === optIdx;
                  const isActualCorrect = optIdx === q.correctIndex;
                  const isChosenWrong = isOptionChosen && !isActualCorrect;

                  let optClass = "bg-[var(--bg-primary)] border-[var(--divider)] text-[var(--text-secondary)] hover:border-[var(--accent-signal)]/60 hover:bg-[var(--bg-elevated)]";
                  if (submitted) {
                    if (isActualCorrect) {
                      optClass = "bg-[#ECFDF5] border-[#059669] text-[#065F46] font-semibold ring-2 ring-[#059669]/40 shadow-xs";
                    } else if (isChosenWrong) {
                      optClass = "bg-[#FEF2F2] border-[#DC2626] text-[#991B1B] font-semibold ring-2 ring-[#DC2626]/40 shadow-xs";
                    } else {
                      optClass = "bg-[var(--bg-primary)] border-[var(--divider)] text-[var(--text-muted)] opacity-60";
                    }
                  } else if (isOptionChosen) {
                    optClass = "bg-[var(--accent-signal-subtle)] border-[var(--accent-signal)] text-[var(--text-primary)] font-semibold shadow-xs";
                  }

                  return (
                    <button
                      key={optIdx}
                      type="button"
                      disabled={submitted}
                      onClick={() => handleSelectOption(q.id, optIdx)}
                      className={`w-full p-3.5 sm:p-4 rounded-xl border text-left font-body text-xs sm:text-sm transition-all flex items-start gap-3 cursor-pointer ${optClass}`}
                    >
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center font-mono text-[10px] shrink-0 mt-0.5 ${
                        submitted && isActualCorrect
                          ? 'border-[#059669] bg-[#059669] text-white'
                          : submitted && isChosenWrong
                            ? 'border-[#DC2626] bg-[#DC2626] text-white'
                            : isOptionChosen
                              ? 'border-[var(--accent-signal)] bg-[var(--accent-signal)] text-white'
                              : 'border-current'
                      }`}>
                        {String.fromCharCode(65 + optIdx)}
                      </div>
                      <span className="flex-1 leading-relaxed">{opt}</span>

                      {submitted && isActualCorrect && (
                        <span className="ml-2 inline-flex items-center gap-1 text-[#059669] font-mono text-xs font-bold shrink-0">
                          <CheckCircle2 className="w-4 h-4 text-[#059669]" />
                          <span>{isOptionChosen ? "Your Answer (Correct)" : "Correct Answer"}</span>
                        </span>
                      )}

                      {submitted && isChosenWrong && (
                        <span className="ml-2 inline-flex items-center gap-1 text-[#DC2626] font-mono text-xs font-bold shrink-0">
                          <XCircle className="w-4 h-4 text-[#DC2626]" />
                          <span>Your Answer (Incorrect)</span>
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* In-depth Technical Rationale & Explanation (Shown when submitted) */}
              {submitted && (
                <div className="mt-4 p-4 rounded-xl bg-white border border-[var(--divider)] text-xs text-[var(--text-secondary)] font-body shadow-2xs">
                  <div className="flex items-center gap-1.5 text-[var(--accent-signal)] font-mono font-bold mb-1">
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>Technical Rationale & Explanation:</span>
                  </div>
                  <p className="leading-relaxed text-[var(--text-primary)]">
                    {q.explanation}
                  </p>
                </div>
              )}

            </div>
          );
        })}
      </div>

      {/* Submit Button Bar */}
      {!submitted ? (
        <div className="p-6 rounded-2xl bg-[var(--bg-elevated)] border border-[var(--divider)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="font-mono text-xs text-[var(--text-muted)]">
            Answered: <strong>{Object.keys(selectedAnswers).length}</strong> of <strong>{questions.length}</strong> questions
          </div>

          <button
            type="button"
            disabled={Object.keys(selectedAnswers).length === 0}
            onClick={() => {
              setSubmitted(true);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[var(--accent-signal)] text-white font-display text-sm font-bold shadow-brand hover:bg-[var(--accent-signal-deep)] disabled:opacity-50 transition-all focus-visible:ring-2 focus-visible:ring-[var(--border-focus)]"
          >
            Submit Assessment for Grading (30 Questions)
          </button>
        </div>
      ) : (
        <div className="flex justify-center">
          <button
            type="button"
            onClick={onNavigateHome}
            className="px-8 py-3.5 rounded-full bg-[var(--accent-signal)] text-white font-display text-sm font-bold shadow-brand hover:bg-[var(--accent-signal-deep)] transition-all"
          >
            Return to Course Homepage
          </button>
        </div>
      )}

    </div>
  );
}
