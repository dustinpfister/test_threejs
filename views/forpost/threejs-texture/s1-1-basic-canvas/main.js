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
camera.position.set(1.25, 1.25, 1.25);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// CANVAS ELEMENT, 2D DRAWING CONTEXT
//-------- ----------
const canvas = document.createElement('canvas'), 
ctx = canvas.getContext('2d');
canvas.width = 32;
canvas.height = 32;
ctx.fillStyle = '#0a0a0a';
ctx.fillRect(0,0, canvas.width, canvas.height);
ctx.lineWidth = 5;
ctx.strokeStyle = '#ff0000';
ctx.strokeRect(4, 4, canvas.width - 8, canvas.height - 8);
//-------- ----------
// TEXTURE - using a canvas element
//-------- ----------
const texture = new THREE.Texture(canvas);
texture.needsUpdate = true;
texture.magFilter = THREE.NearestFilter;
texture.minFilter = THREE.NearestFilter;
//-------- ----------
// GEOMETRY, MATERIAL, MESH
//-------- ----------
const geo = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ map: texture });
const mesh = new THREE.Mesh( geo, material);
scene.add(mesh);
//-------- ----------
// RENDER
//-------- ----------
renderer.render(scene, camera);
