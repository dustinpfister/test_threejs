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

        //var foot = new THREE.Mesh( new THREE.BoxGeometry(1, 0.75, 2), opt.materials.foot );
//var foot = new THREE.Mesh( new THREE.BoxGeometry(1, 0.75, 2), opt.materials.foot );

// make the shape
var fs = new THREE.Shape();
fs.moveTo(0.6, 0.0);
fs.lineTo(0.6, 0.5);
fs.lineTo(0.3, 0.6);
fs.lineTo(0.0, 0.8);
fs.lineTo(0.0, 1.0);
fs.lineTo(1.0, 1.0);
fs.lineTo(1.0, 0.0);
//tri.moveTo(0, 1);
//tri.lineTo(1, -1);
//tri.lineTo(-1, -1);

// geometry
var extrudeSettings = {
    depth: 1,
    bevelEnabled: false
};
var geometry = new THREE.ExtrudeGeometry(fs, extrudeSettings);
geometry.rotateX(Math.PI * 1); // might want to center
geometry.center();
// mesh
var foot = new THREE.Mesh(geometry, new THREE.MeshNormalMaterial());
//mesh.add(new THREE.BoxHelper(mesh));

foot.rotation.y = Math.PI * 1.5;
foot.rotation.x = Math.PI * 1.0;

foot.scale.set(2,1,1);

        //foot.position.set( 0, 3.74 + opt.radius, 0.62);
        foot.position.set( 0, opt.radius + opt.radius, 0.62);
        leg.add(foot);
        // calf mesh
        var calf = new THREE.Mesh( new THREE.BoxGeometry(1, opt.radius, 0.75), opt.materials.calf );
        //calf.position.set(0, 1.87 + opt.radius, 0);
        calf.position.set(0, opt.radius + opt.radius / 2 - 0.5, 0);
        leg.add(calf);
        return leg;
    };

    var mkBody = function(opt){
        var body = new THREE.Group();
        var center = new THREE.Mesh( new THREE.SphereGeometry(opt.radius, 30, 30), opt.materials.center );
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
