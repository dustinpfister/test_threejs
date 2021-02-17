
var Biplane = (function () {

    var api = {};

    var createWing = function(){
        return new THREE.Mesh(
            new THREE.BoxGeometry(2,1,8),
            new THREE.MeshLambertMaterial({
                color: 0xff0000
            })
        );
    };

    api.create = function(){
        var plane = new THREE.Group();

        plane.add(createWing());

        return plane;
    };

    return api;
}
    ());
