// CREATE A SCENE
var scene = new THREE.Scene();
scene.add( new THREE.GridHelper(10, 10) );
var camera = new THREE.PerspectiveCamera(45, 4 / 3, .5, 100);
camera.position.set(2, 1, 2);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
var container = document.getElementById('demo') || document.body;
container.appendChild(renderer.domElement);
var mesh = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshNormalMaterial());
scene.add(mesh);
// LOOP
var frame = 0,
maxFrame = 50,
loop = function () {
    var per = frame / maxFrame,
    bias = Math.abs(.5 - per) / .5;
    requestAnimationFrame(loop);
    // using Object3D properties to change
    // the position and rotation of a scene
    scene.position.set(0, 1 * bias, 0);
    scene.rotation.set(Math.PI * 2 * per, 0, 0);
    renderer.render(scene, camera);
    frame += 1;
    frame %= maxFrame;
};
loop();
