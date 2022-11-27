// ---------- ---------- ----------
// SCENE, CAMERA, and RENDERER
// ---------- ---------- ----------
const scene = new THREE.Scene();
scene.add( new THREE.GridHelper(10,10) );
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 1, 1000);
camera.position.set(7,7,7);
camera.lookAt(0,0,0);
const renderer = THREE.WebGL1Renderer ? new THREE.WebGL1Renderer() : new THREE.WebGLRenderer;
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
// ---------- ---------- ----------
// STATE
// ---------- ---------- ----------
const state = {
    lt: new Date,
    fps: 30,
    groups: new THREE.Group()
};
scene.add(state.groups);
// ---------- ---------- ----------
// OBJECTS
// ---------- ---------- ----------
// Groups created with the module
let i = 0;
const len = 6, radius = 3
while (i < len) {
    const radian = Math.PI * 2 / len * i;
    const x = Math.cos(radian) * radius;
    const z = Math.sin(radian) * radius;
    const group = CubeGroup.create({
            frame: Math.floor(120 * (i / len)),
            maxFrame: 120
        });
    state.groups.add(group);
    group.position.set(x, 0, z);
    i += 1;
}
// ---------- ---------- ----------
// LOOP
// ---------- ---------- ----------
const loop = function () {
    const now = new Date(),
    secs = (now - state.lt) / 1000;
    requestAnimationFrame(loop);
    if (secs > 1 / state.fps) {
        state.groups.children.forEach(function (group, i) {
            CubeGroup.update(group, secs);
        });
        state.groups.rotation.x += Math.PI / 180 * 5 * secs;
        state.groups.rotation.x %= Math.PI * 2;
        state.groups.rotation.y += Math.PI / 180 * 10 * secs;
        state.groups.rotation.y %= Math.PI * 2;
        renderer.render(scene, camera);
        state.lt = now;
    }
};
loop();
