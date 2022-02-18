(function () {
    // CAMERA
    var width = 640, height = 480,
    fieldOfView = 40, aspectRatio = width / height,
    near = 0.1, far = 1000,
    camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, near, far);
    // SCENE
    var scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(8, 8))
    // RENDER
    var renderer = new THREE.WebGLRenderer();
    document.getElementById('demo').appendChild(renderer.domElement);
    renderer.setSize(width, height);
    // MESH
    var mesh = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial());
    scene.add(mesh);
    // starting pos for camera
    camera.position.set(10, 0, 0);
    camera.lookAt(mesh.position);
    // APP LOOP
    var secs = 0,
    fps_update = 20,   // fps rate to update ( low fps for low CPU use, but choppy video )
    fps_movement = 30, // fps rate to move camera
    frame = 0,
    frameMax = 90,
    lt = new Date();
    var loop = function () {
        var now = new Date(),
        secs = (now - lt) / 1000,
        per = frame / frameMax,
        bias = (1 - Math.abs(per - 0.5) / 0.5);
        requestAnimationFrame(loop);
        if(secs > 1 / fps_update){
            // moving the camera
            camera.position.set(10, -2 + 4 * bias, 0);
            renderer.render(scene, camera);
            frame += fps_movement * secs;
            frame %= frameMax;
            lt = now;
        }
    };
    loop();
}
    ());