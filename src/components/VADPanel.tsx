import React, { useEffect, useRef } from 'react';
import { SimulationState } from '../simulation/SimulationState';
import { ShieldCheck, Mic, Activity } from 'lucide-react';

interface VADPanelProps {
  simState: SimulationState;
  reducedMotion: boolean;
}

export const VADPanel: React.FC<VADPanelProps> = ({ simState, reducedMotion }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let t = 0;

    const render = () => {
      ctx.fillStyle = '#04080d';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const width = canvas.width;
      const height = canvas.height;
      const halfH = height / 2;

      // Draw Center Dividers
      ctx.strokeStyle = '#142226';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, height * 0.25);
      ctx.lineTo(width, height * 0.25);
      ctx.moveTo(0, height * 0.75);
      ctx.lineTo(width, height * 0.75);
      ctx.stroke();

      // Protected Speech Region Box (Highlighted in green tint)
      if (simState.speechEnabled) {
        ctx.fillStyle = 'rgba(16, 185, 129, 0.08)';
        ctx.fillRect(width * 0.25, 0, width * 0.5, height);
        ctx.strokeStyle = 'rgba(16, 185, 129, 0.4)';
        ctx.strokeRect(width * 0.25, 0, width * 0.5, height);

        ctx.fillStyle = '#10b981';
        ctx.font = '10px monospace';
        ctx.fillText('PROTECTED SPEECH REGION (FILTER UPDATE FROZEN)', width * 0.27, 16);
      }

      // 1. Draw Noise Waveform (Cyan/Blue) at top half
      ctx.strokeStyle = '#00e5ff';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      for (let x = 0; x < width; x++) {
        const time = t + x * 0.02;
        const noiseY = height * 0.25 - (18 * Math.sin(time * 3.5) + 9 * Math.sin(time * 8));
        if (x === 0) ctx.moveTo(x, noiseY);
        else ctx.lineTo(x, noiseY);
      }
      ctx.stroke();

      // 2. Draw Speech Waveform (Green) at bottom half
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (let x = 0; x < width; x++) {
        const time = t + x * 0.02;
        let speechAmp = 0;
        // Speech active within center region if enabled
        if (simState.speechEnabled && x >= width * 0.25 && x <= width * 0.75) {
          const env = Math.sin((x - width * 0.25) / (width * 0.5) * Math.PI);
          speechAmp = env * (28 * Math.sin(time * 14) + 14 * Math.sin(time * 26));
        }
        const speechY = height * 0.75 - speechAmp;
        if (x === 0) ctx.moveTo(x, speechY);
        else ctx.lineTo(x, speechY);
      }
      ctx.stroke();

      // Labels on canvas
      ctx.fillStyle = '#00e5ff';
      ctx.font = '9px monospace';
      ctx.fillText('NOISE WAVEFORM d[n] (CYAN)', 10, height * 0.25 - 22);

      ctx.fillStyle = '#10b981';
      ctx.fillText('SPEECH WAVEFORM s[n] (GREEN)', 10, height * 0.75 - 22);

      if (!reducedMotion) {
        t += 0.06;
        animId = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      if (animId) cancelAnimationFrame(animId);
    };
  }, [simState.speechEnabled, reducedMotion]);

  return (
    <section id="speech-vad" className="section-shell">
      <div className="section-header">
        <div className="section-num">
          <ShieldCheck size={14} />
          <span>SECTION 09 // SPEECH DETECTION & VAD PROTECTION</span>
        </div>
        <h2 className="section-title">VOICE ACTIVITY DETECTION & ADAPTIVE FILTER FREEZE</h2>
        <p className="section-desc">
          When near-field human voice activity is detected by dual-criterion energy ratio and formant spectral flux,
          the supervisor immediately inhibits coefficient updates on the ANC adaptive filter, preventing speech distortion.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
        {/* Canvas Dual Waveforms */}
        <div className="tech-card" style={{ background: 'var(--bg-surface-sunken)', border: '1px solid var(--border-default)', padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <span className="font-mono text-cyan" style={{ fontSize: '11px', fontWeight: 700 }}>
              DUAL-CHANNEL VAD ANALYSIS OSCILLOGRAM
            </span>
            <span className={`badge ${simState.speechEnabled ? 'badge-measured' : 'badge-sim'}`}>
              {simState.speechEnabled ? 'SPEECH PROTECTION ACTIVE' : 'NO SPEECH (STANDBY)'}
            </span>
          </div>

          <canvas ref={canvasRef} width={500} height={180} style={{ width: '100%', height: '180px', display: 'block' }} />

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '12px', fontSize: '11px', fontFamily: 'var(--font-mono)' }}>
            <span className="text-muted">ENERGY RATIO: {simState.vadEnergyRatio} dB</span>
            <span className="text-green">DECISION: {simState.speechEnabled ? 'HOLD WEIGHTS' : 'UPDATE ADAPTING'}</span>
          </div>
        </div>

        {/* Technical VAD Explanation Card */}
        <div className="tech-card" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-default)', padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <span className="font-mono text-cyan" style={{ fontSize: '11px', fontWeight: 700 }}>
                DOUBLE-TALK PROTECTION LOGIC
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ background: 'var(--bg-surface-elevated)', padding: '10px', borderRadius: '3px', border: '1px solid var(--border-subtle)' }}>
                <span className="font-mono text-muted" style={{ fontSize: '10px' }}>PROBLEM: DOUBLE-TALK CANCELLATION</span>
                <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px', lineHeight: 1.5 }}>
                  If speech enters the primary microphone while the adaptive filter is updating, the filter attempts to cancel the speech as if it were ambient noise, causing severe vocal distortion.
                </p>
              </div>

              <div style={{ background: 'var(--bg-surface-elevated)', padding: '10px', borderRadius: '3px', border: '1px solid var(--signal-green)' }}>
                <span className="font-mono text-green" style={{ fontSize: '10px' }}>SOLUTION: AI VAD SUPERVISOR FREEZE</span>
                <p style={{ fontSize: '12px', color: 'var(--text-primary)', marginTop: '2px', lineHeight: 1.5 }}>
                  The VAD instantly sets step-size μ = 0 during vocal bursts. The filter continues applying the previously learned acoustic null without adapting to or corrupting the desired speech signal.
                </p>
              </div>
            </div>
          </div>

          <div style={{ marginTop: '16px', paddingTop: '10px', borderTop: '1px solid var(--border-subtle)' }}>
            <span className="badge badge-target">TARGET: ZERO SPEECH CANCEL DISTORTION</span>
          </div>
        </div>
      </div>
    </section>
  );
};
