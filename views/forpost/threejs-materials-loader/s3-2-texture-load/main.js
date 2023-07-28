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
// MATERIAL LOADER
// ---------- ----------

const textures = {};

const loader = new THREE.TextureLoader();
const uuid = 'c3ad2169-e7e1-435c-90f3-81bdc4ba6283';
const url = uuid + '.png';
loader.load( url, (texture) => {
    texture.uuid = uuid;
    textures[uuid] = texture;
    const loader = new THREE.MaterialLoader();
    loader.setTextures(textures)
    loader.load('/forpost/threejs-materials-loader/s3-2-texture-load/material.json', (material) => {
        scene.add( new THREE.GridHelper( 10,10 ) );
        const mesh = new THREE.Mesh( new THREE.BoxGeometry(1, 1, 1), material );
        scene.add(mesh);
        // RENDER
        camera.position.set(2, 2, 2);
        camera.lookAt(0, 0, 0);
        renderer.render(scene, camera);
    });
});

