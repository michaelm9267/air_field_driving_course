import React from 'react';
import Icon from './Icon';
export default function Header({ page, onNavigate, sessionActive }) {
  return <header className="site-header">
    <div className="header-inner">
      <button className="brand" onClick={() => onNavigate('home')} aria-label="Airfield driving home">
        <span className="brand-mark"><Icon name="plane" /></span>
        <span><strong>AIRFIELD<span className="brand-light"> / DRIVING</span></strong><small>3 WING · JBER, ALASKA</small></span>
      </button>
      <nav aria-label="Main navigation">
        <button aria-current={page === 'home' ? 'page' : undefined} onClick={() => onNavigate('home')}>Overview</button>
        <button aria-current={page === 'training' ? 'page' : undefined} onClick={() => onNavigate('training')}>Training</button>
        <button aria-current={page === 'progress' ? 'page' : undefined} onClick={() => onNavigate('progress')}>Progress</button>
        <button aria-current={page === 'briefing' ? 'page' : undefined} onClick={() => onNavigate('briefing')}>Local Briefing</button>
        {sessionActive && <button aria-current={page === 'session' ? 'page' : undefined} onClick={() => onNavigate('session')}>My session</button>}
        <button aria-current={page === 'resources' ? 'page' : undefined} onClick={() => onNavigate('resources')}>Resources</button>
      </nav>
      <span className="header-location"><span className="status-dot" /> ELMENDORF AIRFIELD</span>
    </div>
  </header>;
}
