// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// OBJECTS
//-------- ----------

const group_cd = countDown.create();
scene.add(group_cd)

// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
camera.position.set(1, 3, 5);
camera.lookAt(0, 0, 0);
const FPS_UPDATE = 4,  // fps rate to update ( low fps for low CPU use, but choppy video )
FPS_MOVEMENT = 1;     // fps rate to move object by that is independent of frame update rate
FRAME_MAX = 90;
let secs = 0,
frame = 0,
lt = new Date();
// update
const update = function(frame, frameMax){
    //const a1 = (frame + 1) / frameMax;
    countDown.set( group_cd, frame );
    //countDown.set(count_sec, secs);
    //countDown.set(count_ms, ms);
    //countDown.set(count_frames, frame);
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
