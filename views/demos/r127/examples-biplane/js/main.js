(function () {
    // Scene
    var scene = new THREE.Scene();
    scene.background = new THREE.Color('cyan');
    scene.add(new THREE.GridHelper(20, 20));
    // create state
    var state = {
        lt: new Date(),
        fps: 30,
        frame: 0,
        maxFrame: 600,
        bp: Biplane.create()
    };
    scene.add(state.bp);
    // camera
    var camera = new THREE.PerspectiveCamera(45, 4 / 3, 0.5, 500);
    camera.position.set(10, 10, 10);
    camera.lookAt(0, 0, 0);
    scene.add(camera);
    // Render
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    // loop
    function loop() {
        var now = new Date(),
        secs = (now - state.lt) / 1000;
        requestAnimationFrame(loop);
        if (secs > 1 / state.fps) {

            Biplane.update(state.bp, state.frame / state.maxFrame);

            renderer.render(scene, camera);
            state.lt = now;
            state.frame += state.fps * secs;
            state.frame %= state.maxFrame;
        }
    };
    loop();
}
    ());
