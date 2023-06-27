// ---------- ----------
// IMPORT - threejs and any add-ons I want to use
// ---------- ----------
import * as THREE from 'three';
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, .025, 100);
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
const gradient = ctx.createLinearGradient(0, 0, 32, 32);
gradient.addColorStop(0.0, 'red');
gradient.addColorStop(0.5, 'green');
gradient.addColorStop(1.0, 'blue');
ctx.fillStyle = gradient;
ctx.fillRect(0,0, canvas.width, canvas.height);
//-------- ----------
// TEXTURE - Using wraps wrapt and other features for having a repeating background
//-------- ----------
const texture_bg = new THREE.Texture(canvas);
texture_bg.needsUpdate = true;
texture_bg.wrapS = THREE.RepeatWrapping;
texture_bg.wrapT = THREE.RepeatWrapping;
texture_bg.offset.set(0.5, 0.5);
texture_bg.repeat.set(4, 4);
//-------- ----------
// USING TEXTURE AS BACKGROUND
//-------- ----------
scene.background = texture_bg;
scene.add( new THREE.GridHelper(10, 10, 0xffffff, 0xffffff) );
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(3, 3, 3);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
