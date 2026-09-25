import React, { useState } from 'react';
import { INITIAL_SIM_STATE, SimulationState, NoiseClass, SupervisorState } from './simulation/SimulationState';
import { ComponentDetail } from './diagrams/architectureData';
import { TechnicalNav } from './components/TechnicalNav';
import { SystemHero } from './components/SystemHero';
import { WorkflowMap } from './components/WorkflowMap';
import { SoftwareArchitecture } from './components/SoftwareArchitecture';
import { HardwareArchitecture } from './components/HardwareArchitecture';
import { AudioSensing } from './components/AudioSensing';
import { PreprocessingPipeline } from './components/PreprocessingPipeline';
import { AIAnalysis } from './components/AIAnalysis';
import { NoiseClassifier } from './components/NoiseClassifier';
import { VADPanel } from './components/VADPanel';
import { AdaptiveSupervisor } from './components/AdaptiveSupervisor';
import { HybridANC } from './components/HybridANC';
import { FxLMSLoop } from './components/FxLMSLoop';
import { ImpulseProtection } from './components/ImpulseProtection';
import { SpeechEnhancement } from './components/SpeechEnhancement';
import { HardwareSignalPath } from './components/HardwareSignalPath';
import { ErrorFeedback } from './components/ErrorFeedback';
import { SimulationLab } from './components/SimulationLab';
import { SystemStateMonitor } from './components/SystemStateMonitor';
import { MetricsDashboard } from './components/MetricsDashboard';
import { TechnologyStack } from './components/TechnologyStack';
import { FinalArchitecture } from './components/FinalArchitecture';
import { TechnicalFooter } from './components/TechnicalFooter';
import { ComponentDetailDrawer } from './components/ComponentDetailDrawer';

