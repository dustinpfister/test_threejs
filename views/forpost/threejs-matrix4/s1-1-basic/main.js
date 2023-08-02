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
(document.querySelector('#demo') || document.body).appendChild( renderer.domElement );
// ---------- ----------
// OBJECTS
// ---------- ----------
scene.add( new THREE.GridHelper(10, 10) );
const mesh_box = new THREE.Mesh( new THREE.BoxGeometry( 1, 1, 1 ), new THREE.MeshNormalMaterial() );
scene.add(mesh_box);
// ---------- ----------
// MATRIX4
// ---------- ----------
const matrix = new THREE.Matrix4();
// using the compose method, and Object3d.applyMatrix4
const v3_pos = new THREE.Vector3(0, 0.8, 0);
const q_ori = new THREE.Quaternion().setFromEuler( new THREE.Euler( 1, -0.5, 0) );
const v3_scale = new THREE.Vector3( 1, 0.1, 1 );
matrix.compose(v3_pos, q_ori, v3_scale);
mesh_box.applyMatrix4( matrix );
// ---------- ----------
// RENDER
// ---------- ----------
camera.position.set( 2, 2, 2 );
camera.lookAt( mesh_box.position );
renderer.render(scene, camera);
