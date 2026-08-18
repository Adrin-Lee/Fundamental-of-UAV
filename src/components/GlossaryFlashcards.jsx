import React, { useState, useEffect } from 'react';
import { RotateCw, CheckCircle2, RefreshCcw, Sparkles, Filter, Search, Check } from 'lucide-react';
import { glossaryTermsData } from '../data/curriculumData';

export default function GlossaryFlashcards({ className = "" }) {
  const [flippedCards, setFlippedCards] = useState({});
  const [masteredTerms, setMasteredTerms] = useState(() => {
    try {
      const saved = localStorage.getItem('asteria_glossary_progress');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Save mastery progress to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('asteria_glossary_progress', JSON.stringify(masteredTerms));
    } catch (e) {
      console.warn('Unable to persist glossary progress to localStorage', e);
    }
  }, [masteredTerms]);

  const handleCardFlip = (id) => {
    setFlippedCards(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleToggleMastery = (e, id) => {
    e.stopPropagation(); // prevent card flip when clicking toggle button
    setMasteredTerms(prev => {
      const next = { ...prev };
      if (next[id]) {
        delete next[id];
      } else {
        next[id] = true;
      }
      return next;
    });
  };

  const filteredTerms = glossaryTermsData.filter(item => {
    const matchesSearch = 
      item.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.definition.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const masteredCount = Object.keys(masteredTerms).length;
  const totalCount = glossaryTermsData.length;
  const masteryPercentage = Math.round((masteredCount / totalCount) * 100);

  return (
    <div className={`w-full ${className}`}>
      
      {/* Tool Header & Progress Summary Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between p-4 sm:p-5 rounded-2xl bg-[var(--bg-elevated)] border border-[var(--divider)] mb-8 gap-4 shadow-xs">
        
        {/* Left: Mastery Stats */}
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[var(--accent-signal-subtle)] border border-[#BFDBFE] flex items-center justify-center text-[var(--accent-signal)] shrink-0 shadow-xs">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display font-bold text-lg text-[var(--text-primary)]">
                Interactive Flashcards
              </span>
              <span className="font-mono text-xs px-2 py-0.5 rounded-full bg-[var(--bg-primary)] border border-[var(--divider)] font-semibold text-[var(--accent-signal)]">
                {masteredCount} of {totalCount} Mastered
              </span>
            </div>
            <p className="font-body text-xs text-[var(--text-muted)] mt-0.5">
              Click any card to reveal its engineering definition and mark terms as known.
            </p>
          </div>
        </div>

        {/* Right: Progress Meter */}
        <div className="flex items-center gap-3 w-full md:w-64">
          <div className="flex-1 bg-[var(--divider)] h-2.5 rounded-full overflow-hidden">
            <div 
              className="bg-[var(--accent-signal)] h-full rounded-full transition-all duration-300"
              style={{ width: `${masteryPercentage}%` }}
            />
          </div>
          <span className="font-mono text-xs font-bold text-[var(--text-primary)] min-w-[36px] text-right">
            {masteryPercentage}%
          </span>
        </div>

      </div>

      {/* Filter & Search Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3.5 mb-6">
        
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          {[
            { id: 'all', label: 'All Terms' },
            { id: 'aerodynamics', label: 'Aerodynamics' },
            { id: 'hardware', label: 'Hardware' },
            { id: 'avionics', label: 'Avionics' },
            { id: 'regulations', label: 'Regulations' }
          ].map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium font-body transition-colors focus-visible:ring-2 focus-visible:ring-[var(--border-focus)] ${
                selectedCategory === cat.id
                  ? 'bg-[var(--accent-signal)] text-white shadow-xs'
                  : 'bg-[var(--bg-elevated)] text-[var(--text-secondary)] hover:bg-[var(--bg-surface-subtle)] border border-[var(--divider)]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-[var(--text-muted)] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search abbreviations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-[var(--bg-primary)] border border-[var(--divider)] rounded-lg text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-signal)] focus:ring-1 focus:ring-[var(--accent-signal)] font-body"
          />
        </div>

      </div>

      {/* 14 Flashcards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {filteredTerms.map((item) => {
          const isFlipped = !!flippedCards[item.id];
          const isMastered = !!masteredTerms[item.id];

          return (
            <div
              key={item.id}
              onClick={() => handleCardFlip(item.id)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleCardFlip(item.id);
                }
              }}
              tabIndex={0}
              role="button"
              aria-label={`Flashcard for ${item.term}. Click to ${isFlipped ? 'hide' : 'show'} definition.`}
              className="group relative h-56 cursor-pointer select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--border-focus)] rounded-2xl"
              style={{ perspective: '1000px' }}
            >
              {/* Flip Card Inner Container */}
              <div 
                className={`w-full h-full duration-300 transition-transform rounded-2xl ${
                  isFlipped ? 'rotate-y-180' : ''
                }`}
                style={{
                  transformStyle: 'preserve-3d',
                  transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
                }}
              >

                {/* ================= FRONT OF CARD ================= */}
                <div 
                  className={`absolute inset-0 w-full h-full p-5 rounded-2xl bg-[var(--bg-primary)] border transition-all flex flex-col justify-between shadow-card group-hover:shadow-card-hover group-hover:-translate-y-0.5 ${
                    isMastered 
                      ? 'border-[var(--accent-success)]/60 ring-1 ring-[var(--accent-success)]/20' 
                      : 'border-[var(--divider)] group-hover:border-[#CBD5E1]'
                  }`}
                  style={{ backfaceVisibility: 'hidden' }}
                >
                  {/* Top: Category Tag & Mastery Indicator */}
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] font-bold tracking-wider uppercase text-[var(--accent-signal)] bg-[var(--accent-signal-subtle)] px-2 py-0.5 rounded-md border border-[#BFDBFE]">
                      {item.category}
                    </span>
                    {isMastered && (
                      <span className="inline-flex items-center gap-1 font-mono text-[10px] font-semibold text-[var(--accent-success)] bg-[#ECFDF5] px-2 py-0.5 rounded-full border border-[#A7F3D0]">
                        <Check className="w-3 h-3" />
                        <span>Mastered</span>
                      </span>
                    )}
                  </div>

                  {/* Middle: Large JetBrains Mono Acronym & Full Name */}
                  <div className="my-auto text-center px-2">
                    <h3 className="font-mono text-2xl sm:text-3xl font-bold text-[var(--accent-signal)] tracking-tight mb-1">
                      {item.term}
                    </h3>
                    <p className="font-body text-xs text-[var(--text-muted)] font-medium line-clamp-2">
                      {item.full_name}
                    </p>
                  </div>

                  {/* Bottom: Flip Cue */}
                  <div className="flex items-center justify-between pt-3 border-t border-[var(--divider)] font-mono text-[10px] text-[var(--text-muted)]">
                    <span>SOURCE: S2 GLOSSARY</span>
                    <div className="flex items-center gap-1 text-[var(--accent-signal)] group-hover:underline">
                      <RotateCw className="w-3 h-3" />
                      <span>Flip card</span>
                    </div>
                  </div>
                </div>

                {/* ================= BACK OF CARD ================= */}
                <div 
                  className="absolute inset-0 w-full h-full p-5 rounded-2xl bg-[var(--bg-elevated)] border border-[var(--divider)] flex flex-col justify-between shadow-card"
                  style={{ 
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)'
                  }}
                >
                  {/* Top: Term Title */}
                  <div className="flex items-center justify-between border-b border-[var(--divider)] pb-2">
                    <span className="font-mono text-xs font-bold text-[var(--accent-signal)]">
                      {item.term} · Definition
                    </span>
                    <span className="font-mono text-[10px] text-[var(--text-muted)] uppercase">
                      {item.category}
                    </span>
                  </div>

                  {/* Middle: Verbatim Definition */}
                  <div className="my-auto py-1">
                    <p className="font-body text-xs sm:text-[13px] text-[var(--text-primary)] leading-relaxed">
                      {item.definition}
                    </p>
                  </div>

                  {/* Bottom: Mastery Toggle Action */}
                  <div className="pt-2.5 border-t border-[var(--divider)] flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={(e) => handleToggleMastery(e, item.id)}
                      className={`flex-1 inline-flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg text-xs font-semibold font-body transition-all focus-visible:ring-2 focus-visible:ring-[var(--border-focus)] ${
                        isMastered
                          ? 'bg-[var(--bg-primary)] text-[var(--text-muted)] border border-[var(--divider)] hover:bg-[var(--bg-surface-subtle)]'
                          : 'bg-[var(--accent-signal)] text-white hover:bg-[var(--accent-signal-deep)] shadow-xs'
                      }`}
                    >
                      {isMastered ? (
                        <>
                          <RefreshCcw className="w-3 h-3" />
                          <span>↻ Review again</span>
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                          <span>✓ Got it</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCardFlip(item.id);
                      }}
                      className="p-1.5 text-[var(--text-muted)] hover:text-[var(--text-primary)] rounded-md hover:bg-[var(--bg-surface-subtle)]"
                      title="Flip back"
                    >
                      <RotateCw className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

              </div>
            </div>
          );
        })}
      </div>

      {filteredTerms.length === 0 && (
        <div className="p-8 text-center bg-[var(--bg-elevated)] border border-[var(--divider)] rounded-2xl">
          <p className="font-body text-sm text-[var(--text-muted)]">
            No glossary terms match your search filter.
          </p>
        </div>
      )}

    </div>
  );
}
