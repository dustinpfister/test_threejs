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
const mesh = new THREE.Mesh( geometry, material);
scene.add(mesh);
// ---------- ----------
// ROTATE WITH QUATERNIONS
// ---------- ----------
const alpha = 0.5;
const v1 = new THREE.Vector3(0, 1, 0);
const v2 = new THREE.Vector3(1, 0, 0);
const v_from = v1.clone();
const v_to = v_from.clone().lerp(v2, alpha).normalize();
mesh.quaternion.setFromUnitVectors(v_from, v_to);
// ---------- ----------
// RENDER
// ---------- ----------
camera.position.set(4, 4, 4);
camera.lookAt(0,0,0);
renderer.render(scene, camera);
