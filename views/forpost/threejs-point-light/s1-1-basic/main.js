// ---------- ----------
// SCENE, CAMERA, AND RENDERER
// ---------- ----------
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x1f1f1f);
const camera = new THREE.PerspectiveCamera(40, 4 / 3, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
// ---------- ----------
// POINT LIGHT
// ---------- ----------
const pl = new THREE.PointLight(0xffffff, 1);
pl.position.set(0, 0.5, 0);
scene.add( pl );
// ---------- ----------
// MESH
// ---------- ----------
const mesh = new THREE.Mesh(
     new THREE.TorusGeometry(1, 0.5, 150, 150),
     new THREE.MeshPhongMaterial({wireframe:false})
);
mesh.geometry.rotateX(Math.PI * 0.5);
scene.add(mesh);
camera.lookAt(mesh.position);
// ---------- ----------
// RENDER
// ---------- ----------
camera.position.set(2, 3, 2);
camera.lookAt(0,-0.25,0);
renderer.render(scene, camera);

