import React from 'react';
import { SimulationState } from '../simulation/SimulationState';
import { Cpu, Activity, BarChart2, ShieldCheck } from 'lucide-react';

interface AIAnalysisProps {
  simState: SimulationState;
}

export const AIAnalysis: React.FC<AIAnalysisProps> = ({ simState }) => {
  const { stationary, nonStationary, impulsive } = simState.classificationScores;

  return (
    <section id="ai-analysis" className="section-shell">
      <div className="section-header">
        <div className="section-num">
          <Cpu size={14} />
          <span>SECTION 07 // AI / ML NOISE ANALYSIS</span>
        </div>
        <h2 className="section-title">DEEP SPECTRAL EMBEDDINGS & NOISE CLASSIFICATION</h2>
        <p className="section-desc">
          Audio frame patches are mapped through an optimized MobileNet-derived separable convolutional neural network
          (YAMNet architecture) into a 1024-dimensional semantic embedding, which is evaluated by the task classifier.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
        {/* Left: AI Inference Architecture Schematic */}
        <div className="tech-card" style={{ background: 'var(--bg-surface-sunken)', border: '1px solid var(--border-default)', padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <span className="font-mono text-cyan" style={{ fontSize: '11px', fontWeight: 700 }}>
              AI INFERENCE GRAPH (ONNX CPU EP)
            </span>
            <span className="badge badge-sim">Illustrative Simulation</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-default)', padding: '10px 14px', borderRadius: '3px' }}>
              <span className="font-mono text-muted" style={{ fontSize: '9.5px' }}>STEP 01</span>
              <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-heading)' }}>Log-Mel Spectrogram Patch</div>
              <div className="font-mono text-cyan" style={{ fontSize: '10px', marginTop: '2px' }}>Tensor [1, 1, 96, 64]</div>
            </div>

            <div style={{ textAlign: 'center', color: 'var(--border-highlight)', fontSize: '12px' }}>&darr;</div>

            <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--signal-blue)', padding: '10px 14px', borderRadius: '3px' }}>
              <span className="font-mono text-blue" style={{ fontSize: '9.5px' }}>STEP 02 // EMBEDDING EXTRACTOR</span>
              <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-heading)' }}>YAMNet / CNN Separable Convolutions</div>
              <div className="font-mono text-muted" style={{ fontSize: '10px', marginTop: '2px' }}>14 Depthwise Blocks &bull; 1024-D Output</div>
            </div>

            <div style={{ textAlign: 'center', color: 'var(--border-highlight)', fontSize: '12px' }}>&darr;</div>

            <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-default)', padding: '10px 14px', borderRadius: '3px' }}>
              <span className="font-mono text-muted" style={{ fontSize: '9.5px' }}>STEP 03 // TASK CLASSIFIER</span>
              <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-heading)' }}>Acoustic Signature Softmax MLP</div>
              <div className="font-mono text-green" style={{ fontSize: '10px', marginTop: '2px' }}>Output: 3 Defense Acoustic Classes</div>
            </div>
          </div>
        </div>

        {/* Right: Live Classification Telemetry Panel */}
        <div className="tech-card" style={{ background: 'var(--bg-surface-sunken)', border: '1px solid var(--border-default)', padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <span className="font-mono text-cyan" style={{ fontSize: '11px', fontWeight: 700 }}>
              LIVE CLASSIFICATION PANEL
            </span>
            <span className="badge badge-sim">Illustrative Simulation</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {/* Analysis Window Indicator */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontFamily: 'var(--font-mono)', marginBottom: '4px' }}>
                <span className="text-muted">ANALYSIS WINDOW:</span>
                <span className="text-cyan">96 FRAMES (0.48s BUFFER)</span>
              </div>
              <div style={{ height: '8px', background: 'var(--bg-surface)', border: '1px solid var(--border-default)', borderRadius: '2px', overflow: 'hidden' }}>
                <div style={{ width: '100%', height: '100%', background: 'var(--signal-cyan)' }} />
              </div>
            </div>

            {/* Model Status */}
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px', background: 'var(--bg-surface)', borderRadius: '3px' }}>
              <span className="font-mono text-muted" style={{ fontSize: '11px' }}>MODEL STATUS:</span>
              <span className="font-mono text-green" style={{ fontSize: '11px', fontWeight: 700 }}>
                {simState.aiActive ? 'ACTIVE (INFERENCE OK)' : 'BYPASS MODE'}
              </span>
            </div>

            {/* Confidence Meters */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '6px' }}>
              {/* Stationary */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontFamily: 'var(--font-mono)', marginBottom: '3px' }}>
                  <span style={{ color: simState.classification === 'STATIONARY' ? 'var(--signal-cyan)' : 'var(--text-secondary)' }}>
                    STATIONARY (VEHICLE / CONTINUOUS):
                  </span>
                  <span style={{ fontWeight: 700, color: 'var(--signal-cyan)' }}>{stationary}%</span>
                </div>
                <div style={{ height: '6px', background: 'var(--bg-surface)', borderRadius: '2px', overflow: 'hidden' }}>
                  <div style={{ width: `${stationary}%`, height: '100%', background: 'var(--signal-cyan)', transition: 'width 0.3s ease' }} />
                </div>
              </div>

              {/* Non-Stationary */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontFamily: 'var(--font-mono)', marginBottom: '3px' }}>
                  <span style={{ color: simState.classification === 'NON-STATIONARY' ? 'var(--signal-blue)' : 'var(--text-secondary)' }}>
                    NON-STATIONARY (HELICOPTER / MACHINERY):
                  </span>
                  <span style={{ fontWeight: 700, color: 'var(--signal-blue)' }}>{nonStationary}%</span>
                </div>
                <div style={{ height: '6px', background: 'var(--bg-surface)', borderRadius: '2px', overflow: 'hidden' }}>
                  <div style={{ width: `${nonStationary}%`, height: '100%', background: 'var(--signal-blue)', transition: 'width 0.3s ease' }} />
                </div>
              </div>

              {/* Impulsive */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontFamily: 'var(--font-mono)', marginBottom: '3px' }}>
                  <span style={{ color: simState.classification === 'IMPULSIVE' ? 'var(--signal-amber)' : 'var(--text-secondary)' }}>
                    IMPULSIVE (GUNSHOT / EXPLOSION):
                  </span>
                  <span style={{ fontWeight: 700, color: 'var(--signal-amber)' }}>{impulsive}%</span>
                </div>
                <div style={{ height: '6px', background: 'var(--bg-surface)', borderRadius: '2px', overflow: 'hidden' }}>
                  <div style={{ width: `${impulsive}%`, height: '100%', background: 'var(--signal-amber)', transition: 'width 0.3s ease' }} />
                </div>
              </div>
            </div>

            <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '10px', marginTop: '6px' }}>
              <span className="badge badge-sim">ILLUSTRATIVE SIMULATION — NOT RAW BENCHMARK</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
