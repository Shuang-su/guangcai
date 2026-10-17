export class AdaptiveResolution {
 private slow=0;private fast=0;
 constructor(public ratio:number,private maximum=2){}
 sample(milliseconds:number){
  if(milliseconds>100||milliseconds<1)return false;
  this.slow=milliseconds>34?this.slow+milliseconds:0;
  this.fast=milliseconds<19?this.fast+milliseconds:0;
  const before=this.ratio;
  if(this.slow>2000){this.ratio=Math.max(1,this.ratio-.25);this.slow=this.fast=0;}
  if(this.fast>5000){this.ratio=Math.min(this.maximum,this.ratio+.25);this.slow=this.fast=0;}
  return this.ratio!==before;
 }
}
