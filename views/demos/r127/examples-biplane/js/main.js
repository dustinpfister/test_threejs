(function () {
    // Scene
    var scene = new THREE.Scene();
    scene.background = new THREE.Color('cyan');
    // create state
    var state = {
        lt: new Date(),
        fps: 30,
        frame: 0,
        maxFrame: 600,
        world: worldMod.create() // create the world
    };
    scene.add(state.world);
    // Render
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    // loop
    function loop() {
        var now = new Date(),
        secs = (now - state.lt) / 1000,
        wud = state.world.userData;
        requestAnimationFrame(loop);
        if (secs > 1 / state.fps) {
            worldMod.update(state.world, state.frame, state.maxFrame);
            renderer.render(scene, state.world.userData.camera);
            state.lt = now;
            state.frame += state.fps * secs;
            state.frame %= state.maxFrame;
        }
    };
    loop();
}
    ());
