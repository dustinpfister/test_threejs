
var BiplaneGroup = (function () {

    var api = {};

    // main create method
    api.create = function(opt){
        opt = opt || {};

        var group = new THREE.Group();
        var bi = Biplane.create();
        group.add(bi);
        return group;
    };

    api.update = function(bi, secs){
    };

    return api;
}
    ());
