

// SCENE
var scene = new THREE.Scene();

// CAMERA
var camera = new THREE.PerspectiveCamera(40, 16 / 9, 0.1, 1000);
camera.position.set(6, 6, 6);
camera.lookAt(0, 0, 0);

// RENDER
var renderer = new THREE.WebGLRenderer();
document.getElementById('demo').appendChild(renderer.domElement);
renderer.setSize(360, 180);

// MESH
var original = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial());
scene.add(original);

// Copy the mesh a bunch of times
var i = 0, mesh, rad, x, z;
while (i < 10) {
    mesh = original.clone();
    rad = Math.PI * 2 * (i / 10);
    x = Math.cos(rad) * 3;
    z = Math.sin(rad) * 3;
    mesh.position.set(x, 0, z);
    scene.add(mesh);
    i += 1;
}

renderer.render(scene, camera);
