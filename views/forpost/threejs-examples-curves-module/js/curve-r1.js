// curve.js - r1 - from threejs-examples-curves-module
(function(api){
    //-------- ----------
    // DEFAULTS
    //-------- ----------
/*
    const DEFAULT_GRC_POINTS = [
        [0.00,     0.5],
        [1.00,     0.5],
        [0.0]
    ];
*/
    // Deafult Alpha Control Points ( ac_points )
    const DEFAULT_AC_POINTS = [
        0.00,     0.5,
        1.00,     0.5,
        0.0,      0.0
    ];
    //-------- ----------
    // HELPERS
    //-------- ----------
    // for path data helper used by QBCurvePath and QBV3Array
    const forPathData = (data, collection, forCurve) => {
        collection = collection || new THREE.CurvePath();
        forCurve = forCurve || function(a, curve, curvePath, data){
            curvePath.add(curve);
        };
        data.forEach( ( a ) => {
            const curve = api.QBDelta.apply(null, a.slice(0, a.length - 1));
            forCurve(a, curve, collection, data);
        });
        return collection;
    };
    // create an alpha curve helper function

/*
    const createAlphaCurve1 = (grc_points) => {
        let i = 0, len = grc_points.length;
        const data = [];
        while(i < len - 1){
            const s = grc_points[i];
            const e = grc_points[i + 1];
            data.push([ 0, s[0], 0,   0, e[0], 0,   0, s[1], 0 ]);
            i += 1;
        }
        return api.QBCurvePath(data);
    };
*/
    const createAlphaCurve2 = (ac_points) => {
        let i = 0, len = ac_points.length;
        const data = [];
        while(i < len - 2){
            const s = ac_points[i];
            const s2 = ac_points[i + 1]
            const e = ac_points[i + 2];
            data.push([ 0, s, 0,   0, e, 0,   0, s2, 0 ]);
            i += 2;
        }
        return api.QBCurvePath(data);
    };

    const ALPHA_FUNCTIONS = {};
    // first curve alpha function that just uses the Curve.getPoint method
    // and then uses the y axis as the alpha values
    ALPHA_FUNCTIONS.curve1 = ( opt ) => {
        const cp = createAlphaCurve2(opt.grc_points);
        return function(givenAlpha){
            let a = cp.getPoint(givenAlpha).y;
            return a;
        };
    };
    // second curve alpha function ( defualt for R1 ) will get a curve object from the array of curves
    // then figure an alpha value to given when calling the Curve.getPoint method of a child curve object
    // of the curve path created with the createAlphaCurve helper
    ALPHA_FUNCTIONS.curve2 = ( opt ) => {
        // use each path by itself
//const cp1 = createAlphaCurve1(opt.grc_points);

//console.log(opt.ac_points)
        const cp = createAlphaCurve2(opt.ac_points);

        return function(alpha){
            alpha = alpha === 1 ? 0.9999999999 : alpha;
            const cLen = cp.curves.length;
            const curveIndex = Math.floor( cLen * alpha);
            const cc = cp.curves[ curveIndex];
            const a_cc = alpha %  ( 1 / cLen ) * ( cLen );
            const v3 = cc.getPoint( a_cc );
            let a = v3.y;
            return a;
        };
    };
    // plain old linear get alpha function
    ALPHA_FUNCTIONS.linear = (opt) => {
        // the given alpha value should all ready be linear
        // as long as that is true this option should work by just echoing that back
        return function(alpha){
            return alpha;
        };
    };
    // plain old bias get alpha function
    ALPHA_FUNCTIONS.bias = (opt) => {
        return function(alpha){
            return 1 - Math.abs(0.5 - alpha ) / 0.5;
        };
    };
    // sin bias get alpha function
    ALPHA_FUNCTIONS.sinBias = (opt) => {
        return function(alpha){
            const b = 1 - Math.abs(0.5 - alpha ) / 0.5;
            return Math.sin( Math.PI * 0.5 * b );
        };
    };
    // smooth step
    ALPHA_FUNCTIONS.smooth = (opt) => {
        return function(alpha){
            return THREE.MathUtils.smoothstep(alpha, 0, 1);
        };
    };
    // using the mapLinear method of the THREE.MathUtils object
    ALPHA_FUNCTIONS.mapLinear = (opt) => {
        const startAlpha = opt.grc_points[0][0] === undefined ? 0 : opt.grc_points[0][0];
        const endAlpha = opt.grc_points[0][1] === undefined ? 1 : opt.grc_points[0][1];
        return function(alpha){
            return THREE.MathUtils.mapLinear(alpha, 0, 1, startAlpha, endAlpha);
        };
    };
    //-------- ----------
    // RETURN CURVE
    //-------- ----------
    // just a short hand for THREE.QuadraticBezierCurve3
    api.QBC3 = function(x1, y1, z1, x2, y2, z2, x3, y3, z3){
        let vs = x1;
        let ve = y1;
        let vc = z1;
        if(arguments.length === 9){
            vs = new THREE.Vector3(x1, y1, z1);
            ve = new THREE.Vector3(x2, y2, z2);
            vc = new THREE.Vector3(x3, y3, z3);
        }
        return new THREE.QuadraticBezierCurve3( vs, vc, ve );
    };
    // QBDelta helper using QBC3
    // this works by giving deltas from the point that is half way between
    // the two start and end points rather than a direct control point for x3, y3, and x3
    api.QBDelta = function(x1, y1, z1, x2, y2, z2, x3, y3, z3) {
        const vs = new THREE.Vector3(x1, y1, z1);
        const ve = new THREE.Vector3(x2, y2, z2);
        // deltas
        const vDelta = new THREE.Vector3(x3, y3, z3);
        const vc = vs.clone().lerp(ve, 0.5).add(vDelta);
        const curve = api.QBC3(vs, ve, vc);
        return curve;
    };
    // return a path curve by just calling the for path data helper with default options
    api.QBCurvePath = function(data){
        return forPathData(data);
    };
    //-------- ----------
    // RETURN V3ARRAY
    //-------- ----------
    // QBV3Array
    api.QBV3Array = function(data) {
        const v3Array = [];
        forPathData(data, v3Array, function(a, curve, v3Array){
            v3Array.push( curve.getPoints( a[9]) );
        });
        return v3Array.flat();
    };
    // Glavin Points are random points used for camera pos
    api.GlavinPoints2 = (count, origin, VULR, A1, A2 ) => {
        count = count === undefined ? 50 : count;
        origin = origin === undefined ? new THREE.Vector3() : origin;
        VULR = VULR === undefined ? new THREE.Vector2(0, 1) : VULR; // Max and min unit vector length
        A1 = A1 === undefined ? new THREE.Vector2(0, 360) : A1;
        A2 = A2 === undefined ? new THREE.Vector2(-90, 90) : A2;
        const v3Array = [];
        let i  = 0;
        while(i < count){
            // random euler
            const e = new THREE.Euler();
            e.x = Math.PI / 180 * ( A1.x + ( A1.y - A1.x ) * THREE.MathUtils.seededRandom() );
            e.y = Math.PI / 180 * ( A2.x + ( A2.y - A2.x ) * THREE.MathUtils.seededRandom() );
            // random unit length
            const ul = VULR.x + ( VULR.y - VULR.x ) * THREE.MathUtils.seededRandom();
            // v3 is a random dir and unit length from origin
            const v = origin.clone().add( new THREE.Vector3( 0, 0, 1).applyEuler(e).multiplyScalar(ul) )
            v3Array.push(v);
            i += 1;
        }
        return v3Array;
    };
    //-------- ----------
    // ALPHA FUNCTIONS
    //-------- ----------
    api.getAlphaFunction = (opt) => {
        opt = opt || {};
        opt.type = opt.type || 'curve2';
        opt.clamp = opt.clamp === undefined ? true : opt.clamp;

        opt.ac_points = opt.ac_points || DEFAULT_AC_POINTS;
        //opt.grc_points = opt.grc_points || DEFAULT_GRC_POINTS;


        // create the alpha function to use
        const alphaFunc = ALPHA_FUNCTIONS[ opt.type ](opt);
        // the main get alpha method
        return function(a, b, c){
            let a1 = 0;
            // 1 arg : a is an alpha value
            if(arguments.length === 1){
                a1 = alphaFunc(a);
            }
            // 2 arg : a is an alpha value, and b is a count
            if(arguments.length === 2){
                a1 = alphaFunc(a * b % 1);
            }
            if(arguments.length > 2){
            // 3+ arg : a is a numerator, b is a denomanator, and c is a count
               a1 = alphaFunc(a / b * c % 1);
            }
            // clamp?
            if(opt.clamp){
                a1 = THREE.MathUtils.clamp(a1, 0, 0.9999999999);
            }
            return a1;
        }
    };
    //-------- ----------
    // DEBUG HELPERS
    //-------- ----------
    // debug lines
    api.debugLines = ( arrays ) => {
        const line_debug = new THREE.Line(
            new THREE.BufferGeometry().setFromPoints(arrays.flat()),
            new THREE.LineBasicMaterial({ transparent: true, opacity: 0.3})
        );
        return line_debug;
    };
    // debug points
    api.debugPoints = ( arrays ) => {
        const points_debug = new THREE.Points(
            new THREE.BufferGeometry().setFromPoints(arrays.flat()),
            new THREE.PointsMaterial({ size: 0.25, color: new THREE.Color(0, 1, 0)})
        );
        return points_debug;
    };
    // debug points for a curve
    api.debugPointsCurve = ( curve, opt ) => {
        opt = opt || {};
        opt.count = opt.count === undefined ? 100 : opt.count;
        opt.getAlpha = opt.getAlpha || function(alpha){ return alpha; };
        opt.size = opt.size === undefined ? 0.2 : opt.size;
        opt.color = opt.color === undefined ? new THREE.Color(0,1,1) : opt.color;
        const v3Array = [];
        let i = 0;
        while(i < opt.count){
            v3Array.push( curve.getPoint( opt.getAlpha(i / opt.count ) ) );
            i += 1;
        }
        const points_debug = new THREE.Points(
            new THREE.BufferGeometry().setFromPoints(v3Array),
            new THREE.PointsMaterial({ size: opt.size, color: opt.color})
        );
        return points_debug;
    };
    // debug and alpha function
    api.debugAlphaFunction = (alphaFunc, opt) => {
        opt = opt || {};
        opt.count = opt.count === undefined ? 200 : opt.count;
        opt.sx = opt.sx === undefined ? -5 : opt.sx;
        opt.sz = opt.sz === undefined ? 5 : opt.sz;
        opt.w = opt.w === undefined ? 10 : opt.w;
        opt.h = opt.h === undefined ? -10 : opt.h;
        opt.size = opt.size === undefined ? 0.2 : opt.size;
        opt.color = opt.color === undefined ? new THREE.Color(0,1,1) : opt.color;
        const v3Array = [];
        let i = 0;
        while(i < opt.count){
            const a1 = i / opt.count;
            const x = opt.sx + a1 * opt.w;
            const z = opt.sz + alphaFunc(a1) * opt.h;
            v3Array.push( new THREE.Vector3( x, 0 , z) );
            i += 1;
        }
        const points = new THREE.Points(
            new THREE.BufferGeometry().setFromPoints( v3Array ),
            new THREE.PointsMaterial({ size: opt.size, color: opt.color})
        );
        return points;
    };
}(this['curveMod'] = {} ));