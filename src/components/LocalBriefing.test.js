import {render,screen,fireEvent} from '@testing-library/react';
import {validateBriefing,parseBriefingImport,briefingDateStatus} from '../study/briefings';
import LocalBriefing from './LocalBriefing';
const entry={id:'draft-1',title:'Local training note',category:'training',body:'<script>literal text</script>',effectiveDate:'2026-10-12',reviewDate:'2026-10-13',sourceCitation:'3 WG 4.2.1',sourceUrl:'https://example.com/reference',author:'ADPM role',reviewer:''};
test('briefing validation rejects unsafe sources and impossible dates',()=>{
 expect(validateBriefing({...entry,sourceUrl:'javascript:alert(1)'})).not.toEqual([]);
 expect(validateBriefing({...entry,effectiveDate:'2026-02-30'})).not.toEqual([]);
 expect(validateBriefing({...entry,reviewDate:'2026-01-01'})).not.toEqual([]);
 expect(validateBriefing(entry)).toEqual([]);
});
test('invalid imports do not produce entries',()=>{
 expect(parseBriefingImport('{').entries).toEqual([]);
 expect(parseBriefingImport(JSON.stringify({schemaVersion:1,entries:[entry,entry]})).errors).not.toEqual([]);
 expect(parseBriefingImport(JSON.stringify({schemaVersion:1,entries:[entry]})).entries).toHaveLength(1);
});
test('expiry uses calendar days and includes the review date',()=>{
 expect(briefingDateStatus(entry,'2026-10-11')).toBe('upcoming');expect(briefingDateStatus(entry,'2026-10-13')).toBe('within review period');expect(briefingDateStatus(entry,'2026-10-14')).toBe('expired');
});
test('local drafts render imported text literally and remain distinct from shared references',()=>{
 render(<LocalBriefing drafts={[entry]} onSaveDrafts={()=>{}}/>);
 expect(screen.getByText('<script>literal text</script>')).toBeInTheDocument();expect(document.querySelector('script')).toBeNull();
 expect(screen.getByRole('heading',{name:'Your local drafts'})).toBeInTheDocument();
 fireEvent.click(screen.getByRole('button',{name:'Save local draft'}));expect(screen.getByRole('alert')).toHaveTextContent('Title');
});
