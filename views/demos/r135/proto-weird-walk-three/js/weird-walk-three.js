//******** **********
// Weird Walk Module - r0
//******** **********
var WeirdWalk = (function(){
    // public API
    var api = {};

    var MATERIALS = {}

    var DEFAULT_MATERIAL = new THREE.MeshNormalMaterial();

    MATERIALS.foot = DEFAULT_MATERIAL;
    MATERIALS.calf = DEFAULT_MATERIAL;

    // just make and return Leg object
    var mkLegObj = function(opt){
        opt = opt || {};
        opt.materials = opt.materials || MATERIALS;
        var leg = new THREE.Group();
        // foot mesh
        var foot = new THREE.Mesh( new THREE.BoxGeometry(1, 0.75, 2), opt.materials.foot );
        leg.add(foot);
        // calf mesh
        var calf = new THREE.Mesh( new THREE.BoxGeometry(1, 3, 0.75), opt.materials.calf );
        calf.position.set(0, 1.87, 0.625);
        leg.add(calf);
        return leg;
    };

    api.create = function(opt){

        var weird = new THREE.Group();

        var leg = mkLegObj(opt);

        weird.add(leg)


        return weird;

    };

    // return public API
    return api;

}());
