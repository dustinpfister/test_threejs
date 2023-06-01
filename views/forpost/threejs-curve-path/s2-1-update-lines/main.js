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
// UPDATE CURVE PATH
// ---------- ----------
// update curve path
const updateCurvePath = (cp, a_phi = 0, a_theta = 0) => {
    let i = 0;
    const len = cp.curves.length;
    while(i < len){
        const a_child = i / len;
        const curve = cp.curves[i];
        const e = new THREE.Euler();
        e.y = Math.PI * 2 * a_child + Math.PI * 2 * a_phi;
        e.x = Math.PI * 2 * a_theta;
        curve.v1.set(1, 0, 0).applyEuler(e).multiplyScalar(5);
        i += 1;
    }
};
// create points geometry
const createPointsGeometry = (cp, grain=50 ) => {
    return new THREE.BufferGeometry().setFromPoints( curve.getSpacedPoints( grain ) );
};
// update points
const updatePointsGeometry = (geometry, cp) => {
    const att_pos = geometry.getAttribute('position');
    let i = 0;
    while(i < att_pos.count){
        const v = cp.getPoint(i / att_pos.count);
        att_pos.setXYZ( i, v.x, v.y, v.z );
        i += 1;
    }
    att_pos.needsUpdate = true;
};
// ---------- ----------
// CURVE PATH
// ---------- ----------
const v1 = new THREE.Vector3(0, 0, 0);
const v2 = new THREE.Vector3(0, 0, 0);
const v3 = new THREE.Vector3(0, 0, 0);
const curve = new THREE.CurvePath();
curve.add( new THREE.LineCurve3( v1, v2 ) );
curve.add( new THREE.LineCurve3( v2, v3 ) );
curve.add( new THREE.LineCurve3( v3, v1 ) );
updateCurvePath(curve, 0);
// ---------- ----------
// OBJECTS
// ---------- ----------
scene.add( new THREE.GridHelper(10, 10) );
// points
const points1 = new THREE.Points(
    createPointsGeometry(curve, 50),
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
camera.position.set(8, 2, 8);
camera.lookAt(0, 0, 0);
// constant values and state for main app loop
const FPS_UPDATE = 20, // fps rate to update ( low fps for low CPU use, but choppy video )
FPS_MOVEMENT = 30,     // fps rate to move object by that is independent of frame update rate
FRAME_MAX = 900,
CLOCK = new THREE.Clock(true); // USING THREE.Clock in place of new Date() or Date.now()
let secs = 0,
frame = 0,
lt = CLOCK.getElapsedTime();
// update
const update = (frame, frameMax) => {
    const a1 = frame / frameMax;
    const a2 = a1 * 5 % 1;
    const a3 = (a2 + 0.05) % 1;
    const a4 = 1 - Math.abs(0.5 - (a1 * 4 % 1) ) / 0.5;
    const a5 = 1 - Math.abs(0.5 - (a1 * 1 % 1) ) / 0.5;
    updateCurvePath(curve, a4, a5);
    updatePointsGeometry(points1.geometry, curve);
    mesh1.position.copy( curve.getPoint(a2) );
    mesh1.lookAt( curve.getPoint(a3) );
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
