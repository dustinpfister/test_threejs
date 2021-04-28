
// a Mesh
var meshA = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial());
// cloning ths mesh
var box1 = meshA.clone(),
box2 = meshA.clone(),
box3 = meshA.clone();

// adjusting positions
box2.position.set(-1.5, 0, 0);
box3.position.set(1.5, 0, 0);

// creating a scene
var scene = new THREE.Scene();

// add the box mesh to the scene
scene.add(box1);
scene.add(box2);
scene.add(box3);

// camera and renderer
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(3, 3, 3);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);

var loop = function () {
    requestAnimationFrame(loop);

    box2.rotation.x += 1;
    box2.rotation.x %= Math.PI * 2;

    renderer.render(scene, camera);
};

loop();
