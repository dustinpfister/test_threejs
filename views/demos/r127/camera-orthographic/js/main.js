
(function () {

    // scene
    var scene = new THREE.Scene();

    // ORTHOGRAPHIC CAMERA
    var width = 3.2,
    height = 2.4,
    camera = new THREE.OrthographicCamera(
            width * -1,
            width,
            height,
            height * -1,
            .01,
            100);
    camera.position.set(4, 4, 4);
    camera.lookAt(0, 0, 0);
    camera.zoom = .75;
    camera.updateProjectionMatrix();
    var light = new THREE.PointLight(); // point light above the camera
    light.position.set(0, 2, 0);
    camera.add(light);
    scene.add(camera); // make the camera part of the scene

    // create and add the cube stack
    var stack = new CubeStack({
            boxCount: 25
        });
    scene.add(stack.group);

    // render
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
