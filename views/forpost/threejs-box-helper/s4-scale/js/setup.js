// scene and grid helper
var scene = new THREE.Scene();
scene.add(new THREE.GridHelper(9, 9));

// a mesh with a box helper as a child of the mesh
var mesh1 = new THREE.Mesh(
        new THREE.SphereGeometry(0.5, 30, 30),
        new THREE.MeshNormalMaterial());
mesh1.add(new THREE.BoxHelper(mesh1, 0xffff00));
scene.add(mesh1);

// helper that is not a child of the object that I
// create the box helper for
var helper = new THREE.BoxHelper(mesh1);
scene.add(helper);
 
// changing position of mesh1
mesh1.position.set(-2, 0, 0);
 
// camera
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(2, 2, 2);
camera.lookAt(mesh1.position);
// render
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
// app loop
var frame = 0,
maxFrame = 90,
fps = 30,
lt = new Date();
var loop = function () {
    var now = new Date(),
    secs = (now - lt) / 1000,
    per = frame / maxFrame,
    bias = 1 - Math.abs(0.5 - per) / 0.5;
    requestAnimationFrame(loop);
    if (secs > 1 / fps) {
        var v = new THREE.Vector3(0.5, 1, 0.5 + 2 * bias);
        mesh1.scale.copy(v);
        mesh1.rotation.y = Math.PI * per;
        renderer.render(scene, camera);
        frame += fps * secs;
        frame %= maxFrame;
        lt = now;
    }
};
loop();
