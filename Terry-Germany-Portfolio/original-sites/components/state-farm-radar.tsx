"use client";

import { usePortfolioContent } from '@/components/portfolio-content-provider';
import { useEffect, useRef, useState } from 'react';
import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, Tooltip } from 'recharts';
import { ChartContainer, type ChartConfig } from '@/components/ui/chart';
import { radarCapabilities, radarCompanies, radarData, toggleRadarCompany } from '@/lib/state-farm-radar';

const config = Object.fromEntries(radarCompanies.map(company => [company.key, { label: company.name, color: company.color }])) satisfies ChartConfig;

export default function StateFarmRadar() {
  const {content}=usePortfolioContent();
  const assessmentDate=content.studies['digital-assistance'].caseDetails?.assessmentDate;
  const [visible, setVisible] = useState<string[]>(radarCompanies.map(company => company.key));
  const [capability, setCapability] = useState(3);
  const [focused, setFocused] = useState<string | null>(null);
  const [animate, setAnimate] = useState(false);
  const [entered, setEntered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setAnimate(!motion.matches);
    update(); motion.addEventListener('change', update);
    const observer = new IntersectionObserver(entries => { if (entries.some(entry => entry.isIntersecting)) { setEntered(true); observer.disconnect(); } }, { threshold: 0.15 });
    if (ref.current) observer.observe(ref.current);
    return () => { observer.disconnect(); motion.removeEventListener('change', update); };
  }, []);
  const selected = radarCapabilities[capability];
  return <div className="sf-radar" ref={ref}>
    <div className="sf-radar-heading"><span className="study-kicker">Strategy assessment{assessmentDate?` · ${assessmentDate}`:''}</span><h3>Engagement Capability Radar</h3><p>Compare eight capabilities. Select companies, then explore a capability.</p></div>
    <div className="sf-radar-layout">
      <div className="sf-radar-visual" role="img" aria-label="Engagement capability radar, scored from zero to five. Exact scores are available in the comparison table below.">
        <ChartContainer config={config} className="sf-radar-chart" initialDimension={{width: 620, height: 560}}>
          <RadarChart data={radarData} outerRadius="68%" margin={{top: 30, right: 34, bottom: 30, left: 34}}>
            <PolarGrid stroke="var(--border)" />
            <PolarAngleAxis dataKey="capability" tick={{fill: 'var(--muted-foreground)', fontSize: 12}} />
            <PolarRadiusAxis type="number" domain={[0,5]} tickCount={6} axisLine={false} tick={{fill:'var(--muted-foreground)',fontSize:10}} angle={90}/>
            {entered && radarCompanies.filter(company => visible.includes(company.key)).map(company => <Radar key={company.key} name={company.name} dataKey={company.key} stroke={company.color} fill={company.color} fillOpacity={focused && focused !== company.key ? 0.015 : 0.09} strokeOpacity={focused && focused !== company.key ? 0.2 : 1} strokeWidth={company.key === 'stateFarm' ? 2.5 : 1.5} isAnimationActive={animate} animationDuration={800} animationEasing="ease-out" dot={{r:3,fill:company.color,strokeWidth:0}} />)}
            <Tooltip content={({active, label, payload}) => active && payload?.length ? <div className="sf-radar-tooltip"><strong>{radarCapabilities.find(item=>item.short===label)?.name || label}</strong>{payload.map(item=><div key={String(item.dataKey)}><span>{item.name}</span><b>{String(item.value)} / 5</b></div>)}</div> : null}/>
          </RadarChart>
        </ChartContainer>
      </div>
      <div className="sf-radar-controls">
        <span className="study-kicker">Compare companies</span>
        <div className="sf-radar-companies" aria-label="Companies to compare">{radarCompanies.map(company=><button key={company.key} type="button" aria-pressed={visible.includes(company.key)} onClick={()=>setVisible(current=>toggleRadarCompany(current,company.key))} onMouseEnter={()=>setFocused(company.key)} onMouseLeave={()=>setFocused(null)} onFocus={()=>setFocused(company.key)} onBlur={()=>setFocused(null)}><span className="sf-radar-dot" style={{background:company.color}}/><span>{company.name}</span><span className="sf-radar-check" aria-hidden="true">{visible.includes(company.key)?'✓':'+'}</span></button>)}</div>
        <button type="button" className="proof-inline-link" onClick={()=>{setVisible(radarCompanies.map(company=>company.key));setFocused(null);}}>Reset comparison</button>
        <p className="sf-radar-scale">0–5 assessment scale. Larger shapes indicate broader capability across the selected dimensions.</p>
      </div>
    </div>
    <div className="sf-radar-explore"><span className="study-kicker">Explore a capability</span><div className="sf-radar-capabilities">{radarCapabilities.map((item,index)=><button key={item.name} type="button" aria-pressed={index===capability} onClick={()=>setCapability(index)}>{item.name}</button>)}</div>
      <div key={capability + visible.join(",")} className="sf-radar-detail" aria-live="polite" aria-atomic="true"><div><h4>{selected.name}</h4><p>{selected.detail}</p></div><dl>{radarCompanies.filter(company=>visible.includes(company.key)).map(company=><div key={company.key}><dt><span className="sf-radar-dot" style={{background:company.color}}/>{company.name}</dt><dd>{company.scores[capability]}<span> / 5</span></dd></div>)}</dl></div>
    </div>
    <div className="sf-radar-opportunity"><span className="study-kicker">Biggest opportunity</span><h4>Agent Integration + Trust + Context</h4><p>AI that understands the moment, then connects naturally to a human relationship when it matters.</p></div>
    <details className="study-disclosure sf-radar-table"><summary>View all assessment scores</summary><div className="sf-radar-table-scroll" tabIndex={0} role="region" aria-label="Full capability score comparison"><table><caption>Capability assessment · 0–5 scale</caption><thead><tr><th scope="col">Capability</th>{radarCompanies.map(company=><th scope="col" key={company.key}>{company.name}</th>)}</tr></thead><tbody>{radarCapabilities.map((item,index)=><tr key={item.name}><th scope="row">{item.name}</th>{radarCompanies.map(company=><td key={company.key}>{company.scores[index]}</td>)}</tr>)}</tbody></table></div></details>
  </div>;
}
