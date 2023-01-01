//-------- ----------
// SCENE, CAMERA, and RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add( new THREE.GridHelper(10, 10) );
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
camera.position.set(2, 2, 2);
camera.lookAt(0, 1, 0);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// ARROW HELPER
//-------- ----------
scene.add( new THREE.ArrowHelper(
        new THREE.Vector3(0, 2, 0).normalize(),  // first argument is the direction
        new THREE.Vector3(0, 0, 0),              // second argument is the origin
        2.0,                                     // length
        0x00ff00));                              // color 
//-------- ----------
// RENDER SCENE WITH CAMERA 
//-------- ----------
renderer.render(scene, camera);