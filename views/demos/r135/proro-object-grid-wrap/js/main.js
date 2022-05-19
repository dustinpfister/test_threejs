//******** **********
// ObjectGridWrap module
//******** **********
var ObjectGridWrap = (function(){

    var  DEFAULT_SOURCE_OBJECTS = [
        new THREE.Mesh( new THREE.BoxGeometry( 1, 1, 1), new THREE.MeshNormalMaterial()),
        new THREE.Mesh( new THREE.SphereGeometry( 0.5, 30, 30), new THREE.MeshNormalMaterial())
    ];

    var DEFAULT_OBJECT_INDICES = [0,0,0,0,
                                  0,1,1,0,
                                  0,1,1,0,
                                  0,0,0,0];

    var api = {};

    // The create method will create and return a new THREE.Group with desired source objects
    // and induces for where clones of these objects shall be placed
    api.create = function(opt){
        opt = opt || {};
        opt.sourceObjects = opt.sourceObjects || DEFAULT_SOURCE_OBJECTS;
        opt.objectIndices = opt.objectIndices || DEFAULT_OBJECT_INDICES;
        opt.tw = 4; // tile width and height
        opt.th = 4;
        opt.alphaX = 0; // alpha x and z values
        opt.alphaZ = 0;
        var grid = new THREE.Group();
        var ud = grid.userData; 
        ud.alphaX = opt.alphaX;
        ud.alphaZ = opt.alphaZ;
        ud.tw = opt.tw;
        ud.th = opt.th;
        var i = 0, len = opt.tw * opt.th;
        while(i < len){
            var objIndex = opt.objectIndices[i];
            var mesh = opt.sourceObjects[objIndex].clone();
            grid.add(mesh);
            i += 1;
        };
        api.update(grid);
        return grid;
    };

    // set grid to alphas helper
    var setGridToAlphas = function(grid){
        var ud = grid.userData;
        grid.children.forEach(function(obj, i){
            // true positions
            var trueX = i % ud.tw,
            trueZ = Math.floor(i / ud.tw);
            // adjusted by alphas
            var ax = (trueX + ud.tw * ud.alphaX) % ud.tw;
            var az = (trueZ + ud.th * ud.alphaZ) % ud.th;
            // scaled
            var x = ax * 5;
            var z = az * 5;
            obj.position.set(x, 0, z);
        });
    };

    api.update = function(grid){

        setGridToAlphas(grid);

    };



    return api;

}());


//******** **********
// SCENE, CAMERA, RENDERER
//******** **********
var scene = new THREE.Scene();
scene.background = new THREE.Color('#4a4a4a');
scene.add( new THREE.GridHelper(10, 10, 0x00ff00, 0xffffff) )
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(-10, 10, 0);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
//******** **********
// LIGHT
//******** **********
var dl = new THREE.DirectionalLight(0xffffff, 1);
dl.position.set(2, -1, -1.5);
scene.add(dl);


var grid = ObjectGridWrap.create();
scene.add(grid);


//******** **********
// LOOP
//******** **********
var controls = new THREE.OrbitControls(camera, renderer.domElement);

controls.addEventListener('change', function(a, b){
})

var fps = 30,
lt = new Date(),
frame = 0,
maxFrame = 300;
var loop = function () {
    var now = new Date(),
    per = frame / maxFrame,
    bias = 1 - Math.abs(0.5 - per) / 0.5,
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    if(secs > 1 / fps){


grid.userData.alphaX += 0.1 * secs;
grid.userData.alphaX %= 1;

grid.userData.alphaZ += 0.05 * secs;
grid.userData.alphaZ %= 1;

ObjectGridWrap.update(grid);

        
        renderer.render(scene, camera);

       

        frame += fps * secs;
        frame %= maxFrame;
        lt = now;
    }
};
loop();
