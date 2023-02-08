// ---------- ----------
// IMPORT THREEJS and ADDONS
// ---------- ----------
// need to start using import in order to use three.module.js over three.min.js
// need to also use import for addons as examples/js is no more
import * as THREE from 'three';
import { OrbitControls } from 'OrbitControls';
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
scene.add( new THREE.GridHelper( 10,10 ) );
const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshNormalMaterial());
scene.add(mesh);
// ---------- ----------
// CONTROLS
// ---------- ----------
// try catch or some other kind of deal should be done more often then not when using
// an optional add on. There is doing what I can to make sure code examples like this will still work
// when just used with treejs alone, when and where possible.
try{
    const controls = new OrbitControls(camera, renderer.domElement);
}catch(e){
    console.warn('OrbitControls JSM module not loaded.');
}
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
// fixed camera values should be done in the animation loop or render code section
camera.position.set(1.25, 1.25, 1.25);
camera.lookAt(0, 0, 0);
// constant values and state for main app loop
const FPS_UPDATE = 20, // fps rate to update ( low fps for low CPU use, but choppy video )
FPS_MOVEMENT = 30,     // fps rate to move object by that is independent of frame update rate
FRAME_MAX = 120,
CLOCK = new THREE.Clock(true); // USING THREE.Clock in place of new Date() or Date.now()
let secs = 0,
frame = 0,
lt = CLOCK.getElapsedTime();
// update
const update = (frame, frameMax) => {
    // alpha values come up all the time. I have started getting in the habbit of having
    // a Naming pattern for them like this:
    const a1 = frame / frameMax;
    const a2 = 1 - Math.abs(0.5 - a1 ) / 0.5;
    const a3 = THREE.MathUtils.smoothstep(a2, 0, 1);
    // update content
    const degree = 360 * a3
    mesh.rotation.x = THREE.MathUtils.degToRad(degree);
};
// loop
const loop = () => {
    const now = CLOCK.getElapsedTime(),
    secs = (now - lt);
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