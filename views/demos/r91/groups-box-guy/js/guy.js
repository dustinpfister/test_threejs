var guy = (function () {

    var material_leg = new THREE.MeshLambertMaterial({

            color: 0x0000ff,
            emissive: 0x00001a

        }),

    material_arm = new THREE.MeshLambertMaterial({

            color: 0x00ff00,
            emissive: 0x001a00

        });

    var Guy = function () {

        this.group = new THREE.Group();

        // head
        this.head = new THREE.Mesh(
                new THREE.BoxGeometry(1, 1, 1),
                new THREE.MeshDepthMaterial());
        this.head.position.y = 1.6;
        this.group.add(this.head);

        // body
        this.body = new THREE.Mesh(
                new THREE.BoxGeometry(1, 2, 1),
                new THREE.MeshDepthMaterial());
        this.group.add(this.body);

        // right arm
        this.arm_right = new THREE.Mesh(
                new THREE.BoxGeometry(.5, 1.5, .5),
                material_arm);
        this.arm_right.geometry.translate(0,  - .5, 0);
        this.arm_right.position.x = 1;
        this.arm_right.position.y = .75;
        this.group.add(this.arm_right);

        // left arm
        this.arm_left = new THREE.Mesh(
                new THREE.BoxGeometry(.5, 1.5, .5),
                material_arm);
        this.arm_left.geometry.translate(0,  - .5, 0);
        this.arm_left.position.x = -1;
        this.arm_left.position.y = .75;
        this.group.add(this.arm_left);

        // right leg
        this.leg_right = new THREE.Mesh(
                new THREE.BoxGeometry(.5, 2, .5),
                material_leg);
        this.leg_right.geometry.translate(0, -1, 0);
        this.leg_right.position.x = .25;
        this.leg_right.position.y = -1;
        this.group.add(this.leg_right);

        // left leg
        this.leg_left = new THREE.Mesh(
                new THREE.BoxGeometry(.5, 2, .5),
                material_leg);
        this.leg_left.geometry.translate(0, -1, 0);
        this.leg_left.position.x =  - .25;
        this.leg_left.position.y = -1;
        this.group.add(this.leg_left);

    };

    Guy.prototype.moveArm = function (armId, x, z) {

        var arm = this[armId];
        arm.rotation.set(Math.PI * 2 * x, 0, Math.PI / 2 * z);

    };

    Guy.prototype.moveHead = function (y) {

        this.head.rotation.set(0, Math.PI * 2 * y, 0);

    };

    Guy.prototype.moveLegs = function (per) {

        var bias = Math.abs(.5 - per) / .5;

        this.leg_left.rotation.set(.5 - bias, 0, 0);
        this.leg_right.rotation.set( - .5 + bias, 0, 0);

    };

    return new Guy();

}
    ());
