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
// MATERIAL
// ---------- ---------- ----------
const material_phong = new THREE.MeshPhongMaterial();
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
