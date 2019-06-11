var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(6, 6, 6);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(320, 240);
document.getElementById('demo').appendChild(renderer.domElement);

var mesh = new THREE.Mesh(new THREE.SphereGeometry(2, 30, 30), new THREE.MeshBasicMaterial({
            color: 0xff0000
        }));
var box = new THREE.BoxHelper(mesh, 0xffff00);
mesh.add(box);
scene.add(mesh);

var frame = 0, maxFrame = 48;
var loop = function () {

    setTimeout(loop, 1000 / 12);

    var per = frame / maxFrame,
    bias = 1 - Math.abs(0.5 - per) / 0.5;

    // change position and rotation
    mesh.position.z = 5 * bias;
    mesh.rotation.y = Math.PI * per;

    renderer.render(scene, camera);

    frame += 1;
    frame %= maxFrame

};
loop();
