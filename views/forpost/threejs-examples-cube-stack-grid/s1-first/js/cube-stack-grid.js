// Cube Stack Grid example from threejs-examples-cube-stack-grid
var CubeStackGrid = (function () {

    // default for each cell function
    var DEFAULT_FOR_EACH_TILE = function(sopIndex, i, csg, opt){};

    // defualt stack option palette
    var DEFAULT_STACK_OPTION_PALETTE = [
        { boxCount: 5 },
        { boxCount: 20 },
        { boxCount: 50 },
        { boxCount: 100 }
    ];

    var DEFAULT_SOP_INDICES = [];

    // parse stack option indices array
    var parseSOPIndices = function(csg, sopArray){
        sopArray = sopArray || [];
        var ud = csg.userData,
        len = ud.gw * ud.gh,
        i = 0,
        array = [];
        while(i < len){
            array[i] = sopArray[i] === undefined ? 0 : sopArray[i];
            i += 1;
        }
        return array;
    };

    // the public api
    var api = {};

    // create a new Cube Stack Grid (csg) object
    api.create = function (opt) {
        opt = opt || {};
        // cube stack grid object is an instance of THREE.Group
        var csg = new THREE.Group(),
        ud = csg.userData;
        ud.gw = opt.gw === undefined ? 4 : opt.gw;  // gw and gh value for the over all grid of cube stacks
        ud.gh = opt.gh === undefined ? 4 : opt.gh;
        ud.space = opt.space === undefined ? 1 : opt.space;
        ud.forEachTile = opt.forEachTile === undefined ? DEFAULT_FOR_EACH_TILE : opt.forEachTile;
        ud.stackOptionPalette = opt.stackOptionPalette === undefined ? DEFAULT_STACK_OPTION_PALETTE : opt.stackOptionPalette;
        ud.sopArray = opt.sopArray === undefined ? DEFAULT_SOP_INDICES : opt.sopArray;
        ud.stackGW = opt.stackGW === undefined ? 2 : opt.stackGW;
        ud.stackGH = opt.stackGH === undefined ? 2 : opt.stackGH;
        // create the CubeStacks
        var w = ud.gw;
        var sopArray = parseSOPIndices(csg, opt.sopArray);
        sopArray.forEach(function(sopIndex, i){
            var stackOpt = ud.stackOptionPalette[sopIndex];
            var stack = CubeStack.create({
                gw: ud.stackGW,
                gh: ud.stackGH,
                boxCount: stackOpt.boxCount || 0,
                getPos: stackOpt.getPos || 'seededRandom',
                posArray: stackOpt.posArray || [],
                colors: stackOpt.colors || [
                    [0,1,0, [128, 255]]
                ],
                planeColor: stackOpt.planeColor || 0
            });
            var x = i % w;
            var y = Math.floor(i / w);
            stack.position.set(
                -10 + (ud.stackGW + ud.space) * x, 
                0.6, 
                -10 + (ud.stackGH + ud.space) * y);
            csg.add(stack);
        });
        // return the csg object
        return csg;
    };
    // return public api
    return api;
}
    ());
