var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(50, 320 / 240, 0.1, 1000);
camera.position.set(1.25, 1.25, 1.25);
camera.lookAt(0, -0.125, 0);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
// CREATE A NEW BOX3
var min = new THREE.Vector3(-0.5, -0.75, -1.125),
max = new THREE.Vector3(0.125, 0.25, 0.5);
var box3 = new THREE.Box3(min, max);
// THE GET SIZE METHOD OF BOX 3
// can be used to copy a size to a Vector3 instance
var s = new THREE.Vector3();
box3.getSize(s);
// I CAN THEN USE THAT SIZE VECTOR TO DO
// SOMETHING LIKE SCALING A MESH OBJECT
var mesh = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial());
scene.add(mesh);
mesh.scale.copy(s);
// render
renderer.render(scene, camera);