// A STATE OBJECT WITH A THREE.CLOCK INSTANCE
var state = {
    clock: new THREE.Clock(),
    frame: 0,
    maxFrame: 90,
    fps: 12, // capping at 12 fps
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

// loop
var loop = function () {
    var wSecs = performance.now() - state.clock.oldTime,
    secs;
    requestAnimationFrame(loop);
    if (wSecs > 1 / state.fps) {
        secs = state.clock.getDelta();
        state.per = state.frame / state.maxFrame;
        box.rotation.y = Math.PI * 2 * state.per;
        state.frame += state.fps * secs;
        state.frame %= state.maxFrame;
        renderer.render(scene, camera);
    }
};
// START CLOCK
state.clock.start();
console.log();
// start loop
loop();
