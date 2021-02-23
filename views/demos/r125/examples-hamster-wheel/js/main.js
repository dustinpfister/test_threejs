// SCENE
var scene = new THREE.Scene();

// WHEEL
var wheel = new HamsterWheel();
wheel.group.position.set(0, 0, 1);
scene.add(wheel.group);

// GUY
var guy = new Guy();
guy.group.scale.set(.5, .5, .5);
guy.group.position.set(0,  - .4, 0);
guy.group.rotation.set(0, Math.PI / 2, 0)
scene.add(guy.group);



var plane = new THREE.Mesh(
    new THREE.PlaneGeometry(30, 30, 10, 10),
    new THREE.MeshBasicMaterial({
        color: 0x4a4a4a
    })
);
plane.rotation.x = -Math.PI / 2;
plane.position.y = -2.9;
console.log(plane);

scene.add(plane);


// CAMERA
var camera = new THREE.PerspectiveCamera(50, 8 / 6, .05, 100);
camera.position.set(4, 4, 9);
camera.lookAt(0, 0, 0);
camera.add(new THREE.PointLight());
scene.add(camera);

// RENDER
var renderer = new THREE.WebGLRenderer();
renderer.setSize(800, 600);
document.body.appendChild(renderer.domElement);

var controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.autoRotate = true;



var frame = 0, maxFrame = 200;
var loop = function () {

    var per = frame / maxFrame,
    bias = Math.abs(.5 - per) / .5,
    r = -Math.PI * 2 * per;

    requestAnimationFrame(loop);

    wheel.wheel.rotation.z = r;
    guy.walk(per * 4);

    controls.update();
    renderer.render(scene, camera);

    frame += 1;
    frame %= maxFrame;

};

loop();
