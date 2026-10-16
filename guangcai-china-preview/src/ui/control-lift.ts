/** Fit independently lifted controls without shrinking the canvas or their input space. */
export function prepareControlLift(control:HTMLElement){
 const row=control.closest<HTMLElement>('.color-pad-row'),panel=control.closest('aside');if(!panel)return;
 const bounds=panel.getBoundingClientRect(),available=panel.clientWidth-24;
 const pad=row?.querySelector<HTMLElement>('.xy-pad'),slider=row?.querySelector<HTMLElement>('.lightness-control');
 const liftingSlider=control.classList.contains('lightness-control');
 const width=control.clientWidth,height=control.clientHeight;
 let padScale=pad&&!liftingSlider?Math.min(1.24,(available-54)/pad.clientWidth):1;
 let sliderScale=slider&&liftingSlider?Math.min(1.24,(available-pad!.clientWidth-10)/slider.clientWidth):1;
 const layout=(e:HTMLElement)=>{
  const r=e.getBoundingClientRect(),m=new DOMMatrixReadOnly(getComputedStyle(e).transform);
  return {left:r.left-m.e+(r.width-e.clientWidth)/2,top:r.top-m.f+(r.height-e.clientHeight)/2};
 };
 const base=layout(control),center=base.top+height/2;
 // Never scroll or move controls vertically on activation. Limit zoom only if clipped.
 const verticalLimit=Math.max(1,2*Math.min(center-bounds.top-10,bounds.bottom-10-center)/height);
 padScale=Math.min(padScale,verticalLimit);sliderScale=Math.min(sliderScale,verticalLimit);
 const scale=Math.max(1,Math.min(1.24,available/width,verticalLimit));
 if(row&&pad&&slider){
  const total=pad.clientWidth*padScale+10+slider.clientWidth*sliderScale,r=row.getBoundingClientRect();
  const left=Math.max(bounds.left+12,Math.min(bounds.right-12-total,r.left+(r.width-total)/2));
  row.style.setProperty('--pad-lift-x',`${left+(padScale-1)*pad.clientWidth/2-layout(pad).left}px`);
  row.style.setProperty('--slider-lift-x',`${left+pad.clientWidth*padScale+10+(sliderScale-1)*slider.clientWidth/2-layout(slider).left}px`);
  row.style.setProperty('--pad-lift-scale',String(padScale));row.style.setProperty('--slider-lift-scale',String(sliderScale));
  
 }else{
  control.style.setProperty('--xy-expand-scale',String(scale));control.style.setProperty('--xy-expand-y','0px');
  control.style.setProperty('--xy-expand-x','0px');
 }
}
