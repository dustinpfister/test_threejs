
var Biplane = (function () {

    var materials = {
        plane: new THREE.MeshStandardMaterial({
            color: 0x88afaf
        }),
        guy: new THREE.MeshStandardMaterial({
            color: 0xffffff
        }),
        prop: new THREE.MeshStandardMaterial({
            color: 0x404040
        })
    };

    var api = {};

    // create a wing
    var createWing = function(opt, y){
        var wing = new THREE.Mesh(
            new THREE.BoxGeometry(2,1,10),
            opt.materials.plane || materials.plane
        );
        wing.position.y = y;
        return wing;
    };

    // create a body
    var createBody = function(opt){
        var body = new THREE.Mesh(
            new THREE.BoxGeometry(10,2,2),
            opt.materials.plane || materials.plane
        );
        body.position.x = -2;
        return body;
    };

    // create a body
    var createTail = function(opt){
        var body = new THREE.Mesh(
            new THREE.BoxGeometry(1,2,2),
            opt.materials.plane || materials.plane
        );
        body.position.x = -6.5;
        body.position.y = 2;
        return body;
    };

    // create guy
    var createGuy = function(){
        var guy = new THREE.Mesh(
            new THREE.BoxGeometry(1,1,1),
            materials.guy
        );
        guy.position.x = -2;
        guy.position.y = 1.5;
        return guy;
    };

    // create prop
    var createProp = function(){
        var prop = new THREE.Mesh(
            new THREE.BoxGeometry(0.5,4,0.5),
            materials.prop
        );
        
        prop.position.x = 3.25;
        return prop;
    };

    // main create method
    api.create = function(opt){
        opt = opt || {};
        opt.materials = opt.materials || {};

        var plane = new THREE.Group();
        // body and tail
        plane.add(createBody(opt));
        plane.add(createTail(opt));
        // ref to prop
        plane.userData.prop = createProp();
        plane.add(plane.userData.prop);
        // wings
        plane.add(createWing(opt, -1));
        plane.add(createWing(opt, 1));
        // guy
        plane.add(createGuy());
        // prop radian to move prop
        plane.userData.propRadian = 0;
        plane.userData.propRPS = 0.25;
		
		plane.add(new THREE.BoxHelper(plane));
		
        return plane;
    };

    api.update = function(bi, per){
        var ud = bi.userData;
        ud.propRadian = Math.PI * 64 * per;
        ud.prop.rotation.set(ud.propRadian,0,0)
    };

    return api;
}
    ());
