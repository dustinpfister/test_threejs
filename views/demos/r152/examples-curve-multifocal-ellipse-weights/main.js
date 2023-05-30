// ---------- ----------
// IMPORT - threejs and any addons I want to use
// ---------- ----------
import * as THREE from 'three';
import { MultifocalEllipseCurve } from 'MultifocalEllipseCurve';
// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.querySelector('#demo') || document.body).appendChild(renderer.domElement);
scene.add( new THREE.GridHelper( 10,10 ) );
// ---------- ----------
// CURVES
// ---------- ----------
const curve = new MultifocalEllipseCurve();
const line = new THREE.Line(
    new THREE.BufferGeometry().setFromPoints( curve.getPoints(24) ),
    new THREE.LineBasicMaterial({ linewidth: 4 })
);
scene.add(line);
// ---------- ----------
// RENDER
// ---------- ----------
camera.position.set(0, 1, 10);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
