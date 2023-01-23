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
// MESH
//-------- ----------
// box is a MESH base off of OBJECT3D
const box = new THREE.Mesh(
    new THREE.BoxGeometry(3, 3, 3),
    new THREE.MeshNormalMaterial());
scene.add(box);
 
camera.position.set(10, 10, 10);
camera.lookAt(0, 0, 0);
//-------- ----------
// LOOP
//-------- ----------
// state object
const state = {
    frame: 0,
    maxFrame: 200,
    fps: 30,
    lt: new Date(),
    euler: new THREE.Euler(0, 0, 0)
};
// update
const update = function (state, secs) {
    // DOING A SPIN ALONG THE Z AXIS
   state.euler.z = Math.PI * 8 * state.per;
   box.rotation.copy(state.euler);
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
