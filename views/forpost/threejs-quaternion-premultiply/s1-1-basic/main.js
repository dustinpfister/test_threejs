// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// OBJECTS
// ---------- ----------
scene.add(new THREE.GridHelper(10, 10));
const material = new THREE.MeshNormalMaterial({wireframe: true, wireframeLinewidth: 2 });
const mesh = new THREE.Mesh(
    new THREE.SphereGeometry(2, 20, 20),
    material);
scene.add(mesh);
// ---------- ----------
// ROTATE WITH QUATERNIONS
// ---------- ----------
const axis1 = new THREE.Vector3(1,0,0);
const axis2 = new THREE.Vector3(0,1,0);
const q1 = new THREE.Quaternion().setFromAxisAngle(axis1, Math.PI * 0.25);
const q2 = new THREE.Quaternion().setFromAxisAngle(axis2, Math.PI / 180 * 5);
mesh.quaternion.copy(q2).premultiply(q1);
// ---------- ----------
// RENDER
// ---------- ----------
camera.position.set(3,3,3);
camera.lookAt(0,0,0);
renderer.render(scene, camera);
