"use client";
import type {StateFarmReturning} from '@/lib/state-farm-returning';
type Decisions=StateFarmReturning['designDecisions'];
function Field({label,value,onChange,multiline=false}:{label:string;value:string;onChange:(value:string)=>void;multiline?:boolean}){return <label className="editor-field"><span>{label}</span>{multiline?<textarea value={value} rows={4} onChange={event=>onChange(event.target.value)}/>:<input value={value} onChange={event=>onChange(event.target.value)}/>}</label>;}
export default function StateFarmDecisionEditorFields({value,onUpdate}:{value:Decisions;onUpdate:(edit:(draft:Decisions)=>void)=>void}){
 const fields=[['title','Section heading'],['intro','Introduction'],['leadershipTitle','Leadership statement heading'],['leadershipStatement','Leadership statement'],['designScope','Design & prototype scope'],['futureScope','Future-state AI scope']] as const;
 return <section className="editor-card"><h2>Four primary design decisions</h2><p className="editor-note">Keep delivered design and prototype work distinct from future agentic AI capabilities. Supporting images are managed in the supporting work section.</p>
  {fields.map(([key,label])=><Field key={key} label={label} value={value[key]} multiline={!['title','leadershipTitle'].includes(key)} onChange={v=>onUpdate(d=>{d[key]=v;})}/>)}
  {value.cards.map((card,i)=><div className="editor-subcard" key={i}><h3>Decision {i+1}</h3>{(['title','summary','description','decision'] as const).map(key=><Field key={key} label={{title:'Card title',summary:'Short summary',description:'Expandable rationale',decision:'Decision statement'}[key]} value={card[key]} multiline={key!=='title'} onChange={v=>onUpdate(d=>{d.cards[i][key]=v;})}/>)}</div>)}
  {value.principles.map((item,i)=><div className="editor-subcard" key={i}><h3>Supporting principle {i+1}</h3>{(['title','description','decision'] as const).map(key=><Field key={key} label={{title:'Principle heading',description:'Narrative',decision:'Decision statement'}[key]} value={item[key]} multiline={key!=='title'} onChange={v=>onUpdate(d=>{d.principles[i][key]=v;})}/>)}</div>)}
 </section>;
}
