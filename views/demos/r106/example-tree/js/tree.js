
var Tree = function (opt) {

    opt = opt || {};
    this.sections = opt.sections || 5;
    this.conesPerSection = opt.conesPerSection || 7;
    this.coneMaterial = opt.coneMaterial || new THREE.MeshBasicMaterial({
            color: 0x00ff00
        });
    this.coneMaxRadius = opt.coneMaxRadius || 0.7;
    this.forConeValues = opt.forConeValues || function () {};

    this.group = new THREE.Group();

    var secObj = {
        i: 0
    }
    while (secObj.i < this.sections) {

        var groupSection = new THREE.Group();
        var coneObj = {
            radius: this.coneMaxRadius - 0.3 * (secObj.i / this.sections),
            length: 7 - 6 * (Math.pow(2, secObj.i) - 1) / Math.pow(2, this.sections),
            i: 0
        };

        secObj.radius = coneObj.length - coneObj.length/ 2;
        secObj.y = coneObj.radius * 2 * secObj.i;
        while (coneObj.i < this.conesPerSection) {

            coneObj.per = coneObj.i / this.conesPerSection;
            coneObj.radian = Math.PI * 2 * coneObj.per;
            coneObj.x = Math.cos(coneObj.radian) * secObj.radius;
            coneObj.y = 0;
            coneObj.z = Math.sin(coneObj.radian) * secObj.radius;
            coneObj.r = {
                x: Math.PI / 2,
                y: 0,
                z: Math.PI * 2 / this.conesPerSection * coneObj.i - Math.PI / 2
            };

            // call any forCone method that may be given
            this.forConeValues.call(this, coneObj, secObj);

            // create the cone geometry
            var cone = new THREE.ConeGeometry(coneObj.radius, coneObj.length, 32, 1, false, 0, Math.PI * 2);

            // create the mesh
            var mesh = new THREE.Mesh(
                    cone,
                    coneObj.material || this.coneMaterial);

            // position and rotate
            mesh.position.set(coneObj.x, coneObj.y, coneObj.z);
            mesh.rotation.set(coneObj.r.x, coneObj.r.y, coneObj.r.z)

            // add mesh to group
            groupSection.add(mesh);

            coneObj.i += 1;

        }

        groupSection.position.y = secObj.y;
        secObj.i += 1;

        this.group.add(groupSection);

    }

    console.log(this.group)

};
