// ---------- ----------
// IMPORT - threejs and any add-ons I want to use
// ---------- ----------
import * as THREE from 'three';
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add( new THREE.GridHelper(10, 10) );
const camera = new THREE.PerspectiveCamera(50, 32 / 24, .025, 100);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// CANVAS ELEMENT, 2D DRAWING CONTEXT
//-------- ----------
const canvas = document.createElement('canvas'), 
ctx = canvas.getContext('2d');
ctx.translate(0.5, 0.5);
canvas.width = 64;
canvas.height = 64;
ctx.lineWidth = 1;
let i = 0;
const len = 8;
const color = new THREE.Color();
while(i < len){
    const r = 0.05 + 0.95 * (i / len);
    const g = (1 - r)  * 0.1;
    color.setRGB(r, g, 0);
    ctx.strokeStyle = color.getStyle();
    const a = 1 + 3 * i;
    const s = canvas.width - a * 2
    ctx.strokeRect(a, a, s, s);
    i += 1;
}
//-------- ----------
// TEXTURE - using a canvas element
//-------- ----------
const texture1 = new THREE.Texture(canvas);
texture1.needsUpdate = true;
const texture2 = texture1.clone();
texture2.magFilter = THREE.NearestFilter;
//-------- ----------
// GEOMETRY, MATERIAL, MESH
//-------- ----------
const geo = new THREE.BoxGeometry(1, 1, 1);
const material1 = new THREE.MeshBasicMaterial({ map: texture1 });
const material2 = new THREE.MeshBasicMaterial({ map: texture2 });
const mesh1 = new THREE.Mesh( geo, material1);
mesh1.position.x = -0.6;
scene.add(mesh1);
const mesh2 = new THREE.Mesh( geo, material2);
mesh2.position.x = 0.6;
scene.add(mesh2);
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(0, 1, 2);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
