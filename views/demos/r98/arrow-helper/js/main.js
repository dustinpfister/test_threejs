
// SCENE
var scene = new THREE.Scene();

// CAMERA
var camera = new THREE.PerspectiveCamera(75, 320 / 240, 1, 1000);
camera.position.set(0, 0, 3);
camera.lookAt(0, 0, 0);

var arrow = new THREE.ArrowHelper(
        // first argument is the direction
        new THREE.Vector3(2, 2, 0).normalize(),
        // second argument is the orgin
        new THREE.Vector3(0, 0, 0),
        // length
        2.2,
        // color
        0x00ff00);

scene.add(arrow);

console.log(arrow);

// RENDERER
var renderer = new THREE.WebGLRenderer();
renderer.setSize(320, 240);

//renderer.physicallyCorrectLights = true;
document.getElementById('demo').appendChild(renderer.domElement);

var frame = 0,
maxFrame = 500;
var loop = function () {

    requestAnimationFrame(loop);

    var per = frame / maxFrame,
    rad = Math.PI * 2 * per,
    x = Math.cos(rad),
    y = Math.sin(rad);

    var dir = new THREE.Vector3(x, y, 0).normalize();
    arrow.setDirection(dir);

    renderer.render(scene, camera);

    frame += 1;
    frame %= maxFrame;

};

loop();
