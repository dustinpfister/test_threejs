
// create and return a pointer down hander for the given sm object
var createPointerDownHandler = function(sm){
    return function(event) {
        var canvas = event.target,
        box = canvas.getBoundingClientRect(),
        x = event.clientX - box.left,
        y = event.clientY - box.top;
        // update sm.pointer values
        sm.pointer.x = ( x / canvas.scrollWidth ) * 2 - 1;
        sm.pointer.y = - ( y / canvas.scrollHeight ) * 2 + 1;
        console.log(sm.pointer);
    };
};

// create a button group;
var createButtonGroup = function(){
    var group = new THREE.Group();
    var i = 0;
    while(i < 3){
        var button = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 2),
            new THREE.MeshNormalMaterial());
        button.position.y = 1 - 1.25 * i;
        group.add(button);
        i += 1;
    }
    return group;
};

// STATE MACHINE (sm) OBJECT
var createSMObject = function(){
    var sm = {
        lt: new Date(),
        fps: 30,
        raycaster: new THREE.Raycaster(),
        pointer: new THREE.Vector2(1, 1),
        camera : new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000),
        renderer : new THREE.WebGLRenderer(),
        scene : new THREE.Scene()
    };
    // add grid helper to the scene
    sm.scene.add(new THREE.GridHelper(9, 9));
    // adding a button group to the scene
    sm.scene.add(createButtonGroup());
    // starting positon and look at for camera
    sm.camera.position.set(4, 2, 2);
    sm.camera.lookAt(0, 0, 0);
    // renderer
    sm.renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(sm.renderer.domElement);
    // EVENTS
    sm.renderer.domElement.addEventListener( 'pointerdown', createPointerDownHandler(sm), false );
    // return the sm object
    return sm;
};




// create sm object
var sm = createSMObject();


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


