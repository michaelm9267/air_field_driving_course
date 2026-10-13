import React from 'react';
const paths = {
  plane: 'M22 2 9 15 M22 2l-7 20-6-7-7-6 20-7Z',
  arrow: 'M4 12h16m-6-6 6 6-6 6',
  back: 'M20 12H4m6-6-6 6 6 6',
  book: 'M12 5v16M3 3h5c2 0 4 1 4 3 0-2 2-3 4-3h5v16h-5c-2 0-4 1-4 2-1-1-2-2-4-2H3V3Z',
  map: 'm3 5 6-2 6 2 6-2v16l-6 2-6-2-6 2V5Zm6-2v16m6-14v16',
  shield: 'M12 3 3 7v5c0 5 9 9 9 9s9-4 9-9V7l-9-4Zm-4 9 3 3 5-6',
  radio: 'M8 9a6 6 0 0 1 8 0M5 6a10 10 0 0 1 14 0M11 13h2v8h-2v-8Z',
  check: 'm5 12 4 4 10-10',
  close: 'm6 6 12 12M6 18 18 6',
  clock: 'M12 8v4l3 2M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z',
  external: 'M14 3h7v7m0-7L10 14M10 3H3v18h18v-7',
  flag: 'M5 21V3l7 2 7-2v11l-7 2-7-2',
  reset: 'M3 10a9 9 0 1 1 1 8M3 3v7h7',
};
export default function Icon({ name, className = '' }) {
  return <svg className={`icon ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[name] || paths.book} /></svg>;
}
