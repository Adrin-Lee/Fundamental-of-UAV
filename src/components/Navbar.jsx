import React from 'react';
import { Home, BookOpen, Layers, Sliders } from 'lucide-react';

export default function Navbar({ 
  onNavigateHome, 
  onNavigateCurriculum, 
  onNavigateSimulators, 
  onNavigateGlossary,
  currentView
}) {
  return (
    <header className="sticky top-0 z-50 bg-[var(--bg-primary)] border-b border-[var(--divider)] shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Left: Brand Logo & Wordmark */}
        <button 
          onClick={onNavigateHome}
          className="flex items-center gap-3 group text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--border-focus)] rounded-md"
          aria-label="Drone Fundamentals Home"
        >
          {/* Asteria Logo Mark */}
          <div className="w-9 h-9 flex items-center justify-center rounded-full overflow-hidden shadow-xs transition-transform group-hover:scale-105 bg-white border border-[var(--divider)]">
            <img 
              src="/images/asteria-logo-mark.png" 
              alt="Asteria Logo" 
              className="w-full h-full object-contain"
            />
          </div>
          
          <div className="flex flex-col leading-tight">
            <span className="font-display font-bold tracking-tight text-[17px] text-[var(--accent-signal)] uppercase">
              Drone Fundamentals
            </span>
            <span className="font-mono text-[10px] tracking-wider text-[var(--text-muted)] uppercase font-semibold">
              Internal Training Portal
            </span>
          </div>
        </button>

        {/* Center: Main Navigation Links (Home, Curriculum, Simulators, Glossary) */}
        <nav className="flex items-center gap-1.5 sm:gap-3 text-[13px] font-medium text-[var(--text-secondary)]">
          
          {/* 1. Home */}
          <button 
            onClick={onNavigateHome}
            className={`flex items-center gap-1.5 py-1.5 px-3 rounded-xl transition-all focus-visible:ring-2 focus-visible:ring-[var(--border-focus)] ${
              currentView === 'home'
                ? 'bg-[var(--accent-signal-subtle)] text-[var(--accent-signal)] font-bold'
                : 'hover:text-[var(--accent-signal)] hover:bg-[var(--bg-elevated)]'
            }`}
          >
            <Home className="w-4 h-4 text-[var(--accent-signal)]" />
            <span>Home</span>
          </button>

          {/* 2. Curriculum Flashcards */}
          <button 
            onClick={onNavigateCurriculum}
            className={`flex items-center gap-1.5 py-1.5 px-3 rounded-xl transition-all focus-visible:ring-2 focus-visible:ring-[var(--border-focus)] ${
              currentView === 'curriculum'
                ? 'bg-[var(--accent-signal-subtle)] text-[var(--accent-signal)] font-bold'
                : 'hover:text-[var(--accent-signal)] hover:bg-[var(--bg-elevated)]'
            }`}
          >
            <Layers className="w-4 h-4 text-[var(--accent-signal)]" />
            <span>Curriculum</span>
          </button>

          {/* 3. Simulators Hub */}
          <button 
            onClick={onNavigateSimulators}
            className={`flex items-center gap-1.5 py-1.5 px-3 rounded-xl transition-all focus-visible:ring-2 focus-visible:ring-[var(--border-focus)] ${
              currentView === 'simulators'
                ? 'bg-[var(--accent-signal-subtle)] text-[var(--accent-signal)] font-bold'
                : 'hover:text-[var(--accent-signal)] hover:bg-[var(--bg-elevated)]'
            }`}
          >
            <Sliders className="w-4 h-4 text-[var(--accent-signal)]" />
            <span>Simulators</span>
          </button>

          {/* 4. Glossary */}
          <button 
            onClick={onNavigateGlossary}
            className={`flex items-center gap-1.5 py-1.5 px-3 rounded-xl transition-all focus-visible:ring-2 focus-visible:ring-[var(--border-focus)] ${
              currentView === 'tools-glossary'
                ? 'bg-[var(--accent-signal-subtle)] text-[var(--accent-signal)] font-bold'
                : 'hover:text-[var(--accent-signal)] hover:bg-[var(--bg-elevated)]'
            }`}
          >
            <BookOpen className="w-4 h-4 text-[var(--accent-signal)]" />
            <span>Glossary</span>
          </button>

        </nav>

        {/* Right: Asteria Aerospace Logo */}
        <div className="hidden sm:flex items-center pl-2">
          <img 
            src="/images/asteria-aerospace-logo.png" 
            alt="Asteria Aerospace" 
            className="h-8 sm:h-9 w-auto object-contain"
          />
        </div>

      </div>
    </header>
  );
}
