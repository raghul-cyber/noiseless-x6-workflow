import React from 'react';
import { NoiseClass, SimulationState } from '../simulation/SimulationState';
import { ShieldAlert, RefreshCw, Zap, ArrowRight } from 'lucide-react';

interface NoiseClassifierProps {
  simState: SimulationState;
  onSelectState: (state: NoiseClass) => void;
  reducedMotion: boolean;
}

export const NoiseClassifier: React.FC<NoiseClassifierProps> = ({
  simState,
  onSelectState,
  reducedMotion
}) => {
  const states = [
    {
      key: 'STATIONARY' as NoiseClass,
      title: 'STATE A: STATIONARY',
      environment: 'Continuous vehicle engine rumble, diesel generator, steady aerodynamic flow',
      controller: 'FxLMS / NLMS Adaptive Filter',
      stepSize: 'μ = 0.015 (Standard)',
      color: 'var(--signal-cyan)',
      action: 'vehicle'
    },
    {
      key: 'NON-STATIONARY' as NoiseClass,
      title: 'STATE B: NON-STATIONARY',
      environment: 'Helicopter blade-vortex interaction, modulating machinery, dynamic wind gusts',
      controller: 'Adaptive Tracking ANC (Variable Step-Size)',
      stepSize: 'μ = 0.045 (Dynamic Fast)',
      color: 'var(--signal-blue)',
      action: 'helicopter'
    },
    {
      key: 'IMPULSIVE' as NoiseClass,
      title: 'STATE C: IMPULSIVE TRANSIENT',
      environment: 'Direct small-arms gunfire, mortar blast shockwave, sudden metal collision',
      controller: 'Robust Impulse Protection Path & Haptic Alert',
      stepSize: 'Clamping envelope g[n] < 0.05',
      color: 'var(--signal-amber)',
      action: 'impulse'
    }
  ];

  return (
    <section id="noise-classifier" className="section-shell">
      <div className="section-header">
        <div className="section-num">
          <Zap size={14} />
          <span>SECTION 08 // NOISE CLASSIFICATION & DISPATCH</span>
        </div>
        <h2 className="section-title">THREE OPERATIONAL ACOUSTIC CLASSIFICATION STATES</h2>
        <p className="section-desc">
          The supervisory engine evaluates spectral kurtosis, crest factors, and convolutional embeddings to route signals
          to the optimal physical cancellation controller. Amber accent is strictly reserved for impulsive events.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))', gap: '16px' }}>
        {states.map((st) => {
          const isCurrent = simState.classification === st.key;

          return (
            <div
              key={st.key}
              onClick={() => onSelectState(st.key)}
              className="tech-card tech-card-interactive"
              style={{
                borderColor: isCurrent ? st.color : 'var(--border-default)',
                background: isCurrent ? 'var(--bg-surface-elevated)' : 'var(--bg-surface)',
                borderWidth: isCurrent ? '2px' : '1px',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span className="font-mono" style={{ fontSize: '11px', fontWeight: 800, color: st.color }}>
                    {st.title}
                  </span>
                  {isCurrent && (
                    <span
                      className="font-mono"
                      style={{
                        fontSize: '9.5px',
                        padding: '2px 6px',
                        background: st.color === 'var(--signal-amber)' ? 'rgba(245, 158, 11, 0.2)' : 'rgba(0, 229, 255, 0.1)',
                        color: st.color,
                        borderRadius: '2px',
                        border: `1px solid ${st.color}`
                      }}
                    >
                      ACTIVE STATE
                    </span>
                  )}
                </div>

                <div style={{ fontSize: '13px', color: 'var(--text-primary)', marginBottom: '14px', lineHeight: 1.5 }}>
                  <strong style={{ color: 'var(--text-heading)' }}>Operational Context: </strong>
                  {st.environment}
                </div>

                <div style={{ background: 'var(--bg-surface-sunken)', padding: '12px', borderRadius: '3px', border: '1px solid var(--border-subtle)' }}>
                  <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                    RECOMMENDED CONTROLLER:
                  </div>
                  <div className="font-mono" style={{ fontSize: '12.5px', fontWeight: 700, color: st.color, marginTop: '2px' }}>
                    {st.controller}
                  </div>
                  <div className="font-mono text-muted" style={{ fontSize: '10px', marginTop: '4px' }}>
                    {st.stepSize}
                  </div>
                </div>
              </div>

              <div style={{ marginTop: '16px', paddingTop: '10px', borderTop: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="font-mono text-muted" style={{ fontSize: '10px' }}>CLICK TO ENGAGE STATE</span>
                <span className="font-mono" style={{ fontSize: '10px', color: st.color }}>
                  SWITCH PATH &rarr;
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
