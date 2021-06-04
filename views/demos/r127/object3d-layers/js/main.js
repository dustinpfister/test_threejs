
(function () {

    // scene
    var scene = new THREE.Scene();

    // ADDING A GRID THAT I AM ENABLING FOR ALL LAYERS
    var grid = new THREE.GridHelper(10, 10);
    grid.layers.enableAll(); // enable all will set all layers true
    scene.add(grid);

    // SINGLE MESH FOR LAYER 1
    var mesh = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshNormalMaterial());
    mesh.layers.set(1);
    scene.add(mesh);

    // camera, and renderer
    var camera = new THREE.PerspectiveCamera(45, 4 / 3, .5, 100);
    camera.position.set(5, 5, 5);
    camera.lookAt(0, 0, 0);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);

    // loop
    var lt = new Date(),
    cameraLayer = 0;
    var update = function () {
        camera.layers.set(cameraLayer);
        cameraLayer += 1;
        cameraLayer %= 2;
        renderer.render(scene, camera);
    };
    var loop = function () {
        var now = new Date(),
        secs = (now - lt) / 1000;
        requestAnimationFrame(loop);
        if (secs > 1) {
            update();
            lt = now;
        }
    };
    update();
    loop();

}
    ());
