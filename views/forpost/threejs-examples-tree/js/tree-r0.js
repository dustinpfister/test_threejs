/*  tree.js - r0 - from threejs-examples-tree
 *  https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-examples-tree
 *
 *
 */
var Tree = function (opt) {
    // options
    opt = opt || {};
    this.sections = opt.sections || 5;
    this.conesPerSection = opt.conesPerSection || 7;
    this.coneMaterial = opt.coneMaterial || new THREE.MeshBasicMaterial({
            color: 0x00ff00
        });
    this.coneMaxRadius = opt.coneMaxRadius || 0.7;
    this.coneRadiusReduction = opt.coneRadiusReduction || 0.3;
    this.coneMaxLength = opt.coneRadiusReduction || 5;
    this.coneLengthReduction = opt.coneLengthReduction || 4.5;
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
        // cone object
        var coneObj = {
            i: 0
        };
        // standard radius and length
        // and set default radius and y position of section
        secObj.stdRadius = this.coneMaxRadius - this.coneRadiusReduction * (secObj.i / this.sections);
        //secObj.stdLength = this.coneMaxLength - this.coneLengthReduction * (Math.pow(2, secObj.i) - 1) / Math.pow(2, this.sections);
        secObj.stdLength = this.coneMaxLength - (this.coneLengthReduction * (secObj.i / this.sections) );
        secObj.radius = secObj.stdLength - secObj.stdLength / 2;
        secObj.y = secObj.stdRadius * 2 * secObj.i;
        secObj.radOffset = (secObj.i % 2) * Math.PI;
        // call for section
        this.forSection.call(this, secObj);
        // loop cones
        while (coneObj.i < this.conesPerSection) {
            Tree.defaultConeObj(this, coneObj, secObj);
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
            groupSection.rotation.set(0, secObj.radOffset, 0);
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
// static default cone object
Tree.defaultConeObj = function (tree, coneObj, secObj) {
    coneObj.per = coneObj.i / tree.conesPerSection;
    coneObj.radian = Math.PI * 2 * coneObj.per;
    Tree.setConePos(coneObj, secObj);
    coneObj.r = {
        x: Math.PI / 2,
        y: 0,
        z: Math.PI * 2 / tree.conesPerSection * coneObj.i - Math.PI / 2
    };
    coneObj.radius = secObj.stdRadius;
    coneObj.length = secObj.stdLength;
    coneObj.segRad = 32;
    coneObj.seglength = 1;
    coneObj.open = false;
    coneObj.thetaStart = 0;
    coneObj.thetaLength = Math.PI * 2;
};
// set the cone position
Tree.setConePos = function (coneObj, secObj) {
    var radian = coneObj.radian;
    coneObj.x = Math.cos(radian) * secObj.radius;
    coneObj.y = 0;
    coneObj.z = Math.sin(radian) * secObj.radius;
};
