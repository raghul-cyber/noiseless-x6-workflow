import React from 'react';
import { ARCHITECTURE_COMPONENTS, ComponentDetail } from '../diagrams/architectureData';
import { Cpu, ArrowRight, Share2, Layers } from 'lucide-react';

interface HardwareSignalPathProps {
  onSelectComponent: (comp: ComponentDetail) => void;
  reducedMotion: boolean;
}

export const HardwareSignalPath: React.FC<HardwareSignalPathProps> = ({
  onSelectComponent,
  reducedMotion
}) => {
  const selectComp = (id: string) => {
    const c = ARCHITECTURE_COMPONENTS[id];
    if (c) onSelectComponent(c);
  };

  const forwardPath = [
    { title: 'MICROPHONES', sub: 'Analog voltages', id: 'ref-mic', tag: 'CH0/1' },
    { title: 'AUDIO CODEC', sub: 'Sigma-Delta ADC', id: 'audio-codec', tag: '16kHz' },
    { title: 'I2S BUS', sub: 'Serial TDM PCM', id: 'audio-codec', tag: 'LRCLK' },
    { title: 'PROCESSOR SoC', sub: 'ARM64 Cortex-A76', id: 'adaptive-supervisor', tag: 'NEON' },
    { title: 'DSP / AI ENGINE', sub: 'FxLMS + ONNX', id: 'fxlms-anc', tag: '<0.12ms' },
    { title: 'DAC OUTPUT', sub: 'Low-jitter analog', id: 'audio-codec', tag: 'Line-out' },
    { title: 'AMPLIFIER', sub: 'Class-D 92% eff', id: 'audio-amp', tag: 'PWM' },
    { title: 'SPEAKER', sub: '40mm acoustic wave', id: 'ear-speaker', tag: '-y(t)' }
  ];

  const feedbackPath = [
    { title: 'SPEAKER OUT', sub: 'Acoustic anti-noise', id: 'ear-speaker', tag: 'Acoustic' },
    { title: 'EAR CANAL CAVITY', sub: 'Destructive null', id: 'ear-speaker', tag: 'Superposition' },
    { title: 'ERROR MIC', sub: 'Residual acoustic e(t)', id: 'error-mic', tag: 'CH2' },
    { title: 'AUDIO CODEC ADC', sub: 'Digitize e[n]', id: 'audio-codec', tag: 'Feedback' },
    { title: 'PROCESSOR SoC', sub: 'Gradient update', id: 'adaptive-supervisor', tag: 'w[n+1]' }
  ];

  return (
    <section id="hardware-path" className="section-shell">
      <div className="section-header">
        <div className="section-num">
          <Share2 size={14} />
          <span>SECTION 15 // HARDWARE SIGNAL PATH & BUS TRAVERSAL</span>
        </div>
        <h2 className="section-title">PHYSICAL SIGNAL FLOW & INTERCONNECT BUS ROUTING</h2>
        <p className="section-desc">
          Low-level packet and bus traversal showing forward acquisition through the ADC, SoC processing core,
          DAC line output, acoustic ear canal radiation, and feedback transduction.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {/* Forward Signal Path */}
        <div className="tech-card" style={{ background: 'var(--bg-surface-sunken)', border: '1px solid var(--border-default)', padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <span className="font-mono text-cyan" style={{ fontSize: '11px', fontWeight: 800 }}>
              FORWARD PATH: INGESTION &rarr; PROCESSING &rarr; ACOUSTIC RADIATION
            </span>
            <span className="badge badge-measured">HARDWARE BUS I2S</span>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))',
              gap: '8px'
            }}
          >
            {forwardPath.map((item, idx) => (
              <div
                key={idx}
                onClick={() => selectComp(item.id)}
                style={{
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border-default)',
                  borderRadius: '3px',
                  padding: '10px 8px',
                  cursor: 'pointer',
                  transition: 'border-color 0.15s ease'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--signal-cyan)')}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border-default)')}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <span className="font-mono text-cyan" style={{ fontSize: '9px', fontWeight: 700 }}>
                    0{idx + 1}
                  </span>
                  <span className="font-mono text-muted" style={{ fontSize: '8px' }}>{item.tag}</span>
                </div>
                <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-heading)' }}>
                  {item.title}
                </div>
                <div className="font-mono text-muted" style={{ fontSize: '8.5px', marginTop: '2px' }}>
                  {item.sub}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Feedback Return Signal Path */}
        <div className="tech-card" style={{ background: 'var(--bg-surface-sunken)', border: '1px solid var(--border-default)', padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <span className="font-mono text-green" style={{ fontSize: '11px', fontWeight: 800 }}>
              FEEDBACK RETURN PATH: RESIDUAL SENSING &rarr; ADAPTIVE UPDATE
            </span>
            <span className="badge badge-measured">CLOSED LOOP RETURN</span>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
              gap: '10px'
            }}
          >
            {feedbackPath.map((item, idx) => (
              <div
                key={idx}
                onClick={() => selectComp(item.id)}
                style={{
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border-default)',
                  borderRadius: '3px',
                  padding: '12px 10px',
                  cursor: 'pointer',
                  transition: 'border-color 0.15s ease'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--signal-green)')}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border-default)')}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <span className="font-mono text-green" style={{ fontSize: '9px', fontWeight: 700 }}>
                    FB-0{idx + 1}
                  </span>
                  <span className="font-mono text-muted" style={{ fontSize: '8px' }}>{item.tag}</span>
                </div>
                <div style={{ fontSize: '11.5px', fontWeight: 700, color: 'var(--text-heading)' }}>
                  {item.title}
                </div>
                <div className="font-mono text-muted" style={{ fontSize: '9px', marginTop: '2px' }}>
                  {item.sub}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
