// ---------- ---------- ----------
// SCENE, CAMERA, and RENDERER
// ---------- ---------- ----------
const scene = new THREE.Scene();
scene.add( new THREE.GridHelper(10, 10) );
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = THREE.WebGL1Renderer ? new THREE.WebGL1Renderer() : new THREE.WebGLRenderer;
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
// ---------- ---------- ----------
// MESH
// ---------- ---------- ----------
const mesh = new THREE.Mesh(
        new THREE.ConeGeometry(0.5, 1, 30, 30),
        new THREE.MeshNormalMaterial());
mesh.geometry.rotateX(Math.PI * 0.5);
mesh.position.set(0, 0, 1);
scene.add(mesh);
// ---------- ---------- ----------
// USING APPLY AXIS ANGLE
// ---------- ---------- ----------
const v = new THREE.Vector3(0, 1, 0);
mesh.position.applyAxisAngle(v, Math.PI / 180 * 90);
mesh.lookAt(0, 0, 0);
// ---------- ---------- ----------
// RENDER
// ---------- ---------- ----------
camera.position.set(3, 3, 3);
camera.lookAt(0,0,0);
renderer.render(scene, camera);

