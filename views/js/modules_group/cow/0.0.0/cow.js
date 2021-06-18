(function (api) {
   
    var m = new THREE.MeshNormalMaterial();
    var MATERIALS = {
        body : m,
        eyes : m
    };

    // CREATE BODY

    var createBodyGroup = function(opt){
        var group = new THREE.Group();
        var body = new THREE.Mesh(new THREE.BoxGeometry(5, 2, 2), opt.materials.body);
        body.position.set(0, 0.5, 0);
        group.add(body);
        return group;
    };

    // CREATE LEGS

    var createLeg = function(opt){
        var leg = new THREE.Mesh(new THREE.BoxGeometry(1, 3, 1), opt.materials.body);
        return leg;
    };

    var createLegsGroup = function(opt){
        opt = opt || {};
        opt.legSpace = opt.legSpace === undefined ? 0.1 : opt.legSpace;
        var group = new THREE.Group();
        var leg1 = createLeg(opt);
        leg1.position.set(2, 0, 0.5 + opt.legSpace);
        group.add(leg1);
        var leg2 = createLeg(opt);
        leg2.position.set(2, 0, (0.5 + opt.legSpace) * -1);
        group.add(leg2);
        var leg3 = createLeg(opt);
        leg3.position.set(-2, 0, 0.5 + opt.legSpace);
        group.add(leg3);
        var leg4 = createLeg(opt);
        leg4.position.set(-2, 0, (0.5 + opt.legSpace) * -1);
        group.add(leg4);
        return group;
    };

    // CREATE HEAD

    var createHead = function(opt){
        var group = new THREE.Group();
        // main head cube
        var head = new THREE.Mesh(new THREE.BoxGeometry(2, 2, 2), opt.materials.body);
        // eyes
        var eye1 = new THREE.Mesh(new THREE.SphereGeometry(0.25, 30, 30), opt.materials.eyes);
        eye1.position.set(1, 0, 0.5);
        head.add(eye1);
        var eye1 = new THREE.Mesh(new THREE.SphereGeometry(0.25, 30, 30), opt.materials.eyes);
        eye1.position.set(1, 0, -0.5);
        head.add(eye1);
        var mouth_top = new THREE.Mesh(new THREE.BoxGeometry(0.25, 0.25, 1), opt.materials.eyes);
        mouth_top .position.set(1, -0.45, 0);
        head.add(mouth_top );
        var mouth_bottom  = new THREE.Mesh(new THREE.BoxGeometry(0.25, 0.25, 1), opt.materials.eyes);
        mouth_bottom.position.set(1, -0.70 - 0.025, 0);
        head.add(mouth_bottom);
        // add head to group
        group.add(head);
        return group;
    };

    // create method
    api.create = function (opt) {
        opt = opt || {};
        opt.materials = opt.materials || MATERIALS;
        opt.headSpace = opt.headSpace === undefined ? 0.1 : opt.headSpace;
        var group = new THREE.Group();
        
        var body = createBodyGroup(opt);
        group.add(body);

        var legs = createLegsGroup(opt);
        legs.position.set(0, -2, 0);
        group.add(legs);

        var head = createHead(opt);
        head.position.set(2, 2.5 + opt.headSpace, 0);
        group.add(head);

        return group;
    };
}
    (this['CowMod'] = {}));
