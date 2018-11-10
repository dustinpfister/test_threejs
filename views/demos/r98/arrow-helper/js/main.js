
// SCENE
var scene = new THREE.Scene();

// CAMERA
var camera = new THREE.PerspectiveCamera(75, 320 / 240, 1, 1000);
camera.position.set(2, 2, 2);
camera.lookAt(0, 0, 0);

scene.add(new THREE.ArrowHelper(
        // first argument is the direction
        new THREE.Vector3(2, 2, 0).normalize(),
        // second argument is the orgin
        new THREE.Vector3(0, 0, 0),
        // length
        2.5,
        // color
        0x00ff00));

// RENDERER
var renderer = new THREE.WebGLRenderer();
renderer.setSize(320, 240);

//renderer.physicallyCorrectLights = true;
document.getElementById('demo').appendChild(renderer.domElement);
renderer.render(scene, camera);
