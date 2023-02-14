// ---------- ----------
// IMPORT THREEJS and ADDONS
// ---------- ----------
// need to start using import in order to use three.module.js over three.min.js
// need to also use import for addons as examples/js is no more
import * as THREE from 'three';
import { OrbitControls } from 'OrbitControls';
// ---------- ----------
// IMPORT CUSTOM MODULES
// ---------- ----------
import { ShakeMod } from 'ShakeMod';
//-------- ----------
// SCENE, CAMNERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 100);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// GRID HELPER AND MESH OBJECT
//-------- ----------
const gridHelper = new THREE.GridHelper(5, 5);
scene.add(gridHelper);
const box = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial());
box.position.set(0, 0.5, 0);
scene.add(box);
//-------- ----------
// STATE OBJECT INCLDUING SHAKE OBJECT
//-------- ----------
const canvas = renderer.domElement;
const state = {
    fps: 30,
    lt: new Date(),
    shake: ShakeMod.create({
        scene: scene,
        posRange: [1, 5],
        degRange: [20, 45],
        posLock: new THREE.Vector3(1, 0, 1),
        degLock: new THREE.Vector3(0, 1, 0),
        intensity: 1
    })
};
//-------- ----------
// EVENTS
//-------- ----------
const pointerDown = function () {
    state.shake.active = true;
};
const pointerUp = function () {
    state.shake.active = false;
};
const pointerMove = function (shake, canvas) {
    return function (e) {
        e.preventDefault();
        const canvas = e.target,
        box = canvas.getBoundingClientRect(),
        x = e.clientX - box.left,
        y = e.clientY - box.top,
        v2_canvas_center = new THREE.Vector2(canvas.width / 2, canvas.height / 2),
        v2_pointer_pos = new THREE.Vector2(x, y);
        if(shake.active){
            const d = v2_canvas_center.distanceTo(v2_pointer_pos);
            shake.intensity = d / canvas.width;
            shake.intensity = shake.intensity > 1 ? 1 : shake.intensity;
        }
    };
};
// pointer events
renderer.domElement.addEventListener('pointerdown', pointerDown);
renderer.domElement.addEventListener('pointermove', pointerMove(state.shake, canvas));
renderer.domElement.addEventListener('pointerup', pointerUp);
renderer.domElement.addEventListener('pointerout', pointerUp);
//-------- ----------
// UPDATE AND LOOP
//-------- ----------
camera.position.set(5, 5, 5);
camera.lookAt(0, 0, 0);
const update = function (state, secs) {
    ShakeMod.update(state.shake);
};
// loop
const loop = function () {
    const now = new Date();
    const secs = (now - state.lt) / 1000;
    requestAnimationFrame(loop);
    if (secs > 1 / state.fps) {
        update(state, secs);
        renderer.render(scene, camera);
        state.lt = now;
    }
};
loop();
