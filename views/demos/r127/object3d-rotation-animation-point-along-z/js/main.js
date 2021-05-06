(function () {
    // scene is based OFF of Object3D
    var scene = new THREE.Scene();

    // GRID HELPER IS ALSO BASED OFF OF OBJECT3D
    // so then I can use the scale property
    var gridHelper = new THREE.GridHelper(4, 4);
    gridHelper.scale.set(2.5, 2.5, 2.5);
    scene.add(gridHelper);

    // box is a MESH base off of OBJECT3D
    var box = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshNormalMaterial());
    scene.add(box);

    // sphere is a MESH base off of OBJECT3D
    var sphere = new THREE.Mesh(
            new THREE.SphereGeometry(0.25, 20, 20),
            new THREE.MeshNormalMaterial());
    scene.add(sphere);

    // camera is based off of OBJECT3D
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
        vector: new THREE.Vector3(3, 0, 0) // and instance of vercor3
    };
    // update
    var update = function (state, secs) {
        state.vector.z = -5 + 10 * state.bias;
        // USING THE state.vector instance of Vector3 to set the position
        // of the sphere
        sphere.position.copy(state.vector);
        // and also making the box look at the state.vercor value
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
