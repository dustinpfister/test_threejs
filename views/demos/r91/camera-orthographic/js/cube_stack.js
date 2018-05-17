
var CubeStack = (function () {

    // the stack constructor
    var Stack = function (opt) {

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

        // this is what can be added to the scene
        this.group = new THREE.Group();

        plane = new THREE.Mesh(
                // plane geometry
                new THREE.PlaneGeometry(5, 5, 5, 5),
                // materials
                [
                    new THREE.MeshStandardMaterial({
                        color: 0x00ff00,
                        emissive: 0x0a0a0a,
                        side: THREE.DoubleSide
                    }),
                    new THREE.MeshStandardMaterial({
                        color: 0x0000ff,
                        emissive: 0x0a0a0a,
                        side: THREE.DoubleSide
                    })
                ]);
        plane.position.set(0,  - .5, 0);
        plane.rotation.set(Math.PI / 2, 0, 0);
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

            x = Math.floor(5 * Math.random());
            y = 0;
            z = Math.floor(5 * Math.random());

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

    return Stack;

    /*
    // Plane
    var plane = new THREE.Mesh(
    // plane geometry
    new THREE.PlaneGeometry(5, 5, 5, 5),
    // materials
    [
    new THREE.MeshStandardMaterial({
    color: 0x00ff00,
    emissive: 0x0a0a0a,
    side: THREE.DoubleSide
    }),
    new THREE.MeshStandardMaterial({
    color: 0x0000ff,
    emissive: 0x0a0a0a,
    side: THREE.DoubleSide
    })
    ]);
    plane.position.set(0,  - .5, 0);
    plane.rotation.set(Math.PI / 2, 0, 0);
    plane.geometry.faces.forEach(function (face, i) {
    face.materialIndex = i % 2;
    });
    scene.add(plane);

    // place some boxes on the plane
    var boxCount = 30,
    box,
    x,
    y,
    z,
    boxArray = [],
    boxIndex = 0;
    while (boxIndex < boxCount) {

    box = new THREE.Mesh(

    new THREE.BoxGeometry(1, 1, 1),

    new THREE.MeshStandardMaterial({

    color: 0x00ffff,
    emissive: 0x0a0a0a

    }));

    x = Math.floor(5 * Math.random());
    y = 0;
    z = Math.floor(5 * Math.random());

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
    scene.add(box);

    boxIndex += 1;
    }
     */

}
    ());
