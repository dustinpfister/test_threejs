// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 1.50, 20);
camera.position.set(5, 4, 5);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// GEOMETRY
// ---------- ----------
const geo = new THREE.SphereGeometry( 3, 10, 10 );
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
// Line - vertexColors boolen is a Material base class prop, so it works with LineBasicMaterial
// ---------- ----------
const material = new THREE.LineBasicMaterial({ vertexColors: true, linewidth: 6 });
const line = new THREE.Line(geo, material);
scene.add(line);
// ---------- ----------
// RENDER
// ---------- ----------
renderer.render(scene, camera);

