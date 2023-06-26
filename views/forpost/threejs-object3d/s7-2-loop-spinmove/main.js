//-------- ----------
// SCENE TYPE OBJECT, CAMERA TYPE OBJECT, and RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.1, 100);
scene.add(camera);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// OBJECTS
//-------- ----------
// GRID HELPER IS ALSO BASED OFF OF OBJECT3D
// so then I can use the scale property
const gridHelper = new THREE.GridHelper(4, 4);
gridHelper.scale.set(2.5, 2.5, 2.5);
scene.add(gridHelper);
// box is a MESH base off of OBJECT3D
const box = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshNormalMaterial());
scene.add(box);
// sphere is a MESH base off of OBJECT3D
const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.25, 20, 20),
    new THREE.MeshNormalMaterial());
scene.add(sphere);
//-------- ----------
// loop
//-------- ----------
camera.position.set(10, 10, 10);
camera.lookAt(0, 0, 0);
// state object
const state = {
    frame: 0,
    maxFrame: 100,
    fps: 30,
    lt: new Date(),
    vector: new THREE.Vector3(3, 0, 0) // and instance of vercor3
};
// update
const update = function (state, secs) {
    state.vector.z = -5 + 10 * state.bias;
    // USING THE state.vector instance of Vector3 to set the position
    // of the sphere
    sphere.position.copy(state.vector);
    // and also making the box look at the state.vercor value
    box.lookAt(state.vector);
};
// loop
const loop = function () {
    state.per = state.frame / state.maxFrame;
    state.bias = 1 - Math.abs(state.per - 0.5) / 0.5;
    const now = new Date(),
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
