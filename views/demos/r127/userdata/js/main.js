
(function () {

    var createCube = function () {
        var cube = new THREE.Mesh(
                new THREE.BoxGeometry(1, 1, 1),
                new THREE.MeshNormalMaterial());
        return cube;
    };

    var clampRadian = function (radian) {
        return radian %= Math.PI * 2;
    };

    var updateCube = function (cube, secs) {
        cube.rotation.x += 1 * secs;
        cube.rotation.x = clampRadian(cube.rotation.x);
    };

    // Scene
    var scene = new THREE.Scene();

    var cube = createCube();
    scene.add(cube);

    // Camera
    var camera = new THREE.PerspectiveCamera(45, 4 / 3, .5, 100);
    camera.position.set(8, 8, 8);
    camera.lookAt(0, 0, 0);
    // Render
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);

    // loop
    var lt = new Date(),
    fps = 24;
    function loop() {
        var now = new Date(),
        secs = (now - lt) / 1000;
        requestAnimationFrame(loop);
        if (secs > 1 / fps) {
            updateCube(cube, secs);
            renderer.render(scene, camera);
            lt = now;
        }
    };

    loop();

}
    ());
