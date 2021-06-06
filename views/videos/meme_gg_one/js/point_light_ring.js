(function (api) {

    // create and return the THREE.Group
    api.create = function (opt) {

        opt = opt || {};
        opt.radiusMin = opt.radiusMin === undefined ? 10 : opt.radiusMin;
        opt.radiusMax = opt.radiusMax === undefined ? 20 : opt.radiusMax;
        opt.lightCount = 10;

        var group = new THREE.Group(),
        i = 0,
        radius
        ud = group.userData;
        ud.radius = opt.radiusMin;
        while (i < opt.lightCount) {
            var pointLightSphere = new THREE.Mesh(
                    new THREE.SphereGeometry(0.5, 30, 30),
                    new THREE.MeshBasicMaterial({
                        color: 0xffffff,
                        transparent: true,
                        opacity: 0.5
                    })),
            pointLight = new THREE.PointLight(0xffffff, 0.5);
            pointLightSphere.add(pointLight);
            radian = Math.PI * 2 / opt.lightCount * i;
            pointLightSphere.position.set(Math.cos(radian) * ud.radius, 0, Math.sin(radian) * ud.radius);
            group.add(pointLightSphere);
            i += 1;
        }

        return group;
    };

}
    (this['PointLightRing'] = {}));
