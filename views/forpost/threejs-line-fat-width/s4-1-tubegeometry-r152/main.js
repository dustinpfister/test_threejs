// ---------- ----------
// IMPORT - threejs and any addons I want to use
// ---------- ----------
import * as THREE from 'three';
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.background = new THREE.Color(0, 1, 1);
const camera = new THREE.PerspectiveCamera(50, 640 / 480, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
// ---------- ----------
// CURVE
// ---------- ----------
const v_start = new THREE.Vector3(-5,0,0);
const v_end = new THREE.Vector3(5,0,0);
const v_control = v_start.clone().lerp(v_end, 0.5).add( new THREE.Vector3(-4,3,-5) );
const curve = new THREE.QuadraticBezierCurve3(v_start, v_control, v_end);
// ---------- ----------
// GEOMETRY
// ---------- ----------
const tubular_segments = 32;
const radius = 0.4;
const radial_segments = 16;
const closed = false;
const geometry = new THREE.TubeGeometry(curve, tubular_segments, radius, radial_segments, closed);
// ---------- ----------
// SCENE CHILD OBJECTS
// ---------- ----------
// grid
scene.add( new THREE.GridHelper(10, 10) );
// light
const dl = new THREE.DirectionalLight(0xffffff, 1);
dl.position.set(7, -1.5, 3);
scene.add(dl);
// mesh
const material = new THREE.MeshPhongMaterial({ side: THREE.DoubleSide });
const mesh1 = new THREE.Mesh(geometry, material);
scene.add(mesh1);
// ---------- ----------
// RENDER
// ---------- ----------
camera.position.set(5.5, 2, 5.25);
camera.lookAt(2, 0, 0);
renderer.render(scene, camera);
