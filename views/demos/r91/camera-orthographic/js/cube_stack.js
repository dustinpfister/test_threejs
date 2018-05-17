
var CubeStack = (function () {

    // the stack constructor
    return function (opt) {

        var boxCount,
        box,
        x,
        y,
        z,
        plane,
        boxArray = [],
        boxIndex = 0;

        opt = opt || {};
        this.boxCount = opt.boxCount === undefined ? 15 : opt.boxCount;
        this.gx = 5;
        this.gy = 5;

        // this is what can be added to the scene
        this.group = new THREE.Group();

        plane = new THREE.Mesh(
                // plane geometry
                new THREE.PlaneGeometry(this.gx, this.gy, this.gx, this.gy),
                // materials
                [
                    new THREE.MeshStandardMaterial({
                        color: 0x00ff00,
                        emissive: 0x0a0a0a
                    }),
                    new THREE.MeshStandardMaterial({
                        color: 0x0000ff,
                        emissive: 0x0a0a0a
                    })
                ]);
        plane.position.set(0, -0.5, 0);
        plane.rotation.set(-Math.PI / 2, 0, 0);
        plane.geometry.faces.forEach(function (face, i) {
            face.materialIndex = i % 2;
        });
        this.group.add(plane);

        // place some boxes on the plane
        while (boxIndex < this.boxCount) {

            box = new THREE.Mesh(

                    new THREE.BoxGeometry(1, 1, 1),

                    new THREE.MeshStandardMaterial({

                        color: 0x00ffff,
                        emissive: 0x0a0a0a

                    }));

            x = Math.floor(this.gx * Math.random());
            y = 0;
            z = Math.floor(this.gy * Math.random());

            if (boxArray[z] === undefined) {

                boxArray[z] = [];

            }

            if (boxArray[z][x] === undefined) {

                boxArray[z][x] = [];

            }

            boxArray[z][x].push(box);
            y = boxArray[z][x].length - 1;

            box.position.set(

                -2 + x,
                y,
                -2 + z);
            this.group.add(box);

            boxIndex += 1;

        }

    };

}
    ());
