// ---------- ----------
// IMPORT - threejs and any add-ons I want to use
// ---------- ----------
import * as THREE from 'three';
//-------- ----------
// DEFAULTS
//-------- ----------
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
    let x = v_adjust.x * ud.spaceW;
    let z = v_adjust.y * ud.spaceH;
    x -= (ud.tw - 1) * ud.spaceW / 2;
    z -= (ud.th - 1) * ud.spaceH / 2;
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
    const ax = (v_true.x + ud.tw * ud.alphaX) % ud.tw;
    const az = (v_true.y + ud.th * ud.alphaZ) % ud.th;
    return new THREE.Vector2(ax, az);
};
// final getPos in which space is applyed
const getPos = function(grid, objectIndex){
    const ud = grid.userData,
    v_adjust = getAdjustedPos(grid, objectIndex);
    let x = v_adjust.x * ud.spaceW;
    let z = v_adjust.y * ud.spaceH;
    x -= (ud.tw - 1) * ud.spaceW / 2;
    z -= (ud.th - 1) * ud.spaceH / 2;
    return new THREE.Vector2(x, z);
};
// apply and gud values in opt.gud ( used in create method )
const applyOptGUDObject = (opt, gud) => {
    opt.gud = opt.gud || {};
    Object.keys(opt.gud).forEach( (key) => {
        gud[key] = opt.gud[key];
    });
};
// set opacity helper function
const setOpacity = function(obj_root, alpha){
    obj_root.traverse(function(obj){
        if(obj.material){
            if(obj.material instanceof Array){
                obj.material.forEach(function(m){
                    m.transparent = true;
                    m.opacity = alpha;
                });
            }else{
                obj.material.transparent = true;
                obj.material.opacity = alpha;
            }
        }
    });
};
// ---------- ----------
// BUILT IN EFFECTS
// ---------- ----------
// 'opacity3' EFFECT built into module
EFFECTS.opacity3 = function(grid, obj, objData, oud, gud){
    const v_pos = objData.pos;
    const maxDist = gud.maxOpacityDist === undefined ? 8 : gud.maxOpacityDist;
    const pos_center = new THREE.Vector2(grid.position.x, grid.position.z);
    let alpha = 1 - v_pos.distanceTo( pos_center ) / maxDist;
    //alpha = THREE.MathUtils.smootherstep(alpha, 0, 1);
    if(alpha > 0.8 ){
        alpha = 1;
    }else{
        alpha = THREE.MathUtils.smootherstep( alpha / 0.68, 0, 1);
    }


    setOpacity(obj, THREE.MathUtils.clamp(alpha, 0, 1) );
};
// ---------- ----------
// PUBLIC API 
// ---------- ----------
const ObjectGridWrap = {};
// The create method will create and return a new THREE.Group with desired source objects
// and induces for where clones of these objects shall be placed
ObjectGridWrap.create = function(opt){
    opt = opt || {};
    opt.sourceObjects = opt.sourceObjects || DEFAULT_SOURCE_OBJECTS;
    opt.objectIndices = opt.objectIndices || DEFAULT_OBJECT_INDICES;
    opt.tw = opt.tw === undefined ? 5: opt.tw;
    opt.th = opt.th === undefined ? 5: opt.th;
    opt.alphaX = 0;
    opt.alphaZ = 0;
    opt.cloner = opt.cloner || DEFAULT_CLONER;
    const grid = new THREE.Group();
    const gud = grid.userData;
    gud.effects = opt.effects || [];
    if(opt.space){
        gud.spaceW = opt.space;
        gud.spaceH = opt.space;
    }else{
        gud.spaceW = opt.spaceW === undefined ? 1 : opt.spaceW;
        gud.spaceH = opt.spaceH === undefined ? 1 : opt.spaceH;
    }
    gud.alphaX = opt.alphaX;
    gud.alphaZ = opt.alphaZ;
    gud.tw = opt.tw;
    gud.th = opt.th;
    gud.aOpacity = gud.dAdjust = opt.dAdjust === undefined ? 1.0 : opt.dAdjust;
    gud.center = new THREE.Vector2(gud.tw / 2, gud.th / 2);
    gud.distMax = gud.center.distanceTo( new THREE.Vector2(0.5, 0.5) );
    applyOptGUDObject(opt, gud);
    let i = 0;
    const len = opt.tw * opt.th;
    while(i < len){
        const objIndex = opt.objectIndices[i];
        if(typeof objIndex === 'number' && objIndex >= 0 && objIndex <= opt.sourceObjects.length - 1){
            var obj = opt.cloner(opt, objIndex);
            grid.add(obj);
        }else{
            grid.add(new THREE.Object3D());
        }
        i += 1;
    };
    ObjectGridWrap.update(grid);
    return grid;
};
// set position
ObjectGridWrap.setPos = function(grid, x, z){
    const ud = grid.userData;
    ud.alphaX = THREE.MathUtils.euclideanModulo(x, 1);
    ud.alphaZ = THREE.MathUtils.euclideanModulo(z, 1);
};
// main update method
ObjectGridWrap.update = function(grid){
    const ud = grid.userData;
    grid.children.forEach(function(obj, i){
        setGridToAlphas(grid, i);
        const objData = { i : i };
        objData.truePos = getTruePos(grid, objData.i );
        objData.adjustPos = getAdjustedPos(grid, objData.i );
        objData.pos = getPos(grid, objData.i);
        const v2 = new THREE.Vector2(objData.adjustPos.x + 0.5, objData.adjustPos.y + 0.5),
        d = objData.d = v2.distanceTo( ud.center );
        let da = d * ud.dAdjust;
        da = da < 0 ? 0 : da;
        da = da > ud.distMax ? ud.distMax : da;
        objData.da = da;
        let b = objData.da / ud.distMax;
        b = 1 - b;
        objData.b = parseFloat( b.toFixed(2) );
        ud.effects.forEach(function(effectKey){
            const effect = EFFECTS[effectKey];
            if(effect){ 
                effect(grid, obj, objData, obj.userData, grid.userData);
            }
        });
    });
};
// load a plug in
ObjectGridWrap.load = function(plugObj){
    if(plugObj.EFFECTS){
        Object.keys( plugObj.EFFECTS ).forEach(function(effectKey){
             EFFECTS[effectKey] = plugObj.EFFECTS[effectKey]
        });
    }
};
// export the public api
export { ObjectGridWrap };