// ---------- ----------
// IMPORT - threejs and any add-ons I want to use
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
}
// ObjectGridWrap based on R2 of the module from threejs-examples-object-grid-wrap
const ObjectGridWrap = (function(){
    // public API
    const api = {};
    // defaults
    const DEFAULT_SOURCE_OBJECTS = [ ];
    const DEFAULT_OBJECT_INDICES = [ ];
    const DEFAULT_CLONER = function(opt, objectIndex){
        const obj_root = opt.sourceObjects[objectIndex].clone();
        obj_root.traverse(function(obj){
            if(obj.material){
                if(obj.material instanceof Array){
                    obj.material = obj.material.map(function(m){
                        return m.clone();
                    });
                }else{
                    obj.material = obj.material.clone();
                }
            }
        });
        return obj_root;
    };
    const EFFECTS = {};
    //-------- ----------
    // HELPERS
    //-------- ----------
    // set grid to alphas helper
    const setGridToAlphas = function(grid, objectIndex){
        const ud = grid.userData;
        const obj = grid.children[objectIndex];
        const v_adjust = getAdjustedPos(grid, objectIndex);
        // use spacing
        let x = v_adjust.x * ud.spaceW;
        let z = v_adjust.y * ud.spaceH;
        // subtract so that objects are centered
        x -= (ud.tw - 1) * ud.spaceW / 2;
        z -= (ud.th - 1) * ud.spaceH / 2;
        // set position
        obj.position.set(x, 0, z);
    };
    // get a 'true' position in the form of a Vector2 for the given object index
    // by true position I mean how things are with the state of the objectIndices array
    // it can also be thought of as a kind of 'home position' as well
    const getTruePos = function(grid, objectIndex){
        const ud = grid.userData,
        trueX = objectIndex % ud.tw,
        trueZ = Math.floor(objectIndex / ud.tw);
        return new THREE.Vector2(trueX, trueZ);
    };
    // get the adjusted position in which alphaX, and alphaZ values are applyed
    const getAdjustedPos = function(grid, objectIndex){
        const ud = grid.userData,
        v_true = getTruePos(grid, objectIndex);
        // adjusted by alphas
        const ax = (v_true.x + ud.tw * ud.alphaX) % ud.tw;
        const az = (v_true.y + ud.th * ud.alphaZ) % ud.th;
        return new THREE.Vector2(ax, az);        
    };
    // final getPos in which space is applyed
    const getPos = function(grid, objectIndex){
        const ud = grid.userData,
        v_adjust = getAdjustedPos(grid, objectIndex);
        // use spacing
        let x = v_adjust.x * ud.spaceW;
        let z = v_adjust.y * ud.spaceH;
        // subtract so that objects are centered
        x -= (ud.tw - 1) * ud.spaceW / 2;
        z -= (ud.th - 1) * ud.spaceH / 2;
        return new THREE.Vector2(x, z);        
    };
    //******** **********
    //  CREATE METHOD
    //******** **********
    // The create method will create and return a new THREE.Group with desired source objects
    // and induces for where clones of these objects shall be placed
    api.create = function(opt){
        opt = opt || {};
        opt.sourceObjects = opt.sourceObjects || DEFAULT_SOURCE_OBJECTS;
        opt.objectIndices = opt.objectIndices || DEFAULT_OBJECT_INDICES;
        opt.tw = opt.tw === undefined ? 5: opt.tw; // tile width and height
        opt.th = opt.th === undefined ? 5: opt.th;
        opt.alphaX = 0; // alpha x and z values
        opt.alphaZ = 0;
        opt.cloner = opt.cloner || DEFAULT_CLONER;
        const grid = new THREE.Group();
        const ud = grid.userData;
        ud.effects = opt.effects || [];
        // use opt.space to set ud.spaceW + H or set them by opt.spaceW + H 
        if(opt.space){
            ud.spaceW = opt.space;
            ud.spaceH = opt.space;
        }else{
            ud.spaceW = opt.spaceW === undefined ? 1 : opt.spaceW;
            ud.spaceH = opt.spaceH === undefined ? 1 : opt.spaceH;
        }
        // alphaX and Z values for setting offsets of grid
        ud.alphaX = opt.alphaX;
        ud.alphaZ = opt.alphaZ;
        ud.tw = opt.tw;
        ud.th = opt.th;
        // ud.dAdjust aka ud.aOpacity 
        ud.aOpacity = ud.dAdjust = opt.dAdjust === undefined ? 1.0 : opt.dAdjust;
        // ud center, and ud.distMax
        ud.center = new THREE.Vector2(ud.tw / 2, ud.th / 2);
        ud.distMax = ud.center.distanceTo( new THREE.Vector2(0.5, 0.5) );
        let i = 0;
        const len = opt.tw * opt.th;
        while(i < len){
            const objIndex = opt.objectIndices[i];
            // if we have a vailid index clone the source object of that index
            if(typeof objIndex === 'number' && objIndex >= 0 && objIndex <= opt.sourceObjects.length - 1){
                var obj = opt.cloner(opt, objIndex);
                grid.add(obj);
            }else{
                // else push a blank object
                grid.add(new THREE.Object3D());
            }
            i += 1;
        };
        api.update(grid);
        return grid;
    };
    // set position
    api.setPos = function(grid, x, z){
        const ud = grid.userData;
        ud.alphaX = THREE.MathUtils.euclideanModulo(x, 1);
        ud.alphaZ = THREE.MathUtils.euclideanModulo(z, 1);
    };
    // main update method
    api.update = function(grid){
        const ud = grid.userData;
        // for all children
        grid.children.forEach(function(obj, i){
            // set the position of all objects based on 
            // the current state of alphaX and alphaY
            setGridToAlphas(grid, i);
            // create objData object that will be used for all effects
            const objData = { i : i };
            objData.truePos = getTruePos(grid, objData.i );
            objData.adjustPos = getAdjustedPos(grid, objData.i );
            objData.pos = getPos(grid, objData.i);
            // d and da
            const v2 = new THREE.Vector2(objData.adjustPos.x + 0.5, objData.adjustPos.y + 0.5),
            d = objData.d = v2.distanceTo( ud.center );
            let da = d * ud.dAdjust;
            da = da < 0 ? 0 : da;
            da = da > ud.distMax ? ud.distMax : da;
            objData.da = da;
            // 'b' value
            let b = objData.da / ud.distMax;
            b = 1 - b;
            objData.b = parseFloat( b.toFixed(2) );
            // apply all effects
            ud.effects.forEach(function(effectKey){
                const effect = EFFECTS[effectKey];
                if(effect){ 
                    effect(grid, obj, objData, obj.userData);
                }
            });
        });
    };
    // load a plug in
    api.load = function(plugObj){
        // load any effects given
        if(plugObj.EFFECTS){
            Object.keys( plugObj.EFFECTS ).forEach(function(effectKey){
                 EFFECTS[effectKey] = plugObj.EFFECTS[effectKey]
            });
        }
    };
    // return public API
    return api;
}());
//-------- ----------
// GRID
//-------- ----------
//scene.add( new THREE.GridHelper(10, 10) );
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
        ObjectGridWrap.setPos(state.grid, 0, 1 - a_frame );
        ObjectGridWrap.update(state.grid);
        state.frame += 1;
        state.frame %= state.frameMax;
        renderer.render(scene, camera);
        state.lt = now;
    }
};
//-------- ----------
// LOAD GEOMETRY
//-------- ----------
camera.position.set(-12, 12, 12);
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
 
    //scene.add(scene_source);
    //const mesh_bf = scene_source.getObjectByName('buffer_source_0').clone();
    //mesh_bf.position.set( 0, 0, 0);
    //scene.add(mesh_bf);
 
    //const mesh = scene_source.getObjectByName('buffer_source_1').clone();
    //mesh.position.set( 0, 0, 0);
    //scene.add(mesh);

    state.grid = ObjectGridWrap.create({
        spaceW: 8,
        spaceH: 8,
        tw: 5,
        th: 5,
        effects: ['opacity'],
        sourceObjects: [
            //scene_source.getObjectByName('buffer_source_0').clone(),
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
