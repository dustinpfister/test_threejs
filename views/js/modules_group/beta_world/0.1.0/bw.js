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
        // main world group object
        var world = new THREE.Group();
        // world sphere
        var worldSphere = new THREE.Mesh(new THREE.SphereGeometry(WORLD_RADIUS, 30, 30), MATERIALS.ground);
        // ref to worldSphere in ud
        world.userData.worldSphere = worldSphere;
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

    // set on sphere helper
    var setOnSphereFromPos = function(mesh, x, y, z, alt){
         var dir = new THREE.Vector3(x, y, z).normalize();
         var pos = new THREE.Vector3();
         pos.x = dir.x * alt;
         pos.y = dir.y * alt;
         pos.z = dir.z * alt;
         mesh.position.copy(pos);
    };

    var setOnSphere = function(mesh, lat, long, alt){
        var latBias = Math.abs(lat - 0.5) / 0.5;
        var radian = Math.PI * 2 * long,
        x = Math.cos(radian) * (alt - alt * latBias),
        z = Math.sin(radian) * (alt - alt * latBias),
        y = alt * latBias * (lat > 0.5 ? -1 : 1);
        setOnSphereFromPos(mesh, x, y, z, alt);
    };

    // position object relative to the surface of the beta world
    api.positionObject = function(world, obj, latPer, longPer, alt){
        var surfaceAlt = 30 + alt;
        setOnSphere(obj, latPer, longPer, surfaceAlt);
    };

}
    (this['BetaWorld'] = {}));
