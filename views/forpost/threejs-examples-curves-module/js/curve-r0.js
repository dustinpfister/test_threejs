// curve.js - r0 - r146 prototype
(function(api){
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
            //v3Array.push( curve.getPoints( a[9]) );
        });
        return collection;
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
}(this['curveMod'] = {} ));