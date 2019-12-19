
var createCubeStack = function () {
    // Object3D
    var obj = new THREE.Object3D();
    // a mesh that inherits from Object3D
    var low = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshNormalMaterial());
    low.position.y = -1;
    obj.add(low);
    var high = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshNormalMaterial());
    high.rotation.set(0, 1, 0);
    obj.add(high);
    return obj;

};

// Scene
var scene = new THREE.Scene();

// Camera
var camera = new THREE.PerspectiveCamera(45, 4 / 3, .5, 100);
camera.position.set(3, 3, 3);
camera.lookAt(0, 0, 0);

var stack = createCubeStack();

scene.add( stack );

// Render
var renderer = new THREE.WebGLRenderer();
renderer.setSize(320, 240);
document.getElementById('demo').appendChild(renderer.domElement);

// loop
var frame = 0,
maxFrame = 100;
var loop = function () {

    var per = frame / maxFrame,
    bias = Math.abs(.5 - per) / .5;

    requestAnimationFrame(loop);
    renderer.render(scene, camera);

    //high.rotation.set(0, Math.PI * 2 * per, 0);
    //low.rotation.set(0, -Math.PI * 2 * per, 0);
    stack.position.set(0, -1 + 2 * bias, 0);

    frame += 1;
    frame = frame % maxFrame;

};

renderer.render(scene, camera);
loop();
