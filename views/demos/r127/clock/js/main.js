
var box = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial());
var scene = new THREE.Scene();
scene.add(box);

var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(3, 3, 3);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);

state = {
    lt: new Date(),
    frame: 0,
    maxFrame: 90,
    fps: 30,
    per: 0
};
var loop = function () {
    var now = new Date(),
    secs = (now - state.lt) / 1000;

    state.per = state.frame / state.maxFrame;

    requestAnimationFrame(loop);

    box.rotation.y = Math.PI * 2 * state.per;

    renderer.render(scene, camera);

    state.frame += state.fps * secs;
    state.frame %= state.maxFrame;

    state.lt = now;
};
loop();
