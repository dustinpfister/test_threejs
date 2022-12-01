(function () {
    //-------- ----------
    // RENDERER, SCENE, CAMERA
    //-------- ----------
    const renderer = THREE.WebGL1Renderer ? new THREE.WebGL1Renderer : new THREE.WebGLRenderer();
    renderer.setSize(640, 480, false);
    ( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, 4 / 3, 0.5, 100);
    camera.position.set(2, 2, 2);
    camera.lookAt(0, 0, 0);
    //-------- ----------
    // LIGHT
    //-------- ----------
    const pl = new THREE.PointLight(0xffffff, 0.5);
    pl.position.set(2, 0, 2);
    camera.add(pl);
    scene.add(camera);
    //-------- ----------
    // MESH
    //-------- ----------
    const cube = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshStandardMaterial({
                color: 0xff0000,
                emissive: 0x2a0000
            }));
    scene.add(cube);
    //-------- ----------
    // USING SET ANIMATION LOOP
    //-------- ----------
    const state = {
        clock: new THREE.Clock(),
        frame: 0,
        maxFrame: 90,
        fps: 12,
        per: 0
    };
    state.clock.start();
    const loop = function () {
        const wSecs = performance.now() - state.clock.oldTime;
        if (wSecs > 1 / state.fps) {
            const secs = state.clock.getDelta();
            state.per = state.frame / state.maxFrame;
            // update
            cube.rotation.y = Math.PI * 2 * state.per;
            // RENDER
            renderer.render(scene, camera);
            state.frame += state.fps * secs;
            state.frame %= state.maxFrame;
        }
    };
    // start
    renderer.setAnimationLoop(loop);
    // stop after 3 secs
    setTimeout(function () {
        renderer.setAnimationLoop(null);
    }, 3000);
}
    ());
