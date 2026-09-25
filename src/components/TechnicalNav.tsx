import React, { useState } from 'react';
import { SimulationState } from '../simulation/SimulationState';
import { Activity, Play, Pause, Compass, Zap, Eye } from 'lucide-react';

interface TechnicalNavProps {
  simState: SimulationState;
  onToggleSim: () => void;
  reducedMotion: boolean;
  onToggleReducedMotion: () => void;
}

export const TechnicalNav: React.FC<TechnicalNavProps> = ({
  simState,
  onToggleSim,
  reducedMotion,
  onToggleReducedMotion
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Overview', href: '#overview' },
    { label: 'Workflow', href: '#workflow' },
    { label: 'Software', href: '#software' },
    { label: 'Hardware', href: '#hardware' },
    { label: 'Sensing', href: '#sensing' },
    { label: 'Preprocessing', href: '#preprocessing' },
    { label: 'AI/ML', href: '#ai-analysis' },
    { label: 'ANC Loop', href: '#hybrid-anc' },
    { label: 'Speech/VAD', href: '#speech-vad' },
    { label: 'Simulation', href: '#simulation' },
    { label: 'Metrics', href: '#metrics' },
    { label: 'Architecture', href: '#architecture' }
  ];

  const scrollToSimulation = () => {
    const el = document.getElementById('simulation');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        height: 'var(--nav-height)',
        background: 'rgba(6, 9, 14, 0.94)',
        borderBottom: '1px solid var(--border-default)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px'
      }}
    >
      {/* Brand & Project Identification */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexShrink: 0, whiteSpace: 'nowrap' }}>
        <a href="#overview" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0, whiteSpace: 'nowrap' }}>
          <div
            style={{
              width: '32px',
              height: '32px',
              background: '#ffffff',
              border: '1px solid var(--border-highlight)',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '2px',
              boxShadow: '0 0 10px rgba(0, 229, 255, 0.25)',
              flexShrink: 0
            }}
          >
            <img
              src="/logo.png"
              alt="NOISELESS-X6"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                display: 'block'
              }}
            />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', whiteSpace: 'nowrap' }}>
            <span style={{ fontSize: '15px', fontWeight: 900, color: 'var(--text-heading)', letterSpacing: '0.04em', whiteSpace: 'nowrap' }}>
              NOISELESS-X6
            </span>
            <span
              className="font-mono text-cyan"
              style={{
                fontSize: '10px',
                fontWeight: 700,
                background: 'rgba(0, 229, 255, 0.1)',
                padding: '2px 6px',
                borderRadius: '2px',
                border: '1px solid var(--border-highlight)',
                whiteSpace: 'nowrap'
              }}
            >
              WORKFLOWS
            </span>
          </div>
        </a>
      </div>

      {/* Navigation Links (Desktop) */}
      <nav
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '14px',
          whiteSpace: 'nowrap',
          flexShrink: 1,
          overflowX: 'auto',
          scrollbarWidth: 'none'
        }}
        className="desktop-nav"
      >
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            style={{
              color: 'var(--text-secondary)',
              textDecoration: 'none',
              fontSize: '12px',
              fontWeight: 600,
              letterSpacing: '0.02em',
              whiteSpace: 'nowrap',
              transition: 'color 0.15s ease'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--signal-cyan)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
          >
            {link.label}
          </a>
        ))}
      </nav>

      {/* Live System State & Telemetry Header Bar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0, whiteSpace: 'nowrap' }}>
        {/* System Active Pill */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            background: 'var(--bg-surface-sunken)',
            border: '1px solid var(--border-default)',
            padding: '3px 10px',
            borderRadius: '2px',
            whiteSpace: 'nowrap',
            flexShrink: 0
          }}
        >
          <span className={`status-dot ${simState.isRunning ? 'status-dot-active' : 'status-dot-warn'}`} />
          <span className="font-mono" style={{ fontSize: '10px', color: 'var(--text-primary)', whiteSpace: 'nowrap' }}>
            {simState.isRunning ? 'SYS ACTIVE' : 'SYS PAUSED'}
          </span>
          <span className="font-mono text-muted" style={{ fontSize: '10px' }}>|</span>
          <span className="font-mono text-cyan" style={{ fontSize: '10px', whiteSpace: 'nowrap' }}>
            {simState.noiseType.toUpperCase()}
          </span>
          <span className="font-mono text-muted" style={{ fontSize: '10px' }}>|</span>
          <span className="font-mono text-green" style={{ fontSize: '10px', whiteSpace: 'nowrap' }}>
            {simState.ancActive ? `${simState.residualAttenuationDb.toFixed(1)} dB` : 'OFF'}
          </span>
        </div>

        {/* Motion Preference Toggle */}
        <button
          onClick={onToggleReducedMotion}
          title={reducedMotion ? 'Enable Waveform Motion' : 'Reduce Motion Mode'}
          style={{
            background: reducedMotion ? 'rgba(245, 158, 11, 0.15)' : 'var(--bg-surface)',
            border: `1px solid ${reducedMotion ? 'var(--signal-amber)' : 'var(--border-default)'}`,
            color: reducedMotion ? 'var(--signal-amber)' : 'var(--text-muted)',
            padding: '4px 8px',
            borderRadius: '2px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            fontSize: '11px',
            fontFamily: 'var(--font-mono)',
            whiteSpace: 'nowrap',
            flexShrink: 0
          }}
          aria-label="Toggle reduced motion"
        >
          <Eye size={12} />
          <span>{reducedMotion ? 'MOTION: OFF' : 'MOTION: ON'}</span>
        </button>

        {/* Persistent "LIVE SIMULATION" CTA button */}
        <button
          onClick={scrollToSimulation}
          style={{
            background: 'var(--signal-cyan)',
            border: 'none',
            color: '#04080e',
            fontWeight: 800,
            fontSize: '11px',
            fontFamily: 'var(--font-mono)',
            padding: '6px 14px',
            borderRadius: '2px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            letterSpacing: '0.04em',
            whiteSpace: 'nowrap',
            flexShrink: 0
          }}
        >
          <Zap size={13} />
          <span>LIVE SIMULATION</span>
        </button>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .desktop-nav {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
};
