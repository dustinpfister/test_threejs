
(function (api) {

    var clampRadian = function (radian) {
        return radian %= Math.PI * 2;
    };

    var toRadians = function (array) {
        return array.map(function(deg){
            return Math.PI / 180 * deg;
        });
    };

    // create a single cube mesh
    var createCube = function (rotationRates, position) {
        var cube = new THREE.Mesh(
                new THREE.BoxGeometry(1, 1, 1),
                new THREE.MeshNormalMaterial());
        var ud = cube.userData;
        ud.rotationRates = rotationRates || [0, 3.14, 0];
        cube.position.copy(position || new THREE.Vector3(0, 0, 0));
        return cube;
    };

    // update a single cube
    var updateCube = function (cube, secs) {
        var ud = cube.userData,
        rr = ud.rotationRates;
        cube.rotation.x += rr[0] * secs;
        cube.rotation.y += rr[1] * secs;
        cube.rotation.z += rr[2] * secs;
        cube.rotation.x = clampRadian(cube.rotation.x);
        cube.rotation.y = clampRadian(cube.rotation.y);
        cube.rotation.z = clampRadian(cube.rotation.z);
    };

    // public method to create a cube group
    api.create = function(opt) {
        var cubes = new THREE.Group(),
        ud = cubes.userData;
        ud.frame = 0;
        ud.maxFrame = 90;
        ud.fps = 30;
        var i = 0;
        while(i < 8){
            var cube = createCube(
                [6.28, 0.00, 0.00], 
                new THREE.Vector3(0, 0, 0));
            cubes.add(cube);
            i += 1;
        };        
        return cubes;
    };

    // update the group
    var anglesA = toRadians([225, 315, 135, 45]);
    api.update = function(cubes, secs) {
        var gud = cubes.userData;
        var per = gud.frame / gud.maxFrame,
        bias = 1 - Math.abs(per - 0.5) / 0.5;
        cubes.children.forEach(function (cube, i) {
            // position cubes
            var sx = i % 2 - 0.5,
            sz = Math.floor(i / 2) - Math.floor(i / 4) * 2 - 0.5,
            sy = Math.floor(i / (2 * 2)) - 0.5;

            var aIndex = i % 4,
            bIndex = Math.floor(i / 4),
            r1 = anglesA[aIndex],
            x = sx + Math.cos(r1) * 2 * bias,
            y = sy + 2 * bias * (bIndex === 0 ? -1 : 1),
            z = sz + Math.sin(r1) * 2 * bias;

            cube.position.set(x, y, z);

            updateCube(cube, secs);

        });

        // whole group rotation
        var x = Math.PI * 1 * per,
        y = Math.PI * 1 * per,
        z = Math.PI * 1 * per;
        cubes.rotation.set(x, y, z);

        gud.frame += gud.fps * secs;
        gud.frame %= gud.maxFrame; 
    };

}
    (this['CubeGroupMod'] = {}));
