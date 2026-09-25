import React from 'react';
import { ARCHITECTURE_COMPONENTS, ComponentDetail } from '../diagrams/architectureData';
import { Layers, Terminal, ChevronRight } from 'lucide-react';

interface SoftwareArchitectureProps {
  onSelectComponent: (comp: ComponentDetail) => void;
  reducedMotion: boolean;
}

export const SoftwareArchitecture: React.FC<SoftwareArchitectureProps> = ({
  onSelectComponent,
  reducedMotion
}) => {
  const selectComp = (id: string) => {
    const c = ARCHITECTURE_COMPONENTS[id];
    if (c) onSelectComponent(c);
  };

  const softwareGroups = [
    {
      group: 'INPUT LAYER',
      color: 'var(--signal-cyan)',
      items: [
        { id: 'ref-mic', name: 'Reference Mic Channel', tag: 'd[n] Ambient', sub: 'ALSA hw:1,0 (In 1)' },
        { id: 'primary-mic', name: 'Primary Mic Channel', tag: 's[n] + v[n]', sub: 'ALSA hw:1,0 (In 0)' },
        { id: 'primary-mic', name: 'Speech / Boom Mic', tag: 'Near-field Vocal', sub: 'Directional cardioid' }
      ]
    },
    {
      group: 'AUDIO PROCESSING',
      color: 'var(--signal-cyan)',
      items: [
        { id: 'audio-codec', name: 'ADC Demux / Framing', tag: '160 samples (10ms)', sub: 'I2S PCM Driver' },
        { id: 'dc-removal', name: 'DC Removal & Pre-emphasis', tag: '18 Hz High-pass', sub: 'Zero-mean conditioning' },
        { id: 'stft-engine', name: 'Hann Windowing', tag: 'Periodic Hann', sub: 'COLA >100 dB' },
        { id: 'stft-engine', name: 'STFT Spectrogram Engine', tag: '512 FFT (257 bins)', sub: 'ARM NEON SIMD' },
        { id: 'stft-engine', name: 'MFCC & Log-Mel Extractor', tag: '64 Mel Filterbank', sub: 'Feature mapping' }
      ]
    },
    {
      group: 'AI / NEURAL LAYER',
      color: 'var(--signal-blue)',
      items: [
        { id: 'yamnet-ai', name: 'YAMNet / CNN Analyzer', tag: '1024-D Latent', sub: 'ONNX Runtime INT8' },
        { id: 'task-classifier', name: 'Task-Specific Classifier', tag: 'Military Classes', sub: 'Stationary / Dynamic / Impulse' }
      ]
    },
    {
      group: 'DECISION & SUPERVISOR',
      color: 'var(--signal-green)',
      items: [
        { id: 'task-classifier', name: 'Noise Classification State', tag: 'Context Engine', sub: 'Softmax verification' },
        { id: 'vad-module', name: 'Voice Activity Detector (VAD)', tag: 'Dual Criterion', sub: 'Formant energy ratio' },
        { id: 'impulse-protect', name: 'Microsecond Impulse Detector', tag: 'TinyImpulseMLP', sub: '< 5 μs latency' },
        { id: 'adaptive-supervisor', name: 'AI Adaptive Supervisor FSM', tag: '6-State Executive', sub: 'Step size & algorithm select' }
      ]
    },
    {
      group: 'DSP & HYBRID ANC',
      color: 'var(--signal-cyan)',
      items: [
        { id: 'fxlms-anc', name: 'FxLMS Core Filter', tag: '64-Tap W(z)', sub: 'Time-domain convolution' },
        { id: 'fxlms-anc', name: 'NLMS Fast Adaptation', tag: 'Normalized μ', sub: 'Sub-ms tracking' },
        { id: 'fxlms-anc', name: 'Adaptive ANC Mode', tag: 'Dynamic modulation', sub: 'Helicopter / non-stationary' },
        { id: 'impulse-protect', name: 'Robust ANC Path', tag: 'Fast transient clamp', sub: 'Look-ahead limiter' },
        { id: 'fxlms-anc', name: 'Secondary Path Ŝ(z)', tag: 'Acoustic model', sub: 'Transfer compensation' }
      ]
    },
    {
      group: 'OUTPUT & ENHANCEMENT',
      color: 'var(--signal-green)',
      items: [
        { id: 'fxlms-anc', name: 'Anti-Noise Wave Generator', tag: '-y[n] Phase Invert', sub: 'Destructive synthesis' },
        { id: 'deepfilter-net', name: 'DeepFilterNet2 Residual Enhancer', tag: 'Erb-Band Filtering', sub: 'Speech intelligibility' },
        { id: 'ear-speaker', name: 'DAC / Speaker Output', tag: 'ALSA Playback', sub: 'Enhanced clear audio' }
      ]
    },
    {
      group: 'FEEDBACK & ADAPTATION',
      color: 'var(--signal-cyan)',
      items: [
        { id: 'error-mic', name: 'Error Microphone Sensor', tag: 'Ear canal e(t)', sub: 'Residual acoustic probe' },
        { id: 'error-mic', name: 'Residual Error Computation', tag: 'e[n] = d[n] - y[n]', sub: 'Cost function J = E[e²]' },
        { id: 'fxlms-anc', name: 'Adaptive Coefficient Update', tag: 'w[n+1] = w[n] + μ·e·u', sub: 'Closed-loop convergence' }
      ]
    }
  ];

  return (
    <section id="software" className="section-shell">
      <div className="section-header">
        <div className="section-num">
          <Layers size={14} />
          <span>SECTION 03 // SOFTWARE ARCHITECTURE</span>
        </div>
        <h2 className="section-title">MODULAR SOFTWARE SUBSYSTEM HIERARCHY</h2>
        <p className="section-desc">
          Structured separation between ultra-low-latency real-time DSP threads (&lt;0.12 ms), AI classification pipelines (5ms/100ms),
          and supervisory state orchestration.
        </p>
      </div>

      {/* Grid of Subsystem Layers */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '16px'
        }}
      >
        {softwareGroups.map((grp, gIdx) => (
          <div
            key={grp.group}
            className="tech-card"
            style={{
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-default)',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingBottom: '10px',
                  marginBottom: '12px',
                  borderBottom: `1px solid ${grp.color}`,
                  opacity: 0.9
                }}
              >
                <span className="font-mono" style={{ fontSize: '11px', fontWeight: 800, color: grp.color, letterSpacing: '0.06em' }}>
                  {grp.group}
                </span>
                <span className="font-mono text-muted" style={{ fontSize: '10px' }}>0{gIdx + 1}</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {grp.items.map((item, iIdx) => (
                  <div
                    key={iIdx}
                    onClick={() => selectComp(item.id)}
                    style={{
                      background: 'var(--bg-surface-elevated)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: '3px',
                      padding: '8px 10px',
                      cursor: 'pointer',
                      transition: 'border-color 0.15s ease'
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.borderColor = grp.color)}
                    onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border-subtle)')}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-heading)' }}>
                        {item.name}
                      </span>
                      <span className="font-mono" style={{ fontSize: '9.5px', color: grp.color }}>
                        {item.tag}
                      </span>
                    </div>
                    <div className="font-mono text-muted" style={{ fontSize: '9px', marginTop: '2px' }}>
                      {item.sub}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ marginTop: '14px', paddingTop: '8px', borderTop: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="font-mono text-muted" style={{ fontSize: '9px' }}>INTERFACE: MEMORY-MAPPED / IPC</span>
              <span className="font-mono text-cyan" style={{ fontSize: '9px' }}>INSPECT LAYER &rarr;</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
