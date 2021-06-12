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
        return world;
    };
}
    (this['BetaWorld'] = {}));
