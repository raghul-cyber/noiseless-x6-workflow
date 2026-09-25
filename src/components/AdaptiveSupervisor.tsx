import React from 'react';
import { SimulationState, SupervisorState } from '../simulation/SimulationState';
import { Cpu, ArrowRight, RotateCcw, Shield, Activity } from 'lucide-react';

interface AdaptiveSupervisorProps {
  simState: SimulationState;
  onSetState: (st: SupervisorState) => void;
  reducedMotion: boolean;
}

export const AdaptiveSupervisor: React.FC<AdaptiveSupervisorProps> = ({
  simState,
  onSetState,
  reducedMotion
}) => {
  const fsmStates: { key: SupervisorState; label: string; desc: string; color: string }[] = [
    { key: 'NORMAL_ANC', label: 'NORMAL ANC', desc: 'Steady-state FxLMS filter | Fixed step-size μ', color: 'var(--signal-cyan)' },
    { key: 'ADAPTIVE_TRACKING', label: 'ADAPTIVE TRACKING', desc: 'High dynamic environment | Variable step-size tracking', color: 'var(--signal-blue)' },
    { key: 'IMPULSE_PROTECT', label: 'IMPULSE PROTECT', desc: 'Shockwave transient detected | Fast look-ahead clamp', color: 'var(--signal-amber)' },
    { key: 'FAST_RECOVERY', label: 'FAST RECOVERY', desc: 'Exponential gain release back to steady-state', color: 'var(--signal-green)' }
  ];

  return (
    <section id="adaptive-supervisor" className="section-shell">
      <div className="section-header">
        <div className="section-num">
          <Cpu size={14} />
          <span>SECTION 10 // AI ADAPTIVE SUPERVISOR</span>
        </div>
        <h2 className="section-title">CENTRAL SUPERVISORY FINITE STATE MACHINE</h2>
        <p className="section-desc">
          High-level executive controller dynamically balancing filter convergence rate against double-talk stability
          and acoustic shockwave protection.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
        {/* Left: Input / Output Matrix */}
        <div className="tech-card" style={{ background: 'var(--bg-surface-sunken)', border: '1px solid var(--border-default)', padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <span className="font-mono text-cyan" style={{ fontSize: '11px', fontWeight: 700 }}>
              SUPERVISORY CONTROL MATRIX
            </span>
            <span className="badge badge-measured">Deterministic FSM</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            {/* Controller Inputs */}
            <div style={{ background: 'var(--bg-surface)', padding: '12px', borderRadius: '3px', border: '1px solid var(--border-subtle)' }}>
              <span className="font-mono text-muted" style={{ fontSize: '10px' }}>CONTROLLER INPUTS:</span>
              <ul style={{ listStyle: 'none', marginTop: '6px', fontSize: '11px', fontFamily: 'var(--font-mono)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <li style={{ color: 'var(--signal-cyan)' }}>&bull; NOISE TYPE: {simState.classification}</li>
                <li style={{ color: 'var(--signal-green)' }}>&bull; SPEECH STATE: {simState.speechEnabled ? 'ACTIVE' : 'INACTIVE'}</li>
                <li style={{ color: 'var(--signal-amber)' }}>&bull; IMPULSE STATE: {simState.impulseTriggered ? 'TRIGGERED' : 'CLEAR'}</li>
                <li style={{ color: 'var(--text-secondary)' }}>&bull; RESIDUAL: {simState.residualAttenuationDb.toFixed(1)} dB</li>
              </ul>
            </div>

            {/* Controller Outputs */}
            <div style={{ background: 'var(--bg-surface)', padding: '12px', borderRadius: '3px', border: '1px solid var(--border-subtle)' }}>
              <span className="font-mono text-muted" style={{ fontSize: '10px' }}>CONTROLLER OUTPUTS:</span>
              <ul style={{ listStyle: 'none', marginTop: '6px', fontSize: '11px', fontFamily: 'var(--font-mono)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <li style={{ color: 'var(--text-heading)' }}>&bull; ALGORITHM: {simState.selectedAlgorithm}</li>
                <li style={{ color: 'var(--signal-cyan)' }}>&bull; STEP SIZE μ: {simState.stepSizeMu.toFixed(3)}</li>
                <li style={{ color: 'var(--signal-green)' }}>&bull; SUPPRESSION: {Math.abs(simState.residualAttenuationDb).toFixed(0)} dB</li>
                <li style={{ color: 'var(--signal-amber)' }}>&bull; IMPULSE CLAMP: {simState.impulseTriggered ? 'ACTIVE' : 'OFF'}</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Right: State Machine Cyclic Progression Visualizer */}
        <div className="tech-card" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-default)', padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <span className="font-mono text-cyan" style={{ fontSize: '11px', fontWeight: 700 }}>
              4-STATE CYCLIC MACHINE
            </span>
            <span className="badge badge-sim">State Transition Engine</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {fsmStates.map((st, idx) => {
              const isCurrent = simState.supervisorState === st.key;

              return (
                <div
                  key={st.key}
                  onClick={() => onSetState(st.key)}
                  style={{
                    background: isCurrent ? 'var(--bg-surface-elevated)' : 'var(--bg-surface-sunken)',
                    border: `1px solid ${isCurrent ? st.color : 'var(--border-subtle)'}`,
                    borderLeft: `4px solid ${st.color}`,
                    borderRadius: '3px',
                    padding: '10px 14px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span className="font-mono" style={{ fontSize: '12px', fontWeight: 800, color: st.color }}>
                        {st.label}
                      </span>
                      {isCurrent && <span className="status-dot status-dot-active" style={{ background: st.color }} />}
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                      {st.desc}
                    </div>
                  </div>

                  <span className="font-mono text-muted" style={{ fontSize: '9px' }}>
                    STATE 0{idx + 1}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
