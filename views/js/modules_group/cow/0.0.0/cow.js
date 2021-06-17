(function (api) {
   
    var m = new THREE.MeshNormalMaterial();
    var MATERIALS = {
        body : m,
        head : m,
        eyes : m
    };

    var createBodyGroup = function(opt){
        var group = new THREE.Group();
        var body = new THREE.Mesh(new THREE.BoxGeometry(1, 0.5, 0.5), opt.materials.body);
        body.position.set(0, 0.5, 0);
        group.add(body);
        return group;
    };

    var createLeg = function(opt){
        var leg = new THREE.Mesh(new THREE.BoxGeometry(0.125, 0.5, 0.125), opt.materials.body);
        return leg;
    };

    var createLegsGroup = function(opt){
        var group = new THREE.Group();

        var leg1 = createLeg(opt);
        leg1.position.set(0.9, 0.25, 0);
        group.add(leg1);
        var leg2 = createLeg(opt);
        group.add(leg2);
        var leg3 = createLeg(opt);
        group.add(leg3);
        var leg4 = createLeg(opt);
        group.add(leg4);
        return group;
    };

    // create method
    api.create = function (opt) {
        opt = opt || {};
        opt.materials = opt.materials || MATERIALS;
        var group = new THREE.Group();
        
        var body = createBodyGroup(opt);
        group.add(body);

        var legs = createLegsGroup(opt);
        group.add(legs);

        return group;
    };
}
    (this['CowMod'] = {}));
