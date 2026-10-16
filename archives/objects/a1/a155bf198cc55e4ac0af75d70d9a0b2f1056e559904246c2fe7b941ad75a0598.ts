import {
  Scene, OrthographicCamera, BufferGeometry, Float32BufferAttribute, Mesh,
  MeshPhysicalMaterial, DirectionalLight, HemisphereLight, Color, Vector3,
  CatmullRomCurve3, Texture, Points, ShaderMaterial, AdditiveBlending, PlaneGeometry, DoubleSide, Plane,
} from 'three';
import { LiuliMaterials } from './liuli-material';
import { GlassCards } from './glass-cards';
import { glassAtmosphere } from './glass-atmosphere';
import {IntroLight} from './intro-light';
import {ribbonDesigns, RibbonMaterials} from './ribbon-design';

/** Decorative real geometry. DOM remains responsible for all card hit targets. */
export class RibbonStage {
  readonly scene = new Scene();
  readonly camera = new OrthographicCamera(0, 1, 0, 1, .1, 3000);
  private strips: Mesh<BufferGeometry, MeshPhysicalMaterial>[] = [];
  private particles: Points;
  private atmosphere = glassAtmosphere();
  private introLight=new IntroLight();
  private rim={x:0,y:0,r:80};
  setRim(x:number,y:number,r:number){this.rim={x,y,r};}
  private chapterPosition=0;
  private backdropOpacity=0;
  get hasBackdrop(){return this.mode==='cards'||this.backdropOpacity>.006;}
  private pbr = new LiuliMaterials();
  private ribbonPbr = new RibbonMaterials();
  readonly cards = new GlassCards(this.scene, this.pbr);
  private veils: Mesh<PlaneGeometry, MeshPhysicalMaterial>[] = [];
  private wipe: {start:number; switched:boolean; swap:()=>void; resolve:()=>void; direction:number} | null = null;
  private wipePhase=0;
  transition(swap:()=>void,direction=1):Promise<void>{
    if(this.wipe)return Promise.resolve();
    if(this.reduced){swap();return Promise.resolve();}
    return new Promise(resolve=>{this.wipe={start:performance.now(),switched:false,swap,resolve,direction};});
  }
  get transitioning(){return !!this.wipe;}
  cancelTransition(){if(this.wipe){const w=this.wipe;this.wipe=null;w.resolve();}this.veils.forEach(v=>v.visible=false);}

