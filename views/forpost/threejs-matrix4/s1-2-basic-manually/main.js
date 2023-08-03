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
// RENDER FIRST TIME
// ---------- ----------
camera.position.set( 2, 2, 2 );
camera.lookAt( mesh_box.position );
renderer.render(scene, camera);
// ---------- ----------
// MATRIX4 UPDATE and RENDER
// ---------- ----------
mesh_box.position.set(-1, 0, -1);
mesh_box.rotation.x = Math.PI / 180 * 45;
mesh_box.scale.set( 2, 2, 2);
mesh_box.matrixAutoUpdate = false;
setTimeout(() => {
    mesh_box.updateMatrix();
    camera.lookAt( mesh_box.position );
    renderer.render(scene, camera);
}, 1000);

