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
// HELPER
//-------- ----------
const loadBufferGeometryJSON = ( urls = [], w = 2, scale = 5, material = new THREE.MeshNormalMaterial() ) => {
    const scene_source = new THREE.Scene();
    const onBuffLoad =  (geometry, i) => {
        const x = i % w;
        const z = Math.floor( i / w);
        const mesh = new THREE.Mesh( geometry, material);
        mesh.name = 'buffer_source_' + i;
        mesh.position.set(x, 0, z).multiplyScalar(scale);
        scene_source.add(mesh);
    };
    const onBuffProgress =  (geometry) => {};
    return new Promise( ( resolve, reject ) => {
        const manager = new THREE.LoadingManager();
        manager.onLoad = () => {
            resolve(scene_source);
        };
        const onBuffError =  (err) => {
           reject(err);
        };
        const loader = new THREE.BufferGeometryLoader(manager);
        urls.forEach( (url, index) => {
            loader.load(url, (geometry) => { onBuffLoad(geometry, index) }, onBuffProgress, onBuffError);
        });
    });
};
//-------- ----------
// GRID
//-------- ----------
scene.add( new THREE.GridHelper(10, 10) );
//-------- ----------
// LOAD GEOMETRY
//-------- ----------
camera.position.set(-8, 8, 12);
camera.lookAt(0, 0.5, 0);
const urls = [
    '/json/tri12-bufferfly/set1/0.json',
    '/json/tri12-trees/deciduous-one-full/0.json',
    '/json/tri12-trees/deciduous-one-full/1.json',
    '/json/tri12-trees/deciduous-one-full/2.json',
    '/json/tri12-trees/deciduous-one-full/3.json',
];
const material = new THREE.MeshBasicMaterial({
    side: THREE.DoubleSide,
    vertexColors: true
});
loadBufferGeometryJSON(urls, 2, 5, material)
.then(( scene_source )=>{
    scene.add(scene_source);
    renderer.render(scene, camera);
});
