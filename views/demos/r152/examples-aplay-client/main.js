// ---------- ----------
// IMPORT - threejs and any addons I want to use
// ---------- ----------
import * as THREE from 'three';
import { OrbitControls } from 'OrbitControls';
// ---------- ----------
// HELPERS
// ---------- ----------


// ---------- ----------
// SCENE, CAMERA, RENDERER, 2D CANVAS
// ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(320, 240, false);
renderer.setClearColor(0x00ffff, 0.05);
const canvas_2d = document.createElement('canvas');
const ctx = canvas_2d.getContext('2d');
canvas_2d.width = 640;
canvas_2d.height = 480;
(document.querySelector('#demo') || document.body).appendChild(canvas_2d);
// ---------- ----------
// sample array
// ---------- ----------
const sample_array = [];

let i = 0;
const sample_count = 8000 * 10;
while(i < sample_count){
    const a_wave = i / sample_count * 30 % 1;
    const n = Math.round( 127.5 + Math.sin( Math.PI * a_wave ) * 60 )
    sample_array.push( n );
    i += 1;
}

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
FRAME_MAX = 30,
CLOCK = new THREE.Clock(true); 
let secs = 0,
frame = 0,
lt = CLOCK.getElapsedTime();
// update
const update = (frame, frameMax) => {
    const a1 = frame / frameMax;
};
// render
const render = () => {
    // background
    ctx.fillStyle = 'black';
    ctx.fillRect(0,0, canvas_2d.width, canvas_2d.height)

    // draw webgl renderer state
    renderer.render(scene, camera);
    ctx.drawImage( renderer.domElement, 32, 32, 320, 240);

    // other info

};
// loop
const loop = () => {

    if(frame === FRAME_MAX){
        const text = JSON.stringify(sample_array);
        document.getElementById('raw').value = text;


    }


    if(frame < FRAME_MAX){
        requestAnimationFrame(loop);
        update( Math.floor(frame), FRAME_MAX);
        render();
        frame += 1;
    }
};
loop();