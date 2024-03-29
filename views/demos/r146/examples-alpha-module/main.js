// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// OBJECTS
// ---------- ----------
scene.add(new THREE.GridHelper(10, 10))
const mesh = new THREE.Mesh( new THREE.BoxGeometry(3, 2, 1) );
scene.add(mesh);

// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
camera.position.set(7, 7, 12);
camera.lookAt(0, 0, 0);
const FPS_UPDATE = 20, // fps rate to update ( low fps for low CPU use, but choppy video )
FPS_MOVEMENT = 20;     // fps rate to move object by that is independent of frame update rate
FRAME_MAX = 60;
let secs = 0,
frame = 0,
lt = new Date();
// update
const update = function(frame, frameMax){
    const a1 = getAlpha.linear(frame, frameMax, 1);
    const a2 = getAlpha.sinBias(a1, 1);
    mesh.position.y = 1;
    mesh.position.x = -3.5 + 7 * a2;

    //console.log(a1)
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