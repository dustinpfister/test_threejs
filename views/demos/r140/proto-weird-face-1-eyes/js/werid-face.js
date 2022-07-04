// WERID FACE CONTROLS
var weridFace = {};

// set mouth state
weridFace.setMouth = function(nose, alpha, m0, m1){
    var mouth = nose.getObjectByName('mouth');
    lerpGeo(mouth.geometry, m0.geometry, m1.geometry, alpha);
};

weridFace.setEye = function(nose, eyeIndex, a, b, scale){

    a = a === undefined ? 0 : a;
    b = b === undefined ? 0 : b;
    scale = scale === undefined ? 1 : scale;

    var eye = nose.getObjectByName('eye' + eyeIndex);
    var pupil = nose.getObjectByName('pupil' + eyeIndex);
    var radius = 0.2;
    var e = new THREE.Euler();
    e.x = Math.PI * 2 * b;
    e.z = Math.PI * 2 * a;
    // using set and apply euler
    pupil.position.set(0 , radius * -1, 0).applyEuler( e );
    var v = new THREE.Vector3();
    eye.getWorldPosition( v );
    pupil.lookAt( v );

};