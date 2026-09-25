import React, { useState, useEffect } from 'react';
import { ARCHITECTURE_COMPONENTS, ComponentDetail } from '../diagrams/architectureData';
import { SimulationState } from '../simulation/SimulationState';
import {
  Activity,
  Play,
  RotateCcw,
  LayoutGrid,
  AlignJustify,
  ArrowRight,
  Repeat,
  ShieldCheck,
  Zap,
  Mic,
  Cpu,
  Volume2,
  Share2
} from 'lucide-react';

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
  const [viewMode, setViewMode] = useState<'matrix' | 'linear'>('matrix');
  const [isTracing, setIsTracing] = useState<boolean>(false);
  const [tracedStep, setTracedStep] = useState<number>(-1);

  const workflowSteps = [
    // TIER 1: INGESTION & DSP (01 - 07)
    { num: '01', title: 'ENVIRONMENT', tier: 1, desc: 'Acoustic field / battlefield noise', compId: 'ref-mic', color: 'cyan', tag: 'Acoustic wave' },
    { num: '02', title: 'REF MIC', tier: 1, desc: 'Outer earcup ambient sensor d(t)', compId: 'ref-mic', color: 'cyan', tag: 'Omni MEMS' },
    { num: '03', title: 'PRIMARY MIC', tier: 1, desc: 'Inner boom mic speech+noise s(t)+v(t)', compId: 'primary-mic', color: 'green', tag: 'Cardioid' },
    { num: '04', title: 'AUDIO ACQUISITION', tier: 1, desc: 'Multi-channel ALSA I2S capture (16kHz)', compId: 'audio-codec', color: 'cyan', tag: '16-bit PCM' },
    { num: '05', title: 'PREPROCESSING', tier: 1, desc: 'High-pass DC removal + pre-emphasis', compId: 'dc-removal', color: 'cyan', tag: 'HPF 80Hz' },
    { num: '06', title: 'STFT', tier: 1, desc: 'Hann 512-pt FFT (5.0ms hop size)', compId: 'stft-engine', color: 'blue', tag: 'X(t, f)' },
    { num: '07', title: 'FEATURE EXTRACTION', tier: 1, desc: 'Log-mel spectrogram filterbank (64 bins)', compId: 'stft-engine', color: 'blue', tag: 'Log-Mel' },

    // TIER 2: AI INFERENCE & SUPERVISORY CONTROL (08 - 12)
    { num: '08', title: 'AI / YAMNET', tier: 2, desc: 'CNN acoustic embeddings (1024-D)', compId: 'yamnet-ai', color: 'blue', tag: 'ONNX INT8' },
    { num: '09', title: 'TASK CLASSIFIER', tier: 2, desc: 'Military signature classification MLP', compId: 'task-classifier', color: 'blue', tag: 'Softmax' },
    { num: '10', title: 'NOISE TYPE', tier: 2, desc: `Identified: ${simState.classification}`, compId: 'task-classifier', color: 'amber', tag: simState.classification },
    { num: '11', title: 'VAD', tier: 2, desc: simState.speechEnabled ? 'Speech Detected (Protection Active)' : 'Noise Only (0)', compId: 'vad-module', color: 'green', tag: simState.speechEnabled ? 'ACTIVE' : 'IDLE' },
    { num: '12', title: 'AI SUPERVISOR', tier: 2, desc: `FSM State: ${simState.supervisorState}`, compId: 'adaptive-supervisor', color: 'blue', tag: 'Controller' },

    // TIER 3: HYBRID ANC & ACOUSTIC CANCELLATION (13 - 16)
    { num: '13', title: 'ANC ALGORITHM', tier: 3, desc: `${simState.selectedAlgorithm} W(z)`, compId: 'fxlms-anc', color: 'cyan', tag: `μ=${simState.stepSizeMu.toFixed(3)}` },
    { num: '14', title: 'ANTI-NOISE', tier: 3, desc: 'Phase-inverted wave -y[n] generated', compId: 'fxlms-anc', color: 'cyan', tag: '-y(t) wave' },
    { num: '15', title: 'SPEAKER', tier: 3, desc: 'Class-D amp drives 40mm transducer', compId: 'ear-speaker', color: 'green', tag: '108 dB/mW' },
    { num: '16', title: 'ACOUSTIC PATH', tier: 3, desc: 'Ear canal destructive superposition S(z)', compId: 'ear-speaker', color: 'green', tag: 'Residual < -18dB' },

    // TIER 4: CLOSED-LOOP FEEDBACK & COEFFICIENT RE-ESTIMATION (17 - 19)
    { num: '17', title: 'ERROR MIC', tier: 4, desc: 'Residual error acoustic sensor in ear', compId: 'error-mic', color: 'cyan', tag: 'e(t) Transducer' },
    { num: '18', title: 'RESIDUAL ERROR', tier: 4, desc: 'e[n] = d[n] - y[n] + s[n]', compId: 'error-mic', color: 'cyan', tag: 'e[n] stream' },
    { num: '19', title: 'ADAPTIVE UPDATE', tier: 4, desc: 'w[n+1] = w[n] + μ·e·x\' weight update', compId: 'fxlms-anc', color: 'cyan', tag: '⟲ Closed Loop' }
  ];

  // Automated Signal Packet Tracer Engine
  useEffect(() => {
    if (!isTracing) return;
    const interval = setInterval(() => {
      setTracedStep((prev) => {
        if (prev >= workflowSteps.length - 1) {
          setIsTracing(false);
          return -1;
        }
        return prev + 1;
      });
    }, 180);
    return () => clearInterval(interval);
  }, [isTracing, workflowSteps.length]);

  const handleStartTrace = () => {
    setTracedStep(0);
    setIsTracing(true);
  };

  const handleStopTrace = () => {
    setIsTracing(false);
    setTracedStep(-1);
  };

  const handleStepClick = (stepIndex: number, compId: string) => {
    setActiveStep(stepIndex);
    const comp = ARCHITECTURE_COMPONENTS[compId];
    if (comp) onSelectComponent(comp);
  };

  const getColorVar = (color: string) => {
    switch (color) {
      case 'green': return 'var(--signal-green)';
      case 'blue': return 'var(--signal-blue)';
      case 'amber': return 'var(--signal-amber)';
      default: return 'var(--signal-cyan)';
    }
  };

  return (
    <section id="workflow" className="section-shell">
      <div className="section-header">
        <div className="section-num">
          <Activity size={14} />
          <span>SECTION 02 // COMPLETE WORKFLOW</span>
        </div>
        <h2 className="section-title">END-TO-END 19-STAGE MASTER TECHNICAL WORKFLOW</h2>
        <p className="section-desc">
          Rigorous, grid-aligned signal progression tracing physical acoustic pressure waves through 16kHz ADC sampling,
          YAMNet neural embeddings, AI supervisory control, hybrid FxLMS adaptive cancellation, and closed-loop feedback.
        </p>
      </div>

      {/* Main Workflow Architecture Container */}
      <div
        className="tech-card"
        style={{
          padding: '24px',
          background: 'var(--bg-surface-sunken)',
          border: '1px solid var(--border-default)',
          overflowX: 'auto'
        }}
      >
        {/* Top Control & Diagnostic Toolbar */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '16px',
            marginBottom: '24px',
            paddingBottom: '16px',
            borderBottom: '1px solid var(--border-subtle)'
          }}
        >
          {/* Left: View Mode Toggles */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="font-mono text-cyan" style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '0.04em' }}>
              WORKFLOW TOPOLOGY:
            </span>
            <button
              onClick={() => setViewMode('matrix')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 12px',
                background: viewMode === 'matrix' ? 'var(--bg-surface-elevated)' : 'transparent',
                border: `1px solid ${viewMode === 'matrix' ? 'var(--signal-cyan)' : 'var(--border-default)'}`,
                color: viewMode === 'matrix' ? 'var(--signal-cyan)' : 'var(--text-muted)',
                borderRadius: '3px',
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                cursor: 'pointer'
              }}
            >
              <LayoutGrid size={12} />
              <span>SYSTEM MATRIX (GRID)</span>
            </button>
            <button
              onClick={() => setViewMode('linear')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 12px',
                background: viewMode === 'linear' ? 'var(--bg-surface-elevated)' : 'transparent',
                border: `1px solid ${viewMode === 'linear' ? 'var(--signal-cyan)' : 'var(--border-default)'}`,
                color: viewMode === 'linear' ? 'var(--signal-cyan)' : 'var(--text-muted)',
                borderRadius: '3px',
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                cursor: 'pointer'
              }}
            >
              <AlignJustify size={12} />
              <span>LINEAR TAPE</span>
            </button>
          </div>

          {/* Right: Live Signal Packet Tracer */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              onClick={isTracing ? handleStopTrace : handleStartTrace}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 14px',
                background: isTracing ? '#281313' : 'var(--bg-military-tint)',
                border: `1px solid ${isTracing ? 'var(--signal-amber)' : 'var(--signal-green)'}`,
                color: isTracing ? 'var(--signal-amber)' : 'var(--signal-green)',
                borderRadius: '3px',
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              {isTracing ? <RotateCcw size={12} /> : <Play size={12} />}
              <span>{isTracing ? 'HALT SIGNAL TRACER' : 'TRACE SIGNAL PACKET'}</span>
            </button>

            {tracedStep >= 0 && (
              <span className="font-mono text-cyan" style={{ fontSize: '11px', padding: '4px 8px', background: 'var(--bg-surface)', border: '1px solid var(--border-highlight)', borderRadius: '2px' }}>
                PROPAGATING: STEP {workflowSteps[tracedStep]?.num} // {workflowSteps[tracedStep]?.title}
              </span>
            )}

            <div style={{ display: 'flex', gap: '6px' }}>
              <span className="badge badge-target">TARGET LATENCY &lt; 15.0 ms</span>
              <span className="badge badge-measured">FRAME HOP: 5.0 ms</span>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* VIEW MODE A: SYSTEM MATRIX VIEW (PERFECTLY ALIGNED GRID & TIERS)          */}
        {/* ========================================================================= */}
        {viewMode === 'matrix' ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* TIER 1: INGESTION & DSP PREPROCESSING */}
            <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-default)', borderRadius: '4px', padding: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className="font-mono text-cyan" style={{ fontSize: '11px', fontWeight: 800 }}>
                    TIER 01 // ACOUSTIC INGESTION, DISCRETIZATION &amp; STFT DECOMPOSITION
                  </span>
                  <span className="badge badge-measured">STEPS 01 - 07</span>
                </div>
                <span className="font-mono text-muted" style={{ fontSize: '10px' }}>I2S 16kHz &bull; 512-PT HANN WINDOW</span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '10px' }}>
                {workflowSteps.slice(0, 7).map((step, idx) => {
                  const isCurrent = tracedStep === idx;
                  const isHovered = activeStep === idx;
                  const borderColor = getColorVar(step.color);

                  return (
                    <div
                      key={step.num}
                      onClick={() => handleStepClick(idx, step.compId)}
                      style={{
                        background: isCurrent ? 'var(--bg-surface-elevated)' : 'var(--bg-surface-sunken)',
                        border: `1px solid ${isCurrent || isHovered ? borderColor : 'var(--border-subtle)'}`,
                        borderRadius: '3px',
                        padding: '10px',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease',
                        boxShadow: isCurrent ? `0 0 12px ${borderColor}44` : 'none',
                        position: 'relative'
                      }}
                      onMouseEnter={() => setActiveStep(idx)}
                      onMouseLeave={() => setActiveStep(null)}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                        <span className="font-mono" style={{ fontSize: '10px', color: borderColor, fontWeight: 800 }}>
                          {step.num}
                        </span>
                        <span className="font-mono text-muted" style={{ fontSize: '8px' }}>{step.tag}</span>
                      </div>
                      <div style={{ fontSize: '11px', fontWeight: 800, color: 'var(--text-heading)', marginBottom: '4px' }}>
                        {step.title}
                      </div>
                      <div style={{ fontSize: '9.5px', color: 'var(--text-secondary)', lineHeight: 1.35 }}>
                        {step.desc}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* INTER-TIER VECTOR INDICATOR (Tier 1 -> Tier 2) */}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', color: 'var(--signal-blue)', fontSize: '10.5px', fontFamily: 'var(--font-mono)' }}>
              <span>&darr; 64-CHANNEL LOG-MEL SPECTROGRAM TENSORS FORWARDED TO EMBEDDED AI BACKBONE &darr;</span>
            </div>

            {/* TIER 2: EMBEDDED AI INFERENCE & SUPERVISORY CONTROL */}
            <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-default)', borderRadius: '4px', padding: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className="font-mono text-blue" style={{ fontSize: '11px', fontWeight: 800 }}>
                    TIER 02 // EMBEDDED AI INFERENCE, CLASSIFICATION &amp; SUPERVISORY CONTROL
                  </span>
                  <span className="badge badge-measured">STEPS 08 - 12</span>
                </div>
                <span className="font-mono text-muted" style={{ fontSize: '10px' }}>ONNX RUNTIME INT8 &bull; YAMNET BACKBONE</span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px' }}>
                {workflowSteps.slice(7, 12).map((step, idx) => {
                  const actualIdx = idx + 7;
                  const isCurrent = tracedStep === actualIdx;
                  const isHovered = activeStep === actualIdx;
                  const borderColor = getColorVar(step.color);

                  return (
                    <div
                      key={step.num}
                      onClick={() => handleStepClick(actualIdx, step.compId)}
                      style={{
                        background: isCurrent ? 'var(--bg-surface-elevated)' : 'var(--bg-surface-sunken)',
                        border: `1px solid ${isCurrent || isHovered ? borderColor : 'var(--border-subtle)'}`,
                        borderRadius: '3px',
                        padding: '10px',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease',
                        boxShadow: isCurrent ? `0 0 12px ${borderColor}44` : 'none'
                      }}
                      onMouseEnter={() => setActiveStep(actualIdx)}
                      onMouseLeave={() => setActiveStep(null)}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                        <span className="font-mono" style={{ fontSize: '10px', color: borderColor, fontWeight: 800 }}>
                          {step.num}
                        </span>
                        <span className="font-mono text-muted" style={{ fontSize: '8px' }}>{step.tag}</span>
                      </div>
                      <div style={{ fontSize: '11px', fontWeight: 800, color: 'var(--text-heading)', marginBottom: '4px' }}>
                        {step.title}
                      </div>
                      <div style={{ fontSize: '9.5px', color: 'var(--text-secondary)', lineHeight: 1.35 }}>
                        {step.desc}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* INTER-TIER VECTOR INDICATOR (Tier 2 -> Tier 3) */}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', color: 'var(--signal-green)', fontSize: '10.5px', fontFamily: 'var(--font-mono)' }}>
              <span>&darr; CONTROLLER PARAMETERS (ALGORITHM, STEP SIZE μ, SPEECH PROTECTION) SENT TO ANC ENGINE &darr;</span>
            </div>

            {/* TIER 3: HYBRID ANC ALGORITHMS & TRANSDUCER SYNTHESIS */}
            <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-default)', borderRadius: '4px', padding: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className="font-mono text-green" style={{ fontSize: '11px', fontWeight: 800 }}>
                    TIER 03 // HYBRID ANC FILTERING, ANTI-NOISE SYNTHESIS &amp; TRANSDUCER OUTPUT
                  </span>
                  <span className="badge badge-measured">STEPS 13 - 16</span>
                </div>
                <span className="font-mono text-muted" style={{ fontSize: '10px' }}>FxLMS / NLMS &bull; CLASS-D 40mm DRIVER</span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '10px' }}>
                {workflowSteps.slice(12, 16).map((step, idx) => {
                  const actualIdx = idx + 12;
                  const isCurrent = tracedStep === actualIdx;
                  const isHovered = activeStep === actualIdx;
                  const borderColor = getColorVar(step.color);

                  return (
                    <div
                      key={step.num}
                      onClick={() => handleStepClick(actualIdx, step.compId)}
                      style={{
                        background: isCurrent ? 'var(--bg-surface-elevated)' : 'var(--bg-surface-sunken)',
                        border: `1px solid ${isCurrent || isHovered ? borderColor : 'var(--border-subtle)'}`,
                        borderRadius: '3px',
                        padding: '10px',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease',
                        boxShadow: isCurrent ? `0 0 12px ${borderColor}44` : 'none'
                      }}
                      onMouseEnter={() => setActiveStep(actualIdx)}
                      onMouseLeave={() => setActiveStep(null)}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                        <span className="font-mono" style={{ fontSize: '10px', color: borderColor, fontWeight: 800 }}>
                          {step.num}
                        </span>
                        <span className="font-mono text-muted" style={{ fontSize: '8px' }}>{step.tag}</span>
                      </div>
                      <div style={{ fontSize: '11px', fontWeight: 800, color: 'var(--text-heading)', marginBottom: '4px' }}>
                        {step.title}
                      </div>
                      <div style={{ fontSize: '9.5px', color: 'var(--text-secondary)', lineHeight: 1.35 }}>
                        {step.desc}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* INTER-TIER VECTOR INDICATOR (Tier 3 -> Tier 4) */}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', color: 'var(--signal-cyan)', fontSize: '10.5px', fontFamily: 'var(--font-mono)' }}>
              <span>&darr; ACOUSTIC RESIDUAL SAMPLED BY ERROR SENSOR IN LISTENER'S EAR CANAL &darr;</span>
            </div>

            {/* TIER 4: CLOSED-LOOP ERROR FEEDBACK & ADAPTIVE UPDATE WITH LOOPBACK */}
            <div style={{ background: '#09181e', border: '1px solid var(--border-highlight)', borderRadius: '4px', padding: '16px', position: 'relative' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className="font-mono text-cyan" style={{ fontSize: '11px', fontWeight: 800 }}>
                    TIER 04 // CLOSED-LOOP ERROR FEEDBACK &amp; ADAPTIVE COEFFICIENT UPDATE
                  </span>
                  <span className="badge badge-sim">STEPS 17 - 19 // RE-ESTIMATION LOOP</span>
                </div>
                <span className="font-mono text-cyan" style={{ fontSize: '10px', fontWeight: 700 }}>
                  ⟲ CONTINUOUS ADAPTIVE CLOSED-LOOP
                </span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px' }}>
                {workflowSteps.slice(16, 19).map((step, idx) => {
                  const actualIdx = idx + 16;
                  const isCurrent = tracedStep === actualIdx;
                  const isHovered = activeStep === actualIdx;
                  const borderColor = getColorVar(step.color);

                  return (
                    <div
                      key={step.num}
                      onClick={() => handleStepClick(actualIdx, step.compId)}
                      style={{
                        background: isCurrent ? 'var(--bg-surface-elevated)' : 'var(--bg-surface)',
                        border: `1px solid ${isCurrent || isHovered ? borderColor : 'var(--border-default)'}`,
                        borderRadius: '3px',
                        padding: '12px',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease',
                        boxShadow: isCurrent ? `0 0 12px ${borderColor}44` : 'none'
                      }}
                      onMouseEnter={() => setActiveStep(actualIdx)}
                      onMouseLeave={() => setActiveStep(null)}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                        <span className="font-mono" style={{ fontSize: '10px', color: borderColor, fontWeight: 800 }}>
                          {step.num}
                        </span>
                        <span className="font-mono text-cyan" style={{ fontSize: '8.5px', fontWeight: 700 }}>{step.tag}</span>
                      </div>
                      <div style={{ fontSize: '12px', fontWeight: 800, color: 'var(--text-heading)', marginBottom: '4px' }}>
                        {step.title}
                      </div>
                      <div style={{ fontSize: '10px', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                        {step.desc}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Loopback Return Banner */}
              <div
                style={{
                  marginTop: '16px',
                  padding: '10px 14px',
                  background: 'var(--bg-surface-sunken)',
                  border: '1px dashed var(--signal-cyan)',
                  borderRadius: '3px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: '11px',
                  fontFamily: 'var(--font-mono)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--signal-cyan)' }}>
                  <Repeat size={14} className={reducedMotion ? '' : 'spin-slow'} />
                  <span>CLOSED-LOOP RECIRCULATION: Gradient vector w[n+1] returns to STEP 13 (ANC Algorithm) and STEP 12 (Supervisor)</span>
                </div>
                <span className="font-mono text-green" style={{ fontWeight: 800 }}>
                  STEADY-STATE ATTENUATION: {simState.residualAttenuationDb.toFixed(1)} dB
                </span>
              </div>
            </div>
          </div>
        ) : (
          /* ========================================================================= */
          /* VIEW MODE B: CONTINUOUS HORIZONTAL LINEAR TAPE                            */
          /* ========================================================================= */
          <div
            style={{
              display: 'flex',
              alignItems: 'stretch',
              gap: '12px',
              minWidth: '2600px',
              paddingBottom: '16px'
            }}
          >
            {workflowSteps.map((step, idx) => {
              const isCurrent = tracedStep === idx;
              const isHovered = activeStep === idx;
              const borderColor = getColorVar(step.color);

              return (
                <React.Fragment key={step.num}>
                  {/* Workflow Node Card */}
                  <div
                    onClick={() => handleStepClick(idx, step.compId)}
                    style={{
                      flex: '0 0 150px',
                      background: isCurrent ? 'var(--bg-surface-elevated)' : isHovered ? 'var(--bg-surface-elevated)' : 'var(--bg-surface)',
                      border: `1px solid ${isCurrent || isHovered ? borderColor : 'var(--border-default)'}`,
                      borderRadius: '4px',
                      padding: '12px',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      position: 'relative',
                      transition: 'all 0.15s ease',
                      boxShadow: isCurrent ? `0 0 12px ${borderColor}55` : 'none'
                    }}
                    onMouseEnter={() => setActiveStep(idx)}
                    onMouseLeave={() => setActiveStep(null)}
                  >
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                        <span className="font-mono" style={{ fontSize: '11px', color: borderColor, fontWeight: 800 }}>
                          {step.num}
                        </span>
                        <span className="status-dot" style={{ background: borderColor }} />
                      </div>
                      <div style={{ fontSize: '11.5px', fontWeight: 800, color: 'var(--text-heading)', marginBottom: '4px' }}>
                        {step.title}
                      </div>
                      <div style={{ fontSize: '9.5px', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                        {step.desc}
                      </div>
                    </div>

                    <div style={{ marginTop: '12px', paddingTop: '8px', borderTop: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span className="font-mono text-muted" style={{ fontSize: '8.5px' }}>{step.tag}</span>
                      <span className="font-mono text-cyan" style={{ fontSize: '8.5px' }}>INSPECT &rarr;</span>
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
        )}

        {/* Bottom Educational Hint */}
        <div style={{ marginTop: '16px', fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>Click any workflow block to inspect algorithmic formulations, transfer functions, and hardware bindings.</span>
          <span className="text-cyan">19 OF 19 STAGES OPERATIONAL</span>
        </div>
      </div>
    </section>
  );
};
