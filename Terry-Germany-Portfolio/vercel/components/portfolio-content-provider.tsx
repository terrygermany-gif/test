'use client';
import { createContext,useContext,useMemo,type ReactNode } from 'react';
import { defaultContent,contentProjects,type PortfolioContent } from '@/lib/portfolio-content';
const Content=createContext({content:defaultContent,canEdit:false,preview:false});
export function PortfolioContentProvider({content,canEdit=false,preview=false,children}:{content:PortfolioContent;canEdit?:boolean;preview?:boolean;children:ReactNode}){
 const compatibleContent=useMemo(()=>({...content,stateFarmReturning:content.stateFarmReturning??defaultContent.stateFarmReturning,stateFarmShopping:content.stateFarmShopping??defaultContent.stateFarmShopping,neurotrade:content.neurotrade??defaultContent.neurotrade,appleMusic:content.appleMusic??defaultContent.appleMusic,fintechIrmp:content.fintechIrmp??defaultContent.fintechIrmp,adaHealthcare:content.adaHealthcare??defaultContent.adaHealthcare,portfolioHeroes:{...defaultContent.portfolioHeroes,...content.portfolioHeroes}}),[content]);
 return <Content.Provider value={{content:compatibleContent,canEdit,preview}}>{children}</Content.Provider>;
}
export function usePortfolioContent(){const state=useContext(Content);return {...state,projects:contentProjects(state.content)};}