  private pulse = -10000;
  private selection = 0;
  private chapter = 0;
  private mode: 'off' | 'cards' | 'intro' | 'finish' = 'off';
  private progress = 0;
  private width = 1;
  private height = 1;
  private host: HTMLElement | null = null;
  private lastShape = '';
  private samples = 160;
  private cross = 24;
  private reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  constructor(environment: Texture | null) {
    this.camera.position.z = 1000;
    this.scene.scale.y=-1;
    this.scene.environment = environment;
    this.scene.environmentIntensity = 1.;this.scene.environmentRotation.set(0,.65,0);
    this.scene.add(this.atmosphere.mesh,this.introLight.root);
    this.scene.add(new HemisphereLight('#ffffff', '#355583', .85));
    const key = new DirectionalLight('#ffffff', 1.5);
    key.position.set(-400, -500, 800); this.scene.add(key);
    const rim = new DirectionalLight('#fff4df', 1.1);
    rim.position.set(600, 500, 300); this.scene.add(rim);
    ribbonDesigns.forEach((design, k) => {
      const geometry = new BufferGeometry();
      geometry.setAttribute('position', new Float32BufferAttribute(new Float32Array((this.samples + 1) * this.cross * 3), 3));
      const indices: number[] = [];
      for (let i = 0; i < this.samples; i++) for (let j = 0; j < this.cross; j++) {
        const a = i * this.cross + j, b = i * this.cross + (j + 1) % this.cross;
        indices.push(a, b, a + this.cross, b, b + this.cross, a + this.cross);
      }
      geometry.setIndex(indices);
      const uv:number[]=[];for(let i=0;i<=this.samples;i++)for(let j=0;j<this.cross;j++)uv.push(i/this.samples,.5+.5*Math.cos(j/this.cross*Math.PI*2));
      geometry.setAttribute('uv',new Float32BufferAttribute(uv,2));
      geometry.setAttribute('color',new Float32BufferAttribute(new Float32Array((this.samples+1)*this.cross*3),3));
      const material = this.ribbonPbr.glass(design.palette);
      material.vertexColors=true;
      const mesh = new Mesh(geometry, material);
      mesh.renderOrder = k; mesh.frustumCulled = false;
      this.strips.push(mesh); this.scene.add(mesh);
    });
    ['cyan','blue','coral','amber','mint'].forEach((palette,k)=>{
      const mat=this.ribbonPbr.glass(palette,true);mat.side=DoubleSide;mat.clippingPlanes=[new Plane(),new Plane()];mat.transparent=true;
      mat.userData.fadeBounds={value:[0,1]};
      mat.onBeforeCompile=shader=>{
        shader.uniforms.veilBounds=mat.userData.fadeBounds;
        shader.vertexShader='varying float screenY;\n'+shader.vertexShader.replace('#include <begin_vertex>','#include <begin_vertex>\nscreenY=position.y;');
        shader.fragmentShader='varying float screenY;uniform vec2 veilBounds;\n'+shader.fragmentShader.replace('#include <color_fragment>','#include <color_fragment>\ndiffuseColor.a *= smoothstep(veilBounds.x,veilBounds.x+22.,screenY)*(1.-smoothstep(veilBounds.y-22.,veilBounds.y,screenY));');
      };
      const mesh=new Mesh(new PlaneGeometry(1,1,64,16),mat);mesh.frustumCulled=false;mesh.visible=false;mesh.renderOrder=30+k;
      this.scene.add(mesh);this.veils.push(mesh);
    });
    const positions = new Float32Array(180 * 3);
    const seeds = new Float32Array(180);
    for (let i = 0; i < 180; i++) {
      const n = (i * .61803398875) % 1;
      positions.set([n, (i * .41421356) % 1, (i * .73205) % 1], i * 3);
      seeds[i] = n;
    }
    const geo = new BufferGeometry();
    geo.setAttribute('position', new Float32BufferAttribute(positions, 3));
    geo.setAttribute('seed', new Float32BufferAttribute(seeds, 1));
    const mat = new ShaderMaterial({
      transparent: true, depthWrite: false, blending: AdditiveBlending,
      uniforms: { size: { value: [1, 1] }, time: { value: 0 }, progress: { value: 0 }, alpha: { value: 0 } },
      vertexShader: `attribute float seed; uniform vec2 size; uniform float time,progress; varying float a;
      void main(){vec3 p=position; p.x=(p.x-.5)*size.x*1.6+size.x*.5; p.y=mod(p.y-progress*.35+time*.006,1.)*size.y;
      p.z=(p.z-.5)*400.; gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.); gl_PointSize=1.5+seed*4.; a=.25+seed*.75;}`,
      fragmentShader: `varying float a; uniform float alpha; void main(){float r=length(gl_PointCoord-.5)*2.; if(r>1.)discard; gl_FragColor=vec4(1.,.78,.38,(1.-r)*a*alpha);}`,
    });
    this.particles = new Points(geo, mat); this.particles.frustumCulled = false; this.scene.add(this.particles);
  }
  configure(mode: typeof this.mode, host: HTMLElement | null = null) {
    if(mode!=='cards'){this.cancelTransition();this.cards.hide();}
    this.mode=mode;this.host=host;this.cards.bind(host);this.lastShape='';
  }
  setProgress(p: number) { this.progress = p; }
  setChapter(chapter: number) { this.chapter = chapter; this.pulse = performance.now(); }
  select(index: number) { this.selection = index; this.pulse = performance.now(); }
  get visible() { return this.mode !== 'off'||this.backdropOpacity>.006; }
  update(time: number, width: number, height: number) {
    this.width = width; this.height = height;
    this.camera.right = width; this.camera.bottom = -height; this.camera.updateProjectionMatrix();
    const rect = this.host?.getBoundingClientRect();
    const x = rect?.left ?? 0, y = rect?.top ?? 0, w = rect?.width ?? width, h = rect?.height ?? height;
    if(this.mode==='cards')this.cards.update(time);else this.cards.hide();
    this.chapterPosition+=(this.chapter-this.chapterPosition)*.055;
    this.backdropOpacity=this.reduced?(this.mode==='cards'?1:0):this.backdropOpacity+((this.mode==='cards'?1:0)-this.backdropOpacity)*.13;
    this.atmosphere.mesh.visible=this.hasBackdrop;
    this.atmosphere.update(this.reduced?0:time,width,height,this.chapterPosition,this.backdropOpacity);
    if(this.wipe){
      const wipe=this.wipe,q=Math.min(1,(time-wipe.start)/1500);this.wipePhase=q;
      // Each glass leaf crosses left -> right at its own depth and delay.
      // Swap in the overlap of all five leaves; reverse navigation retains the same direction.
      if(q>=.50&&!wipe.switched){wipe.switched=true;wipe.swap();}
      this.veils.forEach((mesh,k)=>{
        mesh.visible=true;mesh.material.userData.fadeBounds.value=[y-24,y+h+24];mesh.material.clippingPlanes![0].set(new Vector3(0,-1,0),-(y-24));mesh.material.clippingPlanes![1].set(new Vector3(0,1,0),y+h+24);
        const attr=mesh.geometry.getAttribute('position'),uv=mesh.geometry.getAttribute('uv');
        const travel=q<.40?-1+Math.pow(q/.40,.8):q<.60?0:Math.pow((q-.60)/.40,1.3);
        const offset=travel*w*2.35+(k-2)*w*.055*Math.abs(travel);
        for(let i=0;i<attr.count;i++){
          const u=uv.getX(i),v=uv.getY(i);
          const taper=Math.pow(Math.sin(Math.PI*u),.30);
          attr.setXYZ(i,x+w*.5+(u-.5)*w*2.15+offset,
            y+h*(-.12+k*.30)+(v-.5)*h*.68*taper+Math.sin(u*5+q*3+k*.6)*h*.10,
            210+k*18+Math.sin(u*6+v*2+k)*38);
        }
        attr.needsUpdate=true;mesh.geometry.computeVertexNormals();
      });
      // Hide old artwork and text only while the whole grid is covered.
      this.host?.style.setProperty('--covered',q>.36&&q<.65?'0':'1');
      if(q>=1){this.host?.style.removeProperty('--covered');this.wipe=null;this.veils.forEach(v=>v.visible=false);wipe.resolve();}
    }
    const phase = this.reduced ? 0 : time * .00023;
    const intro = this.mode === 'intro';
    const p = this.progress;
    this.introLight.root.visible=intro;
    if(intro)this.introLight.update(p,width,height,this.rim);
    const shape = `${Math.round(time / (this.reduced ? 100000 : 33))}/${x}/${y}/${w}/${h}/${p}/${this.chapter}/${this.mode}`;
    if (shape !== this.lastShape) {
      this.lastShape = shape;
      this.strips.forEach((mesh, k) => {
        let points: Vector3[];
        if (intro || this.mode === 'finish') {
          const travel = intro ? p : .75;
          points = Array.from({ length: 9 }, (_, i) => {
            const t = i / 8;
            return new Vector3(
              (t * 1.5 - .25) * width + Math.sin(t * 6 + travel * 6 + k * .15) * width * .18,
              height * (.67 - travel * .12) + Math.sin(t * 5.3 + travel * 8 + k * .14) * height * (.10 + travel * .13),
              Math.cos(t * 7 + travel * 4) * 110 + k * 5,
            );
          });
        } else {
          const design=ribbonDesigns[k];
          const shift=Math.sin(phase+this.chapterPosition*.7)*3;
          points=design.path.map(([u,v],i)=>new Vector3(
            x+u*w+Math.sin(phase*.7+k)*i*1.4,
            y+v*h+shift*Math.sin(i),
            design.depth+Math.sin(i*1.7+k*.8+phase*.25)*18));
        }
        const curve = new CatmullRomCurve3(points);
        const attr = mesh.geometry.getAttribute('position'), colors=mesh.geometry.getAttribute('color');
        const shade=new Color();
        const a = new Vector3(), tangent = new Vector3(), side = new Vector3();
        for (let i = 0; i <= this.samples; i++) {
          const t = i / this.samples;
          curve.getPoint(t, a); curve.getTangent(t, tangent);
          side.set(-tangent.y, tangent.x, 0).normalize();
          const design=ribbonDesigns[k];
          // A thin neck opens into an oval lobe. The end closes with an elliptical cap,
          // unlike a sine-width strip which pinches identically at both ends.
          const petal=Math.sqrt(Math.max(0,1-Math.pow((t-.77)/.23,2)));
          const envelope=design.leaf
            ? .15*Math.pow(Math.sin(Math.PI*t),.8)+.85*petal
            : Math.pow(Math.sin(Math.PI*t),.55);
          const broad=w*design.width*envelope;
          const twist=design.twist+Math.sin(t*5.8+k*.64+phase*.12)*.75;

          for (let j = 0; j < this.cross; j++) {
            const theta = j / this.cross * Math.PI * 2;
            const edge = Math.cos(theta) * broad;
            const z = Math.sin(theta)*Math.max(.42,broad*.025)+broad*.10*Math.pow(Math.sin(theta),2);
            shade.setRGB(1,1,1);
            shade.multiplyScalar(1-Math.pow(Math.abs(Math.cos(theta)),18)*.16);
            colors.setXYZ(i*this.cross+j,shade.r,shade.g,shade.b);
            attr.setXYZ(i * this.cross + j,
              a.x + side.x * edge * Math.cos(twist),
              a.y + side.y * edge * Math.cos(twist),
              a.z + edge * Math.sin(twist) + z);
          }
        }
        attr.needsUpdate = true; colors.needsUpdate=true; mesh.geometry.computeVertexNormals();
        const pulse = Math.max(0, 1 - (time - this.pulse) / 900);
        mesh.material.emissive.set(mesh.material.color);mesh.material.emissiveIntensity = intro?.10:0; mesh.material.envMapIntensity = 1.5 + pulse * (k === this.selection % 4 ? .4 : .04);
        mesh.visible=this.mode!=='off'&&!intro; mesh.material.opacity=1;
      });
    }
    const material = this.particles.material as ShaderMaterial;
    material.uniforms.size.value = [width, height];
    material.uniforms.time.value = this.reduced ? 0 : time / 1000;
    material.uniforms.progress.value = p;
    material.uniforms.alpha.value = intro ? Math.sin(Math.PI * Math.min(1, p + .07)) * .85 : 0;
  }
  debug() { return { mode: this.mode, sweepDirection:'left-to-right', atmosphere:true, silhouette:'open-petal-fan', pbrChannels:['baseColor','normal','roughness','metalness','clearcoat'], meshes: this.strips.length, chapter: this.chapter, progress: this.progress, cards:this.cards.debug(), transitioning:!!this.wipe, wipePhase:this.wipePhase }; }
  dispose() {
    this.cancelTransition();this.atmosphere.dispose();this.introLight.dispose();this.cards.dispose();this.pbr.dispose();this.ribbonPbr.dispose();this.veils.forEach(m=>{m.geometry.dispose();m.material.dispose();});
    this.strips.forEach(m => { m.geometry.dispose(); m.material.dispose(); });
    this.particles.geometry.dispose(); (this.particles.material as ShaderMaterial).dispose();
  }
}
