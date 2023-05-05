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
const mesh1 = new THREE.Mesh(new THREE.BoxGeometry(1,1,1));
scene.add(mesh1);
// ---------- ----------
// TIMELINE
// ---------- ----------
const tl = timeLine.create({
    st: '07:00:00.000',
    et: '17:00:00.000'
});
timeLine.add(tl, {
   st: '08:00:00.000',
   et: '09:00:00.000',
   update: (tl, a_event) => {
       mesh1.position.set( 4.5, 0.5, 4.5 - 4.5 * a_event)
   }
});
timeLine.add(tl, {
   st: '11:30:00.000',
   et: '11:40:00.000',
   update: (tl, a_event) => {
       mesh1.position.set( 4.5 - 4.5 * a_event, 0.5, 0);
   }
});
timeLine.add(tl, {
   st: '13:00:00.000',
   et: '16:30:00.000',
   update: (tl, a_event) => {
       mesh1.position.set( 4.5 * a_event, 0.5, 4.5 * a_event);
   }
});
// ---------- ----------
// GRID
// ---------- ----------
scene.add( new THREE.GridHelper(10,10) );
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
camera.position.set(10, 10, 10);
camera.lookAt(0,0,0);
const FPS_UPDATE = 30, // fps rate to update ( low fps for low CPU use, but choppy video )
FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
FRAME_MAX = 300;
let secs = 0,
frame = 0,
lt = new Date();
// update
const update = function(frame, frameMax){
    const a1 = frame / frameMax;
    timeLine.set(tl, a1);
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