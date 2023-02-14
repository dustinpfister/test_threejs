/*   shake-module.js - r2 - from threejs-examples-scene-shake
 *       * module form of the shake.js
 */
import * as THREE from 'three';
//-------- ----------
// HELPER FUNCITONS
//-------- ----------
// degree to radian
const deg = function (deg) {
    return Math.PI / 180 * deg;
};
// random pos value for an axis
const rndPos = function (state) {
    const nmin = state.pos * -1,
    nmax = state.pos * 2;
    return nmin + nmax * Math.random();
};
// random pos value for an axis
const rndDeg = function (state) {
    const nmin = deg(state.deg * -1),
    nmax = deg(state.deg * 2);
    return nmin + nmax * Math.random();
};
// just make a roll
const roll = function (shake) {
    shake.euler.x = rndDeg(shake);
    shake.euler.y = rndDeg(shake);
    shake.euler.z = rndDeg(shake);
    shake.vector.x = rndPos(shake);
    shake.vector.y = rndPos(shake);
    shake.vector.z = rndPos(shake);
};
// apply a new shake to object3d
const applyToObject3d = function (shake, obj3d) {
    // save home data
    if (!obj3d.userData.shakeData) {
        obj3d.userData.shakeData = {
            homeVector: new THREE.Vector3().copy(obj3d.position),
            homeEuler: new THREE.Euler().copy(obj3d.rotation)
        };
    }
    // if shake is active
    if (shake.active) {
        // copy shake.euler, and shake.vector to object
        obj3d.rotation.set(
            shake.euler.x * shake.degLock.x,
            shake.euler.y * shake.degLock.y,
            shake.euler.z * shake.degLock.z
        );
        obj3d.position.copy(shake.vector).multiply(shake.posLock);


//obj3d.position.set(shake.vector.x * shake.posLock.x, shake.vector.y * shake.posLock.y, shake.vector.z  * shake.posLock.z );


    } else {
        // else set back to home location
        const sd = obj3d.userData.shakeData;
        obj3d.rotation.copy(sd.homeEuler);
        obj3d.position.copy(sd.homeVector);
    }
};
//-------- ----------
//  PUBLIC API
//-------- ----------
// The Public API
const ShakeMod = {};
// create a shake object
ShakeMod.create = function (opt) {
    opt = opt || {};
    const shake = {
        obj: opt.scene || opt.obj || new THREE.Object3D(), // new obj prop for shake obj
        posRange: opt.posRange || [0, 0.5],
        degRange: opt.degRange || [0, 2.25],
        intensity: opt.intensity || 0,
        pos: 0,
        deg: 0,
        euler: new THREE.Euler(0, 0, 0),
        vector: new THREE.Vector3(0, 0, 0),
        active: opt.active || false,
        degLock: opt.degLock || new THREE.Vector3(1, 1, 1),
        posLock: opt.posLock || new THREE.Vector3(1, 1, 1)
    };
    return shake;
};
// update the given shake object
ShakeMod.update = function(shake){
    // new shake.deg and shake.pos values
    const pMin = shake.posRange[0] * shake.intensity,
    pMax = shake.posRange[1] * shake.intensity;
    shake.pos = pMin + ( pMax - pMin ) * Math.random();
    // new deg value
    const dMin = shake.degRange[0] * shake.intensity,
    dMax = shake.degRange[1] * shake.intensity;
    shake.deg = dMin + ( dMax - dMin ) * Math.random();
    // new roll for euler and vector values
    roll(shake);
    // apply to the shake.obj prop
    applyToObject3d(shake, shake.obj);
};
// export the public methods
export { ShakeMod };
