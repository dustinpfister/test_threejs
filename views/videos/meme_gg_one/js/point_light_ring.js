(function (api) {

    // create and return the THREE.Group
    api.create = function (opt) {

        opt = opt || {};
        opt.radiusMin = opt.radiusMin === undefined ? 10 : opt.radiusMin;
        opt.radiusMax = opt.radiusMax === undefined ? 20 : opt.radiusMax;
        opt.lightCount = 10;

        var group = new THREE.Group(),
        i = 0,
        x,
        z;
        while (i < opt.lightCount) {
            var pointLight = new THREE.PointLight(0xffffff, 1);
            pointLight.position.set(0, 0, 0);
            group.add(pointLight);
            i += 1;
        }

        return group;
    };

}
    (this['PointLightRing'] = {}));
