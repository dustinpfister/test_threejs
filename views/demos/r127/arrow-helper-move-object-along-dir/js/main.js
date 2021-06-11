
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
maxFrame = 90,
fps = 30,
lt = new Date();

var update = function (secs, per, bias) {
    var x = DIR.x * LENGTH * per,
    y = DIR.y * LENGTH * per,
    z = DIR.z * LENGTH * per;
    cube.position.set(x, y, z);
    V.z = 5 * per; ;
    DIR = V.clone().normalize();
    arrow.setDirection(DIR);
};

var loop = function () {
    var now = new Date(),
    secs = (now - lt) / 1000,
    per = frame / maxFrame,
    bias;
    requestAnimationFrame(loop);
    if (secs > 1 / fps) {
        update(secs, per, bias)
        renderer.render(scene, camera);
        frame += fps * secs;
        frame %= maxFrame;
        lt = now;
    }
};
loop();
