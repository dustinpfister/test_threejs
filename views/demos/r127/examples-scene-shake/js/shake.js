(function (api) {

    // create
    api.create = function (opt) {
        opt = opt || {};
        var shake = {
            pos: opt.pos === undefined ? 0.5 : opt.pos,
            deg : opt.deg === undefined ? 2.25 : opt.deg,
            euler: new THREE.Euler(0, 0, 0),
            vector: new THREE.Vector3(0, 0, 0)
        };
        return shake;
    };

}
    (this['ShakeMod'] = {}));
