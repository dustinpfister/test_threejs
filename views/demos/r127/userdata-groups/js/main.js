
(function () {

    var scene = new THREE.Scene();

    var gridHelper = new THREE.GridHelper(10, 10);
    scene.add(gridHelper);

    var cubes = CubeGroupMod.create();
    scene.add(cubes);

    // Camera
    var camera = new THREE.PerspectiveCamera(45, 4 / 3, .5, 100);
    camera.position.set(0, 10, 10);
    camera.lookAt(0, 0, 0);
    // Render
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
   
    var controls = new THREE.OrbitControls(camera, renderer.domElement);

    // loop
    var lt = new Date(),
    fps = 24;
    function loop() {
        var now = new Date(),
        secs = (now - lt) / 1000;
        requestAnimationFrame(loop);
        if (secs > 1 / fps) {
            CubeGroupMod.update(cubes, secs);
            renderer.render(scene, camera);
            lt = now;
        }
    };

    loop();

}
    ());
