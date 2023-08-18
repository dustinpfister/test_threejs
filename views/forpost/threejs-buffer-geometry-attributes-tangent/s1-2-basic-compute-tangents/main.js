// ---------- ----------
// IMPORT - threejs and any addons I want to use
// ---------- ----------
import * as THREE from 'three';
import { OrbitControls } from 'OrbitControls';
// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.querySelector('#demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// GEOMETRY
// ---------- ----------
const geometry = new THREE.BufferGeometry();
const data_pos = [ 0,1,0,    0,0,1,    1,0,-1,    -1,0,-1 ];
geometry.setAttribute('position', new THREE.BufferAttribute( new Float32Array( data_pos ), 3 ) );
geometry.setIndex( [0,1,2,0,2,3,0,3,1,1,3,2] );
geometry.computeVertexNormals();
const data_uv = [ 0.5, 0.5,    0,0,    1,1,    0,1];
geometry.setAttribute('uv', new THREE.BufferAttribute( new Float32Array( data_uv ), 2 ) );
geometry.computeTangents();
// ---------- ----------
// TEXTURE FOR NORMAL MAP
// ---------- ----------
const data_normalmap = [
    255,0,0,255,    0,0,0,255,    0,0,0,255,    0,0,0,255,
    0,255,0,255,    0,255,0,255,  0,0,0,255,    0,0,0,255,
    0,0,0,255,    0,255,0,255,  0,255,0,255,  0,0,0,255,
    0,255,0,255,    0,255,0,255,  0,255,0,255,  0,255,0,255
];
const texture_normal = new THREE.DataTexture( new Uint8Array( data_normalmap ), 4,  4 );
texture_normal.needsUpdate = true;
// ---------- ----------
// MATERIAL
// ---------- ----------
const material = new THREE.MeshNormalMaterial({
    normalMap: texture_normal
});
// ---------- ----------
// OBJECTS
// ---------- ----------
scene.add( new THREE.GridHelper( 10,10 ) );
const mesh = new THREE.Mesh( geometry, material);
scene.add(mesh);
// ---------- ----------
// LOOP
// ---------- ----------
const contorls = new OrbitControls(camera, renderer.domElement);
camera.position.set(2, 2, 2);
camera.lookAt(0, 0, 0);
const loop = () => {
    requestAnimationFrame(loop);
    renderer.render(scene, camera);
};
loop();