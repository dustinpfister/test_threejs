
(function () {

    // simple create cube helper
    var createCube = function () {
        var cube = new THREE.Mesh(
                new THREE.BoxGeometry(1, 1, 1),
                new THREE.MeshNormalMaterial());
        return cube;
    };

    var vectorFromAngles = function (a, b, c, len, startVec) {
        len = len === undefined ? 1 : len;
        startVec = startVec === undefined ? new THREE.Vector3(1, 0, 0) : startVec;
        var e = new THREE.Euler(
                THREE.MathUtils.degToRad(a),
                THREE.MathUtils.degToRad(b),
                THREE.MathUtils.degToRad(c));
        var v = startVec.applyEuler(e).normalize();
        return v.multiplyScalar(len);
    };

    // scene
    var scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(9, 9));

    var cube = createCube();
    scene.add(cube);

    var v = vectorFromAngles(90, 0, 0, 1);
    console.log(v);
    cube.position.copy(v);

    // CAMERA
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
    camera.position.set(5, 5, 5);
    camera.lookAt(0, 0, 0);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);

    var lt = new Date(),
    a = 0,
    b = 0,
    c = 0,
    fps = 30;
    var loop = function () {
        var now = new Date(),
        secs = (now - lt) / 1000;

        requestAnimationFrame(loop);

        if (secs > 1 / fps) {
            b += 90 * secs;
            b %= 360;
            var v = vectorFromAngles(a, b, c, 1.5);
            cube.position.copy(v);

            lt = now;
            renderer.render(scene, camera);
        }
    };
    loop();
}
    ());
