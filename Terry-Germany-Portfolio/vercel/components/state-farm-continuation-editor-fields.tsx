"use client";
import type {StateFarmReturning} from '@/lib/state-farm-returning';
type Continuation=StateFarmReturning['continuation'];
function Field({label,value,onChange,multiline=true}:{label:string;value:string;onChange:(value:string)=>void;multiline?:boolean}){return <label className="editor-field"><span>{label}</span>{multiline?<textarea value={value} rows={4} onChange={event=>onChange(event.target.value)}/>:<input value={value} onChange={event=>onChange(event.target.value)}/>}</label>;}
export default function StateFarmContinuationEditorFields({value,onUpdate}:{value:Continuation;onUpdate:(edit:(draft:Continuation)=>void)=>void}){
 const fields=[['title','Section heading'],['intro','Introduction'],['rationale','Prototype approach'],['problem','The problem'],['experienceIntro','Experience introduction'],['contribution','Leadership & contribution'],['intendedImpact','Intended impact'],['impactTitle','Bottom impact heading'],['impactStatement','Bottom impact statement'],['statusNote','Prototype & outcome context']] as const;
 return <section className="editor-card"><h2>03 / Quote continuation</h2><p className="editor-note">The four-stage architecture replaces the previous journey list. Describe intended outcomes separately from measured results.</p>
  {fields.map(([key,label])=><Field key={key} label={label} value={value[key]} multiline={!['title','impactTitle'].includes(key)} onChange={v=>onUpdate(d=>{d[key]=v;})}/>)}
  {value.stages.map((stage,i)=><div className="editor-subcard" key={i}><h3>Journey stage {i+1}</h3>{(['title','subtitle','capability','description'] as const).map(key=><Field key={key} label={{title:'Stage title',subtitle:'Stage subtitle',capability:'Capability heading',description:'Capability description'}[key]} value={stage[key]} multiline={key==='description'} onChange={v=>onUpdate(d=>{d.stages[i][key]=v;})}/>)}</div>)}
  {value.decisions.map((decision,i)=><div className="editor-subcard" key={i}><Field label={'Decision '+(i+1)+' heading'} value={decision.title} multiline={false} onChange={v=>onUpdate(d=>{d.decisions[i].title=v;})}/><Field label={'Decision '+(i+1)+' description'} value={decision.description} onChange={v=>onUpdate(d=>{d.decisions[i].description=v;})}/></div>)}
 </section>;
}
