import {
  Scene,
  Color,
  Fog,
  WebGLRenderer,
  PerspectiveCamera,
  PMREMGenerator,
  Mesh,
  PlaneGeometry,
  MeshBasicMaterial,
  DirectionalLight,
  AmbientLight,
  SRGBColorSpace,
  ACESFilmicToneMapping,
  PCFSoftShadowMap,
  ShadowMaterial,
} from "three";
import { Reflector } from "three/addons/objects/Reflector.js";
export function createStudio(canvas: HTMLCanvasElement, mobile: boolean) {
  const renderer = new WebGLRenderer({
    canvas,
    antialias: true,
    alpha: false,
    powerPreference: "high-performance",
  });
  renderer.outputColorSpace = SRGBColorSpace;
  renderer.toneMapping = ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.12;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.autoUpdate = false;
  renderer.shadowMap.needsUpdate = true;
  renderer.shadowMap.type = PCFSoftShadowMap;
  const scene = new Scene();
  scene.background = new Color("#260e17");
  scene.fog = new Fog("#260e17", 6, 18);
  const camera = new PerspectiveCamera(33, 1, 0.03, 45);
  camera.position.set(2.25, 1.82, 3.65);
  const env = new Scene();
  env.background = new Color(0.22, 0.215, 0.2);
  const cards: Mesh[] = [];
  function card(
    x: number,
    y: number,
    z: number,
    w: number,
    h: number,
    power: number,
  ) {
    const m = new Mesh(
      new PlaneGeometry(w, h),
      new MeshBasicMaterial({
        color: new Color(power, power * 0.98, power * 0.94),
        side: 2,
      }),
    );
    m.position.set(x, y, z);
    m.lookAt(0, 0.6, 0);
    env.add(m);
    cards.push(m);
  }
  card(0, 1.8, 5, 6, 4, 1.8);
  card(-3.2, 4, 3.5, 4.5, 5, 5);
  card(3, 2, 1, 0.65, 4, 4);
  card(0, 5, -0.5, 3, 3, 3);
  card(-1, 1, -4, 1.2, 2.5, 1.1);
  const pmrem = new PMREMGenerator(renderer),
    target = pmrem.fromScene(env, 0.012, 0.1, 50, { size: mobile ? 256 : 512 });
  scene.environment = target.texture;
  scene.environmentIntensity = 0.8;
  for (const card of cards) {
    card.geometry.dispose();
    (card.material as MeshBasicMaterial).dispose();
  }
  pmrem.dispose();
  const key = new DirectionalLight(0xfff4e4, 2.1);
  key.position.set(-3.5, 5, 3);
  key.castShadow = true;
  key.shadow.mapSize.setScalar(mobile ? 1024 : 2048);
  key.shadow.camera.left = -2;
  key.shadow.camera.right = 2;
  key.shadow.camera.top = 2;
  key.shadow.camera.bottom = -2;
  key.shadow.camera.near = 0.2;
  key.shadow.camera.far = 12;
  key.shadow.bias = -0.0002;
  key.shadow.normalBias = 0.002;
  key.shadow.radius = 3;
  scene.add(key);
  const fill = new DirectionalLight(0xe0e7ff, 0.55);
  fill.position.set(4, 2, -1);
  scene.add(fill);
  scene.add(new AmbientLight(0xffffff, 0.12));
  // Blur actual reflected radiance, rather than mirroring a static photograph.
  const shader = {
    ...(Reflector as any).ReflectorShader,
    uniforms: { ...(Reflector as any).ReflectorShader.uniforms },
  };
  shader.fragmentShader = shader.fragmentShader
    .replace(
      "vec4 base = texture2DProj( tDiffuse, vUv );",
      `vec2 uv=vUv.xy/vUv.w; vec4 base=texture2D(tDiffuse,uv)*0.28; float blur=0.0014+0.001*clamp(1.0-uv.y,0.0,1.0); base+=texture2D(tDiffuse,uv+vec2(blur,0.0))*0.12; base+=texture2D(tDiffuse,uv-vec2(blur,0.0))*0.12; base+=texture2D(tDiffuse,uv+vec2(0.0,blur))*0.12; base+=texture2D(tDiffuse,uv-vec2(0.0,blur))*0.12; base+=texture2D(tDiffuse,uv+vec2(blur,blur))*0.06; base+=texture2D(tDiffuse,uv-vec2(blur,blur))*0.06; base+=texture2D(tDiffuse,uv+vec2(blur,-blur))*0.06; base+=texture2D(tDiffuse,uv+vec2(-blur,blur))*0.06;`,
    )
    .replace(
      "vec4( blendOverlay( base.rgb, color ), 1.0 )",
      "vec4( mix(color, base.rgb, 0.22), 1.0 )",
    );
  shader.vertexShader = shader.vertexShader
    .replace("varying vec4 vUv;", "varying vec4 vUv; varying vec3 vWorld;")
    .replace(
      "vUv = textureMatrix * vec4( position, 1.0 );",
      "vUv = textureMatrix * vec4( position, 1.0 ); vWorld=(modelMatrix*vec4(position,1.0)).xyz;",
    );
  shader.fragmentShader = shader.fragmentShader
    .replace("varying vec4 vUv;", "varying vec4 vUv; varying vec3 vWorld;")
    .replace(
      "#include <colorspace_fragment>",
      "#include <colorspace_fragment>\n gl_FragColor.rgb=mix(gl_FragColor.rgb,vec3(0.1490196,0.054902,0.090196),smoothstep(1.7,7.0,length(vWorld.xz)));",
    );
  const floor = new Reflector(new PlaneGeometry(150, 150), {
    textureWidth: mobile ? 512 : 1024,
    textureHeight: mobile ? 512 : 1024,
    color: 0x170e13,
    shader,
    multisample: mobile ? 0 : 2,
  });
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = -0.002;
  scene.add(floor);
  const shadow = new Mesh(
    new PlaneGeometry(150, 150),
    new ShadowMaterial({ color: 0x0a0207, opacity: 0.23 }),
  );
  shadow.rotation.x = -Math.PI / 2;
  shadow.position.y = 0.001;
  shadow.receiveShadow = true;
  scene.add(shadow);
  let pixelRatio = Math.min(devicePixelRatio, mobile ? 1.7 : 2);
  renderer.setPixelRatio(pixelRatio);
  return {
    renderer,
    scene,
    camera,
    floor,
    shadow,
    environment: target,
    setQuality(low: boolean) {
      pixelRatio = Math.min(devicePixelRatio, low ? 1.1 : mobile ? 1.7 : 2);
      renderer.setPixelRatio(pixelRatio);
      floor
        .getRenderTarget()
        .setSize(
          low ? 384 : mobile ? 512 : 1024,
          low ? 384 : mobile ? 512 : 1024,
        );
    },
    resize(w: number, h: number) {
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    },
    dispose() {
      floor.dispose();
      floor.geometry.dispose();
      shadow.geometry.dispose();
      (shadow.material as ShadowMaterial).dispose();
      target.dispose();
      key.shadow.dispose();
      renderer.dispose();
    },
  };
}
