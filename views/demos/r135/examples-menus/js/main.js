
// State Machine (sm) object
var sm = {
  lt: new Date(),
  fps: 30,
  raycaster: new THREE.Raycaster(),
  pointer: new THREE.Vector2(1, 1)
};

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

var box = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial());


// update the picking ray with the camera and mouse position
var update = function(state, secs){
    //raycaster.setFromCamera( mouse, camera );

    //var intersects = raycaster.intersectObjects( cubeGroup.children, true );
    // intersects.length > 0){
    // var mesh = intersects[0].object
};

// SCENE
var scene = new THREE.Scene();
scene.add(new THREE.GridHelper(9, 9));


scene.add(box);

// CAMERA and RENDERER
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(5, 5, 5);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);

// EVENTS


renderer.domElement.addEventListener( 'pointerdown', createPointerDownHandler(sm), false );


// ORBIT CONTROLS
var controls = new THREE.OrbitControls(camera, renderer.domElement);

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
        renderer.render(scene, camera);

        //frame += fps * secs;
        //frame %= maxFrame;

        sm.lt = now;
    }
}
loop();


