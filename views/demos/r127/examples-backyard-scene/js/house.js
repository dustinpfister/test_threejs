(function (HouseMod) {

    // default materials
    var materials_default = {
        sides: new THREE.MeshStandardMaterial({
            color: 0xffffff
        })
    };

    // create and return a house
    HouseMod.create = function(materials){
        materials = materials || materials_default;
        var house = new THREE.Mesh(new THREE.BoxGeometry(3, 2, 4), materials.sides);
        house.castShadow = true;
        house.receiveShadow = false;
        return house;
    };

}
    (this['HouseMod'] = {}));
