// cameraKit module - r0 - from threejs-examples-camera-kit
var cameraKit = (function () {

    // public api
    var api = {};
   

    // plain lper method
    // ex: cameraKit.plainLerp(camera, v1, v2, 0.5);
    api.plainLerp = function(camera, v1, v2, alpha){
        v1 = v1 || new THREE.Vector3();
        v2 = v2 || new THREE.Vector3();
        alpha = alpha === undefined ? 0 : alpha;
        // plain lerp expression
        camera.position.copy( v1.clone().lerp(v2, alpha) );
    };

    // sin lper method
    // ex: cameraKit.sinLerp(camera, v1, v2, 0.5);
    var sinGetAlpha = function(state, param){
        param.piM = param.piM === undefined ? 2 : param.piM;
        param.bMulti = param.bMulti=== undefined ? 0.1 : param.bMulti;
        param.aOffset = param.aOffset=== undefined ? 0.5 : param.aOffset;
        var r = Math.PI * param.piM * state.p;
        var b = Math.sin( r );
        var a = state.p + b * param.bMulti;
        // apply aOffset
        a += param.aOffset;
        a %= 1;
        // clamp
        a = a < 0 ? 0 : a;
        a = a > 1 ? 1 : a;
        return a;
    };
    api.sinLerp = function(camera, v1, v2, alpha, param){
        v1 = v1 || new THREE.Vector3();
        v2 = v2 || new THREE.Vector3();
        alpha = alpha === undefined ? 0 : alpha;
        param = param || {};

        var v3 = apLerp.lerp(v1, v2, alpha, {
            getAlpha: sinGetAlpha,
            gaParam: {
              piM: param.piM === undefined ? 2: param.piM,
              bMulti: param.bMulti === undefined ? 0.1: param.bMulti,
              aOffset: param.aOffset === undefined ? 0: param.aOffset
            }
        })
        // sin lerp the camera
        camera.position.copy( v3 );
    };
 
    // return public api
    return api;
}
    ());

