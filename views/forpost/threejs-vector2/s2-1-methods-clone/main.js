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
// CURVE/V2ARRAY
// ---------- ----------
const v1 = new THREE.Vector2( 0, -1 );
const v2 = new THREE.Vector2( 0.1, 1 );
const vc1 = v2.clone().lerp(v2, 0.5).add( new THREE.Vector2(1, 0) );
// using clone to create the control point
const curve = new THREE.QuadraticBezierCurve(v1, vc1, v2)

const v2array_1 = curve.getPoints(20)
const v2array_2 = v2array_1.map( (v, i, arr) => {
    const a_child = i / arr.length;
    const a_2 = a_child * 8 % 1;
    const radian = Math.PI * 0.25 * a_2;
    const dx = Math.cos(radian) * 0.25;
    const dy = a_child * -0.25;
    return v.clone().add( new THREE.Vector2(dx, dy) );
});
// ---------- ----------
// GEOMETRY
// ---------- ----------
const segments_lathe = 80;
const phi_start = 0;
const phi_length = Math.PI * 2;
const geometry_1 = new THREE.LatheGeometry( v2array_1, segments_lathe, phi_start, phi_length );
const geometry_2 = new THREE.LatheGeometry( v2array_2, segments_lathe, phi_start, phi_length );
// ---------- ----------
// OBJECTS
// ---------- ----------
const dl = new THREE.DirectionalLight(0xffffff, 0.95);
dl.position.set(1, 0, 3)
scene.add(dl);
scene.add( new THREE.AmbientLight(0xffffff, 0.01) );
const material = new THREE.MeshPhongMaterial({ color: 0x00ff00, specular: 0x8a8a8a, side: THREE.DoubleSide });
const mesh1 = new THREE.Mesh(geometry_1,  material);
scene.add(mesh1);
const mesh2 = new THREE.Mesh(geometry_2, material );
mesh2.position.x = -2;
scene.add(mesh2);
// ---------- ----------
// RENDER
// ---------- ----------
camera.position.set(2, 2, 2);
camera.lookAt(-1, 0, 0);
renderer.render(scene, camera);
