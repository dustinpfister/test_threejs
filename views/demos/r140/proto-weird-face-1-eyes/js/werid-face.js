// WERID FACE CONTROLS
var weridFace = {};

// set mouth state
weridFace.setMouth = function(nose, alpha, m0, m1){
    var mouth = nose.getObjectByName('mouth');
    lerpGeo(mouth.geometry, m0.geometry, m1.geometry, alpha);
};