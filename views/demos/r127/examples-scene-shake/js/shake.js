(function (api) {

    // create
    api.create = function (opt) {
        var shake = {
            pos: 0.1,
            deg: 1.5,
            euler: new THREE.Euler(0, 0, 0),
            vector: new THREE.Vector3(0, 0, 0)
        };
        return shake;
    };

}
    (this['ShakeMod'] = {}));
