var Model = (function () {

    var Mod = function (opt) {

        // this is what will be added to the Scene
        this.group = new THREE.Group;

        // set default, or use what is given
        opt = opt || {};
        this.radius = opt.radius === undefined ? 4 : opt.radius;
        this.count = opt.count === undefined ? 5 : opt.count;
        this.bxSize = opt.bxSize === undefined ? 1 : opt.bxSize;
        this.color = opt.color === undefined ? 0x00ff00 : opt.color;

        var i = 0,
        bx,
        radian;
        while (i < this.count) {

            bx = new THREE.Mesh(
                    new THREE.BoxGeometry(this.bxSize, this.bxSize, this.bxSize),
                    new THREE.MeshStandardMaterial({
                        color: this.color,
                        emissive: 0x0f0f0f

                    }));

            this.group.add(bx);

            i += 1;
        }

        this.update();

        console.log(this.group);

    };

    // update the group
    Mod.prototype.update = function () {

        var i = 0,
        bx,
        radian;
        while (i < this.count) {

            bx = this.group.children[i];

            radian = Math.PI * 2 / this.count * i;

            bx.position.set(

                Math.cos(radian) * this.radius,
                0,
                Math.sin(radian) * this.radius);

            bx.lookAt(0, 0, 0);

            i += 1;

        };

    };

    Mod.prototype.setRadius = function (radius) {

        this.radius = radius;
        this.update();

    };

    return Mod;

}
    ());
