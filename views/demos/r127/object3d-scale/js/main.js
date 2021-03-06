var box = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial());
box.position.set(0, 0, -2);

var copy1 = box.clone();
copy1.scale.set(0.5, 0.5, 0.5);
copy1.position.set(0, 0, 0);
var copy2 = box.clone();
copy2.scale.set(0.25, 0.25, 0.25);
copy2.position.set(0, 0, 1.25);

// scene
var scene = new THREE.Scene();
scene.add(box);
scene.add(copy1);
scene.add(copy2);
// camera and renderer
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(3, 3, 3);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
renderer.render(scene, camera);
