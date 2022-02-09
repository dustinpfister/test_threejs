
(function () {
    // ---------- ----------
    // Scene, Camera, and Renderer
    // ---------- ----------
    var scene = new THREE.Scene();
    scene.add(new THREE.GridHelper())
    var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
    camera.position.set(3, 3, 3);
    camera.lookAt(0, 0, 0);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    // ---------- ----------
    // Adding a Mesh
    // ---------- ----------
    var mesh = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshNormalMaterial());
    scene.add(mesh);
    // ---------- ----------
    // LOOP - Using Vector3.applyEuler with an instance of THREE.Euler
    // ---------- ----------
    var state = {
        lt: new Date(),
        fps: 12,
        radian : 0,
        euler : new THREE.Euler(0, 0, 0)
    };
    var loop = function () {
        var now = new Date(),
        secs = (now - state.lt) / 1000;
        requestAnimationFrame(loop);
        if (secs >= 1 / state.fps) {
            state.euler.z += THREE.MathUtils.degToRad(90) * secs;
            state.euler.z = THREE.MathUtils.euclideanModulo(state.euler.z, Math.PI * 2);
            mesh.position.set(1, 0, 0);
            mesh.position.applyEuler(state.euler);
            renderer.render(scene, camera);
            state.lt = now;
        }
    };
    loop();

}
    ());
