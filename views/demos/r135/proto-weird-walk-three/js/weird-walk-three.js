//******** **********
// Weird Walk Module - r0
//******** **********
var WeirdWalk = (function(){
    // public API
    var api = {};

    var MATERIALS = {}

    var DEFAULT_MATERIAL = new THREE.MeshNormalMaterial();

    MATERIALS.foot = DEFAULT_MATERIAL;

    // just make and return Leg object
    var mkLegObj = function(opt){
        opt = opt || {};
        opt.materials = opt.materials || MATERIALS;

        var leg = new THREE.Group();
        var foot = new THREE.Mesh( new THREE.BoxGeometry(1,1,1), opt.materials.foot );
        leg.add(foot);

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
