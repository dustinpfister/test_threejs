// scene and grid helper
var scene = new THREE.Scene();
scene.add(new THREE.GridHelper(9, 9));
 
// A MESH OBJECT WITH A BOX HELPER OF THE MESH
// ADDED AS A CHILD OF THE MESH
var mesh1 = new THREE.Mesh(
        new THREE.SphereGeometry(0.5, 30, 30),
        new THREE.MeshNormalMaterial());
mesh1.add(new THREE.BoxHelper(mesh1, 0xffff00));
scene.add(mesh1);
 
// ADDING A BOX HELPER DIRECTLY TO THE SCENE
scene.add(new THREE.BoxHelper(mesh1, 0xffffff));

// camera
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(5, 5, 5);
camera.lookAt(1, 0, 1);
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
        // change position and rotation of mesh1
        // this also changes the position of the box helper
        // that is relative to the mesh as it is a child of mesh1 
        // rather than the scene
        mesh1.position.z = 5 * bias;
        mesh1.rotation.y = Math.PI * per;
        renderer.render(scene, camera);
        frame += fps * secs;
        frame %= maxFrame;
        lt = now;
    }
};
loop();
