// SCENE
var scene = new THREE.Scene();
// directional light
var dl = new THREE.DirectionalLight(0xffffff, 1);
scene.add(dl);
// CAMERA
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 1, 1000);
camera.position.set(1.2, 1.2, 1.2);
camera.lookAt(0, 0, 0);
// RENDER
var renderer = new THREE.WebGLRenderer();
renderer.setSize(320, 240);
document.getElementById('demo').appendChild(renderer.domElement);
// Something in the scene
var mesh = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshStandardMaterial({
            color: 0xff0000,
            emissive: 0x0a0a0a
        }));
scene.add(mesh);

var frame = 0,
maxFrame = 100;
var loop = function () {

    setTimeout(loop, 33);

    var per = frame / maxFrame,
    r = Math.PI * 2 * per;

    dl.position.set(Math.cos(r), 1, Math.sin(r));

    frame = (frame + 1) % maxFrame;

    // render
    renderer.render(scene, camera);

};
loop();
