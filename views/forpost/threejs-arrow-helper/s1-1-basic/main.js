// SCENE, CAMERA, and RENDERER
var scene = new THREE.Scene();
scene.add( new THREE.GridHelper(10, 10) );
var camera = new THREE.PerspectiveCamera(75, 320 / 240, 1, 1000);
camera.position.set(2.0, 2.0, 2.0);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer();
document.getElementById('demo').appendChild(renderer.domElement);
// ARROW HELPER
scene.add( new THREE.ArrowHelper(
        new THREE.Vector3(0, 2, 0).normalize(),  // first argument is the direction
        new THREE.Vector3(0, 0, 0),              // second argument is the origin
        2.0,                                     // length
        0x00ff00));                              // color 
// RENDER SCENE WITH CAMERA 
renderer.render(scene, camera);