import type {GlassSceneController} from '../../vendor/glass-hq/src/dom/index';

// Advance the DOM spring inside Glass-HQ's own read phase, before it measures
// lenses. Independent RAF loops otherwise draw the rim at the previous position.
let scene:GlassSceneController|undefined;
const pending=new Set<{attach:()=>void;cancel:()=>void}>();
export function connectGlassAnimation(next:GlassSceneController){
 scene=next;for(const animation of pending)animation.attach();
 return ()=>{if(scene!==next)return;scene=undefined;for(const animation of pending)animation.attach();};
}
export function animateWithGlass(frame:(now:number)=>boolean){
 let raf=0,release:(()=>void)|undefined,stopped=false;
 const stopDriver=()=>{cancelAnimationFrame(raf);raf=0;release?.();release=undefined;};
 const cancel=()=>{if(stopped)return;stopped=true;stopDriver();pending.delete(entry);};
 const tick=(now:number,quiet=false)=>{if(stopped)return false;if(quiet)return true;const active=frame(now);if(!active)queueMicrotask(cancel);return active;};
 const entry={cancel,attach(){stopDriver();if(scene)release=scene.addAnimator({frame:tick,dispose(){}});else{const fallback=(now:number)=>{raf=0;if(tick(now))raf=requestAnimationFrame(fallback);};raf=requestAnimationFrame(fallback);}}};
 pending.add(entry);entry.attach();return cancel;
}
