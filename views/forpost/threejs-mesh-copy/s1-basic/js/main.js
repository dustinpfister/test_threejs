// SCENE
var scene = new THREE.Scene();

// CAMERA
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(5, 3, 5);
camera.lookAt(0, 0, 0);

// RENDER
var renderer = new THREE.WebGLRenderer();
document.getElementById('demo').appendChild(renderer.domElement);
renderer.setSize(640, 480);

// MESH original
var original = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial());
scene.add(original);

// Mesh cloned a bunch of times from original
var i = 0, mesh, rad, x, z;
while (i < 10) {
    mesh = original.clone();
    // changes made to position and rotation to not effect original
    rad = Math.PI * 2 * (i / 10);
    x = Math.cos(rad) * 3;
    z = Math.sin(rad) * 3;
    mesh.position.set(x, 0, z);
    mesh.lookAt(original.position);
    scene.add(mesh);
    i += 1;
}

renderer.render(scene, camera);
