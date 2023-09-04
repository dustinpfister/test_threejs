//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 64 / 48, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// STATE
//-------- ----------
const state = {
    lt: new Date(),
    fps: 30,
    frame: 0,
    maxFrame: 900,
    bi: Biplane.create(),
    dl: new THREE.DirectionalLight(0xffffff, 1)
};
scene.add( state.dl );
scene.add( state.bi );
//-------- ----------
// LOOP
//-------- ----------
camera.position.set(15, 15, 15);
camera.lookAt(0, 0, 0);
function loop() {
    const now = new Date(),
    secs = (now - state.lt) / 1000;
    requestAnimationFrame(loop);
    if (secs > 1 / state.fps) {

        const a_frame = state.frame / state.maxFrame;
        const a_prop = a_frame * 2 % 1;
        const a_hover = 1 - ( Math.sin( Math.PI * 2 *  (a_frame * 9 % 1) ) / Math.PI );
        Biplane.update(state.bi, a_prop);
        state.bi.position.y = -2 + 4 * a_hover;


        renderer.render(scene, camera);
        state.lt = now;
        state.frame += state.fps * secs;
        state.frame %= state.maxFrame;
    }
};
loop();
