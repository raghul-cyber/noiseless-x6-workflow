export type NoiseType = 'vehicle' | 'helicopter' | 'wind' | 'machinery' | 'crowd' | 'impulse';
export type NoiseClass = 'STATIONARY' | 'NON-STATIONARY' | 'IMPULSIVE';
export type SupervisorState = 'NORMAL_ANC' | 'ADAPTIVE_TRACKING' | 'IMPULSE_PROTECT' | 'FAST_RECOVERY';
export type AlgorithmType = 'FxLMS / NLMS' | 'Adaptive ANC' | 'Robust ANC';

export interface SimulationState {
  isRunning: boolean;
  noiseType: NoiseType;
  speechEnabled: boolean;
  aiActive: boolean;
  ancActive: boolean;
  showFeedback: boolean;
  
  // Real-time calculated telemetry
  classification: NoiseClass;
  classificationScores: {
    stationary: number;
    nonStationary: number;
    impulsive: number;
  };
  vadActive: boolean;
  vadEnergyRatio: number;
  supervisorState: SupervisorState;
  selectedAlgorithm: AlgorithmType;
  stepSizeMu: number;
  residualAttenuationDb: number;
  impulseTriggered: boolean;
  hapticTriggered: boolean;
  activePipelineIndex: number;
  
  // Convergence error history for graph
  errorHistory: number[];
}

export const INITIAL_SIM_STATE: SimulationState = {
  isRunning: true,
  noiseType: 'vehicle',
  speechEnabled: true,
  aiActive: true,
  ancActive: true,
  showFeedback: true,
  
  classification: 'STATIONARY',
  classificationScores: {
    stationary: 78,
    nonStationary: 17,
    impulsive: 5
  },
  vadActive: true,
  vadEnergyRatio: 14.2,
  supervisorState: 'NORMAL_ANC',
  selectedAlgorithm: 'FxLMS / NLMS',
  stepSizeMu: 0.015,
  residualAttenuationDb: -19.4,
  impulseTriggered: false,
  hapticTriggered: false,
  activePipelineIndex: 8,
  errorHistory: [0.92, 0.81, 0.65, 0.44, 0.31, 0.22, 0.16, 0.13, 0.11, 0.10, 0.09, 0.09]
};
