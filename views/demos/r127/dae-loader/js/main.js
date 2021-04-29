
(function () {

    // point light
    var sun = new THREE.Mesh(
            new THREE.SphereGeometry(1, 20, 20),
            new THREE.MeshBasicMaterial({
                color: 'white'
            }));
    sun.add(new THREE.PointLight(0xffffff));
    sun.position.set(2, 5, 3);

    // SCENE
    var scene = new THREE.Scene();
    scene.add(sun);
    // CAMERA
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
    camera.position.set(5, 5, 5);
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
        scene.add(result.scene.children[2]);
        renderer.render(scene, camera);
    });

}
    ());
