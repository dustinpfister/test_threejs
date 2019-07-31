
var Tree = function (opt) {

    // options
    opt = opt || {};
    this.sections = opt.sections || 5;
    this.conesPerSection = opt.conesPerSection || 9;
    this.coneMaterial = opt.coneMaterial || new THREE.MeshBasicMaterial({
            color: 0x00ff00
        });
    this.coneMaxRadius = opt.coneMaxRadius || 0.7;
    this.coneRadiusReduction = opt.coneRadiusReduction || 0.3;
    this.coneMaxLength = opt.coneRadiusReduction || 5;
    this.coneLengthReduction = opt.coneRadiusReduction || 4.5;

    // call backs
    this.forConeValues = opt.forConeValues || function () {};
    this.forConeMesh = opt.forConeMesh || function () {};
    this.forSection = opt.forSection || function () {};
    this.onDone = opt.onDone || function () {};

    // the main group to add to scene
    this.group = new THREE.Group();

    // section object
    var secObj = {
        i: 0
    }

    // loop sections
    while (secObj.i < this.sections) {

        var groupSection = new THREE.Group();

        // standard radius and length
        var stdRadius = this.coneMaxRadius - this.coneRadiusReduction * (secObj.i / this.sections),
        stdLength = this.coneMaxLength - this.coneLengthReduction * (Math.pow(2, secObj.i) - 1) / Math.pow(2, this.sections);

        // cone object
        var coneObj = {
            i: 0
        };

        // set default radius and y position of section
        secObj.radius = stdLength - stdLength / 2;
        secObj.y = stdRadius * 2 * secObj.i;

        // call for section
        this.forSection.call(this, secObj);

        // loop cones
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
            coneObj.radius = stdRadius;
            coneObj.length = stdLength;
            coneObj.segRad = 32;
            coneObj.seglength = 1;
            coneObj.open = false;
            coneObj.thetaStart = 0;
            coneObj.thetaLength = Math.PI * 2;

            // call any forConeValues method that may be given
            this.forConeValues.call(this, coneObj, secObj);

            // create the cone geometry
            var cone = new THREE.ConeGeometry(
                    coneObj.radius,
                    coneObj.length,
                    coneObj.segRad,
                    coneObj.segLength,
                    coneObj.open,
                    coneObj.thetaStart,
                    coneObj.thetaLength);

            // create the mesh
            var mesh = new THREE.Mesh(
                    cone,
                    coneObj.material || this.coneMaterial);

            // position and rotate
            mesh.position.set(coneObj.x, coneObj.y, coneObj.z);
            mesh.rotation.set(coneObj.r.x, coneObj.r.y, coneObj.r.z)

            // call forConeMesh
            this.forConeMesh.call(this, mesh, coneObj, secObj);

            // add mesh to group
            groupSection.add(mesh);

            // next cone
            coneObj.i += 1;

        }

        // set y position of section
        // and add the section to the group
        groupSection.position.y = secObj.y;
        this.group.add(groupSection);

        // next section
        secObj.i += 1;

    }

    // call on done if given
    this.onDone.call(this);

};
