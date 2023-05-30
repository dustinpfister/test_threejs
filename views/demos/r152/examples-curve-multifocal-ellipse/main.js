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
const foci = [ 
    new THREE.Vector2(-0.200,  0.15), 
    new THREE.Vector2( 2.000, -0.10),
    new THREE.Vector2( 2.100,  0.00)
     ];
let i = 0;
const count = 12;
while(i < count){
    const radius = 0.25 + 1.75 * ( i / count);
    const curve = new MultifocalEllipseCurve(foci, radius);
    const line = new THREE.Line(
        new THREE.BufferGeometry().setFromPoints( curve.getPoints(50) ),
        new THREE.LineBasicMaterial({ linewidth: 4 })
    );
    scene.add(line);
    i += 1;
}
// ---------- ----------
// RENDER
// ---------- ----------
camera.position.set(0, 1, 8);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
