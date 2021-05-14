(function (api) {

    // create wrap method
    api.createWrap = function () {
        // create a wrap group
        var wrap = new THREE.Group();
        // add a sphere to the wrap
        var sphere = new THREE.Mesh(
                new THREE.SphereGeometry(1, 40, 40),
                new THREE.MeshNormalMaterial({
                    wireframe: true
                }));
        wrap.userData.sphere = sphere;
        wrap.add(sphere);
        // create a surface group and add to wrap
        var surface = new THREE.Group();
        wrap.userData.surface = surface;
        wrap.add(surface);
        return wrap;
    };

    // set to lat and long helper
    api.setObjToLatLong = function (wrap, childName, latPer, longPer, dist) {
        var childWrap = wrap.getObjectByName('objwrap_' + childName),
        child = childWrap.children[0]; //wrap.getObjectByName(childName),
        // set lat
        var radian = Math.PI * -0.5 + Math.PI * latPer,
        x = Math.cos(radian) * dist,
        y = Math.sin(radian) * dist;
        child.position.set(x, y, 0);
        // set long
        childWrap.rotation.y = Math.PI * 2 * longPer;
        // look at origin
        child.lookAt(0, 0, 0);
    };

    // Add an Object to a Sphere Wrap Group
    api.addObjectToWrap = function (wrap, objectName, obj) {
        // create an obj
        obj = obj || new THREE.Mesh(
                new THREE.BoxGeometry(0.5, 0.5, 0.5),
                new THREE.MeshNormalMaterial({
                    wireframe: false
                }));
        obj.name = objectName;
        var objWrap = new THREE.Group();
        objWrap.name = 'objwrap_' + objectName;
        objWrap.add(obj);
        // obj wrap user data object
        var ud = objWrap.userData;
        ud.latPer = 0;
        ud.longPer = 0;
        var radius = wrap.userData.sphere.geometry.parameters.radius;
        ud.dist = radius + 0.25;
        // add the objWrap group to the surface group
        wrap.userData.surface.add(objWrap);
        //set position for the first time
        api.setObjToLatLong(wrap, objectName, ud.latPer, ud.longPer, ud.dist);
    };

}
    (this['SphereWrap'] = {}));
