// Cube Stack example for s3-compare-to-perspective example in threejs-camera-orthographic
var CubeStack = (function () {
    // the stack constructor
    var api = {};

    api.create = function (opt) {
        var boxCount = 20,
        box,
        x,
        y,
        z,
        boxArray = [],
        boxIndex = 0;
        opt = opt || {};

        var gx = 5,
        gy = 5;

        var group = new THREE.Group();

        // place some boxes on the plane
        while (boxIndex < boxCount) {
            box = new THREE.Mesh(
                    new THREE.BoxGeometry(1, 1, 1),
                    new THREE.MeshStandardMaterial({
                        color: 0x00ffff,
                        emissive: 0x0a0a0a
                    }));
            x = Math.floor(gx * Math.random());
            y = 0;
            z = Math.floor(gy * Math.random());
            if (boxArray[z] === undefined) {
                boxArray[z] = [];
            }
            if (boxArray[z][x] === undefined) {
                boxArray[z][x] = [];
            }
            boxArray[z][x].push(box);
            y = boxArray[z][x].length - 1;
            box.position.set(
                -2 + x,
                y,
                -2 + z);
            group.add(box);
            boxIndex += 1;
        }

        var plane = new THREE.Mesh(
                // plane geometry
                new THREE.PlaneGeometry(gx, gy, gx, gy),
                // materials
                new THREE.MeshStandardMaterial({
                    color: 0x00ff00,
                    emissive: 0x0a0a0a,
					side: THREE.DoubleSide
                }));
        plane.position.set(0, -0.5, 0);
        plane.rotation.set(-Math.PI / 2, 0, 0);
        group.add(plane);

        return group;

    };

    return api;
}
    ());
