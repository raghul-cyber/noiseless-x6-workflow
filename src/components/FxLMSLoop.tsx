import React, { useEffect, useState } from 'react';
import { SimulationState } from '../simulation/SimulationState';
import { Activity, BarChart, Sliders } from 'lucide-react';

interface FxLMSLoopProps {
  simState: SimulationState;
  reducedMotion: boolean;
}

export const FxLMSLoop: React.FC<FxLMSLoopProps> = ({ simState, reducedMotion }) => {
  // 16 representative FIR filter coefficient taps
  const [filterTaps, setFilterTaps] = useState<number[]>([
    0.05, 0.12, 0.28, 0.54, 0.82, 0.65, 0.32, -0.15, -0.45, -0.72, -0.48, -0.22, 0.08, 0.18, 0.06, 0.02
  ]);

  useEffect(() => {
    if (reducedMotion) return;
    const interval = setInterval(() => {
      setFilterTaps((prev) =>
        prev.map((val, idx) => {
          // Micro-adaptation around steady state taps
          const jitter = (Math.sin(Date.now() * 0.003 + idx) * 0.04);
          return Math.max(-1, Math.min(1, val + jitter));
        })
      );
    }, 100);
    return () => clearInterval(interval);
  }, [reducedMotion]);

  return (
    <section id="fxlms-loop" className="section-shell">
      <div className="section-header">
        <div className="section-num">
          <Activity size={14} />
          <span>SECTION 12 // FxLMS / NLMS MATHEMATICAL SPECIFICATION</span>
        </div>
        <h2 className="section-title">FILTERED-X LMS ADAPTATION & CONVERGENCE DYNAMICS</h2>
        <p className="section-desc">
          Mathematical formulation of the Filtered-X Normalized Least Mean Squares (FxLMS) algorithm compensating for
          electro-acoustic speaker and ear-canal secondary path transfer function S(z).
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '20px' }}>
        {/* Left: Animated Filter Coefficient Taps */}
        <div className="tech-card" style={{ background: 'var(--bg-surface-sunken)', border: '1px solid var(--border-default)', padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <span className="font-mono text-cyan" style={{ fontSize: '11px', fontWeight: 700 }}>
              FILTER WEIGHT VECTOR W[n] (64 TAPS TOTAL)
            </span>
            <span className="badge badge-sim">Real-Time Tap Adaptation</span>
          </div>

          <p className="font-mono text-muted" style={{ fontSize: '11px', marginBottom: '16px' }}>
            w_k[n+1] = w_k[n] + μ · e[n] · x'(n-k) / (||x'||² + ε)
          </p>

          {/* Bar Chart of Filter Taps */}
          <div
            style={{
              height: '140px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '4px',
              padding: '10px 0',
              borderBottom: '1px solid var(--border-subtle)',
              borderTop: '1px solid var(--border-subtle)',
              position: 'relative'
            }}
          >
            {/* Center Zero Line */}
            <div style={{ position: 'absolute', left: 0, right: 0, top: '50%', height: '1px', background: 'var(--border-default)' }} />

            {filterTaps.map((tap, idx) => {
              const isPositive = tap >= 0;
              const barHeight = Math.abs(tap) * 55;

              return (
                <div
                  key={idx}
                  style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%',
                    position: 'relative'
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      bottom: isPositive ? '50%' : undefined,
                      top: !isPositive ? '50%' : undefined,
                      width: '80%',
                      height: `${barHeight}px`,
                      background: isPositive ? 'var(--signal-cyan)' : 'var(--signal-blue)',
                      borderRadius: '1px',
                      transition: 'height 0.1s ease'
                    }}
                  />
                </div>
              );
            })}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', fontSize: '10px', fontFamily: 'var(--font-mono)' }}>
            <span className="text-muted">TAP 00</span>
            <span className="text-cyan">TAPS 01 - 16 (REPRESENTATIVE SUBSET)</span>
            <span className="text-muted">TAP 63</span>
          </div>
        </div>

        {/* Right: Convergence Graph */}
        <div className="tech-card" style={{ background: 'var(--bg-surface-sunken)', border: '1px solid var(--border-default)', padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <span className="font-mono text-cyan" style={{ fontSize: '11px', fontWeight: 700 }}>
              ERROR ENERGY CONVERGENCE J(n) = E[e²(n)]
            </span>
            <span className="badge badge-sim">Illustrative DSP Simulation</span>
          </div>

          {/* Convergence SVG Graph */}
          <div style={{ border: '1px solid var(--border-subtle)', borderRadius: '3px', background: 'var(--bg-surface)', padding: '12px' }}>
            <svg viewBox="0 0 400 130" width="100%" height="130" style={{ display: 'block' }}>
              {/* Axes */}
              <line x1="40" y1="10" x2="40" y2="110" stroke="var(--border-default)" strokeWidth="1.5" />
              <line x1="40" y1="110" x2="380" y2="110" stroke="var(--border-default)" strokeWidth="1.5" />

              <text x="35" y="20" fill="var(--text-muted)" fontSize="8.5" fontFamily="var(--font-mono)" textAnchor="end">HIGH</text>
              <text x="35" y="108" fill="var(--text-muted)" fontSize="8.5" fontFamily="var(--font-mono)" textAnchor="end">-24dB</text>
              <text x="380" y="122" fill="var(--text-muted)" fontSize="8.5" fontFamily="var(--font-mono)" textAnchor="end">TIME (SAMPLES) &rarr;</text>

              {/* Exponential Decay Convergence Curve */}
              <path
                d="M 40 22 C 80 25, 120 70, 180 88 C 240 102, 310 104, 370 104"
                fill="none"
                stroke="var(--signal-green)"
                strokeWidth="2.5"
              />

              {/* Converged Steady State marker */}
              <circle cx="280" cy="103" r="3.5" fill="var(--signal-green)" />
              <text x="285" y="96" fill="var(--signal-green)" fontSize="9" fontFamily="var(--font-mono)">
                Steady-State Floor (-19.4 dB)
              </text>
            </svg>
          </div>

          <div style={{ marginTop: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span className="font-mono text-muted" style={{ fontSize: '10.5px' }}>CONVERGENCE TIME: &lt; 85 ms</span>
            <span className="font-mono text-green" style={{ fontSize: '10.5px' }}>STABILITY MARGIN: +9.2 dB</span>
          </div>
        </div>
      </div>
    </section>
  );
};
