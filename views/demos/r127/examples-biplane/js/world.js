
(function (api) {
    // create world
    api.create = function () {
        var world = new THREE.Group();
        // CREATING A BIPLANE and adding it to the world
        var bp = world.userData.bp = Biplane.create();
        world.add(bp);
        // Camera
        var camera = world.userData.camera = new THREE.PerspectiveCamera(45, 4 / 3, 0.5, 250);
        camera.position.set(-15, 10, 0);
        world.add(camera);
        // ground
        var ground = TileMod.create({
                w: 100,
                h: 100
            });
        ground.position.set(0, -5, 0);
        TileMod.setCheckerBoard(ground);
        world.add(ground);
        // point light
        var pointLight = new THREE.PointLight(0xffffff, 0.8);
        pointLight.position.set(28, 20, 40);
        pointLight.add(new THREE.Mesh(
                new THREE.SphereGeometry(0, 100, 10),
                new THREE.MeshBasicMaterial({
                    color: 'white'
                })));
        world.add(pointLight);
        // ambient light
        world.add(new THREE.AmbientLight(0xffffff, 0.2));

        // return world group
        return world;
    };
    // update world
    api.update = function (world, frame, maxFrame) {
        var wud = world.userData;
        wud.perObj = utils.getPerValues(frame, maxFrame);
        // biplane
        Biplane.update(wud.bp, wud.perObj.per);
        var radian1 = utils.normalizeRadian(utils.pi2 * wud.perObj.per),
        radian2 = utils.normalizeRadian(radian1 + Math.PI / 180 * 1 + Math.PI * 1.5);

        wud.bp.position.set(
            Math.cos(radian1) * 30,
            10,
            Math.sin(radian1) * 30);
        wud.bp.lookAt(new THREE.Vector3(
                Math.cos(radian2) * 10,
                0,
                Math.sin(radian2) * 10));

        wud.camera.position.set(50 - 40 * wud.perObj.biasLog, 10, -20 + 40 * wud.perObj.biasLog);
        //wud.camera.position.set(0,20,0);
        wud.camera.lookAt(wud.bp.position);

    };
}
    (this['worldMod'] = {}));
