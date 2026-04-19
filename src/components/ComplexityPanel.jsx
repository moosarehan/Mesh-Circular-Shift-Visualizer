import React from 'react';
import { calculateMeshSteps, calculateRingSteps, getShiftAmounts } from '../utils/shiftLogic';

const ComplexityPanel = ({ p, q }) => {
  const sqrtP = Math.sqrt(p);
  const { rowShift, colShift } = getShiftAmounts(q, sqrtP);
  const meshSteps = calculateMeshSteps(q, sqrtP);
  const ringSteps = calculateRingSteps(q, p);

  return (
    <div className="glass-panel fade-in" style={{ marginTop: '1.5rem' }}>
      <h2 className="title-gradient" style={{ marginBottom: '1.5rem' }}>Complexity Analysis</h2>
      
      <div style={{ display: 'grid', gap: '1rem' }}>
        {/* Formulas */}
        <div style={{ background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: '16px', fontSize: '0.875rem' }}>
          <h3 style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>Theoretical Formulas</h3>
          <div style={{ display: 'grid', gap: '0.5rem' }}>
            <p><strong>Ring:</strong> steps = min{"{q, p - q}"}</p>
            <p><strong>Mesh:</strong> steps = (q mod √p) + ⌊q / √p⌋</p>
          </div>
        </div>

        {/* Real-time stats */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div style={{ padding: '1rem', background: 'rgba(14, 165, 233, 0.1)', border: '1px solid var(--primary)', borderRadius: '16px', textAlign: 'center' }}>
            <p style={{ fontSize: '0.75rem', color: 'var(--primary)', marginBottom: '0.25rem' }}>Mesh Steps</p>
            <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{meshSteps}</p>
            <p style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>({rowShift}R + {colShift}C)</p>
          </div>
          <div style={{ padding: '1rem', background: 'rgba(244, 63, 94, 0.1)', border: '1px solid var(--secondary)', borderRadius: '16px', textAlign: 'center' }}>
            <p style={{ fontSize: '0.75rem', color: 'var(--secondary)', marginBottom: '0.25rem' }}>Ring Steps</p>
            <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{ringSteps}</p>
          </div>
        </div>

        {/* Comparison Bar */}
        <div style={{ marginTop: '0.5rem' }}>
          <p style={{ fontSize: '0.875rem', marginBottom: '0.75rem', color: 'var(--text-muted)' }}>Efficiency Comparison</p>
          <div style={{ height: '40px', background: 'rgba(255,255,255,0.05)', borderRadius: '20px', overflow: 'hidden', display: 'flex', position: 'relative' }}>
            <div 
              style={{ 
                width: `${(meshSteps / (meshSteps + ringSteps)) * 100}%`, 
                background: 'var(--primary)', 
                height: '100%',
                transition: 'width 0.5s ease-out'
              }} 
            />
            <div 
              style={{ 
                width: `${(ringSteps / (meshSteps + ringSteps)) * 100}%`, 
                background: 'var(--secondary)', 
                height: '100%',
                transition: 'width 0.5s ease-out'
              }} 
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', marginTop: '0.5rem' }}>
            <span style={{ color: 'var(--primary)' }}>Mesh</span>
            <span style={{ color: 'var(--secondary)' }}>Ring</span>
          </div>
        </div>

        <div style={{ borderLeft: '3px solid var(--accent)', paddingLeft: '1rem', marginTop: '0.5rem' }}>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
            {meshSteps < ringSteps 
              ? "The 2D Mesh is more efficient by optimizing row and column movements independently." 
              : "For very small q, Ring and Mesh have similar performance."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ComplexityPanel;
