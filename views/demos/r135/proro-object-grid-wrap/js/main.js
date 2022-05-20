//******** **********
// ObjectGridWrap module
//******** **********
var ObjectGridWrap = (function(){


var s = 5;
var v1 = new THREE.Vector2(s / 2, s / 2);

//console.log(v1.distanceTo( new THREE.Vector2( 0.5 , 0) ))
//console.log(v1.distanceTo( new THREE.Vector2( s - 1 + 0.5, 0) ))



    var  DEFAULT_SOURCE_OBJECTS = [
        new THREE.Mesh( new THREE.BoxGeometry( 1, 1, 1), new THREE.MeshNormalMaterial()),
        new THREE.Mesh( new THREE.SphereGeometry( 0.5, 30, 30), new THREE.MeshNormalMaterial())
    ];

    var DEFAULT_OBJECT_INDICES = [
                                  1,0,1,0,1,
                                  0,0,0,0,0,
                                  1,0,1,0,1,
                                  0,0,0,0,0,
                                  1,0,1,0,1];

    var api = {};

    // The create method will create and return a new THREE.Group with desired source objects
    // and induces for where clones of these objects shall be placed
    api.create = function(opt){
        opt = opt || {};
        opt.sourceObjects = opt.sourceObjects || DEFAULT_SOURCE_OBJECTS;
        opt.objectIndices = opt.objectIndices || DEFAULT_OBJECT_INDICES;
        opt.tw = 5; // tile width and height
        opt.th = 5;
        opt.alphaX = 0; // alpha x and z values
        opt.alphaZ = 0;
        var grid = new THREE.Group();
        var ud = grid.userData;
        ud.space = opt.space === undefined ? 1 : opt.space;
        ud.alphaX = opt.alphaX;
        ud.alphaZ = opt.alphaZ;
        ud.tw = opt.tw;
        ud.th = opt.th;
        var i = 0, len = opt.tw * opt.th;
        while(i < len){
            var objIndex = opt.objectIndices[i];
            var obj = opt.sourceObjects[objIndex].clone();
            if(obj.material){
                obj.material = obj.material.clone();
            }
            grid.add(obj);
            i += 1;
        };
        api.update(grid);
        return grid;
    };

    // set grid to alphas helper
    var setGridToAlphas = function(grid, objectIndex){
        var ud = grid.userData;
        var obj = grid.children[objectIndex];
        // true positions
        var trueX = objectIndex % ud.tw,
        trueZ = Math.floor(objectIndex / ud.tw);
        // adjusted by alphas
        var ax = (trueX + ud.tw * ud.alphaX) % ud.tw;
        var az = (trueZ + ud.th * ud.alphaZ) % ud.th;
        // use spacing
        var x = ax * ud.space;
        var z = az * ud.space;
        // subtract half of over all grid size
        //x -= ud.tw * ((ud.space - 1 ) / 2);
        //z -= ud.th * ((ud.space - 1 ) / 2);
        obj.position.set(x, 0, z);
    };

    // set grid to alphas helper
/*
    var setOpacity = function(grid, objectIndex){
        var ud = grid.userData;
        var obj = grid.children[objectIndex];
        // true positions
        var trueX = objectIndex % ud.tw,
        trueZ = Math.floor(objectIndex / ud.tw);
        var v2 = new THREE.Vector2(trueX, trueZ),
        d = v2.distanceTo( new THREE.Vector2(ud.tw / 2, ud.th / 2) ),
        a = new THREE.Vector2(0.5, 0.5).distanceTo( new THREE.Vector2(ud.tw / 2, ud.th / 2) ),
        b = d / a;
        b =  parseFloat(1 - b);
        b = b > 1 ? 1 : b;
        b = b < 0 ? 0 : b;
        if(obj.type === 'Mesh'){
            obj.material.transparent = true;
            obj.material.opacity = 0.17;
        }
    };
*/
    // main update method
    api.update = function(grid){


        var ud = grid.userData;
        v_center = new THREE.Vector2(ud.tw / 2, ud.th / 2),
        distMax = v_center.distanceTo( new THREE.Vector2(0.5, 0.5) );
        //distMax = 2;


        grid.children.forEach(function(obj, i){
            setGridToAlphas(grid, i);
            //setOpacity(grid, 1);

        var trueX = i % ud.tw,
        trueZ = Math.floor(i / ud.tw);



        var v2 = new THREE.Vector2(trueX + 0.5, trueZ + 0.5),
        d = v2.distanceTo( v_center ),
        
        d = d < 0 ? 0 : d;
        d = d > distMax ? distMax : d;

        b = d / distMax;
        b = 1 - b;
        b = parseFloat(b.toFixed(2));


//console.log(i, '(' + trueX + ',' + trueZ + ')', 'd=' + d.toFixed(2), distMax.toFixed(2), b);
//console.log('')

            obj.material.transparent = true;
            obj.material.opacity = b;

        });

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
camera.position.set(-10, 5, 0);
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


var grid = ObjectGridWrap.create({
    space: 2
});
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


grid.userData.alphaX -= 0.1 * secs;
grid.userData.alphaX = THREE.MathUtils.euclideanModulo(grid.userData.alphaX, 1);

grid.userData.alphaZ -= 0.00 * secs;
grid.userData.alphaZ = THREE.MathUtils.euclideanModulo(grid.userData.alphaZ, 1);

ObjectGridWrap.update(grid);

        
        renderer.render(scene, camera);

       

        frame += fps * secs;
        frame %= maxFrame;
        lt = now;
    }
};

renderer.render(scene, camera);

//loop();
