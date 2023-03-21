// ---------- ---------- ----------
// SCENE, CAMERA, and RENDERER
// ---------- ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
// ---------- ---------- ----------
// TRANSPARENT BACKGROUND - 
//    * The default for scene.background is null, but just make sure that is in fact the case.
//    * use the setClearColor method passing a null for color, and 0 for the alpha value
// ---------- ---------- ----------
scene.background = null;
renderer.setClearColor(null, 0);
// ---------- ---------- ----------
// ADD A MESH
// ---------- ---------- ----------
const mesh = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshNormalMaterial());
scene.add(mesh);
// ---------- ----------
// RENDER
// ---------- ----------
camera.position.set(2, 2, 2);
camera.lookAt(0,0,0);
renderer.render(scene, camera);

