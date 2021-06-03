
(function(api){
 
    var HARD_MATERIAL = new THREE.MeshNormalMaterial();

    var DEFAULT_MATERIALS = {
        chest: HARD_MATERIAL
    };

    api.create = function(opt){
        opt = opt || {};
        opt.materials = opt.materials || DEFAULT_MATERIALS;
        var group = new THREE.Group();

        // add chest
        var chest = new THREE.Mesh(new THREE.BoxGeometry(1, 1.5, 1), opt.materials.chest);
        group.add(chest);

        // add head
        var head = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), opt.materials.chest);
        head.position.set(0, 0.75 + 0.5 + 0.1, 0);
        group.add(head);

        return group;

    };

}(this['Guy2'] = {}));
