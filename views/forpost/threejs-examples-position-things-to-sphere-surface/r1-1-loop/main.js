//******** **********
// SCENE, CAMERA, RENDERER
//******** **********
var scene = new THREE.Scene();
scene.add(new THREE.GridHelper(10, 10));
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(3.0, 3.0, 3.0);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
//******** **********
// MESH OBJECTS
//******** **********
var sphere1 = new THREE.Mesh(
    new THREE.SphereGeometry(1, 30, 30),
    new THREE.MeshNormalMaterial({wireframe: true})
);
scene.add(sphere1);
var box1 =  new THREE.Mesh(
    new THREE.BoxGeometry(0.5, 0.5, 0.5),
    new THREE.MeshNormalMaterial()
);
scene.add(box1);
//******** **********
// LOOP
//******** **********
var controls = new THREE.OrbitControls(camera, renderer.domElement);
var lt = new Date(),
frame = 0,
maxFrame = 100,
fps = 30;
var loop = function () {
    var now = new Date(),
    per = frame / maxFrame,
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    if (secs > 1 / fps) {
 
        // position to sphere
        var p = per * 6 % 1,
        b = 1 - Math.abs(0.5 - p) / 0.5;
        SphereWrap.positionToSphere(sphere1, box1, 0.75 - 0.5 * b, per, 0.25);
 
        // using lookAt method to set box rotation
        box1.lookAt(sphere1.position);
 
        renderer.render(scene, camera);
        frame += fps * secs;
        frame %= maxFrame;
        lt = now;
    }
}
loop();
