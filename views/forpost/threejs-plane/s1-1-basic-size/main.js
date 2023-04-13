// ---------- ----------
// SCENE, CAMERA, AND RENDERER
// ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 64 / 48, 0.5, 100);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// MESH - USING PLANE GEOMETRY, SETTING SIZE
// ---------- ----------
scene.add( new THREE.GridHelper(10, 10));
const mesh = new THREE.Mesh(
    new THREE.PlaneGeometry(8, 4),
    new THREE.MeshNormalMaterial());
scene.add(mesh);
// ---------- ----------
// CALLING RENDER OF RENDERER
// ---------- ----------
camera.position.set(8, 8, 8);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
