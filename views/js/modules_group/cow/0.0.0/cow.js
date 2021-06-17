(function (api) {
   
    var m = new THREE.MeshNormalMaterial();
    var MATERIALS = {
        body : m,
        head : m,
        eyes : m
    };
    // create method
    api.create = function (opt) {
        opt = opt || {};
        opt.materials = opt.materials || MATERIALS;
        var group = new THREE.Group();
        // body mesh
        var body = new THREE.Mesh(new THREE.BoxGeometry(), opt.materials.body);
        group.add(body);
        return group;
    };
}
    (this['CowMod'] = {}));
