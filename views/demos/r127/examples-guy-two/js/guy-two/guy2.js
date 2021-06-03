
(function(api){
 
    var HARD_MATERIAL = new THREE.MeshNormalMaterial();

    var DEFAULT_MATERIALS = {
        chest: HARD_MATERIAL
    };

    api.create = function(opt){
        opt = opt || {};
        opt.materials = opt.materials || DEFAULT_MATERIALS;
        opt.chestLength = opt.chestLength || 1.5;
        opt.headSize = opt.headSize || 1;
        opt.spacing = opt.spacing === undefined ? 0 : opt.spacing;
        var group = new THREE.Group();

        // add chest
        var chest = new THREE.Mesh(new THREE.BoxGeometry(1, opt.chestLength, 1), opt.materials.chest);
        group.add(chest);

        // add head
        var head = new THREE.Mesh(new THREE.BoxGeometry(opt.headSize, opt.headSize, opt.headSize), opt.materials.chest);
        head.position.set(0, opt.chestLength / 2 + opt.headSize / 2 + opt.spacing, 0);
        group.add(head);

        return group;

    };

}(this['Guy2'] = {}));
