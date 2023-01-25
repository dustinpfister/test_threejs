//-------- ----------
// SCENE TYPE OBJECT, CAMERA TYPE OBJECT, and RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.1, 100);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// ADDING GRID HELPER
//-------- ----------
const grid = new THREE.GridHelper(10, 10);
scene.add( grid );
//-------- ----------
// There is also the constructor object prototype
//-------- ----------
console.log( grid.constructor ===  THREE.GridHelper); // true
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(8, 8, 8);
camera.lookAt(0, -2.5, 0);
renderer.render(scene, camera);
