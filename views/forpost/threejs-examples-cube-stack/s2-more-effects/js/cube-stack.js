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
                new THREE.PlaneGeometry(opt.gx, opt.gy, opt.gx, opt.gy),
                // materials
                new THREE.MeshStandardMaterial({
                    color: 0xffffff,
                    //map: datatex.seededRandom(opt.gx * 4, opt.gy * 4, 0, 1, 0, [64, 255]),
                    map: datatex.seededRandom.apply(null, [opt.gx * 4, opt.gy * 4].concat( planeColor ) ),
                    emissive: 0x0a0a0a,
                    side: THREE.DoubleSide
                }));
        plane.position.set(0, -0.5, 0);
        plane.rotation.set(-Math.PI / 2, 0, 0);
        return plane;
    };
    // append mesh objects
    var appendBoxMeshObjects = function (group, opt) {
        opt = opt || {};
        opt.boxCount = opt.boxCount === undefined ? 30 : opt.boxCount;
        var boxIndex = 0,
        boxArray = [],
        x,
        y,
        z,
        box;
        // place some boxes on the plane
        while (boxIndex < opt.boxCount) {
           var cubeColor = opt.colors[Math.floor(opt.colors.length * Math.random())];
            box = new THREE.Mesh(
                    new THREE.BoxGeometry(1, 1, 1),
                    new THREE.MeshStandardMaterial({
                        color: 0xffffff,
                        //map: datatex.seededRandom(8, 8, 1, 1, 1, [180, 255]),
                        map: datatex.seededRandom.apply(null, [8,8].concat( cubeColor ) ),
                        emissive: 0x1a1a1a
                    }));
            x = Math.floor(opt.gx * Math.random());
            y = 0;
            z = Math.floor(opt.gy * Math.random());
            if (boxArray[z] === undefined) {
                boxArray[z] = [];
            }
            if (boxArray[z][x] === undefined) {
                boxArray[z][x] = [];
            }
            boxArray[z][x].push(box);
            y = boxArray[z][x].length - 1;
            box.position.set(
                (opt.gx / 2 * -1 + 0.5) + x,
                y,
                (opt.gy / 2 * -1 + 0.5) + z)
            group.add(box);
            boxIndex += 1;
        }
    };
    // public create method
    api.create = function (opt) {
        var stack = new THREE.Group();
        opt = opt || {};
        opt.gx = opt.gx === undefined ? 5 : opt.gx;
        opt.gy = opt.gy === undefined ? 5 : opt.gy;
        opt.colors = stack.userData.colors = opt.colors || [
            [1, 1, 1, [0, 255]],
            [0, 1, 0, [200, 255]]
        ];
        var cubes = stack.cubes = new THREE.Group();
        // scale cubes effect

        stack.add(cubes)
        appendBoxMeshObjects(cubes, opt);
        var plane = stack.plane = createPlane(opt);
        stack.add(plane);
        return stack;
    };
    var EFFECTS = {};

    // effect to scale all cubes up and down by scaling the y value of the cubes group
    EFFECTS.scaleCubeGroup = function(stack, opt){
        opt = opt || {};
        opt.yMax = opt.yMax === undefined ? 1 : opt.yMax;
        opt.yPer = opt.yPer === undefined ? 1 : opt.yPer;
        var cubes = stack.cubes;
        var y = opt.yMax * opt.yPer;
        cubes.scale.set(1, y ,1);
        cubes.position.set(0, (opt.yMax - y) * -1 / 2,0);
    };

    // scale all cubes on a cube by cube basis
    EFFECTS.scaleCubes = function(stack, opt){
        opt = opt || {};
        opt.scale = opt.scale === undefined ? 1: opt.scale;


        stack.cubes.children.forEach(function(cube){
            cube.scale.set(opt.scale, opt.scale, opt.scale);
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