export const App: React.FC = () => {
  const [simState, setSimState] = useState<SimulationState>(INITIAL_SIM_STATE);
  const [selectedComponent, setSelectedComponent] = useState<ComponentDetail | null>(null);
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);

  const handleUpdateSimState = (updates: Partial<SimulationState>) => {
    setSimState((prev) => ({ ...prev, ...updates }));
  };

  const handleResetSim = () => {
    setSimState(INITIAL_SIM_STATE);
  };

  const handleSelectNoiseClass = (noiseClass: NoiseClass) => {
    let noiseType = simState.noiseType;
    if (noiseClass === 'STATIONARY') noiseType = 'vehicle';
    else if (noiseClass === 'NON-STATIONARY') noiseType = 'helicopter';
    else if (noiseClass === 'IMPULSIVE') noiseType = 'impulse';

    let algorithm: SimulationState['selectedAlgorithm'] = 'FxLMS / NLMS';
    let mu = 0.015;
    let attenuation = -19.4;

    if (noiseClass === 'NON-STATIONARY') {
      algorithm = 'Adaptive ANC';
      mu = 0.038;
      attenuation = -16.2;
    } else if (noiseClass === 'IMPULSIVE') {
      algorithm = 'Robust ANC';
      mu = 0.005;
      attenuation = -26.5;
    }

    setSimState((prev) => ({
      ...prev,
      noiseType,
      classification: noiseClass,
      selectedAlgorithm: algorithm,
      stepSizeMu: mu,
      residualAttenuationDb: attenuation,
      impulseTriggered: noiseClass === 'IMPULSIVE'
    }));
  };

  const handleSetSupervisorState = (st: SupervisorState) => {
    setSimState((prev) => ({ ...prev, supervisorState: st }));
  };

  const handleTriggerImpulse = () => {
    setSimState((prev) => ({
      ...prev,
      noiseType: 'impulse',
      classification: 'IMPULSIVE',
      selectedAlgorithm: 'Robust ANC',
      supervisorState: 'IMPULSE_PROTECT',
      impulseTriggered: true,
      hapticTriggered: true,
      residualAttenuationDb: -28.0
    }));

    setTimeout(() => {
      setSimState((prev) => ({
        ...prev,
        supervisorState: 'FAST_RECOVERY',
        hapticTriggered: false
      }));
    }, 900);

    setTimeout(() => {
      setSimState((prev) => ({
        ...prev,
        supervisorState: 'NORMAL_ANC',
        impulseTriggered: false,
        residualAttenuationDb: -19.4
      }));
    }, 2000);
  };

  return (
    <div className="bg-grid-pattern" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Persistent Sticky Top Navigation */}
      <TechnicalNav
        simState={simState}
        onToggleSim={() => handleUpdateSimState({ isRunning: !simState.isRunning })}
        reducedMotion={reducedMotion}
        onToggleReducedMotion={() => setReducedMotion((prev) => !prev)}
      />

      {/* Main Architectural Sections Container */}
      <main style={{ flex: 1 }}>
        {/* 01 — HERO / SYSTEM OVERVIEW */}
        <SystemHero
          simState={simState}
          onSelectComponent={(c) => setSelectedComponent(c)}
          reducedMotion={reducedMotion}
        />

        {/* 02 — COMPLETE WORKFLOW */}
        <WorkflowMap
          simState={simState}
          onSelectComponent={(c) => setSelectedComponent(c)}
          reducedMotion={reducedMotion}
        />

        {/* 03 — SOFTWARE ARCHITECTURE */}
        <SoftwareArchitecture
          onSelectComponent={(c) => setSelectedComponent(c)}
          reducedMotion={reducedMotion}
        />

        {/* 04 — HARDWARE ARCHITECTURE */}
        <HardwareArchitecture
          onSelectComponent={(c) => setSelectedComponent(c)}
          reducedMotion={reducedMotion}
        />

        {/* 05 — AUDIO SENSING */}
        <AudioSensing
          simState={simState}
          reducedMotion={reducedMotion}
        />

        {/* 06 — PREPROCESSING & FEATURE EXTRACTION */}
        <PreprocessingPipeline
          simState={simState}
          reducedMotion={reducedMotion}
        />

        {/* 07 — AI/ML NOISE ANALYSIS */}
        <AIAnalysis simState={simState} />

        {/* 08 — NOISE CLASSIFICATION */}
        <NoiseClassifier
          simState={simState}
          onSelectState={handleSelectNoiseClass}
          reducedMotion={reducedMotion}
        />

        {/* 09 — SPEECH / VAD */}
        <VADPanel
          simState={simState}
          reducedMotion={reducedMotion}
        />

        {/* 10 — AI ADAPTIVE SUPERVISOR */}
        <AdaptiveSupervisor
          simState={simState}
          onSetState={handleSetSupervisorState}
          reducedMotion={reducedMotion}
        />

        {/* 11 — HYBRID ANC */}
        <HybridANC
          simState={simState}
          onSelectComponent={(c) => setSelectedComponent(c)}
          reducedMotion={reducedMotion}
        />

        {/* 12 — FxLMS / NLMS CLOSED LOOP */}
        <FxLMSLoop
          simState={simState}
          reducedMotion={reducedMotion}
        />

        {/* 13 — IMPULSIVE NOISE PROTECTION */}
        <ImpulseProtection
          simState={simState}
          onTriggerImpulse={handleTriggerImpulse}
          reducedMotion={reducedMotion}
        />

        {/* 14 — NEURAL SPEECH ENHANCEMENT */}
        <SpeechEnhancement
          simState={simState}
          reducedMotion={reducedMotion}
        />

        {/* 15 — HARDWARE SIGNAL PATH */}
        <HardwareSignalPath
          onSelectComponent={(c) => setSelectedComponent(c)}
          reducedMotion={reducedMotion}
        />

        {/* 16 — ERROR FEEDBACK */}
        <ErrorFeedback
          simState={simState}
          reducedMotion={reducedMotion}
        />

        {/* 17 — END-TO-END LIVE SIMULATION (CENTERPIECE) */}
        <SimulationLab
          simState={simState}
          onUpdateState={handleUpdateSimState}
          onReset={handleResetSim}
          reducedMotion={reducedMotion}
        />

        {/* 18 — SYSTEM STATES */}
        <SystemStateMonitor
          simState={simState}
          reducedMotion={reducedMotion}
        />

        {/* 19 — PERFORMANCE / ENGINEERING METRICS */}
        <MetricsDashboard />

        {/* 20 — TECHNOLOGY STACK */}
        <TechnologyStack />

        {/* 21 — FINAL SYSTEM ARCHITECTURE */}
        <FinalArchitecture
          onSelectComponent={(c) => setSelectedComponent(c)}
          reducedMotion={reducedMotion}
        />
      </main>

      {/* 22 — TECHNICAL FOOTER */}
      <TechnicalFooter />

      {/* Slide-over Component Detail Panel Drawer */}
      <ComponentDetailDrawer
        component={selectedComponent}
        onClose={() => setSelectedComponent(null)}
      />
    </div>
  );
};

export default App;
