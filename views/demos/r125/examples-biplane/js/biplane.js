
var Biplane = (function () {

    var api = {};

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

    api.create = function(){
        var plane = new THREE.Group();

        plane.add(createWing(-1));
        plane.add(createWing(1));

        return plane;
    };

    return api;
}
    ());
