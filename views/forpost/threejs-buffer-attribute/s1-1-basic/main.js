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
// BUFFER ATTRIBUTE
// ---------- ----------
const data_pos = [ 0,0,0,  0,1,0,  1,0,0 ];
const array = new Float32Array( data_pos );
const item_size = 3;
const att_pos = new THREE.BufferAttribute( array, item_size );
// ---------- ----------
// GEOMETRY
// ---------- ----------
const geometry = new THREE.BufferGeometry();
geometry.setAttribute('position', att_pos);
// ---------- ----------
// SCENE CHILD OBJECTS
// ---------- ----------
scene.add( new THREE.GridHelper(10, 10) );
const points1 = new THREE.Points( geometry, new THREE.PointsMaterial({ size: 0.25, color: 0x00ff00 }));
scene.add(points1);
// ---------- ----------
// RENDER
// ---------- ----------
camera.position.set( 2, 2, 2 );
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
