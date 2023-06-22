// ---------- ----------
// SCENE, CAMERA, AND RENDERER
// ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, 320 / 240, 0.6, 100);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild( renderer.domElement );
// ---------- ----------
// SCENE CHILD OBJECTS - mesh using THREE.SphereGeometry
// ---------- ----------
const mesh = new THREE.Mesh(
    new THREE.SphereGeometry(0.65),
    new THREE.MeshDepthMaterial());
scene.add(mesh);
// ---------- ----------
// CALLING RENDER OF RENDERER
// ---------- ----------
camera.position.set(1, 1, 1);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
