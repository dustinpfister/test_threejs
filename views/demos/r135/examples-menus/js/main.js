var raycaster = new THREE.Raycaster();
var pointer = new THREE.Vector2(1, 1);



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


// CAMERA and RENDERER
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(5, 5, 5);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);

// EVENTS

// on Pointer Down
var onPointerDown = function( event ) {
    var canvas = event.target,
    box = canvas.getBoundingClientRect(),
    x = event.clientX - box.left,
    y = event.clientY - box.top;
    pointer.x = ( x / canvas.scrollWidth ) * 2 - 1;
    pointer.y = - ( y / canvas.scrollHeight ) * 2 + 1;

console.log(pointer.x, pointer.y);

};
renderer.domElement.addEventListener( 'pointerdown', onPointerDown, false );


// ORBIT CONTROLS
var controls = new THREE.OrbitControls(camera, renderer.domElement);

// LOOP
var lt = new Date(),
//frame = 0,
//maxFrame = 300,
fps = 30;
var loop = function () {
    var now = new Date(),
    //per = frame / maxFrame,
    //bias = 1 - Math.abs(per - 0.5) / 0.5,
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    if (secs > 1 / fps) {
        // update
        update({}, secs);
        // redner
        renderer.render(scene, camera);

        //frame += fps * secs;
        //frame %= maxFrame;

        lt = now;
    }
}
loop();


