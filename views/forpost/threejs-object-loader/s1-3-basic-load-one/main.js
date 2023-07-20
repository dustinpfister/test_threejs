// ---------- ----------
// IMPORT - threejs and any addons I want to use
// ---------- ----------
import * as THREE from 'three';
// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.querySelector('#demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// LOAD, RENDER
// ---------- ----------
const loader = new THREE.ObjectLoader();
const url = '/forpost/threejs-object-loader/s1-3-basic-load-one/scene.json';
const on_done = (obj) => {
    camera.position.set(2, 2, 2);
    camera.lookAt(0, 0, 0);
    renderer.render(obj, camera);
};
loader.load(url, on_done);
