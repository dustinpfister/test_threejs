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
mesh_source.rotation.x = Math.PI / 180 * 60;
mesh_source.scale.set(1, 0.5, 0.25);
mesh_source.position.set(-3,0,-2)
// using compose to set the matrix of the mesh
mesh_source.matrix.compose(mesh_source.position, mesh_source.quaternion, mesh_source.scale);
scene_source.add(mesh_source);
const light_source = new THREE.PointLight(0xffffff, 1);
light_source.position.set( 1, 3, 2);
// using compose to set the matrix of the point light
light_source.matrix.compose(light_source.position, light_source.quaternion, light_source.scale);
console.log(light_source.matrix);
scene_source.add(light_source);
const scene_json = JSON.stringify( scene_source.toJSON() );
// logging the JSON text
console.log( scene_json );
// ---------- ----------
// CREATING A SCENE OBJECT FROM THE JSON TEXT
// ---------- ----------
const scene = new THREE.ObjectLoader().parse( JSON.parse( scene_json ) );
// ---------- ----------
// RENDER
// ---------- ----------
camera.position.set(2, 2, 2);
camera.lookAt(-3, 0, -3);
renderer.render(scene, camera);
