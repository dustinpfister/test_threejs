var guy = (function () {

    var Guy = function () {

        this.group = new THREE.Group();

        // head
        this.head = new THREE.Mesh(
                new THREE.BoxGeometry(1, 1, 1),
                new THREE.MeshDepthMaterial());
        this.head.position.y = 1.6;
        //this.head.rotation.set(0, 1, 0);
        this.group.add(this.head);

        // body
        this.body = new THREE.Mesh(
                new THREE.BoxGeometry(1, 2, 1),
                new THREE.MeshDepthMaterial());
        //this.body.rotation.set(0, 1, 0);
        this.group.add(this.body);

        this.arm_right = new THREE.Mesh(
                new THREE.BoxGeometry(.5, 1.5, .5),
                //new THREE.MeshBasicMaterial({

                //    color: 0x00ff00,
                //    wireframe: true

                //})

                new THREE.MeshDepthMaterial());
        this.arm_right.geometry.translate(0,  - .5, 0);
        this.arm_right.position.x = 1;
        this.arm_right.position.y = .75;

        this.arm_right.rotation.set(3, 0, 0);
        this.group.add(this.arm_right);

        this.arm_left = new THREE.Mesh(
                new THREE.BoxGeometry(.5, 1.5, .5),
                new THREE.MeshDepthMaterial());
        this.arm_left.position.x = -1;
        this.arm_left.position.y = .25;
        this.group.add(this.arm_left);

    };

    Guy.prototype.moveArm = function (x, z) {

        var arm = this.arm_right;

        arm.rotation.set(Math.PI * 2 * x, 0, Math.PI / 2 * z);

    };

    Guy.prototype.moveHead = function (y) {

        this.head.rotation.set(0, Math.PI * 2 * y, 0);

    }

    return new Guy();

}
    ());
