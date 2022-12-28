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
dl.position.set(0.1, 0.7, 0.2);
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
    return new THREE.CanvasTexture(canvas);
};
// texture for the map property
const texture_map = createCanvasTexture( (ctx, canvas) => {
   const w = 16, h = 16;
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
      color.r = Math.random();
      ctx.fillStyle = color.getStyle();
      ctx.fillRect(px, py, pw, ph);
      i += 1;
   }
}, 32);
// ---------- ---------- ----------
// MATERIAL
// ---------- ---------- ----------
const material_phong = new THREE.MeshPhongMaterial({
   map: texture_map
});
// ---------- ---------- ----------
// MESH
// ---------- ---------- ----------
const mesh = new THREE.Mesh(
    new THREE.SphereGeometry(1, 30, 30),
    material_phong);
scene.add(mesh);
// ---------- ---------- ----------
// RENDER
// ---------- ---------- ----------
renderer.render(scene, camera);
