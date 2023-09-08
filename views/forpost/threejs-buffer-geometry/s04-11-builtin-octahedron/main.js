// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.querySelector('#demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// GEOMETRY
// ---------- ----------
const radius = 3;
const detail = 0;
const geometry = new THREE.OctahedronGeometry(radius, detail);
// ---------- ----------
// OBJECTS
// ---------- ----------
const mesh1 = new THREE.Mesh(geometry, new THREE.MeshNormalMaterial({ wireframe: true }) );
scene.add(mesh1);
// ---------- ----------
// RENDER
// ---------- ----------
camera.position.set(2, 1, 8);
camera.lookAt(0, 0.2, 0);
renderer.render(scene, camera);
