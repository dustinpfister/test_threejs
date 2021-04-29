var Guy = (function () {

    // material used for the legs
    var material_leg = new THREE.MeshLambertMaterial({
            color: 0x0000ff,
            emissive: 0x00001a
        }),
    // material used for the arms
    material_arm = new THREE.MeshLambertMaterial({
            color: 0x00ff00,
            emissive: 0x001a00
        });
    // material used for the body
    material_body = new THREE.MeshLambertMaterial({
            color: 0x00ff00,
            emissive: 0x001a00
        }),
    // array of materials used for the head
    materials_head = [
        // 0 default material
        new THREE.MeshLambertMaterial({
            color: 0xffff00,
            emissive: 0x1a1a00
        }),
        // 1 used for the face
        new THREE.MeshLambertMaterial({
            color: 0xffffff,
            emissive: 0x1a1a1a
        })
    ];

    // the guy constructor
    var Guy = function () {
        // a group that will hold all mesh objects
        this.group = new THREE.Group();
        // HEAD
        this.head = new THREE.Mesh(
                new THREE.BoxGeometry(1, 1, 1),
                materials_head);
        this.head.position.y = 1.6;
        // set material index
        this.head.geometry.groups.forEach(function (face) {
            // set all to zero by default
            face.materialIndex = 0;
        });
        // one side of face set to face material
        this.head.geometry.groups[4].materialIndex = 1;
        this.head.castShadow = true;
        this.group.add(this.head);
        // BODY
        this.body = new THREE.Mesh(
                new THREE.BoxGeometry(1, 2, 1),
                material_body);
        this.body.castShadow = true;
        this.group.add(this.body);
        // RIGHT ARM
        this.arm_right = new THREE.Mesh(
                new THREE.BoxGeometry(.5, 1.5, .5),
                material_arm);
        this.arm_right.geometry.translate(0,  - .5, 0);
        this.arm_right.position.x = 1;
        this.arm_right.position.y = .75;
        this.arm_right.castShadow = true;
        this.group.add(this.arm_right);
        // LEFT ARM
        this.arm_left = new THREE.Mesh(
                new THREE.BoxGeometry(.5, 1.5, .5),
                material_arm);
        this.arm_left.geometry.translate(0,  - .5, 0);
        this.arm_left.position.x = -1;
        this.arm_left.position.y = .75;
        this.arm_left.castShadow = true;
        this.group.add(this.arm_left);
        // RIGHT LEG
        this.leg_right = new THREE.Mesh(
                new THREE.BoxGeometry(.5, 2, .5),
                material_leg);
        this.leg_right.geometry.translate(0, -1, 0);
        this.leg_right.position.x = .35;
        this.leg_right.position.y = -1.1;
        this.leg_right.castShadow = true;
        this.group.add(this.leg_right);
        // LEFT LEG
        this.leg_left = new THREE.Mesh(
                new THREE.BoxGeometry(.5, 2, .5),
                material_leg);
        this.leg_left.geometry.translate(0, -1, 0);
        this.leg_left.position.x =  - .35;
        this.leg_left.position.y = -1.1;
        this.leg_left.castShadow = true;
        this.group.add(this.leg_left);
    };

    // move the arm of give id ('arm_right' or 'arm_left');
    // x and z should be a value between 0, and 1
    Guy.prototype.moveArm = function (armId, x, z) {
        var arm = this[armId];
        z = Math.PI / 2 * z;
        if (armId === 'arm_left') {
            z -= z * 2;
        }
        arm.rotation.set(Math.PI * 2 * x, 0, z);
    };

    // rotate head around
    // y is 0 to 1
    Guy.prototype.moveHead = function (y) {
        this.head.rotation.set(0, Math.PI * 2 * y, 0);
    };

    // move legs in respect to a walk cycle
    // where per is between 0, and 1.
    Guy.prototype.moveLegs = function (per) {
        per %= 1;
        var bias = Math.abs(.5 - per) / .5;
        this.leg_left.rotation.set(.75 - bias * 1.5, 0, 0);
        this.leg_right.rotation.set( - .75 + bias * 1.5, 0, 0);
    };

    Guy.prototype.walk = function (per, swings) {
        per = per === undefined ? 0 : per;
        swings = swings === undefined ? 1 : swings;
        var r = Math.PI * 2 * per;
        var armPer = Math.cos(r * swings) + 1 / 2;
        this.moveArm('arm_right',  - .1 + .2 * armPer, 0);
        this.moveArm('arm_left', .1 - .2 * armPer, 0);
        this.moveLegs(per * swings);
    }

    // just return an instance of guy for now
    return Guy;

}
    ());
