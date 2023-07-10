// ---------- ----------
// IMPORT - threejs and any addons I want to use
// ---------- ----------
import * as THREE from 'three';
import { OrbitControls } from 'OrbitControls';
// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.querySelector('#demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// CLIP
// ---------- ----------
const track = new THREE.VectorKeyframeTrack('.position', [0, 1, 25, 27, 28, 30], [
    0, 0, 0,
   -5, 0, 5,
    5, 0, 5,
    5, 0,-5,
   -5, 0,-5,
    0, 0, 0
]);
const clip = new THREE.AnimationClip('move', -1, [track] );
console.log(clip)
// ---------- ----------
// OBJECT
// ---------- ----------
scene.add( new THREE.GridHelper( 10,10 ) );
const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshNormalMaterial());
scene.add(mesh);
// ---------- ----------
// MIXER/ACTION
// ---------- ----------
const mixer = new THREE.AnimationMixer( mesh )
const action = mixer.clipAction( clip );
//action.startAt(1);
action.play();
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
camera.position.set(10, 10, 10);
camera.lookAt(0, 0, 0);
// constant values and state for main app loop
const FPS_UPDATE = 30, // fps rate to update ( low fps for low CPU use, but choppy video )
FPS_MOVEMENT = 30,     // fps rate to move object by that is independent of frame update rate
FRAME_MAX = 900,
CLOCK = new THREE.Clock(true); // USING THREE.Clock in place of new Date() or Date.now()
let secs = 0,
frame = 0,
lt = CLOCK.getElapsedTime();
// update
const update = (frame, frameMax) => {
    const a1 = frame / frameMax;
    // when it comes to video projects I will often want to use setTime over update
    mixer.setTime( 30 * a1 );
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