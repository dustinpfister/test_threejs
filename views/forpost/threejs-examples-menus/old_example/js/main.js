
var sm = smMod.createSMObject();


// update the picking ray with the camera and mouse position
var update = function(state, secs){
    //raycaster.setFromCamera( mouse, camera );

    //var intersects = raycaster.intersectObjects( cubeGroup.children, true );
    // intersects.length > 0){
    // var mesh = intersects[0].object
};




// ORBIT CONTROLS
//var controls = new THREE.OrbitControls(sm.camera, sm.renderer.domElement);

// LOOP
var loop = function () {
    var now = new Date(),
    //per = frame / maxFrame,
    //bias = 1 - Math.abs(per - 0.5) / 0.5,
    secs = (now - sm.lt) / 1000;
    requestAnimationFrame(loop);
    if (secs > 1 / sm.fps) {
        // update
        update({}, secs);
        // redner
        sm.renderer.render(sm.scene, sm.camera);

        //frame += fps * secs;
        //frame %= maxFrame;

        sm.lt = now;
    }
}
loop();


