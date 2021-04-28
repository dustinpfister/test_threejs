
// a Mesh
var meshA = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial());
// cloning ths mesh
var box1 = meshA.clone(),
box2 = meshA.clone(),
box3 = meshA.clone();

// adjusting positions
box2.position.set(-1.5, 0, 0);
box3.position.set(1.5, 0, 0);

// creating a scene
var scene = new THREE.Scene();

// add the box mesh to the scene
scene.add(box1);
scene.add(box2);
scene.add(box3);

// camera and renderer
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(3, 3, 3);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);

var lt = new Date();
var loop = function () {
    var now = new Date(),
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    if (secs >= 0.075) {
        lt = now;
        // USING EULER XYZ PROPS
        box2.rotation.x += 1 * secs;
        box2.rotation.x %= Math.PI * 2;
        box3.rotation.y += 1 * secs;
        box3.rotation.y %= Math.PI * 2;
        renderer.render(scene, camera);
    }

};

loop();
