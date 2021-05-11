// scene
var scene = new THREE.Scene();
var grid = new THREE.GridHelper(7, 7);
scene.add(grid);

// group1 with DEFAULT SCALE
var group1 = createCubeGroup();
group1.position.set(0, 0, 0);
scene.add(group1);

// camera and renderer
var camera = new THREE.PerspectiveCamera(40, 320 / 240, 0.1, 100);
camera.position.set(7, 7, 7);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);

var lt = new Date(),
frame = 0,
maxFrame = 90,
fps = 30;

var loop = function () {
    var now = new Date(),
    secs = (now - lt) / 1000,
    perObj,
    s;
    requestAnimationFrame(loop);

    if (secs > 1 / fps) {
        perObj = getPerValues(frame, maxFrame, 2);
        s = 0.25 + 1.75 * perObj.biasLog;
        group1.scale.set(s, s, s);

        renderer.render(scene, camera);
        frame += fps * secs;
        frame %= maxFrame;
        lt = now;
    }
};
loop();
