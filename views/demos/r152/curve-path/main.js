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
const points1 = new THREE.Points(
    new THREE.BufferGeometry().setFromPoints( curve.getSpacedPoints(50) ),
    new THREE.PointsMaterial({ size: 0.4, color: 0xff0000 }));
scene.add(points1);
// ---------- ----------
// RENDER
// ---------- ----------
camera.position.set(8, 8, 8);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
