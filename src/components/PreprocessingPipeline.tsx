import React, { useEffect, useRef, useState } from 'react';
import { SimulationState } from '../simulation/SimulationState';
import { STFTSimulation } from '../simulation/STFTSimulation';
import { Sliders, Cpu, Activity } from 'lucide-react';

interface PreprocessingPipelineProps {
  simState: SimulationState;
  reducedMotion: boolean;
}

export const PreprocessingPipeline: React.FC<PreprocessingPipelineProps> = ({
  simState,
  reducedMotion
}) => {
  const [activeStage, setActiveStage] = useState<number>(5); // default STFT/Spectrogram
  const specCanvasRef = useRef<HTMLCanvasElement>(null);
  const waveCanvasRef = useRef<HTMLCanvasElement>(null);

  const stages = [
    { num: '01', name: 'RAW AUDIO', desc: '16 kHz 16-bit signed PCM from ALSA buffer' },
    { num: '02', name: 'DC REMOVAL', desc: '1st-order IIR notch filter at 18 Hz' },
    { num: '03', name: 'PRE-EMPHASIS', desc: 'y[n] = x[n] - 0.97 x[n-1] high-frequency boost' },
    { num: '04', name: 'FRAMING', desc: '160 samples (10.0 ms frame), 80 samples (5.0 ms hop)' },
    { num: '05', name: 'WINDOWING', desc: 'Periodic Hann window w[n] = 0.5 - 0.5 cos(2πn/N)' },
    { num: '06', name: 'STFT ENGINE', desc: '512-point real FFT yielding 257 complex frequency bins' },
    { num: '07', name: 'SPECTROGRAM', desc: 'Log-magnitude power spectrum |X(t, f)| in decibels' },
    { num: '08', name: 'FEATURE MAP', desc: '64 log-mel triangular filterbank bins for neural inference' },
    { num: '09', name: 'AI INPUT', desc: 'Formatted tensor [1, 1, 96, 64] dispatched to ONNX EP' }
  ];

  // Draw Deterministic Spectrogram Canvas
  useEffect(() => {
    const canvas = specCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let timeStep = 0;

    const render = () => {
      ctx.fillStyle = '#03070b';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const numTimeSlices = 24;
      const numFreqBins = 16;
      const cellWidth = (canvas.width - 60) / numTimeSlices;
      const cellHeight = (canvas.height - 30) / numFreqBins;

      // Draw Grid Labels (Frequency Axis)
      ctx.fillStyle = '#64748b';
      ctx.font = '9px monospace';
      ctx.fillText('HIGH (8kHz)', 5, 20);
      ctx.fillText('MID (2kHz)', 5, canvas.height / 2);
      ctx.fillText('LOW (60Hz)', 5, canvas.height - 35);
      ctx.fillText('TIME (t) →', canvas.width - 70, canvas.height - 10);

      // Generate Deterministic Spectrogram Tiles based on active noise & speech
      for (let tIdx = 0; tIdx < numTimeSlices; tIdx++) {
        const sliceTime = timeStep + tIdx * 0.15;
        const bins = STFTSimulation.generateSpectrogramColumn(
          sliceTime,
          simState.noiseType,
          simState.speechEnabled
        );

        for (let fIdx = 0; fIdx < numFreqBins; fIdx++) {
          // Map to frequency index
          const mappedBinIdx = Math.min(bins.length - 1, Math.floor((fIdx / numFreqBins) * bins.length));
          const binMag = bins[mappedBinIdx].magnitude;

          // Color calculation: Deep military blue to cyan to white hot
          const r = Math.floor(binMag * 30);
          const g = Math.floor(binMag * 220);
          const b = Math.floor(120 + binMag * 135);
          const alpha = 0.2 + binMag * 0.8;

          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
          ctx.fillRect(
            60 + tIdx * cellWidth,
            canvas.height - 30 - (fIdx + 1) * cellHeight,
            cellWidth - 1,
            cellHeight - 1
          );
        }
      }

      if (!reducedMotion) {
        timeStep += 0.05;
        animId = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      if (animId) cancelAnimationFrame(animId);
    };
  }, [simState.noiseType, simState.speechEnabled, reducedMotion]);

  // Draw Time-Domain Waveform Canvas
  useEffect(() => {
    const canvas = waveCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let t = 0;

    const render = () => {
      ctx.fillStyle = '#050a0f';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = '#14282e';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, canvas.height / 2);
      ctx.lineTo(canvas.width, canvas.height / 2);
      ctx.stroke();

      // Waveform changes according to selected stage
      ctx.lineWidth = 1.8;
      ctx.strokeStyle = '#00e5ff';
      ctx.beginPath();

      const centerY = canvas.height / 2;
      for (let x = 0; x < canvas.width; x++) {
        const time = t + x * 0.02;
        let y = 0;

        if (activeStage === 0) {
          // RAW Audio: noisy with DC offset
          y = 15 + 24 * Math.sin(time * 3) + 12 * Math.sin(time * 8.5);
        } else if (activeStage === 1) {
          // DC Removal: centered at zero
          y = 24 * Math.sin(time * 3) + 12 * Math.sin(time * 8.5);
        } else if (activeStage === 4) {
          // Hann Windowed Frame: Bell-envelope modulated
          const normalizedX = x / canvas.width;
          const hannWindow = 0.5 * (1 - Math.cos(2 * Math.PI * normalizedX));
          y = hannWindow * (35 * Math.sin(time * 4) + 18 * Math.sin(time * 11));
        } else {
          // General filtered audio
          y = 22 * Math.sin(time * 3.5) + 14 * Math.sin(time * 7);
        }

        const plotY = centerY - y;
        if (x === 0) ctx.moveTo(x, plotY);
        else ctx.lineTo(x, plotY);
      }
      ctx.stroke();

      if (!reducedMotion) {
        t += 0.06;
        animId = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      if (animId) cancelAnimationFrame(animId);
    };
  }, [activeStage, simState.noiseType, reducedMotion]);

  return (
    <section id="preprocessing" className="section-shell">
      <div className="section-header">
        <div className="section-num">
          <Sliders size={14} />
          <span>SECTION 06 // PREPROCESSING & FEATURE EXTRACTION</span>
        </div>
        <h2 className="section-title">TIME-FREQUENCY DSP PIPELINE & STFT DECOMPOSITION</h2>
        <p className="section-desc">
          Mathematical progression transforming raw one-dimensional acoustic air-pressure samples into windowed STFT frames,
          spectrogram matrices, and 64-band log-mel feature embeddings for AI inference.
        </p>
      </div>

      {/* 9-Stage DSP Stepper */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(115px, 1fr))',
          gap: '8px',
          marginBottom: '24px'
        }}
      >
        {stages.map((stg, idx) => {
          const isActive = activeStage === idx;
          return (
            <div
              key={stg.num}
              onClick={() => setActiveStage(idx)}
              style={{
                background: isActive ? 'var(--bg-surface-elevated)' : 'var(--bg-surface)',
                border: `1px solid ${isActive ? 'var(--signal-cyan)' : 'var(--border-default)'}`,
                padding: '10px 8px',
                borderRadius: '3px',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              <div className="font-mono text-cyan" style={{ fontSize: '10px', fontWeight: 800 }}>
                {stg.num}
              </div>
              <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-heading)', marginTop: '2px' }}>
                {stg.name}
              </div>
            </div>
          );
        })}
      </div>

      {/* Side-by-Side Dual Analysis View: Time-Domain Waveform vs Deterministic STFT Spectrogram */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '20px' }}>
        {/* Waveform View */}
        <div className="tech-card" style={{ background: 'var(--bg-surface-sunken)', border: '1px solid var(--border-default)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <span className="font-mono text-cyan" style={{ fontSize: '11px' }}>
              TIME DOMAIN // {stages[activeStage].name}
            </span>
            <span className="badge badge-sim">Real-Time Waveform</span>
          </div>
          <canvas ref={waveCanvasRef} width={450} height={150} style={{ width: '100%', height: '150px', display: 'block' }} />
          <div className="font-mono text-secondary" style={{ fontSize: '11px', marginTop: '10px', lineHeight: 1.5 }}>
            {stages[activeStage].desc}
          </div>
        </div>

        {/* Spectrogram View */}
        <div className="tech-card" style={{ background: 'var(--bg-surface-sunken)', border: '1px solid var(--border-default)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <span className="font-mono text-cyan" style={{ fontSize: '11px' }}>
              SPECTRAL DOMAIN // 2D STFT SPECTROGRAM
            </span>
            <span className="badge badge-measured">Deterministic 512-FFT</span>
          </div>
          <canvas ref={specCanvasRef} width={450} height={150} style={{ width: '100%', height: '150px', display: 'block' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', fontSize: '10.5px', fontFamily: 'var(--font-mono)' }}>
            <span className="text-muted">HOP: 5.0ms (80 SAMPLES)</span>
            <span className="text-cyan">SPECTRUM: 60Hz - 8kHz</span>
          </div>
        </div>
      </div>
    </section>
  );
};
