// create cube stack method
var createCubeStack = function (original) {
    var stack = {},
    original = original || new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshNormalMaterial()),
    cube;
    // the group
    stack.group = new THREE.Object3D();
    // set method
    stack.set = function (per) {
        var bias = 1 - Math.abs(0.5 - per) / 0.5,
        arr = stack.group.children,
        len = arr.length;
        arr.forEach(function (cube, i) {
            var y = -len / 2 + i + 2 * bias;
            cube.position.set(0, y, 0);
            cube.rotation.set(0, Math.PI * 2 * (i / len) + Math.PI * 2 * per, 0);
        });
    };
    // create cubes for the group
    var i = 0,
    len = 3,
    per;
    while (i < len) {
        per = i / len;
        cube = original.clone();
        cube.position.set(0, -len / 2 + i, 0);
        cube.rotation.set(0, Math.PI * 2 * per, 0);
        stack.group.add(cube)
        i += 1;
    }
    return stack;
};
// Scene
var scene = new THREE.Scene();
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
var camera = new THREE.PerspectiveCamera(45, 4 / 3, .5, 100);
camera.position.set(5, 5, 5);
camera.lookAt(0, 0, 0);
// stack
var stack = createCubeStack();
scene.add(stack.group);
// loop
var frame = 0,
maxFrame = 100;
var loop = function () {
    requestAnimationFrame(loop);
    renderer.render(scene, camera);
    stack.set(frame / maxFrame);
    frame += 1;
    frame = frame % maxFrame;
}; 
renderer.render(scene, camera);
loop();