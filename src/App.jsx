import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CurriculumFlashcardsView from './components/CurriculumFlashcardsView';
import SimulatorsHubView from './components/SimulatorsHubView';
import ModuleIntroView from './components/ModuleIntroView';
import ModuleDroneTypesView from './components/ModuleDroneTypesView';
import ModuleDroneComponentsView from './components/ModuleDroneComponentsView';
import ModuleFCSensorsView from './components/ModuleFCSensorsView';
import ModuleFlightForcesView from './components/ModuleFlightForcesView';
import ModuleFlightModesView from './components/ModuleFlightModesView';
import ModuleAttitudeKinematicsView from './components/ModuleAttitudeKinematicsView';
import ModuleDGCARulesView from './components/ModuleDGCARulesView';
import GlossaryFlashcards from './components/GlossaryFlashcards';
import DroneTypeComparator from './components/DroneTypeComparator';
import ESCSelector from './components/ESCSelector';
import BatteryCalculator from './components/BatteryCalculator';
import SensorFusionTool from './components/SensorFusionTool';
import ForceBalanceSimulator from './components/ForceBalanceSimulator';
import FlightModePlayground from './components/FlightModePlayground';
import RollPitchYawSimulator from './components/RollPitchYawSimulator';
import DGCAZoneChecker from './components/DGCAZoneChecker';
import ModuleAssessmentView from './components/ModuleAssessmentView';
import FinalAssessment from './components/FinalAssessment';
import Footer from './components/Footer';

function resolveViewFromHash(hash) {
  if (!hash || hash === '#' || hash === '#/' || hash === '#home') {
    return 'home';
  }
  if (hash === '#/curriculum' || hash === '#curriculum' || hash === '#tracks' || hash === '#/tracks' || hash === '#tracks-section') return 'curriculum';
  if (hash === '#/simulators' || hash === '#simulators' || hash === '#tools') return 'simulators';
  if (hash === '#/learn/lift/introduction' || hash === '#module-1') return 'module-1';
  if (hash === '#/learn/lift/types-of-drones' || hash === '#module-2') return 'module-2';
  if (hash === '#/learn/control/drone-components' || hash === '#module-3') return 'module-3';
  if (hash === '#/learn/navigate/flight-controller-sensors' || hash === '#module-4') return 'module-4';
  if (hash === '#/learn/lift/flight-forces' || hash === '#module-5') return 'module-5';
  if (hash === '#/learn/navigate/flight-modes' || hash === '#module-6') return 'module-6';
  if (hash === '#/learn/navigate/attitude-axis-movement' || hash === '#module-7') return 'module-7';
  if (hash === '#/learn/comply/dgca-regulations' || hash === '#module-8') return 'module-8';
  if (hash === '#/assessment/module-1' || hash === '#assessment-1') return 'assessment-module-1';
  if (hash === '#/assessment/module-2' || hash === '#assessment-2') return 'assessment-module-2';
  if (hash === '#/assessment/module-3' || hash === '#assessment-3') return 'assessment-module-3';
  if (hash === '#/assessment/module-4' || hash === '#assessment-4') return 'assessment-module-4';
  if (hash === '#/assessment/module-5' || hash === '#assessment-5') return 'assessment-module-5';
  if (hash === '#/assessment/module-6' || hash === '#assessment-6') return 'assessment-module-6';
  if (hash === '#/assessment/module-7' || hash === '#assessment-7') return 'assessment-module-7';
  if (hash === '#/assessment/module-8' || hash === '#assessment-8') return 'assessment-module-8';
  if (hash === '#/tools/glossary' || hash === '#glossary') return 'tools-glossary';
  if (hash === '#/tools/comparator' || hash === '#comparator') return 'tools-comparator';
  if (hash === '#/tools/battery-calculator' || hash === '#battery-calc') return 'tools-battery-calc';
  if (hash === '#/tools/esc-selector' || hash === '#esc-selector') return 'tools-esc-selector';
  if (hash === '#/tools/sensor-fusion' || hash === '#sensor-fusion') return 'tools-sensor-fusion';
  if (hash === '#/tools/force-balance' || hash === '#force-balance') return 'tools-force-balance';
  if (hash === '#/tools/flight-mode-playground' || hash === '#flight-mode-playground') return 'tools-flight-mode-playground';
  if (hash === '#/tools/roll-pitch-yaw' || hash === '#roll-pitch-yaw') return 'tools-roll-pitch-yaw';
  if (hash === '#/tools/dgca-zone-checker' || hash === '#dgca-zone-checker') return 'tools-dgca-zone-checker';
  if (hash === '#/assessment/final' || hash === '#final-assessment') return 'assessment-final';
  return 'home';
}

