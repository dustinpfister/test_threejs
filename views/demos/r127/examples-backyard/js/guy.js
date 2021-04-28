(function (GuyMod) {
    // material used for the legs
    var material_leg = new THREE.MeshStandardMaterial({
            color: 0x0000ff,
            emissive: 0x00001a
        }),
    // material used for the arms
    material_arm = new THREE.MeshStandardMaterial({
            color: 0xaf0000,
            emissive: 0x001a00
        });
    // material used for the body
    material_body = new THREE.MeshStandardMaterial({
            color: 0xff0000,
            emissive: 0x001a00
        });
    // array of materials used for the head
    var faceTexture = canvasTextureMod.createCanvasTexture(function (ctx, canvas) {
            // face color
            ctx.fillStyle = 'white';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            // eyes
            ctx.fillStyle = 'black';
            ctx.fillRect(16, 16, 8, 8);
            ctx.fillRect(64 - 24, 16, 8, 8);
            // mouth
            ctx.fillRect(32 - 8, 40, 16, 16);
            // nose
            ctx.fillStyle = 'gray';
            ctx.fillRect(32 - 4, 20, 8, 13);

        });
    materials_head = [
        // 0 default material
        new THREE.MeshStandardMaterial({
            color: 0xffff00,
            emissive: 0x1a1a00
        }),
        // 1 used for the face
        new THREE.MeshStandardMaterial({
            map: faceTexture
        })
    ];
    // the guy constructor
    GuyMod.create = function () {
        var guy = {};
        // a group that will hold all mesh objects
        guy.group = new THREE.Group();
        // HEAD
        guy.head = new THREE.Mesh(
                new THREE.BoxGeometry(1, 1, 1),
                materials_head);
        guy.head.position.y = 1.6;
        // set material index
        guy.head.geometry.groups.forEach(function (face) {
            // set all to zero by default
            face.materialIndex = 0;
        });
        guy.head.geometry.groups[4].materialIndex = 1;
        // one side of face set to face material
        //this.head.geometry.groups[8].materialIndex = 1;
        //this.head.geometry.groups[9].materialIndex = 1;
        guy.head.castShadow = true;
        guy.group.add(guy.head);
        // BODY
        guy.body = new THREE.Mesh(
                new THREE.BoxGeometry(1, 2, 1),
                material_body);
        guy.body.castShadow = true;
        guy.group.add(guy.body);
        // RIGHT ARM
        guy.arm_right = new THREE.Mesh(
                new THREE.BoxGeometry(.5, 1.5, .5),
                material_arm);
        guy.arm_right.geometry.translate(0,  - .5, 0);
        guy.arm_right.position.x = 1;
        guy.arm_right.position.y = .75;
        guy.arm_right.castShadow = true;
        guy.group.add(guy.arm_right);
        // LEFT ARM
        guy.arm_left = new THREE.Mesh(
                new THREE.BoxGeometry(.5, 1.5, .5),
                material_arm);
        guy.arm_left.geometry.translate(0,  - .5, 0);
        guy.arm_left.position.x = -1;
        guy.arm_left.position.y = .75;
        guy.arm_left.castShadow = true;
        guy.group.add(guy.arm_left);
        // RIGHT LEG
        guy.leg_right = new THREE.Mesh(
                new THREE.BoxGeometry(.5, 2, .5),
                material_leg);
        guy.leg_right.geometry.translate(0, -1, 0);
        guy.leg_right.position.x = .35;
        guy.leg_right.position.y = -1.1;
        guy.leg_right.castShadow = true;
        guy.group.add(guy.leg_right);
        // LEFT LEG
        guy.leg_left = new THREE.Mesh(
                new THREE.BoxGeometry(.5, 2, .5),
                material_leg);
        guy.leg_left.geometry.translate(0, -1, 0);
        guy.leg_left.position.x =  - .35;
        guy.leg_left.position.y = -1.1;
        guy.leg_left.castShadow = true;
        guy.group.add(guy.leg_left);
        // retun the guy object
        return guy;
    };
    // move the arm of give id ('arm_right' or 'arm_left');
    // x and z should be a value between 0, and 1
    GuyMod.moveArm = function (guy, armId, x, z) {
        var arm = guy[armId];
        z = Math.PI / 2 * z;
        if (armId === 'arm_left') {
            z -= z * 2;
        }
        arm.rotation.set(Math.PI * 2 * x, 0, z);
    };
    // rotate head around
    // per is 0 to 1
    GuyMod.moveHead = function (guy, per) {
        guy.head.rotation.set(0, Math.PI * 2 * per, 0);
    };
    // move legs in respect to a walk cycle
    // where per is between 0, and 1.
    GuyMod.moveLegs = function (guy, per) {
        per %= 1;
        var bias = Math.abs(.5 - per) / .5;
        guy.leg_left.rotation.set(.75 - bias * 1.5, 0, 0);
        guy.leg_right.rotation.set( - .75 + bias * 1.5, 0, 0);
    };
    // walk
    GuyMod.walk = function (guy, per, swings) {
        per = per === undefined ? 0 : per;
        swings = swings === undefined ? 1 : swings;
        var r = Math.PI * 2 * per;
        var armPer = Math.cos(r * swings) + 1 / 2;
        GuyMod.moveArm(guy, 'arm_right',  - .1 + .2 * armPer, 0);
        GuyMod.moveArm(guy, 'arm_left', .1 - .2 * armPer, 0);
        GuyMod.moveLegs(guy, per * swings);
    };
    // return the Guy Class
    //return Guy;
}
    (this['GuyMod'] = {}));
