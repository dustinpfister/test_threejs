
(function (api) {
    // create world
    api.create = function () {
        var world = new THREE.Group();
        //world.add(new THREE.GridHelper(10, 10));
        // CREATING A BIPLANE and adding it to the world
        var bp = world.userData.bp = Biplane.create();
        //bp.scale.set(0.1,0.1,0.1);
        world.add(bp);
        // Camera
        var camera = world.userData.camera = new THREE.PerspectiveCamera(45, 4 / 3, 0.5, 250);
        camera.position.set(70, 70, 70);
        camera.lookAt(bp.position);
        world.add(camera);
        // ground


        var ground = TileMod.create({
                w: 100,
                h: 100
            });
        ground.position.set(0, -5, 0);
        TileMod.setCheckerBoard(ground);
        var cube = new THREE.Mesh(
            new THREE.BoxGeometry(1,1,1),
            new THREE.MeshNormalMaterial()
        );
        cube.position.set(0, -4, 0);
        world.add(cube);
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
        radian2 = utils.normalizeRadian(radian1 + Math.PI / 180 * 10);

        var pitch = Math.sin( Math.PI * 16 * wud.perObj.per)
        wud.bp.position.set(
            Math.cos(radian1) * 40,
            5,
            Math.sin(radian1) * 40);


        var target = new THREE.Vector3(
            Math.cos(radian2) * 40,
            7 + 5 * pitch,
            Math.sin(radian2) * 40);

        wud.bp.lookAt(target);

    };
}
    (this['worldMod'] = {}));
