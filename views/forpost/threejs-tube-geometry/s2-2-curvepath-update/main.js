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
    const len = 4;
    const curve_path = new THREE.CurvePath();
    while(i < len){
        const curve = new THREE.CubicBezierCurve3();
        updateCurve(i, len, curve, 4, 4.5)
        curve_path.add( curve );
        i += 1;
    }
    return curve_path;
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
// RENDER
// ---------- ----------
camera.position.set(8, 8, 8);
camera.lookAt(2, 0, 0);
renderer.render(scene, camera);
