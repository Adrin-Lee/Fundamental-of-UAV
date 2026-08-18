import React, { useState, useEffect, useRef } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  Award, 
  RotateCcw, 
  Check, 
  AlertTriangle, 
  HelpCircle, 
  ArrowRight,
  Sparkles,
  Info,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { moduleAssessmentsData } from '../data/moduleAssessmentsData';

export default function ModuleAssessmentCard({ 
  moduleId, 
  onModuleCompleted, 
  onNavigateNext,
  nextModuleTitle 
}) {
  const assessment = moduleAssessmentsData[moduleId];
  const resultRef = useRef(null);

  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [showUnansweredWarning, setShowUnansweredWarning] = useState(false);

  if (!assessment) {
    return null;
  }

  const questions = assessment.questions;
  const answeredCount = Object.keys(selectedAnswers).length;
  const allAnswered = answeredCount === questions.length;

  const handleSelectOption = (questionId, optionIndex) => {
    if (submitted) return; // Locked once submitted until retake
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex
    }));
    setShowUnansweredWarning(false);
  };

  const calculateScore = () => {
    let correctCount = 0;
    questions.forEach(q => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        correctCount += 1;
      }
    });
    return correctCount;
  };

  const score = calculateScore();
  const percentage = Math.round((score / questions.length) * 100);
  const passed = percentage >= assessment.passThreshold;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!allAnswered) {
      setShowUnansweredWarning(true);
      return;
    }
    setSubmitted(true);
    setShowUnansweredWarning(false);

    // If passed (>=80%), automatically persist and trigger completion
    if (passed) {
      try {
        if (moduleId === 'mod-types-of-drones' || moduleId === 'mod-drone-types') {
          localStorage.setItem('asteria_module_mod-types-of-drones', 'completed');
          localStorage.setItem('asteria_module_mod-drone-types', 'completed');
        } else {
          localStorage.setItem(`asteria_module_${moduleId}`, 'completed');
        }
      } catch (err) {
        console.warn('Unable to persist module completion to localStorage', err);
      }

      if (onModuleCompleted) {
        onModuleCompleted(true);
      }
    }

    // Scroll to results banner smoothly
    setTimeout(() => {
      if (resultRef.current) {
        resultRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
  };

  const handleRetake = () => {
    setSelectedAnswers({});
    setSubmitted(false);
    setShowUnansweredWarning(false);
  };

  return (
    <section id="section-assessment" className="pt-12 border-t border-[var(--divider)] mb-16 scroll-mt-28">
      
      {/* Assessment Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-6 mb-8 border-b border-[var(--divider)] gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-2 rounded-full bg-[var(--accent-signal-subtle)] border border-[#BFDBFE]">
            <Award className="w-3.5 h-3.5 text-[var(--accent-signal)]" />
            <span className="font-display text-[10px] sm:text-xs font-bold tracking-[0.08em] uppercase text-[var(--accent-signal)]">
              MODULE {assessment.moduleNumber} · KNOWLEDGE ASSESSMENT
            </span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[var(--text-primary)]">
            Module {assessment.moduleNumber} Mastery Assessment
          </h2>
          <p className="font-body text-xs sm:text-sm text-[var(--text-muted)] mt-1 max-w-2xl leading-relaxed">
            Test your comprehension with 10 questions (4 core concepts + 6 tricky technical scenarios). You must score at least <strong>80% (8/10)</strong> to successfully pass and mark this module as completed.
          </p>
        </div>

        {/* Passing Threshold Badge */}
        <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[var(--bg-elevated)] border border-[var(--divider)] shadow-2xs shrink-0 self-start sm:self-auto">
          <ShieldCheck className="w-4 h-4 text-[var(--accent-signal)]" />
          <span className="font-mono text-xs font-semibold text-[var(--text-secondary)]">
            Passing Score: <strong className="text-[var(--text-primary)]">80% (8/10)</strong>
          </span>
        </div>
      </div>

      {/* Result Certificate / Review Banner (Displayed When Submitted) */}
      {submitted && (
        <div 
          ref={resultRef}
          className={`mb-8 p-6 sm:p-8 rounded-2xl border transition-all animate-fadeIn ${
            passed 
              ? 'bg-[#ECFDF5] border-[#A7F3D0] text-[#065F46]' 
              : 'bg-[#FEF2F2] border-[#FECACA] text-[#991B1B]'
          }`}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 mb-5 border-b border-current/20">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
                passed ? 'bg-[#059669] text-white shadow-brand' : 'bg-[#DC2626] text-white'
              }`}>
                {passed ? <Award className="w-7 h-7" /> : <AlertTriangle className="w-7 h-7" />}
              </div>
              <div>
                <span className="font-mono text-[11px] font-bold uppercase tracking-wider block opacity-90">
                  {passed ? 'Assessment Status: PASSED ✓' : 'Assessment Status: NEEDS REVIEW'}
                </span>
                <h3 className="font-display text-2xl font-bold">
                  Score: {score} / {questions.length} ({percentage}%)
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-2.5 self-start sm:self-auto">
              <button
                type="button"
                onClick={handleRetake}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-current text-current font-mono text-xs font-bold shadow-2xs hover:bg-white/80 transition-all"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Retake Quiz</span>
              </button>

              {passed && onNavigateNext && nextModuleTitle && (
                <button
                  type="button"
                  onClick={onNavigateNext}
                  className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-[#059669] text-white font-display text-xs font-bold shadow-brand hover:bg-[#047857] transition-all"
                >
                  <span>Next: {nextModuleTitle}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          <p className="font-body text-xs sm:text-sm leading-relaxed">
            {passed 
              ? `Outstanding work! You have successfully mastered Module ${assessment.moduleNumber} by scoring ${percentage}%. Review the verified answers and technical rationales below.` 
              : `You scored ${percentage}%, which is below the 80% passing threshold (at least 8/10 correct answers required). Review the correct answers and detailed explanations below, then retake the assessment to complete this module.`}
          </p>
        </div>
      )}

      {/* Progress & Answered Status Bar */}
      {!submitted && (
        <div className="flex items-center justify-between p-3.5 mb-6 rounded-xl bg-[var(--bg-elevated)] border border-[var(--divider)] text-xs font-mono text-[var(--text-muted)]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[var(--accent-signal)]" />
            <span>Progress: <strong className="text-[var(--text-primary)]">{answeredCount} of {questions.length}</strong> questions answered</span>
          </div>
          <span className="text-[11px] font-semibold text-[var(--accent-signal)]">
            {allAnswered ? 'Ready to submit!' : `${questions.length - answeredCount} remaining`}
          </span>
        </div>
      )}

      {/* Questions Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {questions.map((q, qIndex) => {
          const userChoice = selectedAnswers[q.id];
          const isAnswered = userChoice !== undefined;
          const isCorrect = isAnswered && userChoice === q.correctIndex;
          const isTricky = q.type === 'tricky';

          return (
            <div 
              key={q.id}
              className={`p-5 sm:p-6 rounded-2xl bg-[var(--bg-elevated)] border transition-all ${
                submitted 
                  ? isCorrect 
                    ? 'border-[#A7F3D0] bg-[#F0FDF4]/60' 
                    : 'border-[#FECACA] bg-[#FEF2F2]/60' 
                  : 'border-[var(--divider)] hover:border-[#CBD5E1]'
              }`}
            >
              
              {/* Question Header & Badge */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-[var(--accent-signal)] px-2 py-0.5 rounded bg-[var(--bg-primary)] border border-[var(--divider)]">
                    Q{qIndex + 1}
                  </span>
                  <span className={`font-mono text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                    isTricky 
                      ? 'bg-[#FEF3C7] text-[#92400E] border-[#FDE68A]' 
                      : 'bg-[#EFF6FF] text-[#1D4ED8] border-[#BFDBFE]'
                  }`}>
                    {q.difficulty}
                  </span>
                </div>

                {submitted && (
                  <div className="flex items-center gap-1 shrink-0">
                    {isCorrect ? (
                      <span className="inline-flex items-center gap-1 font-mono text-xs font-bold text-[#059669]">
                        <CheckCircle2 className="w-4 h-4 text-[#059669]" />
                        <span>Correct (+1)</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 font-mono text-xs font-bold text-[#DC2626]">
                        <XCircle className="w-4 h-4 text-[#DC2626]" />
                        <span>Incorrect</span>
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Question Text */}
              <h4 className="font-display text-sm sm:text-base font-semibold text-[var(--text-primary)] mb-4 leading-snug">
                {q.question}
              </h4>

              {/* Options List */}
              <div className="space-y-2.5 mb-2">
                {q.options.map((opt, optIndex) => {
                  const isSelected = userChoice === optIndex;
                  const isThisOptionCorrect = optIndex === q.correctIndex;

                  let optionStyle = "border-[var(--divider)] bg-[var(--bg-primary)] hover:border-[var(--accent-signal)] text-[var(--text-secondary)]";

                  if (submitted) {
                    if (isThisOptionCorrect) {
                      optionStyle = "border-[#059669] bg-[#ECFDF5] text-[#065F46] font-semibold ring-1 ring-[#059669]";
                    } else if (isSelected && !isThisOptionCorrect) {
                      optionStyle = "border-[#DC2626] bg-[#FEF2F2] text-[#991B1B] line-through";
                    } else {
                      optionStyle = "border-[var(--divider)] bg-[var(--bg-primary)]/50 text-[var(--text-muted)] opacity-60";
                    }
                  } else if (isSelected) {
                    optionStyle = "border-[var(--accent-signal)] bg-[var(--accent-signal-subtle)] text-[var(--accent-signal)] font-semibold ring-1 ring-[var(--accent-signal)]";
                  }

                  return (
                    <label
                      key={optIndex}
                      className={`flex items-start gap-3 p-3 sm:p-3.5 rounded-xl border transition-all cursor-pointer text-xs sm:text-sm ${optionStyle} ${
                        submitted ? 'cursor-default' : ''
                      }`}
                    >
                      <input 
                        type="radio" 
                        name={`module-${moduleId}-q-${q.id}`} 
                        value={optIndex}
                        checked={isSelected}
                        onChange={() => handleSelectOption(q.id, optIndex)}
                        disabled={submitted}
                        className="mt-0.5 text-[var(--accent-signal)] focus:ring-[var(--accent-signal)] cursor-pointer"
                      />
                      <span className="flex-1 leading-relaxed">{opt}</span>

                      {submitted && isThisOptionCorrect && (
                        <Check className="w-4 h-4 text-[#059669] shrink-0 mt-0.5" />
                      )}
                    </label>
                  );
                })}
              </div>

              {/* Detailed Technical Explanation (Shown After Submission) */}
              {submitted && (
                <div className="mt-4 p-3.5 sm:p-4 rounded-xl bg-[var(--bg-primary)] border border-[var(--divider)] text-xs font-body leading-relaxed flex items-start gap-2.5">
                  <Info className="w-4 h-4 text-[var(--accent-signal)] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[var(--accent-signal)] block mb-1">
                      Technical Explanation & Rationale
                    </span>
                    <p className="text-[var(--text-secondary)]">
                      {q.explanation}
                    </p>
                  </div>
                </div>
              )}

            </div>
          );
        })}

        {/* Warning if trying to submit with incomplete answers */}
        {showUnansweredWarning && !submitted && (
          <div className="p-4 rounded-xl bg-[#FEF2F2] border border-[#FECACA] text-[#991B1B] text-xs font-mono flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>Please answer all 10 questions before submitting ({questions.length - answeredCount} questions remaining).</span>
          </div>
        )}

        {/* Submit & Action Buttons */}
        {!submitted ? (
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="font-mono text-xs text-[var(--text-muted)]">
              <span>Passing requirement: <strong>8 / 10 (80%)</strong></span>
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full text-sm font-semibold font-body text-white bg-[var(--accent-signal)] hover:bg-[var(--accent-signal-deep)] active:scale-[0.98] transition-all shadow-brand focus-visible:ring-2 focus-visible:ring-[var(--border-focus)]"
            >
              <span>Submit Module {assessment.moduleNumber} Assessment</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              type="button"
              onClick={handleRetake}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full text-xs font-semibold font-body text-[var(--accent-signal)] bg-[var(--bg-primary)] hover:bg-[var(--bg-elevated)] border border-[var(--accent-signal)] transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retake Assessment</span>
            </button>

            {passed && onNavigateNext && nextModuleTitle && (
              <button
                type="button"
                onClick={onNavigateNext}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full text-sm font-semibold font-body text-white bg-[#059669] hover:bg-[#047857] shadow-brand transition-all"
              >
                <span>Continue to Next: {nextModuleTitle}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        )}

      </form>
    </section>
  );
}
