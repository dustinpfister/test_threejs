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
// OBJECTS
// ---------- ----------
// point light object
const pl = new THREE.PointLight(0xffffff, 1);
pl.position.set(0, 1.5, 2);
scene.add( pl );
// helper for the point light
const pl_helper = new THREE.PointLightHelper(pl);
pl.add(pl_helper);
// grid helper
const grid_helper = new THREE.GridHelper( 10, 10 );
scene.add(grid_helper);
// mesh
const mesh = new THREE.Mesh(
     new THREE.TorusGeometry(1, 0.5, 150, 150),
     new THREE.MeshPhongMaterial({wireframe:false})
);
mesh.geometry.rotateX(Math.PI * 0.5);
scene.add(mesh);
// ---------- ----------
// RENDER
// ---------- ----------
camera.position.set(10, 5, 10);
camera.lookAt(mesh.position);
renderer.render(scene, camera);

