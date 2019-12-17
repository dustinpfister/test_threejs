
// Camera
var fieldOfView = 40,
aspectRatio = 16 / 9,
near = 0.1,
far = 1000,
camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, near, far);

// SCENE
var scene = new THREE.Scene();

// RENDER
var renderer = new THREE.WebGLRenderer();
document.getElementById('demo').appendChild(renderer.domElement);
renderer.setSize(320, 180);

// MESH
scene.add(new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshBasicMaterial({
            color: 0xff0000,
            wireframe: true
        })));

// position things
camera.position.set(2, 2, 2);
camera.lookAt(0, 0, 0);
// draw the scene
renderer.render(scene, camera);
