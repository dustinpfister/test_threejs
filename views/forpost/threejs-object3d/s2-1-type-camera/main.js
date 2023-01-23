//-------- ----------
// SCENE TYPE OBJECT, CAMERA TYPE OBJECT, and RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add(new THREE.GridHelper(9, 9));
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.1, 100);
camera.position.set(10, 10, 10);
scene.add(camera);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// mesh
//-------- ----------
const box = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshNormalMaterial());
scene.add(box);
//-------- ----------
// LOOP
//-------- ----------
// state object
const state = {
    frame: 0,
    maxFrame: 100,
    fps: 30,
    lt: new Date()
};
// UPDATING THE CAMERA WITH object3d properties and methods
const update = function (state, secs) {
    const e = new THREE.Euler();
    e.y = Math.PI * 0.25;
    e.x = Math.PI * 0.5 * -1 + Math.PI * 1.0 * state.bias;
    camera.position.copy( new THREE.Vector3(1, 0, 0).applyEuler(e).normalize().multiplyScalar(10) );
    camera.lookAt(box.position)
};
// loop
const loop = function () {
    state.per = state.frame / state.maxFrame;
    state.bias = 1 - Math.abs(state.per - 0.5) / 0.5;
    const now = new Date();
    secs = (now - state.lt) / 1000;
    requestAnimationFrame(loop);
    if (secs > 1 / state.fps) {
        update(state, secs);
        renderer.render(scene, camera);
        state.frame += state.fps * secs;
        state.frame %= state.maxFrame;
        state.lt = now;
    }
};
loop();
