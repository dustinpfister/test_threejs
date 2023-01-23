//-------- ----------
// SCENE TYPE OBJECT, CAMERA TYPE OBJECT, and RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add(new THREE.GridHelper(9, 9));
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.1, 100);
scene.add(camera);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// MESH OBJECTS ARE BASED OFF OF OBJECT3D
//-------- ----------
const box = new THREE.Mesh(
        new THREE.BoxGeometry(1, 5, 2),
        new THREE.MeshNormalMaterial());
scene.add(box);
//-------- ----------
// LOOP
//-------- ----------
camera.position.set(10, 10, 10);
camera.lookAt(box.position);
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
    e.y = Math.PI * 2 * state.per;
    e.x = Math.PI * 0.5 * Math.sin( Math.PI * 0.25 * state.bias );
    box.position.copy( new THREE.Vector3(1, 0, 0).applyEuler(e).normalize().multiplyScalar(3) );
    box.lookAt(0, 0, 0);
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
