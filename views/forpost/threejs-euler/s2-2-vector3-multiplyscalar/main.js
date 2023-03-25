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
scene.add( new THREE.GridHelper(5,5) );
const group = new THREE.Group();
let i = 0;
while(i < 40){
    const mesh = new THREE.Mesh(
        new THREE.SphereGeometry(0.4, 20, 20),
        new THREE.MeshNormalMaterial());
    group.add(mesh);
    i += 1;
}
scene.add(group);
// ---------- ----------
// LOOP - Using Vector3.applyEuler with an instance of THREE.Euler
// ---------- ----------
camera.position.set(5,5,5);
camera.lookAt(0, 0, 0);
const state = {
    lt: new Date(),
    fps: 24,
    frame: 0,
    frameMax: 900,
    euler : new THREE.Euler()
};
const update = (secs) => {
    const a1 = state.frame / state.frameMax;
    group.children.forEach( (mesh, i, arr) => {
        const a2 = (a1 + (1 / arr.length) * i) % 1;
        state.euler.y = Math.PI * 2 * a2;
        const radius = 3 + Math.sin( Math.PI * 10 * a2 );
        mesh.position.set(1, 0, 0).applyEuler(state.euler).multiplyScalar(radius);
    });
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

