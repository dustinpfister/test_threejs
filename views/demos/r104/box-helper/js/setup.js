var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(2, 2, 2);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(320, 240);
document.getElementById('demo').appendChild(renderer.domElement);

var sphere = new THREE.SphereGeometry();
var object = new THREE.Mesh(sphere, new THREE.MeshBasicMaterial(0xff0000));
var box = new THREE.BoxHelper(object, 0xffff00);
scene.add(box);

var mesh = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1));
scene.add(mesh);
renderer.render(scene, camera);
