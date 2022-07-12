//******** **********
// ObjectGridWrap module - r2 - for threejs-examples-object-grid-wrap post
// * spaceW and spaceH options in place of space
//******** **********
var ObjectGridWrap = (function(){
    // public API
    var api = {};
    //******** **********
    //  DEFAULTS
    //******** **********
    var  DEFAULT_SOURCE_OBJECTS = [
        new THREE.Mesh( new THREE.BoxGeometry( 1, 1, 1), new THREE.MeshNormalMaterial()),
        new THREE.Mesh( new THREE.SphereGeometry( 0.5, 30, 30), new THREE.MeshNormalMaterial())
    ];
    var DEFAULT_OBJECT_INDICES = [1,0,1,0,1,0,0,0,0,0,1,0,1,0,1,0,0,0,0,0,1,0,1,0,1];
    // DEFAULT CLONER METHOD
    var DEFAULT_CLONER = function(opt, objectIndex){
        var obj_root = opt.sourceObjects[objectIndex].clone();
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
    //******** **********
    //  EFFECTS OBJECT - BUILT IN EFFECTS + HELPERS
    //******** **********
    // set opacity for object and any and all nested objects
    var setOpacity = function(obj_root, alpha){
        obj_root.traverse(function(obj){
            // any object with a material
            if(obj.material){
                //obj.material.transparent = true;
                //obj.material.opacity = alpha;
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
    var EFFECTS = {
        // effect method that will set opacity of object based on distance from center
        opacity : function(grid, obj, objData){
            setOpacity(obj, objData.b);
        },
        // set scale based on distance from center
        scale : function(grid, obj, objData){
            obj.scale.set(1, 1, 1).multiplyScalar( objData.b );
        },
        // rotationA demo effect
        rotationA : function(grid, obj, objData){
            var y = objData.b * Math.PI * 4;
            obj.rotation.set(0, y, 0);
        },
        // rotationB demo effect
        rotationB : function(grid, obj, objData){
            obj.rotation.set(0, 0, 0);
        },
        // positionA demo effect
        positionA : function(grid, obj, objData){
            var ud = grid.userData;
            obj.position.y = ud.tw / 2 * objData.b;
        }
    };
    //******** **********
    //  POSITION HELPERS
    //******** **********
    // get a 'true' position in the form of a Vector2 for the given object index
    // by true position I mean how things are with the state of the objectIndices array
    // it can also be thought of as a kind of 'home position' as well
    var getTruePos = function(grid, objectIndex){
        var ud = grid.userData,
        trueX = objectIndex % ud.tw,
        trueZ = Math.floor(objectIndex / ud.tw);
        return new THREE.Vector2(trueX, trueZ);
    };
    // get the adjusted position in which alphaX, and alphaZ values are applyed
    var getAdjustedPos = function(grid, objectIndex){
        var ud = grid.userData,
        v_true = getTruePos(grid, objectIndex);
        // adjusted by alphas
        var ax = (v_true.x + ud.tw * ud.alphaX) % ud.tw;
        var az = (v_true.y + ud.th * ud.alphaZ) % ud.th;
        return new THREE.Vector2(ax, az);        
    };
    // final getPos in which space is applyed
    var getPos = function(grid, objectIndex){
        var ud = grid.userData,
        v_adjust = getAdjustedPos(grid, objectIndex);
        // use spacing
        var x = v_adjust.x * ud.spaceW;
        var z = v_adjust.y * ud.spaceH;
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
        var grid = new THREE.Group();
        var ud = grid.userData;
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
        var i = 0, len = opt.tw * opt.th;
        while(i < len){
            var objIndex = opt.objectIndices[i];
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
    //******** **********
    //  SET / UPDATE GRID + HELPERS
    //******** **********
    // set grid to alphas helper
    var setGridToAlphas = function(grid, objectIndex){
        var ud = grid.userData;
        var obj = grid.children[objectIndex];
        var v_adjust = getAdjustedPos(grid, objectIndex);
        // use spacing
        var x = v_adjust.x * ud.spaceW;
        var z = v_adjust.y * ud.spaceH;
        // subtract so that objects are centered
        x -= (ud.tw - 1) * ud.spaceW / 2;
        z -= (ud.th - 1) * ud.spaceH / 2;
        // set position
        obj.position.set(x, 0, z);
    };
    // set position
    api.setPos = function(grid, x, z){
        var ud = grid.userData;
        ud.alphaX = THREE.MathUtils.euclideanModulo(x, 1);
        ud.alphaZ = THREE.MathUtils.euclideanModulo(z, 1);
    };
    // main update method
    api.update = function(grid){
        var ud = grid.userData;
        // for all children
        grid.children.forEach(function(obj, i){
            // set the position of all objects based on 
            // the current state of alphaX and alphaY
            setGridToAlphas(grid, i);
            // create objData object that will be used for all effects
            var objData = { i : i };
            objData.truePos = getTruePos(grid, objData.i );
            objData.adjustPos = getAdjustedPos(grid, objData.i );
            objData.pos = getPos(grid, objData.i);
            // d and da
            var v2 = new THREE.Vector2(objData.adjustPos.x + 0.5, objData.adjustPos.y + 0.5),
            d = objData.d = v2.distanceTo( ud.center );
            var da = d * ud.dAdjust;       
            da = da < 0 ? 0 : da;
            da = da > ud.distMax ? ud.distMax : da;
            objData.da = da;
            // 'b' value

            var b = objData.da / ud.distMax;
            b = 1 - b;
            objData.b = parseFloat( b.toFixed(2) );

            // apply all effects
            ud.effects.forEach(function(effectKey){
                EFFECTS[effectKey](grid, obj, objData);
            });
        });
    };
    // return public API
    return api;

}());
