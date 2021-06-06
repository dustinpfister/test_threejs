(function (api) {

    var setRingIntensity = function (pointLightRing, intensity) {
        pointLightRing.children.forEach(function (pointLightSphere) {
            pointLightSphere.material.opacity = intensity;
            pointLightSphere.children[0].intensity = intensity;
        });
    };

    // create and return the THREE.Group
    api.create = function (opt) {
        opt = opt || {};
        opt.radiusMin = opt.radiusMin === undefined ? 80 : opt.radiusMin;
        opt.radiusMax = opt.radiusMax === undefined ? 120 : opt.radiusMax;
        opt.lightCount = 10;
        opt.maxDist = opt.maxDist === undefined ? 100 : opt.maxDist;
        var group = new THREE.Group(),
        i = 0,
        radius
        ud = group.userData;
        ud.radius = opt.radiusMin;
        while (i < opt.lightCount) {
            var pointLightSphere = new THREE.Mesh(
                    new THREE.SphereGeometry(0.25, 30, 30),
                    new THREE.MeshBasicMaterial({
                        color: 0xffffff,
                        transparent: true,
                        opacity: 0
                    })),
            pointLight = new THREE.PointLight(0xffffff, 0, opt.maxDist);
            pointLightSphere.add(pointLight);
            radian = Math.PI * 2 / opt.lightCount * i;
            pointLightSphere.position.set(Math.cos(radian) * ud.radius, 0, Math.sin(radian) * ud.radius);
            group.add(pointLightSphere);
            i += 1;
        }
        setRingIntensity(group, 1);
        return group;
    };

}
    (this['PointLightRing'] = {}));
