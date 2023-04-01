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
const material = new THREE.MeshNormalMaterial({wireframe: true, wireframeLinewidth: 1 });
const geometry = new THREE.CylinderGeometry(0, 1, 3, 10, 10);
geometry.rotateX(Math.PI * 1.5)
const mesh1 = new THREE.Mesh( geometry, material);
const mesh2 = mesh1.clone();
scene.add(mesh1);
scene.add(mesh2);
mesh1.position.set(-2,0,0);
mesh2.position.set(2,0,0);
// ---------- ----------
// ROTATE WITH QUATERNIONS
// ---------- ----------
const axis1 = new THREE.Vector3(1,0,0);
const axis2 = new THREE.Vector3(0,1,0);
const q1 = new THREE.Quaternion().setFromAxisAngle(axis1, Math.PI / 180 * 45);
const q2 = new THREE.Quaternion().setFromAxisAngle(axis2, Math.PI / 180 * 180);
// THE ORDER DOES VERY MUCH MATTER AS THIS WILL
// RESULT IN TWO DIFFERING ORIENTATIONS
mesh1.quaternion.copy(q2).premultiply(q1);
mesh2.quaternion.copy(q1).premultiply(q2);
// ---------- ----------
// RENDER
// ---------- ----------
camera.position.set(4, 4, 4);
camera.lookAt(0,0,0);
renderer.render(scene, camera);
