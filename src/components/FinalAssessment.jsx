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
  ExternalLink
} from 'lucide-react';

export default function FinalAssessment({ onNavigateHome, onRetake }) {
  const questions = [
    {
      id: 1,
      module: "Module 1: Terminology",
      question: "What does the acronym 'UAS' stand for in contrast to 'UAV'?",
      options: [
        "Unmanned Aviation Software",
        "Unmanned Aircraft System (includes UAV, GCS, and datalink)",
        "Unified Aerial Structure",
        "Universal Airspace Shield"
      ],
      correctIndex: 1,
      explanation: "UAS (Unmanned Aircraft System) refers to the complete system, including the UAV aircraft, ground control station (GCS), datalink, and supporting equipment."
    },
    {
      id: 2,
      module: "Module 2: Types of Drones",
      question: "Which quadcopter configuration provides an unobstructed forward camera view and is most widely used in modern commercial drones?",
      options: [
        "+ (Plus) Frame configuration",
        "T-Frame configuration",
        "X-Frame configuration",
        "Coaxial Y-Frame configuration"
      ],
      correctIndex: 2,
      explanation: "The X-frame configuration mounts motors at a 45° angle off the centerline, providing a clear unobstructed field of view for forward payloads and cameras."
    },
    {
      id: 3,
      module: "Module 3: Drone Components",
      question: "What is the primary function of an Electronic Speed Controller (ESC)?",
      options: [
        "Measures barometric air pressure for altitude calculation",
        "Regulates the rotational speed and power delivery of each brushless motor based on flight controller commands",
        "Transmits telemetry data to the ground station",
        "Maintains GPS satellite lock"
      ],
      correctIndex: 1,
      explanation: "The ESC converts DC battery power into 3-phase AC pulses to regulate the RPM of each BLDC motor based on flight controller signals."
    },
    {
      id: 4,
      module: "Module 3: Batteries",
      question: "What is the total nominal voltage and capacity of a 6S2P battery pack made from 3.7V 8000mAh cells?",
      options: [
        "11.1V and 8000mAh",
        "22.2V and 16000mAh",
        "44.4V and 8000mAh",
        "22.2V and 8000mAh"
      ],
      correctIndex: 1,
      explanation: "In 6S2P: Voltage = 6 × 3.7V = 22.2V; Capacity = 2 × 8000mAh = 16000mAh."
    },
    {
      id: 5,
      module: "Module 4: FC & Sensors",
      question: "Which sensor onboard the flight controller is primarily responsible for measuring atmospheric air pressure to estimate altitude?",
      options: [
        "Magnetometer",
        "Barometer",
        "Gyroscope",
        "Accelerometer"
      ],
      correctIndex: 1,
      explanation: "The Barometer measures ambient air pressure changes to calculate height above ground and maintain steady altitude hold."
    },
    {
      id: 6,
      module: "Module 4: Sensor Fusion",
      question: "If the flight controller loses its Magnetometer (digital compass) feed, which autopilot capability is degraded first?",
      options: [
        "Flight Stabilization (Attitude leveling)",
        "Heading Hold and True North yaw alignment",
        "Barometric Altitude Hold",
        "ESC motor commutation"
      ],
      correctIndex: 1,
      explanation: "The Magnetometer measures Earth's magnetic flux for heading lock; losing it causes yaw drift risk while basic leveling remains on IMU."
    },
    {
      id: 7,
      module: "Module 5: Flight Forces",
      question: "When a multirotor drone is climbing vertically at an accelerating rate, what is the relationship between Lift and Weight?",
      options: [
        "Lift = Weight",
        "Lift < Weight",
        "Lift > Weight",
        "Thrust < Drag"
      ],
      correctIndex: 2,
      explanation: "When Lift exceeds Weight (Lift > Weight), a net upward force is produced causing the drone to accelerate upward."
    },
    {
      id: 8,
      module: "Module 5: Fixed-Wing Forces",
      question: "How do fixed-wing UAVs generate aerodynamic lift compared to multirotors?",
      options: [
        "By pushing air straight downward with vertical rotors",
        "Through forward motion creating an airfoil pressure differential over and under the wings",
        "By magnetic repulsion from the earth's field",
        "By ballast gas expansion"
      ],
      correctIndex: 1,
      explanation: "Fixed-wing drones generate lift as forward thrust moves air over airfoil wings, creating lower pressure on top and upward lift."
    },
    {
      id: 9,
      module: "Module 6: Flight Modes",
      question: "Which flight mode automatically maintains 3D GPS position and altitude while actively compensating for wind disturbances?",
      options: [
        "Manual Mode",
        "Alt Hold Mode",
        "Loiter Mode",
        "Acro Mode"
      ],
      correctIndex: 2,
      explanation: "Loiter Mode combines GPS, barometer, and IMU feedback to hold fixed 3D coordinates and automatically resist wind drift."
    },
    {
      id: 10,
      module: "Module 6: Flight Modes",
      question: "What action does a UAV execute when Return-to-Launch (RTL) mode is triggered?",
      options: [
        "Lands immediately at its current instantaneous position",
        "Climbs to safe clearance altitude, navigates autonomously to the takeoff Home point, and lands",
        "Cuts all motors immediately",
        "Circles indefinitely at the highest waypoint"
      ],
      correctIndex: 1,
      explanation: "RTL climbs to a configured safety altitude, transits directly back to the georeferenced Home coordinate, and executes automated landing."
    },
    {
      id: 11,
      module: "Module 7: Attitude Kinematics",
      question: "To produce a roll to the right on a quadcopter, how must the flight controller adjust motor speeds?",
      options: [
        "Increase right motors and decrease left motors",
        "Increase left motors and decrease right motors",
        "Increase front motors and decrease rear motors",
        "Increase all motors equally"
      ],
      correctIndex: 1,
      explanation: "Increasing thrust on the left motors while decreasing thrust on the right motors creates a lateral torque that tilts the drone to the right."
    },
    {
      id: 12,
      module: "Module 8: DGCA Regulations",
      question: "In India's DGCA Green Zone, what is the maximum permissible flight altitude when operating between 8 km and 12 km from an operational airport?",
      options: [
        "120 meters (400 ft AGL)",
        "60 meters (200 ft AGL)",
        "0 meters (Flight prohibited)",
        "200 meters (650 ft AGL)"
      ],
      correctIndex: 1,
      explanation: "Under DGCA Drone Rules 2021, Green Zone airspace between 8–12 km from an operational airport has a reduced height ceiling of 60 meters (200 ft AGL)."
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
            The Final Certification Assessment is unlocked only after completing the course modules sequentially and marking Module 8 (DGCA Regulations) as complete.
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
            FINAL COMPREHENSIVE CERTIFICATION EXAM
          </span>
        </div>

        <h1 className="font-display text-3xl sm:text-4xl font-bold text-[var(--text-primary)]">
          Drone Fundamentals Final Certification Assessment
        </h1>
        <p className="font-body text-sm sm:text-base text-[var(--text-muted)] mt-1.5 leading-relaxed">
          Comprehensive 12-question certification exam evaluating your knowledge across all 8 modules (Lift, Hardware, Navigation, Kinematics, and DGCA Regulations). Passing grade is 75% (9/12).
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
                  Score: {score} / {questions.length} ({percentage}%)
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
              : "You did not achieve the 75% passing threshold this time. Review the detailed explanations below and re-study the relevant modules to reinforce your understanding."}
          </p>
        </div>
      )}

      {/* Questions List */}
      <div className="space-y-6 mb-10">
        {questions.map((q, qIndex) => {
          const userAnswer = selectedAnswers[q.id];
          const isAnswered = userAnswer !== undefined;
          const isCorrect = isAnswered && userAnswer === q.correctIndex;

          return (
            <div 
              key={q.id}
              className={`p-6 rounded-2xl bg-[var(--bg-elevated)] border transition-all ${
                submitted 
                  ? isCorrect 
                    ? 'border-[#A7F3D0] bg-[#F0FDF4]' 
                    : 'border-[#FECACA] bg-[#FEF2F2]' 
                  : 'border-[var(--divider)]'
              }`}
            >
              {/* Question Header */}
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-xs font-bold text-[var(--accent-signal)] uppercase">
                  Question {qIndex + 1} of {questions.length} · {q.module}
                </span>
                {submitted && (
                  <span className={`font-mono text-xs font-bold px-2.5 py-0.5 rounded-full ${
                    isCorrect ? 'bg-[#D1FAE5] text-[#065F46]' : 'bg-[#FEE2E2] text-[#991B1B]'
                  }`}>
                    {isCorrect ? 'CORRECT ✓' : 'INCORRECT ✗'}
                  </span>
                )}
              </div>

              <h3 className="font-display text-base sm:text-lg font-bold text-[var(--text-primary)] mb-4">
                {q.question}
              </h3>

              {/* Options */}
              <div className="space-y-2.5">
                {q.options.map((opt, optIdx) => {
                  const isSelected = userAnswer === optIdx;
                  const isThisCorrect = optIdx === q.correctIndex;

                  let optClass = "bg-[var(--bg-primary)] border-[var(--divider)] text-[var(--text-secondary)] hover:border-[var(--accent-signal)]";
                  if (isSelected && !submitted) {
                    optClass = "bg-[var(--accent-signal-subtle)] border-[var(--accent-signal)] text-[var(--accent-signal-deep)] font-semibold shadow-2xs";
                  } else if (submitted) {
                    if (isThisCorrect) {
                      optClass = "bg-[#ECFDF5] border-[#059669] text-[#065F46] font-bold";
                    } else if (isSelected && !isThisCorrect) {
                      optClass = "bg-[#FEE2E2] border-[#DC2626] text-[#991B1B] font-semibold";
                    } else {
                      optClass = "bg-white/50 border-[#E2E8F0] opacity-60";
                    }
                  }

                  return (
                    <button
                      key={optIdx}
                      type="button"
                      disabled={submitted}
                      onClick={() => handleSelectOption(q.id, optIdx)}
                      className={`w-full p-3.5 rounded-xl border text-left font-body text-xs sm:text-sm transition-all flex items-start gap-3 ${optClass}`}
                    >
                      <div className="w-5 h-5 rounded-full border border-current flex items-center justify-center font-mono text-[10px] shrink-0 mt-0.5">
                        {String.fromCharCode(65 + optIdx)}
                      </div>
                      <span className="flex-1">{opt}</span>
                    </button>
                  );
                })}
              </div>

              {/* Explanation (Shown when submitted) */}
              {submitted && (
                <div className="mt-4 pt-3 border-t border-current/20 font-body text-xs text-[var(--text-secondary)] leading-relaxed">
                  <span className="font-bold text-[var(--text-primary)] block mb-1">
                    Explanation:
                  </span>
                  {q.explanation}
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
            Answered: {Object.keys(selectedAnswers).length} of {questions.length} questions
          </div>

          <button
            type="button"
            disabled={Object.keys(selectedAnswers).length === 0}
            onClick={() => {
              setSubmitted(true);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[var(--accent-signal)] text-white font-display text-sm font-bold shadow-brand hover:bg-[var(--accent-signal-deep)] disabled:opacity-50 transition-all"
          >
            Submit Assessment for Grading
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
