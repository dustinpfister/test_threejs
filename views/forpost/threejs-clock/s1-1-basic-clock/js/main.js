// A STATE OBJECT WITH A THREE.CLOCK INSTANCE
var state = {
    clock: new THREE.Clock(),
    frame: 0,
    maxFrame: 90,
    fps: 30,
    per: 0
};
// a scene
var scene = new THREE.Scene();
// a mesh
var box = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial());
scene.add(box);
// camera render
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(1, 1, 1);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
// START CLOCK
state.clock.start();
// loop
var loop = function () {
    // USING THE GET DELTA METHOD
    var secs = state.clock.getDelta();
    state.per = state.frame / state.maxFrame;
    requestAnimationFrame(loop);
    box.rotation.y = Math.PI * 2 * state.per;
    state.frame += state.fps * secs;
    state.frame %= state.maxFrame;
    renderer.render(scene, camera);
};
loop();
