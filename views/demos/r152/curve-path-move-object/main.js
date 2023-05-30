// ---------- ----------
// IMPORT - threejs and any addons I want to use
// ---------- ----------
import * as THREE from 'three';
// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.querySelector('#demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// CURVE PATH
// ---------- ----------
const v1 = new THREE.Vector3(-4, 0, 3);
const v2 = new THREE.Vector3(3, 0, 3);
const v3 = new THREE.Vector3(-4, 0, -5);
const vc1 = v2.clone().lerp(v3, 0.5).add( new THREE.Vector3(4,0,-1) );
const curve = new THREE.CurvePath();
curve.add( new THREE.LineCurve3( v1, v2 ) );
curve.add( new THREE.QuadraticBezierCurve3( v2, vc1, v3 ) );
curve.add( new THREE.LineCurve3( v3, v1 ) );


// ---------- ----------
// OBJECTS
// ---------- ----------
scene.add( new THREE.GridHelper(10, 10) );
// points
const points1 = new THREE.Points(
    new THREE.BufferGeometry().setFromPoints( curve.getSpacedPoints(50) ),
    new THREE.PointsMaterial({ size: 0.4, color: 0xff0000 }));
scene.add(points1);
// mesh object
const mesh1 = new THREE.Mesh(
    new THREE.ConeGeometry( 0.5, 2, 20, 20),
    new THREE.MeshNormalMaterial()
);
mesh1.geometry.rotateX(Math.PI * 0.5);

scene.add(mesh1);
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
camera.position.set(8, 8, 8);
camera.lookAt(0, 0, 0);
// constant values and state for main app loop
const FPS_UPDATE = 20, // fps rate to update ( low fps for low CPU use, but choppy video )
FPS_MOVEMENT = 30,     // fps rate to move object by that is independent of frame update rate
FRAME_MAX = 400,
CLOCK = new THREE.Clock(true); // USING THREE.Clock in place of new Date() or Date.now()
let secs = 0,
frame = 0,
lt = CLOCK.getElapsedTime();
// update
const update = (frame, frameMax) => {
    const a1 = frame / frameMax;
    const a2 = (a1 + 0.05) % 1;
    mesh1.position.copy( curve.getPoint(a1) );
    mesh1.lookAt( curve.getPoint(a2) );
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
