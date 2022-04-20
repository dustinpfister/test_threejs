// SCENE, CAMERA, and RENDERER
var scene = new THREE.Scene();
scene.add( new THREE.GridHelper(10, 10) );
var camera = new THREE.PerspectiveCamera(75, 320 / 240, 1, 1000);
camera.position.set(0, 2.5, 2.5);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer();
document.getElementById('demo').appendChild(renderer.domElement);
// ARROW HELPER
var arrow = new THREE.ArrowHelper(
        // first argument is the direction
        new THREE.Vector3(2, 2, 0).normalize(),
        // second argument is the origin
        new THREE.Vector3(0, 0, 0),
        // length
        2.2,
        // color
        0x00ff00);
scene.add(arrow);
// LOOP
var frame = 0,
maxFrame = 500,
loop = function () {
    requestAnimationFrame(loop);
    var per = frame / maxFrame,
    rad = Math.PI * 2 * per,
    x = Math.cos(rad),
    y = Math.sin(rad);
    // can change the direction
    var dir = new THREE.Vector3(x, y, 0).normalize();
    arrow.setDirection(dir);
    renderer.render(scene, camera);
    frame += 1;
    frame %= maxFrame;
};
loop();