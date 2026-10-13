import React from 'react';

// An intentionally simplified study sketch derived from Attachment 13.
// It depicts landmark relationships, not exact CMA or hold-position boundaries.
export default function AirfieldStudyDiagram({ focus }) {
  const muted = key => focus && focus !== key ? 0.36 : 1;
  return <svg className="airfield-study-diagram" viewBox="0 0 866 444" role="img" aria-label="Simplified Elmendorf Airfield study view showing runways 06/24 and 16/34, north and south ramps, and the Airfield Management and Tower area">
    <defs>
      <pattern id="airfield-study-grid" width="28" height="28" patternUnits="userSpaceOnUse"><path d="M28 0H0V28" fill="none" stroke="#dfe8e6" strokeWidth=".7" /></pattern>
    </defs>
    <rect width="866" height="444" rx="10" fill="#f5f8f6" />
    <rect width="866" height="444" rx="10" fill="url(#airfield-study-grid)" />
    <g className="study-base" opacity={focus ? .5 : 1}>
      <path d="M162 180 300 149 395 91 507 46 596 49 721 73 758 117 746 245 683 380 621 415 557 421 532 303 247 280 169 260Z" fill="#edf2ec" stroke="#cfdcd3" strokeWidth="1.5" />
      <path d="M191 238H551L575 229 626 67M262 187H690M587 278l-17 105M665 99l-42 293" fill="none" stroke="#bf9e55" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M291 151h87v31h-87ZM420 86l81-20 9 27-81 21ZM474 142h84v31h-84ZM647 78l54 9-8 69-57-8ZM243 249h68v24h-68ZM434 243l105 7-2 24-105-7ZM662 315l-10 56-42-8 10-56Z" fill="#c6ddd2" stroke="#8bb5a3" strokeWidth="1.5" />
      <path d="M325 141h21v12h-21Zm87-60 17-5 4 11-17 5Zm107-33h18v12h-18Zm-169 231h18v13h-18Zm168-3 19 4-3 12-19-4Z" fill="#b5c3c7" />
      <text x="431" y="125" className="study-area-label">NORTH RAMPS</text>
      <text x="369" y="278" className="study-area-label">SOUTH RAMPS</text>
      <text x="282" y="178" className="study-taxiway-label">M</text>
      <text x="332" y="246" className="study-taxiway-label">N</text>
      <text x="590" y="181" className="study-taxiway-label">D</text>
      <text x="641" y="187" className="study-taxiway-label">E</text>
    </g>
    <g opacity={muted('east-west')}>
      <path d="M168 210H674" stroke="#bddad1" strokeWidth="35" strokeLinecap="square" />
      <path d="M168 210H674" stroke="#183647" strokeWidth="22" strokeLinecap="square" />
      <path d="M204 210H639" stroke="#f1f6f5" strokeWidth="2" strokeDasharray="15 11" />
      <text x="171" y="215" fill="white" fontSize="13" fontWeight="700">06</text>
      <text x="650" y="215" fill="white" fontSize="13" fontWeight="700">24</text>
      <path d="M217 199v-42H166" fill="none" stroke="#2b6470" strokeWidth="1.5" />
      <rect x="49" y="132" width="171" height="48" rx="8" fill="white" stroke={focus === 'east-west' ? '#08746a' : '#cfdeda'} strokeWidth={focus === 'east-west' ? 3 : 1} />
      <text x="64" y="152" className="study-feature-label">RUNWAY 06 / 24</text>
      <text x="64" y="168" className="study-feature-detail">East–west runway</text>
    </g>
    <g opacity={muted('north-south')}>
      <path d="M642 38 574 405" stroke="#bddad1" strokeWidth="35" strokeLinecap="square" />
      <path d="M642 38 574 405" stroke="#183647" strokeWidth="22" strokeLinecap="square" />
      <path d="M635 70 580 371" stroke="#f1f6f5" strokeWidth="2" strokeDasharray="15 11" />
      <text x="631" y="43" fill="white" fontSize="13" fontWeight="700">16</text>
      <text x="565" y="407" fill="white" fontSize="13" fontWeight="700">34</text>
      <path d="M594 300h100" fill="none" stroke="#2b6470" strokeWidth="1.5" />
      <rect x="682" y="274" width="171" height="48" rx="8" fill="white" stroke={focus === 'north-south' ? '#08746a' : '#cfdeda'} strokeWidth={focus === 'north-south' ? 3 : 1} />
      <text x="697" y="294" className="study-feature-label">RUNWAY 16 / 34</text>
      <text x="697" y="310" className="study-feature-detail">North–south runway</text>
    </g>
    <g opacity={muted('management')}>
      <ellipse cx="479" cy="276" rx="50" ry="19" fill="#08746a" fillOpacity=".12" stroke="#08746a" strokeWidth="2" strokeDasharray="4 4" />
      <circle cx="465" cy="275" r="6" fill="#08746a" stroke="white" strokeWidth="2" />
      <circle cx="499" cy="267" r="6" fill="#08746a" stroke="white" strokeWidth="2" />
      <path d="M465 293v33H417" fill="none" stroke="#08746a" strokeWidth="1.5" />
      <rect x="267" y="313" width="251" height="51" rx="8" fill="white" stroke={focus === 'management' ? '#08746a' : '#cfdeda'} strokeWidth={focus === 'management' ? 3 : 1} />
      <text x="282" y="334" className="study-feature-label">AIRFIELD MANAGEMENT + TOWER</text>
      <text x="282" y="351" className="study-feature-detail">General area south of runway 06/24</text>
    </g>
    <g transform="translate(100 64)"><path d="m0 31 14-29 3 31-8-10Z" fill="#536d78" /><text x="14" y="-7" fill="#536d78" fontSize="12" fontWeight="700">N</text></g>
    <text x="24" y="416" className="study-footer-label">SIMPLIFIED STUDY SKETCH · APPROXIMATE POSITIONS</text>
  </svg>;
}
