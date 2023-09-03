// ---------- ----------
// IMPORT - threejs and any addons I want to use
// ---------- ----------
import * as THREE from 'three';
import * as BufferGeometryUtils from 'BufferGeometryUtils';
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add( new THREE.GridHelper(10, 10) );
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// GEOMETRY
//-------- ----------
const geometry_1 = new THREE.PlaneGeometry(1, 1, 1, 1);
const geometry_2 = new THREE.PlaneGeometry(1, 1, 10, 10);
console.log( BufferGeometryUtils.estimateBytesUsed( geometry_1 ) ); // 140
console.log( BufferGeometryUtils.estimateBytesUsed( geometry_2 ) ); // 5072
//-------- ----------
// GEOMETRY
//-------- ----------
const material = new THREE.MeshNormalMaterial({ wireframe: true, wireframeLinewidth: 3 });
const mesh1 = new THREE.Mesh( geometry_1, material);
scene.add(mesh1);
const mesh2 = new THREE.Mesh( geometry_2, material);
mesh2.position.x = -2;
scene.add(mesh2);
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(2, 1, 3);
camera.lookAt( 0, 0, 0 );
renderer.render(scene, camera);