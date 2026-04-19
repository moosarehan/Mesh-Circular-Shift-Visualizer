import React, { useState } from 'react';
import './App.css';
import ControlPanel from './components/ControlPanel';
import MeshGrid from './components/MeshGrid';
import ComplexityPanel from './components/ComplexityPanel';

function App() {
  const [p, setP] = useState(16);
  const [q, setQ] = useState(5);
  const [stage, setStage] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const reset = () => {
    setStage(0);
    setIsAnimating(false);
  };

  return (
    <div className="app-container">
      <div className="sidebar">
        <header style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
            <div style={{ 
              width: '40px', 
              height: '40px', 
              background: 'var(--primary)', 
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 20px rgba(14, 165, 233, 0.4)'
            }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                <line x1="3" y1="9" x2="21" y2="9"/>
                <line x1="3" y1="15" x2="21" y2="15"/>
                <line x1="9" y1="3" x2="9" y2="21"/>
                <line x1="15" y1="3" x2="15" y2="21"/>
              </svg>
            </div>
            <h1 style={{ fontSize: '1.25rem', fontWeight: '800' }}>PDC <span style={{ color: 'var(--primary)' }}>Toolbox</span></h1>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Mesh Circular Shift Visualizer</p>
        </header>

        <ControlPanel 
          p={p} setP={setP} 
          q={q} setQ={setQ} 
          stage={stage} setStage={setStage} 
          isAnimating={isAnimating}
          reset={reset}
        />

        <ComplexityPanel p={p} q={q} />
        
        <footer style={{ marginTop: '2rem', padding: '1rem', borderTop: '1px solid var(--glass-border)', textAlign: 'center' }}>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            Developed for Parallel & Distributed Computing Assignment
          </p>
        </footer>
      </div>

      <main className="main-content">
        <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '700' }}>Interactive Simulation</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Visualizing i → (i + q) mod p movement</p>
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <div className="glass-panel" style={{ padding: '0.5rem 1rem', borderRadius: '12px', fontSize: '0.8rem' }}>
              p = <strong>{p}</strong>
            </div>
            <div className="glass-panel" style={{ padding: '0.5rem 1rem', borderRadius: '12px', fontSize: '0.8rem' }}>
              q = <strong>{q}</strong>
            </div>
          </div>
        </div>

        <MeshGrid p={p} q={q} stage={stage} />
      </main>
    </div>
  );
}

export default App;
