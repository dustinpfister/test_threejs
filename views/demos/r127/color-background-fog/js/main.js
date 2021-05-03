// creating a box mesh with the Box Geometry constructor,
// and the normal material
var box = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshStandardMaterial({
            color: new THREE.Color(1, 0, 0)
        }));

// creating a scene
var scene = new THREE.Scene();

// add the box mesh to the scene
scene.add(box);

// ADD A LIGHT BECUASE THIS IS THE STANDARD MATERIAL
var light = new THREE.PointLight(new THREE.Color(1, 1, 1));
light.position.set(1, 3, 2);
scene.add(light);

// camera
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(0, 0, 1);
camera.lookAt(0, 0, 0);
// renderer
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);

var lt = new Date(),
frame = 0,
maxFrame = 100,
fps = 30;
var loop = function () {
    var now = new Date(),
    per = frame / maxFrame,
    bias = 1 - Math.abs(per - 0.5) / 0.5,
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    if (secs > 1 / fps) {
        box.position.set(0, 0, -1 - 5 * bias);
        box.rotation.set(0, Math.PI * 2 * per, Math.PI * 4 * per);
        renderer.render(scene, camera);
        frame += fps * secs;
        frame %= maxFrame;
        lt = now;
    }

};
loop();
