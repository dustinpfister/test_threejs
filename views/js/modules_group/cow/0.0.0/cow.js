(function (api) {
   
    var m = new THREE.MeshNormalMaterial();
    var MATERIALS = {
        body : m,
        head : m,
        eyes : m
    };

    var createBody = function(opt){
        var group = new THREE.Group();
        var body = new THREE.Mesh(new THREE.BoxGeometry(1, 0.5, 0.5), opt.materials.body);
        body.position.set(0, 0.5, 0);
        group.add(body);
        return group;
    };

    // create method
    api.create = function (opt) {
        opt = opt || {};
        opt.materials = opt.materials || MATERIALS;
        var group = new THREE.Group();
        
        var body = createBody(opt);
        group.add(body);
        return group;
    };
}
    (this['CowMod'] = {}));
