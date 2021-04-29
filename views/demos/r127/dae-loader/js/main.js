
(function () {

    // point light
    var sun = new THREE.Mesh(
            new THREE.SphereGeometry(1, 20, 20),
            new THREE.MeshBasicMaterial({
                color: 'white'
            }));
    sun.add(new THREE.PointLight(0xffffff));
    sun.position.set(8, 1, 1);

    // SCENE
    var scene = new THREE.Scene();
    scene.add(sun);
    // CAMERA
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
    camera.position.set(8, 8, 8);
    camera.lookAt(0, 0, 0);
    scene.add(camera);

    // RENDER
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    renderer.render(scene, camera);

    var loader = new THREE.ColladaLoader();
    loader.load("/dae/box/box.dae", function (result) {

        console.log(result);
        scene.background = new THREE.Color('cyan');
        scene.add(result.scene);
        renderer.render(scene, camera);
    });

}
    ());

/*
(function () {

// SCENE
var scene = new THREE.Scene();

var sun = new THREE.Mesh(
new THREE.SphereGeometry(1, 20, 20),
new THREE.MeshBasicMaterial({
color: 'white'
}));
// camera
var scene = new THREE.Scene();
scene.add(sun);
// camera
var camera = new THREE.PerspectiveCamera(75, 320 / 240, .025, 20);
camera.position.set(1, 1, 1);
camera.lookAt(0, 0, 0);
// renderer
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);


var loader = new THREE.ColladaLoader();
loader.load("/dae/box/box.dae", function (result) {

console.log(result);
scene.background = new THREE.Color('cyan');
scene.add(result.scene);
renderer.render(scene, camera);
});

}
());
*/
