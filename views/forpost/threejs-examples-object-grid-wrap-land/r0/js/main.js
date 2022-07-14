//******** **********
// SCENE, CAMERA, RENDERER
//******** **********
var scene = new THREE.Scene();
scene.background = new THREE.Color('#000000');
//scene.add( new THREE.GridHelper(10, 10, 0x00ff00, 0xffffff) )
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(-10, 10, 10);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
//******** **********
// LIGHT
//******** **********
var dl = new THREE.DirectionalLight(0xffffff, 1);
dl.position.set(8, 2, 4);
scene.add(dl);
scene.add( new THREE.AmbientLight(0xffffff, 0.05 ) )

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
// GRID
//******** **********

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
scene.add(grid);

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

console.log(grid.userData)

//******** **********
// LOOP
//******** **********
var controls = new THREE.OrbitControls(camera, renderer.domElement);
var fps = 30,
lt = new Date(),
frame = 0,
maxFrame = 300;
var loop = function () {
    var now = new Date(),
    per = frame / maxFrame,
    bias = 1 - Math.abs(0.5 - per) / 0.5,
    secs = (now - lt) / 1000,
    ud = grid.userData;
    requestAnimationFrame(loop);
    if(secs > 1 / fps){

        // set position of the grid
        ObjectGridWrap.setPos(grid, ( 1 - per ) * 2, 0 );
        // update grid by current alphas and effects
        ObjectGridWrap.update(grid);

        renderer.render(scene, camera);
        frame += fps * secs;
        frame %= maxFrame;
        lt = now;
    }
};
loop();
