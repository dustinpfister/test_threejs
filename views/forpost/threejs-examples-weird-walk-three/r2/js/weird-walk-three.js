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
    MATERIALS.center = DEFAULT_MATERIAL;

    // just make and return Leg object
    var mkLegObj = function(opt){
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

    var mkBody = function(opt){
        var body = new THREE.Group();
        var center = new THREE.Mesh( new THREE.SphereGeometry(1.5, 30, 30), opt.materials.center );
        body.add(center);
        return body;
    };

    api.create = function(opt){
        opt = opt || {};
        opt.materials = opt.materials || MATERIALS;
        opt.radius = opt.radius === undefined ? 1 : + opt.radius;
        opt.bodyLegChild = opt.bodyLegChild || false;
        var weird = new THREE.Group(),
        ud = weird.userData;
        // add legs
        var legs = ud.legs = new THREE.Group();
        weird.add(legs);
        var i = 0; //len = 8;
        while(i < opt.legCount ){
            var leg = mkLegObj(opt);
            leg.rotation.x = Math.PI * 2 / opt.legCount * i;
            legs.add(leg);
            i += 1;
        }
        // add body
        var body = ud.body = mkBody(opt);
        if(opt.bodyLegChild){
            legs.add(body);
        }else{
            weird.add(body);
        }
        return weird;
    };

    // return public API
    return api;

}());
