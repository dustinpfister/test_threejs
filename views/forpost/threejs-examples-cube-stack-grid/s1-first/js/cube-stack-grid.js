// Cube Stack Grid example from threejs-examples-cube-stack-grid
var CubeStackGrid = (function () {

    var DEFAULT_FOREACHTILE = function(sopIndex, i, csg, opt){};

    // the public api
    var api = {};

    // create a new Cube Stack Grid (csg) object
    api.create = function (opt) {
        opt = opt || {};
        // cube stack grid object is an instance of THREE.Group
        var csg = new THREE.Group(),
        ud = csg.userDatal

        ud.gw = opt.gw === undefined ? 4 : opt.gw;
        ud.gh = opt.gw === undefined ? 4 : opt.gw;
        ud.space = opt.gw === undefined ? 4 : opt.gw;
        ud.forEachTile = opt.forEachTile === undefined ? DEFAULT_FOREACHTILE : opt.forEachTile;

        return csg;
    };
    // return public api
    return api;
}
    ());
