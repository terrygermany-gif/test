'use client';
import { createContext,useContext,type ReactNode } from 'react';
import { defaultContent,contentProjects,type PortfolioContent } from '@/lib/portfolio-content';
const Content=createContext({content:defaultContent,canEdit:false,preview:false});
export function PortfolioContentProvider({content,canEdit=false,preview=false,children}:{content:PortfolioContent;canEdit?:boolean;preview?:boolean;children:ReactNode}){return <Content.Provider value={{content,canEdit,preview}}>{children}</Content.Provider>;}
export function usePortfolioContent(){const state=useContext(Content);return {...state,projects:contentProjects(state.content)};}
