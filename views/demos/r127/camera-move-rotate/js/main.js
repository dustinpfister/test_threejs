// CAMERA
var width = 360,
height = 180,
fieldOfView = 40,
aspectRatio = width / height,
near = 0.1,
far = 1000,
camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, near, far);

// SCENE
var scene = new THREE.Scene();

// RENDER
var renderer = new THREE.WebGLRenderer();
document.getElementById('demo').appendChild(renderer.domElement);
renderer.setSize(width, height);

// MESH
scene.add(new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial()));

// APP
camera.position.set(3, 0, 0);
camera.lookAt(0, 0, 0);
console.log(camera.rotation)
var frame = 0,
frameMax = 250;
var loop = function () {
    requestAnimationFrame(loop);
    var per = frame / frameMax;

    camera.position.set(3, 0, 0);
    camera.rotation.set(Math.PI * 2 * per, Math.PI / 2, 0);

    renderer.render(scene, camera);
    frame += 1;
    frame %= frameMax;
};
loop();
