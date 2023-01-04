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
// ---------- ----------
// Adding a Mesh
// ---------- ----------
const mesh = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial());
scene.add(mesh);
// ---------- ----------
// LOOP - Using Vector3.applyEuler with an instance of THREE.Euler
// ---------- ----------
const state = {
    lt: new Date(),
    fps: 24,
    radian : 0,
    euler : new THREE.Euler(0, 0, 0)
};
const loop = function () {
    const now = new Date(),
    secs = (now - state.lt) / 1000;
    requestAnimationFrame(loop);
    if (secs >= 1 / state.fps) {
        // updating state.euler, and using Vector3.applyEuler with state.euler
        // by way of mesh.position which is an instance of Vector3
        state.euler.z += THREE.MathUtils.degToRad(90) * secs;
        state.euler.z = THREE.MathUtils.euclideanModulo(state.euler.z, Math.PI * 2);
        mesh.position.set(1, 0, 0);
        mesh.position.applyEuler(state.euler);
        // doing a spin also
        mesh.rotation.y += THREE.MathUtils.degToRad(360) * secs;
        mesh.rotation.y = THREE.MathUtils.euclideanModulo(mesh.rotation.y, Math.PI * 2);
        // render
        renderer.render(scene, camera);
        state.lt = now;
    }
};
loop();

