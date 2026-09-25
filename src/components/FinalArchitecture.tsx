import React from 'react';
import { ARCHITECTURE_COMPONENTS, ComponentDetail } from '../diagrams/architectureData';
import { Map, Layers, Shield, Terminal } from 'lucide-react';

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
        <h2 className="section-title">THE DEFINITIVE NOISELESS-X6 SYSTEM MAP</h2>
        <p className="section-desc">
          Unified end-to-end architecture unifying the physical defense environment, multi-microphone ingestion,
          parallel speech protection pipeline, AI supervisor, hybrid ANC closed loop, and tactical haptic alert branch.
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
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <span className="font-mono text-cyan" style={{ fontSize: '11px', fontWeight: 800 }}>
            MASTER SCHEMATIC // NOISELESS-X6-SYSTEM-MAP-V2
          </span>
          <span className="badge badge-measured">COMPLETE INTEGRATION TOPOLOGY</span>
        </div>

        {/* Master Comprehensive 2D SVG Schematic */}
        <svg viewBox="0 0 1100 800" width="100%" height="100%" style={{ minWidth: '880px', display: 'block' }}>
          <defs>
            <marker id="final-arrow-cyan" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1 L 9 5 L 0 9 z" fill="var(--signal-cyan)" />
            </marker>
            <marker id="final-arrow-blue" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1 L 9 5 L 0 9 z" fill="var(--signal-blue)" />
            </marker>
            <marker id="final-arrow-green" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1 L 9 5 L 0 9 z" fill="var(--signal-green)" />
            </marker>
            <marker id="final-arrow-amber" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1 L 9 5 L 0 9 z" fill="var(--signal-amber)" />
            </marker>
          </defs>

          {/* Level 1: DEFENCE ACOUSTIC ENVIRONMENT (Top) */}
          <g transform="translate(50, 30)">
            <rect width="1000" height="60" rx="4" fill="#081418" stroke="var(--border-default)" strokeWidth="1.5" />
            <text x="500" y="26" fill="var(--text-heading)" fontSize="13" fontWeight="800" textAnchor="middle">
              DEFENCE ENVIRONMENT (COMBAT ACOUSTIC FIELD)
            </text>
            <text x="500" y="46" fill="var(--signal-cyan)" fontSize="11" fontFamily="var(--font-mono)" textAnchor="middle">
              Vehicle Engine Rumble • Helicopter Rotor Wash • Ballistic Gunfire & Explosions
            </text>
          </g>

          {/* Downward Ingestion Vectors */}
          <path d="M 250 90 L 250 140" fill="none" stroke="var(--signal-cyan)" strokeWidth="2" className={reducedMotion ? '' : 'flow-line-cyan'} markerEnd="url(#final-arrow-cyan)" />
          <path d="M 550 90 L 550 140" fill="none" stroke="var(--signal-cyan)" strokeWidth="2" className={reducedMotion ? '' : 'flow-line-cyan'} markerEnd="url(#final-arrow-cyan)" />
          <path d="M 850 90 L 850 140" fill="none" stroke="var(--signal-green)" strokeWidth="2" className={reducedMotion ? '' : 'flow-line-green'} markerEnd="url(#final-arrow-green)" />

          {/* Level 2: TRI-MICROPHONE SENSING ARRAY */}
          <g className="diag-node" onClick={() => selectComp('ref-mic')} transform="translate(160, 140)">
            <rect width="180" height="70" rx="4" fill="var(--bg-surface)" stroke="var(--signal-cyan)" strokeWidth="1.5" />
            <text x="10" y="18" fill="var(--signal-cyan)" fontSize="9" fontFamily="var(--font-mono)">01 // REFERENCE MIC</text>
            <text x="10" y="38" fill="var(--text-heading)" fontSize="12" fontWeight="700">Ambient Sensor</text>
            <text x="10" y="54" fill="var(--text-secondary)" fontSize="9.5">d[n] Noise stream</text>
          </g>

          <g className="diag-node" onClick={() => selectComp('primary-mic')} transform="translate(460, 140)">
            <rect width="180" height="70" rx="4" fill="var(--bg-surface)" stroke="var(--signal-cyan)" strokeWidth="1.5" />
            <text x="10" y="18" fill="var(--signal-cyan)" fontSize="9" fontFamily="var(--font-mono)">02 // PRIMARY MIC</text>
            <text x="10" y="38" fill="var(--text-heading)" fontSize="12" fontWeight="700">Inner Ear Sensor</text>
            <text x="10" y="54" fill="var(--text-secondary)" fontSize="9.5">s[n] + v[n] stream</text>
          </g>

          <g className="diag-node" onClick={() => selectComp('primary-mic')} transform="translate(760, 140)">
            <rect width="180" height="70" rx="4" fill="var(--bg-surface)" stroke="var(--signal-green)" strokeWidth="1.8" />
            <text x="10" y="18" fill="var(--signal-green)" fontSize="9" fontFamily="var(--font-mono)">03 // BOOM SPEECH MIC</text>
            <text x="10" y="38" fill="var(--text-heading)" fontSize="12" fontWeight="700">Directional Cardioid</text>
            <text x="10" y="54" fill="var(--signal-green)" fontSize="9.5">Tactical speech s[n]</text>
          </g>

          {/* Connectors to Hardware Codec & Preprocessing */}
          <path d="M 250 210 L 250 250 L 500 250" fill="none" stroke="var(--signal-cyan)" strokeWidth="2" className={reducedMotion ? '' : 'flow-line-cyan'} />
          <path d="M 550 210 L 550 250" fill="none" stroke="var(--signal-cyan)" strokeWidth="2" className={reducedMotion ? '' : 'flow-line-cyan'} />
          <path d="M 550 250 L 550 270" fill="none" stroke="var(--signal-cyan)" strokeWidth="2" className={reducedMotion ? '' : 'flow-line-cyan'} markerEnd="url(#final-arrow-cyan)" />

          {/* Parallel Speech Vector from Boom Mic directly to Speech Enhancement */}
          <path d="M 850 210 L 850 490" fill="none" stroke="var(--signal-green)" strokeWidth="2.5" className={reducedMotion ? '' : 'flow-line-green'} markerEnd="url(#final-arrow-green)" />
          <text x="860" y="340" fill="var(--signal-green)" fontSize="9" fontFamily="var(--font-mono)">
            PARALLEL PROTECTED SPEECH PATH
          </text>

          {/* Level 3: AUDIO ACQUISITION & PREPROCESSING (Center) */}
          <g className="diag-node" onClick={() => selectComp('dc-removal')} transform="translate(380, 270)">
            <rect width="340" height="65" rx="4" fill="var(--bg-surface)" stroke="var(--signal-cyan)" strokeWidth="1.5" />
            <text x="12" y="20" fill="var(--signal-cyan)" fontSize="9.5" fontFamily="var(--font-mono)" fontWeight="700">
              AUDIO ACQUISITION & PREPROCESSING
            </text>
            <text x="12" y="40" fill="var(--text-heading)" fontSize="12" fontWeight="700">
              I2S ADC &bull; 18 Hz DC Filter &bull; Hann Windowed Framing
            </text>
            <text x="12" y="54" fill="var(--text-muted)" fontSize="9">
              512-Point STFT &bull; 64-Bin Mel Filterbank
            </text>
          </g>

          {/* Connector to AI/ML & Supervisor */}
          <path d="M 550 335 L 550 375" fill="none" stroke="var(--signal-blue)" strokeWidth="2" className={reducedMotion ? '' : 'flow-line-blue'} markerEnd="url(#final-arrow-blue)" />

          {/* Level 4: AI/ML NOISE CLASSIFIER & SUPERVISOR */}
          <g className="diag-node" onClick={() => selectComp('adaptive-supervisor')} transform="translate(340, 375)">
            <rect width="420" height="95" rx="4" fill="#0c1d24" stroke="var(--signal-blue)" strokeWidth="2" />
            <text x="12" y="20" fill="var(--signal-blue)" fontSize="9.5" fontFamily="var(--font-mono)" fontWeight="800">
              AI / ML CLASSIFICATION & ADAPTIVE SUPERVISOR
            </text>
            <text x="12" y="42" fill="var(--text-heading)" fontSize="13" fontWeight="800">
              YAMNet Backbone &bull; Task Classifier &bull; VAD Detector
            </text>
            <text x="12" y="62" fill="var(--text-secondary)" fontSize="10">
              Classes: Stationary (FxLMS) | Non-Stationary (Adaptive) | Impulsive (Robust)
            </text>
            <text x="12" y="80" fill="var(--signal-green)" fontSize="9.5" fontFamily="var(--font-mono)">
              Dynamic μ Adjustment &bull; Double-Talk Protection Engine
            </text>
          </g>

          {/* Haptic Alert Vector (From Supervisor to Haptic Driver) */}
          <path d="M 340 420 L 150 420 L 150 490" fill="none" stroke="var(--signal-amber)" strokeWidth="2" className={reducedMotion ? '' : 'flow-line-amber'} markerEnd="url(#final-arrow-amber)" />
          <text x="160" y="455" fill="var(--signal-amber)" fontSize="9" fontFamily="var(--font-mono)">
            HAPTIC BRANCH
          </text>

          {/* Haptic Alert Box (Left) */}
          <g className="diag-node" onClick={() => selectComp('impulse-protect')} transform="translate(60, 490)">
            <rect width="180" height="70" rx="4" fill="var(--bg-surface)" stroke="var(--signal-amber)" strokeWidth="1.5" />
            <text x="10" y="18" fill="var(--signal-amber)" fontSize="9" fontFamily="var(--font-mono)">TACTICAL HAPTIC ALERT</text>
            <text x="10" y="36" fill="var(--text-heading)" fontSize="11" fontWeight="700">GPIO Vibration Pulse</text>
            <text x="10" y="52" fill="var(--text-muted)" fontSize="9">Instant Soldier Awareness</text>
          </g>

          {/* Connector from Supervisor to Hybrid ANC */}
          <path d="M 550 470 L 550 510" fill="none" stroke="var(--signal-cyan)" strokeWidth="2" className={reducedMotion ? '' : 'flow-line-cyan'} markerEnd="url(#final-arrow-cyan)" />

          {/* Level 5: HYBRID ANC CORE FILTERING (Center) */}
          <g className="diag-node" onClick={() => selectComp('fxlms-anc')} transform="translate(350, 510)">
            <rect width="400" height="85" rx="4" fill="#091b22" stroke="var(--signal-cyan)" strokeWidth="2" />
            <text x="12" y="20" fill="var(--signal-cyan)" fontSize="9.5" fontFamily="var(--font-mono)" fontWeight="800">
              HYBRID ANC CORE (FxLMS / NLMS / ROBUST)
            </text>
            <text x="12" y="42" fill="var(--text-heading)" fontSize="13" fontWeight="800">
              64-Tap Time-Domain Filter W(z) &bull; Secondary Path Ŝ(z)
            </text>
            <text x="12" y="62" fill="var(--signal-green)" fontSize="10" fontFamily="var(--font-mono)">
              Anti-Noise Synthesis: -y[n] = -∑ w_k · x[n-k]
            </text>
          </g>

          {/* Level 6: Residual Speech Enhancement (Right) */}
          <g className="diag-node" onClick={() => selectComp('deepfilter-net')} transform="translate(760, 490)">
            <rect width="220" height="85" rx="4" fill="#081e18" stroke="var(--signal-green)" strokeWidth="2" />
            <text x="12" y="20" fill="var(--signal-green)" fontSize="9.5" fontFamily="var(--font-mono)" fontWeight="800">
              DEEPFILTERNET2 ENHANCER
            </text>
            <text x="12" y="42" fill="var(--text-heading)" fontSize="12" fontWeight="700">
              Residual Noise Suppression
            </text>
            <text x="12" y="60" fill="var(--signal-green)" fontSize="9.5" fontFamily="var(--font-mono)">
              Speech Intelligibility Output
            </text>
          </g>

          {/* Connectors: ANC -> Transducer & Ear canal */}
          <path d="M 550 595 L 550 635" fill="none" stroke="var(--signal-cyan)" strokeWidth="2" className={reducedMotion ? '' : 'flow-line-cyan'} markerEnd="url(#final-arrow-cyan)" />
          <path d="M 870 575 L 870 635" fill="none" stroke="var(--signal-green)" strokeWidth="2" className={reducedMotion ? '' : 'flow-line-green'} markerEnd="url(#final-arrow-green)" />

          {/* Level 7: AMPLIFIER, SPEAKER & EAR CANAL SUPERPOSITION */}
          <g className="diag-node" onClick={() => selectComp('ear-speaker')} transform="translate(420, 635)">
            <rect width="360" height="75" rx="4" fill="var(--bg-surface)" stroke="var(--signal-green)" strokeWidth="2" />
            <text x="12" y="20" fill="var(--signal-green)" fontSize="9.5" fontFamily="var(--font-mono)" fontWeight="800">
              CLASS-D AMP & 40mm SPEAKER TRANSDUCER
            </text>
            <text x="12" y="40" fill="var(--text-heading)" fontSize="12" fontWeight="700">
              Ear Canal Acoustic Destructive Interference
            </text>
            <text x="12" y="58" fill="var(--signal-green)" fontSize="10" fontFamily="var(--font-mono)">
              P_residual = P_noise - P_antinoise + P_speech
            </text>
          </g>

          {/* Level 8: ERROR MICROPHONE & FEEDBACK RETURN */}
          <path d="M 420 670 L 250 670 L 250 710" fill="none" stroke="var(--signal-cyan)" strokeWidth="2" className={reducedMotion ? '' : 'flow-line-reverse'} markerEnd="url(#final-arrow-cyan)" />

          <g className="diag-node" onClick={() => selectComp('error-mic')} transform="translate(170, 710)">
            <rect width="260" height="65" rx="4" fill="var(--bg-surface)" stroke="var(--signal-cyan)" strokeWidth="1.8" />
            <text x="10" y="18" fill="var(--signal-cyan)" fontSize="9.5" fontFamily="var(--font-mono)" fontWeight="700">
              ERROR MICROPHONE SENSOR
            </text>
            <text x="10" y="38" fill="var(--text-heading)" fontSize="12" fontWeight="700">Residual Error e[n] Ingestion</text>
            <text x="10" y="54" fill="var(--signal-cyan)" fontSize="9" fontFamily="var(--font-mono)">ADC CH2 &rarr; Gradient Update</text>
          </g>

          {/* Return path looping back to FxLMS Core! */}
          <path d="M 430 740 L 490 740 L 490 595" fill="none" stroke="var(--signal-cyan)" strokeWidth="2" className={reducedMotion ? '' : 'flow-line-reverse'} markerEnd="url(#final-arrow-cyan)" />
          <text x="500" y="620" fill="var(--signal-cyan)" fontSize="8.5" fontFamily="var(--font-mono)">
            w[n+1] update
          </text>
        </svg>

        {/* Definitive System Legend */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '20px',
            marginTop: '16px',
            borderTop: '1px solid var(--border-subtle)',
            paddingTop: '12px',
            fontSize: '11px',
            fontFamily: 'var(--font-mono)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '12px', height: '3px', background: 'var(--signal-cyan)', display: 'inline-block' }} />
            <span style={{ color: 'var(--text-secondary)' }}>CYAN: Reference / Audio Signal & Feedback</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '12px', height: '3px', background: 'var(--signal-blue)', display: 'inline-block' }} />
            <span style={{ color: 'var(--text-secondary)' }}>BLUE: AI Analysis & Classifier Embeddings</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '12px', height: '3px', background: 'var(--signal-green)', display: 'inline-block' }} />
            <span style={{ color: 'var(--text-secondary)' }}>GREEN: Protected Speech & Acoustic Cancellation</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '12px', height: '3px', background: 'var(--signal-amber)', display: 'inline-block' }} />
            <span style={{ color: 'var(--text-secondary)' }}>AMBER: Impulsive Warning & Haptic Response</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '12px', height: '3px', background: '#cbd5e1', display: 'inline-block' }} />
            <span style={{ color: 'var(--text-secondary)' }}>WHITE: System Structure & Enclosure</span>
          </div>
        </div>
      </div>
    </section>
  );
};
