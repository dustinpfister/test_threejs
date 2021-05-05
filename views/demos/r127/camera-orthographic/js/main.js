
(function () {

    // Scene
    var scene = new THREE.Scene();

    // Camera
    var width = 3.2,
    height = 2.4,
    camera = new THREE.OrthographicCamera(
            width * -1,
            width,
            height,
            height * -1,
            .01,
            100);

    // set to same position, and look at the origin
    camera.position.set(4, 4, 4);
    camera.lookAt(0, 0, 0);

    // set zoom
    camera.zoom = .75;
    camera.updateProjectionMatrix();

    // point light above the camera
    var light = new THREE.PointLight();
    light.position.set(0, 2, 0);
    camera.add(light);

    //new THREE.OrbitControls(camera);

    // make the camera part of the scene
    scene.add(camera);

    // create and add the cube stack
    var stack = new CubeStack({

            boxCount: 25

        });
    scene.add(stack.group);

    // Render
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);

    var loop = function () {

        requestAnimationFrame(loop);

        renderer.render(scene, camera);

    };

    loop();

}
    ());
