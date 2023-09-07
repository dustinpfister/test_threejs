// ---------- ----------
// IMPORT - threejs and any addons I want to use
// ---------- ----------
import * as THREE from 'three';
import {
    DragControls
}
from 'DragControls';
// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(70, 32 / 24, 0.1, 500);
const container = document.querySelector('#demo') || document.body;
const renderer = new THREE.WebGL1Renderer({antialias: true});
renderer.setSize(640, 480, false);
container.appendChild(renderer.domElement);
// ---------- ----------
// INIT
// ---------- ----------
const  group = new THREE.Group();
scene.add(group);

let controls;
let enableSelection = false;
const objects = [];
const mouse = new THREE.Vector2(), raycaster = new THREE.Raycaster();
init();
function init() {
    camera.position.z = 30;
    scene.add( new THREE.AmbientLight(0xaaaaaa, 0.1) );
    const dl = new THREE.DirectionalLight(0xffffff, 1);
    scene.add(dl);
    const geometry = new THREE.BoxGeometry();
    for (let i = 0; i < 200; i++) {
        const object = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({
                    color: Math.random() * 0xffffff
                }));
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
    controls = new DragControls([...objects], camera, renderer.domElement);
    controls.addEventListener('drag', render);
    window.addEventListener('resize', onWindowResize);
    document.addEventListener('click', onClick);
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    render();
};
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    render();
}

function onKeyDown(event) {
    enableSelection = (event.keyCode === 16) ? true : false;
}

function onKeyUp() {
    enableSelection = false;
}

function onClick(event) {
    event.preventDefault();
    if (enableSelection === true) {
        const draggableObjects = controls.getObjects();
        draggableObjects.length = 0;
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y =  - (event.clientY / window.innerHeight) * 2 + 1;
        raycaster.setFromCamera(mouse, camera);
        const intersections = raycaster.intersectObjects(objects, true);
        if (intersections.length > 0) {
            const object = intersections[0].object;
            if (group.children.includes(object) === true) {
                object.material.emissive.set(0x000000);
                scene.attach(object);
            } else {
                object.material.emissive.set(0xaaaaaa);
                group.attach(object);
            }
            controls.transformGroup = true;
            draggableObjects.push(group);
        }
        if (group.children.length === 0) {
            controls.transformGroup = false;
            draggableObjects.push(...objects);
        }
    }
    render();
}

function render() {
    renderer.render(scene, camera);
}
