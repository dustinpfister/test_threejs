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
// Verts
// ---------- ----------
const v1 = new THREE.Vector3(0, -2, 0);
const v2 = new THREE.Vector3(0, 2, 0);
// ---------- ----------
// SCENE CHILD OBJECTS
// ---------- ----------
scene.add( new THREE.GridHelper( 10, 10 ) );
// pointer mesh
const mesh_pointer1 = new THREE.Mesh( new THREE.SphereGeometry(0.5, 16, 16), new THREE.MeshBasicMaterial({color: 0xff0000})  );
scene.add(mesh_pointer1);
const mesh_pointer2 = new THREE.Mesh( new THREE.SphereGeometry(0.5, 16, 16), new THREE.MeshBasicMaterial({color: 0x00ff00})  );
scene.add(mesh_pointer2);
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
    script: 'verts',
    
    bytes_per_frame: '1400',
    frames: []
};
// update
const update = (frame, frameMax) => {
    const a1 = frame / (frameMax - 1);

    v1.x = -5 + 10 * a1;
    v1.y = -1 + 2 * Math.sin( Math.PI * 2 * 4 * a1 );
    v1.z = -5;

    const radian2 = Math.PI - Math.PI * a1;
    v2.x = Math.cos( radian2 ) * 5;
    v2.y = 0;
    v2.z = Math.sin( radian2 ) * 5;

    v1.normalize();
    v2.normalize();

    mesh_pointer1.position.copy(v1).multiply( new THREE.Vector3(5,5,5) );
    mesh_pointer2.position.copy(v2).multiply( new THREE.Vector3(5,5,5) );

    // set arguments for this frame
    data.frames[frame] = [ v1.x,v1.y,v1.z,  v2.x,v2.y,v2.z ];
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