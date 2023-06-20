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
// SCENE CHILD OBJECTS
// ---------- ----------
scene.add( new THREE.GridHelper(10, 10) );
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
camera.position.set(9, 5, 9);
camera.lookAt(0, 0, 0);
const FPS_UPDATE = 30,
FRAME_MAX = 300,
CLOCK = new THREE.Clock(true); 
let secs = 0,
frame = 0,
lt = CLOCK.getElapsedTime();
// update
const update = (frame, frameMax) => {
    const a1 = frame / frameMax;

};
// loop
const loop = () => {
    if(frame < FRAME_MAX){
        requestAnimationFrame(loop);
        update( Math.floor(frame), FRAME_MAX);
        renderer.render(scene, camera);
        frame += 1;
    }
};
loop();