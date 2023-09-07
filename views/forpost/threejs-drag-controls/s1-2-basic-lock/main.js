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
// OBJECTS
// ---------- ----------
const geometry = new THREE.BoxGeometry();
const objects = [];
const material = new THREE.MeshNormalMaterial();
const object = new THREE.Mesh(geometry, material);
object.position.set( 0, 0, 0)
scene.add(object);
objects.push(object);
scene.add( new THREE.GridHelper(10, 10) );
// ---------- ----------
// RENDER
// ---------- ----------
const render = function() {
    renderer.render(scene, camera);
};
// ---------- ----------
// CONTROLS / SETUP
// ---------- ----------
camera.position.set(4, 4, 4);
camera.lookAt( 0, 0, 0 );
const controls = new DragControls(objects, camera, renderer.domElement);
const v_locked = new THREE.Vector3( 1,1,0);
const v_lockedAt = new THREE.Vector3();
controls.addEventListener('dragstart', (evnt) => {
    const obj = evnt.object;
    v_lockedAt.copy( obj.position );
});
controls.addEventListener('drag', (evnt) => {
    const obj = evnt.object;
    if(v_locked.x){
        obj.position.x = v_lockedAt.x;
    }
    if(v_locked.y){
        obj.position.y = v_lockedAt.y;
    }
    if(v_locked.z){
        obj.position.z = v_lockedAt.z;
    }
    render();
});
render();
