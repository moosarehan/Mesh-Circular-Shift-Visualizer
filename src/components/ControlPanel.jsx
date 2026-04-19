import React from 'react';

const ControlPanel = ({ p, setP, q, setQ, stage, setStage, isAnimating, reset }) => {
  const perfectSquares = [4, 9, 16, 25, 36, 49, 64];

  const handlePChange = (e) => {
    const val = parseInt(e.target.value);
    setP(val);
    if (q >= val) setQ(val - 1);
    reset();
  };

  const handleQChange = (e) => {
    setQ(parseInt(e.target.value));
    reset();
  };

  return (
    <div className="glass-panel fade-in">
      <h2 className="title-gradient" style={{ marginBottom: '1.5rem' }}>Controls</h2>
      
      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{ display: 'block', color: 'var(--text-muted)', marginBottom: '0.5rem', fontSize: '0.875rem' }}>
          Number of Nodes (p)
        </label>
        <select 
          value={p} 
          onChange={handlePChange}
          style={{
            width: '100%',
            background: 'rgba(255,255,255,0.1)',
            border: '1px solid var(--glass-border)',
            borderRadius: '12px',
            color: 'white',
            padding: '0.75rem',
            cursor: 'pointer'
          }}
        >
          {perfectSquares.map(sq => (
            <option key={sq} value={sq} style={{ background: '#1e293b' }}>{sq} ({Math.sqrt(sq)}x{Math.sqrt(sq)})</option>
          ))}
        </select>
        <p style={{ fontSize: '0.75rem', color: 'var(--accent)', marginTop: '0.5rem' }}>
         &bull; Valid perfect square selection
        </p>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
          <label style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Shift Amount (q)</label>
          <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>{q}</span>
        </div>
        <input 
          type="range" 
          min="1" 
          max={p - 1} 
          value={q} 
          onChange={handleQChange}
          style={{ width: '100%', cursor: 'pointer', accentColor: 'var(--primary)' }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
          <span>1</span>
          <span>{p-1}</span>
        </div>
      </div>

      <div style={{ borderTop: '1px solid var(--glass-border)', paddingTop: '1.5rem' }}>
        <h3 style={{ fontSize: '1rem', marginBottom: '1rem' }}>Animation Steps</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
          <button 
            onClick={() => setStage(prev => Math.min(prev + 1, 2))}
            disabled={stage === 2 || isAnimating}
            className="btn-primary"
            style={{
              background: stage === 2 ? 'rgba(255,255,255,0.1)' : 'var(--primary)',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              padding: '0.75rem',
              fontWeight: '600',
              cursor: stage === 2 ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s'
            }}
          >
            {stage === 0 ? 'Stage 1: Row' : stage === 1 ? 'Stage 2: Col' : 'Completed'}
          </button>
          
          <button 
            onClick={reset}
            style={{
              background: 'rgba(255,255,255,0.05)',
              color: 'white',
              border: '1px solid var(--glass-border)',
              borderRadius: '12px',
              padding: '0.75rem',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            Reset
          </button>
        </div>
      </div>

      <div style={{ marginTop: '1.5rem', padding: '1rem', borderRadius: '12px', background: 'rgba(0,0,0,0.2)', fontSize: '0.875rem' }}>
        <p style={{ color: 'var(--text-muted)' }}>
          Current State: 
          <span style={{ 
            marginLeft: '0.5rem', 
            color: stage === 0 ? 'var(--text-main)' : stage === 1 ? 'var(--primary)' : 'var(--accent)'
          }}>
            {stage === 0 ? 'Initial' : stage === 1 ? 'After Row Shift' : 'Final State'}
          </span>
        </p>
      </div>
    </div>
  );
};

export default ControlPanel;
