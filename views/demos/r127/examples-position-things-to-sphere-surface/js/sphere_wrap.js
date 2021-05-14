// create wrap method
var createWrap = function () {
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
var setObjToLatLong = function (wrap, childName, latPer, longPer, dist) {
    var childWrap = wrap.getObjectByName('childwrap_' + childName),
    child = wrap.getObjectByName(childName),
    surface = wrap.userData.surface;
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

var addObjectToWrap = function (wrap, objectName) {
    // create a cube and add to surface group
    var cube = new THREE.Mesh(
            new THREE.BoxGeometry(0.5, 0.5, 0.5),
            new THREE.MeshNormalMaterial({
                wireframe: false
            }));
    cube.name = objectName;
    //wrap.userData.cube = cube;
    var childWrap = new THREE.Group();
    childWrap.name = 'childwrap_' + objectName;
    childWrap.add(cube);
    // child wrap user data object
    var ud = childWrap.userData;
    ud.latPer = 0;
    ud.longPer = 0;
    ud.dist = 1.25;
    // add the childWrap group to the surface group
    wrap.userData.surface.add(childWrap);

    setObjToLatLong(wrap, objectName, ud.latPer, ud.longPer, ud.dist);
};
