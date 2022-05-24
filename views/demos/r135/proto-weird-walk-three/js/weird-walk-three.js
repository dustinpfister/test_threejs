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
        opt.radius = opt.radius === undefined ? 1 : + opt.radius; 
        var leg = new THREE.Group();
        // foot mesh
        var foot = new THREE.Mesh( new THREE.BoxGeometry(1, 0.75, 2), opt.materials.foot );
        foot.position.set( 0, 3.74 + opt.radius, 0.62);
        leg.add(foot);
        // calf mesh
        var calf = new THREE.Mesh( new THREE.BoxGeometry(1, 3, 0.75), opt.materials.calf );
        calf.position.set(0, 1.87 + opt.radius, 0);
        leg.add(calf);
        return leg;
    };

    api.create = function(opt){
        var weird = new THREE.Group();
        var i = 0, len = 6;
        while(i < len){
            var leg = mkLegObj(opt);
            leg.rotation.x = Math.PI * 2 / len * i;
            weird.add(leg);
            i += 1;
        }
        return weird;
    };

    // return public API
    return api;

}());
