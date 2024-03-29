// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
scene.add( new THREE.GridHelper(10, 10) );
const camera = new THREE.PerspectiveCamera(45, 4 / 3, 1, 15);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
// ---------- ----------
// INIT
// ---------- ----------
const init = function () {
    // add a cube to the scene
    const cube = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshDepthMaterial({}));
    cube.position.set(0, 0.5, 0);
    scene.add(cube);
    // camera pos
    camera.position.set(2, 2, 2);
    camera.lookAt(0,0.5,0);
};
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
const FPS_UPDATE = 20, // fps rate to update ( low fps for low CPU use, but choppy video )
FPS_MOVEMENT = 20;     // fps rate to move object by that is independent of frame update rate
FRAME_MAX = 60;
let secs = 0,
frame = 0,
lt = new Date();
// update method
const update = function (frame, frameMax) {
    const a1 = frame / frameMax;
    const a2 = 1 - Math.abs(0.5 - a1) / 0.5;
    camera.near = 0.1 + 3 * a2;
    camera.far = 15 - 13 * a2;
    camera.updateProjectionMatrix();
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
init();
loop();