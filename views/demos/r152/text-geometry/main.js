// ---------- ----------
// IMPORT - threejs and any addons I want to use
// ---------- ----------
import * as THREE from 'three';
import { FontLoader } from 'FontLoader';
import { TextGeometry } from 'TextGeometry';
// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.querySelector('#demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// OBJECTS
// ---------- ----------
scene.add( new THREE.GridHelper(10, 10) );
const loader = new FontLoader();
loader.load( '/json/fonts/threejs/helvetiker_regular.typeface.json', function ( font ) {
    const geometry = new TextGeometry( 'This is Text!', {
        font: font,
        size: 1,
        height: 0.25,
        curveSegments: 8,
        bevelEnabled: true,
        bevelThickness: 0.125,
        bevelSize: 0.025,
        bevelOffset: 0,
        bevelSegments: 4
    } );
    geometry.center();
    // material, mesh
    const material = new THREE.MeshNormalMaterial();
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    // render
    camera.position.set(5, 5, 5);
    camera.lookAt(0, 0, 0);
    renderer.render(scene, camera);
} );
