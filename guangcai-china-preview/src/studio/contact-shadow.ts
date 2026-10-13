import { Color, Group, Mesh, MeshBasicMaterial, MeshDepthMaterial, NormalBlending, OrthographicCamera, PlaneGeometry, Scene, ShaderMaterial, Vector2, WebGLRenderer, WebGLRenderTarget } from 'three';
/** Orthographic depth of the actual geometry, blurred into a contact shadow.
 * This is recomputed when the assembly moves, never painted into the artwork. */
export function createContactShadow(renderer:WebGLRenderer,scene:Scene){
  const size=512,a=new WebGLRenderTarget(size,size),b=new WebGLRenderTarget(size,size);
  const camera=new OrthographicCamera(-150,150,150,-150,0,240);camera.position.set(0,-.08,0);camera.up.set(0,0,-1);camera.lookAt(0,1,0);
  const depth=new MeshDepthMaterial();
  depth.onBeforeCompile=shader=>{shader.fragmentShader=shader.fragmentShader.replace('gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );','gl_FragColor = vec4( vec3( 0.0 ), pow( 1.0 - fragCoordZ, 7.0 ) * 0.42 );');};
  const blurScene=new Scene(),blurCamera=new OrthographicCamera(-1,1,1,-1,0,1);
  const blur=new ShaderMaterial({uniforms:{map:{value:a.texture},direction:{value:new Vector2(1/size,0)}},vertexShader:'varying vec2 vUv;void main(){vUv=uv;gl_Position=vec4(position.xy,0.,1.);}',fragmentShader:'uniform sampler2D map;uniform vec2 direction;varying vec2 vUv;void main(){vec4 c=texture2D(map,vUv)*.227027;c+=(texture2D(map,vUv+direction*1.384615)+texture2D(map,vUv-direction*1.384615))*.316216;c+=(texture2D(map,vUv+direction*3.230769)+texture2D(map,vUv-direction*3.230769))*.070270;gl_FragColor=c;}'});
  const quad=new Mesh(new PlaneGeometry(2,2),blur);blurScene.add(quad);
  const floor=new Mesh(new PlaneGeometry(300,300),new MeshBasicMaterial({map:a.texture,transparent:true,depthWrite:false,toneMapped:false}));floor.rotation.x=-Math.PI/2;floor.position.y=-.09;floor.renderOrder=1;scene.add(floor);
  let previous='';
  return{floor,update(root:Group){
    const key=root.id+root.children.map(o=>[o.position.toArray(),o.quaternion.toArray(),o.visible].join(',')).join('/');if(key===previous)return;previous=key;
    const target=renderer.getRenderTarget(),background=scene.background,override=scene.overrideMaterial,clearColor=renderer.getClearColor(new Color()),clearAlpha=renderer.getClearAlpha();
    floor.visible=false;scene.background=null;scene.overrideMaterial=depth;renderer.setClearColor(0,0);
    renderer.setRenderTarget(a);renderer.clear();renderer.render(scene,camera);
    scene.overrideMaterial=override;scene.background=background;
    for(const radius of[1.3,1.3]){
      blur.uniforms.map.value=a.texture;blur.uniforms.direction.value.set(radius/size,0);renderer.setRenderTarget(b);renderer.clear();renderer.render(blurScene,blurCamera);
      blur.uniforms.map.value=b.texture;blur.uniforms.direction.value.set(0,radius/size);renderer.setRenderTarget(a);renderer.clear();renderer.render(blurScene,blurCamera);
    }
    renderer.setRenderTarget(target);renderer.setClearColor(clearColor,clearAlpha);floor.visible=true;
  },dispose(){a.dispose();b.dispose();depth.dispose();quad.geometry.dispose();blur.dispose();floor.geometry.dispose();floor.material.dispose();}};
}
