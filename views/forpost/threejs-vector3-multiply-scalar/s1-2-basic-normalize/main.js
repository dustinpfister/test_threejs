//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// OBJECTS
//-------- ----------
scene.add(new THREE.GridHelper(10, 10));
const cube1 = new THREE.Mesh( new THREE.SphereGeometry(0.5, 20, 20), new THREE.MeshNormalMaterial());
const cube2 = cube1.clone();
const cube3 = cube1.clone();
scene.add(cube1);
scene.add(cube2);
scene.add(cube3); 
// This should help to show the deal with what normalize is about
cube2.position.set(2, 0, 3).multiplyScalar( 1.5 );
console.log(cube2.position.length().toFixed(2)); // '5.41'
cube3.position.set(2, 0, 3).normalize().multiplyScalar(1.5);
console.log(cube3.position.length().toFixed(2)); // '1.50'
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(8, 8, 8);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
