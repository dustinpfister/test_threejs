
(function () {
    //-------- ----------
    // SCENE, CAMERA, RENDERER
    //-------- ----------
    const scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(9, 9));
    const camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
    camera.position.set(5, 5, 5);
    camera.lookAt(0, 0, 0);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    (document.getElementById('demo') || document.body).appendChild(renderer.domElement);
    //-------- ----------
    // HELPERS
    //-------- ----------
    // simple create cube helper
    const createCube = function () {
        const cube = new THREE.Mesh(
                new THREE.BoxGeometry(1, 1, 1),
                new THREE.MeshNormalMaterial());
        return cube;
    };
    // vector fro angles helper
    const vectorFromAngles = function (a, b, c, len, startVec) {
        len = len === undefined ? 1 : len;
        startVec = startVec === undefined ? new THREE.Vector3(1, 0, 0) : startVec;
        const e = new THREE.Euler(
                THREE.MathUtils.degToRad(a),
                THREE.MathUtils.degToRad(b),
                THREE.MathUtils.degToRad(c));
        const v = startVec.applyEuler(e).normalize();
        return v.multiplyScalar(len);
    };
    //-------- ----------
    // MESH
    //-------- ----------
    var cube = createCube();
    scene.add(cube);
    // USING MY VECTOR FROM ANGLES METHOD
    var v = vectorFromAngles(90, 0, 0, 1);
    cube.position.copy(v);
    //-------- ----------
    // LOOP
    //-------- ----------
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
}());
