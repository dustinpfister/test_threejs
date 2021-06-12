(function (api) {

    var WORLD_RADIUS = 30;

    var MATERIALS = {
       ground: new THREE.MeshStandardMaterial({
           color: new THREE.Color(0, 1, 0),
           emissive: new THREE.Color(0, 0.1, 0)
       })
    };

    // create and return the beta world
    api.create = function () {
        var world = new THREE.Group();
        var worldSphere = new THREE.Mesh(new THREE.SphereGeometry(WORLD_RADIUS, 30, 30), MATERIALS.ground);
        world.add(worldSphere);

        // LIGHT
        var light_sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 30, 30));
        light_sphere.position.set(0, WORLD_RADIUS + 10, -5);
        var light = new THREE.PointLight(0xffffff, 1);
        light_sphere.add(light);
        world.add(light_sphere);
        var light_ambient = new THREE.AmbientLight(0xffffff, 0.25);
        world.add(light_ambient);


        return world;
    };
}
    (this['BetaWorld'] = {}));
