//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, 320 / 240, 0.025, 20);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// ADDING BACKGROUND AND FOG
//-------- ----------
let near = 1.5, far = 6;
const fog_color = new THREE.Color(0xffffff);
scene.background = fog_color;
scene.fog = new THREE.Fog(fog_color, near, far);
//-------- ----------
// SCENE CHILD OBJECTS
//-------- ----------
const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(2, 2, 2),
    new THREE.MeshBasicMaterial({
        color: 0xff0000
    })
);
scene.add(mesh);
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
camera.position.set(2, 2, 3);
camera.lookAt(0, 0, 0);
const FPS_UPDATE = 20, // fps rate to update ( low fps for low CPU use, but choppy video )
FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
FRAME_MAX = 400;
let secs = 0,
frame = 0,
lt = new Date();
const update = function(frame, frameMax){
    const a_frame = frame / frameMax;
    const a_near = a_frame * 16 % 1;
    scene.fog.near = 5 * a_near;
};
const loop = () => {
    const now = new Date(),
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    if(secs > 1 / FPS_UPDATE){
        update( Math.floor(frame), FRAME_MAX);
        renderer.render(scene, camera);
        frame += FPS_MOVEMENT * secs;
        frame %= FRAME_MAX;
        lt = now;
    }
};
loop();
