(function () {
    //-------- ----------
    // SCENE, CAMERA, RENDERER
    //-------- ----------
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('blue');
    const camera = new THREE.PerspectiveCamera(45, 4 / 3, .5, 100);
    camera.position.set(1.25, 1.75, 1.25);
    camera.lookAt(0, 0, 0);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    (document.getElementById('demo') || document.body).appendChild(renderer.domElement);
    //-------- ----------
    // EDGE GEOMETRY CREATED FROM BOX GEOMETRY
    //-------- ----------
    let boxGeo = new THREE.BoxGeometry(1, 1, 1),
    edgeGeo = new THREE.EdgesGeometry(boxGeo),
    line = new THREE.LineSegments(
            edgeGeo,
            new THREE.LineBasicMaterial({
                color: new THREE.Color('white')
            }));
    scene.add(line);
    //-------- ----------
    // LOOP
    //-------- ----------
    const state = {
        clock: new THREE.Clock(),
        frame: 0,
        maxFrame: 90,
        fps: 12, // capping at 12 fps
        per: 0
    };
    const update = function (state) {
        line.rotation.y = Math.PI * 2 * state.per;
    };
    const loop = function () {
        const wSecs = performance.now() - state.clock.oldTime;
        requestAnimationFrame(loop);
        if (wSecs > 1 / state.fps) {
            let secs = state.clock.getDelta();
            state.per = state.frame / state.maxFrame;
            update(state);
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
