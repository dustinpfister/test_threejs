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
        per: 0,
        bias: 0,
        bp: Biplane.create()
    };
    scene.add(state.bp);
    // camera
    var camera = new THREE.PerspectiveCamera(45, 4 / 3, 0.5, 500);
    camera.position.set(10, 10, 10);
    camera.lookAt(0, 0, 0);
    camera.add(new THREE.PointLight(0xffffff)); // point light added to camera
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

            state.per = state.frame / state.maxFrame;
            state.bias = 1 - Math.abs(state.per - 0.5) / 0.5;

            var radian = Math.PI * 2 * state.per,
            x = Math.cos(radian) * 10,
            y = Math.sin(radian) * 10;

            Biplane.updateProp(state.bp, state.per);

            // roll and pitch
            Biplane.updateRoll(state.bp, -0.125 + state.bias * 0.25, 1);
            Biplane.updatePitch(state.bp, state.per * 4, 1);

            // setting position thus far is something that just needs to be done outside
            // of the model for now I think

            state.bp.position.set(
                0,
                Math.cos(state.bp.rotation.x) * 5,
                Math.sin(state.bp.rotation.x) * 5);

            renderer.render(scene, camera);
            state.lt = now;
            state.frame += state.fps * secs;
            state.frame %= state.maxFrame;
        }
    };
    loop();
}
    ());
