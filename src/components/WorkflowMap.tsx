import React, { useState } from 'react';
import { ARCHITECTURE_COMPONENTS, ComponentDetail } from '../diagrams/architectureData';
import { SimulationState } from '../simulation/SimulationState';
import { ArrowRight, CheckCircle2, ChevronRight, Activity } from 'lucide-react';

interface WorkflowMapProps {
  simState: SimulationState;
  onSelectComponent: (comp: ComponentDetail) => void;
  reducedMotion: boolean;
}

export const WorkflowMap: React.FC<WorkflowMapProps> = ({
  simState,
  onSelectComponent,
  reducedMotion
}) => {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  const workflowSteps = [
    { num: '01', title: 'ENVIRONMENT', desc: 'Acoustic field / battlefield ambient noise', compId: 'ref-mic', color: 'cyan' },
    { num: '02', title: 'REF MIC', desc: 'Outer earcup ambient sensor (d[n])', compId: 'ref-mic', color: 'cyan' },
    { num: '03', title: 'PRIMARY MIC', desc: 'Inner boom mic speech+noise (s[n]+v[n])', compId: 'primary-mic', color: 'green' },
    { num: '04', title: 'AUDIO ACQUISITION', desc: 'Multi-channel ALSA I2S capture (16kHz)', compId: 'audio-codec', color: 'cyan' },
    { num: '05', title: 'PREPROCESSING', desc: 'High-pass DC removal + pre-emphasis', compId: 'dc-removal', color: 'cyan' },
    { num: '06', title: 'STFT', desc: 'Hann 512-point FFT (5.0ms hop size)', compId: 'stft-engine', color: 'blue' },
    { num: '07', title: 'FEATURE EXTRACTION', desc: 'Log-mel spectrogram filterbank', compId: 'stft-engine', color: 'blue' },
    { num: '08', title: 'AI / YAMNET', desc: 'CNN acoustic embeddings (1024-D)', compId: 'yamnet-ai', color: 'blue' },
    { num: '09', title: 'TASK CLASSIFIER', desc: 'Military signature classification MLP', compId: 'task-classifier', color: 'blue' },
    { num: '10', title: 'NOISE TYPE', desc: `Identified: ${simState.classification}`, compId: 'task-classifier', color: 'amber' },
    { num: '11', title: 'VAD', desc: simState.speechEnabled ? 'Speech Detected (Protection Active)' : 'Noise Only (0)', compId: 'vad-module', color: 'green' },
    { num: '12', title: 'ADAPTIVE SUPERVISOR', desc: 'Algorithm & step-size selection FSM', compId: 'adaptive-supervisor', color: 'blue' },
    { num: '13', title: 'ANC ALGORITHM', desc: `${simState.selectedAlgorithm} W(z)`, compId: 'fxlms-anc', color: 'cyan' },
    { num: '14', title: 'ANTI-NOISE', desc: 'Phase-inverted wave y[n] generated', compId: 'fxlms-anc', color: 'cyan' },
    { num: '15', title: 'SPEAKER', desc: 'Class-D amp drives 40mm transducer', compId: 'ear-speaker', color: 'green' },
    { num: '16', title: 'ACOUSTIC PATH', desc: 'Ear canal destructive superposition', compId: 'ear-speaker', color: 'green' },
    { num: '17', title: 'ERROR MIC', desc: 'Residual error acoustic sensor', compId: 'error-mic', color: 'cyan' },
    { num: '18', title: 'RESIDUAL ERROR', desc: 'e[n] = d[n] - y[n] + s[n]', compId: 'error-mic', color: 'cyan' },
    { num: '19', title: 'ADAPTIVE UPDATE', desc: 'w[n+1] = w[n] + μ·e·u coefficient update', compId: 'fxlms-anc', color: 'cyan' }
  ];

  const handleStepClick = (stepIndex: number, compId: string) => {
    setActiveStep(stepIndex);
    const comp = ARCHITECTURE_COMPONENTS[compId];
    if (comp) onSelectComponent(comp);
  };

  return (
    <section id="workflow" className="section-shell">
      <div className="section-header">
        <div className="section-num">
          <Activity size={14} />
          <span>SECTION 02 // COMPLETE WORKFLOW</span>
        </div>
        <h2 className="section-title">END-TO-END 19-STAGE TECHNICAL WORKFLOW</h2>
        <p className="section-desc">
          Continuous signal progression from physical acoustic generation through digital acquisition, feature extraction,
          AI supervisory orchestration, adaptive filter synthesis, transducer radiation, and closed-loop error feedback.
        </p>
      </div>

      {/* Horizontal Desktop Architecture (Scrollable) */}
      <div
        className="tech-card"
        style={{
          padding: '24px',
          background: 'var(--bg-surface-sunken)',
          border: '1px solid var(--border-default)',
          overflowX: 'auto'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <span className="font-mono text-cyan" style={{ fontSize: '11px' }}>
            HORIZONTAL SIGNAL RECONSTITUTION PIPELINE
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="badge badge-target">TARGET LATENCY &lt; 15.0 ms</span>
            <span className="badge badge-measured">MEASURED HOP: 5.0 ms</span>
          </div>
        </div>

        {/* Pipeline Container */}
        <div
          style={{
            display: 'flex',
            alignItems: 'stretch',
            gap: '12px',
            minWidth: '2200px',
            paddingBottom: '16px'
          }}
        >
          {workflowSteps.map((step, idx) => {
            const isHovered = activeStep === idx;
            const isSelectedClass = step.title === 'NOISE TYPE' || step.title === 'VAD';

            const borderColor =
              step.color === 'green'
                ? 'var(--signal-green)'
                : step.color === 'blue'
                ? 'var(--signal-blue)'
                : step.color === 'amber'
                ? 'var(--signal-amber)'
                : 'var(--signal-cyan)';

            return (
              <React.Fragment key={step.num}>
                {/* Workflow Node Card */}
                <div
                  onClick={() => handleStepClick(idx, step.compId)}
                  style={{
                    flex: '0 0 160px',
                    background: isHovered ? 'var(--bg-surface-elevated)' : 'var(--bg-surface)',
                    border: `1px solid ${isHovered ? borderColor : 'var(--border-default)'}`,
                    borderRadius: '4px',
                    padding: '12px',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    position: 'relative',
                    transition: 'all 0.15s ease'
                  }}
                  onMouseEnter={() => setActiveStep(idx)}
                  onMouseLeave={() => setActiveStep(null)}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <span className="font-mono" style={{ fontSize: '11px', color: borderColor, fontWeight: 700 }}>
                        {step.num}
                      </span>
                      <span className="status-dot" style={{ background: borderColor }} />
                    </div>
                    <div style={{ fontSize: '12px', fontWeight: 800, color: 'var(--text-heading)', marginBottom: '4px' }}>
                      {step.title}
                    </div>
                    <div style={{ fontSize: '10px', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                      {step.desc}
                    </div>
                  </div>

                  <div style={{ marginTop: '12px', paddingTop: '8px', borderTop: '1px solid var(--border-subtle)' }}>
                    <span className="font-mono text-muted" style={{ fontSize: '9px' }}>INSPECT &rarr;</span>
                  </div>
                </div>

                {/* Animated Connecting Vector (except last step) */}
                {idx < workflowSteps.length - 1 && (
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '24px'
                    }}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24">
                      <line
                        x1="0"
                        y1="12"
                        x2="18"
                        y2="12"
                        stroke={borderColor}
                        strokeWidth="2"
                        className={reducedMotion ? '' : 'flow-line-cyan'}
                      />
                      <polygon points="18,8 24,12 18,16" fill={borderColor} />
                    </svg>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Mobile Cascade Indicator Notice */}
        <div style={{ marginTop: '12px', fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
          Tip: Click any pipeline stage to view input/output variables, algorithm formulations, and physical bus bindings in the side drawer.
        </div>
      </div>
    </section>
  );
};
