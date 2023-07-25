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
(document.querySelector('#demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// MATERIAL LOADER - parse a material in the form of a hard coded string
// ---------- ----------
const str_material = `
{
    "metadata": {
        "version": 4.5,
        "type": "Material",
        "generator": "Hand Coded"
    },
    "type": "MeshNormalMaterial"
}
`
const material = new THREE.MaterialLoader().parse( JSON.parse(str_material) );
// ---------- ----------
// OBJECTS
// ---------- ----------
scene.add( new THREE.GridHelper( 10,10 ) );
const mesh = new THREE.Mesh( new THREE.BoxGeometry(1, 1, 1), material );
scene.add(mesh);
// ---------- ----------
// RENDER
// ---------- ----------
camera.position.set(2, 2, 2);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
