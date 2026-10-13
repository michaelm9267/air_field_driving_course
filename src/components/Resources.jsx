import React from 'react';
import { sources } from '../files/course';
import AirfieldMap from './AirfieldMap';
import Icon from './Icon';
const tips = [
  ['Before the CMA', 'At Elmendorf, request permission about 100 feet before the hold line. Stop short unless cleared.', '3 WG supplement, 4.2.1'],
  ['Read back. Then act.', 'Read back ATC instructions. “Go ahead” means transmit your message, not move your vehicle.', 'DAFI 13-213, 5.3.1 and Table 5.4'],
  ['Instrument hold lines', 'When present at Elmendorf, stop and request Tower permission. Instrument-area approval alone does not authorize runway entry.', '3 WG supplement, 4.6.4'],
  ['Winter operations', 'On paved surfaces in reduced visibility or snow and ice, the maximum is 10 mph. Use a lower speed when conditions require it.', 'DAFGM2026-01, 4.8.1.11'],
];
export default function Resources() {
  return <main id="main-content" className="page resources-page">
    <div className="page-heading"><span className="eyebrow">YOUR REFERENCE DESK</span><h1>Know your airfield.</h1><p>Local procedures, governing publications, and the Elmendorf diagram.</p></div>
    <div className="resource-grid">{Object.entries(sources).map(([id, source]) => <a key={id} className="resource-card" href={source.url} target="_blank" rel="noreferrer"><span className="resource-icon"><Icon name={id === '3wg' ? 'map' : 'book'} /></span><h2>{source.title} <Icon name="external" /></h2><p>{source.detail}</p><span className="text-link">{source.title} · Official publication <Icon name="arrow" /></span></a>)}</div>
    <div className="source-note"><Icon name="book" /><div><strong>Content reviewed against your supplied publications · 12 October 2026</strong><p>The September 2026 memorandum takes precedence where it conflicts with older text. Live e-Publishing downloads could not be independently retrieved during this update. Use the official links above and your ADPM to confirm subsequent changes.</p></div></div>
    <AirfieldMap />
    <section className="quick-reference"><div className="section-heading"><h2>A few things to remember</h2><span>ELMENDORF ESSENTIALS</span></div><div className="tips-grid">{tips.map(([title, text, ref]) => <article key={title}><h3>{title}</h3><p>{text}</p><small>{ref}</small></article>)}</div></section>
    <section className="training-note"><h2>Your official training path</h2><p>This app is a study companion. Complete the required training, tests, local familiarization, and applicable check-ride through your Unit ADPM and ADTCS. A practice result does not certify driving privileges or issue an AF Form 483.</p><p>General knowledge has an 80% minimum, corrected to 100%. Communications, runway incursion prevention, and layout require 100%. This app reports a fully correct session only after all answers are correct.</p><small>DAFGM2026-01, 3.4.1; 3 WG supplement, 3.2.6 and 3.6.</small></section>
  </main>;
}
