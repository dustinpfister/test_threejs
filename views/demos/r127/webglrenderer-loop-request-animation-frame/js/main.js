

(function () {

    // RENDER
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);

    // SCENE
    var scene = new THREE.Scene();

    // CAMERA
    var camera = new THREE.PerspectiveCamera(40, 4 / 3, 0.5, 100);
    camera.position.set(2, 2, 2);
    camera.lookAt(0, 0, 0);
    var light = new THREE.PointLight(0xffffff, 0.5);
    light.position.set(2, 0, 2);
    camera.add(light);
    scene.add(camera);

    // add something to the scene
    var cube = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshStandardMaterial({
                color: 0xff0000,
                emissive: 0x2a0000
            }));
    scene.add(cube);

    var state = {
        clock: new THREE.Clock(),
        frame: 0,
        maxFrame: 90,
        fps: 20, // capping at 12 fps
        per: 0
    };
    var loop = function () {
        var wSecs = performance.now() - state.clock.oldTime,
        secs;
        requestAnimationFrame(loop);
        if (wSecs > 1 / state.fps) {
            secs = state.clock.getDelta();
            state.per = state.frame / state.maxFrame;
            // update
            cube.rotation.y = Math.PI * 2 * state.per;
            // RENDER
            renderer.render(scene, camera);
            state.frame += state.fps * secs;
            state.frame %= state.maxFrame;
        }
    };

    state.clock.start();
    loop();

}
    ());

