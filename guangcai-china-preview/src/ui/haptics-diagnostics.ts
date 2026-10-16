/** Opt-in, local-only event evidence for real-device haptic troubleshooting. */
import {haptics} from './haptics';
export function createHapticsDiagnostics(){
 if(!new URLSearchParams(location.search).has('haptics-debug'))return ()=>{};
 const panel=document.createElement('details'),summary=document.createElement('summary'),output=document.createElement('pre'),copy=document.createElement('button');
 panel.style.cssText='position:fixed;top:85px;right:10px;z-index:100;width:min(310px,90vw);max-height:45vh;overflow:auto;padding:9px;border-radius:10px;background:#fffffff2;color:#222;border:1px solid #bbb;font:12px/1.5 system-ui;';
 summary.textContent='触感诊断';output.style.cssText='white-space:pre-wrap;overflow-wrap:anywhere;margin:8px 0;font:11px/1.5 monospace;';copy.textContent='复制诊断';copy.type='button';copy.style.cssText='padding:6px 10px;font-size:12px;';
 panel.append(summary,output,copy);document.body.append(panel);
 const snapshot=()=>({version:'5.4.1',userAgent:navigator.userAgent,visibility:document.visibilityState,reducedMotion:matchMedia('(prefers-reduced-motion: reduce)').matches,...haptics.debug(),note:'计数只代表原生触摸和开关方向更新，实际震感请人工确认。'});
 const update=()=>{if(panel.open)output.textContent=JSON.stringify(snapshot(),null,2);};
 panel.addEventListener('toggle',update);copy.onclick=async()=>{try{await navigator.clipboard.writeText(JSON.stringify(snapshot(),null,2));copy.textContent='已复制';}catch{copy.textContent='请选择上方文字复制';}};
 const timer=window.setInterval(update,500);
 return ()=>{clearInterval(timer);panel.remove();};
}
