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
// The instance of keyword might be a better general way of checking objects
//-------- ----------
console.log( grid instanceof THREE.GridHelper ); // true
// This might be  better way of checking in general
const v = new THREE.Vector3();
console.log( v.type );                        // undefined
console.log( v instanceof THREE.Vector3 );    // true
console.log( v instanceof THREE.GridHelper ); // false
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(8, 8, 8);
camera.lookAt(0, -2.5, 0);
renderer.render(scene, camera);
