
var Biplane = (function () {

    var api = {};

    api.create = function(){
        return new THREE.Mesh(
            new THREE.BoxGeometry(1,1,1),
            new THREE.MeshLambertMaterial({
                color: 0xff0000
            })
        );
    };

    return api;
}
    ());
