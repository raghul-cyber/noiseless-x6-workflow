import React from 'react';
import { Activity, Cpu, ShieldCheck, BarChart3 } from 'lucide-react';

export const MetricsDashboard: React.FC = () => {
  return (
    <section id="metrics" className="section-shell">
      <div className="section-header">
        <div className="section-num">
          <BarChart3 size={14} />
          <span>SECTION 19 // PERFORMANCE & ENGINEERING METRICS</span>
        </div>
        <h2 className="section-title">SYSTEM BENCHMARKS & EVIDENCE AUDIT</h2>
        <p className="section-desc">
          Strict engineering verification categorized by Model Accuracy, Acoustic ANC Performance, and Real-Time Hardware Runtime.
          Every metric carries an explicit evidence status: TARGET, PROTOTYPE MEASUREMENT, or NOT BENCHMARKED.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
        {/* Category 1: MODEL METRICS */}
        <div className="tech-card" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-default)', padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '10px' }}>
            <span className="font-mono text-cyan" style={{ fontSize: '11px', fontWeight: 800 }}>
              01 // AI CLASSIFICATION MODEL
            </span>
            <span className="badge badge-measured">Prototype Measurement</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-heading)' }}>Accuracy</div>
                <div className="font-mono text-muted" style={{ fontSize: '10px' }}>3-Class Military Dataset</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span className="font-mono text-green" style={{ fontSize: '14px', fontWeight: 800 }}>94.2%</span>
                <div><span className="badge badge-measured">Measured</span></div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-heading)' }}>Precision</div>
                <div className="font-mono text-muted" style={{ fontSize: '10px' }}>Weighted macro average</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span className="font-mono text-green" style={{ fontSize: '14px', fontWeight: 800 }}>93.8%</span>
                <div><span className="badge badge-measured">Measured</span></div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-heading)' }}>Recall</div>
                <div className="font-mono text-muted" style={{ fontSize: '10px' }}>Impulse shockwave sensitivity</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span className="font-mono text-green" style={{ fontSize: '14px', fontWeight: 800 }}>96.1%</span>
                <div><span className="badge badge-measured">Measured</span></div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-heading)' }}>F1-Score</div>
                <div className="font-mono text-muted" style={{ fontSize: '10px' }}>Harmonic mean of precision/recall</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span className="font-mono text-green" style={{ fontSize: '14px', fontWeight: 800 }}>0.949</span>
                <div><span className="badge badge-measured">Measured</span></div>
              </div>
            </div>
          </div>
        </div>

        {/* Category 2: ANC & ACOUSTIC METRICS */}
        <div className="tech-card" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-default)', padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '10px' }}>
            <span className="font-mono text-cyan" style={{ fontSize: '11px', fontWeight: 800 }}>
              02 // ANC & SPEECH QUALITY
            </span>
            <span className="badge badge-target">Target & Prototype</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-heading)' }}>SNR Improvement</div>
                <div className="font-mono text-muted" style={{ fontSize: '10px' }}>Acoustic cancellation depth</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span className="font-mono text-green" style={{ fontSize: '14px', fontWeight: 800 }}>+18.4 dB</span>
                <div><span className="badge badge-measured">Measured</span></div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-heading)' }}>STOI Score</div>
                <div className="font-mono text-muted" style={{ fontSize: '10px' }}>Short-Time Objective Intelligibility</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span className="font-mono text-cyan" style={{ fontSize: '14px', fontWeight: 800 }}>&gt; 0.88</span>
                <div><span className="badge badge-target">Target</span></div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-heading)' }}>PESQ Score</div>
                <div className="font-mono text-muted" style={{ fontSize: '10px' }}>Perceptual Evaluation of Speech</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span className="font-mono text-muted" style={{ fontSize: '12px', fontWeight: 600 }}>N/A</span>
                <div><span className="badge badge-unbenchmarked">Not Benchmarked</span></div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-heading)' }}>End-to-End Latency</div>
                <div className="font-mono text-muted" style={{ fontSize: '10px' }}>Mic ingestion to acoustic output</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span className="font-mono text-cyan" style={{ fontSize: '14px', fontWeight: 800 }}>&lt; 15.0 ms</span>
                <div><span className="badge badge-target">Target</span></div>
              </div>
            </div>
          </div>
        </div>

        {/* Category 3: RUNTIME & HARDWARE METRICS */}
        <div className="tech-card" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-default)', padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '10px' }}>
            <span className="font-mono text-cyan" style={{ fontSize: '11px', fontWeight: 800 }}>
              03 // RUNTIME & COMPUTE (PI 5)
            </span>
            <span className="badge badge-measured">Prototype Measurement</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-heading)' }}>CPU Load</div>
                <div className="font-mono text-muted" style={{ fontSize: '10px' }}>Quad-Core Cortex-A76 @ 2.4GHz</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span className="font-mono text-green" style={{ fontSize: '14px', fontWeight: 800 }}>15.3%</span>
                <div><span className="badge badge-measured">Measured</span></div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-heading)' }}>RAM Working Set</div>
                <div className="font-mono text-muted" style={{ fontSize: '10px' }}>Resident Set Size (RSS)</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span className="font-mono text-green" style={{ fontSize: '14px', fontWeight: 800 }}>118 MB</span>
                <div><span className="badge badge-measured">Measured</span></div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-heading)' }}>Inference Time (INT8)</div>
                <div className="font-mono text-muted" style={{ fontSize: '10px' }}>ONNX Runtime CPU EP + NEON</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span className="font-mono text-green" style={{ fontSize: '14px', fontWeight: 800 }}>0.765 ms</span>
                <div><span className="badge badge-measured">Measured</span></div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-heading)' }}>ALSA Buffer Stability</div>
                <div className="font-mono text-muted" style={{ fontSize: '10px' }}>XRUN Underruns over 24 hrs</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span className="font-mono text-green" style={{ fontSize: '14px', fontWeight: 800 }}>0 Overruns</span>
                <div><span className="badge badge-measured">Measured</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
