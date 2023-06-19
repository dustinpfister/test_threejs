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
// CURVE
// ---------- ----------
const curve = new THREE.CurvePath();

[
  [
       new THREE.Vector3(-5, -5, 5), // start
       new THREE.Vector3(-5, 5, -5), // end
       new THREE.Vector3(10, 5, 0),  // control 1
       new THREE.Vector3(10, -5, 0)  // control 2
  ],
  [
       new THREE.Vector3(-5, 5, -5), // start
       new THREE.Vector3(0, 0, 0), // end
       new THREE.Vector3(-5, 7, 2),  // control 1
       new THREE.Vector3(-5, 3, 8)  // control 2
  ]
].forEach( (data) => {
    const v_start = data[0];
    const v_end = data[1];
    const v_c1 = v_start.clone().lerp(v_end, 0.25).add( data[2] );
    const v_c2 = v_start.clone().lerp(v_end, 0.75).add( data[3] );
    curve.add( new THREE.CubicBezierCurve3(v_start, v_c1, v_c2, v_end) );
});
// ---------- ----------
// SCENE CHILD OBJECTS
// ---------- ----------
scene.add( new THREE.GridHelper( 10,10 ) );
const mesh1 = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 30, 30),
    new THREE.MeshNormalMaterial({ transparent: true }));
scene.add(mesh1);

const geo_points = new THREE.BufferGeometry().setFromPoints(curve.getPoints(90));
const material_points = new THREE.PointsMaterial({ size: 0.2 });
const points = new THREE.Points( geo_points, material_points );
scene.add(points);
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
camera.position.set(10, 5, 10);
camera.lookAt(0, 0, 0);
const FPS_UPDATE = 30, // 30 frames per second
FRAME_MAX = 300,
CLOCK = new THREE.Clock(true); 
let secs = 0,
frame = 0,
lt = CLOCK.getElapsedTime();
// THE DATA OBJECT
const data = {
    bytes_per_frame: '1400',
    frames: []
};
// update
const update = (frame, frameMax) => {
    const a1 = frame / frameMax;
    //const a2 = 1 - Math.abs(0.5 - a1 ) / 0.5;
    //const a3 = THREE.MathUtils.smoothstep(a2, 0, 1);
    mesh1.position.copy( curve.getPoint(a1) );
    // use x for smaples per wavecount
    const a_x = ( mesh1.position.x + 5 ) / 10;
    const samps_per_wavecount = 1 + Math.round( 499 * a_x);
    // using z axis for amp argumnet
    const a_z = ( mesh1.position.z + 5 ) / 10;
    const amp = Math.round(5 + 35 * a_z);
    // (z also effects opacity of mesh )
    mesh1.material.opacity = a_z;
    // might use y for wave count then
    const a_y = ( mesh1.position.y + 5 ) / 10;
    const wavecount = 1 + Math.round(19 * a_y);
    // set arguments for this frame
    data.frames[frame] = [samps_per_wavecount, amp, wavecount];
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