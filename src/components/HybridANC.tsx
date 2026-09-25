import React, { useEffect, useState } from 'react';
import { SimulationState } from '../simulation/SimulationState';
import { ARCHITECTURE_COMPONENTS, ComponentDetail } from '../diagrams/architectureData';
import { RotateCw, Volume2, Mic, Activity, Shield } from 'lucide-react';

interface HybridANCProps {
  simState: SimulationState;
  onSelectComponent: (comp: ComponentDetail) => void;
  reducedMotion: boolean;
}

export const HybridANC: React.FC<HybridANCProps> = ({
  simState,
  onSelectComponent,
  reducedMotion
}) => {
  const [pulse, setPulse] = useState(0);

  useEffect(() => {
    if (reducedMotion) return;
    const interval = setInterval(() => {
      setPulse((p) => (p + 1) % 100);
    }, 50);
    return () => clearInterval(interval);
  }, [reducedMotion]);

  const selectNode = (id: string) => {
    const c = ARCHITECTURE_COMPONENTS[id];
    if (c) onSelectComponent(c);
  };

  return (
    <section id="hybrid-anc" className="section-shell">
      <div className="section-header">
        <div className="section-num">
          <RotateCw size={14} />
          <span>SECTION 11 // HYBRID ANC CLOSED-LOOP TOPOLOGY</span>
        </div>
        <h2 className="section-title">CONTINUOUS ACOUSTIC-DIGITAL CLOSED-LOOP CANCELLATION</h2>
        <p className="section-desc">
          True physical closed loop where anti-noise radiated by the speaker destructively interferes with environmental noise
          in the soldier's ear canal, and the residual error signal e[n] is continuously fed back to update filter coefficients.
        </p>
      </div>

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
          <span className="font-mono text-cyan" style={{ fontSize: '11px', fontWeight: 700 }}>
            CLOSED-LOOP SIGNAL TRAVERSAL DIAGRAM
          </span>
          <div style={{ display: 'flex', gap: '8px' }}>
            <span className="badge badge-measured">CONVERGENCE: &gt; 18 dB ATTENUATION</span>
            <span className="badge badge-sim">60 FPS VECTOR PROPAGATION</span>
          </div>
        </div>

        {/* 2D Closed-Loop SVG Canvas */}
        <svg viewBox="0 0 1000 480" width="100%" height="100%" style={{ minWidth: '780px', display: 'block' }}>
          <defs>
            <marker id="anc-arrow-cyan" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1 L 9 5 L 0 9 z" fill="var(--signal-cyan)" />
            </marker>
            <marker id="anc-arrow-blue" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1 L 9 5 L 0 9 z" fill="var(--signal-blue)" />
            </marker>
            <marker id="anc-arrow-green" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1 L 9 5 L 0 9 z" fill="var(--signal-green)" />
            </marker>
          </defs>

          {/* ==================== 1. REFERENCE NOISE x(n) (Top Left) ==================== */}
          <g className="diag-node" onClick={() => selectNode('ref-mic')} transform="translate(40, 50)">
            <rect width="170" height="90" rx="4" fill="var(--bg-surface)" stroke="var(--signal-blue)" strokeWidth="1.8" />
            <text x="10" y="20" fill="var(--signal-blue)" fontSize="9.5" fontFamily="var(--font-mono)" fontWeight="700">01 // REFERENCE NOISE</text>
            <text x="10" y="42" fill="var(--text-heading)" fontSize="13" fontWeight="800">x(n) Reference Ingest</text>
            <text x="10" y="60" fill="var(--text-secondary)" fontSize="10">Correlated environmental noise</text>
            <text x="10" y="78" fill="var(--signal-blue)" fontSize="9" fontFamily="var(--font-mono)">From Outer Mic d[n]</text>
          </g>

          {/* Forward Path 1: Ref -> Adaptive Filter */}
          <path
            d="M 210 95 L 300 95"
            fill="none"
            stroke="var(--signal-blue)"
            strokeWidth="2.5"
            className={reducedMotion ? '' : 'flow-line-blue'}
            markerEnd="url(#anc-arrow-blue)"
          />
          <text x="255" y="85" fill="var(--signal-blue)" fontSize="9" fontFamily="var(--font-mono)" textAnchor="middle">x(n)</text>

          {/* ==================== 2. ADAPTIVE FILTER W(z) (Top Center) ==================== */}
          <g className="diag-node" onClick={() => selectNode('fxlms-anc')} transform="translate(300, 40)">
            <rect width="200" height="110" rx="4" fill="#091b22" stroke="var(--signal-cyan)" strokeWidth="2" />
            <text x="10" y="20" fill="var(--signal-cyan)" fontSize="9.5" fontFamily="var(--font-mono)" fontWeight="800">02 // ADAPTIVE FILTER W(z)</text>
            <text x="10" y="42" fill="var(--text-heading)" fontSize="13" fontWeight="800">{simState.selectedAlgorithm}</text>
            <text x="10" y="60" fill="var(--text-secondary)" fontSize="10">64-Tap NEON Dot-Product</text>
            <text x="10" y="78" fill="var(--signal-cyan)" fontSize="9.5" fontFamily="var(--font-mono)">y[n] = ∑ w_k · x[n-k]</text>
            <text x="10" y="96" fill="var(--signal-green)" fontSize="9" fontFamily="var(--font-mono)">Step Size μ = {simState.stepSizeMu.toFixed(3)}</text>
          </g>

          {/* Forward Path 2: Adaptive Filter -> Amplifier */}
          <path
            d="M 500 95 L 590 95"
            fill="none"
            stroke="var(--signal-cyan)"
            strokeWidth="2.5"
            className={reducedMotion ? '' : 'flow-line-cyan'}
            markerEnd="url(#anc-arrow-cyan)"
          />
          <text x="545" y="85" fill="var(--signal-cyan)" fontSize="9" fontFamily="var(--font-mono)" textAnchor="middle">-y(n)</text>

          {/* ==================== 3. AMPLIFIER & SPEAKER (Top Right) ==================== */}
          <g className="diag-node" onClick={() => selectNode('ear-speaker')} transform="translate(590, 45)">
            <rect width="180" height="100" rx="4" fill="var(--bg-surface)" stroke="var(--signal-cyan)" strokeWidth="1.8" />
            <text x="10" y="20" fill="var(--signal-cyan)" fontSize="9.5" fontFamily="var(--font-mono)" fontWeight="700">03 // AMP & SPEAKER</text>
            <text x="10" y="42" fill="var(--text-heading)" fontSize="13" fontWeight="800">Transducer Synthesis</text>
            <text x="10" y="60" fill="var(--text-secondary)" fontSize="10">Class-D &rarr; 40mm Neodymium</text>
            <text x="10" y="78" fill="var(--signal-cyan)" fontSize="9" fontFamily="var(--font-mono)">Acoustic Anti-Noise Wave</text>
          </g>

          {/* Forward Path 3: Speaker -> Ear Canal Acoustic Superposition */}
          <path
            d="M 770 95 L 850 95 L 850 240"
            fill="none"
            stroke="var(--signal-cyan)"
            strokeWidth="2.5"
            className={reducedMotion ? '' : 'flow-line-cyan'}
            markerEnd="url(#anc-arrow-cyan)"
          />
          <text x="860" y="165" fill="var(--text-muted)" fontSize="8.5" fontFamily="var(--font-mono)">Secondary Path S(z)</text>

          {/* ==================== 4. LISTENER EAR CANAL (Center Right) ==================== */}
          <g transform="translate(730, 240)">
            <rect width="240" height="110" rx="4" fill="#081e18" stroke="var(--signal-green)" strokeWidth="2" />
            <text x="12" y="22" fill="var(--signal-green)" fontSize="10" fontFamily="var(--font-mono)" fontWeight="800">
              04 // LISTENER EAR CANAL
            </text>
            <text x="12" y="44" fill="var(--text-heading)" fontSize="13" fontWeight="800">Acoustic Superposition</text>
            <text x="12" y="64" fill="var(--signal-cyan)" fontSize="9.5" fontFamily="var(--font-mono)">Anti-Noise Wave [-y(t)]</text>
            <text x="12" y="80" fill="var(--signal-blue)" fontSize="9.5" fontFamily="var(--font-mono)">+ Ambient Primary [d(t)]</text>
            <text x="12" y="98" fill="var(--signal-green)" fontSize="10" fontWeight="700" fontFamily="var(--font-mono)">
              = RESIDUAL e(t) &lt; -18 dB
            </text>
          </g>

          {/* Path 4: Ear Canal -> Error Microphone */}
          <path
            d="M 850 350 L 850 400 L 730 400"
            fill="none"
            stroke="var(--signal-green)"
            strokeWidth="2"
            className={reducedMotion ? '' : 'flow-line-green'}
            markerEnd="url(#anc-arrow-green)"
          />

          {/* ==================== 5. ERROR MICROPHONE (Bottom Center) ==================== */}
          <g className="diag-node" onClick={() => selectNode('error-mic')} transform="translate(540, 350)">
            <rect width="190" height="95" rx="4" fill="var(--bg-surface)" stroke="var(--signal-cyan)" strokeWidth="1.8" />
            <text x="10" y="20" fill="var(--signal-cyan)" fontSize="9.5" fontFamily="var(--font-mono)" fontWeight="700">05 // ERROR MICROPHONE</text>
            <text x="10" y="42" fill="var(--text-heading)" fontSize="13" fontWeight="800">Residual Sensor</text>
            <text x="10" y="60" fill="var(--text-secondary)" fontSize="10">Positioned near eardrum plane</text>
            <text x="10" y="78" fill="var(--signal-cyan)" fontSize="9" fontFamily="var(--font-mono)">Digitized Error Stream e[n]</text>
          </g>

          {/* Feedback Path 5: Error Mic -> Adaptive Update Engine */}
          <path
            d="M 540 398 L 440 398"
            fill="none"
            stroke="var(--signal-cyan)"
            strokeWidth="2.5"
            className={reducedMotion ? '' : 'flow-line-reverse'}
            markerEnd="url(#anc-arrow-cyan)"
          />
          <text x="490" y="388" fill="var(--signal-cyan)" fontSize="9" fontFamily="var(--font-mono)" textAnchor="middle">e[n] stream</text>

          {/* ==================== 6. ADAPTIVE COEFFICIENT UPDATE (Bottom Left) ==================== */}
          <g className="diag-node" onClick={() => selectNode('fxlms-anc')} transform="translate(230, 340)">
            <rect width="210" height="110" rx="4" fill="#0d1b22" stroke="var(--signal-cyan)" strokeWidth="2" />
            <text x="10" y="20" fill="var(--signal-cyan)" fontSize="9.5" fontFamily="var(--font-mono)" fontWeight="800">06 // ADAPTIVE UPDATE ENGINE</text>
            <text x="10" y="42" fill="var(--text-heading)" fontSize="13" fontWeight="800">Gradient Descent Update</text>
            <text x="10" y="62" fill="var(--signal-cyan)" fontSize="10" fontFamily="var(--font-mono)">
              w[n+1] = w[n] + μ · e[n] · x'(n)
            </text>
            <text x="10" y="80" fill="var(--text-muted)" fontSize="9">x'(n) filtered by Secondary Path Ŝ(z)</text>
            <text x="10" y="98" fill="var(--signal-green)" fontSize="9" fontFamily="var(--font-mono)">
              VAD = {simState.speechEnabled ? 'HOLD (μ=0)' : 'ACTIVE (ADAPTING)'}
            </text>
          </g>

          {/* Feedback Path 6: Adaptive Update -> Adaptive Filter W(z) (CLOSING THE LOOP!) */}
          <path
            d="M 335 340 L 335 220 L 400 220 L 400 150"
            fill="none"
            stroke="var(--signal-cyan)"
            strokeWidth="2.5"
            className={reducedMotion ? '' : 'flow-line-reverse'}
            markerEnd="url(#anc-arrow-cyan)"
          />
          <text x="320" y="250" fill="var(--signal-cyan)" fontSize="9" fontFamily="var(--font-mono)" textAnchor="end">
            w[n+1] weights
          </text>
        </svg>

        {/* Legend */}
        <div style={{ display: 'flex', gap: '20px', marginTop: '12px', borderTop: '1px solid var(--border-subtle)', paddingTop: '10px', fontSize: '11px', fontFamily: 'var(--font-mono)' }}>
          <span style={{ color: 'var(--signal-blue)' }}>BLUE: Reference Noise Stream x(n)</span>
          <span style={{ color: 'var(--signal-cyan)' }}>CYAN: Filtered Anti-Noise & Feedback e(n)</span>
          <span style={{ color: 'var(--signal-green)' }}>GREEN: Protected Output & Cancellation Null</span>
        </div>
      </div>
    </section>
  );
};
