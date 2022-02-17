(function () {
    // move camera helper
    var moveCamera = function (camera, subject, per) {
        var rad = Math.PI * 2 * per,
        x = Math.cos(rad) * 6,
        y = -4 + 8 * (1 - Math.abs(per - 0.5) / 0.5),
        z = Math.sin(rad) * 6;
        // position property can be used to set
        // the position of a camera
        camera.position.set(x, y, z);
        // the rotation property or the lookAt method
        // can be used to set rotation
        camera.lookAt(subject);
    };

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
        new THREE.MeshBasicMaterial({
            color: 0xff0000,
            wireframe: true
        }));
    scene.add(mesh);
    // APP LOOP
    var secs = 0,
    fps_update = 20,   // fps rate to update ( low fps for low CPU use, but chopy video )
    fps_movement = 60, // fps rate to move camera
    frame = 0,
    frameMax = 600,
    lt = new Date();
    var loop = function () {
        var now = new Date(),
        secs = (now - lt) / 1000;
        requestAnimationFrame(loop);
        if(secs > 1 / fps_update){
            moveCamera(camera, mesh.position, Math.round(frame) / frameMax);
            renderer.render(scene, camera);
            frame += fps_movement * secs;
            frame %= frameMax;
            lt = now;
        }
    };
    loop();
}
    ());