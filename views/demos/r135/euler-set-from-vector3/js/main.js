// creating a scene
var scene = new THREE.Scene();
scene.add( new THREE.GridHelper(10, 10) );
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(3, 3, 3);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
 
var box = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial());
var a = new THREE.Vector3(8, 0, 0)

//box.rotation.setFromVector3(a);
box.rotation.x = 8;

console.log(box.rotation.x);
scene.add(box);
 
// render
renderer.render(scene, camera);
