export const briefingCategories=['training','winter','markings','source','local-procedure'];
export const briefingFields=['id','title','category','body','effectiveDate','reviewDate','sourceCitation','sourceUrl','author','reviewer'];
export const MAX_IMPORT_BYTES=262144;
export function localDate(date=new Date()){return `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`;}
function validDate(value){if(typeof value!=='string'||!/^\d{4}-\d{2}-\d{2}$/.test(value))return false;const d=new Date(`${value}T00:00:00Z`);return Number.isFinite(d.getTime())&&d.toISOString().slice(0,10)===value;}
export function safeSourceUrl(value){try{const url=new URL(value);return ['https:','http:'].includes(url.protocol)?url.href:null;}catch{return null;}}
export function validateBriefing(entry){
 if(!entry||typeof entry!=='object'||Array.isArray(entry))return ['Briefing must be an object.'];
 const errors=[];
 if(typeof entry.id!=='string'||! /^[a-zA-Z0-9._-]{1,80}$/.test(entry.id))errors.push('A valid unique ID is required.');
 [['title','Title',200],['body','Body',5000],['sourceCitation','Source citation',500]].forEach(([key,label,max])=>{if(typeof entry[key]!=='string'||!entry[key].trim())errors.push(`${label} is required.`);else if(entry[key].length>max)errors.push(`${label} is too long.`);});
 if(!briefingCategories.includes(entry.category))errors.push('Choose a valid category.');
 if(!validDate(entry.effectiveDate))errors.push('Effective date must be a valid calendar date.');
 if(!validDate(entry.reviewDate))errors.push('Review date must be a valid calendar date.');
 if(validDate(entry.effectiveDate)&&validDate(entry.reviewDate)&&entry.reviewDate<entry.effectiveDate)errors.push('Review date cannot precede the effective date.');
 if(typeof entry.sourceUrl!=='string'||entry.sourceUrl.length>2000||!safeSourceUrl(entry.sourceUrl))errors.push('Source link must use http or https.');
 ['author','reviewer'].forEach(key=>{if(entry[key]!==undefined&&(typeof entry[key]!=='string'||entry[key].length>120))errors.push(`${key} attribution must be short text.`);});
 return errors;
}
export function parseBriefingImport(text){
 try{if(typeof text!=='string'||text.length>MAX_IMPORT_BYTES)throw new Error('File exceeds the 256 KB import limit.');const value=JSON.parse(text);
 if(value.schemaVersion!==1||!Array.isArray(value.entries)||value.entries.length>100)throw new Error('Expected schemaVersion 1 with at most 100 entries.');
 const errors=[],ids=new Set();value.entries.forEach((entry,i)=>{errors.push(...validateBriefing(entry).map(e=>`Entry ${i+1}: ${e}`));if(ids.has(entry?.id))errors.push('Duplicate entry IDs are not allowed.');ids.add(entry?.id);});
 return {errors,entries:errors.length?[]:value.entries.map(entry=>Object.fromEntries(briefingFields.map(k=>[k,entry[k]??''])))};
 }catch(e){return {entries:[],errors:[e instanceof SyntaxError?'The file is not valid JSON.':e.message]};}
}
export function briefingDateStatus(entry,today=localDate()){if(!validDate(entry.effectiveDate)||!validDate(entry.reviewDate))return 'dates need review';return today<entry.effectiveDate?'upcoming':today>entry.reviewDate?'expired':'within review period';}
export function exportBriefings(entries){return JSON.stringify({schemaVersion:1,entries},null,2)+'\n';}
