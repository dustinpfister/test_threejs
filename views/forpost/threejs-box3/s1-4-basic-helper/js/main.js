//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 320 / 240, 0.1, 1000);
camera.position.set(1.25, 1.25, 1.25);
camera.lookAt(0, -0.125, 0);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// BOX3, BOX3 Helper
//-------- ----------
const min = new THREE.Vector3(-0.5, -0.75, -1.125);
const max = new THREE.Vector3(0.125, 0.25, 0.5);
const box3 = new THREE.Box3(min, max);
// THE BOX3 HELPER
const box3Helper = new THREE.Box3Helper(box3, 0x00ff00);
box3Helper.material.linewidth = 3;
scene.add(box3Helper);
//-------- ----------
// RENDER
//-------- ----------
renderer.render(scene, camera);