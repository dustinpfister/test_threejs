// ---------- ----------
// IMPORT - threejs and any addons I want to use
// ---------- ----------
import * as THREE from 'three';
import { OrbitControls } from 'OrbitControls';
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 320 / 240, 0.5, 10);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// TEXTURE
//-------- ----------
const data_texture = [
      0,  0,  0,  0,    255,255,255,128,    255,255,255,128,      0,  0,  0,  0,
    255,255,255,128,    255,255,255,255,    255,255,255,255,    255,255,255,128,
    255,255,255,255,    255,255,255,255,    255,255,255,255,    255,255,255,255,
    255,255,255,255,    255,255,255,255,    255,255,255,255,    255,255,255,255
];
const texture = new THREE.DataTexture( new Uint8Array(data_texture), 4, 4 );
texture.needsUpdate = true;
//-------- ----------
// SPRITE MATERIAL
//-------- ----------
const material = new THREE.SpriteMaterial({
    map: texture
});
//-------- ----------
// SPRITE
//-------- ----------
const sprite = new THREE.Sprite(  material );
sprite.scale.set( 1.2, 0.9, 1);
scene.add(sprite);
//-------- ----------
// OTHER OBJECTS
//-------- ----------
scene.add( new THREE.GridHelper(10, 10) )
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(2,2,2);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
