var HamsterWheel = (function () {

    var material = new THREE.MeshStandardMaterial({

        color: 0xafafaf
    });

    // the Wheel constructor
    var Wheel = function () {

        // a group that will hold all mesh objects
        this.group = new THREE.Group();
        this.wheel = new THREE.Group();
        this.base = new THREE.Group();

        // add wheel, and base to main group
        this.group.add(this.wheel);
        this.group.add(this.base);

        var geo = new THREE.TorusGeometry(2, .125, 20, 20);

        // RIMS
        var ct = 2,
        rim,
        i = 0;
        while (i < ct) {

            rim = new THREE.Mesh(

                    geo,

                    material);
            rim.position.set(0, 0, -2 + 2 * i);

            this.wheel.add(rim);

            var bar = new THREE.Mesh(

                    new THREE.CylinderGeometry(.125, .125, 4),

                    material);
            bar.position.set(0, 0, -2 + 2 * i);

            this.wheel.add(bar);

            i += 1;
        }

        var ct = 15,
        rim,
        i = 0;
        while (i < ct) {

            var r = Math.PI * 2 / ct * i;

            // TUBES connecting rims
            var cy = new THREE.Mesh(

                    new THREE.CylinderGeometry(.125, .125, 2),

                    material);
            cy.rotation.x = Math.PI / 2;

            cy.position.x = Math.cos(r) * 2;
            cy.position.y = Math.sin(r) * 2;
            cy.position.z = -1;

            this.wheel.add(cy);

            i += 1;

        }

        // BASE
        var parts = [{
                len: 1,
                rx: Math.PI / 2,
                rz: 0,
                px: 0,
                py: 0,
                pz: 0.5

            }, {

                len: 4,
                rx: 0,
                rz: Math.PI / 4,
                px: 1.4,
                py: -1.4,
                pz: 0.9

            }, {

                len: 6,
                rx: 0,
                rz: Math.PI / 2,
                px: 0,
                py: -2.8,
                pz: 0.9

            }, {

                len: 2,
                rx: Math.PI / 2,
                rz: 0,
                px: -2.9,
                py: -2.8,
                pz: 0

            },

        ];

        var self = this;
        parts.forEach(function (part) {

            var i = 0,
            len = 2;
            while (i < len) {

                var neg = 1;

                if (i === 1) {

                    neg = -1;
                }

                var cy = new THREE.Mesh(

                        new THREE.CylinderGeometry(.125, .125, part.len),

                        material);
                cy.rotation.x = part.rx;
                cy.rotation.z = part.rz;
                cy.position.set(
                    part.px,
                    part.py,
                    part.pz * neg - 2 * i);
                self.base.add(cy);

                i += 1;

            }

        });

    };

    // just return an instance of wheel for now
    return Wheel;

}
    ());
