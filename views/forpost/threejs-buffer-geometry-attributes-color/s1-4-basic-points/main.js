// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 1.50, 20);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// GEOMETRY
// ---------- ----------
const geo = new THREE.BoxGeometry( 4, 4, 4, 8, 8, 8 );
const len = geo.getAttribute('position').count;
const color_array = [];
let i = 0;
while(i < len){
   const a1 = i / len;
   const a2 = 1 - Math.abs(0.5 - a1) / 0.5;
   color_array.push(0, a2, 1 - a2);
   i += 1;
}
const color_attribute = new THREE.BufferAttribute(new Float32Array(color_array), 3);
geo.setAttribute('color', color_attribute)
// ---------- ----------
// POINTS
// ---------- ----------
const material = new THREE.PointsMaterial({ vertexColors: true, size: 0.25 });
const points = new THREE.Points(geo, material);
scene.add(points);
// ---------- ----------
// RENDER
// ---------- ----------
camera.position.set(5, 4, 5);
camera.lookAt(0, -0.5, 0);
renderer.render(scene, camera);

