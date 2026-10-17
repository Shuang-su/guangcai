/** Active foreground cadence only; idle gaps and initial preparation are excluded. */
export class GlassFramePolicy {
 private samples:number[]=[];private start=0;private previous=0;private slow=0;reason='';
 reset(){this.samples=[];this.start=this.previous=0;this.slow=0;}
 sample(now:number,active:boolean){
  if(this.reason)return this.reason;
  if(!active){this.reset();return '';}
  const elapsed=this.previous?now-this.previous:0;this.previous=now;
  if(!this.start)this.start=now;
  if(elapsed>0)this.samples.push(elapsed);
  if(now-this.start<2000)return '';
  const sorted=this.samples.sort((a,b)=>a-b),p95=sorted[Math.max(0,Math.ceil(sorted.length*.95)-1)]??0;
  this.slow=p95>1000/30+.5?this.slow+1:0;this.samples=[];this.start=now;
  if(this.slow>=2)this.reason='sustained-frame-budget';return this.reason;
 }
}
