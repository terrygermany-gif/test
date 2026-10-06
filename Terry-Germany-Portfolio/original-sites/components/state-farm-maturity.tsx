"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { usePortfolioContent } from "@/components/portfolio-content-provider";

export default function StateFarmMaturity() {
 const {content}=usePortfolioContent();const maturityLevels=content.maturity.levels;
 return <div className="sf-maturity">
  <div className="sf-maturity-intro"><p>A shared path from <strong>Level 1 to Level 3.</strong></p><span>Implemented with Product + Engineering</span></div>
  <Tabs defaultValue="3" className="sf-maturity-tabs">
   <TabsList className="sf-maturity-path" aria-label="AI maturity levels">
    {maturityLevels.map(item=><TabsTrigger key={item.level} value={String(item.level)} className={`sf-maturity-level sf-maturity-l${item.level}`} aria-label={`Level ${item.level}: ${item.name}`}><span className="sf-maturity-stage">{item.stage}</span><span className="sf-maturity-level-title"><span className="sf-maturity-number">0{item.level}</span><span><span className="sf-maturity-level-label">Level {item.level}</span><strong>{item.name}</strong></span></span><span className="sf-maturity-principle">{item.principle}</span></TabsTrigger>)}
   </TabsList>
   {maturityLevels.map(item=><TabsContent key={item.level} value={String(item.level)} className={`sf-maturity-detail sf-maturity-l${item.level}`}><div className="sf-maturity-detail-heading"><span className="study-kicker">Level {item.level} / {item.principle}</span><h3>{item.summary}</h3></div><div className="sf-maturity-detail-grid"><div className="sf-maturity-experience"><span className="sf-maturity-label">Customer experience</span><p>{item.customer}</p><ul>{item.capabilities.map(c=><li key={c}>{c}</li>)}</ul><details className="sf-maturity-expanded study-disclosure"><summary>Example interaction & team implementation</summary><div className="sf-maturity-example"><span>Illustrative insurance interaction</span><p>{item.example}</p><p>{item.exampleResponse}</p></div><div className="sf-maturity-team-focus"><span className="sf-maturity-label">What this means for the teams</span><dl><div><dt>Product</dt><dd>{item.product}</dd></div><div><dt>Engineering</dt><dd>{item.engineering}</dd></div></dl><p className="sf-maturity-control">A shared model for connecting customer needs, interaction behavior, and technical capability.</p></div></details></div></div></TabsContent>)}
  </Tabs>
 </div>;
}
