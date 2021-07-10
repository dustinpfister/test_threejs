
(function () {
    // scene
    var scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(10, 10));

    // ORTHOGRAPHIC CAMERA
    var width = 3.2,
    height = 2.4,
    left = width * -1,
    right = width,
    top = height,
    bottom = height * -1,
    near = 1,
    far = 20,
    camera = new THREE.OrthographicCamera(
            left,
            right,
            top,
            bottom,
            near,
            far);
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
    stack.group.position.set(0, 0.5, 0);
    scene.add(stack.group);
    // render
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    // loop
    var frame = 0,
    maxFrame = 200,
    fps = 30,
    radian,
    x,
    y,
    z,
    lt = new Date();
    var loop = function () {
        var now = new Date(),
        secs = (now - lt) / 1000,
        per = frame / maxFrame;
        requestAnimationFrame(loop);
        if (secs > 1 / fps) {
            renderer.render(scene, camera);
            radian = Math.PI * 2 * per;
            x = Math.cos(radian) * 5;
            y = 3 + Math.sin(radian) * 2;
            z = Math.sin(radian) * 5;
            camera.position.set(x, y, z);
            camera.lookAt(0, 0, 0);
            lt = now;
            frame += fps * secs;
            frame %= maxFrame;
        }
    };

    loop();

}
    ());
