(function () {
    // a scene is needed to place objects in
    var scene = new THREE.Scene();
    scene.add( new THREE.GridHelper(10, 10) );
    // so here I am setting the values of the perspective camera
    var fieldOfView = 45,
    aspectRatio = 4 / 3,
    near = 1,
    far = 15,
    camera1 = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, near, far);
    camera1.position.set(2, 2, 2);
    camera1.lookAt(0, 0.5, 0);
    scene.add(camera1);
    // CAMERA HELPER FOR CAM1
    var helper = new THREE.CameraHelper(camera1);
    scene.add(helper);

    var camera2 = new THREE.PerspectiveCamera(45, 4 / 3, 0.1, 50);
    scene.add(camera2);

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    // initialize method
    var init = function () {
        // add a cube to the scene
        var cube = new THREE.Mesh(
                new THREE.BoxGeometry(1, 1, 1),
                new THREE.MeshDepthMaterial({}));
        cube.position.set(0, 0.5, 0);
        scene.add(cube);
        // camera pos
        camera2.position.set(2, 2, 2);
        camera2.lookAt(0, 0.5, 0);
    };
    // update method
    var update = function (per, bias, secs) {
        camera2.position.x = 2 + 10 * bias;
        camera2.position.z = 2 - 5 * bias;
        camera2.lookAt(0, 0.5, 0);
    };
    // loop
    var per = 0,
    bias = 0,
    now = new Date(),
    secs = 0,
    lt = now,
    frame = 0,
    frameMax = 300,
    fps = 30;
    var loop = function () {
        now = new Date();
        secs = (now - lt) / 1000;
        per = frame / frameMax;
        bias = 1 - Math.abs(0.5 - per) / 0.5;
        requestAnimationFrame(loop);
        if(secs > 1 / fps){
            update(per, bias, secs);
            renderer.render(scene, camera2);
            frame += fps * secs;
            frame %= frameMax;
            lt = now;
        }
    };
    // call init, and start loop
    init();
    loop();
}
    ());