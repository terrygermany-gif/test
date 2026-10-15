"use client";

import {useState} from "react";
import {defaultPortfolioHeroes,portfolioPageTitle} from "@/lib/portfolio-heroes";
import Link from "next/link";
import {ArrowLeft,X} from "lucide-react";
import ThemeToggle from "@/components/theme-toggle";
import UpgatherProductDirection from "@/components/upgather-product-direction";
import {usePortfolioContent} from "@/components/portfolio-content-provider";
import {Dialog,DialogContent,DialogTitle,DialogDescription} from "@/components/ui/dialog";

const imgImage = "/work/upgather-figma/hero.png";
const imgImage2 = "/work/upgather-figma/workflow-a.png";
const imgImage3 = "/work/upgather-figma/workflow-b.png";
const imgWorkflow = "/work/upgather-figma/workflow.svg";
const imgUsers = "/work/upgather-figma/users.svg";
const imgSearch = "/work/upgather-figma/search.svg";
const imgPanelsTopLeft = "/work/upgather-figma/panels-top-left.svg";
const imgComponent = "/work/upgather-figma/component.svg";
const imgScanEye = "/work/upgather-figma/scan-eye.svg";

export default function UpgatherPortfolio({onClose}:{onClose?:()=>void}) {
  const {preview,content,canEdit}=usePortfolioContent();
  const hero=content.portfolioHeroes['event-flow'];
  const defaults=defaultPortfolioHeroes['event-flow'];
  const customDescription=hero.description!==defaults.description;
  // The previous published hero used this uploaded dashboard. The new Figma
  // cover supersedes that artwork while subsequent owner uploads stay editable.
  const customImage=hero.image!==defaults.image&&hero.image!=="/api/portfolio-media/e0dd9824-2536-493a-ab6c-a164ed148e50";
  const backHref=preview?"/edit/preview?view=work":"/work?view=portfolio";
  const [context,setContext]=useState<"workflow"|null>(null);
  return (
    <div className="upgather-research bg-[var(--background,#0b0b0e)] content-stretch flex flex-col items-start relative w-full" data-node-id="79:4079" data-name="UpGather / Research & discovery / Desktop">
      <header className="upgather-toolbar" aria-label="Portfolio viewer controls">
        {onClose?<button type="button" className="proof-back" onClick={onClose}><ArrowLeft size={17} aria-hidden="true"/>All portfolio</button>:<Link className="proof-back" href={backHref}><ArrowLeft size={17} aria-hidden="true"/>All portfolio</Link>}
        <div className="upgather-toolbar-actions"><ThemeToggle/>{onClose?<button type="button" className="study-close" onClick={onClose} aria-label="Close portfolio project"><X size={18} aria-hidden="true"/></button>:<Link className="study-close" href={backHref} aria-label="Back to portfolio"><X size={18} aria-hidden="true"/></Link>}</div>
      </header>
      <div className="content-stretch flex flex-col gap-[19px] items-start overflow-clip px-[72px] py-[15px] relative shrink-0 w-full" data-node-id="79:4080" data-name="Research introduction">
        <p className="[word-break:break-word] font-medium leading-[28px] not-italic relative shrink-0 text-[14px] text-[color:var(--primary,#c8afff)] w-full" data-node-id="79:4081">{`RESEARCH & DISCOVERY`}</p>
        <div className="[word-break:break-word] content-stretch flex gap-[2px] items-center not-italic overflow-clip relative shrink-0 w-full" data-node-id="79:4082" data-name="Introduction narrative">
          <h1 className="font-bold leading-[58.8px] relative shrink-0 text-[56px] text-[color:var(--foreground,#f4f3f8)] tracking-[-3.08px] w-[663px]" data-node-id="79:4083">
            {portfolioPageTitle("event-flow",hero)}
          </h1>
          <div className="content-stretch flex flex-[1_0_0] flex-col font-normal gap-[16px] items-start leading-[28px] min-w-px overflow-clip relative text-[16px] text-[color:var(--muted-foreground,#b5b1c0)]" data-node-id="79:4084" data-name="Research purpose">
            <p className="relative shrink-0 w-full" data-node-id="79:4085">
              {customDescription?hero.description:"Before redesigning UpGather, I studied how event teams plan, publish, coordinate, and manage events across fragmented tools, workflows, and stakeholders."}
            </p>
            <p className="relative shrink-0 w-full" data-node-id="79:4086">
              The goal was to identify where better UX, automation, personalization, and AI could remove operational friction.
            </p>
          </div>
        </div>
        <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="78:15940">
          <div className="aspect-[1296/498] relative rounded-[12px] shrink-0 w-full" data-node-id="78:15941" data-name="Image">
            <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[12px]">
              <img alt={customImage?hero.imageAlt:"Event team member reviewing event information at a desk"} className="absolute inset-0 block h-full w-full object-cover" src={customImage?hero.image:imgImage} loading="eager" />
            </div>
            {canEdit&&!preview&&<Link className="upgather-edit-cover" href="/edit?portfolio=event-flow">Edit hero</Link>}
          </div>
          <div className="content-stretch flex flex-col gap-[var(--sf-spacing-0,0px)] items-start p-[var(--sf-spacing-0,0px)] relative shrink-0 w-full" data-node-id="78:15942" data-name="Project facts">
            <div className="bg-[var(--border,#392e43)] h-px relative shrink-0 w-full" data-node-id="78:15943" data-name="Browser reference — facts divider" />
            <div className="[word-break:break-word] content-stretch flex font-normal gap-[89px] items-start justify-center not-italic px-[var(--sf-spacing-0,0px)] py-[16px] relative shrink-0 text-[14px] w-full" data-node-id="78:15944" data-name="Facts table">
              <div className="content-stretch flex flex-[1_0_0] flex-col gap-px items-start min-w-px p-[var(--sf-spacing-0,0px)] relative" data-node-id="78:15945" data-name="Product">
                <p className="leading-[21px] relative shrink-0 text-[color:var(--muted-foreground,#b2a8bf)] w-full" data-node-id="78:15946">
                  Product
                </p>
                <p className="leading-[26.4px] relative shrink-0 text-[color:var(--primary,#c8afff)] w-full" data-node-id="78:15947">
                  Upgather - Event SaaS Creator
                </p>
              </div>
              <div className="content-stretch flex flex-[1_0_0] flex-col gap-px items-start min-w-px p-[var(--sf-spacing-0,0px)] relative" data-node-id="78:15948" data-name="My role">
                <p className="leading-[21px] relative shrink-0 text-[color:var(--muted-foreground,#b2a8bf)] w-full" data-node-id="78:15949">
                  My role
                </p>
                <p className="leading-[26.4px] relative shrink-0 text-[color:var(--primary,#c8afff)] w-full" data-node-id="78:15950">
                  Principal Product Designer
                </p>
              </div>
              <div className="content-stretch flex flex-[1_0_0] flex-col gap-px items-start min-w-px p-[var(--sf-spacing-0,0px)] relative" data-node-id="78:15951" data-name="Format">
                <p className="leading-[21px] relative shrink-0 text-[color:var(--muted-foreground,#b2a8bf)] w-full" data-node-id="78:15952">
                  Format
                </p>
                <p className="leading-[26.4px] relative shrink-0 text-[color:var(--primary,#c8afff)] w-full" data-node-id="78:15953">
                  Product design &amp; prototyping
                </p>
              </div>
              <div className="content-stretch flex flex-[1_0_0] flex-col gap-px items-start min-w-px p-[var(--sf-spacing-0,0px)] relative" data-node-id="78:15954" data-name="Focus">
                <p className="leading-[21px] relative shrink-0 text-[color:var(--muted-foreground,#b2a8bf)] w-full" data-node-id="78:15955">
                  Focus
                </p>
                <p className="leading-[26.4px] relative shrink-0 text-[color:var(--primary,#c8afff)] w-full" data-node-id="78:15956">
                  Enterprise UX, Experience architecture
                </p>
              </div>
            </div>
            <div className="bg-[var(--border,#392e43)] h-px relative shrink-0 w-full" data-node-id="78:15957" data-name="Browser reference — facts divider" />
          </div>
        </div>
      </div>
      <div className="content-stretch flex flex-col gap-[var(--portfolio-portfolio-spacing-32,32px)] items-center overflow-clip px-[72px] py-[22px] relative shrink-0 w-full" data-node-id="79:4222" data-name="Research to product opportunity">
        <div className="[word-break:break-word] content-stretch flex flex-col gap-[12px] items-start not-italic overflow-clip relative shrink-0 w-full" data-node-id="78:17188" data-name="Introduction">
          <p className="font-semibold leading-[28px] relative shrink-0 text-[14px] text-[color:var(--primary,#c8afff)] w-full" data-node-id="78:17189">
            RESEARCH EVIDENCE
          </p>
          <div className="content-center flex flex-wrap gap-[40px] items-center overflow-clip relative shrink-0 w-full" data-node-id="78:17190" data-name="Introduction narrative">
            <h2 className="flex-[1_0_0] font-bold leading-[58.8px] min-w-[320px] relative text-[56px] text-[color:var(--foreground,#f4f3f8)] tracking-[-3.08px]" data-node-id="78:17191">
              Evidence before assumptions
            </h2>
            <div className="content-stretch flex flex-col font-normal gap-[16px] items-start leading-[28px] min-w-[320px] overflow-clip relative shrink-0 text-[16px] text-[color:var(--muted-foreground,#b5b1c0)] w-[747px]" data-node-id="78:17192" data-name="Purpose">
              <p className="relative shrink-0 w-full" data-node-id="78:17193">
                UpGather’s product direction was informed primarily through workflow analysis, stakeholder input, competitive research, prototype iteration, design-system audits, and implementation feedback.
              </p>
              <p className="relative shrink-0 w-full" data-node-id="78:17194">
                The goal was to understand where event teams were losing time, context, and consistency across the event-management lifecycle.
              </p>
            </div>
          </div>
        </div>
        <div className="content-stretch flex flex-col gap-[8px] items-start overflow-clip relative shrink-0 w-full" data-node-id="78:17035" data-name="Research methods">
          <p className="[word-break:break-word] font-semibold leading-[28px] not-italic relative shrink-0 text-[14px] text-[color:var(--primary,#c8afff)] w-full" data-node-id="78:17036">
            RESEARCH METHODS
          </p>
          <div className="content-start flex flex-wrap gap-[32px] items-start overflow-clip relative shrink-0 w-full" data-node-id="78:17037" data-name="Method row">
            <div className="border-[var(--border,#392e43)] border-solid border-t content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-start min-w-[280px] overflow-clip py-[24px] relative" data-node-id="78:17038" data-name="Research method">
              <div className="content-stretch flex items-center justify-between overflow-clip relative shrink-0 w-full" data-node-id="78:17039" data-name="Method marker">
                <p className="[word-break:break-word] font-normal leading-[21px] not-italic relative shrink-0 text-[14px] text-[color:var(--primary,#c8afff)] whitespace-nowrap" data-node-id="78:17040">
                  01
                </p>
                <div className="relative shrink-0 size-[20px]" data-node-id="78:17041" data-name="workflow">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgWorkflow} />
                </div>
              </div>
              <p className="[word-break:break-word] font-medium leading-[22.4px] not-italic relative shrink-0 text-[16px] text-[color:var(--foreground,#f4f3f8)] w-full" data-node-id="78:17043">
                WORKFLOW ANALYSIS
              </p>
              <p className="[word-break:break-word] font-normal leading-[28px] not-italic relative shrink-0 text-[16px] text-[color:var(--muted-foreground,#b5b1c0)] w-full" data-node-id="78:17044">
                Reviewed end-to-end workflows across Events, Speakers, Sponsors, Agenda, Registration, Members, Organizations, Invitations, analytics, and publishing.
              </p>
            </div>
            <div className="border-[var(--border,#392e43)] border-solid border-t content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-start min-w-[280px] overflow-clip py-[24px] relative" data-node-id="78:17045" data-name="Research method">
              <div className="content-stretch flex items-center justify-between overflow-clip relative shrink-0 w-full" data-node-id="78:17046" data-name="Method marker">
                <p className="[word-break:break-word] font-normal leading-[21px] not-italic relative shrink-0 text-[14px] text-[color:var(--primary,#c8afff)] whitespace-nowrap" data-node-id="78:17047">
                  02
                </p>
                <div className="relative shrink-0 size-[20px]" data-node-id="78:17048" data-name="users">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgUsers} />
                </div>
              </div>
              <p className="[word-break:break-word] font-medium leading-[22.4px] not-italic relative shrink-0 text-[16px] text-[color:var(--foreground,#f4f3f8)] w-full" data-node-id="78:17050">
                STAKEHOLDER DISCOVERY
              </p>
              <p className="[word-break:break-word] font-normal leading-[28px] not-italic relative shrink-0 text-[16px] text-[color:var(--muted-foreground,#b5b1c0)] w-full" data-node-id="78:17051">
                Translated evolving business, customer, product, and technical requirements into workflows, interaction models, and product direction.
              </p>
            </div>
            <div className="border-[var(--border,#392e43)] border-solid border-t content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-start min-w-[280px] overflow-clip py-[24px] relative" data-node-id="78:17052" data-name="Research method">
              <div className="content-stretch flex items-center justify-between overflow-clip relative shrink-0 w-full" data-node-id="78:17053" data-name="Method marker">
                <p className="[word-break:break-word] font-normal leading-[21px] not-italic relative shrink-0 text-[14px] text-[color:var(--primary,#c8afff)] whitespace-nowrap" data-node-id="78:17054">
                  03
                </p>
                <div className="relative shrink-0 size-[20px]" data-node-id="78:17055" data-name="search">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgSearch} />
                </div>
              </div>
              <p className="[word-break:break-word] font-medium leading-[22.4px] not-italic relative shrink-0 text-[16px] text-[color:var(--foreground,#f4f3f8)] w-full" data-node-id="78:17057">
                COMPETITIVE / DESK RESEARCH
              </p>
              <p className="[word-break:break-word] font-normal leading-[28px] not-italic relative shrink-0 text-[16px] text-[color:var(--muted-foreground,#b5b1c0)] w-full" data-node-id="78:17058">
                Studied event-management SaaS, registration, CMS, workflow, dashboard, automation, and integration patterns.
              </p>
            </div>
          </div>
          <div className="content-start flex flex-wrap gap-[32px] items-start overflow-clip relative shrink-0 w-full" data-node-id="78:17059" data-name="Method row">
            <div className="border-[var(--border,#392e43)] border-solid border-t content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-start min-w-[280px] overflow-clip py-[24px] relative" data-node-id="78:17060" data-name="Research method">
              <div className="content-stretch flex items-center justify-between overflow-clip relative shrink-0 w-full" data-node-id="78:17061" data-name="Method marker">
                <p className="[word-break:break-word] font-normal leading-[21px] not-italic relative shrink-0 text-[14px] text-[color:var(--primary,#c8afff)] whitespace-nowrap" data-node-id="78:17062">
                  04
                </p>
                <div className="relative shrink-0 size-[20px]" data-node-id="78:17063" data-name="panels-top-left">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgPanelsTopLeft} />
                </div>
              </div>
              <p className="[word-break:break-word] font-medium leading-[22.4px] not-italic relative shrink-0 text-[16px] text-[color:var(--foreground,#f4f3f8)] w-full" data-node-id="78:17065">
                PROTOTYPE ITERATION
              </p>
              <p className="[word-break:break-word] font-normal leading-[28px] not-italic relative shrink-0 text-[16px] text-[color:var(--muted-foreground,#b5b1c0)] w-full" data-node-id="78:17066">
                Created and refined high-fidelity concepts for dashboards, event creation, side panels, registration, sponsors, members, organizations, and related experiences.
              </p>
            </div>
            <div className="border-[var(--border,#392e43)] border-solid border-t content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-start min-w-[280px] overflow-clip py-[24px] relative" data-node-id="78:17067" data-name="Research method">
              <div className="content-stretch flex items-center justify-between overflow-clip relative shrink-0 w-full" data-node-id="78:17068" data-name="Method marker">
                <p className="[word-break:break-word] font-normal leading-[21px] not-italic relative shrink-0 text-[14px] text-[color:var(--primary,#c8afff)] whitespace-nowrap" data-node-id="78:17069">
                  05
                </p>
                <div className="relative shrink-0 size-[20px]" data-node-id="78:17070" data-name="component">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgComponent} />
                </div>
              </div>
              <p className="[word-break:break-word] font-medium leading-[22.4px] not-italic relative shrink-0 text-[16px] text-[color:var(--foreground,#f4f3f8)] w-full" data-node-id="78:17072">
                DESIGN-SYSTEM AUDIT
              </p>
              <p className="[word-break:break-word] font-normal leading-[28px] not-italic relative shrink-0 text-[16px] text-[color:var(--muted-foreground,#b5b1c0)] w-full" data-node-id="78:17073">
                Reviewed typography, spacing, status patterns, list rows, components, and interaction consistency across UpGather.
              </p>
            </div>
            <div className="border-[var(--border,#392e43)] border-solid border-t content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-start min-w-[280px] overflow-clip py-[24px] relative" data-node-id="78:17074" data-name="Research method">
              <div className="content-stretch flex items-center justify-between overflow-clip relative shrink-0 w-full" data-node-id="78:17075" data-name="Method marker">
                <p className="[word-break:break-word] font-normal leading-[21px] not-italic relative shrink-0 text-[14px] text-[color:var(--primary,#c8afff)] whitespace-nowrap" data-node-id="78:17076">
                  06
                </p>
                <div className="relative shrink-0 size-[20px]" data-node-id="78:17077" data-name="scan-eye">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgScanEye} />
                </div>
              </div>
              <p className="[word-break:break-word] font-medium leading-[22.4px] not-italic relative shrink-0 text-[16px] text-[color:var(--foreground,#f4f3f8)] w-full" data-node-id="78:17079">
                IMPLEMENTATION QA
              </p>
              <p className="[word-break:break-word] font-normal leading-[28px] not-italic relative shrink-0 text-[16px] text-[color:var(--muted-foreground,#b5b1c0)] w-full" data-node-id="78:17080">
                Compared Figma designs against the built application and worked with Engineering to resolve visual and interaction differences.
              </p>
            </div>
          </div>
        </div>
        <div className="[word-break:break-word] content-stretch flex flex-col gap-[var(--sf-spacing-0,0px)] items-start not-italic pb-[var(--sf-spacing-0,0px)] px-[var(--sf-spacing-0,0px)] relative shrink-0 w-[1320px]" data-node-id="78:17135" data-name="More portfolio work">
          <p className="font-medium leading-[28px] relative shrink-0 text-[14px] text-[color:var(--primary,#c8afff)] w-full" data-node-id="78:17164">
            KEY OBSERVATIONS
          </p>
          <div className="content-stretch flex gap-[var(--sf-spacing-20,20px)] items-start pb-[var(--sf-spacing-0,0px)] pt-[var(--sf-spacing-22,22px)] px-[var(--sf-spacing-0,0px)] relative shrink-0 w-full" data-node-id="78:17136" data-name="Related project cards">
            <div className="bg-[var(--card,#131017)] border border-[var(--border,#392e43)] border-solid content-stretch flex flex-[1_0_0] flex-col gap-[var(--sf-spacing-12,12px)] items-start justify-center min-w-px p-[var(--sf-spacing-22,22px)] relative rounded-[var(--sf-radius-16,16px)]" data-node-id="78:17137" data-name="Shopping">
              <p className="font-semibold leading-[43px] relative shrink-0 text-[36px] text-[color:var(--muted-foreground,#b5b1c0)] tracking-[-2px] w-[376px]" data-node-id="I78:17137;45:139">
                01
              </p>
              <p className="font-medium leading-[22.4px] relative shrink-0 text-[16px] text-[color:var(--foreground,#f4f3f8)] w-[376px]" data-node-id="I78:17137;45:140">
                FRAGMENTED WORK
              </p>
              <p className="font-normal leading-[28px] relative shrink-0 text-[16px] text-[color:var(--muted-foreground,#b5b1c0)] w-[376px]" data-node-id="I78:17137;45:141">
                Tasks lived across UpGather, Asana, email, spreadsheets, and other systems.
              </p>
            </div>
            <div className="bg-[var(--card,#131017)] border border-[var(--border,#392e43)] border-solid content-stretch flex flex-[1_0_0] flex-col gap-[var(--sf-spacing-12,12px)] items-start justify-center min-w-px p-[var(--sf-spacing-22,22px)] relative rounded-[var(--sf-radius-16,16px)]" data-node-id="78:17138" data-name="Shopping">
              <p className="font-semibold leading-[43px] relative shrink-0 text-[36px] text-[color:var(--muted-foreground,#b5b1c0)] tracking-[-2px] w-[376px]" data-node-id="I78:17138;45:139">
                02
              </p>
              <p className="font-medium leading-[22.4px] relative shrink-0 text-[16px] text-[color:var(--foreground,#f4f3f8)] w-[376px]" data-node-id="I78:17138;45:140">
                LOW VISIBILITY
              </p>
              <p className="font-normal leading-[28px] relative shrink-0 text-[16px] text-[color:var(--muted-foreground,#b5b1c0)] w-[376px]" data-node-id="I78:17138;45:141">
                Teams could not quickly understand what still needed attention before an event was ready.
              </p>
            </div>
            <div className="bg-[var(--card,#131017)] border border-[var(--border,#392e43)] border-solid content-stretch flex flex-[1_0_0] flex-col gap-[var(--sf-spacing-12,12px)] items-start justify-center min-w-px p-[var(--sf-spacing-22,22px)] relative rounded-[var(--sf-radius-16,16px)]" data-node-id="78:17139" data-name="Shopping">
              <p className="font-semibold leading-[43px] relative shrink-0 text-[36px] text-[color:var(--muted-foreground,#b5b1c0)] tracking-[-2px] w-[376px]" data-node-id="I78:17139;45:139">
                03
              </p>
              <p className="font-medium leading-[22.4px] relative shrink-0 text-[16px] text-[color:var(--foreground,#f4f3f8)] w-[376px]" data-node-id="I78:17139;45:140">
                INCONSISTENT PATTERNS
              </p>
              <p className="font-normal leading-[28px] relative shrink-0 text-[16px] text-[color:var(--muted-foreground,#b5b1c0)] w-[376px]" data-node-id="I78:17139;45:141">
                Similar workflows had diverged in typography, spacing, status treatments, hierarchy, and interaction behavior.
              </p>
            </div>
          </div>
          <div className="content-stretch flex gap-[var(--sf-spacing-20,20px)] items-start pb-[var(--sf-spacing-0,0px)] pt-[var(--sf-spacing-22,22px)] px-[var(--sf-spacing-0,0px)] relative shrink-0 w-full" data-node-id="78:17140" data-name="Related project cards">
            <div className="bg-[var(--card,#131017)] border border-[var(--border,#392e43)] border-solid content-stretch flex flex-[1_0_0] flex-col gap-[var(--sf-spacing-12,12px)] items-start min-w-px p-[var(--sf-spacing-22,22px)] relative rounded-[var(--sf-radius-16,16px)] self-stretch" data-node-id="78:17141" data-name="Shopping">
              <p className="font-semibold leading-[43px] relative shrink-0 text-[36px] text-[color:var(--muted-foreground,#b5b1c0)] tracking-[-2px] w-full" data-node-id="I78:17141;45:139">
                04
              </p>
              <p className="font-medium leading-[22.4px] relative shrink-0 text-[16px] text-[color:var(--foreground,#f4f3f8)] w-full" data-node-id="I78:17141;45:140">
                NAVIGATION FRICTION
              </p>
              <p className="font-normal leading-[28px] relative shrink-0 text-[16px] text-[color:var(--muted-foreground,#b5b1c0)] w-full" data-node-id="I78:17141;45:141">
                Users often knew what needed updating but still had to search through the product to find it.
              </p>
            </div>
            <div className="bg-[var(--card,#131017)] border border-[var(--border,#392e43)] border-solid content-stretch flex flex-[1_0_0] flex-col gap-[var(--sf-spacing-12,12px)] items-start min-w-px p-[var(--sf-spacing-22,22px)] relative rounded-[var(--sf-radius-16,16px)]" data-node-id="78:17142" data-name="Shopping">
              <p className="font-semibold leading-[43px] relative shrink-0 text-[36px] text-[color:var(--muted-foreground,#b5b1c0)] tracking-[-2px] w-full" data-node-id="I78:17142;45:139">
                05
              </p>
              <p className="font-medium leading-[22.4px] relative shrink-0 text-[16px] text-[color:var(--foreground,#f4f3f8)] w-full" data-node-id="I78:17142;45:140">
                NO CLEAR NEXT STEP
              </p>
              <p className="font-normal leading-[28px] relative shrink-0 text-[16px] text-[color:var(--muted-foreground,#b5b1c0)] w-full" data-node-id="I78:17142;45:141">
                The system presented information but did not consistently guide users toward the most important action.
              </p>
            </div>
            <div className="bg-[var(--card,#131017)] border border-[var(--border,#392e43)] border-solid content-stretch flex flex-[1_0_0] flex-col gap-[var(--sf-spacing-12,12px)] items-start min-w-px p-[var(--sf-spacing-22,22px)] relative rounded-[var(--sf-radius-16,16px)] self-stretch" data-node-id="78:17159" data-name="Shopping">
              <p className="font-semibold leading-[43px] relative shrink-0 text-[36px] text-[color:var(--muted-foreground,#b5b1c0)] tracking-[-2px] w-full" data-node-id="I78:17159;45:139">
                06
              </p>
              <p className="font-medium leading-[22.4px] relative shrink-0 text-[16px] text-[color:var(--foreground,#f4f3f8)] w-full" data-node-id="I78:17159;45:140">
                DESIGN-TO-BUILD FRICTION
              </p>
              <p className="font-normal leading-[28px] relative shrink-0 text-[16px] text-[color:var(--muted-foreground,#b5b1c0)] w-full" data-node-id="I78:17159;45:141">
                Differences between Figma and production created additional review and correction cycles.
              </p>
            </div>
          </div>
        </div>
        <div className="bg-[var(--card,#131017)] border-[var(--border,#392e43)] border-solid border-t content-stretch flex flex-col gap-[20px] items-start overflow-clip p-[32px] relative rounded-[var(--sf-radius-8,8px)] shrink-0 w-[1330px]" data-node-id="86:903" data-name="Key insight">
          <p className="[word-break:break-word] font-medium leading-[28px] not-italic relative shrink-0 text-[14px] text-[color:var(--primary,#c8afff)] w-full" data-node-id="86:904">
            KEY RESEARCH INSIGHT
          </p>
          <p className="[word-break:break-word] font-semibold leading-[0] not-italic relative shrink-0 text-[40px] text-[color:var(--foreground,#f4f3f8)] w-full" data-node-id="86:905">
            <span className="leading-[46px] text-[color:var(--muted-foreground,#b5b1c0)]">{`Users didn't need more features. `}</span>
            <span className="leading-[46px]">They needed the system to tell them what mattered next.</span>
          </p>
          <div className="content-stretch flex flex-col gap-[12px] items-start justify-center overflow-clip py-[8px] relative shrink-0 w-full" data-node-id="86:906" data-name="Insight model">
            <div className="bg-[var(--border,#392e43)] h-px relative shrink-0 w-full" data-node-id="86:907" data-name="Divider" />
            <div className="content-stretch flex gap-[24px] items-start overflow-clip relative shrink-0 w-full" data-node-id="86:908" data-name="Signals to action">
              <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[3px] items-start min-w-px not-italic overflow-clip relative" data-node-id="86:909" data-name="Guidance stage">
                <div className="content-stretch flex items-center justify-between overflow-clip relative shrink-0 w-full" data-node-id="86:910" data-name="Stage progression">
                  <p className="flex-[1_0_0] font-semibold leading-[20.4px] min-w-px relative text-[12px] text-[color:var(--foreground,#f4f3f8)]" data-node-id="86:911">
                    SIGNALS
                  </p>
                  <p className="font-normal leading-[normal] relative shrink-0 text-[20px] text-[color:var(--primary,#c8afff)] whitespace-nowrap" data-node-id="86:912">
                    →
                  </p>
                </div>
                <p className="font-normal leading-[23.1px] relative shrink-0 text-[14px] text-[color:var(--muted-foreground,#b5b1c0)] w-full" data-node-id="86:913">
                  Tasks, event status, integrations and user activity
                </p>
              </div>
              <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[3px] items-start min-w-px not-italic overflow-clip relative" data-node-id="86:914" data-name="Guidance stage">
                <div className="content-stretch flex items-center justify-between overflow-clip relative shrink-0 text-[color:var(--primary,#c8afff)] w-full" data-node-id="86:915" data-name="Stage progression">
                  <p className="flex-[1_0_0] font-semibold leading-[20.4px] min-w-px relative text-[12px]" data-node-id="86:916">
                    PRIORITIZATION
                  </p>
                  <p className="font-normal leading-[normal] relative shrink-0 text-[20px] whitespace-nowrap" data-node-id="86:917">
                    →
                  </p>
                </div>
                <p className="font-normal leading-[23.1px] relative shrink-0 text-[14px] text-[color:var(--muted-foreground,#b5b1c0)] w-full" data-node-id="86:918">
                  Role, urgency, deadline and event impact
                </p>
              </div>
              <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[3px] items-start min-w-px not-italic overflow-clip relative" data-node-id="86:919" data-name="Guidance stage">
                <div className="content-stretch flex items-center justify-between overflow-clip relative shrink-0 w-full" data-node-id="86:920" data-name="Stage progression">
                  <p className="flex-[1_0_0] font-semibold leading-[20.4px] min-w-px relative text-[12px] text-[color:var(--foreground,#f4f3f8)]" data-node-id="86:921">
                    CONTEXTUAL GUIDANCE
                  </p>
                  <p className="font-normal leading-[normal] relative shrink-0 text-[20px] text-[color:var(--primary,#c8afff)] whitespace-nowrap" data-node-id="86:922">
                    →
                  </p>
                </div>
                <p className="font-normal leading-[23.1px] relative shrink-0 text-[14px] text-[color:var(--muted-foreground,#b5b1c0)] w-full" data-node-id="86:923">
                  Surface what needs attention
                </p>
              </div>
              <div className="content-stretch flex flex-[1_0_0] flex-col gap-[3px] items-start min-w-px overflow-clip relative" data-node-id="86:924" data-name="Guidance stage">
                <div className="content-stretch flex items-center justify-between overflow-clip relative shrink-0 w-full" data-node-id="86:925" data-name="Stage progression">
                  <p className="[word-break:break-word] flex-[1_0_0] font-semibold leading-[20.4px] min-w-px not-italic relative text-[12px] text-[color:var(--foreground,#f4f3f8)]" data-node-id="86:926">
                    DIRECT ACTION
                  </p>
                </div>
                <p className="[word-break:break-word] font-normal leading-[23.1px] not-italic relative shrink-0 text-[14px] text-[color:var(--muted-foreground,#b5b1c0)] w-full" data-node-id="86:927">
                  Take the user directly to the work
                </p>
              </div>
            </div>
          </div>
          <div className="content-stretch flex flex-col gap-[16px] items-start overflow-clip relative shrink-0 w-full" data-node-id="86:928" data-name="Strategy summary">
            <p className="[word-break:break-word] font-normal leading-[28px] not-italic relative shrink-0 text-[16px] text-[color:var(--muted-foreground,#b5b1c0)] w-full" data-node-id="86:929">
              Research shifted the product strategy from simply organizing event data toward helping users understand priorities, reduce operational friction, and take action faster.
            </p>
            <div className="content-start flex flex-wrap gap-[8px] items-start overflow-clip relative shrink-0 w-full" data-node-id="86:930" data-name="Focus topics">
              <div className="border border-[var(--border,#392e43)] border-solid content-stretch flex items-center justify-center px-[var(--portfolio-portfolio-spacing-11,11px)] py-[var(--sf-spacing-6,6px)] relative rounded-[var(--portfolio-portfolio-radius-100,100px)] shrink-0" data-node-id="86:931" data-name="Focus tag">
                <p className="[word-break:break-word] font-normal leading-[21px] not-italic relative shrink-0 text-[14px] text-[color:var(--muted-foreground,#b5b1c0)] whitespace-nowrap" data-node-id="I86:931;45:105">
                  Personalization
                </p>
              </div>
              <div className="border border-[var(--border,#392e43)] border-solid content-stretch flex items-center justify-center px-[var(--portfolio-portfolio-spacing-11,11px)] py-[var(--sf-spacing-6,6px)] relative rounded-[var(--portfolio-portfolio-radius-100,100px)] shrink-0" data-node-id="86:933" data-name="Focus tag">
                <p className="[word-break:break-word] font-normal leading-[21px] not-italic relative shrink-0 text-[14px] text-[color:var(--muted-foreground,#b5b1c0)] whitespace-nowrap" data-node-id="I86:933;45:105">
                  Automation
                </p>
              </div>
              <div className="border border-[var(--border,#392e43)] border-solid content-stretch flex items-center justify-center px-[var(--portfolio-portfolio-spacing-11,11px)] py-[var(--sf-spacing-6,6px)] relative rounded-[var(--portfolio-portfolio-radius-100,100px)] shrink-0" data-node-id="86:935" data-name="Focus tag">
                <p className="[word-break:break-word] font-normal leading-[21px] not-italic relative shrink-0 text-[14px] text-[color:var(--primary,#c8afff)] whitespace-nowrap" data-node-id="I86:935;45:105">
                  AI Assistance
                </p>
              </div>
              <div className="border border-[var(--border,#392e43)] border-solid content-stretch flex items-center justify-center px-[var(--portfolio-portfolio-spacing-11,11px)] py-[var(--sf-spacing-6,6px)] relative rounded-[var(--portfolio-portfolio-radius-100,100px)] shrink-0" data-node-id="86:937" data-name="Focus tag">
                <p className="[word-break:break-word] font-normal leading-[21px] not-italic relative shrink-0 text-[14px] text-[color:var(--muted-foreground,#b5b1c0)] whitespace-nowrap" data-node-id="I86:937;45:105">
                  Contextual Actions
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="content-stretch flex flex-col gap-[12px] items-start overflow-clip relative shrink-0 w-full" data-node-id="86:888" data-name="Workflow evidence artifact">
          <p className="[word-break:break-word] font-medium leading-[28px] not-italic relative shrink-0 text-[14px] text-[color:var(--primary,#c8afff)] w-full" data-node-id="86:889">
            RESEARCH ARTIFACT
          </p>
          <div className="content-stretch flex gap-[12px] items-start relative shrink-0 w-full" data-node-id="78:17846" data-name="Artifact pair">
            <div className="bg-[var(--card,#131017)] border border-[var(--border,#392e43)] border-solid content-stretch flex flex-[1_0_0] flex-col items-start min-w-px overflow-clip relative rounded-[var(--sf-radius-12,12px)]" data-node-id="86:890" data-name="Artifact card">
              <div className="aspect-[642/345] relative shrink-0 w-full" data-node-id="78:17856" data-name="image 2">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <img alt="UpGather workflow analysis across event operations" className="absolute inset-0 block h-full w-full object-cover" src={imgImage2} loading="lazy" />
                </div>
              </div>
              <div className="border-[var(--border,#392e43)] border-solid border-t content-stretch flex flex-col gap-[var(--sf-spacing-8,8px)] items-start p-[var(--sf-spacing-22,22px)] relative shrink-0 w-full" data-node-id="86:892" data-name="Artifact caption">
                <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-node-id="86:893" data-name="Caption header">
                  <p className="[word-break:break-word] font-normal leading-[23.1px] not-italic relative shrink-0 text-[14px] text-[color:var(--primary,#c8afff)] whitespace-nowrap" data-node-id="86:894">
                    Existing workflow artifact
                  </p>
                  <div className="bg-[var(--secondary,#222029)] content-stretch flex items-start px-[8px] py-[3px] relative rounded-[var(--sf-radius-6,6px)] shrink-0" data-node-id="86:895" data-name="Provenance badge">
                    <p className="[word-break:break-word] font-normal leading-[20.4px] not-italic relative shrink-0 text-[12px] text-[color:var(--muted-foreground,#b2a8bf)] whitespace-nowrap" data-node-id="86:896">
                      Workflow map
                    </p>
                  </div>
                </div>
                <p className="[word-break:break-word] font-normal leading-[23.1px] not-italic relative shrink-0 text-[14px] text-[color:var(--muted-foreground,#b5b1c0)] w-full" data-node-id="86:897">
                  This map makes connected steps and dependencies across the event-management lifecycle visible — surfacing where work branched, converged, and repeated across multiple tools and stakeholders.
                </p>
              </div>
            </div>
            <div className="bg-[var(--card,#131017)] border border-[var(--border,#392e43)] border-solid content-stretch flex flex-[1_0_0] flex-col items-start min-w-px overflow-clip relative rounded-[var(--sf-radius-12,12px)]" data-node-id="89:17858" data-name="Artifact card">
              <div className="aspect-[642/345] relative shrink-0 w-full" data-node-id="89:17859" data-name="image 2">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <img alt="UpGather event-management workflow and dependencies" className="absolute inset-0 block h-full w-full object-cover" src={imgImage3} loading="lazy" />
                </div>
              </div>
              <div className="border-[var(--border,#392e43)] border-solid border-t content-stretch flex flex-col gap-[var(--sf-spacing-8,8px)] items-start p-[var(--sf-spacing-22,22px)] relative shrink-0 w-full" data-node-id="89:17860" data-name="Artifact caption">
                <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-node-id="89:17861" data-name="Caption header">
                  <p className="[word-break:break-word] font-normal leading-[23.1px] not-italic relative shrink-0 text-[14px] text-[color:var(--primary,#c8afff)] whitespace-nowrap" data-node-id="89:17862">
                    Existing workflow artifact
                  </p>
                  <div className="bg-[var(--secondary,#222029)] content-stretch flex items-start px-[8px] py-[3px] relative rounded-[var(--sf-radius-6,6px)] shrink-0" data-node-id="89:17863" data-name="Provenance badge">
                    <p className="[word-break:break-word] font-normal leading-[20.4px] not-italic relative shrink-0 text-[12px] text-[color:var(--muted-foreground,#b2a8bf)] whitespace-nowrap" data-node-id="89:17864">
                      Workflow map
                    </p>
                  </div>
                </div>
                <p className="[word-break:break-word] font-normal leading-[23.1px] not-italic relative shrink-0 text-[14px] text-[color:var(--muted-foreground,#b5b1c0)] w-full" data-node-id="89:17865">
                  This map makes connected steps and dependencies across the event-management lifecycle visible — surfacing where work branched, converged, and repeated across multiple tools and stakeholders.
                </p>
              </div>
            </div>
          </div>
          <div className="[word-break:break-word] border-[var(--border,#392e43)] border-solid border-t content-stretch flex gap-[var(--sf-spacing-24,24px)] h-[91px] items-center justify-between not-italic py-[24px] relative shrink-0 w-full" data-node-id="86:898" data-name="Artifact context row">
            <div className="content-stretch flex flex-[1_0_0] flex-col gap-[var(--sf-spacing-6,6px)] items-start min-w-px overflow-clip relative" data-node-id="I86:898;28:645" data-name="Row text">
              <p className="font-medium leading-[22.4px] relative shrink-0 text-[16px] text-[color:var(--foreground,#f4f3f8)] w-[1100px]" data-node-id="I86:898;28:646">
                Mapping the end-to-end event lifecycle to surface where work branched across tools and roles.
              </p>
              <p className="font-normal leading-[20.4px] relative shrink-0 text-[12px] text-[color:var(--muted-foreground,#b2a8bf)] w-[1100px]" data-node-id="I86:898;28:647">
                Workflow analysis · Research method 01
              </p>
            </div>
            <button className="font-normal leading-[23.1px] relative shrink-0 text-[14px] text-[color:var(--proof-accent,#e992a1)] w-[88px]" data-node-id="I86:898;28:648" type="button" onClick={()=>setContext("workflow")} aria-haspopup="dialog">Read context</button>
          </div>
        </div>
        <div className="bg-[var(--card,#131017)] content-stretch flex flex-col gap-[8px] items-start overflow-clip p-[24px] relative rounded-[var(--sf-radius-8,8px)] shrink-0 w-full" data-node-id="78:17181" data-name="Research transparency">
          <p className="[word-break:break-word] font-medium leading-[28px] not-italic relative shrink-0 text-[14px] text-[color:var(--primary,#c8afff)] w-full" data-node-id="78:17182">
            RESEARCH NOTE
          </p>
          <div className="border-[var(--border,#392e43)] border-solid border-t content-stretch flex gap-[var(--sf-spacing-20,20px)] items-center justify-between relative shrink-0 w-full" data-node-id="78:17183" data-name="Research context">
            <div className="content-stretch flex flex-[1_0_0] flex-col gap-[var(--sf-spacing-6,6px)] items-start min-w-px overflow-clip relative" data-node-id="I78:17183;28:639" data-name="Row text">
              <p className="[word-break:break-word] font-normal leading-[23.1px] not-italic relative shrink-0 text-[14px] text-[color:var(--muted-foreground,#b5b1c0)] w-full" data-node-id="I78:17183;28:640">
                This phase relied primarily on workflow analysis, stakeholder input, competitive research, prototype iteration, design-system review, and implementation feedback rather than a formal large-scale moderated user study.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="content-stretch flex flex-col gap-[var(--portfolio-portfolio-spacing-32,32px)] items-start overflow-clip px-[72px] py-[22px] relative shrink-0 w-full" data-node-id="78:17196" data-name="Research to product opportunity">
        <div className="content-stretch flex flex-col gap-[12px] items-start overflow-clip relative shrink-0 w-full" data-node-id="78:17197" data-name="Introduction">
          <p className="[word-break:break-word] font-semibold leading-[28px] not-italic relative shrink-0 text-[14px] text-[color:var(--primary,#c8afff)] w-full" data-node-id="78:17198">{`MY ROLE & OWNERSHIP`}</p>
          <div className="content-center flex flex-wrap gap-[40px] items-center overflow-clip relative shrink-0 w-full" data-node-id="78:17199" data-name="Introduction narrative">
            <h2 className="[word-break:break-word] flex-[1_0_0] font-bold leading-[58.8px] min-w-[320px] not-italic relative text-[56px] text-[color:var(--foreground,#f4f3f8)] tracking-[-3.08px]" data-node-id="78:17200">
              From product direction to implementation
            </h2>
            <div className="content-stretch flex flex-col items-start min-w-[320px] overflow-clip relative shrink-0 w-[687px]" data-node-id="78:17201" data-name="Purpose">
              <p className="[word-break:break-word] font-normal leading-[28px] not-italic relative shrink-0 text-[16px] text-[color:var(--muted-foreground,#b5b1c0)] w-full" data-node-id="78:17202">
                As Principal Product Designer for UpGather, I owned the product experience from discovery and North Star direction through detailed UX/UI, prototyping, design-system development, developer handoff, and implementation support.
              </p>
            </div>
          </div>
        </div>
        <div className="[word-break:break-word] content-start flex flex-wrap gap-[48px] items-start not-italic overflow-clip relative shrink-0 w-full" data-node-id="78:17318" data-name="What I led">
          <div className="content-stretch flex flex-col gap-[16px] items-start overflow-clip pt-[16px] relative shrink-0 w-[240px]" data-node-id="78:17319" data-name="Leadership statement">
            <p className="font-medium leading-[28px] relative shrink-0 text-[#8baaff] text-[14px] w-full" data-node-id="78:17320">
              WHAT I LED
            </p>
            <p className="font-semibold leading-[66.56px] relative shrink-0 text-[64px] text-[color:var(--foreground,#f4f3f8)] w-full" data-node-id="78:17321">
              I LED
            </p>
          </div>
          <div className="content-stretch flex flex-[1_0_0] flex-col gap-[8px] items-start min-w-[320px] overflow-clip relative text-[16px]" data-node-id="78:17322" data-name="Ownership grid">
            <div className="content-start flex flex-wrap gap-[40px] items-start overflow-clip relative shrink-0 w-full" data-node-id="78:17323" data-name="Ownership row">
              <div className="border-[var(--border,#392e43)] border-solid border-t content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-start min-w-[280px] overflow-clip py-[24px] relative" data-node-id="78:17324" data-name="Ownership area">
                <p className="font-medium leading-[22.4px] relative shrink-0 text-[color:var(--foreground,#f4f3f8)] w-full" data-node-id="78:17325">
                  PRODUCT DIRECTION
                </p>
                <p className="font-normal leading-[28px] relative shrink-0 text-[color:var(--muted-foreground,#b5b1c0)] w-full" data-node-id="78:17326">
                  Defined North Star concepts and translated ambiguous requirements into actionable product direction.
                </p>
              </div>
              <div className="border-[var(--border,#392e43)] border-solid border-t content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-start min-w-[280px] overflow-clip py-[24px] relative" data-node-id="78:17327" data-name="Ownership area">
                <p className="font-medium leading-[22.4px] relative shrink-0 text-[color:var(--foreground,#f4f3f8)] w-full" data-node-id="78:17328">
                  EXPERIENCE ARCHITECTURE
                </p>
                <p className="font-normal leading-[28px] relative shrink-0 text-[color:var(--muted-foreground,#b5b1c0)] w-full" data-node-id="78:17329">
                  Structured complex event-management workflows across the platform.
                </p>
              </div>
            </div>
            <div className="content-start flex flex-wrap gap-[40px] items-start overflow-clip relative shrink-0 w-full" data-node-id="78:17330" data-name="Ownership row">
              <div className="border-[var(--border,#392e43)] border-solid border-t content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-start min-w-[280px] overflow-clip py-[24px] relative" data-node-id="78:17331" data-name="Ownership area">
                <p className="font-medium leading-[22.4px] relative shrink-0 text-[color:var(--foreground,#f4f3f8)] w-full" data-node-id="78:17332">
                  UX / UI DESIGN
                </p>
                <p className="font-normal leading-[28px] relative shrink-0 text-[color:var(--muted-foreground,#b5b1c0)] w-full" data-node-id="78:17333">
                  Designed responsive, high-fidelity experiences from early concepts through implementation-ready detail.
                </p>
              </div>
              <div className="border-[var(--border,#392e43)] border-solid border-t content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-start min-w-[280px] overflow-clip py-[24px] relative" data-node-id="78:17334" data-name="Ownership area">
                <p className="font-medium leading-[22.4px] relative shrink-0 text-[color:var(--foreground,#f4f3f8)] w-full" data-node-id="78:17335">
                  INTERACTION DESIGN
                </p>
                <p className="font-normal leading-[28px] relative shrink-0 text-[color:var(--muted-foreground,#b5b1c0)] w-full" data-node-id="78:17336">
                  Defined side panels, full-screen workflows, list behaviors, states, validation, navigation, and responsive interactions.
                </p>
              </div>
            </div>
            <div className="content-start flex flex-wrap gap-[40px] items-start overflow-clip relative shrink-0 w-full" data-node-id="78:17337" data-name="Ownership row">
              <div className="border-[var(--border,#392e43)] border-solid border-t content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-start min-w-[280px] overflow-clip py-[24px] relative" data-node-id="78:17338" data-name="Ownership area">
                <p className="font-medium leading-[22.4px] relative shrink-0 text-[color:var(--foreground,#f4f3f8)] w-full" data-node-id="78:17339">
                  DESIGN SYSTEM
                </p>
                <p className="font-normal leading-[28px] relative shrink-0 text-[color:var(--muted-foreground,#b5b1c0)] w-full" data-node-id="78:17340">
                  Evolved shared Figma components and patterns to improve consistency across the product.
                </p>
              </div>
              <div className="border-[var(--border,#392e43)] border-solid border-t content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-start min-w-[280px] overflow-clip py-[24px] relative" data-node-id="78:17341" data-name="Ownership area">
                <p className="font-medium leading-[22.4px] relative shrink-0 text-[color:var(--foreground,#f4f3f8)] w-full" data-node-id="78:17342">
                  DESIGN-TO-BUILD
                </p>
                <p className="font-normal leading-[28px] relative shrink-0 text-[color:var(--muted-foreground,#b5b1c0)] w-full" data-node-id="78:17343">
                  Supported implementation through Storybook, repositories, MCP-based workflows, specifications, and visual QA.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="content-stretch flex flex-col gap-[3px] items-start overflow-clip py-[14px] relative shrink-0 w-full" data-node-id="78:17345" data-name="How I worked">
          <div className="h-px relative shrink-0 w-full" data-node-id="78:17346" data-name="Editorial rule">
            <div className="absolute bg-[var(--border,#392e43)] inset-0" data-node-id="I78:17346;9733:6205" data-name="Line" />
          </div>
          <div className="[word-break:break-word] content-stretch flex flex-col gap-[12px] items-start not-italic overflow-clip relative shrink-0 w-full" data-node-id="78:17347" data-name="Partnership heading">
            <p className="font-medium leading-[28px] relative shrink-0 text-[14px] text-[color:var(--primary,#c8afff)] w-full" data-node-id="78:17348">
              HOW I WORKED
            </p>
            <h3 className="font-semibold leading-[43px] relative shrink-0 text-[36px] text-[color:var(--foreground,#f4f3f8)] tracking-[-2px] w-full" data-node-id="78:17349">
              Cross-functional partnership
            </h3>
          </div>
          <div className="content-stretch flex gap-[24px] items-center overflow-clip py-[24px] relative shrink-0 w-full" data-node-id="78:17350" data-name="Partnership relationship">
            <div className="border-[var(--primary,#c8afff)] border-l-2 border-solid content-stretch flex flex-col items-start overflow-clip pl-[24px] py-[8px] relative shrink-0 w-[342px]" data-node-id="78:17351" data-name="My role">
              <p className="[word-break:break-word] font-medium leading-[32.2px] not-italic relative shrink-0 text-[23px] text-[color:var(--foreground,#f4f3f8)] w-full" data-node-id="78:17353">
                Principal Product Designer
              </p>
            </div>
            <p className="[word-break:break-word] font-normal leading-[normal] not-italic relative shrink-0 text-[28px] text-[color:var(--primary,#c8afff)] whitespace-nowrap" data-node-id="78:17354">
              ↔
            </p>
            <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-w-px overflow-clip relative" data-node-id="78:17355" data-name="Partner roles">
              <div className="content-start flex flex-wrap gap-[8px] items-start overflow-clip relative shrink-0 w-full" data-node-id="78:17356" data-name="Role chips">
                <div className="border border-[var(--border,#392e43)] border-solid content-stretch flex items-center justify-center px-[var(--portfolio-portfolio-spacing-11,11px)] py-[var(--sf-spacing-6,6px)] relative rounded-[var(--portfolio-portfolio-radius-100,100px)] shrink-0" data-node-id="78:17357" data-name="Role chip">
                  <p className="[word-break:break-word] font-normal leading-[21px] not-italic relative shrink-0 text-[14px] text-[color:var(--muted-foreground,#b5b1c0)] whitespace-nowrap" data-node-id="I78:17357;45:105">
                    Product
                  </p>
                </div>
                <div className="border border-[var(--border,#392e43)] border-solid content-stretch flex items-center justify-center px-[var(--portfolio-portfolio-spacing-11,11px)] py-[var(--sf-spacing-6,6px)] relative rounded-[var(--portfolio-portfolio-radius-100,100px)] shrink-0" data-node-id="78:17358" data-name="Role chip">
                  <p className="[word-break:break-word] font-normal leading-[21px] not-italic relative shrink-0 text-[14px] text-[color:var(--muted-foreground,#b5b1c0)] whitespace-nowrap" data-node-id="I78:17358;45:105">
                    Engineering
                  </p>
                </div>
                <div className="border border-[var(--border,#392e43)] border-solid content-stretch flex items-center justify-center px-[var(--portfolio-portfolio-spacing-11,11px)] py-[var(--sf-spacing-6,6px)] relative rounded-[var(--portfolio-portfolio-radius-100,100px)] shrink-0" data-node-id="78:17359" data-name="Role chip">
                  <p className="[word-break:break-word] font-normal leading-[21px] not-italic relative shrink-0 text-[14px] text-[color:var(--muted-foreground,#b5b1c0)] whitespace-nowrap" data-node-id="I78:17359;45:105">
                    Data / AI
                  </p>
                </div>
                <div className="border border-[var(--border,#392e43)] border-solid content-stretch flex items-center justify-center px-[var(--portfolio-portfolio-spacing-11,11px)] py-[var(--sf-spacing-6,6px)] relative rounded-[var(--portfolio-portfolio-radius-100,100px)] shrink-0" data-node-id="78:17360" data-name="Role chip">
                  <p className="[word-break:break-word] font-normal leading-[21px] not-italic relative shrink-0 text-[14px] text-[color:var(--muted-foreground,#b5b1c0)] whitespace-nowrap" data-node-id="I78:17360;45:105">
                    Content / Editorial
                  </p>
                </div>
                <div className="border border-[var(--border,#392e43)] border-solid content-stretch flex items-center justify-center px-[var(--portfolio-portfolio-spacing-11,11px)] py-[var(--sf-spacing-6,6px)] relative rounded-[var(--portfolio-portfolio-radius-100,100px)] shrink-0" data-node-id="78:17361" data-name="Role chip">
                  <p className="[word-break:break-word] font-normal leading-[21px] not-italic relative shrink-0 text-[14px] text-[color:var(--muted-foreground,#b5b1c0)] whitespace-nowrap" data-node-id="I78:17361;45:105">
                    Business stakeholders
                  </p>
                </div>
              </div>
            </div>
          </div>
          <p className="[word-break:break-word] font-normal leading-[28px] not-italic relative shrink-0 text-[16px] text-[color:var(--muted-foreground,#b5b1c0)] w-full" data-node-id="78:17362">
            I worked directly with Engineering throughout design and implementation, using prototypes, Figma, Storybook, repository workflows, MCP-based handoff, and visual QA to reduce the gap between design intent and the built product.
          </p>
        </div>
        <div className="content-stretch flex flex-col gap-[24px] items-start overflow-clip relative shrink-0 w-full" data-node-id="78:17370" data-name="Design to build workflow">
          <p className="[word-break:break-word] font-medium leading-[28px] not-italic relative shrink-0 text-[14px] text-[color:var(--primary,#c8afff)] w-full" data-node-id="78:17371">
            DESIGN → BUILD WORKFLOW
          </p>
          <div className="content-stretch flex gap-[12px] items-center overflow-clip relative shrink-0 w-full" data-node-id="78:17372" data-name="End-to-end process">
            <div className="content-stretch flex flex-[1_0_0] gap-[12px] items-center min-w-px overflow-clip relative" data-node-id="78:17373" data-name="Process relationship">
              <div className="bg-[var(--background,#0b0b0e)] border-[var(--border,#392e43)] border-solid border-t content-stretch flex flex-[1_0_0] flex-col items-start justify-center min-h-[96px] min-w-px overflow-clip px-[8px] py-[16px] relative rounded-[var(--sf-radius-8,8px)]" data-node-id="78:17374" data-name="Process stage">
                <p className="[word-break:break-word] font-normal leading-[23.1px] not-italic relative shrink-0 text-[14px] text-[color:var(--muted-foreground,#b5b1c0)] text-center w-full" data-node-id="78:17375">
                  Discovery
                </p>
              </div>
              <p className="[word-break:break-word] font-normal leading-[normal] not-italic relative shrink-0 text-[18px] text-[color:var(--primary,#c8afff)] whitespace-nowrap" data-node-id="78:17376">
                →
              </p>
            </div>
            <div className="content-stretch flex flex-[1_0_0] gap-[12px] items-center min-w-px overflow-clip relative" data-node-id="78:17377" data-name="Process relationship">
              <div className="bg-[var(--background,#0b0b0e)] border-[var(--border,#392e43)] border-solid border-t content-stretch flex flex-[1_0_0] flex-col items-start justify-center min-h-[96px] min-w-px overflow-clip px-[8px] py-[16px] relative rounded-[var(--sf-radius-8,8px)]" data-node-id="78:17378" data-name="Process stage">
                <p className="[word-break:break-word] font-normal leading-[23.1px] not-italic relative shrink-0 text-[14px] text-[color:var(--muted-foreground,#b5b1c0)] text-center w-full" data-node-id="78:17379">
                  Product Direction
                </p>
              </div>
              <p className="[word-break:break-word] font-normal leading-[normal] not-italic relative shrink-0 text-[18px] text-[color:var(--primary,#c8afff)] whitespace-nowrap" data-node-id="78:17380">
                →
              </p>
            </div>
            <div className="content-stretch flex flex-[1_0_0] gap-[12px] items-center min-w-px overflow-clip relative" data-node-id="78:17381" data-name="Process relationship">
              <div className="bg-[var(--background,#0b0b0e)] border-[var(--border,#392e43)] border-solid border-t content-stretch flex flex-[1_0_0] flex-col items-start justify-center min-h-[96px] min-w-px overflow-clip px-[8px] py-[16px] relative rounded-[var(--sf-radius-8,8px)]" data-node-id="78:17382" data-name="Process stage">
                <p className="[word-break:break-word] font-normal leading-[23.1px] not-italic relative shrink-0 text-[14px] text-[color:var(--muted-foreground,#b5b1c0)] text-center w-full" data-node-id="78:17383">
                  UX Architecture
                </p>
              </div>
              <p className="[word-break:break-word] font-normal leading-[normal] not-italic relative shrink-0 text-[18px] text-[color:var(--primary,#c8afff)] whitespace-nowrap" data-node-id="78:17384">
                →
              </p>
            </div>
            <div className="content-stretch flex flex-[1_0_0] gap-[12px] items-center min-w-px overflow-clip relative" data-node-id="78:17385" data-name="Process relationship">
              <div className="bg-[var(--background,#0b0b0e)] border-[var(--border,#392e43)] border-solid border-t content-stretch flex flex-[1_0_0] flex-col items-start justify-center min-h-[96px] min-w-px overflow-clip px-[8px] py-[16px] relative rounded-[var(--sf-radius-8,8px)]" data-node-id="78:17386" data-name="Process stage">
                <p className="[word-break:break-word] font-normal leading-[23.1px] not-italic relative shrink-0 text-[14px] text-[color:var(--muted-foreground,#b5b1c0)] text-center w-full" data-node-id="78:17387">
                  High-Fidelity Prototype
                </p>
              </div>
              <p className="[word-break:break-word] font-normal leading-[normal] not-italic relative shrink-0 text-[18px] text-[color:var(--primary,#c8afff)] whitespace-nowrap" data-node-id="78:17388">
                →
              </p>
            </div>
            <div className="content-stretch flex flex-[1_0_0] gap-[12px] items-center min-w-px overflow-clip relative" data-node-id="78:17389" data-name="Process relationship">
              <div className="bg-[var(--background,#0b0b0e)] border-[var(--border,#392e43)] border-solid border-t content-stretch flex flex-[1_0_0] flex-col items-start justify-center min-h-[96px] min-w-px overflow-clip px-[8px] py-[16px] relative rounded-[var(--sf-radius-8,8px)]" data-node-id="78:17390" data-name="Process stage">
                <p className="[word-break:break-word] font-normal leading-[23.1px] not-italic relative shrink-0 text-[14px] text-[color:var(--muted-foreground,#b5b1c0)] text-center w-full" data-node-id="78:17391">
                  Design System
                </p>
              </div>
              <p className="[word-break:break-word] font-normal leading-[normal] not-italic relative shrink-0 text-[18px] text-[color:var(--primary,#c8afff)] whitespace-nowrap" data-node-id="78:17392">
                →
              </p>
            </div>
            <div className="content-stretch flex flex-[1_0_0] gap-[12px] items-center min-w-px overflow-clip relative" data-node-id="78:17393" data-name="Process relationship">
              <div className="bg-[var(--secondary,#222029)] border-[var(--primary,#c8afff)] border-solid border-t content-stretch flex flex-[1_0_0] flex-col items-start justify-center min-h-[96px] min-w-px overflow-clip px-[8px] py-[16px] relative rounded-[var(--sf-radius-8,8px)]" data-node-id="78:17394" data-name="Process stage">
                <p className="[word-break:break-word] font-normal leading-[23.1px] not-italic relative shrink-0 text-[14px] text-[color:var(--foreground,#f4f3f8)] text-center w-full" data-node-id="78:17395">
                  Engineering Handoff
                </p>
              </div>
              <p className="[word-break:break-word] font-normal leading-[normal] not-italic relative shrink-0 text-[18px] text-[color:var(--primary,#c8afff)] whitespace-nowrap" data-node-id="78:17396">
                →
              </p>
            </div>
            <div className="content-stretch flex flex-[1_0_0] gap-[12px] items-center min-w-px overflow-clip relative" data-node-id="78:17397" data-name="Process relationship">
              <div className="bg-[var(--secondary,#222029)] border-[var(--primary,#c8afff)] border-solid border-t content-stretch flex flex-[1_0_0] flex-col items-start justify-center min-h-[96px] min-w-px overflow-clip px-[8px] py-[16px] relative rounded-[var(--sf-radius-8,8px)]" data-node-id="78:17398" data-name="Process stage">
                <p className="[word-break:break-word] font-normal leading-[23.1px] not-italic relative shrink-0 text-[14px] text-[color:var(--foreground,#f4f3f8)] text-center w-full" data-node-id="78:17399">
                  Implementation QA
                </p>
              </div>
              <p className="[word-break:break-word] font-normal leading-[normal] not-italic relative shrink-0 text-[18px] text-[color:var(--primary,#c8afff)] whitespace-nowrap" data-node-id="78:17400">
                →
              </p>
            </div>
            <div className="content-stretch flex flex-[1_0_0] items-center min-w-px overflow-clip relative" data-node-id="78:17401" data-name="Process relationship">
              <div className="bg-[var(--secondary,#222029)] border-[var(--primary,#c8afff)] border-solid border-t content-stretch flex flex-[1_0_0] flex-col items-start justify-center min-h-[96px] min-w-px overflow-clip px-[8px] py-[16px] relative rounded-[var(--sf-radius-8,8px)]" data-node-id="78:17402" data-name="Process stage">
                <p className="[word-break:break-word] font-normal leading-[23.1px] not-italic relative shrink-0 text-[14px] text-[color:var(--foreground,#f4f3f8)] text-center w-full" data-node-id="78:17403">
                  Iteration
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <UpgatherProductDirection/>
      <Dialog open={context!==null} onOpenChange={open=>{if(!open)setContext(null);}}><DialogContent className="proof-evidence-dialog upgather-context">
        <DialogTitle>Event lifecycle workflow analysis</DialogTitle>
        <DialogDescription>Existing workflow artifacts made the connected steps and dependencies across the event-management lifecycle visible. They informed where work branched, repeated, or required coordination across tools and roles.</DialogDescription>
        <div className="upgather-context-art"><img src={imgImage2} alt="Event lifecycle workflow analysis"/><img src={imgImage3} alt="Event operations and dependencies"/></div>
      </DialogContent></Dialog>
    </div>
  );
}
