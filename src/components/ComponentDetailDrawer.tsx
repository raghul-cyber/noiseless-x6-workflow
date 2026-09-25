import React from 'react';
import { ComponentDetail } from '../diagrams/architectureData';
import { X, Layers, Cpu, ArrowRightLeft, ShieldCheck, Activity } from 'lucide-react';

interface ComponentDetailDrawerProps {
  component: ComponentDetail | null;
  onClose: () => void;
}

export const ComponentDetailDrawer: React.FC<ComponentDetailDrawerProps> = ({ component, onClose }) => {
  if (!component) return null;

  const getEvidenceBadge = (type: ComponentDetail['evidenceType']) => {
    switch (type) {
      case 'TARGET':
        return <span className="badge badge-target">Target Specification</span>;
      case 'ILLUSTRATIVE SIMULATION':
        return <span className="badge badge-sim">Illustrative Simulation</span>;
      case 'PROTOTYPE MEASUREMENT':
        return <span className="badge badge-measured">Prototype Measurement</span>;
      case 'NOT BENCHMARKED':
        return <span className="badge badge-unbenchmarked">Not Benchmarked</span>;
    }
  };

  return (
    <div className="side-drawer-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-label="Component Details">
      <div className="side-drawer-panel" onClick={(e) => e.stopPropagation()}>
        {/* Drawer Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <span className="font-mono text-cyan" style={{ fontSize: '12px', fontWeight: 700 }}>
                SUBSYSTEM // {component.subsystemNumber}
              </span>
              {getEvidenceBadge(component.evidenceType)}
            </div>
            <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-heading)' }}>
              {component.name}
            </h2>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: '1px solid var(--border-default)',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              padding: '6px',
              borderRadius: 'var(--radius-xs)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            aria-label="Close detail panel"
          >
            <X size={18} />
          </button>
        </div>

        {/* Category Pill */}
        <div style={{ marginBottom: '24px' }}>
          <span
            className="font-mono"
            style={{
              fontSize: '11px',
              padding: '3px 8px',
              background: 'rgba(0, 229, 255, 0.08)',
              border: '1px solid var(--border-highlight)',
              color: 'var(--signal-cyan)',
              borderRadius: '2px',
              textTransform: 'uppercase'
            }}
          >
            {component.category} LAYER
          </span>
        </div>

        {/* Content Sections */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Role */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
              <ShieldCheck size={14} className="text-cyan" />
              <span className="font-mono" style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                System Role & Responsibility
              </span>
            </div>
            <p style={{ fontSize: '14px', color: 'var(--text-primary)', lineHeight: 1.6 }}>
              {component.role}
            </p>
          </div>

          {/* I/O Mapping */}
          <div style={{ background: 'var(--bg-surface-sunken)', border: '1px solid var(--border-default)', padding: '14px', borderRadius: '4px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
              <ArrowRightLeft size={14} className="text-cyan" />
              <span className="font-mono" style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                Signal Interface (I/O)
              </span>
            </div>

            <div style={{ marginBottom: '10px' }}>
              <span className="font-mono text-muted" style={{ fontSize: '11px' }}>INPUT SIGNAL:</span>
              <div className="font-mono" style={{ fontSize: '12px', color: 'var(--signal-cyan)', marginTop: '2px' }}>
                {component.input}
              </div>
            </div>

            <div>
              <span className="font-mono text-muted" style={{ fontSize: '11px' }}>OUTPUT SIGNAL:</span>
              <div className="font-mono" style={{ fontSize: '12px', color: 'var(--signal-green)', marginTop: '2px' }}>
                {component.output}
              </div>
            </div>
          </div>

          {/* Processing Logic */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
              <Cpu size={14} className="text-cyan" />
              <span className="font-mono" style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                Mathematical Process & Algorithms
              </span>
            </div>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              {component.process}
            </p>
          </div>

          {/* System Position & Topology */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
              <Layers size={14} className="text-cyan" />
              <span className="font-mono" style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                Physical & Topology Placement
              </span>
            </div>
            <p className="font-mono" style={{ fontSize: '12px', color: '#cbd5e1' }}>
              {component.systemPosition}
            </p>
          </div>

          {/* Hardware & DSP Specifications Table */}
          {component.specifications && Object.keys(component.specifications).length > 0 && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                <Activity size={14} className="text-cyan" />
                <span className="font-mono" style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                  Hardware & DSP Specifications
                </span>
              </div>
              <div style={{ border: '1px solid var(--border-default)', borderRadius: '4px', overflow: 'hidden' }}>
                {Object.entries(component.specifications).map(([key, value], idx) => (
                  <div
                    key={key}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      padding: '8px 12px',
                      background: idx % 2 === 0 ? 'var(--bg-surface)' : 'var(--bg-surface-elevated)',
                      borderBottom: idx < Object.entries(component.specifications).length - 1 ? '1px solid var(--border-subtle)' : 'none',
                      fontSize: '12px'
                    }}
                  >
                    <span className="font-mono text-muted">{key}</span>
                    <span className="font-mono" style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Dependencies */}
          <div>
            <span className="font-mono text-muted" style={{ fontSize: '11px', textTransform: 'uppercase' }}>
              Direct System Dependencies
            </span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '6px' }}>
              {component.dependencies.map((dep, i) => (
                <span
                  key={i}
                  className="font-mono"
                  style={{
                    fontSize: '11px',
                    padding: '2px 8px',
                    background: 'var(--bg-surface-elevated)',
                    border: '1px solid var(--border-default)',
                    borderRadius: '2px',
                    color: 'var(--text-secondary)'
                  }}
                >
                  {dep}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
