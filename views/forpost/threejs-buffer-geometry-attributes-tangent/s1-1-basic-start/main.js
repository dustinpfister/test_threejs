// ---------- ----------
// IMPORT - threejs and any addons I want to use
// ---------- ----------
import * as THREE from 'three';
import { OrbitControls } from 'OrbitControls';
// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.querySelector('#demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// GEOMETRY - TetrahedronGeometry
// ---------- ----------
const geometry1 = new THREE.TetrahedronGeometry(1, 0);
// ---------- ----------
// GEOMETRY - custom
// ---------- ----------
const geometry2 = new THREE.BufferGeometry();
const data_pos = [ 0,1,0,    0,0,1,    1,0,-1,    -1,0,-1 ];
geometry2.setAttribute('position', new THREE.BufferAttribute( new Float32Array( data_pos ), 3 ) );
geometry2.setIndex( [0,1,2,0,2,3,0,3,1,1,3,2] );
geometry2.computeVertexNormals();
const data_uv = [ 0.5, 0.5,    0,0,    1,1,    0,1];
geometry2.setAttribute('uv', new THREE.BufferAttribute( new Float32Array( data_uv ), 2 ) );
// ---------- ----------
// MATERIAL
// ---------- ----------
const material = new THREE.MeshNormalMaterial();
// ---------- ----------
// OBJECTS
// ---------- ----------
scene.add( new THREE.GridHelper( 10,10 ) );
const mesh1 = new THREE.Mesh( geometry1, material);
mesh1.position.x = -3;
scene.add(mesh1);
const mesh2 = new THREE.Mesh( geometry2, material);
scene.add(mesh2);
// ---------- ----------
// RENDER
// ---------- ----------
camera.position.set(3, 2, 5);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
