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
const v2array = [
    new THREE.Vector2(0, 3),
    new THREE.Vector2(-1, 0),
    new THREE.Vector2(1, 0)
];
// ---------- ----------
// OBJECTS
// ---------- ----------
const shape = new THREE.Shape( v2array );
const mesh1 = new THREE.Mesh(
    new THREE.ExtrudeGeometry(shape, { bevelEnabled: false } ),
    new THREE.MeshNormalMaterial());
scene.add(mesh1);
scene.add( new THREE.GridHelper( 10,10 ) );
// ---------- ----------
// RENDER
// ---------- ----------
camera.position.set(8, 8, 8);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
