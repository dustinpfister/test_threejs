// scene
var scene = new THREE.Scene();
scene.add(new THREE.GridHelper(5, 5));

// adding a mesh
var mesh = new THREE.Mesh(
        new THREE.ConeGeometry(0.5, 1, 10, 10),
        new THREE.MeshNormalMaterial());
mesh.position.set(0, 0.5, 0);
scene.add(mesh);

// getting the parent of the mesh, and prefroming an action on it
var parent = mesh.parent;
parent.rotation.x = Math.PI * 2 * Math.random();

// camera and renderer
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(4, 4, 4);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
renderer.render(scene, camera);
