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
const updateCurvePath = (cp, forType = {}, state = {} ) => {
    let i = 0;
    const len = cp.curves.length;
    while(i < len){
        const curve = cp.curves[i];
        const update = forType[curve.type];
        if(update){
            update(cp, curve, i, len, state);
        }
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
// FOR TYPES
// ---------- ----------
const FOR_CURVE_TYPE = {
    // for line curve 3 type curves
    LineCurve3: ( cp, curve, i, len, state ) => {
        let a_child = i / len;
        const e = new THREE.Euler();
        e.y = Math.PI * 2 * a_child + Math.PI * 2 * state.a1;
        // v1
        curve.v1.set(1, 0, 0).applyEuler(e).multiplyScalar(state.radius);
        a_child = (i + 1 % len) / len;
        // v2
        e.y = Math.PI * 2 * a_child + Math.PI * 2 * state.a1;
        curve.v2.set(1, 0, 0).applyEuler(e).multiplyScalar(state.radius);
    },
    // single control point curve
    QuadraticBezierCurve3: ( cp, curve, i, len, state ) => {
        let a_child = i / len;
        const e = new THREE.Euler();
        e.y = Math.PI * 2 * a_child + Math.PI * 2 * state.a1;
        // start point ( v0 )
        curve.v0.set(1, 0, 0).applyEuler(e).multiplyScalar(state.radius);
        a_child = (i + 1 % len) / len;
        // end point ( v2 ) 
        e.y = Math.PI * 2 * a_child + Math.PI * 2 * state.a1;
        curve.v2.set(1, 0, 0).applyEuler(e).multiplyScalar(state.radius);
        // control point (v1)
        const v_delta = new THREE.Vector3(0, 2 - 4 * state.a2, 0);
        curve.v1.copy(curve.v0).lerp( curve.v2, 0.5 ).add(v_delta);
    }
};
// ---------- ----------
// CURVE PATH
// ---------- ----------
const v1 = new THREE.Vector3(0, 0, 0);
const curve = new THREE.CurvePath();
curve.add( new THREE.LineCurve3( v1.clone(), v1.clone() ) );
curve.add( new THREE.LineCurve3( v1.clone(), v1.clone() ) );
curve.add( new THREE.QuadraticBezierCurve3( v1.clone(), v1.clone() ) );
curve.add( new THREE.LineCurve3( v1.clone(), v1.clone() ) );
curve.add( new THREE.LineCurve3( v1.clone(), v1.clone() ) );
curve.add( new THREE.QuadraticBezierCurve3( v1.clone(), v1.clone(), v1.clone() ) );
updateCurvePath(curve, FOR_CURVE_TYPE, { a1: 0, a2: 0, radius: 5 });
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
    const a2 = a1 * 12 % 1;
    const a3 = (a2 + 0.1) % 1;

    const a4 = 1 - Math.abs(0.5 - (a1 * 8 % 1) ) / 0.5;
    const a5 = 1 - Math.abs(0.5 - (a1 * 20 % 1) ) / 0.5;

    updateCurvePath(curve, FOR_CURVE_TYPE, { a1: a1, a2: a5, radius: 7 - 2 * a4 });


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
