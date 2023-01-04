//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(2, 2, 2);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// EULER
//-------- ----------
// a Mesh
const meshA = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial());
// add the box mesh to the scene
scene.add(meshA);
//-------- ----------
// LOOP
//-------- ----------
let lt = new Date();
const state = {
    x: 0,
    y: 0,
    z: 0
};
const loop = function () {
    const now = new Date(),
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    if (secs >= 0.075) {
        lt = now;
        state.x += 0.5 * secs;
        state.y += 1.0 * secs;
        state.z += 1.5 * secs;
        state.x %= Math.PI * 2;
        // USING EULER SET METHOD
        meshA.rotation.set(state.x, state.y, state.z);
        renderer.render(scene, camera);
    }
};
loop();

