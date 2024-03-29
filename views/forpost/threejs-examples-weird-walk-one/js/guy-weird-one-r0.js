// ********** **********
// WEIRD GUY MODULE - r0 - from threeks-examples-weird-walk-one
// ********** **********
(function(api){
    const materials = [
        new THREE.MeshStandardMaterial( { emissive: 0x9a8800, emissiveIntensity: 0.5, wireframe:false } ),
        new THREE.MeshStandardMaterial( { emissive: 0x00aaff, emissiveIntensity: 0.5 } ),
        new THREE.MeshStandardMaterial( { emissive: 0xffffff, emissiveIntensity: 0.5 } ),
        new THREE.MeshStandardMaterial( { emissive: 0x1a1a1a, emissiveIntensity: 0.5 } )
    ];
    // create a new weird guy
    api.create = function(opt){
        opt = opt || {};
        const guy = new THREE.Group();
        guy.name = opt.guyID || 'guy';
        // BODY
        const body = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1.5, 1),
            materials[0]
        );
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
                new THREE.BoxGeometry(0.25, 1.5, 0.25),
                materials[0]
            );
            arm.geometry.translate( 0, 0.75, 0 );
            arm.name = guy.name + '_' + nameStr;
            arm.position.set(-0.625 + 1.25 * i, 0.0, 0);
            body.add(arm);
        });
        // ADD PELVIS
        const pelvis = new THREE.Mesh(
            new THREE.BoxGeometry(1, 0.5, 1),
            materials[1]
        );
        pelvis.name = guy.name + '_pelvis';
        pelvis.position.set(0, -1.0, 0);
        guy.add(pelvis);
        // ADD LEGS
        ['leg1', 'leg2'].forEach(function(nameStr, i){
            const leg = new THREE.Mesh(
                new THREE.BoxGeometry(0.25, 1.5, 1),
                materials[1]
            );
            leg.name = guy.name + '_' + nameStr;
            leg.position.set(-0.25 + 0.5 * i, -1, 0);
            pelvis.add(leg);
        });
        return guy;
    };
    // setWalk
    api.setWalk = function(guy, walkPer){
        const leg1 = guy.getObjectByName(guy.name + '_leg1'),
        leg2 = guy.getObjectByName(guy.name + '_leg2')
        // set scale of legs
        leg1.scale.y = walkPer;
        leg2.scale.y = 1 - walkPer;
        // adjust position of legs
        leg1.position.y = -1.0 + 0.75 * (1 - walkPer);
        leg2.position.y = -1.0 + 0.75 * walkPer;   
    };
}( this['weirdGuy'] = {}));
