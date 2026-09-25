import React, { useEffect, useRef } from 'react';
import { SimulationState } from '../simulation/SimulationState';
import { Cpu, ShieldCheck, Activity, ArrowDown } from 'lucide-react';

interface SpeechEnhancementProps {
  simState: SimulationState;
  reducedMotion: boolean;
}

export const SpeechEnhancement: React.FC<SpeechEnhancementProps> = ({ simState, reducedMotion }) => {
  const beforeCanvasRef = useRef<HTMLCanvasElement>(null);
  const afterCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const beforeCanvas = beforeCanvasRef.current;
    const afterCanvas = afterCanvasRef.current;
    if (!beforeCanvas || !afterCanvas) return;

    const bCtx = beforeCanvas.getContext('2d');
    const aCtx = afterCanvas.getContext('2d');
    if (!bCtx || !aCtx) return;

    let animId: number;
    let t = 0;

    const render = () => {
      // 1. Render Before Waveform (Residual Audio containing noise leakage)
      bCtx.fillStyle = '#04080d';
      bCtx.fillRect(0, 0, beforeCanvas.width, beforeCanvas.height);
      bCtx.strokeStyle = '#16282b';
      bCtx.beginPath();
      bCtx.moveTo(0, beforeCanvas.height / 2);
      bCtx.lineTo(beforeCanvas.width, beforeCanvas.height / 2);
      bCtx.stroke();

      bCtx.strokeStyle = '#38bdf8';
      bCtx.lineWidth = 1.6;
      bCtx.beginPath();
      const bCenter = beforeCanvas.height / 2;
      for (let x = 0; x < beforeCanvas.width; x++) {
        const time = t + x * 0.02;
        // Speech + residual high frequency noise
        const speechPart = simState.speechEnabled ? 24 * Math.sin(time * 12) * Math.max(0, Math.sin(time * 2)) : 0;
        const residualNoisePart = 12 * Math.sin(time * 5.5) + 6 * Math.sin(time * 18);
        const y = bCenter - (speechPart + residualNoisePart);
        if (x === 0) bCtx.moveTo(x, y);
        else bCtx.lineTo(x, y);
      }
      bCtx.stroke();

      // 2. Render After Waveform (Neural Enhanced Speech with residual noise wiped clean)
      aCtx.fillStyle = '#04080d';
      aCtx.fillRect(0, 0, afterCanvas.width, afterCanvas.height);
      aCtx.strokeStyle = '#16282b';
      aCtx.beginPath();
      aCtx.moveTo(0, afterCanvas.height / 2);
      aCtx.lineTo(afterCanvas.width, afterCanvas.height / 2);
      aCtx.stroke();

      aCtx.strokeStyle = '#10b981';
      aCtx.lineWidth = 1.8;
      aCtx.beginPath();
      const aCenter = afterCanvas.height / 2;
      for (let x = 0; x < afterCanvas.width; x++) {
        const time = t + x * 0.02;
        // Clean speech with pure vocal harmonics and zero noise floor
        const speechPart = simState.speechEnabled ? 28 * Math.sin(time * 12) * Math.max(0, Math.sin(time * 2)) : 0;
        const y = aCenter - speechPart;
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
  }, [simState.speechEnabled, reducedMotion]);

  return (
    <section id="speech-enhancement" className="section-shell">
      <div className="section-header">
        <div className="section-num">
          <Cpu size={14} />
          <span>SECTION 14 // NEURAL SPEECH ENHANCEMENT (DEEPFILTERNET2)</span>
        </div>
        <h2 className="section-title">POST-ANC RESIDUAL SPEECH ENHANCEMENT</h2>
        <p className="section-desc">
          DeepFilterNet2 operates strictly as a <em>residual speech enhancement stage</em> — not the primary acoustic ANC controller.
          It cleans up high-frequency diffuse residual noise that physical acoustic interference cannot cancel.
        </p>
      </div>

      {/* Relationship Progression Pipeline */}
      <div className="tech-card" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-default)', marginBottom: '20px', padding: '16px' }}>
        <span className="font-mono text-cyan" style={{ fontSize: '11px', fontWeight: 700 }}>
          ARCHITECTURAL PIPELINE POSITION & RESPONSIBILITY HANDOFF
        </span>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: '12px',
            marginTop: '12px',
            fontSize: '12px',
            fontFamily: 'var(--font-mono)'
          }}
        >
          <span style={{ padding: '6px 12px', background: 'var(--bg-surface-elevated)', border: '1px solid var(--border-subtle)', borderRadius: '2px', color: 'var(--signal-cyan)' }}>
            01 // HYBRID ANC (PHYSICAL CANCELLATION)
          </span>
          <span style={{ color: 'var(--text-muted)' }}>&rarr;</span>
          <span style={{ padding: '6px 12px', background: 'var(--bg-surface-elevated)', border: '1px solid var(--border-subtle)', borderRadius: '2px', color: 'var(--text-secondary)' }}>
            02 // RESIDUAL NOISE LEAKAGE
          </span>
          <span style={{ color: 'var(--text-muted)' }}>&rarr;</span>
          <span style={{ padding: '6px 12px', background: 'var(--bg-surface-elevated)', border: '1px solid var(--signal-blue)', borderRadius: '2px', color: 'var(--signal-blue)' }}>
            03 // DEEPFILTERNET2 NEURAL MASKING
          </span>
          <span style={{ color: 'var(--text-muted)' }}>&rarr;</span>
          <span style={{ padding: '6px 12px', background: 'var(--bg-surface-elevated)', border: '1px solid var(--signal-green)', borderRadius: '2px', color: 'var(--signal-green)', fontWeight: 700 }}>
            04 // HIGH-INTELLIGIBILITY SPEECH
          </span>
        </div>
      </div>

      {/* Before / After Waveform Oscillograms */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '20px' }}>
        {/* Before: Residual Audio */}
        <div className="tech-card" style={{ background: 'var(--bg-surface-sunken)', border: '1px solid var(--border-default)', padding: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <span className="font-mono text-cyan" style={{ fontSize: '11px', fontWeight: 700 }}>
              INPUT: POST-ANC RESIDUAL AUDIO e[n]
            </span>
            <span className="badge badge-sim">Raw Residual Signal</span>
          </div>
          <canvas ref={beforeCanvasRef} width={450} height={120} style={{ width: '100%', height: '120px', display: 'block', borderRadius: '2px' }} />
          <div className="font-mono text-muted" style={{ fontSize: '10.5px', marginTop: '8px' }}>
            Contains speech + diffuse mid/high frequency residual acoustic leakage.
          </div>
        </div>

        {/* After: Enhanced Speech */}
        <div className="tech-card" style={{ background: 'var(--bg-surface-sunken)', border: '1px solid var(--border-default)', padding: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <span className="font-mono text-green" style={{ fontSize: '11px', fontWeight: 700 }}>
              OUTPUT: NEURAL ENHANCED SPEECH
            </span>
            <span className="badge badge-target">TARGET &lt; 20 ms LATENCY</span>
          </div>
          <canvas ref={afterCanvasRef} width={450} height={120} style={{ width: '100%', height: '120px', display: 'block', borderRadius: '2px' }} />
          <div className="font-mono text-green" style={{ fontSize: '10.5px', marginTop: '8px' }}>
            Deep filtering attenuates remaining noise floor, restoring vocal formants.
          </div>
        </div>
      </div>
    </section>
  );
};
