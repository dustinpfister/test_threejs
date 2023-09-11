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
// GEOMETRY
// ---------- ----------
const vertices = [
    1,1,1,    -1,1,1,    1,-1,1,   1,1,-1
];
const indices_of_faces = [
    0,1,2,
    0,3,1,
    0,2,3,
    1,2,3
];
const radius = 1;
const detail = 3;
const geometry = new THREE.PolyhedronGeometry(vertices, indices_of_faces, radius, detail);
// ---------- ----------
// OBJECTS
// ---------- ----------
const mesh1 = new THREE.Mesh(geometry, new THREE.MeshNormalMaterial({ side: THREE.DoubleSide }) );
scene.add(mesh1);
// ---------- ----------
// RENDER
// ---------- ----------
camera.position.set(2, 1, 2);
camera.lookAt(0, 0.2, 0);
renderer.render(scene, camera);
