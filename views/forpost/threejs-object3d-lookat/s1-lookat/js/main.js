
// creating a scene
var scene = new THREE.Scene();

var m1 = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial());
scene.add(m1);

var m2 = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial());
m2.position.set(2, 0, 2)
scene.add(m2);

// MAKING THESE TWO MESH OBJECTS LOOK AT EACH OTHER
m1.lookAt(m2.position);
m2.lookAt(m1.position);

// camera and renderer
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(4, 4, 4);
// MAKING THE CAMREA LOOK AT 0,0,0
camera.lookAt(0, 0, 0);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
renderer.render(scene, camera);
