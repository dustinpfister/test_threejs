(function (api) {

    var MATERIALS_TREE = {
        sphere: new THREE.MeshNormalMaterial(),
        trunk: new THREE.MeshNormalMaterial()
    };

    var MATERIALS_LIGHTS = {
        sun: new THREE.MeshNormalMaterial(),
        moon: new THREE.MeshNormalMaterial()
    };

    var MATERIALS_GROUND = {
        grass: new THREE.MeshNormalMaterial()
    };

    var createTrees = function (count, radius, MATERIALS_TREE) {
        count = count === undefined ? 5 : count;
        radius = radius === undefined ? 4 : radius;
        var group = new THREE.Group();
        var i = 0;
        while (i < count) {
            // create a tree
            var tree = TreeSphereMod.create({
                    sphereSize: 0.25 + 0.75 * Math.random(),
                    trunkLength: 1 + 4 * Math.random(),
                    materials: MATERIALS_TREE
                });
            // position and rotate the tree
            var per = i / count,
            radian = Math.PI * 2 * per;
            tree.position.set(Math.cos(radian) * radius, 0, Math.sin(radian) * radius);
            tree.rotation.set(0, Math.PI * 2 - Math.PI / (count / 2) * i, Math.PI * 1.5);
            group.add(tree);
            i += 1;
        }
        return group;
    };

    // create and return a lights group
    var createLights = function (MATERIALS_LIGHTS) {
        var lights = new THREE.Group();
        var sun = new THREE.Mesh(
                new THREE.SphereGeometry(1, 20, 20),
                MATERIALS_LIGHTS.sun);
        sun.add(new THREE.PointLight(0xffff00, 1));
        sun.position.set(11, 0, 0);
        lights.add(sun);
        var moon = new THREE.Mesh(
                new THREE.SphereGeometry(0.25, 20, 20),
                MATERIALS_LIGHTS.moon);
        moon.add(new THREE.PointLight(0x0040ff, 1));
        moon.position.set(-11, 0, 0);
        lights.add(moon);
        // add AmbientLight
        var ambientLight = new THREE.AmbientLight(0xffffff);
        ambientLight.intensity = 0.1;
        lights.add(ambientLight);
        return lights;
    };

    api.create = function (opt) {
        opt = opt || {};
        opt.MATERIALS_GROUND = opt.MATERIALS_GROUND || MATERIALS_GROUND;
        opt.MATERIALS_TREE = opt.MATERIALS_TREE || MATERIALS_TREE;
        opt.MATERIALS_LIGHTS = opt.MATERIALS_LIGHTS || MATERIALS_LIGHTS;

        var world = new THREE.Mesh(
                new THREE.SphereGeometry(4, 30, 30),
                opt.MATERIALS_GROUND.grass);

        var trees = createTrees(8, 4, opt.MATERIALS_TREE);
        trees.rotation.z = Math.PI / 180 * 0;
        world.add(trees);

        var trees2 = createTrees(8, 4, opt.MATERIALS_TREE);
        trees2.rotation.y = Math.PI / 180 * 20;
        trees2.rotation.x = Math.PI / 180 * 0;
        trees2.rotation.z = Math.PI / 180 * 90;
        world.add(trees2);
        world.userData.lights = createLights(opt.MATERIALS_LIGHTS);
        world.add(world.userData.lights);
        world.userData.lightsDPS = {
            x: 0,
            y: 20,
            z: 5
        }
        return world;
    };

    api.update = function (world, secs) {
        var ud = world.userData;
        world.rotation.y += Math.PI / 180 * 5 * secs;
        world.rotation.y %= Math.PI * 2;

        var lights = ud.lights;
        lights.rotation.x += Math.PI / 180 * ud.lightsDPS.x * secs;
        lights.rotation.y += Math.PI / 180 * ud.lightsDPS.y * secs;
        lights.rotation.z += Math.PI / 180 * ud.lightsDPS.z * secs;
        lights.rotation.x %= Math.PI * 2;
        lights.rotation.y %= Math.PI * 2;
        lights.rotation.z %= Math.PI * 2;
    };

    return api;
}
    (this['WorldMod'] = {}));
