import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  RotateCcw, 
  Award, 
  ShieldCheck, 
  HelpCircle,
  BookOpen,
  ChevronRight
} from 'lucide-react';
import { moduleAssessmentsData } from '../data/moduleAssessmentsData';
import { modulesData } from '../data/curriculumData';

export default function ModuleAssessmentView({ 
  moduleId, 
  onNavigateBackToModule, 
  onNavigateNextModule, 
  onNavigateCurriculum 
}) {
  const assessment = moduleAssessmentsData[moduleId] || moduleAssessmentsData["mod-intro-terminology"];
  const moduleInfo = modulesData[moduleId] || {};
  const questions = assessment.questions || [];

  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const [passed, setPassed] = useState(false);
  const [showUnansweredWarning, setShowUnansweredWarning] = useState(false);
  
  const resultsTopRef = useRef(null);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [moduleId]);

  // Handle radio selection
  const handleSelectOption = (questionId, optionIndex) => {
    if (submitted) return; // Freeze once submitted
    setAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex
    }));
    setShowUnansweredWarning(false);
  };

  // Submit assessment
  const handleSubmit = (e) => {
    e.preventDefault();
    const answeredCount = Object.keys(answers).length;
    if (answeredCount < questions.length) {
      setShowUnansweredWarning(true);
      return;
    }

    let calculatedScore = 0;
    questions.forEach((q) => {
      if (answers[q.id] === q.correctIndex) {
        calculatedScore += 1;
      }
    });

    const calculatedPercentage = Math.round((calculatedScore / questions.length) * 100);

    setScore(calculatedScore);
    setPercentage(calculatedPercentage);
    setSubmitted(true);

    // Automatically mark module completed upon submission
    try {
      localStorage.setItem(`asteria_module_${moduleId}`, 'completed');
      if (moduleId === 'mod-drone-types' || moduleId === 'mod-types-of-drones') {
        localStorage.setItem('asteria_module_mod-drone-types', 'completed');
        localStorage.setItem('asteria_module_mod-types-of-drones', 'completed');
      }
    } catch (err) {
      console.warn('Could not persist assessment completion', err);
    }

    setTimeout(() => {
      if (resultsTopRef.current) {
        resultsTopRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 100);
  };

  // Retake quiz
  const handleRetake = () => {
    setAnswers({});
    setSubmitted(false);
    setScore(0);
    setPercentage(0);
    setShowUnansweredWarning(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const answeredCount = Object.keys(answers).length;

  return (
    <article className="min-h-screen bg-[var(--bg-primary)] py-8 sm:py-12 border-b border-[var(--divider)]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ================= 1. BREADCRUMB & BACK NAVIGATION ================= */}
        <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-2 text-xs font-mono text-[var(--text-muted)]">
          <button 
            type="button"
            onClick={onNavigateCurriculum}
            className="hover:text-[var(--accent-signal)] transition-colors flex items-center gap-1 focus-visible:ring-2 focus-visible:ring-[var(--border-focus)] rounded-md"
          >
            <span>Curriculum</span>
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-[var(--divider)]" />
          <button 
            type="button"
            onClick={onNavigateBackToModule}
            className="hover:text-[var(--accent-signal)] transition-colors flex items-center gap-1 text-[var(--text-secondary)] font-semibold focus-visible:ring-2 focus-visible:ring-[var(--border-focus)] rounded-md"
          >
            <span>Module {assessment.moduleNumber}: {assessment.moduleTitle}</span>
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-[var(--divider)]" />
          <span className="text-[var(--accent-signal)] font-bold">Knowledge Assessment</span>
        </nav>

        {/* Back to Module Study Action Bar */}
        <div className="mb-8 flex items-center justify-between">
          <button
            type="button"
            onClick={onNavigateBackToModule}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[var(--bg-elevated)] border border-[var(--divider)] text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--accent-signal)] hover:border-[var(--accent-signal)] transition-all shadow-xs"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Module Study Material</span>
          </button>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--accent-signal-subtle)] text-[var(--accent-signal)] text-xs font-mono font-bold border border-[#BFDBFE]">
            <Award className="w-4 h-4" />
            <span>Assessment: 10 Questions</span>
          </div>
        </div>

        <div ref={resultsTopRef} />

        {/* ================= 2. ASSESSMENT HEADER CARD ================= */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[var(--bg-elevated)] border border-[var(--divider)] shadow-xs mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-3 rounded-full bg-[var(--accent-signal-subtle)] border border-[#BFDBFE]">
            <Award className="w-3.5 h-3.5 text-[var(--accent-signal)]" />
            <span className="font-display text-[10px] sm:text-xs font-bold tracking-[0.08em] uppercase text-[var(--accent-signal)]">
              MODULE {assessment.moduleNumber} · KNOWLEDGE ASSESSMENT & REVIEW
            </span>
          </div>
          <h1 className="font-display text-2xl sm:text-4xl font-bold tracking-tight text-[var(--text-primary)]">
            {assessment.moduleTitle} Assessment
          </h1>
          <p className="font-body text-xs sm:text-sm text-[var(--text-muted)] mt-2 leading-relaxed max-w-2xl">
            Answer all 10 questions (4 core definitions + 6 applied scenario questions). Submit to review correct answers, check any missed questions, and proceed to the next module.
          </p>

          {/* Answer Progress Tracker */}
          {!submitted && (
            <div className="mt-6 pt-5 border-t border-[var(--divider)] flex items-center justify-between">
              <span className="font-mono text-xs font-semibold text-[var(--text-secondary)]">
                Progress: <strong className="text-[var(--accent-signal)]">{answeredCount} of {questions.length}</strong> questions answered
              </span>
              <div className="w-36 sm:w-48 bg-[var(--bg-primary)] h-2.5 rounded-full overflow-hidden border border-[var(--divider)]">
                <div 
                  className="h-full bg-[var(--accent-signal)] transition-all duration-300 rounded-full"
                  style={{ width: `${(answeredCount / questions.length) * 100}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* ================= 3. RESULTS BANNER (DISPLAYED AFTER SUBMISSION) ================= */}
        {submitted && (
          <div 
            className="mb-10 p-6 sm:p-8 rounded-2xl border transition-all animate-fade-in shadow-md bg-[var(--bg-elevated)] border-[var(--divider)]"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 mb-6 border-b border-[var(--divider)]">
              <div className="flex items-start sm:items-center gap-4">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-brand bg-[#059669] text-white">
                  <Award className="w-8 h-8" />
                </div>
                <div>
                  <span className="font-mono text-xs font-bold uppercase tracking-wider block text-[#059669]">
                    ASSESSMENT SUBMITTED & MODULE COMPLETED ✓
                  </span>
                  <h2 className="font-display text-3xl font-bold mt-0.5 text-[var(--text-primary)]">
                    Score: {score} / {questions.length} ({percentage}%)
                  </h2>
                  <p className="font-body text-xs sm:text-sm mt-1 text-[var(--text-secondary)]">
                    Review your answers below. Correct answers are highlighted in <span className="font-bold text-[#059669]">green</span>, and any incorrect choices in <span className="font-bold text-[#DC2626]">red</span>. You can now proceed directly to the next module.
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={handleRetake}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[var(--bg-primary)] border border-[var(--divider)] hover:border-[var(--accent-signal)] text-[var(--text-secondary)] hover:text-[var(--accent-signal)] font-mono text-xs font-bold shadow-2xs transition-all"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Retake Assessment</span>
                </button>

                {onNavigateNextModule && (
                  <button
                    type="button"
                    onClick={onNavigateNextModule}
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#059669] text-white font-display text-sm font-bold shadow-brand hover:bg-[#047857] transition-all"
                  >
                    <span>Proceed to Next Module</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            <div className="font-mono text-xs text-[var(--text-muted)] flex items-center justify-between">
              <span>Module Completed · Ready for Next Track</span>
              <span>Module ID: {moduleId}</span>
            </div>
          </div>
        )}

        {/* ================= 4. QUESTIONS LIST ================= */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {questions.map((q, qIndex) => {
            const isOptionSelected = answers[q.id] !== undefined;
            const selectedOpt = answers[q.id];
            const isCorrect = submitted && selectedOpt === q.correctIndex;
            const isWrong = submitted && selectedOpt !== q.correctIndex;

            return (
              <div 
                key={q.id}
                className={`p-6 sm:p-7 rounded-2xl bg-[var(--bg-elevated)] border transition-all shadow-xs ${
                  submitted 
                    ? isCorrect 
                      ? 'border-[#059669] bg-[#F0FDF4]' 
                      : 'border-[#DC2626] bg-[#FEF2F2]'
                    : isOptionSelected
                      ? 'border-[var(--accent-signal)]/60'
                      : 'border-[var(--divider)]'
                }`}
              >
                {/* Question Header & Type Tag */}
                <div className="flex items-center justify-between gap-2 mb-3">
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
                    <span className={`font-mono text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${
                      q.type === 'tricky'
                        ? 'bg-[#FEF3C7] text-[#92400E] border-[#FDE68A]'
                        : 'bg-[var(--bg-primary)] text-[var(--text-secondary)] border-[var(--divider)]'
                    }`}>
                      {q.difficulty || (q.type === 'tricky' ? 'Scenario / Tricky' : 'Core Concept')}
                    </span>
                  </div>

                  {/* Submission Status Indicator */}
                  {submitted && (
                    <div className="flex items-center gap-1.5">
                      {isCorrect ? (
                        <span className="inline-flex items-center gap-1 font-mono text-xs font-bold text-[#059669]">
                          <CheckCircle className="w-4 h-4" />
                          <span>+1 Correct</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 font-mono text-xs font-bold text-[#DC2626]">
                          <XCircle className="w-4 h-4" />
                          <span>Incorrect</span>
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Question Text */}
                <h3 className="font-display text-base sm:text-lg font-bold text-[var(--text-primary)] mb-4 leading-snug">
                  {q.question}
                </h3>

                {/* 4 Multiple Choice Options */}
                <div className="space-y-2.5">
                  {q.options.map((opt, optIndex) => {
                    const isOptionChosen = selectedOpt === optIndex;
                    const isActualCorrect = optIndex === q.correctIndex;
                    const isChosenWrong = isOptionChosen && !isActualCorrect;

                    let optionClass = "bg-[var(--bg-primary)] border-[var(--divider)] text-[var(--text-secondary)] hover:border-[var(--accent-signal)]/60 hover:bg-[var(--bg-elevated)]";

                    if (submitted) {
                      if (isActualCorrect) {
                        // Correct answer in GREEN
                        optionClass = "bg-[#ECFDF5] border-[#059669] text-[#065F46] font-semibold ring-2 ring-[#059669]/40 shadow-xs";
                      } else if (isChosenWrong) {
                        // User marked wrong answer in RED
                        optionClass = "bg-[#FEF2F2] border-[#DC2626] text-[#991B1B] font-semibold ring-2 ring-[#DC2626]/40 shadow-xs";
                      } else {
                        optionClass = "bg-[var(--bg-primary)] border-[var(--divider)] text-[var(--text-muted)] opacity-60";
                      }
                    } else if (isOptionChosen) {
                      optionClass = "bg-[var(--accent-signal-subtle)] border-[var(--accent-signal)] text-[var(--text-primary)] font-semibold shadow-xs";
                    }

                    return (
                      <label 
                        key={optIndex}
                        onClick={() => handleSelectOption(q.id, optIndex)}
                        className={`flex items-start gap-3 p-3.5 sm:p-4 rounded-xl border font-body text-xs sm:text-sm cursor-pointer transition-all ${optionClass}`}
                      >
                        <input
                          type="radio"
                          name={`question-${q.id}`}
                          value={optIndex}
                          checked={isOptionChosen}
                          disabled={submitted}
                          onChange={() => handleSelectOption(q.id, optIndex)}
                          className="mt-0.5 text-[var(--accent-signal)] focus:ring-[var(--accent-signal)] shrink-0"
                        />
                        <div className="flex-1 leading-relaxed">
                          <span className="font-mono text-xs font-bold mr-1.5 opacity-70">
                            {String.fromCharCode(65 + optIndex)}.
                          </span>
                          <span>{opt}</span>
                        </div>

                        {submitted && isActualCorrect && (
                          <span className="ml-2 inline-flex items-center gap-1 text-[#059669] font-mono text-xs font-bold shrink-0">
                            <CheckCircle className="w-4 h-4 text-[#059669]" />
                            <span>{isOptionChosen ? "Your Answer (Correct)" : "Correct Answer"}</span>
                          </span>
                        )}

                        {submitted && isChosenWrong && (
                          <span className="ml-2 inline-flex items-center gap-1 text-[#DC2626] font-mono text-xs font-bold shrink-0">
                            <XCircle className="w-4 h-4 text-[#DC2626]" />
                            <span>Your Answer (Incorrect)</span>
                          </span>
                        )}
                      </label>
                    );
                  })}
                </div>

                {/* In-depth Technical Rationale & Explanation (Shown on submit) */}
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

          {/* Unanswered Questions Warning Banner */}
          {showUnansweredWarning && !submitted && (
            <div className="p-4 rounded-xl bg-[#FEF2F2] border border-[#FECACA] text-[#991B1B] text-xs font-body flex items-center gap-2.5 animate-shake">
              <AlertTriangle className="w-4 h-4 shrink-0 text-[#DC2626]" />
              <span>
                Please answer all <strong>{questions.length} questions</strong> before submitting. Currently answered: <strong>{answeredCount}/{questions.length}</strong>.
              </span>
            </div>
          )}

          {/* Bottom Submission Action Bar */}
          {!submitted ? (
            <div className="pt-6 border-t border-[var(--divider)] flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                type="button"
                onClick={onNavigateBackToModule}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full text-xs font-semibold font-body text-[var(--text-secondary)] bg-[var(--bg-elevated)] border border-[var(--divider)] hover:bg-[var(--bg-primary)] transition-all"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Return to Module Study</span>
              </button>

              <button
                type="submit"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-sm font-bold font-display text-white bg-[var(--accent-signal)] hover:bg-[var(--accent-signal-deep)] shadow-brand transition-all focus-visible:ring-2 focus-visible:ring-[var(--border-focus)]"
              >
                <span>Submit Assessment (10 Questions)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="pt-6 border-t border-[var(--divider)] flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                type="button"
                onClick={handleRetake}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-xs font-bold font-mono text-[var(--text-secondary)] bg-[var(--bg-elevated)] border border-[var(--divider)] hover:bg-[var(--bg-primary)] transition-all"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Retake Assessment</span>
              </button>

              {onNavigateNextModule && (
                <button
                  type="button"
                  onClick={onNavigateNextModule}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-sm font-bold font-display text-white bg-[#059669] hover:bg-[#047857] shadow-brand transition-all"
                >
                  <span>Proceed to Next Module</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          )}

        </form>

      </div>
    </article>
  );
}
