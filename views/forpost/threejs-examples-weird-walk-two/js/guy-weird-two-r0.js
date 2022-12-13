// ********** **********
// WEIRD GUY TWO MODULE - r0 - from threejs-examples-weird-walk-two
// 
// ********** **********
(function(api){
    // simple random texture
    const textureRND = datatex.seededRandom(10, 10);
    const pxData = [
        1,1,1,1,
        1,0,0,1,
        1,0,0,1,
        1,1,1,1
    ];
    const width = 4;
    const palette = [
        [0,0,0,255],
        [255,255,255,255]
    ];
    const texturePants = datatex.fromPXDATA(pxData, width, palette);
    // MATERIALS
    const materials = [
        new THREE.MeshStandardMaterial( { map: textureRND, emissive: 0x9a8800, emissiveIntensity: 0.9, wireframe:false } ),
        new THREE.MeshStandardMaterial( { map: texturePants, emissive: 0x00aaff, emissiveIntensity: 0.4 } ),
        new THREE.MeshStandardMaterial( { map: textureRND, emissive: 0xffffff, emissiveIntensity: 0.8 } ),
        new THREE.MeshStandardMaterial( { map: textureRND, emissive: 0x1a1a1a, emissiveIntensity: 0.1 } )
    ];
    // create a new weird guy
    api.create = function(opt){
        opt = opt || {};
        const guy = new THREE.Group();
        guy.name = opt.guyID || 'guy';
        // BODY
        const body = new THREE.Mesh(
            new THREE.BoxGeometry(1, 2.0, 1),
            materials[0]
        );
        body.position.y = 0.25;
        body.name = guy.name + '_body';
        guy.add(body);
        // EYES
        ['eye1', 'eye2'].forEach(function(nameStr, i){
            const eye = new THREE.Mesh(
                new THREE.SphereGeometry(0.2, 30, 30),
                materials[2]
            );
            eye.name = guy.name + '_' + nameStr;
            eye.position.set(-0.2 + 0.4 * i, 0.2, 0.5);
            const innerEye = new THREE.Mesh(
                new THREE.SphereGeometry(0.1, 30, 30),
                materials[3]
            );
            innerEye.position.set(0, 0, 0.125);
            eye.add(innerEye);
            body.add(eye);
        });
        // ADD MOUTH
        const mouth = new THREE.Mesh(
            new THREE.BoxGeometry(0.5, 0.125, 0.25),
            materials[3]
        );
        mouth.name = guy.name + '_mouth';
        mouth.position.set(0, -0.3, 0.5);
        body.add(mouth);
        // ADD ARMS
        ['arm1', 'arm2'].forEach(function(nameStr, i){
            const arm = new THREE.Mesh(
                new THREE.BoxGeometry(0.25, 1.0, 0.25),
                materials[0]
            );
            arm.geometry.translate( 0, 0.5, 0 );
            arm.name = guy.name + '_' + nameStr;
            arm.position.set(-0.625 + 1.25 * i, 0.5, 0);
            const tri = new THREE.Mesh(
                new THREE.BoxGeometry(0.25, 1.0, 0.25),
                materials[0]
            );
            tri.geometry.translate( 0, 0.5, 0 );
            tri.name = guy.name + '_' + nameStr + '_tri';
            tri.position.set(0, 1, 0);
            tri.rotation.set(-1, 0, 0);
            arm.add(tri); 
            body.add(arm);
        });
        // ADD PELVIS
        const pelvis = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1.0, 1),
            materials[1]
        );
        pelvis.name = guy.name + '_pelvis';
        pelvis.position.set(0, -1.25, 0);
        guy.add(pelvis);
        // ADD LEGS
        ['leg1', 'leg2'].forEach(function(nameStr, i){
            // leg group pivot group
            const leg = new THREE.Group();
            leg.name = guy.name + '_' + nameStr;
            // thigh
            const thigh = new THREE.Mesh(
                new THREE.BoxGeometry(0.25, 3.0, 0.5),
                materials[1]
            );
            thigh.position.set(-0.37 + 0.75 * i, 0, 2.0);
            thigh.rotation.set(Math.PI * 0.5, 0, 0);
            // caff
            const caff = new THREE.Mesh(
                new THREE.BoxGeometry(0.25, 1.5, 0.5),
                materials[1]
            );
            caff.rotation.x = Math.PI * 1.5;
            caff.position.y = 1.25;
            caff.position.z = 1;
            thigh.add(caff);
            leg.add(thigh);
            pelvis.add(leg);
        });
        return guy;
    };
    // setWalk
    api.setWalk = function(guy, walkPer){
        const leg1 = guy.getObjectByName(guy.name + '_leg1'),
        leg2 = guy.getObjectByName(guy.name + '_leg2');
        leg1.rotation.x = Math.PI * (-0.05 + 0.1 * walkPer);
        leg2.rotation.x = Math.PI * (0.05 - 0.1 * walkPer);
    };
    // set arms method
    api.setArm = function(guy, armNum, a1, a2){
        armNum = armNum === undefined ? 1 : armNum;
        armNum = armNum <= 0 ? 1: armNum;
        a1 = a1 === undefined ? 0 : a1;
        a2 = a2 === undefined ? 0 : a2;
        const arm = guy.getObjectByName(guy.name + '_arm' + armNum);
        arm.rotation.x = Math.PI / 180 * a1;
        // set tri rotation
        arm.children[0].rotation.x = Math.PI / 180 * a2;
    };
}( this['weirdGuy2'] = {} ));
