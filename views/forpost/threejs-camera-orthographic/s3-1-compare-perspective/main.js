(function () {
    // SCENE, RENDERER, LIGHT
    var scene = new THREE.Scene();
    scene.background = new THREE.Color(0.25, 0.25, 0.25);
    scene.add(new THREE.GridHelper(10,10));
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    var light = new THREE.PointLight();
    light.position.set(0, 3, 6);
    scene.add(light);
    // CAMERAS
    var width = 3.2,
    height = 2.4,
    cameras = [
        // camera 0 will be the typical Perspective Camera
        new THREE.PerspectiveCamera(45, width / height, .5, 100),
        // and camera 1 will be Orthographic
        new THREE.OrthographicCamera(
            -width,
            width,
            height,
            -height,
            .1,
            50)
    ];
    // for each camera
    cameras.forEach(function (camera) {
        // set to same position, and look at the origin
        camera.position.set(5, 5, 5);
        camera.lookAt(0, 0, 0);
        // set zoom
        camera.zoom = .75;
        camera.updateProjectionMatrix();
        scene.add(camera);
        // add orbit controls if there
        if (THREE.OrbitControls) {
            new THREE.OrbitControls(camera, renderer.domElement);
        }
    });
    // STACK
    var stack = CubeStack.create({gx: 7, gy: 4, boxCount: 35});
    stack.position.set(0, 0.6, 0)
    scene.add(stack);
    // lOOP
    var frame = 0,
    maxFrame = 1000;
    var loop = function () {
        var per = frame / maxFrame,
        r = Math.PI * 2 * per,
        // camera index
        ci = Math.floor(per * 8 % 2);
        requestAnimationFrame(loop);
        //stack.group.rotation.set(0, Math.PI * 2 * per, 0);
        stack.rotation.set(0, Math.PI * 2 * per, 0);
        renderer.render(scene, cameras[ci]);
        frame += 1;
        frame = frame % maxFrame;
    };
    loop();
}());