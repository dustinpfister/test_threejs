
(function () {

    // GEOMETRY
    var geometry = new THREE.BufferGeometry();

    // SCENE
    var scene = new THREE.Scene();

    // CAMERA
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
    camera.position.set(100, 100, 100);
    scene.add(camera);

    // RENDER
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
