"use client";

import {useState} from "react";
import {ExternalLink,X} from "lucide-react";
import {Dialog,DialogContent,DialogTitle,DialogDescription} from "@/components/ui/dialog";

const prototypeUrl="https://upgather-event-manager-prototype.vercel.app/?view=event-manager&section=home";
const artifacts=[
  {id:"prototype",node:"95:17868",imageNode:"95:17869",image:"/work/upgather-figma/product-prototype.png",title:"Interactive prototype",action:"Play Prototype",alt:"UpGather event list and event details in the interactive prototype",description:"Explore the dashboard and event workflows. Choose Play Prototype for a fullscreen viewer, or open it in a separate tab. This is an interactive design prototype, not a shipped product."},
  {id:"workflow",node:"95:17876",imageNode:"95:17877",image:"/work/upgather-figma/product-workflow.png",title:"Current dashboard",action:"View dashboard",alt:"Current UpGather dashboard with My Work, event readiness, and upcoming events",description:"The current dashboard shows My Work, task status, event readiness, and upcoming events. Review how daily work and contextual signals come together in one workspace."},
  {id:"north-star",node:"95:17885",imageNode:"95:17886",image:"/work/upgather-figma/product-north-star.png",title:"North Star concept",action:"View concept",alt:"UpGather North Star dashboard concept with personalized priorities and AI assistance",description:"Visible elements include a My Work panel surfacing task status, event readiness, upcoming events, recent work, and contextual signals — translating the research insight into one workspace."},
] as const;
type ArtifactId=typeof artifacts[number]["id"];

export default function UpgatherProductDirection(){
  const [active,setActive]=useState<ArtifactId|"context"|null>(null);
  const selected=artifacts.find(artifact=>artifact.id===active);
  return <section className="upgather-product-direction" data-node-id="78:16460" data-name="Design process — Product example" aria-labelledby="upgather-product-heading">
    <div className="upgather-product-rule" data-node-id="78:16461"/>
    <div className="upgather-product-heading" data-name="Section heading" data-node-id="86:939">
      <p className="upgather-product-eyebrow" data-node-id="86:940">PRODUCT DIRECTION</p>
      <h2 id="upgather-product-heading" data-node-id="86:941">Product &amp; North Star concept</h2>
      <p data-node-id="86:942">The research insight — surface what matters next — directly shaped this North Star dashboard concept. My Work, task status, event readiness, and contextual signals are surfaced as the primary workspace, not buried in navigation.</p>
    </div>
    <div className="upgather-product-cards" data-node-id="95:17867">
      {artifacts.map(artifact=><article className="upgather-product-card" data-node-id={artifact.node} key={artifact.id}>
        <button type="button" className="upgather-product-image" data-node-id={artifact.imageNode} onClick={()=>setActive(artifact.id)} aria-label={artifact.id==="prototype"?"Play UpGather interactive prototype":`View ${artifact.title}`} aria-haspopup="dialog">
          <img src={artifact.image} alt={artifact.alt} loading="lazy" width={424} height={228}/>
        </button>
        <div className="upgather-product-caption">
          <div className="upgather-product-caption-header">
            <h3>{artifact.title}</h3>
            <button type="button" className="upgather-product-badge" onClick={()=>setActive(artifact.id)} aria-haspopup="dialog" aria-label={artifact.action}>{artifact.action}</button>
          </div>
          <p>{artifact.description}</p>
        </div>
      </article>)}
    </div>
    <div className="upgather-product-context" data-node-id="86:952">
      <div><p>My Work and task status surface what needs attention — translating the key insight directly into the dashboard.</p><span>Product direction · North Star concept</span></div>
      <button type="button" onClick={()=>setActive("context")} aria-haspopup="dialog">Read context</button>
    </div>
    <Dialog open={active==="prototype"} onOpenChange={open=>{if(!open)setActive(null);}}>
      <DialogContent fullScreen showCloseButton={false} className="upgather-prototype-viewer">
        <header className="upgather-prototype-viewer-header">
          <div><DialogTitle>UpGather · Event Manager</DialogTitle><DialogDescription>Interactive design prototype</DialogDescription></div>
          <div className="upgather-prototype-viewer-actions"><a className="upgather-prototype-open" href={prototypeUrl} target="_blank" rel="noopener noreferrer">Open prototype<ExternalLink size={16} aria-hidden="true"/><span className="sr-only"> in a new tab</span></a><button type="button" className="upgather-prototype-close" onClick={()=>setActive(null)} aria-label="Close prototype"><X size={20} aria-hidden="true"/></button></div>
        </header>
        <p className="upgather-prototype-swipe">Swipe sideways to explore the dashboard on smaller screens.</p>
        <div className="upgather-prototype-frame" tabIndex={0} role="region" aria-label="Interactive dashboard. Scroll horizontally to explore on smaller screens.">
          {active==="prototype"&&<iframe src={prototypeUrl} title="UpGather Event Manager interactive prototype" referrerPolicy="strict-origin-when-cross-origin" allow="fullscreen"/>}
        </div>
      </DialogContent>
    </Dialog>
    <Dialog open={active!==null&&active!=="prototype"} onOpenChange={open=>{if(!open)setActive(null);}}>
      <DialogContent className="proof-evidence-dialog upgather-context">
        <DialogTitle>{active==="context"?"Product & North Star concept":selected?.title}</DialogTitle>
        <DialogDescription>{active==="context"?"The research insight — surface what matters next — informed the current dashboard, the interactive prototype, and the North Star direction. The prototype and North Star concept are design explorations, not shipped product.":selected?.description}</DialogDescription>
        <div className="upgather-context-art">{(active==="context"?artifacts.filter(artifact=>artifact.id!=="prototype"):selected?[selected]:[]).map(artifact=><figure key={artifact.id}><img src={artifact.image} alt={artifact.alt}/><figcaption>{artifact.title}</figcaption></figure>)}</div>
      </DialogContent>
    </Dialog>
  </section>;
}
