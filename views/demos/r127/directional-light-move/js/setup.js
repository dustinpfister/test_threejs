var scene = new THREE.Scene();

// directional light
var dl = new THREE.DirectionalLight(0xffffff, 1);
scene.add(dl);

var camera = new THREE.PerspectiveCamera(60, 320 / 240, 1, 1000);
camera.position.set(10, 15, 10);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
var material = new THREE.MeshStandardMaterial({color: 0xff0000,emissive: 0x0a0a0a});
var mesh = new THREE.Mesh(new THREE.BoxGeometry(2, 2, 2),material);
mesh.position.y=2;
scene.add(mesh);
var plane = new THREE.Mesh(new THREE.PlaneGeometry(12, 12, 8), material);
plane.rotation.set(-Math.PI / 2, 0, 0);
scene.add(plane)
// Loop in which the directional light position changes
var frame = 0,
maxFrame = 100;
var loop = function () {
    setTimeout(loop, 33);
    var per = frame / maxFrame,
    r = Math.PI * 2 * per;

    // change directional light position
    dl.position.set(Math.cos(r) * 10, 2, Math.sin(r)*10);

    frame = (frame + 1) % maxFrame;
    renderer.render(scene, camera);
};
loop();
