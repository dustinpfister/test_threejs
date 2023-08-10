// ---------- ----------
// IMPORT - threejs and any addons I want to use
// ---------- ----------
import * as THREE from 'three';
//-------- ----------
// SCENE CAMERA RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, 4 / 3, 0.5, 10);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// DATA 
//-------- ----------
const size = 32;
const index_max = 9;
const v2_center = new THREE.Vector2(size * 0.5, size * 0.5);
const data_indexed = [ ];
let i = 0;
const len = size * size;
while(i < len){
    const v2 = new THREE.Vector2( i % size, Math.floor( i / size) );
    const d = v2.distanceTo( v2_center );
    const a_dist = d / (size / 2);
    let color_index = 1 - a_dist;
    color_index = color_index < 0 ? 0 : color_index;
    color_index = color_index > index_max ? index_max : color_index;
    data_indexed.push( color_index );
    i += 1;
}
const data = data_indexed.map( ( color_index ) => {
    const v = Math.round(color_index / index_max * 255);
    return [ v, v, v, 255];
}).flat();
const texture = new THREE.DataTexture( new Uint8Array( data ), size, size );
texture.needsUpdate = true;
//-------- ----------
// MATCAP MATERIAL
//-------- ----------
const material = new THREE.MeshMatcapMaterial({
    color: 0xffffff,
    matcap: texture
});
//-------- ----------
// SCENE CHILD OBJECTS
//-------- ----------
scene.add( new THREE.GridHelper(10, 10))
scene.add( new THREE.Mesh( new THREE.SphereGeometry(1, 30, 30), material ) );
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(2, 2, 2);
camera.lookAt(0, -0.10, 0);
renderer.render(scene, camera);
