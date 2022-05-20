//******** **********
// ObjectGridWrap module
//******** **********
var ObjectGridWrap = (function(){

    // public API
    var api = {};

    var mesh = new THREE.Mesh( new THREE.BoxGeometry( 1, 1, 1), new THREE.MeshNormalMaterial());
    var mesh2 = new THREE.Mesh( new THREE.BoxGeometry( 1, 1, 1), new THREE.MeshNormalMaterial());
    mesh2.position.y += 1.5;
    mesh.add(mesh2);
    var  DEFAULT_SOURCE_OBJECTS = [
        mesh,
        new THREE.Mesh( new THREE.SphereGeometry( 0.5, 30, 30), new THREE.MeshNormalMaterial())
    ];

    var DEFAULT_OBJECT_INDICES = [
                                  1,0,1,0,1,
                                  0,0,0,0,0,
                                  1,0,1,0,1,
                                  0,0,0,0,0,
                                  1,0,1,0,1];

    // default cloner method
    var DEFAULT_CLONER = function(opt, objectIndex){
        var obj_root = opt.sourceObjects[objectIndex].clone();
        obj_root.traverse(function(obj){
            if(obj.material){
                obj.material = obj.material.clone();
            }
        });
        return obj_root;
    };

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
        ud.space = opt.space === undefined ? 1 : opt.space;
        ud.alphaX = opt.alphaX;
        ud.alphaZ = opt.alphaZ;
        ud.tw = opt.tw;
        ud.th = opt.th;
        ud.aOpacity = opt.aOpacity === undefined ? 1.0 : opt.aOpacity;
        var i = 0, len = opt.tw * opt.th;
        while(i < len){
            var objIndex = opt.objectIndices[i];

            //var obj = opt.sourceObjects[objIndex].clone();
            //if(obj.material){
            //    obj.material = obj.material.clone();
            //}
            var obj = opt.cloner(opt, objIndex);

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
        var v_adjust = getAdjustedPos(grid, objectIndex);
        // use spacing
        var x = v_adjust.x * ud.space;
        var z = v_adjust.y * ud.space;
        // subtract so that objects are centered
        x -= (ud.tw - 1) * ud.space / 2;
        z -= (ud.th - 1) * ud.space / 2;
        // set position
        obj.position.set(x, 0, z);
    };

    // set opacity for object and any and all nested objects
    var setOpacity = function(obj_root, alpha){
        obj_root.traverse(function(obj){
            // any object with a material
            if(obj.material){
                obj.material.transparent = true;
                obj.material.opacity = alpha;
            }
        });
    };

    // Object opacity check
    var objectOpacityCheck = function(grid, objectIndex){
        var ud = grid.userData,
        obj = grid.children[objectIndex],
        v_center = new THREE.Vector2(ud.tw / 2, ud.th / 2),
        distMax = v_center.distanceTo( new THREE.Vector2(0.5, 0.5) );
        var v_adjust = getAdjustedPos(grid, objectIndex);
        var v2 = new THREE.Vector2(v_adjust.x + 0.5, v_adjust.y + 0.5),
        d = v2.distanceTo( v_center );
        d *= ud.aOpacity;        
        d = d < 0 ? 0 : d;
        d = d > distMax ? distMax : d;

        var b = d / distMax;
        b = 1 - b;
        b = parseFloat(b.toFixed(2));
        // call set opacity helper
        setOpacity(obj, b);
        //console.log(i, '(' + trueX + ',' + trueZ + ')', 'd=' + d.toFixed(2), distMax.toFixed(2), b);
    };

    // main update method
    api.update = function(grid){

        grid.children.forEach(function(obj, i){
            setGridToAlphas(grid, i);
            objectOpacityCheck(grid, i);
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
    space: 1.5,
    tw: 6,
    th: 5,
    aOpacity: 1.25,
    objectIndices: [
        1,1,1,1,1,0,
        1,0,0,0,1,0,
        1,0,1,0,1,0,
        1,0,0,0,1,0,
        1,1,1,1,1,0]
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
    secs = (now - lt) / 1000,
    ud = grid.userData;
    requestAnimationFrame(loop);

    if(secs > 1 / fps){

        ud.alphaX -= 0.1 * secs;
        ud.alphaX = THREE.MathUtils.euclideanModulo(ud.alphaX, 1);
        ud.alphaZ -= -0.05 * secs;
        ud.alphaZ = THREE.MathUtils.euclideanModulo(ud.alphaZ, 1);
        ObjectGridWrap.update(grid);

        renderer.render(scene, camera);
        frame += fps * secs;
        frame %= maxFrame;
        lt = now;
    }
};

//renderer.render(scene, camera);

loop();
