
var scene = new THREE.Scene();

var plane = new THREE.Mesh(
        new THREE.PlaneGeometry(1, 1, 1, 1),
        new THREE.MeshNormalMaterial({side: THREE.DoubleSide}));
plane.geometry.rotateX(Math.PI * 0.5);
scene.add(plane);

var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(1, 1, 1);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);

var lt = new Date(),
state = {
    frame: 0,
    maxFrame: 100,
    per: 0,
    bias: 0
};

var update = function (secs, per, bias, state) {};

var loop = function () {
    var now = new Date(),
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    state.per = state.frame / state.maxFrame;
    state.bias = 1 - Math.abs(state.per - 0.5) / 0.5;

    update(secs, state.per, state.bias, state);

    renderer.render(scene, camera);
    state.frame += 4 * secs;
    state.frame %= state.maxFrame;
    lt = now;
};
loop();
