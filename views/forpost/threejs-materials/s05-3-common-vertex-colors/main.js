// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
camera.position.set(0, 5, 10);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// GEOMETRY
// ---------- ----------
const geo = new THREE.SphereGeometry( 4, 20, 20 );
const len = geo.getAttribute('position').count;
const color_array = [];
let i = 0;
while(i < len){
   const a_vert = i / len;
   const a_blue = Math.sin( Math.PI * (16 * a_vert % 1) );
   color_array.push(a_vert, 1 - a_vert, a_blue );
   i += 1;
}
const color_attribute = new THREE.BufferAttribute(new Float32Array( color_array ), 3);
geo.setAttribute('color', color_attribute);
// ---------- ----------
// MATERIAL - using vertex colors
// ---------- ----------
const material1 = new THREE.MeshBasicMaterial({
    vertexColors: true
});
// ---------- ----------
// MESH
// ---------- ----------
const mesh1 = new THREE.Mesh(geo, material1);
scene.add(mesh1);
// ---------- ----------
// RENDER
// ---------- ----------
renderer.render(scene, camera);

