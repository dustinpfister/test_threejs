// house.js - r1 - from threejs-examples-house
(function (HouseMod) {
    // default materials
    const materials_default = {
        base: new THREE.MeshStandardMaterial({
            color: 0xff0000,
            side: THREE.DoubleSide
        }),
        tri: new THREE.MeshStandardMaterial({
            color: 0xff0000,
            side: THREE.DoubleSide
        }),
        roof: new THREE.MeshStandardMaterial({
            color: 0x202020,
            side: THREE.DoubleSide
        })
    };
    // create a triangle part of the house
    const HouseTriangle = function(materials){
        materials = materials || materials_default;
        const geometry = new THREE.BufferGeometry();
        const vertices1 = new Float32Array([
                -1, 0, 0,
                0.5, 1.5, 0,
                2, 0, 0
            ]);
        geometry.setAttribute('position', new THREE.BufferAttribute(vertices1, 3));
        geometry.computeVertexNormals(); // compute vertex normals
        geometry.addGroup(0, 3, 0); // just one group
        // uv attribute
        const vertices2 = new Float32Array([
                0, 0,
                1, 0,
                1, 1
            ]);
        geometry.setAttribute('uv', new THREE.BufferAttribute(vertices2, 2));
        return new THREE.Mesh(
            geometry, 
            materials.tri);
    };
    // create and return a house
    HouseMod.create = function(materials){
        materials = materials || materials_default;
        // mian house group
        const house = new THREE.Group();
        // base of house is just a BOX
        const base = new THREE.Mesh(new THREE.BoxGeometry(3, 2, 4), materials.base);
        house.add(base);
        // house triangle parts
        const tri1 = HouseTriangle(materials);
        tri1.geometry.rotateY(Math.PI);
        tri1.position.set(0.5, 1 , 2);
        house.add(tri1);
        const tri2 = HouseTriangle(materials);
        tri2.position.set(-0.5, 1 , -2);
        house.add(tri2);
        // roof
        const roof1 = new THREE.Mesh(
            new THREE.PlaneGeometry(2.84, 4.5), 
            materials.roof);
        roof1.geometry.rotateY(Math.PI);
        roof1.position.set(-1, 1.51, 0);
        roof1.rotation.set(Math.PI * 0.5, Math.PI * 0.25, 0);
        house.add(roof1);
        const roof2 = new THREE.Mesh(
            new THREE.PlaneGeometry(2.84, 4.5), 
            materials.roof);
        roof2.geometry.rotateY(Math.PI);
        roof2.position.set(1, 1.51, 0);
        roof2.rotation.set(Math.PI * 0.5, Math.PI * -0.25, 0);
        house.add(roof2);
        // house should cast a shadow
        house.castShadow = true;
        house.receiveShadow = false;
        return house;
    };

}
    (this['HouseMod'] = {}));
