//-------- ----------
// SCENE, CAMNERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 100);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
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
// STATE OBJECT INCLDUING SHAKE OBJECT
//-------- ----------
const canvas = renderer.domElement;
const state = {
    fps: 30,
    lt: new Date(),
    shake: ShakeMod.create() // ADJUSTING pos and DEG by EVENTS
};
//-------- ----------
// EVENTS
//-------- ----------
const pointerDown = function () {
    state.shake.active = true;
};
const pointerUp = function () {
    state.shake.active = false;
};
const pointerMove = function (shake, canvas) {
    return function (e) {
        e.preventDefault();
        const canvas = e.target,
        box = canvas.getBoundingClientRect(),
        x = e.clientX - box.left,
        y = e.clientY - box.top;
        if (e.changedTouches) {
            x = e.changedTouches[0].clientX - box.left;
            y = e.changedTouches[0].clientY - box.top;
        };
        // Adjust pos and deg based on pointer position
        shake.pos = x / canvas.width * 0.95;
        shake.deg = y / canvas.height * 18;
    };
};
// mouse
renderer.domElement.addEventListener('mousedown', pointerDown);
renderer.domElement.addEventListener('mousemove', pointerMove(state.shake, canvas));
renderer.domElement.addEventListener('mouseup', pointerUp);
renderer.domElement.addEventListener('mouseout', pointerUp);
// touch
renderer.domElement.addEventListener('touchstart', pointerDown);
renderer.domElement.addEventListener('touchmove', pointerMove(state.shake, canvas));
renderer.domElement.addEventListener('touchend', pointerUp);
renderer.domElement.addEventListener('touchcancel', pointerUp);
//-------- ----------
// UPDATE AND LOOP
//-------- ----------
camera.position.set(5, 5, 5);
camera.lookAt(0, 0, 0);
const update = function (state, secs) {
    ShakeMod.roll(state.shake);
    ShakeMod.applyToObject3d(state.shake, scene);
};
// loop
const loop = function () {
    const now = new Date();
    secs = (now - state.lt) / 1000;
    requestAnimationFrame(loop);
    if (secs > 1 / state.fps) {
        update(state, secs);
        renderer.render(scene, camera);
        state.lt = now;
    }
};
loop();
