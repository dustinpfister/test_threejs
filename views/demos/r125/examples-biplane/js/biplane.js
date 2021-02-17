
var Biplane = (function () {

    var materials = {
        plane: new THREE.MeshLambertMaterial({
            color: 0x00ff00
        }),
        guy: new THREE.MeshLambertMaterial({
            color: 0xffffff
        })
    };

    var api = {};

    // create a wing
    var createWing = function(y){
        var wing = new THREE.Mesh(
            new THREE.BoxGeometry(2,1,10),
            materials.plane
        );
        wing.position.y = y;
        return wing;
    };

    // create a body
    var createBody = function(){
        var body = new THREE.Mesh(
            new THREE.BoxGeometry(10,2,2),
            materials.plane
        );
        body.position.x = -2;
        return body;
    };

    // create a body
    var createTail = function(){
        var body = new THREE.Mesh(
            new THREE.BoxGeometry(1,2,2),
            materials.plane
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
            materials.guy
        );
        
        prop.position.x = 3.25;
        return prop;
    };

    // main create method
    api.create = function(){
        var plane = new THREE.Group();
        // body and tail
        plane.add(createBody());
        plane.add(createTail());
        // ref to prop
        plane.userData.prop = createProp();
        plane.add(plane.userData.prop);
        // wings
        plane.add(createWing(-1));
        plane.add(createWing(1));
        // guy
        plane.add(createGuy());
        // prop radian to move prop
        plane.userData.propRadian = 0;
        plane.userData.propRPS = 0.25;
        return plane;
    };

    api.update = function(bi, secs){
        var ud = bi.userData;
        ud.propRadian += (Math.PI * 2 * ud.propRPS) * secs;
        ud.propRadian %= (Math.PI * 2);
        ud.prop.rotation.set(ud.propRadian,0,0)
    };

    return api;
}
    ());
