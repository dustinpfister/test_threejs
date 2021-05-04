(function (api) {

    var MATERIALS_TREE = {
        sphere: new THREE.MeshBasicMaterial({
            color: 0x00ff80,
            //map: canvasTextureMod.randomGrid(['0', 'r1', '64'], 32, 32, 150),
            side: THREE.DoubleSide
        }),
        trunk: new THREE.MeshBasicMaterial({
            color: 0xffaf80,
            //map: canvasTextureMod.randomGrid(['r1', 'r1', '64'], 32, 32, 150),
            side: THREE.DoubleSide
        })
    };

    var MATERIALS_LIGHTS = {
        sun: new THREE.MeshBasicMaterial({
            emissive: 'white',
            //emissiveMap: canvasTextureMod.randomGrid(['r1', 'r1', '0'])
        }),
        moon: new THREE.MeshStandardMaterial({
            emissive: 'white',
            //emissiveMap: canvasTextureMod.randomGrid(['0', 'r1', 'ri'])
        })
    };

    var MATERIALS_GROUND = {
        grass: new THREE.MeshBasicMaterial({
            color: 'white',
            //map: canvasTextureMod.randomGrid(['0', 'r1', '64'], 128, 125, 200),
        })
    };

    var createTrees = function (count, radius) {
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
    var createLights = function () {
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
        var world = new THREE.Mesh(
                new THREE.SphereGeometry(4, 30, 30),
                MATERIALS_GROUND.grass);
        var trees = createTrees(8);
        trees.rotation.z = Math.PI / 180 * 0;
        world.add(trees);
        var trees2 = createTrees(8);
        trees2.rotation.y = Math.PI / 180 * 20;
        trees2.rotation.x = Math.PI / 180 * 0;
        trees2.rotation.z = Math.PI / 180 * 90;
        world.add(trees2);
        world.userData.lights = createLights();
        world.add(world.userData.lights);
        return world;
    };
    return api;
}
    (this['WorldMod'] = {}));
