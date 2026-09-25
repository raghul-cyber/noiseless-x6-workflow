import React, { useState } from 'react';
import { SimulationState } from '../simulation/SimulationState';
import { ShieldAlert, Zap, Vibrate, CheckCircle2 } from 'lucide-react';

interface ImpulseProtectionProps {
  simState: SimulationState;
  onTriggerImpulse: () => void;
  reducedMotion: boolean;
}

export const ImpulseProtection: React.FC<ImpulseProtectionProps> = ({
  simState,
  onTriggerImpulse,
  reducedMotion
}) => {
  const [hapticFired, setHapticFired] = useState(false);

  const handleTestImpulse = () => {
    onTriggerImpulse();
    setHapticFired(true);
    setTimeout(() => {
      setHapticFired(false);
    }, 1800);
  };

  return (
    <section id="impulse-protection" className="section-shell">
      <div className="section-header">
        <div className="section-num">
          <ShieldAlert size={14} className="text-amber" />
          <span className="text-amber">SECTION 13 // IMPULSIVE NOISE PROTECTION & TACTICAL HAPTIC</span>
        </div>
        <h2 className="section-title">MICROSECOND ACOUSTIC SHOCKWAVE CLAMP & HAPTIC WARNING</h2>
        <p className="section-desc">
          Instantaneous protection mechanism preventing acoustic eardrum barotrauma during ballistic gunfire or blast waves.
          Features a sub-5μs TinyImpulseMLP detector, look-ahead soft limiter, and GPIO-driven tactile haptic notification to soldier gear.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
        {/* Left: Interactive Impulse Event Trigger & Sequencer */}
        <div
          className={`tech-card ${hapticFired ? 'impulse-active' : ''}`}
          style={{
            background: 'var(--bg-surface-sunken)',
            border: `1px solid ${hapticFired ? 'var(--signal-amber)' : 'var(--border-default)'}`,
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}
        >
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <span className="font-mono text-amber" style={{ fontSize: '11px', fontWeight: 800 }}>
                TRANSIENT INTERACTION LAB
              </span>
              <span className="badge badge-measured">&lt; 5 μs DETECTION</span>
            </div>

            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '16px', lineHeight: 1.5 }}>
              Trigger an instantaneous high-amplitude ballistic shockwave (140+ dB peak) to observe the look-ahead
              attenuation envelope clamp and downstream tactile alert.
            </p>

            <button
              onClick={handleTestImpulse}
              style={{
                width: '100%',
                background: hapticFired ? 'var(--signal-amber)' : 'rgba(245, 158, 11, 0.15)',
                border: '1px solid var(--signal-amber)',
                color: hapticFired ? '#04070a' : 'var(--signal-amber)',
                padding: '12px',
                borderRadius: '3px',
                fontWeight: 800,
                fontSize: '12px',
                fontFamily: 'var(--font-mono)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                letterSpacing: '0.04em'
              }}
            >
              <Zap size={16} />
              <span>TRIGGER BALLISTIC IMPULSE (TEST EVENT)</span>
            </button>

            {/* State Progression sequence */}
            <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', fontFamily: 'var(--font-mono)', color: hapticFired ? 'var(--signal-amber)' : 'var(--text-muted)' }}>
                <span className={`status-dot ${hapticFired ? 'status-dot-warn' : ''}`} />
                <span>01 // IMPULSE DETECTED (CREST RATIO &gt; 18 dB)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', fontFamily: 'var(--font-mono)', color: hapticFired ? 'var(--signal-amber)' : 'var(--text-muted)' }}>
                <span className={`status-dot ${hapticFired ? 'status-dot-warn' : ''}`} />
                <span>02 // PROTECTION MODE ENGAGED (ATTACK &lt; 100 μs)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', fontFamily: 'var(--font-mono)', color: hapticFired ? 'var(--signal-amber)' : 'var(--text-muted)' }}>
                <span className={`status-dot ${hapticFired ? 'status-dot-warn' : ''}`} />
                <span>03 // FAST GAIN CLAMP (g_floor = 0.05 / -26 dB)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', fontFamily: 'var(--font-mono)', color: !hapticFired ? 'var(--signal-green)' : 'var(--text-muted)' }}>
                <span className="status-dot status-dot-active" />
                <span>04 // EXPONENTIAL RECOVERY &rarr; NORMAL ANC</span>
              </div>
            </div>
          </div>

          <div style={{ marginTop: '16px', paddingTop: '10px', borderTop: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between' }}>
            <span className="font-mono text-muted" style={{ fontSize: '10px' }}>LIMITER LATENCY: 0.12 ms LOOKAHEAD</span>
            <span className="font-mono text-amber" style={{ fontSize: '10px' }}>OSHA 140dB SAFEGUARD</span>
          </div>
        </div>

        {/* Right: Tactile Haptic Awareness Branch */}
        <div className="tech-card" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-default)', padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
              <Vibrate size={16} className={hapticFired ? 'text-amber' : 'text-cyan'} />
              <span className="font-mono text-cyan" style={{ fontSize: '11px', fontWeight: 700 }}>
                HAPTIC RESPONSE & SOLDIER SITUATIONAL AWARENESS
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ background: 'var(--bg-surface-elevated)', padding: '12px', borderRadius: '3px', border: '1px solid var(--border-subtle)' }}>
                <span className="font-mono text-muted" style={{ fontSize: '10px' }}>TACTILE STIMULATION MECHANISM</span>
                <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px', lineHeight: 1.5 }}>
                  Because extreme impulsive noise can induce acoustic startle reflex or sudden disorientation,
                  the SoC fires an 80 ms resonant vibration pattern via low-profile ERM/LRA motors embedded in the headband cushion.
                </p>
              </div>

              <div style={{ background: 'var(--bg-surface-sunken)', padding: '12px', borderRadius: '3px', border: `1px solid ${hapticFired ? 'var(--signal-amber)' : 'var(--border-subtle)'}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span className="font-mono" style={{ fontSize: '11px', color: hapticFired ? 'var(--signal-amber)' : 'var(--text-muted)' }}>
                    GPIO PIN 23 (PWM HAPTIC DRIVER):
                  </span>
                  <span className="font-mono" style={{ fontSize: '11px', color: hapticFired ? 'var(--signal-amber)' : 'var(--text-secondary)', fontWeight: 700 }}>
                    {hapticFired ? 'PULSE ACTIVE (175 Hz)' : 'IDLE'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div style={{ marginTop: '16px', paddingTop: '10px', borderTop: '1px solid var(--border-subtle)' }}>
            <span className="badge badge-target">TARGET: ZERO PERMANENT HEARING LOSS</span>
          </div>
        </div>
      </div>
    </section>
  );
};
