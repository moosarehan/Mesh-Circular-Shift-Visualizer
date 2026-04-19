import React, { useEffect, useState } from 'react';
import { getShiftAmounts } from '../utils/shiftLogic';

const MeshGrid = ({ p, q, stage }) => {
  const sqrtP = Math.sqrt(p);
  const { rowShift, colShift } = getShiftAmounts(q, sqrtP);
  const [nodes, setNodes] = useState([]);

  useEffect(() => {
    // Generate initial nodes
    const initialNodes = Array.from({ length: p }, (_, i) => ({
      id: i,
      initialId: i,
      value: `D${i}`,
      r: Math.floor(i / sqrtP),
      c: i % sqrtP,
    }));
    setNodes(initialNodes);
  }, [p, sqrtP]);

  // Node position in the grid (absolute units for animation)
  const getPosition = (r, c) => ({
    top: `${(r / sqrtP) * 100}%`,
    left: `${(c / sqrtP) * 100}%`,
    width: `${100 / sqrtP}%`,
    height: `${100 / sqrtP}%`,
  });

  return (
    <div className="glass-panel fade-in" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h2 className="title-gradient">Mesh Grid ({sqrtP}x{sqrtP})</h2>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <span className={`badge ${stage >= 1 ? 'badge-primary' : 'badge-secondary'}`}>Row Shift: {rowShift}</span>
          <span className={`badge ${stage === 2 ? 'badge-primary' : 'badge-secondary'}`}>Col Shift: {colShift}</span>
        </div>
      </div>

      <div style={{ 
        flex: 1, 
        position: 'relative', 
        background: 'rgba(0,0,0,0.3)', 
        borderRadius: '16px', 
        overflow: 'hidden',
        border: '1px solid var(--glass-border)',
        aspectRatio: '1/1'
      }}>
        {/* Static Background Grid */}
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          display: 'grid',
          gridTemplateColumns: `repeat(${sqrtP}, 1fr)`,
          gridTemplateRows: `repeat(${sqrtP}, 1fr)`,
          opacity: 1
        }}>
          {Array.from({ length: p }).map((_, i) => (
            <div key={`cell-${i}`} style={{ border: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'flex-start', padding: '4px' }}>
              <span style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.2)' }}>{i}</span>
            </div>
          ))}
        </div>

        {/* Animated Nodes */}
        {nodes.map((node) => {
          // Calculate current visual position based on stage
          let visualR = node.r;
          let visualC = node.c;

          if (stage >= 1) {
            visualC = (node.c + rowShift) % sqrtP;
          }
          if (stage === 2) {
            visualR = (node.r + colShift) % sqrtP;
          }

          const pos = getPosition(visualR, visualC);

          return (
            <div
              key={node.id}
              style={{
                position: 'absolute',
                ...pos,
                padding: '8px',
                transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                zIndex: 10
              }}
            >
              <div style={{
                width: '100%',
                height: '100%',
                background: 'linear-gradient(135deg, rgba(14, 165, 233, 0.4), rgba(14, 165, 233, 0.1))',
                border: '1px solid var(--primary)',
                borderRadius: '12px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                boxShadow: '0 4px 12px rgba(14, 165, 233, 0.2)',
                backdropFilter: 'blur(4px)'
              }}>
                <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>node {node.initialId}</span>
                <span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'white' }}>{node.value}</span>
              </div>
            </div>
          );
        })}

        {/* Directional Arrows (Simplified visualization) */}
        {stage < 2 && (
          <div style={{
            position: 'absolute',
            bottom: '1rem',
            right: '1rem',
            background: 'rgba(0,0,0,0.6)',
            padding: '0.5rem 1rem',
            borderRadius: '20px',
            fontSize: '0.75rem',
            color: 'var(--accent)',
            zIndex: 20,
            border: '1px solid var(--accent)'
          }}>
            {stage === 0 ? '→ Row Shift Ready' : '↓ Column Shift Ready'}
          </div>
        )}
      </div>

      <div style={{ marginTop: '1.5rem', display: 'flex', gap: '2rem', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ width: '12px', height: '12px', background: 'rgba(14, 165, 233, 0.4)', border: '1px solid var(--primary)' }}></div>
          <span>Active Data</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span>Current Address: <strong>(r, c)</strong></span>
        </div>
      </div>
    </div>
  );
};

export default MeshGrid;
