// cameraKit module - r0 - from threejs-examples-camera-kit
var cameraKit = (function () {

    // public api
    var api = {};
   

    // plain lper method
    // ex: cameraKit.plainLerp(camera, v1, v2, 0.5);
    api.plainLerp = function(camera, v1, v2, alpha, v3){
        v1 = v1 || new THREE.Vector3();
        v2 = v2 || new THREE.Vector3();
        alpha = alpha === undefined ? 0 : alpha;
        v3 = v3 || new THREE.Vector3(); // lookAt vector
        // plain lerp expression
        camera.position.copy( v1.clone().lerp(v2, alpha) );
        if(v3){
           camera.lookAt(v3);
        }
    };
 
    // return public api
    return api;
}
    ());

