
var Biplane = (function () {

    var materials = {
        plane: new THREE.MeshStandardMaterial({
            color: 0x0000af,
            emissive: 0x000044
        }),
        guy: new THREE.MeshStandardMaterial({
            color: 0xffffff,
            emissive: 0x444444
        }),
        prop: new THREE.MeshStandardMaterial({
            color: 0x404040,
            emissive: 0x202020
        })
    };

    var api = {};

    // create a wing
    var createWing = function (opt, y) {
        var wing = new THREE.Mesh(
                new THREE.BoxGeometry(10, 1, 2),
                opt.materials.plane || materials.plane);
        wing.position.y = y;
        wing.position.z = 2.5;
        //wing.geometry.rotateY(Math.PI * 0.5);
        return wing;
    };

    // create a body
    var createBody = function (opt) {
        var body = new THREE.Mesh(
                new THREE.BoxGeometry(2, 2, 10),
                opt.materials.plane || materials.plane);
        //body.position.x = -2;
        //body.geometry.rotateY(Math.PI * 0.5);
        return body;
    };

    // create a body
    var createTail = function (opt) {
        var body = new THREE.Mesh(
                new THREE.BoxGeometry(1, 2, 2),
                opt.materials.plane || materials.plane);
        body.position.z = -4.0;
        body.position.y = 2;
        //body.geometry.rotateY(Math.PI * 0.5);
        return body;
    };

    // create guy
    var createGuy = function () {
        var guy = new THREE.Mesh(
                new THREE.BoxGeometry(1, 1, 1),
                materials.guy);
        guy.position.z = 0;
        guy.position.y = 1.5;
        return guy;
    };

    // create prop
    var createProp = function () {
        var prop = new THREE.Mesh(
                new THREE.BoxGeometry(0.5, 4, 0.5),
                materials.prop);
        prop.position.set(0, 0, 5.25);
        //prop.position.x = 3.25;
        //prop.rotation.t = Math.PI * 0.5;
        //prop.geometry.rotateY(Math.PI * 0.5);
        return prop;
    };

    // main create method
    api.create = function (opt) {
        opt = opt || {};
        opt.materials = opt.materials || {};

        var plane = new THREE.Group();
        // body and tail
        plane.add(createBody(opt));
        plane.add(createTail(opt));
        // ref to prop
        plane.userData.prop = createProp();
        plane.add(plane.userData.prop);
        // wings
        plane.add(createWing(opt, -1));
        plane.add(createWing(opt, 1));
        // guy
        plane.add(createGuy());
        // prop radian to move prop
        plane.userData.propRadian = 0;
        plane.userData.propRPS = 0.25;

        plane.add(new THREE.BoxHelper(plane));

        return plane;
    };

    api.update = function (bi, per) {
        var ud = bi.userData;
        ud.propRadian = Math.PI * 64 * per;
        ud.prop.rotation.set(0, 0, ud.propRadian)
    };

    return api;
}
    ());
