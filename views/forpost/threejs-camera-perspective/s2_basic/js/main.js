(function () {
 
// CAMERA
var fieldOfView = 40,
aspectRatio = 16 / 9,
near = 0.1,
far = 1000,
camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, near, far);
 
// scene
var scene = new THREE.Scene();
scene.add(new THREE.GridHelper(10, 10));

// RENDER
var renderer = new THREE.WebGLRenderer();
document.getElementById('demo').appendChild(renderer.domElement);
renderer.setSize(320, 180);
 
// MESH
scene.add(new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial()));
 
// position things
camera.position.set(2, 2, 2);
camera.lookAt(0, 0, 0);
// draw the scene
renderer.render(scene, camera);
 
}
    ());