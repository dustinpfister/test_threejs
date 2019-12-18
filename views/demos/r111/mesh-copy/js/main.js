

// SCENE
var scene = new THREE.Scene();

// CAMERA
var camera = new THREE.PerspectiveCamera(40, 16 / 9, 0.1, 1000);
camera.position.set(2, 2, 2);
camera.lookAt(0, 0, 0);

// RENDER
var renderer = new THREE.WebGLRenderer();
document.getElementById('demo').appendChild(renderer.domElement);
renderer.setSize(360, 180);

// MESH
var mesh = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial());
scene.add(mesh);

renderer.render(scene, camera);
