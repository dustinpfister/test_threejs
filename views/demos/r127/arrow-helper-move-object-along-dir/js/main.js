
// NORAMIZED DIRECTION AS UNIT VECTOR
var V = new THREE.Vector3(1, 1, 0),
DIR = V.normalize(),
LENGTH = 3;

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
        LENGTH,
        // color
        0x00ff00);
scene.add(arrow);

// cube
var cube = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshBasicMaterial({
            wireframe: true,
            color: 'yellow'
        }));
scene.add(cube);

// camera, render
var camera = new THREE.PerspectiveCamera(75, 320 / 240, 0.1, 1000);
camera.position.set(1.75, 2.5, 2.5);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer();
document.getElementById('demo').appendChild(renderer.domElement);

// LOOP
var frame = 0,
maxFrame = 60;

var loop = function () {
    requestAnimationFrame(loop);
    var per = frame / maxFrame,
    rad = Math.PI * 2 * per,
    x = DIR.x * LENGTH * per,
    y = DIR.y * LENGTH * per,
    z = DIR.z * LENGTH * per;

    cube.position.set(x, y, z);

    V.z = 5 * per;
    console.log(V.z);
    DIR = V.normalize();
    arrow.setDirection(DIR);

    renderer.render(scene, camera);
    frame += 1;
    frame %= maxFrame;
};
loop();
