var Model = (function () {

    var Mod = function (opt) {

        // this is what will be added to the Scene
        this.group = new THREE.Group;

        // set default, or use what is given
        opt = opt || {};
        this.radius = opt.radius === undefined ? 4 : opt.radius;
        this.count = opt.count === undefined ? 5 : opt.count;
        this.bxSize = opt.bxSize === undefined ? 1 : opt.bxSize;

        var i = 0,
        bx,
        radian;
        while (i < this.count) {

            bx = new THREE.Mesh(
                    new THREE.BoxGeometry(this.bxSize, this.bxSize, this.bxSize),
                    new THREE.MeshBasicMaterial({
                        color: 0x00ff00,
                        wireframe: true
                    }));

            radian = Math.PI * 2 / this.count * i;

            bx.position.set(

                Math.cos(radian) * this.radius,
                0,
                Math.sin(radian) * this.radius);

            bx.lookAt(0, 0, 0);
            this.group.add(bx);

            i += 1;
        }

        console.log(this.group);

    };

    Mod.prototype.setRadius = function (r) {

        this.r = r;

    };

    return Mod;

}
    ());
