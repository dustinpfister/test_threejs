// ---------- ---------- ----------
// SCENE, CAMERA, and RENDERER
// ---------- ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, 320 / 240, 1, 1000);
camera.position.set(2, 2, 2);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
// ---------- ---------- ----------
// LIGHT
// ---------- ---------- ----------
const dl = new THREE.DirectionalLight(0xffffff, 1);
dl.position.set(0, 0.4, -0.6);
scene.add(dl);
// ---------- ---------- ----------
// TEXTURES
// ---------- ---------- ----------
const createCanvasTexture = function (draw, size) {
    const canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d');
    canvas.width = size;
    canvas.height = size;
    draw(ctx, canvas);
    const texture = new THREE.CanvasTexture(canvas);
    texture.magFilter = THREE.NearestFilter;
    texture.minFilter = THREE.NearestFilter;
    return texture;
};
// texture for the map property
const texture_map = createCanvasTexture( (ctx, canvas) => {
   const w = 30, h = 30;
   const len = w * h;
   let i = 0;
   while(i < len){
      const x = i % w;
      const y = Math.floor(i / w);
      const pw = canvas.width / w;
      const ph = canvas.height / h;
      const px = pw * x;
      const py = ph * y;
      const color = new THREE.Color(0,0,0);
      color.r = 0.2 + 0.6 * Math.random();
      ctx.fillStyle = color.getStyle();
      ctx.fillRect(px, py, pw, ph);
      i += 1;
   }
}, 64);
// texture for the map property
const texture_emissive = createCanvasTexture( (ctx, canvas) => {
   const w = 32, h = 32;
   const len = w * h;
   let i = 0;
   while(i < len){
      const x = i % w;
      const y = Math.floor(i / w);
      const pw = canvas.width / w;
      const ph = canvas.height / h;
      const px = pw * x;
      const py = ph * y;
      let v  = x % 2 === 0 ? 1 : 0;
      const color = new THREE.Color(v, v, v);
      ctx.fillStyle = color.getStyle();
      ctx.fillRect(px, py, pw, ph);
      i += 1;
   }
}, 64);
// ---------- ---------- ----------
// MATERIAL
// ---------- ---------- ----------
const material_phong = new THREE.MeshPhongMaterial({
   map: texture_map,
   emissive: new THREE.Color(1,1,1),
   emissiveMap: texture_emissive,
   emissiveIntensity: 0.05
});
// ---------- ---------- ----------
// MESH
// ---------- ---------- ----------
const mesh = new THREE.Mesh(
    new THREE.SphereGeometry(2, 30, 30),
    material_phong);
scene.add(mesh);
// ---------- ---------- ----------
// RENDER
// ---------- ---------- ----------
renderer.render(scene, camera);
