
(function (api) {

    var clampRadian = function (radian) {
        return radian %= Math.PI * 2;
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
        ud.frame = 50;
        ud.maxFrame = 50;
        ud.fps = 30;
        var i = 0;
        while(i < 8){
            var cube = createCube(
                [3.14, 0.00, 0.00], 
                new THREE.Vector3(0, 0, 0));
            cubes.add(cube);
            i += 1;
        };        
        return cubes;
    };

    // update the group
    api.update = function(cubes, secs) {
        var gud = cubes.userData;
        var per = gud.frame / gud.maxFrame;
        cubes.children.forEach(function (cube, i) {
            // position cubes
            var sx = i % 2,
            sz = Math.floor(i / 2) - Math.floor(i / 4) * 2,
            sy = Math.floor(i / (2 * 2));

            var pi2 = Math.PI * 2,
            r1 = pi2 / 4 * (i % 4),
            x = sx + Math.cos(r1) * 2 * per,
            y = sy,
            z = sz + Math.sin(r1) * 2 * per;

            cube.position.set(x, y, z);

            //updateCube(cube, secs);
        });
        gud.frame += gud.fps * secs;
        gud.frame %= gud.maxFrame; 
    };

}
    (this['CubeGroupMod'] = {}));
