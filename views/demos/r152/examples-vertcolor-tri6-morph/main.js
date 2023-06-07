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
// GRID
//-------- ----------
scene.add( new THREE.GridHelper(10, 10) );
//-------- ----------
// ORBIT CONTROLS
//-------- ----------
new OrbitControls(camera, renderer.domElement);
//-------- ----------
// Loader
//-------- ----------
camera.position.set(8, 8, 8);
camera.lookAt(0, 0, 0);
const loader = new THREE.BufferGeometryLoader();
// load a resource
loader.load(
    // resource URL
    '/json/vertcolor-trees/6tri-morph/one.json',
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

console.log( geometry.morphAttributes.color[0] );


const att_pos = geometry.getAttribute('position');


mesh.morphTargetInfluences[ 0 ] = 1;
console.log(att_pos.array[9]);



        // loop
        let frame = 0;
        const frame_max = 90;
        const loop = () => {
            requestAnimationFrame(loop);

            const a1 = frame / frame_max;
            const a2 = 1 - Math.abs( 0.5 - a1 ) / 0.5;

            //mesh.morphTargetInfluences[ 0 ] = a2;

            //mesh.geometry.getAttribute('color').needsUpdate = true;
            //mesh.material.needsUpdate = true;

            frame += 1;
            frame %= frame_max;


            renderer.render(scene, camera);
        };
        loop();
    }
);
