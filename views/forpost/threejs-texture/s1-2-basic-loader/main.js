// ---------- ----------
// IMPORT - threejs and any add-ons I want to use
// ---------- ----------
import * as THREE from 'three';
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
camera.position.set(1, 1.5, 1);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// LOAD TEXTURE, ADD MESH, RENDER
//-------- ----------
const loader = new THREE.TextureLoader();
loader.load(
    '/img/smile-face/smile_face_256.png',
    (texture) => {
        texture.magFilter = THREE.NearestFilter;
        const material = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            map: texture
        });
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const mesh = new THREE.Mesh( geometry, material);
        scene.add(mesh);
        renderer.render(scene, camera);
    }
);