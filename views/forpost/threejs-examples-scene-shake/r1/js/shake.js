/*   r1 of shake.js for threejs-examples-scene-shake
 *
 *
 */
(function (api) {

    // degree to radian
    var deg = function (deg) {
        return Math.PI / 180 * deg;
    };
    // random pos value for an axis
    var rndPos = function (state) {
        var min = state.pos * -1,
        max = state.pos * 2;
        return min + max * Math.random();
    };
    // random pos value for an axis
    var rndDeg = function (state) {
        var min = deg(state.deg * -1),
        max = deg(state.deg * 2);
        return min + max * Math.random();
    };

    // create
    api.create = function (opt) {
        opt = opt || {};
        var shake = {
            obj: opt.scene || opt.obj || new THREE.Object3D(), // new obj prop for shake obj
            posRange: opt.posRange || [0, 0.5],
            degRange: opt.degRange || [0, 2.25],
            intensity: opt.intensity || 0,
            pos: 0, //opt.pos === undefined ? 0.5 : opt.pos,
            deg: 0, //opt.deg === undefined ? 2.25 : opt.deg,
            euler: new THREE.Euler(0, 0, 0),
            vector: new THREE.Vector3(0, 0, 0),
            active: opt.active || false
        };
        return shake;
    };

    // just make a roll
    var roll = function (shake) {
        shake.euler.x = rndDeg(shake);
        shake.euler.y = rndDeg(shake);
        shake.euler.z = rndDeg(shake);
        shake.vector.x = rndPos(shake);
        shake.vector.y = rndPos(shake);
        shake.vector.z = rndPos(shake);
    };

    // apply a new shake to object3d
    var applyToObject3d = function (shake, obj3d) {
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
            obj3d.rotation.copy(shake.euler);
            obj3d.position.copy(shake.vector);
        } else {
            // else set back to home location
            var sd = obj3d.userData.shakeData;
            obj3d.rotation.copy(sd.homeEuler);
            obj3d.position.copy(sd.homeVector);
        }
    };


    // update the given shake object
    api.update = function(shake){

        // new shake.deg and shake.pos values
        var pMin = shake.posRange[0] * shake.intensity,
        pMax = shake.posRange[1] * shake.intensity;
        shake.pos = pMin + ( pMax - pMin ) * Math.random();

        // new roll for euler and vector values
        roll(shake);
        // apply to the shake.obj prop
        applyToObject3d(shake, shake.obj);
    };



}
    (this['ShakeMod'] = {}));
