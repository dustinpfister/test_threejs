// ---------- ----------
// IMPORT - threejs and any addons I want to use
// ---------- ----------
import * as THREE from 'three';
import { DragControls } from 'DragControls';
// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(70, 32 / 24, 0.1, 500);
const container = document.querySelector('#demo') || document.body;
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
container.appendChild(renderer.domElement);
// ---------- ----------
// LIGHT
// ---------- ----------
scene.add(new THREE.AmbientLight(0xaaaaaa, 0.1));
const dl = new THREE.DirectionalLight(0xffffff, 1);
scene.add(dl);
// ---------- ----------
// OBJECTS
// ---------- ----------
const geometry = new THREE.BoxGeometry();
const objects = [];
for (let i = 0; i < 100; i++) {
    const material = new THREE.MeshPhongMaterial({
        color: Math.random() * 0xffffff
    });
    const object = new THREE.Mesh(geometry, material);
    object.position.x = Math.random() * 30 - 15;
    object.position.y = Math.random() * 15 - 7.5;
    object.position.z = Math.random() * 20 - 10;
    object.rotation.x = Math.random() * 2 * Math.PI;
    object.rotation.y = Math.random() * 2 * Math.PI;
    object.rotation.z = Math.random() * 2 * Math.PI;
    object.scale.x = Math.random() * 2 + 1;
    object.scale.y = Math.random() * 2 + 1;
    object.scale.z = Math.random() * 2 + 1;
    object.castShadow = true;
    object.receiveShadow = true;
    scene.add(object);
    objects.push(object);
}
// ---------- ----------
// RENDER
// ---------- ----------
function render() {
    renderer.render(scene, camera);
};
// ---------- ----------
// CONTROLS / SETUP
// ---------- ----------
const controls = new DragControls([...objects], camera, renderer.domElement);
controls.addEventListener('drag', render);
camera.position.z = 30;
render();

