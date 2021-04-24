var group = new THREE.Group();

// a mesh
var mesh = new THREE.Mesh(
    new THREE.SphereGeometry(1, 30, 30), 
    new THREE.MeshNormalMaterial());

group.add(mesh);

// add a box helper
group.add(new THREE.BoxHelper(group, 0xffffff));

// start a scene
var scene = new THREE.Scene();
// add the mesh to the scene
scene.add(mesh);

// everything else
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(2, 2, 2);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
renderer.render(scene, camera);
