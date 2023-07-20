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
// SOURCE SCENE OBJECT
// ---------- ----------
const scene_source = new THREE.Scene();
const geometry = new THREE.BufferGeometry();
geometry.copy( new THREE.BoxGeometry(1,1,1) );
const material = new THREE.MeshPhongMaterial({ color: 0xff0000, emissive: 0xffffff, emissiveIntensity: 0.05 });
const mesh_source = new THREE.Mesh( geometry, material );
scene_source.add(mesh_source);
const light_source = new THREE.PointLight(0xffffff, 1);
light_source.position.set( 1, 3, 2);
light_source.name = 'point_light'
scene_source.add(light_source);
const scene_json = JSON.stringify( scene_source.toJSON() );
// logging the JSON text
console.log( scene_json );
// ---------- ----------
// CREATING A SCENE OBJECT FROM THE JSON TEXT
// ---------- ----------
// creating a new mesh from the JSON text
const scene = new THREE.ObjectLoader().parse( JSON.parse( scene_json ) );
// !!! looks like the 'position' prop of child objects is not getting stored.
// that is a problem
const pl = scene.getObjectByName('point_light');
pl.position.set(1, 3, 2);
// ---------- ----------
// RENDER
// ---------- ----------
camera.position.set(2, 2, 2);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
