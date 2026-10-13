import React, { useRef, useState } from 'react';
import map from '../images/elmendorf-map.jpeg';
import Icon from './Icon';
import AirfieldStudyDiagram from './AirfieldStudyDiagram';

const features = [
  { id: 'east-west', title: 'Runway 06 / 24', description: 'Find the east–west runway and identify both ends. The published diagram shows the surrounding CMA and hold positions.' },
  { id: 'north-south', title: 'Runway 16 / 34', description: 'Find the north–south runway and its intersection with runway 06/24. Study the connecting taxiways in the published diagram.' },
  { id: 'management', title: 'Management + Tower', description: 'Locate the general Airfield Management and Tower area south of runway 06/24, beside the transient area and nearby hangars.' },
];
const legend = [
  ['cma', 'Controlled movement area', 'Light blue shading in the published diagram. Specific ATC approval is required for entry.'],
  ['instrument', 'Instrument hold lines', 'Red in the diagram legend. Actual pavement markings are yellow. Stop and request Tower permission when present at Elmendorf.'],
  ['vfr', 'VFR hold lines', 'Yellow in the diagram legend. Stop short and obtain the required clearance.'],
  ['restricted', 'Restricted areas', 'Red shading in the diagram legend. Entry requires the appropriate authorization and designated ECP.'],
];

export default function AirfieldMap({ compact = false }) {
  const [zoom, setZoom] = useState(1);
  const [view, setView] = useState(compact ? 'published' : 'study');
  const [focus, setFocus] = useState(null);
  const viewport = useRef(null);
  const publishedToggle = useRef(null);
  const selectedFeature = features.find(item => item.id === focus);
  function fit() {
    setZoom(1); setFocus(null);
    if (viewport.current) { viewport.current.scrollLeft = 0; viewport.current.scrollTop = 0; }
  }
  function switchView(next) { setView(next); fit(); }
  return <figure className={`map-panel map-explorer ${compact ? 'map-compact' : ''}`}>
    <div className="map-explorer-header"><div><span className="eyebrow">{compact ? 'QUESTION REFERENCE' : 'GET TO KNOW YOUR AIRFIELD'}</span><h2><Icon name="map" /> Elmendorf Airfield</h2>{!compact && <p>See the big picture. Then explore the details.</p>}</div><span className="map-location-badge">3 WG <span>/</span> JBER</span></div>
    <div className="map-toolbar">
      {!compact ? <div className="map-view-switch" aria-label="Map view"><button aria-pressed={view === 'study'} onClick={() => switchView('study')}>Study view</button><button ref={publishedToggle} aria-pressed={view === 'published'} onClick={() => switchView('published')}>Published diagram</button></div> : <strong>Published diagram</strong>}
      <div className="map-tools"><div className="map-zoom-controls"><button onClick={() => setZoom(z => Math.max(1, z - 0.5))} disabled={zoom === 1} aria-label="Zoom out map">−</button><span aria-live="polite">{Math.round(zoom * 100)}%</span><button onClick={() => setZoom(z => Math.min(3, z + 0.5))} disabled={zoom === 3} aria-label="Zoom in map">+</button></div><button className="map-fit-button" onClick={fit} aria-label="Fit map to viewer"><Icon name="reset" /> Fit map</button><a href={map} target="_blank" rel="noreferrer" aria-label="Open full-size published diagram">Original <Icon name="external" /></a></div>
    </div>
    <div className={`map-explorer-body ${compact ? 'compact-body' : ''}`}>
      <div className="map-canvas-column"><div className="map-viewport" ref={viewport} tabIndex="0" aria-label="Scrollable Elmendorf diagram"><div className="map-zoom-surface" style={{ width: `${zoom * 100}%` }}>{view === 'study' ? <AirfieldStudyDiagram focus={focus} /> : <img src={map} alt="Elmendorf Airfield diagram showing runways 06/24 and 16/34, taxiways, hold lines, and the CMA legend" />}</div></div><div className="map-view-hint"><Icon name={view === 'study' ? 'map' : 'book'} /><span>{view === 'study' ? 'A simplified sketch for orientation. Use the published diagram for exact markings and CMA boundaries.' : 'Original Attachment 13 diagram. Zoom in, then scroll to explore; arrow keys work when the viewer is focused.'}</span></div>
      {!compact && view === 'study' && <div className="study-visual-key"><span><i className="key-runway" /> Runways</span><span><i className="key-taxiway" /> Taxiways</span><span><i className="key-ramp" /> Ramp areas</span><span><i className="key-landmark" /> Landmark area</span></div>}</div>
      {!compact && <aside className="map-study-sidebar" aria-label="Map study guide">{view === 'study' ? <><span className="eyebrow">START WITH A LANDMARK</span><h3>Find your bearings.</h3><p>Select an area to make it stand out.</p><div className="map-feature-buttons">{features.map(item => <button key={item.id} aria-label={`Focus on ${item.title}`} aria-pressed={focus === item.id} onClick={() => setFocus(prev => prev === item.id ? null : item.id)}><span><Icon name={item.id === 'management' ? 'flag' : 'plane'} />{item.title}</span><Icon name="arrow" /></button>)}</div><div className="map-feature-description" aria-live="polite"><strong>{selectedFeature ? selectedFeature.title : 'Two runways. One clear starting point.'}</strong><p>{selectedFeature ? selectedFeature.description : 'Start by recognizing the runway layout, then switch to the published diagram to study the taxiways, hold positions, and local boundaries.'}</p></div><button className="map-open-published" onClick={() => { switchView('published'); publishedToggle.current?.focus(); }}>See markings and boundaries <Icon name="arrow" /></button></> : <><span className="eyebrow">PUBLISHED-DIAGRAM KEY</span><h3>Read the colors.</h3><p>Diagram colors and pavement colors can differ.</p><div className="map-readable-legend">{legend.map(([id, title, description]) => <div key={id}><span className={`map-legend-symbol symbol-${id}`} aria-hidden="true" /><div><strong>{title}</strong><p>{description}</p></div></div>)}</div><small>3 WG supplement, Figure A13.1 and 4.6.3–4.6.4.</small></>}</aside>}
    </div>
    <figcaption>3 WG supplement · Attachment 13, Figure A13.1. The study sketch simplifies the published layout; it is not for operational navigation. Use the current WADPM-issued map for operations. The original published image is preserved.</figcaption>
  </figure>;
}
