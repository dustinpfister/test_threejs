/* threejs-wrap.js - r0 - A THREEJS Wrap Module
 *     for the post: https://dustinpfister.github.io/2022/09/09/threejs-examples-wrap-module/
 */
const wrapMod = (function () {
    // Wrap method based off of the method from Phaser3 
    // ( https://github.com/photonstorm/phaser/blob/v3.55.2/src/math/Wrap.js )
    // * Added some code for case: Wrap(0, 0, 0)
    // * Using Math.min and Math.max so that Wrap(value, 2, 10) is same as Wrap(value, 10, 2)
    //
    const wrap = function (value, a, b){
        // get min and max this way
        let max = Math.max(a, b);
        let min = Math.min(a, b);
        // return 0 for Wrap(value, 0, 0);
        if(max === 0 && min === 0){
             return 0;
        }
        let range = max - min;
        return (min + ((((value - min) % range) + range) % range));
    };
    // wrap an axis
    const wrapAxis = function(vec, vecMin, vecMax, axis){
        axis = axis || 'x';
        vec[axis] = wrap( vec[axis], vecMin[axis], vecMax[axis] );
        return vec;
    };
    // Main wrap a vector method of public api
    const api = function (vec, vecMin, vecMax) {
        vecMin = vecMin || new THREE.Vector3(0, 0, 0);
        vecMax = vecMax || new THREE.Vector3(1, 1, 1);
        Object.keys(vec).forEach(function(axis){
            wrapAxis(vec, vecMin, vecMax, axis);
        });
        return vec;
    };
    // make wrap method public
    api.wrap = wrap;
    // return api
    return api;
}());
 