import React, { useEffect, useRef, useState } from 'react';
import { Mic, Radio, Shield, Waves } from 'lucide-react';
import { SimulationState } from '../simulation/SimulationState';

interface AudioSensingProps {
  simState: SimulationState;
  reducedMotion: boolean;
}

type SelectedMic = 'reference' | 'primary' | 'boom';

export const AudioSensing: React.FC<AudioSensingProps> = ({ simState, reducedMotion }) => {
  const [selectedMic, setSelectedMic] = useState<SelectedMic>('reference');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let t = 0;

    const render = () => {
      ctx.fillStyle = '#050a0f';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw Center Axis
      ctx.strokeStyle = '#16282b';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, canvas.height / 2);
      ctx.lineTo(canvas.width, canvas.height / 2);
      ctx.stroke();

      // Waveform configuration depending on selected mic
      let strokeColor = '#00e5ff';
      if (selectedMic === 'primary') strokeColor = '#3b82f6';
      if (selectedMic === 'boom') strokeColor = '#10b981';

      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = 2;
      ctx.beginPath();

      const centerY = canvas.height / 2;
      const width = canvas.width;

      for (let x = 0; x < width; x++) {
        const time = t + x * 0.015;
        let y = 0;

        if (selectedMic === 'reference') {
          // Pure environmental noise (Helicopter / Vehicle / Wind)
          if (simState.noiseType === 'vehicle') {
            y = 28 * Math.sin(time * 3) + 14 * Math.sin(time * 7 + 0.4) + 8 * (Math.sin(time * 19));
          } else if (simState.noiseType === 'helicopter') {
            const blade = 0.5 + 0.5 * Math.sin(time * 2.2);
            y = blade * (38 * Math.sin(time * 8) + 15 * Math.sin(time * 16));
          } else {
            y = 25 * Math.sin(time * 4) + 12 * Math.sin(time * 9);
          }
        } else if (selectedMic === 'primary') {
          // Combined speech + acoustic noise
          const noiseComp = 20 * Math.sin(time * 3.5) + 10 * Math.sin(time * 8);
          const speechComp = simState.speechEnabled
            ? (Math.sin(time * 1.5) > 0.1 ? 30 * Math.sin(time * 12) * Math.sin(time * 1.5) : 0)
            : 0;
          y = noiseComp + speechComp;
        } else {
          // Boom mic (Clean near-field speech)
          const speechEnvelope = Math.max(0, Math.sin(time * 1.8));
          y = speechEnvelope * (36 * Math.sin(time * 14) + 18 * Math.sin(time * 28));
        }

        const plotY = centerY - y;
        if (x === 0) ctx.moveTo(x, plotY);
        else ctx.lineTo(x, plotY);
      }

      ctx.stroke();

      if (!reducedMotion) {
        t += 0.08;
        animId = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      if (animId) cancelAnimationFrame(animId);
    };
  }, [selectedMic, simState.noiseType, simState.speechEnabled, reducedMotion]);

  const micDetails = {
    reference: {
      name: 'REFERENCE MICROPHONE',
      tag: 'OUTER SHELL TRANSDUCER',
      capture: 'Environmental acoustic reference d(t) [Vehicle engine roar, rotor wash, ambient field]',
      usedBy: 'Real-time noise estimation & FxLMS/NLMS adaptive filter controller',
      placement: 'Exterior ear-cup acoustically ported enclosure',
      specs: '16.0 kHz PCM | 16-bit | ALSA hw:1,0 Channel 1'
    },
    primary: {
      name: 'PRIMARY MICROPHONE',
      tag: 'HEADSET INNER TRANSDUCER',
      capture: 'Combined near-field speech s(t) plus attenuated ambient noise v(t)',
      usedBy: 'Dual-channel noise cancellation, energy-ratio VAD, and spectral fusion',
      placement: 'Near ear canal boundary / inner cup cavity',
      specs: '16.0 kHz PCM | 16-bit | ALSA hw:1,0 Channel 0'
    },
    boom: {
      name: 'BOOM / COMMUNICATION MIC',
      tag: 'NEAR-MOUTH DIRECTIONAL SENSOR',
      capture: 'Pristine tactical communications speech s(t)',
      usedBy: 'Voice Activity Detection, neural speech enhancement, and tactical radio uplink',
      placement: 'Rigid adjustable boom arm positioned within 20mm of soldier lips',
      specs: 'Directional Cardioid Pickup | 92 dB Dynamic Range'
    }
  };

  const curr = micDetails[selectedMic];

  return (
    <section id="sensing" className="section-shell">
      <div className="section-header">
        <div className="section-num">
          <Mic size={14} />
          <span>SECTION 05 // AUDIO SENSING</span>
        </div>
        <h2 className="section-title">THREE-CHANNEL ACOUSTIC SENSING TOPOLOGY</h2>
        <p className="section-desc">
          Tri-microphone acoustic acquisition isolating ambient battlefield noise, localized ear canal sound, and directional vocal tract excitation.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
        {/* Left Column: Interactive Mic Selector */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {(['reference', 'primary', 'boom'] as SelectedMic[]).map((key) => {
            const isSelected = selectedMic === key;
            const data = micDetails[key];
            const color = key === 'reference' ? 'var(--signal-cyan)' : key === 'primary' ? 'var(--signal-blue)' : 'var(--signal-green)';

            return (
              <div
                key={key}
                onClick={() => setSelectedMic(key)}
                className="tech-card tech-card-interactive"
                style={{
                  borderColor: isSelected ? color : 'var(--border-default)',
                  background: isSelected ? 'var(--bg-surface-elevated)' : 'var(--bg-surface)',
                  padding: '16px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <span className="font-mono" style={{ fontSize: '10px', color: color, fontWeight: 700 }}>
                    {data.tag}
                  </span>
                  {isSelected && <span className="status-dot status-dot-active" style={{ background: color }} />}
                </div>
                <div style={{ fontSize: '14px', fontWeight: 800, color: 'var(--text-heading)' }}>
                  {data.name}
                </div>
                <div className="font-mono text-muted" style={{ fontSize: '10px', marginTop: '4px' }}>
                  {data.specs}
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Active Mic Deep Dive & Live 2D Waveform */}
        <div
          className="tech-card"
          style={{
            background: 'var(--bg-surface-sunken)',
            border: '1px solid var(--border-default)',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}
        >
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <div>
                <span className="font-mono text-cyan" style={{ fontSize: '11px', fontWeight: 700 }}>
                  ACTIVE SENSOR // {curr.name}
                </span>
                <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-heading)', marginTop: '2px' }}>
                  Acoustic Transduction Profile
                </div>
              </div>
              <span className="badge badge-sim">Deterministic 2D Waveform</span>
            </div>

            {/* Canvas 2D Waveform Display */}
            <div style={{ border: '1px solid var(--border-subtle)', borderRadius: '3px', overflow: 'hidden', marginBottom: '16px' }}>
              <canvas
                ref={canvasRef}
                width={500}
                height={120}
                style={{ width: '100%', height: '120px', display: 'block' }}
              />
            </div>

            {/* Deep Metadata */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <span className="font-mono text-muted" style={{ fontSize: '10px' }}>ACOUSTIC CAPTURE TARGET:</span>
                <div style={{ fontSize: '13px', color: 'var(--text-primary)', marginTop: '2px' }}>
                  {curr.capture}
                </div>
              </div>

              <div>
                <span className="font-mono text-muted" style={{ fontSize: '10px' }}>DOWNSTREAM SUBSYSTEM USAGE:</span>
                <div className="text-cyan font-mono" style={{ fontSize: '12px', marginTop: '2px' }}>
                  {curr.usedBy}
                </div>
              </div>

              <div>
                <span className="font-mono text-muted" style={{ fontSize: '10px' }}>PHYSICAL MOUNTING:</span>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                  {curr.placement}
                </div>
              </div>
            </div>
          </div>

          <div style={{ marginTop: '16px', paddingTop: '10px', borderTop: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between' }}>
            <span className="font-mono text-muted" style={{ fontSize: '10px' }}>ACOUSTIC CALIBRATION: S21(f)</span>
            <span className="font-mono text-green" style={{ fontSize: '10px' }}>HARDWARE LINE OK</span>
          </div>
        </div>
      </div>
    </section>
  );
};
