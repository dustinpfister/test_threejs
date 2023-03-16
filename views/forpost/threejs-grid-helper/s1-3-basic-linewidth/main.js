//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 64 / 48, 0.1, 100);
const renderer = new THREE.WebGL1Renderer();
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
renderer.setSize(640, 480, false);
//-------- ----------
// GRID HELPERS
//-------- ----------
const size = 8;
const divisions = 8;
const colorLinesCenter = 0xffffff;
const colorLinesGrid = new THREE.Color('lime');
const helper = new THREE.GridHelper(size, divisions, colorLinesCenter, colorLinesGrid);
// SETTING LINE WIDTH OF MATERIAL
// !!! THIS WLL NOT WORK ON ALL PLATFORMS !!!
helper.material.linewidth = 6;
scene.add(helper);
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(8, 5, 8);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);