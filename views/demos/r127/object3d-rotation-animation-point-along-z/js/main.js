(function () {
    // scene
    var scene = new THREE.Scene();

    // grid helper
    var gridHelper = new THREE.GridHelper(10, 10);
    scene.add(gridHelper);

    // box
    var box = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshNormalMaterial());
    scene.add(box);

    // sphere
    var sphere = new THREE.Mesh(
            new THREE.SphereGeometry(0.25, 20, 20),
            new THREE.MeshNormalMaterial());
    scene.add(sphere);

    // camera
    var camera = new THREE.PerspectiveCamera(45, 4 / 3, .5, 100);
    camera.position.set(10, 10, 10);
    camera.lookAt(0, 0, 0);

    // render
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);

    // state object
    var state = {
        frame: 0,
        maxFrame: 100,
        fps: 30,
        lt: new Date(),
        vector: new THREE.Vector3(3, 0, 0)
    };
    // update
    var update = function (state, secs) {
        state.vector.z = -5 + 10 * state.bias;
        sphere.position.copy(state.vector);
        box.lookAt(state.vector);
    };
    // loop
    var loop = function () {
        state.per = state.frame / state.maxFrame;
        state.bias = 1 - Math.abs(state.per - 0.5) / 0.5;
        var now = new Date();
        secs = (now - state.lt) / 1000;
        requestAnimationFrame(loop);
        if (secs > 1 / state.fps) {
            update(state, secs);
            renderer.render(scene, camera);
            state.frame += state.fps * secs;
            state.frame %= state.maxFrame;
            state.lt = now;
        }
    };
    loop();
}
    ());
