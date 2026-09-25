import React, { useEffect, useState } from 'react';
import { SimulationState } from '../simulation/SimulationState';
import { Terminal, Activity, ArrowRight } from 'lucide-react';

interface SystemStateMonitorProps {
  simState: SimulationState;
  reducedMotion: boolean;
}

export const SystemStateMonitor: React.FC<SystemStateMonitorProps> = ({
  simState,
  reducedMotion
}) => {
  const [activeStageIdx, setActiveStageIdx] = useState(8);

  const stages = [
    { num: '00', name: 'ENVIRONMENT', desc: 'Acoustic field disturbance' },
    { num: '01', name: 'REFERENCE MIC', desc: 'External ambient sensor ingestion' },
    { num: '02', name: 'AUDIO CAPTURE', desc: 'I2S ADC synchronous quantization' },
    { num: '03', name: 'PREPROCESSING', desc: '18 Hz DC notch + Hann framing' },
    { num: '04', name: 'AI ANALYSIS', desc: 'YAMNet convolutional embeddings' },
    { num: '05', name: 'CLASSIFICATION', desc: 'Operational noise state decision' },
    { num: '06', name: 'VAD', desc: 'Vocal activity double-talk check' },
    { num: '07', name: 'CONTROLLER', desc: 'AI Supervisor parameter arbitration' },
    { num: '08', name: 'ANC', desc: 'Filtered-X LMS anti-noise synthesis' },
    { num: '09', name: 'SPEAKER', desc: 'Class-D acoustic wave radiation' },
    { num: '10', name: 'ERROR MIC', desc: 'Residual ear canal pressure probe' },
    { num: '11', name: 'ADAPTATION', desc: 'Gradient descent weight adjustment' },
    { num: '12', name: 'OUTPUT', desc: 'Pristine enhanced communication audio' }
  ];

  useEffect(() => {
    if (!simState.isRunning || reducedMotion) return;
    const interval = setInterval(() => {
      setActiveStageIdx((prev) => (prev + 1) % stages.length);
    }, 600);
    return () => clearInterval(interval);
  }, [simState.isRunning, reducedMotion, stages.length]);

  return (
    <section id="state-monitor" className="section-shell">
      <div className="section-header">
        <div className="section-num">
          <Terminal size={14} />
          <span>SECTION 18 // SYSTEM STATE MONITOR & EXECUTION PIPELINE</span>
        </div>
        <h2 className="section-title">REAL-TIME SUBSYSTEM STATE CONSOLE</h2>
        <p className="section-desc">
          Continuous deterministic state machine monitor tracking the active pipeline progression cycle through all 13 critical subsystems.
        </p>
      </div>

      <div
        className="tech-card"
        style={{
          background: 'var(--bg-surface-sunken)',
          border: '1px solid var(--border-default)',
          padding: '20px'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <span className="font-mono text-cyan" style={{ fontSize: '11px', fontWeight: 800 }}>
            PIPELINE EXECUTION CADENCE: 5.0 ms / HOP
          </span>
          <span className="badge badge-measured">CPU THREAD 0: RT-SCHED FIFO</span>
        </div>

        {/* 13 Stage Status Console Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
            gap: '8px'
          }}
        >
          {stages.map((stg, idx) => {
            const isActive = activeStageIdx === idx;
            const isSecondary = (activeStageIdx + 1) % stages.length === idx;

            let borderStyle = '1px solid var(--border-subtle)';
            let bgStyle = 'var(--bg-surface)';
            let textColor = 'var(--text-secondary)';

            if (isActive) {
              borderStyle = '1px solid var(--signal-cyan)';
              bgStyle = 'var(--bg-surface-elevated)';
              textColor = 'var(--signal-cyan)';
            } else if (isSecondary) {
              borderStyle = '1px solid var(--signal-blue)';
              bgStyle = 'var(--bg-surface)';
              textColor = 'var(--signal-blue)';
            }

            return (
              <div
                key={stg.num}
                style={{
                  border: borderStyle,
                  background: bgStyle,
                  borderRadius: '3px',
                  padding: '10px 12px',
                  transition: 'all 0.15s ease'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <span className="font-mono" style={{ fontSize: '10px', color: textColor, fontWeight: 700 }}>
                    {stg.num}
                  </span>
                  {isActive && <span className="status-dot status-dot-active" />}
                </div>
                <div style={{ fontSize: '11.5px', fontWeight: 700, color: 'var(--text-heading)' }}>
                  {stg.name}
                </div>
                <div className="font-mono text-muted" style={{ fontSize: '9px', marginTop: '2px', lineHeight: 1.3 }}>
                  {stg.desc}
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ marginTop: '16px', paddingTop: '10px', borderTop: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span className="font-mono text-muted" style={{ fontSize: '10.5px' }}>
            ACTIVE CONTEXT: {stages[activeStageIdx].name} ({stages[activeStageIdx].desc})
          </span>
          <span className="font-mono text-green" style={{ fontSize: '10.5px' }}>ZERO BUFFER OVERRUNS</span>
        </div>
      </div>
    </section>
  );
};
