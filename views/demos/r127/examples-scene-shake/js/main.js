(function () {
    // scene and grid helper
    var scene = new THREE.Scene();
    var gridHelper = new THREE.GridHelper(5, 5);
    scene.add(gridHelper);

    // box is a MESH base off of OBJECT3D
    var box = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshNormalMaterial());
    box.position.set(0, 0.5, 0);
    scene.add(box);

    // camera
    var camera = new THREE.PerspectiveCamera(45, 4 / 3, .5, 100);
    camera.position.set(5, 5, 5);
    camera.lookAt(0, 0, 0);
    // render
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);

    // state object
    var state = {
        frame: 0,
        maxFrame: 200,
        fps: 30,
        lt: new Date(),
        euler: new THREE.Euler(0, 0, 0),
        vector: new THREE.Vector3(0, 0, 0)
    };
    var deg = function (deg) {
        return Math.PI / 180 * deg;
    };
    // update
    var update = function (state, secs) {

        state.euler.x = deg(-2.5) + deg(5) * Math.random();
        state.euler.y = deg(-2.5) + deg(5) * Math.random();
        state.euler.z = deg(-2.5) + deg(5) * Math.random();
        state.vector.x = -0.5 + 1 * Math.random();
        state.vector.y = -0.5 + 1 * Math.random();
        state.vector.z = -0.5 + 1 * Math.random();

        scene.rotation.copy(state.euler);
        scene.position.copy(state.vector);

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
