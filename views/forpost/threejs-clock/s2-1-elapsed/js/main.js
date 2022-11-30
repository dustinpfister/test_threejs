// ---------- ---------- ----------
// SCENE, CAMERA, and RENDERER
// ---------- ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
camera.position.set(1.2, 1.2, 1.2);
camera.lookAt(0, -0.15, 0);
const renderer = THREE.WebGL1Renderer ? new THREE.WebGL1Renderer() : new THREE.WebGLRenderer;
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
// ---------- ---------- ----------
// A STATE OBJECT WITH A THREE.CLOCK INSTANCE
// ---------- ---------- ----------
const state = {
    clock: new THREE.Clock(),
    frame: 0,
    maxFrame: 90,
    fps: 30,
    per: 0
};
// ---------- ---------- ----------
// MESH
// ---------- ---------- ----------
const box = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial());
scene.add(box);
// ---------- ---------- ----------
// CLOCK / LOOP getElapsedTime
// ---------- ---------- ----------
state.clock.start();
// loop
const loop = function () {
    // USING THE GET DELTA METHOD FOR SECS
    // AND GET ELAPSED TIME DELTA FOR TOTAL SECS
    const secs = state.clock.getDelta(),
    totalSecs = state.clock.getElapsedTime();
    requestAnimationFrame(loop);
    // rotating box on y by SECS
    state.per = state.frame / state.maxFrame;
    state.frame += state.fps * secs;
    state.frame %= state.maxFrame;
    box.rotation.y = Math.PI * 2 * state.per;
    // rotating x by TOTAL SECS
    box.rotation.x = Math.PI / 180 * 45 * (1 / totalSecs);
    renderer.render(scene, camera);
};
loop();
