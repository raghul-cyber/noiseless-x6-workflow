import React from 'react';
import { Compass, Shield, Terminal, ArrowUp } from 'lucide-react';

export const TechnicalFooter: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      style={{
        background: '#04070a',
        borderTop: '1px solid var(--border-default)',
        padding: '60px 24px 40px',
        marginTop: '60px'
      }}
    >
      <div style={{ maxWidth: 'var(--max-width)', margin: '0 auto' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '32px', marginBottom: '40px' }}>
          {/* Brand & Purpose */}
          <div style={{ maxWidth: '420px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
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
                  alt="NOISELESS-X6 Logo"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    display: 'block'
                  }}
                />
              </div>
              <span style={{ fontSize: '16px', fontWeight: 900, color: 'var(--text-heading)' }}>
                NOISELESS-X6 <span className="text-cyan">WORKFLOWS</span>
              </span>
            </div>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '16px' }}>
              Interactive Technical Architecture &amp; Acoustic Processing Visualization Platform.
              Dedicated platform visualizing embedded dual-microphone adaptive speech enhancement,
              AI supervisory control, and real-time acoustic noise cancellation.
            </p>
            <div className="font-mono text-muted" style={{ fontSize: '11px' }}>
              NOISELESS-X6 Technical Workflow Platform
            </div>
          </div>

          {/* Direct Anchor Sections */}
          <div>
            <div className="font-mono text-cyan" style={{ fontSize: '11px', fontWeight: 800, marginBottom: '12px', letterSpacing: '0.05em' }}>
              CORE ARCHITECTURAL SECTIONS
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, minmax(130px, 1fr))',
                gap: '8px',
                fontSize: '12px',
                fontFamily: 'var(--font-mono)'
              }}
            >
              <a href="#overview" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>&bull; Overview</a>
              <a href="#workflow" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>&bull; Workflow</a>
              <a href="#software" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>&bull; Software</a>
              <a href="#hardware" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>&bull; Hardware</a>
              <a href="#sensing" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>&bull; Audio Sensing</a>
              <a href="#preprocessing" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>&bull; Preprocessing</a>
              <a href="#ai-analysis" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>&bull; AI / ML</a>
              <a href="#hybrid-anc" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>&bull; Hybrid ANC</a>
              <a href="#speech-vad" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>&bull; Speech / VAD</a>
              <a href="#simulation" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>&bull; Simulation Lab</a>
              <a href="#metrics" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>&bull; Metrics</a>
              <a href="#architecture" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>&bull; Architecture</a>
            </div>
          </div>

          {/* Return To Top & Verification */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <button
              onClick={scrollToTop}
              style={{
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-default)',
                color: 'var(--text-primary)',
                padding: '8px 16px',
                borderRadius: '3px',
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <ArrowUp size={14} />
              <span>RETURN TO TOP</span>
            </button>

            <div className="font-mono text-muted" style={{ fontSize: '10px', marginTop: '20px' }}>
              STRICT EVIDENCE AUDIT: ZERO SYNTHETIC BENCHMARKS
            </div>
          </div>
        </div>

        {/* Bottom Baseline Bar */}
        <div
          style={{
            borderTop: '1px solid var(--border-subtle)',
            paddingTop: '20px',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '11px',
            color: 'var(--text-muted)',
            fontFamily: 'var(--font-mono)'
          }}
        >
          <span>STANDALONE TECHNICAL WORKFLOW SYSTEM &bull; NO 3D / HARDWARE SCHEMATICS ONLY</span>
          <span>ARM64 NEON &bull; ONNX RUNTIME INT8 &bull; ALSA I2S</span>
        </div>
      </div>
    </footer>
  );
};
