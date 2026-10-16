import {Mesh,PlaneGeometry,ShaderMaterial,Vector2,TextureLoader,SRGBColorSpace,CustomBlending,SrcAlphaFactor,OneMinusSrcAlphaFactor,OneFactor} from 'three';
/** Opaque GPU backdrop: glass can refract it, unlike an HTML/CSS background. */
export function glassAtmosphere(){
 const landscape=new TextureLoader().load(`${import.meta.env.BASE_URL}media/v2/home-portrait.webp`);landscape.colorSpace=SRGBColorSpace;
 const material=new ShaderMaterial({depthWrite:false,depthTest:false,blending:CustomBlending,blendSrc:SrcAlphaFactor,blendDst:OneMinusSrcAlphaFactor,blendSrcAlpha:OneFactor,blendDstAlpha:OneMinusSrcAlphaFactor,uniforms:{fade:{value:1},time:{value:0},shift:{value:0},size:{value:new Vector2(1,1)},landscape:{value:landscape}},
 vertexShader:'varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}',
 fragmentShader:`varying vec2 vUv;uniform float time,shift,fade;uniform vec2 size;uniform sampler2D landscape;
 float cloud(vec2 p,vec2 c,vec2 s){vec2 a=(p-c)/s;return exp(-dot(a,a)*2.);}
 void main(){
  vec2 p=vUv;float t=time*.1;
  vec3 col=vec3(.87,.94,.94);
  col=mix(col,vec3(.48,.78,.82),cloud(p,vec2(-.08+shift*.025,.47),vec2(.55,.7))*.62);
  col=mix(col,vec3(.61,.69,.88),cloud(p,vec2(1.1,.8+sin(t)*.04),vec2(.68,.7))*.58);
  col=mix(col,vec3(.94,.72,.66),cloud(p,vec2(.15,.98),vec2(.6,.3))*.40);
  col=mix(col,vec3(.99,.98,.91),cloud(p,vec2(.5,.24),vec2(.4,.4))*.75);
  // Distant mountains dissolve into the refractive water atmosphere, never a whole poster.
  vec2 suv=vec2(clamp(p.x+shift*.012,0.,1.),1.-p.y);
  vec3 mountain=texture2D(landscape,suv).rgb;
  col=mix(col,mountain,smoothstep(.47,1.,p.y)*.26);
  float activity=smoothstep(.36,.7,p.y);
  for(int i=0;i<4;i++){
   float k=float(i);float q=p.y+.055*sin(p.x*5.8+t+k*.5+shift*.08)+.035*sin(p.x*10.-t*.7+k)-(.54+k*.145);
   float caustic=exp(-abs(q)*90.);col+=vec3(.045,.065,.072)*caustic*activity;
   col=mix(col,vec3(.80,.75,.57),exp(-abs(q-.01)*420.)*.18*activity);
  }
  gl_FragColor=vec4(col,fade);
  #include <colorspace_fragment>
 }`});
 material.toneMapped=false;
 const mesh=new Mesh(new PlaneGeometry(1,1),material);mesh.position.z=-450;mesh.renderOrder=-100;mesh.frustumCulled=false;
 let opacity=1;mesh.onBeforeRender=(renderer)=>{material.uniforms.fade.value=renderer.getRenderTarget()?1:opacity;};
 return {mesh,update:(t:number,w:number,h:number,shift:number,alpha=1)=>{opacity=alpha;mesh.scale.set(w,h,1);mesh.position.set(w/2,h/2,-450);material.uniforms.time.value=t/1000;material.uniforms.shift.value=shift;material.uniforms.size.value.set(w,h);},dispose:()=>{mesh.geometry.dispose();material.dispose();landscape.dispose();}};
}
