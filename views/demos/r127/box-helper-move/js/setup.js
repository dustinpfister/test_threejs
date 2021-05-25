var scene = new THREE.Scene();
scene.add(new THREE.GridHelper(9, 9));

var mesh1 = new THREE.Mesh(
        new THREE.SphereGeometry(0.5, 30, 30),
        new THREE.MeshStandardMaterial({
            color: 0xff0000,
            emissive: 0x0a0a0a
        }));
// adding a helper to mesh1
mesh1.add(new THREE.BoxHelper(mesh1, 0xffff00));
scene.add(mesh1);
var mesh2 = new THREE.Mesh(
        new THREE.SphereGeometry(0.5, 30, 30),
        new THREE.MeshStandardMaterial({
            color: 0x00ff00,
            emissive: 0x0a0a0a
        }));
scene.add(mesh2);
// adding a helper to mesh2
mesh2.add(new THREE.BoxHelper(mesh1, 0xffff00));

var group = new THREE.Group();
// adding a box helper for the group
group.add(new THREE.BoxHelper(mesh2, 0xffffff));
scene.add(group);

// light
var light = new THREE.PointLight(0xffffff);
light.position.set(0, 3, 0);
scene.add(light);

// camera renderer
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(6, 6, 6);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);

var frame = 0, maxFrame = 48;
var loop = function () {

    setTimeout(loop, 1000 / 12);

    var per = frame / maxFrame,
    bias = 1 - Math.abs(0.5 - per) / 0.5;

    // change position and rotation of mesh1
    // this also changes the position of the box helper
    // that is relative to the mesh
    mesh1.position.z = 5 * bias;
    mesh1.rotation.y = Math.PI * per;

    // when mesh2 is moved the boxHelper does not move
    // the reason why is that it was added to the scene
    // rather than mesh2
    mesh2.position.x = 10 * bias;

    renderer.render(scene, camera);

    frame += 1;
    frame %= maxFrame

};
loop();
