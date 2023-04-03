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
const geometry = new THREE.SphereGeometry(2, 20, 20);
const mesh1 = new THREE.Mesh( geometry, material);
scene.add(mesh1);
const mesh2 = new THREE.Mesh( geometry, material);
mesh2.scale.set(0.25, 0.25, 0.25);
scene.add(mesh2);
// ---------- ----------
// SET MESH2 POSITION - using euler objects amd vector3 class methods
// ---------- ----------
const e2 = new THREE.Euler(0, 0, 0);
e2.y = Math.PI / 180 * 270;
e2.z = Math.PI / 180 * 40;
let radius2 = 3.5;
mesh2.position.set(1, 0, 0).applyEuler(e2).multiplyScalar(radius2);
// ---------- ----------
// ROTATE MESH1 WITH QUATERNIONS
// ---------- ----------
const v_from = new THREE.Vector3(0, 1, 0);
const v_to = mesh2.position.clone().normalize();
mesh1.quaternion.setFromUnitVectors(v_from, v_to);
// ---------- ----------
// RENDER
// ---------- ----------
camera.position.set(4, 4, 4);
camera.lookAt(0,0,0);
renderer.render(scene, camera);
