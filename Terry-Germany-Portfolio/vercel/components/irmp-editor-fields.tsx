"use client";
import type {ChangeEvent} from 'react';
import AdaEditorFields from './ada-editor-fields';
import type {FintechIrmp} from '@/lib/fintech-irmp';

function Field({label,value,onChange,multiline=false}:{label:string;value:string;onChange:(value:string)=>void;multiline?:boolean}){return <label className="editor-field"><span>{label}</span>{multiline?<textarea value={value} rows={4} onChange={event=>onChange(event.target.value)}/>:<input value={value} onChange={event=>onChange(event.target.value)}/>}</label>;}
export default function IrmpEditorFields({value,onUpdate,onUpload,onUploadVideo,onError}:{value:FintechIrmp;onUpdate:(edit:(draft:FintechIrmp)=>void)=>void;onUpload:(file:File)=>Promise<string>;onUploadVideo:(file:File)=>Promise<string>;onError:(message:string)=>void}){
 async function upload(event:ChangeEvent<HTMLInputElement>,index:number,kind:'src'|'poster'){
  const file=event.target.files?.[0];event.target.value='';if(!file)return;
  try{const src=await (kind==='src'?onUploadVideo(file):onUpload(file));onUpdate(d=>{d.walkthroughs[index][kind]=src;});}catch(error){onError((error as Error).message);}
 }
 return <>
  <AdaEditorFields value={value} onUpdate={edit=>onUpdate(d=>edit(d))} onUpload={onUpload} onError={onError} projectName="FinTech IRMP" allowLightImages galleryLabels={{onboarding:'Pre-qualification',assessment:'Payroll documents',wellness:'Interface patterns',visuals:'Research artifacts'}}/>
  <section className="editor-card"><h2>Design system</h2><Field label="Design-system link (HTTPS)" value={value.designSystemUrl} onChange={v=>onUpdate(d=>{d.designSystemUrl=v;})}/></section>
  <section className="editor-card"><h2>Interaction walkthroughs</h2><Field label="Section heading" value={value.walkthroughTitle} onChange={v=>onUpdate(d=>{d.walkthroughTitle=v;})}/><Field label="Section introduction" value={value.walkthroughIntro} multiline onChange={v=>onUpdate(d=>{d.walkthroughIntro=v;})}/>{value.walkthroughs.map((video,i)=><div className="editor-hero-image" key={i}><Field label="Video title" value={video.title} onChange={v=>onUpdate(d=>{d.walkthroughs[i].title=v;})}/><Field label="Video caption" value={video.description} multiline onChange={v=>onUpdate(d=>{d.walkthroughs[i].description=v;})}/><video controls playsInline preload="none" src={video.src} poster={video.poster} style={{width:'100%',maxHeight:320}} aria-label={video.title}/><label className="editor-button editor-upload">Replace video<input type="file" accept="video/mp4,video/webm" aria-label={'Replace '+video.title+' video'} onChange={event=>void upload(event,i,'src')}/></label><label className="editor-button editor-upload">Replace poster image<input type="file" accept="image/jpeg,image/png,image/webp,image/avif" aria-label={'Replace '+video.title+' poster'} onChange={event=>void upload(event,i,'poster')}/></label></div>)}</section>
 </>;
}
