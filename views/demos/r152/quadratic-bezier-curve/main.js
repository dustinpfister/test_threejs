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
// CURVE
// ---------- ----------
const v_start = new THREE.Vector2(0, 0);
const v_end = new THREE.Vector2(5, 2);
const v_control = v_start.clone().lerp(v_end, 0.5).add( new THREE.Vector2(-5, 5) );
const curve = new THREE.QuadraticBezierCurve(v_start, v_control, v_end);
// ---------- ----------
// GEOMETRY
// ---------- ----------
const points_along_curve = 20;
const geometry = new THREE.BufferGeometry().setFromPoints( curve.getPoints( points_along_curve ) );
// ---------- ----------
// SCENE CHILD OBJECTS
// ---------- ----------
const material = new THREE.PointsMaterial({ size: 0.3, color: 0xff0000 });
const points1 = new THREE.Points(geometry, material);
scene.add(points1);
scene.add( new THREE.GridHelper(10, 10) );
// ---------- ----------
// RENDER
// ---------- ----------
camera.position.set(0, 5, 10);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
