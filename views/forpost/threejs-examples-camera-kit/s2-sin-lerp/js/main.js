// demo of camera-kit
(function () {
    //******** **********
    // SCENE, CAMERA, RENDERER
    //******** **********
    var scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(10, 10));
    scene.background = new THREE.Color('black');
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.1, 1000);
    camera.position.set(8, 4, 8);
    camera.lookAt(0, 0, 0);
    scene.add(camera);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    
    // ********** **********
    // ANIMATION LOOP
    // ********** **********
    var frame = 0,
    maxFrame = 90,
    lt = new Date();
    var loop = function () {
        var now = new Date(),
        per = frame / maxFrame,
        bias = 1 - Math.abs(0.5 - per) / 0.5,
        secs = (now - lt) / 1000;
        requestAnimationFrame(loop);
        if (secs > 1 / 24) {

            var v1 = new THREE.Vector3(8, 4, 8);
            var v2 = new THREE.Vector3(-8, -4, 8);

            cameraKit.sinLerp(camera, v1, v2, bias, { bMulti: 0.2 } );

            var v3 = new THREE.Vector3(0, 0, 0);
            camera.lookAt(v3);

            // draw
            renderer.render(scene, camera);
            frame += 20 * secs;
            frame %= maxFrame;
            lt = now;
        }
    };
    loop();
}
    ());
