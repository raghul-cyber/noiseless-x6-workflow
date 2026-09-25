import React, { useEffect, useRef, useState } from 'react';
import { SimulationState } from '../simulation/SimulationState';
import { ARCHITECTURE_COMPONENTS, ComponentDetail } from '../diagrams/architectureData';
import { Shield, Cpu, Activity, Volume2, Mic, Terminal, Info, Play, Pause } from 'lucide-react';

interface SystemHeroProps {
  simState: SimulationState;
  onSelectComponent: (comp: ComponentDetail) => void;
  reducedMotion: boolean;
}

export const SystemHero: React.FC<SystemHeroProps> = ({
  simState,
  onSelectComponent,
  reducedMotion
}) => {
  const [pulsePos, setPulsePos] = useState(0);
  const [aiAnalysisPhase, setAiAnalysisPhase] = useState<'ANALYSING' | 'IDENTIFIED'>('IDENTIFIED');

  useEffect(() => {
    if (reducedMotion) return;
    const interval = setInterval(() => {
      setPulsePos((prev) => (prev + 1) % 100);
    }, 40);
    return () => clearInterval(interval);
  }, [reducedMotion]);

  useEffect(() => {
    setAiAnalysisPhase('ANALYSING');
    const timer = setTimeout(() => {
      setAiAnalysisPhase('IDENTIFIED');
    }, 450);
    return () => clearTimeout(timer);
  }, [simState.noiseType]);

  const selectNode = (id: string) => {
    const comp = ARCHITECTURE_COMPONENTS[id];
    if (comp) onSelectComponent(comp);
  };

  return (
    <section id="overview" className="section-shell" style={{ paddingTop: '50px' }}>
      {/* Editorial System Header */}
      <div style={{ maxWidth: '980px', marginBottom: '40px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
          <span className="badge badge-measured">System Architecture v2.4</span>
          <span className="badge badge-sim">Real-Time Canvas Simulation</span>
          <span className="font-mono text-muted" style={{ fontSize: '11px' }}>
            DOC-REF: SIH26052-ENG-SPEC
          </span>
        </div>

        <h1
          style={{
            fontSize: 'clamp(32px, 5vw, 52px)',
            fontWeight: 900,
            lineHeight: 1.1,
            letterSpacing: '-0.03em',
            color: 'var(--text-heading)',
            marginBottom: '16px'
          }}
        >
          NOISELESS-X6 <span className="text-cyan">WORKFLOWS</span>
        </h1>

        <p
          className="font-mono"
          style={{
            fontSize: '15px',
            color: 'var(--signal-cyan)',
            letterSpacing: '0.04em',
            marginBottom: '12px',
            textTransform: 'uppercase'
          }}
        >
          Interactive Technical Architecture & Real-Time Acoustic Processing System
        </p>

        <p
          style={{
            fontSize: '15px',
            color: 'var(--text-secondary)',
            lineHeight: 1.7,
            maxWidth: '820px'
          }}
        >
          Explore the complete NOISELESS-X6 signal-processing architecture — from environmental noise sensing and
          AI-based classification to adaptive noise cancellation, speech protection, residual enhancement and
          closed-loop feedback. Every node represents an authentic hardware or DSP subsystem.
        </p>
      </div>

      {/* Main 2D Central System Interactive Schematic Diagram */}
      <div
        className="tech-card"
        style={{
          padding: '24px',
          background: 'var(--bg-surface-sunken)',
          border: '1px solid var(--border-default)',
          borderRadius: '4px',
          overflowX: 'auto'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Terminal size={14} className="text-cyan" />
            <span className="font-mono" style={{ fontSize: '11px', color: 'var(--text-primary)', letterSpacing: '0.06em' }}>
              FIG 01.01 — END-TO-END ACOUSTIC CLOSED-LOOP TOPOLOGY
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span className="font-mono text-muted" style={{ fontSize: '10px' }}>CLICK ANY NODE TO INSPECT</span>
            <span className="badge badge-sim">60 FPS SIGNAL FLOW</span>
          </div>
        </div>

        {/* 2D SVG Architectural Canvas */}
        <svg
          viewBox="0 0 1140 440"
          width="100%"
          height="100%"
          style={{ display: 'block', minWidth: '850px', userSelect: 'none' }}
        >
          <defs>
            <marker id="hero-arrow-cyan" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1 L 9 5 L 0 9 z" fill="var(--signal-cyan)" />
            </marker>
            <marker id="hero-arrow-green" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1 L 9 5 L 0 9 z" fill="var(--signal-green)" />
            </marker>
            <marker id="hero-arrow-amber" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1 L 9 5 L 0 9 z" fill="var(--signal-amber)" />
            </marker>
            <linearGradient id="flow-line-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="var(--signal-cyan)" stop-opacity="0.4" />
              <stop offset="50%" stop-color="var(--signal-cyan)" stop-opacity="1" />
              <stop offset="100%" stop-color="var(--signal-cyan)" stop-opacity="0.4" />
            </linearGradient>
          </defs>

          {/* Background Grid Lines inside schematic */}
          <g opacity="0.12">
            {[...Array(12)].map((_, i) => (
              <line key={`v-${i}`} x1={i * 100} y1="0" x2={i * 100} y2="440" stroke="var(--signal-cyan)" strokeWidth="0.5" />
            ))}
            {[...Array(6)].map((_, i) => (
              <line key={`h-${i}`} x1="0" y1={i * 80} x2="1140" y2={i * 80} stroke="var(--signal-cyan)" strokeWidth="0.5" />
            ))}
          </g>

          {/* ==================== 1. ENVIRONMENT SOURCE (x=30, y=70) ==================== */}
          <g className="diag-node" onClick={() => selectNode('ref-mic')} transform="translate(30, 60)">
            <rect width="135" height="110" rx="4" fill="#0b171a" stroke="var(--border-default)" strokeWidth="1.5" />
            <rect width="135" height="20" rx="2" fill="#112529" />
            <text x="8" y="14" fill="var(--signal-cyan)" fontSize="9" fontFamily="var(--font-mono)" fontWeight="700">01 // ENVIRONMENT</text>
            <text x="12" y="44" fill="var(--text-heading)" fontSize="13" fontWeight="800">NOISE FIELD</text>
            <text x="12" y="62" fill="var(--text-secondary)" fontSize="10">{simState.noiseType.toUpperCase()} SOURCE</text>
            <text x="12" y="80" fill="var(--signal-cyan)" fontSize="10" fontFamily="var(--font-mono)">P_acoustic(t)</text>
            <text x="12" y="98" fill="var(--text-muted)" fontSize="9">Ambient SPL: ~85dB</text>
          </g>

          {/* Connector: Environment -> Reference Mic */}
          <path
            d="M 165 115 L 210 115"
            fill="none"
            stroke="var(--signal-cyan)"
            strokeWidth="2"
            className={reducedMotion ? '' : 'flow-line-cyan'}
            markerEnd="url(#hero-arrow-cyan)"
          />
          <text x="187" y="108" fill="var(--signal-cyan)" fontSize="8.5" fontFamily="var(--font-mono)" textAnchor="middle">x(t)</text>

          {/* ==================== 2. DUAL MICROPHONES (x=210, y=40) ==================== */}
          <g className="diag-node" onClick={() => selectNode('ref-mic')} transform="translate(210, 40)">
            <rect width="145" height="70" rx="4" fill="var(--bg-surface)" stroke="var(--signal-cyan)" strokeWidth="1.5" />
            <text x="8" y="16" fill="var(--signal-cyan)" fontSize="9" fontFamily="var(--font-mono)" fontWeight="700">02 // REF MIC</text>
            <text x="10" y="36" fill="var(--text-heading)" fontSize="12" fontWeight="700">Acoustic Reference</text>
            <text x="10" y="52" fill="var(--text-secondary)" fontSize="10">External Earcup Port</text>
            <text x="10" y="64" fill="var(--signal-cyan)" fontSize="9" fontFamily="var(--font-mono)">Stream d[n] (ALSA hw:1,0)</text>
          </g>

          <g className="diag-node" onClick={() => selectNode('primary-mic')} transform="translate(210, 130)">
            <rect width="145" height="70" rx="4" fill="var(--bg-surface)" stroke="var(--border-default)" strokeWidth="1.5" />
            <text x="8" y="16" fill="var(--signal-green)" fontSize="9" fontFamily="var(--font-mono)" fontWeight="700">03 // PRIMARY MIC</text>
            <text x="10" y="36" fill="var(--text-heading)" fontSize="12" fontWeight="700">Speech + Noise</text>
            <text x="10" y="52" fill="var(--text-secondary)" fontSize="10">Cardioid Near-Field</text>
            <text x="10" y="64" fill="var(--signal-green)" fontSize="9" fontFamily="var(--font-mono)">s[n] + v[n]</text>
          </g>

          {/* Connectors from Mics to AI/DSP Stage */}
          <path
            d="M 355 75 L 410 75"
            fill="none"
            stroke="var(--signal-cyan)"
            strokeWidth="2"
            className={reducedMotion ? '' : 'flow-line-cyan'}
            markerEnd="url(#hero-arrow-cyan)"
          />
          <path
            d="M 355 165 L 390 165 L 390 135 L 410 135"
            fill="none"
            stroke="var(--signal-green)"
            strokeWidth="2"
            className={reducedMotion ? '' : 'flow-line-green'}
            markerEnd="url(#hero-arrow-green)"
          />

          {/* ==================== 3. AI / DSP CORE ENGINE (x=410, y=40) ==================== */}
          <g className="diag-node" onClick={() => selectNode('adaptive-supervisor')} transform="translate(410, 30)">
            <rect width="190" height="190" rx="6" fill="#0b1b22" stroke="var(--signal-blue)" strokeWidth="1.8" />
            <rect width="190" height="22" rx="3" fill="#102a35" />
            <text x="10" y="15" fill="var(--signal-blue)" fontSize="9" fontFamily="var(--font-mono)" fontWeight="700">04 // AI / DSP SUPERVISOR</text>
            
            {/* Inner Processing Modules */}
            <g transform="translate(10, 30)">
              <rect width="170" height="34" rx="3" fill="var(--bg-surface)" stroke="var(--border-default)" />
              <text x="8" y="15" fill="var(--signal-cyan)" fontSize="9" fontFamily="var(--font-mono)">PREPROCESSING & STFT</text>
              <text x="8" y="28" fill="var(--text-secondary)" fontSize="9.5">DC Filter • Hann 512 • 5ms Hop</text>
            </g>

            <g transform="translate(10, 72)">
              <rect width="170" height="42" rx="3" fill="var(--bg-surface)" stroke={aiAnalysisPhase === 'ANALYSING' ? 'var(--signal-amber)' : 'var(--signal-blue)'} />
              <text x="8" y="14" fill="var(--signal-blue)" fontSize="9" fontFamily="var(--font-mono)">AI CLASSIFICATION</text>
              <text x="8" y="28" fill="var(--text-heading)" fontSize="11" fontWeight="700">
                {aiAnalysisPhase === 'ANALYSING' ? 'ANALYSING...' : `TYPE: ${simState.classification}`}
              </text>
              <text x="8" y="38" fill="var(--text-muted)" fontSize="8.5">YAMNet / CNN Feature Extraction</text>
            </g>

            <g transform="translate(10, 122)">
              <rect width="170" height="38" rx="3" fill="var(--bg-surface)" stroke="var(--signal-green)" />
              <text x="8" y="14" fill="var(--signal-green)" fontSize="9" fontFamily="var(--font-mono)">VAD SPEECH DETECTOR</text>
              <text x="8" y="28" fill="var(--signal-green)" fontSize="10" fontWeight="700">
                {simState.speechEnabled ? 'SPEECH PROTECTED (VAD=1)' : 'NO SPEECH (VAD=0)'}
              </text>
            </g>

            <text x="10" y="178" fill="var(--signal-cyan)" fontSize="9" fontFamily="var(--font-mono)">
              STATE: {simState.supervisorState}
            </text>
          </g>

          {/* Connector: AI/DSP -> Hybrid ANC Filter */}
          <path
            d="M 600 125 L 650 125"
            fill="none"
            stroke="var(--signal-cyan)"
            strokeWidth="2"
            className={reducedMotion ? '' : 'flow-line-cyan'}
            markerEnd="url(#hero-arrow-cyan)"
          />
          <text x="625" y="118" fill="var(--signal-cyan)" fontSize="8.5" fontFamily="var(--font-mono)" textAnchor="middle">W(z) ctrl</text>

          {/* ==================== 4. HYBRID ANC FILTERING (x=650, y=50) ==================== */}
          <g className="diag-node" onClick={() => selectNode('fxlms-anc')} transform="translate(650, 45)">
            <rect width="165" height="150" rx="4" fill="var(--bg-surface)" stroke="var(--signal-cyan)" strokeWidth="1.5" />
            <text x="8" y="16" fill="var(--signal-cyan)" fontSize="9" fontFamily="var(--font-mono)" fontWeight="700">05 // HYBRID ANC</text>
            <text x="10" y="36" fill="var(--text-heading)" fontSize="13" fontWeight="800">{simState.selectedAlgorithm}</text>
            <text x="10" y="52" fill="var(--text-secondary)" fontSize="10">Adaptive Filter W(z)</text>
            <text x="10" y="68" fill="var(--signal-cyan)" fontSize="9.5" fontFamily="var(--font-mono)">
              w[n+1] = w[n] + μ·e·u
            </text>
            
            {/* Filter Coefficients Mini Graph */}
            <g transform="translate(10, 80)">
              <rect width="145" height="30" fill="var(--bg-surface-sunken)" stroke="var(--border-subtle)" />
              {[25, 45, 15, -30, -55, 60, -20, 10, -5, 15, -10].map((val, idx) => (
                <rect
                  key={idx}
                  x={12 + idx * 11}
                  y={val >= 0 ? 15 - val * 0.2 : 15}
                  width="5"
                  height={Math.abs(val) * 0.2}
                  fill="var(--signal-cyan)"
                  opacity="0.8"
                />
              ))}
            </g>

            <text x="10" y="125" fill="var(--signal-green)" fontSize="9.5" fontFamily="var(--font-mono)">
              ATTENUATION: {simState.residualAttenuationDb.toFixed(1)} dB
            </text>
            <text x="10" y="140" fill="var(--text-muted)" fontSize="8.5">ARM NEON Latency: &lt; 0.12 ms</text>
          </g>

          {/* Connector: ANC Filter -> Speaker & Amplifier */}
          <path
            d="M 815 120 L 860 120"
            fill="none"
            stroke="var(--signal-cyan)"
            strokeWidth="2"
            className={reducedMotion ? '' : 'flow-line-cyan'}
            markerEnd="url(#hero-arrow-cyan)"
          />
          <text x="837" y="112" fill="var(--signal-cyan)" fontSize="8.5" fontFamily="var(--font-mono)" textAnchor="middle">-y[n]</text>

          {/* ==================== 5. SPEAKER & ACOUSTIC CANAL (x=860, y=50) ==================== */}
          <g className="diag-node" onClick={() => selectNode('ear-speaker')} transform="translate(860, 45)">
            <rect width="145" height="150" rx="4" fill="var(--bg-surface)" stroke="var(--signal-green)" strokeWidth="1.5" />
            <text x="8" y="16" fill="var(--signal-green)" fontSize="9" fontFamily="var(--font-mono)" fontWeight="700">06 // SPEAKER & EAR</text>
            <text x="10" y="36" fill="var(--text-heading)" fontSize="12" fontWeight="700">Transducer Output</text>
            <text x="10" y="52" fill="var(--text-secondary)" fontSize="10">Class-D Audio Amp</text>
            <text x="10" y="70" fill="var(--signal-cyan)" fontSize="9" fontFamily="var(--font-mono)">Anti-Noise Wave y(t)</text>
            <text x="10" y="86" fill="var(--signal-green)" fontSize="9" fontFamily="var(--font-mono)">+ Speech Wave s(t)</text>
            
            <rect x="10" y="98" width="125" height="24" rx="2" fill="#0c2317" stroke="var(--signal-green)" strokeWidth="0.8" />
            <text x="16" y="114" fill="var(--signal-green)" fontSize="9.5" fontWeight="700" fontFamily="var(--font-mono)">
              CLEAR SPEECH OUTPUT
            </text>

            <text x="10" y="138" fill="var(--text-muted)" fontSize="8.5">Eardrum Destructive Null</text>
          </g>

          {/* ==================== 6. ACOUSTIC SUPERPOSITION PATH ==================== */}
          <path
            d="M 1005 120 L 1050 120 L 1050 290 L 980 290"
            fill="none"
            stroke="var(--signal-green)"
            strokeWidth="2"
            className={reducedMotion ? '' : 'flow-line-green'}
            markerEnd="url(#hero-arrow-green)"
          />
          <text x="1060" y="210" fill="var(--text-secondary)" fontSize="9" fontFamily="var(--font-mono)" transform="rotate(90, 1060, 210)">
            ACOUSTIC SUPERPOSITION s(t) + [d(t)-y(t)]
          </text>

          {/* ==================== 7. ERROR MICROPHONE (x=835, y=250) ==================== */}
          <g className="diag-node" onClick={() => selectNode('error-mic')} transform="translate(835, 250)">
            <rect width="145" height="85" rx="4" fill="var(--bg-surface)" stroke="var(--signal-cyan)" strokeWidth="1.5" />
            <text x="8" y="16" fill="var(--signal-cyan)" fontSize="9" fontFamily="var(--font-mono)" fontWeight="700">07 // ERROR MIC</text>
            <text x="10" y="36" fill="var(--text-heading)" fontSize="12" fontWeight="700">Residual Sensor</text>
            <text x="10" y="52" fill="var(--text-secondary)" fontSize="10">Ear Canal Inner Aperture</text>
            <text x="10" y="68" fill="var(--signal-cyan)" fontSize="9" fontFamily="var(--font-mono)">Error Signal e[n]</text>
          </g>

          {/* ==================== 8. CLOSED-LOOP FEEDBACK PATH ==================== */}
          <path
            d="M 835 292 L 530 292 L 530 220"
            fill="none"
            stroke="var(--signal-cyan)"
            strokeWidth="2"
            className={reducedMotion ? '' : 'flow-line-reverse'}
            markerEnd="url(#hero-arrow-cyan)"
          />
          <g transform="translate(630, 275)">
            <rect width="140" height="22" rx="2" fill="var(--bg-surface-sunken)" stroke="var(--border-default)" />
            <text x="70" y="15" fill="var(--signal-cyan)" fontSize="9" fontFamily="var(--font-mono)" textAnchor="middle">
              CLOSED-LOOP ADAPTIVE UPDATE e[n]
            </text>
          </g>

          {/* Impulse Warning Node (Branch) */}
          {simState.impulseTriggered && (
            <g transform="translate(420, 360)">
              <rect width="280" height="50" rx="3" fill="rgba(245, 158, 11, 0.15)" stroke="var(--signal-amber)" strokeWidth="1.5" />
              <text x="10" y="18" fill="var(--signal-amber)" fontSize="10" fontWeight="800" fontFamily="var(--font-mono)">
                [!] IMPULSE TRANSIENT CLAMP ACTIVE
              </text>
              <text x="10" y="34" fill="#fed7aa" fontSize="9.5">
                Attack &lt; 100μs | Peak Attenuation: -32dB | Haptic Trigger Sent
              </text>
            </g>
          )}
        </svg>

        {/* Legend / Semantic Key */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '16px',
            alignItems: 'center',
            paddingTop: '16px',
            borderTop: '1px solid var(--border-subtle)',
            marginTop: '8px',
            fontSize: '11px',
            fontFamily: 'var(--font-mono)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '12px', height: '2px', background: 'var(--signal-cyan)', display: 'inline-block' }} />
            <span style={{ color: 'var(--text-secondary)' }}>CYAN: Reference / Audio Stream x[n]</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '12px', height: '2px', background: 'var(--signal-blue)', display: 'inline-block' }} />
            <span style={{ color: 'var(--text-secondary)' }}>BLUE: AI Analysis / CNN Spectrogram Features</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '12px', height: '2px', background: 'var(--signal-green)', display: 'inline-block' }} />
            <span style={{ color: 'var(--text-secondary)' }}>GREEN: Protected Speech & Acoustic Cancellation</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '12px', height: '2px', background: 'var(--signal-amber)', display: 'inline-block' }} />
            <span style={{ color: 'var(--text-secondary)' }}>AMBER: Impulsive Shockwave Protection</span>
          </div>
        </div>
      </div>
    </section>
  );
};
