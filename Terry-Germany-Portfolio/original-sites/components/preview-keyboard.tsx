'use client';
import { useEffect } from 'react';
export default function PreviewKeyboard(){useEffect(()=>{const close=(event:KeyboardEvent)=>{if(event.key==='Escape'&&window.parent!==window&&!document.querySelector('[role="dialog"]')){event.preventDefault();event.stopImmediatePropagation();window.parent.postMessage({portfolioPreview:'close'},window.location.origin);}};window.addEventListener('keydown',close,true);return()=>window.removeEventListener('keydown',close,true);},[]);return null;}
