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
const len = 20;
while(i < len){
    const radian = Math.PI * 2 * (i / len);
    const x = Math.cos(radian) * 1.5;
    const y = Math.sin(radian) * 1.5;
    const v = new THREE.Vector2(x, y).multiplyScalar(1 + Math.random());
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
const dl = new THREE.DirectionalLight(0xffffff, 0.95);
dl.position.set(1, 0, 3);
scene.add(dl);
scene.add( new THREE.AmbientLight(0xffffff, 0.01) );
const material = new THREE.MeshPhongMaterial({ color: 0x00ffff, specular: 0x8a8a8a, side: THREE.DoubleSide });
const mesh1 = new THREE.Mesh(geometry_1,  material);
scene.add(mesh1);
// ---------- ----------
// RENDER
// ---------- ----------
camera.position.set(5, 5, 5);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
