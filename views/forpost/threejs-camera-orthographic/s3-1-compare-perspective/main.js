// ---------- ----------
// SCENE, RENDERER, LIGHT
// ---------- ----------
const scene = new THREE.Scene();
scene.background = new THREE.Color(0.25, 0.25, 0.25);
scene.add(new THREE.GridHelper(10,10));
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// CAMERAS
// ---------- ----------
const width = 3.2,
height = 2.4;
const camera_array = [
    // camera 0 will be the typical Perspective Camera
    new THREE.PerspectiveCamera(45, width / height, .5, 100),
    // and camera 1 will be Orthographic
    new THREE.OrthographicCamera(
        -width,
        width,
        height,
        -height,
        .1,
        50)
];
let camera = camera_array[0];
// for each camera
camera_array.forEach(function (camera) {
   // set to same position, and look at the origin
    camera.position.set(5, 5, 5);
    camera.lookAt(0, 0, 0);
    // set zoom
    camera.zoom = .75;
    camera.updateProjectionMatrix();
    scene.add(camera);
    // add orbit controls if there
    if (THREE.OrbitControls) {
        new THREE.OrbitControls(camera, renderer.domElement);
    }
});
// ---------- ----------
// STACK
// ---------- ----------
const stack = CubeStack.create({gx: 7, gy: 4, boxCount: 35});
stack.position.set(0, 0.6, 0)
scene.add(stack);
// ---------- ----------
// LIGHT
// ---------- ----------
const pl = new THREE.PointLight();
pl.position.set(0, 3, 6);
scene.add(pl);
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
const FPS_UPDATE = 20, // fps rate to update ( low fps for low CPU use, but choppy video )
FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
FRAME_MAX = 120;
let secs = 0,
frame = 0,
lt = new Date();
// update
const update = function(frame, frameMax){
    const a1 = frame / frameMax;
    const ci = Math.floor(a1 * 8 % 2);
    camera = camera_array[ci];
    stack.rotation.set(0, Math.PI * 2 * a1, 0);
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