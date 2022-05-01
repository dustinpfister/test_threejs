// Cube Stack example for s3-compare-to-perspective example in threejs-camera-orthographic
var CubeStack = (function () {
    // the public api
    var api = {};
    // create the plane
    var createPlane = function (opt) {
        opt = opt || {};
        var planeColor = opt.colors[opt.planeColor === undefined ? 1: opt.planeColor];
        var plane = new THREE.Mesh(
                // plane geometry
                new THREE.PlaneGeometry(opt.gw, opt.gh, opt.gw, opt.gh),
                // materials
                new THREE.MeshStandardMaterial({
                    color: 0xffffff,
                    //map: datatex.seededRandom(opt.gx * 4, opt.gy * 4, 0, 1, 0, [64, 255]),
                    map: datatex.seededRandom.apply(null, [opt.gw * 4, opt.gh * 4].concat( planeColor ) ),
                    emissive: 0x0a0a0a,
                    side: THREE.DoubleSide
                }));
        plane.position.set(0, -0.5, 0);
        plane.rotation.set(-Math.PI / 2, 0, 0);
        return plane;
    };

    var getCubeStack = function(stack, x, y){

        var name = 'cubestack_' + x + '_' + y;
        return stack.userData.cubeGroups.getObjectByName(name);

    };

    // append cube groups for what should be a new stack group
    var appendCubeGroups = function(stack, opt){

        var i = 0,
        len = opt.gw * opt.gh;
        while(i < len){
            var x = i % opt.gw,
            y = Math.floor(i / opt.gw);

            // start new cube stack, set userData for it
            var cubeStack = new THREE.Group(),
            ud = cubeStack.userData;
            ud.x = x;
            ud.y = y;
            ud.i = i;

            // name for this cubeStack
            cubeStack.name = 'cubestack_' + x + '_' + y;

            // set postion of this cube stack group
            var px = (opt.gw / 2 * -1 + 0.5) + x,
            py = 0,
            pz = (opt.gh / 2 * -1 + 0.5) + y;
            cubeStack.position.set(px, py, pz);

            // add to cubeGroups group
            stack.userData.cubeGroups.add(cubeStack)

            i += 1;
        }
    };

    // append mesh objects
    var getPos = {};
    // random get pos method
    getPos.random = function(stack, opt, i){
        return {
            x: Math.floor(opt.gw * Math.random()),
            z: Math.floor(opt.gh * Math.random())
        };
    };
    var appendBoxMeshObjects = function (stack, opt) {
        opt = opt || {};
        opt.boxCount = opt.boxCount === undefined ? 30 : opt.boxCount;
        var boxIndex = 0;
        while (boxIndex < opt.boxCount) {
            boxIndex += 1;
            // get the cube stack group to place the new mesh
            //var x = Math.floor(opt.gw * Math.random());
            //var z = Math.floor(opt.gh * Math.random());
            var pos = getPos.random(stack, opt, boxIndex);

            var cubeStack = getCubeStack(stack, pos.x, pos.z);
            // if we have a cube stack
            if(cubeStack){
                var y = cubeStack.children.length;
                var cubeColor = opt.colors[Math.floor(opt.colors.length * Math.random())];
                var box = new THREE.Mesh(
                    new THREE.BoxGeometry(1, 1, 1),
                    new THREE.MeshStandardMaterial({
                        color: 0xffffff,
                        //map: datatex.seededRandom(8, 8, 1, 1, 1, [180, 255]),
                        map: datatex.seededRandom.apply(null, [8,8].concat( cubeColor ) ),
                        emissive: 0x1a1a1a
                    }));
                box.position.set(0, y , 0);
                cubeStack.add(box);
            }
        }
    };

    // public create method
    api.create = function (opt) {
        var stack = new THREE.Group();
        opt = opt || {};
        opt.gw = stack.userData.gw = opt.gw === undefined ? 5 : opt.gw;
        opt.gh = stack.userData.gh = opt.gh === undefined ? 5 : opt.gh;
        opt.colors = stack.userData.colors = opt.colors || [
            [1, 1, 1, [0, 255]],
            [0, 1, 0, [200, 255]]
        ];
        // main cube groups
        var cubes = stack.userData.cubeGroups = new THREE.Group();
        stack.add(cubes);
        // appedn cube groups
        appendCubeGroups(stack, opt);
        // append mesh objects for cube groups
        appendBoxMeshObjects(stack, opt);
        // create and app the plane
        var plane = stack.userData.plane = createPlane(opt);
        stack.add(plane);
        return stack;
    };
    var EFFECTS = {};

    // effect to scale all cubes up and down by scaling the y value of the cubes group
    EFFECTS.scaleCubeGroup = function(stack, opt){
        opt = opt || {};
        opt.yMax = opt.yMax === undefined ? 1 : opt.yMax;
        opt.yPer = opt.yPer === undefined ? 1 : opt.yPer;
        var cubes = stack.userData.cubeGroups;
        var y = opt.yMax * opt.yPer;
        cubes.scale.set(1, y ,1);
        cubes.position.set(0, (opt.yMax - y) * -1 / 2,0);
    };

    // scale all cubes on a cube by cube basis
    EFFECTS.scaleCubes = function(stack, opt){
        opt = opt || {};
        opt.scale = opt.scale === undefined ? 1: opt.scale;
        opt.per = opt.per === undefined ? 1: opt.per;
        // scale all cubes
        stack.userData.cubeGroups.children.forEach(function(cubeStack){
            var len = cubeStack.children.length;
            cubeStack.children.forEach(function(cube, i){
                cube.scale.set(opt.scale, opt.scale, opt.scale);
                cube.rotation.y = Math.PI * 4 * ( i / len) * opt.per;
            });
        });
    };


    // apply effect method
    api.applyEffect = function(stack, effectKey, opt){
        EFFECTS[effectKey](stack, opt);
    };
    // return public api
    return api;
}
    ());
