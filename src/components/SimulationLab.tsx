import React, { useEffect, useRef } from 'react';
import { NoiseType, SimulationState } from '../simulation/SimulationState';
import { SignalGenerator } from '../simulation/SignalGenerator';
import { Play, Pause, RotateCcw, Volume2, Mic, Activity, ShieldCheck, Zap } from 'lucide-react';

interface SimulationLabProps {
  simState: SimulationState;
  onUpdateState: (updates: Partial<SimulationState>) => void;
  onReset: () => void;
  reducedMotion: boolean;
}

export const SimulationLab: React.FC<SimulationLabProps> = ({
  simState,
  onUpdateState,
  onReset,
  reducedMotion
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const generatorRef = useRef<SignalGenerator>(new SignalGenerator());

  const noiseOptions: { key: NoiseType; label: string; desc: string }[] = [
    { key: 'vehicle', label: 'VEHICLE', desc: 'Continuous engine rumble' },
    { key: 'helicopter', label: 'HELICOPTER', desc: '18 Hz rotor blade modulation' },
    { key: 'wind', label: 'WIND', desc: 'Low-frequency turbulent gusts' },
    { key: 'machinery', label: 'MACHINERY', desc: 'Periodic mechanical impact' },
    { key: 'crowd', label: 'CROWD', desc: 'Multi-talker babble noise' },
    { key: 'impulse', label: 'IMPULSE', desc: 'Gunfire / explosive shockwave' }
  ];

  const handleNoiseChange = (type: NoiseType) => {
    let classification: SimulationState['classification'] = 'STATIONARY';
    let scores = { stationary: 82, nonStationary: 14, impulsive: 4 };
    let algorithm: SimulationState['selectedAlgorithm'] = 'FxLMS / NLMS';
    let mu = 0.015;
    let attenuation = -19.4;

    if (type === 'helicopter' || type === 'wind' || type === 'machinery' || type === 'crowd') {
      classification = 'NON-STATIONARY';
      scores = { stationary: 18, nonStationary: 76, impulsive: 6 };
      algorithm = 'Adaptive ANC';
      mu = 0.038;
      attenuation = -16.2;
    } else if (type === 'impulse') {
      classification = 'IMPULSIVE';
      scores = { stationary: 6, nonStationary: 12, impulsive: 82 };
      algorithm = 'Robust ANC';
      mu = 0.005;
      attenuation = -26.5;
      generatorRef.current.triggerImpulse();
    }

    onUpdateState({
      noiseType: type,
      classification,
      classificationScores: scores,
      selectedAlgorithm: algorithm,
      stepSizeMu: mu,
      residualAttenuationDb: attenuation,
      impulseTriggered: type === 'impulse'
    });
  };

  // Real-time Canvas Oscillator Rendering
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const render = () => {
      ctx.fillStyle = '#03070b';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const width = canvas.width;
      const height = canvas.height;
      const laneH = height / 4;

      // Draw Sub-lane grid lines & labels
      ctx.strokeStyle = '#122329';
      ctx.lineWidth = 1;
      for (let i = 1; i <= 3; i++) {
        ctx.beginPath();
        ctx.moveTo(0, i * laneH);
        ctx.lineTo(width, i * laneH);
        ctx.stroke();
      }

      ctx.font = '10px monospace';
      ctx.fillStyle = '#00e5ff';
      ctx.fillText('CH 1: REFERENCE NOISE x[n]', 10, 18);

      ctx.fillStyle = '#10b981';
      ctx.fillText('CH 2: DESIRED SPEECH s[n]', 10, laneH + 18);

      ctx.fillStyle = '#38bdf8';
      ctx.fillText('CH 3: PRIMARY CAPTURE s[n] + v[n]', 10, 2 * laneH + 18);

      ctx.fillStyle = '#34d399';
      ctx.fillText('CH 4: FINAL ENHANCED OUTPUT y_out[n]', 10, 3 * laneH + 18);

      // Render 4 channels deterministically
      const numPoints = width;
      const dt = 0.0018;

      // Channel 1: Reference
      ctx.beginPath();
      ctx.strokeStyle = '#00e5ff';
      ctx.lineWidth = 1.6;
      for (let x = 0; x < numPoints; x++) {
        const sample = generatorRef.current.getSample(
          dt,
          simState.noiseType,
          simState.speechEnabled,
          simState.ancActive,
          simState.residualAttenuationDb
        );
        const y = laneH * 0.5 - sample.referenceVal * (laneH * 0.38);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Channel 2: Speech
      ctx.beginPath();
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 1.6;
      for (let x = 0; x < numPoints; x++) {
        const sample = generatorRef.current.getSample(
          dt,
          simState.noiseType,
          simState.speechEnabled,
          simState.ancActive,
          simState.residualAttenuationDb
        );
        const y = laneH * 1.5 - sample.speechVal * (laneH * 0.42);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Channel 3: Primary (Speech + Noise)
      ctx.beginPath();
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 1.6;
      for (let x = 0; x < numPoints; x++) {
        const sample = generatorRef.current.getSample(
          dt,
          simState.noiseType,
          simState.speechEnabled,
          simState.ancActive,
          simState.residualAttenuationDb
        );
        const y = laneH * 2.5 - sample.primaryVal * (laneH * 0.32);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Channel 4: Residual / Clean Output
      ctx.beginPath();
      ctx.strokeStyle = '#34d399';
      ctx.lineWidth = 1.8;
      for (let x = 0; x < numPoints; x++) {
        const sample = generatorRef.current.getSample(
          dt,
          simState.noiseType,
          simState.speechEnabled,
          simState.ancActive,
          simState.residualAttenuationDb
        );
        const y = laneH * 3.5 - sample.residualVal * (laneH * 0.38);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      if (simState.isRunning && !reducedMotion) {
        animId = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      if (animId) cancelAnimationFrame(animId);
    };
  }, [
    simState.isRunning,
    simState.noiseType,
    simState.speechEnabled,
    simState.ancActive,
    simState.residualAttenuationDb,
    reducedMotion
  ]);

  return (
    <section id="simulation" className="section-shell" style={{ borderBottom: '2px solid var(--signal-cyan)' }}>
      <div className="section-header">
        <div className="section-num">
          <Zap size={14} className="text-cyan" />
          <span>SECTION 17 // CENTERPIECE LIVE SIMULATION LABORATORY</span>
        </div>
        <h2 className="section-title">END-TO-END INTERACTIVE ACOUSTIC SIMULATION</h2>
        <p className="section-desc">
          Test real-time deterministic mathematical acoustics under varying combat environmental noise sources,
          toggle speech double-talk, inspect neural classification decisions, and observe adaptive physical cancellation.
        </p>
      </div>

      {/* Main Simulation Control Deck */}
      <div
        className="tech-card"
        style={{
          background: 'var(--bg-surface)',
          border: '1px solid var(--border-highlight)',
          padding: '24px',
          marginBottom: '24px'
        }}
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
          {/* Master Transport Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              onClick={() => onUpdateState({ isRunning: !simState.isRunning })}
              style={{
                background: simState.isRunning ? 'rgba(239, 68, 68, 0.15)' : 'rgba(16, 185, 129, 0.2)',
                border: `1px solid ${simState.isRunning ? 'var(--signal-red)' : 'var(--signal-green)'}`,
                color: simState.isRunning ? 'var(--signal-red)' : 'var(--signal-green)',
                padding: '8px 16px',
                borderRadius: '3px',
                fontWeight: 800,
                fontSize: '11px',
                fontFamily: 'var(--font-mono)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              {simState.isRunning ? <Pause size={14} /> : <Play size={14} />}
              <span>{simState.isRunning ? 'STOP SIMULATION' : 'START SIMULATION'}</span>
            </button>

            <button
              onClick={onReset}
              style={{
                background: 'var(--bg-surface-elevated)',
                border: '1px solid var(--border-default)',
                color: 'var(--text-secondary)',
                padding: '8px 14px',
                borderRadius: '3px',
                fontWeight: 700,
                fontSize: '11px',
                fontFamily: 'var(--font-mono)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <RotateCcw size={14} />
              <span>RESET</span>
            </button>
          </div>

          {/* Subsystem Toggles */}
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '8px' }}>
            <button
              onClick={() => onUpdateState({ speechEnabled: !simState.speechEnabled })}
              style={{
                background: simState.speechEnabled ? 'rgba(16, 185, 129, 0.15)' : 'var(--bg-surface-sunken)',
                border: `1px solid ${simState.speechEnabled ? 'var(--signal-green)' : 'var(--border-default)'}`,
                color: simState.speechEnabled ? 'var(--signal-green)' : 'var(--text-muted)',
                padding: '6px 12px',
                borderRadius: '3px',
                fontSize: '11px',
                fontFamily: 'var(--font-mono)',
                cursor: 'pointer',
                fontWeight: 700
              }}
            >
              SPEECH: {simState.speechEnabled ? 'ENABLED' : 'DISABLED'}
            </button>

            <button
              onClick={() => onUpdateState({ aiActive: !simState.aiActive })}
              style={{
                background: simState.aiActive ? 'rgba(59, 130, 246, 0.15)' : 'var(--bg-surface-sunken)',
                border: `1px solid ${simState.aiActive ? 'var(--signal-blue)' : 'var(--border-default)'}`,
                color: simState.aiActive ? 'var(--signal-blue)' : 'var(--text-muted)',
                padding: '6px 12px',
                borderRadius: '3px',
                fontSize: '11px',
                fontFamily: 'var(--font-mono)',
                cursor: 'pointer',
                fontWeight: 700
              }}
            >
              AI: {simState.aiActive ? 'ACTIVE' : 'BYPASS'}
            </button>

            <button
              onClick={() => onUpdateState({ ancActive: !simState.ancActive })}
              style={{
                background: simState.ancActive ? 'rgba(0, 229, 255, 0.15)' : 'var(--bg-surface-sunken)',
                border: `1px solid ${simState.ancActive ? 'var(--signal-cyan)' : 'var(--border-default)'}`,
                color: simState.ancActive ? 'var(--signal-cyan)' : 'var(--text-muted)',
                padding: '6px 12px',
                borderRadius: '3px',
                fontSize: '11px',
                fontFamily: 'var(--font-mono)',
                cursor: 'pointer',
                fontWeight: 700
              }}
            >
              ANC: {simState.ancActive ? 'ENGAGED' : 'MUTED'}
            </button>
          </div>
        </div>

        {/* Noise Source Selector Group */}
        <div style={{ marginBottom: '20px' }}>
          <span className="font-mono text-muted" style={{ fontSize: '10.5px', textTransform: 'uppercase' }}>
            SELECT ENVIRONMENTAL NOISE EMITTER:
          </span>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
              gap: '8px',
              marginTop: '8px'
            }}
          >
            {noiseOptions.map((opt) => {
              const isSelected = simState.noiseType === opt.key;
              const isAmber = opt.key === 'impulse';
              const activeBorder = isAmber ? 'var(--signal-amber)' : 'var(--signal-cyan)';
              const activeBg = isAmber ? 'rgba(245, 158, 11, 0.15)' : 'rgba(0, 229, 255, 0.1)';
              const activeColor = isAmber ? 'var(--signal-amber)' : 'var(--signal-cyan)';

              return (
                <button
                  key={opt.key}
                  onClick={() => handleNoiseChange(opt.key)}
                  style={{
                    background: isSelected ? activeBg : 'var(--bg-surface-sunken)',
                    border: `1px solid ${isSelected ? activeBorder : 'var(--border-default)'}`,
                    color: isSelected ? activeColor : 'var(--text-secondary)',
                    padding: '10px 12px',
                    borderRadius: '3px',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div className="font-mono" style={{ fontSize: '11.5px', fontWeight: 800 }}>
                    {opt.label}
                  </div>
                  <div style={{ fontSize: '9.5px', color: 'var(--text-muted)', marginTop: '2px' }}>
                    {opt.desc}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 4-Channel Synchronous Waveform Canvas */}
        <div style={{ border: '1px solid var(--border-default)', borderRadius: '4px', overflow: 'hidden', background: '#03070b' }}>
          <canvas ref={canvasRef} width={900} height={360} style={{ width: '100%', height: '360px', display: 'block' }} />
        </div>

        {/* System State Telemetry Bar */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
            gap: '12px',
            marginTop: '16px',
            paddingTop: '16px',
            borderTop: '1px solid var(--border-subtle)'
          }}
        >
          <div>
            <span className="font-mono text-muted" style={{ fontSize: '9.5px' }}>SYSTEM STATUS</span>
            <div className="font-mono text-green" style={{ fontSize: '11px', fontWeight: 700, marginTop: '2px' }}>
              {simState.isRunning ? 'ACTIVE' : 'STANDBY'}
            </div>
          </div>
          <div>
            <span className="font-mono text-muted" style={{ fontSize: '9.5px' }}>CURRENT NOISE</span>
            <div className="font-mono text-cyan" style={{ fontSize: '11px', fontWeight: 700, marginTop: '2px' }}>
              {simState.noiseType.toUpperCase()}
            </div>
          </div>
          <div>
            <span className="font-mono text-muted" style={{ fontSize: '9.5px' }}>CLASSIFICATION</span>
            <div className="font-mono text-blue" style={{ fontSize: '11px', fontWeight: 700, marginTop: '2px' }}>
              {simState.classification}
            </div>
          </div>
          <div>
            <span className="font-mono text-muted" style={{ fontSize: '9.5px' }}>SPEECH DETECTED</span>
            <div className="font-mono text-green" style={{ fontSize: '11px', fontWeight: 700, marginTop: '2px' }}>
              {simState.speechEnabled ? 'ACTIVE (VAD=1)' : 'QUIET (VAD=0)'}
            </div>
          </div>
          <div>
            <span className="font-mono text-muted" style={{ fontSize: '9.5px' }}>CONTROLLER</span>
            <div className="font-mono text-heading" style={{ fontSize: '11px', fontWeight: 700, marginTop: '2px' }}>
              {simState.selectedAlgorithm}
            </div>
          </div>
          <div>
            <span className="font-mono text-muted" style={{ fontSize: '9.5px' }}>FEEDBACK LOOP</span>
            <div className="font-mono text-green" style={{ fontSize: '11px', fontWeight: 700, marginTop: '2px' }}>
              STABLE ({simState.residualAttenuationDb.toFixed(1)} dB)
            </div>
          </div>
        </div>

        <div style={{ marginTop: '12px' }}>
          <span className="badge badge-sim">BROWSER-BASED SIGNAL SIMULATION</span>
        </div>
      </div>
    </section>
  );
};
