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
    HouseMod.create = function (materials) {
        materials = materials || materials_default;
        var tree = new THREE.Group();

        var sphere = new THREE.Mesh(
            new THREE.SphereGeometry(1, 15, 15),
            materials.sphere
        );
        tree.add(sphere);

        var trunk = new THREE.Mesh(
            new THREE.BoxGeometry(0.5, 4, 0.5),
            materials.trunk
        );
        trunk.position.set(0, -2.5, 0);
        tree.add(trunk);

        return tree;
    };

}
    (this['TreeSphereMod'] = {}));
