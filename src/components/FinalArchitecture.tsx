import React from 'react';
import { ARCHITECTURE_COMPONENTS, ComponentDetail } from '../diagrams/architectureData';
import { Map, Layers, Shield, Terminal, ArrowDown, Repeat } from 'lucide-react';

interface FinalArchitectureProps {
  onSelectComponent: (comp: ComponentDetail) => void;
  reducedMotion: boolean;
}

export const FinalArchitecture: React.FC<FinalArchitectureProps> = ({
  onSelectComponent,
  reducedMotion
}) => {
  const selectComp = (id: string) => {
    const c = ARCHITECTURE_COMPONENTS[id];
    if (c) onSelectComponent(c);
  };

  return (
    <section id="architecture" className="section-shell" style={{ borderBottom: 'none' }}>
      <div className="section-header">
        <div className="section-num">
          <Map size={14} />
          <span>SECTION 21 // FINAL SYSTEM ARCHITECTURE</span>
        </div>
        <h2 className="section-title">THE DEFINITIVE NOISELESS-X6 MASTER SYSTEM MAP</h2>
        <p className="section-desc">
          Unified end-to-end architecture unifying the physical defense environment, multi-microphone front-end,
          parallel speech protection pipeline, AI supervisor, hybrid ANC closed loop, and tactical haptic alert branch.
          All signal vectors are strictly orthogonal and grid-aligned to aerospace CAD specifications.
        </p>
      </div>

      <div
        className="tech-card"
        style={{
          background: 'var(--bg-surface-sunken)',
          border: '1px solid var(--border-highlight)',
          padding: '24px',
          overflowX: 'auto'
        }}
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Terminal size={14} className="text-cyan" />
            <span className="font-mono text-cyan" style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '0.05em' }}>
              MASTER SCHEMATIC // NOISELESS-X6-SYSTEM-MAP-V3-ORTHOGONAL
            </span>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <span className="badge badge-measured">ZERO WIRE OVERLAPS</span>
            <span className="badge badge-sim">SYMMETRIC DUAL-PIPELINE TOPOLOGY</span>
          </div>
        </div>

        {/* Master Comprehensive 2D SVG Schematic with Strict Orthogonal Alignment */}
        <svg viewBox="0 0 1140 880" width="100%" height="100%" style={{ minWidth: '920px', display: 'block', userSelect: 'none' }}>
          <defs>
            <marker id="final-arrow-cyan" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1 L 9 5 L 0 9 z" fill="var(--signal-cyan)" />
            </marker>
            <marker id="final-arrow-blue" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1 L 9 5 L 0 9 z" fill="var(--signal-blue)" />
            </marker>
            <marker id="final-arrow-green" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1 L 9 5 L 0 9 z" fill="var(--signal-green)" />
            </marker>
            <marker id="final-arrow-amber" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1 L 9 5 L 0 9 z" fill="var(--signal-amber)" />
            </marker>
          </defs>

          {/* ========================================================================= */}
          {/* LEVEL 1: DEFENCE ACOUSTIC ENVIRONMENT (Combat Acoustic Field)             */}
          {/* Centered at X=570, Width=1040, Height=60 (X=50..1090, Y=30..90)          */}
          {/* ========================================================================= */}
          <g transform="translate(50, 30)">
            <rect width="1040" height="60" rx="4" fill="#081418" stroke="var(--border-default)" strokeWidth="1.5" />
            <text x="520" y="26" fill="var(--text-heading)" fontSize="13" fontWeight="800" textAnchor="middle">
              DEFENCE ENVIRONMENT (COMBAT ACOUSTIC FIELD)
            </text>
            <text x="520" y="46" fill="var(--signal-cyan)" fontSize="11" fontFamily="var(--font-mono)" textAnchor="middle">
              Vehicle Engine Rumble • Helicopter Rotor Modulation • Ballistic Gunfire &amp; Shockwaves
            </text>
          </g>

          {/* Three Downward Vectors to Microphones (Strictly Vertical at X=240, X=570, X=900) */}
          <path d="M 240 90 L 240 140" fill="none" stroke="var(--signal-cyan)" strokeWidth="2" className={reducedMotion ? '' : 'flow-line-cyan'} markerEnd="url(#final-arrow-cyan)" />
          <path d="M 570 90 L 570 140" fill="none" stroke="var(--signal-cyan)" strokeWidth="2" className={reducedMotion ? '' : 'flow-line-cyan'} markerEnd="url(#final-arrow-cyan)" />
          <path d="M 900 90 L 900 140" fill="none" stroke="var(--signal-green)" strokeWidth="2.5" className={reducedMotion ? '' : 'flow-line-green'} markerEnd="url(#final-arrow-green)" />

          {/* ========================================================================= */}
          {/* LEVEL 2: TRI-MICROPHONE SENSING ARRAY (Y=140..210, Height=70)             */}
          {/* Col 1: Ref Mic (Center=240), Col 2: Primary (Center=570), Col 3: Boom (Center=900) */}
          {/* ========================================================================= */}
          {/* 01 // Reference Microphone */}
          <g className="diag-node" onClick={() => selectComp('ref-mic')} transform="translate(140, 140)">
            <rect width="200" height="70" rx="4" fill="var(--bg-surface)" stroke="var(--signal-cyan)" strokeWidth="1.5" />
            <text x="12" y="18" fill="var(--signal-cyan)" fontSize="9" fontFamily="var(--font-mono)" fontWeight="700">01 // REFERENCE MIC</text>
            <text x="12" y="38" fill="var(--text-heading)" fontSize="12" fontWeight="700">Ambient Noise Sensor</text>
            <text x="12" y="54" fill="var(--text-secondary)" fontSize="9.5">d(t) Environmental Noise</text>
          </g>

          {/* 02 // Primary Microphone */}
          <g className="diag-node" onClick={() => selectComp('primary-mic')} transform="translate(470, 140)">
            <rect width="200" height="70" rx="4" fill="var(--bg-surface)" stroke="var(--signal-cyan)" strokeWidth="1.5" />
            <text x="12" y="18" fill="var(--signal-cyan)" fontSize="9" fontFamily="var(--font-mono)" fontWeight="700">02 // PRIMARY MIC</text>
            <text x="12" y="38" fill="var(--text-heading)" fontSize="12" fontWeight="700">Inner Ear Sensor</text>
            <text x="12" y="54" fill="var(--text-secondary)" fontSize="9.5">s(t) + v(t) Combined Field</text>
          </g>

          {/* 03 // Boom Speech Microphone */}
          <g className="diag-node" onClick={() => selectComp('primary-mic')} transform="translate(800, 140)">
            <rect width="200" height="70" rx="4" fill="var(--bg-surface)" stroke="var(--signal-green)" strokeWidth="1.8" />
            <text x="12" y="18" fill="var(--signal-green)" fontSize="9" fontFamily="var(--font-mono)" fontWeight="700">03 // BOOM SPEECH MIC</text>
            <text x="12" y="38" fill="var(--text-heading)" fontSize="12" fontWeight="700">Directional Cardioid</text>
            <text x="12" y="54" fill="var(--signal-green)" fontSize="9.5" fontWeight="600">Tactical Speech s(t)</text>
          </g>

          {/* ========================================================================= */}
          {/* LEVEL 2 -> LEVEL 3 CONNECTORS                                             */}
          {/* ========================================================================= */}
          {/* Ref Mic (X=240) routes cleanly into Preprocessing at X=450 */}
          <path d="M 240 210 L 240 238 L 450 238 L 450 265" fill="none" stroke="var(--signal-cyan)" strokeWidth="2" className={reducedMotion ? '' : 'flow-line-cyan'} markerEnd="url(#final-arrow-cyan)" />
          <text x="345" y="232" fill="var(--signal-cyan)" fontSize="8" fontFamily="var(--font-mono)" textAnchor="middle">d[n] Ref Stream</text>

          {/* Primary Mic (X=570) routes straight down into Preprocessing at X=570 */}
          <path d="M 570 210 L 570 265" fill="none" stroke="var(--signal-cyan)" strokeWidth="2" className={reducedMotion ? '' : 'flow-line-cyan'} markerEnd="url(#final-arrow-cyan)" />
          <text x="585" y="240" fill="var(--signal-cyan)" fontSize="8" fontFamily="var(--font-mono)">s[n]+v[n]</text>

          {/* Parallel Protected Speech Path: Continuous strictly centered vertical axis at X=900 */}
          <path d="M 900 210 L 900 515" fill="none" stroke="var(--signal-green)" strokeWidth="2.5" className={reducedMotion ? '' : 'flow-line-green'} markerEnd="url(#final-arrow-green)" />
          <g transform="translate(800, 342)">
            <rect width="200" height="28" rx="4" fill="#061610" stroke="var(--signal-green)" strokeWidth="1.4" />
            <text x="100" y="18" fill="var(--signal-green)" fontSize="8.5" fontFamily="var(--font-mono)" fontWeight="800" textAnchor="middle">
              PARALLEL PROTECTED SPEECH PATH
            </text>
          </g>

          {/* ========================================================================= */}
          {/* LEVEL 3: AUDIO ACQUISITION & PREPROCESSING (Center=570, Y=265..335)       */}
          {/* ========================================================================= */}
          <g className="diag-node" onClick={() => selectComp('dc-removal')} transform="translate(370, 265)">
            <rect width="400" height="70" rx="4" fill="var(--bg-surface)" stroke="var(--signal-cyan)" strokeWidth="1.6" />
            <text x="14" y="20" fill="var(--signal-cyan)" fontSize="9.5" fontFamily="var(--font-mono)" fontWeight="800">
              AUDIO ACQUISITION &amp; PREPROCESSING
            </text>
            <text x="14" y="40" fill="var(--text-heading)" fontSize="12" fontWeight="700">
              Multi-Channel I2S ADC &bull; 80 Hz DC High-Pass &bull; Hann Windowing
            </text>
            <text x="14" y="56" fill="var(--text-muted)" fontSize="9" fontFamily="var(--font-mono)">
              512-Point STFT &bull; 64-Bin Log-Mel Spectrogram Extraction
            </text>
          </g>

          {/* Connector to AI/ML Classifier (Straight down at X=570) */}
          <path d="M 570 335 L 570 380" fill="none" stroke="var(--signal-blue)" strokeWidth="2.5" className={reducedMotion ? '' : 'flow-line-blue'} markerEnd="url(#final-arrow-blue)" />
          <text x="585" y="360" fill="var(--signal-blue)" fontSize="8.5" fontFamily="var(--font-mono)">Spectral Tensors X(t,f)</text>

          {/* ========================================================================= */}
          {/* LEVEL 4: AI/ML NOISE CLASSIFIER & ADAPTIVE SUPERVISOR (Center=570, Y=380..475) */}
          {/* ========================================================================= */}
          <g className="diag-node" onClick={() => selectComp('adaptive-supervisor')} transform="translate(330, 380)">
            <rect width="480" height="95" rx="5" fill="#0c1d24" stroke="var(--signal-blue)" strokeWidth="2" />
            <text x="14" y="20" fill="var(--signal-blue)" fontSize="10" fontFamily="var(--font-mono)" fontWeight="800">
              AI / ML NOISE CLASSIFIER &amp; ADAPTIVE SUPERVISOR
            </text>
            <text x="14" y="42" fill="var(--text-heading)" fontSize="13" fontWeight="800">
              YAMNet Backbone &bull; Task Classifier &bull; Voice Activity Detector (VAD)
            </text>
            <text x="14" y="62" fill="var(--text-secondary)" fontSize="10">
              Classes: Stationary (FxLMS/NLMS) | Non-Stationary (Adaptive ANC) | Impulsive (Robust Mode)
            </text>
            <text x="14" y="80" fill="var(--signal-green)" fontSize="9.5" fontFamily="var(--font-mono)">
              Dynamic Step-Size μ Controller &bull; Double-Talk Speech Protection Engine
            </text>
          </g>

          {/* Tactical Haptic Alert Vector (Leaves Left Edge of Supervisor at X=330, Y=428) */}
          <path d="M 330 428 L 140 428 L 140 515" fill="none" stroke="var(--signal-amber)" strokeWidth="2" className={reducedMotion ? '' : 'flow-line-amber'} markerEnd="url(#final-arrow-amber)" />
          <g transform="translate(155, 420)">
            <rect width="130" height="18" rx="2" fill="#181308" stroke="var(--signal-amber)" strokeWidth="1" />
            <text x="65" y="13" fill="var(--signal-amber)" fontSize="8" fontFamily="var(--font-mono)" fontWeight="700" textAnchor="middle">
              HAPTIC TRIGGER
            </text>
          </g>

          {/* Tactical Haptic Alert Box (Col 1, Center=140, Y=515..600) */}
          <g className="diag-node" onClick={() => selectComp('impulse-protect')} transform="translate(50, 515)">
            <rect width="180" height="85" rx="4" fill="var(--bg-surface)" stroke="var(--signal-amber)" strokeWidth="1.8" />
            <text x="10" y="20" fill="var(--signal-amber)" fontSize="9" fontFamily="var(--font-mono)" fontWeight="800">TACTICAL HAPTIC ALERT</text>
            <text x="10" y="38" fill="var(--text-heading)" fontSize="11" fontWeight="700">GPIO Vibration Pulse</text>
            <text x="10" y="54" fill="var(--text-muted)" fontSize="8.5">Sub-5μs Transient Detection</text>
            <text x="10" y="70" fill="var(--signal-amber)" fontSize="8.5" fontFamily="var(--font-mono)">Soldier Situational Awareness</text>
          </g>

          {/* Connector to Hybrid ANC Core (Straight down at X=570) */}
          <path d="M 570 475 L 570 515" fill="none" stroke="var(--signal-cyan)" strokeWidth="2.5" className={reducedMotion ? '' : 'flow-line-cyan'} markerEnd="url(#final-arrow-cyan)" />
          <text x="585" y="498" fill="var(--signal-cyan)" fontSize="8.5" fontFamily="var(--font-mono)">Control Vector [μ, Mode]</text>

          {/* ========================================================================= */}
          {/* LEVEL 5: HYBRID ANC CORE & DEEPFILTERNET2 ENHANCER (Y=515..600)           */}
          {/* Col 2: Hybrid ANC (Center=570), Col 3: DeepFilterNet2 (Center=900)        */}
          {/* ========================================================================= */}
          {/* ========================================================================= */}
          {/* LEVEL 5: HYBRID ANC CORE & DEEPFILTERNET2 ENHANCER (Y=515..600)           */}
          {/* Col 1: Haptic (X=50..230), Col 2: Hybrid ANC (X=350..770), Col 3: DFN2 (X=800..1000) */}
          {/* ========================================================================= */}
          {/* Hybrid ANC Core (Center=560, Width=420) */}
          <g className="diag-node" onClick={() => selectComp('fxlms-anc')} transform="translate(350, 515)">
            <rect width="420" height="85" rx="4" fill="#091b22" stroke="var(--signal-cyan)" strokeWidth="2" />
            <text x="14" y="20" fill="var(--signal-cyan)" fontSize="10" fontFamily="var(--font-mono)" fontWeight="800">
              HYBRID ANC CORE (FxLMS / NLMS / ROBUST PATH)
            </text>
            <text x="14" y="42" fill="var(--text-heading)" fontSize="13" fontWeight="800">
              64-Tap Time-Domain FIR W(z) &bull; Secondary Path Filter Ŝ(z)
            </text>
            <text x="14" y="62" fill="var(--signal-green)" fontSize="10" fontFamily="var(--font-mono)">
              Anti-Noise Synthesis: -y[n] = -∑ w_k · x[n-k]
            </text>
          </g>

          {/* DeepFilterNet2 Residual Speech Enhancer (Center=900, Width=200) */}
          <g className="diag-node" onClick={() => selectComp('deepfilter-net')} transform="translate(800, 515)">
            <rect width="200" height="85" rx="4" fill="#081e18" stroke="var(--signal-green)" strokeWidth="2" />
            <text x="12" y="20" fill="var(--signal-green)" fontSize="9.5" fontFamily="var(--font-mono)" fontWeight="800">
              DEEPFILTERNET2 ENHANCER
            </text>
            <text x="12" y="40" fill="var(--text-heading)" fontSize="12" fontWeight="700">
              Residual Noise Suppression
            </text>
            <text x="12" y="58" fill="var(--text-muted)" fontSize="9">
              Speech Intelligibility Mask
            </text>
            <text x="12" y="74" fill="var(--signal-green)" fontSize="8.5" fontFamily="var(--font-mono)">
              Target Latency &lt; 20 ms
            </text>
          </g>

          {/* ========================================================================= */}
          {/* LEVEL 5 -> LEVEL 6 TRANSDUCER CONNECTORS                                  */}
          {/* ========================================================================= */}
          {/* Anti-Noise vector from ANC Core (at X=530) straight down into Transducer at X=530 */}
          <path d="M 530 600 L 530 650" fill="none" stroke="var(--signal-cyan)" strokeWidth="2" className={reducedMotion ? '' : 'flow-line-cyan'} markerEnd="url(#final-arrow-cyan)" />
          <text x="542" y="628" fill="var(--signal-cyan)" fontSize="8.5" fontFamily="var(--font-mono)">-y(t) Anti-Noise</text>

          {/* Enhanced Speech vector from DeepFilterNet2 (at X=900) routes cleanly into Transducer at X=720 */}
          <path d="M 900 600 L 900 625 L 720 625 L 720 650" fill="none" stroke="var(--signal-green)" strokeWidth="2" className={reducedMotion ? '' : 'flow-line-green'} markerEnd="url(#final-arrow-green)" />
          <text x="810" y="618" fill="var(--signal-green)" fontSize="8" fontFamily="var(--font-mono)" textAnchor="middle">+s(t) Enhanced Speech</text>

          {/* ========================================================================= */}
          {/* LEVEL 6: CLASS-D AMP, SPEAKER & ACOUSTIC DESTRUCTIVE SUPERPOSITION        */}
          {/* Centered at X=650, Width=380, Height=75 (X=460..840, Y=650..725)         */}
          {/* ========================================================================= */}
          <g className="diag-node" onClick={() => selectComp('ear-speaker')} transform="translate(460, 650)">
            <rect width="380" height="75" rx="4" fill="var(--bg-surface)" stroke="var(--signal-green)" strokeWidth="2" />
            <text x="14" y="20" fill="var(--signal-green)" fontSize="10" fontFamily="var(--font-mono)" fontWeight="800">
              CLASS-D POWER AMP &amp; 40mm SPEAKER TRANSDUCER
            </text>
            <text x="14" y="40" fill="var(--text-heading)" fontSize="12" fontWeight="700">
              Ear Canal Cavity Acoustic Superposition Plant S(z)
            </text>
            <text x="14" y="58" fill="var(--signal-green)" fontSize="9.5" fontFamily="var(--font-mono)">
              P_residual = P_noise - P_antinoise + P_speech (&gt; 18 dB Attenuation)
            </text>
          </g>

          {/* ========================================================================= */}
          {/* LEVEL 6 -> LEVEL 7 ACOUSTIC RESIDUAL TO ERROR MIC                         */}
          {/* Leaves bottom center of Speaker at (650, 725) -> straight down into Error Mic at (650, 760) */}
          {/* ========================================================================= */}
          <path d="M 650 725 L 650 760" fill="none" stroke="var(--signal-cyan)" strokeWidth="2" className={reducedMotion ? '' : 'flow-line-cyan'} markerEnd="url(#final-arrow-cyan)" />
          <text x="660" y="745" fill="var(--signal-cyan)" fontSize="8.5" fontFamily="var(--font-mono)">e(t) Acoustic Residual</text>

          {/* ========================================================================= */}
          {/* LEVEL 7: CLOSED-LOOP ERROR SENSING & ADAPTIVE UPDATE RECIRCULATION        */}
          {/* Error Mic: X=530..770, Update Engine: X=150..450, Y=760..840              */}
          {/* ========================================================================= */}
          {/* Error Microphone Sensor (Center=650, Width=240, Height=80) */}
          <g className="diag-node" onClick={() => selectComp('error-mic')} transform="translate(530, 760)">
            <rect width="240" height="80" rx="4" fill="var(--bg-surface)" stroke="var(--signal-cyan)" strokeWidth="1.8" />
            <text x="12" y="18" fill="var(--signal-cyan)" fontSize="9.5" fontFamily="var(--font-mono)" fontWeight="800">
              ERROR MICROPHONE SENSOR
            </text>
            <text x="12" y="38" fill="var(--text-heading)" fontSize="12" fontWeight="700">Residual Acoustic Port</text>
            <text x="12" y="54" fill="var(--signal-cyan)" fontSize="8.5" fontFamily="var(--font-mono)">ADC CH2 Ingest &bull; e[n] Digitize</text>
            <text x="12" y="68" fill="var(--text-muted)" fontSize="8">Placed at Eardrum Acoustic Plane</text>
          </g>

          {/* Error Stream e[n] routes horizontally from Error Mic (X=530, Y=800) to Adaptive Update Engine at X=450 */}
          <path d="M 530 800 L 450 800" fill="none" stroke="var(--signal-cyan)" strokeWidth="2" className={reducedMotion ? '' : 'flow-line-cyan'} markerEnd="url(#final-arrow-cyan)" />
          <text x="490" y="792" fill="var(--signal-cyan)" fontSize="8" fontFamily="var(--font-mono)" textAnchor="middle">e[n] ADC Error</text>

          {/* Adaptive Coefficient Update Engine (Center=300, Width=300, Height=80) */}
          <g className="diag-node" onClick={() => selectComp('fxlms-anc')} transform="translate(150, 760)">
            <rect width="300" height="80" rx="4" fill="#0a1920" stroke="var(--signal-cyan)" strokeWidth="2" />
            <text x="12" y="18" fill="var(--signal-cyan)" fontSize="9.5" fontFamily="var(--font-mono)" fontWeight="800">
              ADAPTIVE UPDATE ENGINE (FxLMS / NLMS)
            </text>
            <text x="12" y="38" fill="var(--text-heading)" fontSize="12" fontWeight="700">
              Gradient Descent Coefficient Adaptation
            </text>
            <text x="12" y="54" fill="var(--signal-cyan)" fontSize="9" fontFamily="var(--font-mono)">
              w[n+1] = w[n] + μ &bull; e[n] &bull; x'(n)
            </text>
            <text x="12" y="68" fill="var(--signal-green)" fontSize="8" fontFamily="var(--font-mono)">
              x'(n) = Ŝ(z) * x(n) Filtered-X Synthesis
            </text>
          </g>

          {/* MASTER RECIRCULATION HIGHWAY (Closing the Loop With Zero Obstructions!) */}
          {/* Leaves top of Update Engine at X=280, Y=760 -> routes UP to Y=558 -> turns RIGHT into ANC Core at (350, 558) */}
          <path d="M 280 760 L 280 558 L 350 558" fill="none" stroke="var(--signal-cyan)" strokeWidth="2.5" className={reducedMotion ? '' : 'flow-line-reverse'} markerEnd="url(#final-arrow-cyan)" />
          <g transform="translate(180, 665)">
            <rect width="200" height="22" rx="3" fill="#081820" stroke="var(--signal-cyan)" strokeWidth="1.2" />
            <text x="100" y="15" fill="var(--signal-cyan)" fontSize="8" fontFamily="var(--font-mono)" fontWeight="700" textAnchor="middle">
              ⟲ w[n+1] ADAPTIVE RECIRCULATION
            </text>
          </g>
        </svg>

        {/* Definitive System Legend Bar */}
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
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '12px', height: '3px', background: 'var(--signal-cyan)', display: 'inline-block' }} />
              <span style={{ color: 'var(--text-secondary)' }}>CYAN: Reference Noise, I2S Audio &amp; Closed-Loop Feedback e[n]</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '12px', height: '3px', background: 'var(--signal-blue)', display: 'inline-block' }} />
              <span style={{ color: 'var(--text-secondary)' }}>BLUE: AI Analysis, YAMNet Tensors &amp; Supervisor Control</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '12px', height: '3px', background: 'var(--signal-green)', display: 'inline-block' }} />
              <span style={{ color: 'var(--text-secondary)' }}>GREEN: Protected Parallel Speech &amp; Acoustic Output</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '12px', height: '3px', background: 'var(--signal-amber)', display: 'inline-block' }} />
              <span style={{ color: 'var(--text-secondary)' }}>AMBER: Impulsive Noise Warning &amp; Haptic Branch</span>
            </div>
          </div>

          <div style={{ color: 'var(--text-muted)', fontSize: '10px' }}>
            CLICK ANY BLOCK IN THE MASTER MAP TO INSPECT FIR TRANSFER FUNCTIONS &amp; TELEMETRY
          </div>
        </div>
      </div>
    </section>
  );
};
