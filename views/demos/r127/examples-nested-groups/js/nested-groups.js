
(function (api) {

  

    // create nested groups
    api.create = function(opt) {
        var nested = new THREE.Group(),
        nud = nested.userData;
        // Camera
        var camera = nud.camera = new THREE.PerspectiveCamera(45, 4 / 3, .5, 100);
        camera.position.set(0, 10, 10);
        camera.lookAt(0, 0, 0);
        // add camera to nested
        nested.add(camera);
        // grid helper
        var gridHelper = new THREE.GridHelper(10, 10);
        nested.add(gridHelper);
        var cubes1 = nud.cubes1 = CubeGroupMod.create({
            anglesA:[180, 270, 90, 0],
            yDelta: 1.25,
            xzDelta: 0.75,
            maxFrame: 180,
            fps: 30,
            cubeRotations: [],
            rotations: [1, 1, 1]
        });
        nested.add(cubes1);
        return nested;

    };

  
    // update the nested groups
    api.update = function(nested, secs) {
       CubeGroupMod.update(nested.userData.cubes1, secs);
    };

}
    (this['NestedGroupsMod'] = {}));
