//******** **********
// ObjectGridWrap module land module - r3 - from threejs-examples-object-grid-wrap-land
//
//    * can pass a custom collection of source objects when calling create method
//    * create source object, mesh, and load methods based on tween-many-r0
//******** **********
var ObjectGridWrapLand = (function(){
    // public API
    var api = {};
    //******** **********
    // HELPERS
    //******** **********
    // make data texture helper
    var makeDataTexture = function(width, height, vHigh, vLow){
        var size = width * height;
        var data = new Uint8Array( 4 * size );
        for ( let i = 0; i < size; i ++ ) {
            var stride = i * 4;
            var v = Math.floor( vLow + THREE.MathUtils.seededRandom() * ( vHigh - vLow ) );
            data[ stride ] = v;
            data[ stride + 1 ] = v;
            data[ stride + 2 ] = v;
            data[ stride + 3 ] = 255;
        }
        var texture = new THREE.DataTexture( data, width, height );
        texture.needsUpdate = true;
        return texture;
    };
    // default material for land mesh objects
    var MATERIAL_LAND = new THREE.MeshStandardMaterial({ 
        color: new THREE.Color('green'), 
        map: makeDataTexture(16, 16, 120, 255)
    });
    // MESH basic cube
    var makeCube = function(material, size){
        size = size === undefined ? 1 : size;
        var cube = new THREE.Mesh(
            new THREE.BoxGeometry(size, size, size), 
            material
        );
        cube.name = 'land_0';
        return cube
    };
    // MAKE MESH SLOPE HELPER
    var makeSlopeMesh = function(material, size, alphaR){
        alphaR = alphaR === undefined ? 0 : alphaR;
        size = size === undefined ? 1 : size;
        var shape_slope = new THREE.Shape();
        var hSize = size / 2;
        shape_slope.moveTo(hSize, hSize);
        shape_slope.lineTo(hSize * -1, hSize * -1);
        shape_slope.lineTo(hSize, hSize * -1);
        // geometry
        var geometry = new THREE.ExtrudeGeometry(shape_slope, {
            depth: size,
            bevelEnabled: false
        });
        // uv fix ( ceil values like 0.97... to 1 )
        var uv = geometry.getAttribute('uv');
        uv.array.forEach(function(n, i){
            uv.array[i] = Math.ceil(n);
            uv.array[i] = uv.array[i] < 1 ? 0 : 1;
        });
        uv.needsUpdate = true;
        geometry.computeBoundingBox();
        geometry.center();
        geometry.rotateY( Math.PI * 2 * alphaR );
        var slope = new THREE.Mesh( geometry, material);
        slope.name = 'land_1_' + ( alphaR.toString().split('.').join('_') );
        return slope;
    }
    // MAKE CORNER MESH HELPER
    var makeCornerMesh = function(material, size, alphaR, invert){
        alphaR = alphaR === undefined ? 0 : alphaR;
        size = size === undefined ? 1 : size;
        invert = invert || false;
        var geometry = new THREE.PlaneGeometry(size, size, 1, 1);
        // get pos attribute
        var pos = geometry.getAttribute('position');
        if(invert){
            [5,8,11].forEach(function(i){
                pos.array[i] = size;
            })
        }else{
            pos.array[2] = size;
        }
        pos.needsUpdate = true;
        geometry.computeVertexNormals();
        // rotate and translate
        geometry.rotateX( Math.PI * 1.5 );
        geometry.translate(0, size / 2 * -1 ,0);
        geometry.rotateY( Math.PI * 2 * alphaR);
        var corner = new THREE.Mesh( geometry, material);

        if(corner.userData.isInvert){
            corner.name = 'land_3_' + ( alphaR.toString().split('.').join('_') );
        }else{
            corner.name = 'land_2_' + ( alphaR.toString().split('.').join('_') );
        }

        return corner;
    };
    // names should always have at least one underscore like box_1
    var vaildNameCheck = function(obj){
        // object type is not a mesh!? return false
        if(obj.type.toLowerCase() != 'mesh'){
            return false;
        }
        // name is not a string!? Yeah return false.
        if(typeof obj.name != 'string'){
            return false;
        }
        // return false for empty string
        if(obj.name === ''){
            return false;
        }
        // check underscore count
        var uCount = obj.name.split('_').length;
        if(uCount < 1){
            return false;
        }
        // if we make it this far all checks are a pass
        return true;
    };
    //******** **********
    //  CREATE METHOD
    //******** **********
    api.create = function(opt){
        opt = opt || {};
        opt.crackSize = opt.crackSize === undefined ? 0.1 : opt.crackSize;
        opt.tw = opt.tw === undefined ? 4: opt.tw;
        opt.th = opt.th === undefined ? 2: opt.th;
        opt.dAdjust = opt.dAdjust === undefined ? 1.20: opt.dAdjust;
        var space = opt.space = opt.space === undefined ? 2: opt.space;
        opt.effects = opt.effects || ['opacity2'];
        opt.MATERIAL_LAND = opt.MATERIAL_LAND || MATERIAL_LAND;
        var meshSize = space - opt.crackSize;
        // can pass a custom collection of source objects
        opt.sourceObjects = opt.sourceObjects || [
 
            makeCube(opt.MATERIAL_LAND, meshSize),
 
            makeSlopeMesh(opt.MATERIAL_LAND, meshSize, 0.00),
            makeSlopeMesh(opt.MATERIAL_LAND, meshSize, 0.25),
            makeSlopeMesh(opt.MATERIAL_LAND, meshSize, 0.50),
            makeSlopeMesh(opt.MATERIAL_LAND, meshSize, 0.75),
 
            makeCornerMesh(opt.MATERIAL_LAND, meshSize, 0.00),
            makeCornerMesh(opt.MATERIAL_LAND, meshSize, 0.25),
            makeCornerMesh(opt.MATERIAL_LAND, meshSize, 0.50),
            makeCornerMesh(opt.MATERIAL_LAND, meshSize, 0.75),
 
            makeCornerMesh(opt.MATERIAL_LAND, meshSize, 0.00, true),
            makeCornerMesh(opt.MATERIAL_LAND, meshSize, 0.25, true),
            makeCornerMesh(opt.MATERIAL_LAND, meshSize, 0.50, true),
            makeCornerMesh(opt.MATERIAL_LAND, meshSize, 0.75, true)
        ];
        // set bools for isCube, isSlope, ect
        opt.sourceObjects.forEach(function(mesh){
            console.log(mesh.name);
            var mUD = mesh.userData;
            var parts = mesh.name.split('_');
            if(parts[1] === '0'){
                mUD.isCube = true;
                mUD.isSlope = false;
                mUD.isCorner = false;
                mUD.isInvert = false;
            }
            if(parts[1] === '1'){
                mUD.isCube = false;
                mUD.isSlope = true;
                mUD.isCorner = false;
                mUD.isInvert = false;
            }
            if(parts[1] === '2'){
                mUD.isCube = false;
                mUD.isSlope = false;
                mUD.isCorner = true;
                mUD.isInvert = false;
            }
            if(parts[1] === '3'){
                mUD.isCube = false;
                mUD.isSlope = false;
                mUD.isCorner = true;
                mUD.isInvert = true;
            }
        });
        // what the defaults should be for land objects and alt
        opt.objectIndices = opt.objectIndices || [
            0,0,1,3,
            0,0,1,3
        ];
        var altitude = opt.altitude || [
            0,0,1,1,
            0,0,1,1
        ];
        // create the grid
        var grid = ObjectGridWrap.create(opt);
        // translate geometry going by state of alt array
        grid.children.forEach(function(obj, i){
            var alt = obj.userData.alt = altitude[i];
            obj.geometry = obj.geometry.clone();
            obj.geometry.translate(0, alt * space, 0)
        });
        // base position for whone grid
        grid.position.set(0, 0.5, 0);
        var ud = grid.userData; 
        // adjust 'minB' value for opacity2 effect
        ud.minB = 0.3;
        ud.space = opt.space;
        ud.tw = opt.tw;
        ud.th = opt.th;
        ud.opt = opt;
        return grid;
    };
    //******** **********
    //  CREATE SOURCE OBJECT, MESH, LOAD
    //******** **********
    api.createSourceObj = function(result){
        // source object
        var sourceObj = {};
        // loop children of scene
        result.scene.children.forEach(function(obj, i, arr){
            // load all vaild mesh objects to sourceObj
            if(vaildNameCheck){
                console.log('keyed in: ', obj.name);
                // set position to 0, 0, 0
                obj.position.set(0, 0, 0);
                // add ref to sourceObj
                sourceObj[obj.name] = obj;
            }
        });
        return sourceObj;
    };
    // create a new mesh from a source object
    api.createMesh = function(sourceObj, name){
        var mesh = sourceObj[name].clone();
        mesh.geometry = sourceObj[name].geometry.clone();
        return mesh;
    };
    // load the dae file with the given URL, and create a sourceObject from it
    // returns a Promsie
    api.load = function(url){
        // cusotm loading manager
        var manager = new THREE.LoadingManager();
        manager.onStart = function ( url, itemsLoaded, itemsTotal ) {
            console.log('loading DAE File: ' + url);
        };
        manager.onProgress = function ( url, itemsLoaded, itemsTotal ) {
            console.log(itemsLoaded + '/' + itemsTotal);
        };
        // retrun a promise
        return new Promise(function(resolve, reject){
            var sourceObj = {};
            // on Error reject with custom generic error message
            manager.onError = function ( url, b ) {
               reject(  new Error('Error while loading DAE FILE') )
            };
            manager.onLoad = function ( a ) {
                console.log('done loading DAE File');
                resolve(sourceObj)
            };
            // create the loader
            var loader = new THREE.ColladaLoader(manager);
            // load the dae file and resolve with source object if all goes well
            loader.load(url, function (result) {
                // resolve with the source object
                //resolve( api.createSourceObj(result) );
                sourceObj = api.createSourceObj(result);
            });
        });
    };
    //******** **********
    //  ADD AT METHOD
    //******** **********
    // basic add at method should just add a given mesh to the tile
    // at the given location and that is it. However a function can be given
    // to define what needs to happen in terms of adjusting the y value
    api.addAt = addAt = function(grid, mesh, ix, y, yAdjust){
        // get the tile with the given values ix and or y;
        var tile;
        if(y === undefined){
            tile = grid.children[ix];
        }else{
            var w = grid.userData.tw;
            tile = grid.children[ y * w + ix];
        }
        // use yAdjust if given;
        if(typeof yAdjust === 'function'){
            yAdjust(tile, mesh, tile.userData);
        };
        // add given mesh as child of tile
        tile.add(mesh);
    };
    //******** **********
    //  SCALE AND ROTATE LAND OBJECT HELPER - when loading custom land objects in DAE file that may need to have geo adjusted
    //******** **********
    api.scaleAndRotateLandObject = function(sourceMesh, scale, rx, ry, rz){
        var mesh = sourceMesh.clone();
        var geo = mesh.geometry = sourceMesh.geometry.clone();
        geo.scale(scale, scale, scale);
        geo.rotateX(Math.PI * 2 * rx);
        geo.rotateY(Math.PI * 2 * ry);
        geo.rotateZ(Math.PI * 2 * rz);
        return mesh;
    };
    //******** **********
    //  setDataTextures
    //******** **********
    var DEFAULT_DATATEXT = [
        ['#00ff00', 32, 32, 180, 255],
        ['#00ff00', 32, 32, 64, 255],
        ['#00ff00', 32, 32, 80, 160],
        ['#00ff6f', 32, 32, 180, 255],
        ['#aaff6f', 32, 32, 100, 255],
        ['#00ff6f', 32, 32, 80, 160]
    ];
    api.setDataTextures = function(grid, dataText){
        dataText = dataText || DEFAULT_DATATEXT;
        var materials = [];
        dataText.forEach(function(d){
            materials.push(new THREE.MeshStandardMaterial({
                color: new THREE.Color(d[0]),
                map: makeDataTexture(d[1], d[2], d[3], d[4])
            }));
        });
        // seeded random material index values
        var i = 0, len = grid.userData.tw * grid.userData.th;
        while(i < len){
           var mi = Math.floor(THREE.MathUtils.seededRandom() * materials.length);
           grid.children[i].material = materials[mi].clone();
           i += 1;
        }
    };
    // return public API
    return api;
}());
