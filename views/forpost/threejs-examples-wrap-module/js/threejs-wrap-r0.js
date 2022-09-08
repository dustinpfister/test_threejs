/* threejs-wrap.js - r0 - A THREEJS Wrap Module
 *     for the post: https://dustinpfister.github.io/2022/09/09/threejs-examples-wrap-module/
 */
const wrapMod = (function () {
    // public API
    const api = {};
    // Wrap method based off of the method from Phaser3 
    // ( https://github.com/photonstorm/phaser/blob/v3.55.2/src/math/Wrap.js )
    // * Added some code for case: Wrap(0, 0, 0)
    // * Using Math.min and Math.max so that Wrap(value, 2, 10) is same as Wrap(value, 10, 2)
    //
    const wrap = api.wrap = function (value, a, b){
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
    // Wrap a vector method of public api
    api.wrapVector = function (vec, vecMin, vecMax) {
        vecMin = vecMin || new THREE.Vector3(-1, -1, -1);
        vecMax = vecMax || new THREE.Vector3(1, 1, 1);
        Object.keys(vec).forEach(function(axis){
            wrapAxis(vec, vecMin, vecMax, axis);
        });
        return vec;
    };
    // wrap a vector by unit length
    api.wrapVectorLength = function (vec, minLength, maxLength) {
        minLength = minLength === undefined ? 0 : minLength;
        maxLength = maxLength === undefined ? 0 : maxLength;
        let len = wrap(vec.length(), minLength, maxLength);
        vec.normalize().multiplyScalar(len);
        return vec;
    };
    // wrap a Euler
    // Wrap a vector method of public api
    const PI2 = Math.PI * 2;
    api.wrapEuler = function (eu, euMin, euMax) {
        euMin = euMin || new THREE.Euler(0, 0, 0);
        euMax = euMax || new THREE.Euler(PI2, PI2, PI2);
        eu.x = wrap(eu.x, euMin.x, euMax.x);
        eu.y = wrap(eu.y, euMin.y, euMax.y);
        eu.z = wrap(eu.z, euMin.z, euMax.z);
        return eu;
    };
    // return api
    return api;
}());
 