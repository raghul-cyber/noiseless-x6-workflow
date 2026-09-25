import React from 'react';
import { Layers, Terminal, Cpu } from 'lucide-react';

export const TechnologyStack: React.FC = () => {
  const stack = [
    { category: 'EMBEDDED PLATFORM & OS', items: ['Raspberry Pi 5 (Quad-Core A76)', 'NVIDIA Jetson Nano / Orin', 'Debian 12 / Linux 64-bit RT', 'ALSA Linux Audio Subsystem'] },
    { category: 'REAL-TIME DSP & AUDIO', items: ['C++20 SIMD Implementation', 'ARM NEON SIMD Extensions', 'FxLMS / NLMS Adaptive Algorithms', '512-Point STFT / iSTFT OLA', 'I2S / PCM Hardware Interface'] },
    { category: 'AI & DEEP LEARNING', items: ['ONNX Runtime C++ (CPU EP)', 'YAMNet Convolutional Backbone', 'DeepFilterNet2 Residual Enhancer', 'TinyImpulseMLP Transient Detector', 'Dynamic INT8 Quantization'] },
    { category: 'RESEARCH & PROTOTYPING', items: ['Python 3.11', 'PyTorch 2.x', 'NumPy & SciPy Signal Toolkits', 'AudioSet Acoustic Corpus'] },
    { category: 'VISUALIZATION & TELEMETRY', items: ['React 19 & TypeScript', 'Vite 8 Build Infrastructure', 'Canvas 2D Waveform Synthesis', 'Pure Vector SVG Architecture'] }
  ];

  return (
    <section id="technology-stack" className="section-shell">
      <div className="section-header">
        <div className="section-num">
          <Layers size={14} />
          <span>SECTION 20 // TECHNOLOGY STACK</span>
        </div>
        <h2 className="section-title">ENGINEERING TOOLCHAIN & ARCHITECTURAL FOUNDATION</h2>
        <p className="section-desc">
          Core toolkits, hardware substrates, signal processing libraries, and deep learning execution providers
          constituting the NOISELESS-X6 technical environment.
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '16px'
        }}
      >
        {stack.map((cat, idx) => (
          <div
            key={idx}
            className="tech-card"
            style={{
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-default)',
              padding: '16px'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', paddingBottom: '8px', borderBottom: '1px solid var(--border-subtle)' }}>
              <span className="font-mono text-cyan" style={{ fontSize: '10px', fontWeight: 800, letterSpacing: '0.04em' }}>
                {cat.category}
              </span>
              <span className="font-mono text-muted" style={{ fontSize: '9px' }}>0{idx + 1}</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {cat.items.map((tech, tIdx) => (
                <div
                  key={tIdx}
                  style={{
                    background: 'var(--bg-surface-elevated)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '2px',
                    padding: '6px 10px',
                    fontSize: '11.5px',
                    color: 'var(--text-primary)',
                    fontFamily: 'var(--font-mono)'
                  }}
                >
                  &bull; {tech}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
