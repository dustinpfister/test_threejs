//******** **********
// ObjectGridWrap module land module
//******** **********
var ObjectGridWrapLand = (function(){
    // public API
    var api = {};
    //******** **********
    // MESH OBJECTS
    //******** **********
    var MATERIAL_LAND = new THREE.MeshStandardMaterial({color: new THREE.Color('green')})
    // MESH basic cube
    var makeCube = function(size){
        size = size === undefined ? 1 : size;
        var cube = new THREE.Mesh(
            new THREE.BoxGeometry(size, size, size), 
            MATERIAL_LAND
        );
        return cube
    };
    // MAKE MESH SLOPE HELPER
    var makeSlopeMesh = function(alphaR, size){
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
        geometry.computeBoundingBox();
        geometry.center();
        geometry.rotateY( Math.PI * 2 * alphaR );
        var slope = new THREE.Mesh( geometry, MATERIAL_LAND);
        return slope;
    }
    //******** **********
    //  CREATE METHOD
    //******** **********
    api.create = function(opt){
        var tw = 10,
        th = 10,
        space = 2;
        var grid = ObjectGridWrap.create({
            spaceW: space + 0.05,
            spaceH: space + 0.05,
            tw: tw,
            th: th,
            dAdjust: 1.25,
            effects: ['opacity2'],
            sourceObjects: [
                makeCube(space),
                makeSlopeMesh(0.00, space),
                makeSlopeMesh(0.25, space),
                makeSlopeMesh(0.50, space),
                makeSlopeMesh(0.75, space)
            ],
            objectIndices: [
                0,4,0,0,0,0,0,0,0,0,
                1,0,3,0,0,0,0,0,0,0,
                1,0,3,0,4,4,4,4,0,0,
                0,2,0,4,0,0,0,0,4,0,
                0,0,1,0,0,0,4,0,0,3,
                0,0,1,0,0,1,0,3,0,3,
                0,0,0,2,0,0,2,0,0,3,
                0,4,0,0,1,0,0,0,2,0,
                1,0,3,0,1,0,0,3,0,0,
                0,2,0,0,0,2,2,0,0,0,
            ]
        });
        // I will want to have some way to set altitude for each
        // cloned mesh object in the gird
        var altitude = [
                0,1,0,0,0,0,0,0,0,0,
                1,1,1,0,0,0,0,0,0,0,
                1,1,1,0,1,1,1,1,0,0,
                0,1,0,1,1,1,1,1,1,0,
                0,0,1,1,1,1,2,1,1,1,
                0,0,1,1,1,2,2,2,1,1,
                0,0,0,1,1,1,2,1,1,1,
                0,1,0,0,1,1,1,1,1,0,
                1,1,1,0,1,1,1,1,0,0,
                0,1,0,0,0,1,1,0,0,0,
        ];
        grid.children.forEach(function(obj, i){
            var alt = altitude[i];
            obj.geometry = obj.geometry.clone();
            obj.geometry.translate(0, alt * space, 0)
        });
        // base position for whone grid
        grid.position.set(0, 0.5, 0);
        // adjust 'minB' value for opacity2 effect
        grid.userData.minB = 0.3;    
        return grid;
    }; 
    // return public API
    return api;
}());
