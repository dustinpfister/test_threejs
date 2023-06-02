// ---------- ----------
// IMPORT - threejs and any addons I want to use
// ---------- ----------
import * as THREE from 'three';
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 640 / 480, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
// ---------- ----------
// HELPER FUNCTIONS
// ---------- ----------
const getBiasAlpha = (a1 = 0, count = 1) => {
    return 1 - Math.abs( 0.5 - (a1 * count % 1)) / 0.5;
};
const getCircleVector = (i = 0, id = 0, len = 4, radius = 4, y = 0) => {
    const radian = Math.PI * 2 * ( (i + id) % len / len);
    const x = Math.cos(radian) * radius,
    z = Math.sin(radian) * radius;
    return new THREE.Vector3( x, y, z );
};
// update a single curve
const updateCurve = (i, len, curve, radius_path = 2, radius_control = 3) => {
    const y = 0;
    curve.v0.copy(  getCircleVector(i, 0, len, radius_path, y) );
    curve.v3.copy( getCircleVector(i, 1, len, radius_path, y) );
    curve.v1.copy( getCircleVector(i, 0.25, len, radius_control, y) );
    curve.v2.copy( getCircleVector(i, 0.75, len, radius_control, y) );
};
// create a curve path
const createCurvePath = () => {
    let i = 0;
    const len = 8;
    const curve_path = new THREE.CurvePath();
    while(i < len){
        const curve = new THREE.CubicBezierCurve3();
        updateCurve(i, len, curve, 4, 4.5)
        curve_path.add( curve );
        i += 1;
    }
    return curve_path;
};
const updateCurvePath = (curve_path, radius_path = 2, radius_control = 3) => {
    let i = 0;
    const len = 8;
    while(i < len){
        const curve = curve_path.curves[i];
        updateCurve(i, len, curve, radius_path, radius_control);
        i += 1;
    }
    return curve_path;
};
// update points
const updateGeometry = (geometry, geometry_source) => {
    const att_p = geometry.getAttribute('position');
    const att_ps = geometry_source.getAttribute('position');
    let i = 0;
    while(i < att_p.count){
        att_p.setXYZ( i, att_ps.getX(i), att_ps.getY(i),att_ps.getZ(i) );
        i += 1;
    }
    att_p.needsUpdate = true;
    geometry.computeVertexNormals();
};
// ---------- ----------
// CURVE Path
// ---------- ----------
const curve_path = createCurvePath();
// ---------- ----------
// GEOMETRY
// ---------- ----------
const tubular_segments = 32;
const radius = 0.75;
const radial_segments = 16;
const closed = true;
const geometry = new THREE.TubeGeometry(curve_path, tubular_segments, radius, radial_segments, closed);
// ---------- ----------
// SCENE CHILD OBJECTS
// ---------- ----------
scene.add( new THREE.GridHelper(10, 10) );
const material = new THREE.MeshNormalMaterial();
const mesh1 = new THREE.Mesh(geometry, material);
scene.add(mesh1);
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
camera.position.set(8, 8, 8);
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
    const a2 = getBiasAlpha(a1, 16);
    const a3 = getBiasAlpha(a1, 8);
    updateCurvePath(curve_path, 5 + 1 * a2, 6 - 1 * a2);
    const geometry_target = new THREE.TubeGeometry(curve_path, tubular_segments, radius, radial_segments, closed);
    updateGeometry(geometry, geometry_target);
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
