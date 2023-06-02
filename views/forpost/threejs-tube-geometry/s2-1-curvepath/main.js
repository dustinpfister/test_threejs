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
// ---------- ----------
// CURVE Path
// ---------- ----------
let i = 0;
const len = 4;
const curve_path = new THREE.CurvePath();
const cp_radius = 4;
while(i < len){
    const a_child = i / len;

    const y = -0.5 + 1 * a_child;
    const v_start = getCircleVector(i, 0, len, cp_radius, y);
    const v_end = getCircleVector(i, 1, len, cp_radius, y);

    const c_radius = cp_radius * 1.0 + 2 * a_child;
    const v_control1 = getCircleVector(i, 0.25, len, c_radius, y);
    const v_control2 = getCircleVector(i, 0.75, len, c_radius, y);
    curve_path.add(new THREE.CubicBezierCurve3(v_start, v_control1, v_control2, v_end));
    i += 1;
}
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
