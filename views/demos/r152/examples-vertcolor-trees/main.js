// ---------- ----------
// IMPORT - threejs and any addons I want to use
// ---------- ----------
import * as THREE from 'three';
import { OrbitControls } from 'OrbitControls';
import { VertexNormalsHelper } from 'VertexNormalsHelper';
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(65, 4 / 3, 0.1, 100);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo')  || document.body ).appendChild(renderer.domElement);
//-------- ----------
// OBJECTS
//-------- ----------
scene.add( new THREE.GridHelper(10, 10) );
//-------- ----------
// ORBIT CONTROLS
//-------- ----------
new OrbitControls(camera, renderer.domElement);
//-------- ----------
// Loader
//-------- ----------
camera.position.set(4, 5, 4);
camera.lookAt(0, 3, 0);
const loader = new THREE.BufferGeometryLoader();
// load a resource
loader.load(
    // resource URL
    '/json/vertcolor-trees/6tri/3.json',
    // onLoad callback
    (geometry) => {
        // add mesh
        const mesh = new THREE.Mesh(
            geometry,
            new THREE.MeshBasicMaterial({
                vertexColors: true, 
                side: THREE.DoubleSide
            }));
        scene.add(mesh);
        const loop = () => {
            requestAnimationFrame(loop);
            renderer.render(scene, camera);
        };
        loop();
    }
);
