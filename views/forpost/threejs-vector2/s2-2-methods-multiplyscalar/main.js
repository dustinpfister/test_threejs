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
const v2array_1 = [];
let i = 0; 
const len = 120;
while(i < len){
    const a_child = i / len;
    const radian = Math.PI * 2 * a_child;
    const x = Math.cos(radian);
    const y = Math.sin(radian);
    const m = 2 + Math.sin(Math.PI * 1.5 * (a_child * 8 % 1)  );
    const v = new THREE.Vector2(x, y).multiplyScalar(m);
    v2array_1.push(v);
    i += 1;
}
// ---------- ----------
// SHAPE/GEOMETRY
// ---------- ----------
const shape = new THREE.Shape(v2array_1);
const geometry_1 = new THREE.ExtrudeGeometry( shape );
// ---------- ----------
// OBJECTS
// ---------- ----------
const material = new THREE.MeshNormalMaterial();
const mesh1 = new THREE.Mesh(geometry_1,  material);
scene.add(mesh1);
// ---------- ----------
// RENDER
// ---------- ----------
camera.position.set(5, 5, 5);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
