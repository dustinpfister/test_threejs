
(function () {
    // scene
    var scene = new THREE.Scene();

    var grid = new THREE.GridHelper(10, 10);  // ADDING A GRID THAT I AM ENABLING FOR ALL LAYERS
    grid.layers.enableAll();
    scene.add(grid);
    var mesh = new THREE.Mesh(  // SINGLE MESH FOR LAYER 1
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
    // update
    var cameraLayer = 0;
    var update = function () {
        camera.layers.set(cameraLayer);
        renderer.render(scene, camera);
        cameraLayer += 1;
        cameraLayer %= 2;
    };
    update();
    setInterval(update, 1000);
}
    ());