export default function App() {
  const [currentView, setCurrentView] = useState(() => {
    return resolveViewFromHash(window.location.hash);
  });

  useEffect(() => {
    const handleHashChange = () => {
      const view = resolveViewFromHash(window.location.hash);
      setCurrentView(view);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (view, hash) => {
    setCurrentView(view);
    window.location.hash = hash;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-primary)]">
      {/* Top Global Navigation: Home, Curriculum, Simulators, Glossary */}
      <Navbar 
        currentView={currentView}
        onNavigateHome={() => navigateTo('home', '')}
        onNavigateCurriculum={() => navigateTo('curriculum', '/curriculum')}
        onNavigateSimulators={() => navigateTo('simulators', '/simulators')}
        onNavigateGlossary={() => navigateTo('tools-glossary', '/tools/glossary')}
      />

      {/* Main Content Router */}
      <main className="flex-1">
        
        {/* 1. Dedicated Curriculum Flashcards Page */}
        {currentView === 'curriculum' && (
          <CurriculumFlashcardsView 
            onNavigateHome={() => navigateTo('home', '')}
            onNavigateModule1={() => navigateTo('module-1', '/learn/lift/introduction')}
            onNavigateModule2={() => navigateTo('module-2', '/learn/lift/types-of-drones')}
            onNavigateModule3={() => navigateTo('module-3', '/learn/control/drone-components')}
            onNavigateModule4={() => navigateTo('module-4', '/learn/navigate/flight-controller-sensors')}
            onNavigateModule5={() => navigateTo('module-5', '/learn/lift/flight-forces')}
            onNavigateModule6={() => navigateTo('module-6', '/learn/navigate/flight-modes')}
            onNavigateModule7={() => navigateTo('module-7', '/learn/navigate/attitude-axis-movement')}
            onNavigateModule8={() => navigateTo('module-8', '/learn/comply/dgca-regulations')}
            onNavigateFinalAssessment={() => navigateTo('assessment-final', '/assessment/final')}
            onNavigateSimulators={() => navigateTo('simulators', '/simulators')}
          />
        )}

        {/* 2. Dedicated Unified Simulators Workbench Page */}
        {currentView === 'simulators' && (
          <SimulatorsHubView 
            onNavigateHome={() => navigateTo('home', '')}
            onNavigateCurriculum={() => navigateTo('curriculum', '/curriculum')}
            onNavigateModule1={() => navigateTo('module-1', '/learn/lift/introduction')}
            onNavigateModule2={() => navigateTo('module-2', '/learn/lift/types-of-drones')}
            onNavigateModule3={() => navigateTo('module-3', '/learn/control/drone-components')}
            onNavigateModule4={() => navigateTo('module-4', '/learn/navigate/flight-controller-sensors')}
            onNavigateModule5={() => navigateTo('module-5', '/learn/lift/flight-forces')}
            onNavigateModule6={() => navigateTo('module-6', '/learn/navigate/flight-modes')}
            onNavigateModule7={() => navigateTo('module-7', '/learn/navigate/attitude-axis-movement')}
            onNavigateModule8={() => navigateTo('module-8', '/learn/comply/dgca-regulations')}
          />
        )}

        {/* Modules 1 through 8 (Sequential Study Views) */}
        {currentView === 'module-1' && (
          <ModuleIntroView 
            onNavigateHome={() => navigateTo('curriculum', '/curriculum')}
            onNavigateNext={() => navigateTo('module-2', '/learn/lift/types-of-drones')}
            onNavigateAssessment={() => navigateTo('assessment-module-1', '/assessment/module-1')}
          />
        )}

        {currentView === 'module-2' && (
          <ModuleDroneTypesView 
            onNavigateHome={() => navigateTo('curriculum', '/curriculum')}
            onNavigatePrev={() => navigateTo('module-1', '/learn/lift/introduction')}
            onNavigateNext={() => navigateTo('module-3', '/learn/control/drone-components')}
            onNavigateAssessment={() => navigateTo('assessment-module-2', '/assessment/module-2')}
          />
        )}

        {currentView === 'module-3' && (
          <ModuleDroneComponentsView 
            onNavigateHome={() => navigateTo('curriculum', '/curriculum')}
            onNavigatePrev={() => navigateTo('module-2', '/learn/lift/types-of-drones')}
            onNavigateNext={() => navigateTo('module-4', '/learn/navigate/flight-controller-sensors')}
            onNavigateAssessment={() => navigateTo('assessment-module-3', '/assessment/module-3')}
          />
        )}

        {currentView === 'module-4' && (
          <ModuleFCSensorsView 
            onNavigateHome={() => navigateTo('curriculum', '/curriculum')}
            onNavigatePrev={() => navigateTo('module-3', '/learn/control/drone-components')}
            onNavigateNext={() => navigateTo('module-5', '/learn/lift/flight-forces')}
            onNavigateAssessment={() => navigateTo('assessment-module-4', '/assessment/module-4')}
          />
        )}

        {currentView === 'module-5' && (
          <ModuleFlightForcesView 
            onNavigateHome={() => navigateTo('curriculum', '/curriculum')}
            onNavigatePrev={() => navigateTo('module-4', '/learn/navigate/flight-controller-sensors')}
            onNavigateNext={() => navigateTo('module-6', '/learn/navigate/flight-modes')}
            onNavigateAssessment={() => navigateTo('assessment-module-5', '/assessment/module-5')}
          />
        )}

        {currentView === 'module-6' && (
          <ModuleFlightModesView 
            onNavigateHome={() => navigateTo('curriculum', '/curriculum')}
            onNavigatePrev={() => navigateTo('module-5', '/learn/lift/flight-forces')}
            onNavigateNext={() => navigateTo('module-7', '/learn/navigate/attitude-axis-movement')}
            onNavigateGlossary={() => navigateTo('tools-glossary', '/tools/glossary')}
            onNavigateAssessment={() => navigateTo('assessment-module-6', '/assessment/module-6')}
          />
        )}

        {currentView === 'module-7' && (
          <ModuleAttitudeKinematicsView 
            onNavigateHome={() => navigateTo('curriculum', '/curriculum')}
            onNavigatePrev={() => navigateTo('module-6', '/learn/navigate/flight-modes')}
            onNavigateNext={() => navigateTo('module-8', '/learn/comply/dgca-regulations')}
            onNavigateAssessment={() => navigateTo('assessment-module-7', '/assessment/module-7')}
          />
        )}

        {currentView === 'module-8' && (
          <ModuleDGCARulesView 
            onNavigateHome={() => navigateTo('curriculum', '/curriculum')}
            onNavigatePrev={() => navigateTo('module-7', '/learn/navigate/attitude-axis-movement')}
            onNavigateFinalAssessment={() => navigateTo('assessment-final', '/assessment/final')}
            onNavigateAssessment={() => navigateTo('assessment-module-8', '/assessment/module-8')}
          />
        )}

        {/* Dedicated Standalone Module Assessment Pages */}
        {currentView === 'assessment-module-1' && (
          <ModuleAssessmentView 
            moduleId="mod-intro-terminology"
            onNavigateBackToModule={() => navigateTo('module-1', '/learn/lift/introduction')}
            onNavigateNextModule={() => navigateTo('module-2', '/learn/lift/types-of-drones')}
            onNavigateCurriculum={() => navigateTo('curriculum', '/curriculum')}
          />
        )}

        {currentView === 'assessment-module-2' && (
          <ModuleAssessmentView 
            moduleId="mod-types-of-drones"
            onNavigateBackToModule={() => navigateTo('module-2', '/learn/lift/types-of-drones')}
            onNavigateNextModule={() => navigateTo('module-3', '/learn/control/drone-components')}
            onNavigateCurriculum={() => navigateTo('curriculum', '/curriculum')}
          />
        )}

        {currentView === 'assessment-module-3' && (
          <ModuleAssessmentView 
            moduleId="mod-drone-components"
            onNavigateBackToModule={() => navigateTo('module-3', '/learn/control/drone-components')}
            onNavigateNextModule={() => navigateTo('module-4', '/learn/navigate/flight-controller-sensors')}
            onNavigateCurriculum={() => navigateTo('curriculum', '/curriculum')}
          />
        )}

        {currentView === 'assessment-module-4' && (
          <ModuleAssessmentView 
            moduleId="mod-fc-sensors"
            onNavigateBackToModule={() => navigateTo('module-4', '/learn/navigate/flight-controller-sensors')}
            onNavigateNextModule={() => navigateTo('module-5', '/learn/lift/flight-forces')}
            onNavigateCurriculum={() => navigateTo('curriculum', '/curriculum')}
          />
        )}

        {currentView === 'assessment-module-5' && (
          <ModuleAssessmentView 
            moduleId="mod-flight-forces"
            onNavigateBackToModule={() => navigateTo('module-5', '/learn/lift/flight-forces')}
            onNavigateNextModule={() => navigateTo('module-6', '/learn/navigate/flight-modes')}
            onNavigateCurriculum={() => navigateTo('curriculum', '/curriculum')}
          />
        )}

        {currentView === 'assessment-module-6' && (
          <ModuleAssessmentView 
            moduleId="mod-flight-modes"
            onNavigateBackToModule={() => navigateTo('module-6', '/learn/navigate/flight-modes')}
            onNavigateNextModule={() => navigateTo('module-7', '/learn/navigate/attitude-axis-movement')}
            onNavigateCurriculum={() => navigateTo('curriculum', '/curriculum')}
          />
        )}

        {currentView === 'assessment-module-7' && (
          <ModuleAssessmentView 
            moduleId="mod-attitude-kinematics"
            onNavigateBackToModule={() => navigateTo('module-7', '/learn/navigate/attitude-axis-movement')}
            onNavigateNextModule={() => navigateTo('module-8', '/learn/comply/dgca-regulations')}
            onNavigateCurriculum={() => navigateTo('curriculum', '/curriculum')}
          />
        )}

        {currentView === 'assessment-module-8' && (
          <ModuleAssessmentView 
            moduleId="mod-dgca-rules"
            onNavigateBackToModule={() => navigateTo('module-8', '/learn/comply/dgca-regulations')}
            onNavigateNextModule={() => navigateTo('assessment-final', '/assessment/final')}
            onNavigateCurriculum={() => navigateTo('curriculum', '/curriculum')}
          />
        )}

        {/* Final Assessment Certification View (Requires Module 8 completion) */}
        {currentView === 'assessment-final' && (
          <FinalAssessment 
            onNavigateHome={() => navigateTo('curriculum', '/curriculum')}
            onRetake={() => navigateTo('assessment-final', '/assessment/final')}
          />
        )}

        {/* Glossary Flashcards View */}
        {currentView === 'tools-glossary' && (
          <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <button 
                onClick={() => navigateTo('curriculum', '/curriculum')}
                className="font-mono text-xs text-[var(--accent-signal)] hover:underline mb-2 block"
              >
                ← Back to Curriculum
              </button>
              <h1 className="font-display text-3xl font-bold text-[var(--text-primary)]">
                UAV Technical Terminology & Flashcards
              </h1>
              <p className="font-body text-sm text-[var(--text-muted)] mt-1">
                Full 14-term interactive glossary and mastery trainer.
              </p>
            </div>
            <GlossaryFlashcards />
          </div>
        )}

        {/* Standalone Deep Links (Also available within Simulators Hub) */}
        {currentView === 'tools-comparator' && (
          <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <button onClick={() => navigateTo('simulators', '/simulators')} className="font-mono text-xs text-[var(--accent-signal)] hover:underline mb-2 block">← Back to Simulators</button>
            <DroneTypeComparator />
          </div>
        )}

        {currentView === 'tools-battery-calc' && (
          <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <button onClick={() => navigateTo('simulators', '/simulators')} className="font-mono text-xs text-[var(--accent-signal)] hover:underline mb-2 block">← Back to Simulators</button>
            <BatteryCalculator />
          </div>
        )}

        {currentView === 'tools-esc-selector' && (
          <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <button onClick={() => navigateTo('simulators', '/simulators')} className="font-mono text-xs text-[var(--accent-signal)] hover:underline mb-2 block">← Back to Simulators</button>
            <div className="p-6 rounded-2xl bg-[var(--bg-elevated)] border border-[var(--divider)] shadow-xs">
              <ESCSelector />
            </div>
          </div>
        )}

        {currentView === 'tools-sensor-fusion' && (
          <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <button onClick={() => navigateTo('simulators', '/simulators')} className="font-mono text-xs text-[var(--accent-signal)] hover:underline mb-2 block">← Back to Simulators</button>
            <SensorFusionTool />
          </div>
        )}

        {currentView === 'tools-force-balance' && (
          <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <button onClick={() => navigateTo('simulators', '/simulators')} className="font-mono text-xs text-[var(--accent-signal)] hover:underline mb-2 block">← Back to Simulators</button>
            <ForceBalanceSimulator />
          </div>
        )}

        {currentView === 'tools-flight-mode-playground' && (
          <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <button onClick={() => navigateTo('simulators', '/simulators')} className="font-mono text-xs text-[var(--accent-signal)] hover:underline mb-2 block">← Back to Simulators</button>
            <FlightModePlayground />
          </div>
        )}

        {currentView === 'tools-roll-pitch-yaw' && (
          <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <button onClick={() => navigateTo('simulators', '/simulators')} className="font-mono text-xs text-[var(--accent-signal)] hover:underline mb-2 block">← Back to Simulators</button>
            <RollPitchYawSimulator />
          </div>
        )}

        {currentView === 'tools-dgca-zone-checker' && (
          <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <button onClick={() => navigateTo('simulators', '/simulators')} className="font-mono text-xs text-[var(--accent-signal)] hover:underline mb-2 block">← Back to Simulators</button>
            <DGCAZoneChecker />
          </div>
        )}

        {/* Pure Landing Page as only content on Home Page */}
        {currentView === 'home' && (
          <Hero 
            onStartLearning={() => navigateTo('module-1', '/learn/lift/introduction')} 
            onExploreCurriculum={() => navigateTo('curriculum', '/curriculum')}
          />
        )}
      </main>

      {/* Global Footer (rendered on subpages; Home has integrated single-page status bar) */}
      {currentView !== 'home' && <Footer />}
    </div>
  );
}
