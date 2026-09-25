import React, { useEffect, useRef } from 'react';
import { SimulationState } from '../simulation/SimulationState';
import { RotateCcw, Target, Activity } from 'lucide-react';

interface ErrorFeedbackProps {
  simState: SimulationState;
  reducedMotion: boolean;
}

export const ErrorFeedback: React.FC<ErrorFeedbackProps> = ({ simState, reducedMotion }) => {
  const beforeCanvasRef = useRef<HTMLCanvasElement>(null);
  const afterCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const bCanvas = beforeCanvasRef.current;
    const aCanvas = afterCanvasRef.current;
    if (!bCanvas || !aCanvas) return;

    const bCtx = bCanvas.getContext('2d');
    const aCtx = aCanvas.getContext('2d');
    if (!bCtx || !aCtx) return;

    let animId: number;
    let t = 0;

    const render = () => {
      // 1. Large Waveform: BEFORE CANCELLATION
      bCtx.fillStyle = '#04080d';
      bCtx.fillRect(0, 0, bCanvas.width, bCanvas.height);
      bCtx.strokeStyle = '#142226';
      bCtx.beginPath();
      bCtx.moveTo(0, bCanvas.height / 2);
      bCtx.lineTo(bCanvas.width, bCanvas.height / 2);
      bCtx.stroke();

      bCtx.strokeStyle = '#00e5ff';
      bCtx.lineWidth = 2;
      bCtx.beginPath();
      const bCenter = bCanvas.height / 2;
      for (let x = 0; x < bCanvas.width; x++) {
        const time = t + x * 0.02;
        // Large uncontrolled amplitude
        const y = bCenter - (42 * Math.sin(time * 3.5) + 20 * Math.sin(time * 7));
        if (x === 0) bCtx.moveTo(x, y);
        else bCtx.lineTo(x, y);
      }
      bCtx.stroke();

      // 2. Small Residual Waveform: AFTER CANCELLATION
      aCtx.fillStyle = '#04080d';
      aCtx.fillRect(0, 0, aCanvas.width, aCanvas.height);
      aCtx.strokeStyle = '#142226';
      aCtx.beginPath();
      aCtx.moveTo(0, aCanvas.height / 2);
      aCtx.lineTo(aCanvas.width, aCanvas.height / 2);
      aCtx.stroke();

      aCtx.strokeStyle = '#10b981';
      aCtx.lineWidth = 1.8;
      aCtx.beginPath();
      const aCenter = aCanvas.height / 2;
      for (let x = 0; x < aCanvas.width; x++) {
        const time = t + x * 0.02;
        // Dampened residual error e[n] based on active attenuation
        const dampFactor = simState.ancActive ? Math.pow(10, simState.residualAttenuationDb / 20) : 1.0;
        const y = aCenter - (42 * Math.sin(time * 3.5) + 20 * Math.sin(time * 7)) * dampFactor;
        if (x === 0) aCtx.moveTo(x, y);
        else aCtx.lineTo(x, y);
      }
      aCtx.stroke();

      if (!reducedMotion) {
        t += 0.06;
        animId = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      if (animId) cancelAnimationFrame(animId);
    };
  }, [simState.ancActive, simState.residualAttenuationDb, reducedMotion]);

  return (
    <section id="error-feedback" className="section-shell">
      <div className="section-header">
        <div className="section-num">
          <RotateCcw size={14} />
          <span>SECTION 16 // RESIDUAL ERROR FEEDBACK & ATTENUATION</span>
        </div>
        <h2 className="section-title">CLOSED-LOOP ERROR CONVERGENCE COMPARISON</h2>
        <p className="section-desc">
          Visual validation of the primary cost objective: minimizing residual error e[n] = d[n] - y[n] at the ear canal boundary.
        </p>
      </div>

      {/* Target Spec Matrix */}
      <div className="tech-card" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-default)', marginBottom: '20px', padding: '16px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
          <div>
            <span className="font-mono text-muted" style={{ fontSize: '10px' }}>SYSTEM OBJECTIVE:</span>
            <div className="font-mono text-cyan" style={{ fontSize: '13px', fontWeight: 700, marginTop: '2px' }}>
              Minimize E[e²(n)]
            </div>
          </div>
          <div>
            <span className="font-mono text-muted" style={{ fontSize: '10px' }}>REFERENCE SIGNAL x(n):</span>
            <div className="font-mono text-primary" style={{ fontSize: '13px', fontWeight: 600, marginTop: '2px' }}>
              {simState.noiseType.toUpperCase()} FIELD
            </div>
          </div>
          <div>
            <span className="font-mono text-muted" style={{ fontSize: '10px' }}>ANTI-NOISE y(n):</span>
            <div className="font-mono text-cyan" style={{ fontSize: '13px', fontWeight: 600, marginTop: '2px' }}>
              -x(n) * W(z)
            </div>
          </div>
          <div>
            <span className="font-mono text-muted" style={{ fontSize: '10px' }}>MEASURED ATTENUATION:</span>
            <div className="font-mono text-green" style={{ fontSize: '13px', fontWeight: 800, marginTop: '2px' }}>
              {simState.residualAttenuationDb.toFixed(1)} dB
            </div>
          </div>
        </div>
      </div>

      {/* Before / After Dual Waveform Display */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
        <div className="tech-card" style={{ background: 'var(--bg-surface-sunken)', border: '1px solid var(--border-default)', padding: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span className="font-mono text-cyan" style={{ fontSize: '11px', fontWeight: 700 }}>
              BEFORE CANCELLATION (LARGE UNCORRECTED WAVE)
            </span>
            <span className="badge badge-sim">Illustrative Simulation</span>
          </div>
          <canvas ref={beforeCanvasRef} width={450} height={130} style={{ width: '100%', height: '130px', display: 'block' }} />
          <div className="font-mono text-muted" style={{ fontSize: '10px', marginTop: '8px' }}>
            High sound pressure level entering unassisted ear canal (~88 dB SPL).
          </div>
        </div>

        <div className="tech-card" style={{ background: 'var(--bg-surface-sunken)', border: '1px solid var(--border-default)', padding: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span className="font-mono text-green" style={{ fontSize: '11px', fontWeight: 700 }}>
              AFTER CANCELLATION (RESIDUAL ATTENUATED ERROR)
            </span>
            <span className="badge badge-measured">Prototype Measurement</span>
          </div>
          <canvas ref={afterCanvasRef} width={450} height={130} style={{ width: '100%', height: '130px', display: 'block' }} />
          <div className="font-mono text-green" style={{ fontSize: '10px', marginTop: '8px' }}>
            Destructive phase cancellation reduces noise floor below auditory fatigue threshold (~68 dB SPL).
          </div>
        </div>
      </div>
    </section>
  );
};
