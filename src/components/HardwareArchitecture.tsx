import React from 'react';
import { ARCHITECTURE_COMPONENTS, ComponentDetail } from '../diagrams/architectureData';
import { Cpu, Zap, Battery, Mic, Volume2, Activity } from 'lucide-react';

interface HardwareArchitectureProps {
  onSelectComponent: (comp: ComponentDetail) => void;
  reducedMotion: boolean;
}

export const HardwareArchitecture: React.FC<HardwareArchitectureProps> = ({
  onSelectComponent,
  reducedMotion
}) => {
  const selectComp = (id: string) => {
    const c = ARCHITECTURE_COMPONENTS[id];
    if (c) onSelectComponent(c);
  };

  return (
    <section id="hardware" className="section-shell">
      <div className="section-header">
        <div className="section-num">
          <Cpu size={14} />
          <span>SECTION 04 // HARDWARE ARCHITECTURE</span>
        </div>
        <h2 className="section-title">2D HARDWARE TOPOLOGY & POWER DISTRIBUTION</h2>
        <p className="section-desc">
          Physical electronic schematic displaying the multi-microphone sensor array, I2S high-precision audio codec,
          AI-enabled edge SoC (Raspberry Pi 5 / Jetson Nano carrier), isolated power rails, and Class-D acoustic output loop.
        </p>
      </div>

      {/* 2D Schematic Canvas */}
      <div
        className="tech-card"
        style={{
          padding: '24px',
          background: 'var(--bg-surface-sunken)',
          border: '1px solid var(--border-default)',
          overflowX: 'auto'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <span className="font-mono text-cyan" style={{ fontSize: '11px' }}>
            SCHEMATIC DWG: NOISELESS-X6-HW-REV-C
          </span>
          <div style={{ display: 'flex', gap: '8px' }}>
            <span className="badge badge-measured">PROTOTYPE: PI 5 / ALSA HW:1,0</span>
            <span className="badge badge-target">PRODUCTION TARGET: JETSON ORIN / RTOS</span>
          </div>
        </div>

        <svg viewBox="0 0 1080 500" width="100%" height="100%" style={{ minWidth: '820px', display: 'block' }}>
          <defs>
            <marker id="hw-arrow-cyan" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1 L 9 5 L 0 9 z" fill="var(--signal-cyan)" />
            </marker>
            <marker id="hw-arrow-green" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1 L 9 5 L 0 9 z" fill="var(--signal-green)" />
            </marker>
            <marker id="hw-arrow-amber" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1 L 9 5 L 0 9 z" fill="var(--signal-amber)" />
            </marker>
          </defs>

          {/* ==================== 1. MICROPHONE SENSOR ARRAY (x=30) ==================== */}
          <g transform="translate(30, 40)">
            <rect width="180" height="230" rx="4" fill="#081418" stroke="var(--border-default)" strokeWidth="1.5" />
            <text x="12" y="20" fill="var(--signal-cyan)" fontSize="10" fontFamily="var(--font-mono)" fontWeight="700">
              ACOUSTIC SENSOR ARRAY
            </text>

            {/* Primary Mic */}
            <g className="diag-node" onClick={() => selectComp('primary-mic')} transform="translate(10, 32)">
              <rect width="160" height="56" rx="3" fill="var(--bg-surface)" stroke="var(--signal-green)" />
              <text x="8" y="16" fill="var(--signal-green)" fontSize="9" fontFamily="var(--font-mono)">PRIMARY BOOM MIC</text>
              <text x="8" y="32" fill="var(--text-heading)" fontSize="11" fontWeight="700">Speech + Ambient Noise</text>
              <text x="8" y="46" fill="var(--text-muted)" fontSize="8.5">Cardioid | s(t) + v(t)</text>
            </g>

            {/* Reference Mic */}
            <g className="diag-node" onClick={() => selectComp('ref-mic')} transform="translate(10, 96)">
              <rect width="160" height="56" rx="3" fill="var(--bg-surface)" stroke="var(--signal-cyan)" />
              <text x="8" y="16" fill="var(--signal-cyan)" fontSize="9" fontFamily="var(--font-mono)">REFERENCE MIC</text>
              <text x="8" y="32" fill="var(--text-heading)" fontSize="11" fontWeight="700">Ambient Acoustic Ref</text>
              <text x="8" y="46" fill="var(--text-muted)" fontSize="8.5">Omni MEMS | d(t)</text>
            </g>

            {/* Speech Boom Mic backup/aux */}
            <g className="diag-node" onClick={() => selectComp('primary-mic')} transform="translate(10, 160)">
              <rect width="160" height="56" rx="3" fill="var(--bg-surface)" stroke="var(--border-default)" />
              <text x="8" y="16" fill="var(--signal-blue)" fontSize="9" fontFamily="var(--font-mono)">COMMUNICATION MIC</text>
              <text x="8" y="32" fill="var(--text-heading)" fontSize="11" fontWeight="700">Tactical Radio Ingest</text>
              <text x="8" y="46" fill="var(--text-muted)" fontSize="8.5">Direct speech channel</text>
            </g>
          </g>

          {/* Connectors: Microphones -> Multi-Channel Codec (ANALOG AUDIO) */}
          <path
            d="M 210 100 L 260 100"
            fill="none"
            stroke="var(--signal-cyan)"
            strokeWidth="2"
            className={reducedMotion ? '' : 'flow-line-cyan'}
            markerEnd="url(#hw-arrow-cyan)"
          />
          <text x="235" y="90" fill="var(--text-muted)" fontSize="8" fontFamily="var(--font-mono)" textAnchor="middle">Analog Mic</text>

          {/* ==================== 2. MULTI-CHANNEL AUDIO CODEC (x=260) ==================== */}
          <g className="diag-node" onClick={() => selectComp('audio-codec')} transform="translate(260, 50)">
            <rect width="180" height="200" rx="4" fill="#0d1f27" stroke="var(--signal-cyan)" strokeWidth="1.8" />
            <text x="12" y="22" fill="var(--signal-cyan)" fontSize="10" fontFamily="var(--font-mono)" fontWeight="800">
              AUDIO CODEC (I2S ADC/DAC)
            </text>
            <text x="12" y="42" fill="var(--text-heading)" fontSize="12" fontWeight="700">Multi-Channel Sigma-Delta</text>

            <rect x="12" y="55" width="156" height="34" rx="2" fill="var(--bg-surface)" stroke="var(--border-default)" />
            <text x="18" y="70" fill="var(--signal-cyan)" fontSize="9" fontFamily="var(--font-mono)">CH 0/1: ADC 16kHz/16-bit</text>
            <text x="18" y="82" fill="var(--text-muted)" fontSize="8.5">Synchronous Sampling</text>

            <rect x="12" y="98" width="156" height="34" rx="2" fill="var(--bg-surface)" stroke="var(--border-default)" />
            <text x="18" y="113" fill="var(--signal-cyan)" fontSize="9" fontFamily="var(--font-mono)">CH 2: ERROR MIC ADC</text>
            <text x="18" y="125" fill="var(--text-muted)" fontSize="8.5">Residual Feedback Port</text>

            <rect x="12" y="142" width="156" height="34" rx="2" fill="var(--bg-surface)" stroke="var(--border-default)" />
            <text x="18" y="157" fill="var(--signal-green)" fontSize="9" fontFamily="var(--font-mono)">DAC OUT: ANTI-NOISE + SPEECH</text>
            <text x="18" y="169" fill="var(--text-muted)" fontSize="8.5">Low-Jitter Analog Line Out</text>
          </g>

          {/* Connector: Codec -> AI Processor (DIGITAL AUDIO I2S BUS) */}
          <path
            d="M 440 120 L 500 120"
            fill="none"
            stroke="var(--signal-cyan)"
            strokeWidth="2.5"
            className={reducedMotion ? '' : 'flow-line-cyan'}
            markerEnd="url(#hw-arrow-cyan)"
          />
          <text x="470" y="110" fill="var(--signal-cyan)" fontSize="8.5" fontFamily="var(--font-mono)" textAnchor="middle">I2S PCM Bus</text>

          {/* ==================== 3. AI-ENABLED PROCESSOR (SoC) (x=500) ==================== */}
          <g className="diag-node" onClick={() => selectComp('adaptive-supervisor')} transform="translate(500, 40)">
            <rect width="210" height="225" rx="6" fill="#0d1b1a" stroke="var(--signal-green)" strokeWidth="2" />
            <rect width="210" height="24" rx="3" fill="#14302c" />
            <text x="10" y="16" fill="var(--signal-green)" fontSize="10" fontFamily="var(--font-mono)" fontWeight="800">
              AI-ENABLED PROCESSOR (SoC)
            </text>

            <text x="12" y="44" fill="var(--text-heading)" fontSize="12" fontWeight="700">ARM64 Quad-Core / NEON SIMD</text>
            <text x="12" y="58" fill="var(--text-muted)" fontSize="9" fontFamily="var(--font-mono)">
              Raspberry Pi 5 / Jetson Nano Architecture
            </text>

            <g transform="translate(10, 68)">
              <rect width="190" height="30" rx="2" fill="var(--bg-surface)" stroke="var(--border-default)" />
              <text x="8" y="14" fill="var(--signal-cyan)" fontSize="8.5" fontFamily="var(--font-mono)">REAL-TIME DSP ENGINE (C++)</text>
              <text x="8" y="24" fill="var(--text-secondary)" fontSize="8">Dual-mic NLMS / FxLMS (&lt;0.12 ms)</text>
            </g>

            <g transform="translate(10, 104)">
              <rect width="190" height="30" rx="2" fill="var(--bg-surface)" stroke="var(--border-default)" />
              <text x="8" y="14" fill="var(--signal-blue)" fontSize="8.5" fontFamily="var(--font-mono)">ONNX RUNTIME INT8 ENGINE</text>
              <text x="8" y="24" fill="var(--text-secondary)" fontSize="8">YAMNet Embeddings + DeepFilterNet2</text>
            </g>

            <g transform="translate(10, 140)">
              <rect width="190" height="30" rx="2" fill="var(--bg-surface)" stroke="var(--border-default)" />
              <text x="8" y="14" fill="var(--signal-amber)" fontSize="8.5" fontFamily="var(--font-mono)">TINY-IMPULSE CLAMP & HAPTIC</text>
              <text x="8" y="24" fill="var(--text-secondary)" fontSize="8">&lt; 5 μs Transient Detection</text>
            </g>

            <text x="12" y="194" fill="var(--text-muted)" fontSize="8.5" fontFamily="var(--font-mono)">
              OS: 64-bit Real-Time Linux Kernel
            </text>
            <text x="12" y="210" fill="var(--signal-green)" fontSize="8.5" fontFamily="var(--font-mono)">
              CPU LOAD: 15.3% (84.7% Headroom)
            </text>
          </g>

          {/* Connector: Processor -> Codec DAC Out */}
          <path
            d="M 500 170 L 440 170"
            fill="none"
            stroke="var(--signal-green)"
            strokeWidth="2"
            className={reducedMotion ? '' : 'flow-line-reverse'}
            markerEnd="url(#hw-arrow-green)"
          />
          <text x="470" y="164" fill="var(--signal-green)" fontSize="8" fontFamily="var(--font-mono)" textAnchor="middle">I2S DAC Out</text>

          {/* Connector: Codec DAC -> Audio Amplifier */}
          <path
            d="M 350 250 L 350 310 L 760 310 L 760 170 L 780 170"
            fill="none"
            stroke="var(--signal-green)"
            strokeWidth="2"
            className={reducedMotion ? '' : 'flow-line-green'}
            markerEnd="url(#hw-arrow-green)"
          />
          <text x="560" y="304" fill="var(--signal-green)" fontSize="8.5" fontFamily="var(--font-mono)" textAnchor="middle">Analog Line Level Out</text>

          {/* ==================== 4. AUDIO AMPLIFIER (x=780) ==================== */}
          <g className="diag-node" onClick={() => selectComp('audio-amp')} transform="translate(780, 110)">
            <rect width="130" height="90" rx="4" fill="var(--bg-surface)" stroke="var(--signal-green)" strokeWidth="1.5" />
            <text x="8" y="18" fill="var(--signal-green)" fontSize="9" fontFamily="var(--font-mono)" fontWeight="700">AUDIO AMPLIFIER</text>
            <text x="8" y="36" fill="var(--text-heading)" fontSize="11" fontWeight="700">Class-D Power Amp</text>
            <text x="8" y="52" fill="var(--text-secondary)" fontSize="9">92% Power Efficiency</text>
            <text x="8" y="66" fill="var(--text-muted)" fontSize="8.5">THD+N: &lt; 0.05%</text>
            <text x="8" y="80" fill="var(--signal-green)" fontSize="8.5" fontFamily="var(--font-mono)">Current Drive</text>
          </g>

          {/* Connector: Amp -> Speaker */}
          <path
            d="M 910 155 L 945 155"
            fill="none"
            stroke="var(--signal-green)"
            strokeWidth="2"
            className={reducedMotion ? '' : 'flow-line-green'}
            markerEnd="url(#hw-arrow-green)"
          />

          {/* ==================== 5. SPEAKER TRANSDUCER (x=945) ==================== */}
          <g className="diag-node" onClick={() => selectComp('ear-speaker')} transform="translate(945, 100)">
            <rect width="115" height="110" rx="4" fill="#081912" stroke="var(--signal-green)" strokeWidth="1.5" />
            <text x="8" y="18" fill="var(--signal-green)" fontSize="9" fontFamily="var(--font-mono)" fontWeight="700">SPEAKER</text>
            <text x="8" y="36" fill="var(--text-heading)" fontSize="11" fontWeight="700">40mm Driver</text>
            <text x="8" y="52" fill="var(--text-secondary)" fontSize="9">32Ω Neodymium</text>
            <text x="8" y="72" fill="var(--signal-cyan)" fontSize="8.5" fontFamily="var(--font-mono)">-y(t) Anti-Noise</text>
            <text x="8" y="86" fill="var(--signal-green)" fontSize="8.5" fontFamily="var(--font-mono)">+ s(t) Speech</text>
            <text x="8" y="100" fill="var(--text-muted)" fontSize="8">108 dB / mW</text>
          </g>

          {/* ==================== 6. ERROR MICROPHONE (x=880, y=260) ==================== */}
          <g className="diag-node" onClick={() => selectComp('error-mic')} transform="translate(880, 260)">
            <rect width="140" height="75" rx="4" fill="var(--bg-surface)" stroke="var(--signal-cyan)" strokeWidth="1.5" />
            <text x="8" y="18" fill="var(--signal-cyan)" fontSize="9" fontFamily="var(--font-mono)" fontWeight="700">ERROR MICROPHONE</text>
            <text x="8" y="34" fill="var(--text-heading)" fontSize="11" fontWeight="700">Inner Ear Sensor</text>
            <text x="8" y="48" fill="var(--text-muted)" fontSize="8.5">Measures e(t) = d(t) - y(t)</text>
            <text x="8" y="64" fill="var(--signal-cyan)" fontSize="8.5" fontFamily="var(--font-mono)">Analog Error Feedback</text>
          </g>

          {/* Error Mic Feedback Line -> Codec CH2 */}
          <path
            d="M 880 300 L 400 300 L 400 250"
            fill="none"
            stroke="var(--signal-cyan)"
            strokeWidth="2"
            className={reducedMotion ? '' : 'flow-line-reverse'}
            markerEnd="url(#hw-arrow-cyan)"
          />
          <text x="640" y="294" fill="var(--signal-cyan)" fontSize="8.5" fontFamily="var(--font-mono)" textAnchor="middle">
            Analog Error Signal e(t) &rarr; Codec In
          </text>

          {/* ==================== 7. POWER DISTRIBUTION SYSTEM (x=30, y=340) ==================== */}
          <g className="diag-node" onClick={() => selectComp('power-subsystem')} transform="translate(30, 340)">
            <rect width="480" height="130" rx="4" fill="#141108" stroke="var(--signal-amber)" strokeWidth="1.5" />
            <text x="12" y="20" fill="var(--signal-amber)" fontSize="10" fontFamily="var(--font-mono)" fontWeight="800">
              TACTICAL POWER DISTRIBUTION SYSTEM
            </text>

            <g transform="translate(12, 34)">
              <rect width="130" height="75" rx="3" fill="var(--bg-surface)" stroke="var(--border-default)" />
              <text x="8" y="16" fill="var(--signal-amber)" fontSize="8.5" fontFamily="var(--font-mono)">BATTERY BUS</text>
              <text x="8" y="32" fill="var(--text-heading)" fontSize="11" fontWeight="700">7.4V - 14.8V Li-ion</text>
              <text x="8" y="46" fill="var(--text-muted)" fontSize="8.5">Tactical Pack 40Wh</text>
              <text x="8" y="60" fill="var(--signal-amber)" fontSize="8.5" fontFamily="var(--font-mono)">8.5h Runtime</text>
            </g>

            {/* Branch 1: 5V Processor Supply */}
            <g transform="translate(160, 34)">
              <rect width="145" height="75" rx="3" fill="var(--bg-surface)" stroke="var(--signal-green)" />
              <text x="8" y="16" fill="var(--signal-green)" fontSize="8.5" fontFamily="var(--font-mono)">5V PROCESSOR RAIL</text>
              <text x="8" y="32" fill="var(--text-heading)" fontSize="11" fontWeight="700">Buck Regulator</text>
              <text x="8" y="46" fill="var(--text-muted)" fontSize="8.5">5.0V @ 3.0A (Max)</text>
              <text x="8" y="60" fill="var(--signal-green)" fontSize="8.5" fontFamily="var(--font-mono)">&rarr; SoC / CPU Power</text>
            </g>

            {/* Branch 2: 3.3V Audio Supply */}
            <g transform="translate(320, 34)">
              <rect width="145" height="75" rx="3" fill="var(--bg-surface)" stroke="var(--signal-cyan)" />
              <text x="8" y="16" fill="var(--signal-cyan)" fontSize="8.5" fontFamily="var(--font-mono)">3.3V AUDIO RAIL</text>
              <text x="8" y="32" fill="var(--text-heading)" fontSize="11" fontWeight="700">Isolated Ultra-LDO</text>
              <text x="8" y="46" fill="var(--text-muted)" fontSize="8.5">Ripple &lt; 10μV RMS</text>
              <text x="8" y="60" fill="var(--signal-cyan)" fontSize="8.5" fontFamily="var(--font-mono)">&rarr; Codec & Mic Bias</text>
            </g>
          </g>

          {/* Power routing lines */}
          <path d="M 235 440 L 590 440 L 590 265" fill="none" stroke="var(--signal-green)" strokeWidth="1.5" strokeDasharray="4 3" />
          <path d="M 395 440 L 395 250" fill="none" stroke="var(--signal-cyan)" strokeWidth="1.5" strokeDasharray="4 3" />
        </svg>

        {/* Legend */}
        <div style={{ display: 'flex', gap: '20px', marginTop: '14px', borderTop: '1px solid var(--border-subtle)', paddingTop: '10px', fontSize: '10.5px', fontFamily: 'var(--font-mono)' }}>
          <span style={{ color: 'var(--signal-cyan)' }}>■ DIGITAL AUDIO (I2S)</span>
          <span style={{ color: 'var(--signal-green)' }}>■ ANALOG AUDIO / PLAYBACK</span>
          <span style={{ color: 'var(--signal-amber)' }}>■ POWER SYSTEM (5V/3.3V)</span>
          <span style={{ color: 'var(--text-muted)' }}>■ ACOUSTIC RADIATION FIELD</span>
        </div>
      </div>
    </section>
  );
};
