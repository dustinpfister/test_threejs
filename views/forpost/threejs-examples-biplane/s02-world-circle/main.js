// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color('cyan');
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
// create state
const state = {
    lt: new Date(),
    fps: 30,
    frame: 0,
    maxFrame: 600,
    world: worldMod.create()
};
scene.add( state.world );
// loop
function loop() {
    const now = new Date(),
    secs = (now - state.lt) / 1000,
    wud = state.world.userData;
    requestAnimationFrame(loop);
    if (secs > 1 / state.fps) {
        worldMod.update( state.world, state.frame, state.maxFrame );
        renderer.render(scene, state.world.userData.camera);
        state.lt = now;
        state.frame += state.fps * secs;
        state.frame %= state.maxFrame;
    }
};
loop();
