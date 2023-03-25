//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// OBJECTS
// ---------- ----------
scene.add( new THREE.GridHelper(2, 2) );
const mesh = new THREE.Mesh(
        new THREE.SphereGeometry(0.5, 20, 20),
        new THREE.MeshNormalMaterial());
scene.add(mesh);
// ---------- ----------
// LOOP - Using Vector3.applyEuler with an instance of THREE.Euler
// ---------- ----------
camera.position.set(2, 2, 2);
camera.lookAt(0, 0, 0);
const state = {
    lt: new Date(),
    fps: 24,
    frame: 0,
    frameMax: 100,
    euler : new THREE.Euler()
};
const update = (secs) => {
    const a1 = state.frame / state.frameMax;
    state.euler.y = Math.PI * 2 * a1;
    // setting position
    mesh.position.set(1, 0, 0);
    mesh.position.applyEuler(state.euler);
};
const loop = function () {
    const now = new Date(),
    secs = (now - state.lt) / 1000;
    requestAnimationFrame(loop);
    if (secs >= 1 / state.fps) {
        update(secs);
        renderer.render(scene, camera);
        state.lt = now;
        state.frame = ( state.frame += 1) % state.frameMax;
    }
};
loop();

