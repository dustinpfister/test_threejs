(function (HouseMod) {

    // default materials
    var materials_default = {
        sphere: new THREE.MeshBasicMaterial({
            color: 0x00ff00,
            //map: canvasTextureMod.randomGrid(['r1', '0', '0'], 64, 128, 255),
            side: THREE.DoubleSide
        }),
        trunk: new THREE.MeshBasicMaterial({
            color: 0xffaf00,
            side: THREE.DoubleSide
        })
    };

    // create and return a house
    HouseMod.create = function (opt) {

        opt = opt || {};
        opt.trunkLength = opt.trunkLength === undefined ? 2 : opt.trunkLength;
        opt.sphereSize = opt.sphereSize === undefined ? 1 : opt.sphereSize;
        opt.trunkSize = opt.trunkSize === undefined ? 0.25 : opt.trunkSize;
        opt.widthSegments = opt.widthSegments === undefined ? 15 : opt.widthSegments;
        opt.heightSegments = opt.heightSegments === undefined ? 15 : opt.heightSegments;

        var materials = opt.materials || materials_default;
        var tree = new THREE.Group();

        var sphere = new THREE.Mesh(
            new THREE.SphereGeometry(opt.sphereSize, opt.widthSegments, opt.heightSegments),
            materials.sphere
        );
        sphere.position.set(0, opt.trunkLength / 2 + opt.sphereSize * 0.75, 0);
        tree.add(sphere);

        var trunk = new THREE.Mesh(
            new THREE.BoxGeometry(opt.trunkSize, opt.trunkLength, opt.trunkSize),
            materials.trunk
        );
        trunk.position.set(0, 0, 0);
        tree.add(trunk);

        return tree;
    };

}
    (this['TreeSphereMod'] = {}));
