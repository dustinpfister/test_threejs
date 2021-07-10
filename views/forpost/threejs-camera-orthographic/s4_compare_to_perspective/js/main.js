(function () {
 
    // SCENE
    var scene = new THREE.Scene();
 
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
 
        // point light above the camera
        var light = new THREE.PointLight();
        light.position.set(0, 2, 0);
        camera.add(light);
 
        // add orbit controls if there
        if (THREE.OrbitControls) {
 
            new THREE.OrbitControls(camera);
 
        }
 
    });
 
    // STACK
    // create an instance of the CubeStack Model
    // and add it to the scene
    var stack = new CubeStack();
    scene.add(stack.group);
 
    // RENDER
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(320, 240);
    document.getElementById('demo').appendChild(renderer.domElement);
 
    // lOOP
    var frame = 0,
    maxFrame = 1000;
    var loop = function () {
 
        var per = frame / maxFrame,
        r = Math.PI * 2 * per,
        // camera index
        ci = Math.floor(per * 8 % 2);
 
        requestAnimationFrame(loop);
 
        stack.group.rotation.set(0, Math.PI * 2 * per, 0);
 
        renderer.render(scene, cameras[ci]);
 
        frame += 1;
        frame = frame % maxFrame;
 
    };
 
    loop();
 
}
    ());