
var Biplane = (function () {

    var api = {};

    // create a wing
    var createWing = function(y){
        var wing = new THREE.Mesh(
            new THREE.BoxGeometry(2,1,8),
            new THREE.MeshLambertMaterial({
                color: 0xff0000
            })
        );
        wing.position.y = y;
        return wing;
    };

    // create a body
    var createBody = function(){
        var body = new THREE.Mesh(
            new THREE.BoxGeometry(10,2,2),
            new THREE.MeshLambertMaterial({
                color: 0xff0000
            })
        );
        body.position.x = -2;
        return body;
    };

    api.create = function(){
        var plane = new THREE.Group();

        plane.add(createBody());
        plane.add(createWing(-1));
        plane.add(createWing(1));

        return plane;
    };

    return api;
}
    ());
