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
// V2ARRAY
// ---------- ----------
const v2array = [
   new THREE.Vector2( 0, 1 ),
   new THREE.Vector2( 1, 0.5 ),
   new THREE.Vector2( 0, -1 )
];
// ---------- ----------
// GEOMETRY
// ---------- ----------
const segments_lathe = 20;
const phi_start = 0;
const phi_length = Math.PI * 2;
const geometry = new THREE.LatheGeometry( v2array, segments_lathe, phi_start, phi_length );
// ---------- ----------
// OBJECTS
// ---------- ----------
const line1 = new THREE.Line(geometry);
scene.add(line1);
// ---------- ----------
// RENDER
// ---------- ----------
camera.position.set(4, 2, 4);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
