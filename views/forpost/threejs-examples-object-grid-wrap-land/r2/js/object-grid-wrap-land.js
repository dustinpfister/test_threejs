//******** **********
// ObjectGridWrap module land module - r2
//******** **********
var ObjectGridWrapLand = (function(){
    // public API
    var api = {};
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
    //******** **********
    // MESH OBJECTS
    //******** **********
    // MESH basic cube
    var makeCube = function(material, size){
        size = size === undefined ? 1 : size;
        var cube = new THREE.Mesh(
            new THREE.BoxGeometry(size, size, size), 
            material
        );
        // not a slope
        cube.userData.isSlope = false;
        cube.userData.isCorner = false;
        cube.userData.isInvert = false;
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
        // is a slope
        slope.userData.isSlope = true;
        slope.userData.isCorner = false;
        slope.userData.isInvert = false;
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
        // not a slope
        corner.userData.isSlope = true;
        corner.userData.isCorner = true;
        corner.userData.isInvert = invert;
        return corner;
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
        opt.sourceObjects = [
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
        opt.objectIndices = opt.objectIndices || [
            0,0,1,3,
            0,0,1,3
        ];
        var grid = ObjectGridWrap.create(opt);
        // I will want to have some way to set altitude for each
        // cloned mesh object in the gird
        var altitude = opt.altitude || [
            0,0,1,1,
            0,0,1,1
        ];
        grid.children.forEach(function(obj, i){
            var alt = altitude[i];
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
    //  ADD AT METHOD
    //******** **********
    api.addAt = function(grid, mesh, ix, y){
        var tile = 0,
        ud = grid.userData;
        if(y === undefined){
            tile = grid.children[ix];
        }else{
            var w = grid.userData.tw;
            tile = grid.children[ y * w + ix];
        }
        var box = new THREE.Box3();
        tile.geometry.computeBoundingBox();
        box.copy( tile.geometry.boundingBox ).applyMatrix4( tile.matrixWorld );
        // on cubes add half hight, on slopes add 0
        mesh.geometry.computeBoundingBox();
        var v = new THREE.Vector3();
        mesh.geometry.boundingBox.getSize(v);
        // figure out yDelta value starting with a 
        // default value that should work okay for cubes
        var yDelta = v.y / 2;
        // if the tile is a slope?
        if(tile.userData.isSlope){
            yDelta = v.y / 2 - ud.space * 0.75;
        }
        // if the tile is a corner
        if(tile.userData.isCorner){
            yDelta = v.y / 2 - ud.space;
            if(tile.userData.isInvert){
               yDelta = v.y / 2 - ud.space * 0.5;
            }
        }
        mesh.position.y = box.max.y + yDelta;
        tile.add(mesh);
    };
    //******** **********
    //  setDataTextures
    //******** **********
    api.setDataTextures = function(){

    };
    // return public API
    return api;
}());
