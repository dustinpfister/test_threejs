// Cube Stack example for s3-compare-to-perspective example in threejs-camera-orthographic
var CubeStack = (function () {
    // the public api
    var api = {};
    // create data texture helper
    var createDataTexture = function (width, height) {
        // data texture
        width = width || 16,
        height = height || 16;
        var size = width * height;
        var data = new Uint8Array(4 * size);
        for (let i = 0; i < size; i++) {
            var stride = i * 4;
            var v = Math.floor(THREE.MathUtils.seededRandom() * 255);
            data[stride] = v;
            data[stride + 1] = v;
            data[stride + 2] = v;
            data[stride + 3] = 255;
        }
        var texture = new THREE.DataTexture(data, width, height);
        texture.needsUpdate = true;
        return texture;
    };
    // create the plane
    var createPlane = function (opt) {
        opt = opt || {};
        var plane = new THREE.Mesh(
                // plane geometry
                new THREE.PlaneGeometry(opt.gx, opt.gy, opt.gx, opt.gy),
                // materials
                new THREE.MeshStandardMaterial({
                    color: 0x00ff00,
                    map: createDataTexture(opt.gx * 4, opt.gy * 4),
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
            box = new THREE.Mesh(
                    new THREE.BoxGeometry(1, 1, 1),
                    new THREE.MeshStandardMaterial({
                        color: 0x00ffff,
                        map: createDataTexture(8, 8),
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
        opt = opt || {};
        opt.gx = opt.gx === undefined ? 5 : opt.gx;
        opt.gy = opt.gy === undefined ? 5 : opt.gy;
        var group = new THREE.Group();
        var cubes = new THREE.Group();
        // scale cubes effect
        //cubes.scale.set(1, 0.25 ,1);
        //cubes.position.set(0, -0.75 / 2,0);
        group.add(cubes)
        appendBoxMeshObjects(cubes, opt);
        var plane = createPlane(opt);
        group.add(plane);
        return group;
    };
    var EFFECTS = {};
    // apply effect method
    api.applyEffect = function(stack, effect, opt){

    };
    // return public api
    return api;
}
    ());
