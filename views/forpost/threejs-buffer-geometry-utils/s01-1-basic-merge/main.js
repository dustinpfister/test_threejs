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
const geometry = BufferGeometryUtils.mergeGeometries([ new THREE.SphereGeometry(1, 30, 30), new THREE.BoxGeometry(1.4, 1.4, 1.4) ])
//-------- ----------
// GEOMETRY
//-------- ----------
const mesh = new THREE.Mesh( geometry, new THREE.MeshNormalMaterial() );
scene.add(mesh);
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(2, 1, 3);
camera.lookAt( 0, 0, 0 );
renderer.render(scene, camera);