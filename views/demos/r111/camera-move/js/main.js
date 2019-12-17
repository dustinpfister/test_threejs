
// Camera
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
        new THREE.MeshBasicMaterial({
            color: 0xff0000,
            wireframe: true
        })));

// position things

var frame = 0,
frameMax = 100;
var loop = function () {

    requestAnimationFrame(loop);

    var per = frame / frameMax,
    rad = Math.PI * 2 * per,
    x = Math.cos(rad) * 3,
    y = -3 + 6 * (1 - Math.abs(per - 0.5) / 0.5),
    z = Math.sin(rad) * 3;

    camera.position.set(x, y, z);
    camera.lookAt(0, 0, 0);
    // draw the scene
    renderer.render(scene, camera);

    frame += 1;
    frame %= frameMax;
};
loop();
