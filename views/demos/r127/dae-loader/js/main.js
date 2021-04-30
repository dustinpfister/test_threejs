
(function () {

    // point light
    var pl = new THREE.Mesh(
            new THREE.SphereGeometry(1, 20, 20),
            new THREE.MeshBasicMaterial({
                color: 'white'
            }));
    pl.add(new THREE.PointLight(0xffffff));
    pl.position.set(2, 5, 3);
    // scene
    var scene = new THREE.Scene();
    scene.add(pl);
    // camera
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
    camera.position.set(5, 5, 5);
    camera.lookAt(0, 0, 0);
    scene.add(camera);
    // render
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    renderer.render(scene, camera);

    // CREATE A COLLADALOADER INSTANCE
    var loader = new THREE.ColladaLoader();
    // CALL THE LOAD METHOD, PASS THE ABSOLUTE OR RELATIVE PATH
    // TO THE *.DAE FILE AS THE FIRST ARGUMENT, AND A DONE CALLBACK
    // AS THE SECOND ARGUMENT
    loader.load("/dae/box/box.dae", function (result) {
        console.log(result);
        scene.background = new THREE.Color('cyan');
        scene.add(result.scene.children[2]);
        renderer.render(scene, camera);
    });

}
    ());
