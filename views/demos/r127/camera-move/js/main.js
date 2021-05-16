
var moveCamera = function (camera, per) {
    var rad = Math.PI * 2 * per,
    x = Math.cos(rad) * 3,
    y = -3 + 6 * (1 - Math.abs(per - 0.5) / 0.5),
    z = Math.sin(rad) * 3;
    // position property can be used to set
    // the position of a camera
    camera.position.set(x, y, z);
    // the rotation property or the lookAt method
    // can be used to set rotation
    camera.lookAt(0, 0, 0);
};

// CAMERA
var width = 640,
height = 480,
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

// APP
var frame = 0,
frameMax = 30 * 5,
fps = 30,
lt = new Date();
var loop = function () {
    var now = new Date(),
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    if (secs > 1 / fps) {
        // calling move camera
        moveCamera(camera, frame / frameMax);
        renderer.render(scene, camera);
        frame += fps * secs;
        frame %= frameMax;
        lt = now;
    }
};
loop();
