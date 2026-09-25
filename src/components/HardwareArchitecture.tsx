import React from 'react';
import { ARCHITECTURE_COMPONENTS, ComponentDetail } from '../diagrams/architectureData';
import { Cpu, Zap, Battery, Mic, Volume2, Activity, ShieldAlert, CheckCircle2 } from 'lucide-react';

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
        <h2 className="section-title">2D HARDWARE SCHEMATIC & POWER DISTRIBUTION MATRIX</h2>
        <p className="section-desc">
          Precision electrical interconnect schematic displaying the multi-microphone acoustic sensor array,
          multi-channel sigma-delta audio codec, AI edge processor (Raspberry Pi 5 / Jetson Nano),
          Class-D acoustic transducer path, isolated dual-rail power regulation, and closed-loop error feedback.
        </p>
      </div>

      {/* 2D Schematic Canvas Shell */}
      <div
        className="tech-card"
        style={{
          padding: '24px',
          background: 'var(--bg-surface-sunken)',
          border: '1px solid var(--border-default)',
          overflowX: 'auto'
        }}
      >
        {/* Schematic Drawing Title Bar */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span className="font-mono text-cyan" style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '0.05em' }}>
              SCHEMATIC DWG: NOISELESS-X6-HW-REV-D // MIL-STD-810H CAD MATRIX
            </span>
            <span className="badge badge-sim">ISOLATED SIGNAL HIGHWAYS</span>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <span className="badge badge-measured">PROTOTYPE: PI 5 / ALSA HW:1,0</span>
            <span className="badge badge-target">PRODUCTION TARGET: JETSON ORIN / RTOS</span>
          </div>
        </div>

        {/* Master Precision SVG Schematic */}
        <svg viewBox="0 0 1160 620" width="100%" height="100%" style={{ minWidth: '920px', display: 'block', userSelect: 'none' }}>
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
            <marker id="hw-arrow-blue" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1 L 9 5 L 0 9 z" fill="var(--signal-blue)" />
            </marker>
          </defs>

          {/* ========================================================================= */}
          {/* SECTION 1: ACOUSTIC SENSOR ARRAY (Left Col: X=30..205, Y=45..275)        */}
          {/* ========================================================================= */}
          <g transform="translate(30, 45)">
            <rect width="175" height="230" rx="4" fill="#081418" stroke="var(--border-default)" strokeWidth="1.5" />
            <text x="12" y="20" fill="var(--signal-cyan)" fontSize="10" fontFamily="var(--font-mono)" fontWeight="800">
              ACOUSTIC SENSOR ARRAY
            </text>
            <text x="12" y="32" fill="var(--text-muted)" fontSize="8" fontFamily="var(--font-mono)">
              Front-End Transducers
            </text>

            {/* Primary Boom Mic */}
            <g className="diag-node" onClick={() => selectComp('primary-mic')} transform="translate(10, 38)">
              <rect width="155" height="52" rx="3" fill="var(--bg-surface)" stroke="var(--signal-green)" strokeWidth="1.2" />
              <text x="8" y="15" fill="var(--signal-green)" fontSize="8.5" fontFamily="var(--font-mono)" fontWeight="700">PRIMARY BOOM MIC</text>
              <text x="8" y="30" fill="var(--text-heading)" fontSize="10.5" fontWeight="700">Speech + Ambient Noise</text>
              <text x="8" y="43" fill="var(--text-muted)" fontSize="8">Cardioid | s(t) + v(t)</text>
              {/* Output pin marker */}
              <circle cx="155" cy="26" r="3" fill="var(--signal-green)" />
              <text x="145" y="22" fill="var(--signal-green)" fontSize="7" fontFamily="var(--font-mono)" textAnchor="end">[CH0]</text>
            </g>

            {/* Reference Mic */}
            <g className="diag-node" onClick={() => selectComp('ref-mic')} transform="translate(10, 98)">
              <rect width="155" height="52" rx="3" fill="var(--bg-surface)" stroke="var(--signal-cyan)" strokeWidth="1.2" />
              <text x="8" y="15" fill="var(--signal-cyan)" fontSize="8.5" fontFamily="var(--font-mono)" fontWeight="700">REFERENCE MIC</text>
              <text x="8" y="30" fill="var(--text-heading)" fontSize="10.5" fontWeight="700">Ambient Acoustic Ref</text>
              <text x="8" y="43" fill="var(--text-muted)" fontSize="8">Omni MEMS | d(t)</text>
              {/* Output pin marker */}
              <circle cx="155" cy="26" r="3" fill="var(--signal-cyan)" />
              <text x="145" y="22" fill="var(--signal-cyan)" fontSize="7" fontFamily="var(--font-mono)" textAnchor="end">[CH1]</text>
            </g>

            {/* Communication Mic */}
            <g className="diag-node" onClick={() => selectComp('primary-mic')} transform="translate(10, 158)">
              <rect width="155" height="52" rx="3" fill="var(--bg-surface)" stroke="var(--border-default)" strokeWidth="1.2" />
              <text x="8" y="15" fill="var(--signal-blue)" fontSize="8.5" fontFamily="var(--font-mono)" fontWeight="700">COMMUNICATION MIC</text>
              <text x="8" y="30" fill="var(--text-heading)" fontSize="10.5" fontWeight="700">Tactical Radio Ingest</text>
              <text x="8" y="43" fill="var(--text-muted)" fontSize="8">Direct speech channel</text>
              {/* Output pin marker */}
              <circle cx="155" cy="26" r="3" fill="var(--signal-blue)" />
              <text x="145" y="22" fill="var(--signal-blue)" fontSize="7" fontFamily="var(--font-mono)" textAnchor="end">[AUX]</text>
            </g>

            {/* Bottom Bias Terminal */}
            <circle cx="87" cy="230" r="3" fill="var(--signal-cyan)" />
            <text x="87" y="224" fill="var(--signal-cyan)" fontSize="7" fontFamily="var(--font-mono)" textAnchor="middle">[MIC_BIAS 3.3V]</text>
          </g>

          {/* ========================================================================= */}
          {/* FORWARD ANALOG MIC LINES -> CODEC ADCs                                    */}
          {/* ========================================================================= */}
          {/* Line 1: Primary Mic -> Codec CH0 */}
          <path
            d="M 195 109 L 260 109"
            fill="none"
            stroke="var(--signal-green)"
            strokeWidth="1.8"
            className={reducedMotion ? '' : 'flow-line-green'}
            markerEnd="url(#hw-arrow-green)"
          />
          <text x="227" y="103" fill="var(--signal-green)" fontSize="7.5" fontFamily="var(--font-mono)" textAnchor="middle">s(t)+v(t)</text>

          {/* Line 2: Reference Mic -> Codec CH1 */}
          <path
            d="M 195 169 L 225 169 L 225 125 L 260 125"
            fill="none"
            stroke="var(--signal-cyan)"
            strokeWidth="1.8"
            className={reducedMotion ? '' : 'flow-line-cyan'}
            markerEnd="url(#hw-arrow-cyan)"
          />
          <text x="215" y="163" fill="var(--signal-cyan)" fontSize="7.5" fontFamily="var(--font-mono)" textAnchor="end">d(t) Ref</text>

          {/* ========================================================================= */}
          {/* SECTION 2: AUDIO CODEC (I2S ADC/DAC) (Col 2: X=260..445, Y=45..275)      */}
          {/* ========================================================================= */}
          <g className="diag-node" onClick={() => selectComp('audio-codec')} transform="translate(260, 45)">
            <rect width="185" height="230" rx="4" fill="#0b1a22" stroke="var(--signal-cyan)" strokeWidth="1.8" />
            <text x="12" y="20" fill="var(--signal-cyan)" fontSize="10" fontFamily="var(--font-mono)" fontWeight="800">
              AUDIO CODEC (I2S ADC/DAC)
            </text>
            <text x="12" y="32" fill="var(--text-heading)" fontSize="11" fontWeight="700">
              Multi-Channel Sigma-Delta
            </text>

            {/* Block 1: CH 0/1 ADCs */}
            <g transform="translate(10, 38)">
              <rect width="165" height="52" rx="2" fill="var(--bg-surface)" stroke="var(--border-default)" />
              <text x="8" y="15" fill="var(--signal-cyan)" fontSize="8.5" fontFamily="var(--font-mono)" fontWeight="700">CH 0/1: MIC ADCs (16kHz/16-bit)</text>
              <text x="8" y="29" fill="var(--text-secondary)" fontSize="8.5">Synchronous Sampling &bull; 98 dB SNR</text>
              <text x="8" y="42" fill="var(--text-muted)" fontSize="8">Anti-Aliasing Sinc5 Filter</text>
              {/* Terminals */}
              <circle cx="0" cy="26" r="3" fill="var(--signal-green)" />
              <circle cx="0" cy="42" r="3" fill="var(--signal-cyan)" />
              <text x="6" y="29" fill="var(--signal-green)" fontSize="6.5" fontFamily="var(--font-mono)">CH0</text>
              <text x="6" y="45" fill="var(--signal-cyan)" fontSize="6.5" fontFamily="var(--font-mono)">CH1</text>
              <circle cx="165" cy="26" r="3" fill="var(--signal-cyan)" />
              <text x="155" y="22" fill="var(--signal-cyan)" fontSize="7" fontFamily="var(--font-mono)" textAnchor="end">[I2S_TX]</text>
            </g>

            {/* Block 2: DAC OUT: ANTI-NOISE + SPEECH */}
            <g transform="translate(10, 98)">
              <rect width="165" height="52" rx="2" fill="var(--bg-surface)" stroke="var(--signal-green)" strokeWidth="1.2" />
              <text x="8" y="15" fill="var(--signal-green)" fontSize="8.5" fontFamily="var(--font-mono)" fontWeight="700">DAC OUT: ANTI-NOISE + SPEECH</text>
              <text x="8" y="29" fill="var(--text-secondary)" fontSize="8.5">Low-Jitter Line-Level Reconstruction</text>
              <text x="8" y="42" fill="var(--signal-green)" fontSize="8" fontFamily="var(--font-mono)">-y(t) Anti-Noise + s(t) Speech</text>
              {/* Terminals */}
              <circle cx="165" cy="37" r="3" fill="var(--signal-green)" />
              <text x="155" y="33" fill="var(--signal-green)" fontSize="7" fontFamily="var(--font-mono)" textAnchor="end">[I2S_RX]</text>
              <circle cx="165" cy="49" r="3" fill="var(--signal-green)" />
              <text x="155" y="46" fill="var(--signal-green)" fontSize="6.5" fontFamily="var(--font-mono)" textAnchor="end">[AOUT+]</text>
            </g>

            {/* Block 3: CH 2 ERROR MIC ADC */}
            <g transform="translate(10, 158)">
              <rect width="165" height="52" rx="2" fill="var(--bg-surface)" stroke="var(--border-default)" />
              <text x="8" y="15" fill="var(--signal-cyan)" fontSize="8.5" fontFamily="var(--font-mono)" fontWeight="700">CH 2: ERROR MIC ADC</text>
              <text x="8" y="29" fill="var(--text-secondary)" fontSize="8.5">Residual Acoustic Feedback Port</text>
              <text x="8" y="42" fill="var(--text-muted)" fontSize="8">Low-Latency PGA (+18 dB)</text>
              {/* Internal Terminal */}
              <circle cx="130" cy="52" r="3" fill="var(--signal-cyan)" />
              <text x="130" y="47" fill="var(--signal-cyan)" fontSize="7" fontFamily="var(--font-mono)" textAnchor="middle">[ERR_IN]</text>
            </g>

            {/* Internal trace from [ERR_IN] to bottom border */}
            <line x1="140" y1="210" x2="140" y2="230" stroke="var(--signal-cyan)" strokeWidth="1.5" strokeDasharray="3 2" />

            {/* Right Border Terminal for AOUT+ */}
            <circle cx="185" cy="147" r="3" fill="var(--signal-green)" />

            {/* Bottom Terminals */}
            <circle cx="35" cy="230" r="3" fill="var(--signal-cyan)" />
            <text x="35" y="224" fill="var(--signal-cyan)" fontSize="7" fontFamily="var(--font-mono)" textAnchor="middle">[3V3_VDD]</text>

            <circle cx="140" cy="230" r="3.5" fill="var(--signal-cyan)" />
            <text x="140" y="224" fill="var(--signal-cyan)" fontSize="7" fontFamily="var(--font-mono)" textAnchor="middle">[ERR_CH2]</text>
          </g>

          {/* ========================================================================= */}
          {/* DIGITAL AUDIO I2S BUS INTERCONNECT (Codec <-> SoC)                        */}
          {/* ========================================================================= */}
          {/* Bus 1 (Forward ADC stream to SoC): Y=109 */}
          <path
            d="M 445 109 L 510 109"
            fill="none"
            stroke="var(--signal-cyan)"
            strokeWidth="2.5"
            className={reducedMotion ? '' : 'flow-line-cyan'}
            markerEnd="url(#hw-arrow-cyan)"
          />
          <text x="477" y="100" fill="var(--signal-cyan)" fontSize="8" fontFamily="var(--font-mono)" textAnchor="middle">I2S PCM Bus</text>

          {/* Bus 2 (Reverse DAC stream from SoC): Y=180 */}
          <path
            d="M 510 180 L 445 180"
            fill="none"
            stroke="var(--signal-green)"
            strokeWidth="2.5"
            className={reducedMotion ? '' : 'flow-line-reverse'}
            markerEnd="url(#hw-arrow-green)"
          />
          <text x="477" y="172" fill="var(--signal-green)" fontSize="8" fontFamily="var(--font-mono)" textAnchor="middle">I2S DAC Out</text>

          {/* ========================================================================= */}
          {/* SECTION 3: AI-ENABLED PROCESSOR (SoC) (Col 3: X=510..735, Y=45..275)      */}
          {/* ========================================================================= */}
          <g className="diag-node" onClick={() => selectComp('adaptive-supervisor')} transform="translate(510, 45)">
            <rect width="225" height="230" rx="5" fill="#0d1b19" stroke="var(--signal-green)" strokeWidth="2" />
            <rect width="225" height="22" rx="4" fill="#13332c" />
            <text x="12" y="15" fill="var(--signal-green)" fontSize="10" fontFamily="var(--font-mono)" fontWeight="800">
              AI-ENABLED PROCESSOR (SoC)
            </text>

            <text x="12" y="38" fill="var(--text-heading)" fontSize="11" fontWeight="700">ARM64 Quad-Core / NEON SIMD</text>
            <text x="12" y="50" fill="var(--text-muted)" fontSize="8" fontFamily="var(--font-mono)">Raspberry Pi 5 / Jetson Nano Architecture</text>

            {/* Sub-engine 1: C++ DSP */}
            <g transform="translate(10, 56)">
              <rect width="205" height="34" rx="2" fill="var(--bg-surface)" stroke="var(--border-default)" />
              <text x="8" y="14" fill="var(--signal-cyan)" fontSize="8" fontFamily="var(--font-mono)" fontWeight="700">REAL-TIME DSP ENGINE (C++)</text>
              <text x="8" y="26" fill="var(--text-secondary)" fontSize="8">Dual-mic NLMS / FxLMS (&lt;0.12 ms)</text>
            </g>

            {/* Sub-engine 2: ONNX INT8 */}
            <g transform="translate(10, 96)">
              <rect width="205" height="34" rx="2" fill="var(--bg-surface)" stroke="var(--border-default)" />
              <text x="8" y="14" fill="var(--signal-blue)" fontSize="8" fontFamily="var(--font-mono)" fontWeight="700">ONNX RUNTIME INT8 ENGINE</text>
              <text x="8" y="26" fill="var(--text-secondary)" fontSize="8">YAMNet Embeddings + DeepFilterNet2</text>
            </g>

            {/* Sub-engine 3: Impulse Clamp & Haptic */}
            <g transform="translate(10, 136)">
              <rect width="205" height="34" rx="2" fill="var(--bg-surface)" stroke="var(--border-default)" />
              <text x="8" y="14" fill="var(--signal-amber)" fontSize="8" fontFamily="var(--font-mono)" fontWeight="700">TINY-IMPULSE CLAMP & HAPTIC</text>
              <text x="8" y="26" fill="var(--text-secondary)" fontSize="8">&lt; 5 μs Transient Detection & Alert</text>
            </g>

            {/* Operating System & Telemetry */}
            <text x="12" y="186" fill="var(--text-muted)" fontSize="8" fontFamily="var(--font-mono)">
              OS: 64-bit Real-Time Linux Kernel (PREEMPT_RT)
            </text>
            <text x="12" y="200" fill="var(--signal-green)" fontSize="8.5" fontFamily="var(--font-mono)" fontWeight="700">
              CPU LOAD: 15.3% (84.7% Headroom)
            </text>

            {/* Terminals */}
            <circle cx="0" cy="64" r="3" fill="var(--signal-cyan)" />
            <circle cx="0" cy="135" r="3" fill="var(--signal-green)" />
            <circle cx="142" cy="230" r="3" fill="var(--signal-amber)" />
            <text x="142" y="224" fill="var(--signal-amber)" fontSize="7" fontFamily="var(--font-mono)" textAnchor="middle">[5V0_VCC]</text>
          </g>

          {/* ========================================================================= */}
          {/* SECTION 4: AUDIO AMPLIFIER (Col 4: X=790..930, Y=85..235)                 */}
          {/* ========================================================================= */}
          <g className="diag-node" onClick={() => selectComp('audio-amp')} transform="translate(790, 85)">
            <rect width="140" height="150" rx="4" fill="var(--bg-surface)" stroke="var(--signal-green)" strokeWidth="1.6" />
            <text x="10" y="20" fill="var(--signal-green)" fontSize="9.5" fontFamily="var(--font-mono)" fontWeight="800">AUDIO AMPLIFIER</text>
            <text x="10" y="38" fill="var(--text-heading)" fontSize="11" fontWeight="700">Class-D Power Amp</text>

            <rect x="10" y="48" width="120" height="66" rx="2" fill="#081611" stroke="var(--border-subtle)" />
            <text x="16" y="64" fill="var(--text-secondary)" fontSize="8.5">92% Power Efficiency</text>
            <text x="16" y="80" fill="var(--text-muted)" fontSize="8">THD+N: &lt; 0.05%</text>
            <text x="16" y="96" fill="var(--signal-green)" fontSize="8" fontFamily="var(--font-mono)">Current Drive 1.2W</text>

            <text x="10" y="132" fill="var(--signal-green)" fontSize="8" fontFamily="var(--font-mono)">Low-Z Analog Out</text>

            {/* Input / Output Terminals */}
            <circle cx="0" cy="75" r="3" fill="var(--signal-green)" />
            <text x="8" y="70" fill="var(--signal-green)" fontSize="7" fontFamily="var(--font-mono)">[LINE_IN]</text>
            <circle cx="140" cy="75" r="3" fill="var(--signal-green)" />
            <text x="132" y="70" fill="var(--signal-green)" fontSize="7" fontFamily="var(--font-mono)" textAnchor="end">[SPK_OUT]</text>
          </g>

          {/* ========================================================================= */}
          {/* SECTION 5: SPEAKER TRANSDUCER (Col 5: X=970..1105, Y=85..235)             */}
          {/* ========================================================================= */}
          <g className="diag-node" onClick={() => selectComp('ear-speaker')} transform="translate(970, 85)">
            <rect width="135" height="150" rx="4" fill="#081813" stroke="var(--signal-green)" strokeWidth="1.8" />
            <text x="10" y="20" fill="var(--signal-green)" fontSize="9.5" fontFamily="var(--font-mono)" fontWeight="800">SPEAKER</text>
            <text x="10" y="38" fill="var(--text-heading)" fontSize="11" fontWeight="700">40mm Driver</text>

            <rect x="10" y="48" width="115" height="66" rx="2" fill="var(--bg-surface)" stroke="var(--border-subtle)" />
            <text x="16" y="64" fill="var(--text-secondary)" fontSize="8.5">32Ω Neodymium</text>
            <text x="16" y="80" fill="var(--signal-cyan)" fontSize="8" fontFamily="var(--font-mono)">-y(t) Anti-Noise</text>
            <text x="16" y="96" fill="var(--signal-green)" fontSize="8" fontFamily="var(--font-mono)">+ s(t) Speech</text>

            <text x="10" y="132" fill="var(--text-muted)" fontSize="8" fontFamily="var(--font-mono)">108 dB / mW Sens</text>

            {/* Input terminal */}
            <circle cx="0" cy="75" r="3" fill="var(--signal-green)" />
            <text x="8" y="70" fill="var(--signal-green)" fontSize="7" fontFamily="var(--font-mono)">[DRV_IN]</text>
          </g>

          {/* Direct Amp -> Speaker line (Y=160) */}
          <path
            d="M 930 160 L 970 160"
            fill="none"
            stroke="var(--signal-green)"
            strokeWidth="2.5"
            className={reducedMotion ? '' : 'flow-line-green'}
            markerEnd="url(#hw-arrow-green)"
          />
          <text x="950" y="152" fill="var(--signal-green)" fontSize="7.5" fontFamily="var(--font-mono)" textAnchor="middle">Analog</text>

          {/* ========================================================================= */}
          {/* HIGHWAY 1: ANALOG LINE LEVEL OUT (Codec DAC -> Audio Amplifier)           */}
          {/* Dedicated Channel at Y = 310 (Completely Clear of Highway 2 at Y=405)     */}
          {/* ========================================================================= */}
          <path
            d="M 445 192 L 475 192 L 475 310 L 760 310 L 760 160 L 790 160"
            fill="none"
            stroke="var(--signal-green)"
            strokeWidth="2"
            className={reducedMotion ? '' : 'flow-line-green'}
            markerEnd="url(#hw-arrow-green)"
          />
          {/* Pill Badge for Highway 1 */}
          <g transform="translate(488, 301)">
            <rect width="150" height="18" rx="3" fill="#081812" stroke="var(--signal-green)" strokeWidth="1" />
            <text x="75" y="13" fill="var(--signal-green)" fontSize="7.5" fontFamily="var(--font-mono)" fontWeight="700" textAnchor="middle">
              ANALOG LINE: -y(t) + s(t)
            </text>
          </g>

          {/* ========================================================================= */}
          {/* ACOUSTIC RADIATION FIELD (Below Speaker, Y=235..295)                      */}
          {/* ========================================================================= */}
          <path d="M 1037 235 L 1037 285" fill="none" stroke="var(--signal-green)" strokeWidth="2" strokeDasharray="4 2" markerEnd="url(#hw-arrow-green)" />
          <path d="M 1022 250 A 20 20 0 0 0 1052 250" fill="none" stroke="var(--signal-cyan)" strokeWidth="1.2" opacity="0.6" />
          <path d="M 1012 265 A 32 32 0 0 0 1062 265" fill="none" stroke="var(--signal-cyan)" strokeWidth="1.2" opacity="0.4" />
          <text x="1037" y="278" fill="var(--text-muted)" fontSize="7.5" fontFamily="var(--font-mono)" textAnchor="middle">
            Acoustic Field
          </text>

          {/* ========================================================================= */}
          {/* SECTION 6: ERROR MICROPHONE (Below Speaker, X=960..1110, Y=305..390)       */}
          {/* ========================================================================= */}
          <g className="diag-node" onClick={() => selectComp('error-mic')} transform="translate(960, 305)">
            <rect width="150" height="85" rx="4" fill="var(--bg-surface)" stroke="var(--signal-cyan)" strokeWidth="1.8" />
            <text x="10" y="18" fill="var(--signal-cyan)" fontSize="9" fontFamily="var(--font-mono)" fontWeight="800">
              ERROR MICROPHONE
            </text>
            <text x="10" y="34" fill="var(--text-heading)" fontSize="11" fontWeight="700">Inner Ear Sensor</text>
            <text x="10" y="50" fill="var(--text-muted)" fontSize="8.5">Measures e(t) = d(t) - y(t)</text>
            <text x="10" y="66" fill="var(--signal-cyan)" fontSize="8" fontFamily="var(--font-mono)">Residual Acoustic Port</text>

            {/* Feedback Out Terminal */}
            <circle cx="0" cy="50" r="3" fill="var(--signal-cyan)" />
            <text x="8" y="46" fill="var(--signal-cyan)" fontSize="7" fontFamily="var(--font-mono)">[ERR_OUT]</text>
          </g>

          {/* ========================================================================= */}
          {/* HIGHWAY 2: ERROR FEEDBACK LINE (Error Mic -> Codec CH2)                   */}
          {/* Dedicated Channel at Y = 405 (95 pixels below Highway 1 at Y=310)         */}
          {/* ========================================================================= */}
          <path
            d="M 960 355 L 935 355 L 935 405 L 400 405 L 400 275"
            fill="none"
            stroke="var(--signal-cyan)"
            strokeWidth="2"
            className={reducedMotion ? '' : 'flow-line-reverse'}
            markerEnd="url(#hw-arrow-cyan)"
          />
          {/* Pill Badge for Highway 2 */}
          <g transform="translate(680, 396)">
            <rect width="210" height="18" rx="3" fill="#07141a" stroke="var(--signal-cyan)" strokeWidth="1" />
            <text x="105" y="13" fill="var(--signal-cyan)" fontSize="8" fontFamily="var(--font-mono)" fontWeight="700" textAnchor="middle">
              ERROR FEEDBACK: e(t) &rarr; CODEC CH2 ADC
            </text>
          </g>

          {/* ========================================================================= */}
          {/* SECTION 7: TACTICAL POWER DISTRIBUTION SYSTEM (X=30..735, Y=460..580)     */}
          {/* ========================================================================= */}
          <g className="diag-node" onClick={() => selectComp('power-subsystem')} transform="translate(30, 460)">
            <rect width="705" height="120" rx="4" fill="#141108" stroke="var(--signal-amber)" strokeWidth="1.8" />
            <text x="14" y="20" fill="var(--signal-amber)" fontSize="10" fontFamily="var(--font-mono)" fontWeight="800">
              TACTICAL POWER DISTRIBUTION SYSTEM // MIL-STD-1275E COMPLIANT
            </text>

            {/* Block 1: Battery Bus */}
            <g transform="translate(12, 32)">
              <rect width="180" height="74" rx="3" fill="var(--bg-surface)" stroke="var(--border-default)" />
              <text x="8" y="16" fill="var(--signal-amber)" fontSize="8.5" fontFamily="var(--font-mono)" fontWeight="700">BATTERY BUS</text>
              <text x="8" y="32" fill="var(--text-heading)" fontSize="11" fontWeight="700">7.4V - 14.8V Li-ion</text>
              <text x="8" y="47" fill="var(--text-muted)" fontSize="8.5">Tactical Pack 40Wh</text>
              <text x="8" y="62" fill="var(--signal-amber)" fontSize="8.5" fontFamily="var(--font-mono)">8.5h Mission Runtime</text>
            </g>

            {/* Block 2: 3.3V Audio Rail (Directly beneath Audio Codec!) */}
            <g transform="translate(210, 32)">
              <rect width="220" height="74" rx="3" fill="var(--bg-surface)" stroke="var(--signal-cyan)" strokeWidth="1.2" />
              <text x="8" y="16" fill="var(--signal-cyan)" fontSize="8.5" fontFamily="var(--font-mono)" fontWeight="700">3.3V AUDIO RAIL</text>
              <text x="8" y="32" fill="var(--text-heading)" fontSize="11" fontWeight="700">Isolated Ultra-LDO</text>
              <text x="8" y="47" fill="var(--text-muted)" fontSize="8.5">Ripple &lt; 10μV RMS &bull; 500mA</text>
              <text x="8" y="62" fill="var(--signal-cyan)" fontSize="8" fontFamily="var(--font-mono)">&rarr; Audio Codec &amp; Mic Bias</text>
              {/* Output pin */}
              <circle cx="55" cy="0" r="3" fill="var(--signal-cyan)" />
              <text x="55" y="-5" fill="var(--signal-cyan)" fontSize="7" fontFamily="var(--font-mono)" textAnchor="middle">[3V3_OUT]</text>
            </g>

            {/* Block 3: 5V Processor Rail (Directly beneath SoC Processor!) */}
            <g transform="translate(450, 32)">
              <rect width="240" height="74" rx="3" fill="var(--bg-surface)" stroke="var(--signal-amber)" strokeWidth="1.2" />
              <text x="8" y="16" fill="var(--signal-amber)" fontSize="8.5" fontFamily="var(--font-mono)" fontWeight="700">5V PROCESSOR RAIL</text>
              <text x="8" y="32" fill="var(--text-heading)" fontSize="11" fontWeight="700">Buck Regulator (Eff: 94%)</text>
              <text x="8" y="47" fill="var(--text-muted)" fontSize="8.5">5.0V @ 3.0A (Max 15W Peak)</text>
              <text x="8" y="62" fill="var(--signal-amber)" fontSize="8" fontFamily="var(--font-mono)">&rarr; ARM64 SoC / CPU Core Power</text>
              {/* Output pin */}
              <circle cx="172" cy="0" r="3" fill="var(--signal-amber)" />
              <text x="172" y="-5" fill="var(--signal-amber)" fontSize="7" fontFamily="var(--font-mono)" textAnchor="middle">[5V0_OUT]</text>
            </g>
          </g>

          {/* ========================================================================= */}
          {/* POWER DISTRIBUTION ROUTING WITH JUMPER BRIDGES                            */}
          {/* ========================================================================= */}
          {/* 3.3V Power Line: from X=295, Y=460 straight up to Codec at Y=275          */}
          {/* Completely clear of Highway 2 (which terminates at X=400, 105px to the right) */}
          <path
            d="M 295 460 L 295 275"
            fill="none"
            stroke="var(--signal-cyan)"
            strokeWidth="1.8"
            strokeDasharray="4 2"
          />
          {/* Branch to Mic Array */}
          <path
            d="M 295 435 L 117 435 L 117 275"
            fill="none"
            stroke="var(--signal-cyan)"
            strokeWidth="1.5"
            strokeDasharray="4 2"
          />
          <text x="295" y="448" fill="var(--signal-cyan)" fontSize="7" fontFamily="var(--font-mono)" textAnchor="middle">+3.3V</text>

          {/* 5.0V Power Line: from X=652, Y=460 straight up to SoC at Y=275            */}
          {/* Crosses Highway 2 (at Y=405) and Highway 1 (at Y=310) with jumper arcs   */}
          <path
            d="M 652 460 L 652 412 A 7 7 0 0 1 652 398 L 652 317 A 7 7 0 0 1 652 303 L 652 275"
            fill="none"
            stroke="var(--signal-amber)"
            strokeWidth="2"
            strokeDasharray="4 2"
          />
          <text x="652" y="448" fill="var(--signal-amber)" fontSize="7" fontFamily="var(--font-mono)" textAnchor="middle">+5.0V VCC</text>
        </svg>

        {/* Electrical Schematic Legend Bar */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '16px',
            marginTop: '16px',
            borderTop: '1px solid var(--border-subtle)',
            paddingTop: '12px',
            fontSize: '11px',
            fontFamily: 'var(--font-mono)'
          }}
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
            <span style={{ color: 'var(--signal-cyan)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '8px', height: '8px', background: 'var(--signal-cyan)', borderRadius: '1px' }} />
              DIGITAL AUDIO (I2S PCM / ADC / DAC)
            </span>
            <span style={{ color: 'var(--signal-green)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '8px', height: '8px', background: 'var(--signal-green)', borderRadius: '1px' }} />
              ANALOG LINE LEVEL &amp; TRANSDUCER DRIVE
            </span>
            <span style={{ color: 'var(--signal-amber)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '8px', height: '8px', background: 'var(--signal-amber)', borderRadius: '1px' }} />
              TACTICAL POWER RAILS (5V / 3.3V)
            </span>
            <span style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '12px', height: '2px', background: 'var(--text-muted)' }} />
              CAD JUMPER BRIDGE (NON-CONTACT CROSSING)
            </span>
          </div>

          <div style={{ color: 'var(--text-muted)', fontSize: '10px' }}>
            CLICK ANY IC BLOCK TO INSPECT ELECTRICAL PINOUT &amp; TRANSFER FUNCTIONS
          </div>
        </div>
      </div>
    </section>
  );
};
