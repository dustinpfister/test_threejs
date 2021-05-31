(function () {

    // bog geometry and an edge geometry created from it
    var boxGeo = new THREE.BoxGeometry(1, 1, 1),
    edgeGeo = new THREE.EdgesGeometry(boxGeo);

    // Line Segments
    var line = new THREE.LineSegments(
            edgeGeo,
            new THREE.LineBasicMaterial({
                color: new THREE.Color('white')
            }));

    // Scene
    var scene = new THREE.Scene();
    scene.background = new THREE.Color('blue');
    scene.add(line);
    // Camera
    var camera = new THREE.PerspectiveCamera(45, 4 / 3, .5, 100);
    camera.position.set(2, 2, 2);
    camera.lookAt(0, 0, 0);
    // Render
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);

    // loop
    var state = {
        clock: new THREE.Clock(),
        frame: 0,
        maxFrame: 90,
        fps: 12, // capping at 12 fps
        per: 0
    };
    var loop = function () {
        var wSecs = performance.now() - state.clock.oldTime,
        secs;
        requestAnimationFrame(loop);
        if (wSecs > 1 / state.fps) {
            secs = state.clock.getDelta();
            state.per = state.frame / state.maxFrame;
            line.rotation.y = Math.PI * 2 * state.per;
            state.frame += state.fps * secs;
            state.frame %= state.maxFrame;
            renderer.render(scene, camera);
        }
    };
    // START CLOCK
    state.clock.start();
    loop();
}
    ());
