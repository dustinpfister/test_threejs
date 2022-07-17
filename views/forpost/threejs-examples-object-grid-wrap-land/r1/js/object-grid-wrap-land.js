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
    // MAKE CORNER MESH HELPER
    var makeCornerMesh = function(alphaR, size, invert){
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
        var corner = new THREE.Mesh( geometry, MATERIAL_LAND);
        return corner;
    };
    //******** **********
    //  CREATE METHOD
    //******** **********
    api.create = function(opt){

        opt = opt || {};

        opt.tw = opt.tw === undefined ? 10: opt.tw;
        opt.th = opt.th === undefined ? 10: opt.th;
        opt.dAdjust = opt.dAdjust === undefined ? 1.20: opt.dAdjust;
        var space = opt.space = opt.space === undefined ? 2: opt.space;

        opt.effects = opt.effects || ['opacity2'];

        var meshSize = space - 0.05;
        opt.sourceObjects = [
            makeCube(meshSize),
            makeSlopeMesh(0.00, meshSize),
            makeSlopeMesh(0.25, meshSize),
            makeSlopeMesh(0.50, meshSize),
            makeSlopeMesh(0.75, meshSize),

            makeCornerMesh(0.00, meshSize),
            makeCornerMesh(0.25, meshSize),
            makeCornerMesh(0.50, meshSize),
            makeCornerMesh(0.75, meshSize),

            makeCornerMesh(0.00, meshSize, true),
            makeCornerMesh(0.25, meshSize, true),
            makeCornerMesh(0.50, meshSize, true),
            makeCornerMesh(0.75, meshSize, true)
        ];

opt.objectIndices = opt.objectIndices || [
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
];

        var grid = ObjectGridWrap.create(opt);
        // I will want to have some way to set altitude for each
        // cloned mesh object in the gird
        var altitude = opt.altitude || [
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
