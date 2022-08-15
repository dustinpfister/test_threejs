// WERID FACE CONTROLS
var weridFace = {};


weridFace.getBias = function(per, count){
    count = count === undefined ? 1 : count;
    return 1 - Math.abs( ( per * count % 1 ) - 0.5) / 0.5;
};

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
    // using set and apply euler to set position of pupil
    pupil.position.set(0, radius * -1, 0).applyEuler( e );
    pupil.scale.set(scale, scale, scale);
    var v = new THREE.Vector3();
    eye.getWorldPosition( v );
    pupil.lookAt( v );
};