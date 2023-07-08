// ---------- ----------
// IMPORT - threejs and any add-ons I want to use
// ---------- ----------
import * as THREE from 'three';
import { ObjectGridWrap } from 'ObjectGridWrap';
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
// HELPER FUNCTIONS
//-------- ----------
// helper for loading many JSON Buffer Geometries from threejs-buffer-geometry-loader post:
// https://dustinpfister.github.io/2018/04/12/threejs-buffer-geometry-loader/
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
// loop
//-------- ----------
const state = {
    grid: null,
    lt: new Date(),
    frame: 0,
    frameMax: 900,
    fps: 30
};
const loop = ()=> {
    const now = new Date();
    const secs = (now - state.lt) / 1000;
    requestAnimationFrame(loop);
    if(secs > 1 / state.fps){
        const a_frame = state.frame / state.frameMax;
        ObjectGridWrap.setPos(state.grid, 0, 1 - (a_frame * 4 % 1) );
        ObjectGridWrap.update(state.grid);
        state.frame += 1;
        state.frame %= state.frameMax;
        renderer.render(scene, camera);
        state.lt = now;
    }
};
//-------- ----------
// GRID
//-------- ----------
scene.add( new THREE.GridHelper(100, 10) );
//-------- ----------
// LOAD GEOMETRY
//-------- ----------
camera.position.set(-20, 15, 20);
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
// load the geometry
loadBufferGeometryJSON(urls, 2, 5, material)
.then(( scene_source ) => {
    state.grid = ObjectGridWrap.create({
        spaceW: 5.8,
        spaceH: 5.8,
        tw: 5,
        th: 5,
        gud: {
           maxOpacityDist: 14
        },
        effects: ['opacity3'],
        sourceObjects: [
            scene_source.getObjectByName('buffer_source_1').clone(),
            scene_source.getObjectByName('buffer_source_2').clone(),
            scene_source.getObjectByName('buffer_source_3').clone(),
            scene_source.getObjectByName('buffer_source_4').clone()
        ],
        objectIndices: [
            1,1,1,1,1,
            1,0,1,1,1,
            1,0,2,3,1,
            1,0,1,0,1,
            1,2,3,0,1,
            1,1,1,1,1
        ]
    });
    scene.add(state.grid);
    loop();
});
