// apLerp module -r0 prototype
var apLerp = (function () {
    // built in get alpha methods
    var GET_ALPHA_METHODS = {
        // simple, regular lerp
        simp: function(state){
            return state.p;
        },
        // pow1 lerp ( default for r0 )
        pow1 : function(state, param){
            var base = param.base === undefined ? 2.0 : param.base;
            var e = param.e === undefined ? 16 : param.e;
            var invert = param.invert === undefined ? false : param.invert;
            var m = Math.pow(base, e * state.p) / Math.pow(base, e);
            return invert ? 1 - m : m;
        }
    };
    // built in ap lerp method used by apLerp.lerp and apLerp.getPointsBetween
    var apLerp = function(opt){
        opt = opt || {};
        opt.v1 = opt.v1 || new THREE.Vector3();
        opt.v2 = opt.v2 || new THREE.Vector3();
        opt.alpha = opt.alpha === undefined ? 0 : opt.alpha;
        opt.getAlpha = opt.getAlpha || GET_ALPHA_METHODS.pow1;
        if(typeof opt.getAlpha === 'string'){
            opt.getAlpha = GET_ALPHA_METHODS[opt.getAlpha];
        }
        var a = opt.getAlpha({
            p: opt.alpha,
            gaParam: opt.gaParam || {}	
        }, opt.gaParam || {});
        // lerp from v1 to v2 using alpha from get alpha method and return the Vector3
        return opt.v1.clone().lerp(opt.v2, a);
    };

    // public api
    var api = {};
    // Public lerp method that 
    api.lerp = function(v1, v2, alpha, opt){
        opt = opt || {};
        alpha = alpha === undefined ? 0 : alpha;
        // clamp alpha
        alpha = alpha < 0 ? 0 : alpha;
        alpha = alpha > 1 ? 1 : alpha;
        return apLerp({
            v1: v1 || opt.v1 || new THREE.Vector3,
            v2: v2 || opt.v2 || new THREE.Vector3,
            alpha: alpha,
            getAlpha: opt.getAlpha,
            gaParam: opt.gaParam
        })
    };

    // Get points in the from of an array of Vector3
    // instances between the two that are given. The include bool can be used to
    // also include clones of v1 and v2 and the start and end.
    api.getPointsBetween = function(opt){
        // pase options
        opt = opt || {};
        opt.count = opt.count === undefined ? 1 : opt.count;
        opt.include = opt.include === undefined ? false : opt.include;
        var points = [];
        var i = 1;
        while(i <= opt.count){
            // call apLerp using i / ( opt.count + 1 ) for alpha
            points.push( apLerp({
                v1: opt.v1, v2: opt.v2,
                alpha: i / ( opt.count + 1 ),
                getAlpha: opt.getAlpha,
                gaParam: opt.gaParam
            }) );
            i += 1;
        }
        if(opt.include){
           points.unshift(opt.v1.clone());
           points.push(opt.v2.clone());
        }
        return points;
    };
    // return public api
    return api;
}
    ());

