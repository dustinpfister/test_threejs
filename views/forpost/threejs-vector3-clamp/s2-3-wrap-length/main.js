//-------- ----------
// SCENE, CAMERA RENDERER
//-------- ----------
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// HELPERS
//-------- ----------
// mod method that wraps THREE.MathUtils.euclideanModulo
const mod = function (a, b) {
    return THREE.MathUtils.euclideanModulo(a, b);
};
//-------- ----------
// OBJECTS
//-------- ----------
scene.add(new THREE.GridHelper(4, 4));
const mesh1 = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshNormalMaterial({ transparent: true, opacity: 1 })
);
scene.add(mesh1);
const mesh2 = new THREE.Mesh(
    new THREE.SphereGeometry(2, 20, 20),
    new THREE.MeshBasicMaterial({ wireframe: true, transparent: true, opacity: 0.2, wireframeLinewidth: 3 })
);
mesh2.geometry.rotateX( Math.PI * 1.5 );
scene.add(mesh2);
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
camera.position.set(5, 5, 5);
camera.lookAt(0, 0, 0);
const FPS_UPDATE = 20,
FPS_MOVEMENT = 30;
FRAME_MAX = 900;
let secs = 0,
frame = 0,
lt = new Date();
// update
const update = function(frame, frameMax){
    const a_frame = frame / frameMax;
    const a_length = mod(32 * a_frame, 1);
    const vectorLength = 1.5 * a_length;
    const e = new THREE.Euler(0, Math.PI * 2 * a_frame, Math.PI * 8 * a_frame);
    mesh1.position.set(1, 0, 0).applyEuler(e).multiplyScalar( vectorLength );
    mesh1.lookAt(0, 0, 0);
};
// loop
const loop = () => {
    const now = new Date(),
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    if(secs > 1 / FPS_UPDATE){
        // update, render
        update( Math.floor(frame), FRAME_MAX);
        renderer.render(scene, camera);
        // step frame
        frame += FPS_MOVEMENT * secs;
        frame %= FRAME_MAX;
        lt = now;
    }
};
loop();
