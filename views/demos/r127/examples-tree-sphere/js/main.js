
var tree = TreeSphereMod.create();

// creating a scene
var scene = new THREE.Scene();
 
// add the box mesh to the scene
scene.add(tree);
 
// camera and renderer
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(5, -2, 5);
camera.lookAt(0, -2, 0);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
renderer.render(scene, camera);
