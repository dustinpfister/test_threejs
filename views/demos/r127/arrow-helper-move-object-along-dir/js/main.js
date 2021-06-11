
// NORAMIZED DIRECTION AS UNIT VECTOR
var DIR = new THREE.Vector3(1, 1, 0).normalize();

// scene
var scene = new THREE.Scene();
scene.add(new THREE.GridHelper(9, 9));

// ARROW HELPER
var arrow = new THREE.ArrowHelper(
        // first argument is the direction
        DIR,
        // second argument is the origin
        new THREE.Vector3(0, 0, 0),
        // length
        1.5,
        // color
        0x00ff00);
scene.add(arrow);

// camera
var camera = new THREE.PerspectiveCamera(75, 320 / 240, 0.1, 1000);
camera.position.set(0.25, 1.5, 1.5);
camera.lookAt(0, 0, 0);

// cube
var cube = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshBasicMaterial({
            wireframe: true,
            color: 'yellow'
        }));
scene.add(cube);

// RENDERER
var renderer = new THREE.WebGLRenderer();
document.getElementById('demo').appendChild(renderer.domElement);

// LOOP
var frame = 0,
maxFrame = 500;

var loop = function () {
    requestAnimationFrame(loop);
    var per = frame / maxFrame,
    rad = Math.PI * 2 * per,
    x = Math.cos(rad),
    y = Math.sin(rad);

    renderer.render(scene, camera);
    frame += 1;
    frame %= maxFrame;
};
loop();
