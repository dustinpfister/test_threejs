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
const camera = new THREE.PerspectiveCamera(65, 4 / 3, 0.1, 1000);
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
    fly: null,
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
        const a_wings = 1 - Math.abs( 0.5 - (a_frame * 128 % 1) ) / 0.5;
        const a_bounce = a_frame * 16 % 1;
        const a_rock = Math.sin( Math.PI * 16 * a_frame ) / Math.PI;
        // fly
        state.fly.position.set( 0, 0, 0 );
        state.fly.morphTargetInfluences[ 0 ] = a_wings;
        state.fly.position.y = 7 + Math.sin( Math.PI * 2 * a_bounce ) * 0.5;
        state.fly.rotation.y = Math.PI / 180 * ( 90 * a_rock );
        // grid
        ObjectGridWrap.setPos(state.grid, 0, 1 - (a_frame * 4 % 1) );
        ObjectGridWrap.update(state.grid);
        // camera
        camera.position.set(3, 9, 3);
        camera.lookAt(0, 7, 0);
        // step, render, ect...
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
    // the butterfly
    state.fly = scene_source.getObjectByName('buffer_source_0').clone();
    scene.add(state.fly);
    // set up the grid
    state.grid = ObjectGridWrap.create({
        spaceW: 15,
        spaceH: 15,
        tw: 8,
        th: 8,
        gud: {
           maxOpacityDist: 55
        },
        effects: ['opacity3'],
        sourceObjects: [
            scene_source.getObjectByName('buffer_source_1').clone(),
            scene_source.getObjectByName('buffer_source_2').clone(),
            scene_source.getObjectByName('buffer_source_3').clone(),
            scene_source.getObjectByName('buffer_source_4').clone()
        ],
        objectIndices: [
            1,3,1,1,1,3,1,1,
            1,0,1,1,1,1,1,3,
            1,0,2,3,1,1,1,1,
            1,0,1,0,1,1,3,1,
            1,2,3,0,1,1,2,1,
            1,1,1,1,1,3,0,3,
            3,1,0,2,1,2,2,1,
            1,1,1,2,0,2,0,1,
            1,1,1,1,1,1,3,1
        ]
    });
    state.grid.position.set( -10, 0, -10 );
    scene.add(state.grid);
    loop();
});
