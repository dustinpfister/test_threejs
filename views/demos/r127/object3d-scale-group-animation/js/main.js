// scene
var scene = new THREE.Scene();

var state = {
    lt: new Date,
    fps: 30
};

// a group created with the cube group module

var group1 = CubeGroup.create();
group1.position.set(0, 0, 0);
scene.add(group1);

var grid = new THREE.GridHelper(7, 7);
scene.add(grid);

// camera and renderer
var camera = new THREE.PerspectiveCamera(40, 320 / 240, 0.1, 100);
camera.position.set(7, 7, 7);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);

var loop = function () {
    var now = new Date(),
    secs = (now - state.lt) / 1000;

    requestAnimationFrame(loop);

    if (secs > 1 / state.fps) {

        CubeGroup.update(group1, secs);

        renderer.render(scene, camera);
        state.lt = now;
    }
};
loop();
