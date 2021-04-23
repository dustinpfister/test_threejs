(function (HouseMod) {

    // default materials
    var materials_default = {
        base: new THREE.MeshStandardMaterial({
            color: 0xffffff,
            side: THREE.DoubleSide
        }),
        tri: new THREE.MeshBasicMaterial({
            color: 0x4a4a4a,
            side: THREE.DoubleSide
        })
    };

    var HouseTriangle = function(materials){
        materials = materials || materials_default;
        var geometry = new THREE.BufferGeometry();
        var vertices = new Float32Array([
                -1, 0, 0,
                0, 1, 0,
                2, 0, 0
            ]);
        geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
        return new THREE.Mesh(
            geometry, 
            materials.tri);
    };

    // create and return a house
    HouseMod.create = function(materials){
        materials = materials || materials_default;
        // mian house group
        var house = new THREE.Group();
        // base of house is just a BOX
        var base = new THREE.Mesh(new THREE.BoxGeometry(3, 2, 4), materials.base);
        house.add(base);

        var tri1 = HouseTriangle(materials);
        tri1.position.set(-0.5, 1 , 2);
        house.add(tri1);
        var tri2 = HouseTriangle(materials);
        tri2.position.set(-0.5, 1 , -2);
        house.add(tri2);

        house.castShadow = true;
        house.receiveShadow = false;
        return house;
    };

}
    (this['HouseMod'] = {}));
