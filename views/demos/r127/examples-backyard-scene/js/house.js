(function (HouseMod) {

    // default materials
    var materials_default = {
        base: new THREE.MeshStandardMaterial({
            color: 0xffffff,
            side: THREE.DoubleSide
        }),
        tri: new THREE.MeshStandardMaterial({
            color: 0xffffff,
            side: THREE.DoubleSide
        }),
        roof: new THREE.MeshStandardMaterial({
            color: 0x8f8f8f,
            side: THREE.DoubleSide
        })
    };

    // create a triangle part of the house
    var HouseTriangle = function(materials){
        materials = materials || materials_default;
        var geometry = new THREE.BufferGeometry();
        var vertices = new Float32Array([
                -1, 0, 0,
                0, 1, 0,
                2, 0, 0
            ]);
        geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
        geometry.computeVertexNormals(); // compute vertex normals
        geometry.addGroup(0, 3, 0); // just one group
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

        // house triangle parts
        var tri1 = HouseTriangle(materials);
        tri1.position.set(-0.5, 1 , 2);
        house.add(tri1);
        var tri2 = HouseTriangle(materials);
        tri2.position.set(-0.5, 1 , -2);
        house.add(tri2);

        // roof
        var roof1 = new THREE.Mesh(
            new THREE.PlaneGeometry(3, 4), 
            materials.roof);
        roof1.position.set(0, 3, 0);
        roof1.rotation.set(Math.PI * 0.5, Math.PI * 0.25, 0);
        house.add(roof1);

        // house should cast a shadow
        house.castShadow = true;
        house.receiveShadow = false;
        return house;
    };

}
    (this['HouseMod'] = {}));
