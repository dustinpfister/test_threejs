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
// GEOMETRY
// ---------- ----------
const geometry = new THREE.SphereGeometry(4, 40, 40);
// ---------- ----------
// SCENE CHILD OBJECTS
// ---------- ----------
scene.add( new THREE.GridHelper( 10, 10 ) );
// points
const material = new THREE.PointsMaterial( { size: 0.25 } );
const points1 = new THREE.Points( geometry, material);
scene.add(points1);
// pointer mesh
const mesh_pointer = new THREE.Mesh( new THREE.SphereGeometry(0.5, 16, 16), new THREE.MeshNormalMaterial()  );
scene.add(mesh_pointer);
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
camera.position.set(10, 5, 10);
camera.lookAt(0, 0, 0);
const FPS_UPDATE = 30, // 30 frames per second
FRAME_MAX = 30,
CLOCK = new THREE.Clock(true); 
let secs = 0,
frame = 0,
lt = CLOCK.getElapsedTime();
// THE DATA OBJECT
const data = {
    script: 'sin_one',
    bytes_per_frame: '1400',
    frames: []
};
// update
const att_pos = geometry.getAttribute('position');

console.log( 'count: ' + att_pos.count );

const update = (frame, frameMax) => {

    const a1 = frame / frameMax;

    const i = Math.floor(a1 * att_pos.count);
    const v = new THREE.Vector3( att_pos.getX(i), att_pos.getY(i), att_pos.getZ(i) );
    mesh_pointer.position.copy(v);

    // use x for smaples per wavecount
    const a_x = ( mesh_pointer.position.x + 5 ) / 10;
    const samps_per_wavecount = 1 + Math.round( 499 * a_x);

    // using z axis for amp argumnet
    const a_z = ( mesh_pointer.position.z + 5 ) / 10;
    const amp = Math.round(5 + 35 * a_z);

    // (z also effects opacity of mesh )
    mesh_pointer.material.opacity = a_z;

    // might use y for wave count then
    const a_y = ( mesh_pointer.position.y + 5 ) / 10;
    const wavecount = 1 + Math.round(19 * a_y);

    // set arguments for this frame
    data.frames[frame] = [ samps_per_wavecount, amp, wavecount ];
};
// loop
const loop = () => {
    if(frame === FRAME_MAX){
        console.log( JSON.stringify(data) );
    }
    if(frame < FRAME_MAX){
        requestAnimationFrame(loop);
        update( Math.floor(frame), FRAME_MAX);
        renderer.render(scene, camera);
        frame += 1;
    }

};
loop();