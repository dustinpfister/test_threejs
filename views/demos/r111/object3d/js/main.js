
// create cube stack method
var createCubeStack = function (original) {
    var stack = {},
    original = original || new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshNormalMaterial()),
    cube;
    stack.group = new THREE.Object3D();
    // create cubes in the stack
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
	stack.set = function(per){
		
		stack.group.children.forEach(function(cube){
			
			
		});
		
	};
    return stack;
};

// Scene
var scene = new THREE.Scene();

// Camera
var camera = new THREE.PerspectiveCamera(45, 4 / 3, .5, 100);
camera.position.set(5, 5, 5);
camera.lookAt(0, 0, 0);

var stack = createCubeStack();

scene.add(stack.group);

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
    stack.group.position.set(0, -1 + 2 * bias, 0);

    frame += 1;
    frame = frame % maxFrame;

};

renderer.render(scene, camera);
loop();
