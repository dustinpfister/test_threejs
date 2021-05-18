var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2(1, 1);

function onMouseMove( event ) {
    var canvas = event.target,
    box = canvas.getBoundingClientRect(),
    x = event.clientX - box.left,
    y = event.clientY - box.top;
    mouse.x = ( x / canvas.scrollWidth ) * 2 - 1;
    mouse.y = - ( y / canvas.scrollHeight ) * 2 + 1;
};

// creating a scene
var scene = new THREE.Scene();


var cubeGroup = CubeGroupMod.create();
cubeGroup.position.x = 0;
scene.add(cubeGroup);
 
// camera and renderer
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(5, 5, 5);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);


renderer.domElement.addEventListener( 'mousemove', onMouseMove, false );


var controls = new THREE.OrbitControls(camera, renderer.domElement);

// loop
var lt = new Date(),
frame = 0,
maxFrame = 300,
fps = 30;
var loop = function () {
    var now = new Date(),
    per = frame / maxFrame,
    bias = 1 - Math.abs(per - 0.5) / 0.5,
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    if (secs > 1 / fps) {

        // update the picking ray with the camera and mouse position
	raycaster.setFromCamera( mouse, camera );

        var intersects = raycaster.intersectObjects( cubeGroup.children, true );

        if(intersects.length > 0){
            var mesh = intersects[0].object,
            group = mesh.parent;
            group.userData.active = true;
        }

        CubeGroupMod.update(cubeGroup, secs);

        renderer.render(scene, camera);
        frame += fps * secs;
        frame %= maxFrame;
        lt = now;
    }
}
loop();


