//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 100);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// GRID HELPER AND MESH OBJECT
//-------- ----------
const gridHelper = new THREE.GridHelper(5, 5);
scene.add(gridHelper);
const box = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshNormalMaterial());
box.position.set(0, 0.5, 0);
scene.add(box);
//-------- ----------
// STATE OBJECT INCLUDING SHAKE OBJECT
//-------- ----------
const state = {
    frame: 0,
    maxFrame: 300,
    fps: 30,
    lt: new Date(),
    shake: ShakeMod.create({
        obj: scene,
        posRange: [0.25, 0.5],
        degRange: [5, 20],
        active: true
    })
};
//-------- ----------
// UPDATE AND LOOP
//-------- ----------
camera.position.set(5, 5, 5);
camera.lookAt(0, 0, 0);
const update = function (state, secs) {
    ShakeMod.update(state.shake);
};
// loop
const loop = function () {
    state.per = state.frame / state.maxFrame;
    state.bias = 1 - Math.abs(state.per - 0.5) / 0.5;
    const now = new Date();
    secs = (now - state.lt) / 1000;
    requestAnimationFrame(loop);
    if (secs > 1 / state.fps) {
        // changing intesnity value over time
        state.shake.intensity = state.bias;
        // update, render, step frame
        update(state, secs);
        renderer.render(scene, camera);
        state.frame += state.fps * secs;
        state.frame %= state.maxFrame;
        state.lt = now;
    }
};
loop();
