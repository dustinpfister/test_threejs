// creating a box mesh with the Box Geometry constructor,
// and the normal material
var box = new THREE.Mesh(
        new THREE.BoxGeometry(1.5, 1, 1.5),
        new THREE.MeshDepthMaterial());
box.position.set(-0.25, 0, -0.25);
// creating a scene
var scene = new THREE.Scene();
// add the box mesh to the scene
scene.add(box);
// camera and renderer
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.8, 2.5);
camera.position.set(1, 1, 1);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
renderer.render(scene, camera);