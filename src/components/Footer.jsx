import React from 'react';
import { ExternalLink, ShieldCheck, Code2 } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[var(--bg-primary)] border-t border-[var(--divider)] pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-[var(--divider)]">
          
          <div className="md:col-span-6 flex flex-col">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-7 h-7 flex items-center justify-center bg-[var(--accent-signal)] rounded-lg text-white font-bold">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-base text-[var(--accent-signal)] uppercase tracking-tight">
                  Drone Fundamentals
                </span>
                <span className="font-mono text-[11px] font-bold text-[var(--accent-signal)] italic">
                  From Theory to Takeoff.
                </span>
              </div>
            </div>
            <p className="font-body text-xs text-[var(--text-muted)] max-w-sm leading-relaxed mb-4">
              Comprehensive UAV technical curriculum & interactive drone systems fundamentals platform for engineers, technicians, and operators.
            </p>
          </div>

          <div className="md:col-span-6 flex flex-col justify-center">
            {/* DGCA & Digital Sky Statutory Notice Callout */}
            <div className="p-4 rounded-xl bg-[var(--bg-elevated)] border border-[var(--divider)] flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-[var(--accent-signal)] shrink-0 mt-0.5" />
              <div className="flex flex-col">
                <span className="font-display font-semibold text-xs text-[var(--text-primary)] mb-1">
                  Statutory Aviation Compliance Notice
                </span>
                <p className="font-body text-[11px] text-[var(--text-muted)] leading-relaxed">
                  This educational platform provides technical awareness and fundamentals training. For statutory flight permissions, registration, and airspace classification, consult the official{' '}
                  <a 
                    href="https://digitalsky.dgca.gov.in" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-semibold text-[var(--accent-signal)] hover:underline"
                  >
                    <span>DGCA Digital Sky Platform</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Copyright, Developer Signature and Meta Bar */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between text-xs font-mono text-[var(--text-muted)] gap-3">
          <div className="flex flex-col sm:flex-row items-center gap-1.5 sm:gap-3 text-center sm:text-left">
            <span>© {new Date().getFullYear()} Drone Fundamentals. All Rights Reserved.</span>
            <span className="hidden sm:inline text-[var(--divider)]">|</span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[var(--bg-elevated)] border border-[var(--divider)] text-[var(--text-secondary)]">
              <Code2 className="w-3.5 h-3.5 text-[var(--accent-signal)]" />
              <span>Developed by <strong className="text-[var(--accent-signal)] font-bold">Suryajayan Alex</strong></span>
            </span>
          </div>
          <span className="text-[11px]">Drone Fundamentals Platform · Version 1.0.0</span>
        </div>

      </div>
    </footer>
  );
}
