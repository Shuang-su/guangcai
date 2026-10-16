import {
  Scene, OrthographicCamera, BufferGeometry, Float32BufferAttribute, Mesh,
  MeshPhysicalMaterial, DirectionalLight, HemisphereLight, Color, Vector3,
  CatmullRomCurve3, Texture, Points, ShaderMaterial, AdditiveBlending, PlaneGeometry, DoubleSide, Plane,
} from 'three';
import { LiuliMaterials } from './liuli-material';
import { GlassCards } from './glass-cards';

/** Decorative real geometry. DOM remains responsible for all card hit targets. */
export class RibbonStage {
  readonly scene = new Scene();
  readonly camera = new OrthographicCamera(0, 1, 0, 1, .1, 3000);
  private strips: Mesh<BufferGeometry, MeshPhysicalMaterial>[] = [];
  private particles: Points;
  private pbr = new LiuliMaterials();
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
  private samples = 110;
  private cross = 8;
  private reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  constructor(environment: Texture | null) {
    this.camera.position.z = 1000;
    this.scene.environment = environment;
    this.scene.environmentIntensity = .6;
    this.scene.add(new HemisphereLight('#ffffff', '#355583', .85));
    const key = new DirectionalLight('#ffffff', 1.5);
    key.position.set(-400, -500, 800); this.scene.add(key);
    const rim = new DirectionalLight('#fff4df', 1.1);
    rim.position.set(600, 500, 300); this.scene.add(rim);
    ['#10b6c4', '#2759df', '#e74055', '#ffbb55'].forEach((color, k) => {
      const geometry = new BufferGeometry();
      geometry.setAttribute('position', new Float32BufferAttribute(new Float32Array((this.samples + 1) * this.cross * 3), 3));
      const indices: number[] = [];
      for (let i = 0; i < this.samples; i++) for (let j = 0; j < this.cross; j++) {
        const a = i * this.cross + j, b = i * this.cross + (j + 1) % this.cross;
        indices.push(a, b, a + this.cross, b, b + this.cross, a + this.cross);
      }
      geometry.setIndex(indices);
      const uv:number[]=[];for(let i=0;i<=this.samples;i++)for(let j=0;j<this.cross;j++)uv.push(i/this.samples,j/(this.cross-1));
      geometry.setAttribute('uv',new Float32BufferAttribute(uv,2));
      const material = this.pbr.glass(color, .42);
      material.thickness=12;material.attenuationDistance=65;material.clearcoat=.55;material.specularIntensity=.3;
      const mesh = new Mesh(geometry, material);
      mesh.renderOrder = k; mesh.frustumCulled = false;
      this.strips.push(mesh); this.scene.add(mesh);
    });
    ['#22bad2','#455fea','#e74c79'].forEach((color,k)=>{
      const mat=this.pbr.glass(color,.22);mat.side=DoubleSide;mat.thickness=22;mat.roughness=.35;mat.opacity=.995;mat.clearcoat=.55;mat.envMapIntensity=.14;mat.specularIntensity=.3;mat.emissive=new Color(color);mat.emissiveIntensity=.55;mat.clippingPlanes=[new Plane(),new Plane()];
      mat.userData.fadeBounds={value:[0,1]};
      mat.onBeforeCompile=shader=>{
        shader.uniforms.veilBounds=mat.userData.fadeBounds;
        shader.vertexShader='varying vec2 vVeilUV; varying float vVeilY;\n'+shader.vertexShader;
        shader.vertexShader=shader.vertexShader.replace('#include <uv_vertex>','#include <uv_vertex>\nvVeilUV=uv;vVeilY=position.y;');
        shader.fragmentShader='varying vec2 vVeilUV; varying float vVeilY; uniform vec2 veilBounds;\n'+shader.fragmentShader;
        shader.fragmentShader=shader.fragmentShader.replace('#include <color_fragment>','#include <color_fragment>\ndiffuseColor.a *= smoothstep(0.,.06,vVeilUV.y)*(1.-smoothstep(.94,1.,vVeilUV.y))*smoothstep(veilBounds.x,veilBounds.x+16.,vVeilY)*(1.-smoothstep(veilBounds.y-16.,veilBounds.y,vVeilY));');
      };
      const mesh=new Mesh(new PlaneGeometry(1,1,48,16),mat);mesh.frustumCulled=false;mesh.visible=false;mesh.renderOrder=30+k;
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
  get visible() { return this.mode !== 'off'; }
  update(time: number, width: number, height: number) {
    this.width = width; this.height = height;
    this.camera.right = width; this.camera.bottom = height; this.camera.updateProjectionMatrix();
    const rect = this.host?.getBoundingClientRect();
    const x = rect?.left ?? 0, y = rect?.top ?? 0, w = rect?.width ?? width, h = rect?.height ?? height;
    if(this.mode==='cards')this.cards.update(time);else this.cards.hide();
    if(this.wipe){
      const wipe=this.wipe,q=Math.min(1,(time-wipe.start)/1300);this.wipePhase=q;
      // Three-dimensional broad ribbons enter, fully cover, then lift away.
      // Swap is delayed until every card is behind the middle of the veil.
      if(q>=.49&&!wipe.switched){wipe.switched=true;wipe.swap();}
      this.veils.forEach((mesh,k)=>{
        mesh.visible=true;mesh.material.userData.fadeBounds.value=[y-22,y+h+18];mesh.material.clippingPlanes![0].set(new Vector3(0,1,0),-(y-22));mesh.material.clippingPlanes![1].set(new Vector3(0,-1,0),y+h+18);
        const attr=mesh.geometry.getAttribute('position'),uv=mesh.geometry.getAttribute('uv');
        const travel=q<.38?1-Math.pow(q/.38,2):q<.60?0:-Math.pow((q-.60)/.40,2);
        for(let i=0;i<attr.count;i++){
          const u=uv.getX(i),v=uv.getY(i),s=(u-.5)*2;
          attr.setXYZ(i,x+w*.5+s*w*.55,y+h*(-.10+k*.60)+(v-.5)*h*.95*Math.pow(Math.sin(Math.PI*u),.15)+travel*h*2.1*wipe.direction+Math.sin(u*4+q*3+k*.25)*h*.06,
            230+k*16+Math.sin(u*5+v*3+q*5)*35);
        }
        attr.needsUpdate=true;mesh.geometry.computeVertexNormals();
      });
      if(q>=1){this.wipe=null;this.veils.forEach(v=>v.visible=false);wipe.resolve();}
    }
    const phase = this.reduced ? 0 : time * .00023;
    const intro = this.mode === 'intro';
    const p = this.progress;
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
          const shift = Math.sin(phase + this.chapter * .8) * 5;
          points = [
            [-.2, .07], [.1, -.02], [.66, .01], [1.13, .16], [1.0, .47], [.54, .50],
            [-.09, .58], [.01, .87], [.65, .96], [1.18, .85],
          ].map(([u, v], i) => new Vector3(x + u * w, y + v * h + k * 9 + shift * Math.sin(i), Math.sin(i * 1.2 + phase) * 32 + k * 7));
        }
        const curve = new CatmullRomCurve3(points);
        const attr = mesh.geometry.getAttribute('position');
        const a = new Vector3(), tangent = new Vector3(), side = new Vector3();
        for (let i = 0; i <= this.samples; i++) {
          const t = i / this.samples;
          curve.getPoint(t, a); curve.getTangent(t, tangent);
          side.set(-tangent.y, tangent.x, 0).normalize();
          const taper = Math.pow(Math.sin(Math.PI * t), .65);
          const widthFactor = intro ? (p < .24 ? .08 + p * 2.4 : 1) : 1;
          const broad = (k === 3 ? 3.6 : Math.min(24, w * .055)) * taper * widthFactor;
          const twist = Math.sin(t * 10 + phase + k * .4) * .9;
          for (let j = 0; j < this.cross; j++) {
            const theta = j / this.cross * Math.PI * 2;
            const edge = Math.cos(theta) * broad;
            const z = Math.sin(theta) * Math.max(.5, broad * .16);
            attr.setXYZ(i * this.cross + j,
              a.x + side.x * edge * Math.cos(twist),
              a.y + side.y * edge * Math.cos(twist),
              a.z + edge * Math.sin(twist) + z);
          }
        }
        attr.needsUpdate = true; mesh.geometry.computeVertexNormals();
        const pulse = Math.max(0, 1 - (time - this.pulse) / 900);
        mesh.material.emissive.set(mesh.material.color);mesh.material.emissiveIntensity = .5; mesh.material.envMapIntensity = .10 + pulse * (k === this.selection % 4 ? .7 : .1);
        mesh.material.opacity = intro ? Math.min(.88, (p+.035) * 6) * (1 - Math.max(0, (p - .9) * 10)) : k === 3 ? .84 : .78;
      });
    }
    const material = this.particles.material as ShaderMaterial;
    material.uniforms.size.value = [width, height];
    material.uniforms.time.value = this.reduced ? 0 : time / 1000;
    material.uniforms.progress.value = p;
    material.uniforms.alpha.value = intro ? Math.sin(Math.PI * Math.min(1, p + .07)) * .85 : 0;
  }
  debug() { return { mode: this.mode, meshes: this.strips.length, chapter: this.chapter, progress: this.progress, cards:this.cards.debug(), transitioning:!!this.wipe, wipePhase:this.wipePhase }; }
  dispose() {
    this.cancelTransition();this.cards.dispose();this.pbr.dispose();this.veils.forEach(m=>{m.geometry.dispose();m.material.dispose();});
    this.strips.forEach(m => { m.geometry.dispose(); m.material.dispose(); });
    this.particles.geometry.dispose(); (this.particles.material as ShaderMaterial).dispose();
  }
}
