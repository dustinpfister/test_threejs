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
// CLOCK / LOOP
// ---------- ---------- ----------
state.clock.start();
const loop = function () {
    // USING THE GET DELTA METHOD
    const secs = state.clock.getDelta();
    state.per = state.frame / state.maxFrame;
    requestAnimationFrame(loop);
    box.rotation.y = Math.PI * 2 * state.per;
    state.frame += state.fps * secs;
    state.frame %= state.maxFrame;
    renderer.render(scene, camera);
};
loop();
