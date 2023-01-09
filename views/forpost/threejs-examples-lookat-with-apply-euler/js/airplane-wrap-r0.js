// airplane-wrap.js - r0 - from threejs-examples-lookat-with-apply-euler
(function(api){
    // position a wrap object
    api.position = function(wrap, bias, ringCount){
        bias = bias === undefined ? 1 : bias;
        ringCount = ringCount === undefined ? 5 : ringCount;
        const count = wrap.children.length,
        perRing = count / ringCount,
        yaStep = 90 / ringCount,
        radius = 15; 
        let i = 0;
        while(i < count){
            const per = i / count;
            var g = wrap.children[i];
            const ring = Math.floor( i / perRing );
            const rPer = ( i - perRing * ring) / perRing;
            const x = Math.PI * 2 * rPer, 
            y = Math.PI / 180 * yaStep * ring * bias, 
            z = 0;
            // USING APPLY EULER
            const e = new THREE.Euler(x, y, z);
            g.position.set(0, 0, radius).applyEuler( e );
            g.lookAt(0, 0, 0);
            i += 1;
        }
    };
    // make a collection of them
    api.create = function(count){
        count = count === undefined ? 50 : count;
        const wrap = new THREE.Group();
        let i = 0;
        while(i < count){
            //const g = mkModel('g' + i);
            const g = airplane.create('g' + i);
            wrap.add( g );
            i += 1;
        }
        wrap.scale.set(0.5, 0.5, 0.5);
        // first call of position method
        api.position(wrap, 1, 5);
        return wrap;
    };
}( this['airplane_wrap'] = {} ));
