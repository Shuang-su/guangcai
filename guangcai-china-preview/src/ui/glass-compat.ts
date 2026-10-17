import {isWebKit} from '../../vendor/glass-hq/src/dom/engine';
import {attachInteraction,resolveMotion} from '../../vendor/glass-hq/src/dom/interaction';

/** Mobile WebKit can tile/cull an SVG-filtered WebGL backing independently
 * of the DOM controls. Keep that accelerated canvas entirely unfiltered.
 * Includes iPadOS desktop UA and other iOS browser brands using WebKit.
 */
export function needsIsolatedGlass(agent:Pick<Navigator,'userAgent'|'vendor'|'maxTouchPoints'>){
 return isWebKit(agent)&&(agent.maxTouchPoints>0||/iP(?:hone|ad|od)/.test(agent.userAgent));
}

/** Preserve upstream input springs without its full-screen SVG compositor.
 * Only run while a gesture or its settling springs need frames.
 */
export function attachNativeGlass(root:HTMLElement){
 const nodes=Array.from(root.querySelectorAll<HTMLElement>('.creator-tabs,.consumer-actions button,#view-trigger,.open-palette-editor,.slogan-grid button,.panel-handle,.city-card,.palette-swatch'));
 const saved=nodes.map(element=>({element,surface:element.classList.contains('lg-surface'),interactive:element.getAttribute('data-glass-interactive')}));
 const animators=nodes.map(element=>{
  element.setAttribute('data-glass-interactive','');
  element.classList.add('lg-surface');
  const fixed=element.matches('.panel-handle,.city-card,.palette-swatch');
  return attachInteraction(element,()=>fixed?'reduced':resolveMotion('full'));
 });
 let raf=0,disposed=false;
 const frame=(now:number)=>{raf=0;if(disposed)return;let active=false;for(const animator of animators)active=Boolean(animator.frame(now))||active;if(active)raf=requestAnimationFrame(frame);};
 const wake=()=>{if(!disposed&&!raf)raf=requestAnimationFrame(frame);};
 const events=['pointerdown','pointermove','pointerup','pointercancel','pointerover','pointerout','keydown','keyup','focusout'];
 for(const event of events)window.addEventListener(event,wake,{capture:true,passive:true});
 return ()=>{disposed=true;cancelAnimationFrame(raf);for(const event of events)window.removeEventListener(event,wake,true);for(const animator of animators)animator.dispose();for(const {element,surface,interactive} of saved){if(!surface)element.classList.remove('lg-surface');if(interactive===null)element.removeAttribute('data-glass-interactive');else element.setAttribute('data-glass-interactive',interactive);}};
}
