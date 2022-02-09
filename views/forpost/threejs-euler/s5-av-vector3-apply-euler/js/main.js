
(function () {
    // ---------- ----------
    // Scene, Camera, and Renderer
    // ---------- ----------
    var scene = new THREE.Scene();
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
    // LOOP
    // ---------- ----------
    var state = {
        lt: new Date()
    };
    var loop = function () {
        var now = new Date(),
        secs = (now - state.lt) / 1000;
        requestAnimationFrame(loop);
        if (secs >= 0.075) {
            mesh.rotation.x += THREE.MathUtils.degToRad(20) * secs;
            mesh.rotation.x = THREE.MathUtils.euclideanModulo(mesh.rotation.x, Math.PI * 2)
            renderer.render(scene, camera);
            state.lt = now;
        }
    };
    loop();
}
    ());
